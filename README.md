function generarPDF(v) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Encabezado usando los datos de configuración
    doc.setFontSize(22); 
    doc.text(maestro.nombreEmpresa || "H&J DISEÑOS", 105, 20, {align: 'center'});
    
    doc.setFontSize(10);
    doc.text(`NIT: ${maestro.nit || ''} | Tel: ${maestro.telefono || ''}`, 105, 27, {align: 'center'});
    
    doc.line(20, 35, 190, 35); // Línea decorativa
    
    doc.text(`Cliente: ${v.cliente} | Tel: ${v.tel}`, 20, 45);
    doc.text(`Vendedor: ${v.vendedor} | Fecha Entrega: ${v.entrega}`, 20, 52);
    
    doc.autoTable({ 
        startY: 60, 
        head: [['Descripción del Trabajo', 'Valor Total']], 
        body: [[v.producto, `$${v.total.toLocaleString()}`]],
        headStyles: { fillColor: [37, 99, 235] }
    });
    
    const finalY = doc.autoTable.previous.finalY;
    doc.setFontSize(10);
    doc.text(`TOTAL: $${v.total.toLocaleString()}`, 140, finalY + 10);
    doc.text(`ABONO: $${v.abono.toLocaleString()}`, 140, finalY + 17);
    doc.setFontSize(14);
    doc.setTextColor(200, 0, 0);
    doc.text(`SALDO PENDIENTE: $${v.saldo.toLocaleString()}`, 140, finalY + 27);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text(maestro.mensajeFactura || "", 20, 280);
    
    doc.save(`Recibo_${v.cliente}.pdf`);
}
