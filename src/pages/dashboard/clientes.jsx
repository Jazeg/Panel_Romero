// src/pages/dashboard/clientes.jsx
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
  Input,
  Chip,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { clientes } from "@/data";

export function Clientes() {
  return (
    <div className="mt-12">
      <div className="mb-12 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Gestión de Clientes
          </Typography>
          <Button className="flex items-center gap-2" size="sm">
            <PlusIcon strokeWidth={3} className="h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Administra la información de los clientes de Transportes Romero
        </Typography>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6">
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Lista de Clientes
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-64 relative">
                <Input 
                  label="Buscar cliente" 
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
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
                  <MenuItem>Exportar a Excel</MenuItem>
                  <MenuItem>Importar desde Excel</MenuItem>
                  <MenuItem>Enviar comunicado masivo</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Cliente", "Documento", "Contacto", "Dirección", "Acciones"].map(
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
                {clientes.map(
                  ({ id, nombre, tipoDoc, documento, direccion, telefono, email }, key) => {
                    const className = `py-3 px-5 ${
                      key === clientes.length - 1
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
                              {nombre}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal opacity-70"
                            >
                              {id}
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
                              {documento}
                            </Typography>
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={tipoDoc}
                              color={tipoDoc === "RUC" ? "blue" : "amber"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                              <PhoneIcon className="h-4 w-4 text-blue-gray-500" />
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {telefono}
                              </Typography>
                            </div>
                            <div className="flex items-center gap-1">
                              <EnvelopeIcon className="h-4 w-4 text-blue-gray-500" />
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4 text-blue-gray-500" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {direccion}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex gap-2">
                            <Button size="sm" variant="text" className="text-xs">
                              Editar
                            </Button>
                            <Button size="sm" variant="text" className="text-xs">
                              Ver Historial
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

export default Clientes;