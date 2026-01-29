<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ERP H&JDiseños - Sistema Gerencial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <style>
        :root { --admin: #1e293b; --vendor: #0284c7; --accent: #f59e0b; }
        body { background: #f1f5f9; font-family: 'Inter', sans-serif; }
        .sidebar { background: var(--admin); min-height: 100vh; color: white; position: fixed; width: 240px; }
        .main-content { margin-left: 240px; padding: 30px; }
        .view-section { display: none; }
        .view-section.active { display: block; }
        .card-custom { border: none; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .login-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: var(--admin); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .badge-gerente { background: #ef4444; }
        .badge-vendedor { background: #3b82f6; }
    </style>
</head>
<body>

<div id="loginPage" class="login-overlay">
    <div class="card p-4" style="width: 350px;">
        <h4 class="text-center fw-bold mb-4">H&J<span class="text-primary">D</span> Acceso</h4>
        <input type="text" id="logUser" class="form-control mb-2" placeholder="Usuario">
        <input type="password" id="logPass" class="form-control mb-3" placeholder="Contraseña">
        <button class="btn btn-primary w-100" onclick="intentarLogin()">Entrar al Sistema</button>
        <div id="loginError" class="text-danger small mt-2 text-center"></div>
    </div>
</div>

<nav class="sidebar p-3" id="mainSidebar" style="display:none;">
    <div class="text-center mb-4">
        <h4 class="fw-bold">H&JDiseños</h4>
        <span id="userBadge" class="badge rounded-pill"></span>
    </div>
    <hr>
    <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="#" onclick="showView('vVentas')"><i class="bi bi-cart4 me-2"></i> Nueva Venta</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" onclick="showView('vHistorial')"><i class="bi bi-list-check me-2"></i> Registro de Ventas</a></li>
        <div class="admin-only mt-3">
            <small class="text-muted text-uppercase fw-bold">Administración</small>
            <li class="nav-item"><a class="nav-link text-white" href="#" onclick="showView('vFinanzas')"><i class="bi bi-graph-up-arrow me-2"></i> Finanzas Global</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#" onclick="showView('vInventario')"><i class="bi bi-box-seam me-2"></i> Inventario</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#" onclick="showView('vProveedores')"><i class="bi bi-truck me-2"></i> Proveedores</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#" onclick="showView('vConfig')"><i class="bi bi-gear-fill me-2"></i> Configuración</a></li>
        </div>
    </ul>
    <button class="btn btn-outline-danger btn-sm mt-5 w-100" onclick="location.reload()">Cerrar Sesión</button>
</nav>

<div class="main-content">
    
    <section id="vVentas" class="view-section active">
        <h3 class="fw-bold mb-4 text-primary">Panel de Ventas</h3>
        <div class="row g-4">
            <div class="col-md-7">
                <div class="card card-custom p-4">
                    <h6>Datos del Cliente</h6>
                    <div class="row g-2 mb-3">
                        <div class="col-md-6"><input type="text" id="cNombre" class="form-control" placeholder="Nombre Cliente"></div>
                        <div class="col-md-6"><input type="text" id="cTel" class="form-control" placeholder="Teléfono/Contacto"></div>
                    </div>
                    <h6>Especificaciones del Producto</h6>
                    <div class="row g-2">
                        <div class="col-md-12 mb-2"><input type="text" id="pDesc" class="form-control" placeholder="Descripción (Ej: Cuadro Acrílico 40x50)"></div>
                        <div class="col-md-3"><input type="number" id="pAn" class="form-control" placeholder="Ancho" oninput="calcularVenta()"></div>
                        <div class="col-md-3"><input type="number" id="pLa" class="form-control" placeholder="Largo" oninput="calcularVenta()"></div>
                        <div class="col-md-3"><input type="number" id="pMi" class="form-control" placeholder="Min Láser" oninput="calcularVenta()"></div>
                        <div class="col-md-3"><input type="number" id="pEx" class="form-control" placeholder="Extras $" oninput="calcularVenta()"></div>
                    </div>
                    <div class="mt-3 p-3 bg-light rounded d-flex justify-content-between">
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kMdf" onchange="calcularVenta()"><label>MDF</label></div>
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kAc" onchange="calcularVenta()"><label>Acrílico</label></div>
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kIm" onchange="calcularVenta()"><label>Impresión</label></div>
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kLi" onchange="calcularVenta()"><label>Listones</label></div>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="card card-custom p-4 bg-primary text-white">
                    <h5>Resumen de Pago</h5>
                    <h1 id="resVenta" class="fw-bold">$ 0</h1>
                    <div class="mt-3">
                        <label class="small">Abono Inicial</label>
                        <input type="number" id="pAbono" class="form-control mb-2" oninput="calcularVenta()">
                        <label class="small">Saldo Pendiente</label>
                        <input type="text" id="pSaldo" class="form-control bg-light" readonly>
                        <label class="small mt-2">Fecha de Entrega</label>
                        <input type="date" id="pFechaE" class="form-control">
                    </div>
                    <button class="btn btn-warning w-100 mt-4 fw-bold" onclick="guardarVenta()">GENERAR FACTURA Y GUARDAR</button>
                </div>
            </div>
        </div>
    </section>

    <section id="vConfig" class="view-section">
        <h3 class="fw-bold mb-4">Configuración Gerencial</h3>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-custom p-4">
                    <h5>Gestión de Vendedores</h5>
                    <div class="input-group mb-2">
                        <input type="text" id="newU" class="form-control" placeholder="Usuario">
                        <input type="text" id="newP" class="form-control" placeholder="Clave">
                        <select id="newR" class="form-select"><option value="vendedor">Vendedor</option><option value="gerente">Gerente</option></select>
                        <button class="btn btn-primary" onclick="crearUsuario()">+</button>
                    </div>
                    <div id="listaUsuarios" class="mt-3"></div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-custom p-4">
                    <h5>Datos de Empresa (Factura)</h5>
                    <input type="text" id="cfgEmp" class="form-control mb-2" placeholder="Nombre Empresa">
                    <input type="text" id="cfgNit" class="form-control mb-2" placeholder="NIT / RUT">
                    <input type="text" id="cfgTel" class="form-control mb-2" placeholder="Teléfono">
                    <button class="btn btn-dark w-100" onclick="guardarEmpresa()">Actualizar Datos</button>
                </div>
            </div>
        </div>
    </section>

    </div>

<script>
    // CONFIGURACIÓN FIREBASE
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

    let currentUser = null;
    let configCostos = {};

    // --- SEGURIDAD Y LOGIN ---
    async function intentarLogin() {
        const u = document.getElementById('logUser').value;
        const p = document.getElementById('logPass').value;
        
        const snapshot = await db.collection("usuarios").where("user", "==", u).where("pass", "==", p).get();
        if(!snapshot.empty) {
            currentUser = snapshot.docs[0].data();
            entrarAlSistema();
        } else {
            document.getElementById('loginError').innerText = "Usuario o clave incorrecta";
        }
    }

    function entrarAlSistema() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainSidebar').style.display = 'block';
        document.getElementById('userBadge').innerText = currentUser.rol.toUpperCase();
        document.getElementById('userBadge').className = `badge rounded-pill badge-${currentUser.rol}`;
        
        if(currentUser.rol === 'vendedor') {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        }
        cargarConfigMaestra();
    }

    // --- NAVEGACIÓN ---
    function showView(viewId) {
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    }

    // --- LÓGICA DE NEGOCIO ---
    async function cargarConfigMaestra() {
        const doc = await db.collection("config").doc("maestra").get();
        configCostos = doc.data();
    }

    function calcularVenta() {
        const an = parseFloat(document.getElementById('pAn').value) || 0;
        const la = parseFloat(document.getElementById('pLa').value) || 0;
        const mi = parseFloat(document.getElementById('pMi').value) || 0;
        const ex = parseFloat(document.getElementById('pEx').value) || 0;
        const abono = parseFloat(document.getElementById('pAbono').value) || 0;

        let total = 0;
        const area = an * la;

        if(document.getElementById('kMdf').checked) total += area * configCostos.mdf;
        if(document.getElementById('kAc').checked) total += area * configCostos.acri;
        if(document.getElementById('kIm').checked) total += (area/10000) * configCostos.imp;
        if(document.getElementById('kLi').checked) total += (((an*2)+(la*2))/100) * configCostos.lis;
        
        total += (mi * configCostos.las) + ex;
        const final = Math.ceil(total * (1 + (configCostos.utl/100)));
        
        document.getElementById('resVenta').innerText = "$ " + final.toLocaleString();
        document.getElementById('pSaldo').value = (final - abono).toLocaleString();
        return final;
    }

    async function guardarVenta() {
        const total = calcularVenta();
        const venta = {
            cliente: document.getElementById('cNombre').value,
            tel: document.getElementById('cTel').value,
            producto: document.getElementById('pDesc').value,
            total: total,
            abono: parseFloat(document.getElementById('pAbono').value) || 0,
            saldo: total - (parseFloat(document.getElementById('pAbono').value) || 0),
            entrega: document.getElementById('pFechaE').value,
            vendedor: currentUser.user,
            fecha: new Date().toLocaleDateString(),
            ts: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection("ventas").add(venta);
        generarFacturaPDF(venta);
        alert("Venta guardada y Sincronizada");
    }

    function generarFacturaPDF(v) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(22); doc.text("H&J DISEÑOS", 105, 20, {align: 'center'});
        doc.setFontSize(10); doc.text("FACTURA DE VENTA", 105, 28, {align: 'center'});
        
        doc.text(`Cliente: ${v.cliente}`, 20, 50);
        doc.text(`Vendedor: ${v.vendedor}`, 150, 50);
        doc.text(`Fecha Entrega: ${v.entrega}`, 20, 57);
        
        doc.autoTable({
            startY: 70,
            head: [['Descripción', 'Total']],
            body: [[v.producto, `$${v.total.toLocaleString()}`]],
            theme: 'grid'
        });

        doc.text(`TOTAL: $${v.total.toLocaleString()}`, 150, doc.autoTable.previous.finalY + 10);
        doc.text(`ABONO: $${v.abono.toLocaleString()}`, 150, doc.autoTable.previous.finalY + 17);
        doc.setFontSize(14);
        doc.text(`SALDO PENDIENTE: $${v.saldo.toLocaleString()}`, 150, doc.autoTable.previous.finalY + 27);
        
        doc.save(`Factura_${v.cliente}.pdf`);
    }

    // Gestión Usuarios Gerente
    async function crearUsuario() {
        const u = document.getElementById('newU').value;
        const p = document.getElementById('newP').value;
        const r = document.getElementById('newR').value;
        await db.collection("usuarios").add({user: u, pass: p, rol: r});
        alert("Usuario Creado");
    }
</script>
</body>
</html>
