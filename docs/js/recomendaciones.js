/* ============================================ */
/* RECOMENDACIONES.JS - GENERACIÓN DEL PLAN DE ACCIÓN */
/* ============================================ */

// ============================================
// PLANTILLAS DE RECOMENDACIONES POR CONTROL
// (ESTRUCTURA MODIFICADA POR NIVEL DE BRECHA)
// ============================================

const PLANTILLAS_RECOMENDACIONES = {
    // ==========================================
    // FASE 1: GOBERNANZA
    // ==========================================
    'GV.RR-01': {
        // PUNTAJE 0: (No hay alguien específico / Varias personas sin claridad)
        0: {
            titulo: 'Designar un responsable formal de ciberseguridad',
            que_implementar: 'Designar formalmente a una persona (ej. Gerente General, Encargado TI) como el responsable de supervisar la ciberseguridad, con autoridad para coordinar acciones y reportar a gerencia.',
            por_que: 'Sin un responsable claro, las iniciativas de seguridad no tienen liderazgo. Esto causa acciones descoordinadas, falta de seguimiento y que nadie asuma la responsabilidad en caso de incidente.',
            pasos: [
                'Identificar a la persona más adecuada (Gerente, Encargado TI interno o Proveedor TI externo).',
                'Formalizar la designación por escrito (memorándum o anexo de contrato).',
                'Definir responsabilidades clave: aprobar políticas, coordinar respuesta a incidentes, reportar estado.',
                'Comunicar esta designación a toda la organización.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '4-8 horas (Reuniones y redacción)',
                responsable: 'Gerencia General / Directorio'
            },
            recursos: [
                'Plantilla de memorándum de designación.',
                'Guía de roles y responsabilidades (INCIBE).'
            ]
        }
        // Nota: Este control no tiene puntajes 1 o 2 en 'evaluador.js', solo 0 o 3.
        // Si el puntaje es 3, no hay brecha.
    },
    
    'GV.PO-01': {
        // PUNTAJE 0: (No tenemos políticas)
        0: {
            titulo: 'Crear Políticas de Ciberseguridad Fundamentales',
            que_implementar: 'Crear y documentar las 3 políticas de seguridad más críticas: Política de Contraseñas, Política de Uso Aceptable (Email/Web) y Política de Reporte de Incidentes.',
            por_que: 'Actualmente no existen reglas formales. Sin políticas, los empleados no saben qué se espera de ellos, aumentando el riesgo de errores críticos (ej. phishing, mal uso de contraseñas).',
            pasos: [
                'Documentar Política de Contraseñas (largo mínimo 12, no reutilizar, obligar MFA donde se pueda).',
                'Documentar Política de Uso Aceptable (prohibir descargas sospechosas, uso de software pirata, etc.).',
                'Definir Política de Reporte de Incidentes (a quién llamar/escribir y cuándo).',
                'Documentar estas 3 políticas en un documento simple (1-2 páginas) y guardarlo en un lugar accesible.',
                'Realizar una reunión de 30 min para comunicar estas nuevas políticas a todo el personal.'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '15-20 horas (Redacción y revisión)',
                responsable: 'Responsable de seguridad + Gerencia'
            },
            recursos: [
                'Plantillas de políticas básicas (CSIRT Chile, INCIBE).'
            ]
        },
        // PUNTAJE 1: (Reglas informales)
        1: {
            titulo: 'Formalizar y Documentar Políticas de Seguridad',
            que_implementar: 'Tomar las "reglas informales" que ya existen en la empresa y convertirlas en un documento oficial, comunicado y accesible para todos.',
            por_que: 'Las reglas informales son un buen comienzo, pero no son consistentes, auditables ni aplicables a nuevos empleados. Documentarlas asegura que todos sigan los mismos estándares.',
            pasos: [
                'Entrevistar a gerencia y personal clave sobre las "reglas no escritas" actuales.',
                'Documentar formalmente las políticas (Contraseñas, Uso Aceptable, Reporte de Incidentes).',
                'Asegurarse de que las políticas cubran el trabajo remoto (si aplica).',
                'Realizar una reunión formal para presentar el documento y que todos firmen su recepción.',
                'Establecer una revisión anual de este documento.'
            ],
            estimacion: {
                tiempo: '1-2 Semanas',
                esfuerzo: '10-15 horas (Entrevistas y redacción)',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Plantillas de políticas básicas para PyMEs.'
            ]
        },
        // PUNTAJE 2: (Políticas básicas)
        2: {
            titulo: 'Comunicar y Expandir Políticas de Seguridad',
            que_implementar: 'Asegurar que las políticas básicas documentadas sean comunicadas formalmente a todo el personal y expandirlas para cubrir áreas de riesgo adicionales (ej. BYOD, Backups).',
            por_que: 'Ya tiene políticas básicas, pero el puntaje indica que no están completamente comunicadas o formalizadas. El siguiente paso es asegurar su cumplimiento y expandirlas.',
            pasos: [
                'Implementar un sistema de "acuse de recibo" (firma física o digital) de las políticas actuales.',
                'Incluir las políticas en el proceso de inducción (onboarding) de nuevos empleados.',
                'Expandir las políticas para incluir: uso de dispositivos móviles (BYOD), política de backups y respuesta a incidentes.',
                'Realizar una charla de reforzamiento anual sobre las políticas.'
            ],
            estimacion: {
                tiempo: '3-4 Semanas',
                esfuerzo: '10 horas (Comunicación) + 15 horas (Expansión)',
                responsable: 'Responsable de seguridad + RRHH'
            },
            recursos: [
                'Plantilla de acuse de recibo.',
                'Modelos de políticas de BYOD.'
            ]
        }
    },
    
    'GV.OC-01': {
        // PUNTAJE 0: (No se considera)
        0: {
            titulo: 'Integrar el Riesgo de Ciberseguridad en el Negocio',
            que_implementar: 'Comenzar a discutir activamente los riesgos de ciberseguridad como parte de las decisiones de negocio, no solo como un problema técnico.',
            por_que: 'Ignorar la ciberseguridad en las decisiones estratégicas (ej. lanzar un nuevo servicio online, contratar proveedores) genera "deuda técnica" y vulnerabilidades que son costosas de reparar después.',
            pasos: [
                'Establecer la ciberseguridad como un punto fijo (10 min) en las reuniones de gerencia mensuales.',
                'Pregunta clave: "¿Este nuevo proyecto/tecnología/proveedor introduce algún riesgo de seguridad?".',
                'Identificar los 3 principales "activos de información" (ej. base de datos de clientes, sistema de facturación).',
                'Documentar quién es el "dueño" de negocio de esos activos.'
            ],
            estimacion: {
                tiempo: 'Continuo (Implementación inicial 1 semana)',
                esfuerzo: '2-4 horas mensuales (Reuniones)',
                responsable: 'Gerencia General + Responsable de seguridad'
            },
            recursos: [
                'Guía de gestión de riesgos para directorios.'
            ]
        },
        // PUNTAJE 1: (Solo cuando surgen problemas)
        1: {
            titulo: 'Pasar de Gestión Reactiva a Proactiva del Riesgo',
            que_implementar: 'Dejar de tratar la ciberseguridad solo cuando hay un problema (reactivo) y empezar a incluirla en la planificación (proactivo).',
            por_que: 'Apagar incendios es costoso e ineficiente. Ser proactivo permite identificar riesgos antes de que se conviertan en incidentes, ahorrando dinero y reputación a largo plazo.',
            pasos: [
                'Incluir la ciberseguridad como punto fijo en reuniones de gerencia (no solo cuando hay problemas).',
                'Crear un checklist simple de 5 preguntas de seguridad para evaluar nuevos proyectos o proveedores.',
                'Realizar un análisis de riesgo básico una vez al año (identificar 5 riesgos principales).',
                'Documentar formalmente las decisiones de riesgo (ej. "Aceptamos el riesgo de... porque...").'
            ],
            estimacion: {
                tiempo: '2 Semanas (Implementación de proceso)',
                esfuerzo: '10-15 horas (Crear checklist y primera reunión)',
                responsable: 'Responsable de seguridad + Gerencia'
            },
            recursos: [
                'Plantilla de checklist de evaluación de proveedores.',
                'Matriz de riesgos simple (Excel).'
            ]
        },
        // PUNTAJE 2: (Informalmente)
        2: {
            titulo: 'Formalizar la Integración de Ciberseguridad',
            que_implementar: 'Convertir las discusiones informales sobre seguridad en un proceso formal y documentado dentro del ciclo de vida de los proyectos y decisiones de negocio.',
            por_que: 'Lo informal depende de las personas. Un proceso formal asegura que la evaluación de riesgos se haga siempre, de manera consistente, sin importar quién esté en la reunión.',
            pasos: [
                'Crear un "Formulario de Evaluación de Riesgo" obligatorio para todo nuevo proyecto o proveedor.',
                'Definir criterios claros para "luz roja" (requiere aprobación de gerencia) o "luz verde".',
                'Integrar formalmente al Responsable de Seguridad en el flujo de aprobación de compras de TI.',
                'Documentar los resultados de estas evaluaciones para auditoría interna.'
            ],
            estimacion: {
                tiempo: '3-4 Semanas',
                esfuerzo: '20-25 horas (Crear formularios y flujos)',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Plantilla de Formulario de Evaluación de Riesgo.',
                'Flujograma de aprobación de compras TI.'
            ]
        }
    },
    
    'GV.RM-02': {
        // PUNTAJE 0: (No evaluado)
        0: {
            titulo: 'Definir Tolerancia al Riesgo (RTO/RPO)',
            que_implementar: 'Evaluar y documentar cuánto tiempo de inactividad (RTO) y cuánta pérdida de datos (RPO) puede tolerar la organización sin quebrar.',
            por_que: 'Sin esta definición, es imposible tomar decisiones sobre backups, planes de recuperación o inversiones. Podría estar gastando demasiado en proteger algo no crítico, o muy poco en algo vital.',
            pasos: [
                'Identificar los 3-5 procesos de negocio más críticos (ej. facturación, operación, ventas online).',
                'Para cada proceso, preguntar: "¿Cuánto tiempo podemos estar sin esto?" (RTO - Ej. 4 horas, 1 día).',
                'Para cada proceso, preguntar: "¿Cuántos datos podemos perder?" (RPO - Ej. 1 hora, 1 día).',
                'Documentar estos valores (RTO/RPO) y usarlos para definir la frecuencia de los backups.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '8-10 horas (Taller con gerencia)',
                responsable: 'Gerencia + Responsable de seguridad'
            },
            recursos: [
                'Plantilla de Análisis de Impacto al Negocio (BIA) simplificada.',
                'Guía de definición de RTO/RPO.'
            ]
        }
        // Nota: Este control no tiene puntajes 1 o 2 en 'evaluador.js'.
        // La respuesta "Menos de 4h", "1 día", etc. todas dan puntaje 3 (evaluado).
    },

    // ==========================================
    // FASE 2: VISIBILIDAD Y CAPACITACIÓN
    // ==========================================
    'ID.AM-01': {
        // PUNTAJE 0: (No tenemos inventario)
        0: {
            titulo: 'Crear Inventario de Hardware (Equipos)',
            que_implementar: 'Crear un registro (Excel o similar) de todos los equipos tecnológicos de la empresa (computadores, notebooks, servidores, routers, impresoras) con información básica.',
            por_que: 'No se puede proteger lo que no se conoce. Sin un inventario, es imposible saber qué equipos faltan, cuáles necesitan parches o detectar dispositivos no autorizados en la red.',
            pasos: [
                'Crear una hoja de cálculo (Excel, Google Sheets) con columnas: Tipo, Marca/Modelo, N° Serie, Usuario Asignado, Ubicación.',
                'Realizar un recorrido físico por la oficina registrando cada equipo.',
                'Usar herramientas de escaneo de red (ej. Advanced IP Scanner) para encontrar equipos conectados.',
                'Asignar a una persona la responsabilidad de mantener este inventario actualizado.'
            ],
            estimacion: {
                tiempo: '1-2 Semanas',
                esfuerzo: '15-25 horas (según tamaño)',
                responsable: 'Responsable TI / Administrativo'
            },
            recursos: [
                'Plantilla Excel de inventario de hardware.',
                'Advanced IP Scanner (Software gratuito).'
            ]
        },
        // PUNTAJE 1: (Lista desactualizada)
        1: {
            titulo: 'Actualizar y Formalizar Inventario de Hardware',
            que_implementar: 'Tomar la lista desactualizada existente, validarla completamente (dar de baja equipos, agregar nuevos) y establecer un proceso para mantenerla actualizada.',
            por_que: 'Un inventario desactualizado da una falsa sensación de seguridad. Es crucial validar la lista actual y crear el hábito de actualizarla para que sea confiable.',
            pasos: [
                'Realizar una auditoría completa del inventario actual vs. la realidad física.',
                'Agregar campos útiles: Fecha de Compra, Garantía, Estado (Activo/Baja).',
                'Establecer un proceso: "Cada vez que se compra o da de baja un equipo, se actualiza el inventario".',
                'Agendar una revisión completa del inventario cada 6 meses.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '10-15 horas (Auditoría y actualización)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Plantilla Excel de inventario de hardware.'
            ]
        },
        // PUNTAJE 2: (Inventario digital)
        2: {
            titulo: 'Automatizar y Enriquecer Inventario de Hardware',
            que_implementar: 'Migrar del inventario manual (Excel) a una herramienta automatizada (incluso gratuita) y asignar responsables formales por cada activo.',
            por_que: 'El inventario manual siempre tendrá errores. La automatización reduce el esfuerzo y aumenta la precisión. Asignar dueños asegura responsabilidad.',
            pasos: [
                'Evaluar herramientas de inventario gratuitas (ej. Spiceworks Inventory, OCS Inventory).',
                'Instalar y configurar la herramienta para escanear la red automáticamente.',
                'Validar los datos descubiertos por la herramienta.',
                'Agregar el campo "Responsable (dueño)" a cada activo crítico.',
                'Configurar alertas para cuando se detecten nuevos dispositivos no autorizados.'
            ],
            estimacion: {
                tiempo: '2-3 Semanas',
                esfuerzo: '20-30 horas (Instalación y configuración)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Spiceworks Inventory (Gratuito).',
                'OCS Inventory (Open Source).'
            ]
        }
    },
    
    'ID.AM-02': {
        // PUNTAJE 0: (No tenemos inventario)
        0: {
            titulo: 'Crear Inventario de Software y Servicios',
            que_implementar: 'Crear un registro (Excel) de todo el software instalado en los equipos y los servicios en la nube (ej. Office 365, GSuite, Dropbox, sistema de facturación) que utiliza la empresa.',
            por_que: 'El software desactualizado, pirata o desconocido es una puerta de entrada principal para malware. No saber qué servicios en la nube se usan impide gestionar accesos y datos.',
            pasos: [
                'Crear hoja de cálculo con columnas: Nombre Software/Servicio, Proveedor, N° Licencias, Fecha Vencimiento, Responsable.',
                'Listar software clave (S.O., Office, Antivirus, ERP/CRM, Software de diseño, etc.).',
                'Listar servicios en la nube (Email, Almacenamiento, Contabilidad, etc.).',
                'Identificar software pirata (CRÍTICO: debe eliminarse o regularizarse).',
                'Establecer alertas de vencimiento de licencias.'
            ],
            estimacion: {
                tiempo: '1-2 Semanas',
                esfuerzo: '15-20 horas',
                responsable: 'Responsable TI + Administración'
            },
            recursos: [
                'Plantilla Excel de inventario de software.',
                'Belarc Advisor (Gratuito para auditoría de 1 equipo).'
            ]
        },
        // PUNTAJE 1: (Lista desactualizada)
        1: {
            titulo: 'Actualizar y Validar Inventario de Software',
            que_implementar: 'Tomar la lista desactualizada, auditar los equipos para encontrar software no registrado y validar el estado de licenciamiento de todo.',
            por_que: 'El software cambia constantemente. Una lista antigua no refleja los servicios en la nube nuevos o el software "shadow IT" (instalado por usuarios sin permiso) que genera riesgos.',
            pasos: [
                'Realizar una auditoría del software instalado en 5-10 equipos de muestra.',
                'Comparar con la lista y actualizarla.',
                'Validar fechas de vencimiento de todas las licencias y servicios críticos.',
                'Establecer una revisión semestral de este inventario.',
                'Crear una política simple de "Software Permitido".'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '10-15 horas',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Herramientas de auditoría de software.'
            ]
        },
        // PUNTAJE 2: (Inventario digital)
        2: {
            titulo: 'Automatizar y Gestionar Licenciamiento de Software',
            que_implementar: 'Implementar una herramienta que automatice el descubrimiento de software y gestione centralizadamente las licencias y fechas de vencimiento.',
            por_que: 'La gestión manual de licencias es propensa a errores que pueden costar caro (multas o interrupción de servicio). La automatización centraliza el control.',
            pasos: [
                'Evaluar herramientas de gestión de activos de TI (ITAM) (ej. Spiceworks, Snipe-IT).',
                'Configurar la herramienta para escanear software instalado.',
                'Cargar todas las licencias, facturas y fechas de vencimiento en el sistema.',
                'Configurar alertas automáticas de vencimiento (30-60 días antes).',
                'Generar reportes de cumplimiento de licenciamiento.'
            ],
            estimacion: {
                tiempo: '2-4 Semanas',
                esfuerzo: '25-40 horas (Configuración y carga de datos)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Snipe-IT (Gestión de activos Open Source).',
                'Spiceworks (Gratuito).'
            ]
        }
    },
    
    'PR.AT-01': {
        // PUNTAJE 0: (No es necesario)
        0: {
            titulo: 'Implementar Programa de Concienciación (Phishing)',
            que_implementar: 'Realizar una capacitación (charla) inicial y obligatoria para todo el personal sobre los riesgos de ciberseguridad, enfocada en cómo detectar Phishing.',
            por_que: 'El 90% de los incidentes comienzan con un error humano. Considerar que la capacitación "no es necesaria" es el mayor riesgo. Su personal es la primera línea de defensa y debe ser entrenado.',
            pasos: [
                'Contratar una charla de sensibilización (1-2 horas) con un experto.',
                'Temas: Cómo identificar emails/WhatsApp sospechosos, política de contraseñas, a quién reportar.',
                'Entregar material de referencia (infografía).',
                'Establecer esta charla como obligatoria para nuevos empleados (onboarding).'
            ],
            estimacion: {
                tiempo: '1 Mes (Coordinación y ejecución)',
                esfuerzo: '10 horas (Coordinación) + 2 horas por empleado',
                responsable: 'Responsable de seguridad / RRHH'
            },
            recursos: [
                'Material gratuito de concienciación (INCIBE, CSIRT Chile).'
            ]
        },
        // PUNTAJE 1: (Información para leer)
        1: {
            titulo: 'Realizar Capacitación Interactiva (Charla)',
            que_implementar: 'Pasar de enviar documentos (pasivo) a realizar una charla o taller interactivo (activo) que genere recordación y permita resolver dudas.',
            por_que: 'Enviar documentos para leer tiene una efectividad casi nula. Una charla interactiva permite reforzar mensajes, mostrar ejemplos reales y asegurar que el personal comprenda los riesgos.',
            pasos: [
                'Agendar una charla (presencial o virtual) de 1.5 horas con todo el personal.',
                'Mostrar ejemplos reales de phishing que hayan llegado a la empresa.',
                'Realizar una pequeña prueba o quiz al final de la charla.',
                'Grabar la sesión para futuros empleados.',
                'Establecer esta charla de forma semestral o anual.'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '10 horas (Preparación) + 1.5 horas por empleado',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Presentaciones de ejemplo sobre phishing.'
            ]
        },
        // PUNTAJE 2: (Charla)
        2: {
            titulo: 'Implementar Simulación de Phishing y Capacitación Continua',
            que_implementar: 'Ir más allá de la charla anual e implementar un programa continuo que incluya simulaciones de phishing para medir la efectividad de la capacitación.',
            por_que: 'La charla se olvida. Las simulaciones de phishing (enviar correos falsos controlados) miden quién cae en la trampa y necesita reforzamiento, mejorando la defensa de forma práctica.',
            pasos: [
                'Contratar una plataforma de simulación de phishing (ej. KnowBe4, PhishER).',
                'Realizar simulaciones trimestrales a distintos grupos.',
                'Asignar micro-capacitaciones (videos de 5 min) a los usuarios que fallen la simulación.',
                'Mostrar métricas de mejora a gerencia (ej. "Bajamos de 30% a 10% de clicks en phishing").'
            ],
            estimacion: {
                tiempo: '1 Mes (Contratación y configuración)',
                esfuerzo: '8 horas (Configuración) + 4 horas mensuales',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'KnowBe4 (Líder en el mercado).',
                'Otras plataformas (Cofense, PhishER).'
            ]
        }
    },
    
    'ID.RA-09': {
        // PUNTAJE 0: (Sin política)
        0: {
            titulo: 'Establecer Política de Adquisición de Software/Hardware',
            que_implementar: 'Crear una política formal que prohíba la instalación de software pirata/no autorizado y establezca que todo hardware y software debe comprarse a proveedores confiables.',
            por_que: 'El software pirata es una de las principales fuentes de malware y ransomware. No tener una política expone a la empresa a riesgos legales (multas) y de seguridad graves.',
            pasos: [
                'Documentar la política: "Solo se instalará software con licencia válida".',
                'Definir un proceso de "Solicitud de Software": todo software nuevo debe ser aprobado por TI.',
                'Realizar una auditoría inicial de software pirata y crear un plan para eliminarlo/regularizarlo.',
                'Comunicar la política a todo el personal.'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '15-20 horas (Auditoría y redacción)',
                responsable: 'Responsable TI + Gerencia'
            },
            recursos: [
                'Plantilla de política de adquisición.',
                'Lista de alternativas Open Source a software comercial.'
            ]
        },
        // PUNTAJE 1: (A veces no oficiales)
        1: {
            titulo: 'Reforzar Política de Adquisición y Regularizar Software',
            que_implementar: 'Reforzar la política para eliminar la compra a "fuentes no oficiales" y ejecutar el plan de regularización del software pirata identificado.',
            por_que: 'Comprar "a veces" a fuentes no oficiales sigue siendo un riesgo. Se debe formalizar la lista de proveedores autorizados y eliminar el software ilegal existente.',
            pasos: [
                'Crear una "Lista Blanca" de proveedores de hardware y software autorizados.',
                'Ejecutar el plan de desinstalación de software pirata, comenzando por el más crítico.',
                'Instalar herramientas que limiten la capacidad de los usuarios para instalar software (requerir clave admin).',
                'Reforzar la comunicación: "Instalar software no autorizado resultará en..."'
            ],
            estimacion: {
                tiempo: '1-3 Meses (Depende de regularización)',
                esfuerzo: '20-40 horas',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guías para restringir permisos de instalación en Windows/Mac.'
            ]
        },
        // PUNTAJE 2: (Siempre oficiales)
        2: {
            titulo: 'Implementar Verificación de Autenticidad',
            que_implementar: 'Pasar de "confiar" en el proveedor oficial a "verificar" activamente que el hardware y software recibidos sean auténticos y no hayan sido manipulados.',
            por_que: 'Incluso proveedores confiables pueden tener brechas en su cadena de suministro. La verificación asegura que el equipo recibido no traiga malware o componentes falsificados.',
            pasos: [
                'Implementar un checklist de recepción de equipos: verificar sellos, N° de serie vs. factura.',
                'Verificar hashes de software descargado (cuando el proveedor los publique).',
                'Realizar un escaneo de seguridad inicial a todo hardware nuevo antes de conectarlo a la red principal.',
                'Auditar periódicamente las licencias en los portales de fabricantes (Microsoft, Adobe).'
            ],
            estimacion: {
                tiempo: '2 Semanas (Definir proceso)',
                esfuerzo: '10 horas (Crear checklist) + 30 min por equipo nuevo',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Checklist de recepción segura de hardware.',
                'Herramientas para verificar hashes (ej. 7-Zip).'
            ]
        }
    },
    
    // ==========================================
    // FASE 3: PROTECCIÓN TÉCNICA
    // ==========================================
    'PR.AA-01': {
        // PUNTAJE 0: (Sin proceso)
        0: {
            titulo: 'Crear Proceso de Altas y Bajas de Usuarios (On/Off-boarding)',
            que_implementar: 'Establecer un proceso formal y documentado para gestionar las cuentas de usuario cuando un empleado ingresa (Onboarding) o se va (Offboarding).',
            por_que: 'Cuentas de ex-empleados que siguen activas ("cuentas huérfanas") son un riesgo de seguridad crítico. Pueden ser usadas por atacantes o ex-empleados malintencionados.',
            pasos: [
                'Crear un checklist de "Alta de Usuario" (qué cuentas crear: email, ERP, etc.).',
                'Crear un checklist de "Baja de Usuario" (qué cuentas eliminar, redirigir email, respaldar datos).',
                'Definir que el proceso de Baja debe ejecutarse EL MISMO DÍA que el empleado se va.',
                'Integrar este flujo con RRHH (RRHH notifica a TI).',
                'Realizar una auditoría inicial para encontrar y eliminar cuentas huérfanas.'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '20-30 horas (Auditoría y creación de checklists)',
                responsable: 'Responsable TI + RRHH'
            },
            recursos: [
                'Plantilla de checklist de Onboarding/Offboarding.'
            ]
        },
        // PUNTAJE 1: (Cuando nos acordamos)
        1: {
            titulo: 'Formalizar y Agilizar Proceso de Altas/Bajas',
            que_implementar: 'Convertir el proceso informal de "cuando nos acordamos" en un procedimiento obligatorio, ágil y auditable, especialmente para las bajas.',
            por_que: 'La informalidad genera retrasos. Un ex-empleado puede tener acceso por días o semanas después de irse, creando una ventana de riesgo inaceptable.',
            pasos: [
                'Documentar el flujo formal (Checklists de Alta/Baja).',
                'Establecer un "SLA" (Acuerdo de Nivel de Servicio): Bajas deben ejecutarse en menos de 8 horas.',
                'Realizar una auditoría mensual de cuentas activas vs. nómina de RRHH para detectar fallos.',
                'Guardar registro de las bajas ejecutadas (quién lo hizo, cuándo).'
            ],
            estimacion: {
                tiempo: '1 Semana (Documentar y auditar)',
                esfuerzo: '10 horas (Documentar) + 4 horas mensuales (Auditoría)',
                responsable: 'Responsable TI + RRHH'
            },
            recursos: [
                'Checklist de Onboarding/Offboarding.'
            ]
        },
        // PUNTAJE 2: (Proceso informal)
        2: {
            titulo: 'Automatizar y Auditar Gestión de Identidades',
            que_implementar: 'Avanzar del proceso informal (aunque exista) a un sistema formalizado, auditable y, si es posible, automatizado.',
            por_que: 'Un proceso informal funciona, pero es difícil de probar y depende de personas. La formalización lo hace auditable y la automatización reduce el error humano.',
            pasos: [
                'Documentar el proceso en un procedimiento formal (con responsables y SLAs).',
                'Realizar auditorías trimestrales de cuentas vs. nómina.',
                'Implementar "Revisión de Privilegios" semestral: ¿Sigue necesitando este usuario acceso de admin?',
                'Evaluar herramientas que centralicen la gestión de identidades (ej. Azure AD, Okta) si usa muchos servicios en la nube.'
            ],
            estimacion: {
                tiempo: 'Continuo',
                esfuerzo: '8 horas (Auditoría trimestral)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guía de auditoría de privilegios.'
            ]
        }
    },
    
    'PR.AA-03': {
        // PUNTAJE 0: (Solo contraseñas)
        0: {
            titulo: 'Implementar Autenticación de Doble Factor (MFA)',
            que_implementar: 'Activar urgentemente la autenticación de doble factor (MFA) en los servicios críticos, especialmente el correo electrónico y accesos de administrador.',
            por_que: 'Las contraseñas solas ya no son seguras (pueden ser robadas o adivinadas). El MFA es la barrera de seguridad más efectiva para prevenir el 99% de los ataques de robo de cuentas.',
            pasos: [
                'Identificar servicios críticos que soporten MFA (Email: Office 365 / GSuite, Bancos, ERP en la nube).',
                'Activar MFA de forma obligatoria para cuentas de Administradores (¡INMEDIATO!).',
                'Activar MFA para cuentas de Gerencia.',
                'Crear un plan de despliegue gradual (por departamento) para todos los demás usuarios.',
                'Capacitar al personal en cómo usarlo (App: Google Authenticator, Microsoft Authenticator, etc.).'
            ],
            estimacion: {
                tiempo: '1-4 Semanas (Despliegue gradual)',
                esfuerzo: '15-30 horas (Configuración y soporte)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guías de activación de MFA en Office 365 y GSuite.'
            ]
        },
        // PUNTAJE 1: (Algunos sistemas)
        1: {
            titulo: 'Expandir el Uso de MFA a Más Sistemas',
            que_implementar: 'Expandir la implementación de MFA desde "algunos sistemas" a "la mayoría de los sistemas críticos", asegurando que todos los usuarios (no solo admins) estén protegidos.',
            por_que: 'Proteger solo un sistema es insuficiente. Los atacantes buscarán el eslabón más débil. Es necesario proteger todas las puertas de entrada principales.',
            pasos: [
                'Realizar un inventario de servicios y marcar cuáles soportan MFA.',
                'Priorizar la activación en: 1) Email, 2) ERP/Contabilidad, 3) VPN/Acceso Remoto, 4) Almacenamiento en la nube.',
                'Desplegar MFA al 100% de los usuarios en esos sistemas.',
                'Definir MFA como política obligatoria para cualquier nuevo servicio que se contrate.'
            ],
            estimacion: {
                tiempo: '1 Mes',
                esfuerzo: '20-40 horas (Despliegue y soporte)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Checklist de despliegue de MFA.'
            ]
        },
        // PUNTAJE 2: (Mayoría sistemas)
        2: {
            titulo: 'Hacer Cumplir MFA en Todos los Sistemas (100%)',
            que_implementar: 'Cerrar la brecha del "casi todos" al "todos". Auditar y forzar la activación de MFA en el 100% de los sistemas críticos y usuarios, sin excepciones.',
            por_que: 'El "casi" es donde ocurre la brecha. Un solo usuario sin MFA puede comprometer a toda la organización. Se requiere cumplimiento total.',
            pasos: [
                'Auditar los portales de administración (Office 365, etc.) para encontrar usuarios sin MFA activado.',
                'Forzar la activación de MFA para esos usuarios (dar un ultimátum de 48h).',
                'Implementar políticas de "Acceso Condicional" (si están disponibles) que bloqueen inicios de sesión sin MFA.',
                'Evaluar el uso de llaves de seguridad físicas (YubiKey) para usuarios ultra-privilegiados (Gerencia, Admins TI).'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '10-15 horas (Auditoría y forzado)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guías de Acceso Condicional (Azure AD, Google).',
                'Sitio web de YubiKey.'
            ]
        }
    },
    
    'PR.DS-11': {
        // PUNTAJE 0: (Nunca / No lo sé)
        0: {
            titulo: 'Implementar Sistema de Backups (Regla 3-2-1)',
            que_implementar: 'Establecer urgentemente un sistema de copias de seguridad (backups) automáticos para la información crítica, siguiendo la regla 3-2-1.',
            por_que: 'No tener backups es el riesgo más grande para la continuidad del negocio. Un ataque de ransomware, un incendio o un error humano pueden llevar a la quiebra. Es su única red de seguridad.',
            pasos: [
                'Identificar la información crítica (servidores, carpetas compartidas, bases de datos).',
                'Definir RTO/RPO (ver GV.RM-02).',
                'Implementar Regla 3-2-1: 3 copias, 2 medios distintos (ej. disco externo + nube), 1 copia Offsite (fuera de la oficina).',
                'Contratar un servicio de backup en la nube (ej. Backblaze, Carbonite) y configurarlo.',
                'Realizar la primera copia de seguridad completa.',
                'Agendar la primera prueba de restauración para la próxima semana.'
            ],
            estimacion: {
                tiempo: '1 Semana (Configuración)',
                esfuerzo: '10-20 horas (Configuración y primera carga)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Backblaze (Servicio de backup en la nube).',
                'Guía sobre la regla 3-2-1.'
            ]
        },
        // PUNTAJE 1: (Cuando me acuerdo / Mensual)
        1: {
            titulo: 'Automatizar y Aumentar Frecuencia de Backups',
            que_implementar: 'Convertir el proceso manual/mensual ("cuando me acuerdo") en un sistema automático y frecuente (diario o semanal) y asegurar que cumple la regla 3-2-1.',
            por_que: 'Los backups manuales se olvidan y los mensuales no son suficientes (implica perder hasta 30 días de trabajo). La automatización y frecuencia son clave.',
            pasos: [
                'Configurar los backups para que se ejecuten automáticamente (ej. todas las noches).',
                'Aumentar la frecuencia a Diaria (para datos críticos) o Semanal (para datos menos críticos).',
                'Asegurar que 1 copia se almacene Offsite (en la nube o un disco externo llevado a casa).',
                'Implementar alertas que avisen si el backup falla.',
                'Realizar una prueba de restauración este mes.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '8-12 horas (Configuración y prueba)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Software de backup automático (Veeam, Acronis, o el de Windows).'
            ]
        },
        // PUNTAJE 2: (Semanal)
        2: {
            titulo: 'Probar Backups y Aumentar Frecuencia (Diarios)',
            que_implementar: 'Aumentar la frecuencia de backups semanales a diarios (para datos críticos) y, lo más importante, implementar pruebas de restauración periódicas.',
            por_que: 'Un backup que nunca se ha probado es solo una "suposición". Muchas empresas descubren que sus backups no funcionan recién cuando los necesitan. Probarlos es la única forma de garantizar que sirvan.',
            pasos: [
                'Aumentar la frecuencia de backup de servidores y datos críticos a Diaria.',
                'Agendar en el calendario: "Prueba de Restauración de Backup" (ej. primer viernes de cada mes).',
                'La prueba consiste en restaurar un archivo o una base de datos de muestra en un lugar temporal.',
                'Documentar los resultados de la prueba (Exitosa/Fallida).',
                'Asegurar que las copias estén protegidas contra ransomware (Inmutabilidad, si el proveedor lo ofrece).'
            ],
            estimacion: {
                tiempo: '1 Semana (Ajuste) + 4 horas mensuales',
                esfuerzo: '4 horas (Ajuste) + 4 horas/mes (Pruebas)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Checklist de prueba de restauración de backups.'
            ]
        }
    },
    
    'PR.PS-02': {
        // PUNTAJE 0: (Nunca)
        0: {
            titulo: 'Implementar Gestión de Parches de Seguridad Urgente',
            que_implementar: 'Establecer un proceso inmediato para instalar actualizaciones (parches) de seguridad en sistemas operativos y software crítico (navegadores, Office).',
            por_que: 'No actualizar el software es como dejar la puerta de casa abierta. Los atacantes explotan vulnerabilidades conocidas para las cuales ya existe un parche. Es la medida de higiene más básica.',
            pasos: [
                'Activar actualizaciones automáticas en TODOS los computadores (Windows Update, Mac Update).',
                'Ejecutar manualmente la búsqueda de actualizaciones en todos los equipos (AHORA).',
                'Instalar actualizaciones de navegadores (Chrome, Firefox) y software común (Adobe Reader, Java).',
                'Establecer un "Martes de Parches" mensual para revisar manualmente equipos críticos.'
            ],
            estimacion: {
                tiempo: '1-2 Semanas (Puesta al día inicial)',
                esfuerzo: '20-40 horas (Puesta al día) + 4 horas/mes',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guía de configuración de Windows Update.'
            ]
        },
        // PUNTAJE 1: (De vez en cuando)
        1: {
            titulo: 'Sistematizar la Gestión de Parches (Mensual)',
            que_implementar: 'Convertir el proceso esporádico ("de vez en cuando") en una rutina sistemática y mensual para asegurar que ningún equipo quede desactualizado.',
            por_que: 'La gestión esporádica siempre deja equipos vulnerables. Una rutina mensual obligatoria asegura cobertura completa y reduce la ventana de exposición a ataques.',
            pasos: [
                'Agendar en calendario: "Revisión Mensual de Parches" (ej. 3er martes del mes).',
                'Crear un checklist de software a revisar (S.O., Navegadores, Office, Adobe, Java, ERP).',
                'Usar el inventario de hardware para marcar qué equipos han sido parcheados.',
                'Priorizar servidores y equipos de gerencia.',
                'Documentar la ejecución de la rutina mensual.'
            ],
            estimacion: {
                tiempo: '1 Semana (Definir proceso)',
                esfuerzo: '8-16 horas mensuales (Ejecución)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Checklist mensual de gestión de parches.'
            ]
        },
        // PUNTAJE 2: (Cuando avisan)
        2: {
            titulo: 'Automatizar y Priorizar Parches Críticos (Gestión de Vulnerabilidades)',
            que_implementar: 'Pasar de un modelo reactivo ("cuando avisan") a uno proactivo y automatizado. Implementar herramientas que centralicen el parcheo y prioricen vulnerabilidades críticas.',
            por_que: 'Esperar el aviso es demasiado lento. Se necesita un sistema que detecte vulnerabilidades activamente y permita instalar parches críticos (ej. "Día Cero") de forma rápida y masiva.',
            pasos: [
                'Evaluar herramientas de gestión de parches (ej. ManageEngine Patch Manager, N-able N-sight) que automaticen la instalación.',
                'Suscribirse a boletines de seguridad (CSIRT Chile) para alertas de vulnerabilidades críticas.',
                'Definir un SLA: "Vulnerabilidades críticas deben parchearse en menos de 72 horas".',
                'Configurar la herramienta para que genere reportes de cumplimiento de parches.'
            ],
            estimacion: {
                tiempo: '1 Mes (Evaluación e implementación)',
                esfuerzo: '25-40 horas (Configuración)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Boletines del CSIRT Chile.',
                'ManageEngine Patch Manager.'
            ]
        }
    },
    
    // ==========================================
    // FASE 4: DETECCIÓN Y RESPUESTA
    // ==========================================
    'ID.IM-04': {
        // PUNTAJE 0: (No tenemos plan)
        0: {
            titulo: 'Crear Plan Básico de Respuesta a Incidentes (PIR)',
            que_implementar: 'Crear un documento simple (1-3 páginas) que indique exactamente qué hacer y a quién llamar si ocurre un incidente de seguridad (ej. ransomware).',
            por_que: 'En medio de una crisis, la improvisación lleva al pánico y a errores costosos (ej. pagar un rescate, borrar evidencia). Un plan simple da claridad y reduce el tiempo de respuesta.',
            pasos: [
                'Documentar el flujo: Detectar -> Reportar -> Contener -> Erradicar -> Recuperar.',
                'Definir roles: ¿Quién lidera la respuesta? ¿Quién toma decisiones? ¿Quién comunica?',
                'Crear "Lista de Contactos de Emergencia" (Proveedor TI, CSIRT, Gerente, Abogado).',
                'Imprimir este plan y guardarlo en un lugar accesible (no solo en la red, que podría estar caída).',
                'Revisarlo en la próxima reunión de gerencia.'
            ],
            estimacion: {
                tiempo: '1-2 Semanas',
                esfuerzo: '15-20 horas (Redacción y validación)',
                responsable: 'Responsable de seguridad + Gerencia'
            },
            recursos: [
                'Plantilla de Plan de Respuesta a Incidentes para PyMEs (INCIBE).'
            ]
        },
        // PUNTAJE 1: (Sabemos a quién llamar)
        1: {
            titulo: 'Documentar el Plan de Respuesta (PIR)',
            que_implementar: 'Pasar del conocimiento informal ("sabemos a quién llamar") a un plan documentado y formal que detalle los pasos a seguir.',
            por_que: 'El conocimiento informal se pierde si la persona clave no está disponible (vacaciones, enfermedad). Un documento asegura que cualquiera pueda seguir los pasos básicos.',
            pasos: [
                'Documentar la lista de contactos de emergencia (internos y externos).',
                'Definir roles y responsabilidades (quién lidera, quién ejecuta).',
                'Documentar los pasos de contención básicos (ver RS.MI-01).',
                'Documentar los pasos de recuperación (ver PR.DS-11).',
                'Guardar el documento en un lugar accesible y comunicarlo al equipo clave.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '10-15 horas (Redacción)',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Plantilla de PIR simplificado.'
            ]
        },
        // PUNTAJE 2: (Plan básico)
        2: {
            titulo: 'Detallar y Probar el Plan de Respuesta (PIR)',
            que_implementar: 'Mejorar el plan básico existente detallando "playbooks" (guías paso-a-paso) para incidentes específicos (Ransomware, Phishing, Fuga de Datos) y probar el plan.',
            por_que: 'Un plan que no se prueba, probablemente fallará. Probarlo (incluso en una simulación de "ejercicio de mesa") revela fallos, contactos desactualizados y roles poco claros.',
            pasos: [
                'Crear "Playbooks" para los 3 incidentes más probables (ej. Ransomware).',
                'Agendar un "Ejercicio de Mesa" (Tabletop Exercise) de 2 horas con el equipo gerencial.',
                'Simular un incidente (ej. "Son las 10am, 5 equipos reportan ransomware. ¿Qué hacemos AHORA?").',
                'Documentar lecciones aprendidas del ejercicio y actualizar el plan.',
                'Establecer esta prueba como algo anual.'
            ],
            estimacion: {
                tiempo: '1 Mes (Crear playbooks y ejecutar ejercicio)',
                esfuerzo: '20-30 horas',
                responsable: 'Responsable de seguridad + Gerencia'
            },
            recursos: [
                'Guía para ejecutar Ejercicios de Mesa (Tabletop).',
                'Plantillas de Playbooks de respuesta.'
            ]
        }
    },
    
    'DE.AE-08': {
        // PUNTAJE 0: (Caso a caso)
        0: {
            titulo: 'Definir Criterios de Declaración de Incidentes',
            que_implementar: 'Establecer y documentar criterios claros sobre qué es un "problema técnico" y qué es un "incidente de seguridad" que requiere una respuesta formal.',
            por_que: 'Sin criterios, se pierde tiempo valioso debatiendo si algo es "grave" o no, retrasando la contención. O, por el contrario, se genera pánico por eventos menores.',
            pasos: [
                'Definir criterios claros (ej. "Se declara incidente si..."):',
                '1. Hay sospecha de acceso no autorizado.',
                '2. Hay infección confirmada de malware/ransomware.',
                '3. Hay pérdida o robo de equipo con datos sensibles.',
                '4. Hay interrupción de un servicio crítico > RTO.',
                '5. Hay una solicitud de extorsión.',
                'Comunicar estos criterios al personal clave (TI, Gerencia).'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '4-8 horas (Definición y redacción)',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Plantilla de criterios de declaración.'
            ]
        },
        // PUNTAJE 1: (Criterios informales)
        1: {
            titulo: 'Documentar y Comunicar Criterios de Incidentes',
            que_implementar: 'Tomar los criterios informales existentes, documentarlos formalmente y comunicarlos a toda la organización, no solo al equipo técnico.',
            por_que: 'Cualquier empleado puede ser el primero en detectar un incidente. Todos deben saber qué es un incidente y cómo reportarlo. La documentación formaliza esto.',
            pasos: [
                'Documentar los criterios informales en el Plan de Respuesta a Incidentes (ID.IM-04).',
                'Crear un canal de reporte simple y único (ej. email "seguridad@...").',
                'Comunicar a todo el personal: "Si ve esto (criterios), repórtelo aquí (canal)".',
                'Incluir esto en la capacitación de concienciación (PR.AT-01).'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '8-10 horas (Documentar y comunicar)',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Infografía: "¿Cómo reportar un incidente?"'
            ]
        },
        // PUNTAJE 2: (Criterios documentados)
        2: {
            titulo: 'Formalizar y Registrar Incidentes',
            que_implementar: 'Implementar un sistema (puede ser un simple Excel o una herramienta) para registrar formalmente cada incidente declarado, permitiendo su seguimiento y análisis posterior.',
            por_que: 'Lo que no se mide, no se mejora. Registrar incidentes permite ver tendencias (ej. "mucho phishing este mes"), medir tiempos de respuesta y justificar inversiones futuras.',
            pasos: [
                'Crear un "Registro de Incidentes" (Excel o lista de SharePoint).',
                'Campos: Fecha/Hora, Tipo de Incidente, Criticidad, Estado (Abierto/Cerrado), Causa Raíz, Acciones Tomadas.',
                'Hacer obligatorio que todo incidente (según criterios) se registre.',
                'Revisar el registro mensualmente en la reunión de gerencia.',
                'Usar el registro para el análisis de lecciones aprendidas.'
            ],
            estimacion: {
                tiempo: '1 Semana (Crear plantilla)',
                esfuerzo: '8 horas (Crear) + 2 horas/mes (Mantener)',
                responsable: 'Responsable de seguridad'
            },
            recursos: [
                'Plantilla Excel de Registro de Incidentes.'
            ]
        }
    },
    
    'RS.MI-01': {
        // PUNTAJE 0: (No sabríamos)
        0: {
            titulo: 'Crear Procedimiento Básico de Contención',
            que_implementar: 'Definir y comunicar el paso más importante de la contención: "Desconectar el equipo de la red".',
            por_que: 'En un ataque de ransomware, cada segundo que el equipo está conectado, el malware se expande a otros equipos. La acción inmediata de desconectar (físicamente) la red es lo más crítico.',
            pasos: [
                'Definir el procedimiento: "Si sospecha de infección grave (ransomware):',
                '1. Desconecte el cable de red (TIRAR EL CABLE).',
                '2. Desactive el WiFi (modo avión).',
                '3. NO apague el equipo (se pierde evidencia).',
                '4. Llame inmediatamente al responsable de TI/seguridad."',
                'Comunicar este procedimiento a TODO el personal (pegar un sticker en los monitores si es necesario).'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '4-8 horas (Definir y comunicar)',
                responsable: 'Responsable TI/Seguridad'
            },
            recursos: [
                'Infografía "Qué hacer en caso de Ransomware".'
            ]
        },
        // PUNTAJE 1: (Apagar equipo)
        1: {
            titulo: 'Corregir Procedimiento: Aislar, NO Apagar',
            que_implementar: 'Corregir el procedimiento actual. La acción correcta es AISLAR (desconectar red/WiFi), no APAGAR (ya que borra evidencia vital de la memoria RAM).',
            por_que: 'Apagar el equipo borra la memoria RAM, que contiene la evidencia más importante de cómo entró el atacante. Sin esa evidencia, es imposible saber el alcance real del ataque.',
            pasos: [
                'Corregir el procedimiento: 1. AISLAR (desconectar red/WiFi), 2. NO APAGAR, 3. LLAMAR A TI.',
                'Capacitar al personal técnico sobre por qué no deben apagar el equipo (preservación de evidencia).',
                'Re-comunicar el procedimiento correcto a todo el personal.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '4-8 horas (Corregir y re-comunicar)',
                responsable: 'Responsable TI/Seguridad'
            },
            recursos: [
                'Guía de preservación de evidencia digital.'
            ]
        },
        // PUNTAJE 2: (Desconectar red)
        2: {
            titulo: 'Documentar y Probar Procedimiento de Contención',
            que_implementar: 'Documentar formalmente el procedimiento de contención (que ya conocen) en el Plan de Respuesta a Incidentes y probarlo.',
            por_que: 'Saber qué hacer es bueno, pero tenerlo documentado y probado es profesional. Asegura que el proceso sea consistente y rápido.',
            pasos: [
                'Documentar el procedimiento en el PIR (ID.IM-04).',
                'Incluir pasos para otros tipos de contención (ej. bloquear una cuenta de email comprometida).',
                'Realizar un simulacro: "Usuario X reporta ransomware. ¡YA!". Medir cuánto tiempo toma aislar el equipo.',
                'Identificar cuellos de botella (ej. ¿qué pasa si ocurre fuera de horario?).'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '10 horas (Documentar y probar)',
                responsable: 'Responsable TI/Seguridad'
            },
            recursos: [
                'Checklist de contención de incidentes.'
            ]
        }
    },
    
    'RS.MI-02': {
        // PUNTAJE 0: (No sabríamos)
        0: {
            titulo: 'Definir Procedimiento de Erradicación (Formateo)',
            que_implementar: 'Definir el procedimiento estándar para limpiar un equipo infectado: La única forma segura es formatear y reinstalar desde cero.',
            por_que: 'Intentar "limpiar" un virus con un antivirus a menudo falla. El malware moderno deja "puertas traseras" (backdoors) ocultas. Formatear es la única garantía de eliminación.',
            pasos: [
                'Definir como política: "Equipo infectado = Equipo formateado".',
                'Documentar el procedimiento: 1. Aislar, 2. Respaldar datos del usuario (solo documentos, NADA de programas), 3. Formatear disco, 4. Reinstalar S.O. desde cero, 5. Instalar parches/antivirus, 6. Restaurar datos.',
                'Asegurarse de tener los medios de instalación de S.O. (Windows) y software clave a mano.'
            ],
            estimacion: {
                tiempo: '1 Semana (Definir y preparar medios)',
                esfuerzo: '8-12 horas',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guía de reinstalación segura de Windows.'
            ]
        },
        // PUNTAJE 1: (Con antivirus)
        1: {
            titulo: 'Corregir Procedimiento: Formatear, NO Solo Limpiar',
            que_implementar: 'Cambiar el procedimiento actual de "intentar con antivirus" al procedimiento estándar de la industria: Formatear y reinstalar desde cero.',
            por_que: 'Confiar solo en un antivirus es riesgoso. El malware puede ocultarse (rootkits) o dejar backdoors. Formatear es más trabajo, pero es la única forma 100% segura de erradicar la amenaza.',
            pasos: [
                'Adoptar la política: "Equipo infectado = Equipo formateado".',
                'Documentar el procedimiento completo (Aislar, Respaldar datos, Formatear, Reinstalar, Parchear, Restaurar datos).',
                'Capacitar al equipo técnico sobre por qué este es el único método aceptable.'
            ],
            estimacion: {
                tiempo: '1 Semana (Definir y capacitar)',
                esfuerzo: '8 horas',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Guía de erradicación de malware.'
            ]
        },
        // PUNTAJE 2: (Llamar proveedor)
        2: {
            titulo: 'Documentar y Validar Procedimiento (Interno o Externo)',
            que_implementar: 'Documentar formalmente el procedimiento de erradicación (ya sea que lo haga el proveedor o internamente) y validar que se esté haciendo correctamente (formateo).',
            por_que: 'Depender de un proveedor está bien, pero debe validar que estén aplicando el estándar correcto (formateo). Si lo hace internamente, debe estar documentado para consistencia.',
            pasos: [
                'Documentar el procedimiento completo (Aislar, Respaldar, Formatear, Reinstalar, Parchear, Restaurar).',
                'Si lo hace un proveedor: solicitar el "Informe de Erradicación" que detalle los pasos que siguieron.',
                'Asegurarse de tener imágenes de sistema "limpias" (golden images) para agilizar la reinstalación.',
                'Incluir el paso "Análisis de Causa Raíz" (¿Cómo entró?) después de cada erradicación.'
            ],
            estimacion: {
                tiempo: '2 Semanas',
                esfuerzo: '10 horas (Documentar y validar)',
                responsable: 'Responsable TI'
            },
            recursos: [
                'Plantilla de Informe de Erradicación y Causa Raíz.'
            ]
        }
    }
};

// ============================================
// FUNCIÓN PRINCIPAL: GENERAR RECOMENDACIONES
// (MODIFICADA PARA LEER LA NUEVA ESTRUCTURA)
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
        
        // --- INICIO DE LA MODIFICACIÓN ---
        
        // 1. Obtener el objeto padre que contiene los 3 niveles (0, 1, 2)
        const plantillasDelControl = PLANTILLAS_RECOMENDACIONES[brecha.control_id];
        
        if (!plantillasDelControl) {
            console.warn(`⚠️ No hay plantillas de recomendación para ${brecha.control_id}`);
            return; // Saltar esta brecha
        }

        // 2. Seleccionar la plantilla específica usando el puntaje actual
        // brecha.puntaje_actual será 0, 1 o 2
        const plantilla = plantillasDelControl[brecha.puntaje_actual];

        if (!plantilla) {
            // Esto puede pasar si un control tiene brecha pero no plantilla para ese puntaje
            // (Ej. un puntaje 1 que no definimos, o un control que solo tiene puntaje 0)
            console.warn(`⚠️ No hay plantilla para ${brecha.control_id} con puntaje ${brecha.puntaje_actual}`);
            return; // Saltar esta brecha
        }
        
        // --- FIN DE LA MODIFICACIÓN ---
        
        
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
            
            // Datos de la plantilla específica (ej. la de puntaje 0)
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
    
    // Ordenar el plan final por el número de prioridad (ya viene ordenado desde brechas.js, pero re-aseguramos)
    planDeAccion.sort((a, b) => a.numero_prioridad - b.numero_prioridad);
    
    return planDeAccion;
}

// ============================================
// PERSONALIZACIÓN DE RECOMENDACIONES
// (Sin cambios)
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
// (Sin cambios)
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
// (Sin cambios)
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
// (Sin cambios)
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