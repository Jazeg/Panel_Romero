import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  PlusIcon,
  ArrowPathIcon,
  DocumentChartBarIcon,
  ReceiptRefundIcon,
  DocumentTextIcon,
  ArchiveBoxXMarkIcon
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { 
  ReceiptPercentIcon, 
  DocumentDuplicateIcon, 
  TruckIcon,
  BanknotesIcon
} from "@heroicons/react/24/solid";

// Datos que eventualmente vendrán de una API
const resumenFacturacion = [
  {
    title: "Ventas del Mes",
    value: "S/ 45,200.00",
    icon: BanknotesIcon,
    footer: {
      color: "text-green-500",
      value: "+12%",
      label: "que el mes anterior",
    },
  },
  {
    title: "Por Cobrar",
    value: "S/ 12,350.00",
    icon: ReceiptPercentIcon,
    footer: {
      color: "text-red-500",
      value: "+8%",
      label: "que el mes anterior",
    },
  },
  {
    title: "Comprobantes",
    value: "68",
    icon: DocumentDuplicateIcon,
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "que el mes anterior",
    },
  },
  {
    title: "Servicios",
    value: "86",
    icon: TruckIcon,
    footer: {
      color: "text-green-500",
      value: "+10%",
      label: "que el mes anterior",
    },
  },
];

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

// Datos simulados de facturas
const facturas = [
  {
    id: 1,
    document_type_code: '01',
    series: 'F001',
    number: 152,
    client_name: 'Comercial Los Andes S.A.C.',
    client_doc: '20512376218',
    issue_date: '2025-04-05',
    total_payable: 2850.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN'
  },
  {
    id: 2,
    document_type_code: '03',
    series: 'B001',
    number: 243,
    client_name: 'María Sánchez López',
    client_doc: '45678912',
    issue_date: '2025-04-05',
    total_payable: 450.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN'
  },
  {
    id: 3,
    document_type_code: '01',
    series: 'F001',
    number: 153,
    client_name: 'Inversiones del Oriente E.I.R.L.',
    client_doc: '20493817265',
    issue_date: '2025-04-04',
    total_payable: 3500.00,
    sunat_status: 'PENDING',
    currency_code: 'PEN'
  },
  {
    id: 4,
    document_type_code: '07',
    series: 'FC01',
    number: 32,
    client_name: 'Comercial Los Andes S.A.C.',
    client_doc: '20512376218',
    issue_date: '2025-04-03',
    total_payable: 580.00,
    sunat_status: 'ACCEPTED',
    currency_code: 'PEN',
    affected_document: 'F001-142'
  },
  {
    id: 5,
    document_type_code: '01',
    series: 'F001',
    number: 151,
    client_name: 'Transportes Unidos S.A.C.',
    client_doc: '20567891234',
    issue_date: '2025-04-03',
    total_payable: 5200.00,
    sunat_status: 'REJECTED',
    currency_code: 'PEN'
  }
];

// Datos simulados de notas de crédito
const notasCredito = [
  {
    id: 1,
    series: 'FC01',
    number: 32,
    client_name: 'Comercial Los Andes S.A.C.',
    client_doc: '20512376218',
    issue_date: '2025-04-03',
    total_payable: 580.00,
    sunat_status: 'ACCEPTED',
    affected_document: 'F001-142',
    reason: 'Descuento por pronto pago'
  },
  {
    id: 2,
    series: 'FC01',
    number: 31,
    client_name: 'Inversiones del Oriente E.I.R.L.',
    client_doc: '20493817265',
    issue_date: '2025-04-01',
    total_payable: 850.00,
    sunat_status: 'ACCEPTED',
    affected_document: 'F001-148',
    reason: 'Anulación parcial del servicio'
  }
];

// Datos simulados de notas de débito
const notasDebito = [
  {
    id: 1,
    series: 'FD01',
    number: 15,
    client_name: 'Comercial Los Andes S.A.C.',
    client_doc: '20512376218',
    issue_date: '2025-04-02',
    total_payable: 120.00,
    sunat_status: 'ACCEPTED',
    affected_document: 'F001-142',
    reason: 'Intereses por pago tardío'
  }
];

// Datos simulados de comunicaciones de baja y resúmenes
const comunicaciones = [
  {
    id: 1,
    identifier: 'RA-20250402-1',
    generation_date: '2025-04-02',
    sunat_status: 'ACCEPTED',
    sunat_ticket: '202504021234567',
    items: 2,
    type: 'VOIDED'
  },
  {
    id: 2,
    identifier: 'RC-20250401-1',
    generation_date: '2025-04-01',
    sunat_status: 'ACCEPTED',
    sunat_ticket: '202504011234568',
    items: 5,
    type: 'SUMMARY'
  }
];

// Add named export
export function Facturacion() {
  const [activeTab, setActiveTab] = useState("facturas");
  
  const formatSeriesNumber = (series, number) => {
    return `${series}-${number.toString().padStart(6, '0')}`;
  };
  
  const getDocumentTypeLabel = (code) => {
    const labels = {
      '01': 'Factura',
      '03': 'Boleta',
      '07': 'Nota de Crédito',
      '08': 'Nota de Débito'
    };
    return labels[code] || code;
  };
  
  const renderEstadoChip = (estado) => (
    <Chip
      variant="gradient"
      color={estadoSunatColor[estado]}
      value={estadoSunatLabel[estado]}
      className="py-0.5 px-2 text-[11px] font-medium w-fit"
    />
  );

  const handleNuevaVenta = () => {
    window.location.href = "/dashboard/nueva-venta";
  };

  const handleNuevaNota = (tipo) => {
    window.location.href = `/dashboard/${tipo}`;
  };

  return (
    <div className="mt-12">
      <div className="mb-12 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Facturación - Transportes Romero
          </Typography>
          <div className="flex gap-2">
            <Button 
              className="flex items-center gap-2" 
              size="sm"
              onClick={handleNuevaVenta}
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              Nueva Venta
            </Button>
            <Menu placement="bottom-end">
              <MenuHandler>
                <Button className="flex items-center gap-2" size="sm" variant="outlined">
                  <PlusIcon strokeWidth={3} className="h-4 w-4" />
                  Más opciones
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2" onClick={() => handleNuevaNota('nueva-nota-credito')}>
                  <ReceiptRefundIcon strokeWidth={2} className="h-4 w-4" />
                  Nueva Nota de Crédito
                </MenuItem>
                <MenuItem className="flex items-center gap-2" onClick={() => handleNuevaNota('nueva-nota-debito')}>
                  <DocumentTextIcon strokeWidth={2} className="h-4 w-4" />
                  Nueva Nota de Débito
                </MenuItem>
                <MenuItem className="flex items-center gap-2" onClick={() => handleNuevaNota('comunicacion-baja')}>
                  <ArchiveBoxXMarkIcon strokeWidth={2} className="h-4 w-4" />
                  Comunicación de Baja
                </MenuItem>
                <MenuItem className="flex items-center gap-2" onClick={() => handleNuevaNota('reporte-ventas')}>
                  <DocumentChartBarIcon strokeWidth={2} className="h-4 w-4" />
                  Reportes de Ventas
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Sistema de facturación electrónica SUNAT para la gestión de ventas y emisión de comprobantes
        </Typography>
      </div>

      <div className="mb-12 grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resumenFacturacion.map(({ icon, title, value, footer }) => (
          <StatisticsCard
            key={title}
            color="gray"
            value={value}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Gestión de Comprobantes Electrónicos
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <span>Visualice y administre todos sus comprobantes electrónicos</span>
              </Typography>
            </div>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2"
              size="sm"
            >
              <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
              Actualizar
            </Button>
          </div>

          <div className="mt-6">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="facturas">
                  Facturas / Boletas
                </Tab>
                <Tab value="notascredito">
                  Notas de Crédito
                </Tab>
                <Tab value="notasdebito">
                  Notas de Débito
                </Tab>
                <Tab value="comunicaciones">
                  Comunicaciones SUNAT
                </Tab>
              </TabsHeader>
              
              <TabsBody animate={{
                initial: {opacity: 0, y: 250},
                mount: {opacity: 1, y: 0},
                unmount: {opacity: 0, y: 250},
              }}>
                <TabPanel value="facturas">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Comprobante", "Cliente", "Fecha", "Monto", "Estado SUNAT", "Acciones"].map(
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
                        {facturas.map((factura) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";

                          return (
                            <tr key={`${factura.series}-${factura.number}`}>
                              <td className={className}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {formatSeriesNumber(factura.series, factura.number)}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-xs font-normal"
                                  >
                                    {getDocumentTypeLabel(factura.document_type_code)}
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
                                    {factura.client_name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-xs font-normal opacity-70"
                                  >
                                    {factura.client_doc}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {factura.issue_date}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {factura.currency_code === 'PEN' ? 'S/ ' : 'US$ '}
                                  {factura.total_payable.toFixed(2)}
                                </Typography>
                              </td>
                              <td className={className}>
                                {renderEstadoChip(factura.sunat_status)}
                              </td>
                              <td className={className}>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="text" className="text-xs">
                                    Ver
                                  </Button>
                                  <Button size="sm" variant="text" className="text-xs">
                                    Imprimir
                                  </Button>
                                  <Menu placement="bottom-end">
                                    <MenuHandler>
                                      <IconButton variant="text" size="sm">
                                        <EllipsisVerticalIcon className="h-5 w-5" />
                                      </IconButton>
                                    </MenuHandler>
                                    <MenuList>
                                      <MenuItem>Enviar por email</MenuItem>
                                      <MenuItem>Descargar XML</MenuItem>
                                      <MenuItem>Descargar CDR</MenuItem>
                                      <MenuItem>Ver en SUNAT</MenuItem>
                                      {factura.sunat_status === 'PENDING' && (
                                        <MenuItem>Enviar a SUNAT</MenuItem>
                                      )}
                                    </MenuList>
                                  </Menu>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
                
                <TabPanel value="notascredito">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Nota de Crédito", "Cliente", "Doc. Afectado", "Motivo", "Monto", "Estado", "Acciones"].map(
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
                        {notasCredito.map((nota) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";

                          return (
                            <tr key={`${nota.series}-${nota.number}`}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {formatSeriesNumber(nota.series, nota.number)}
                                </Typography>
                              </td>
                              <td className={className}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {nota.client_name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-xs font-normal opacity-70"
                                  >
                                    {nota.client_doc}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {nota.affected_document}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {nota.reason}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  S/ {nota.total_payable.toFixed(2)}
                                </Typography>
                              </td>
                              <td className={className}>
                                {renderEstadoChip(nota.sunat_status)}
                              </td>
                              <td className={className}>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="text" className="text-xs">
                                    Ver
                                  </Button>
                                  <Button size="sm" variant="text" className="text-xs">
                                    Imprimir
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
                
                <TabPanel value="notasdebito">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Nota de Débito", "Cliente", "Doc. Afectado", "Motivo", "Monto", "Estado", "Acciones"].map(
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
                        {notasDebito.map((nota) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";

                          return (
                            <tr key={`${nota.series}-${nota.number}`}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {formatSeriesNumber(nota.series, nota.number)}
                                </Typography>
                              </td>
                              <td className={className}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {nota.client_name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-xs font-normal opacity-70"
                                  >
                                    {nota.client_doc}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {nota.affected_document}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {nota.reason}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  S/ {nota.total_payable.toFixed(2)}
                                </Typography>
                              </td>
                              <td className={className}>
                                {renderEstadoChip(nota.sunat_status)}
                              </td>
                              <td className={className}>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="text" className="text-xs">
                                    Ver
                                  </Button>
                                  <Button size="sm" variant="text" className="text-xs">
                                    Imprimir
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
                
                <TabPanel value="comunicaciones">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Identificador", "Tipo", "Fecha", "Ticket", "Estado", "Elementos", "Acciones"].map(
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
                        {comunicaciones.map((com) => {
                          const className = "py-3 px-5 border-b border-blue-gray-50";
                          const tipoLabel = com.type === 'VOIDED' ? 'Baja' : 'Resumen';

                          return (
                            <tr key={com.identifier}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {com.identifier}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  color={com.type === 'VOIDED' ? 'red' : 'blue'}
                                  value={tipoLabel}
                                  className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                />
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {com.generation_date}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {com.sunat_ticket}
                                </Typography>
                              </td>
                              <td className={className}>
                                {renderEstadoChip(com.sunat_status)}
                              </td>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {com.items}
                                </Typography>
                              </td>
                              <td className={className}>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="text" className="text-xs">
                                    Ver Detalle
                                  </Button>
                                  <Button size="sm" variant="text" className="text-xs">
                                    Descargar XML
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
