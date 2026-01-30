<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H&JDiseños - ERP Profesional Cloud</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>

    <style>
        :root { --admin: #0f172a; --primary: #2563eb; --accent: #f59e0b; --bg: #f1f5f9; }
        body { background: var(--bg); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        
        /* Login */
        .login-overlay { position: fixed; inset: 0; background: var(--admin); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        
        /* Layout */
        .sidebar { background: var(--admin); min-height: 100vh; color: white; position: fixed; width: 250px; transition: 0.3s; z-index: 1000; }
        .main-content { margin-left: 250px; padding: 30px; transition: 0.3s; }
        
        /* UI Components */
        .view-section { display: none; animation: fadeIn 0.4s; }
        .view-section.active { display: block; }
        .card-custom { border: none; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); background: white; margin-bottom: 20px; }
        .nav-link { color: #94a3b8; padding: 12px 20px; border-radius: 10px; margin: 5px 15px; }
        .nav-link:hover, .nav-link.active { background: var(--primary); color: white; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
            .sidebar { width: 0; overflow: hidden; }
            .main-content { margin-left: 0; }
            .sidebar.mobile-open { width: 250px; }
        }
    </style>
</head>
<body>

<div id="loginPage" class="login-overlay">
    <div class="card p-4 shadow-lg" style="width: 380px; border-radius: 20px;">
        <div class="text-center mb-4">
            <h2 class="fw-bold">H&J <span class="text-primary">DISEÑOS</span></h2>
            <p class="text-muted small">Control de Fábrica & Ventas</p>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold">Usuario</label>
            <input type="text" id="logUser" class="form-control" placeholder="Ej: admin">
        </div>
        <div class="mb-4">
            <label class="form-label small fw-bold">Contraseña</label>
            <input type="password" id="logPass" class="form-control" placeholder="••••••••">
        </div>
        <button class="btn btn-primary w-100 py-2 fw-bold" onclick="intentarLogin()">INGRESAR AL SISTEMA</button>
        <div id="loginError" class="text-danger small mt-3 text-center"></div>
    </div>
</div>

<nav class="sidebar" id="mainSidebar" style="display:none;">
    <div class="p-4 text-center">
        <h4 class="fw-bold mb-0">H&JDiseños</h4>
        <div id="roleBadge" class="badge bg-primary mt-2">Cargando...</div>
    </div>
    <div class="mt-3">
        <a href="#" class="nav-link active" onclick="showView('vVentas', this)"><i class="bi bi-cart-plus me-2"></i> Nueva Venta</a>
        <a href="#" class="nav-link" onclick="showView('vRegistro', this)"><i class="bi bi-journal-text me-2"></i> Registro Ventas</a>
        
        <div class="admin-only px-4 mt-4 mb-2"><small class="text-muted fw-bold">GERENCIA</small></div>
        <a href="#" class="nav-link admin-only" onclick="showView('vInventario', this)"><i class="bi bi-box-seam me-2"></i> Inventario</a>
        <a href="#" class="nav-link admin-only" onclick="showView('vProveedores', this)"><i class="bi bi-truck me-2"></i> Proveedores</a>
        <a href="#" class="nav-link admin-only" onclick="showView('vConfig', this)"><i class="bi bi-sliders me-2"></i> Configuración</a>
    </div>
    <div class="position-absolute bottom-0 w-100 p-4">
        <button class="btn btn-outline-danger w-100 btn-sm" onclick="location.reload()">Cerrar Sesión</button>
    </div>
</nav>

<div class="main-content" id="appContent" style="display:none;">
    
    <section id="vVentas" class="view-section active">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold">Generar Cotización</h3>
            <div class="text-end"><small class="text-muted">Vendedor:</small> <span id="vendedorActivo" class="fw-bold"></span></div>
        </div>
        
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card card-custom p-4">
                    <h6 class="fw-bold border-bottom pb-2 mb-3">1. Datos del Cliente</h6>
                    <div class="row g-3">
                        <div class="col-md-6"><input type="text" id="cNom" class="form-control" placeholder="Nombre completo"></div>
                        <div class="col-md-6"><input type="text" id="cTel" class="form-control" placeholder="WhatsApp / Celular"></div>
                    </div>
                    
                    <h6 class="fw-bold border-bottom pb-2 mb-3 mt-4">2. Detalle del Trabajo</h6>
                    <div class="row g-3">
                        <div class="col-12"><input type="text" id="pDet" class="form-control" placeholder="¿Qué se va a fabricar?"></div>
                        <div class="col-md-3"><label class="small fw-bold">Ancho (cm)</label><input type="number" id="pAn" class="form-control" oninput="calcularVenta()"></div>
                        <div class="col-md-3"><label class="small fw-bold">Largo (cm)</label><input type="number" id="pLa" class="form-control" oninput="calcularVenta()"></div>
                        <div class="col-md-3"><label class="small fw-bold">Láser (min)</label><input type="number" id="pMi" class="form-control" oninput="calcularVenta()"></div>
                        <div class="col-md-3"><label class="small fw-bold">Otros $</label><input type="number" id="pEx" class="form-control" oninput="calcularVenta()"></div>
                    </div>

                    <div class="bg-light p-3 rounded-3 mt-3 d-flex justify-content-around">
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kMdf" onchange="calcularVenta()"><label>MDF</label></div>
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kAcri" onchange="calcularVenta()"><label>Acrílico</label></div>
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kImp" onchange="calcularVenta()"><label>Impresión</label></div>
                        <div class="form-check"><input class="form-check-input" type="checkbox" id="kLis" onchange="calcularVenta()"><label>Listones</label></div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card card-custom p-4 bg-primary text-white shadow">
                    <h5 class="fw-bold">Total a Cobrar</h5>
                    <h1 id="resVenta" class="fw-bold mb-4">$ 0</h1>
                    
                    <div class="mb-3">
                        <label class="small">Abono Inicial</label>
                        <input type="number" id="pAbo" class="form-control form-control-lg" oninput="calcularVenta()">
                    </div>
                    <div class="mb-3">
                        <label class="small">Saldo Pendiente</label>
                        <input type="text" id="pSal" class="form-control bg-light fw-bold" readonly>
                    </div>
                    <div class="mb-4">
                        <label class="small">Fecha de Entrega</label>
                        <input type="date" id="pFecE" class="form-control">
                    </div>
                    <button class="btn btn-warning w-100 py-3 fw-bold shadow" onclick="registrarVentaFinal()">GUARDAR Y FACTURAR</button>
                </div>
            </div>
        </div>
    </section>

    <section id="vInventario" class="view-section">
        <h3 class="fw-bold mb-4">Gestión de Stock</h3>
        <div class="card card-custom p-4">
            <div class="row g-3">
                <div class="col-md-3"><input type="text" id="invRef" class="form-control" placeholder="Referencia"></div>
                <div class="col-md-4"><input type="text" id="invNom" class="form-control" placeholder="Nombre Producto"></div>
                <div class="col-md-2"><input type="number" id="invCan" class="form-control" placeholder="Cantidad"></div>
                <div class="col-md-3"><button class="btn btn-primary w-100" onclick="guardarInventario()">Añadir Item</button></div>
            </div>
        </div>
        <div class="card card-custom p-0 overflow-hidden">
            <table class="table table-hover mb-0">
                <thead class="table-dark"><tr><th>Ref</th><th>Producto</th><th>Stock</th><th>Acción</th></tr></thead>
                <tbody id="tablaInv"></tbody>
            </table>
        </div>
    </section>

    <section id="vProveedores" class="view-section">
        <h3 class="fw-bold mb-4">Mis Proveedores</h3>
        <div class="card card-custom p-4 mb-4">
            <div class="row g-3">
                <div class="col-md-4"><input type="text" id="prNom" class="form-control" placeholder="Nombre"></div>
                <div class="col-md-4"><input type="text" id="prIte" class="form-control" placeholder="Insumo"></div>
                <div class="col-md-3"><input type="text" id="prTel" class="form-control" placeholder="Celular"></div>
                <div class="col-md-1"><button class="btn btn-primary w-100" onclick="guardarProv()">+</button></div>
            </div>
        </div>
        <div id="gridProv" class="row"></div>
    </section>

    <section id="vConfig" class="view-section">
        <h3 class="fw-bold mb-4">Ajustes del Sistema</h3>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-custom p-4">
                    <h5 class="fw-bold border-bottom pb-2 mb-3">Costos de Producción</h5>
                    <div id="listaCostos"></div>
                    <button class="btn btn-dark w-100 mt-3" onclick="actualizarPreciosMaestros()">ACTUALIZAR PRECIOS NUBE</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-custom p-4">
                    <h5 class="fw-bold border-bottom pb-2 mb-3">Vendedores / Usuarios</h5>
                    <div class="input-group mb-2">
                        <input type="text" id="nuU" class="form-control" placeholder="User">
                        <input type="text" id="nuP" class="form-control" placeholder="Pass">
                        <select id="nuR" class="form-select"><option value="vendedor">Vendedor</option><option value="gerente">Gerente</option></select>
                        <button class="btn btn-primary" onclick="crearUser()">+</button>
                    </div>
                    <div id="listaUsers" class="mt-3"></div>
                </div>
            </div>
        </div>
    </section>

    <section id="vRegistro" class="view-section">
        <h3 class="fw-bold mb-4">Historial de Ventas</h3>
        <div class="card card-custom p-0 overflow-hidden">
            <table class="table table-hover mb-0 small">
                <thead class="table-light"><tr><th>Fecha</th><th>Cliente</th><th>Producto</th><th>Total</th><th>Abono</th><th>Saldo</th><th>Vendedor</th></tr></thead>
                <tbody id="tablaReg"></tbody>
            </table>
        </div>
    </section>

</div>

<script>
    // --- 1. CONFIGURACIÓN FIREBASE ---
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
    let maestro = null;
    let cacheVentaTotal = 0;

    // --- 2. LOGIN Y ACCESO ---
    async function intentarLogin() {
        const u = document.getElementById('logUser').value;
        const p = document.getElementById('logPass').value;
        
        try {
            const snap = await db.collection("usuarios").where("user", "==", u).where("pass", "==", p).get();
            if(!snap.empty) {
                currentUser = snap.docs[0].data();
                arrancarApp();
            } else {
                document.getElementById('loginError').innerText = "Credenciales incorrectas";
            }
        } catch(e) { console.error(e); }
    }

    function arrancarApp() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainSidebar').style.display = 'block';
        document.getElementById('appContent').style.display = 'block';
        
        document.getElementById('roleBadge').innerText = currentUser.rol.toUpperCase();
        document.getElementById('vendedorActivo').innerText = currentUser.user;

        if(currentUser.rol !== 'gerente') {
            document.querySelectorAll('.admin-only').forEach(e => e.remove());
        }

        // Cargar datos en tiempo real
        escucharConfig();
        escucharVentas();
        if(currentUser.rol === 'gerente') {
            escucharInv();
            escucharProv();
            escucharUsers();
        }
    }

    // --- 3. NAVEGACIÓN ---
    function showView(viewId, btn) {
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        btn.classList.add('active');
    }

    // --- 4. CÁLCULOS COTIZADOR ---
    function escucharConfig() {
        db.collection("config").doc("maestra").onSnapshot((doc) => {
            if(doc.exists) {
                maestro = doc.data();
                document.getElementById('listaCostos').innerHTML = `
                    <label class="small fw-bold">MDF cm²</label><input id="fMdf" class="form-control mb-2" value="${maestro.mdf}">
                    <label class="small fw-bold">Acrílico cm²</label><input id="fAcr" class="form-control mb-2" value="${maestro.acri}">
                    <label class="small fw-bold">Impresión m²</label><input id="fImp" class="form-control mb-2" value="${maestro.imp}">
                    <label class="small fw-bold">Listón m</label><input id="fLis" class="form-control mb-2" value="${maestro.lis}">
                    <label class="small fw-bold">Láser Min</label><input id="fLas" class="form-control mb-2" value="${maestro.las}">
                    <label class="small fw-bold text-primary">Utilidad %</label><input id="fUtl" class="form-control mb-2" value="${maestro.utl}">
                `;
            }
        });
    }

    function calcularVenta() {
        if(!maestro) return;
        const an = parseFloat(document.getElementById('pAn').value) || 0;
        const la = parseFloat(document.getElementById('pLa').value) || 0;
        const mi = parseFloat(document.getElementById('pMi').value) || 0;
        const ex = parseFloat(document.getElementById('pEx').value) || 0;
        const abo = parseFloat(document.getElementById('pAbo').value) || 0;

        let costo = 0;
        const area = an * la;

        if(document.getElementById('kMdf').checked) costo += area * maestro.mdf;
        if(document.getElementById('kAcri').checked) costo += area * maestro.acri;
        if(document.getElementById('kImp').checked) costo += (area/10000) * maestro.imp;
        if(document.getElementById('kLis').checked) costo += (((an*2)+(la*2))/100) * maestro.lis;

        costo += (mi * maestro.las) + ex;
        const total = Math.ceil(costo * (1 + (maestro.utl / 100)));
        
        cacheVentaTotal = total;
        document.getElementById('resVenta').innerText = "$ " + total.toLocaleString();
        document.getElementById('pSal').value = (total - abo).toLocaleString();
    }

    // --- 5. REGISTRO Y FIREBASE ---
    async function registrarVentaFinal() {
        if(cacheVentaTotal <= 0) return alert("Costo inválido");
        const v = {
            cliente: document.getElementById('cNom').value,
            tel: document.getElementById('cTel').value,
            producto: document.getElementById('pDet').value,
            total: cacheVentaTotal,
            abono: parseFloat(document.getElementById('pAbo').value) || 0,
            saldo: cacheVentaTotal - (parseFloat(document.getElementById('pAbo').value) || 0),
            entrega: document.getElementById('pFecE').value,
            vendedor: currentUser.user,
            fecha: new Date().toLocaleDateString(),
            ts: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection("ventas").add(v);
        generarPDF(v);
        alert("¡Venta Sincronizada!");
        location.reload(); 
    }

    async function actualizarPreciosMaestros() {
        const d = {
            mdf: parseFloat(document.getElementById('fMdf').value),
            acri: parseFloat(document.getElementById('fAcr').value),
            imp: parseFloat(document.getElementById('fImp').value),
            lis: parseFloat(document.getElementById('fLis').value),
            las: parseFloat(document.getElementById('fLas').value),
            utl: parseFloat(document.getElementById('fUtl').value)
        };
        await db.collection("config").doc("maestra").set(d);
        alert("Precios actualizados en la nube");
    }

    // --- 6. ESCUCHADORES TABLAS ---
    function escucharInv() {
        db.collection("inventario").onSnapshot(snap => {
            let h = "";
            snap.forEach(d => {
                const i = d.data();
                h += `<tr><td>${i.referencia}</td><td>${i.nombre}</td><td>${i.stock}</td><td><button class="btn btn-sm text-danger" onclick="eliminar('inventario','${d.id}')">Eliminar</button></td></tr>`;
            });
            document.getElementById('tablaInv').innerHTML = h;
        });
    }

    function escucharVentas() {
        db.collection("ventas").orderBy("ts", "desc").onSnapshot(snap => {
            let h = "";
            snap.forEach(d => {
                const v = d.data();
                h += `<tr><td>${v.fecha}</td><td>${v.cliente}</td><td>${v.producto}</td><td>$${v.total.toLocaleString()}</td><td>$${v.abono.toLocaleString()}</td><td class="text-danger fw-bold">$${v.saldo.toLocaleString()}</td><td>${v.vendedor}</td></tr>`;
            });
            document.getElementById('tablaReg').innerHTML = h;
        });
    }

    function escucharProv() {
        db.collection("proveedores").onSnapshot(snap => {
            let h = "";
            snap.forEach(d => {
                const p = d.data();
                h += `<div class="col-md-4"><div class="card p-3 shadow-sm border-0 mb-3"><b>${p.nombre}</b><small>${p.item}</small><span class="text-success mt-2">${p.tel}</span></div></div>`;
            });
            document.getElementById('gridProv').innerHTML = h;
        });
    }

    function escucharUsers() {
        db.collection("usuarios").onSnapshot(snap => {
            let h = "";
            snap.forEach(d => {
                const u = d.data();
                h += `<div class="d-flex justify-content-between small border-bottom py-1"><span>${u.user} (${u.rol})</span><a href="#" onclick="eliminar('usuarios','${d.id}')" class="text-danger">x</a></div>`;
            });
            document.getElementById('listaUsers').innerHTML = h;
        });
    }

    // --- 7. ACCIONES ---
    async function guardarInventario() {
        await db.collection("inventario").add({ referencia: document.getElementById('invRef').value, nombre: document.getElementById('invNom').value, stock: parseInt(document.getElementById('invCan').value) || 0 });
        alert("Inventario ok");
    }

    async function guardarProv() {
        await db.collection("proveedores").add({ nombre: document.getElementById('prNom').value, item: document.getElementById('prIte').value, tel: document.getElementById('prTel').value });
    }

    async function crearUser() {
        await db.collection("usuarios").add({ user: document.getElementById('nuU').value, pass: document.getElementById('nuP').value, rol: document.getElementById('nuR').value });
    }

    async function eliminar(col, id) { if(confirm("¿Eliminar?")) await db.collection(col).doc(id).delete(); }

    function generarPDF(v) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(20); doc.text("H&J DISEÑOS", 105, 20, {align: 'center'});
        doc.setFontSize(10); doc.text(`Cliente: ${v.cliente} | Tel: ${v.tel}`, 20, 40);
        doc.text(`Vendedor: ${v.vendedor} | Entrega: ${v.entrega}`, 20, 47);
        doc.autoTable({ startY: 55, head: [['Detalle del Trabajo', 'Monto']], body: [[v.producto, `$${v.total.toLocaleString()}`]] });
        doc.text(`TOTAL: $${v.total.toLocaleString()}`, 140, doc.autoTable.previous.finalY + 10);
        doc.text(`ABONO: $${v.abono.toLocaleString()}`, 140, doc.autoTable.previous.finalY + 17);
        doc.setFontSize(14); doc.text(`SALDO: $${v.saldo.toLocaleString()}`, 140, doc.autoTable.previous.finalY + 27);
        doc.save(`Recibo_${v.cliente}.pdf`);
    }
</script>
</body>
</html>
