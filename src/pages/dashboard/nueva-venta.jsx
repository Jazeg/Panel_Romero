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
  Radio,
  Chip,
  IconButton,
  Tabs,
  TabsHeader,
  Tab,
  Alert
} from "@material-tailwind/react";
import {
  TrashIcon,
  PlusIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

// Datos de ejemplo (en una implementación real, estos vendrían de una API)
const empresa = {
  id: 1,
  ruc: '20123456789',
  business_name: 'Transportes Romero S.A.C.',
  address: 'Av. La Marina 1234, Iquitos, Loreto',
  ubigeo: '160101'
};

const tiposComprobante = [
  { code: '01', name: 'Factura' },
  { code: '03', name: 'Boleta' }
];

const clientes = [
  {
    id: 1,
    doc_type: '6',
    doc_number: '20512376218',
    name: 'Comercial Los Andes S.A.C.',
    address: 'Av. La Marina 1234, San Miguel, Lima',
    email: 'contacto@losandes.com.pe',
    phone: '01-456-7890'
  },
  {
    id: 2,
    doc_type: '1',
    doc_number: '45678912',
    name: 'María Sánchez López',
    address: 'Jr. Huallaga 456, Iquitos',
    email: 'maria.sanchez@gmail.com',
    phone: '965-432-187'
  },
  {
    id: 3,
    doc_type: '6',
    doc_number: '20493817265',
    name: 'Inversiones del Oriente E.I.R.L.',
    address: 'Av. Abelardo Quiñones 789, Iquitos',
    email: 'inversionesoriente@gmail.com',
    phone: '065-23-4567'
  }
];

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
  }
];

const tipoDocumentoCliente = {
  '1': 'DNI',
  '4': 'Carnet de Extranjería',
  '6': 'RUC',
  '7': 'Pasaporte',
  '0': 'Otros'
};

const unidadesMedida = {
  'NIU': 'Unidad',
  'ZZ': 'Servicio',
  'KGM': 'Kilogramo'
};

const formaPago = [
  { value: 'CONTADO', label: 'Contado' },
  { value: 'TRANSFERENCIA', label: 'Transferencia bancaria' },
  { value: 'TARJETA', label: 'Tarjeta de crédito/débito' },
  { value: 'CREDITO_30', label: 'Crédito a 30 días' },
  { value: 'CREDITO_60', label: 'Crédito a 60 días' }
];

// Add named export alongside default export
export function NuevaVenta() {
  return <FormularioNuevaVenta />;
}

// Keep the existing component but make it a regular function
function FormularioNuevaVenta() {
  // Estado principal del formulario
  const [facturaData, setFacturaData] = useState({
    // Datos del comprobante
    document_type_code: '01', // Por defecto Factura
    series: 'F001',
    number: 154, // Esto vendría de la API con la numeración correcta
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    operation_type_code: '0101', // Venta interna
    currency_code: 'PEN',
    
    // Datos del cliente
    client_id: null,
    client_doc_type: '6', // Por defecto RUC
    client_doc_number: '',
    client_name: '',
    client_address: '',
    client_email: '',
    
    // Datos de pago
    payment_terms: 'CONTADO',
    notes: '',
    
    // Items de la factura
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
    total_discount: 0,
    total_payable: 0
  });
  
  // Estado para búsqueda de cliente
  const [clienteSearch, setClienteSearch] = useState('');
  const [clientesResults, setClientesResults] = useState([]);
  const [showClienteResults, setShowClienteResults] = useState(false);
  
  // Estado para alertas y validación
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Efectos
  useEffect(() => {
    // Calcular totales cuando cambian los items
    recalcularTotales();
  }, [facturaData.items]);
  
  useEffect(() => {
    // Validar el formulario cuando cambian datos relevantes
    validateForm();
  }, [
    facturaData.client_doc_number, 
    facturaData.client_name, 
    facturaData.items, 
    facturaData.total_payable
  ]);
  
  // Función para validar el formulario completo
  const validateForm = () => {
    if (!facturaData.client_name || facturaData.client_name.trim() === '') {
      setFormValid(false);
      return;
    }
    
    if (facturaData.document_type_code === '01' && !facturaData.client_doc_number.match(/^[0-9]{11}$/)) {
      setFormValid(false);
      return;
    }
    
    if (facturaData.document_type_code === '03' && facturaData.client_doc_type === '1' && 
        !facturaData.client_doc_number.match(/^[0-9]{8}$/)) {
      setFormValid(false);
      return;
    }
    
    if (facturaData.items.length === 0) {
      setFormValid(false);
      return;
    }
    
    // Verificar que todos los items tengan producto y cantidad
    const invalidItems = facturaData.items.filter(item => 
      !item.product_id || item.quantity <= 0
    );
    
    if (invalidItems.length > 0) {
      setFormValid(false);
      return;
    }
    
    if (facturaData.total_payable <= 0) {
      setFormValid(false);
      return;
    }
    
    setFormValid(true);
  };
  
  // Manejadores de eventos para el formulario principal
  const handleTipoComprobanteChange = (value) => {
    const newSeries = value === '01' ? 'F001' : 'B001';
    const newNumber = value === '01' ? 154 : 245; // Esto vendría de la API
    
    // Si cambia de Boleta a Factura y el cliente tiene DNI, limpiamos
    if (value === '01' && facturaData.client_doc_type === '1') {
      setFacturaData({
        ...facturaData,
        document_type_code: value,
        series: newSeries,
        number: newNumber,
        client_id: null,
        client_doc_type: '6',
        client_doc_number: '',
        client_name: '',
        client_address: ''
      });
    } else if (value === '03' && facturaData.client_doc_type === '6') {
      // Si cambia de Factura a Boleta y el cliente tiene RUC, limpiamos
      setFacturaData({
        ...facturaData,
        document_type_code: value,
        series: newSeries,
        number: newNumber,
        client_id: null,
        client_doc_type: '1',
        client_doc_number: '',
        client_name: '',
        client_address: ''
      });
    } else {
      // Solo actualizamos el tipo de documento
      setFacturaData({
        ...facturaData,
        document_type_code: value,
        series: newSeries,
        number: newNumber
      });
    }
  };
  
  const handleTipoDocumentoClienteChange = (value) => {
    setFacturaData({
      ...facturaData,
      client_id: null,
      client_doc_type: value,
      client_doc_number: '',
      client_name: '',
      client_address: ''
    });
  };
  
  const handleClientSearch = (e) => {
    const value = e.target.value;
    setClienteSearch(value);
    
    if (value.length > 2) {
      // En una aplicación real, esto sería una llamada a la API
      const results = clientes.filter(cliente => 
        cliente.name.toLowerCase().includes(value.toLowerCase()) || 
        cliente.doc_number.includes(value)
      );
      
      setClientesResults(results);
      setShowClienteResults(true);
    } else {
      setShowClienteResults(false);
    }
  };
  
  const handleSelectCliente = (cliente) => {
    // Verificar que el tipo de documento coincida con el tipo de comprobante
    if (facturaData.document_type_code === '01' && cliente.doc_type !== '6') {
      setAlertMessage('Para facturas, el cliente debe tener RUC');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    setFacturaData({
      ...facturaData,
      client_id: cliente.id,
      client_doc_type: cliente.doc_type,
      client_doc_number: cliente.doc_number,
      client_name: cliente.name,
      client_address: cliente.address,
      client_email: cliente.email
    });
    
    setClienteSearch('');
    setShowClienteResults(false);
  };
  
  // Manejadores para los items
  const handleAddItem = () => {
    setFacturaData({
      ...facturaData,
      items: [
        ...facturaData.items,
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
    if (facturaData.items.length > 1) {
      const newItems = [...facturaData.items];
      newItems.splice(index, 1);
      setFacturaData({
        ...facturaData,
        items: newItems
      });
    }
  };
  
  const handleItemChange = (index, field, value) => {
    const newItems = [...facturaData.items];
    
    // Si cambia el producto, actualizamos más campos
    if (field === 'product_id') {
      const selectedProduct = productos.find(product => product.id === parseInt(value));
      if (selectedProduct) {
        newItems[index] = {
          ...newItems[index],
          product_id: selectedProduct.id,
          unit_code: selectedProduct.unit_code,
          unit_price: selectedProduct.sale_price,
          tax_category_code: selectedProduct.tax_category_code
        };
        
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
    
    setFacturaData({
      ...facturaData,
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
    
    facturaData.items.forEach(item => {
      if (item.tax_category_code === '10') {
        totalTaxable += item.subtotal;
      }
      totalIgv += item.igv_amount;
      totalDiscount += item.discount || 0;
      totalPayable += item.total_line;
    });
    
    setFacturaData({
      ...facturaData,
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
      currency: facturaData.currency_code,
      minimumFractionDigits: 2
    }).format(amount);
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
    console.log("Datos de la factura:", facturaData);
    setAlertMessage('Comprobante generado correctamente');
    setAlertType('success');
    setShowAlert(true);
    
    // En una app real, redirigir a la página de detalles después de guardar
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
            Emitir Nuevo Comprobante
          </Typography>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Complete todos los datos para generar un comprobante electrónico (Factura o Boleta)
        </Typography>
      </div>
      
      <div className="mb-12 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {/* Datos del comprobante */}
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm mb-6">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Datos del Comprobante
              </Typography>
              <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {tiposComprobante.map((tipo) => (
                      <div key={tipo.code} className="flex items-center gap-2">
                        <Radio 
                          name="document_type_code" 
                          id={`tipo-${tipo.code}`} 
                          label={tipo.name} 
                          checked={facturaData.document_type_code === tipo.code}
                          onChange={() => handleTipoComprobanteChange(tipo.code)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-6 gap-2 w-full">
                    <div className="md:w-1/3 w-full md:max-w-[100px]">
                      <Input 
                        label="Serie" 
                        value={facturaData.series} 
                        readOnly
                      />
                    </div>
                    <div className="md:w-2/3 w-full md:max-w-[180px]">
                      <Input label="Número" value={facturaData.number} readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              {/* Datos del cliente */}
              <div className="mt-6">
                <Typography variant="small" className="font-medium mb-2">
                  Cliente
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <Select 
  label="Tipo de documento" 
  value={facturaData.client_doc_type}
  onChange={(val) => handleTipoDocumentoClienteChange(val)}
>
  {/* Always render all options to avoid children warning */}
  {facturaData.document_type_code === '01' ? (
    <Option value="6">{tipoDocumentoCliente['6']} - RUC</Option>
  ) : null}
  {facturaData.document_type_code !== '01' && (
    <>
      <Option value="1">{tipoDocumentoCliente['1']} - DNI</Option>
      <Option value="4">{tipoDocumentoCliente['4']}</Option>
      <Option value="7">{tipoDocumentoCliente['7']}</Option>
      <Option value="0">{tipoDocumentoCliente['0']}</Option>
    </>
  )}
</Select>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      <Input
                        label="Número de documento"
                        value={facturaData.client_doc_number}
                        maxLength={facturaData.client_doc_type === '6' ? 11 : 8}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          let tipoComprobante = facturaData.document_type_code;
                          let tipoDocCliente = facturaData.client_doc_type;
                          if (value.length === 11) {
                            tipoComprobante = '01';
                            tipoDocCliente = '6';
                          } else if (value.length === 8) {
                            tipoComprobante = '03';
                            tipoDocCliente = '1';
                          }
                          setFacturaData({
                            ...facturaData,
                            client_doc_number: value,
                            document_type_code: tipoComprobante,
                            client_doc_type: tipoDocCliente
                          });
                        }}
                        onBlur={() => {
                          const value = facturaData.client_doc_number;
                          if (value.length === 8 || value.length === 11) {
                            const match = clientes.find(c => c.doc_number === value);
                            if (match) handleSelectCliente(match);
                          }
                        }}
                      />
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => {
                          const value = facturaData.client_doc_number;
                          if (value.length === 8 || value.length === 11) {
                            const match = clientes.find(c => c.doc_number === value);
                            if (match) handleSelectCliente(match);
                            else {
                              setAlertMessage('Cliente no encontrado');
                              setAlertType('error');
                              setShowAlert(true);
                              setTimeout(() => setShowAlert(false), 3000);
                            }
                          }
                        }}
                        className="ml-1"
                      >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </IconButton>
                    </div>
                  </div>
                </div>

                <div className="mt-4 relative">
                  <Input 
                    label="Buscar cliente" 
                    value={clienteSearch}
                    onChange={handleClientSearch}
                    icon={<MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />}
                  />
                  {showClienteResults && clientesResults.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-blue-gray-100 rounded-md shadow-md">
                      {clientesResults.map(cliente => (
                        <div 
                          key={cliente.id}
                          className="p-2 hover:bg-blue-gray-50 cursor-pointer"
                          onClick={() => handleSelectCliente(cliente)}
                        >
                          <Typography variant="small" className="font-medium">
                            {cliente.name}
                          </Typography>
                          <Typography variant="small" className="text-sm text-blue-gray-600">
                            {tipoDocumentoCliente[cliente.doc_type]}: {cliente.doc_number}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <Input 
                    label="Nombre/Razón Social" 
                    value={facturaData.client_name}
                    onChange={(e) => setFacturaData({...facturaData, client_name: e.target.value})}
                  />
                </div>
                <div className="mt-4">
                  <Input 
                    label="Dirección" 
                    value={facturaData.client_address}
                    onChange={(e) => setFacturaData({...facturaData, client_address: e.target.value})}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Detalle de la Venta */}
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Detalle de la Venta
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
                    {["#", "Producto/Servicio", "Cantidad", "Precio Unitario", "Descuento", "IGV", "Subtotal", ""].map(
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
                  {facturaData.items.map((item, index) => (
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
  label="Seleccionar producto"
  value={item.product_id ? item.product_id.toString() : ''}
  onChange={(val) => handleItemChange(index, 'product_id', val)}
>
  {productos.length > 0 ? (
    productos.map((producto) => (
      <Option key={producto.id} value={producto.id.toString()}>
        {producto.name}
      </Option>
    ))
  ) : (
    <Option value="">Sin productos</Option>
  )}
</Select>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50 w-24">
                        <Input
                          type="number"
                          label="Cantidad"
                          value={item.quantity}
                          min="1"
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
                      <td className="py-3 px-5 border-b border-blue-gray-50 w-24">
                        <Input
                          type="number"
                          label="Dscto."
                          value={item.discount || 0}
                          onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
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
        </div>
        
        {/* Resumen y totales */}
        <div>
          <Card className="sticky top-4 overflow-hidden border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="blue-gray"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="white">
                Resumen de Venta
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    Subtotal:
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    {formatCurrency(facturaData.total_taxable)}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    IGV (18%):
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    {formatCurrency(facturaData.total_igv)}
                  </Typography>
                </div>
                {facturaData.total_discount > 0 && (
                  <div className="flex justify-between items-center">
                    <Typography variant="small" color="blue-gray">
                      Descuento:
                    </Typography>
                    <Typography variant="h6" color="red">
                      -{formatCurrency(facturaData.total_discount)}
                    </Typography>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-blue-gray-50">
                  <Typography variant="lead" color="blue-gray" className="font-semibold">
                    Total:
                  </Typography>
                  <Typography variant="h5" color="blue-gray">
                    {formatCurrency(facturaData.total_payable)}
                  </Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="p-6">
              <div className="flex flex-col gap-3">
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Forma de Pago
                  </Typography>
                  <Select 
  label="Forma de Pago"
  value={facturaData.payment_method || ''}
  onChange={(val) => setFacturaData({ ...facturaData, payment_method: val })}
>
  {formaPago.map((fp) => (
    <Option key={fp.value} value={fp.value}>{fp.label}</Option>
  ))}
</Select>
<Input
  label="Observaciones"
  value={facturaData.notes || ''}
  onChange={(e) => setFacturaData({ ...facturaData, notes: e.target.value })}
/>
                </div>
                <Button
                  size="lg"
                  className="mt-4 flex items-center justify-center gap-3"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!formValid}
                  color={formValid ? "blue" : "blue-gray"}
                >
                  <ReceiptPercentIcon strokeWidth={2} className="h-5 w-5" />
                  Emitir Comprobante
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}