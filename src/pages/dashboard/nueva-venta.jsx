// src/pages/dashboard/nueva-venta.jsx
import React, { useState } from "react";
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
} from "@material-tailwind/react";
import {
  TrashIcon,
  PlusIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { clientes, productos } from "@/data";

export function NuevaVenta() {
  const [comprobante, setComprobante] = useState("factura");
  const [itemsVenta, setItemsVenta] = useState([{ producto: "", cantidad: 1, precio: 0, subtotal: 0 }]);

  const handleAgregarItem = () => {
    setItemsVenta([...itemsVenta, { producto: "", cantidad: 1, precio: 0, subtotal: 0 }]);
  };

  const handleEliminarItem = (index) => {
    const nuevosItems = [...itemsVenta];
    nuevosItems.splice(index, 1);
    setItemsVenta(nuevosItems);
  };

  return (
    <div className="mt-12">
      <div className="mb-12 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Emitir Nueva Venta
          </Typography>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Generar un nuevo comprobante de venta (Factura o Boleta)
        </Typography>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Datos del Comprobante
              </Typography>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Radio 
                    name="type" 
                    id="factura" 
                    label="Factura" 
                    defaultChecked 
                    onChange={() => setComprobante("factura")}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Radio 
                    name="type" 
                    id="boleta" 
                    label="Boleta" 
                    onChange={() => setComprobante("boleta")}
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Serie y número
                  </Typography>
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <Input 
                        label="Serie" 
                        value={comprobante === "factura" ? "F001" : "B001"} 
                        readOnly
                      />
                    </div>
                    <div className="w-2/3">
                      <Input label="Número" value="00005" readOnly />
                    </div>
                  </div>
                </div>
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Fecha de emisión
                  </Typography>
                  <Input type="date" label="Fecha" value="2025-04-06" />
                </div>
              </div>

              <div className="mt-6">
                <Typography variant="small" className="font-medium mb-2">
                  Cliente
                </Typography>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Select label="Tipo de documento">
                      {comprobante === "factura" ? (
                        <Option>RUC</Option>
                      ) : (
                        <>
                          <Option>DNI</Option>
                          <Option>CE</Option>
                          <Option>Pasaporte</Option>
                        </>
                      )}
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Número de documento" />
                  </div>
                </div>
                <div className="mt-4">
                  <Input label="Nombre/Razón Social" />
                </div>
                <div className="mt-4">
                  <Input label="Dirección" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="mt-6 overflow-hidden border border-blue-gray-100 shadow-sm">
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
                onClick={handleAgregarItem}
              >
                <PlusIcon strokeWidth={3} className="h-4 w-4" />
                Agregar Ítem
              </Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["#", "Producto/Servicio", "Cantidad", "Precio Unitario", "Subtotal", ""].map(
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
                  {itemsVenta.map((item, index) => (
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
                        <Select label="Seleccionar producto">
                          {productos.map((producto) => (
                            <Option key={producto.id} value={producto.id}>
                              {producto.nombre}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50 w-32">
                        <Input
                          type="number"
                          label="Cantidad"
                          value={item.cantidad}
                          min="1"
                        />
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Input
                          label="Precio"
                          value="S/ 0.00"
                        />
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          S/ 0.00
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() => handleEliminarItem(index)}
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
                    S/ 0.00
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography variant="small" color="blue-gray">
                    IGV (18%):
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    S/ 0.00
                  </Typography>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-blue-gray-50">
                  <Typography variant="lead" color="blue-gray" className="font-semibold">
                    Total:
                  </Typography>
                  <Typography variant="h5" color="blue-gray">
                    S/ 0.00
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
                  <Select label="Seleccionar forma de pago">
                    <Option>Contado</Option>
                    <Option>Transferencia</Option>
                    <Option>Tarjeta de Crédito/Débito</Option>
                    <Option>Crédito a 30 días</Option>
                  </Select>
                </div>
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Observaciones
                  </Typography>
                  <Textarea label="Observaciones" />
                </div>
                <Button
                  size="lg"
                  className="mt-4 flex items-center justify-center gap-3"
                  fullWidth
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

export default NuevaVenta;