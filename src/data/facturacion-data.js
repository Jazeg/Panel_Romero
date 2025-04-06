// src/data/facturacion-data.js
import {
    ReceiptPercentIcon,
    ShoppingCartIcon,
    UserIcon,
    DocumentDuplicateIcon,
    TruckIcon,
  } from "@heroicons/react/24/solid";
  
  // Datos de ventas recientes
  export const ventasRecientes = [
    {
      id: "F001-00001",
      tipo: "Factura",
      cliente: "Comercial Los Andes S.A.C.",
      fecha: "05/04/2025",
      monto: "S/ 2,850.00",
      estado: "Pagado",
      ruc: "20512376218"
    },
    {
      id: "B001-00015",
      tipo: "Boleta",
      cliente: "María Sánchez López",
      fecha: "05/04/2025",
      monto: "S/ 450.00",
      estado: "Pagado",
      dni: "45678912"
    },
    {
      id: "F001-00002",
      tipo: "Factura",
      cliente: "Inversiones del Oriente E.I.R.L.",
      fecha: "04/04/2025",
      monto: "S/ 3,500.00",
      estado: "Pendiente",
      ruc: "20493817265"
    },
    {
      id: "B001-00014",
      tipo: "Boleta",
      cliente: "Carlos Mendoza Ríos",
      fecha: "04/04/2025",
      monto: "S/ 350.00",
      estado: "Pagado",
      dni: "09876543"
    },
    {
      id: "F001-00003",
      tipo: "Factura",
      cliente: "Transportes Unidos S.A.C.",
      fecha: "03/04/2025",
      monto: "S/ 5,200.00",
      estado: "Pagado",
      ruc: "20567891234"
    },
    {
      id: "F001-00004",
      tipo: "Factura",
      cliente: "Distribuidora Central del Perú",
      fecha: "02/04/2025",
      monto: "S/ 1,800.00",
      estado: "Pagado",
      ruc: "20187654321"
    },
  ];
  
  // Datos de productos/servicios
  export const productos = [
    {
      id: "P001",
      nombre: "Transporte de carga - Ruta Iquitos-Pucallpa",
      descripcion: "Servicio de transporte fluvial de carga general",
      precio: "S/ 1,200.00",
      unidad: "Servicio",
      categoria: "Transporte de carga"
    },
    {
      id: "P002",
      nombre: "Transporte de carga - Ruta Pucallpa-Iquitos",
      descripcion: "Servicio de transporte fluvial de carga general",
      precio: "S/ 1,200.00",
      unidad: "Servicio",
      categoria: "Transporte de carga"
    },
    {
      id: "P003",
      nombre: "Transporte de pasajeros - Ruta Iquitos-Pucallpa",
      descripcion: "Servicio de transporte fluvial de pasajeros",
      precio: "S/ 350.00",
      unidad: "Pasajero",
      categoria: "Transporte de pasajeros"
    },
    {
      id: "P004",
      nombre: "Transporte de pasajeros - Ruta Pucallpa-Iquitos",
      descripcion: "Servicio de transporte fluvial de pasajeros",
      precio: "S/ 350.00",
      unidad: "Pasajero",
      categoria: "Transporte de pasajeros"
    },
    {
      id: "P005",
      nombre: "Transporte de carga ligera - Ruta Iquitos-Nauta",
      descripcion: "Servicio de transporte fluvial de carga ligera",
      precio: "S/ 500.00",
      unidad: "Servicio",
      categoria: "Transporte de carga"
    },
    {
      id: "P006",
      nombre: "Alquiler de embarcación - Media jornada",
      descripcion: "Servicio de alquiler de embarcación por 6 horas",
      precio: "S/ 3,800.00",
      unidad: "Servicio",
      categoria: "Alquiler"
    },
  ];
  
  // Datos de clientes
  export const clientes = [
    {
      id: "C001",
      nombre: "Comercial Los Andes S.A.C.",
      tipoDoc: "RUC",
      documento: "20512376218",
      direccion: "Av. La Marina 1234, San Miguel, Lima",
      telefono: "01-456-7890",
      email: "contacto@losandes.com.pe"
    },
    {
      id: "C002",
      nombre: "María Sánchez López",
      tipoDoc: "DNI",
      documento: "45678912",
      direccion: "Jr. Huallaga 456, Iquitos",
      telefono: "965-432-187",
      email: "maria.sanchez@gmail.com"
    },
    {
      id: "C003",
      nombre: "Inversiones del Oriente E.I.R.L.",
      tipoDoc: "RUC",
      documento: "20493817265",
      direccion: "Av. Abelardo Quiñones 789, Iquitos",
      telefono: "065-23-4567",
      email: "inversionesoriente@gmail.com"
    },
    {
      id: "C004",
      nombre: "Carlos Mendoza Ríos",
      tipoDoc: "DNI",
      documento: "09876543",
      direccion: "Malecón Tarapacá 345, Iquitos",
      telefono: "945-678-123",
      email: "carlos.mendoza@hotmail.com"
    },
    {
      id: "C005",
      nombre: "Transportes Unidos S.A.C.",
      tipoDoc: "RUC",
      documento: "20567891234",
      direccion: "Jr. Putumayo 567, Iquitos",
      telefono: "065-25-6789",
      email: "info@transportesunidos.com.pe"
    },
  ];
  
  // Datos para el resumen de facturación
  export const resumenFacturacion = [
    {
      title: "Ventas del Mes",
      value: "S/ 45,200.00",
      icon: ReceiptPercentIcon,
      footer: {
        color: "text-green-500",
        value: "+12%",
        label: "que el mes anterior",
      },
    },
    {
      title: "Facturas Emitidas",
      value: "32",
      icon: DocumentDuplicateIcon,
      footer: {
        color: "text-green-500",
        value: "+8%",
        label: "que el mes anterior",
      },
    },
    {
      title: "Boletas Emitidas",
      value: "47",
      icon: DocumentDuplicateIcon,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "que el mes anterior",
      },
    },
    {
      title: "Servicios Realizados",
      value: "86",
      icon: TruckIcon,
      footer: {
        color: "text-green-500",
        value: "+10%",
        label: "que el mes anterior",
      },
    },
  ];
  
  export default {
    ventasRecientes,
    productos,
    clientes,
    resumenFacturacion
  };