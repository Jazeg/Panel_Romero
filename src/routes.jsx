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
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Facturacion, Productos, Clientes, NuevaVenta } from "@/pages/dashboard";
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
        icon: <ReceiptPercentIcon {...icon} />,
        name: "facturación",
        path: "/facturacion",
        element: <Facturacion />,
      },
      {
        path: "/nueva-venta",
        element: <NuevaVenta />,
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