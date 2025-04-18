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
  DocumentTextIcon,
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

// Productos para agregar a la nota de débito
const productos = [
  {
    id: 1,
    internal_code: 'P001',
    name: 'Transporte de carga - Ruta Iquitos-Pucallpa',
    description: 'Servicio de transporte fluvial de carga general',
    item_type: 'SERVICE',
    unit_code: 'ZZ',
    sale_price: 1200.00,
    currency_code: 'PEN',
    tax_category_code: '10'  // IGV Afecto - Operación Onerosa
  },
  {
    id: 2,
    internal_code: 'P002',
    name: 'Transporte de carga - Ruta Pucallpa-Iquitos',
    description: 'Servicio de transporte fluvial de carga general',
    item_type: 'SERVICE',
    unit_code: 'ZZ',
    sale_price: 1200.00,
    currency_code: 'PEN',
    tax_category_code: '10'
  },
  {
    id: 3,
    internal_code: 'P003',
    name: 'Transporte de pasajeros - Ruta Iquitos-Pucallpa',
    description: 'Servicio de transporte fluvial de pasajeros',
    item_type: 'SERVICE',
    unit_code: 'ZZ',
    sale_price: 350.00,
    currency_code: 'PEN',
    tax_category_code: '10'
  },
  {
    id: 4,
    internal_code: 'P007',
    name: 'Intereses por pago tardío',
    description: 'Intereses por retraso en el pago',
    item_type: 'SERVICE',
    unit_code: 'ZZ',
    sale_price: 0.00, // El precio se establece manualmente
    currency_code: 'PEN',
    tax_category_code: '10'
  },
  {
    id: 5,
    internal_code: 'P008',
    name: 'Penalidad por incumplimiento de contrato',
    description: 'Penalidad por incumplimiento de términos contractuales',
    item_type: 'SERVICE',
    unit_code: 'ZZ',
    sale_price: 0.00, // El precio se establece manualmente
    currency_code: 'PEN',
    tax_category_code: '10'
  }
];

// Tipos de Nota de Débito según Catálogo 10 de SUNAT
const tiposNotaDebito = [
  { code: '01', name: 'Intereses por mora' },
  { code: '02', name: 'Aumento en el valor' },
  { code: '03', name: 'Penalidades/ otros conceptos' },
  { code: '11', name: 'Ajustes de operaciones de exportación' },
  { code: '12', name: 'Ajustes afectos al IVAP' }
];

// Add named export alongside default export
export function NotaDebito() {
  return <FormularioNotaDebito />;
}

// Keep the existing component but make it a regular function
function FormularioNotaDebito() {
  // Estado principal del formulario
  const [notaDebitoData, setNotaDebitoData] = useState({
    // Datos del comprobante
    document_type_code: '08', // Nota de Débito
    series: 'FD01',
    number: 16, // Esto vendría de la API con la numeración correcta
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
    
    // Motivo de la nota de débito
    debit_note_type_code: '',
    reason: '',
    
    // Items de la nota de débito (se agregan manualmente)
    items: [{
      product_id: null,
      quantity: 1,
      unit_code: 'ZZ',
      unit_price: 0,
      tax_category_code: '10',
      igv_percentage: 18.00,
      discount: 0,
      subtotal: 0,
      igv_amount: 0,
      total_line: 0
    }],
    
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
  
  // Estado para alertas y validación
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Efectos
  useEffect(() => {
    // Recalcular totales cuando cambian los items
    recalcularTotales();
  }, [notaDebitoData.items]);
  
  useEffect(() => {
    // Validar formulario cuando cambian datos importantes
    validateForm();
  }, [
    notaDebitoData.affected_document_type_code,
    notaDebitoData.debit_note_type_code,
    notaDebitoData.reason,
    notaDebitoData.items,
    notaDebitoData.total_payable
  ]);
  
  // Función para validar el formulario
  const validateForm = () => {
    if (!notaDebitoData.affected_document_type_code) {
      setFormValid(false);
      return;
    }
    
    if (!notaDebitoData.debit_note_type_code) {
      setFormValid(false);
      return;
    }
    
    if (!notaDebitoData.reason || notaDebitoData.reason.trim() === '') {
      setFormValid(false);
      return;
    }
    
    if (notaDebitoData.items.length === 0) {
      setFormValid(false);
      return;
    }
    
    // Verificar que todos los items tengan producto, cantidad y precio
    const invalidItems = notaDebitoData.items.filter(item => 
      !item.product_id || item.quantity <= 0 || item.unit_price <= 0
    );
    
    if (invalidItems.length > 0) {
      setFormValid(false);
      return;
    }
    
    if (notaDebitoData.total_payable <= 0) {
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
    setNotaDebitoData({
      ...notaDebitoData,
      affected_document_type_code: documento.document_type_code,
      affected_document_series: documento.series,
      affected_document_number: documento.number,
      client_id: documento.client_id,
      client_doc_type: documento.client_doc_type,
      client_doc_number: documento.client_doc_number,
      client_name: documento.client_name,
      client_address: documento.client_address,
      currency_code: documento.currency_code,
      items: [{
        product_id: null,
        quantity: 1,
        unit_code: 'ZZ',
        unit_price: 0,
        tax_category_code: '10',
        igv_percentage: 18.00,
        discount: 0,
        subtotal: 0,
        igv_amount: 0,
        total_line: 0
      }]
    });
    
    setDocumentoSearch('');
    setShowDocumentoSearch(false);
  };
  
  // Manejadores para los items
  const handleAddItem = () => {
    setNotaDebitoData({
      ...notaDebitoData,
      items: [
        ...notaDebitoData.items,
        {
          product_id: null,
          quantity: 1,
          unit_code: 'ZZ',
          unit_price: 0,
          tax_category_code: '10',
          igv_percentage: 18.00,
          discount: 0,
          subtotal: 0,
          igv_amount: 0,
          total_line: 0
        }
      ]
    });
  };
  
  const handleRemoveItem = (index) => {
    if (notaDebitoData.items.length > 1) {
      const newItems = [...notaDebitoData.items];
      newItems.splice(index, 1);
      setNotaDebitoData({
        ...notaDebitoData,
        items: newItems
      });
    }
  };
  
  const handleItemChange = (index, field, value) => {
    const newItems = [...notaDebitoData.items];
    
    // Si cambia el producto, actualizamos más campos
    if (field === 'product_id') {
      const selectedProduct = productos.find(product => product.id === parseInt(value));
      if (selectedProduct) {
        newItems[index] = {
          ...newItems[index],
          product_id: selectedProduct.id,
          unit_code: selectedProduct.unit_code,
          tax_category_code: selectedProduct.tax_category_code
        };
        
        // Si tiene precio predefinido, lo asignamos
        if (selectedProduct.sale_price > 0) {
          newItems[index].unit_price = selectedProduct.sale_price;
        }
        
        // Recalcular el item
        calcularItem(newItems[index]);
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
      
      // Para cantidad, precio, o descuento, recalculamos
      if (['quantity', 'unit_price', 'discount'].includes(field)) {
        calcularItem(newItems[index]);
      }
    }
    
    setNotaDebitoData({
      ...notaDebitoData,
      items: newItems
    });
  };
  
  // Funciones de cálculo
  const calcularItem = (item) => {
    if (!item.quantity || !item.unit_price) {
      item.subtotal = 0;
      item.igv_amount = 0;
      item.total_line = 0;
      return;
    }
    
    // Calcular subtotal (sin IGV)
    item.subtotal = item.quantity * item.unit_price - (item.discount || 0);
    
    // Calcular IGV (18%)
    if (item.tax_category_code === '10') {
      item.igv_amount = item.subtotal * 0.18;
    } else {
      item.igv_amount = 0;
    }
    
    // Calcular total
    item.total_line = item.subtotal + item.igv_amount;
  };
  
  const recalcularTotales = () => {
    let totalTaxable = 0;
    let totalIgv = 0;
    let totalDiscount = 0;
    let totalPayable = 0;
    
    notaDebitoData.items.forEach(item => {
      if (item.tax_category_code === '10') {
        totalTaxable += item.subtotal;
      }
      totalIgv += item.igv_amount;
      totalDiscount += item.discount || 0;
      totalPayable += item.total_line;
    });
    
    setNotaDebitoData({
      ...notaDebitoData,
      total_taxable: totalTaxable,
      total_igv: totalIgv,
      total_discount: totalDiscount,
      total_payable: totalPayable
    });
  };
  
  // Formateo de números a moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: notaDebitoData.currency_code,
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
    console.log("Datos de la nota de débito:", notaDebitoData);
    setAlertMessage('Nota de débito generada correctamente');
    setAlertType('success');
    setShowAlert(true);
    
    // En una app real, redirigir a la página de detalles después de guardar
  };
  
  // Limpiar todo el formulario
  const handleClear = () => {
    setNotaDebitoData({
      document_type_code: '08',
      series: 'FD01',
      number: 16,
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
      debit_note_type_code: '',
      reason: '',
      items: [{
        product_id: null,
        quantity: 1,
        unit_code: 'ZZ',
        unit_price: 0,
        tax_category_code: '10',
        igv_percentage: 18.00,
        discount: 0,
        subtotal: 0,
        igv_amount: 0,
        total_line: 0
      }],
      total_taxable: 0,
      total_igv: 0,
      total_payable: 0
    });
    setDocumentoAfectado(null);
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
            Emitir Nota de Débito
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
          Complete los datos para generar una Nota de Débito electrónica
        </Typography>
      </div>
      
      <div className="mb-12 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {/* Datos de la Nota de Débito */}
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm mb-6">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Datos de la Nota de Débito
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
                      value={notaDebitoData.series} 
                      readOnly
                      className="mb-4"
                    />
                  </div>
                  <Input 
                    label="Número" 
                    value={notaDebitoData.number} 
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
                    value={notaDebitoData.issue_date}
                    onChange={(e) => setNotaDebitoData({...notaDebitoData, issue_date: e.target.value})}
                    className="mb-4"
                  />
                  <Select 
                    label="Moneda" 
                    value={notaDebitoData.currency_code}
                    onChange={(val) => setNotaDebitoData({...notaDebitoData, currency_code: val})}
                    disabled={documentoAfectado !== null}
                  >
                    <Option value="PEN">Soles (PEN)</Option>
                    <Option value="USD">Dólares (USD)</Option>
                  </Select>
                </div>
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Tipo de Nota de Débito
                  </Typography>
                  <Select 
                    label="Seleccione el motivo" 
                    value={notaDebitoData.debit_note_type_code}
                    onChange={(val) => setNotaDebitoData({...notaDebitoData, debit_note_type_code: val})}
                  >
                    {tiposNotaDebito.map((tipo) => (
                      <Option key={tipo.code} value={tipo.code}>
                        {tipo.code} - {tipo.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mt-4">
                    <Textarea 
                      label="Descripción del motivo" 
                      value={notaDebitoData.reason}
                      onChange={(e) => setNotaDebitoData({...notaDebitoData, reason: e.target.value})}
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
                  Items de la Nota de Débito
                </Typography>
                <Button 
                  className="flex items-center gap-2" 
                  size="sm"
                  onClick={handleAddItem}
                >
                  <PlusIcon strokeWidth={3} className="h-4 w-4" />
                  Agregar Ítem
                </Button>
              </CardHeader>
              <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["#", "Concepto", "Cantidad", "Precio Unitario", "IGV", "Subtotal", ""].map(
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
                    {notaDebitoData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Select 
                            label="Seleccionar concepto"
                            value={item.product_id ? item.product_id.toString() : ''}
                            onChange={(val) => handleItemChange(index, 'product_id', val)}
                          >
                            {productos.map((producto) => (
                              <Option key={producto.id} value={producto.id.toString()}>
                                {producto.name}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-24">
                          <Input
                            type="number"
                            label="Cantidad"
                            value={item.quantity}
                            min="1"
                            step="1"
                            onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-32">
                          <Input
                            type="number"
                            label="Precio"
                            value={item.unit_price}
                            onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                          />
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
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <IconButton
                            variant="text"
                            color="red"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
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
              color="amber"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="white">
                Resumen de Nota de Débito
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    Subtotal:
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    {formatCurrency(notaDebitoData.total_taxable)}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    IGV (18%):
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    {formatCurrency(notaDebitoData.total_igv)}
                  </Typography>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-blue-gray-50">
                  <Typography variant="lead" color="blue-gray" className="font-semibold">
                    Total a adicionar:
                  </Typography>
                  <Typography variant="h5" color="amber">
                    {formatCurrency(notaDebitoData.total_payable)}
                  </Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="p-6">
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  color="amber"
                  className="mt-4 flex items-center justify-center gap-3"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!formValid}
                >
                  <DocumentTextIcon strokeWidth={2} className="h-5 w-5" />
                  Emitir Nota de Débito
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}