import type { Guide, GuideChrome } from './types';

export const chromeEs: GuideChrome = {
  guidesTitle: 'Guías',
  guidesIntro: 'Paso a paso para exportar, imprimir y guardar tus conversaciones de WhatsApp.',
  related: 'Otras guías',
  toolTitle: 'Convierte tu chat ahora',
  breadcrumbHome: 'Inicio',
};

export const guidesEs: Guide[] = [
  {
    key: 'iphone',
    slug: 'exportar-chat-whatsapp-iphone',
    label: 'Exportar un chat de WhatsApp en iPhone',
    metaTitle: 'Exportar chat de WhatsApp a PDF en iPhone | ConversaPDF',
    metaDescription:
      'Exporta una conversación de WhatsApp desde tu iPhone y conviértela en un PDF claro, con fechas, horas y fotos. Guía paso a paso, sin instalar nada.',
    h1: 'Cómo exportar un chat de WhatsApp a PDF en iPhone',
    intro:
      'WhatsApp no tiene un botón «Guardar como PDF», pero el iPhone permite exportar cualquier conversación en un archivo .zip. Con ese archivo, ConversaPDF crea un PDF ordenado en pocos segundos, directamente en tu navegador.',
    sections: [
      {
        h: 'Exportar la conversación desde el iPhone',
        steps: [
          'Abre WhatsApp y entra en la conversación que quieres guardar.',
          'Toca el nombre del contacto o del grupo en la parte de arriba.',
          'Baja hasta el final y toca «Exportar chat».',
          'Elige con archivos (para tener las fotos en el PDF) o sin archivos (solo el texto, más rápido).',
          'En el menú de compartir, toca «Guardar en Archivos» y elige una carpeta.',
        ],
      },
      {
        h: 'Convertir el archivo en PDF',
        steps: [
          'Abre conversapdf.com en Safari, en el mismo iPhone.',
          'Toca «Elegir archivo» y selecciona el .zip que acabas de guardar en Archivos.',
          'Indica quién eres para que tus mensajes aparezcan a la derecha, y elige las fechas si solo quieres una parte.',
          'Mira la vista previa gratis y descarga el PDF completo.',
        ],
      },
      {
        h: 'Consejos',
        bullets: [
          'El archivo se llama «WhatsApp Chat - Nombre.zip» y contiene un archivo _chat.txt con los mensajes y las fotos.',
          'No cambies el nombre ni el contenido del .zip: el PDF «Prueba» calcula la huella del archivo original.',
          'Si la conversación es muy larga, WhatsApp puede limitar la exportación a los mensajes más recientes (se suelen citar unos 10.000 mensajes con archivos y 40.000 sin archivos).',
          'También puedes enviarte el .zip por correo y abrirlo en el ordenador.',
        ],
      },
    ],
    faqs: [
      { q: '¿Dónde está la opción «Exportar chat» en iPhone?', a: 'En la información del chat: toca el nombre del contacto o del grupo arriba y baja hasta el final de la pantalla.' },
      { q: '¿Necesito instalar una aplicación?', a: 'No. Todo se hace con WhatsApp y el navegador Safari. ConversaPDF funciona en el navegador y no sube tu conversación a ningún servidor.' },
      { q: '¿El otro participante recibe un aviso?', a: 'No. Exportar un chat no envía ninguna notificación a los demás participantes.' },
    ],
  },
  {
    key: 'android',
    slug: 'exportar-chat-whatsapp-android',
    label: 'Exportar un chat de WhatsApp en Android',
    metaTitle: 'Exportar chat de WhatsApp a PDF en Android | ConversaPDF',
    metaDescription:
      'Exporta una conversación de WhatsApp desde tu móvil Android y conviértela en PDF con nombres, fechas, horas y fotos. Paso a paso y sin instalar nada.',
    h1: 'Cómo exportar un chat de WhatsApp a PDF en Android',
    intro:
      'En Android, WhatsApp exporta la conversación como un archivo de texto (.txt), a veces acompañado de las fotos. ConversaPDF convierte esos archivos en un PDF claro y paginado, sin que tu chat salga de tu dispositivo.',
    sections: [
      {
        h: 'Exportar la conversación desde Android',
        steps: [
          'Abre WhatsApp y entra en la conversación.',
          'Toca los tres puntos ⋮ arriba a la derecha.',
          'Toca «Más» y después «Exportar chat».',
          'Elige «Incluir archivos» si quieres las fotos en el PDF, o «Sin archivos» para solo el texto.',
          'Guarda el resultado en Google Drive, en «Archivos» o envíatelo por correo.',
        ],
      },
      {
        h: 'Convertir los archivos en PDF',
        steps: [
          'Abre conversapdf.com en Chrome.',
          'Toca «Elegir archivo» y selecciona el .zip. Si WhatsApp te dio el .txt y las fotos por separado, selecciónalos todos a la vez.',
          'Indica quién eres y, si quieres, el periodo que te interesa.',
          'Revisa la vista previa gratis y descarga el PDF completo.',
        ],
      },
      {
        h: 'Consejos',
        bullets: [
          'El archivo de texto se suele llamar «Chat de WhatsApp con Nombre.txt».',
          'Según la versión de Android, las fotos llegan dentro de un .zip o como archivos sueltos: ConversaPDF acepta las dos formas.',
          'Si envías la exportación por correo, algunos servicios rechazan archivos muy pesados: Google Drive suele ser más fiable.',
        ],
      },
    ],
    faqs: [
      { q: 'No encuentro «Exportar chat», ¿qué hago?', a: 'Actualiza WhatsApp y busca la opción en ⋮ > Más. En algunos países la función de exportar no está disponible.' },
      { q: '¿Puedo hacerlo todo desde el móvil?', a: 'Sí. ConversaPDF funciona en Chrome para Android. Para chats muy largos con muchas fotos, un ordenador irá más rápido.' },
      { q: '¿Se suben mis mensajes a internet?', a: 'No. Los archivos se leen y el PDF se crea en tu navegador.' },
    ],
  },
  {
    key: 'photos',
    slug: 'exportar-whatsapp-con-fotos',
    label: 'Exportar un chat de WhatsApp con fotos',
    metaTitle: 'Exportar WhatsApp a PDF con fotos | ConversaPDF',
    metaDescription:
      'Cómo obtener un PDF de una conversación de WhatsApp con las fotos en su sitio, junto a los mensajes. Exportación con archivos en iPhone y Android.',
    h1: 'Exportar un chat de WhatsApp a PDF con las fotos',
    intro:
      'Una conversación sin sus fotos pierde contexto: el piso que se alquilaba, el daño del coche, el recibo… ConversaPDF coloca cada foto en su sitio, justo donde se envió en el chat.',
    sections: [
      {
        h: 'Lo importante: exportar «con archivos»',
        p: [
          'Las fotos solo llegan al PDF si WhatsApp las incluye en la exportación. Al tocar «Exportar chat», elige la opción con archivos (en iPhone, «Adjuntar archivos»; en Android, «Incluir archivos»).',
          'Si eliges «Sin archivos», el PDF indicará igualmente dónde había una foto, pero sin la imagen.',
        ],
      },
      {
        h: 'Paso a paso',
        steps: [
          'Exporta el chat con archivos desde WhatsApp y guarda el .zip (o el .txt y las fotos).',
          'Abre conversapdf.com y selecciona el .zip, o todos los archivos a la vez.',
          'Comprueba en el resumen el número de fotos encontradas.',
          'Abre la vista previa gratis para ver las fotos en su sitio.',
          'Descarga la versión «Con fotos» o «Prueba».',
        ],
      },
      {
        h: 'Bueno saber',
        bullets: [
          'Las fotos se reducen para que el PDF no pese demasiado, conservando una buena calidad para leerlo e imprimirlo.',
          'Los audios y vídeos no se pueden reproducir en un PDF: aparecen indicados con su nombre de archivo.',
          'Con archivos, WhatsApp puede limitar la exportación a los mensajes más recientes (se suelen citar unos 10.000).',
        ],
      },
    ],
    faqs: [
      { q: '¿Por qué no aparecen mis fotos en el PDF?', a: 'Probablemente exportaste el chat «sin archivos», o solo seleccionaste el .txt. Exporta de nuevo con archivos y selecciona el .zip completo.' },
      { q: '¿Las fotos se ven en buena calidad?', a: 'Sí, suficiente para leer, imprimir o presentar el documento. Se reducen solo para que el PDF siga siendo ligero.' },
      { q: '¿Se incluyen los stickers?', a: 'Los stickers aparecen como archivo adjunto con su nombre; las fotos normales se muestran como imágenes.' },
    ],
  },
  {
    key: 'evidence',
    slug: 'conversacion-whatsapp-prueba-juicio',
    label: 'Usar una conversación de WhatsApp como prueba',
    metaTitle: 'Conversación de WhatsApp como prueba en un juicio',
    metaDescription:
      'Prepara un PDF claro de una conversación de WhatsApp para tu abogado o un juicio: chat completo, fechas, horas y huella SHA-256 del archivo.',
    h1: 'Conversación de WhatsApp como prueba: cómo prepararla',
    intro:
      'Arrendadores, empresas, exparejas, aseguradoras: muchos conflictos se deciden con lo que se dijo por WhatsApp. Una pila de capturas de pantalla es difícil de leer y fácil de discutir. Un documento completo y ordenado ayuda mucho más a tu abogado.',
    sections: [
      {
        h: 'Por qué las capturas de pantalla no bastan',
        bullets: [
          'No muestran todo el contexto y pueden parecer seleccionadas a conveniencia.',
          'Las fechas no siempre se ven, y el orden se pierde fácilmente.',
          'Son difíciles de imprimir y de citar («ver página 4, mensaje de las 19:20»).',
        ],
      },
      {
        h: 'Cómo preparar un documento sólido',
        steps: [
          'Exporta la conversación completa desde WhatsApp, con archivos si las fotos importan.',
          'Guarda el archivo exportado tal cual, sin abrirlo ni modificarlo, y conserva también el teléfono.',
          'En ConversaPDF, elige la versión «Prueba»: portada con participantes y periodo, horas con segundos y huella SHA-256 del archivo original.',
          'Entrega a tu abogado el PDF y el archivo original: con la huella se puede comprobar que el archivo no ha cambiado.',
        ],
      },
      {
        h: 'Lo que un PDF no sustituye',
        p: [
          'La admisión y el valor de una prueba los decide el juez. Si la otra parte discute la conversación, en España, por ejemplo, se suele recurrir a un acta notarial o a un peritaje informático del teléfono. ConversaPDF te da un documento claro y verificable, pero no es una certificación ni un asesoramiento jurídico: consulta siempre a tu abogado.',
        ],
      },
    ],
    faqs: [
      { q: '¿Qué es la huella SHA-256?', a: 'Es un código calculado a partir del archivo exportado. Si alguien cambia aunque sea una letra del archivo, el código cambia. Sirve para demostrar que el archivo original no se ha modificado.' },
      { q: '¿Puedo elegir solo un periodo?', a: 'Sí, puedes elegir las fechas de inicio y fin. Para un juicio, suele ser mejor exportar todo y señalar las partes importantes.' },
      { q: '¿La otra persona sabrá que he exportado el chat?', a: 'No, WhatsApp no avisa a los participantes.' },
    ],
  },
  {
    key: 'group',
    slug: 'exportar-grupo-whatsapp',
    label: 'Exportar un chat de grupo de WhatsApp',
    metaTitle: 'Exportar un grupo de WhatsApp a PDF | ConversaPDF',
    metaDescription:
      'Convierte la conversación de un grupo de WhatsApp en un PDF legible: cada participante con su nombre y su color, avisos del grupo, fechas y fotos.',
    h1: 'Exportar un chat de grupo de WhatsApp a PDF',
    intro:
      'Grupos de vecinos, de padres del colegio, de trabajo o de la familia: un grupo puede acumular miles de mensajes. ConversaPDF los convierte en un documento claro en el que se ve quién dijo qué y cuándo.',
    sections: [
      {
        h: 'Exportar el grupo',
        steps: [
          'Abre el grupo en WhatsApp.',
          'En iPhone, toca el nombre del grupo arriba; en Android, toca ⋮ y luego «Más».',
          'Toca «Exportar chat» y elige con o sin archivos.',
          'Guarda el archivo y ábrelo en conversapdf.com.',
        ],
      },
      {
        h: 'Cómo se ve un grupo en el PDF',
        bullets: [
          'Cada participante aparece con su nombre y un color propio.',
          'Los avisos del grupo («X añadió a Y», cambios de asunto…) aparecen centrados en gris.',
          'Puedes indicar quién eres para que tus mensajes salgan a la derecha.',
          'Una separación por día facilita encontrar una fecha concreta.',
        ],
      },
      {
        h: 'Consejos para grupos grandes',
        bullets: [
          'Usa las fechas «Desde» y «Hasta» para quedarte solo con el periodo que importa.',
          'En grupos con muchas fotos, el ordenador irá más rápido que el móvil.',
        ],
      },
    ],
    faqs: [
      { q: '¿Cualquier miembro puede exportar el grupo?', a: 'Sí, cualquier participante puede exportar el historial que tiene en su teléfono.' },
      { q: '¿Aparecen los nombres o los números?', a: 'Aparecen tal como los ve tu teléfono: el nombre si el contacto está guardado, o el número si no lo está.' },
      { q: '¿Hay un límite de participantes?', a: 'No. ConversaPDF funciona con grupos de cualquier tamaño.' },
    ],
  },
  {
    key: 'print',
    slug: 'imprimir-conversacion-whatsapp',
    label: 'Imprimir una conversación de WhatsApp',
    metaTitle: 'Imprimir una conversación de WhatsApp | ConversaPDF',
    metaDescription:
      'La forma más limpia de imprimir un chat de WhatsApp: un PDF paginado con nombres, fechas, horas y fotos, listo para imprimir en casa o en una copistería.',
    h1: 'Cómo imprimir una conversación de WhatsApp',
    intro:
      'WhatsApp no tiene botón de imprimir. Hacer capturas y pegarlas en un documento lleva horas y el resultado es difícil de leer. Lo más rápido es convertir el chat en un PDF paginado y luego imprimirlo.',
    sections: [
      {
        h: 'Paso a paso',
        steps: [
          'Exporta la conversación desde WhatsApp («Exportar chat»).',
          'Abre el archivo en conversapdf.com y elige el periodo que quieres imprimir.',
          'Descarga el PDF.',
          'Ábrelo en tu ordenador o móvil e imprímelo, o llévalo en un USB a una copistería.',
        ],
      },
      {
        h: 'Para que la impresión quede bien',
        bullets: [
          'El PDF está en formato A4, con márgenes y número de página en cada hoja.',
          'Los fondos son claros para no gastar demasiada tinta.',
          'Si solo necesitas unas páginas, elige un periodo más corto antes de descargar.',
        ],
      },
    ],
    faqs: [
      { q: '¿Puedo imprimir solo una parte del chat?', a: 'Sí. Elige las fechas «Desde» y «Hasta» antes de generar el PDF.' },
      { q: '¿Se imprimen las fotos?', a: 'Sí, si exportaste el chat con archivos y eliges la versión «Con fotos» o «Prueba».' },
      { q: '¿Y si no tengo impresora?', a: 'Puedes enviar el PDF por correo o llevarlo en un USB a una copistería o una papelería.' },
    ],
  },
  {
    key: 'txt',
    slug: 'abrir-archivo-chat-txt-whatsapp',
    label: 'Abrir el archivo _chat.txt de WhatsApp',
    metaTitle: 'Abrir el archivo _chat.txt de WhatsApp | ConversaPDF',
    metaDescription:
      '¿Has exportado un chat de WhatsApp y tienes un archivo _chat.txt ilegible? Así se abre y se convierte en un PDF claro con fechas, nombres y fotos.',
    h1: 'Cómo abrir el archivo _chat.txt de WhatsApp',
    intro:
      'Cuando exportas un chat, WhatsApp crea un archivo de texto: _chat.txt en iPhone o «Chat de WhatsApp con Nombre.txt» en Android. Se puede abrir con cualquier editor de texto, pero es una lista interminable de líneas difícil de leer.',
    sections: [
      {
        h: 'Qué contiene el archivo',
        bullets: [
          'Una línea por mensaje: fecha, hora, nombre de quien escribe y texto.',
          'Referencias a las fotos y audios («<adjunto: …jpg>» o «IMG-…jpg (archivo adjunto)»).',
          'Los avisos del sistema: cifrado, cambios en el grupo, mensajes eliminados.',
        ],
      },
      {
        h: 'Abrirlo de forma legible',
        steps: [
          'Si tienes un .zip, no hace falta descomprimirlo: selecciónalo directamente en conversapdf.com.',
          'Si solo tienes el .txt, selecciónalo tal cual (y las fotos a la vez, si las tienes por separado).',
          'ConversaPDF reconoce el formato de iPhone y de Android en cualquier idioma y lo muestra como un chat.',
          'Descarga el resultado en PDF.',
        ],
      },
      {
        h: '¿Y con un editor de texto?',
        p: [
          'En Windows puedes abrirlo con el Bloc de notas y en Mac con TextEdit. Funciona para buscar una frase, pero para leer, imprimir o enviar a alguien, un PDF ordenado es mucho más cómodo.',
        ],
      },
    ],
    faqs: [
      { q: 'El archivo muestra caracteres raros, ¿es normal?', a: 'Los editores antiguos a veces leen mal los acentos y emojis. ConversaPDF lee el archivo correctamente en UTF-8.' },
      { q: '¿Puedo convertir un .txt sin las fotos?', a: 'Sí. El PDF indicará en qué lugar había una foto, con el nombre del archivo.' },
      { q: '¿Funciona con exportaciones antiguas?', a: 'Sí, siempre que sea el archivo original exportado por WhatsApp.' },
    ],
  },
  {
    key: 'save',
    slug: 'guardar-conversacion-whatsapp',
    label: 'Guardar una conversación de WhatsApp para siempre',
    metaTitle: 'Guardar una conversación de WhatsApp para siempre',
    metaDescription:
      'Guarda tus conversaciones importantes de WhatsApp en un PDF que se puede leer en cualquier dispositivo, con fotos, aunque cambies de móvil o borres la app.',
    h1: 'Cómo guardar una conversación de WhatsApp para siempre',
    intro:
      'Las copias de seguridad de WhatsApp (iCloud o Google Drive) solo sirven para restaurar la app: no se pueden leer como un documento. Para conservar de verdad una conversación con alguien importante, lo mejor es convertirla en PDF.',
    sections: [
      {
        h: 'Por qué un PDF',
        bullets: [
          'Se abre en cualquier ordenador, móvil o tableta, hoy y dentro de muchos años.',
          'No depende de WhatsApp ni de tu teléfono.',
          'Se puede imprimir, encuadernar o enviar a la familia.',
        ],
      },
      {
        h: 'Cómo hacerlo',
        steps: [
          'Exporta la conversación con archivos para conservar las fotos.',
          'Conviértela en PDF en conversapdf.com con la versión «Con fotos».',
          'Guarda el PDF y el .zip original en dos sitios distintos (por ejemplo, el ordenador y una nube).',
          'Repite la exportación de vez en cuando si la conversación continúa.',
        ],
      },
    ],
    faqs: [
      { q: '¿La copia de seguridad de WhatsApp no es suficiente?', a: 'Sirve para restaurar los chats en un teléfono, pero no es un archivo legible. Si un día dejas de usar WhatsApp, no podrás leerla.' },
      { q: '¿Se puede imprimir como un libro?', a: 'Sí. El PDF está en A4 y paginado: puedes imprimirlo y encuadernarlo en una copistería.' },
      { q: '¿Funciona con conversaciones de hace años?', a: 'Sí, siempre que sigan en tu WhatsApp para poder exportarlas.' },
    ],
  },
];
