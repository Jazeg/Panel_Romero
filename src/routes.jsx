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
        icon: <InformationCircleIcon {...icon} />,



      },
    ],
  },

];

export default routes;