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
  Chip,
  IconButton,
  Alert,
  Checkbox,
  Tooltip
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

// Datos simulados de comprobantes a anular (en una implementación real, estos vendrían de una API)
const comprobantesDisponibles = [
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
    currency_code: 'PEN'
  },
  {
    id: 2,
    document_type_code: '01',
    series: 'F001',
    number: 153,
    client_id: 3,
    client_name: 'Inversiones del Oriente E.I.R.L.',
    client_doc_type: '6',
    client_doc_number: '20493817265',
    client_address: 'Av. Abelardo Quiñones 789, Iquitos',
    issue_date: '2025-04-04',
    total_payable: 3500.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN'
  },
  {
    id: 3,
    document_type_code: '01',
    series: 'F001',
    number: 151,
    client_id: 5,
    client_name: 'Transportes Unidos S.A.C.',
    client_doc_type: '6',
    client_doc_number: '20567891234',
    client_address: 'Jr. Putumayo 567, Iquitos',
    issue_date: '2025-04-03',
    total_payable: 5200.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN'
  },
  {
    id: 4,
    document_type_code: '01',
    series: 'F001',
    number: 150,
    client_id: 4,
    client_name: 'Distribuidora Central del Perú',
    client_doc_type: '6',
    client_doc_number: '20187654321',
    client_address: 'Av. Central 123, Lima',
    issue_date: '2025-04-02',
    total_payable: 1800.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN'
  },
  {
    id: 5,
    document_type_code: '08',
    series: 'FD01',
    number: 15,
    client_id: 1,
    client_name: 'Comercial Los Andes S.A.C.',
    client_doc_type: '6',
    client_doc_number: '20512376218',
    client_address: 'Av. La Marina 1234, San Miguel, Lima',
    issue_date: '2025-04-02',
    total_payable: 120.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN',
    affected_document: 'F001-142'
  }
];

// Add named export alongside default export
export function ComunicacionBaja() {
  // Estado principal del formulario
  const [bajaData, setBajaData] = useState({
    // Datos de la comunicación de baja
    generation_date: new Date().toISOString().split('T')[0],
    identifier: `RA-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-1`, // RA-YYYYMMDD-1
    
    // Items (documentos a anular)
    items: []
  });
  
  // Estado para búsqueda y selección de comprobantes
  const [comprobanteSearch, setComprobanteSearch] = useState('');
  const [comprobantesResults, setComprobantesResults] = useState([]);
  const [showComprobanteResults, setShowComprobanteResults] = useState(false);
  const [selectedComprobantes, setSelectedComprobantes] = useState([]);
  
  // Estado para alertas y validación
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Efectos
  useEffect(() => {
    // Validar formulario cuando cambian los comprobantes seleccionados
    if (selectedComprobantes.length > 0) {
      // Preparar items para la comunicación de baja
      const items = selectedComprobantes.map((comp, index) => ({
        item_line: index + 1,
        document_type_code: comp.document_type_code,
        series: comp.series,
        number: comp.number,
        reason: comp.reason || 'ERROR EN LA EMISIÓN DEL COMPROBANTE'
      }));
      
      setBajaData({
        ...bajaData,
        items: items
      });
      
      setFormValid(true);
    } else {
      setBajaData({
        ...bajaData,
        items: []
      });
      
      setFormValid(false);
    }
  }, [selectedComprobantes]);
  
  // Función para buscar comprobantes
  const handleComprobanteSearch = (e) => {
    const value = e.target.value;
    setComprobanteSearch(value);
    
    if (value.length > 2) {
      // En una aplicación real, esto sería una llamada a la API
      const results = comprobantesDisponibles.filter(comp => 
        (comp.series + '-' + comp.number).includes(value) || 
        comp.client_name.toLowerCase().includes(value.toLowerCase())
      );
      
      // Filtrar los comprobantes ya seleccionados
      const filteredResults = results.filter(comp => 
        !selectedComprobantes.some(selected => 
          selected.series === comp.series && 
          selected.number === comp.number &&
          selected.document_type_code === comp.document_type_code
        )
      );
      
      setComprobantesResults(filteredResults);
      setShowComprobanteResults(filteredResults.length > 0);
    } else {
      setShowComprobanteResults(false);
    }
  };
  
  // Función para seleccionar un comprobante
  const handleSelectComprobante = (comprobante) => {
    // Añadir razón de anulación
    const comprobanteConRazon = {
      ...comprobante,
      reason: 'ERROR EN LA EMISIÓN DEL COMPROBANTE'
    };
    
    setSelectedComprobantes([...selectedComprobantes, comprobanteConRazon]);
    setComprobanteSearch('');
    setShowComprobanteResults(false);
  };
  
  // Función para eliminar un comprobante seleccionado
  const handleRemoveComprobante = (index) => {
    const newSelectedComprobantes = [...selectedComprobantes];
    newSelectedComprobantes.splice(index, 1);
    setSelectedComprobantes(newSelectedComprobantes);
  };
  
  // Función para actualizar la razón de anulación
  const handleUpdateReason = (index, reason) => {
    const newSelectedComprobantes = [...selectedComprobantes];
    newSelectedComprobantes[index].reason = reason;
    setSelectedComprobantes(newSelectedComprobantes);
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
  
  // Formateo de moneda
  const formatCurrency = (amount, currency = 'PEN') => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Formateo de fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };
  
  // Enviar formulario
  const handleSubmit = () => {
    if (!formValid) {
      setAlertMessage('Seleccione al menos un comprobante para anular');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Validar que cada comprobante tenga una razón
    const invalidItems = bajaData.items.filter(item => !item.reason || item.reason.trim() === '');
    if (invalidItems.length > 0) {
      setAlertMessage('Todos los comprobantes deben tener un motivo de anulación');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Aquí se enviaría el formulario a la API
    console.log("Datos de la comunicación de baja:", bajaData);
    setAlertMessage('Comunicación de baja generada correctamente. Se enviará a SUNAT para su procesamiento.');
    setAlertType('success');
    setShowAlert(true);
    
    // En una app real, redirigir a la página de comunicaciones después de guardar
  };
  
  // Limpiar formulario
  const handleClear = () => {
    setBajaData({
      generation_date: new Date().toISOString().split('T')[0],
      identifier: `RA-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-1`,
      items: []
    });
    setSelectedComprobantes([]);
  };
  
  return (
    <div className="mt-12">
      {showAlert && (
        <Alert
          color={alertType === 'success' ? 'green' : alertType === 'error' ? 'red' : 'blue'}
          icon={
            alertType === 'success' ? <CheckCircleIcon className="h-6 w-6" /> : 
            alertType === 'error' ? <ExclamationCircleIcon className="h-6 w-6" /> : 
            <InformationCircleIcon className="h-6 w-6" />
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
            Comunicación de Baja
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
          Anule comprobantes electrónicos enviando una comunicación de baja a SUNAT
        </Typography>
      </div>
      
      {/* Información importante */}
      <Alert color="amber" className="mb-6" icon={<InformationCircleIcon className="h-6 w-6" />}>
        <Typography className="font-medium">
          Importante: Las comunicaciones de baja solo aplican para facturas, notas de crédito y notas de débito.
        </Typography>
        <Typography className="mt-2 text-sm">
          Para anular boletas, debe utilizar un Resumen Diario. Los comprobantes solo pueden anularse dentro de los 7 días calendario desde su emisión.
        </Typography>
      </Alert>
      
      <div className="mb-12 grid grid-cols-1 gap-6">
        {/* Datos de la comunicación */}
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Datos de la Comunicación de Baja
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <Typography variant="small" className="font-medium mb-2">
                  Fecha de generación
                </Typography>
                <Input 
                  type="date" 
                  label="Fecha" 
                  value={bajaData.generation_date}
                  onChange={(e) => setBajaData({
                    ...bajaData, 
                    generation_date: e.target.value,
                    identifier: `RA-${e.target.value.replace(/-/g, '')}-1`
                  })}
                />
              </div>
              <div>
                <Typography variant="small" className="font-medium mb-2">
                  Identificador
                </Typography>
                <Input 
                  label="Identificador" 
                  value={bajaData.identifier}
                  disabled
                />
              </div>
              <div className="flex items-end">
                <Tooltip content="El identificador es generado automáticamente según el formato requerido por SUNAT: RA-YYYYMMDD-#">
                  <Button variant="text" className="flex items-center gap-2">
                    <InformationCircleIcon strokeWidth={2} className="h-4 w-4" />
                    Ayuda sobre identificadores
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Selección de comprobantes */}
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Comprobantes a Anular
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="relative mb-6">
              <Typography variant="small" className="font-medium mb-2">
                Buscar comprobante por serie-número o cliente
              </Typography>
              <Input 
                label="Ingrese serie-número o nombre del cliente" 
                value={comprobanteSearch}
                onChange={handleComprobanteSearch}
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />}
              />
              
              {showComprobanteResults && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-blue-gray-100 rounded-md shadow-md">
                  {comprobantesResults.map(comp => (
                    <div 
                      key={`${comp.document_type_code}-${comp.series}-${comp.number}`}
                      className="p-2 hover:bg-blue-gray-50 cursor-pointer"
                      onClick={() => handleSelectComprobante(comp)}
                    >
                      <Typography variant="small" className="font-medium">
                        {getDocumentTypeLabel(comp.document_type_code)}: {formatSeriesNumber(comp.series, comp.number)}
                      </Typography>
                      <Typography variant="small" className="text-sm text-blue-gray-600">
                        Cliente: {comp.client_name} | Monto: {formatCurrency(comp.total_payable, comp.currency_code)}
                      </Typography>
                      <Typography variant="small" className="text-sm text-blue-gray-600">
                        Fecha Emisión: {formatDate(comp.issue_date)}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {selectedComprobantes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Tipo", "Comprobante", "Cliente", "Fecha", "Monto", "Motivo de Anulación", ""].map(
                        (el, i) => (
                          <th
                            key={i}
                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
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
                    {selectedComprobantes.map((comp, index) => (
                      <tr key={index}>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {getDocumentTypeLabel(comp.document_type_code)}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {formatSeriesNumber(comp.series, comp.number)}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {comp.client_name}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {comp.issue_date}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {formatCurrency(comp.total_payable, comp.currency_code)}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Input
                            label="Motivo de anulación"
                            value={comp.reason}
                            onChange={(e) => handleUpdateReason(index, e.target.value)}
                            className="min-w-[250px]"
                            required
                          />
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <IconButton
                            variant="text"
                            color="red"
                            onClick={() => handleRemoveComprobante(index)}
                          >
                            <ArchiveBoxXMarkIcon className="h-5 w-5" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-10 border border-dashed border-blue-gray-200 rounded-lg">
                <ArchiveBoxXMarkIcon className="h-12 w-12 mx-auto text-blue-gray-300 mb-4" />
                <Typography variant="h6" color="blue-gray">
                  No hay comprobantes seleccionados
                </Typography>
                <Typography variant="small" color="blue-gray" className="mt-2">
                  Use el buscador para encontrar y añadir comprobantes a anular
                </Typography>
              </div>
            )}
          </CardBody>
          <CardFooter className="pt-0 pb-6 px-6">
            <div className="flex justify-between items-center">
              <Typography variant="small" color="blue-gray">
                {selectedComprobantes.length} comprobante(s) seleccionado(s)
              </Typography>
              <Button
                color="red"
                className="flex items-center gap-2"
                onClick={handleSubmit}
                disabled={!formValid}
              >
                <ArchiveBoxXMarkIcon strokeWidth={2} className="h-5 w-5" />
                Generar Comunicación de Baja
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Información adicional */}
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="blue-gray"
            className="m-0 p-6 text-center"
          >
            <Typography variant="h6" color="white">
              Información sobre Comunicaciones de Baja
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <Typography variant="small" color="blue-gray">
                  Las comunicaciones de baja permiten anular comprobantes ya enviados a SUNAT.
                </Typography>
              </li>
              <li>
                <Typography variant="small" color="blue-gray">
                  Solo puede anular comprobantes dentro de los 7 días calendario desde su emisión.
                </Typography>
              </li>
              <li>
                <Typography variant="small" color="blue-gray">
                  SUNAT responderá a la baja con un <strong>ticket</strong> (código de recepción) y luego deberá consultar el estado de dicho ticket.
                </Typography>
              </li>
              <li>
                <Typography variant="small" color="blue-gray">
                  Si el comprobante ya ha sido pagado, considere emitir una nota de crédito en lugar de anularlo.
                </Typography>
              </li>
              <li>
                <Typography variant="small" color="blue-gray">
                  Las boletas de venta deben anularse mediante un <strong>Resumen Diario</strong> y no mediante Comunicación de Baja.
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}