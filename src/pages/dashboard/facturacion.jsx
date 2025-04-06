// src/pages/dashboard/facturacion.jsx
import React from "react";
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
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { StatisticsCard } from "@/widgets/cards";
import { ventasRecientes, resumenFacturacion } from "@/data";

export function Facturacion() {
  return (
    <div className="mt-12">
      <div className="mb-12 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Facturación - Transportes Romero
          </Typography>
          <Link to="/dashboard/nueva-venta">
            <Button className="flex items-center gap-2" size="sm">
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              Crear Nueva Venta
            </Button>
          </Link>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Sistema de facturación para la gestión de ventas y emisión de comprobantes electrónicos
        </Typography>
      </div>

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Ventas Recientes
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <span className="font-semibold">Últimos comprobantes emitidos</span>
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Ver Todas</MenuItem>
                <MenuItem>Exportar a Excel</MenuItem>
                <MenuItem>Filtrar por Cliente</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Comprobante", "Cliente", "Fecha", "Monto", "Estado", "Acciones"].map(
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
                {ventasRecientes.map(
                  ({ id, tipo, cliente, fecha, monto, estado }, key) => {
                    const className = `py-3 px-5 ${
                      key === ventasRecientes.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={id}>
                        <td className={className}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {id}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal"
                            >
                              {tipo}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {cliente}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fecha}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {monto}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={estado === "Pagado" ? "green" : "blue-gray"}
                            value={estado}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
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
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Facturacion;