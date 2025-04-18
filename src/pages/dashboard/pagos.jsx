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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ArrowPathIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// Datos de ejemplo (en una implementación real, estos vendrían de una API)
const cuentasPorCobrar = [
  {
    id: 1,
    invoice_id: 1,
    client_id: 1,
    client_name: "Comercial Los Andes S.A.C.",
    client_doc_number: "20512376218",
    issue_date: "2025-04-05",
    due_date: "2025-05-05",
    total_amount: 2850.00,
    paid_amount: 1000.00,
    balance: 1850.00,
    status: "PARTIALLY_PAID",
    last_payment_date: "2025-04-15",
    document_type_code: "01",
    series: "F001",
    number: 152,
    currency_code: "PEN",
    payment_terms: "CREDITO_30",
    payments: [
      {
        id: 1,
        account_receivable_id: 1,
        payment_date: "2025-04-15",
        amount: 1000.00,
        payment_method: "TRANSFERENCIA",
        reference: "OP-12345",
        notes: "Pago parcial"
      }
    ]
  },
  {
    id: 2,
    invoice_id: 2,
    client_id: 3,
    client_name: "Inversiones del Oriente E.I.R.L.",
    client_doc_number: "20493817265",
    issue_date: "2025-04-04",
    due_date: "2025-05-04",
    total_amount: 3500.00,
    paid_amount: 0.00,
    balance: 3500.00,
    status: "PENDING",
    last_payment_date: null,
    document_type_code: "01",
    series: "F001",
    number: 153,
    currency_code: "PEN",
    payment_terms: "CREDITO_30",
    payments: []
  },
  {
    id: 3,
    invoice_id: 3,
    client_id: 5,
    client_name: "Transportes Unidos S.A.C.",
    client_doc_number: "20567891234",
    issue_date: "2025-04-03",
    due_date: "2025-04-03",
    total_amount: 5200.00,
    paid_amount: 5200.00,
    balance: 0.00,
    status: "PAID",
    last_payment_date: "2025-04-03",
    document_type_code: "01",
    series: "F001",
    number: 151,
    currency_code: "PEN",
    payment_terms: "CONTADO",
    payments: [
      {
        id: 2,
        account_receivable_id: 3,
        payment_date: "2025-04-03",
        amount: 5200.00,
        payment_method: "TARJETA",
        reference: "TJ-89012",
        notes: "Pago con tarjeta de crédito"
      }
    ]
  },
  {
    id: 4,
    invoice_id: 4,
    client_id: 4,
    client_name: "Distribuidora Central del Perú",
    client_doc_number: "20187654321",
    issue_date: "2025-04-02",
    due_date: "2025-05-02",
    total_amount: 1800.00,
    paid_amount: 0.00,
    balance: 1800.00,
    status: "PENDING",
    last_payment_date: null,
    document_type_code: "01",
    series: "F001",
    number: 150,
    currency_code: "PEN",
    payment_terms: "CREDITO_30",
    payments: []
  },
  {
    id: 5,
    invoice_id: 6,
    client_id: 2,
    client_name: "María Sánchez López",
    client_doc_number: "45678912",
    issue_date: "2025-04-05",
    due_date: "2025-04-05",
    total_amount: 450.00,
    paid_amount: 450.00,
    balance: 0.00,
    status: "PAID",
    last_payment_date: "2025-04-05",
    document_type_code: "03",
    series: "B001",
    number: 243,
    currency_code: "PEN",
    payment_terms: "CONTADO",
    payments: [
      {
        id: 3,
        account_receivable_id: 5,
        payment_date: "2025-04-05",
        amount: 450.00,
        payment_method: "EFECTIVO",
        reference: "",
        notes: "Pago en efectivo"
      }
    ]
  }
];

// Opciones para método de pago
const metodoPagoOptions = [
  { value: "EFECTIVO", label: "Efectivo" },
  { value: "TRANSFERENCIA", label: "Transferencia Bancaria" },
  { value: "TARJETA", label: "Tarjeta de Crédito/Débito" },
  { value: "CHEQUE", label: "Cheque" },
  { value: "YAPE", label: "Yape" },
  { value: "PLIN", label: "Plin" },
  { value: "OTRO", label: "Otro" }
];

// Add named export alongside default export
export function GestionPagos() {
  // Estado principal
  const [activeTab, setActiveTab] = useState("pendientes");
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "all"
  });
  
  // Estado para nuevo pago
  const [nuevoPago, setNuevoPago] = useState({
    payment_date: new Date().toISOString().split('T')[0],
    amount: 0,
    payment_method: "EFECTIVO",
    reference: "",
    notes: ""
  });
  
  // Estado para alertas y validación
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Filtrar cuentas según el tab activo y filtros
  const getCuentasFiltradas = () => {
    let filtered = [...cuentasPorCobrar];
    
    // Aplicar filtro de búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(cuenta => 
        cuenta.client_name.toLowerCase().includes(searchLower) ||
        cuenta.client_doc_number.includes(filters.search) ||
        `${cuenta.series}-${cuenta.number}`.includes(filters.search)
      );
    }
    
    // Aplicar filtro de fecha de emisión
    if (filters.dateFrom) {
      filtered = filtered.filter(cuenta => 
        new Date(cuenta.issue_date) >= new Date(filters.dateFrom)
      );
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(cuenta => 
        new Date(cuenta.issue_date) <= new Date(filters.dateTo)
      );
    }
    
    // Aplicar filtro de estado
    if (filters.status !== "all") {
      filtered = filtered.filter(cuenta => cuenta.status === filters.status);
    }
    
    // Filtrar según el tab activo
    if (activeTab === "pendientes") {
      return filtered.filter(cuenta => cuenta.status !== "PAID");
    } else if (activeTab === "pagadas") {
      return filtered.filter(cuenta => cuenta.status === "PAID");
    } else {
      return filtered;
    }
  };
  
  const cuentasFiltradas = getCuentasFiltradas();
  
  // Totales para resumen
  const calcularTotales = () => {
    const total = cuentasPorCobrar.reduce((acc, cuenta) => acc + cuenta.total_amount, 0);
    const pagado = cuentasPorCobrar.reduce((acc, cuenta) => acc + cuenta.paid_amount, 0);
    const pendiente = cuentasPorCobrar.reduce((acc, cuenta) => acc + cuenta.balance, 0);
    
    return { total, pagado, pendiente };
  };
  
  const totales = calcularTotales();
  
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
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };
  
  // Calcular días vencidos o días para vencimiento
  const calcularDiasVencimiento = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    // Eliminar la hora para comparar solo fechas
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Formatear series y número
  const formatSeriesNumber = (series, number) => {
    return `${series}-${number.toString().padStart(6, '0')}`;
  };
  
  // Obtener clase de color para el estado de vencimiento
  const getVencimientoClass = (dueDate, status) => {
    if (status === "PAID") return "text-green-500";
    
    const diasVencimiento = calcularDiasVencimiento(dueDate);
    
    if (diasVencimiento < 0) return "text-red-500 font-bold"; // Vencido
    if (diasVencimiento <= 5) return "text-amber-500"; // Próximo a vencer
    return "text-blue-gray-600"; // Normal
  };
  
  // Manejar apertura del modal de pago
  const handleOpenPagoModal = (cuenta) => {
    setCuentaSeleccionada(cuenta);
    setNuevoPago({
      payment_date: new Date().toISOString().split('T')[0],
      amount: cuenta.balance,
      payment_method: "EFECTIVO",
      reference: "",
      notes: ""
    });
    setOpenModal(true);
  };
  
  // Registrar nuevo pago
  const handleRegistrarPago = () => {
    if (!cuentaSeleccionada) return;
    
    // Validar datos
    if (nuevoPago.amount <= 0) {
      setAlertMessage('El monto del pago debe ser mayor a cero');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    if (nuevoPago.amount > cuentaSeleccionada.balance) {
      setAlertMessage('El monto del pago no puede ser mayor al saldo pendiente');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // En una implementación real, aquí se enviaría el pago a la API
    console.log("Registrando pago:", {
      account_receivable_id: cuentaSeleccionada.id,
      ...nuevoPago
    });
    
    // Simular actualización de la cuenta
    setAlertMessage('Pago registrado correctamente');
    setAlertType('success');
    setShowAlert(true);
    setOpenModal(false);
    
    // En una app real, aquí se recargarían los datos desde la API
  };
  
  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    setFilters({
      search: "",
      dateFrom: "",
      dateTo: "",
      status: "all"
    });
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
            Gestión de Pagos Recibidos
          </Typography>
          <Button
            className="flex items-center gap-2"
            size="sm"
            onClick={() => handleLimpiarFiltros()}
          >
            <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Administre las cuentas por cobrar y registre los pagos recibidos de los clientes
        </Typography>
      </div>
      
      {/* Tarjetas de resumen */}
      <div className="mb-6 grid gap-y-6 gap-x-6 md:grid-cols-3">
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardBody className="p-4">
            <div className="flex justify-between">
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-600">
                  Total Facturado
                </Typography>
                <Typography variant="h4" color="blue-gray">
                  {formatCurrency(totales.total)}
                </Typography>
              </div>
              <div className="rounded-full bg-blue-gray-50 p-3">
                <CurrencyDollarIcon className="h-6 w-6 text-blue-gray-500" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardBody className="p-4">
            <div className="flex justify-between">
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-600">
                  Total Cobrado
                </Typography>
                <Typography variant="h4" color="green">
                  {formatCurrency(totales.pagado)}
                </Typography>
              </div>
              <div className="rounded-full bg-green-50 p-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardBody className="p-4">
            <div className="flex justify-between">
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-600">
                  Pendiente de Cobro
                </Typography>
                <Typography variant="h4" color="amber">
                  {formatCurrency(totales.pendiente)}
                </Typography>
              </div>
              <div className="rounded-full bg-amber-50 p-3">
                <ExclamationCircleIcon className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Filtros */}
      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm mb-6">
        <CardBody className="p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Buscar
              </Typography>
              <Input
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Cliente o Nº de comprobante"
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />}
                className="w-56"
              />
            </div>
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Desde
              </Typography>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                icon={<CalendarDaysIcon className="h-5 w-5 text-blue-gray-300" />}
                className="w-40"
              />
            </div>
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Hasta
              </Typography>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                icon={<CalendarDaysIcon className="h-5 w-5 text-blue-gray-300" />}
                className="w-40"
              />
            </div>
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Estado
              </Typography>
              <Select 
                value={filters.status} 
                onChange={(val) => setFilters({...filters, status: val})}
                className="w-48"
              >
                <Option value="all">Todos</Option>
                <Option value="PENDING">Pendiente</Option>
                <Option value="PARTIALLY_PAID">Parcialmente Pagado</Option>
                <Option value="PAID">Pagado</Option>
              </Select>
            </div>
            <div className="ml-auto">
              <Button
                variant="outlined"
                className="flex items-center gap-2"
                onClick={handleLimpiarFiltros}
              >
                <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Tabs y tabla */}
      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-6"
        >
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              <Tab value="pendientes">
                Pendientes
              </Tab>
              <Tab value="pagadas">
                Pagadas
              </Tab>
              <Tab value="todas">
                Todas
              </Tab>
            </TabsHeader>
          </Tabs>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          {cuentasFiltradas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Comprobante", "Cliente", "Emisión", "Vencimiento", "Total", "Pagado", "Pendiente", "Estado", "Acciones"].map(
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
                  {cuentasFiltradas.map((cuenta) => {
                    const className = "py-3 px-5 border-b border-blue-gray-50";
                    const vencimientoClass = getVencimientoClass(cuenta.due_date, cuenta.status);
                    const diasVencimiento = calcularDiasVencimiento(cuenta.due_date);
                    
                    let vencimientoText;
                    if (cuenta.status === "PAID") {
                      vencimientoText = "Pagado";
                    } else if (diasVencimiento < 0) {
                      vencimientoText = `Vencido (${Math.abs(diasVencimiento)} días)`;
                    } else if (diasVencimiento === 0) {
                      vencimientoText = "Vence hoy";
                    } else {
                      vencimientoText = `Vence en ${diasVencimiento} días`;
                    }
                    
                    return (
                      <tr key={cuenta.id}>
                        <td className={className}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {formatSeriesNumber(cuenta.series, cuenta.number)}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal"
                            >
                              {cuenta.document_type_code === '01' ? 'Factura' : 'Boleta'}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {cuenta.client_name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal opacity-70"
                            >
                              {cuenta.client_doc_number}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {cuenta.issue_date}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {cuenta.due_date}
                            </Typography>
                            <Typography
                              variant="small"
                              className={`text-xs ${vencimientoClass}`}
                            >
                              {vencimientoText}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {formatCurrency(cuenta.total_amount, cuenta.currency_code)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="green"
                            className="font-medium"
                          >
                            {formatCurrency(cuenta.paid_amount, cuenta.currency_code)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color={cuenta.balance > 0 ? "amber" : "green"}
                            className="font-medium"
                          >
                            {formatCurrency(cuenta.balance, cuenta.currency_code)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={
                              cuenta.status === "PAID" ? "green" : 
                              cuenta.status === "PARTIALLY_PAID" ? "amber" : "blue-gray"
                            }
                            value={
                              cuenta.status === "PAID" ? "Pagado" : 
                              cuenta.status === "PARTIALLY_PAID" ? "Parcial" : "Pendiente"
                            }
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="text" 
                              className="text-xs"
                              onClick={() => window.location.href = `/dashboard/comprobante/${cuenta.invoice_id}`}
                            >
                              Ver
                            </Button>
                            {cuenta.status !== "PAID" && (
                              <Button 
                                size="sm" 
                                color="green" 
                                className="text-xs flex items-center gap-1"
                                onClick={() => handleOpenPagoModal(cuenta)}
                              >
                                <BanknotesIcon className="h-3 w-3" />
                                Registrar Pago
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10">
              <ExclamationCircleIcon className="h-12 w-12 mx-auto text-blue-gray-300 mb-4" />
              <Typography variant="h6" color="blue-gray">
                No se encontraron resultados
              </Typography>
              <Typography variant="small" color="blue-gray" className="mt-2">
                No hay cuentas por cobrar que coincidan con los filtros seleccionados
              </Typography>
            </div>
          )}
        </CardBody>
        <CardFooter className="p-4 border-t border-blue-gray-50">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            Mostrando {cuentasFiltradas.length} de {cuentasPorCobrar.length} cuentas
          </Typography>
        </CardFooter>
      </Card>
      
      {/* Modal de Pago */}
      <Dialog open={openModal} handler={() => setOpenModal(false)} size="sm">
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h6">Registrar Pago</Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenModal(false)}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody divider className="overflow-y-auto">
          {cuentaSeleccionada && (
            <div className="flex flex-col gap-4">
              <div className="bg-blue-gray-50 p-4 rounded-md">
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Datos del Comprobante
                </Typography>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <Typography variant="small" className="text-blue-gray-600">
                      Comprobante:
                    </Typography>
                    <Typography variant="small" className="font-medium">
                      {formatSeriesNumber(cuentaSeleccionada.series, cuentaSeleccionada.number)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600">
                      Cliente:
                    </Typography>
                    <Typography variant="small" className="font-medium">
                      {cuentaSeleccionada.client_name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600">
                      Total:
                    </Typography>
                    <Typography variant="small" className="font-medium">
                      {formatCurrency(cuentaSeleccionada.total_amount, cuentaSeleccionada.currency_code)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600">
                      Saldo Pendiente:
                    </Typography>
                    <Typography variant="small" className="font-medium">
                      {formatCurrency(cuentaSeleccionada.balance, cuentaSeleccionada.currency_code)}
                    </Typography>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-2">
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Datos del Pago
                </Typography>
                
                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Fecha de Pago
                  </Typography>
                  <Input 
                    type="date" 
                    value={nuevoPago.payment_date}
                    onChange={(e) => setNuevoPago({...nuevoPago, payment_date: e.target.value})}
                    icon={<CalendarDaysIcon className="h-5 w-5 text-blue-gray-300" />}
                  />
                </div>
                
                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Monto Pagado
                  </Typography>
                  <Input 
                    type="number" 
                    step="0.01"
                    min="0"
                    max={cuentaSeleccionada.balance}
                    value={nuevoPago.amount}
                    onChange={(e) => setNuevoPago({...nuevoPago, amount: parseFloat(e.target.value) || 0})}
                    icon={<CurrencyDollarIcon className="h-5 w-5 text-blue-gray-300" />}
                  />
                </div>
                
                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Método de Pago
                  </Typography>
                  <Select 
                    value={nuevoPago.payment_method}
                    onChange={(val) => setNuevoPago({...nuevoPago, payment_method: val})}
                  >
                    {metodoPagoOptions.map((method) => (
                      <Option key={method.value} value={method.value}>
                        {method.label}
                      </Option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Referencia
                  </Typography>
                  <Input 
                    placeholder="Nº Operación, Voucher, etc."
                    value={nuevoPago.reference}
                    onChange={(e) => setNuevoPago({...nuevoPago, reference: e.target.value})}
                  />
                </div>
                
                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Notas
                  </Typography>
                  <Textarea 
                    placeholder="Observaciones sobre el pago"
                    value={nuevoPago.notes}
                    onChange={(e) => setNuevoPago({...nuevoPago, notes: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button variant="outlined" color="red" onClick={() => setOpenModal(false)}>
            Cancelar
          </Button>
          <Button color="green" onClick={handleRegistrarPago}>
            Registrar Pago
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

// Keep the default export
export default GestionPagos;