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
            titulo: 'Definir quién se encargará de la ciberseguridad en la empresa',
            que_implementar: 'Nombrar de manera formal a una persona que sea responsable de coordinar todo lo relacionado con la ciberseguridad. Puede ser el propio gerente, alguien de tecnología o el proveedor externo que da soporte informático.',
            por_que: 'Cuando no se sabe quién está a cargo, los problemas se resuelven tarde o se pasan por alto. Tener un responsable permite ordenar las tareas y responder más rápido si ocurre un incidente.',
            pasos: [
                'Elegir a la persona más adecuada (Gerente, encargado de TI interno o proveedor externo de confianza).',
                'Dejar por escrito la designación (por ejemplo, en un correo, anexo de contrato o breve acta).',
                'Explicar qué debe hacer: revisar los temas de seguridad, coordinar acciones y avisar a la gerencia si detecta riesgos.',
                'Informar a todo el equipo quién es la persona encargada y cómo puede contactarse con ella.'
            ],
            estimacion: {
                tiempo: '1 Semana',
                esfuerzo: '4 a 8 horas (reuniones y documentación básica)',
                responsable: 'Gerencia General / Directorio'
            },
            recursos: [
                'Buscar en sitio web de CSIRT Chile: plantillas de designación de responsables',
                'Buscar en INCIBE España: guías de roles de seguridad para PyMEs',
                'Crear documento simple: carta de designación con nombre, cargo y responsabilidades'
            ]
        }
        // Nota: Este control no tiene puntajes 1 o 2 en 'evaluador.js', solo 0 o 3.
        // Si el puntaje es 3, no hay brecha.
    },
    
    'GV.PO-01': {
        // PUNTAJE 0: (No tenemos políticas)
        0: {
            titulo: 'Crear reglas básicas de ciberseguridad para la empresa',
            que_implementar: 'Redactar tres reglas simples sobre temas clave: contraseñas seguras, uso correcto de internet y correo, y qué hacer si ocurre un problema o sospecha de ataque.',
            por_que: 'Hoy no existen reglas claras. Cuando las personas no saben qué se espera, cada uno actúa por su cuenta, lo que aumenta los errores y los riesgos de seguridad.',
            pasos: [
                'Escribir una regla sobre contraseñas: deben ser largas (mínimo 12 caracteres) y distintas en cada sistema. Cuando sea posible, activar verificación en dos pasos (un código al celular).',
                'Definir una regla sobre uso de internet y correo: no abrir enlaces ni archivos de origen desconocido y no instalar programas no autorizados.',
                'Definir qué hacer ante un incidente: a quién avisar y por qué medio (teléfono, correo, etc.).',
                'Reunir estas tres reglas en un documento corto (1 o 2 páginas) y guardarlo en un lugar accesible.',
                'Hacer una reunión breve (30 minutos) para explicar las reglas a todos los trabajadores.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '15 a 20 horas (redacción y comunicación)',
                responsable: 'Gerencia o persona encargada de ciberseguridad'
            },
            recursos: [
                'Visitar csirt.gob.cl - sección recursos para empresas',
                'Buscar en incibe.es: "políticas básicas de seguridad"',
                'Crear documento propio: 3 reglas en máximo 2 páginas'
            ]
        },

        // PUNTAJE 1: (Reglas informales)
        1: {
            titulo: 'Dejar por escrito las reglas de seguridad que ya aplican',
            que_implementar: 'Tomar las prácticas que el equipo ya sigue de manera informal y transformarlas en un documento breve, compartido y firmado por todos.',
            por_que: 'Las reglas orales se olvidan o se aplican de forma distinta. Al escribirlas y compartirlas, todos entienden lo mismo y se puede enseñar fácilmente a los nuevos empleados.',
            pasos: [
                'Conversar con el equipo para anotar las reglas que ya aplican en la práctica (por ejemplo, cómo se crean las contraseñas o cómo se reportan los incidentes).',
                'Redactar el documento con lenguaje simple y ejemplos concretos.',
                'Asegurarse de que incluya temas como trabajo remoto o uso de dispositivos personales, si corresponde.',
                'Enviar el documento por correo o imprimirlo, y pedir que todos confirmen su recepción (firma o respuesta por correo).',
                'Revisar y actualizar las reglas una vez al año.'
            ],
            estimacion: {
                tiempo: '1 a 2 semanas',
                esfuerzo: '10 a 15 horas (reuniones y redacción)',
                responsable: 'Persona encargada de ciberseguridad o gerencia'
            },
            recursos: [
                'Usar las políticas verbales actuales como base del documento',
                'Buscar en internet: "plantilla política de seguridad simple"',
                'Crear formulario de lectura: nombre, fecha, firma'
            ]
        },

        // PUNTAJE 2: (Políticas básicas)
        2: {
            titulo: 'Actualizar y reforzar las políticas existentes',
            que_implementar: 'Asegurar que las políticas ya creadas estén firmadas, se comuniquen a todo el personal y se amplíen para cubrir nuevos temas como uso de celulares, respaldos o respuesta ante incidentes.',
            por_que: 'Ya existen políticas básicas, pero aún no se aplican de forma completa o no abarcan todas las áreas importantes. Este paso asegura que todos las conozcan y que se mantengan actualizadas.',
            pasos: [
                'Pedir a los empleados que firmen un acuse de recibo (digital o en papel) de las políticas actuales.',
                'Incluir la revisión de las políticas en la inducción de nuevos trabajadores.',
                'Agregar temas adicionales: uso de dispositivos personales, frecuencia de respaldos y qué hacer ante un incidente grave.',
                'Hacer una charla corta una vez al año para recordar y reforzar estas políticas.'
            ],
            estimacion: {
                tiempo: '3 a 4 semanas',
                esfuerzo: '10 horas (comunicación) + 15 horas (actualización)',
                responsable: 'Encargado de ciberseguridad y área de RRHH'
            },
            recursos: [
                'Ampliar documento actual con secciones: BYOD, respaldos, respuesta a incidentes',
                'Buscar ejemplos en: ISO 27002 simplificado para PyMEs',
                'Crear registro Excel: empleado, fecha firma, fecha revisión anual'
            ]
        }
    },

    'GV.OC-01': {
        // PUNTAJE 0: (No se considera)
        0: {
            titulo: 'Incluir la ciberseguridad en las decisiones del negocio',
            que_implementar: 'Comenzar a conversar sobre temas de ciberseguridad cada vez que se tomen decisiones importantes en la empresa, como contratar un proveedor o implementar un nuevo sistema.',
            por_que: 'Si no se considera la seguridad en las decisiones, pueden generarse problemas costosos más adelante, como pérdida de información o interrupción del negocio.',
            pasos: [
                'Dedicar al menos 10 minutos en las reuniones de gerencia para hablar de seguridad digital.',
                'Usar una pregunta guía: “¿Esta decisión o nuevo servicio podría traer algún riesgo para nuestros datos o sistemas?”.',
                'Identificar los tres recursos más importantes para la empresa (por ejemplo, base de datos de clientes, sistema de ventas o facturación).',
                'Definir quién es responsable de cada uno de esos recursos.'
            ],
            estimacion: {
                tiempo: 'Continuo (implementación inicial: 1 semana)',
                esfuerzo: '2 a 4 horas mensuales en reuniones',
                responsable: 'Gerencia general o dueño del negocio'
            },
            recursos: [
                'Crear lista propia: 3-5 activos más críticos de la empresa',
                'Buscar en csirt.gob.cl: guías de gestión de riesgos básica',
                'Agregar punto fijo en agenda de reuniones: "Seguridad digital (10 min)"'
            ]
        },

        // PUNTAJE 1: (Solo cuando surgen problemas)
        1: {
            titulo: 'Pasar de actuar solo ante problemas a planificar con anticipación',
            que_implementar: 'Incluir el tema de seguridad digital en la planificación de nuevos proyectos o compras, no solo cuando ocurre un incidente.',
            por_que: 'Esperar a tener un problema para actuar genera más costos y estrés. Pensar en seguridad desde el inicio evita interrupciones y protege la confianza de los clientes.',
            pasos: [
                'Agregar un punto fijo sobre seguridad en las reuniones de gerencia o planificación.',
                'Usar una lista simple de verificación (5 preguntas) antes de contratar un proveedor o implementar un nuevo sistema. Ejemplo: ¿Tendrá acceso a información sensible?, ¿usa contraseñas seguras?, ¿podemos revisar sus medidas de seguridad?, ¿qué pasa si falla?, ¿cómo se recupera la información?',
                'Hacer una revisión de los principales riesgos al menos una vez al año (por ejemplo, pérdida de datos, ataques o fallas de sistemas).',
                'Dejar registro de las decisiones sobre esos riesgos, aunque sea en una planilla o correo.'
            ],
            estimacion: {
                tiempo: '2 semanas (para implementar el proceso)',
                esfuerzo: '10 a 15 horas (diseñar checklist y realizar la primera reunión)',
                responsable: 'Gerencia y persona encargada de ciberseguridad'
            },
            recursos: [
                'Crear checklist de 5 preguntas para evaluar proveedores',
                'Buscar en internet: "matriz de riesgos simple Excel"',
                'Crear tabla propia: riesgo, probabilidad, impacto, acción'
            ]
        },

        // PUNTAJE 2: (Informalmente)
        2: {
            titulo: 'Formalizar la revisión de riesgos en los proyectos y decisiones',
            que_implementar: 'Transformar las conversaciones informales sobre seguridad en un proceso claro y repetible para todas las decisiones importantes del negocio.',
            por_que: 'Depender de la memoria o del criterio de cada persona hace que los riesgos se pasen por alto. Un proceso formal asegura que siempre se evalúe la seguridad antes de aprobar una decisión.',
            pasos: [
                'Crear un formulario simple que se complete cada vez que se evalúe un nuevo proyecto o proveedor.',
                'Definir criterios de alerta: por ejemplo, “rojo” si implica compartir datos sensibles o “verde” si no presenta riesgos relevantes.',
                'Incluir al encargado de ciberseguridad en la aprobación de compras o contrataciones tecnológicas.',
                'Guardar los formularios o decisiones en una carpeta o planilla como respaldo.'
            ],
            estimacion: {
                tiempo: '3 a 4 semanas',
                esfuerzo: '20 a 25 horas (crear formularios y definir flujos)',
                responsable: 'Encargado de ciberseguridad o persona designada por la gerencia'
            },
            recursos: [
                'Crear formulario simple: proyecto, fecha, riesgos identificados, decisión',
                'Definir semáforo propio: verde (sin riesgo), amarillo (revisar), rojo (requiere aprobación especial)',
                'Crear carpeta compartida: guardar formularios completados'
            ]
        }
    },

    
    'GV.RM-02': {
        // PUNTAJE 0: (No evaluado)
        0: {
            titulo: 'Definir cuánto tiempo y datos puede perder la empresa sin afectar el negocio',
            que_implementar: 'Analizar y dejar por escrito cuánto tiempo puede funcionar la empresa si un sistema se detiene y cuánta información podría perderse sin que sea un daño grave.',
            por_que: 'Si no se sabe ese límite, no se pueden tomar buenas decisiones sobre respaldos ni recuperación. Se corre el riesgo de invertir de más en algo poco importante o de menos en algo esencial.',
            pasos: [
                'Identificar los 3 a 5 procesos más importantes de la empresa (por ejemplo: ventas, facturación, atención a clientes).',
                'Para cada proceso, preguntar: “¿Cuánto tiempo podemos trabajar si este sistema se cae?” (por ejemplo: 4 horas, 1 día, 3 días).',
                'Luego preguntar: “¿Cuánta información podríamos perder sin afectar demasiado el negocio?” (por ejemplo: los datos de la última hora, o del último día).',
                'Anotar esas respuestas en una tabla o planilla y usarlas para decidir cada cuánto se hacen los respaldos y qué sistemas se recuperan primero si ocurre un problema.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '8 a 10 horas (reuniones con gerencia o socios)',
                responsable: 'Gerencia general o persona encargada de ciberseguridad'
            },
            recursos: [
                'Crear tabla Excel: proceso, tiempo máximo de caída aceptable, datos que se pueden perder',
                'Buscar en internet: "RTO RPO explicación simple"',
                'Reunirse con gerencia para definir estos tiempos'
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
            titulo: 'Registrar todos los equipos tecnológicos de la empresa',
            que_implementar: 'Crear una lista sencilla, por ejemplo en una planilla de Excel o Google Sheets, con todos los computadores, notebooks, impresoras y otros equipos que se usen en la empresa.',
            por_que: 'No se puede proteger lo que no se conoce. Sin una lista actualizada, es difícil saber qué equipos existen, cuáles faltan o cuáles necesitan mantención.',
            pasos: [
                'Abrir una planilla y crear columnas con: tipo de equipo, marca o modelo, número de serie, persona que lo usa y ubicación.',
                'Recorrer la oficina y anotar cada equipo encontrado.',
                'Si hay equipos conectados a la red, pedir apoyo al encargado de tecnología o proveedor externo para revisar cuántos están activos.',
                'Definir a una persona responsable de mantener esta lista actualizada cuando se compre o retire un equipo.'
            ],
            estimacion: {
                tiempo: '1 a 2 semanas',
                esfuerzo: '15 a 25 horas (según tamaño de la empresa)',
                responsable: 'Encargado de tecnología o administrativo designado'
            },
            recursos: [
                'Crear Excel simple: tipo equipo, marca, serial, usuario, ubicación',
                'Buscar "Spiceworks" en internet - es gratuito',
                'Hacer recorrido físico de la oficina anotando equipos'
            ]
        },

        // PUNTAJE 1: (Lista desactualizada)
        1: {
            titulo: 'Revisar y mantener al día la lista de equipos',
            que_implementar: 'Revisar la lista existente, eliminar los equipos que ya no se usan, agregar los nuevos y establecer un método para mantenerla siempre actualizada.',
            por_que: 'Un inventario viejo genera confusión y puede hacer creer que hay más o menos equipos de los reales. Tenerlo al día evita pérdidas y facilita la gestión.',
            pasos: [
                'Comparar la lista existente con los equipos realmente disponibles.',
                'Agregar información útil, como fecha de compra, estado o si está bajo garantía.',
                'Acordar un proceso claro: cada vez que se compre o dé de baja un equipo, se actualiza la lista.',
                'Revisar la lista completa al menos dos veces al año.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '10 a 15 horas (revisión y actualización)',
                responsable: 'Encargado de tecnología o persona responsable de inventario'
            },
            recursos: [
                'Agregar columnas al Excel: fecha compra, garantía vigente, estado',
                'Definir proceso: cada compra/baja → actualizar Excel el mismo día',
                'Agendar revisión semestral en calendario'
            ]
        },

        // PUNTAJE 2: (Inventario digital)
        2: {
            titulo: 'Usar herramientas automáticas para mantener el inventario actualizado',
            que_implementar: 'Pasar de una lista manual a una herramienta que detecte automáticamente los equipos conectados a la red y permita asignar responsables por cada uno.',
            por_que: 'Las planillas manuales pueden tener errores o quedarse desactualizadas. Un sistema automatizado ahorra tiempo y mejora el control.',
            pasos: [
                'Revisar opciones de herramientas gratuitas que ayuden a detectar equipos conectados (por ejemplo, Spiceworks o OCS Inventory).',
                'Instalar la herramienta y hacer una revisión inicial de los equipos detectados.',
                'Comprobar que la información sea correcta y ajustar lo necesario.',
                'Agregar un campo para identificar quién usa o cuida cada equipo importante.',
                'Revisar la lista cuando se detecten equipos nuevos o desconocidos.'
            ],
            estimacion: {
                tiempo: '2 a 3 semanas',
                esfuerzo: '20 a 30 horas (instalación y configuración inicial)',
                responsable: 'Encargado de tecnología o proveedor TI externo'
            },
            recursos: [
                'Descargar Spiceworks Inventory (gratuito): spiceworks.com',
                'Alternativa: OCS Inventory (código abierto): ocsinventory-ng.org',
                'Buscar en YouTube: "tutorial Spiceworks español"'
            ]
        }
    },

    'ID.AM-02': {
        // PUNTAJE 0: (No tenemos inventario)
        0: {
            titulo: 'Registrar todos los programas y servicios digitales que usa la empresa',
            que_implementar: 'Hacer una lista simple (en Excel o Google Sheets) con todos los programas instalados en los equipos y los servicios en la nube que se utilicen, como correo, almacenamiento o facturación electrónica.',
            por_que: 'Tener claro qué software se usa ayuda a evitar programas pirata o desactualizados que pueden provocar infecciones o pérdidas de información. Además, permite controlar mejor los accesos a los servicios en la nube.',
            pasos: [
                'Crear una planilla con columnas: nombre del programa o servicio, proveedor, cantidad de licencias, fecha de vencimiento y responsable.',
                'Anotar los programas principales: sistema operativo, antivirus, ofimática, facturación, contabilidad, etc.',
                'Anotar los servicios en la nube: correo electrónico, almacenamiento, colaboración o facturación en línea.',
                'Eliminar o reemplazar software sin licencia o de origen desconocido.',
                'Configurar recordatorios de renovación de licencias importantes.'
            ],
            estimacion: {
                tiempo: '1 a 2 semanas',
                esfuerzo: '15 a 20 horas',
                responsable: 'Encargado de tecnología y/o área administrativa'
            },
            recursos: [
                'Crear Excel: nombre programa, proveedor, cantidad licencias, vencimiento',
                'Descargar Belarc Advisor (gratuito) para ver software instalado',
                'Buscar "alternativas gratuitas a [programa]" para reemplazar software pirata'
            ]
        },

        // PUNTAJE 1: (Lista desactualizada)
        1: {
            titulo: 'Actualizar y revisar periódicamente la lista de software y servicios',
            que_implementar: 'Revisar la lista actual, verificar qué programas y servicios están realmente en uso y comprobar que todas las licencias estén vigentes.',
            por_que: 'Los programas cambian frecuentemente y los empleados pueden instalar software no autorizado. Mantener la lista al día permite reducir riesgos y evitar sanciones o interrupciones de servicio.',
            pasos: [
                'Revisar una muestra de equipos (5 a 10) para confirmar qué software tienen instalado.',
                'Actualizar la lista con los programas nuevos o eliminados.',
                'Verificar que todas las licencias estén vigentes y registrar sus fechas de vencimiento.',
                'Definir una revisión de este inventario cada seis meses.',
                'Crear una breve política que indique qué software está autorizado para usar en la empresa.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '10 a 15 horas',
                responsable: 'Encargado de tecnología o proveedor TI'
            },
            recursos: [
                'Revisar 5-10 equipos manualmente para verificar software instalado',
                'Crear política breve: "Software autorizado en la empresa"',
                'Agendar revisión cada 6 meses'
            ]
        },

        // PUNTAJE 2: (Inventario digital)
        2: {
            titulo: 'Usar una herramienta automática para controlar software y licencias',
            que_implementar: 'Implementar una herramienta que detecte automáticamente los programas instalados y ayude a controlar las licencias y fechas de renovación.',
            por_que: 'Hacerlo manualmente puede causar errores o multas si se usan programas sin licencia. Una herramienta automatizada permite ahorrar tiempo y tener control total del software usado.',
            pasos: [
                'Evaluar opciones gratuitas o de bajo costo (por ejemplo: Spiceworks o Snipe-IT).',
                'Instalar la herramienta y hacer un primer escaneo para identificar los programas instalados.',
                'Revisar la información y ajustar los datos que sean necesarios.',
                'Ingresar las licencias, facturas y fechas de vencimiento en el sistema.',
                'Activar alertas automáticas para renovar licencias a tiempo.'
            ],
            estimacion: {
                tiempo: '2 a 4 semanas',
                esfuerzo: '25 a 40 horas (configuración inicial y carga de datos)',
                responsable: 'Encargado de tecnología o proveedor externo de TI'
            },
            recursos: [
                'Buscar "Snipe-IT" - sistema gratuito de gestión de activos',
                'Alternativa: usar Spiceworks para inventario de software también',
                'Configurar alertas de vencimiento de licencias'
            ]
        }
    },
    'PR.AT-01': {
        // PUNTAJE 0: (No se ha realizado capacitación)
        0: {
            titulo: 'Realizar una charla básica sobre ciberseguridad y correos falsos (phishing)',
            que_implementar: 'Organizar una primera charla breve y obligatoria para todo el personal, enfocada en cómo reconocer correos o mensajes sospechosos y qué hacer si ocurre un incidente.',
            por_que: 'La mayoría de los ataques comienzan con un error humano. Pensar que la capacitación “no es necesaria” deja a la empresa completamente expuesta. El personal es la primera barrera de defensa.',
            pasos: [
                'Agendar una charla presencial o virtual de 1 a 2 horas para todo el personal.',
                'Temas mínimos: cómo identificar correos o mensajes falsos, buenas prácticas con contraseñas y cómo reportar incidentes.',
                'Entregar una guía o infografía sencilla como recordatorio.',
                'Incluir esta capacitación en la inducción de nuevos empleados.'
            ],
            estimacion: {
                tiempo: '1 mes (entre coordinación y ejecución)',
                esfuerzo: '10 horas de organización + 2 horas por empleado',
                responsable: 'Gerencia o encargado/a de seguridad / RRHH'
            },
            recursos: [
                'Buscar en csirt.gob.cl material de concientización gratuito',
                'Buscar en YouTube: "INCIBE phishing" para videos educativos',
                'Buscar en Google Imágenes: "ejemplos phishing" para mostrar en charla',
                'Crear presentación propia de 10-15 diapositivas'
            ]
        },

        // PUNTAJE 1: (Solo se entrega material para leer)
        1: {
            titulo: 'Pasar de material informativo a capacitación práctica',
            que_implementar: 'Reemplazar el envío de documentos por una charla interactiva o taller que permita a los empleados participar, hacer preguntas y ver ejemplos reales.',
            por_que: 'Leer un documento no genera aprendizaje real. Una charla práctica mejora la comprensión, genera conciencia y permite resolver dudas directamente.',
            pasos: [
                'Planificar una charla o taller de 1 a 1,5 horas para todo el equipo.',
                'Mostrar ejemplos reales de correos falsos (phishing) o incidentes comunes.',
                'Incluir un breve quiz o ejercicio al final de la sesión.',
                'Grabar la sesión para nuevos empleados o refuerzo posterior.',
                'Repetir la actividad al menos una vez al año.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '10 horas de preparación + 1,5 horas por empleado',
                responsable: 'Encargado/a de seguridad o asesor externo'
            },
            recursos: [
                'Buscar ejemplos reales de correos phishing en: csirt.gob.cl/alertas',
                'Crear quiz simple de 5-10 preguntas al final de la charla',
                'Usar Zoom/Meet para grabar la sesión (para nuevos empleados)',
                'Agendar charla anual en calendario'
            ]
        },

        // PUNTAJE 2: (Se realiza charla básica)
        2: {
            titulo: 'Crear un programa continuo de capacitación con simulaciones de phishing',
            que_implementar: 'Dar el siguiente paso: mantener la capacitación activa durante el año e incluir pruebas prácticas simuladas de phishing para reforzar lo aprendido.',
            por_que: 'Las charlas puntuales se olvidan. Las simulaciones permiten medir si las personas aplican lo aprendido y ayudan a enfocar el refuerzo en quienes más lo necesitan.',
            pasos: [
                'Usar una herramienta gratuita o de bajo costo para enviar correos simulados de phishing (por ejemplo, “Gophish” o “KnowBe4”).',
                'Realizar pruebas trimestrales a distintos grupos de empleados.',
                'A quienes caigan en la simulación, enviarles una mini-cápsula de capacitación (videos cortos o guías).',
                'Presentar resultados a gerencia para mostrar mejoras (por ejemplo: “bajamos de 30% a 10% de clics en correos falsos”).'
            ],
            estimacion: {
                tiempo: '1 mes (configuración inicial)',
                esfuerzo: '8 horas de preparación + 4 horas mensuales para seguimiento',
                responsable: 'Encargado/a de seguridad o proveedor externo'
            },
            recursos: [
                'Descargar Gophish (gratuito, código abierto): getgophish.com',
                'Buscar tutoriales: "cómo instalar Gophish"',
                'Alternativa comercial con prueba gratuita: KnowBe4',
                'Crear registro Excel: fecha simulación, emails enviados, clicks, capacitación enviada'
            ]
        }
    },

    'ID.RA-09': {
        // PUNTAJE 0: (Sin política)
        0: {
            titulo: 'Definir una política clara para comprar e instalar software y equipos',
            que_implementar: 'Escribir una regla simple que indique que solo se usará software con licencia válida y equipos comprados a proveedores confiables. Además, dejar por escrito quién puede aprobar nuevas compras o instalaciones.',
            por_que: 'Usar software pirata o equipos sin garantía es una de las principales causas de virus y pérdida de información. También puede generar multas o dañar la reputación de la empresa.',
            pasos: [
                'Redactar una breve política: “Solo se instalará software con licencia válida y equipos comprados a proveedores oficiales”.',
                'Definir un proceso de solicitud: todo nuevo programa o equipo debe ser aprobado por el encargado de tecnología o gerencia.',
                'Revisar los equipos y eliminar o reemplazar software sin licencia o de origen desconocido.',
                'Comunicar la nueva política a todos los empleados.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '15 a 20 horas (revisión y redacción)',
                responsable: 'Encargado de tecnología y gerencia'
            },
            recursos: [
                'Crear política de 1 página: "Solo software con licencia y proveedores oficiales"',
                'Buscar "alternativas gratuitas a [programa]": alternativeto.net',
                'Hacer lista de proveedores oficiales con los que ya trabajan'
            ]
        },

        // PUNTAJE 1: (A veces se compran productos no oficiales)
        1: {
            titulo: 'Formalizar los proveedores y eliminar software no autorizado',
            que_implementar: 'Crear una lista oficial de proveedores aprobados y asegurarse de que todo el software y hardware de la empresa cumpla con las licencias y garantías correspondientes.',
            por_que: 'Comprar “a veces” a fuentes no oficiales sigue siendo un riesgo de seguridad. Formalizar los proveedores y controlar las instalaciones ayuda a evitar virus, sanciones y fallas por equipos falsificados.',
            pasos: [
                'Crear una lista de proveedores autorizados de software y hardware (“lista blanca”).',
                'Eliminar o reemplazar el software sin licencia, comenzando por los sistemas más importantes.',
                'Restringir la instalación de programas en los equipos (solo con autorización del encargado TI).',
                'Recordar a los empleados que instalar software no autorizado puede afectar la seguridad y el cumplimiento legal.'
            ],
            estimacion: {
                tiempo: '1 a 3 meses (según cantidad de equipos)',
                esfuerzo: '20 a 40 horas',
                responsable: 'Encargado de tecnología'
            },
            recursos: [
                'Crear "Lista blanca" de proveedores autorizados',
                'Buscar en Google: "restringir instalación software Windows GPO"',
                'Eliminar software pirata comenzando por sistemas más críticos'
            ]
        },

        // PUNTAJE 2: (Compra siempre a proveedores oficiales)
        2: {
            titulo: 'Verificar la autenticidad del software y los equipos recibidos',
            que_implementar: 'Agregar un paso de verificación antes de usar nuevos equipos o programas, asegurándose de que sean originales y no contengan riesgos ocultos.',
            por_que: 'Incluso los proveedores oficiales pueden cometer errores o recibir productos alterados. Verificar la autenticidad evita instalar programas modificados o equipos infectados desde el origen.',
            pasos: [
                'Usar una lista de verificación al recibir nuevos equipos (revisar número de serie y coincidencia con la factura).',
                'Verificar la firma digital o código de descarga de los programas cuando el fabricante los publique.',
                'Ejecutar un análisis antivirus o de seguridad antes de conectar el equipo nuevo a la red.',
                'Revisar una vez al año las licencias y activaciones en los portales de los fabricantes (Microsoft, Adobe, etc.).'
            ],
            estimacion: {
                tiempo: '2 semanas (para definir el proceso)',
                esfuerzo: '10 horas para crear el checklist + 30 minutos por equipo nuevo',
                responsable: 'Encargado de tecnología o proveedor externo de TI'
            },
            recursos: [
                'Crear checklist al recibir equipo: verificar serial, factura, caja sellada',
                'Buscar "verificar firma digital archivo Windows"',
                'Revisar portales oficiales: Microsoft, Adobe para validar licencias',
                'Escanear con antivirus equipos nuevos antes de conectar a red'
            ]
        }
    },

    
    // ==========================================
    // FASE 3: PROTECCIÓN TÉCNICA
    // ==========================================
    'PR.AA-01': {
        // PUNTAJE 0: (Sin proceso)
        0: {
            titulo: 'Definir un proceso claro para entrada y salida de empleados',
            que_implementar: 'Crear un procedimiento simple y por escrito para manejar las cuentas de los empleados cuando entran o dejan la empresa.',
            por_que: 'Si las cuentas de ex empleados siguen activas, pueden ser usadas por personas no autorizadas, generando un riesgo grave para la información de la empresa.',
            pasos: [
                'Crear una lista de verificación para nuevos empleados: crear correo, dar acceso a sistemas, definir contraseña segura, explicar reglas de seguridad, firmar acuerdo de confidencialidad.',
                'Crear otra lista para empleados que se van: desactivar correo el mismo día, eliminar accesos, respaldar archivos importantes y recuperar los equipos entregados.',
                'Asegurar que el proceso de salida se haga el mismo día en que la persona deja la empresa.',
                'Coordinar este flujo entre el área de Recursos Humanos y el encargado de tecnología.',
                'Revisar si existen cuentas de ex empleados y eliminarlas de inmediato.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '20 a 30 horas (revisión y creación de listas)',
                responsable: 'Encargado de tecnología y Recursos Humanos'
            },
            recursos: [
                'Crear checklist de ingreso: crear correo, accesos, explicar políticas, firma confidencialidad',
                'Crear checklist de salida: desactivar correo, quitar accesos, respaldar archivos, recuperar equipos',
                'Coordinar con RRHH: avisar el mismo día de entrada/salida'
            ]
        },

        // PUNTAJE 1: (Solo se hace cuando se recuerda)
        1: {
            titulo: 'Formalizar el proceso de creación y eliminación de cuentas',
            que_implementar: 'Dejar por escrito el proceso para crear y eliminar cuentas, asegurando que se cumpla siempre y dentro de un plazo fijo, especialmente al momento de salida.',
            por_que: 'Cuando el proceso no es formal, las cuentas pueden quedar activas por días, aumentando el riesgo de uso indebido. Un procedimiento claro y rápido evita ese problema.',
            pasos: [
                'Documentar el procedimiento formal de altas y bajas con listas de verificación.',
                'Definir un tiempo máximo para ejecutar las bajas (por ejemplo, dentro de 8 horas desde la notificación).',
                'Hacer una revisión mensual de las cuentas activas comparándolas con la lista del personal actual.',
                'Registrar cada eliminación de cuenta (quién la realizó y cuándo).'
            ],
            estimacion: {
                tiempo: '1 semana (documentar y revisar)',
                esfuerzo: '10 horas iniciales + 4 horas mensuales de control',
                responsable: 'Encargado de tecnología y RRHH'
            },
            recursos: [
                'Documentar proceso formal de altas y bajas',
                'Crear registro: fecha, usuario, tipo (alta/baja), responsable',
                'Definir plazo máximo: bajas en menos de 8 horas',
                'Revisar mensualmente: comparar usuarios activos vs nómina'
            ]
        },

        // PUNTAJE 2: (Proceso informal)
        2: {
            titulo: 'Revisar y automatizar la gestión de cuentas de usuario',
            que_implementar: 'Pasar del proceso manual a uno automatizado o centralizado, para reducir errores y asegurar que las cuentas se creen y eliminen correctamente.',
            por_que: 'Los procesos informales dependen de las personas. Automatizar o centralizar mejora el control, evita olvidos y permite auditorías más confiables.',
            pasos: [
                'Formalizar el proceso en un documento oficial con responsables definidos.',
                'Revisar trimestralmente la lista de usuarios y eliminar accesos innecesarios.',
                'Hacer una revisión semestral de privilegios (quién tiene permisos de administrador y si aún los necesita).',
                'Si se usan muchos servicios en la nube, evaluar herramientas de gestión centralizada como Microsoft 365, Google Workspace o similares.'
            ],
            estimacion: {
                tiempo: 'Continuo (revisiones trimestrales)',
                esfuerzo: '8 horas por revisión trimestral',
                responsable: 'Encargado de tecnología'
            },
            recursos: [
                'Crear matriz de permisos: rol → sistemas → nivel de acceso',
                'Revisar trimestralmente: usuarios con acceso innecesario',
                'Revisar semestralmente: quién tiene permisos de administrador',
                'Si usan Microsoft 365 o Google Workspace: revisar panel de administración'
            ]
        }
    },

    'PR.AA-03': {
        // PUNTAJE 0: (Solo contraseñas)
        0: {
            titulo: 'Activar la verificación en dos pasos en los servicios críticos',
            que_implementar: 'Configurar la verificación en dos pasos (también llamada autenticación multifactor o MFA) en las cuentas más importantes de la empresa, como correo electrónico, banca en línea o sistemas administrativos. Además de la contraseña, el usuario deberá ingresar un código enviado al celular o generado por una aplicación.',
            por_que: 'Las contraseñas por sí solas ya no son seguras. Si alguien las roba, puede acceder a toda la información de la empresa. La verificación en dos pasos agrega una capa adicional que evita más del 90% de los ataques a cuentas.',
            pasos: [
                'Identificar los servicios críticos que usen cuentas con acceso sensible (correo, banco, sistema contable o de facturación).',
                'Activar la verificación en dos pasos primero en las cuentas de administración y gerencia.',
                'Luego extenderla de forma gradual al resto de los usuarios por departamento.',
                'Capacitar al personal sobre cómo usar las aplicaciones de verificación (Google Authenticator, Microsoft Authenticator, etc.).'
            ],
            estimacion: {
                tiempo: '1 a 4 semanas (según número de usuarios)',
                esfuerzo: '15 a 30 horas (configuración y apoyo al personal)',
                responsable: 'Encargado de tecnología o proveedor externo de TI'
            },
            recursos: [
                'Buscar en Google: "activar autenticación dos pasos [nombre del servicio]"',
                'Para Microsoft 365: buscar "activar MFA (autenticación multifactor) Microsoft 365"',
                'Para Google: buscar "activar verificación 2 pasos Google"',
                'Descargar apps: Google Authenticator o Microsoft Authenticator (gratuitas)',
                'Empezar por cuentas de administradores y gerencia primero'
            ]
        },

        // PUNTAJE 1: (Solo algunos sistemas protegidos)
        1: {
            titulo: 'Ampliar el uso de la verificación en dos pasos a más sistemas',
            que_implementar: 'Extender el uso de MFA desde unos pocos servicios a la mayoría de los sistemas que contengan información importante o permitan acceso remoto.',
            por_que: 'Proteger solo algunos sistemas deja puntos débiles abiertos. Los atacantes buscan la cuenta más fácil de comprometer. Asegurar todos los accesos críticos reduce drásticamente el riesgo.',
            pasos: [
                'Hacer una lista de todos los sistemas que usa la empresa (correo, contabilidad, nube, acceso remoto).',
                'Marcar cuáles permiten usar MFA y activarla en cada uno.',
                'Priorizar los sistemas más sensibles: correo, contabilidad, almacenamiento en la nube y VPN.',
                'Definir una regla interna: cualquier servicio nuevo debe tener MFA activado desde el inicio.'
            ],
            estimacion: {
                tiempo: '1 mes',
                esfuerzo: '20 a 40 horas (despliegue y soporte al personal)',
                responsable: 'Encargado de tecnología'
            },
            recursos: [
                'Hacer lista de todos los sistemas usados en la empresa',
                'Marcar cuáles permiten MFA (autenticación multifactor), la mayoría de servicios modernos lo permiten',
                'Buscar para cada uno: "[nombre servicio] activar MFA (autenticación multifactor)"',
                'Priorizar: correo, banco en línea, contabilidad, almacenamiento en nube'
            ]
        },

        // PUNTAJE 2: (Mayoría protegida con MFA)
        2: {
            titulo: 'Asegurar que todas las cuentas y sistemas usen MFA (autenticación multifactor)sin excepción',
            que_implementar: 'Verificar que el 100% de los usuarios y sistemas críticos tengan la verificación en dos pasos activa, y aplicar medidas automáticas que bloqueen los accesos sin esta protección.',
            por_que: 'Dejar una sola cuenta sin MFA (autenticación multifactor) puede poner en riesgo toda la organización. El objetivo es que ninguna cuenta quede fuera del sistema de protección.',
            pasos: [
                'Revisar los portales de administración para confirmar que todos los usuarios tengan MFA activado (autenticación multifactor).',
                'Obligar la activación para quienes aún no la tengan (por ejemplo, con un plazo de 48 horas).',
                'Si la plataforma lo permite, activar “Acceso Condicional” para bloquear inicios de sesión sin MFA (autenticación multifactor).',
                'Para cargos con acceso total (administradores o gerencia), considerar usar llaves físicas de seguridad USB.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '10 a 15 horas (revisión y ajuste)',
                responsable: 'Encargado de tecnología'
            },
            recursos: [
                'Revisar panel de administración: confirmar todos tienen MFA (autenticación multifactor)',
                'Buscar "acceso condicional [nombre plataforma]" para bloquear login sin MFA',
                'Para cuentas críticas: considerar llaves físicas YubiKey o Google Titan (se compran en línea)',
                'Dar plazo de 48 horas para activar MFA obligatoriamente'
            ]
        }
},

    'PR.DS-11': {
        // PUNTAJE 0: (Nunca / No lo sé)
        0: {
            titulo: 'Crear un sistema de copias de seguridad (Regla 3-2-1)',
            que_implementar: 'Configurar un sistema de respaldo automático para toda la información importante de la empresa, aplicando la regla 3-2-1.',
            por_que: 'No tener copias de seguridad es el mayor riesgo para la continuidad del negocio. Un ataque de ransomware, una falla de disco o un incendio pueden eliminar toda la información. Las copias de seguridad son la única forma segura de recuperarla.',
            pasos: [
                '(1) Identificar qué información es vital: facturación, documentos, bases de datos, carpetas compartidas, etc.',
                '(2) Definir los tiempos de recuperación que su negocio puede tolerar (sin usar siglas técnicas):',
                '   • ¿Cuánto tiempo puedo estar sin mis sistemas antes de afectar al negocio? (por ejemplo: 1 día).',
                '   • ¿Cuánta información podría perder sin daño grave? (por ejemplo: hasta 4 horas de trabajo).',
                '(3) Aplicar la regla 3-2-1:',
                '   • 3 copias de los datos,',
                '   • 2 medios diferentes (por ejemplo, disco externo + nube),',
                '   • 1 copia fuera de la oficina o en otra ubicación.',
                '(4) Usar un servicio en la nube confiable (ej.: Google Drive, OneDrive Business, Backblaze o Dropbox).',
                '(5) Hacer el primer respaldo completo de la información importante.',
                '(6) Probar restaurar un archivo para comprobar que el respaldo realmente funciona.',
                '(7) Programar copias automáticas diarias o semanales, según la cantidad de cambios que tenga su información.'
            ],
            estimacion: {
                tiempo: '1 semana (configuración inicial)',
                esfuerzo: '10 a 20 horas (configuración y primera copia)',
                responsable: 'Encargado TI o soporte externo'
            },
            recursos: [
                'Buscar en Google: "regla 3-2-1 respaldos" para entender el concepto',
                'Servicios en nube: Backblaze, Google Drive, OneDrive, Dropbox',
                'Hacer lista: qué información es crítica (bases datos, documentos, contabilidad)',
                'Configurar primer respaldo y probar restaurar un archivo'
            ]
        },

        // PUNTAJE 1: (Cuando me acuerdo / Mensual)
        1: {
            titulo: 'Automatizar los respaldos y aumentar su frecuencia',
            que_implementar: 'Transformar los respaldos manuales o mensuales en un proceso automático y frecuente (diario o semanal), garantizando el cumplimiento de la regla 3-2-1.',
            por_que: 'Los respaldos manuales suelen olvidarse y los mensuales implican perder semanas de trabajo en caso de incidente. Automatizar y aumentar la frecuencia reduce el riesgo de pérdida de datos.',
            pasos: [
                'Configurar los respaldos automáticos para que se realicen de forma programada (idealmente todas las noches).',
                'Aumentar la frecuencia a diaria para información crítica y semanal para lo menos importante.',
                'Asegurar que al menos una copia se guarde fuera de la oficina o en la nube.',
                'Configurar alertas o notificaciones que avisen si un respaldo falla.',
                'Realizar una prueba de restauración este mes y documentar los resultados.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '8 a 12 horas (configuración y prueba)',
                responsable: 'Encargado TI'
            },
            recursos: [
                'Software gratuito: Veeam Community Edition, Cobian Backup',
                'Windows incluye: "Windows Backup" (buscar cómo activarlo)',
                'Configurar respaldo automático: todas las noches',
                'Configurar alerta por email si el respaldo falla',
                'Hacer primera prueba de restauración este mes'
            ]
        },

        // PUNTAJE 2: (Semanal)
        2: {
            titulo: 'Probar los respaldos y hacerlos diarios',
            que_implementar: 'Subir el nivel de seguridad pasando de respaldos semanales a diarios (para los datos críticos) y verificar regularmente que las copias puedan restaurarse sin errores.',
            por_que: 'Un respaldo que nunca se ha probado puede fallar cuando más se necesita. Probar las restauraciones asegura que los datos realmente puedan recuperarse ante un incidente.',
            pasos: [
                'Aumentar la frecuencia de respaldo a diario para los sistemas y datos críticos.',
                'Agendar una “Prueba de restauración” mensual (por ejemplo, el primer viernes de cada mes).',
                'Restaurar un archivo o base de datos de muestra en un entorno temporal y verificar su integridad.',
                'Documentar cada prueba (fecha, resultado, tiempo de recuperación).',
                'Asegurar que las copias estén protegidas contra ransomware o eliminación accidental (por ejemplo, con versiones inmutables o almacenamiento desconectado).'
            ],
            estimacion: {
                tiempo: '1 semana (ajuste inicial) + 4 horas mensuales',
                esfuerzo: '4 horas de ajuste + 4 horas por mes en pruebas',
                responsable: 'Encargado TI'
            },
            recursos: [
                'Agendar "Prueba de restauración" mensual (primer viernes del mes)',
                'Crear registro: fecha prueba, archivo restaurado, tiempo, exitoso sí/no',
                'Buscar "backup inmutable" o "protección contra ransomware" en tu software de backup',
                'Para datos muy críticos: mantener copia offline (disco externo desconectado)'
            ]
        }
    },
    'PR.PS-02': {
        // PUNTAJE 0: (Nunca)
        0: {
            titulo: 'Aplicar actualizaciones de seguridad urgentes',
            que_implementar: 'Establecer un proceso inmediato para instalar todas las actualizaciones de seguridad disponibles en sistemas operativos y programas clave (navegadores, Office, software contable, etc.).',
            por_que: 'No actualizar el software es como dejar la puerta abierta. La mayoría de los ataques aprovecha fallas conocidas que ya tienen solución. Instalar los parches es una medida de higiene digital esencial.',
            pasos: [
                'Activar las actualizaciones automáticas en todos los equipos (Windows Update, MacOS Update).',
                'Ejecutar manualmente la búsqueda de actualizaciones pendientes en todos los equipos de la empresa.',
                'Actualizar manualmente los programas más usados: navegadores (Chrome, Edge, Firefox), Adobe Reader, Java, Office, etc.',
                'Definir un “Martes de Parches” mensual para revisar los equipos críticos, incluso si ya tienen actualización automática.'
            ],
            estimacion: {
                tiempo: '1 a 2 semanas (puesta al día inicial)',
                esfuerzo: '20 a 40 horas (actualización completa) + 4 horas mensuales',
                responsable: 'Encargado TI o soporte externo'
            },
            recursos: [
                'Windows: buscar "Configuración → Actualización y seguridad → Activar actualizaciones automáticas"',
                'Mac: buscar "Preferencias → Actualización de software → Automática"',
                'Actualizar navegadores: Chrome, Edge, Firefox (revisar versión en configuración)',
                'Actualizar: Adobe Reader, Java, Microsoft Office',
                'Definir "Martes de Parches" mensual en calendario'
            ]
        },

        // PUNTAJE 1: (De vez en cuando)
        1: {
            titulo: 'Organizar la gestión de parches de forma mensual',
            que_implementar: 'Transformar las actualizaciones esporádicas en una rutina sistemática y documentada, asegurando que ningún equipo quede sin parches críticos.',
            por_que: 'Hacerlo “cuando se acuerda” deja equipos vulnerables. Una rutina fija permite mantener la empresa protegida y reduce la probabilidad de infección por vulnerabilidades conocidas.',
            pasos: [
                'Agendar en calendario una revisión mensual de actualizaciones (por ejemplo, el 3er martes del mes).',
                'Crear un checklist de software a revisar (sistemas operativos, navegadores, Office, Adobe, Java, ERP).',
                'Usar el inventario de hardware para marcar los equipos ya actualizados.',
                'Priorizar servidores, equipos de gerencia y dispositivos que manejan datos sensibles.',
                'Documentar brevemente la fecha y resultados de cada revisión mensual.'
            ],
            estimacion: {
                tiempo: '1 semana (definir el proceso)',
                esfuerzo: '8 a 16 horas mensuales (ejecución y registro)',
                responsable: 'Encargado TI'
            },
            recursos: [
                'Crear checklist: Windows, navegadores, Office, Adobe, Java, sistema contable',
                'Agendar revisión mensual: tercer martes del mes',
                'Usar inventario de equipos para marcar cuáles están actualizados',
                'Crear registro Excel: fecha, equipo, actualizaciones aplicadas'
            ]
        },

        // PUNTAJE 2: (Cuando avisan)
        2: {
            titulo: 'Automatizar la instalación de parches y priorizar vulnerabilidades críticas',
            que_implementar: 'Avanzar hacia una gestión proactiva mediante el uso de herramientas que automatizan la instalación de parches y priorizan los más críticos según su nivel de riesgo.',
            por_que: 'Esperar a que “avisen” es demasiado tarde. Automatizar el proceso y aplicar parches críticos en menos de 72 horas reduce drásticamente las posibilidades de ser atacado por vulnerabilidades de día cero.',
            pasos: [
                'Evaluar herramientas de gestión de parches que automaticen el proceso (ManageEngine, N-able, PDQ Deploy, WSUS).',
                'Suscribirse a boletines de seguridad oficiales (por ejemplo, CSIRT Chile o Microsoft Security Bulletins).',
                'Definir un SLA interno: “Las vulnerabilidades críticas deben parchearse en menos de 72 horas”.',
                'Configurar la herramienta para generar reportes automáticos de cumplimiento y enviar alertas por correo.'
            ],
            estimacion: {
                tiempo: '1 mes (evaluación e implementación)',
                esfuerzo: '25 a 40 horas (configuración y pruebas iniciales)',
                responsable: 'Encargado TI'
            },
            recursos: [
                'Buscar: ManageEngine Patch Manager, PDQ Deploy, WSUS',
                'Suscribirse a alertas: csirt.gob.cl/alertas (alertas de seguridad Chile)',
                'Definir regla interna: "Parches críticos en menos de 72 horas"',
                'Configurar reporte automático mensual de cumplimiento'
            ]
        }
    },

    
    // ==========================================
    // FASE 4: DETECCIÓN Y RESPUESTA
    // ==========================================
    'ID.IM-04': {
        // PUNTAJE 0: (No tenemos plan)
        0: {
            titulo: 'Definir un Plan Básico de Respuesta a Incidentes',
            que_implementar: 'Crear un documento simple (1 a 3 páginas) que indique qué hacer, quién lidera y a quién llamar si ocurre un incidente de ciberseguridad (por ejemplo, un ataque de ransomware).',
            por_que: 'En medio de una crisis, improvisar genera errores costosos: decisiones apresuradas, pérdida de información o pago innecesario de rescates. Un plan básico reduce el pánico y orienta las acciones.',
            pasos: [
                'Documentar un flujo claro: Detectar → Reportar → Contener → Erradicar → Recuperar.',
                'Definir roles clave: quién lidera la respuesta, quién ejecuta acciones técnicas y quién comunica a gerencia.',
                'Crear una lista de contactos de emergencia (proveedor TI, CSIRT, gerencia, asesor legal).',
                'Imprimir el plan y guardarlo en un lugar físico accesible (en caso de caída de la red).',
                'Revisar el plan en la próxima reunión de gerencia para su aprobación.'
            ],
            estimacion: {
                tiempo: '1 a 2 semanas',
                esfuerzo: '15 a 20 horas (redacción y validación)',
                responsable: 'Encargado de seguridad o TI junto con gerencia'
            },
            recursos: [
                'Buscar en csirt.gob.cl o incibe.es: "plan respuesta incidentes PyME"',
                'Crear documento simple (3 páginas): Detectar → Reportar → Contener → Erradicar → Recuperar',
                'Hacer lista de contactos: proveedor TI, gerencia, CSIRT (csirt@csirt.gob.cl)',
                'IMPORTANTE: Imprimir el plan y guardarlo físico (si cae la red, necesitas acceso)'
            ]
        },

        // PUNTAJE 1: (Sabemos a quién llamar)
        1: {
            titulo: 'Formalizar y documentar el Plan de Respuesta a Incidentes',
            que_implementar: 'Pasar del conocimiento informal (“sabemos a quién llamar”) a un documento claro y compartido que establezca pasos, responsables y contactos.',
            por_que: 'Confiar en la memoria o en una sola persona es un riesgo. Un plan documentado asegura continuidad de respuesta incluso si el responsable principal no está disponible.',
            pasos: [
                'Actualizar la lista de contactos internos y externos con datos de respaldo (correo y teléfono).',
                'Definir roles y responsabilidades de respuesta (liderazgo, soporte técnico, comunicación).',
                'Documentar los pasos básicos de contención (ver RS.MI-01) y recuperación (ver PR.DS-11).',
                'Guardar el documento en un lugar accesible tanto en línea como impreso.',
                'Comunicar el plan a las personas involucradas y dejar constancia de su recepción.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '10 a 15 horas (documentación y comunicación)',
                responsable: 'Encargado de seguridad'
            },
            recursos: [
                'Actualizar lista de contactos: agregar teléfonos y emails de respaldo',
                'Definir roles claros: quién lidera, quién ejecuta técnico, quién comunica',
                'Guardar plan en: carpeta compartida + impreso + USB',
                'Enviar plan a personas clave y pedir confirmación de recepción'
            ]
        },

        // PUNTAJE 2: (Plan básico)
        2: {
            titulo: 'Probar y mejorar el Plan de Respuesta a Incidentes',
            que_implementar: 'Detallar el plan existente con guías paso a paso (“playbooks”) para incidentes frecuentes y probarlo al menos una vez al año mediante simulaciones simples.',
            por_que: 'Un plan sin pruebas suele fallar. Simular un incidente permite detectar contactos desactualizados, roles poco claros o tiempos de reacción lentos, y mejorar el plan antes de una emergencia real.',
            pasos: [
                'Elaborar “playbooks” para los tres incidentes más probables (ej. ransomware, phishing, fuga de datos).',
                'Agendar un ejercicio de simulación (“ejercicio de mesa”) de 2 horas con el equipo clave.',
                'Simular un caso real: “Son las 10:00 AM, varios equipos reportan ransomware. ¿Qué hacemos?”.',
                'Documentar las lecciones aprendidas y actualizar el plan según lo observado.',
                'Repetir este ejercicio al menos una vez por año o tras un incidente real.'
            ],
            estimacion: {
                tiempo: '1 mes (creación y prueba del plan)',
                esfuerzo: '20 a 30 horas (planificación y ejecución del ejercicio)',
                responsable: 'Encargado de seguridad junto a gerencia'
            },
            recursos: [
                'Buscar "playbook respuesta ransomware" para crear guías detalladas',
                'Organizar ejercicio de mesa: reunir equipo clave 2 horas',
                'Simular: "Son las 10 AM, varios equipos con ransomware, ¿qué hacemos?"',
                'Crear documento: lecciones aprendidas y actualizar plan',
                'Repetir ejercicio: mínimo 1 vez al año'
            ]
        }
    },

    'DE.AE-08': {
        // PUNTAJE 0: (Caso a caso)
        0: {
            titulo: 'Definir qué se considera un incidente de seguridad',
            que_implementar: 'Establecer y dejar por escrito criterios simples que permitan distinguir entre un problema técnico común y un incidente de seguridad que requiere una respuesta formal.',
            por_que: 'Si no hay criterios claros, se pierde tiempo valioso discutiendo si algo es grave o no. Esto puede retrasar la contención o, por el contrario, generar alarma innecesaria por situaciones menores.',
            pasos: [
                'Definir en una lista clara los casos en que se declara un incidente. Por ejemplo:',
                '1. Sospecha o confirmación de acceso no autorizado a sistemas o cuentas.',
                '2. Infección confirmada por malware o ransomware.',
                '3. Pérdida o robo de un equipo con información sensible.',
                '4. Interrupción de un servicio crítico que supere el tiempo de tolerancia definido (RTO).',
                '5. Cualquier intento de extorsión o amenaza relacionada con datos o sistemas.',
                'Revisar y aprobar estos criterios con gerencia y comunicarlos al personal clave.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '4 a 8 horas (definición y redacción)',
                responsable: 'Encargado de seguridad o TI'
            },
            recursos: [
                'Crear lista de 5 situaciones que son incidentes:',
                '1. Acceso no autorizado confirmado o sospechado',
                '2. Infección por malware/ransomware',
                '3. Pérdida/robo equipo con información sensible',
                '4. Servicio crítico caído más tiempo del aceptable',
                '5. Intento de extorsión o amenaza con datos',
                'Revisar y aprobar con gerencia'
            ]
        },

        // PUNTAJE 1: (Criterios informales)
        1: {
            titulo: 'Documentar y comunicar los criterios de incidentes',
            que_implementar: 'Tomar los criterios que ya se aplican de manera informal y documentarlos oficialmente dentro del Plan de Respuesta a Incidentes, comunicándolos a todo el personal.',
            por_que: 'Cualquier empleado puede detectar un incidente antes que el área técnica. Si todos saben qué situaciones deben reportarse y cómo hacerlo, se gana tiempo y se evita que un evento menor se convierta en crisis.',
            pasos: [
                'Agregar los criterios de incidente en el Plan de Respuesta (ver ID.IM-04).',
                'Definir un canal único y simple de reporte, por ejemplo un correo: seguridad@empresa.cl.',
                'Comunicar a todo el personal: “Si ocurre algo de esta lista, repórtelo aquí”.',
                'Incluir estos criterios en las próximas charlas de concienciación (ver PR.AT-01).'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '8 a 10 horas (documentar y comunicar)',
                responsable: 'Encargado de seguridad'
            },
            recursos: [
                'Agregar criterios al Plan de Respuesta a Incidentes',
                'Crear email: seguridad@empresa.cl (o usar email existente)',
                'Comunicar a TODO el personal: "Si pasa esto, reportar aquí"',
                'Hacer infografía simple para colgar en oficina',
                'Incluir en próxima charla de capacitación'
            ]
        },

        // PUNTAJE 2: (Criterios documentados)
        2: {
            titulo: 'Registrar y dar seguimiento a los incidentes declarados',
            que_implementar: 'Implementar un registro formal (puede ser una planilla Excel o una herramienta online) para registrar todos los incidentes declarados y darles seguimiento.',
            por_que: 'Registrar los incidentes permite aprender de ellos. Facilita identificar tendencias (como aumentos de phishing), medir tiempos de respuesta y justificar mejoras o inversiones futuras en seguridad.',
            pasos: [
                'Crear un “Registro de Incidentes” con columnas como: Fecha, Tipo, Nivel de gravedad, Estado (Abierto/Cerrado), Causa raíz y Acciones tomadas.',
                'Registrar obligatoriamente todo incidente que cumpla los criterios definidos.',
                'Revisar el registro al menos una vez al mes en la reunión de gerencia.',
                'Analizar las causas más frecuentes y aplicar medidas preventivas.',
                'Actualizar los criterios si se detectan nuevos tipos de incidentes.'
            ],
            estimacion: {
                tiempo: '1 semana (crear registro)',
                esfuerzo: '8 horas iniciales + 2 horas mensuales de actualización',
                responsable: 'Encargado de seguridad o TI'
            },
            recursos: [
                'Crear Excel: Fecha | Tipo | Gravedad | Estado | Causa | Acciones',
                'Registrar TODO incidente que cumpla criterios',
                'Revisar mensualmente en reunión de gerencia',
                'Analizar: ¿qué incidentes se repiten? → tomar acción preventiva',
                'Actualizar criterios si aparecen nuevos tipos de incidentes'
            ]
        }
    },

    
    'RS.MI-01': {
        // PUNTAJE 0: (No sabríamos)
        0: {
            titulo: 'Definir un procedimiento básico de contención de incidentes',
            que_implementar: 'Establecer y comunicar el paso más importante ante una infección o ataque: aislar el equipo afectado desconectándolo de la red.',
            por_que: 'En un ataque de ransomware, cada segundo conectado puede propagar el daño a otros equipos. Desconectar a tiempo es la acción más efectiva para detener la expansión.',
            pasos: [
                'Definir el procedimiento claro: "Si sospecha que un equipo está infectado o muestra mensajes de ransomware:"',
                '1. Desconecte el cable de red (saque el cable).',
                '2. Desactive el WiFi (modo avión).',
                '3. NO apague el computador (se pierde evidencia útil).',
                '4. Avise de inmediato al encargado de TI o seguridad.',
                'Comunicar este procedimiento a todo el personal. Puede imprimirse o colocarse como recordatorio visible en los puestos de trabajo.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '4 a 8 horas (definir y comunicar)',
                responsable: 'Encargado de TI o seguridad'
            },
            recursos: [
                'Crear documento de 1 página:',
                '"Si sospecha ransomware o infección:"',
                '1. Desconecte cable de red (saque el cable)',
                '2. Desactive WiFi (modo avión)',
                '3. NO apague el computador',
                '4. Avise inmediatamente a [nombre encargado TI]"',
                'Imprimir y colocar visible en puestos de trabajo'
            ]
        },

        // PUNTAJE 1: (Apagar equipo)
        1: {
            titulo: 'Corregir el procedimiento: aislar, no apagar',
            que_implementar: 'Actualizar el procedimiento existente para que el personal sepa que debe aislar el equipo, pero no apagarlo, y entender por qué esta diferencia es crítica.',
            por_que: 'Apagar el computador elimina información temporal valiosa que permite investigar el ataque y determinar su alcance. Aislarlo (sin apagar) conserva evidencia y evita la propagación.',
            pasos: [
                'Actualizar el procedimiento existente: 1. Aislar el equipo (red/WiFi), 2. No apagarlo, 3. Avisar al encargado de TI.',
                'Explicar a todo el personal técnico y administrativo por qué no se debe apagar el equipo.',
                'Reenviar el procedimiento corregido y reforzarlo en la próxima charla o reunión interna.'
            ],
            estimacion: {
                tiempo: '1 semana',
                esfuerzo: '4 a 8 horas (actualización y comunicación)',
                responsable: 'Encargado de TI o seguridad'
            },
            recursos: [
                'Actualizar procedimiento: "Aislar (desconectar red), NO apagar, Avisar"',
                'Explicar al personal: "No apagar conserva evidencia para investigar"',
                'Reenviar procedimiento corregido por email',
                'Reforzar en próxima reunión de equipo'
            ]
        },

        // PUNTAJE 2: (Desconectar red)
        2: {
            titulo: 'Documentar y probar el procedimiento de contención',
            que_implementar: 'Registrar oficialmente el procedimiento de contención dentro del Plan de Respuesta a Incidentes y realizar una prueba práctica o simulación para verificar su efectividad.',
            por_que: 'Conocer el procedimiento no basta: probarlo asegura que el equipo responda de forma rápida y coordinada, incluso bajo presión o fuera de horario laboral.',
            pasos: [
                'Incorporar el procedimiento en el Plan de Respuesta a Incidentes (ver ID.IM-04).',
                'Agregar pasos para otros escenarios, como bloqueo de cuentas comprometidas o detención de accesos remotos.',
                'Realizar un simulacro simple: “El usuario X reporta ransomware, ¿qué hacemos?”. Medir cuánto se tarda en aislar el equipo.',
                'Registrar los resultados y ajustar el procedimiento si hay demoras o confusiones.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '10 horas (documentación y prueba)',
                responsable: 'Encargado de TI o seguridad'
            },
            recursos: [
                'Agregar procedimiento al Plan de Respuesta a Incidentes',
                'Agregar otros pasos: bloquear cuentas comprometidas, desactivar accesos remotos',
                'Hacer simulacro: "Usuario X reporta ransomware, cronometrar cuánto tardamos"',
                'Registrar resultados y mejorar procedimiento'
            ]
        }
    },

    
    'RS.MI-02': {
        // PUNTAJE 0: (No sabríamos)
        0: {
            titulo: 'Definir un procedimiento estándar para limpiar equipos infectados',
            que_implementar: 'Establecer una política clara: la forma más segura de eliminar un malware es formatear y reinstalar el sistema desde cero. Intentar “limpiar” con antivirus no garantiza eliminar la amenaza.',
            por_que: 'El software malicioso moderno puede dejar puertas traseras ocultas. Aunque el antivirus diga que eliminó la infección, el atacante podría seguir teniendo acceso. Formatear es la única garantía real de erradicación.',
            pasos: [
                'Definir la política: “Equipo infectado = Equipo formateado”.',
                'Documentar el procedimiento estándar: 1. Aislar el equipo, 2. Respaldar solo los documentos del usuario, 3. Formatear el disco, 4. Reinstalar el sistema operativo, 5. Aplicar parches y antivirus, 6. Restaurar los datos respaldados.',
                'Asegurar que se cuente con medios de instalación actualizados (Windows, Office, software contable, etc.).'
            ],
            estimacion: {
                tiempo: '1 semana (definir y preparar medios)',
                esfuerzo: '8 a 12 horas',
                responsable: 'Encargado de TI o soporte externo'
            },
            recursos: [
                'Crear política simple: "Equipo infectado = Equipo formateado"',
                'Buscar en Google/YouTube: "cómo formatear e instalar Windows paso a paso"',
                'Preparar: USB booteable con Windows + drivers + software esencial',
                'Tener listos: Office, antivirus, programas que usan'
            ]
        },

        // PUNTAJE 1: (Con antivirus)
        1: {
            titulo: 'Adoptar el procedimiento estándar: formatear, no solo limpiar',
            que_implementar: 'Actualizar el procedimiento actual para reemplazar la práctica de “usar antivirus” por la reinstalación completa del sistema operativo como método oficial de erradicación.',
            por_que: 'Limpiar con antivirus puede dejar rastros del ataque. El formateo y reinstalación eliminan cualquier código malicioso oculto y garantizan que el sistema vuelva a un estado confiable.',
            pasos: [
                'Adoptar formalmente la política: “Equipo infectado = Equipo formateado”.',
                'Documentar el procedimiento completo (aislar, respaldar, formatear, reinstalar, parchear, restaurar datos).',
                'Capacitar al personal técnico o proveedor externo sobre por qué este es el método aceptado y obligatorio.'
            ],
            estimacion: {
                tiempo: '1 semana (definir y capacitar)',
                esfuerzo: '8 horas',
                responsable: 'Encargado de TI o proveedor externo'
            },
            recursos: [
                'Documentar proceso completo: Aislar → Respaldar docs usuario → Formatear → Reinstalar → Parchear → Restaurar',
                'Explicar a TI interno o proveedor: esta es la política oficial',
                'Buscar "por qué formatear es mejor que antivirus para eliminar malware"',
                'Capacitar a quien hará el formateo'
            ]
        },

        // PUNTAJE 2: (Llamar proveedor)
        2: {
            titulo: 'Documentar y validar el procedimiento de erradicación (interno o externo)',
            que_implementar: 'Formalizar el procedimiento de erradicación, tanto si lo realiza personal interno como un proveedor, y verificar que siempre se apliquen los pasos correctos (formateo y reinstalación).',
            por_que: 'Tercerizar el proceso no elimina la responsabilidad. Se debe garantizar que el proveedor siga las buenas prácticas y entregue evidencia del trabajo realizado para asegurar la eliminación total de la amenaza.',
            pasos: [
                'Documentar el procedimiento estándar en el Plan de Respuesta (ver ID.IM-04).',
                'Si interviene un proveedor, solicitar un “Informe de Erradicación” que detalle los pasos realizados.',
                'Mantener imágenes limpias (“golden images”) de los equipos para acelerar la reinstalación.',
                'Incluir un paso de “Análisis de causa raíz” para entender cómo ocurrió la infección y prevenir que se repita.'
            ],
            estimacion: {
                tiempo: '2 semanas',
                esfuerzo: '10 horas (documentación y validación)',
                responsable: 'Encargado de TI o responsable de seguridad'
            },
            recursos: [
                'Si es proveedor externo: solicitar informe escrito de erradicación',
                'Buscar "golden image Windows" - imagen limpia lista para restaurar rápido',
                'Agregar paso: análisis de causa raíz (¿cómo se infectó? ¿cómo prevenir?)',
                'Crear plantilla de informe: qué se hizo, cuánto tardó, causa del incidente'
            ]
        }
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
        
        // --- INICIO DE LA MODIFICACIÓN ---
        
        // 1. Obtener el objeto padre que contiene los 3 niveles (0, 1, 2)
        const plantillasDelControl = PLANTILLAS_RECOMENDACIONES[brecha.control_id];
        
        if (!plantillasDelControl) {
            console.warn(`⚠️ No hay plantillas de recomendación para ${brecha.control_id}`);
            return; // Saltar esta brecha
        }

        // 2. Seleccionar la plantilla específica usando el puntaje actual
        // brecha.puntaje_actual será 0, 1 o 2
        let plantilla = plantillasDelControl[brecha.puntaje_actual];

        // Fallback si no hay plantilla exacta
        if (!plantilla) {
            if (plantillasDelControl[1]) plantilla = plantillasDelControl[1];
            else if (plantillasDelControl[0]) plantilla = plantillasDelControl[0];
            else if (plantillasDelControl[2]) plantilla = plantillasDelControl[2];
            else {
                plantilla = {
                    titulo: "Acción general recomendada",
                    descripcion: "Implementar medidas básicas de ciberseguridad según esta categoría.",
                    pasos: [
                        "Revisar políticas y procedimientos.",
                        "Asignar responsable y recursos mínimos.",
                        "Contactar apoyo externo si es necesario."
                    ]
                };
            }
        }

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