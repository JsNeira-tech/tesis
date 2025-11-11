/* ============================================ */
/* BRECHAS.JS - IDENTIFICACIÓN Y PRIORIZACIÓN DE BRECHAS */
/* ============================================ */

// ============================================
// FUNCIÓN PRINCIPAL: IDENTIFICAR BRECHAS
// ============================================

/**
 * Identifica las brechas entre el perfil actual y el perfil objetivo
 * @param {Object} perfilActual - Perfil de madurez actual de la empresa
 * @param {Object} perfilObjetivo - Perfil objetivo recomendado
 * @returns {Array} - Array de brechas priorizadas
 */
function identificarBrechas(perfilActual, perfilObjetivo) {
    console.log('🔍 Identificando brechas...');
    
    const brechas = [];
    
    // Obtener arrays de puntajes por control
    const controlesActuales = perfilActual.puntajesPorControl;
    const controlesObjetivo = perfilObjetivo.perfilPorControl;
    
    // Verificar que ambos arrays tengan la misma longitud (16 controles)
    if (controlesActuales.length !== controlesObjetivo.length) {
        console.error('❌ Error: Los perfiles no tienen la misma cantidad de controles');
        return [];
    }
    
    // Recorrer los 16 controles
    for (let i = 0; i < controlesActuales.length; i++) {
        const actual = controlesActuales[i];
        const objetivo = controlesObjetivo[i];
        
        // Verificar que sean el mismo control
        if (actual.control_id !== objetivo.control_id) {
            console.warn(`⚠️ Desajuste de controles en índice ${i}: ${actual.control_id} vs ${objetivo.control_id}`);
            continue;
        }
        
        // Calcular brecha (diferencia entre objetivo y actual)
        const valorBrecha = objetivo.puntaje_objetivo - actual.puntaje;
        
        // Solo registrar si hay brecha positiva (puntaje actual < objetivo)
        if (valorBrecha > 0) {
            brechas.push({
                control_id: actual.control_id,
                control_nombre: actual.control_nombre,
                fase: actual.fase,
                funcion: actual.funcion,
                puntaje_actual: actual.puntaje,
                puntaje_objetivo: objetivo.puntaje_objetivo,
                puntaje_maximo: actual.puntaje_maximo,
                brecha: valorBrecha,
                criticidad: calcularCriticidad(valorBrecha, actual.puntaje),
                porcentaje_brecha: (valorBrecha / actual.puntaje_maximo) * 100
            });
        }
    }
    
    console.log(`📊 Se identificaron ${brechas.length} brechas`);
    
    // Priorizar brechas según múltiples criterios
    const brechasPriorizadas = priorizarBrechas(brechas, perfilObjetivo.funcionesPriorizadas);
    
    console.log('✅ Brechas identificadas y priorizadas:', brechasPriorizadas);
    
    return brechasPriorizadas;
}

// ============================================
// CÁLCULO DE CRITICIDAD
// ============================================

/**
 * Calcula la criticidad de una brecha
 * @param {number} valorBrecha - Magnitud de la brecha (0-3)
 * @param {number} puntajeActual - Puntaje actual del control (0-3)
 * @returns {string} - Nivel de criticidad: 'Crítica', 'Alta', 'Media'
 */
function calcularCriticidad(valorBrecha, puntajeActual) {
    // Brecha crítica: Control completamente ausente (puntaje actual = 0)
    if (puntajeActual === 0) {
        return 'Crítica';
    }
    
    // Brecha alta: Control con implementación muy básica (puntaje actual = 1)
    // o brecha muy grande (>= 2 puntos)
    if (puntajeActual === 1 || valorBrecha >= 2) {
        return 'Alta';
    }
    
    // Brecha media: Cualquier otro caso
    return 'Media';
}

// ============================================
// PRIORIZACIÓN DE BRECHAS
// ============================================

/**
 * Prioriza las brechas según múltiples criterios
 * @param {Array} brechas - Array de brechas identificadas
 * @param {Array} funcionesPriorizadas - Funciones NIST a priorizar
 * @returns {Array} - Brechas ordenadas por prioridad
 */
function priorizarBrechas(brechas, funcionesPriorizadas) {
    console.log('🎯 Priorizando brechas...');
    
    // Calcular puntaje de prioridad para cada brecha
    const brechasConPrioridad = brechas.map(brecha => {
        const puntajePrioridad = calcularPuntajePrioridad(brecha, funcionesPriorizadas);
        return {
            ...brecha, puntaje_prioridad: puntajePrioridad
        };
    });
    
    // Ordenar por puntaje de prioridad (descendente)
    brechasConPrioridad.sort((a, b) => b.puntaje_prioridad - a.puntaje_prioridad);
    
    // Asignar número de prioridad (1 = más prioritario)
    brechasConPrioridad.forEach((brecha, index) => {
        brecha.numero_prioridad = index + 1;
    });
    
    return brechasConPrioridad;
}

/**
 * Calcula el puntaje de prioridad de una brecha según múltiples criterios
 * @param {Object} brecha - Brecha a evaluar
 * @param {Array} funcionesPriorizadas - Funciones NIST a priorizar
 * @returns {number} - Puntaje de prioridad (0-10)
 */
function calcularPuntajePrioridad(brecha, funcionesPriorizadas) {
    let puntaje = 0;
    
    // ============================================
    // CRITERIO 1: FASE DEL CONTROL (40% del peso)
    // Fases anteriores tienen mayor prioridad
    // ============================================
    const puntajesPorFase = {
        1: 4.0,  // Fase 1: Máxima prioridad
        2: 3.0,  // Fase 2: Alta prioridad
        3: 2.0,  // Fase 3: Media prioridad
        4: 1.0   // Fase 4: Baja prioridad
    };
    puntaje += puntajesPorFase[brecha.fase] || 0;
    
    // ============================================
    // CRITERIO 2: CRITICIDAD DE LA BRECHA (35% del peso)
    // Brechas más grandes son más prioritarias
    // ============================================
    const puntajesPorCriticidad = {
        'Crítica': 3.5,  // Control ausente
        'Alta': 2.5,     // Control muy básico
        'Media': 1.5     // Control parcial
    };
    puntaje += puntajesPorCriticidad[brecha.criticidad] || 0;
    
    // ============================================
    // CRITERIO 3: FUNCIÓN NIST PRIORIZADA (25% del peso)
    // Funciones priorizadas por incidentes previos
    // ============================================
    if (funcionesPriorizadas.includes(brecha.funcion)) {
        puntaje += 2.5;
        console.log(`⭐ Bonificación de prioridad para ${brecha.control_id} (función priorizada: ${brecha.funcion})`);
    }
    
    return puntaje;
}

// ============================================
// ANÁLISIS DE BRECHAS
// ============================================

/**
 * Genera un resumen estadístico de las brechas
 * @param {Array} brechas - Array de brechas identificadas
 * @returns {Object} - Resumen estadístico
 */
function generarResumenBrechas(brechas) {
    const resumen = {
        total: brechas.length,
        por_criticidad: {
            criticas: brechas.filter(b => b.criticidad === 'Crítica').length,
            altas: brechas.filter(b => b.criticidad === 'Alta').length,
            medias: brechas.filter(b => b.criticidad === 'Media').length
        },
        por_fase: {
            fase_1: brechas.filter(b => b.fase === 1).length,
            fase_2: brechas.filter(b => b.fase === 2).length,
            fase_3: brechas.filter(b => b.fase === 3).length,
            fase_4: brechas.filter(b => b.fase === 4).length
        },
        por_funcion: {
            GOVERN: brechas.filter(b => b.funcion === 'GOVERN').length,
            IDENTIFY: brechas.filter(b => b.funcion === 'IDENTIFY').length,
            PROTECT: brechas.filter(b => b.funcion === 'PROTECT').length,
            DETECT: brechas.filter(b => b.funcion === 'DETECT').length,
            RESPOND: brechas.filter(b => b.funcion === 'RESPOND').length,
            RECOVER: brechas.filter(b => b.funcion === 'RECOVER').length
        },
        brecha_promedio: brechas.length > 0 
            ? brechas.reduce((sum, b) => sum + b.brecha, 0) / brechas.length 
            : 0
    };
    
    return resumen;
}

/**
 * Agrupa brechas por fase para facilitar la planificación
 * @param {Array} brechas - Array de brechas priorizadas
 * @returns {Object} - Brechas agrupadas por fase {1: [...], 2: [...], ...}
 */
function agruparBrechasPorFase(brechas) {
    const brechasPorFase = {
        1: [],
        2: [],
        3: [],
        4: []
    };
    
    brechas.forEach(brecha => {
        if (brechasPorFase[brecha.fase]) {
            brechasPorFase[brecha.fase].push(brecha);
        }
    });
    
    return brechasPorFase;
}

/**
 * Agrupa brechas por función NIST
 * @param {Array} brechas - Array de brechas priorizadas
 * @returns {Object} - Brechas agrupadas por función
 */
function agruparBrechasPorFuncion(brechas) {
    const brechasPorFuncion = {
        GOVERN: [],
        IDENTIFY: [],
        PROTECT: [],
        DETECT: [],
        RESPOND: [],
        RECOVER: []
    };
    
    brechas.forEach(brecha => {
        if (brechasPorFuncion[brecha.funcion]) {
            brechasPorFuncion[brecha.funcion].push(brecha);
        }
    });
    
    return brechasPorFuncion;
}

// ============================================
// UTILIDADES PARA REPORTES
// ============================================

/**
 * Genera una descripción textual de una brecha
 * @param {Object} brecha - Brecha a describir
 * @returns {string} - Descripción legible
 */
function describirBrecha(brecha) {
    let descripcion = `Control ${brecha.control_id} (${brecha.control_nombre}): `;
    
    // Describir estado actual
    if (brecha.puntaje_actual === 0) {
        descripcion += 'Actualmente NO IMPLEMENTADO. ';
    } else if (brecha.puntaje_actual === 1) {
        descripcion += 'Implementación INICIAL/AD-HOC. ';
    } else if (brecha.puntaje_actual === 2) {
        descripcion += 'Implementación BÁSICA. ';
    } else {
        descripcion += 'Implementación COMPLETA. ';
    }
    
    // Describir objetivo
    if (brecha.puntaje_objetivo === 3) {
        descripcion += 'Se requiere implementación COMPLETA Y FORMALIZADA.';
    } else if (brecha.puntaje_objetivo === 2) {
        descripcion += 'Se requiere implementación BÁSICA DOCUMENTADA.';
    } else {
        descripcion += 'Se requiere implementación INICIAL.';
    }
    
    // Agregar criticidad
    descripcion += ` [${brecha.criticidad.toUpperCase()}]`;
    
    return descripcion;
}

/**
 * Genera un mensaje de priorización para el usuario
 * @param {Array} brechas - Array de brechas priorizadas
 * @returns {string} - Mensaje de recomendación
 */
function generarMensajePriorizacion(brechas) {
    if (brechas.length === 0) {
        return '¡Excelente! Su empresa no presenta brechas significativas. Mantener los controles actuales es suficiente.';
    }
    
    const criticas = brechas.filter(b => b.criticidad === 'Crítica').length;
    const altas = brechas.filter(b => b.criticidad === 'Alta').length;
    
    let mensaje = `Se identificaron ${brechas.length} controles que requieren mejora. `;
    
    if (criticas > 0) {
        mensaje += `${criticas} control(es) CRÍTICO(S) (ausentes) deben implementarse de inmediato. `;
    }
    
    if (altas > 0) {
        mensaje += `${altas} control(es) de ALTA prioridad requieren mejora significativa. `;
    }
    
    mensaje += '\n\nRecomendación: Implementar los controles en el orden de prioridad indicado, ';
    mensaje += 'comenzando por las brechas críticas de Fase 1 (Gobernanza).';
    
    return mensaje;
}

/**
 * Calcula el esfuerzo total estimado para cerrar todas las brechas
 * @param {Array} brechas - Array de brechas priorizadas
 * @returns {Object} - Estimación de esfuerzo total
 */
function estimarEsfuerzoTotal(brechas) {
    // Estimación de horas por punto de brecha y por fase
    const horasPorPunto = {
        1: 15,  // Fase 1: 15 horas por punto (controles organizacionales)
        2: 20,  // Fase 2: 20 horas por punto (inventarios, capacitación)
        3: 25,  // Fase 3: 25 horas por punto (controles técnicos)
        4: 30   // Fase 4: 30 horas por punto (procesos de respuesta)
    };
    
    let horasTotales = 0;
    let costoEstimado = 0;
    
    brechas.forEach(brecha => {
        const horasPorFase = horasPorPunto[brecha.fase] || 20;
        const horasBrecha = brecha.brecha * horasPorFase;
        horasTotales += horasBrecha;
        
        // Costo estimado: $50.000 CLP por hora (promedio Chile)
        costoEstimado += horasBrecha * 50000;
    });
    
    // Calcular meses de trabajo (asumiendo 20 horas/semana dedicadas)
    const semanas = Math.ceil(horasTotales / 20);
    const meses = Math.ceil(semanas / 4);
    
    return {
        horas_totales: Math.round(horasTotales),
        costo_estimado_clp: Math.round(costoEstimado),
        semanas: semanas,
        meses: meses,
        nota: 'Estimación basada en implementación con recursos internos. ' +
              'El uso de consultores externos puede reducir el tiempo pero aumentar costos.'
    };
}

// ============================================
// EXPORTAR PARA DEBUGGING
// ============================================
if (typeof window !== 'undefined') {
    window.brechas = {
        identificar: identificarBrechas,
        resumen: generarResumenBrechas,
        agruparPorFase: agruparBrechasPorFase,
        agruparPorFuncion: agruparBrechasPorFuncion,
        describir: describirBrecha,
        mensaje: generarMensajePriorizacion,
        esfuerzo: estimarEsfuerzoTotal
    };
}

console.log('✅ brechas.js cargado correctamente');