import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Select,
  Option,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import Chart from "react-apexcharts";
import {
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ChartBarIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

// Datos simulados para los reportes
const datosVentas = {
  // KPIs para el periodo seleccionado
  kpis: {
    total_ventas: 86520.75,
    total_facturas: 45,
    total_boletas: 72,
    total_notas_credito: 5,
    promedio_venta: 739.49,
    clientes_nuevos: 12,
    total_clientes: 28,
    importe_pendiente: 12450.30
  },
  
  // Datos para gráficos
  ventas_por_dia: [
    { fecha: '2025-04-01', monto: 3500.50 },
    { fecha: '2025-04-02', monto: 2890.75 },
    { fecha: '2025-04-03', monto: 3120.25 },
    { fecha: '2025-04-04', monto: 4250.00 },
    { fecha: '2025-04-05', monto: 3900.80 },
    { fecha: '2025-04-06', monto: 2100.45 },
    { fecha: '2025-04-07', monto: 3450.25 },
    { fecha: '2025-04-08', monto: 2950.50 },
    { fecha: '2025-04-09', monto: 3800.75 },
    { fecha: '2025-04-10', monto: 4100.20 },
    { fecha: '2025-04-11', monto: 3250.30 },
    { fecha: '2025-04-12', monto: 2500.40 },
    { fecha: '2025-04-13', monto: 1900.80 },
    { fecha: '2025-04-14', monto: 3650.60 },
    { fecha: '2025-04-15', monto: 4200.90 }
  ],
  
  ventas_por_producto: [
    { producto: 'Transporte de carga - Ruta Iquitos-Pucallpa', cantidad: 32, monto: 38400.00 },
    { producto: 'Transporte de carga - Ruta Pucallpa-Iquitos', cantidad: 28, monto: 33600.00 },
    { producto: 'Transporte de pasajeros - Ruta Iquitos-Pucallpa', cantidad: 22, monto: 7700.00 },
    { producto: 'Transporte de pasajeros - Ruta Pucallpa-Iquitos', cantidad: 18, monto: 6300.00 },
    { producto: 'Alquiler de embarcación - Media jornada', cantidad: 2, monto: 7600.00 }
  ],
  
  ventas_por_tipo_documento: [
    { tipo: 'Factura', cantidad: 45, monto: 68120.50 },
    { tipo: 'Boleta', cantidad: 72, monto: 21350.25 },
    { tipo: 'Nota de Crédito', cantidad: 5, monto: -2950.00 }
  ],
  
  ventas_por_cliente: [
    { cliente: 'Comercial Los Andes S.A.C.', monto: 12850.00 },
    { cliente: 'Inversiones del Oriente E.I.R.L.', monto: 9750.50 },
    { cliente: 'Transportes Unidos S.A.C.', monto: 8200.25 },
    { cliente: 'Distribuidora Central del Perú', monto: 7300.00 },
    { cliente: 'Otros', monto: 48420.00 }
  ],
  
  // Listado de los últimos comprobantes emitidos
  ultimos_comprobantes: [
    { id: 1, tipo: '01', serie_numero: 'F001-00153', cliente: 'Comercial Los Andes S.A.C.', fecha: '2025-04-15', monto: 4250.00, estado: 'ACCEPTED' },
    { id: 2, tipo: '03', serie_numero: 'B001-00245', cliente: 'María Sánchez López', fecha: '2025-04-15', monto: 350.00, estado: 'ACCEPTED' },
    { id: 3, tipo: '01', serie_numero: 'F001-00152', cliente: 'Inversiones del Oriente E.I.R.L.', fecha: '2025-04-14', monto: 2850.00, estado: 'ACCEPTED' },
    { id: 4, tipo: '07', serie_numero: 'FC01-00033', cliente: 'Transportes Unidos S.A.C.', fecha: '2025-04-14', monto: -850.00, estado: 'ACCEPTED' },
    { id: 5, tipo: '01', serie_numero: 'F001-00151', cliente: 'Distribuidora Central del Perú', fecha: '2025-04-13', monto: 3500.00, estado: 'REJECTED' }
  ]
};

// Configuraciones para los gráficos
const chartConfigs = {
  ventasPorDia: {
    type: "line",
    height: 280,
    series: [
      {
        name: "Ventas Diarias",
        data: datosVentas.ventas_por_dia.map(item => item.monto)
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        categories: datosVentas.ventas_por_dia.map(item => {
          const date = new Date(item.fecha);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        }),
        labels: {
          style: {
            colors: "#37474f",
            fontSize: "13px",
            fontFamily: "inherit",
            fontWeight: 300,
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#37474f",
            fontSize: "13px",
            fontFamily: "inherit",
            fontWeight: 300,
          },
          formatter: (value) => `S/ ${value.toFixed(0)}`
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    }
  },
  
  ventasPorProducto: {
    type: "bar",
    height: 280,
    series: [
      {
        name: "Ventas por Producto",
        data: datosVentas.ventas_por_producto.map(item => item.monto)
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#388e3c"],
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "50%",
        },
      },
      xaxis: {
        categories: datosVentas.ventas_por_producto.map(item => {
          // Acortar nombres de productos para mejor visualización
          return item.producto.length > 25 
            ? item.producto.substring(0, 25) + '...' 
            : item.producto;
        }),
        labels: {
          style: {
            colors: "#37474f",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 300,
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#37474f",
            fontSize: "13px",
            fontFamily: "inherit",
            fontWeight: 300,
          },
          formatter: (value) => `S/ ${value.toFixed(0)}`
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    }
  },
  
  ventasPorTipoDocumento: {
    type: "donut",
    height: 280,
    series: datosVentas.ventas_por_tipo_documento
      .filter(item => item.monto > 0) // Filtrar notas de crédito para el gráfico
      .map(item => item.monto),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      colors: ["#0288d1", "#0097a7", "#009688"],
      labels: datosVentas.ventas_por_tipo_documento
        .filter(item => item.monto > 0)
        .map(item => item.tipo),
      dataLabels: {
        enabled: true,
        formatter: (val) => `${Math.round(val)}%`,
      },
      legend: {
        position: "bottom",
        fontFamily: "inherit",
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => `S/ ${value.toFixed(2)}`
        }
      },
    }
  },
  
  ventasPorCliente: {
    type: "pie",
    height: 280,
    series: datosVentas.ventas_por_cliente.map(item => item.monto),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      colors: ["#d81b60", "#8e24aa", "#5e35b1", "#3949ab", "#1e88e5"],
      labels: datosVentas.ventas_por_cliente.map(item => item.cliente),
      dataLabels: {
        enabled: true,
        formatter: (val) => `${Math.round(val)}%`,
      },
      legend: {
        position: "bottom",
        fontFamily: "inherit",
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => `S/ ${value.toFixed(2)}`
        }
      },
    }
  }
};

// Add named export alongside default export
export function ReporteVentas() {
  return <FormularioReporteVentas />;
}

// Keep the existing component but make it a regular function
function FormularioReporteVentas() {
  const [rangeFechas, setRangeFechas] = useState({
    fechaInicio: '2025-04-01',
    fechaFin: '2025-04-15'
  });
  
  const [activeTab, setActiveTab] = useState("general");
  
  // Formateo de moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };
  
  // En una implementación real, esta función llamaría a una API
  const handleFiltrar = () => {
    console.log("Filtrando por fechas:", rangeFechas);
    // Aquí se recargarían los datos
  };
  
  const handleExportar = (formato) => {
    console.log(`Exportando reporte en formato ${formato}`);
    // Lógica para exportar reporte
  };
  
  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Reportes de Ventas
          </Typography>
          <div className="flex gap-2">
            <Button
              className="flex items-center gap-2"
              size="sm"
              variant="outlined"
              onClick={() => handleExportar('excel')}
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
              Exportar Excel
            </Button>
            <Button
              className="flex items-center gap-2"
              size="sm"
              variant="outlined"
              onClick={() => handleExportar('pdf')}
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Visualice y analice las ventas de Transportes Romero
        </Typography>
      </div>
      
      {/* Filtros */}
      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm mb-6">
        <CardBody className="p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Fecha Inicio
              </Typography>
              <Input
                type="date"
                value={rangeFechas.fechaInicio}
                onChange={(e) => setRangeFechas({...rangeFechas, fechaInicio: e.target.value})}
                icon={<CalendarDaysIcon className="h-5 w-5 text-blue-gray-300" />}
                className="w-40"
              />
            </div>
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Fecha Fin
              </Typography>
              <Input
                type="date"
                value={rangeFechas.fechaFin}
                onChange={(e) => setRangeFechas({...rangeFechas, fechaFin: e.target.value})}
                icon={<CalendarDaysIcon className="h-5 w-5 text-blue-gray-300" />}
                className="w-40"
              />
            </div>
            <div>
              <Typography variant="small" className="font-medium mb-2">
                Tipo de Documento
              </Typography>
              <Select label="Todos" className="w-48">
                <Option value="all">Todos</Option>
                <Option value="01">Facturas</Option>
                <Option value="03">Boletas</Option>
                <Option value="07">Notas de Crédito</Option>
              </Select>
            </div>
            <div className="ml-auto">
              <Button
                className="flex items-center gap-2"
                onClick={handleFiltrar}
              >
                <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Periodo seleccionado */}
      <div className="bg-blue-gray-50 p-4 rounded-md mb-6">
        <Typography variant="small" className="font-medium">
          Mostrando datos para el periodo: {formatDate(rangeFechas.fechaInicio)} - {formatDate(rangeFechas.fechaFin)}
        </Typography>
      </div>
      
      {/* KPIs */}
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color="blue"
          value={formatCurrency(datosVentas.kpis.total_ventas)}
          title="Ventas Totales"
          icon={React.createElement(BanknotesIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+12%</strong>
              &nbsp;que periodo anterior
            </Typography>
          }
        />
        <StatisticsCard
          color="purple"
          value={`${datosVentas.kpis.total_facturas + datosVentas.kpis.total_boletas}`}
          title="Comprobantes Emitidos"
          icon={React.createElement(ReceiptPercentIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              {datosVentas.kpis.total_facturas} Facturas | {datosVentas.kpis.total_boletas} Boletas
            </Typography>
          }
        />
        <StatisticsCard
          color="green"
          value={datosVentas.kpis.total_clientes.toString()}
          title="Clientes Atendidos"
          icon={React.createElement(UserGroupIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">{datosVentas.kpis.clientes_nuevos} nuevos</strong>
              &nbsp;en este periodo
            </Typography>
          }
        />
        <StatisticsCard
          color="orange"
          value={formatCurrency(datosVentas.kpis.promedio_venta)}
          title="Valor Promedio"
          icon={React.createElement(ShoppingBagIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              Por comprobante emitido
            </Typography>
          }
        />
      </div>
      
      {/* Tabs para diferentes tipos de reportes */}
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader>
          <Tab value="general">
            Visión General
          </Tab>
          <Tab value="productos">
            Por Productos
          </Tab>
          <Tab value="clientes">
            Por Clientes
          </Tab>
          <Tab value="documentos">
            Por Tipo de Documento
          </Tab>
        </TabsHeader>
        
        <TabsBody animate={{
          initial: {opacity: 0},
          mount: {opacity: 1},
          unmount: {opacity: 0},
        }}>
          {/* Tab Visión General */}
          <TabPanel value="general" className="p-0 py-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Ventas Diarias
                  </Typography>
                </CardHeader>
                <CardBody className="px-6 pt-0 pb-6">
                  <Chart 
                    {...chartConfigs.ventasPorDia}
                  />
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Distribución por Tipo de Documento
                  </Typography>
                </CardHeader>
                <CardBody className="px-6 pt-0 pb-6">
                  <Chart 
                    {...chartConfigs.ventasPorTipoDocumento}
                  />
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm lg:col-span-2">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Últimos Comprobantes Emitidos
                  </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Comprobante", "Fecha", "Cliente", "Monto", "Estado"].map(
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
                        {datosVentas.ultimos_comprobantes.map((doc) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";
                          
                          // Determinar color del estado
                          let estadoColor = "blue-gray";
                          if (doc.estado === "ACCEPTED") estadoColor = "green";
                          if (doc.estado === "REJECTED") estadoColor = "red";
                          
                          // Determinar tipo de documento
                          let tipoDoc = "Factura";
                          if (doc.tipo === "03") tipoDoc = "Boleta";
                          if (doc.tipo === "07") tipoDoc = "Nota Crédito";
                          if (doc.tipo === "08") tipoDoc = "Nota Débito";

                          return (
                            <tr key={doc.id}>
                              <td className={className}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {doc.serie_numero}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-xs font-normal"
                                  >
                                    {tipoDoc}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {doc.fecha}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {doc.cliente}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color={doc.tipo === "07" ? "red" : "blue-gray"}
                                  className="font-medium"
                                >
                                  {formatCurrency(doc.monto)}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color={estadoColor}
                                  className="font-medium"
                                >
                                  {doc.estado}
                                </Typography>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabPanel>
          
          {/* Tab Por Productos */}
          <TabPanel value="productos" className="p-0 py-4">
            <div className="grid grid-cols-1 gap-6">
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Ventas por Producto/Servicio
                  </Typography>
                </CardHeader>
                <CardBody className="px-6 pt-0 pb-6">
                  <Chart 
                    {...chartConfigs.ventasPorProducto}
                  />
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Detalle de Ventas por Producto
                  </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Producto/Servicio", "Cantidades", "Monto Total", "% del Total"].map(
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
                        {datosVentas.ventas_por_producto.map((producto, index) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";
                          // Calcular porcentaje del total
                          const porcentaje = (producto.monto / datosVentas.kpis.total_ventas) * 100;
                          
                          return (
                            <tr key={index}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {producto.producto}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {producto.cantidad}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {formatCurrency(producto.monto)}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {porcentaje.toFixed(2)}%
                                </Typography>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabPanel>
          
          {/* Tab Por Clientes */}
          <TabPanel value="clientes" className="p-0 py-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Distribución de Ventas por Cliente
                  </Typography>
                </CardHeader>
                <CardBody className="px-6 pt-0 pb-6">
                  <Chart 
                    {...chartConfigs.ventasPorCliente}
                  />
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Resumen de Clientes
                  </Typography>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-gray-50 p-4 rounded-md text-center">
                      <Typography variant="h3" color="blue-gray">
                        {datosVentas.kpis.total_clientes}
                      </Typography>
                      <Typography variant="small" color="blue-gray">
                        Clientes Atendidos
                      </Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-md text-center">
                      <Typography variant="h3" color="blue-gray">
                        {datosVentas.kpis.clientes_nuevos}
                      </Typography>
                      <Typography variant="small" color="blue-gray">
                        Clientes Nuevos
                      </Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-md text-center col-span-2">
                      <Typography variant="h3" color="blue-gray">
                        {formatCurrency(datosVentas.kpis.total_ventas / datosVentas.kpis.total_clientes)}
                      </Typography>
                      <Typography variant="small" color="blue-gray">
                        Venta Promedio por Cliente
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm lg:col-span-2">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Detalle de Ventas por Cliente
                  </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Cliente", "Monto Total", "% del Total", "# Comprobantes"].map(
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
                        {datosVentas.ventas_por_cliente.map((cliente, index) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";
                          // Calcular porcentaje del total
                          const porcentaje = (cliente.monto / datosVentas.kpis.total_ventas) * 100;
                          // Número ficticio de comprobantes para este ejemplo
                          const numComprobantes = Math.floor(Math.random() * 10) + 1;
                          
                          return (
                            <tr key={index}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {cliente.cliente}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {formatCurrency(cliente.monto)}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {porcentaje.toFixed(2)}%
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {numComprobantes}
                                </Typography>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabPanel>
          
          {/* Tab Por Tipo de Documento */}
          <TabPanel value="documentos" className="p-0 py-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Distribución por Tipo de Documento
                  </Typography>
                </CardHeader>
                <CardBody className="px-6 pt-0 pb-6">
                  <Chart 
                    {...chartConfigs.ventasPorTipoDocumento}
                  />
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Resumen por Tipo de Documento
                  </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Tipo de Documento", "Cantidad", "Monto Total", "% del Total"].map(
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
                        {datosVentas.ventas_por_tipo_documento.map((tipo, index) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";
                          // Calcular porcentaje del total (para las notas de crédito, usar valor absoluto)
                          const montoAbs = Math.abs(tipo.monto);
                          const porcentaje = (montoAbs / datosVentas.kpis.total_ventas) * 100;
                          
                          return (
                            <tr key={index}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {tipo.tipo}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {tipo.cantidad}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color={tipo.tipo === 'Nota de Crédito' ? "red" : "blue-gray"}
                                  className="font-medium"
                                >
                                  {formatCurrency(tipo.monto)}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {porcentaje.toFixed(2)}%
                                </Typography>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden border border-blue-gray-100 shadow-sm lg:col-span-2">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray">
                    Estado de Documentos en SUNAT
                  </Typography>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-md text-center">
                      <Typography variant="h3" color="green">
                        115
                      </Typography>
                      <Typography variant="small" color="green">
                        Aceptados
                      </Typography>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-md text-center">
                      <Typography variant="h3" color="amber">
                        3
                      </Typography>
                      <Typography variant="small" color="amber">
                        Observados
                      </Typography>
                    </div>
                    <div className="bg-red-50 p-4 rounded-md text-center">
                      <Typography variant="h3" color="red">
                        1
                      </Typography>
                      <Typography variant="small" color="red">
                        Rechazados
                      </Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-md text-center">
                      <Typography variant="h3" color="blue-gray">
                        2
                      </Typography>
                      <Typography variant="small" color="blue-gray">
                        Pendientes
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}