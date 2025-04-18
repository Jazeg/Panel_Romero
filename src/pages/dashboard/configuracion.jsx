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
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Select,
  Option,
  Switch,
  Tooltip
} from "@material-tailwind/react";
import {
  BuildingOfficeIcon,
  DocumentCheckIcon,
  KeyIcon,
  CreditCardIcon,
  ServerIcon,
  AdjustmentsHorizontalIcon,
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

// Datos de ejemplo para la configuración (en una implementación real estos vendrían desde una API)
const configuracionInicial = {
  empresa: {
    id: 1,
    ruc: "20123456789",
    business_name: "Transportes Romero S.A.C.",
    trade_name: "Transportes Romero",
    address: "Av. La Marina 1234, Iquitos, Loreto",
    ubigeo: "160101",
    phone: "065-123456",
    email: "facturacion@transportesromero.com",
    logo_url: "/img/logo-transportes.svg",
    sunat_username: "MODDATOS",
    sunat_password_hash: "••••••••",
    certificate_path: "/certificates/cert_20123456789.pfx",
    certificate_password_hash: "••••••••",
    beta_mode: true
  },
  series: [
    { id: 1, document_type_code: "01", series: "F001", description: "Facturas Iquitos", active: true, last_number: 154 },
    { id: 2, document_type_code: "03", series: "B001", description: "Boletas Iquitos", active: true, last_number: 245 },
    { id: 3, document_type_code: "07", series: "FC01", description: "Notas de Crédito Facturas", active: true, last_number: 34 },
    { id: 4, document_type_code: "07", series: "BC01", description: "Notas de Crédito Boletas", active: true, last_number: 12 },
    { id: 5, document_type_code: "08", series: "FD01", description: "Notas de Débito Facturas", active: true, last_number: 16 },
    { id: 6, document_type_code: "08", series: "BD01", description: "Notas de Débito Boletas", active: false, last_number: 0 }
  ],
  ubigeos: [
    { code: "160101", description: "Iquitos, Maynas, Loreto" },
    { code: "160201", description: "Yurimaguas, Alto Amazonas, Loreto" },
    { code: "160301", description: "Nauta, Loreto, Loreto" },
    { code: "160401", description: "Requena, Requena, Loreto" }
  ],
  parametros: {
    igv_percentage: 18.00,
    default_currency: "PEN",
    send_emails_automatically: true,
    save_xmls_locally: true,
    auto_send_to_sunat: true,
    auto_create_pdf: true,
    pdf_template: "standard"
  }
};

// Tipos de documento SUNAT
const tipoDocumento = {
  "01": "Factura",
  "03": "Boleta de Venta",
  "07": "Nota de Crédito",
  "08": "Nota de Débito",
  "09": "Guía de Remisión",
  "20": "Comprobante de Retención",
  "40": "Comprobante de Percepción"
};

// Plantillas de PDF disponibles
const plantillasPDF = [
  { value: "standard", label: "Estándar" },
  { value: "simple", label: "Simple" },
  { value: "detailed", label: "Detallada" },
  { value: "thermal", label: "Térmica (80mm)" }
];

// Add named export alongside default export
export function ConfiguracionSistema() {
  const [configuracion, setConfiguracion] = useState(configuracionInicial);
  const [activeTab, setActiveTab] = useState("empresa");
  const [nuevaSerie, setNuevaSerie] = useState({
    document_type_code: "01",
    series: "",
    description: "",
    active: true
  });
  const [editandoSerie, setEditandoSerie] = useState(null);
  
  // Estado para alertas
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Manejar cambios en los datos de la empresa
  const handleEmpresaChange = (field, value) => {
    setConfiguracion({
      ...configuracion,
      empresa: {
        ...configuracion.empresa,
        [field]: value
      }
    });
  };
  
  // Manejar cambios en los parámetros
  const handleParametrosChange = (field, value) => {
    setConfiguracion({
      ...configuracion,
      parametros: {
        ...configuracion.parametros,
        [field]: value
      }
    });
  };
  
  // Manejar cambios en la nueva serie
  const handleNuevaSerieChange = (field, value) => {
    setNuevaSerie({
      ...nuevaSerie,
      [field]: value
    });
  };
  
  // Agregar nueva serie
  const handleAgregarSerie = () => {
    // Validar que los campos no estén vacíos
    if (!nuevaSerie.series || !nuevaSerie.description) {
      setAlertMessage('Todos los campos son obligatorios');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Validar formato de serie (letra seguida de 3 números)
    if (!/^[A-Z][0-9]{3}$/.test(nuevaSerie.series)) {
      setAlertMessage('El formato de serie debe ser una letra seguida de 3 números (Ej: F001)');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Validar que no exista otra serie igual
    if (configuracion.series.some(serie => 
      serie.document_type_code === nuevaSerie.document_type_code && 
      serie.series === nuevaSerie.series
    )) {
      setAlertMessage('Ya existe una serie con ese código para ese tipo de documento');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Agregar la nueva serie
    const newId = Math.max(...configuracion.series.map(s => s.id)) + 1;
    const newSeries = [...configuracion.series, { ...nuevaSerie, id: newId, last_number: 0 }];
    
    setConfiguracion({
      ...configuracion,
      series: newSeries
    });
    
    // Limpiar el formulario
    setNuevaSerie({
      document_type_code: "01",
      series: "",
      description: "",
      active: true
    });
    
    setAlertMessage('Serie agregada correctamente');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  // Editar serie existente
  const handleEditarSerie = (serie) => {
    setEditandoSerie({
      ...serie
    });
  };
  
  // Actualizar serie en edición
  const handleUpdateSerie = () => {
    if (!editandoSerie) return;
    
    // Validar campos
    if (!editandoSerie.description) {
      setAlertMessage('La descripción es obligatoria');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Actualizar la serie en el arreglo
    const updatedSeries = configuracion.series.map(serie => 
      serie.id === editandoSerie.id ? editandoSerie : serie
    );
    
    setConfiguracion({
      ...configuracion,
      series: updatedSeries
    });
    
    setEditandoSerie(null);
    
    setAlertMessage('Serie actualizada correctamente');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  // Cancelar edición
  const handleCancelEdit = () => {
    setEditandoSerie(null);
  };
  
  // Eliminar serie
  const handleEliminarSerie = (id) => {
    // Pedir confirmación antes de eliminar
    if (!window.confirm('¿Está seguro de eliminar esta serie? Esta acción no se puede deshacer.')) {
      return;
    }
    
    const updatedSeries = configuracion.series.filter(serie => serie.id !== id);
    
    setConfiguracion({
      ...configuracion,
      series: updatedSeries
    });
    
    setAlertMessage('Serie eliminada correctamente');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  // Guardar todos los cambios de configuración
  const handleGuardarConfiguracion = () => {
    // En una implementación real, aquí se enviaría la configuración a la API
    console.log("Guardando configuración:", configuracion);
    
    setAlertMessage('Configuración guardada correctamente');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  // Probar conexión con SUNAT
  const handleProbarConexionSUNAT = () => {
    // Simulación de prueba de conexión
    setTimeout(() => {
      setAlertMessage('Conexión exitosa con SUNAT en modo BETA');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }, 2000);
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
            Configuración del Sistema
          </Typography>
          <Button
            className="flex items-center gap-2"
            size="sm"
            onClick={handleGuardarConfiguracion}
          >
            <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Configure los parámetros del sistema de facturación electrónica
        </Typography>
      </div>
      
      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <TabsHeader>
            <Tab value="empresa" className="flex items-center gap-2">
              <BuildingOfficeIcon className="h-4 w-4" />
              Empresa
            </Tab>
            <Tab value="series" className="flex items-center gap-2">
              <DocumentCheckIcon className="h-4 w-4" />
              Series
            </Tab>
            <Tab value="sunat" className="flex items-center gap-2">
              <KeyIcon className="h-4 w-4" />
              Conexión SUNAT
            </Tab>
            <Tab value="parametros" className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
              Parámetros
            </Tab>
          </TabsHeader>
          
          <TabsBody>
            {/* Tab de Datos de la Empresa */}
            <TabPanel value="empresa">
              <div className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Datos de la Empresa Emisora
                </Typography>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      RUC
                    </Typography>
                    <Input
                      value={configuracion.empresa.ruc}
                      onChange={(e) => handleEmpresaChange('ruc', e.target.value)}
                      maxLength={11}
                    />
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Logo de la Empresa
                    </Typography>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-gray-50 flex items-center justify-center rounded">
                        <img 
                          src={configuracion.empresa.logo_url || "/img/placeholder.png"} 
                          alt="Logo" 
                          className="max-w-full max-h-full" 
                        />
                      </div>
                      <Button variant="outlined" size="sm">
                        Cambiar Logo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Typography variant="small" className="font-medium mb-2">
                      Razón Social
                    </Typography>
                    <Input
                      value={configuracion.empresa.business_name}
                      onChange={(e) => handleEmpresaChange('business_name', e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Typography variant="small" className="font-medium mb-2">
                      Nombre Comercial
                    </Typography>
                    <Input
                      value={configuracion.empresa.trade_name}
                      onChange={(e) => handleEmpresaChange('trade_name', e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Typography variant="small" className="font-medium mb-2">
                      Dirección
                    </Typography>
                    <Input
                      value={configuracion.empresa.address}
                      onChange={(e) => handleEmpresaChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Ubigeo
                    </Typography>
                    <Select 
                      value={configuracion.empresa.ubigeo}
                      onChange={(val) => handleEmpresaChange('ubigeo', val)}
                    >
                      {configuracion.ubigeos.map((ubigeo) => (
                        <Option key={ubigeo.code} value={ubigeo.code}>
                          {ubigeo.description}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Teléfono
                    </Typography>
                    <Input
                      value={configuracion.empresa.phone}
                      onChange={(e) => handleEmpresaChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Typography variant="small" className="font-medium mb-2">
                      Email
                    </Typography>
                    <Input
                      type="email"
                      value={configuracion.empresa.email}
                      onChange={(e) => handleEmpresaChange('email', e.target.value)}
                    />
                    <Typography variant="small" className="mt-1 text-gray-600">
                      Este email aparecerá en los comprobantes y se usará para notificaciones
                    </Typography>
                  </div>
                </div>
              </div>
            </TabPanel>
            
            {/* Tab de Series */}
            <TabPanel value="series">
              <div className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Configuración de Series
                </Typography>
                
                <div className="mb-6 border border-blue-gray-100 rounded-md p-4">
                  <Typography variant="small" className="font-medium mb-4">
                    Agregar Nueva Serie
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Typography variant="small" className="font-medium mb-2">
                        Tipo de Documento
                      </Typography>
                      <Select
                        value={nuevaSerie.document_type_code}
                        onChange={(val) => handleNuevaSerieChange('document_type_code', val)}
                      >
                        {Object.entries(tipoDocumento).map(([code, name]) => (
                          <Option key={code} value={code}>
                            {code} - {name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    
                    <div>
                      <Typography variant="small" className="font-medium mb-2">
                        Serie
                      </Typography>
                      <Input
                        value={nuevaSerie.series}
                        onChange={(e) => handleNuevaSerieChange('series', e.target.value.toUpperCase())}
                        placeholder="F001"
                        maxLength={4}
                      />
                      <Typography variant="small" className="mt-1 text-gray-600">
                        Formato: Letra + 3 números
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="small" className="font-medium mb-2">
                        Descripción
                      </Typography>
                      <Input
                        value={nuevaSerie.description}
                        onChange={(e) => handleNuevaSerieChange('description', e.target.value)}
                        placeholder="Facturas Iquitos"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <Button 
                        className="flex items-center gap-2 w-full"
                        onClick={handleAgregarSerie}
                      >
                        <PlusCircleIcon className="h-4 w-4" />
                        Agregar Serie
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["Tipo de Documento", "Serie", "Descripción", "Último Número", "Estado", "Acciones"].map(
                          (el) => (
                            <th
                              key={el}
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
                      {configuracion.series.map((serie) => {
                        const isEditing = editandoSerie && editandoSerie.id === serie.id;
                        
                        return (
                          <tr key={serie.id}>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {tipoDocumento[serie.document_type_code] || serie.document_type_code}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {serie.series}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              {isEditing ? (
                                <Input 
                                  value={editandoSerie.description}
                                  onChange={(e) => setEditandoSerie({
                                    ...editandoSerie,
                                    description: e.target.value
                                  })}
                                />
                              ) : (
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {serie.description}
                                </Typography>
                              )}
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {serie.last_number}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              {isEditing ? (
                                <Switch 
                                  checked={editandoSerie.active}
                                  onChange={() => setEditandoSerie({
                                    ...editandoSerie,
                                    active: !editandoSerie.active
                                  })}
                                />
                              ) : (
                                <Chip
                                  variant="gradient"
                                  color={serie.active ? "green" : "blue-gray"}
                                  value={serie.active ? "Activa" : "Inactiva"}
                                  className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                />
                              )}
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              {isEditing ? (
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={handleUpdateSerie}>
                                    Guardar
                                  </Button>
                                  <Button size="sm" variant="outlined" onClick={handleCancelEdit}>
                                    Cancelar
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    onClick={() => handleEditarSerie(serie)}
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </IconButton>
                                  <IconButton
                                    variant="text"
                                    color="red"
                                    onClick={() => handleEliminarSerie(serie.id)}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </IconButton>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
            
            {/* Tab de Conexión SUNAT */}
            <TabPanel value="sunat">
              <div className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Configuración de Conexión con SUNAT
                </Typography>
                
                {/* Mensaje informativo sobre modo beta */}
                <Alert color="amber" className="mb-6" icon={<InformationCircleIcon className="h-6 w-6" />}>
                  <Typography className="font-medium">
                    Actualmente está en modo BETA (Pruebas)
                  </Typography>
                  <Typography className="mt-2 text-sm">
                    En modo BETA los comprobantes son emitidos en el entorno de pruebas de SUNAT. Para emitir comprobantes en producción,
                    desactive este modo cuando esté listo para emisiones reales.
                  </Typography>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex items-center gap-2">
                    <Switch 
                      checked={configuracion.empresa.beta_mode}
                      onChange={() => handleEmpresaChange('beta_mode', !configuracion.empresa.beta_mode)}
                    />
                    <Typography variant="small" className="font-medium">
                      Modo BETA (Pruebas)
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Usuario SOL
                    </Typography>
                    <Input
                      value={configuracion.empresa.sunat_username}
                      onChange={(e) => handleEmpresaChange('sunat_username', e.target.value)}
                    />
                    <Typography variant="small" className="mt-1 text-gray-600">
                      Formato: [RUC]+[USUARIO]
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Clave SOL
                    </Typography>
                    <Input
                      type="password"
                      value={configuracion.empresa.sunat_password_hash}
                      onChange={(e) => handleEmpresaChange('sunat_password_hash', e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Typography variant="small" className="font-medium mb-2">
                      Certificado Digital (.PFX o .P12)
                    </Typography>
                    <div className="flex gap-2 items-center">
                      <Input
                        value={configuracion.empresa.certificate_path}
                        disabled
                      />
                      <Button variant="outlined" size="sm">
                        Subir Nuevo
                      </Button>
                    </div>
                    <Typography variant="small" className="mt-1 text-gray-600">
                      Formatos aceptados: .PFX o .P12
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Contraseña del Certificado
                    </Typography>
                    <Input
                      type="password"
                      value={configuracion.empresa.certificate_password_hash}
                      onChange={(e) => handleEmpresaChange('certificate_password_hash', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      className="w-full"
                      onClick={handleProbarConexionSUNAT}
                    >
                      Probar Conexión
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>
            
            {/* Tab de Parámetros */}
            <TabPanel value="parametros">
              <div className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Parámetros Generales
                </Typography>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Porcentaje de IGV
                    </Typography>
                    <Input
                      type="number"
                      value={configuracion.parametros.igv_percentage}
                      onChange={(e) => handleParametrosChange('igv_percentage', parseFloat(e.target.value))}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <Typography variant="small" className="mt-1 text-gray-600">
                      Valor actual: {configuracion.parametros.igv_percentage}%
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Moneda Predeterminada
                    </Typography>
                    <Select 
                      value={configuracion.parametros.default_currency}
                      onChange={(val) => handleParametrosChange('default_currency', val)}
                    >
                      <Option value="PEN">Soles (PEN)</Option>
                      <Option value="USD">Dólares (USD)</Option>
                    </Select>
                  </div>
                  
                  <div>
                    <Typography variant="small" className="font-medium mb-2">
                      Plantilla de PDF
                    </Typography>
                    <Select 
                      value={configuracion.parametros.pdf_template}
                      onChange={(val) => handleParametrosChange('pdf_template', val)}
                    >
                      {plantillasPDF.map((plantilla) => (
                        <Option key={plantilla.value} value={plantilla.value}>
                          {plantilla.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Typography variant="h6" color="blue-gray" className="mt-6 mb-4">
                      Opciones de Automatización
                    </Typography>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={configuracion.parametros.send_emails_automatically}
                      onChange={() => handleParametrosChange('send_emails_automatically', !configuracion.parametros.send_emails_automatically)}
                    />
                    <div>
                      <Typography variant="small" className="font-medium">
                        Enviar comprobantes por email automáticamente
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        Envía el PDF y XML al cliente cuando se emite el comprobante
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={configuracion.parametros.auto_send_to_sunat}
                      onChange={() => handleParametrosChange('auto_send_to_sunat', !configuracion.parametros.auto_send_to_sunat)}
                    />
                    <div>
                      <Typography variant="small" className="font-medium">
                        Enviar a SUNAT automáticamente
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        Envía el comprobante a SUNAT inmediatamente después de crearlo
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={configuracion.parametros.auto_create_pdf}
                      onChange={() => handleParametrosChange('auto_create_pdf', !configuracion.parametros.auto_create_pdf)}
                    />
                    <div>
                      <Typography variant="small" className="font-medium">
                        Generar PDF automáticamente
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        Crea el PDF del comprobante automáticamente después de la emisión
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={configuracion.parametros.save_xmls_locally}
                      onChange={() => handleParametrosChange('save_xmls_locally', !configuracion.parametros.save_xmls_locally)}
                    />
                    <div>
                      <Typography variant="small" className="font-medium">
                        Guardar XMLs localmente
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        Almacena una copia local de los XMLs generados y CDRs
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
        
        <CardFooter className="flex justify-between items-center p-4 border-t border-blue-gray-50">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            Última actualización: 05/04/2025 10:30
          </Typography>
          <Button onClick={handleGuardarConfiguracion}>
            Guardar Cambios
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}