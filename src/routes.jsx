// src/routes.jsx
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ReceiptPercentIcon,
  CubeIcon,
  UserGroupIcon,
  DocumentTextIcon, 
  ArchiveBoxXMarkIcon,
  DocumentChartBarIcon,
  BanknotesIcon,
  CogIcon,
  UsersIcon
} from "@heroicons/react/24/solid";

import { 
  Home,
  Profile, 
  Tables, 
  Notifications, 
  Facturacion, 
  Productos, 
  Clientes, 
  NuevaVenta,
  NotaCredito,
  NotaDebito,
  ComunicacionBaja,
  DetalleComprobante,
  GestionPagos,
  ReporteVentas,
  ConfiguracionSistema,
  GestionUsuarios
} from "@/pages/dashboard";

import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "panel de control",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "comprobantes",
        path: "/comprobantes",
        element: <Facturacion />,
      },
      {
        path: "/nueva-venta",
        element: <NuevaVenta />,
      },
      {
        path: "/nota-credito",
        element: <NotaCredito />,
      },
      {
        path: "/nota-debito",
        element: <NotaDebito />,
      },
      {
        path: "/comunicacion-baja",
        element: <ComunicacionBaja />,
      },
      {
        path: "/comprobante/:id",
        element: <DetalleComprobante />,
      },
      {
        icon: <BanknotesIcon {...icon} />,
        name: "pagos",
        path: "/pagos",
        element: <GestionPagos />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "reportes",
        path: "/reportes",
        element: <ReporteVentas />,
      },
      {
        icon: <CubeIcon {...icon} />,
        name: "productos/servicios",
        path: "/productos",
        element: <Productos />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "clientes",
        path: "/clientes",
        element: <Clientes />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "usuarios",
        path: "/usuarios",
        element: <GestionUsuarios />,
      },
      {
        icon: <CogIcon {...icon} />,
        name: "configuración",
        path: "/configuracion",
        element: <ConfiguracionSistema />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "perfil",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tablas",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notificaciones",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "páginas de autenticación",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "iniciar sesión",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "registrarse",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;