<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H&J Diseños - Sistema ERP Completo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
        :root {
            --dark: #0f172a;
            --primary: #2563eb;
            --accent: #f59e0b;
            --danger: #dc2626;
            --success: #16a34a;
            --bg: #f8fafc;
            --gray: #64748b;
        }
        
        body {
            background-color: var(--bg);
            font-family: 'Inter', sans-serif;
            color: var(--dark);
        }
        
        .sidebar {
            background: var(--dark);
            min-height: 100vh;
            color: white;
            transition: all 0.3s;
        }
        
        .card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }
        
        .card:hover {
            transform: translateY(-2px);
        }
        
        .nav-link {
            color: #94a3b8;
            transition: all 0.2s;
        }
        
        .nav-link.active {
            background: var(--primary);
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
        }
        
        .nav-link:hover:not(.active) {
            background: rgba(255,255,255,0.05);
            color: white;
        }
        
        .stat-val {
            font-size: 1.8rem;
            font-weight: 800;
        }
        
        .form-label {
            font-size: 0.8rem;
            font-weight: 700;
            color: var(--gray);
            text-transform: uppercase;
        }
        
        .badge-status {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .table-hover tbody tr {
            cursor: pointer;
        }
        
        .modal-lg {
            max-width: 900px;
        }
        
        .order-card {
            border-left: 4px solid;
            transition: all 0.3s;
        }
        
        .order-card:hover {
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .payment-badge {
            font-size: 0.7rem;
            padding: 3px 8px;
        }
        
        .login-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 30px;
            border-radius: 15px;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .tab-content {
            padding: 20px 0;
        }
        
        .config-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            border: 1px solid #dee2e6;
        }
        
        .inventory-card {
            border-top: 3px solid;
        }
        
        .chart-container {
            height: 300px;
            position: relative;
        }
        
        .comprobante-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9998;
            display: none;
        }
        
        .comprobante-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            display: none;
        }
        
        .material-checkbox {
            margin-bottom: 10px;
        }
        
        .gasto-card {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            background: #f8f9fa;
        }
        
        .item-cotizacion {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            background: white;
            transition: all 0.3s;
        }
        
        .item-cotizacion:hover {
            border-color: var(--primary);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
        }
        
        .badge-cantidad {
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 10px;
        }
        
        .movimiento-item {
            border-left: 3px solid;
            padding: 10px 15px;
            margin-bottom: 8px;
            background: white;
            border-radius: 0 8px 8px 0;
        }
        
        .movimiento-venta { border-color: var(--success); }
        .movimiento-gasto { border-color: var(--danger); }
        .movimiento-pago { border-color: var(--primary); }
        
        .historial-table {
            font-size: 0.85rem;
        }
        
        .historial-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        .material-selector {
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 10px;
            margin-top: 10px;
        }
        
        .material-item {
            padding: 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .material-item:hover {
            background-color: #f0f7ff;
        }
        
        .material-item.selected {
            background-color: #e3f2fd;
            border-left: 3px solid var(--primary);
        }
        
        .reserva-badge {
            font-size: 0.7rem;
            padding: 2px 6px;
            margin-left: 5px;
        }
    </style>
</head>
<body>

<!-- Overlay para comprobante -->
<div class="comprobante-overlay" id="comprobanteOverlay" onclick="cerrarComprobante()"></div>

<!-- Login Modal -->
<div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title"><i class="bi bi-shield-lock me-2"></i> Acceso Sistema ERP</h5>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Usuario</label>
                    <input type="text" id="loginUser" class="form-control" placeholder="usuario" value="admin">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" id="loginPass" class="form-control" placeholder="••••••••" value="admin123">
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="rememberLogin" checked>
                    <label class="form-check-label small">Recordar sesión</label>
                </div>
                <button class="btn btn-primary w-100" onclick="login()">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Ingresar
                </button>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid" id="mainApp" style="display: none;">
    <div class="row">
        <nav class="col-md-3 col-lg-2 sidebar p-4 d-flex flex-column">
            <h3 class="fw-bold text-white mb-4">H&J<span class="text-primary">D</span></h3>
            <small class="text-muted mb-3" id="userRole">Cargando...</small>
            
            <ul class="nav flex-column mb-auto" id="mainNav">
                <li class="nav-item mb-2">
                    <a class="nav-link p-2" href="#" onclick="showSection('dashboard')">
                        <i class="bi bi-speedometer2 me-2"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a class="nav-link p-2" href="#" onclick="showSection('cotizador')">
                        <i class="bi bi-calculator me-2"></i> Cotizador
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a class="nav-link p-2" href="#" onclick="showSection('trabajos')">
                        <i class="bi bi-clipboard-check me-2"></i> Trabajos Activos
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a class="nav-link p-2" href="#" onclick="showSection('historial')">
                        <i class="bi bi-clock-history me-2"></i> Historial
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a class="nav-link p-2" href="#" onclick="showSection('inventario')">
                        <i class="bi bi-boxes me-2"></i> Inventario
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a class="nav-link p-2" href="#" onclick="showSection('reportes')">
                        <i class="bi bi-graph-up me-2"></i> Reportes
                    </a>
                </li>
                <li class="nav-item mb-2" id="configNavItem" style="display: none;">
                    <a class="nav-link p-2" href="#" onclick="showSection('configuracion')">
                        <i class="bi bi-gear me-2"></i> Configuración
                    </a>
                </li>
            </ul>
            
            <div class="mt-auto pt-4 border-top border-secondary">
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted" id="syncStatus">Conectando...</small>
                    <button class="btn btn-sm btn-outline-light" onclick="logout()">
                        <i class="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-5 py-4" id="mainContent">
            <!-- Sección Dashboard -->
            <div id="sectionDashboard" style="display: none;">
                <h4 class="fw-bold mb-4"><i class="bi bi-speedometer2 me-2 text-primary"></i> Dashboard</h4>
                
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="card p-3 border-start border-primary border-5">
                            <small class="text-muted fw-bold">VENTAS (MES)</small>
                            <div id="dashVentas" class="stat-val text-primary">$ 0</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card p-3 border-start border-danger border-5">
                            <small class="text-muted fw-bold">GASTOS</small>
                            <div id="dashGastos" class="stat-val text-danger">$ 0</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card p-3 border-start border-success border-5">
                            <small class="text-muted fw-bold">UTILIDAD</small>
                            <div id="dashUtil" class="stat-val text-success">$ 0</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card p-3 border-start border-warning border-5">
                            <small class="text-muted fw-bold">TRABAJOS ACTIVOS</small>
                            <div id="dashTrabajos" class="stat-val text-warning">0</div>
                        </div>
                    </div>
                </div>
                
                <div class="row g-4">
                    <div class="col-lg-8">
                        <div class="card p-4">
                            <h6 class="fw-bold mb-3">Movimientos Recientes</h6>
                            <div id="movimientosRecientes" style="max-height: 300px; overflow-y: auto;">
                                <!-- Movimientos cargados dinámicamente -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card p-4 mb-4">
                            <h6 class="fw-bold mb-3">Registrar Gasto</h6>
                            <div class="gasto-card">
                                <input type="text" id="gastoDescripcion" class="form-control mb-2" placeholder="Descripción del gasto">
                                <input type="number" id="gastoMonto" class="form-control mb-3" placeholder="Monto $">
                                <button class="btn btn-danger btn-sm w-100" onclick="registrarGasto()">
                                    <i class="bi bi-cash-stack me-1"></i>Registrar Gasto
                                </button>
                            </div>
                        </div>
                        <div class="card p-4">
                            <h6 class="fw-bold mb-3">Resumen Inventario</h6>
                            <div id="inventorySummary"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección Cotizador -->
            <div id="sectionCotizador" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="fw-bold mb-0"><i class="bi bi-calculator me-2 text-primary"></i> Cotizador</h4>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success" onclick="agregarItemCotizacion()">
                            <i class="bi bi-plus-circle me-2"></i>Agregar Item
                        </button>
                        <button class="btn btn-primary" onclick="convertirATrabajo()">
                            <i class="bi bi-clipboard-plus me-2"></i>Crear Trabajo
                        </button>
                    </div>
                </div>
                
                <div class="card p-4 mb-4">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Cliente</label>
                            <input type="text" id="vCli" class="form-control" placeholder="Nombre completo o razón social">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Descripción General</label>
                            <input type="text" id="vProd" class="form-control" placeholder="Ej: Pedido de retablos personalizados">
                        </div>
                        
                        <div class="col-12">
                            <h6 class="fw-bold mb-3">Items de la Cotización</h6>
                            <div id="itemsCotizacionContainer">
                                <!-- Items dinámicos se agregarán aquí -->
                                <div class="item-cotizacion" id="item-base">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h6 class="mb-0">Item 1</h6>
                                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarItemCotizacion(0)" style="display: none;">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <div class="row g-2">
                                        <div class="col-md-4">
                                            <label class="form-label">Producto</label>
                                            <input type="text" class="form-control item-producto" placeholder="Ej: Retablo 30x45" oninput="calcularItem(this)">
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">Cantidad</label>
                                            <input type="number" class="form-control item-cantidad" value="1" min="1" oninput="calcularItem(this)">
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">Ancho (cm)</label>
                                            <input type="number" class="form-control item-ancho" value="30" oninput="calcularItem(this)">
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">Largo (cm)</label>
                                            <input type="number" class="form-control item-largo" value="40" oninput="calcularItem(this)">
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">Láser (min)</label>
                                            <input type="number" class="form-control item-laser" value="15" oninput="calcularItem(this)">
                                        </div>
                                        
                                        <div class="col-12 py-3 border-top mt-2">
                                            <h6 class="fw-bold mb-3">Materiales para este item</h6>
                                            <div class="material-selector" id="materialSelector-0">
                                                <div class="text-center">
                                                    <button class="btn btn-sm btn-outline-primary mb-2" onclick="mostrarSelectorMateriales(0)">
                                                        <i class="bi bi-plus-lg me-1"></i>Seleccionar Materiales del Inventario
                                                    </button>
                                                </div>
                                                <div id="materialesSeleccionados-0" class="mt-2">
                                                    <!-- Materiales seleccionados aparecerán aquí -->
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-8">
                                            <label class="form-label">Extras ($)</label>
                                            <input type="number" class="form-control item-extras" value="0" oninput="calcularItem(this)">
                                        </div>
                                        <div class="col-md-4 text-end">
                                            <label class="form-label">Subtotal</label>
                                            <h5 class="item-subtotal text-primary">$ 0</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-3 p-4 bg-dark text-white rounded-4 text-center shadow-lg">
                            <div class="row">
                                <div class="col-4 border-end border-secondary">
                                    <small class="text-muted d-block">COSTO TOTAL</small>
                                    <h4 id="resC" class="mb-0 text-secondary">$ 0</h4>
                                </div>
                                <div class="col-4 border-end border-secondary">
                                    <small class="text-warning d-block fw-bold">UTILIDAD</small>
                                    <h4 id="resU" class="mb-0 text-warning">$ 0</h4>
                                </div>
                                <div class="col-4">
                                    <small class="text-primary d-block fw-bold">PRECIO VENTA</small>
                                    <h2 id="resV" class="mb-0 fw-bold">$ 0</h2>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <small class="text-muted">Items en cotización: <span id="totalItems" class="badge-cantidad bg-primary">1</span></small>
                                    <div id="detalleCostos" class="small mt-2"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4 d-flex gap-2">
                            <button class="btn btn-primary flex-grow-1 fw-bold p-3" onclick="subirVenta()">
                                <i class="bi bi-cash-coin me-2"></i>REGISTRAR VENTA
                            </button>
                            <button class="btn btn-success fw-bold p-3" onclick="generarComprobante()">
                                <i class="bi bi-whatsapp me-2"></i>COMPROBANTE
                            </button>
                            <button class="btn btn-warning fw-bold p-3" onclick="generarPDF()">
                                <i class="bi bi-file-pdf me-2"></i>PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección Trabajos Activos -->
            <div id="sectionTrabajos" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="fw-bold mb-0"><i class="bi bi-clipboard-check me-2 text-primary"></i> Control de Trabajos Activos</h4>
                    <div class="d-flex gap-2">
                        <select id="filterStatus" class="form-select form-select-sm" onchange="cargarTrabajosActivos()">
                            <option value="activos">Todos Activos</option>
                            <option value="cotizado">Cotizado</option>
                            <option value="aprobado">Aprobado</option>
                            <option value="en_produccion">En Producción</option>
                            <option value="en_laser">En Láser</option>
                            <option value="en_impresion">En Impresión</option>
                            <option value="en_armado">En Armado</option>
                            <option value="listo">Listo</option>
                        </select>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newJobModal">
                            <i class="bi bi-plus-lg me-2"></i>Nuevo Trabajo
                        </button>
                    </div>
                </div>

                <div class="row" id="jobsContainer">
                    <!-- Los trabajos activos se cargan dinámicamente -->
                </div>
            </div>

            <!-- Sección Historial -->
            <div id="sectionHistorial" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="fw-bold mb-0"><i class="bi bi-clock-history me-2 text-primary"></i> Historial de Trabajos</h4>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="exportarHistorialExcel()">
                            <i class="bi bi-file-excel me-2"></i>Exportar a Excel
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="cargarHistorialCompleto()">
                            <i class="bi bi-arrow-clockwise me-2"></i>Actualizar
                        </button>
                    </div>
                </div>

                <div class="card p-4">
                    <div class="table-responsive">
                        <table class="table table-hover historial-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Presupuesto</th>
                                    <th>Saldo</th>
                                    <th>Vendedor</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="historialTable">
                                <!-- Historial cargado dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Sección Inventario -->
            <div id="sectionInventario" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="fw-bold mb-0"><i class="bi bi-boxes me-2 text-primary"></i> Inventario</h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#inventoryModal">
                        <i class="bi bi-plus-lg me-2"></i>Nuevo Material
                    </button>
                </div>

                <div class="card p-4 mb-4">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Material</th>
                                    <th>Unidad</th>
                                    <th>Stock Actual</th>
                                    <th>Stock Mínimo</th>
                                    <th>Reservado</th>
                                    <th>Disponible</th>
                                    <th>Costo Unitario</th>
                                    <th>Último Movimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="inventoryTable">
                                <!-- Inventario cargado dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="card p-4">
                            <h6 class="fw-bold mb-3">Movimientos Recientes</h6>
                            <div id="inventoryMovements"></div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card p-4">
                            <h6 class="fw-bold mb-3">Materiales Bajos en Stock</h6>
                            <div id="lowStockAlert"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección Reportes -->
            <div id="sectionReportes" style="display: none;">
                <h4 class="fw-bold mb-4"><i class="bi bi-graph-up me-2 text-primary"></i> Reportes</h4>
                
                <div class="row mb-4">
                    <div class="col-md-8">
                        <div class="card p-4">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h6 class="fw-bold mb-0">Reporte de Ventas</h6>
                                <select id="reportPeriod" class="form-select form-select-sm w-auto" onchange="cargarReportes()">
                                    <option value="month">Este Mes</option>
                                    <option value="last_month">Mes Anterior</option>
                                    <option value="year">Este Año</option>
                                    <option value="custom">Personalizado</option>
                                </select>
                            </div>
                            <div id="salesReportChart" class="chart-container">
                                <canvas id="ventasChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-4 h-100">
                            <h6 class="fw-bold mb-3">Resumen Financiero</h6>
                            <div id="financialSummary"></div>
                        </div>
                    </div>
                </div>

                <div class="card p-4">
                    <h6 class="fw-bold mb-3">Desempeño por Vendedor</h6>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Vendedor</th>
                                    <th>Ventas Totales</th>
                                    <th>Trabajos Completados</th>
                                    <th>Trabajos Pendientes</th>
                                    <th>Eficiencia</th>
                                </tr>
                            </thead>
                            <tbody id="performanceTable">
                                <!-- Datos cargados dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Sección Configuración -->
            <div id="sectionConfiguracion" style="display: none;">
                <h4 class="fw-bold mb-4"><i class="bi bi-gear me-2 text-primary"></i> Configuración del Sistema</h4>
                
                <div class="card p-4 mb-4">
                    <h6 class="fw-bold mb-3">Configuración de Materiales y Servicios</h6>
                    <div id="configItemsContainer">
                        <!-- Items de configuración cargados dinámicamente -->
                    </div>
                    <button class="btn btn-primary mt-3" onclick="guardarConfiguracion()">
                        <i class="bi bi-check-circle me-2"></i>Guardar Configuración
                    </button>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="card p-4">
                            <h6 class="fw-bold mb-3">Configuración de Costos</h6>
                            <div id="costConfigForm"></div>
                            <button class="btn btn-dark btn-sm w-100 mt-3" onclick="actualizarConfigNube()">
                                <i class="bi bi-cloud-upload me-2"></i>Guardar en Nube
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card p-4">
                            <h6 class="fw-bold mb-3">Gestión de Usuarios</h6>
                            <div id="usersManagement">
                                <!-- Gestión de usuarios -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<!-- Modal para Nuevo Trabajo -->
<div class="modal fade" id="newJobModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Nuevo Trabajo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Cliente</label>
                        <input type="text" id="jobClient" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Descripción</label>
                        <input type="text" id="jobDescription" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Fecha de Ingreso</label>
                        <input type="date" id="jobStartDate" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Fecha Prometida</label>
                        <input type="date" id="jobDueDate" class="form-control" required>
                    </div>
                    <div class="col-md-12">
                        <label class="form-label">Presupuesto Aprobado ($)</label>
                        <input type="number" id="jobBudget" class="form-control" required>
                    </div>
                    <div class="col-md-12">
                        <label class="form-label">Notas Internas</label>
                        <textarea id="jobNotes" class="form-control" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="crearNuevoTrabajo()">Crear Trabajo</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Pagos -->
<div class="modal fade" id="paymentModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Registrar Pago</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Monto del Pago ($)</label>
                    <input type="number" id="paymentAmount" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tipo de Pago</label>
                    <select id="paymentType" class="form-select">
                        <option value="abono">Abono</option>
                        <option value="final">Pago Final</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Método de Pago</label>
                    <select id="paymentMethod" class="form-select">
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="tarjeta">Tarjeta</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Referencia/Comentario</label>
                    <input type="text" id="paymentReference" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" onclick="registrarPago()">Registrar Pago</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Detalles de Trabajo -->
<div class="modal fade" id="jobDetailModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="jobDetailTitle">Detalles del Trabajo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="jobDetailContent">
                <!-- Contenido cargado dinámicamente -->
            </div>
        </div>
    </div>
</div>

<!-- Modal para Gestión de Inventario -->
<div class="modal fade" id="inventoryModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Gestión de Inventario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Nombre del Material</label>
                    <input type="text" id="invName" class="form-control" placeholder="Ej: MDF 3mm">
                </div>
                <div class="mb-3">
                    <label class="form-label">Unidad de Medida</label>
                    <select id="invUnit" class="form-select">
                        <option value="pieza">Pieza</option>
                        <option value="metro">Metro</option>
                        <option value="m2">Metro Cuadrado</option>
                        <option value="cm2">Centímetro Cuadrado</option>
                        <option value="kg">Kilogramo</option>
                        <option value="litro">Litro</option>
                        <option value="minuto">Minuto</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Stock Inicial</label>
                    <input type="number" id="invStock" class="form-control" value="10">
                </div>
                <div class="mb-3">
                    <label class="form-label">Stock Mínimo</label>
                    <input type="number" id="invMinStock" class="form-control" value="2">
                </div>
                <div class="mb-3">
                    <label class="form-label">Costo Unitario ($)</label>
                    <input type="number" id="invCosto" class="form-control" step="0.01" placeholder="0.00" value="0.02">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="agregarMaterial()">Agregar Material</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Seleccionar Materiales -->
<div class="modal fade" id="materialSelectorModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Seleccionar Materiales del Inventario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <input type="text" id="searchMaterial" class="form-control" placeholder="Buscar material..." onkeyup="filtrarMateriales()">
                </div>
                <div class="material-selector" style="max-height: 400px;" id="inventorySelector">
                    <!-- Materiales del inventario se cargan aquí -->
                </div>
                <div class="mt-3">
                    <h6>Materiales Seleccionados:</h6>
                    <div id="selectedMaterialsPreview"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="guardarMaterialesSeleccionados()">Guardar Selección</button>
            </div>
        </div>
    </div>
</div>

<!-- Comprobante visual -->
<div class="comprobante-content" id="comprobanteContainer">
    <div id="comprobanteContent">
        <!-- Comprobante generado dinámicamente -->
    </div>
    <div class="text-center mt-4">
        <button class="btn btn-primary me-2" onclick="compartirWhatsApp()">
            <i class="bi bi-whatsapp me-2"></i>Compartir
        </button>
        <button class="btn btn-secondary" onclick="cerrarComprobante()">Cerrar</button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
<script>
    // ============================================
    // CONFIGURACIÓN FIREBASE
    // ============================================
    const firebaseConfig = {
        apiKey: "AIzaSyA6GTXwiXHeIT56QyORSlCDbSmIJFZQ5rM",
        authDomain: "hj-disenos.firebaseapp.com",
        projectId: "hj-disenos",
        storageBucket: "hj-disenos.firebasestorage.app",
        messagingSenderId: "923196275011",
        appId: "1:923196275011:web:7ddfdfd4bf36e156cb17f6"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    // ============================================
    // VARIABLES GLOBALES
    // ============================================
    let currentUser = null;
    let currentJobId = null;
    let config = {};
    let materialesConfig = [];
    let cacheVenta = 0;
    let cacheCosto = 0;
    let itemsCotizacion = [null];
    let currentItemIndex = 0;
    let currentJobIdForPayment = null;
    let currentItemIndexForMaterial = null;
    let materialesSeleccionados = {};
    let inventarioData = [];

    // Estados de trabajo
    const ORDER_STATUS = {
        COTIZADO: 'cotizado',
        APROBADO: 'aprobado',
        EN_PRODUCCION: 'en_produccion',
        EN_LASER: 'en_laser',
        EN_IMPRESION: 'en_impresion',
        EN_ARMADO: 'en_armado',
        LISTO: 'listo',
        ENTREGADO: 'entregado',
        CANCELADO: 'cancelado'
    };

    const STATUS_COLORS = {
        cotizado: '#6c757d',
        aprobado: '#0d6efd',
        en_produccion: '#ffc107',
        en_laser: '#fd7e14',
        en_impresion: '#20c997',
        en_armado: '#6f42c1',
        listo: '#198754',
        entregado: '#0dcaf0',
        cancelado: '#dc3545'
    };

    // ============================================
    // SISTEMA DE AUTENTICACIÓN
    // ============================================
    function initAuth() {
        const modal = new bootstrap.Modal(document.getElementById('loginModal'));
        modal.show();
    }

    async function login() {
        const username = document.getElementById('loginUser').value;
        const password = document.getElementById('loginPass').value;
        const remember = document.getElementById('rememberLogin').checked;

        if (!username || !password) {
            alert('Por favor ingrese usuario y contraseña');
            return;
        }

        try {
            // Consultar usuario en Firestore
            const userDoc = await db.collection('users')
                .where('username', '==', username)
                .where('password', '==', password)
                .limit(1)
                .get();

            if (userDoc.empty) {
                // Si no existe, crear usuario admin automáticamente
                if (username === 'admin' && password === 'admin123') {
                    await inicializarSistemaAutomatico();
                    currentUser = {
                        id: 'admin',
                        username: 'admin',
                        role: 'gerente',
                        name: 'Administrador'
                    };
                } else {
                    throw new Error('Usuario o contraseña incorrectos');
                }
            } else {
                const userData = userDoc.docs[0].data();
                currentUser = {
                    id: userDoc.docs[0].id,
                    username: userData.username,
                    role: userData.role,
                    name: userData.name || username
                };
            }

            // Guardar en localStorage si se seleccionó "recordar"
            if (remember) {
                localStorage.setItem('hj_user', JSON.stringify({
                    username: username,
                    remember: true
                }));
            } else {
                localStorage.removeItem('hj_user');
            }

            // Ocultar modal y mostrar aplicación
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            document.getElementById('mainApp').style.display = 'block';
            document.getElementById('userRole').textContent = `${currentUser.name} - ${currentUser.role}`;
            
            // Mostrar/ocultar elementos según rol
            if (currentUser.role === 'gerente') {
                document.getElementById('configNavItem').style.display = 'block';
            }

            // Inicializar sistema
            await cargarConfiguracionCompleta();
            await cargarInventarioData();
            showSection('dashboard');

        } catch (error) {
            alert(error.message);
        }
    }

    async function inicializarSistemaAutomatico() {
        console.log("🚀 Inicializando sistema automáticamente...");
        
        try {
            // Crear usuario admin
            await db.collection('users').doc('admin').set({
                username: 'admin',
                password: 'admin123',
                role: 'gerente',
                name: 'Administrador Principal',
                email: 'admin@hjdisenos.com',
                activo: true,
                fechaCreacion: new Date().toISOString()
            });

            // Crear usuario vendedor
            await db.collection('users').doc('vendedor').set({
                username: 'vendedor',
                password: 'ventas123',
                role: 'vendedor',
                name: 'Juan Pérez',
                email: 'juan@hjdisenos.com',
                activo: true,
                fechaCreacion: new Date().toISOString()
            });

            // Crear configuración por defecto
            await db.collection('config').doc('maestra').set({
                mdf: 0.02,
                acri: 0.05,
                imp: 150,
                lis: 15,
                las: 2,
                utl: 50,
                empresa: 'H&J Diseños',
                telefono: '+52 1 234 567 890',
                direccion: 'Ciudad, Estado',
                iva: 16,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Crear inventario inicial
            const inventario = [
                { 
                    nombre: 'MDF 3mm', 
                    unidad: 'pieza', 
                    stockActual: 50, 
                    stockMinimo: 5, 
                    costoUnitario: 250, 
                    categoria: 'madera',
                    reservado: 0,
                    disponible: 50
                },
                { 
                    nombre: 'Acrílico 3mm transparente', 
                    unidad: 'pieza', 
                    stockActual: 30, 
                    stockMinimo: 3, 
                    costoUnitario: 350, 
                    categoria: 'plastico',
                    reservado: 0,
                    disponible: 30
                },
                { 
                    nombre: 'Listones de pino 2x2', 
                    unidad: 'metro', 
                    stockActual: 200, 
                    stockMinimo: 20, 
                    costoUnitario: 15, 
                    categoria: 'madera',
                    reservado: 0,
                    disponible: 200
                },
                { 
                    nombre: 'Tinta CMYK para impresión', 
                    unidad: 'litro', 
                    stockActual: 10, 
                    stockMinimo: 2, 
                    costoUnitario: 450, 
                    categoria: 'insumo',
                    reservado: 0,
                    disponible: 10
                },
                { 
                    nombre: 'Pegamento para madera', 
                    unidad: 'litro', 
                    stockActual: 8, 
                    stockMinimo: 1, 
                    costoUnitario: 120, 
                    categoria: 'adhesivo',
                    reservado: 0,
                    disponible: 8
                },
                { 
                    nombre: 'Barniz mate', 
                    unidad: 'litro', 
                    stockActual: 6, 
                    stockMinimo: 1, 
                    costoUnitario: 180, 
                    categoria: 'acabado',
                    reservado: 0,
                    disponible: 6
                }
            ];

            for (const item of inventario) {
                await db.collection('inventario').add({
                    ...item,
                    ultimaActualizacion: new Date().toISOString().split('T')[0],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }

            console.log("✅ Sistema inicializado correctamente");
            
        } catch (error) {
            console.error("Error inicializando sistema:", error);
        }
    }

    function logout() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            currentUser = null;
            document.getElementById('mainApp').style.display = 'none';
            document.getElementById('loginPass').value = '';
            initAuth();
        }
    }

    // ============================================
    // NAVEGACIÓN Y VISTAS
    // ============================================
    function showSection(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('[id^="section"]').forEach(section => {
            section.style.display = 'none';
        });
        
        // Remover clase active de todos los nav links
        document.querySelectorAll('#mainNav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostrar la sección solicitada
        const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        document.getElementById(`section${sectionName}`).style.display = 'block';
        
        // Activar el nav link correspondiente
        const navLink = document.querySelector(`#mainNav a[onclick*="${sectionId}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }
        
        // Cargar datos específicos de la sección
        switch(sectionId) {
            case 'dashboard':
                cargarDashboard();
                break;
            case 'cotizador':
                inicializarCotizador();
                break;
            case 'trabajos':
                cargarTrabajosActivos();
                break;
            case 'historial':
                cargarHistorialCompleto();
                break;
            case 'inventario':
                cargarInventario();
                break;
            case 'reportes':
                cargarReportes();
                break;
            case 'configuracion':
                cargarConfiguracion();
                break;
        }
    }

    // ============================================
    // DASHBOARD CORREGIDO
    // ============================================
    async function cargarDashboard() {
        console.log("📊 Cargando dashboard...");
        
        if (!currentUser) return;
        
        try {
            // Obtener fecha actual
            const hoy = new Date();
            const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
            
            // Formatear fechas como YYYY-MM-DD
            const fechaInicio = primerDiaMes.toISOString().split('T')[0];
            const fechaFin = ultimoDiaMes.toISOString().split('T')[0];
            
            console.log(`Consultando ventas del ${fechaInicio} al ${fechaFin}`);
            
            // 1. Cargar ventas del mes
            const ventasSnapshot = await db.collection('movimientos')
                .where('tipo', '==', 'VENTA')
                .get();
            
            let totalVentasMes = 0;
            ventasSnapshot.forEach(doc => {
                const data = doc.data();
                const fechaMov = data.fecha;
                
                if (fechaMov >= fechaInicio && fechaMov <= fechaFin) {
                    totalVentasMes += parseFloat(data.val) || 0;
                }
            });
            
            // 2. Cargar gastos del mes
            const gastosSnapshot = await db.collection('movimientos')
                .where('tipo', '==', 'GASTO')
                .get();
            
            let totalGastosMes = 0;
            gastosSnapshot.forEach(doc => {
                const data = doc.data();
                const fechaMov = data.fecha;
                
                if (fechaMov >= fechaInicio && fechaMov <= fechaFin) {
                    totalGastosMes += parseFloat(data.val) || 0;
                }
            });
            
            // 3. Contar trabajos activos (no entregados ni cancelados)
            const trabajosSnapshot = await db.collection('trabajos')
                .where('estado', 'in', ['cotizado', 'aprobado', 'en_produccion', 'en_laser', 'en_impresion', 'en_armado', 'listo'])
                .get();
            
            const trabajosActivos = trabajosSnapshot.size;
            
            // 4. Calcular utilidad
            const utilidad = totalVentasMes - totalGastosMes;
            
            console.log("📈 Resultados dashboard:", {
                ventas: totalVentasMes,
                gastos: totalGastosMes,
                utilidad: utilidad,
                trabajosActivos: trabajosActivos
            });
            
            // 5. Actualizar UI
            document.getElementById('dashVentas').innerText = '$ ' + totalVentasMes.toLocaleString('es-MX');
            document.getElementById('dashGastos').innerText = '$ ' + totalGastosMes.toLocaleString('es-MX');
            document.getElementById('dashUtil').innerText = '$ ' + utilidad.toLocaleString('es-MX');
            document.getElementById('dashTrabajos').innerText = trabajosActivos;
            
            // 6. Cargar movimientos recientes
            await cargarMovimientosRecientes();
            
            // 7. Cargar resumen inventario
            await cargarResumenInventario();
            
        } catch (error) {
            console.error("❌ Error cargando dashboard:", error);
            document.getElementById('dashVentas').innerText = '$ 0';
            document.getElementById('dashGastos').innerText = '$ 0';
            document.getElementById('dashUtil').innerText = '$ 0';
            document.getElementById('dashTrabajos').innerText = '0';
        }
    }

    async function cargarMovimientosRecientes() {
        try {
            const snapshot = await db.collection('movimientos')
                .orderBy('fecha', 'desc')
                .limit(10)
                .get();
            
            const container = document.getElementById('movimientosRecientes');
            let html = '';
            
            if (snapshot.empty) {
                html = '<div class="text-center text-muted p-3">No hay movimientos recientes</div>';
            } else {
                snapshot.forEach(doc => {
                    const mov = doc.data();
                    const tipo = mov.tipo || 'MOVIMIENTO';
                    const clase = tipo === 'VENTA' ? 'movimiento-venta' : 
                                 tipo === 'GASTO' ? 'movimiento-gasto' : 'movimiento-pago';
                    
                    html += `
                        <div class="movimiento-item ${clase}">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <strong class="d-block">${mov.det || 'Sin descripción'}</strong>
                                    <small class="text-muted">
                                        ${mov.fecha || 'Sin fecha'} • ${mov.usuario || 'Sistema'}
                                    </small>
                                </div>
                                <div class="text-end">
                                    <span class="badge ${tipo === 'VENTA' ? 'bg-success' : tipo === 'GASTO' ? 'bg-danger' : 'bg-primary'}">
                                        ${tipo}
                                    </span>
                                    <div class="fw-bold mt-1">$${(mov.val || 0).toLocaleString('es-MX')}</div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            
            container.innerHTML = html;
            
        } catch (error) {
            console.error("Error cargando movimientos:", error);
        }
    }

    async function cargarResumenInventario() {
        try {
            const snapshot = await db.collection('inventario')
                .where('stockActual', '<=', firebase.firestore.FieldValue.serverTimestamp()) // Esto no funciona bien, cambiar
                .limit(5)
                .get();
            
            const container = document.getElementById('inventorySummary');
            let html = '';
            
            if (snapshot.empty) {
                // Cargar todos y filtrar localmente
                const allSnapshot = await db.collection('inventario').get();
                const items = [];
                
                allSnapshot.forEach(doc => {
                    items.push(doc.data());
                });
                
                // Ordenar por stock disponible (más bajo primero)
                items.sort((a, b) => {
                    const dispA = (a.stockActual || 0) - (a.reservado || 0);
                    const dispB = (b.stockActual || 0) - (b.reservado || 0);
                    return dispA - dispB;
                });
                
                // Tomar los 5 con menor stock
                items.slice(0, 5).forEach(item => {
                    const disponible = (item.stockActual || 0) - (item.reservado || 0);
                    const nivel = disponible <= item.stockMinimo ? 'danger' : 
                                 disponible <= item.stockMinimo * 2 ? 'warning' : 'success';
                    
                    html += `
                        <div class="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                            <div>
                                <strong class="small">${item.nombre}</strong>
                                <div class="text-muted">${disponible} ${item.unidad} disp.</div>
                            </div>
                            <div class="text-end">
                                <span class="badge bg-${nivel}">${item.stockMinimo} min</span>
                                <div class="small">$${item.costoUnitario || 0}/unidad</div>
                            </div>
                        </div>
                    `;
                });
                
                if (items.length === 0) {
                    html = '<div class="text-center text-muted">No hay inventario registrado</div>';
                }
            } else {
                snapshot.forEach(doc => {
                    const item = doc.data();
                    const disponible = (item.stockActual || 0) - (item.reservado || 0);
                    const nivel = disponible <= item.stockMinimo ? 'danger' : 
                                 disponible <= item.stockMinimo * 2 ? 'warning' : 'success';
                    
                    html += `
                        <div class="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                            <div>
                                <strong class="small">${item.nombre}</strong>
                                <div class="text-muted">${disponible} ${item.unidad} disp.</div>
                            </div>
                            <div class="text-end">
                                <span class="badge bg-${nivel}">${item.stockMinimo} min</span>
                                <div class="small">$${item.costoUnitario || 0}/unidad</div>
                            </div>
                        </div>
                    `;
                });
            }
            
            container.innerHTML = html;
            
        } catch (error) {
            console.error("Error cargando resumen inventario:", error);
        }
    }

    async function registrarGasto() {
        if (!currentUser) {
            alert('Por favor inicie sesión');
            return;
        }

        const descripcion = document.getElementById('gastoDescripcion').value;
        const monto = parseFloat(document.getElementById('gastoMonto').value);

        if (!descripcion || !monto || monto <= 0) {
            alert('Por favor ingrese una descripción y monto válido');
            return;
        }

        try {
            await db.collection('movimientos').add({
                fecha: new Date().toISOString().split('T')[0],
                tipo: 'GASTO',
                det: descripcion,
                val: monto,
                usuario: currentUser.name,
                ts: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Limpiar formulario
            document.getElementById('gastoDescripcion').value = '';
            document.getElementById('gastoMonto').value = '';

            alert('✅ Gasto registrado correctamente');
            
            // Actualizar dashboard
            cargarDashboard();
            
        } catch (error) {
            alert('Error registrando gasto: ' + error.message);
        }
    }

    // ============================================
    // COTIZADOR CON SELECCIÓN DE INVENTARIO
    // ============================================
    function inicializarCotizador() {
        // Inicializar el primer item
        if (!materialesSeleccionados[0]) {
            materialesSeleccionados[0] = [];
        }
        renderMaterialesSeleccionados(0);
    }

    function agregarItemCotizacion() {
        const container = document.getElementById('itemsCotizacionContainer');
        currentItemIndex++;
        
        const nuevoItem = document.createElement('div');
        nuevoItem.className = 'item-cotizacion';
        nuevoItem.id = `item-${currentItemIndex}`;
        nuevoItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">Item ${currentItemIndex + 1}</h6>
                <button class="btn btn-sm btn-danger" onclick="eliminarItemCotizacion(${currentItemIndex})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <div class="row g-2">
                <div class="col-md-4">
                    <label class="form-label">Producto</label>
                    <input type="text" class="form-control item-producto" placeholder="Ej: Retablo 30x45" oninput="calcularItemPorIndex(${currentItemIndex})">
                </div>
                <div class="col-md-2">
                    <label class="form-label">Cantidad</label>
                    <input type="number" class="form-control item-cantidad" value="1" min="1" oninput="calcularItemPorIndex(${currentItemIndex})">
                </div>
                <div class="col-md-2">
                    <label class="form-label">Ancho (cm)</label>
                    <input type="number" class="form-control item-ancho" value="30" oninput="calcularItemPorIndex(${currentItemIndex})">
                </div>
                <div class="col-md-2">
                    <label class="form-label">Largo (cm)</label>
                    <input type="number" class="form-control item-largo" value="40" oninput="calcularItemPorIndex(${currentItemIndex})">
                </div>
                <div class="col-md-2">
                    <label class="form-label">Láser (min)</label>
                    <input type="number" class="form-control item-laser" value="15" oninput="calcularItemPorIndex(${currentItemIndex})">
                </div>
                
                <div class="col-12 py-3 border-top mt-2">
                    <h6 class="fw-bold mb-3">Materiales para este item</h6>
                    <div class="material-selector" id="materialSelector-${currentItemIndex}">
                        <div class="text-center">
                            <button class="btn btn-sm btn-outline-primary mb-2" onclick="mostrarSelectorMateriales(${currentItemIndex})">
                                <i class="bi bi-plus-lg me-1"></i>Seleccionar Materiales del Inventario
                            </button>
                        </div>
                        <div id="materialesSeleccionados-${currentItemIndex}" class="mt-2">
                            <!-- Materiales seleccionados aparecerán aquí -->
                        </div>
                    </div>
                </div>
                
                <div class="col-md-8">
                    <label class="form-label">Extras ($)</label>
                    <input type="number" class="form-control item-extras" value="0" oninput="calcularItemPorIndex(${currentItemIndex})">
                </div>
                <div class="col-md-4 text-end">
                    <label class="form-label">Subtotal</label>
                    <h5 class="item-subtotal text-primary">$ 0</h5>
                </div>
            </div>
        `;
        
        container.appendChild(nuevoItem);
        
        // Inicializar array para este item
        if (!materialesSeleccionados[currentItemIndex]) {
            materialesSeleccionados[currentItemIndex] = [];
        }
        
        // Actualizar contador
        actualizarContadorItems();
        
        // Calcular total
        calcularTotalCotizacion();
    }

    function eliminarItemCotizacion(index) {
        if (document.querySelectorAll('.item-cotizacion').length <= 1) {
            alert('Debe haber al menos un item en la cotización');
            return;
        }
        
        const item = document.getElementById(`item-${index}`);
        if (item) {
            item.remove();
            delete itemsCotizacion[index];
            delete materialesSeleccionados[index];
            actualizarContadorItems();
            calcularTotalCotizacion();
        }
    }

    function actualizarContadorItems() {
        const totalItems = document.querySelectorAll('.item-cotizacion').length;
        document.getElementById('totalItems').textContent = totalItems;
    }

    async function mostrarSelectorMateriales(itemIndex) {
        currentItemIndexForMaterial = itemIndex;
        
        // Cargar inventario
        await cargarInventarioData();
        
        const container = document.getElementById('inventorySelector');
        let html = '';
        
        inventarioData.forEach(material => {
            const disponible = (material.stockActual || 0) - (material.reservado || 0);
            const yaSeleccionado = materialesSeleccionados[itemIndex]?.some(m => m.id === material.id);
            
            html += `
                <div class="material-item ${yaSeleccionado ? 'selected' : ''}" onclick="toggleMaterialSeleccionado('${material.id}')">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${material.nombre}</strong>
                            <br>
                            <small class="text-muted">
                                Stock: ${material.stockActual} ${material.unidad} | 
                                Disponible: ${disponible} ${material.unidad} | 
                                Costo: $${material.costoUnitario}/${material.unidad}
                            </small>
                        </div>
                        <div>
                            ${yaSeleccionado ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-circle"></i>'}
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        renderPreviewMaterialesSeleccionados();
        
        const modal = new bootstrap.Modal(document.getElementById('materialSelectorModal'));
        modal.show();
    }

    function toggleMaterialSeleccionado(materialId) {
        const material = inventarioData.find(m => m.id === materialId);
        if (!material) return;
        
        const itemIndex = currentItemIndexForMaterial;
        if (!materialesSeleccionados[itemIndex]) {
            materialesSeleccionados[itemIndex] = [];
        }
        
        const index = materialesSeleccionados[itemIndex].findIndex(m => m.id === materialId);
        
        if (index === -1) {
            // Agregar material
            materialesSeleccionados[itemIndex].push({
                id: material.id,
                nombre: material.nombre,
                costoUnitario: material.costoUnitario,
                unidad: material.unidad,
                cantidad: 1
            });
        } else {
            // Remover material
            materialesSeleccionados[itemIndex].splice(index, 1);
        }
        
        // Actualizar UI
        const items = document.querySelectorAll('.material-item');
        items.forEach(item => {
            const materialId = item.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (materialId) {
                const isSelected = materialesSeleccionados[itemIndex]?.some(m => m.id === materialId);
                if (isSelected) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            }
        });
        
        renderPreviewMaterialesSeleccionados();
    }

    function renderPreviewMaterialesSeleccionados() {
        const container = document.getElementById('selectedMaterialsPreview');
        const itemIndex = currentItemIndexForMaterial;
        const materiales = materialesSeleccionados[itemIndex] || [];
        
        if (materiales.length === 0) {
            container.innerHTML = '<p class="text-muted">No hay materiales seleccionados</p>';
            return;
        }
        
        let html = '<div class="row">';
        materiales.forEach((material, index) => {
            html += `
                <div class="col-6 mb-2">
                    <div class="d-flex justify-content-between align-items-center p-2 border rounded">
                        <div>
                            <strong class="small">${material.nombre}</strong>
                            <div class="text-muted">$${material.costoUnitario}/${material.unidad}</div>
                        </div>
                        <div>
                            <input type="number" class="form-control form-control-sm" 
                                   style="width: 70px;" 
                                   value="${material.cantidad}" 
                                   min="1"
                                   onchange="actualizarCantidadMaterial(${itemIndex}, ${index}, this.value)">
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    }

    function actualizarCantidadMaterial(itemIndex, materialIndex, cantidad) {
        if (materialesSeleccionados[itemIndex] && materialesSeleccionados[itemIndex][materialIndex]) {
            materialesSeleccionados[itemIndex][materialIndex].cantidad = parseInt(cantidad) || 1;
        }
    }

    function guardarMaterialesSeleccionados() {
        const itemIndex = currentItemIndexForMaterial;
        renderMaterialesSeleccionados(itemIndex);
        calcularItemPorIndex(itemIndex);
        
        bootstrap.Modal.getInstance(document.getElementById('materialSelectorModal')).hide();
    }

    function renderMaterialesSeleccionados(itemIndex) {
        const container = document.getElementById(`materialesSeleccionados-${itemIndex}`);
        const materiales = materialesSeleccionados[itemIndex] || [];
        
        if (materiales.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-2">No hay materiales seleccionados</div>';
            return;
        }
        
        let html = '<div class="row g-2">';
        materiales.forEach((material, index) => {
            html += `
                <div class="col-md-6">
                    <div class="d-flex justify-content-between align-items-center p-2 border rounded">
                        <div>
                            <strong class="small">${material.nombre}</strong>
                            <div class="text-muted">${material.cantidad} ${material.unidad} × $${material.costoUnitario}</div>
                        </div>
                        <div>
                            <span class="badge bg-primary">$${(material.cantidad * material.costoUnitario).toFixed(2)}</span>
                            <button class="btn btn-sm btn-outline-danger ms-2" onclick="removerMaterial(${itemIndex}, ${index})">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    }

    function removerMaterial(itemIndex, materialIndex) {
        if (materialesSeleccionados[itemIndex]) {
            materialesSeleccionados[itemIndex].splice(materialIndex, 1);
            renderMaterialesSeleccionados(itemIndex);
            calcularItemPorIndex(itemIndex);
        }
    }

    function calcularItem(element) {
        const itemElement = element.closest('.item-cotizacion');
        if (itemElement && itemElement.id) {
            const match = itemElement.id.match(/item-(\d+)/);
            if (match) {
                const itemIndex = parseInt(match[1]);
                calcularItemElement(itemElement, itemIndex);
            } else {
                calcularItemElement(itemElement, 0);
            }
        }
    }

    function calcularItemPorIndex(itemIndex) {
        const itemElement = document.getElementById(`item-${itemIndex}`);
        if (itemElement) {
            calcularItemElement(itemElement, itemIndex);
        }
    }

    function calcularItemElement(itemElement, itemIndex) {
        const cantidad = parseFloat(itemElement.querySelector('.item-cantidad').value) || 1;
        const ancho = parseFloat(itemElement.querySelector('.item-ancho').value) || 0;
        const largo = parseFloat(itemElement.querySelector('.item-largo').value) || 0;
        const laser = parseFloat(itemElement.querySelector('.item-laser').value) || 0;
        const extras = parseFloat(itemElement.querySelector('.item-extras').value) || 0;

        const area = ancho * largo; // cm²
        const peri = ((ancho * 2) + (largo * 2)) / 100; // Convertir a metros

        let costoItem = 0;
        const detalleItem = [];

        // Calcular costos de materiales seleccionados
        const materiales = materialesSeleccionados[itemIndex] || [];
        materiales.forEach(material => {
            let costoMaterial = material.cantidad * material.costoUnitario;
            costoItem += costoMaterial;
            detalleItem.push(`${material.nombre}: ${material.cantidad} ${material.unidad} × $${material.costoUnitario} = $${costoMaterial.toFixed(2)}`);
        });

        // Agregar costo de láser (si hay tiempo de láser)
        if (laser > 0) {
            const costoLasermin = config.las || 2; // $ por minuto de láser
            const costoLaser = laser * costoLasermin;
            costoItem += costoLaser;
            detalleItem.push(`Corte láser: ${laser}min × $${costoLasermin} = $${costoLaser.toFixed(2)}`);
        }

        // Agregar costo de impresión (si hay área)
        if (area > 0) {
            const costoImpm2 = config.imp || 150; // $ por m² de impresión
            const areaM2 = area / 10000; // Convertir cm² a m²
            const costoImp = areaM2 * costoImpm2;
            costoItem += costoImp;
            detalleItem.push(`Impresión: ${areaM2.toFixed(4)}m² × $${costoImpm2} = $${costoImp.toFixed(2)}`);
        }

        // Agregar extras
        if (extras > 0) {
            costoItem += extras;
            detalleItem.push(`Extras: $${extras.toFixed(2)}`);
        }

        // Calcular subtotal con cantidad
        const subtotal = costoItem * cantidad;

        // Actualizar UI del item
        itemElement.querySelector('.item-subtotal').textContent = `$ ${subtotal.toLocaleString('es-MX')}`;

        // Guardar datos del item
        itemsCotizacion[itemIndex] = {
            producto: itemElement.querySelector('.item-producto').value || `Item ${parseInt(itemIndex) + 1}`,
            cantidad: cantidad,
            ancho: ancho,
            largo: largo,
            laser: laser,
            extras: extras,
            costoUnitario: costoItem,
            subtotal: subtotal,
            materiales: materiales,
            detalle: detalleItem
        };

        // Calcular total general
        calcularTotalCotizacion();
    }

    function calcularTotalCotizacion() {
        let costoTotal = 0;
        let subtotalTotal = 0;
        let detalleGeneral = [];

        // Calcular sumatoria de todos los items
        Object.values(itemsCotizacion).forEach((item, index) => {
            if (item) {
                costoTotal += item.costoUnitario * item.cantidad;
                subtotalTotal += item.subtotal;
                
                detalleGeneral.push(`<strong>${item.cantidad}x ${item.producto}</strong>`);
                item.detalle.forEach(det => {
                    detalleGeneral.push(`&nbsp;&nbsp;&nbsp;${det}`);
                });
                detalleGeneral.push(`Subtotal: $${item.subtotal.toLocaleString('es-MX')}<br>`);
            }
        });

        // Calcular utilidad basada en configuración
        const porcentajeUtilidad = config.utl || 50;
        const utilidad = costoTotal * (porcentajeUtilidad / 100);
        const venta = costoTotal + utilidad;

        cacheCosto = Math.ceil(costoTotal);
        cacheVenta = Math.ceil(venta);

        // Actualizar UI general
        document.getElementById('resC').innerText = "$ " + cacheCosto.toLocaleString('es-MX');
        document.getElementById('resU').innerText = "$ " + Math.ceil(utilidad).toLocaleString('es-MX');
        document.getElementById('resV').innerText = "$ " + cacheVenta.toLocaleString('es-MX');

        // Mostrar detalle general
        const container = document.getElementById('detalleCostos');
        if (detalleGeneral.length > 0) {
            container.innerHTML = `<small>${detalleGeneral.join('<br>')}</small>`;
        } else {
            container.innerHTML = '<div class="text-muted">Complete los items para ver el detalle</div>';
        }
    }

    async function subirVenta() {
        if (!currentUser) {
            alert('Por favor inicie sesión');
            return;
        }
        
        const cliente = document.getElementById('vCli').value;
        const descripcion = document.getElementById('vProd').value;
        
        if (!cliente || !descripcion || cacheVenta <= 0) {
            alert('Complete todos los campos y calcule la cotización');
            return;
        }
        
        try {
            // Registrar como movimiento de venta
            await db.collection('movimientos').add({
                fecha: new Date().toISOString().split('T')[0],
                tipo: 'VENTA',
                det: `Venta - ${cliente}: ${descripcion}`,
                val: cacheVenta,
                usuario: currentUser.name,
                cliente: cliente,
                descripcion: descripcion,
                items: Object.values(itemsCotizacion).filter(item => item),
                ts: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Limpiar formulario
            document.getElementById('vCli').value = '';
            document.getElementById('vProd').value = '';
            
            // Reiniciar items
            itemsCotizacion = [null];
            currentItemIndex = 0;
            materialesSeleccionados = {0: []};
            const container = document.getElementById('itemsCotizacionContainer');
            const itemBase = document.getElementById('item-base');
            container.innerHTML = itemBase.outerHTML;
            
            // Actualizar contador
            actualizarContadorItems();
            
            // Resetear valores
            document.getElementById('resC').innerText = "$ 0";
            document.getElementById('resU').innerText = "$ 0";
            document.getElementById('resV').innerText = "$ 0";
            document.getElementById('detalleCostos').innerHTML = '';
            
            // Actualizar dashboard
            await cargarDashboard();
            
            alert('✅ Venta registrada exitosamente');
            
        } catch (error) {
            alert('Error registrando venta: ' + error.message);
        }
    }

    function convertirATrabajo() {
        const cliente = document.getElementById('vCli').value;
        const descripcion = document.getElementById('vProd').value;
        
        if (!cliente || !descripcion || cacheVenta <= 0) {
            alert('Complete la cotización primero');
            return;
        }
        
        // Llenar el modal de nuevo trabajo con los datos de la cotización
        document.getElementById('jobClient').value = cliente;
        document.getElementById('jobDescription').value = descripcion;
        document.getElementById('jobBudget').value = cacheVenta;
        
        // Establecer fechas por defecto
        const today = new Date().toISOString().split('T')[0];
        const oneWeekLater = new Date();
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        const dueDate = oneWeekLater.toISOString().split('T')[0];
        
        document.getElementById('jobStartDate').value = today;
        document.getElementById('jobDueDate').value = dueDate;
        document.getElementById('jobNotes').value = 'Generado automáticamente desde cotizador';
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('newJobModal'));
        modal.show();
    }

    function generarComprobante() {
        const cliente = document.getElementById('vCli').value;
        const descripcion = document.getElementById('vProd').value;
        
        if (!cliente || !descripcion || cacheVenta <= 0) {
            alert('Complete la cotización primero');
            return;
        }
        
        const comprobanteContent = document.getElementById('comprobanteContent');
        comprobanteContent.innerHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <div class="text-center mb-4">
                    <h3 class="fw-bold">${config.empresa || 'H&J Diseños'}</h3>
                    <p class="mb-1">${config.direccion || 'Dirección no configurada'}</p>
                    <p class="mb-3">${config.telefono || 'Teléfono no configurado'}</p>
                </div>
                
                <div class="border-top border-bottom py-3 my-3">
                    <h4 class="fw-bold text-primary">COTIZACIÓN</h4>
                    <p><strong>Cliente:</strong> ${cliente}</p>
                    <p><strong>Descripción:</strong> ${descripcion}</p>
                    <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
                </div>
                
                <div class="mb-4">
                    <h5 class="fw-bold">Detalle de Items:</h5>
                    ${Object.values(itemsCotizacion).filter(item => item).map((item, index) => `
                        <div class="border-bottom py-2">
                            <strong>${item.cantidad}x ${item.producto}</strong><br>
                            <small class="text-muted">${item.ancho}cm × ${item.largo}cm</small>
                            <div class="text-end fw-bold">$${item.subtotal.toLocaleString('es-MX')}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-dark text-white p-4 rounded-3">
                    <div class="row text-center">
                        <div class="col-4">
                            <small>Costo Total</small>
                            <h4>$${cacheCosto.toLocaleString('es-MX')}</h4>
                        </div>
                        <div class="col-4">
                            <small>Utilidad</small>
                            <h4 class="text-warning">$${(cacheVenta - cacheCosto).toLocaleString('es-MX')}</h4>
                        </div>
                        <div class="col-4">
                            <small>Total a Pagar</small>
                            <h2 class="fw-bold">$${cacheVenta.toLocaleString('es-MX')}</h2>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 text-center text-muted small">
                    <p>Esta cotización es válida por 15 días<br>
                    Gracias por su preferencia</p>
                </div>
            </div>
        `;
        
        // Mostrar comprobante
        document.getElementById('comprobanteOverlay').style.display = 'block';
        document.getElementById('comprobanteContainer').style.display = 'block';
    }

    function cerrarComprobante() {
        document.getElementById('comprobanteOverlay').style.display = 'none';
        document.getElementById('comprobanteContainer').style.display = 'none';
    }

    function compartirWhatsApp() {
        const cliente = document.getElementById('vCli').value;
        const total = cacheVenta;
        const texto = `Hola ${cliente}, te comparto la cotización de H&J Diseños por un total de $${total.toLocaleString('es-MX')}. ¡Gracias por tu preferencia!`;
        const encodedText = encodeURIComponent(texto);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }

    function generarPDF() {
        alert('Función de generación de PDF en desarrollo');
    }

    // ============================================
    // TRABAJOS ACTIVOS E HISTORIAL
    // ============================================
    // ============================================
// TRABAJOS ACTIVOS E HISTORIAL - CORREGIDO
// ============================================
async function cargarTrabajosActivos() {
    if (!currentUser) return;

    const filter = document.getElementById('filterStatus').value;
    let query = db.collection('trabajos');
    
    try {
        // Primero, obtener todos los trabajos y filtrar localmente
        const snapshot = await query.orderBy('createdAt', 'desc').limit(100).get();
        const container = document.getElementById('jobsContainer');
        container.innerHTML = '';

        // Filtrar trabajos activos (no entregados ni cancelados)
        let trabajosActivos = [];
        snapshot.forEach(doc => {
            const job = doc.data();
            const jobId = doc.id;
            job.id = jobId;
            
            // Solo incluir trabajos que NO sean entregados ni cancelados
            if (job.estado !== 'entregado' && job.estado !== 'cancelado') {
                // Filtrar por estado específico si no es "activos"
                if (filter === 'activos' || job.estado === filter) {
                    // Filtrar por rol si no es gerente
                    if (currentUser.role === 'gerente' || job.vendedorId === currentUser.id) {
                        trabajosActivos.push(job);
                    }
                }
            }
        });

        if (trabajosActivos.length === 0) {
            container.innerHTML = '<div class="col-12 text-center text-muted py-5">No hay trabajos activos</div>';
            return;
        }

        // Mostrar trabajos activos
        trabajosActivos.forEach(job => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 mb-4';
            
            const saldoPercent = job.presupuesto > 0 ? ((job.saldoPendiente / job.presupuesto) * 100).toFixed(0) : 0;
            const progressColor = saldoPercent > 50 ? 'danger' : saldoPercent > 25 ? 'warning' : 'success';
            
            col.innerHTML = `
                <div class="card order-card p-3" style="border-left-color: ${STATUS_COLORS[job.estado] || '#6c757d'}">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="fw-bold mb-0">${job.cliente || 'Sin cliente'}</h6>
                        <span class="badge-status" style="background-color: ${STATUS_COLORS[job.estado] || '#6c757d'}; color: white;">
                            ${(job.estado || 'cotizado').replace('_', ' ').toUpperCase()}
                        </span>
                    </div>
                    <p class="small text-muted mb-2">${job.descripcion || 'Sin descripción'}</p>
                    
                    <div class="d-flex justify-content-between small mb-2">
                        <span><i class="bi bi-calendar me-1"></i> ${job.fechaIngreso || 'Sin fecha'}</span>
                        <span><i class="bi bi-clock me-1"></i> ${job.fechaPrometida || 'Sin fecha'}</span>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <div class="fw-bold">$${(job.presupuesto || 0).toLocaleString('es-MX')}</div>
                            <small class="text-muted">Presupuesto</small>
                        </div>
                        <div class="text-end">
                            <div class="fw-bold text-${progressColor}">$${(job.saldoPendiente || 0).toLocaleString('es-MX')}</div>
                            <small class="text-muted">Saldo</small>
                        </div>
                    </div>
                    
                    <div class="progress mb-2" style="height: 6px;">
                        <div class="progress-bar bg-${progressColor}" 
                             style="width: ${100 - saldoPercent}%"></div>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary flex-grow-1" 
                                onclick="verDetallesTrabajo('${job.id}')">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-success" 
                                onclick="abrirModalPago('${job.id}')" 
                                ${job.estado === 'cancelado' ? 'disabled' : ''}>
                            <i class="bi bi-cash-coin"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-warning" 
                                onclick="cambiarEstadoTrabajo('${job.id}')"
                                ${currentUser.role !== 'gerente' ? 'disabled' : ''}>
                            <i class="bi bi-arrow-right-circle"></i>
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(col);
        });
    } catch (error) {
        console.error("Error cargando trabajos activos:", error);
        container.innerHTML = '<div class="col-12 text-center text-danger py-5">Error cargando trabajos activos</div>';
    }
}

async function cargarHistorialCompleto() {
    try {
        // Obtener todos los trabajos y filtrar localmente
        const snapshot = await db.collection('trabajos')
            .orderBy('updatedAt', 'desc')
            .limit(100)
            .get();
        
        const tbody = document.getElementById('historialTable');
        tbody.innerHTML = '';
        
        let trabajosHistorial = [];
        snapshot.forEach(doc => {
            const job = doc.data();
            const jobId = doc.id;
            
            // Solo incluir trabajos entregados o cancelados
            if (job.estado === 'entregado' || job.estado === 'cancelado') {
                trabajosHistorial.push({
                    id: jobId,
                    ...job
                });
            }
        });
        
        if (trabajosHistorial.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay trabajos en el historial</td></tr>';
            return;
        }
        
        // Mostrar trabajos del historial
        trabajosHistorial.forEach(job => {
            const estadoColor = job.estado === 'entregado' ? 'success' : 'danger';
            
            tbody.innerHTML += `
                <tr>
                    <td>${job.fechaIngreso || 'N/A'}</td>
                    <td><strong>${job.cliente || 'Sin cliente'}</strong></td>
                    <td>${job.descripcion || 'Sin descripción'}</td>
                    <td><span class="badge bg-${estadoColor}">${job.estado.toUpperCase()}</span></td>
                    <td>$${(job.presupuesto || 0).toLocaleString('es-MX')}</td>
                    <td>$${(job.saldoPendiente || 0).toLocaleString('es-MX')}</td>
                    <td>${job.vendedorNombre || 'N/A'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="verDetallesTrabajo('${job.id}')">
                            <i class="bi bi-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
    } catch (error) {
        console.error("Error cargando historial:", error);
    }
}

    async function cargarHistorialCompleto() {
        try {
            let query = db.collection('trabajos')
                .where('estado', 'in', ['entregado', 'cancelado'])
                .orderBy('updatedAt', 'desc')
                .limit(100);
            
            const snapshot = await query.get();
            const tbody = document.getElementById('historialTable');
            tbody.innerHTML = '';
            
            if (snapshot.empty) {
                tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay trabajos en el historial</td></tr>';
                return;
            }
            
            snapshot.forEach(doc => {
                const job = doc.data();
                const jobId = doc.id;
                const estadoColor = job.estado === 'entregado' ? 'success' : 'danger';
                
                tbody.innerHTML += `
                    <tr>
                        <td>${job.fechaIngreso || 'N/A'}</td>
                        <td><strong>${job.cliente || 'Sin cliente'}</strong></td>
                        <td>${job.descripcion || 'Sin descripción'}</td>
                        <td><span class="badge bg-${estadoColor}">${job.estado.toUpperCase()}</span></td>
                        <td>$${(job.presupuesto || 0).toLocaleString('es-MX')}</td>
                        <td>$${(job.saldoPendiente || 0).toLocaleString('es-MX')}</td>
                        <td>${job.vendedorNombre || 'N/A'}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="verDetallesTrabajo('${jobId}')">
                                <i class="bi bi-eye"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            
        } catch (error) {
            console.error("Error cargando historial:", error);
        }
    }

    function exportarHistorialExcel() {
        const table = document.getElementById('historialTable');
        const rows = table.querySelectorAll('tr');
        
        if (rows.length <= 1) {
            alert('No hay datos para exportar');
            return;
        }
        
        const data = [];
        
        // Encabezados
        const headers = ['Fecha', 'Cliente', 'Descripción', 'Estado', 'Presupuesto', 'Saldo', 'Vendedor'];
        data.push(headers);
        
        // Datos
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const rowData = [];
                cells.forEach((cell, index) => {
                    if (index !== 7) { // Excluir columna de acciones
                        // Extraer texto limpio de las celdas
                        let text = cell.textContent.trim();
                        // Remover símbolos de moneda para números
                        if (index === 4 || index === 5) {
                            text = text.replace('$', '').replace(/,/g, '');
                        }
                        rowData.push(text);
                    }
                });
                data.push(rowData);
            }
        });
        
        // Crear hoja de cálculo
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Historial");
        
        // Generar nombre de archivo con fecha
        const fecha = new Date().toISOString().split('T')[0];
        XLSX.writeFile(wb, `historial_trabajos_${fecha}.xlsx`);
    }

    async function crearNuevoTrabajo() {
        if (!currentUser) {
            alert('Por favor inicie sesión');
            return;
        }

        const jobData = {
            cliente: document.getElementById('jobClient').value,
            descripcion: document.getElementById('jobDescription').value,
            fechaIngreso: document.getElementById('jobStartDate').value,
            fechaPrometida: document.getElementById('jobDueDate').value,
            presupuesto: parseFloat(document.getElementById('jobBudget').value),
            notas: document.getElementById('jobNotes').value,
            estado: ORDER_STATUS.COTIZADO,
            vendedorId: currentUser.id,
            vendedorNombre: currentUser.name,
            saldoPendiente: parseFloat(document.getElementById('jobBudget').value),
            pagos: [],
            items: Object.values(itemsCotizacion).filter(item => item),
            materialesReservados: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            const trabajoRef = await db.collection('trabajos').add(jobData);
            const trabajoId = trabajoRef.id;
            
            // Registrar también como venta
            await db.collection('movimientos').add({
                fecha: new Date().toISOString().split('T')[0],
                tipo: 'VENTA',
                det: `Venta/Trabajo - ${jobData.cliente}: ${jobData.descripcion}`,
                val: jobData.presupuesto,
                trabajoId: trabajoId,
                usuario: currentUser.name,
                ts: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Limpiar formulario
            document.getElementById('jobClient').value = '';
            document.getElementById('jobDescription').value = '';
            document.getElementById('jobBudget').value = '';
            document.getElementById('jobNotes').value = '';
            
            // Cerrar modal
            bootstrap.Modal.getInstance(document.getElementById('newJobModal')).hide();
            
            // Actualizar dashboard y trabajos
            await cargarDashboard();
            await cargarTrabajosActivos();
            
            alert('✅ Trabajo creado exitosamente y registrado como venta');
            
        } catch (error) {
            alert('Error al crear trabajo: ' + error.message);
        }
    }

    async function verDetallesTrabajo(jobId) {
        try {
            const doc = await db.collection('trabajos').doc(jobId).get();
            if (doc.exists) {
                const job = doc.data();
                
                let detallesHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold">Información del Cliente</h6>
                            <p><strong>Cliente:</strong> ${job.cliente || 'No especificado'}</p>
                            <p><strong>Descripción:</strong> ${job.descripcion || 'No especificado'}</p>
                            <p><strong>Vendedor:</strong> ${job.vendedorNombre || 'No especificado'}</p>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold">Fechas</h6>
                            <p><strong>Fecha de Ingreso:</strong> ${job.fechaIngreso || 'No especificada'}</p>
                            <p><strong>Fecha Prometida:</strong> ${job.fechaPrometida || 'No especificada'}</p>
                            <p><strong>Estado Actual:</strong> 
                                <span class="badge" style="background-color: ${STATUS_COLORS[job.estado] || '#6c757d'}; color: white;">
                                    ${(job.estado || 'cotizado').replace('_', ' ').toUpperCase()}
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="fw-bold">Financiero</h6>
                            <p><strong>Presupuesto Aprobado:</strong> $${(job.presupuesto || 0).toLocaleString('es-MX')}</p>
                            <p><strong>Saldo Pendiente:</strong> $${(job.saldoPendiente || 0).toLocaleString('es-MX')}</p>
                            <p><strong>Porcentaje Pagado:</strong> ${job.presupuesto > 0 ? (((job.presupuesto - job.saldoPendiente) / job.presupuesto * 100).toFixed(0)) : 0}%</p>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold">Notas</h6>
                            <p>${job.notas || 'Sin notas adicionales'}</p>
                        </div>
                    </div>
                `;
                
                if (job.items && job.items.length > 0) {
                    detallesHTML += `
                        <div class="row mt-4">
                            <div class="col-12">
                                <h6 class="fw-bold">Items del Trabajo</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Dimensiones</th>
                                                <th>Materiales</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${job.items.map(item => `
                                                <tr>
                                                    <td>${item.producto}</td>
                                                    <td>${item.cantidad}</td>
                                                    <td>${item.ancho}cm × ${item.largo}cm</td>
                                                    <td>${item.materiales ? item.materiales.map(m => m.nombre).join(', ') : 'N/A'}</td>
                                                    <td>$${item.subtotal.toLocaleString('es-MX')}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                if (job.pagos && job.pagos.length > 0) {
                    detallesHTML += `
                        <div class="row mt-4">
                            <div class="col-12">
                                <h6 class="fw-bold">Historial de Pagos</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Monto</th>
                                                <th>Método</th>
                                                <th>Tipo</th>
                                                <th>Referencia</th>
                                                <th>Usuario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${job.pagos.map(pago => `
                                                <tr>
                                                    <td>${pago.fecha || 'N/A'}</td>
                                                    <td>$${(pago.monto || 0).toLocaleString('es-MX')}</td>
                                                    <td>${pago.metodo || 'N/A'}</td>
                                                    <td>${pago.tipo || 'N/A'}</td>
                                                    <td>${pago.referencia || 'N/A'}</td>
                                                    <td>${pago.usuario || 'N/A'}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Botones de acción
                detallesHTML += `
                    <div class="row mt-4">
                        <div class="col-12 text-end">
                            ${job.estado === 'aprobado' ? `
                                <button class="btn btn-warning" onclick="reservarMaterialesTrabajo('${jobId}')">
                                    <i class="bi bi-box-seam me-2"></i>Reservar Materiales
                                </button>
                            ` : ''}
                            ${job.estado === 'listo' ? `
                                <button class="btn btn-success" onclick="marcarComoEntregado('${jobId}')">
                                    <i class="bi bi-check-circle me-2"></i>Marcar como Entregado
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                document.getElementById('jobDetailContent').innerHTML = detallesHTML;
                document.getElementById('jobDetailTitle').textContent = `Detalles del Trabajo - ${job.cliente}`;
                
                const modal = new bootstrap.Modal(document.getElementById('jobDetailModal'));
                modal.show();
            }
        } catch (error) {
            console.error("Error cargando detalles del trabajo:", error);
            alert("Error al cargar los detalles del trabajo");
        }
    }

    function abrirModalPago(jobId) {
        currentJobIdForPayment = jobId;
        const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
        modal.show();
    }

    async function registrarPago() {
        if (!currentUser || !currentJobIdForPayment) {
            alert('Error: No hay trabajo seleccionado');
            return;
        }

        const monto = parseFloat(document.getElementById('paymentAmount').value);
        const tipo = document.getElementById('paymentType').value;
        const metodo = document.getElementById('paymentMethod').value;
        const referencia = document.getElementById('paymentReference').value;

        if (!monto || monto <= 0) {
            alert('Por favor ingrese un monto válido');
            return;
        }

        try {
            const jobDoc = await db.collection('trabajos').doc(currentJobIdForPayment).get();
            if (!jobDoc.exists) {
                alert('El trabajo no existe');
                return;
            }

            const job = jobDoc.data();
            const nuevoSaldo = job.saldoPendiente - monto;

            if (nuevoSaldo < 0) {
                alert('El monto excede el saldo pendiente');
                return;
            }

            const pagoObject = {
                fecha: new Date().toISOString().split('T')[0],
                monto: monto,
                tipo: tipo,
                metodo: metodo,
                referencia: referencia,
                usuario: currentUser.name,
                timestamp: new Date().toISOString()
            };

            await db.collection('trabajos').doc(currentJobIdForPayment).update({
                saldoPendiente: nuevoSaldo,
                pagos: firebase.firestore.FieldValue.arrayUnion(pagoObject),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            await db.collection('movimientos').add({
                fecha: new Date().toISOString().split('T')[0],
                tipo: 'PAGO',
                det: `Pago - ${job.cliente}: ${referencia || 'Sin referencia'}`,
                val: monto,
                trabajoId: currentJobIdForPayment,
                usuario: currentUser.name,
                ts: firebase.firestore.FieldValue.serverTimestamp()
            });

            if (nuevoSaldo === 0 && job.estado === ORDER_STATUS.COTIZADO) {
                await db.collection('trabajos').doc(currentJobIdForPayment).update({
                    estado: ORDER_STATUS.APROBADO
                });
            }

            document.getElementById('paymentAmount').value = '';
            document.getElementById('paymentReference').value = '';

            bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();

            await cargarTrabajosActivos();
            await cargarDashboard();

            alert('✅ Pago registrado correctamente');

        } catch (error) {
            alert('Error registrando pago: ' + error.message);
        }
    }

    async function cambiarEstadoTrabajo(jobId) {
        if (!currentUser || currentUser.role !== 'gerente') {
            alert('Solo el gerente puede cambiar estados de trabajo');
            return;
        }

        try {
            const doc = await db.collection('trabajos').doc(jobId).get();
            if (!doc.exists) {
                alert('El trabajo no existe');
                return;
            }

            const job = doc.data();
            const estados = ['cotizado', 'aprobado', 'en_produccion', 'en_laser', 'en_impresion', 'en_armado', 'listo', 'entregado'];
            const currentIndex = estados.indexOf(job.estado);
            
            if (currentIndex < estados.length - 1) {
                const nuevoEstado = estados[currentIndex + 1];
                
                await db.collection('trabajos').doc(jobId).update({
                    estado: nuevoEstado,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Si se marca como entregado, mover a historial
                if (nuevoEstado === 'entregado') {
                    alert('✅ Trabajo marcado como ENTREGADO y movido al historial');
                } else {
                    alert(`✅ Estado cambiado a: ${nuevoEstado.replace('_', ' ').toUpperCase()}`);
                }
                
                await cargarTrabajosActivos();
                if (nuevoEstado === 'entregado') {
                    await cargarHistorialCompleto();
                }
            } else {
                alert('El trabajo ya está en su estado final');
            }

        } catch (error) {
            alert('Error cambiando estado: ' + error.message);
        }
    }

    async function reservarMaterialesTrabajo(jobId) {
        if (!confirm('¿Desea reservar los materiales para este trabajo? Esto reducirá el stock disponible.')) {
            return;
        }

        try {
            const doc = await db.collection('trabajos').doc(jobId).get();
            if (!doc.exists) return;

            const job = doc.data();
            const materialesAReservar = [];

            // Recopilar todos los materiales de todos los items
            if (job.items) {
                job.items.forEach(item => {
                    if (item.materiales) {
                        item.materiales.forEach(material => {
                            materialesAReservar.push({
                                ...material,
                                cantidadTotal: material.cantidad * item.cantidad
                            });
                        });
                    }
                });
            }

            // Agrupar materiales por ID
            const materialesAgrupados = {};
            materialesAReservar.forEach(material => {
                if (!materialesAgrupados[material.id]) {
                    materialesAgrupados[material.id] = {
                        id: material.id,
                        nombre: material.nombre,
                        cantidadTotal: 0,
                        unidad: material.unidad
                    };
                }
                materialesAgrupados[material.id].cantidadTotal += material.cantidadTotal;
            });

            // Reservar cada material en inventario
            for (const materialId in materialesAgrupados) {
                const materialReserva = materialesAgrupados[materialId];
                
                // Obtener el material del inventario
                const invSnapshot = await db.collection('inventario').where('id', '==', materialId).get();
                if (!invSnapshot.empty) {
                    const invDoc = invSnapshot.docs[0];
                    const invData = invDoc.data();
                    
                    const disponible = (invData.stockActual || 0) - (invData.reservado || 0);
                    
                    if (disponible < materialReserva.cantidadTotal) {
                        alert(`No hay suficiente stock de ${materialReserva.nombre}. Disponible: ${disponible}, Necesario: ${materialReserva.cantidadTotal}`);
                        return;
                    }
                    
                    // Actualizar inventario
                    await db.collection('inventario').doc(invDoc.id).update({
                        reservado: (invData.reservado || 0) + materialReserva.cantidadTotal,
                        disponible: disponible - materialReserva.cantidadTotal,
                        ultimaActualizacion: new Date().toISOString().split('T')[0]
                    });
                }
            }

            // Marcar materiales como reservados en el trabajo
            await db.collection('trabajos').doc(jobId).update({
                materialesReservados: Object.values(materialesAgrupados),
                estado: 'en_produccion',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('✅ Materiales reservados correctamente. El trabajo ha pasado a "En Producción"');
            
            // Actualizar vistas
            await cargarTrabajosActivos();
            await cargarInventario();
            
            bootstrap.Modal.getInstance(document.getElementById('jobDetailModal')).hide();

        } catch (error) {
            alert('Error reservando materiales: ' + error.message);
        }
    }

    async function marcarComoEntregado(jobId) {
        if (!confirm('¿Marcar este trabajo como ENTREGADO? Esto liberará los materiales reservados.')) {
            return;
        }

        try {
            const doc = await db.collection('trabajos').doc(jobId).get();
            if (!doc.exists) return;

            const job = doc.data();

            // Liberar materiales reservados
            if (job.materialesReservados && job.materialesReservados.length > 0) {
                for (const material of job.materialesReservados) {
                    const invSnapshot = await db.collection('inventario').where('id', '==', material.id).get();
                    if (!invSnapshot.empty) {
                        const invDoc = invSnapshot.docs[0];
                        const invData = invDoc.data();
                        
                        // Reducir stock actual y liberar reservas
                        await db.collection('inventario').doc(invDoc.id).update({
                            stockActual: (invData.stockActual || 0) - material.cantidadTotal,
                            reservado: (invData.reservado || 0) - material.cantidadTotal,
                            disponible: (invData.disponible || 0),
                            ultimaActualizacion: new Date().toISOString().split('T')[0]
                        });
                    }
                }
            }

            // Marcar como entregado
            await db.collection('trabajos').doc(jobId).update({
                estado: 'entregado',
                fechaEntrega: new Date().toISOString().split('T')[0],
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('✅ Trabajo marcado como ENTREGADO. Materiales descontados del inventario.');
            
            // Actualizar vistas
            await cargarTrabajosActivos();
            await cargarHistorialCompleto();
            await cargarInventario();
            await cargarDashboard();
            
            bootstrap.Modal.getInstance(document.getElementById('jobDetailModal')).hide();

        } catch (error) {
            alert('Error marcando como entregado: ' + error.message);
        }
    }

    // ============================================
    // INVENTARIO
    // ============================================
    async function cargarInventarioData() {
        try {
            const snapshot = await db.collection('inventario').get();
            inventarioData = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                inventarioData.push({
                    id: doc.id,
                    ...data
                });
            });
        } catch (error) {
            console.error("Error cargando datos de inventario:", error);
        }
    }

    async function cargarInventario() {
        try {
            await cargarInventarioData();
            const tbody = document.getElementById('inventoryTable');
            tbody.innerHTML = '';
            
            if (inventarioData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9" class="text-center">No hay materiales en inventario</td></tr>';
                return;
            }
            
            inventarioData.forEach(item => {
                const disponible = (item.stockActual || 0) - (item.reservado || 0);
                const nivel = disponible <= item.stockMinimo ? 'danger' : 
                             disponible <= item.stockMinimo * 2 ? 'warning' : 'success';
                
                tbody.innerHTML += `
                    <tr>
                        <td><strong>${item.nombre}</strong></td>
                        <td><span class="badge bg-secondary">${item.unidad}</span></td>
                        <td>
                            <span class="badge ${item.stockActual > 0 ? 'bg-info' : 'bg-secondary'}">
                                ${item.stockActual || 0}
                            </span>
                        </td>
                        <td>${item.stockMinimo || 0}</td>
                        <td>
                            ${item.reservado > 0 ? `<span class="badge bg-warning">${item.reservado}</span>` : '0'}
                        </td>
                        <td>
                            <span class="badge bg-${nivel}">${disponible}</span>
                        </td>
                        <td>$${(item.costoUnitario || 0).toLocaleString('es-MX')}</td>
                        <td>${item.ultimaActualizacion || 'N/A'}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="editarMaterial('${item.id}')">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="eliminarMaterial('${item.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error("Error cargando inventario:", error);
        }
    }

    async function agregarMaterial() {
        const materialData = {
            nombre: document.getElementById('invName').value,
            unidad: document.getElementById('invUnit').value,
            stockActual: parseInt(document.getElementById('invStock').value) || 0,
            stockMinimo: parseInt(document.getElementById('invMinStock').value) || 0,
            costoUnitario: parseFloat(document.getElementById('invCosto').value) || 0,
            reservado: 0,
            disponible: parseInt(document.getElementById('invStock').value) || 0,
            ultimaActualizacion: new Date().toISOString().split('T')[0],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        if (!materialData.nombre) {
            alert('Por favor ingrese el nombre del material');
            return;
        }
        
        try {
            await db.collection('inventario').add(materialData);
            alert('✅ Material agregado correctamente');
            bootstrap.Modal.getInstance(document.getElementById('inventoryModal')).hide();
            await cargarInventario();
            
            document.getElementById('invName').value = '';
            document.getElementById('invStock').value = '10';
            document.getElementById('invMinStock').value = '2';
            document.getElementById('invCosto').value = '0.02';
        } catch (error) {
            alert('Error agregando material: ' + error.message);
        }
    }

    async function editarMaterial(materialId) {
        alert('Función de edición en desarrollo. Para editar, elimine y vuelva a crear el material.');
    }

    async function eliminarMaterial(materialId) {
        if (confirm('¿Está seguro de eliminar este material? Esta acción no se puede deshacer.')) {
            try {
                // Verificar si el material está reservado en algún trabajo
                const trabajosSnapshot = await db.collection('trabajos')
                    .where('materialesReservados', 'array-contains', {id: materialId})
                    .get();
                
                if (!trabajosSnapshot.empty) {
                    alert('No se puede eliminar este material porque está reservado en trabajos activos.');
                    return;
                }
                
                await db.collection('inventario').doc(materialId).delete();
                alert('✅ Material eliminado correctamente');
                await cargarInventario();
            } catch (error) {
                alert('Error eliminando material: ' + error.message);
            }
        }
    }

    // ============================================
    // CONFIGURACIÓN
    // ============================================
    async function cargarConfiguracionCompleta() {
        try {
            const doc = await db.collection('config').doc('maestra').get();
            if (doc.exists) {
                config = doc.data();
                console.log("✅ Configuración cargada:", config);
            } else {
                console.log("⚠️ No hay configuración, usando valores por defecto");
                config = {
                    mdf: 0.02,
                    acri: 0.05,
                    imp: 150,
                    lis: 15,
                    las: 2,
                    utl: 50,
                    empresa: 'H&J Diseños',
                    telefono: '+52 1 234 567 890',
                    direccion: 'Ciudad, Estado',
                    iva: 16
                };
            }
        } catch (error) {
            console.error("❌ Error cargando configuración:", error);
        }
    }

    async function cargarConfiguracion() {
        renderCostosConfiguracion();
    }

    function renderCostosConfiguracion() {
        const container = document.getElementById('costConfigForm');
        if (!container) return;
        
        html = `
            <div class="mb-3">
                <label class="form-label">Nombre de la Empresa</label>
                <input type="text" class="form-control" id="configEmpresa" value="${config.empresa || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" id="configTelefono" value="${config.telefono || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Dirección</label>
                <input type="text" class="form-control" id="configDireccion" value="${config.direccion || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Porcentaje de Utilidad (%)</label>
                <input type="number" class="form-control" id="configUtilidad" value="${config.utl || 50}">
            </div>
            <div class="mb-3">
                <label class="form-label">IVA (%)</label>
                <input type="number" class="form-control" id="configIVA" value="${config.iva || 16}">
            </div>
            <div class="mb-3">
                <label class="form-label">Costo Corte Láser ($/min)</label>
                <input type="number" class="form-control" id="configLaser" value="${config.las || 2}">
            </div>
            <div class="mb-3">
                <label class="form-label">Costo Impresión ($/m²)</label>
                <input type="number" class="form-control" id="configImpresion" value="${config.imp || 150}">
            </div>
        `;
        
        container.innerHTML = html;
    }

    async function guardarConfiguracion() {
        try {
            await db.collection('config').doc('maestra').update({
                empresa: document.getElementById('configEmpresa').value,
                telefono: document.getElementById('configTelefono').value,
                direccion: document.getElementById('configDireccion').value,
                utl: parseFloat(document.getElementById('configUtilidad').value) || 50,
                iva: parseFloat(document.getElementById('configIVA').value) || 16,
                las: parseFloat(document.getElementById('configLaser').value) || 2,
                imp: parseFloat(document.getElementById('configImpresion').value) || 150,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Actualizar configuración local
            await cargarConfiguracionCompleta();
            
            alert('✅ Configuración guardada correctamente');
            
        } catch (error) {
            alert('Error guardando configuración: ' + error.message);
        }
    }

    async function actualizarConfigNube() {
        await guardarConfiguracion();
    }

    // ============================================
    // REPORTES
    // ============================================
    async function cargarReportes() {
        try {
            // Implementación básica de reportes
            const hoy = new Date();
            const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
            
            const fechaInicio = inicioMes.toISOString().split('T')[0];
            const fechaFin = finMes.toISOString().split('T')[0];
            
            // Cargar ventas del mes
            const ventasSnapshot = await db.collection('movimientos')
                .where('tipo', '==', 'VENTA')
                .get();
            
            let totalVentas = 0;
            ventasSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.fecha >= fechaInicio && data.fecha <= fechaFin) {
                    totalVentas += data.val || 0;
                }
            });
            
            // Cargar gastos del mes
            const gastosSnapshot = await db.collection('movimientos')
                .where('tipo', '==', 'GASTO')
                .get();
            
            let totalGastos = 0;
            gastosSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.fecha >= fechaInicio && data.fecha <= fechaFin) {
                    totalGastos += data.val || 0;
                }
            });
            
            const utilidad = totalVentas - totalGastos;
            
            // Actualizar resumen financiero
            document.getElementById('financialSummary').innerHTML = `
                <div class="mb-3">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Ventas Totales:</span>
                        <strong class="text-success">$${totalVentas.toLocaleString('es-MX')}</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Gastos Totales:</span>
                        <strong class="text-danger">$${totalGastos.toLocaleString('es-MX')}</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Utilidad Neta:</span>
                        <strong class="text-primary">$${utilidad.toLocaleString('es-MX')}</strong>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>Margen de Utilidad:</span>
                        <strong class="${utilidad/totalVentas*100 > 30 ? 'text-success' : 'text-warning'}">
                            ${totalVentas > 0 ? ((utilidad/totalVentas*100).toFixed(1)) : '0'}%
                        </strong>
                    </div>
                </div>
            `;
            
            // Inicializar gráfico
            inicializarGraficoVentas();
            
        } catch (error) {
            console.error("Error cargando reportes:", error);
        }
    }

    function inicializarGraficoVentas() {
        const canvas = document.getElementById('ventasChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico existente
        if (window.ventasChartInstance) {
            window.ventasChartInstance.destroy();
        }
        
        // Datos de ejemplo (en producción, estos vendrían de la base de datos)
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const ventas = [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 29000, 35000, 38000, 40000];
        
        window.ventasChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Ventas Mensuales',
                    data: ventas,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Ventas: $${context.raw.toLocaleString('es-MX')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-MX');
                            }
                        }
                    }
                }
            }
        });
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initAuth();
        
        // Verificar si hay usuario recordado
        const savedUser = localStorage.getItem('hj_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            if (userData.remember && userData.username) {
                document.getElementById('loginUser').value = userData.username;
                document.getElementById('rememberLogin').checked = true;
            }
        }
        
        // Establecer fechas por defecto en modales
        const today = new Date().toISOString().split('T')[0];
        const oneWeekLater = new Date();
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        const dueDate = oneWeekLater.toISOString().split('T')[0];
        
        document.getElementById('jobStartDate').value = today;
        document.getElementById('jobDueDate').value = dueDate;
        
        // Actualizar estado de conexión
        setInterval(() => {
            const statusEl = document.getElementById('syncStatus');
            if (navigator.onLine) {
                statusEl.textContent = 'Conectado';
                statusEl.className = 'text-success';
            } else {
                statusEl.textContent = 'Sin conexión';
                statusEl.className = 'text-danger';
            }
        }, 5000);
    });
</script>
</body>
</html>
