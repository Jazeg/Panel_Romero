import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  IconButton,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Alert,
  Tooltip
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  PrinterIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ReceiptRefundIcon,
  DocumentDuplicateIcon,
  ArchiveBoxXMarkIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

// Datos de ejemplo (en una implementación real estos vendrían de la API)
const comprobante = {
  id: 1,
  company_id: 1,
  client_id: 1,
  document_type_code: '01',
  series: 'F001',
  number: 152,
  issue_date: '2025-04-05',
  due_date: '2025-05-05',
  operation_type_code: '0101',
  currency_code: 'PEN',
  exchange_rate: null,
  total_taxable: 2550.85,
  total_exonerated: 0.00,
  total_unaffected: 0.00,
  total_free: 0.00,
  total_discount: 199.15,
  total_igv: 459.15,
  total_isc: 0.00,
  total_other_taxes: 0.00,
  total_payable: 3010.00,
  total_in_words: 'TRES MIL DIEZ Y 00/100 SOLES',
  sunat_status: 'ACCEPTED',
  sunat_ticket: null,
  sunat_response_code: '0',
  sunat_response_description: 'La Factura número F001-152, ha sido aceptada',
  sunat_observations: null,
  xml_file_path: '/storage/xml/01-F001-152.xml',
  signed_xml_file_path: '/storage/signed_xml/01-F001-152.xml',
  zip_file_path: '/storage/zip/01-F001-152.zip',
  cdr_file_path: '/storage/cdr/R-01-F001-152.zip',
  related_gre_series_number: 'T001-123',
  payment_terms: 'CREDITO_30',
  notes: 'Servicio especial con descuento por cliente frecuente',
  created_by: 1,
  created_at: '2025-04-05T10:15:30',
  updated_at: '2025-04-05T10:17:45',
  
  // Datos relacionados
  company: {
    id: 1,
    ruc: '20123456789',
    business_name: 'Transportes Romero S.A.C.',
    trade_name: 'Transportes Romero',
    address: 'Av. La Marina 1234, Iquitos, Loreto',
    ubigeo: '160101',
    phone: '065-123456',
    email: 'facturacion@transportesromero.com'
  },
  client: {
    id: 1,
    doc_type: '6',
    doc_number: '20512376218',
    name: 'Comercial Los Andes S.A.C.',
    address: 'Av. La Marina 1234, San Miguel, Lima',
    email: 'contacto@losandes.com.pe',
    phone: '01-456-7890'
  },
  items: [
    {
      id: 1,
      invoice_id: 1,
      item_order: 1,
      product_id: 1,
      product_name: 'Transporte de carga - Ruta Iquitos-Pucallpa',
      quantity: 2,
      unit_code: 'ZZ',
      unit_price: 1200.00,
      price_with_tax: 1416.00,
      discount: 199.15,
      tax_category_code: '10',
      igv_percentage: 18.00,
      igv_amount: 396.15,
      subtotal: 2200.85,
      total_line: 2597.00
    },
    {
      id: 2,
      invoice_id: 1,
      item_order: 2,
      product_id: 3,
      product_name: 'Transporte de pasajeros - Ruta Iquitos-Pucallpa',
      quantity: 1,
      unit_code: 'ZZ',
      unit_price: 350.00,
      price_with_tax: 413.00,
      discount: 0.00,
      tax_category_code: '10',
      igv_percentage: 18.00,
      igv_amount: 63.00,
      subtotal: 350.00,
      total_line: 413.00
    }
  ],
  
  // Eventos y auditoria
  events: [
    {
      id: 1,
      event_type: 'CREATED',
      timestamp: '2025-04-05T10:15:30',
      user_name: 'Juan Pérez',
      details: 'Comprobante creado'
    },
    {
      id: 2,
      event_type: 'SIGNED',
      timestamp: '2025-04-05T10:15:45',
      user_name: 'Sistema',
      details: 'XML firmado digitalmente'
    },
    {
      id: 3,
      event_type: 'SENT',
      timestamp: '2025-04-05T10:16:10',
      user_name: 'Sistema',
      details: 'Enviado a SUNAT'
    },
    {
      id: 4,
      event_type: 'ACCEPTED',
      timestamp: '2025-04-05T10:17:45',
      user_name: 'Sistema',
      details: 'Aceptado por SUNAT con CDR'
    }
  ],
  
  // Documentos relacionados
  related_documents: [
    {
      id: 1,
      document_type: 'GRE',
      series: 'T001',
      number: 123,
      date: '2025-04-04',
      description: 'Guía de Remisión Electrónica'
    }
  ],
  
  // Pagos recibidos
  payments: [
    {
      id: 1,
      payment_date: '2025-04-15',
      amount: 1000.00,
      payment_method: 'TRANSFERENCIA',
      reference: 'OP-12345'
    }
  ]
};

// Estado de documentos en SUNAT (mapeo de estados para mostrar colores apropiados)
const estadoSunatColor = {
  'PENDING': 'blue-gray',
  'GENERATED': 'blue',
  'SIGNED': 'blue',
  'SENT': 'amber',
  'ACCEPTED': 'green',
  'REJECTED': 'red',
  'OBSERVED': 'amber',
  'VOIDED': 'red',
  'ERROR': 'red'
};

const estadoSunatLabel = {
  'PENDING': 'Pendiente',
  'GENERATED': 'Generado',
  'SIGNED': 'Firmado',
  'SENT': 'Enviado',
  'ACCEPTED': 'Aceptado',
  'REJECTED': 'Rechazado',
  'OBSERVED': 'Observado',
  'VOIDED': 'Anulado',
  'ERROR': 'Error'
};

// Tipo de documentos
const documentTypeLabels = {
  '01': 'Factura Electrónica',
  '03': 'Boleta de Venta Electrónica',
  '07': 'Nota de Crédito Electrónica',
  '08': 'Nota de Débito Electrónica'
};

// Tipos de unidades
const unitLabels = {
  'NIU': 'Unidad',
  'ZZ': 'Servicio',
  'KGM': 'Kilogramo'
};

// Add named export alongside default export
export function DetalleComprobante() {
  const [activeTab, setActiveTab] = useState("informacion");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  
  // Formateadores
  const formatSeriesNumber = (series, number) => {
    return `${series}-${number.toString().padStart(6, '0')}`;
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: comprobante.currency_code,
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };
  
  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('es-PE', options);
  };
  
  // Acciones
  const handleVolver = () => {
    window.history.back();
  };
  
  const handleImprimir = () => {
    window.print();
  };
  
  const handleDescargarXML = () => {
    // En una implementación real, esto descargaría el archivo
    setAlertMessage('Descargando XML firmado');
    setAlertType('info');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleDescargarCDR = () => {
    // En una implementación real, esto descargaría el archivo
    setAlertMessage('Descargando Constancia de Recepción (CDR)');
    setAlertType('info');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleEnviarEmail = () => {
    // En una implementación real, esto abriría un modal para enviar email
    setAlertMessage('Enviando comprobante por email al cliente');
    setAlertType('info');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleCrearNotaCredito = () => {
    // En una implementación real, esto redireccionaría
    window.location.href = "/dashboard/nueva-nota-credito?doc_id=" + comprobante.id;
  };
  
  const handleEmitirCopia = () => {
    setAlertMessage('Generando copia del comprobante');
    setAlertType('info');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleAnular = () => {
    setAlertMessage('Esta acción generará una comunicación de baja para anular el comprobante');
    setAlertType('warning');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };
  
  // Obtener el saldo pendiente
  const getSaldoPendiente = () => {
    const totalPagado = comprobante.payments.reduce((sum, payment) => sum + payment.amount, 0);
    return comprobante.total_payable - totalPagado;
  };
  
  // Estados visuales basados en el estado SUNAT
  const getEstadoVisual = () => {
    const status = comprobante.sunat_status;
    const color = estadoSunatColor[status] || 'blue-gray';
    const label = estadoSunatLabel[status] || status;
    
    let icon = null;
    if (status === 'ACCEPTED') {
      icon = <CheckCircleIcon className="h-5 w-5" />;
    } else if (status === 'REJECTED' || status === 'ERROR' || status === 'VOIDED') {
      icon = <ExclamationCircleIcon className="h-5 w-5" />;
    } else {
      icon = <ClockIcon className="h-5 w-5" />;
    }
    
    return { color, label, icon };
  };
  
  const estadoVisual = getEstadoVisual();
  
  return (
    <div className="mt-12">
      {showAlert && (
        <Alert
          color={alertType === 'success' ? 'green' : 
                alertType === 'error' ? 'red' : 
                alertType === 'warning' ? 'amber' : 'blue'}
          icon={<InformationCircleIcon className="h-6 w-6" />}
          className="mb-4"
          dismissible={{
            onClose: () => setShowAlert(false),
          }}
        >
          {alertMessage}
        </Alert>
      )}
      
      <div className="mb-6 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="text" 
              className="flex items-center gap-2" 
              onClick={handleVolver}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              Volver
            </Button>
            <Typography variant="h5" color="blue-gray">
              {documentTypeLabels[comprobante.document_type_code]} {formatSeriesNumber(comprobante.series, comprobante.number)}
            </Typography>
            <Chip
              variant="gradient"
              color={estadoVisual.color}
              value={estadoVisual.label}
              icon={estadoVisual.icon}
              className="ml-2"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              className="flex items-center gap-2" 
              size="sm"
              variant="outlined"
              onClick={handleImprimir}
            >
              <PrinterIcon strokeWidth={2} className="h-4 w-4" />
              Imprimir
            </Button>
            
            <Tooltip content="Descargar XML">
              <IconButton 
                variant="outlined" 
                size="sm"
                onClick={handleDescargarXML}
              >
                <DocumentArrowDownIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            
            <Tooltip content="Descargar CDR">
              <IconButton 
                variant="outlined" 
                size="sm"
                onClick={handleDescargarCDR}
                color="green"
              >
                <DocumentArrowDownIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            
            <Tooltip content="Enviar por Email">
              <IconButton 
                variant="outlined" 
                size="sm"
                onClick={handleEnviarEmail}
              >
                <EnvelopeIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-2 overflow-hidden border border-blue-gray-100 shadow-sm">
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              <Tab value="informacion">
                Información
              </Tab>
              <Tab value="items">
                Detalle
              </Tab>
              <Tab value="historial">
                Historial
              </Tab>
              <Tab value="relacionados">
                Docs. Relacionados
              </Tab>
              <Tab value="pagos">
                Pagos
              </Tab>
            </TabsHeader>
            
            <TabsBody animate={{
              initial: {opacity: 0},
              mount: {opacity: 1},
              unmount: {opacity: 0},
            }}>
              {/* Tab de Información General */}
              <TabPanel value="informacion" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Datos del Emisor
                    </Typography>
                    <div className="border border-blue-gray-100 rounded-md p-4">
                      <Typography variant="small" className="font-bold">
                        {comprobante.company.business_name}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        RUC: {comprobante.company.ruc}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        Dirección: {comprobante.company.address}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        Email: {comprobante.company.email}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        Teléfono: {comprobante.company.phone}
                      </Typography>
                    </div>
                  </div>
                  
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Datos del Cliente
                    </Typography>
                    <div className="border border-blue-gray-100 rounded-md p-4">
                      <Typography variant="small" className="font-bold">
                        {comprobante.client.name}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        {comprobante.client.doc_type === '6' ? 'RUC: ' : 'DOC: '}
                        {comprobante.client.doc_number}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        Dirección: {comprobante.client.address}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        Email: {comprobante.client.email}
                      </Typography>
                      <Typography variant="small" className="text-blue-gray-600 mt-1">
                        Teléfono: {comprobante.client.phone}
                      </Typography>
                    </div>
                  </div>
                  
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Datos del Comprobante
                    </Typography>
                    <div className="border border-blue-gray-100 rounded-md p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Typography variant="small" className="text-blue-gray-600 font-bold">
                            Fecha de Emisión:
                          </Typography>
                          <Typography variant="small">
                            {formatDate(comprobante.issue_date)}
                          </Typography>
                        </div>
                        
                        {comprobante.due_date && (
                          <div>
                            <Typography variant="small" className="text-blue-gray-600 font-bold">
                              Fecha de Vencimiento:
                            </Typography>
                            <Typography variant="small">
                              {formatDate(comprobante.due_date)}
                            </Typography>
                          </div>
                        )}
                        
                        <div>
                          <Typography variant="small" className="text-blue-gray-600 font-bold">
                            Moneda:
                          </Typography>
                          <Typography variant="small">
                            {comprobante.currency_code === 'PEN' ? 'Soles (PEN)' : 'Dólares (USD)'}
                          </Typography>
                        </div>
                        
                        <div>
                          <Typography variant="small" className="text-blue-gray-600 font-bold">
                            Condición de Pago:
                          </Typography>
                          <Typography variant="small">
                            {comprobante.payment_terms === 'CONTADO' ? 'Contado' : 
                             comprobante.payment_terms === 'CREDITO_30' ? 'Crédito 30 días' : 
                             comprobante.payment_terms}
                          </Typography>
                        </div>
                      </div>
                      
                      {comprobante.notes && (
                        <div className="mt-3">
                          <Typography variant="small" className="text-blue-gray-600 font-bold">
                            Observaciones:
                          </Typography>
                          <Typography variant="small">
                            {comprobante.notes}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Respuesta SUNAT
                    </Typography>
                    <div className="border border-blue-gray-100 rounded-md p-4">
                      <Typography variant="small" className="text-blue-gray-600 font-bold">
                        Estado:
                      </Typography>
                      <Chip
                        variant="gradient"
                        color={estadoVisual.color}
                        value={estadoVisual.label}
                        icon={estadoVisual.icon}
                        className="mt-1 mb-2"
                      />
                      
                      {comprobante.sunat_response_description && (
                        <div className="mt-2">
                          <Typography variant="small" className="text-blue-gray-600 font-bold">
                            Respuesta:
                          </Typography>
                          <Typography variant="small">
                            {comprobante.sunat_response_description}
                          </Typography>
                        </div>
                      )}
                      
                      {comprobante.sunat_observations && (
                        <div className="mt-2">
                          <Typography variant="small" className="text-blue-gray-600 font-bold">
                            Observaciones:
                          </Typography>
                          <Typography variant="small">
                            {comprobante.sunat_observations}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              
              {/* Tab de Detalle de Items */}
              <TabPanel value="items" className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Detalle de Productos y Servicios
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            #
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            Descripción
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            Cantidad
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            Unidad
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            P. Unitario
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            Descuento
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            IGV
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            Total
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comprobante.items.map((item) => (
                        <tr key={item.id}>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.item_order}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.product_name}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.quantity}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {unitLabels[item.unit_code] || item.unit_code}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {formatCurrency(item.unit_price)}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography 
                              variant="small" 
                              color={item.discount > 0 ? "red" : "blue-gray"}
                              className="font-normal"
                            >
                              {item.discount > 0 ? formatCurrency(item.discount) : '-'}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {formatCurrency(item.igv_amount)}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography variant="small" color="blue-gray" className="font-bold">
                              {formatCurrency(item.total_line)}
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              
              {/* Tab de Historial */}
              <TabPanel value="historial" className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Historial del Comprobante
                </Typography>
                <div className="border border-blue-gray-100 rounded-md">
                  <ul className="divide-y divide-blue-gray-100">
                    {comprobante.events.map((event) => (
                      <li key={event.id} className="p-4">
                        <div className="flex items-start">
                          <div className="mr-4 rounded-full bg-blue-gray-50 p-2">
                            <ClockIcon className="h-5 w-5 text-blue-gray-700" />
                          </div>
                          <div>
                            <Typography variant="small" className="font-bold">
                              {event.event_type}
                            </Typography>
                            <Typography variant="small" className="text-blue-gray-600">
                              {formatDateTime(event.timestamp)}
                            </Typography>
                            <Typography variant="small" className="mt-1">
                              {event.details}
                            </Typography>
                            <Typography variant="small" className="text-blue-gray-600">
                              Usuario: {event.user_name}
                            </Typography>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
              
              {/* Tab de Documentos Relacionados */}
              <TabPanel value="relacionados" className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Documentos Relacionados
                </Typography>
                {comprobante.related_documents.length > 0 ? (
                  <div className="border border-blue-gray-100 rounded-md">
                    <ul className="divide-y divide-blue-gray-100">
                      {comprobante.related_documents.map((doc) => (
                        <li key={doc.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Typography variant="small" className="font-bold">
                                {doc.description}: {doc.series}-{doc.number}
                              </Typography>
                              <Typography variant="small" className="text-blue-gray-600">
                                Fecha: {formatDate(doc.date)}
                              </Typography>
                            </div>
                            <Button size="sm" variant="text">
                              Ver documento
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center p-6 border border-blue-gray-100 rounded-md">
                    <Typography>
                      No hay documentos relacionados
                    </Typography>
                  </div>
                )}
              </TabPanel>
              
              {/* Tab de Pagos */}
              <TabPanel value="pagos" className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Pagos Recibidos
                </Typography>
                {comprobante.payments.length > 0 ? (
                  <div className="border border-blue-gray-100 rounded-md mb-6">
                    <ul className="divide-y divide-blue-gray-100">
                      {comprobante.payments.map((payment) => (
                        <li key={payment.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Typography variant="small" className="font-bold">
                                {formatCurrency(payment.amount)}
                              </Typography>
                              <Typography variant="small" className="text-blue-gray-600">
                                Fecha: {formatDate(payment.payment_date)}
                              </Typography>
                              <Typography variant="small" className="text-blue-gray-600">
                                Método: {payment.payment_method}
                              </Typography>
                              {payment.reference && (
                                <Typography variant="small" className="text-blue-gray-600">
                                  Referencia: {payment.reference}
                                </Typography>
                              )}
                            </div>
                            <Button size="sm" variant="text">
                              Ver detalle
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center p-6 border border-blue-gray-100 rounded-md mb-6">
                    <Typography>
                      No hay pagos registrados
                    </Typography>
                  </div>
                )}
                
                <div className="bg-blue-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="small" className="font-bold">
                        Total del Comprobante:
                      </Typography>
                      <Typography variant="h6" color="blue-gray">
                        {formatCurrency(comprobante.total_payable)}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="small" className="font-bold">
                        Total Pagado:
                      </Typography>
                      <Typography variant="h6" color="green">
                        {formatCurrency(comprobante.payments.reduce((sum, payment) => sum + payment.amount, 0))}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="small" className="font-bold">
                        Saldo Pendiente:
                      </Typography>
                      <Typography variant="h6" color={getSaldoPendiente() > 0 ? "red" : "green"}>
                        {formatCurrency(getSaldoPendiente())}
                      </Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
        
        {/* Tarjeta de resumen y acciones */}
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="blue-gray"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="white">
              Resumen del Comprobante
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Typography variant="small" color="blue-gray">
                  Subtotal:
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  {formatCurrency(comprobante.total_taxable)}
                </Typography>
              </div>
              
              {comprobante.total_discount > 0 && (
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    Descuento:
                  </Typography>
                  <Typography variant="h6" color="red">
                    -{formatCurrency(comprobante.total_discount)}
                  </Typography>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <Typography variant="small" color="blue-gray">
                  IGV (18%):
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  {formatCurrency(comprobante.total_igv)}
                </Typography>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-blue-gray-50">
                <Typography variant="lead" color="blue-gray" className="font-semibold">
                  Total:
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {formatCurrency(comprobante.total_payable)}
                </Typography>
              </div>
              
              <div className="flex justify-center pt-2">
                <Typography variant="small" className="text-center italic">
                  {comprobante.total_in_words}
                </Typography>
              </div>
              
              {getSaldoPendiente() > 0 && (
                <div className="flex justify-between items-center bg-red-50 p-3 rounded-md">
                  <Typography variant="small" color="red" className="font-semibold">
                    Saldo Pendiente:
                  </Typography>
                  <Typography variant="h6" color="red">
                    {formatCurrency(getSaldoPendiente())}
                  </Typography>
                </div>
              )}
            </div>
          </CardBody>
          
          <CardFooter className="p-6">
            <Typography variant="small" color="blue-gray" className="font-semibold mb-4">
              Acciones disponibles
            </Typography>
            <div className="flex flex-col gap-3">
              {comprobante.sunat_status === 'ACCEPTED' && (
                <Button
                  color="red"
                  className="flex items-center justify-center gap-3 normal-case"
                  onClick={handleCrearNotaCredito}
                >
                  <ReceiptRefundIcon strokeWidth={2} className="h-5 w-5" />
                  Crear Nota de Crédito
                </Button>
              )}
              
              <Button
                color="blue-gray"
                variant="outlined"
                className="flex items-center justify-center gap-3 normal-case"
                onClick={handleEmitirCopia}
              >
                <DocumentDuplicateIcon strokeWidth={2} className="h-5 w-5" />
                Emitir Copia
              </Button>
              
              {comprobante.sunat_status === 'ACCEPTED' && (
                <Button
                  color="red"
                  variant="outlined"
                  className="flex items-center justify-center gap-3 normal-case"
                  onClick={handleAnular}
                >
                  <ArchiveBoxXMarkIcon strokeWidth={2} className="h-5 w-5" />
                  Anular Comprobante
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}