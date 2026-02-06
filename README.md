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
