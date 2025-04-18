import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Chip,
  IconButton,
  Alert,
  Radio
} from "@material-tailwind/react";
import {
  TrashIcon,
  PlusIcon,
  ReceiptRefundIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  DocumentMagnifyingGlassIcon
} from "@heroicons/react/24/outline";

// Datos de ejemplo (en una implementación real, estos vendrían de una API)
const empresa = {
  id: 1,
  ruc: '20123456789',
  business_name: 'Transportes Romero S.A.C.',
  address: 'Av. La Marina 1234, Iquitos, Loreto',
  ubigeo: '160101'
};

// Comprobantes afectados (facturas y boletas emitidas)
const comprobantesAfectados = [
  {
    id: 1,
    document_type_code: '01',
    series: 'F001',
    number: 152,
    client_id: 1,
    client_name: 'Comercial Los Andes S.A.C.',
    client_doc_type: '6',
    client_doc_number: '20512376218',
    client_address: 'Av. La Marina 1234, San Miguel, Lima',
    issue_date: '2025-04-05',
    total_payable: 2850.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN',
    items: [
      {
        id: 1,
        product_id: 1,
        product_name: 'Transporte de carga - Ruta Iquitos-Pucallpa',
        quantity: 2,
        unit_code: 'ZZ',
        unit_price: 1200.00,
        tax_category_code: '10',
        igv_amount: 432.00,
        subtotal: 2400.00,
        total_line: 2832.00
      },
      {
        id: 2,
        product_id: 3,
        product_name: 'Transporte de pasajeros - Ruta Iquitos-Pucallpa',
        quantity: 1,
        unit_code: 'ZZ',
        unit_price: 350.00,
        tax_category_code: '10',
        igv_amount: 63.00,
        subtotal: 350.00,
        total_line: 413.00
      }
    ]
  },
  {
    id: 2,
    document_type_code: '03',
    series: 'B001',
    number: 243,
    client_id: 2,
    client_name: 'María Sánchez López',
    client_doc_type: '1',
    client_doc_number: '45678912',
    client_address: 'Jr. Huallaga 456, Iquitos',
    issue_date: '2025-04-05',
    total_payable: 450.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN',
    items: [
      {
        id: 1,
        product_id: 3,
        product_name: 'Transporte de pasajeros - Ruta Iquitos-Pucallpa',
        quantity: 1,
        unit_code: 'ZZ',
        unit_price: 350.00,
        tax_category_code: '10',
        igv_amount: 63.00,
        subtotal: 350.00,
        total_line: 413.00
      }
    ]
  }
];

// Tipos de Nota de Crédito según Catálogo 9 de SUNAT
const tiposNotaCredito = [
  { code: '01', name: 'Anulación de la operación' },
  { code: '02', name: 'Anulación por error en el RUC' },
  { code: '03', name: 'Corrección por error en la descripción' },
  { code: '04', name: 'Descuento global' },
  { code: '05', name: 'Descuento por ítem' },
  { code: '06', name: 'Devolución total' },
  { code: '07', name: 'Devolución por ítem' },
  { code: '08', name: 'Bonificación' },
  { code: '09', name: 'Disminución en el valor' },
  { code: '10', name: 'Otros conceptos' },
  { code: '11', name: 'Ajustes de operaciones de exportación' },
  { code: '12', name: 'Ajustes afectos al IVAP' }
];

// Add named export NotaCredito
export function NotaCredito() {
  return <FormularioNotaCredito />;
}

// Keep the existing component
function FormularioNotaCredito() {
  // Estado principal del formulario
  const [notaCreditoData, setNotaCreditoData] = useState({
    // Datos del comprobante
    document_type_code: '07', // Nota de Crédito
    series: 'FC01',
    number: 34, // Esto vendría de la API con la numeración correcta
    issue_date: new Date().toISOString().split('T')[0],
    currency_code: 'PEN',
    
    // Datos del documento afectado
    affected_document_type_code: '',
    affected_document_series: '',
    affected_document_number: '',
    
    // Datos del cliente (se toman del documento afectado)
    client_id: null,
    client_doc_type: '',
    client_doc_number: '',
    client_name: '',
    client_address: '',
    
    // Motivo de la nota de crédito
    credit_note_type_code: '',
    reason: '',
    
    // Items de la nota de crédito (se seleccionan del documento afectado)
    items: [],
    
    // Totales
    total_taxable: 0,
    total_igv: 0,
    total_payable: 0
  });
  
  // Estado para el documento afectado
  const [documentoAfectado, setDocumentoAfectado] = useState(null);
  const [showDocumentoSearch, setShowDocumentoSearch] = useState(false);
  const [documentoSearch, setDocumentoSearch] = useState('');
  const [documentosResults, setDocumentosResults] = useState([]);
  
  // Estado para manejo de ítems
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAllItems, setSelectAllItems] = useState(false);
  
  // Estado para alertas y validación
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Efectos
  useEffect(() => {
    // Actualizar items cuando cambia la selección
    if (documentoAfectado && selectedItems.length > 0) {
      const itemsSeleccionados = documentoAfectado.items.filter(item => 
        selectedItems.includes(item.id)
      );
      
      setNotaCreditoData({
        ...notaCreditoData,
        items: itemsSeleccionados
      });
    } else {
      setNotaCreditoData({
        ...notaCreditoData,
        items: []
      });
    }
  }, [selectedItems, documentoAfectado]);
  
  useEffect(() => {
    // Recalcular totales cuando cambian los items
    recalcularTotales();
  }, [notaCreditoData.items]);
  
  useEffect(() => {
    // Validar formulario cuando cambian datos importantes
    validateForm();
  }, [
    notaCreditoData.affected_document_type_code,
    notaCreditoData.credit_note_type_code,
    notaCreditoData.reason,
    notaCreditoData.items,
    notaCreditoData.total_payable
  ]);
  
  // Función para validar el formulario
  const validateForm = () => {
    if (!notaCreditoData.affected_document_type_code) {
      setFormValid(false);
      return;
    }
    
    if (!notaCreditoData.credit_note_type_code) {
      setFormValid(false);
      return;
    }
    
    if (!notaCreditoData.reason || notaCreditoData.reason.trim() === '') {
      setFormValid(false);
      return;
    }
    
    if (notaCreditoData.items.length === 0) {
      setFormValid(false);
      return;
    }
    
    if (notaCreditoData.total_payable <= 0) {
      setFormValid(false);
      return;
    }
    
    setFormValid(true);
  };
  
  // Manejadores de eventos para búsqueda de documento
  const handleDocumentoSearch = (e) => {
    const value = e.target.value;
    setDocumentoSearch(value);
    
    if (value.length > 2) {
      // En una aplicación real, esto sería una llamada a la API
      const results = comprobantesAfectados.filter(doc => 
        (doc.series + '-' + doc.number).includes(value) || 
        doc.client_name.toLowerCase().includes(value.toLowerCase())
      );
      
      setDocumentosResults(results);
      setShowDocumentoSearch(true);
    } else {
      setShowDocumentoSearch(false);
    }
  };
  
  // Función para seleccionar un documento
  const handleSelectDocumento = (documento) => {
    setDocumentoAfectado(documento);
    setNotaCreditoData({
      ...notaCreditoData,
      affected_document_type_code: documento.document_type_code,
      affected_document_series: documento.series,
      affected_document_number: documento.number,
      client_id: documento.client_id,
      client_doc_type: documento.client_doc_type,
      client_doc_number: documento.client_doc_number,
      client_name: documento.client_name,
      client_address: documento.client_address,
      currency_code: documento.currency_code
    });
    
    setDocumentoSearch('');
    setShowDocumentoSearch(false);
    setSelectedItems([]);
    setSelectAllItems(false);
  };
  
  // Manejar cambios en la selección de items
  const handleItemSelectionChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  
  // Manejar selección de todos los items
  const handleSelectAllItemsChange = () => {
    if (selectAllItems) {
      setSelectedItems([]);
    } else {
      setSelectedItems(documentoAfectado.items.map(item => item.id));
    }
    setSelectAllItems(!selectAllItems);
  };
  
  // Funciones de cálculo
  const recalcularTotales = () => {
    let totalTaxable = 0;
    let totalIgv = 0;
    let totalPayable = 0;
    
    notaCreditoData.items.forEach(item => {
      if (item.tax_category_code === '10') {
        totalTaxable += item.subtotal;
      }
      totalIgv += item.igv_amount;
      totalPayable += item.total_line;
    });
    
    setNotaCreditoData({
      ...notaCreditoData,
      total_taxable: totalTaxable,
      total_igv: totalIgv,
      total_payable: totalPayable
    });
  };
  
  // Formateo de números a moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: notaCreditoData.currency_code,
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Formatear series y número
  const formatSeriesNumber = (series, number) => {
    return `${series}-${number.toString().padStart(6, '0')}`;
  };
  
  // Obtener etiqueta de tipo de documento
  const getDocumentTypeLabel = (code) => {
    const labels = {
      '01': 'Factura',
      '03': 'Boleta',
      '07': 'Nota de Crédito',
      '08': 'Nota de Débito'
    };
    return labels[code] || code;
  };
  
  // Enviar formulario
  const handleSubmit = () => {
    if (!formValid) {
      setAlertMessage('Por favor complete todos los campos requeridos');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Aquí se enviaría el formulario a la API
    console.log("Datos de la nota de crédito:", notaCreditoData);
    setAlertMessage('Nota de crédito generada correctamente');
    setAlertType('success');
    setShowAlert(true);
    
    // En una app real, redirigir a la página de detalles después de guardar
  };
  
  // Limpiar todo el formulario
  const handleClear = () => {
    setNotaCreditoData({
      document_type_code: '07',
      series: 'FC01',
      number: 34,
      issue_date: new Date().toISOString().split('T')[0],
      currency_code: 'PEN',
      affected_document_type_code: '',
      affected_document_series: '',
      affected_document_number: '',
      client_id: null,
      client_doc_type: '',
      client_doc_number: '',
      client_name: '',
      client_address: '',
      credit_note_type_code: '',
      reason: '',
      items: [],
      total_taxable: 0,
      total_igv: 0,
      total_payable: 0
    });
    setDocumentoAfectado(null);
    setSelectedItems([]);
    setSelectAllItems(false);
  };
  
  return (
    <div className="mt-12">
      {showAlert && (
        <Alert
          color={alertType === 'success' ? 'green' : alertType === 'error' ? 'red' : 'blue'}
          icon={
            alertType === 'success' ? <CheckCircleIcon className="h-6 w-6" /> : 
            alertType === 'error' ? <ExclamationCircleIcon className="h-6 w-6" /> : 
            <ExclamationCircleIcon className="h-6 w-6" />
          }
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
          <Typography variant="h5" color="blue-gray">
            Emitir Nota de Crédito
          </Typography>
          <Button
            className="flex items-center gap-2"
            size="sm"
            color="red"
            variant="outlined"
            onClick={handleClear}
          >
            <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
            Limpiar Formulario
          </Button>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Complete los datos para generar una Nota de Crédito electrónica
        </Typography>
      </div>
      
      <div className="mb-12 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {/* Datos de la Nota de Crédito */}
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm mb-6">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Datos de la Nota de Crédito
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Serie y número
                  </Typography>
                  <div className="flex gap-2">
                    <Input 
                      label="Serie" 
                      value={notaCreditoData.series} 
                      readOnly
                      className="mb-4"
                    />
                  </div>
                  <Input 
                    label="Número" 
                    value={notaCreditoData.number} 
                    readOnly 
                  />
                </div>
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Fecha de emisión
                  </Typography>
                  <Input 
                    type="date" 
                    label="Fecha" 
                    value={notaCreditoData.issue_date}
                    onChange={(e) => setNotaCreditoData({...notaCreditoData, issue_date: e.target.value})}
                    className="mb-4"
                  />
                  <Select 
                    label="Moneda" 
                    value={notaCreditoData.currency_code}
                    onChange={(val) => setNotaCreditoData({...notaCreditoData, currency_code: val})}
                    disabled={documentoAfectado !== null}
                  >
                    <Option value="PEN">Soles (PEN)</Option>
                    <Option value="USD">Dólares (USD)</Option>
                  </Select>
                </div>
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Tipo de Nota de Crédito
                  </Typography>
                  <Select 
                    label="Seleccione el motivo" 
                    value={notaCreditoData.credit_note_type_code}
                    onChange={(val) => setNotaCreditoData({...notaCreditoData, credit_note_type_code: val})}
                  >
                    {tiposNotaCredito.map((tipo) => (
                      <Option key={tipo.code} value={tipo.code}>
                        {tipo.code} - {tipo.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mt-4">
                    <Textarea 
                      label="Descripción del motivo" 
                      value={notaCreditoData.reason}
                      onChange={(e) => setNotaCreditoData({...notaCreditoData, reason: e.target.value})}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Documento Afectado */}
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm mb-6">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Documento Afectado
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative md:col-span-2">
                  <Typography variant="small" className="font-medium mb-2">
                    Buscar documento (factura o boleta)
                  </Typography>
                  <Input 
                    label="Ingrese serie-número o nombre del cliente" 
                    value={documentoSearch}
                    onChange={handleDocumentoSearch}
                    icon={<MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />}
                    disabled={documentoAfectado !== null}
                  />
                  
                  {showDocumentoSearch && documentosResults.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-blue-gray-100 rounded-md shadow-md">
                      {documentosResults.map(doc => (
                        <div 
                          key={`${doc.series}-${doc.number}`}
                          className="p-2 hover:bg-blue-gray-50 cursor-pointer"
                          onClick={() => handleSelectDocumento(doc)}
                        >
                          <Typography variant="small" className="font-medium">
                            {getDocumentTypeLabel(doc.document_type_code)}: {formatSeriesNumber(doc.series, doc.number)}
                          </Typography>
                          <Typography variant="small" className="text-sm text-blue-gray-600">
                            Cliente: {doc.client_name} | Monto: {formatCurrency(doc.total_payable)}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {documentoAfectado && (
                  <>
                    <div>
                      <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Comprobante Seleccionado
                      </Typography>
                      <div className="p-4 border border-blue-gray-100 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <Typography variant="small" className="font-bold">
                            {getDocumentTypeLabel(documentoAfectado.document_type_code)}:
                          </Typography>
                          <Typography variant="small" className="font-bold">
                            {formatSeriesNumber(documentoAfectado.series, documentoAfectado.number)}
                          </Typography>
                        </div>
                        <div className="mb-2">
                          <Typography variant="small" className="text-blue-gray-600">
                            Fecha de Emisión: {documentoAfectado.issue_date}
                          </Typography>
                        </div>
                        <div className="mb-2">
                          <Typography variant="small" className="text-blue-gray-600">
                            Total: {formatCurrency(documentoAfectado.total_payable)}
                          </Typography>
                        </div>
                        <Button 
                          size="sm" 
                          variant="text" 
                          className="mt-2 flex items-center gap-2 p-0"
                          onClick={() => setDocumentoAfectado(null)}
                        >
                          <TrashIcon className="h-4 w-4" />
                          Cambiar comprobante
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Cliente
                      </Typography>
                      <div className="p-4 border border-blue-gray-100 rounded-md">
                        <Typography variant="small" className="font-bold mb-2">
                          {documentoAfectado.client_name}
                        </Typography>
                        <Typography variant="small" className="text-blue-gray-600 mb-1">
                          {documentoAfectado.client_doc_type === '6' ? 'RUC: ' : 'DNI: '}
                          {documentoAfectado.client_doc_number}
                        </Typography>
                        <Typography variant="small" className="text-blue-gray-600">
                          Dirección: {documentoAfectado.client_address}
                        </Typography>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
          
          {/* Detalle de Items */}
          {documentoAfectado && (
            <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Seleccione los ítems a incluir en la Nota de Crédito
                </Typography>
              </CardHeader>
              <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="select-all"
                            checked={selectAllItems}
                            onChange={handleSelectAllItemsChange}
                          />
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            Seleccionar
                          </Typography>
                        </div>
                      </th>
                      {["Producto/Servicio", "Cantidad", "Precio Unit.", "IGV", "Subtotal"].map(
                        (el, i) => (
                          <th
                            key={i}
                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {documentoAfectado.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Radio
                            id={`item-${item.id}`}
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemSelectionChange(item.id)}
                          />
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.product_name}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-24">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.quantity}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-32">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatCurrency(item.unit_price)}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatCurrency(item.igv_amount)}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {formatCurrency(item.total_line)}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          )}
        </div>
        
        {/* Resumen y totales */}
        <div>
          <Card className="sticky top-4 overflow-hidden border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="red"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="white">
                Resumen de Nota de Crédito
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    Subtotal:
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    {formatCurrency(notaCreditoData.total_taxable)}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    IGV (18%):
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    {formatCurrency(notaCreditoData.total_igv)}
                  </Typography>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-blue-gray-50">
                  <Typography variant="lead" color="blue-gray" className="font-semibold">
                    Total a devolver:
                  </Typography>
                  <Typography variant="h5" color="red">
                    {formatCurrency(notaCreditoData.total_payable)}
                  </Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="p-6">
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  color="red"
                  className="mt-4 flex items-center justify-center gap-3"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!formValid}
                >
                  <ReceiptRefundIcon strokeWidth={2} className="h-5 w-5" />
                  Emitir Nota de Crédito
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Export both
export default NotaCredito;