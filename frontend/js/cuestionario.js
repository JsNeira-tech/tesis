/* ============================================ */
/* CUESTIONARIO.JS - ORQUESTADOR PRINCIPAL */
/* ============================================ */

// ============================================
// VARIABLES GLOBALES
// ============================================
let seccionActual = 0;
let respuestasUsuario = {};
let perfilActualCalculado = null;
let perfilObjetivoCalculado = null;
let brechasIdentificadas = null;
let planDeAccion = null;

// Mapeo de IDs de secciones
const SECCIONES = [
    'section-0', // Identificación
    'section-1', // Gobernanza
    'section-2', // Visibilidad
    'section-3', // Protección
    'section-4', // Respuesta
    'section-5'  // Criticidad
];

// Total de preguntas por sección
const PREGUNTAS_POR_SECCION = {
    0: 5,  // Identificación
    1: 4,  // Gobernanza
    2: 4,  // Visibilidad
    3: 4,  // Protección
    4: 4,  // Respuesta
    5: 3   // Criticidad
};

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Cuestionario de Autodiagnóstico Cargado');
    
    // Inicializar guardado automático cada 30 segundos
    inicializarGuardadoAutomatico();
    
    // Intentar cargar progreso guardado
    cargarProgresoGuardado();
    
    // Configurar listeners para validación en tiempo real
    configurarValidacionTiempoReal();
});

// ============================================
// NAVEGACIÓN DEL CUESTIONARIO
// ============================================

/**
 * Inicia el cuestionario ocultando la intro y mostrando la primera sección
 */
function iniciarCuestionario() {
    // Ocultar introducción
    document.getElementById('intro').style.display = 'none';
    
    // Mostrar barra de progreso
    document.getElementById('progress-container').style.display = 'block';
    
    // Mostrar formulario
    document.getElementById('cuestionario').style.display = 'block';
    
    // Mostrar primera sección
    mostrarSeccion(0);
    
    // Actualizar progreso
    actualizarProgreso();
    
    console.log('✅ Cuestionario iniciado');
}

/**
 * Muestra una sección específica y oculta las demás
 * @param {number} numeroSeccion - Índice de la sección a mostrar
 */
function mostrarSeccion(numeroSeccion) {
    // Ocultar todas las secciones
    SECCIONES.forEach(seccionId => {
        document.getElementById(seccionId).style.display = 'none';
    });
    
    // Mostrar la sección solicitada
    document.getElementById(SECCIONES[numeroSeccion]).style.display = 'block';
    
    // Actualizar sección actual
    seccionActual = numeroSeccion;
    
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Actualizar indicadores visuales
    actualizarIndicadoresSeccion();
}

/**
 * Avanza a la siguiente sección después de validar la actual
 * @param {number} siguienteNumero - Número de la siguiente sección
 */
function siguienteSección(siguienteNumero) {
    // Validar sección actual antes de avanzar
    if (!validarSeccionActual()) {
        alert('⚠️ Por favor, complete todos los campos obligatorios antes de continuar.');
        return;
    }
    
    // Guardar respuestas de la sección actual
    guardarRespuestasSeccion(seccionActual);
    
    // Marcar sección como completada
    marcarSeccionCompletada(seccionActual);
    
    // Mostrar siguiente sección
    mostrarSeccion(siguienteNumero);
    
    // Actualizar progreso
    actualizarProgreso();
    
    // Guardar progreso en localStorage
    guardarProgreso();
}

/**
 * Retrocede a la sección anterior
 * @param {number} anteriorNumero - Número de la sección anterior
 */
function anteriorSección(anteriorNumero) {
    mostrarSeccion(anteriorNumero);
    actualizarProgreso();
}

// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================

/**
 * Valida que todos los campos obligatorios de la sección actual estén completos
 * @returns {boolean} - true si la sección es válida
 */
function validarSeccionActual() {
    const seccionId = SECCIONES[seccionActual];
    const seccionElement = document.getElementById(seccionId);
    
    // Obtener todos los campos obligatorios (required)
    const camposObligatorios = seccionElement.querySelectorAll('[required]');
    
    let todosCompletos = true;
    
    camposObligatorios.forEach(campo => {
        // Caso especial: checkboxes (al menos uno debe estar marcado)
        if (campo.type === 'checkbox') {
            const checkboxGroup = seccionElement.querySelectorAll(`input[name="${campo.name}"]`);
            const algunoMarcado = Array.from(checkboxGroup).some(cb => cb.checked);
            
            if (!algunoMarcado) {
                todosCompletos = false;
                campo.classList.add('invalid');
            } else {
                checkboxGroup.forEach(cb => cb.classList.remove('invalid'));
            }
        } 
        // Caso general: inputs y selects
        else {
            if (!campo.value || campo.value === '') {
                todosCompletos = false;
                campo.classList.add('invalid');
            } else {
                campo.classList.remove('invalid');
            }
        }
    });
    
    return todosCompletos;
}

/**
 * Configura validación en tiempo real para todos los campos
 */
function configurarValidacionTiempoReal() {
    const todosLosCampos = document.querySelectorAll('input, select');
    
    todosLosCampos.forEach(campo => {
        campo.addEventListener('change', function() {
            // Remover clase de inválido cuando el usuario complete el campo
            if (this.value && this.value !== '') {
                this.classList.remove('invalid');
            }
        });
    });
}

// ============================================
// CAPTURA DE RESPUESTAS
// ============================================

/**
 * Guarda las respuestas de una sección específica
 * @param {number} numeroSeccion - Índice de la sección
 */
function guardarRespuestasSeccion(numeroSeccion) {
    const seccionId = SECCIONES[numeroSeccion];
    const seccionElement = document.getElementById(seccionId);
    
    // Obtener todos los inputs y selects de la sección
    const campos = seccionElement.querySelectorAll('input, select');
    
    campos.forEach(campo => {
        if (campo.type === 'checkbox') {
            // Para checkboxes, guardar array de valores seleccionados
            if (!respuestasUsuario[campo.name]) {
                respuestasUsuario[campo.name] = [];
            }
            if (campo.checked) {
                respuestasUsuario[campo.name].push(campo.value);
            }
        } else if (campo.type === 'text' || campo.tagName === 'SELECT') {
            // Para text e selects, guardar valor directamente
            respuestasUsuario[campo.name] = campo.value;
        }
    });
    
    console.log(`💾 Respuestas guardadas - Sección ${numeroSeccion}:`, respuestasUsuario);
}

/**
 * Captura todas las respuestas del formulario completo
 * @returns {Object} - Objeto con todas las respuestas
 */
function capturarTodasLasRespuestas() {
    // Limpiar objeto de respuestas
    respuestasUsuario = {};
    
    // Recorrer todas las secciones
    for (let i = 0; i < SECCIONES.length; i++) {
        guardarRespuestasSeccion(i);
    }
    
    return respuestasUsuario;
}

// ============================================
// ACTUALIZACIÓN DE PROGRESO
// ============================================

/**
 * Actualiza la barra de progreso y los indicadores
 */
function actualizarProgreso() {
    // Calcular preguntas completadas
    const totalPreguntas = 24;
    let preguntasCompletadas = 0;
    
    // Contar preguntas respondidas en secciones completadas
    for (let i = 0; i < seccionActual; i++) {
        preguntasCompletadas += PREGUNTAS_POR_SECCION[i];
    }
    
    // Calcular porcentaje
    const porcentaje = Math.round((preguntasCompletadas / totalPreguntas) * 100);
    
    // Actualizar barra de progreso
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = porcentaje + '%';
    
    // Actualizar texto de progreso
    const progressText = document.getElementById('progress-text');
    progressText.textContent = `${preguntasCompletadas}/${totalPreguntas} preguntas completadas (${porcentaje}%)`;
    
    console.log(`📊 Progreso actualizado: ${porcentaje}%`);
}

/**
 * Actualiza los indicadores visuales de las secciones
 */
function actualizarIndicadoresSeccion() {
    SECCIONES.forEach((seccionId, index) => {
        const indicador = document.getElementById(`section-${index}-progress`);
        
        if (index < seccionActual) {
            // Sección completada
            indicador.classList.remove('active');
            indicador.classList.add('completed');
        } else if (index === seccionActual) {
            // Sección activa
            indicador.classList.add('active');
            indicador.classList.remove('completed');
        } else {
            // Sección pendiente
            indicador.classList.remove('active', 'completed');
        }
    });
}

/**
 * Marca una sección como completada visualmente
 * @param {number} numeroSeccion - Índice de la sección
 */
function marcarSeccionCompletada(numeroSeccion) {
    const indicador = document.getElementById(`section-${numeroSeccion}-progress`);
    indicador.classList.add('completed');
    indicador.classList.remove('active');
}

// ============================================
// GUARDADO Y CARGA DE PROGRESO (LocalStorage)
// ============================================

/**
 * Guarda el progreso actual en localStorage
 */
function guardarProgreso() {
    const progreso = {
        seccionActual: seccionActual,
        respuestas: respuestasUsuario,
        timestamp: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('diagnostico_progreso', JSON.stringify(progreso));
        console.log('💾 Progreso guardado en localStorage');
    } catch (e) {
        console.error('❌ Error al guardar progreso:', e);
    }
}

/**
 * Carga el progreso guardado desde localStorage
 */
function cargarProgresoGuardado() {
    try {
        const progresoGuardado = localStorage.getItem('diagnostico_progreso');
        
        if (progresoGuardado) {
            const progreso = JSON.parse(progresoGuardado);
            
            // Preguntar al usuario si desea continuar
            const continuar = confirm(
                '📋 Se detectó un diagnóstico en progreso guardado el ' + 
                new Date(progreso.timestamp).toLocaleString() + 
                '.\n\n¿Desea continuar desde donde lo dejó?'
            );
            
            if (continuar) {
                respuestasUsuario = progreso.respuestas;
                // Restaurar valores en el formulario
                restaurarValoresFormulario();
                console.log('✅ Progreso restaurado');
            } else {
                localStorage.removeItem('diagnostico_progreso');
            }
        }
    } catch (e) {
        console.error('❌ Error al cargar progreso:', e);
    }
}

/**
 * Restaura los valores guardados en el formulario
 */
function restaurarValoresFormulario() {
    Object.keys(respuestasUsuario).forEach(nombre => {
        const valor = respuestasUsuario[nombre];
        
        // Caso: checkbox (array de valores)
        if (Array.isArray(valor)) {
            valor.forEach(v => {
                const checkbox = document.querySelector(`input[name="${nombre}"][value="${v}"]`);
                if (checkbox) checkbox.checked = true;
            });
        } 
        // Caso: input text o select
        else {
            const campo = document.querySelector(`[name="${nombre}"]`);
            if (campo) campo.value = valor;
        }
    });
}

/**
 * Inicializa guardado automático cada 30 segundos
 */
function inicializarGuardadoAutomatico() {
    setInterval(() => {
        if (seccionActual > 0) {
            guardarProgreso();
        }
    }, 30000); // 30 segundos
}

// ============================================
// GENERACIÓN DE REPORTE
// ============================================

/**
 * Genera el reporte de diagnóstico completo
 */
function generarReporte() {
    console.log('🚀 Iniciando generación de reporte...');
    
    // 1. Validar última sección
    if (!validarSeccionActual()) {
        alert('⚠️ Por favor, complete todos los campos obligatorios antes de generar el reporte.');
        return;
    }
    
    // 2. Capturar todas las respuestas finales
    guardarRespuestasSeccion(seccionActual);
    const respuestasFinales = capturarTodasLasRespuestas();
    
    console.log('📋 Respuestas capturadas:', respuestasFinales);
    
    // 3. Calcular perfil actual (evaluador.js)
    try {
        perfilActualCalculado = calcularPerfilActual(respuestasFinales);
        console.log('✅ Perfil Actual calculado:', perfilActualCalculado);
    } catch (e) {
        console.error('❌ Error al calcular perfil actual:', e);
        alert('Error al calcular el perfil actual. Por favor, revise la consola.');
        return;
    }
    
    // 4. Determinar perfil objetivo (objetivo.js)
    try {
        const contexto = extraerContextoOrganizacional(respuestasFinales);
        perfilObjetivoCalculado = determinarPerfilObjetivo(contexto);
        console.log('✅ Perfil Objetivo calculado:', perfilObjetivoCalculado);
    } catch (e) {
        console.error('❌ Error al determinar perfil objetivo:', e);
        alert('Error al determinar el perfil objetivo. Por favor, revise la consola.');
        return;
    }
    
    // 5. Identificar brechas (brechas.js)
    try {
        brechasIdentificadas = identificarBrechas(perfilActualCalculado, perfilObjetivoCalculado);
        console.log('✅ Brechas identificadas:', brechasIdentificadas);
    } catch (e) {
        console.error('❌ Error al identificar brechas:', e);
        alert('Error al identificar brechas. Por favor, revise la consola.');
        return;
    }
    
    // 6. Generar recomendaciones (recomendaciones.js)
    try {
        planDeAccion = generarRecomendaciones(brechasIdentificadas, respuestasFinales);
        console.log('✅ Plan de acción generado:', planDeAccion);
    } catch (e) {
        console.error('❌ Error al generar recomendaciones:', e);
        alert('Error al generar el plan de acción. Por favor, revise la consola.');
        return;
    }
    
    // 7. Mostrar pantalla de resultados
    mostrarPantallaResultados();
    
    // 8. Limpiar progreso guardado
    localStorage.removeItem('diagnostico_progreso');
    
    console.log('✅ Reporte generado exitosamente');
}

// ============================================
// PANTALLA DE RESULTADOS
// ============================================

/**
 * Muestra la pantalla de resultados con el resumen
 */
function mostrarPantallaResultados() {
    // Ocultar formulario y barra de progreso
    document.getElementById('cuestionario').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    
    // Mostrar sección de resultados
    const resultadosSection = document.getElementById('resultados');
    resultadosSection.style.display = 'block';
    
    // Generar resumen
    generarResumenResultados();
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Genera el resumen de resultados en HTML
 */
function generarResumenResultados() {
    const resumenBox = document.getElementById('resumen-resultados');
    
    // Calcular estadísticas
    const puntajeGlobal = perfilActualCalculado.puntajeGlobal;
    const totalBrechas = brechasIdentificadas.length;
    const brechasCriticas = brechasIdentificadas.filter(b => b.criticidad === 'Crítica').length;
    const empresa = respuestasUsuario['P0.1'] || 'Su empresa';
    
    // Construir HTML
    const html = `
        <h3>📊 Resumen del Diagnóstico</h3>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-CL')}</p>
        <hr style="margin: 1.5rem 0; border: none; border-top: 2px solid #cbd5e1;">
        
        <p><strong>Nivel de Madurez Actual:</strong> ${Math.round(puntajeGlobal * 100)}% (${puntajeGlobal.toFixed(2)}/1.00)</p>
        <p><strong>Brechas Identificadas:</strong> ${totalBrechas} controles requieren mejora</p>
        <p><strong>Brechas Críticas:</strong> ${brechasCriticas} controles completamente ausentes</p>
        
        <hr style="margin: 1.5rem 0; border: none; border-top: 2px solid #cbd5e1;">
        
        <p><strong>Próximos Pasos:</strong></p>
        <ol style="margin-left: 1.5rem; line-height: 1.8;">
            <li>Descargue el reporte PDF completo con el plan de acción detallado</li>
            <li>Revise las recomendaciones priorizadas por fase de implementación</li>
            <li>Comparta el reporte con su equipo directivo y proveedor TI (si aplica)</li>
            <li>Comience con los controles de Fase 1 (Gobernanza) en las próximas 2-4 semanas</li>
        </ol>
    `;
    
    resumenBox.innerHTML = html;
}

// ============================================
// DESCARGA DE PDF
// ============================================

/**
 * Descarga el reporte en formato PDF
 */
function descargarPDF() {
    console.log('📄 Generando PDF...');
    
    try {
        // Verificar que jsPDF esté disponible
        if (typeof window.jspdf === 'undefined') {
            throw new Error('jsPDF no está cargado');
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configuración
        const margenIzq = 20;
        const margenDer = 190;
        const anchoUtil = margenDer - margenIzq;
        let y = 20;
        
        // ==================
        // PORTADA
        // ==================
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('Reporte de Diagnóstico', margenIzq, y);
        y += 10;
        
        doc.setFontSize(18);
        doc.text('de Ciberseguridad', margenIzq, y);
        y += 15;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Basado en NIST Cybersecurity Framework 2.0', margenIzq, y);
        y += 20;
        
        // Información de la empresa
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Empresa:', margenIzq, y);
        doc.setFont('helvetica', 'normal');
        doc.text(respuestasUsuario['P0.1'] || 'No especificado', margenIzq + 30, y);
        y += 8;
        
        doc.setFont('helvetica', 'bold');
        doc.text('Sector:', margenIzq, y);
        doc.setFont('helvetica', 'normal');
        doc.text(respuestasUsuario['P0.2'] || 'No especificado', margenIzq + 30, y);
        y += 8;
        
        doc.setFont('helvetica', 'bold');
        doc.text('Empleados:', margenIzq, y);
        doc.setFont('helvetica', 'normal');
        doc.text(respuestasUsuario['P0.3'] || 'No especificado', margenIzq + 30, y);
        y += 8;
        
        doc.setFont('helvetica', 'bold');
        doc.text('Fecha:', margenIzq, y);
        doc.setFont('helvetica', 'normal');
        doc.text(new Date().toLocaleDateString('es-CL'), margenIzq + 30, y);
        y += 20;
        
        // Línea separadora
        doc.setDrawColor(203, 213, 225);
        doc.line(margenIzq, y, margenDer, y);
        y += 15;
        
        // ==================
        // RESUMEN EJECUTIVO
        // ==================
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('1. Resumen Ejecutivo', margenIzq, y);
        y += 10;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        
        const puntajeGlobal = perfilActualCalculado.puntajeGlobal;
        const porcentaje = Math.round(puntajeGlobal * 100);
        
        const resumenTexto = `Su empresa presenta un nivel de madurez en ciberseguridad del ${porcentaje}% (${puntajeGlobal.toFixed(2)}/1.00). Se identificaron ${brechasIdentificadas.length} controles que requieren mejora, de los cuales ${brechasIdentificadas.filter(b => b.criticidad === 'Crítica').length} son críticos.`;
        
        const lineasResumen = doc.splitTextToSize(resumenTexto, anchoUtil);
        doc.text(lineasResumen, margenIzq, y);
        y += lineasResumen.length * 6 + 10;
        
        // ==================
        // NUEVA PÁGINA: PERFIL DE MADUREZ
        // ==================
        doc.addPage();
        y = 20;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('2. Perfil de Madurez Actual', margenIzq, y);
        y += 10;
        
        // Tabla de puntajes por fase
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Puntajes por Fase:', margenIzq, y);
        y += 8;
        
        doc.setFont('helvetica', 'normal');
        perfilActualCalculado.porFase.forEach((puntaje, index) => {
            const porcentajeFase = Math.round(puntaje * 100);
            doc.text(`Fase ${index + 1}: ${porcentajeFase}% (${puntaje.toFixed(2)}/1.00)`, margenIzq + 5, y);
            y += 6;
        });
        
        y += 10;
        
        // Nota sobre el gráfico radial
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const notaGrafico = 'Nota: El gráfico radial de madurez por función NIST está disponible en la versión web interactiva de este reporte.';
        const lineasNota = doc.splitTextToSize(notaGrafico, anchoUtil);
        doc.text(lineasNota, margenIzq, y);
        doc.setTextColor(0, 0, 0);
        y += lineasNota.length * 5 + 15;
        
        // ==================
        // BRECHAS IDENTIFICADAS
        // ==================
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('3. Brechas Identificadas', margenIzq, y);
        y += 10;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        
        if (brechasIdentificadas.length === 0) {
            doc.text('¡Felicidades! No se identificaron brechas significativas.', margenIzq, y);
            y += 10;
        } else {
            brechasIdentificadas.slice(0, 10).forEach((brecha, index) => {
                // Control de página
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                
                doc.setFont('helvetica', 'bold');
                doc.text(`${index + 1}. ${brecha.control_nombre}`, margenIzq, y);
                y += 6;
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.text(`Control: ${brecha.control_id} | Fase: ${brecha.fase} | Criticidad: ${brecha.criticidad}`, margenIzq + 5, y);
                y += 5;
                
                doc.text(`Brecha: ${brecha.brecha.toFixed(1)} puntos`, margenIzq + 5, y);
                y += 8;
                
                doc.setFontSize(11);
            });
            
            if (brechasIdentificadas.length > 10) {
                y += 5;
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text(`... y ${brechasIdentificadas.length - 10} brechas adicionales (ver plan de acción completo)`, margenIzq, y);
                doc.setTextColor(0, 0, 0);
                y += 10;
            }
        }
        
        // ==================
        // NUEVA PÁGINA: PLAN DE ACCIÓN
        // ==================
        doc.addPage();
        y = 20;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('4. Plan de Acción Recomendado', margenIzq, y);
        y += 10;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        
        // Agrupar plan por fases
        const planPorFases = agruparPlanPorFases(planDeAccion);
        
        Object.keys(planPorFases).forEach(fase => {
            // Control de página
            if (y > 250) {
                doc.addPage();
                y = 20;
            }
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.text(`Fase ${fase}: ${obtenerNombreFase(parseInt(fase))}`, margenIzq, y);
            y += 8;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            
            planPorFases[fase].forEach((recomendacion, index) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                
                doc.setFont('helvetica', 'bold');
                doc.text(`${index + 1}. ${recomendacion.control_nombre}`, margenIzq + 3, y);
                y += 5;
                
                doc.setFont('helvetica', 'normal');
                doc.text(`Control: ${recomendacion.control_id}`, margenIzq + 6, y);
                y += 5;
                
                const descripcionCorta = recomendacion.que_implementar.substring(0, 120) + '...';
                const lineas = doc.splitTextToSize(descripcionCorta, anchoUtil - 6);
                doc.text(lineas, margenIzq + 6, y);
                y += lineas.length * 4 + 3;
                
                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100);
                doc.text(`Estimación: ${recomendacion.estimacion.tiempo} | ${recomendacion.estimacion.esfuerzo}`, margenIzq + 6, y);
                doc.setTextColor(0, 0, 0);
                y += 8;
                
                doc.setFontSize(10);
            });
            
            y += 5;
        });
        
        // ==================
        // PIE DE PÁGINA EN TODAS LAS PÁGINAS
        // ==================
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text(`Página ${i} de ${totalPages}`, margenDer - 20, 287, { align: 'right' });
            doc.text('Generado por Herramienta de Autodiagnóstico de Ciberseguridad', margenIzq, 287);
            doc.setTextColor(0, 0, 0);
        }
     
        // ==================
        // GUARDAR PDF
        // ==================
        const nombreArchivo = `Diagnostico_Ciberseguridad_${respuestasUsuario['P0.1'] || 'Empresa'}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(nombreArchivo);
        
        console.log('✅ PDF generado exitosamente:', nombreArchivo);
        
    } catch (error) {
        console.error('❌ Error al generar PDF:', error);
        alert('Error al generar el PDF. Por favor, revise la consola del navegador para más detalles.');
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Extrae el contexto organizacional necesario para calcular el perfil objetivo
 * @param {Object} respuestas - Respuestas del usuario
 * @returns {Object} - Contexto organizacional
 */
function extraerContextoOrganizacional(respuestas) {
    // Convertir rango de empleados a número promedio
    const empleadosMap = {
        '1-5': 3,
        '6-10': 8,
        '11-25': 18,
        '26-50': 38,
        '51-100': 75
    };
    
    const empleados = empleadosMap[respuestas['P0.3']] || 10;
    
    return {
        empresa: respuestas['P0.1'] || 'No especificado',
        sector: respuestas['P0.2'] || 'No especificado',
        empleados: empleados,
        facturacion: respuestas['P0.4'] || 'No especificado',
        tecnologias: respuestas['P0.5'] || [],
        rto: respuestas['P5.1'] || 'No evaluado',
        tiempo_implementacion: respuestas['P5.2'] || '12 meses',
        incidentes: respuestas['P5.3'] || 'No'
    };
}

/**
 * Agrupa el plan de acción por fases
 * @param {Array} plan - Plan de acción completo
 * @returns {Object} - Plan agrupado por fase {1: [...], 2: [...], ...}
 */
function agruparPlanPorFases(plan) {
    const porFases = {};
    
    plan.forEach(recomendacion => {
        const fase = recomendacion.fase;
        if (!porFases[fase]) {
            porFases[fase] = [];
        }
        porFases[fase].push(recomendacion);
    });
    
    return porFases;
}

/**
 * Obtiene el nombre descriptivo de una fase
 * @param {number} numeroFase - Número de fase (1-4)
 * @returns {string} - Nombre de la fase
 */
function obtenerNombreFase(numeroFase) {
    const nombres = {
        1: 'Gobernanza (Fundamentos Organizacionales)',
        2: 'Visibilidad (Conocimiento de Activos)',
        3: 'Resiliencia (Protección Técnica)',
        4: 'Madurez (Detección y Respuesta)'
    };
    return nombres[numeroFase] || `Fase ${numeroFase}`;
}

/**
 * Reinicia el cuestionario para realizar un nuevo diagnóstico
 */
function reiniciarCuestionario() {
    // Confirmar con el usuario
    const confirmar = confirm('¿Está seguro de que desea realizar un nuevo diagnóstico? Se perderán los resultados actuales.');
    
    if (confirmar) {
        // Limpiar variables globales
        seccionActual = 0;
        respuestasUsuario = {};
        perfilActualCalculado = null;
        perfilObjetivoCalculado = null;
        brechasIdentificadas = null;
        planDeAccion = null;
        
        // Limpiar localStorage
        localStorage.removeItem('diagnostico_progreso');
        
        // Resetear formulario
        document.getElementById('cuestionario').reset();
        
        // Ocultar resultados
        document.getElementById('resultados').style.display = 'none';
        
        // Mostrar introducción
        document.getElementById('intro').style.display = 'block';
        document.getElementById('progress-container').style.display = 'none';
        document.getElementById('cuestionario').style.display = 'none';
        
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('🔄 Cuestionario reiniciado');
    }
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES (para debugging)
// ============================================
window.diagnostico = {
    obtenerRespuestas: () => respuestasUsuario,
    obtenerPerfilActual: () => perfilActualCalculado,
    obtenerPerfilObjetivo: () => perfilObjetivoCalculado,
    obtenerBrechas: () => brechasIdentificadas,
    obtenerPlan: () => planDeAccion
};

console.log('✅ cuestionario.js cargado correctamente');
console.log('💡 Tip: Usa window.diagnostico para debugging (ej: window.diagnostico.obtenerRespuestas())');