/* ============================================ */
/* RECOMENDACIONES.JS - GENERACIÓN DEL PLAN DE ACCIÓN */
/* ============================================ */

// ============================================
// PLANTILLAS DE RECOMENDACIONES POR CONTROL
// ============================================

const PLANTILLAS_RECOMENDACIONES = {
    // ==========================================
    // FASE 1: GOBERNANZA
    // ==========================================
    'GV.RR-01': {
        titulo: 'Designar responsable de ciberseguridad',
        que_implementar: 'Designar formalmente a una persona responsable de supervisar la ciberseguridad en la organización, con autoridad para tomar decisiones y coordinar acciones de seguridad.',
        por_que: 'Sin un responsable claro, las iniciativas de seguridad no tienen liderazgo, lo que resulta en acciones descoordinadas, falta de seguimiento y vulnerabilidades prolongadas.',
        pasos: [
            'Identificar a la persona más adecuada (gerente general, encargado TI, o consultor externo)',
            'Formalizar la designación por escrito (memorándum o actualización de descripción de cargo)',
            'Definir responsabilidades específicas (ej: aprobar compras de seguridad, coordinar respuesta a incidentes)',
            'Comunicar la designación a toda la organización',
            'Establecer reuniones periódicas de revisión de seguridad (mínimo mensual)'
        ],
        estimacion: {
            tiempo: '1-2 semanas',
            esfuerzo: '10-15 horas totales',
            responsable: 'Gerencia / Directorio',
            inversion: '$0 (sin costo adicional si es personal interno)'
        },
        recursos: [
            'Plantilla de memorándum de designación',
            'Guía de roles y responsabilidades en ciberseguridad (INCIBE)',
            'Checklist de tareas del responsable de seguridad'
        ]
    },
    
    'GV.PO-01': {
        titulo: 'Establecer políticas de ciberseguridad',
        que_implementar: 'Crear y documentar políticas básicas de ciberseguridad que establezcan reglas claras para el uso de sistemas, datos y dispositivos en la organización.',
        por_que: 'Las políticas son el fundamento de cualquier programa de seguridad. Sin reglas claras y comunicadas, los empleados no saben qué comportamientos son esperados, lo que aumenta significativamente el riesgo de incidentes por error humano.',
        pasos: [
            'Definir política de contraseñas (longitud mínima 12 caracteres, cambio cada 90 días, no reutilizar)',
            'Definir política de uso aceptable de email y navegación web (prohibir descargas sospechosas, enlaces desconocidos)',
            'Definir política de dispositivos móviles (BYOD o solo corporativos, cifrado obligatorio)',
            'Definir procedimiento de reporte de incidentes sospechosos (a quién contactar, cómo reportar)',
            'Documentar las políticas en un documento único (3-5 páginas máximo)',
            'Comunicar las políticas a todo el personal (reunión + entrega de documento firmado)',
            'Establecer proceso de actualización anual'
        ],
        estimacion: {
            tiempo: '2-4 semanas',
            esfuerzo: '20-30 horas totales',
            responsable: 'Responsable de seguridad + Gerencia',
            inversion: '$0-$500.000 CLP (consultoría opcional para revisión)'
        },
        recursos: [
            'Plantilla de políticas básicas para PyMEs (CSIRT Chile)',
            'Guía de redacción de políticas (INCIBE España)',
            'Ejemplos de políticas adaptables a su sector'
        ]
    },
    
    'GV.OC-01': {
        titulo: 'Integrar ciberseguridad en decisiones del negocio',
        que_implementar: 'Establecer un proceso formal para considerar los riesgos de ciberseguridad en las decisiones estratégicas y operativas de la empresa.',
        por_que: 'Si la seguridad no se considera en las decisiones de negocio (ej: adoptar nueva tecnología, abrir sucursal con trabajo remoto), se generan vulnerabilidades no gestionadas que pueden materializarse en incidentes costosos.',
        pasos: [
            'Incluir ciberseguridad como punto fijo en reuniones de gerencia (mínimo mensual)',
            'Establecer checklist de seguridad para nuevos proyectos tecnológicos',
            'Definir criterios mínimos de seguridad para proveedores TI',
            'Documentar decisiones de riesgo aceptado (cuándo y por qué se acepta un riesgo)',
            'Revisar trimestralmente el estado de los riesgos principales'
        ],
        estimacion: {
            tiempo: '2-3 semanas',
            esfuerzo: '15-20 horas totales',
            responsable: 'Responsable de seguridad + Gerencia',
            inversion: '$0 (proceso interno)'
        },
        recursos: [
            'Plantilla de checklist de seguridad para proyectos',
            'Formato de matriz de riesgos simplificada',
            'Guía de evaluación de proveedores TI'
        ]
    },
    
    'GV.RM-02': {
        titulo: 'Definir tolerancia al riesgo',
        que_implementar: 'Evaluar y documentar cuánta pérdida de datos o tiempo de inactividad puede tolerar la organización sin comprometer su operación crítica.',
        por_que: 'Conocer la tolerancia al riesgo permite priorizar inversiones en seguridad de manera efectiva. Sin esta evaluación, se invierte en controles inadecuados o se subestiman riesgos críticos.',
        pasos: [
            'Identificar procesos críticos del negocio (ej: facturación, atención clientes)',
            'Estimar tiempo máximo tolerable sin cada proceso (RTO - Recovery Time Objective)',
            'Estimar pérdida máxima de datos tolerable (RPO - Recovery Point Objective)',
            'Documentar impacto financiero de la interrupción (por hora/día)',
            'Comunicar estos límites al equipo técnico y proveedores',
            'Revisar anualmente o cuando cambien procesos críticos'
        ],
        estimacion: {
            tiempo: '1-2 semanas',
            esfuerzo: '10-15 horas totales',
            responsable: 'Gerencia + Responsable de seguridad',
            inversion: '$0 (análisis interno)'
        },
        recursos: [
            'Plantilla de análisis de impacto al negocio (BIA)',
            'Calculadora de costo de interrupción',
            'Guía de definición de RTO/RPO'
        ]
    },
    
    // ==========================================
    // FASE 2: VISIBILIDAD Y CAPACITACIÓN
    // ==========================================
    'ID.AM-01': {
        titulo: 'Crear inventario de hardware',
        que_implementar: 'Documentar todos los equipos tecnológicos de la empresa (computadores, notebooks, tablets, servidores, routers) con información básica de cada uno.',
        por_que: 'No se puede proteger lo que no se conoce. Sin inventario, es imposible saber qué equipos tienen vulnerabilidades, cuáles necesitan actualizaciones, o detectar equipos no autorizados en la red.',
        pasos: [
            'Crear hoja de cálculo Excel con columnas: ID Equipo, Tipo, Marca/Modelo, Usuario Asignado, Ubicación, Fecha Compra',
            'Realizar recorrido físico por oficinas identificando todos los equipos',
            'Registrar información de cada equipo (puede usar etiquetas físicas con ID)',
            'Asignar responsable de cada equipo',
            'Establecer proceso de actualización (agregar/eliminar equipos cuando ocurran cambios)',
            'Revisar y actualizar el inventario trimestralmente'
        ],
        estimacion: {
            tiempo: '1-2 semanas',
            esfuerzo: '15-25 horas (según cantidad de equipos)',
            responsable: 'Responsable TI o persona designada',
            inversion: '$0-$200.000 CLP (software de inventario opcional)'
        },
        recursos: [
            'Plantilla Excel de inventario de hardware',
            'Herramientas gratuitas de escaneo de red (ej: Advanced IP Scanner)',
            'Guía de etiquetado de activos'
        ]
    },
    
    'ID.AM-02': {
        titulo: 'Crear inventario de software',
        que_implementar: 'Documentar todos los programas y servicios en la nube que utiliza la empresa, incluyendo licencias y fechas de vencimiento.',
        por_que: 'El software desactualizado o sin licencias válidas es una puerta de entrada común para ataques. Además, las licencias vencidas pueden resultar en pérdida de servicio crítico en el momento menos oportuno.',
        pasos: [
            'Crear hoja de cálculo con columnas: Nombre Software, Versión, Proveedor, N° Licencias, Fecha Vencimiento, Costo Anual',
            'Listar software instalado en equipos (Windows, Office, antivirus, software especializado)',
            'Listar servicios en la nube (Gmail, Drive, Dropbox, sistemas de facturación online)',
            'Verificar fechas de vencimiento de licencias',
            'Identificar software sin licencia o pirata (debe eliminarse o regularizarse)',
            'Establecer alertas de vencimiento (30 días antes)',
            'Actualizar mensualmente'
        ],
        estimacion: {
            tiempo: '1-2 semanas',
            esfuerzo: '15-20 horas totales',
            responsable: 'Responsable TI + Administrativo',
            inversion: '$0 (inventario manual)'
        },
        recursos: [
            'Plantilla Excel de inventario de software',
            'Herramienta de auditoría de software instalado (ej: Belarc Advisor - gratuito)',
            'Checklist de software crítico por sector'
        ]
    },
    
    'PR.AT-01': {
        titulo: 'Capacitar al personal en ciberseguridad',
        que_implementar: 'Proporcionar capacitación básica a todos los empleados sobre amenazas comunes (phishing, ransomware) y buenas prácticas de seguridad.',
        por_que: 'El 90% de los incidentes de seguridad involucran error humano. Personal capacitado es la primera línea de defensa contra ataques de ingeniería social como phishing.',
        pasos: [
            'Contratar charla de sensibilización (1-2 horas) con proveedor especializado o CSIRT Chile',
            'Cubrir temas esenciales: identificar emails sospechosos, crear contraseñas seguras, reportar incidentes',
            'Realizar simulacro de phishing (enviar email de prueba y evaluar quién cae)',
            'Entregar material de referencia (guía de bolsillo o infografía)',
            'Establecer capacitación anual obligatoria para todo el personal',
            'Incluir capacitación en proceso de onboarding de nuevos empleados'
        ],
        estimacion: {
            tiempo: '1 mes (preparación + ejecución)',
            esfuerzo: '20-30 horas totales',
            responsable: 'Responsable de seguridad + RRHH',
            inversion: '$300.000-$800.000 CLP (charla externa) o $0 (interna con material gratuito)'
        },
        recursos: [
            'Material gratuito de concienciación (INCIBE, CSIRT Chile)',
            'Plataformas de simulación de phishing (ej: KnowBe4 tiene versión gratuita)',
            'Videos educativos en YouTube sobre ciberseguridad básica'
        ]
    },
    
    'ID.RA-09': {
        titulo: 'Política de compra de software y hardware original',
        que_implementar: 'Establecer política formal de adquirir únicamente software con licencia válida y hardware de proveedores oficiales, eliminando gradualmente software pirata.',
        por_que: 'Software pirata o hardware no original pueden contener malware preinstalado, no reciben actualizaciones de seguridad, y exponen a la empresa a multas por infracción de derechos de autor.',
        pasos: [
            'Documentar política: "Solo se adquirirá software con licencia válida de proveedores oficiales"',
            'Auditar software actual e identificar licencias irregulares',
            'Priorizar regularización de software crítico (ej: Office, antivirus)',
            'Buscar alternativas gratuitas legales cuando sea posible (ej: LibreOffice, Avast Free)',
            'Establecer proceso de aprobación de compras TI (validar origen)',
            'Comunicar política a todo el personal y proveedores'
        ],
        estimacion: {
            tiempo: '2-4 semanas',
            esfuerzo: '15-25 horas totales',
            responsable: 'Responsable TI + Administrativo',
            inversion: '$500.000-$2.000.000 CLP (regularización de licencias según cantidad)'
        },
        recursos: [
            'Lista de alternativas de software libre por categoría',
            'Guía de verificación de autenticidad de licencias',
            'Contactos de distribuidores oficiales en Chile'
        ]
    },
    
    // ==========================================
    // FASE 3: PROTECCIÓN TÉCNICA
    // ==========================================
    'PR.AA-01': {
        titulo: 'Formalizar gestión de cuentas de usuario',
        que_implementar: 'Establecer proceso documentado para crear, modificar y eliminar cuentas de usuario cuando alguien ingresa, cambia de rol o se va de la empresa.',
        por_que: 'Cuentas de usuarios que ya no trabajan en la empresa son una vulnerabilidad crítica. Un ex-empleado con acceso puede causar daños intencionales o su cuenta puede ser comprometida por atacantes externos.',
        pasos: [
            'Documentar proceso: "Al ingreso → crear cuenta; al egreso → eliminar cuenta el mismo día"',
            'Crear checklist de onboarding TI (qué cuentas crear: email, sistemas internos, etc.)',
            'Crear checklist de offboarding TI (qué cuentas eliminar inmediatamente)',
            'Asignar responsable de ejecutar el proceso (RRHH notifica → TI ejecuta)',
            'Realizar auditoría mensual de cuentas activas vs empleados actuales',
            'Eliminar cuentas inactivas por más de 30 días'
        ],
        estimacion: {
            tiempo: '1-2 semanas',
            esfuerzo: '10-15 horas totales',
            responsable: 'Responsable TI + RRHH',
            inversion: '$0 (proceso interno)'
        },
        recursos: [
            'Plantilla de checklist de onboarding/offboarding TI',
            'Script de auditoría de cuentas activas',
            'Procedimiento documentado de gestión de accesos'
        ]
    },
    
    'PR.AA-03': {
        titulo: 'Implementar autenticación de doble factor (MFA)',
        que_implementar: 'Activar autenticación de doble factor en todos los sistemas críticos que lo soporten (email, servicios en la nube, sistemas de facturación).',
        por_que: 'Incluso con la contraseña robada, MFA impide el acceso no autorizado al requerir un segundo factor (código del celular). Es una de las defensas más efectivas contra hackeo de cuentas.',
        pasos: [
            'Identificar sistemas críticos que soportan MFA (Gmail, Microsoft 365, Dropbox, etc.)',
            'Priorizar implementación en: email corporativo (primero), sistemas financieros, accesos administrativos',
            'Elegir método de MFA: SMS (más simple) o App autenticadora como Google Authenticator (más seguro)',
            'Configurar MFA para cuentas administrativas primero',
            'Capacitar a usuarios en uso de MFA (5-10 min por usuario)',
            'Extender gradualmente a todos los usuarios en 2-4 semanas',
            'Documentar códigos de respaldo en lugar seguro'
        ],
        estimacion: {
            tiempo: '2-4 semanas',
            esfuerzo: '20-40 horas (según cantidad de usuarios y sistemas)',
            responsable: 'Responsable TI',
            inversion: '$0-$300.000 CLP (licencias de apps autenticadoras si se necesitan premium)'
        },
        recursos: [
            'Guía de activación de MFA en servicios populares (Gmail, Office 365)',
            'Tutorial de uso de Google Authenticator / Microsoft Authenticator',
            'Plantilla de comunicación a usuarios sobre MFA'
        ]
    },
    
    'PR.DS-11': {
        titulo: 'Implementar copias de seguridad (backups) automáticos',
        que_implementar: 'Configurar sistema de backups automáticos de información crítica con frecuencia semanal o diaria, guardando copias en ubicación externa.',
        por_que: 'Los backups son la única defensa efectiva contra ransomware y pérdida de datos. Sin backups recientes y verificados, un ataque puede significar la pérdida total de información del negocio.',
        pasos: [
            'Identificar información crítica a respaldar (bases de datos, documentos financieros, emails)',
            'Elegir solución de backup: nube (Backblaze, Google Drive empresarial) o disco externo + nube',
            'Configurar backup automático semanal o diario (según criticidad)',
            'Aplicar regla 3-2-1: 3 copias, 2 medios diferentes, 1 copia offsite (fuera de oficina)',
            'Probar restauración de backup mensualmente (crucial: backup no probado = no backup)',
            'Documentar procedimiento de restauración paso a paso',
            'Monitorear que backups se ejecuten correctamente (alertas de fallo)'
        ],
        estimacion: {
            tiempo: '2-3 semanas',
            esfuerzo: '25-40 horas totales (configuración + pruebas)',
            responsable: 'Responsable TI o proveedor externo',
            inversion: '$200.000-$800.000 CLP anuales (servicio de backup en nube según volumen de datos)'
        },
        recursos: [
            'Comparativa de soluciones de backup para PyMEs',
            'Tutorial de configuración de backup automático (Windows/Mac)',
            'Checklist de verificación de backups (regla 3-2-1)'
        ]
    },
    
    'PR.PS-02': {
        titulo: 'Establecer rutina de actualización de software (parches)',
        que_implementar: 'Implementar proceso sistemático de instalación de actualizaciones de seguridad en sistemas operativos y aplicaciones críticas.',
        por_que: 'El 99% de ataques exitosos explotan vulnerabilidades conocidas para las cuales ya existe un parche disponible. No actualizar es dejar la puerta abierta a atacantes.',
        pasos: [
            'Activar actualizaciones automáticas en Windows/Mac (Configuración → Actualización automática)',
            'Establecer "martes de parches": último martes de cada mes dedicar 2 horas a actualizar',
            'Priorizar actualización de: 1) Sistema operativo, 2) Navegadores, 3) Software crítico (Office, PDF, etc.)',
            'Crear checklist mensual de software a verificar',
            'Para servidores: programar ventanas de mantenimiento mensuales (fuera de horario)',
            'Documentar versiones actuales de software crítico',
            'Probar actualizaciones críticas en un equipo antes de aplicar a todos'
        ],
        estimacion: {
            tiempo: '1 semana (configuración inicial)',
            esfuerzo: '15-20 horas iniciales + 2-4 horas mensuales continuas',
            responsable: 'Responsable TI',
            inversion: '$0 (proceso interno)'
        },
        recursos: [
            'Checklist mensual de verificación de actualizaciones',
            'Guía de configuración de Windows Update / Mac Update',
            'Lista de software crítico que requiere actualización manual'
        ]
    },
    
    // ==========================================
    // FASE 4: DETECCIÓN Y RESPUESTA
    // ==========================================
    'ID.IM-04': {
        titulo: 'Documentar plan de respuesta a incidentes',
        que_implementar: 'Crear documento con procedimientos paso a paso sobre qué hacer cuando ocurre un incidente de seguridad, definiendo roles y contactos clave.',
        por_que: 'En medio de una crisis de seguridad (ej: ransomware), la improvisación lleva a decisiones apresuradas que empeoran la situación. Un plan documentado reduce el tiempo de respuesta y minimiza el daño.',
        pasos: [
            'Definir qué se considera "incidente" (ver criterios en control DE.AE-08)',
            'Documentar flujo de respuesta: Detectar → Reportar → Contener → Erradicar → Recuperar',
            'Definir equipo de respuesta: quién lidera, quién ejecuta, quién comunica',
            'Listar contactos de emergencia: proveedor TI, CSIRT Chile (+56 2 2940 0600), abogado',
            'Documentar pasos de contención por tipo de incidente (ver RS.MI-01)',
            'Documentar pasos de recuperación (ver RS.MI-02)',
            'Incluir procedimiento de comunicación (cuándo notificar a clientes, autoridades)',
            'Realizar simulacro anual de respuesta a incidente (ejercicio de mesa)'
        ],
        estimacion: {
            tiempo: '2-3 semanas',
            esfuerzo: '25-35 horas totales',
            responsable: 'Responsable de seguridad + Gerencia',
            inversion: '$0-$500.000 CLP (consultoría opcional para diseño del plan)'
        },
        recursos: [
            'Plantilla de plan de respuesta a incidentes para PyMEs',
            'Contacto CSIRT Chile (equipo nacional de respuesta)',
            'Guía de comunicación de incidentes (cuándo y cómo notificar)'
        ]
    },
    
    'DE.AE-08': {
        titulo: 'Definir criterios para declarar incidentes',
        que_implementar: 'Establecer criterios claros y documentados sobre cuándo un problema técnico debe ser tratado como un incidente formal de seguridad.',
        por_que: 'Sin criterios claros, se pierde tiempo valioso debatiendo si algo es "suficientemente grave" o se ignoran señales tempranas de ataques en curso.',
        pasos: [
            'Documentar criterios de incidente: cualquier evento que cumpla alguno de estos criterios es incidente formal',
            'Criterio 1: Sospecha de acceso no autorizado (ej: login desde ubicación extraña)',
            'Criterio 2: Infección confirmada de malware/ransomware',
            'Criterio 3: Pérdida o robo de equipo con información sensible',
            'Criterio 4: Modificación no autorizada de datos críticos',
            'Criterio 5: Interrupción no planificada de servicio crítico >4 horas',
            'Criterio 6: Cualquier solicitud de rescate o extorsión',
            'Comunicar criterios a todo el personal (todos deben poder identificar incidentes)',
            'Establecer mecanismo simple de reporte (email, teléfono, formulario web)'
        ],
        estimacion: {
            tiempo: '1 semana',
            esfuerzo: '8-12 horas totales',
            responsable: 'Responsable de seguridad',
            inversion: '$0 (definición interna)'
        },
        recursos: [
            'Plantilla de criterios de declaración de incidentes',
            'Flowchart: ¿Es esto un incidente? (decisión paso a paso)',
            'Formulario simple de reporte de incidentes'
        ]
    },
    
    'RS.MI-01': {
        titulo: 'Procedimiento de contención de incidentes',
        que_implementar: 'Documentar pasos específicos para aislar rápidamente un equipo o cuenta comprometida y evitar que el incidente se propague.',
        por_que: 'Los primeros 15 minutos después de detectar un incidente son críticos. Saber exactamente qué hacer (desconectar red, cambiar contraseñas) puede ser la diferencia entre un incidente menor y un desastre total.',
        pasos: [
            'Documentar pasos de contención para cada escenario:',
            'Escenario 1 - Equipo infectado: 1) Desconectar cable de red, 2) Apagar WiFi, 3) NO apagar equipo (preservar evidencia), 4) Notificar a TI',
            'Escenario 2 - Cuenta comprometida: 1) Cambiar contraseña inmediatamente, 2) Cerrar todas las sesiones activas, 3) Revisar actividad reciente, 4) Activar MFA si no estaba',
            'Escenario 3 - Ataque en curso: 1) Aislar sistemas afectados, 2) Bloquear IP atacante en firewall, 3) Preservar logs, 4) Contactar CSIRT Chile',
            'Capacitar a personal TI en ejecución de procedimientos',
            'Mantener procedimientos impresos y accesibles (no solo digitales)',
            'Practicar procedimientos semestralmente'
        ],
        estimacion: {
            tiempo: '1-2 semanas',
            esfuerzo: '15-20 horas totales',
            responsable: 'Responsable TI',
            inversion: '$0 (procedimientos internos)'
        },
        recursos: [
            'Plantilla de procedimientos de contención por escenario',
            'Checklist laminado de contención rápida (para tener en escritorio)',
            'Video tutorial de respuesta rápida (3-5 minutos)'
        ]
    },
    
    'RS.MI-02': {
        titulo: 'Procedimiento de erradicación post-incidente',
        que_implementar: 'Documentar proceso completo para limpiar un equipo comprometido, asegurando que la amenaza sea completamente eliminada antes de reintegrarlo a la red.',
        por_que: 'Una limpieza incompleta permite que el atacante mantenga acceso backdoor o que el malware se reactive. Formateo completo y reinstalación es la única forma segura de garantizar erradicación total.',
        pasos: [
            'Procedimiento estándar de erradicación:',
            '1) Desconectar equipo de red (ya hecho en contención)',
            '2) Respaldar archivos críticos del usuario en medio externo limpio (solo documentos, NO ejecutables)',
            '3) Escanear backup con antivirus actualizado antes de usar',
            '4) Formatear completamente el disco duro (NO restaurar a estado anterior)',
            '5) Reinstalar sistema operativo desde medio oficial limpio',
            '6) Aplicar todas las actualizaciones de seguridad antes de conectar a red',
            '7) Instalar y actualizar antivirus',
            '8) Restaurar solo archivos de datos (NO configuraciones ni programas del backup)',
            '9) Cambiar todas las contraseñas usadas desde ese equipo',
            '10) Monitorear el equipo durante 7 días antes de considerarlo limpio',
            'Para casos complejos: contactar proveedor TI especializado'
        ],
        estimacion: {
            tiempo: '2-3 semanas (procedimiento + capacitación)',
            esfuerzo: '20-30 horas totales',
            responsable: 'Responsable TI o proveedor externo',
            inversion: '$100.000-$500.000 CLP por incidente (horas de consultor si se requiere apoyo externo)'
        },
        recursos: [
            'Procedimiento detallado paso a paso de erradicación',
            'Checklist de verificación post-erradicación',
            'Contactos de proveedores de respuesta a incidentes en Chile'
        ]
    }
};

// ============================================
// FUNCIÓN PRINCIPAL: GENERAR RECOMENDACIONES
// ============================================

/**
 * Genera el plan de acción completo con recomendaciones personalizadas
 * @param {Array} brechas - Array de brechas priorizadas
 * @param {Object} respuestas - Respuestas del cuestionario (para personalización)
 * @returns {Array} - Plan de acción con recomendaciones detalladas
 */
function generarRecomendaciones(brechas, respuestas) {
    console.log('📋 Generando recomendaciones...');
    
    const planDeAccion = [];
    
    // Para cada brecha, generar recomendación completa
    brechas.forEach(brecha => {
        const plantilla = PLANTILLAS_RECOMENDACIONES[brecha.control_id];
        
        if (!plantilla) {
            console.warn(`⚠️ No hay plantilla de recomendación para ${brecha.control_id}`);
            return;
        }
        
        // Crear recomendación combinando datos de la brecha con la plantilla
        const recomendacion = {
            // Datos de la brecha
            control_id: brecha.control_id,
            control_nombre: brecha.control_nombre,
            fase: brecha.fase,
            funcion: brecha.funcion,
            numero_prioridad: brecha.numero_prioridad,
            criticidad: brecha.criticidad,
            brecha: brecha.brecha,
            puntaje_actual: brecha.puntaje_actual,
            puntaje_objetivo: brecha.puntaje_objetivo,
            
            // Datos de la plantilla
            titulo: plantilla.titulo,
            que_implementar: plantilla.que_implementar,
            por_que: plantilla.por_que,
            pasos: plantilla.pasos,
            estimacion: plantilla.estimacion,
            recursos: plantilla.recursos,
            
            // Personalización según contexto
            personalizacion: personalizarRecomendacion(brecha, respuestas)
        };
        
        planDeAccion.push(recomendacion);
    });
    
    console.log(`✅ Generadas ${planDeAccion.length} recomendaciones`);
    
    return planDeAccion;
}

// ============================================
// PERSONALIZACIÓN DE RECOMENDACIONES
// ============================================

/**
 * Personaliza la recomendación según el contexto específico de la empresa
 * @param {Object} brecha - Brecha a personalizar
 * @param {Object} respuestas - Respuestas del cuestionario
 * @returns {Object} - Objeto con notas de personalización
 */
function personalizarRecomendacion(brecha, respuestas) {
    const personalizacion = {
        notas: [],
        ajustes_tiempo: [],
        ajustes_costo: []
    };
    
    // Obtener contexto de la empresa
    const empleados = respuestas['P0.3'] || '';
    const sector = respuestas['P0.2'] || '';
    const tiempoDisponible = respuestas['P5.2'] || '';
    
    // Personalización por tamaño
    if (empleados === '1-5') {
        personalizacion.notas.push('Como microempresa, puede implementar este control de forma simplificada, priorizando lo esencial.');
        personalizacion.ajustes_tiempo.push('Reducir estimación de tiempo en 30-40% para su tamaño.');
    } else if (empleados === '51-100') {
        personalizacion.notas.push('Como mediana empresa, considere dedicar más recursos para una implementación robusta.');
        personalizacion.ajustes_tiempo.push('Puede requerir 20-30% más de tiempo debido al número de usuarios/equipos.');
    }
    
    // Personalización por sector
    if (sector === 'Salud') {
        if (brecha.control_id === 'GV.PO-01') {
            personalizacion.notas.push('IMPORTANTE: El sector salud debe cumplir con regulaciones específicas de protección de datos médicos (Ley 20.584). Considere incluir políticas específicas de manejo de información de pacientes.');
        }
    }
    
    if (sector === 'Retail/Comercio') {
        if (brecha.control_id === 'PR.DS-11') {
            personalizacion.notas.push('Para retail, priorice el backup de: base de datos de clientes, registros de ventas, inventario. La pérdida de esta información puede paralizar operaciones.');
        }
    }
    
    // Personalización por urgencia
    if (tiempoDisponible === '3 meses') {
        personalizacion.notas.push('⚠️ Tiempo limitado disponible: Enfóquese en implementar la versión mínima viable de este control y mejorarlo después.');
    }
    
    // Personalización por criticidad de la brecha
    if (brecha.criticidad === 'Crítica') {
        personalizacion.notas.push('🔴 CRÍTICO: Este control está completamente ausente. Implementarlo debe ser su máxima prioridad en esta fase.');
    }
    
    // Personalización por incidentes previos
    if (respuestas['P5.3'] === 'Sí' && ['RS.MI-01', 'RS.MI-02', 'DE.AE-08', 'ID.IM-04'].includes(brecha.control_id)) {
        personalizacion.notas.push('⚠️ Dado que ya ha sufrido incidentes, este control es especialmente crítico para evitar repetición y mejorar su respuesta.');
    }
    
    return personalizacion;
}

// ============================================
// UTILIDADES PARA ORGANIZACIÓN DEL PLAN
// ============================================

/**
 * Agrupa las recomendaciones por fase para facilitar la planificación
 * @param {Array} planDeAccion - Plan de acción completo
 * @returns {Object} - Recomendaciones agrupadas por fase {1: [...], 2: [...], ...}
 */
function agruparRecomendacionesPorFase(planDeAccion) {
    const porFases = {
        1: [],
        2: [],
        3: [],
        4: []
    };
    
    planDeAccion.forEach(recomendacion => {
        if (porFases[recomendacion.fase]) {
            porFases[recomendacion.fase].push(recomendacion);
        }
    });
    
    return porFases;
}

/**
 * Genera un cronograma sugerido de implementación
 * @param {Array} planDeAccion - Plan de acción completo
 * @param {string} tiempoDisponible - Tiempo disponible para implementación
 * @returns {Object} - Cronograma con distribución temporal
 */
function generarCronogramaImplementacion(planDeAccion, tiempoDisponible) {
    // Convertir tiempo disponible a meses
    const tiempoMap = {
        '3 meses': 3,
        '6 meses': 6,
        '12 meses': 12,
        '18+ meses': 18
    };
    
    const mesesTotales = tiempoMap[tiempoDisponible] || 12;
    
    // Distribuir tiempo por fase según criticidad
    const distribucion = {
        1: 0.25,  // Fase 1: 25% del tiempo total
        2: 0.25,  // Fase 2: 25% del tiempo total
        3: 0.30,  // Fase 3: 30% del tiempo total
        4: 0.20   // Fase 4: 20% del tiempo total
    };
    
    const cronograma = {};
    let mesAcumulado = 0;
    
    for (let fase = 1; fase <= 4; fase++) {
        const mesesFase = Math.ceil(mesesTotales * distribucion[fase]);
        const mesInicio = mesAcumulado + 1;
        const mesFin = mesAcumulado + mesesFase;
        
        // Filtrar recomendaciones de esta fase
        const recomendacionesFase = planDeAccion.filter(r => r.fase === fase);
        
        cronograma[fase] = {
            fase: fase,
            nombre_fase: obtenerNombreFase(fase),
            mes_inicio: mesInicio,
            mes_fin: mesFin,
            duracion_meses: mesesFase,
            controles: recomendacionesFase.length,
            recomendaciones: recomendacionesFase.map(r => ({
                prioridad: r.numero_prioridad,
                control_id: r.control_id,
                titulo: r.titulo,
                tiempo_estimado: r.estimacion.tiempo
            }))
        };
        
        mesAcumulado = mesFin;
    }
    
    return {
        tiempo_total_meses: mesesTotales,
        fases: cronograma,
        nota: 'Este cronograma es orientativo. Ajuste según sus recursos y prioridades específicas.'
    };
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

// ============================================
// GENERACIÓN DE RESUMEN EJECUTIVO
// ============================================

/**
 * Genera un resumen ejecutivo del plan de acción
 * @param {Array} planDeAccion - Plan de acción completo
 * @param {Object} contexto - Contexto de la empresa
 * @returns {string} - Resumen ejecutivo en texto
 */
function generarResumenEjecutivo(planDeAccion, contexto) {
    const totalControles = planDeAccion.length;
    const criticos = planDeAccion.filter(r => r.criticidad === 'Crítica').length;
    const altos = planDeAccion.filter(r => r.criticidad === 'Alta').length;
    
    let resumen = 'RESUMEN EJECUTIVO DEL PLAN DE ACCIÓN\n\n';
    resumen += `Empresa: ${contexto.empresa}\n`;
    resumen += `Fecha: ${new Date().toLocaleDateString('es-CL')}\n\n`;
    resumen += 'SITUACIÓN ACTUAL:\n';
    resumen += `Su empresa presenta ${totalControles} brechas de seguridad identificadas, `;
    resumen += `de las cuales ${criticos} son críticas (controles completamente ausentes) `;
    resumen += `y ${altos} son de alta prioridad.\n\n`;
    
    resumen += 'PLAN DE ACCIÓN RECOMENDADO:\n';
    resumen += 'Se recomienda implementar los controles en 4 fases progresivas:\n\n';
    
    const porFases = agruparRecomendacionesPorFase(planDeAccion);
    
    Object.keys(porFases).forEach(fase => {
        if (porFases[fase].length > 0) {
            resumen += `FASE ${fase} - ${obtenerNombreFase(parseInt(fase))}:\n`;
            resumen += `${porFases[fase].length} control(es) a implementar\n`;
            porFases[fase].slice(0, 3).forEach(r => {
                resumen += `  • ${r.titulo}\n`;
            });
            if (porFases[fase].length > 3) {
                resumen += `  • ... y ${porFases[fase].length - 3} más\n`;
            }
            resumen += '\n';
        }
    });
    
    resumen += 'PRÓXIMOS PASOS INMEDIATOS:\n';
    resumen += '1. Revisar el plan de acción detallado en las páginas siguientes\n';
    resumen += '2. Asignar responsables para cada fase de implementación\n';
    resumen += '3. Comenzar con los controles de Fase 1 en las próximas 2-4 semanas\n';
    resumen += '4. Establecer reuniones de seguimiento mensuales\n';
    
    return resumen;
}

// ============================================
// EXPORTAR PARA DEBUGGING
// ============================================
if (typeof window !== 'undefined') {
    window.recomendaciones = {
        generar: generarRecomendaciones,
        plantillas: PLANTILLAS_RECOMENDACIONES,
        agruparPorFase: agruparRecomendacionesPorFase,
        cronograma: generarCronogramaImplementacion,
        resumenEjecutivo: generarResumenEjecutivo
    };
}

console.log('✅ recomendaciones.js cargado correctamente');
