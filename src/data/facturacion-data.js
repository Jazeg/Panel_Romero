// src/data/facturacion-data.js
import {
  ReceiptPercentIcon,
  ShoppingCartIcon,
  UserIcon,
  DocumentDuplicateIcon,
  TruckIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";

// Datos de ventas recientes
export const ventasRecientes = [
  {
    id: "F001-00001",
    tipo: "Factura",
    document_type_code: "01",
    series: "F001",
    number: 1,
    cliente: "Comercial Los Andes S.A.C.",
    fecha: "05/04/2025",
    monto: 2850.00,
    estado: "Pagado",
    sunat_status: "ACCEPTED",
    ruc: "20512376218",
    currency_code: "PEN",
    issue_date: "2025-04-05",
    due_date: "2025-05-05",
    operation_type_code: "0101",
    total_taxable: 2415.25,
    total_igv: 434.75,
    total_discount: 0.00,
    total_payable: 2850.00,
    client_id: 1,
    payment_terms: "CREDITO_30",
    notes: "Servicio de transporte programado"
  },
  {
    id: "B001-00015",
    tipo: "Boleta",
    document_type_code: "03",
    series: "B001",
    number: 15,
    cliente: "María Sánchez López",
    fecha: "05/04/2025",
    monto: 450.00,
    estado: "Pagado",
    sunat_status: "ACCEPTED",
    dni: "45678912",
    currency_code: "PEN",
    issue_date: "2025-04-05",
    due_date: "2025-04-05",
    operation_type_code: "0101",
    total_taxable: 381.36,
    total_igv: 68.64,
    total_discount: 0.00,
    total_payable: 450.00,
    client_id: 2,
    payment_terms: "CONTADO",
    notes: ""
  },
  {
    id: "F001-00002",
    tipo: "Factura",
    document_type_code: "01",
    series: "F001",
    number: 2,
    cliente: "Inversiones del Oriente E.I.R.L.",
    fecha: "04/04/2025",
    monto: 3500.00,
    estado: "Pendiente",
    sunat_status: "ACCEPTED",
    ruc: "20493817265",
    currency_code: "PEN",
    issue_date: "2025-04-04",
    due_date: "2025-05-04",
    operation_type_code: "0101",
    total_taxable: 2966.10,
    total_igv: 533.90,
    total_discount: 0.00,
    total_payable: 3500.00,
    client_id: 3,
    payment_terms: "CREDITO_30",
    notes: "Transporte de mercadería"
  },
  {
    id: "B001-00014",
    tipo: "Boleta",
    document_type_code: "03",
    series: "B001",
    number: 14,
    cliente: "Carlos Mendoza Ríos",
    fecha: "04/04/2025",
    monto: 350.00,
    estado: "Pagado",
    sunat_status: "ACCEPTED",
    dni: "09876543",
    currency_code: "PEN",
    issue_date: "2025-04-04",
    due_date: "2025-04-04",
    operation_type_code: "0101",
    total_taxable: 296.61,
    total_igv: 53.39,
    total_discount: 0.00,
    total_payable: 350.00,
    client_id: 4,
    payment_terms: "CONTADO",
    notes: ""
  },
  {
    id: "F001-00003",
    tipo: "Factura",
    document_type_code: "01",
    series: "F001",
    number: 3,
    cliente: "Transportes Unidos S.A.C.",
    fecha: "03/04/2025",
    monto: 5200.00,
    estado: "Pagado",
    sunat_status: "ACCEPTED",
    ruc: "20567891234",
    currency_code: "PEN",
    issue_date: "2025-04-03",
    due_date: "2025-04-03",
    operation_type_code: "0101",
    total_taxable: 4406.78,
    total_igv: 793.22,
    total_discount: 0.00,
    total_payable: 5200.00,
    client_id: 5,
    payment_terms: "CONTADO",
    notes: "Alquiler de embarcación"
  },
  {
    id: "F001-00004",
    tipo: "Factura",
    document_type_code: "01",
    series: "F001",
    number: 4,
    cliente: "Distribuidora Central del Perú",
    fecha: "02/04/2025",
    monto: 1800.00,
    estado: "Pagado",
    sunat_status: "ACCEPTED",
    ruc: "20187654321",
    currency_code: "PEN",
    issue_date: "2025-04-02",
    due_date: "2025-05-02",
    operation_type_code: "0101",
    total_taxable: 1525.42,
    total_igv: 274.58,
    total_discount: 0.00,
    total_payable: 1800.00,
    client_id: 6,
    payment_terms: "CREDITO_30",
    notes: "Transporte mensual programado"
  },
  {
    id: "F001-00005",
    tipo: "Factura",
    document_type_code: "01",
    series: "F001",
    number: 5,
    cliente: "Amazonía Servicios S.A.C.",
    fecha: "01/04/2025",
    monto: 2400.00,
    estado: "Rechazado",
    sunat_status: "REJECTED",
    ruc: "20601234567",
    currency_code: "PEN",
    issue_date: "2025-04-01",
    due_date: "2025-05-01",
    operation_type_code: "0101",
    total_taxable: 2033.90,
    total_igv: 366.10,
    total_discount: 0.00,
    total_payable: 2400.00,
    client_id: 7,
    payment_terms: "CREDITO_30",
    notes: "Rechazado por error en el RUC"
  }
];

// Datos extendidos de items para comprobantes
export const itemsComprobantes = {
  "F001-00001": [
    {
      id: 1,
      item_order: 1,
      product_id: 1,
      product_name: "Transporte de carga - Ruta Iquitos-Pucallpa",
      quantity: 2,
      unit_code: "ZZ",
      unit_price: 1200.00,
      price_with_tax: 1416.00,
      discount: 0.00,
      tax_category_code: "10",
      igv_percentage: 18.00,
      igv_amount: 432.00,
      subtotal: 2400.00,
      total_line: 2832.00
    }
  ],
  "B001-00015": [
    {
      id: 1,
      item_order: 1,
      product_id: 3,
      product_name: "Transporte de pasajeros - Ruta Iquitos-Pucallpa",
      quantity: 1,
      unit_code: "ZZ",
      unit_price: 350.00,
      price_with_tax: 413.00,
      discount: 0.00,
      tax_category_code: "10",
      igv_percentage: 18.00,
      igv_amount: 63.00,
      subtotal: 350.00,
      total_line: 413.00
    }
  ],
  "F001-00002": [
    {
      id: 1,
      item_order: 1,
      product_id: 2,
      product_name: "Transporte de carga - Ruta Pucallpa-Iquitos",
      quantity: 2,
      unit_code: "ZZ",
      unit_price: 1200.00,
      price_with_tax: 1416.00,
      discount: 0.00,
      tax_category_code: "10",
      igv_percentage: 18.00,
      igv_amount: 432.00,
      subtotal: 2400.00,
      total_line: 2832.00
    },
    {
      id: 2,
      item_order: 2,
      product_id: 8,
      product_name: "Servicio adicional de seguro de carga",
      quantity: 2,
      unit_code: "ZZ",
      unit_price: 250.00,
      price_with_tax: 295.00,
      discount: 0.00,
      tax_category_code: "10",
      igv_percentage: 18.00,
      igv_amount: 90.00,
      subtotal: 500.00,
      total_line: 590.00
    }
  ]
};

// Datos de notas de crédito con items
export const notasCredito = [
  {
    id: "FC01-00001",
    document_type_code: "07",
    series: "FC01",
    number: 1,
    cliente: "Comercial Los Andes S.A.C.",
    fecha: "05/04/2025",
    monto: 580.00,
    estado: "Procesado",
    sunat_status: "ACCEPTED",
    ruc: "20512376218",
    affected_document: "F001-00001",
    affected_document_type_code: "01",
    affected_document_series: "F001",
    affected_document_number: 1,
    reason: "Descuento por pronto pago",
    credit_note_type_code: "04",
    currency_code: "PEN",
    issue_date: "2025-04-05",
    total_taxable: 491.53,
    total_igv: 88.47,
    total_payable: 580.00,
    client_id: 1,
    items: [
      {
        id: 1,
        item_order: 1,
        product_id: 1,
        product_name: "Descuento por pronto pago",
        quantity: 1,
        unit_code: "ZZ",
        unit_price: 491.53,
        price_with_tax: 580.00,
        discount: 0.00,
        tax_category_code: "10",
        igv_percentage: 18.00,
        igv_amount: 88.47,
        subtotal: 491.53,
        total_line: 580.00
      }
    ]
  },
  {
    id: "BC01-00001",
    document_type_code: "07",
    series: "BC01",
    number: 1,
    cliente: "María Sánchez López",
    fecha: "05/04/2025",
    monto: 100.00,
    estado: "Procesado",
    sunat_status: "ACCEPTED",
    dni: "45678912",
    affected_document: "B001-00015",
    affected_document_type_code: "03",
    affected_document_series: "B001",
    affected_document_number: 15,
    reason: "Devolución parcial",
    credit_note_type_code: "07",
    currency_code: "PEN",
    issue_date: "2025-04-05",
    total_taxable: 84.75,
    total_igv: 15.25,
    total_payable: 100.00,
    client_id: 2,
    items: [
      {
        id: 1,
        item_order: 1,
        product_id: 3,
        product_name: "Transporte de pasajeros - Ruta Iquitos-Pucallpa",
        quantity: 1,
        unit_code: "ZZ",
        unit_price: 84.75,
        price_with_tax: 100.00,
        discount: 0.00,
        tax_category_code: "10",
        igv_percentage: 18.00,
        igv_amount: 15.25,
        subtotal: 84.75,
        total_line: 100.00
      }
    ]
  },
  {
    id: "FC01-00002",
    document_type_code: "07",
    series: "FC01",
    number: 2,
    cliente: "Transportes Unidos S.A.C.",
    fecha: "04/04/2025",
    monto: 1200.00,
    estado: "Procesado",
    sunat_status: "ACCEPTED",
    ruc: "20567891234",
    affected_document: "F001-00003",
    affected_document_type_code: "01",
    affected_document_series: "F001",
    affected_document_number: 3,
    reason: "Anulación parcial del servicio",
    credit_note_type_code: "07",
    currency_code: "PEN",
    issue_date: "2025-04-04",
    total_taxable: 1016.95,
    total_igv: 183.05,
    total_payable: 1200.00,
    client_id: 5,
    items: [
      {
        id: 1,
        item_order: 1,
        product_id: 6,
        product_name: "Alquiler de embarcación - Media jornada",
        quantity: 1,
        unit_code: "ZZ",
        unit_price: 1016.95,
        price_with_tax: 1200.00,
        discount: 0.00,
        tax_category_code: "10",
        igv_percentage: 18.00,
        igv_amount: 183.05,
        subtotal: 1016.95,
        total_line: 1200.00
      }
    ]
  }
];

// Datos de notas de débito con items
export const notasDebito = [
  {
    id: "FD01-00001",
    document_type_code: "08",
    series: "FD01",
    number: 1,
    cliente: "Inversiones del Oriente E.I.R.L.",
    fecha: "04/04/2025",
    monto: 150.00,
    estado: "Procesado",
    sunat_status: "ACCEPTED",
    ruc: "20493817265",
    affected_document: "F001-00002",
    affected_document_type_code: "01",
    affected_document_series: "F001",
    affected_document_number: 2,
    reason: "Intereses por pago tardío",
    debit_note_type_code: "01",
    currency_code: "PEN",
    issue_date: "2025-04-04",
    total_taxable: 127.12,
    total_igv: 22.88,
    total_payable: 150.00,
    client_id: 3,
    items: [
      {
        id: 1,
        item_order: 1,
        product_id: 7,
        product_name: "Intereses por pago tardío",
        quantity: 1,
        unit_code: "ZZ",
        unit_price: 127.12,
        price_with_tax: 150.00,
        discount: 0.00,
        tax_category_code: "10",
        igv_percentage: 18.00,
        igv_amount: 22.88,
        subtotal: 127.12,
        total_line: 150.00
      }
    ]
  },
  {
    id: "FD01-00002",
    document_type_code: "08",
    series: "FD01",
    number: 2,
    cliente: "Distribuidora Central del Perú",
    fecha: "03/04/2025",
    monto: 200.00,
    estado: "Procesado",
    sunat_status: "ACCEPTED",
    ruc: "20187654321",
    affected_document: "F001-00004",
    affected_document_type_code: "01",
    affected_document_series: "F001",
    affected_document_number: 4,
    reason: "Penalidad por incumplimiento de contrato",
    debit_note_type_code: "03",
    currency_code: "PEN",
    issue_date: "2025-04-03",
    total_taxable: 169.49,
    total_igv: 30.51,
    total_payable: 200.00,
    client_id: 6,
    items: [
      {
        id: 1,
        item_order: 1,
        product_id: 8,
        product_name: "Penalidad por incumplimiento de contrato",
        quantity: 1,
        unit_code: "ZZ",
        unit_price: 169.49,
        price_with_tax: 200.00,
        discount: 0.00,
        tax_category_code: "10",
        igv_percentage: 18.00,
        igv_amount: 30.51,
        subtotal: 169.49,
        total_line: 200.00
      }
    ]
  }
];

// Datos de comunicaciones a SUNAT
export const comunicaciones = [
  {
    id: "RA-20250401-1",
    identifier: "RA-20250401-1",
    tipo: "VOIDED",
    generation_date: "2025-04-01",
    fecha: "01/04/2025",
    ticket: "202504011234567",
    sunat_ticket: "202504011234567",
    estado: "ACCEPTED",
    sunat_status: "ACCEPTED",
    sunat_response_code: "0",
    sunat_response_description: "La Comunicación de baja número RA-20250401-1, ha sido aceptada",
    documentos: [
      {
        id: 1,
        item_line: 1,
        document_type_code: "01",
        series: "F001",
        number: 5,
        reason: "ERROR EN EMISIÓN DE COMPROBANTE"
      }
    ]
  },
  {
    id: "RC-20250402-1",
    identifier: "RC-20250402-1",
    tipo: "SUMMARY",
    generation_date: "2025-04-02",
    fecha: "02/04/2025",
    ticket: "202504021234568",
    sunat_ticket: "202504021234568",
    estado: "ACCEPTED",
    sunat_status: "ACCEPTED",
    sunat_response_code: "0",
    sunat_response_description: "El resumen diario RC-20250402-1, ha sido aceptado",
    documentos: [
      {
        id: 1,
        item_line: 1,
        document_type_code: "03",
        series: "B001",
        number: 10,
        status: "ADD",
        client_doc_type: "1",
        client_doc_number: "87654321",
        currency_code: "PEN",
        total_taxable: 127.12,
        total_igv: 22.88,
        total_payable: 150.00
      },
      {
        id: 2,
        item_line: 2,
        document_type_code: "03",
        series: "B001",
        number: 11,
        status: "ADD",
        client_doc_type: "1",
        client_doc_number: "98765432",
        currency_code: "PEN",
        total_taxable: 254.24,
        total_igv: 45.76,
        total_payable: 300.00
      }
    ]
  },
  {
    id: "RA-20250403-1",
    identifier: "RA-20250403-1",
    tipo: "VOIDED",
    generation_date: "2025-04-03",
    fecha: "03/04/2025",
    ticket: "202504031234569",
    sunat_ticket: "202504031234569",
    estado: "REJECTED",
    sunat_status: "REJECTED",
    sunat_response_code: "2033",
    sunat_response_description: "El comprobante ya fue dado de baja anteriormente",
    documentos: [
      {
        id: 1,
        item_line: 1,
        document_type_code: "01",
        series: "F001",
        number: 6,
        reason: "CANCELACIÓN DE OPERACIÓN"
      }
    ]
  }
];

// Datos de productos/servicios
export const productos = [
  {
    id: 1,
    internal_code: "P001",
    name: "Transporte de carga - Ruta Iquitos-Pucallpa",
    description: "Servicio de transporte fluvial de carga general",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 1200.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Servicio",
    categoria: "Transporte de carga"
  },
  {
    id: 2,
    internal_code: "P002",
    name: "Transporte de carga - Ruta Pucallpa-Iquitos",
    description: "Servicio de transporte fluvial de carga general",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 1200.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Servicio",
    categoria: "Transporte de carga"
  },
  {
    id: 3,
    internal_code: "P003",
    name: "Transporte de pasajeros - Ruta Iquitos-Pucallpa",
    description: "Servicio de transporte fluvial de pasajeros",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 350.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Pasajero",
    categoria: "Transporte de pasajeros"
  },
  {
    id: 4,
    internal_code: "P004",
    name: "Transporte de pasajeros - Ruta Pucallpa-Iquitos",
    description: "Servicio de transporte fluvial de pasajeros",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 350.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Pasajero",
    categoria: "Transporte de pasajeros"
  },
  {
    id: 5,
    internal_code: "P005",
    name: "Transporte de carga ligera - Ruta Iquitos-Nauta",
    description: "Servicio de transporte fluvial de carga ligera",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 500.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Servicio",
    categoria: "Transporte de carga"
  },
  {
    id: 6,
    internal_code: "P006",
    name: "Alquiler de embarcación - Media jornada",
    description: "Servicio de alquiler de embarcación por 6 horas",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 3800.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Servicio",
    categoria: "Alquiler"
  },
  {
    id: 7,
    internal_code: "P007",
    name: "Intereses por pago tardío",
    description: "Intereses generados por el retraso en el pago",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 0.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Servicio",
    categoria: "Financiero"
  },
  {
    id: 8,
    internal_code: "P008",
    name: "Servicio adicional de seguro de carga",
    description: "Seguro para la mercadería transportada",
    item_type: "SERVICE",
    unit_code: "ZZ",
    sale_price: 250.00,
    currency_code: "PEN",
    tax_category_code: "10",
    unidad: "Servicio",
    categoria: "Seguros"
  }
];

// Datos de clientes
export const clientes = [
  {
    id: 1,
    doc_type: "6",
    doc_number: "20512376218",
    name: "Comercial Los Andes S.A.C.",
    address: "Av. La Marina 1234, San Miguel, Lima",
    ubigeo: "150136",
    telefono: "01-456-7890",
    email: "contacto@losandes.com.pe"
  },
  {
    id: 2,
    doc_type: "1",
    doc_number: "45678912",
    name: "María Sánchez López",
    address: "Jr. Huallaga 456, Iquitos",
    ubigeo: "160101",
    telefono: "965-432-187",
    email: "maria.sanchez@gmail.com"
  },
  {
    id: 3,
    doc_type: "6",
    doc_number: "20493817265",
    name: "Inversiones del Oriente E.I.R.L.",
    address: "Av. Abelardo Quiñones 789, Iquitos",
    ubigeo: "160101",
    telefono: "065-23-4567",
    email: "inversionesoriente@gmail.com"
  },
  {
    id: 4,
    doc_type: "1",
    doc_number: "09876543",
    name: "Carlos Mendoza Ríos",
    address: "Malecón Tarapacá 345, Iquitos",
    ubigeo: "160101",
    telefono: "945-678-123",
    email: "carlos.mendoza@hotmail.com"
  },
  {
    id: 5,
    doc_type: "6",
    doc_number: "20567891234",
    name: "Transportes Unidos S.A.C.",
    address: "Jr. Putumayo 567, Iquitos",
    ubigeo: "160101",
    telefono: "065-25-6789",
    email: "info@transportesunidos.com.pe"
  },
  {
    id: 6,
    doc_type: "6",
    doc_number: "20187654321",
    name: "Distribuidora Central del Perú",
    address: "Av. Central 123, Lima",
    ubigeo: "150101",
    telefono: "01-234-5678",
    email: "ventas@distribuidoracentral.com.pe"
  },
  {
    id: 7,
    doc_type: "6",
    doc_number: "20601234567",
    name: "Amazonía Servicios S.A.C.",
    address: "Jr. Amazonas 456, Iquitos",
    ubigeo: "160101",
    telefono: "065-26-7890",
    email: "info@amazoniaservicios.com.pe"
  }
];

// Datos para cuentas por cobrar y pagos
export const cuentasPorCobrar = [
  {
    id: 1,
    invoice_id: 1,
    client_id: 1,
    client_name: "Comercial Los Andes S.A.C.",
    client_doc_number: "20512376218",
    issue_date: "2025-04-05",
    due_date: "2025-05-05",
    total_amount: 2850.00,
    paid_amount: 1000.00,
    balance: 1850.00,
    status: "PARTIALLY_PAID",
    last_payment_date: "2025-04-10",
    document_type_code: "01",
    series: "F001",
    number: 1,
    currency_code: "PEN",
    payment_terms: "CREDITO_30",
    pagos: [
      {
        id: 1,
        account_receivable_id: 1,
        payment_date: "2025-04-10",
        amount: 1000.00,
        payment_method: "TRANSFERENCIA",
        reference: "OP-12345",
        notes: "Pago parcial"
      }
    ]
  },
  {
    id: 2,
    invoice_id: 2,
    client_id: 2,
    client_name: "María Sánchez López",
    client_doc_number: "45678912",
    issue_date: "2025-04-05",
    due_date: "2025-04-05",
    total_amount: 450.00,
    paid_amount: 450.00,
    balance: 0.00,
    status: "PAID",
    last_payment_date: "2025-04-05",
    document_type_code: "03",
    series: "B001",
    number: 15,
    currency_code: "PEN",
    payment_terms: "CONTADO",
    pagos: [
      {
        id: 2,
        account_receivable_id: 2,
        payment_date: "2025-04-05",
        amount: 450.00,
        payment_method: "EFECTIVO",
        reference: "",
        notes: "Pago en efectivo"
      }
    ]
  },
  {
    id: 3,
    invoice_id: 3,
    client_id: 3,
    client_name: "Inversiones del Oriente E.I.R.L.",
    client_doc_number: "20493817265",
    issue_date: "2025-04-04",
    due_date: "2025-05-04",
    total_amount: 3500.00,
    paid_amount: 0.00,
    balance: 3500.00,
    status: "PENDING",
    last_payment_date: null,
    document_type_code: "01",
    series: "F001",
    number: 2,
    currency_code: "PEN",
    payment_terms: "CREDITO_30",
    pagos: []
  },
  {
    id: 4,
    invoice_id: 4,
    client_id: 4,
    client_name: "Carlos Mendoza Ríos",
    client_doc_number: "09876543",
    issue_date: "2025-04-04",
    due_date: "2025-04-04",
    total_amount: 350.00,
    paid_amount: 350.00,
    balance: 0.00,
    status: "PAID",
    last_payment_date: "2025-04-04",
    document_type_code: "03",
    series: "B001",
    number: 14,
    currency_code: "PEN",
    payment_terms: "CONTADO",
    pagos: [
      {
        id: 3,
        account_receivable_id: 4,
        payment_date: "2025-04-04",
        amount: 350.00,
        payment_method: "TARJETA",
        reference: "VISA-7890",
        notes: "Pago con tarjeta VISA"
      }
    ]
  },
  {
    id: 5,
    invoice_id: 5,
    client_id: 5,
    client_name: "Transportes Unidos S.A.C.",
    client_doc_number: "20567891234",
    issue_date: "2025-04-03",
    due_date: "2025-04-03",
    total_amount: 5200.00,
    paid_amount: 5200.00,
    balance: 0.00,
    status: "PAID",
    last_payment_date: "2025-04-03",
    document_type_code: "01",
    series: "F001",
    number: 3,
    currency_code: "PEN",
    payment_terms: "CONTADO",
    pagos: [
      {
        id: 4,
        account_receivable_id: 5,
        payment_date: "2025-04-03",
        amount: 5200.00,
        payment_method: "TRANSFERENCIA",
        reference: "OP-56789",
        notes: "Transferencia BCP"
      }
    ]
  },
  {
    id: 6,
    invoice_id: 6,
    client_id: 6,
    client_name: "Distribuidora Central del Perú",
    client_doc_number: "20187654321",
    issue_date: "2025-04-02",
    due_date: "2025-05-02",
    total_amount: 1800.00,
    paid_amount: 0.00,
    balance: 1800.00,
    status: "PENDING",
    last_payment_date: null,
    document_type_code: "01",
    series: "F001",
    number: 4,
    currency_code: "PEN",
    payment_terms: "CREDITO_30",
    pagos: []
  }
];

// Datos para el resumen de facturación
export const resumenFacturacion = [
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
    value: "S/ 15,350.00",
    icon: ReceiptPercentIcon,
    footer: {
      color: "text-red-500",
      value: "+8%",
      label: "que el mes anterior",
    },
  },
  {
    title: "Documentos Emitidos",
    value: "79",
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

// Datos para reportes y analítica
export const datosReportes = {
  ventasPorMes: [
    { mes: "Enero", monto: 38500 },
    { mes: "Febrero", monto: 42300 },
    { mes: "Marzo", monto: 46800 },
    { mes: "Abril", monto: 45200 }
  ],
  ventasPorDia: [
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
  ventasPorCategoria: [
    { categoria: "Transporte de carga", monto: 72000 },
    { categoria: "Transporte de pasajeros", monto: 14000 },
    { categoria: "Alquiler", monto: 7600 },
    { categoria: "Seguros", monto: 2500 }
  ],
  ventasPorTipoDocumento: [
    { tipo: "Factura", cantidad: 45, monto: 68120.50 },
    { tipo: "Boleta", cantidad: 72, monto: 21350.25 },
    { tipo: "Nota de Crédito", cantidad: 5, monto: -2950.00 }
  ],
  clientesTop: [
    { cliente: "Comercial Los Andes S.A.C.", monto: 12850 },
    { cliente: "Inversiones del Oriente E.I.R.L.", monto: 9750 },
    { cliente: "Transportes Unidos S.A.C.", monto: 8200 },
    { cliente: "Distribuidora Central del Perú", monto: 7300 },
    { cliente: "Otros", monto: 8100 }
  ],
  estadoDocumentos: {
    aceptados: 115,
    observados: 3,
    rechazados: 1,
    pendientes: 2
  },
  indicadoresFinancieros: {
    ventaPromedioDiaria: 3600.25,
    ventaPromedioPorCliente: 5650.00,
    porcentajeCobrado: 68.5,
    tiempoPromedioCobranza: 12.3
  },
  ultimos30Dias: {
    ventas: 45200.00,
    cobranzas: 38750.00,
    gastos: 12300.00
  },
  proximos30Dias: {
    porCobrar: 15350.00,
    estimacionVentas: 48500.00
  }
};

// Datos para configuración del sistema
export const configuracionSistema = {
  empresa: {
    id: 1,
    ruc: "20123456789",
    business_name: "Transportes Romero S.A.C.",
    trade_name: "Transportes Romero",
    address: "Av. La Marina 1234, Iquitos, Loreto",
    ubigeo: "160101",
    phone: "065-123456",
    email: "facturacion@transportesromero.com",
    logo_url: "/img/logo-transportes.svg",
    sunat_username: "MODDATOS",
    sunat_password_hash: "••••••••",
    certificate_path: "/certificates/cert_20123456789.pfx",
    certificate_password_hash: "••••••••",
    beta_mode: true
  },
  series: [
    { id: 1, document_type_code: "01", series: "F001", description: "Facturas Iquitos", active: true, last_number: 154 },
    { id: 2, document_type_code: "03", series: "B001", description: "Boletas Iquitos", active: true, last_number: 245 },
    { id: 3, document_type_code: "07", series: "FC01", description: "Notas de Crédito Facturas", active: true, last_number: 34 },
    { id: 4, document_type_code: "07", series: "BC01", description: "Notas de Crédito Boletas", active: true, last_number: 12 },
    { id: 5, document_type_code: "08", series: "FD01", description: "Notas de Débito Facturas", active: true, last_number: 16 },
    { id: 6, document_type_code: "08", series: "BD01", description: "Notas de Débito Boletas", active: false, last_number: 0 }
  ],
  ubigeos: [
    { code: "160101", description: "Iquitos, Maynas, Loreto" },
    { code: "160201", description: "Yurimaguas, Alto Amazonas, Loreto" },
    { code: "160301", description: "Nauta, Loreto, Loreto" },
    { code: "160401", description: "Requena, Requena, Loreto" },
    { code: "150101", description: "Lima, Lima, Lima" },
    { code: "150136", description: "San Miguel, Lima, Lima" }
  ],
  parametros: {
    igv_percentage: 18.00,
    default_currency: "PEN",
    send_emails_automatically: true,
    save_xmls_locally: true,
    auto_send_to_sunat: true,
    auto_create_pdf: true,
    pdf_template: "standard"
  },
  estado_sunat: {
    ultima_conexion: "2025-04-17T08:25:43",
    estado: "CONNECTED",
    mensaje: "Conexión exitosa con SUNAT en modo BETA",
    modo_beta: true
  },
  almacenamiento: {
    espacio_total: 5120, // MB
    espacio_usado: 1253, // MB
    archivos_generados: 783,
    ultimo_backup: "2025-04-16T03:00:00"
  }
};

// Datos para usuarios del sistema
export const usuarios = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "juan.perez@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "Juan Pérez",
    role_id: 1,
    is_active: true,
    created_at: "2024-12-15T08:30:00Z",
    updated_at: "2025-01-05T14:20:00Z",
    last_login: "2025-04-15T09:45:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "maria.lopez@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "María López",
    role_id: 2,
    is_active: true,
    created_at: "2025-01-10T10:15:00Z",
    updated_at: "2025-01-10T10:15:00Z",
    last_login: "2025-04-16T11:30:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "carlos.mendoza@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "Carlos Mendoza",
    role_id: 4,
    is_active: true,
    created_at: "2025-02-05T09:00:00Z",
    updated_at: "2025-02-05T09:00:00Z",
    last_login: "2025-04-14T16:20:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "ana.garcia@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "Ana García",
    role_id: 3,
    is_active: false,
    created_at: "2025-03-12T11:30:00Z",
    updated_at: "2025-04-01T08:45:00Z",
    last_login: "2025-03-30T14:10:00Z"
  }
];

// Roles del sistema
export const roles = [
  { id: 1, name: "admin", description: "Administrador del Sistema" },
  { id: 2, name: "sales", description: "Personal de Ventas" },
  { id: 3, name: "warehouse", description: "Personal de Almacén" },
  { id: 4, name: "accountant", description: "Contador" }
];

// Datos de guías de remisión
export const guiasRemision = [
  {
    id: 1,
    document_type_code: "31",
    series: "T001",
    number: 123,
    issue_date: "2025-04-04",
    sender_client_id: 1,
    sender_name: "Comercial Los Andes S.A.C.",
    recipient_client_id: 3,
    recipient_name: "Inversiones del Oriente E.I.R.L.",
    shipment_start_date: "2025-04-05",
    observation: "Carga frágil, manipular con cuidado",
    total_gross_weight: 520.5,
    weight_unit_code: "KGM",
    origin_ubigeo: "150136",
    origin_address: "Av. La Marina 1234, San Miguel, Lima",
    destination_ubigeo: "160101",
    destination_address: "Av. Abelardo Quiñones 789, Iquitos",
    transport_mode_code: "02",
    vehicle_plate: "XYZ-123",
    driver_doc_type: "1",
    driver_doc_number: "12345678",
    driver_name: "Pedro Suárez López",
    driver_license: "Q12345678",
    sunat_status: "ACCEPTED",
    items: [
      {
        id: 1,
        item_order: 1,
        quantity: 50,
        unit_code: "KGM",
        description: "Repuestos para motor fuera de borda"
      },
      {
        id: 2,
        item_order: 2,
        quantity: 120.5,
        unit_code: "KGM",
        description: "Material de construcción"
      }
    ],
    related_invoices: ["F001-00001"]
  },
  {
    id: 2,
    document_type_code: "31",
    series: "T001",
    number: 124,
    issue_date: "2025-04-05",
    sender_client_id: 6,
    sender_name: "Distribuidora Central del Perú",
    recipient_client_id: 5,
    recipient_name: "Transportes Unidos S.A.C.",
    shipment_start_date: "2025-04-06",
    observation: "",
    total_gross_weight: 350.0,
    weight_unit_code: "KGM",
    origin_ubigeo: "150101",
    origin_address: "Av. Central 123, Lima",
    destination_ubigeo: "160101",
    destination_address: "Jr. Putumayo 567, Iquitos",
    transport_mode_code: "02",
    vehicle_plate: "ABC-789",
    driver_doc_type: "1",
    driver_doc_number: "87654321",
    driver_name: "Luis Campos Rodríguez",
    driver_license: "Q87654321",
    sunat_status: "SENT",
    items: [
      {
        id: 1,
        item_order: 1,
        quantity: 350.0,
        unit_code: "KGM",
        description: "Insumos médicos"
      }
    ],
    related_invoices: ["F001-00004"]
  }
];

export default {
  ventasRecientes,
  itemsComprobantes,
  notasCredito,
  notasDebito,
  comunicaciones,
  productos,
  clientes,
  cuentasPorCobrar,
  resumenFacturacion,
  datosReportes,
  configuracionSistema,
  usuarios,
  roles,
  guiasRemision
};