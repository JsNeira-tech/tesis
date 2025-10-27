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
                // Evitar duplicados si el usuario vuelve atrás
                if (!respuestasUsuario[campo.name].includes(campo.value)) {
                    respuestasUsuario[campo.name].push(campo.value);
                }
            } else {
                // Remover si se deselecciona
                respuestasUsuario[campo.name] = respuestasUsuario[campo.name].filter(v => v !== campo.value);
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
    // Capturar respuestas de la sección actual ANTES de guardar
    guardarRespuestasSeccion(seccionActual);
    
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
                
                // Iniciar cuestionario y navegar a la sección guardada
                iniciarCuestionario();
                mostrarSeccion(progreso.seccionActual);
                actualizarProgreso();
                // Marcar secciones anteriores como completadas
                for (let i = 0; i < progreso.seccionActual; i++) {
                    marcarSeccionCompletada(i);
                }

                console.log(`✅ Progreso restaurado en Sección ${progreso.seccionActual}`);
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
        doc.text('1. Resumen del Diagnóstico', margenIzq, y);
        y += 10;
        
        const puntajeGlobal = perfilActualCalculado.puntajeGlobal;
        const porcentaje = Math.round(puntajeGlobal * 100);
        
        // Determinar nivel de riesgo y mensaje
        let nivelRiesgo, colorFondo, interpretacion;
        if (porcentaje < 40) {
            nivelRiesgo = 'RIESGO ALTO';
            colorFondo = [220, 38, 38]; // Rojo
            interpretacion = 'crítico y requiere atención inmediata';
        } else if (porcentaje < 70) {
            nivelRiesgo = 'RIESGO MEDIO';
            colorFondo = [234, 179, 8]; // Naranja
            interpretacion = 'adecuado pero mejorable';
        } else {
            nivelRiesgo = 'BAJO RIESGO';
            colorFondo = [34, 197, 94]; // Verde
            interpretacion = 'bueno';
        }
        
        // Texto introductorio
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const introTexto = doc.splitTextToSize(
            `Su nivel de seguridad es ${interpretacion}. Ya es consciente de que sus empleados son uno de los elementos en los que más tiene que invertir en ciberseguridad y tiene algunas medidas. No obstante, aún le falta hacer un esfuerzo para organizar y controlar mejor algunos aspectos.`,
            anchoUtil
        );
        doc.text(introTexto, margenIzq, y);
        y += (introTexto.length * 5) + 12;
        
        // ============================================
        // PORCENTAJE GRANDE Y PROMINENTE (estilo INCIBE)
        // ============================================
        
        // Caja grande con el porcentaje centrada
        const anchoCaja = 85;
        const altoCaja = 38;
        const xCaja = (doc.internal.pageSize.width - anchoCaja) / 2; // Centrado
        
        doc.setFillColor(...colorFondo);
        doc.roundedRect(xCaja, y, anchoCaja, altoCaja, 3, 3, 'F');
        
        // Porcentaje grande en blanco
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(40);
        doc.setFont('helvetica', 'bold');
        const porcentajeTexto = `${porcentaje}%`;
        const anchoTexto = doc.getTextWidth(porcentajeTexto);
        doc.text(porcentajeTexto, xCaja + (anchoCaja - anchoTexto) / 2, y + 22);
        
        // Nivel de riesgo
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        const anchoNivel = doc.getTextWidth(nivelRiesgo);
        doc.text(nivelRiesgo, xCaja + (anchoCaja - anchoNivel) / 2, y + 32);
        
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        y += altoCaja + 15;
        
        // ============================================
        // DESGLOSE POR FASES (estilo categorías INCIBE)
        // ============================================
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Desglose por Areas:', margenIzq, y);
        y += 8;
        
        // Definir las categorías
        const categorias = [
            { nombre: 'Gobernanza (Reglas y Responsables)', fase: 0 },
            { nombre: 'Visibilidad (Conocimiento de Activos)', fase: 1 },
            { nombre: 'Proteccion (Controles Tecnicos)', fase: 2 },
            { nombre: 'Respuesta (Gestion de Incidentes)', fase: 3 }
        ];
        
        categorias.forEach(cat => {
            const puntajeFase = perfilActualCalculado.porFase[cat.fase];
            const porcentajeFase = Math.round(puntajeFase * 100);
            
            // Determinar color y nivel
            let colorBarra, nivelRiesgoFase;
            if (porcentajeFase < 40) {
                colorBarra = [220, 38, 38]; // Rojo
                nivelRiesgoFase = 'ALTO';
            } else if (porcentajeFase < 70) {
                colorBarra = [234, 179, 8]; // Naranja
                nivelRiesgoFase = 'MEDIO';
            } else {
                colorBarra = [34, 197, 94]; // Verde
                nivelRiesgoFase = 'BAJO';
            }
            
            // Nombre de categoría
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text(cat.nombre, margenIzq + 3, y);
            y += 6;
            
            // Barra de progreso
            const anchoBarra = 115;
            const altoBarra = 8;
            const anchoProgreso = (porcentajeFase / 100) * anchoBarra;
            
            // Fondo de la barra (gris claro)
            doc.setFillColor(240, 240, 240);
            doc.rect(margenIzq + 3, y - 5, anchoBarra, altoBarra, 'F');
            
            // Progreso de la barra (color según nivel)
            doc.setFillColor(...colorBarra);
            doc.rect(margenIzq + 3, y - 5, anchoProgreso, altoBarra, 'F');
            
            // Porcentaje al lado
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(`${porcentajeFase}%`, margenIzq + anchoBarra + 8, y);
            
            // Nivel de riesgo
            doc.setTextColor(...colorBarra);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text(`Riesgo ${nivelRiesgoFase}`, margenIzq + anchoBarra + 28, y);
            doc.setTextColor(0, 0, 0);
            
            y += 11;
        });
        
        y += 5;
        
        // Mensaje final del resumen
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const mensajeFinal = doc.splitTextToSize(
            `Se identificaron ${brechasIdentificadas.length} controles que requieren mejora, de los cuales ${brechasIdentificadas.filter(b => b.criticidad === 'Crítica').length} son criticos. El plan de accion a continuacion le guiara para cerrar estas brechas de forma ordenada y realista.`,
            anchoUtil
        );
        doc.text(mensajeFinal, margenIzq, y);
        y += (mensajeFinal.length * 5) + 5;
        
        // ==================
        // NUEVA PÁGINA: SU SITUACIÓN Y HACIA DÓNDE LO LLEVAREMOS
        // ==================
        doc.addPage();
        y = 20;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('2. Su Situación Actual y Hacia Dónde Lo Llevaremos', margenIzq, y);
        y += 10;
        
        // Introducción
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const intro = doc.splitTextToSize(
            'Hemos evaluado su empresa en 4 fases de madurez en ciberseguridad. A continuación verá dónde está ahora (ACTUAL) y hacia dónde queremos llevarlo (OBJETIVO) con el plan de acción que viene después.',
            anchoUtil
        );
        doc.text(intro, margenIzq, y);
        y += (intro.length * 5) + 8;
        
        // Explicar qué son las fases
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('¿Qué significan las fases?', margenIzq, y);
        y += 7;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const explicacionFases = [
            { fase: 'Fase 1 (Gobernanza)', desc: 'Tiene reglas claras y responsables definidos' },
            { fase: 'Fase 2 (Visibilidad)', desc: 'Conoce sus equipos, software y capacita a su personal' },
            { fase: 'Fase 3 (Protección)', desc: 'Tiene controles técnicos funcionando (backups, contraseñas, actualizaciones)' },
            { fase: 'Fase 4 (Respuesta)', desc: 'Sabe qué hacer si ocurre un incidente o ataque' }
        ];
        
        explicacionFases.forEach(item => {
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${item.fase}:`, margenIzq + 3, y);
            doc.setFont('helvetica', 'normal');
            const lineas = doc.splitTextToSize(item.desc, anchoUtil - 10);
            doc.text(lineas, margenIzq + 45, y);
            y += 6;
        });
        
        y += 8;
        
        // Comparación ACTUAL vs OBJETIVO con barras visuales
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Comparacion: Donde Esta Ahora vs. Hacia Donde Queremos Llevarlo', margenIzq, y);
        y += 10;
        
        // Para cada fase, mostrar barra de progreso ACTUAL → OBJETIVO
        const categoriasComp = [
            { nombre: 'Gobernanza', fase: 0 },
            { nombre: 'Visibilidad', fase: 1 },
            { nombre: 'Proteccion', fase: 2 },
            { nombre: 'Respuesta', fase: 3 }
        ];
        
        categoriasComp.forEach(cat => {
            const puntajeActual = perfilActualCalculado.porFase[cat.fase];
            const porcentajeActual = Math.round(puntajeActual * 100);
            
            // Obtener objetivo de forma segura
            let nivelObjetivo = 0.75; // Default: 75%
            if (perfilObjetivoCalculado && perfilObjetivoCalculado.porFase && perfilObjetivoCalculado.porFase[cat.fase] !== undefined) {
                nivelObjetivo = perfilObjetivoCalculado.porFase[cat.fase];
            }
            const porcentajeObjetivo = Math.round(nivelObjetivo * 100);
            
            // Determinar color actual
            let colorActual;
            if (porcentajeActual < 40) {
                colorActual = [220, 38, 38]; // Rojo
            } else if (porcentajeActual < 70) {
                colorActual = [234, 179, 8]; // Naranja
            } else {
                colorActual = [34, 197, 94]; // Verde
            }
            
            // Nombre de fase
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text(cat.nombre, margenIzq + 3, y);
            y += 6;
            
            // Barra ACTUAL
            const anchoBarra = 110;
            const altoBarra = 6;
            const anchoProgresoActual = (porcentajeActual / 100) * anchoBarra;
            
            // Etiqueta "ACTUAL"
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('ACTUAL:', margenIzq + 8, y);
            y += 4;
            
            // Fondo de la barra
            doc.setFillColor(240, 240, 240);
            doc.rect(margenIzq + 8, y - 3, anchoBarra, altoBarra, 'F');
            
            // Progreso actual
            doc.setFillColor(...colorActual);
            doc.rect(margenIzq + 8, y - 3, anchoProgresoActual, altoBarra, 'F');
            
            // Porcentaje actual
            doc.setTextColor(...colorActual);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text(`${porcentajeActual}%`, margenIzq + anchoBarra + 12, y);
            doc.setTextColor(0, 0, 0);
            
            y += 8;
            
            // Barra OBJETIVO
            const anchoProgresoObjetivo = (porcentajeObjetivo / 100) * anchoBarra;
            const colorObjetivo = [34, 139, 34]; // Verde oscuro para objetivo
            
            // Etiqueta "OBJETIVO"
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('OBJETIVO:', margenIzq + 8, y);
            y += 4;
            
            // Fondo de la barra
            doc.setFillColor(240, 240, 240);
            doc.rect(margenIzq + 8, y - 3, anchoBarra, altoBarra, 'F');
            
            // Progreso objetivo
            doc.setFillColor(...colorObjetivo);
            doc.rect(margenIzq + 8, y - 3, anchoProgresoObjetivo, altoBarra, 'F');
            
            // Porcentaje objetivo
            doc.setTextColor(...colorObjetivo);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text(`${porcentajeObjetivo}%`, margenIzq + anchoBarra + 12, y);
            doc.setTextColor(0, 0, 0);
            
            // Flecha de mejora si hay diferencia
            if (porcentajeObjetivo > porcentajeActual) {
                const diferencia = porcentajeObjetivo - porcentajeActual;
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(8);
                doc.setTextColor(34, 139, 34);
                doc.text(`+${diferencia}%`, margenIzq + anchoBarra + 30, y);
                doc.setTextColor(0, 0, 0);
            }
            
            y += 12;
        });
        
        y += 5;
        
        // Mensaje motivacional y explicativo
        doc.setFillColor(245, 250, 255); // Fondo azul muy claro
        doc.rect(margenIzq - 2, y - 2, anchoUtil + 4, 20, 'F');
        
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        const mensaje = doc.splitTextToSize(
            '>> IMPORTANTE: El plan de acción de la siguiente sección lo guiará paso a paso para alcanzar estos objetivos. ' +
            'No se trata de ser perfecto, sino de mejorar de forma realista y sostenible. ' +
            'Las brechas más críticas están priorizadas al principio.',
            anchoUtil - 4
        );
        doc.text(mensaje, margenIzq, y + 3);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        y += 25;
        
        // NOTA: Eliminamos completamente la sección "3. Brechas Identificadas" 
        // porque es redundante con el Plan de Acción y muy técnica para PyMEs
        
        // ==================
        // NUEVA PÁGINA: PLAN DE ACCIÓN
        // ==================
        doc.addPage();
        y = 20;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('3. Plan de Acción Recomendado', margenIzq, y);
        y += 10;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        
        // ==================
        // SECCIÓN DE INICIO RÁPIDO (¡NUEVO!)
        // ==================
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(220, 38, 38); // Rojo para destacar urgencia
        doc.text('>> INICIO RAPIDO: PRIMEROS PASOS CRITICOS', margenIzq, y);
        doc.setTextColor(0, 0, 0);
        y += 8;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('Si solo tiene 2-4 horas esta semana, comience por estas acciones:', margenIzq, y);
        y += 6;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        
        // Mostrar las 3 recomendaciones más críticas
        const recomendacionesCriticas = planDeAccion.filter(r => r.criticidad === 'Crítica').slice(0, 3);
        if (recomendacionesCriticas.length > 0) {
            recomendacionesCriticas.forEach((rec, index) => {
                if (y > 270) { doc.addPage(); y = 20; }
                doc.setFont('helvetica', 'bold');
                doc.text(`${index + 1}. ${rec.titulo}`, margenIzq + 3, y);
                y += 5;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                const lineaResumen = doc.splitTextToSize(`>> ${rec.que_implementar}`, anchoUtil - 9);
                doc.text(lineaResumen, margenIzq + 6, y);
                y += (lineaResumen.length * 4) + 3;
                doc.setFontSize(10);
            });
        } else {
            // Si no hay críticas, mostrar las 3 primeras del plan
            const primerasTres = planDeAccion.slice(0, 3);
            primerasTres.forEach((rec, index) => {
                if (y > 270) { doc.addPage(); y = 20; }
                doc.setFont('helvetica', 'bold');
                doc.text(`${index + 1}. ${rec.titulo}`, margenIzq + 3, y);
                y += 5;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                const lineaResumen = doc.splitTextToSize(`>> ${rec.que_implementar}`, anchoUtil - 9);
                doc.text(lineaResumen, margenIzq + 6, y);
                y += (lineaResumen.length * 4) + 3;
                doc.setFontSize(10);
            });
        }
        
        y += 8;
        
        // Línea separadora
        doc.setDrawColor(203, 213, 225);
        doc.line(margenIzq, y, margenDer, y);
        y += 12;
        
        // ==================
        // TÍTULO DE PLAN COMPLETO
        // ==================
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Plan de Implementación Completo por Fases', margenIzq, y);
        y += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        // Agrupar plan por fases
        const planPorFases = agruparPlanPorFases(planDeAccion); // Llama a la función local
        
        Object.keys(planPorFases).forEach(fase => {
            const recomendacionesFase = planPorFases[fase];

            // Control de página para el TÍTULO DE LA FASE
            if (y > 250) {
                doc.addPage();
                y = 20;
            }
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.text(`Fase ${fase}: ${obtenerNombreFase(parseInt(fase))}`, margenIzq, y); // Llama a la función local
            y += 8;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(`${recomendacionesFase.length} control(es) a implementar`, margenIzq, y);
            doc.setTextColor(0, 0, 0);
            y += 10;
            
            // --- INICIO DE LA MODIFICACIÓN: Imprimir campo 'pasos' correctamente ---
            
            // Si la fase NO tiene recomendaciones, mostrar mensaje
            if (recomendacionesFase.length === 0) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(150, 150, 150);
                doc.text('No hay controles pendientes en esta fase.', margenIzq + 3, y);
                doc.setTextColor(0, 0, 0);
                y += 10;
            }

            
            recomendacionesFase.forEach((recomendacion, index) => {
                
                // Control de página ANTES de imprimir una nueva recomendación
                // Dejamos más espacio (ej. 220) para asegurar que el título quepa
                if (y > 220) { 
                    doc.addPage();
                    y = 20;
                }
                
                // Título del Control (usando el 'titulo' de la plantilla)
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11); // Un poco más grande para el título
                doc.text(`${recomendacion.numero_prioridad}. ${recomendacion.titulo}`, margenIzq + 3, y);
                y += 6;
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100);
                doc.text(`Control: ${recomendacion.control_id} | Criticidad: ${recomendacion.criticidad}`, margenIzq + 6, y);
                doc.setTextColor(0, 0, 0);
                y += 6;
                
                doc.setFontSize(10);
                
                // 1. QUÉ IMPLEMENTAR (Texto completo, sin truncar)
                doc.setFont('helvetica', 'bold');
                doc.text('Qué implementar:', margenIzq + 6, y);
                y += 5;
                
                doc.setFont('helvetica', 'normal');
                let lineas = doc.splitTextToSize(recomendacion.que_implementar, anchoUtil - 9); 
                doc.text(lineas, margenIzq + 9, y);
                y += (lineas.length * 4) + 5; // Ajustamos el 'y' según las líneas

                // 2. POR QUÉ ES IMPORTANTE (¡NUEVO!)
                if (y > 260) { doc.addPage(); y = 20; }
                
                doc.setFont('helvetica', 'bold');
                doc.text('Por qué es importante:', margenIzq + 6, y);
                y += 5;
                
                doc.setFont('helvetica', 'normal');
                lineas = doc.splitTextToSize(recomendacion.por_que, anchoUtil - 9);
                doc.text(lineas, margenIzq + 9, y);
                y += (lineas.length * 4) + 5;

                // 3. PASOS SUGERIDOS
                if (y > 260) { doc.addPage(); y = 20; } 
                
                doc.setFont('helvetica', 'bold');
                doc.text('Pasos sugeridos:', margenIzq + 6, y);
                y += 5;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9.5); // Ligeramente más pequeño para los pasos
                recomendacion.pasos.forEach(paso => {
                    // Control de página por cada paso, para evitar cortes
                    if (y > 270) { 
                        doc.addPage(); 
                        y = 20; 
                    }
                    lineas = doc.splitTextToSize(`• ${paso}`, anchoUtil - 9);
                    doc.text(lineas, margenIzq + 9, y);
                    y += (lineas.length * 4) + 2; // Espacio entre pasos
                });
                
                y += 4; // Espacio extra
                doc.setFontSize(10);
                
                // 4. ESTIMACIÓN
                if (y > 270) { doc.addPage(); y = 20; }
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(80, 80, 80);
                
                // Construir string de estimación
                let estimacionStr = `Estimación: ${recomendacion.estimacion.tiempo} | ${recomendacion.estimacion.esfuerzo}`;                                
                doc.text(estimacionStr, margenIzq + 6, y);
                doc.setTextColor(0, 0, 0);
                y += 6;
                
                doc.setFontSize(10);
                
                // 5. RECURSOS RECOMENDADOS (¡NUEVO!)
                if (recomendacion.recursos && recomendacion.recursos.length > 0) {
                    if (y > 265) { doc.addPage(); y = 20; }
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(9);
                    doc.setTextColor(0, 100, 0); // Verde oscuro para destacar
                    doc.text('>> Recursos recomendados:', margenIzq + 6, y);
                    doc.setTextColor(0, 0, 0);
                    y += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    recomendacion.recursos.forEach(recurso => {
                        if (y > 275) { 
                            doc.addPage(); 
                            y = 20; 
                        }
                        lineas = doc.splitTextToSize(`• ${recurso}`, anchoUtil - 9);
                        doc.text(lineas, margenIzq + 9, y);
                        y += (lineas.length * 4) + 1;
                    });
                    y += 4;
                }
                
                y += 6; // Más espacio entre recomendaciones
                doc.setFontSize(10);
            });
            
            // --- FIN DE LA MODIFICACIÓN ---
            
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
    
    // NUEVO: Mapear prioridad (P5.2) a tiempo estimado de implementación
    const prioridadATiempo = {
        'Muy Alta': '3 meses',
        'Alta': '6 meses',
        'Media': '12 meses',
        'Baja': '18+ meses'
    };
    
    const tiempoEstimado = prioridadATiempo[respuestas['P5.2']] || '12 meses';
    
    return {
        empresa: respuestas['P0.1'] || 'No especificado',
        sector: respuestas['P0.2'] || 'No especificado',
        empleados: empleados,
        facturacion: respuestas['P0.4'] || 'No especificado',
        tecnologias: respuestas['P0.5'] || [],
        rto: respuestas['P5.1'] || 'No evaluado',
        tiempo_implementacion: tiempoEstimado,  // CAMBIADO: ahora se mapea desde prioridad
        prioridad_usuario: respuestas['P5.2'] || 'Media',  // NUEVO: guardar la prioridad original
        incidentes: respuestas['P5.3'] || 'No'
    };
}

/**
 * Agrupa el plan de acción por fases
 * @param {Array} plan - Plan de acción completo
 * @returns {Object} - Plan agrupado por fase {1: [...], 2: [...], ...}
 */
function agruparPlanPorFases(plan) {
    const porFases = {1:[], 2:[], 3:[], 4:[]}; // Inicializar todas las fases
    
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