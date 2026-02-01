<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H&JDiseños - ERP Industrial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        :root { --dark: #0f172a; --primary: #2563eb; --accent: #f59e0b; --bg: #f1f5f9; }
        body { background-color: var(--bg); font-family: 'Inter', sans-serif; }
        .sidebar { background: var(--dark); min-height: 100vh; transition: 0.3s; }
        .card { border: none; border-radius: 12px; transition: transform 0.2s; }
        .role-badge { font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; }
        .hidden-module { display: none !important; }
        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
        #canvas-comprobante { display: none; } /* Canvas oculto para renderizado */
    </style>
</head>
<body>

<div id="loginArea" class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-4 card p-4 shadow-lg text-center">
            <h2 class="fw-bold mb-4">H&J<span class="text-primary">D</span></h2>
            <input type="email" id="logEmail" class="form-control mb-2" placeholder="Email">
            <input type="password" id="logPass" class="form-control mb-3" placeholder="Contraseña">
            <button class="btn btn-primary w-100 fw-bold" onclick="login()">INGRESAR</button>
        </div>
    </div>
</div>

<div id="mainApp" class="container-fluid d-none">
    <div class="row">
        <nav class="col-md-3 col-lg-2 sidebar p-4 d-flex flex-column shadow">
            <h3 class="fw-bold text-white mb-4">H&JD <span id="userRole" class="badge bg-primary role-badge">Cargando...</span></h3>
            <ul class="nav flex-column mb-auto">
                <li class="nav-item mb-2"><a class="nav-link text-white active" href="#" onclick="showSection('dash')"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a></li>
                <li class="nav-item mb-2 module-vendedor"><a class="nav-link text-white" href="#" onclick="showSection('cotizador')"><i class="bi bi-calculator me-2"></i> Cotizador</a></li>
                <li class="nav-item mb-2"><a class="nav-link text-white" href="#" onclick="showSection('trabajos')"><i class="bi bi-briefcase me-2"></i> Trabajos / Producción</a></li>
                <li class="nav-item mb-2 module-gerente"><a class="nav-link text-white" href="#" onclick="showSection('config')"><i class="bi bi-sliders me-2"></i> Configuración</a></li>
            </ul>
            <button class="btn btn-outline-danger btn-sm mt-3" onclick="logout()">Cerrar Sesión</button>
        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-5 py-4">
            
            <div id="sec-dash" class="row g-3 mb-4 section-view">
                <div class="col-md-3 module-gerente">
                    <div class="card p-3 border-start border-primary border-5">
                        <small class="text-muted fw-bold">UTILIDAD TOTAL</small>
                        <div id="dashUtil" class="h4 fw-bold text-primary">$ 0</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card p-3 border-start border-success border-5">
                        <small class="text-muted fw-bold">RECAUDO MES</small>
                        <div id="dashVentas" class="h4 fw-bold text-success">$ 0</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card p-3 border-start border-warning border-5">
                        <small class="text-muted fw-bold">PENDIENTE COBRO</small>
                        <div id="dashPendiente" class="h4 fw-bold text-warning">$ 0</div>
                    </div>
                </div>
            </div>

            <div id="sec-cotizador" class="section-view d-none">
                <div class="card p-4 shadow-sm mb-4">
                    <h5 class="fw-bold mb-3">Nuevo Trabajo / Cotización</h5>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label">Cliente</label>
                            <input type="text" id="vCli" class="form-control" placeholder="Nombre y Teléfono">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Producto</label>
                            <input type="text" id="vProd" class="form-control">
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Ancho (cm)</label>
                            <input type="number" id="vAn" class="form-control" oninput="calcular()">
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Largo (cm)</label>
                            <input type="number" id="vLa" class="form-control" oninput="calcular()">
                        </div>

                        <div class="col-12 d-flex flex-wrap gap-3 py-2 border-bottom" id="containerCheckboxes">
                            </div>

                        <div class="col-md-4">
                            <label class="form-label">Abono Inicial</label>
                            <input type="number" id="vAbono" class="form-control border-success" placeholder="$ 0">
                        </div>
                        
                        <div class="col-md-8 text-end">
                            <small class="d-block text-muted">PRECIO VENTA</small>
                            <h2 id="resV" class="fw-bold text-primary mb-0">$ 0</h2>
                            <small id="resC" class="text-muted module-gerente">Costo: $ 0</small>
                        </div>

                        <div class="col-12 mt-3">
                            <button class="btn btn-primary btn-lg w-100" onclick="registrarTrabajo()">CREAR TRABAJO Y REGISTRAR ABONO</button>
                        </div>
                    </div>
                </div>
            </div>

            
            <div id="sec-trabajos" class="section-view d-none">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-bold"><i class="bi bi-gear-wide-connected"></i> Panel de Producción</h5>
                        <input type="text" class="form-control w-25" placeholder="Buscar trabajo..." id="busquedaTrabajo">
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light small">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cliente / Producto</th>
                                    <th>Estado</th>
                                    <th>Saldo</th>
                                    <th>Vendedor</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="listaTrabajos" class="small"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="sec-config" class="section-view d-none module-gerente">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card p-4">
                            <h6 class="fw-bold border-bottom pb-2">COSTOS Y ACTIVACIÓN</h6>
                            <div id="configItemsContainer"></div>
                            <button class="btn btn-dark w-100 mt-3" onclick="guardarAjustes()">Sincronizar Parámetros</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-4">
                            <h6 class="fw-bold border-bottom pb-2">INVENTARIO COMPARTIDO</h6>
                            <div id="inventarioContainer"></div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>
</div>

<div id="comprobanteContainer" style="width: 400px; padding: 20px; background: white; border: 1px solid #eee; position: fixed; left: -1000px;">
    <h4 class="fw-bold text-center">H&J DISEÑOS</h4>
    <hr>
    <p id="compCliente"></p>
    <p id="compDetalle"></p>
    <div style="background: #f8fafc; padding: 10px;">
        <h5 id="compTotal"></h5>
        <h6 id="compAbonado" class="text-success"></h6>
        <h6 id="compSaldo" class="text-danger"></h6>
    </div>
    <p class="text-center mt-3 small text-muted">¡Gracias por su confianza!</p>
</div>

<script>
    // --- CONFIGURACIÓN Y ESTADO ---
    const firebaseConfig = { /* Usa tus credenciales actuales aquí */ };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    let currentUser = null;
    let userRole = 'vendedor'; 
    let globalConfig = {};
    let cacheCalculo = { costo: 0, venta: 0 };

    // --- AUTENTICACIÓN ---
    function login() {
        const email = document.getElementById('logEmail').value;
        const pass = document.getElementById('logPass').value;
        auth.signInWithEmailAndPassword(email, pass).catch(e => alert(e.message));
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            db.collection("usuarios").doc(user.uid).get().then(doc => {
                userRole = doc.data()?.role || 'vendedor';
                initApp();
            });
        } else {
            document.getElementById('loginArea').classList.remove('d-none');
            document.getElementById('mainApp').classList.add('d-none');
        }
    });

    function initApp() {
        document.getElementById('loginArea').classList.add('d-none');
        document.getElementById('mainApp').classList.remove('d-none');
        document.getElementById('userRole').innerText = userRole.toUpperCase();
        
        // Aplicar restricciones visuales por rol
        if(userRole !== 'gerente') {
            document.querySelectorAll('.module-gerente').forEach(el => el.classList.add('hidden-module'));
        }
        if(userRole === 'produccion') {
            document.querySelectorAll('.module-vendedor').forEach(el => el.classList.add('hidden-module'));
        }

        escucharConfig();
        escucharTrabajos();
    }

    // --- CORE DE NEGOCIO: CONFIGURACIÓN DINÁMICA ---
    function escucharConfig() {
        db.collection("config").doc("maestra").onSnapshot(doc => {
            globalConfig = doc.data();
            renderizarChecks();
            renderizarAjustes();
        });
    }

    function renderizarChecks() {
        const container = document.getElementById('containerCheckboxes');
        let html = '';
        // El objeto items en Firestore: { mdf: { activo: true, costo: 0.05, nombre: "MDF" }, ... }
        Object.keys(globalConfig.items).forEach(key => {
            const item = globalConfig.items[key];
            if(item.activo) {
                html += `
                    <div class="form-check">
                        <input class="form-check-input item-check" type="checkbox" id="c_${key}" data-key="${key}" onchange="calcular()">
                        <label class="form-check-label fw-bold small">${item.nombre}</label>
                    </div>`;
            }
        });
        container.innerHTML = html;
    }

    // --- CÁLCULO Y GESTIÓN DE TRABAJOS ---
    function calcular() {
        const an = parseFloat(document.getElementById('vAn').value) || 0;
        const la = parseFloat(document.getElementById('vLa').value) || 0;
        const area = an * la;
        
        let costoTotal = 0;
        document.querySelectorAll('.item-check:checked').forEach(check => {
            const key = check.dataset.key;
            costoTotal += area * globalConfig.items[key].costo;
        });

        const precioVenta = costoTotal * (1 + (globalConfig.utilidadGlobal / 100));
        cacheCalculo = { costo: costoTotal, venta: Math.ceil(precioVenta) };
        
        document.getElementById('resV').innerText = `$ ${cacheCalculo.venta.toLocaleString()}`;
        document.getElementById('resC').innerText = `Costo: $ ${Math.ceil(costoTotal).toLocaleString()}`;
    }

    async function registrarTrabajo() {
        const abono = parseFloat(document.getElementById('vAbono').value) || 0;
        const trabajo = {
            cliente: document.getElementById('vCli').value,
            producto: document.getElementById('vProd').value,
            total: cacheCalculo.venta,
            abonado: abono,
            saldo: cacheCalculo.venta - abono,
            estado: 'aprobado',
            vendedorId: currentUser.uid,
            vendedorNombre: currentUser.email,
            fechaIngreso: firebase.firestore.FieldValue.serverTimestamp(),
            fechaPrometida: "", // Se puede añadir un input date
            items: [] // Guardar qué materiales usó para el inventario
        };

        const docRef = await db.collection("trabajos").add(trabajo);
        
        // Registrar el primer abono en trazabilidad
        if(abono > 0) {
            await db.collection("pagos").add({
                trabajoId: docRef.id,
                monto: abono,
                fecha: new Date(),
                tipo: 'abono_inicial'
            });
        }
        alert("Trabajo registrado con éxito");
        generarComprobanteImagen(trabajo);
    }

    // --- PANEL DE CONTROL ---
    function escucharTrabajos() {
        let query = db.collection("trabajos").orderBy("fechaIngreso", "desc");
        
        // Filtro de seguridad: Vendedores solo ven lo suyo
        if(userRole === 'vendedor') {
            query = query.where("vendedorId", "==", currentUser.uid);
        }

        query.onSnapshot(snap => {
            const lista = document.getElementById('listaTrabajos');
            lista.innerHTML = "";
            snap.forEach(doc => {
                const t = doc.data();
                lista.innerHTML += `
                    <tr>
                        <td>${t.fechaIngreso?.toDate().toLocaleDateString() || ''}</td>
                        <td><strong>${t.cliente}</strong><br>${t.producto}</td>
                        <td><span class="status-pill bg-info text-dark">${t.estado}</span></td>
                        <td class="fw-bold ${t.saldo > 0 ? 'text-danger' : 'text-success'}">$${t.saldo.toLocaleString()}</td>
                        <td>${t.vendedorNombre.split('@')[0]}</td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-primary" onclick="cambiarEstado('${doc.id}', 'en_produccion')">🚀</button>
                                <button class="btn btn-outline-success" onclick="registrarPago('${doc.id}', ${t.saldo})">💰</button>
                                <button class="btn btn-outline-secondary" onclick="compartirWhatsApp('${doc.id}')"><i class="bi bi-whatsapp"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        });
    }

    // --- UTILIDADES DE IMAGEN (HTML2CANVAS) ---
    function generarComprobanteImagen(datos) {
        document.getElementById('compCliente').innerText = "Cliente: " + datos.cliente;
        document.getElementById('compDetalle').innerText = "Detalle: " + datos.producto;
        document.getElementById('compTotal').innerText = "TOTAL: $" + datos.total.toLocaleString();
        document.getElementById('compAbonado').innerText = "ABONADO: $" + datos.abonado.toLocaleString();
        document.getElementById('compSaldo').innerText = "SALDO: $" + datos.saldo.toLocaleString();

        html2canvas(document.getElementById('comprobanteContainer')).then(canvas => {
            // Aquí puedes abrir el canvas en un modal o descargarlo
            // Para WhatsApp móvil, lo ideal es convertir a Blob y usar Web Share API
            console.log("Comprobante listo");
        });
    }

    // --- NAVEGACIÓN ---
    function showSection(id) {
        document.querySelectorAll('.section-view').forEach(s => s.classList.add('d-none'));
        document.getElementById('sec-' + id).classList.remove('d-none');
    }

    function logout() { auth.signOut(); location.reload(); }
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
