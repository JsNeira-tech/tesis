/* ============================================ */
/* OBJETIVO.JS - DETERMINACIÓN DEL PERFIL OBJETIVO */
/* ============================================ */

// ============================================
// REGLAS DE DETERMINACIÓN DEL PERFIL OBJETIVO
// ============================================

/**
 * Determina el perfil objetivo (nivel de madurez recomendado) según el contexto de la empresa
 * @param {Object} contexto - Contexto organizacional de la empresa
 * @returns {Object} - Perfil objetivo con puntajes por control y metadata
 */
function determinarPerfilObjetivo(contexto) {
    console.log('🎯 Determinando perfil objetivo...');
    console.log('Contexto:', contexto);
    
    // ============================================
    // PASO 1: DETERMINAR FASE OBJETIVO BASE
    // ============================================
    let faseObjetivoBase = calcularFaseObjetivoBase(contexto.empleados);
    
    // ============================================
    // PASO 2: AJUSTES POR CRITICIDAD OPERACIONAL
    // ============================================
    faseObjetivoBase = ajustarPorCriticidad(faseObjetivoBase, contexto.rto);
    
    // ============================================
    // PASO 3: AJUSTES POR INCIDENTES PREVIOS
    // ============================================
    const funcionesPriorizadas = [];
    if (contexto.incidentes === 'Sí' || contexto.incidentes === 'No estoy seguro') {
        faseObjetivoBase += 0.5;
        funcionesPriorizadas.push('RESPOND', 'RECOVER', 'DETECT');
        console.log('⚠️ Ajuste por incidentes previos: +0.5 fases');
    }
    
    // ============================================
    // PASO 4: LIMITAR A RANGO VÁLIDO (2-4)
    // ============================================
    const faseObjetivoFinal = Math.max(2, Math.min(4, faseObjetivoBase));
    
    console.log(`📊 Fase objetivo calculada: ${faseObjetivoFinal} (de base ${faseObjetivoBase})`);
    
    // ============================================
    // PASO 5: GENERAR PERFIL POR CONTROL
    // ============================================
    const perfilPorControl = generarPerfilPorControl(faseObjetivoFinal, funcionesPriorizadas);
    
    // ============================================
    // PASO 6: CALCULAR PUNTAJES POR FASE Y FUNCIÓN
    // ============================================
    const porFase = calcularObjetivoPorFase(faseObjetivoFinal);
    const porFuncion = calcularObjetivoPorFuncion(perfilPorControl);
    
    const perfilObjetivo = {
        faseObjetivo: faseObjetivoFinal,
        funcionesPriorizadas: funcionesPriorizadas,
        perfilPorControl: perfilPorControl,
        porFase: porFase,
        porFuncion: porFuncion,
        contexto: contexto
    };
    
    console.log('✅ Perfil objetivo determinado:', perfilObjetivo);
    
    return perfilObjetivo;
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Calcula la fase objetivo base según el tamaño de la empresa
 * @param {number} empleados - Número de empleados
 * @returns {number} - Fase objetivo base (2, 3 o 4)
 */
function calcularFaseObjetivoBase(empleados) {
    if (empleados <= 10) {
        // Microempresa (1-10): Fase 2 (Visibilidad)
        console.log('📌 Microempresa detectada → Fase objetivo base: 2');
        return 2;
    } else if (empleados <= 50) {
        // Pequeña empresa (11-50): Fase 3 (Resiliencia)
        console.log('📌 Pequeña empresa detectada → Fase objetivo base: 3');
        return 3;
    } else {
        // Mediana empresa (51-100): Fase 4 (Madurez)
        console.log('📌 Mediana empresa detectada → Fase objetivo base: 4');
        return 4;
    }
}

/**
 * Ajusta la fase objetivo según la criticidad operacional (RTO)
 * @param {number} faseBase - Fase objetivo base
 * @param {string} rto - Tiempo de tolerancia a inactividad
 * @returns {number} - Fase ajustada
 */
function ajustarPorCriticidad(faseBase, rto) {
    // ACTUALIZADO: Reconoce las opciones completas del nuevo cuestionario
    
    // Alta criticidad: Menos de 4 horas
    if (rto === 'Menos de 4 horas' || rto.includes('Menos de 4 horas')) {
        console.log('⚠️ Alta criticidad (RTO < 4h) → Ajuste: +1 fase');
        return faseBase + 1;
    } 
    // Baja criticidad: Más de 3 días
    else if (rto === 'Más de 3 días' || rto.includes('Más de 3 días')) {
        console.log('ℹ️ Baja criticidad (RTO > 3 días) → Ajuste: -0.5 fases');
        return faseBase - 0.5;
    }
    // No evaluado: Sin ajuste (tratado como normal)
    else if (rto === 'No lo hemos evaluado' || rto === 'No evaluado' || rto.includes('No lo hemos evaluado')) {
        console.log('⚠️ RTO no evaluado → Sin ajuste (se recomienda evaluar)');
        return faseBase;
    }
    // Criticidad normal: Entre 4 horas y 3 días
    else {
        console.log('ℹ️ Criticidad normal → Sin ajuste');
        return faseBase;
    }
}

/**
 * Genera el perfil objetivo por control basado en la fase objetivo
 * @param {number} faseObjetivo - Fase objetivo final (puede tener decimales)
 * @param {Array} funcionesPriorizadas - Funciones NIST a priorizar
 * @returns {Array} - Array de 16 objetos con puntaje objetivo por control
 */
function generarPerfilPorControl(faseObjetivo, funcionesPriorizadas) {
    // Importar definición de controles desde evaluador.js
    // Si evaluador.js ya está cargado, usar window.evaluador.controles
    let controles;
    if (typeof CONTROLES !== 'undefined') {
        controles = CONTROLES;
    } else if (typeof window !== 'undefined' && window.evaluador) {
        controles = window.evaluador.controles;
    } else {
        // Fallback: redefinir controles aquí (no ideal, pero funciona)
        controles = [
            { id: 'GV.RR-01', fase: 1, funcion: 'GOVERN' },
            { id: 'GV.PO-01', fase: 1, funcion: 'GOVERN' },
            { id: 'GV.OC-01', fase: 1, funcion: 'GOVERN' },
            { id: 'GV.RM-02', fase: 1, funcion: 'GOVERN' },
            { id: 'ID.AM-01', fase: 2, funcion: 'IDENTIFY' },
            { id: 'ID.AM-02', fase: 2, funcion: 'IDENTIFY' },
            { id: 'PR.AT-01', fase: 2, funcion: 'PROTECT' },
            { id: 'ID.RA-09', fase: 2, funcion: 'IDENTIFY' },
            { id: 'PR.AA-01', fase: 3, funcion: 'PROTECT' },
            { id: 'PR.AA-03', fase: 3, funcion: 'PROTECT' },
            { id: 'PR.DS-11', fase: 3, funcion: 'PROTECT' },
            { id: 'PR.PS-02', fase: 3, funcion: 'PROTECT' },
            { id: 'ID.IM-04', fase: 4, funcion: 'IDENTIFY' },
            { id: 'DE.AE-08', fase: 4, funcion: 'DETECT' },
            { id: 'RS.MI-01', fase: 4, funcion: 'RESPOND' },
            { id: 'RS.MI-02', fase: 4, funcion: 'RESPOND' }
        ];
    }
    
    const perfilPorControl = [];
    
    controles.forEach(control => {
        let puntajeObjetivo;
        
        // Regla base: Si la fase del control <= fase objetivo, entonces puntaje = 3 (máximo)
        if (control.fase <= Math.floor(faseObjetivo)) {
            puntajeObjetivo = 3;
        } 
        // Si la fase del control es exactamente la fase objetivo con decimal
        // (ej: faseObjetivo = 3.5, control.fase = 4)
        else if (control.fase === Math.ceil(faseObjetivo) && faseObjetivo % 1 !== 0) {
            // Implementación parcial: puntaje 2
            puntajeObjetivo = 2;
        } 
        // Si la fase del control es mayor que la fase objetivo
        else {
            puntajeObjetivo = 0;
        }
        
        // Bonificación para funciones priorizadas (por incidentes previos)
        if (funcionesPriorizadas.includes(control.funcion) && puntajeObjetivo < 3) {
            puntajeObjetivo = Math.min(3, puntajeObjetivo + 1);
            console.log(`⭐ Bonificación aplicada a ${control.id} (función priorizada: ${control.funcion})`);
        }
        
        perfilPorControl.push({
            control_id: control.id,
            fase: control.fase,
            funcion: control.funcion,
            puntaje_objetivo: puntajeObjetivo,
            puntaje_maximo: 3
        });
    });
    
    return perfilPorControl;
}

/**
 * Calcula puntajes objetivo normalizados por fase (0-1)
 * @param {number} faseObjetivo - Fase objetivo final
 * @returns {Array} - [puntajeFase1, puntajeFase2, puntajeFase3, puntajeFase4]
 */
function calcularObjetivoPorFase(faseObjetivo) {
    const puntajesPorFase = [];
    
    for (let fase = 1; fase <= 4; fase++) {
        if (fase <= Math.floor(faseObjetivo)) {
            // Fase completamente dentro del objetivo: 1.0 (100%)
            puntajesPorFase.push(1.0);
        } else if (fase === Math.ceil(faseObjetivo) && faseObjetivo % 1 !== 0) {
            // Fase parcial: usar el decimal como porcentaje
            // Ejemplo: si faseObjetivo = 3.5, entonces fase 4 = 0.5 (50%)
            const decimal = faseObjetivo % 1;
            puntajesPorFase.push(decimal);
        } else {
            // Fase fuera del objetivo: 0.0
            puntajesPorFase.push(0.0);
        }
    }
    
    return puntajesPorFase;
}

/**
 * Calcula puntajes objetivo normalizados por función NIST (0-1)
 * @param {Array} perfilPorControl - Perfil objetivo por control
 * @returns {Object} - {GOVERN: 1.0, IDENTIFY: 0.75, ...}
 */
function calcularObjetivoPorFuncion(perfilPorControl) {
    const funciones = ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'];
    const puntajesPorFuncion = {};
    
    funciones.forEach(funcion => {
        // Filtrar controles de esta función
        const controlesFuncion = perfilPorControl.filter(c => c.funcion === funcion);
        
        if (controlesFuncion.length > 0) {
            // Calcular suma de puntajes objetivo
            const sumaObjetivo = controlesFuncion.reduce((sum, c) => sum + c.puntaje_objetivo, 0);
            
            // Calcular suma de puntajes máximos posibles
            const sumaMaxima = controlesFuncion.reduce((sum, c) => sum + c.puntaje_maximo, 0);
            
            // Normalizar a escala 0-1
            puntajesPorFuncion[funcion] = sumaMaxima > 0 ? sumaObjetivo / sumaMaxima : 0;
        } else {
            // Si no hay controles de esta función, puntaje 0
            puntajesPorFuncion[funcion] = 0;
        }
    });
    
    return puntajesPorFuncion;
}

// ============================================
// FUNCIONES DE UTILIDAD PARA REPORTES
// ============================================

/**
 * Obtiene una descripción textual del perfil objetivo
 * @param {Object} perfilObjetivo - Perfil objetivo calculado
 * @returns {string} - Descripción legible del perfil
 */
function obtenerDescripcionObjetivo(perfilObjetivo) {
    const fase = perfilObjetivo.faseObjetivo;
    const empleados = perfilObjetivo.contexto.empleados;
    
    let descripcion = `Su empresa (${empleados} empleados) debe aspirar a alcanzar la Fase ${Math.floor(fase)}`;
    
    if (fase % 1 !== 0) {
        descripcion += ` con implementación parcial de la Fase ${Math.ceil(fase)}`;
    }
    
    descripcion += ' del modelo de madurez. ';
    
    // Descripción por fase
    const descripciones = {
        2: 'Esto implica tener fundamentos sólidos de gobernanza y visibilidad completa de sus activos tecnológicos.',
        3: 'Esto implica contar con gobernanza, visibilidad de activos y controles técnicos de protección implementados.',
        4: 'Esto implica alcanzar madurez completa con capacidades avanzadas de detección y respuesta ante incidentes.'
    };
    
    descripcion += descripciones[Math.floor(fase)] || '';
    
    if (perfilObjetivo.funcionesPriorizadas.length > 0) {
        descripcion += ` Debido a incidentes previos, se recomienda priorizar las funciones: ${perfilObjetivo.funcionesPriorizadas.join(', ')}.`;
    }
    
    return descripcion;
}

/**
 * Calcula el tiempo estimado para alcanzar el perfil objetivo
 * @param {Object} perfilObjetivo - Perfil objetivo calculado
 * @param {string} tiempoDisponible - Tiempo que la empresa tiene disponible
 * @returns {Object} - {meses: 12, factible: true, recomendacion: "..."}
 */
function estimarTiempoImplementacion(perfilObjetivo, tiempoDisponible) {
    const fase = perfilObjetivo.faseObjetivo;
    
    // Estimación base de tiempo por fase (en meses)
    const tiempoPorFase = {
        1: 2,  // Fase 1: 2 meses
        2: 4,  // Fase 2: 4 meses (acumulado: 6 meses)
        3: 6,  // Fase 3: 6 meses (acumulado: 12 meses)
        4: 6   // Fase 4: 6 meses (acumulado: 18 meses)
    };
    
    // Calcular tiempo total estimado
    let mesesEstimados = 0;
    for (let f = 1; f <= Math.ceil(fase); f++) {
        if (f < Math.ceil(fase)) {
            mesesEstimados += tiempoPorFase[f];
        } else if (fase % 1 !== 0) {
            // Fase parcial
            mesesEstimados += tiempoPorFase[f] * (fase % 1);
        } else {
            mesesEstimados += tiempoPorFase[f];
        }
    }
    
    // Convertir tiempo disponible a meses
    const tiempoDisponibleMap = {
        '3 meses': 3,
        '6 meses': 6,
        '12 meses': 12,
        '18+ meses': 18
    };
    
    const mesesDisponibles = tiempoDisponibleMap[tiempoDisponible] || 12;
    
    // Evaluar factibilidad
    const factible = mesesEstimados <= mesesDisponibles;
    
    let recomendacion = '';
    if (factible) {
        recomendacion = `El tiempo estimado (${Math.round(mesesEstimados)} meses) es alcanzable con su disponibilidad de ${tiempoDisponible}.`;
    } else {
        const diferencia = Math.round(mesesEstimados - mesesDisponibles);
        recomendacion = `El tiempo estimado (${Math.round(mesesEstimados)} meses) excede su disponibilidad (${tiempoDisponible}). `;
        recomendacion += `Considere: (1) Extender el plazo ${diferencia} meses más, o (2) Priorizar solo los controles críticos de cada fase.`;
    }
    
    return {
        mesesEstimados: Math.round(mesesEstimados),
        mesesDisponibles: mesesDisponibles,
        factible: factible,
        recomendacion: recomendacion
    };
}

// ============================================
// EXPORTAR PARA DEBUGGING
// ============================================
if (typeof window !== 'undefined') {
    window.objetivo = {
        determinar: determinarPerfilObjetivo,
        descripcion: obtenerDescripcionObjetivo,
        tiempoEstimado: estimarTiempoImplementacion
    };
}

console.log('✅ objetivo.js cargado correctamente');