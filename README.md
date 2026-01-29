<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H&JDiseños - Cloud ERP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <style>
        :root { --dark: #0f172a; --primary: #2563eb; --accent: #f59e0b; --bg: #f8fafc; }
        body { background-color: var(--bg); font-family: 'Inter', sans-serif; color: var(--dark); }
        .sidebar { background: var(--dark); min-height: 100vh; color: white; }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .nav-link { color: #94a3b8; }
        .nav-link.active { background: var(--primary); color: white; border-radius: 8px; }
        .stat-val { font-size: 1.8rem; font-weight: 800; }
        .form-label { font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <nav class="col-md-3 col-lg-2 sidebar p-4 d-flex flex-column">
            <h3 class="fw-bold text-white mb-4">H&J<span class="text-primary">D</span></h3>
            <ul class="nav flex-column mb-auto">
                <li class="nav-item mb-2"><a class="nav-link active p-2" href="#"><i class="bi bi-cloud-check-fill me-2"></i> Cloud Mode</a></li>
                <li class="nav-item mb-2"><a class="nav-link p-2" href="#seccionCotizador"><i class="bi bi-calculator me-2"></i> Cotizador</a></li>
                <li class="nav-item mb-2"><a class="nav-link p-2" href="#seccionAjustes"><i class="bi bi-gear me-2"></i> Ajustes</a></li>
            </ul>
            <div class="mt-auto pt-4 border-top border-secondary">
                <small class="text-muted">Cloud Sync Active</small>
            </div>
        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-5 py-4">
            
            <div class="row g-3 mb-4">
                <div class="col-md-4">
                    <div class="card p-3 border-start border-primary border-5">
                        <small class="text-muted fw-bold">VENTAS (MES)</small>
                        <div id="dashVentas" class="stat-val text-primary">$ 0</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 border-start border-danger border-5">
                        <small class="text-muted fw-bold">GASTOS</small>
                        <div id="dashGastos" class="stat-val text-danger">$ 0</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 border-start border-success border-5">
                        <small class="text-muted fw-bold">UTILIDAD</small>
                        <div id="dashUtil" class="stat-val text-success">$ 0</div>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-lg-8" id="seccionCotizador">
                    <div class="card p-4">
                        <h5 class="fw-bold mb-4"><i class="bi bi-hammer me-2 text-primary"></i> Nueva Producción</h5>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">Cliente</label>
                                <input type="text" id="vCli" class="form-control" placeholder="Nombre">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Producto / Descripción</label>
                                <input type="text" id="vProd" class="form-control" placeholder="Ej: Cuadro Marvel 30x40">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Ancho (cm)</label>
                                <input type="number" id="vAn" class="form-control" oninput="calcular()">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Largo (cm)</label>
                                <input type="number" id="vLa" class="form-control" oninput="calcular()">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Láser (min)</label>
                                <input type="number" id="vMi" class="form-control" oninput="calcular()">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Extras ($)</label>
                                <input type="number" id="vEx" class="form-control" oninput="calcular()">
                            </div>

                            <div class="col-12 py-3 border-top mt-2">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="cMdf" onchange="calcular()">
                                    <label class="form-check-label small fw-bold">MDF</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="cAc" onchange="calcular()">
                                    <label class="form-check-label small fw-bold">ACRÍLICO</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="cIm" onchange="calcular()">
                                    <label class="form-check-label small fw-bold">IMPRESIÓN</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="cLi" onchange="calcular()">
                                    <label class="form-check-label small fw-bold">LISTONES</label>
                                </div>
                            </div>

                            <div class="col-12 mt-3 p-4 bg-dark text-white rounded-4 text-center shadow-lg">
                                <div class="row">
                                    <div class="col-6 border-end border-secondary">
                                        <small class="text-muted d-block">COSTO</small>
                                        <h4 id="resC" class="mb-0 text-secondary">$ 0</h4>
                                    </div>
                                    <div class="col-6">
                                        <small class="text-primary d-block fw-bold">PRECIO VENTA</small>
                                        <h2 id="resV" class="mb-0 fw-bold">$ 0</h2>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mt-4 d-flex gap-2">
                                <button class="btn btn-primary flex-grow-1 fw-bold p-3" onclick="subirVenta()">REGISTRAR VENTA</button>
                                <button class="btn btn-warning fw-bold p-3" onclick="factura()"><i class="bi bi-file-pdf"></i> FACTURA</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card p-4 mb-4 border-top border-primary border-5" id="seccionAjustes">
                        <h6 class="fw-bold mb-3">CONFIGURACIÓN DE NUBE</h6>
                        <div id="ajustesForm">
                            </div>
                        <button class="btn btn-dark btn-sm w-100 mt-3" onclick="actualizarConfigNube()">GUARDAR AJUSTES</button>
                    </div>

                    <div class="card p-4 border-top border-danger border-5">
                        <h6 class="fw-bold mb-3 text-danger">REGISTRAR GASTO</h6>
                        <input type="text" id="gDe" class="form-control form-control-sm mb-2" placeholder="Motivo">
                        <input type="number" id="gMo" class="form-control form-control-sm mb-3" placeholder="Monto $">
                        <button class="btn btn-danger btn-sm w-100 fw-bold" onclick="subirGasto()">RESTAR DE CAJA</button>
                    </div>
                </div>
            </div>

            <div class="card mt-4 p-4 shadow-sm">
                <h5 class="fw-bold mb-3"><i class="bi bi-clock-history me-2"></i> Movimientos Sincronizados</h5>
                <div class="table-responsive">
                    <table class="table table-hover align-middle small">
                        <thead class="table-light">
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Detalle / Cliente</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody id="listaMov"></tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>

<script>
    // --- CONFIGURACIÓN FIREBASE ---
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

    // --- VARIABLES GLOBALES ---
    let config = {};
    let cacheVenta = 0;

    // --- CARGAR CONFIGURACIÓN DESDE NUBE ---
    function cargarConfig() {
        db.collection("config").doc("maestra").onSnapshot((doc) => {
            if (doc.exists) {
                config = doc.data();
                const container = document.getElementById('ajustesForm');
                container.innerHTML = `
                    <label class="form-label mt-2">MDF (cm²)</label><input type="number" id="fMdf" class="form-control form-control-sm" value="${config.mdf}" step="0.001">
                    <label class="form-label mt-2">Acrílico (cm²)</label><input type="number" id="fAcri" class="form-control form-control-sm" value="${config.acri}" step="0.001">
                    <label class="form-label mt-2">Impresión (m²)</label><input type="number" id="fImp" class="form-control form-control-sm" value="${config.imp}">
                    <label class="form-label mt-2">Listón (m)</label><input type="number" id="fLis" class="form-control form-control-sm" value="${config.lis}">
                    <label class="form-label mt-2">Láser (min)</label><input type="number" id="fLas" class="form-control form-control-sm" value="${config.las}">
                    <label class="form-label mt-2 text-primary">Utilidad %</label><input type="number" id="fUtl" class="form-control form-control-sm fw-bold border-primary" value="${config.utl}">
                `;
            }
        });
    }

    async function actualizarConfigNube() {
        const d = {
            mdf: parseFloat(document.getElementById('fMdf').value),
            acri: parseFloat(document.getElementById('fAcri').value),
            imp: parseFloat(document.getElementById('fImp').value),
            lis: parseFloat(document.getElementById('fLis').value),
            las: parseFloat(document.getElementById('fLas').value),
            utl: parseFloat(document.getElementById('fUtl').value)
        };
        await db.collection("config").doc("maestra").set(d);
        alert("Nube actualizada");
    }

    // --- CÁLCULO DINÁMICO ---
    function calcular() {
        if (!config.mdf) return;
        const an = parseFloat(document.getElementById('vAn').value) || 0;
        const la = parseFloat(document.getElementById('vLa').value) || 0;
        const mi = parseFloat(document.getElementById('vMi').value) || 0;
        const ex = parseFloat(document.getElementById('vEx').value) || 0;

        let costo = 0;
        const area = an * la;
        const peri = ((an * 2) + (la * 2)) / 100;

        if(document.getElementById('cMdf').checked) costo += area * config.mdf;
        if(document.getElementById('cAc').checked) costo += area * config.acri;
        if(document.getElementById('cIm').checked) costo += (area / 10000) * config.imp;
        if(document.getElementById('cLi').checked) costo += peri * config.lis;
        
        costo += (mi * config.las) + ex;
        const venta = costo * (1 + (config.utl / 100));

        document.getElementById('resC').innerText = "$ " + Math.ceil(costo).toLocaleString();
        document.getElementById('resV').innerText = "$ " + Math.ceil(venta).toLocaleString();
        cacheVenta = Math.ceil(venta);
    }

    // --- OPERACIONES NUBE ---
    async function subirVenta() {
        const cli = document.getElementById('vCli').value || "Genérico";
        const prod = document.getElementById('vProd').value || "Trabajo";
        if(cacheVenta <= 0) return alert("Calcula el precio primero");

        await db.collection("movimientos").add({
            fecha: new Date().toLocaleDateString(),
            tipo: 'VENTA',
            det: `${prod} (${cli})`,
            val: cacheVenta,
            ts: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('vProd').value = ""; document.getElementById('vAn').value = "";
    }

    async function subirGasto() {
        const de = document.getElementById('gDe').value;
        const mo = parseFloat(document.getElementById('gMo').value) || 0;
        if(!de || mo <= 0) return;

        await db.collection("movimientos").add({
            fecha: new Date().toLocaleDateString(),
            tipo: 'GASTO',
            det: de,
            val: mo,
            ts: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('gDe').value = ""; document.getElementById('gMo').value = "";
    }

    // --- ESCUCHA DE DATOS REAL-TIME ---
    function escucharMovimientos() {
        db.collection("movimientos").orderBy("ts", "desc").onSnapshot((snap) => {
            let html = "";
            let tV = 0, tG = 0;
            snap.forEach(doc => {
                const m = doc.data();
                if(m.tipo === 'VENTA') tV += m.val; else tG += m.val;
                html += `<tr><td>${m.fecha}</td><td><span class="badge ${m.tipo === 'VENTA' ? 'bg-success' : 'bg-danger'}">${m.tipo}</span></td><td>${m.det}</td><td class="fw-bold">$${m.val.toLocaleString()}</td></tr>`;
            });
            document.getElementById('listaMov').innerHTML = html;
            document.getElementById('dashVentas').innerText = "$ " + tV.toLocaleString();
            document.getElementById('dashGastos').innerText = "$ " + tG.toLocaleString();
            document.getElementById('dashUtil').innerText = "$ " + (tV - tG).toLocaleString();
        });
    }

    // --- FACTURA PDF ---
    function factura() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(20); doc.text("H&J DISEÑOS - RECIBO", 15, 20);
        doc.setFontSize(10); doc.text(`Cliente: ${document.getElementById('vCli').value}`, 15, 30);
        doc.autoTable({
            startY: 40,
            head: [['Descripción', 'Total']],
            body: [[document.getElementById('vProd').value, `$${cacheVenta.toLocaleString()}`]],
            headStyles: { fillColor: [37, 99, 235] }
        });
        doc.save("Recibo_HJ.pdf");
    }

    cargarConfig();
    escucharMovimientos();
</script>
</body>
</html>
