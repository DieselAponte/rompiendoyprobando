import { NavItem } from "../models/nav-item.model";

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  // --- MÓDULO PROGRAMACIÓN ---
  {
    displayName: 'MODULO PROGRAMACION',
    requiredRole: 'supervisor_prog', 
    children: [
      { displayName: 'REQ. NO ATENDIDOS', route: '/prog/no-atendidos' },
      { displayName: 'REQ. ATENDIDOS', route: '/prog/atendidos' }
    ]
  },

  // --- MÓDULO DISTRIBUCIÓN ---
  {
    displayName: 'MODULO DISTRIBUCIÓN',
    requiredRole: 'supervisor_dist',
    children: [
      { displayName: 'ASIGNACIÓN DE VEHICULOS', route: '/dist/asignacion' },
      { displayName: 'MONITOREO DE VEHICULOS', route: '/dist/monitoreo' },
      { displayName: 'REPORTES DE ENTREGAS', route: '/dist/reportes' }
    ]
  },

  // --- MÓDULO COMPRAS ---
  {
    displayName: 'MODULO COMPRAS',
    requiredRole: 'supervisor_comp',
    children: [
      { displayName: 'LISTAS DE ORDENES', route: '/compras/ordenes' },
      { displayName: 'GESTION DE PROVEEDORES', route: '/compras/proveedores' }
    ]
  },

  // --- MÓDULO ALMACEN ---
  {
    displayName: 'Módulo Almacen',
    requiredRole: 'supervisor_alm',
    children: [
      { displayName: 'Gestionar Lotes', route: '/GestionAlmacenamiento/lotes' },
      { displayName: 'Ver Inventario', route: '/GestionAlmacenamiento/inventario' }
    ]
  }
];

//ACA SE LE PUEDE INGRESAR LA RUTA DEL ICONO/SVG 
//OH YARA SI ES SVG DEPENDE DE CUAL ES PORQ ESA WBDA MAS LARGO, IGUAL SE PUEDE
