/* ============================================ */
/* EVALUADOR.JS - CÁLCULO DEL PERFIL ACTUAL */
/* ============================================ */

// ============================================
// DEFINICIÓN DE LOS 16 CONTROLES DEL MODELO
// ============================================
const CONTROLES = [
    // FASE 1: GOBERNANZA (4 controles)
    {
        id: 'GV.RR-01',
        nombre: 'Liderazgo asume responsabilidad',
        fase: 1,
        funcion: 'GOVERN',
        pregunta_id: 'P1.1'
    },
    {
        id: 'GV.PO-01',
        nombre: 'Establecer políticas de seguridad',
        fase: 1,
        funcion: 'GOVERN',
        pregunta_id: 'P1.2'
    },
    {
        id: 'GV.OC-01',
        nombre: 'Comprender contexto organizacional',
        fase: 1,
        funcion: 'GOVERN',
        pregunta_id: 'P1.3'
    },
    {
        id: 'GV.RM-02',
        nombre: 'Determinar tolerancia al riesgo',
        fase: 1,
        funcion: 'GOVERN',
        pregunta_id: 'P1.4'
    },
    
    // FASE 2: VISIBILIDAD (4 controles)
    {
        id: 'ID.AM-01',
        nombre: 'Inventario de hardware',
        fase: 2,
        funcion: 'IDENTIFY',
        pregunta_id: 'P2.1'
    },
    {
        id: 'ID.AM-02',
        nombre: 'Inventario de software',
        fase: 2,
        funcion: 'IDENTIFY',
        pregunta_id: 'P2.2'
    },
    {
        id: 'PR.AT-01',
        nombre: 'Capacitación del personal',
        fase: 2,
        funcion: 'PROTECT',
        pregunta_id: 'P2.3'
    },
    {
        id: 'ID.RA-09',
        nombre: 'Evaluar autenticidad HW/SW',
        fase: 2,
        funcion: 'IDENTIFY',
        pregunta_id: 'P2.4'
    },
    
    // FASE 3: PROTECCIÓN (4 controles)
    {
        id: 'PR.AA-01',
        nombre: 'Gestión de identidades y credenciales',
        fase: 3,
        funcion: 'PROTECT',
        pregunta_id: 'P3.1'
    },
    {
        id: 'PR.AA-03',
        nombre: 'Autenticación multifactor (MFA)',
        fase: 3,
        funcion: 'PROTECT',
        pregunta_id: 'P3.2'
    },
    {
        id: 'PR.DS-11',
        nombre: 'Crear y comprobar backups',
        fase: 3,
        funcion: 'PROTECT',
        pregunta_id: 'P3.3'
    },
    {
        id: 'PR.PS-02',
        nombre: 'Mantenimiento software (parches)',
        fase: 3,
        funcion: 'PROTECT',
        pregunta_id: 'P3.4'
    },
    
    // FASE 4: DETECCIÓN Y RESPUESTA (4 controles)
    {
        id: 'ID.IM-04',
        nombre: 'Planes de respuesta y recuperación',
        fase: 4,
        funcion: 'IDENTIFY',
        pregunta_id: 'P4.1'
    },
    {
        id: 'DE.AE-08',
        nombre: 'Declarar incidentes formalmente',
        fase: 4,
        funcion: 'DETECT',
        pregunta_id: 'P4.2'
    },
    {
        id: 'RS.MI-01',
        nombre: 'Contener incidentes',
        fase: 4,
        funcion: 'RESPOND',
        pregunta_id: 'P4.3'
    },
    {
        id: 'RS.MI-02',
        nombre: 'Erradicar incidentes',
        fase: 4,
        funcion: 'RESPOND',
        pregunta_id: 'P4.4'
    }
];

// ============================================
// MAPEO DE RESPUESTAS A PUNTAJES (0-3)
// ============================================
const MAPEO_PUNTAJES = {
    // SECCIÓN 1: GOBERNANZA
    'P1.1': {
        'No hay alguien específico': 0,
        'Gerente General': 3,
        'Encargado TI interno': 3,
        'Proveedor TI externo': 3,
        'Varias personas sin claridad': 0
    },
    'P1.2': {
        'No tenemos políticas': 0,
        'Reglas informales': 1,
        'Políticas básicas': 2,
        'Políticas completas': 3
    },
    'P1.3': {
        'No se considera': 0,
        'Solo cuando surgen problemas': 1,
        'Informalmente': 2,
        'Proceso formal': 3
    },
    'P1.4': {
        'No lo hemos evaluado': 0,
        'Menos de 4 horas': 3,
        'Entre 4 horas y 1 día': 3,
        'Entre 1 y 3 días': 3,
        'Más de 3 días': 3
    },
    
    // SECCIÓN 2: VISIBILIDAD
    'P2.1': {
        'No tenemos inventario': 0,
        'Lista desactualizada': 1,
        'Inventario digital': 2,
        'Inventario automatizado': 3
    },
    'P2.2': {
        'No tenemos inventario': 0,
        'Lista desactualizada': 1,
        'Inventario digital': 2,
        'Inventario automatizado': 3
    },
    'P2.3': {
        'No, no se ha realizado ninguna capacitación': 0,
        'material informativo para lectura': 1,
        'charla o presentación breve': 2,
        'curso o taller más extenso': 3,
        'capacitaciones de forma regular': 3
    },
    'P2.4': {
        'Sin política': 0,
        'A veces no oficiales': 1,
        'Siempre oficiales': 2,
        'Con verificación': 3
    },
    
    // SECCIÓN 3: PROTECCIÓN
    'P3.1': {
        'Sin proceso': 0,
        'Cuando nos acordamos': 1,
        'Proceso informal': 2,
        'Proceso formal': 3
    },
    'P3.2': {
        'Solo contraseñas': 0,
        'Algunos sistemas': 1,
        'Mayoría sistemas': 2,
        'Todos sistemas': 3
    },
    'P3.3': {
        'Nunca': 0,
        'Cuando me acuerdo': 1,
        'Mensual': 1,
        'Semanal': 2,
        'Diario': 3
    },
    'P3.4': {
        'Nunca': 0,
        'De vez en cuando': 1,
        'Cuando avisan': 2,
        'Al día': 3
    },
    
    // SECCIÓN 4: DETECCIÓN Y RESPUESTA
    'P4.1': {
        'No tenemos plan': 0,
        'Sabemos a quién llamar': 1,
        'Plan básico': 2,
        'Plan detallado': 3
    },
    'P4.2': {
        'Caso a caso': 0,
        'Criterios informales': 1,
        'Criterios documentados': 2,
        'Criterios formalizados': 3
    },
    'P4.3': {
        'No sabríamos': 0,
        'Apagar equipo': 1,
        'Desconectar red': 2,
        'Procedimiento documentado': 3
    },
    'P4.4': {
        'No sabríamos': 0,
        'Con antivirus': 1,
        'Llamar proveedor': 2,
        'Procedimiento documentado': 3
    }
};

// ============================================
// FUNCIÓN PRINCIPAL: CALCULAR PERFIL ACTUAL
// ============================================

/**
 * Calcula el perfil de madurez actual de la empresa
 * @param {Object} respuestas - Respuestas del cuestionario
 * @returns {Object} - Perfil actual con puntajes detallados
 */
function calcularPerfilActual(respuestas) {
    console.log('🧮 Calculando perfil actual...');
    
    // Array para almacenar puntajes de los 16 controles
    const puntajesPorControl = [];
    
    // Recorrer los 16 controles
    CONTROLES.forEach((control, index) => {
        const preguntaId = control.pregunta_id;
        const respuesta = respuestas[preguntaId];
        
        // Obtener puntaje según la respuesta
        let puntaje = 0;
        if (respuesta && MAPEO_PUNTAJES[preguntaId] && MAPEO_PUNTAJES[preguntaId][respuesta] !== undefined) {
            puntaje = MAPEO_PUNTAJES[preguntaId][respuesta];
        } else {
            console.warn(`⚠️ Respuesta no encontrada para ${preguntaId}:`, respuesta);
        }
        
        puntajesPorControl.push({
            control_id: control.id,
            control_nombre: control.nombre,
            fase: control.fase,
            funcion: control.funcion,
            puntaje: puntaje,
            puntaje_maximo: 3
        });
    });
    
    // Calcular puntajes por fase (1-4)
    const porFase = calcularPuntajesPorFase(puntajesPorControl);
    
    // Calcular puntajes por función NIST
    const porFuncion = calcularPuntajesPorFuncion(puntajesPorControl);
    
    // Calcular puntaje global
    const puntajeGlobal = calcularPuntajeGlobal(puntajesPorControl);
    
    const perfilActual = {
        puntajesPorControl: puntajesPorControl,
        porFase: porFase,
        porFuncion: porFuncion,
        puntajeGlobal: puntajeGlobal
    };
    
    console.log('✅ Perfil actual calculado:', perfilActual);
    
    return perfilActual;
}

// ============================================
// FUNCIONES AUXILIARES DE CÁLCULO
// ============================================

/**
 * Calcula puntajes normalizados por fase (0-1)
 * @param {Array} puntajesPorControl - Array de puntajes por control
 * @returns {Array} - [puntajeFase1, puntajeFase2, puntajeFase3, puntajeFase4]
 */
function calcularPuntajesPorFase(puntajesPorControl) {
    const fases = [1, 2, 3, 4];
    const puntajesPorFase = [];
    
    fases.forEach(fase => {
        // Filtrar controles de esta fase
        const controlesFase = puntajesPorControl.filter(c => c.fase === fase);
        
        // Calcular suma de puntajes obtenidos
        const sumaObtenida = controlesFase.reduce((sum, c) => sum + c.puntaje, 0);
        
        // Calcular suma de puntajes máximos posibles
        const sumaMaxima = controlesFase.reduce((sum, c) => sum + c.puntaje_maximo, 0);
        
        // Normalizar a escala 0-1
        const puntajeNormalizado = sumaMaxima > 0 ? sumaObtenida / sumaMaxima : 0;
        
        puntajesPorFase.push(puntajeNormalizado);
    });
    
    return puntajesPorFase;
}

/**
 * Calcula puntajes normalizados por función NIST (0-1)
 * @param {Array} puntajesPorControl - Array de puntajes por control
 * @returns {Object} - {GOVERN: 0.5, IDENTIFY: 0.75, ...}
 */
function calcularPuntajesPorFuncion(puntajesPorControl) {
    const funciones = ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'];
    const puntajesPorFuncion = {};
    
    funciones.forEach(funcion => {
        // Filtrar controles de esta función
        const controlesFuncion = puntajesPorControl.filter(c => c.funcion === funcion);
        
        if (controlesFuncion.length > 0) {
            // Calcular suma de puntajes obtenidos
            const sumaObtenida = controlesFuncion.reduce((sum, c) => sum + c.puntaje, 0);
            
            // Calcular suma de puntajes máximos posibles
            const sumaMaxima = controlesFuncion.reduce((sum, c) => sum + c.puntaje_maximo, 0);
            
            // Normalizar a escala 0-1
            puntajesPorFuncion[funcion] = sumaMaxima > 0 ? sumaObtenida / sumaMaxima : 0;
        } else {
            // Si no hay controles de esta función, puntaje 0
            puntajesPorFuncion[funcion] = 0;
        }
    });
    
    return puntajesPorFuncion;
}

/**
 * Calcula el puntaje global normalizado (0-1)
 * @param {Array} puntajesPorControl - Array de puntajes por control
 * @returns {number} - Puntaje global entre 0 y 1
 */
function calcularPuntajeGlobal(puntajesPorControl) {
    // Suma total de puntajes obtenidos
    const sumaObtenida = puntajesPorControl.reduce((sum, c) => sum + c.puntaje, 0);
    
    // Suma total de puntajes máximos posibles (16 controles × 3 puntos cada uno = 48)
    const sumaMaxima = puntajesPorControl.reduce((sum, c) => sum + c.puntaje_maximo, 0);
    
    // Normalizar a escala 0-1
    return sumaMaxima > 0 ? sumaObtenida / sumaMaxima : 0;
}

// ============================================
// EXPORTAR PARA DEBUGGING
// ============================================
if (typeof window !== 'undefined') {
    window.evaluador = {
        controles: CONTROLES,
        mapeo: MAPEO_PUNTAJES,
        calcular: calcularPerfilActual
    };
}

console.log('✅ evaluador.js cargado correctamente');