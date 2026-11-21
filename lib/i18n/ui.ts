import type { Locale } from '@/config/site';

export interface Faq {
  q: string;
  a: string;
}

export interface UiStrings {
  langName: string;
  meta: { title: string; description: string };
  nav: { how: string; pricing: string; faq: string };
  hero: { kicker: string; title: string; subtitle: string; privacy: string };
  tool: {
    drop: string;
    dropHint: string;
    choose: string;
    loading: string;
    errors: Record<'no-chat-file' | 'bad-zip' | 'empty' | 'not-whatsapp' | 'generic' | 'payment' | 'too-big', string>;
    summary: string;
    participants: string;
    messages: string;
    photos: string;
    period: string;
    me: string;
    meNone: string;
    from: string;
    to: string;
    preview: string;
    previewing: string;
    choosePlan: string;
    buy: string;
    generating: string;
    preparingPhotos: (done: number, total: number) => string;
    downloaded: string;
    downloadAgain: string;
    another: string;
    paymentsOff: string;
  };
  plans: Record<'text' | 'photos' | 'proof', { name: string; desc: string; features: string[] }>;
  oneTime: string;
  howTitle: string;
  howIntro: string;
  iphone: { title: string; steps: string[] };
  android: { title: string; steps: string[] };
  howTip: string;
  usesTitle: string;
  uses: { title: string; text: string }[];
  pricingTitle: string;
  pricingIntro: string;
  faqTitle: string;
  faqs: Faq[];
  footer: { legal: string; privacy: string; terms: string; refund: string; notAffiliated: string; twemoji: string; languages: string };
}

const es: UiStrings = {
  langName: 'Español',
  meta: {
    title: 'Convertir chat de WhatsApp a PDF – con fotos, fechas y horas | ConversaPDF',
    description:
      'Convierte una conversación de WhatsApp exportada en un PDF limpio y legible: nombres, fechas, horas, fotos y número de páginas. Todo se procesa en tu navegador, nada se sube a internet.',
  },
  nav: { how: 'Cómo funciona', pricing: 'Precios', faq: 'Preguntas' },
  hero: {
    kicker: 'Chat de WhatsApp → PDF',
    title: 'Convierte tu chat de WhatsApp en un PDF claro y ordenado',
    subtitle:
      'Para un abogado, un juicio, un propietario, una aseguradora o simplemente para guardarlo. Con nombres, fechas, horas y fotos en su sitio.',
    privacy: 'Tu conversación nunca sale de tu dispositivo: todo se procesa en tu navegador.',
  },
  tool: {
    drop: 'Suelta aquí la exportación de tu chat',
    dropHint: 'Archivo .zip (con fotos) o .txt exportado desde WhatsApp',
    choose: 'Elegir archivo',
    loading: 'Leyendo la conversación…',
    errors: {
      'no-chat-file': 'No encontramos el chat dentro del .zip. Exporta de nuevo la conversación desde WhatsApp.',
      'bad-zip': 'No se puede abrir este .zip. Prueba a exportar de nuevo la conversación.',
      empty: 'El archivo está vacío.',
      'not-whatsapp': 'Este archivo no parece una exportación de WhatsApp. Usa la opción «Exportar chat».',
      generic: 'Algo ha fallado. Inténtalo de nuevo.',
      payment: 'No hemos podido confirmar el pago. Si se te ha cobrado, escríbenos y lo solucionamos.',
      'too-big': 'El archivo es demasiado grande para tu navegador (más de 1 GB).',
    },
    summary: 'Conversación lista',
    participants: 'Participantes',
    messages: 'Mensajes',
    photos: 'Fotos',
    period: 'Periodo',
    me: '¿Quién eres tú? (tus mensajes irán a la derecha)',
    meNone: 'Nadie / prefiero no indicarlo',
    from: 'Desde',
    to: 'Hasta',
    preview: 'Ver vista previa gratis',
    previewing: 'Preparando la vista previa…',
    choosePlan: 'Elige tu PDF',
    buy: 'Descargar',
    generating: 'Creando tu PDF…',
    preparingPhotos: (d, t) => `Preparando fotos (${d}/${t})…`,
    downloaded: '¡Tu PDF está listo! La descarga ha empezado.',
    downloadAgain: 'Descargar otra vez',
    another: 'Convertir otra conversación',
    paymentsOff: 'Las descargas de pago estarán disponibles muy pronto.',
  },
  plans: {
    text: { name: 'Texto', desc: 'Toda la conversación, ordenada y paginada.', features: ['Nombres, fechas y horas', 'Números de página', 'Adjuntos indicados por su nombre'] },
    photos: { name: 'Con fotos', desc: 'Las fotos aparecen en su sitio dentro del chat.', features: ['Todo lo de «Texto»', 'Fotos dentro de la conversación', 'Ideal para guardar recuerdos'] },
    proof: { name: 'Prueba', desc: 'Para un abogado, un juicio o una reclamación.', features: ['Todo lo de «Con fotos»', 'Portada con participantes y periodo', 'Huella SHA-256 del archivo original', 'Horas con segundos'] },
  },
  oneTime: 'pago único por conversación',
  howTitle: 'Cómo exportar tu chat de WhatsApp',
  howIntro: 'WhatsApp permite exportar cualquier conversación. Elige «Adjuntar archivos» si quieres las fotos en el PDF.',
  iphone: {
    title: 'En iPhone',
    steps: ['Abre la conversación en WhatsApp.', 'Toca el nombre del contacto o del grupo arriba.', 'Baja y toca «Exportar chat».', 'Elige «Adjuntar archivos» o «Sin archivos».', 'Guarda el archivo en «Archivos» o envíatelo por correo.'],
  },
  android: {
    title: 'En Android',
    steps: ['Abre la conversación en WhatsApp.', 'Toca los tres puntos ⋮ arriba a la derecha.', 'Toca «Más» y luego «Exportar chat».', 'Elige «Incluir archivos» o «Sin archivos».', 'Guarda el archivo o envíatelo por correo.'],
  },
  howTip: 'Después, suelta el archivo .zip o .txt en ConversaPDF, desde el móvil o el ordenador.',
  usesTitle: 'Para qué sirve',
  uses: [
    { title: 'Juicios y abogados', text: 'Un PDF ordenado, paginado y con la huella del archivo original, mucho más claro que una pila de capturas de pantalla.' },
    { title: 'Alquiler, seguros y reclamaciones', text: 'Demuestra lo que se acordó con un propietario, una empresa o una aseguradora, con fechas y horas.' },
    { title: 'Recuerdos', text: 'Guarda las conversaciones con alguien importante, con sus fotos, para leerlas o imprimirlas.' },
  ],
  pricingTitle: 'Precios sencillos',
  pricingIntro: 'Vista previa gratis. Pagas solo por el PDF que necesitas, sin suscripción ni cuenta.',
  faqTitle: 'Preguntas frecuentes',
  faqs: [
    { q: '¿Mi conversación se sube a un servidor?', a: 'No. El archivo se lee y el PDF se crea directamente en tu navegador. Tu conversación y tus fotos nunca salen de tu dispositivo.' },
    { q: '¿La otra persona se entera de que exporto el chat?', a: 'No. Exportar un chat desde WhatsApp no envía ninguna notificación a los demás participantes.' },
    { q: '¿Sirve como prueba en un juicio?', a: 'Un PDF claro y completo es mucho más útil que unas capturas, y la versión «Prueba» incluye la huella SHA-256 del archivo original para demostrar que no se ha modificado. Pero decidir si una prueba se admite corresponde al juez: consulta siempre a tu abogado.' },
    { q: '¿Funciona con chats de grupo?', a: 'Sí. Cada participante aparece con su nombre y un color distinto.' },
    { q: '¿Y los audios y vídeos?', a: 'Un PDF no puede reproducir audio ni vídeo: aparecen indicados en su sitio con el nombre del archivo.' },
    { q: '¿Funciona desde el móvil?', a: 'Sí, en iPhone y Android. Para chats muy largos con muchas fotos, un ordenador irá más rápido.' },
    { q: 'Mi archivo no se reconoce, ¿qué hago?', a: 'Asegúrate de usar la opción «Exportar chat» de WhatsApp y de enviar el archivo .zip o .txt sin modificarlo. Si sigue sin funcionar, escríbenos.' },
    { q: '¿Puedo pedir un reembolso?', a: 'Sí: si el PDF no se genera o tiene un problema que no podemos resolver, te devolvemos el dinero.' },
  ],
  footer: {
    legal: 'Aviso legal',
    privacy: 'Privacidad',
    terms: 'Condiciones',
    refund: 'Reembolsos',
    notAffiliated: 'ConversaPDF no está afiliado a WhatsApp ni a Meta. WhatsApp es una marca de WhatsApp LLC.',
    twemoji: 'Emojis: Twemoji (CC-BY 4.0).',
    languages: 'Idiomas',
  },
};

const pt: UiStrings = {
  langName: 'Português',
  meta: {
    title: 'Converter conversa do WhatsApp em PDF – com fotos, datas e horas | ConversaPDF',
    description:
      'Transforme uma conversa exportada do WhatsApp em um PDF limpo e legível: nomes, datas, horas, fotos e números de página. Tudo é processado no seu navegador, nada é enviado para a internet.',
  },
  nav: { how: 'Como funciona', pricing: 'Preços', faq: 'Dúvidas' },
  hero: {
    kicker: 'Conversa do WhatsApp → PDF',
    title: 'Transforme sua conversa do WhatsApp em um PDF claro e organizado',
    subtitle:
      'Para um advogado, um processo, um proprietário, uma seguradora ou simplesmente para guardar. Com nomes, datas, horas e fotos no lugar certo.',
    privacy: 'Sua conversa nunca sai do seu aparelho: tudo é processado no seu navegador.',
  },
  tool: {
    drop: 'Solte aqui a exportação da sua conversa',
    dropHint: 'Arquivo .zip (com fotos) ou .txt exportado do WhatsApp',
    choose: 'Escolher arquivo',
    loading: 'Lendo a conversa…',
    errors: {
      'no-chat-file': 'Não encontramos a conversa dentro do .zip. Exporte a conversa novamente pelo WhatsApp.',
      'bad-zip': 'Não foi possível abrir este .zip. Tente exportar a conversa novamente.',
      empty: 'O arquivo está vazio.',
      'not-whatsapp': 'Este arquivo não parece uma exportação do WhatsApp. Use a opção “Exportar conversa”.',
      generic: 'Algo deu errado. Tente novamente.',
      payment: 'Não conseguimos confirmar o pagamento. Se você foi cobrado, fale conosco e resolvemos.',
      'too-big': 'O arquivo é grande demais para o seu navegador (mais de 1 GB).',
    },
    summary: 'Conversa pronta',
    participants: 'Participantes',
    messages: 'Mensagens',
    photos: 'Fotos',
    period: 'Período',
    me: 'Quem é você? (suas mensagens ficarão à direita)',
    meNone: 'Ninguém / prefiro não dizer',
    from: 'De',
    to: 'Até',
    preview: 'Ver prévia grátis',
    previewing: 'Preparando a prévia…',
    choosePlan: 'Escolha seu PDF',
    buy: 'Baixar',
    generating: 'Criando seu PDF…',
    preparingPhotos: (d, t) => `Preparando fotos (${d}/${t})…`,
    downloaded: 'Seu PDF está pronto! O download começou.',
    downloadAgain: 'Baixar novamente',
    another: 'Converter outra conversa',
    paymentsOff: 'Os downloads pagos estarão disponíveis em breve.',
  },
  plans: {
    text: { name: 'Texto', desc: 'A conversa inteira, organizada e paginada.', features: ['Nomes, datas e horas', 'Números de página', 'Anexos indicados pelo nome'] },
    photos: { name: 'Com fotos', desc: 'As fotos aparecem no lugar certo dentro da conversa.', features: ['Tudo do plano “Texto”', 'Fotos dentro da conversa', 'Ideal para guardar lembranças'] },
    proof: { name: 'Prova', desc: 'Para um advogado, um processo ou uma reclamação.', features: ['Tudo do plano “Com fotos”', 'Capa com participantes e período', 'Impressão digital SHA-256 do arquivo original', 'Horários com segundos'] },
  },
  oneTime: 'pagamento único por conversa',
  howTitle: 'Como exportar sua conversa do WhatsApp',
  howIntro: 'O WhatsApp permite exportar qualquer conversa. Escolha “Anexar mídia” se quiser as fotos no PDF.',
  iphone: {
    title: 'No iPhone',
    steps: ['Abra a conversa no WhatsApp.', 'Toque no nome do contato ou do grupo no topo.', 'Desça e toque em “Exportar conversa”.', 'Escolha “Anexar mídia” ou “Sem mídia”.', 'Salve o arquivo em “Arquivos” ou envie para o seu e-mail.'],
  },
  android: {
    title: 'No Android',
    steps: ['Abra a conversa no WhatsApp.', 'Toque nos três pontos ⋮ no canto superior direito.', 'Toque em “Mais” e depois em “Exportar conversa”.', 'Escolha “Incluir arquivos de mídia” ou “Sem arquivos de mídia”.', 'Salve o arquivo ou envie para o seu e-mail.'],
  },
  howTip: 'Depois, solte o arquivo .zip ou .txt no ConversaPDF, pelo celular ou pelo computador.',
  usesTitle: 'Para que serve',
  uses: [
    { title: 'Processos e advogados', text: 'Um PDF organizado, paginado e com a impressão digital do arquivo original, muito mais claro que uma pilha de capturas de tela.' },
    { title: 'Aluguel, seguros e reclamações', text: 'Mostre o que foi combinado com um proprietário, uma empresa ou uma seguradora, com datas e horas.' },
    { title: 'Lembranças', text: 'Guarde as conversas com alguém importante, com as fotos, para ler ou imprimir.' },
  ],
  pricingTitle: 'Preços simples',
  pricingIntro: 'Prévia grátis. Você paga só pelo PDF de que precisa, sem assinatura e sem conta.',
  faqTitle: 'Perguntas frequentes',
  faqs: [
    { q: 'Minha conversa é enviada para um servidor?', a: 'Não. O arquivo é lido e o PDF é criado diretamente no seu navegador. Sua conversa e suas fotos nunca saem do seu aparelho.' },
    { q: 'A outra pessoa fica sabendo que exportei a conversa?', a: 'Não. Exportar uma conversa no WhatsApp não envia nenhuma notificação aos outros participantes.' },
    { q: 'Serve como prova em um processo?', a: 'Um PDF claro e completo é muito mais útil do que capturas de tela, e a versão “Prova” inclui a impressão digital SHA-256 do arquivo original para mostrar que ele não foi alterado. Mas quem decide se uma prova é aceita é o juiz: consulte sempre o seu advogado.' },
    { q: 'Funciona com conversas em grupo?', a: 'Sim. Cada participante aparece com o seu nome e uma cor diferente.' },
    { q: 'E os áudios e vídeos?', a: 'Um PDF não reproduz áudio nem vídeo: eles aparecem indicados no lugar certo com o nome do arquivo.' },
    { q: 'Funciona pelo celular?', a: 'Sim, no iPhone e no Android. Para conversas muito longas com muitas fotos, um computador será mais rápido.' },
    { q: 'Meu arquivo não é reconhecido, o que faço?', a: 'Use a opção “Exportar conversa” do WhatsApp e envie o arquivo .zip ou .txt sem modificá-lo. Se ainda não funcionar, fale conosco.' },
    { q: 'Posso pedir reembolso?', a: 'Sim: se o PDF não for gerado ou tiver um problema que não conseguimos resolver, devolvemos o seu dinheiro.' },
  ],
  footer: {
    legal: 'Aviso legal',
    privacy: 'Privacidade',
    terms: 'Termos',
    refund: 'Reembolsos',
    notAffiliated: 'O ConversaPDF não é afiliado ao WhatsApp nem à Meta. WhatsApp é uma marca da WhatsApp LLC.',
    twemoji: 'Emojis: Twemoji (CC-BY 4.0).',
    languages: 'Idiomas',
  },
};

const it: UiStrings = {
  langName: 'Italiano',
  meta: {
    title: 'Convertire una chat WhatsApp in PDF – con foto, date e orari | ConversaPDF',
    description:
      'Trasforma una chat WhatsApp esportata in un PDF pulito e leggibile: nomi, date, orari, foto e numeri di pagina. Tutto viene elaborato nel tuo browser, niente viene caricato su internet.',
  },
  nav: { how: 'Come funziona', pricing: 'Prezzi', faq: 'Domande' },
  hero: {
    kicker: 'Chat WhatsApp → PDF',
    title: 'Trasforma la tua chat WhatsApp in un PDF chiaro e ordinato',
    subtitle:
      'Per un avvocato, una causa, un proprietario, un’assicurazione o semplicemente per conservarla. Con nomi, date, orari e foto al posto giusto.',
    privacy: 'La tua chat non lascia mai il tuo dispositivo: tutto viene elaborato nel browser.',
  },
  tool: {
    drop: 'Trascina qui l’esportazione della chat',
    dropHint: 'File .zip (con foto) o .txt esportato da WhatsApp',
    choose: 'Scegli file',
    loading: 'Lettura della chat…',
    errors: {
      'no-chat-file': 'Non troviamo la chat dentro lo .zip. Esporta di nuovo la chat da WhatsApp.',
      'bad-zip': 'Impossibile aprire questo .zip. Prova a esportare di nuovo la chat.',
      empty: 'Il file è vuoto.',
      'not-whatsapp': 'Questo file non sembra un’esportazione di WhatsApp. Usa l’opzione «Esporta chat».',
      generic: 'Qualcosa è andato storto. Riprova.',
      payment: 'Non riusciamo a confermare il pagamento. Se ti è stato addebitato, scrivici e risolviamo.',
      'too-big': 'Il file è troppo grande per il tuo browser (oltre 1 GB).',
    },
    summary: 'Chat pronta',
    participants: 'Partecipanti',
    messages: 'Messaggi',
    photos: 'Foto',
    period: 'Periodo',
    me: 'Chi sei tu? (i tuoi messaggi andranno a destra)',
    meNone: 'Nessuno / preferisco non dirlo',
    from: 'Dal',
    to: 'Al',
    preview: 'Vedi anteprima gratis',
    previewing: 'Preparazione dell’anteprima…',
    choosePlan: 'Scegli il tuo PDF',
    buy: 'Scarica',
    generating: 'Creazione del PDF…',
    preparingPhotos: (d, t) => `Preparazione foto (${d}/${t})…`,
    downloaded: 'Il tuo PDF è pronto! Il download è iniziato.',
    downloadAgain: 'Scarica di nuovo',
    another: 'Converti un’altra chat',
    paymentsOff: 'I download a pagamento saranno disponibili a breve.',
  },
  plans: {
    text: { name: 'Testo', desc: 'Tutta la chat, ordinata e impaginata.', features: ['Nomi, date e orari', 'Numeri di pagina', 'Allegati indicati per nome'] },
    photos: { name: 'Con foto', desc: 'Le foto compaiono al loro posto nella chat.', features: ['Tutto di «Testo»', 'Foto dentro la chat', 'Ideale per conservare i ricordi'] },
    proof: { name: 'Prova', desc: 'Per un avvocato, una causa o un reclamo.', features: ['Tutto di «Con foto»', 'Copertina con partecipanti e periodo', 'Impronta SHA-256 del file originale', 'Orari con i secondi'] },
  },
  oneTime: 'pagamento unico per chat',
  howTitle: 'Come esportare la tua chat WhatsApp',
  howIntro: 'WhatsApp permette di esportare qualsiasi chat. Scegli «Allega media» se vuoi le foto nel PDF.',
  iphone: {
    title: 'Su iPhone',
    steps: ['Apri la chat in WhatsApp.', 'Tocca il nome del contatto o del gruppo in alto.', 'Scorri e tocca «Esporta chat».', 'Scegli «Allega media» o «Senza media».', 'Salva il file in «File» o invialo alla tua email.'],
  },
  android: {
    title: 'Su Android',
    steps: ['Apri la chat in WhatsApp.', 'Tocca i tre puntini ⋮ in alto a destra.', 'Tocca «Altro» e poi «Esporta chat».', 'Scegli «Includi file multimediali» o «Senza file multimediali».', 'Salva il file o invialo alla tua email.'],
  },
  howTip: 'Poi trascina il file .zip o .txt su ConversaPDF, dal telefono o dal computer.',
  usesTitle: 'A cosa serve',
  uses: [
    { title: 'Cause e avvocati', text: 'Un PDF ordinato, impaginato e con l’impronta del file originale, molto più chiaro di una pila di screenshot.' },
    { title: 'Affitti, assicurazioni e reclami', text: 'Dimostra cosa è stato concordato con un proprietario, un’azienda o un’assicurazione, con date e orari.' },
    { title: 'Ricordi', text: 'Conserva le chat con una persona importante, con le foto, da rileggere o stampare.' },
  ],
  pricingTitle: 'Prezzi semplici',
  pricingIntro: 'Anteprima gratis. Paghi solo il PDF che ti serve, senza abbonamento e senza account.',
  faqTitle: 'Domande frequenti',
  faqs: [
    { q: 'La mia chat viene caricata su un server?', a: 'No. Il file viene letto e il PDF viene creato direttamente nel tuo browser. La chat e le foto non lasciano mai il tuo dispositivo.' },
    { q: 'L’altra persona sa che ho esportato la chat?', a: 'No. Esportare una chat da WhatsApp non invia nessuna notifica agli altri partecipanti.' },
    { q: 'Vale come prova in tribunale?', a: 'Un PDF chiaro e completo è molto più utile degli screenshot, e la versione «Prova» include l’impronta SHA-256 del file originale per mostrare che non è stato modificato. Ma è il giudice a decidere se una prova è ammessa: chiedi sempre al tuo avvocato.' },
    { q: 'Funziona con le chat di gruppo?', a: 'Sì. Ogni partecipante compare con il suo nome e un colore diverso.' },
    { q: 'E gli audio e i video?', a: 'Un PDF non può riprodurre audio o video: sono indicati al loro posto con il nome del file.' },
    { q: 'Funziona dal telefono?', a: 'Sì, su iPhone e Android. Per chat molto lunghe con tante foto, un computer sarà più veloce.' },
    { q: 'Il mio file non viene riconosciuto, cosa faccio?', a: 'Usa l’opzione «Esporta chat» di WhatsApp e carica il file .zip o .txt senza modificarlo. Se ancora non funziona, scrivici.' },
    { q: 'Posso chiedere un rimborso?', a: 'Sì: se il PDF non viene generato o ha un problema che non riusciamo a risolvere, ti rimborsiamo.' },
  ],
  footer: {
    legal: 'Note legali',
    privacy: 'Privacy',
    terms: 'Condizioni',
    refund: 'Rimborsi',
    notAffiliated: 'ConversaPDF non è affiliato a WhatsApp né a Meta. WhatsApp è un marchio di WhatsApp LLC.',
    twemoji: 'Emoji: Twemoji (CC-BY 4.0).',
    languages: 'Lingue',
  },
};

const fr: UiStrings = {
  langName: 'Français',
  meta: {
    title: 'Convertir une conversation WhatsApp en PDF – avec photos, dates et heures | ConversaPDF',
    description:
      "Transformez une conversation WhatsApp exportée en un PDF propre et lisible : noms, dates, heures, photos et numéros de page. Tout est traité dans votre navigateur, rien n'est envoyé sur internet.",
  },
  nav: { how: 'Comment ça marche', pricing: 'Tarifs', faq: 'Questions' },
  hero: {
    kicker: 'Conversation WhatsApp → PDF',
    title: 'Transformez votre conversation WhatsApp en un PDF clair et ordonné',
    subtitle:
      'Pour un avocat, une procédure, un propriétaire, une assurance ou simplement pour la garder. Avec noms, dates, heures et photos à leur place.',
    privacy: 'Votre conversation ne quitte jamais votre appareil : tout est traité dans votre navigateur.',
  },
  tool: {
    drop: "Déposez ici l'export de votre conversation",
    dropHint: 'Fichier .zip (avec photos) ou .txt exporté depuis WhatsApp',
    choose: 'Choisir un fichier',
    loading: 'Lecture de la conversation…',
    errors: {
      'no-chat-file': 'Impossible de trouver la conversation dans le .zip. Exportez-la à nouveau depuis WhatsApp.',
      'bad-zip': "Impossible d'ouvrir ce .zip. Essayez d'exporter à nouveau la conversation.",
      empty: 'Le fichier est vide.',
      'not-whatsapp': "Ce fichier ne ressemble pas à un export WhatsApp. Utilisez l'option « Exporter la discussion ».",
      generic: "Une erreur s'est produite. Réessayez.",
      payment: "Nous n'avons pas pu confirmer le paiement. Si vous avez été débité, écrivez-nous et on règle ça.",
      'too-big': 'Le fichier est trop gros pour votre navigateur (plus de 1 Go).',
    },
    summary: 'Conversation prête',
    participants: 'Participants',
    messages: 'Messages',
    photos: 'Photos',
    period: 'Période',
    me: 'Qui êtes-vous ? (vos messages seront à droite)',
    meNone: 'Personne / je préfère ne pas le dire',
    from: 'Du',
    to: 'Au',
    preview: "Voir l'aperçu gratuit",
    previewing: "Préparation de l'aperçu…",
    choosePlan: 'Choisissez votre PDF',
    buy: 'Télécharger',
    generating: 'Création de votre PDF…',
    preparingPhotos: (d, t) => `Préparation des photos (${d}/${t})…`,
    downloaded: 'Votre PDF est prêt ! Le téléchargement a commencé.',
    downloadAgain: 'Télécharger à nouveau',
    another: 'Convertir une autre conversation',
    paymentsOff: 'Les téléchargements payants arrivent très bientôt.',
  },
  plans: {
    text: { name: 'Texte', desc: 'Toute la conversation, ordonnée et paginée.', features: ['Noms, dates et heures', 'Numéros de page', 'Pièces jointes indiquées par leur nom'] },
    photos: { name: 'Avec photos', desc: 'Les photos apparaissent à leur place dans la conversation.', features: ['Tout le contenu de « Texte »', 'Photos dans la conversation', 'Idéal pour garder des souvenirs'] },
    proof: { name: 'Preuve', desc: 'Pour un avocat, une procédure ou une réclamation.', features: ['Tout le contenu de « Avec photos »', 'Page de garde avec participants et période', 'Empreinte SHA-256 du fichier original', 'Heures avec les secondes'] },
  },
  oneTime: 'paiement unique par conversation',
  howTitle: 'Comment exporter votre conversation WhatsApp',
  howIntro: "WhatsApp permet d'exporter n'importe quelle conversation. Choisissez « Joindre les médias » si vous voulez les photos dans le PDF.",
  iphone: {
    title: 'Sur iPhone',
    steps: ['Ouvrez la conversation dans WhatsApp.', 'Touchez le nom du contact ou du groupe en haut.', 'Descendez et touchez « Exporter la discussion ».', 'Choisissez « Joindre les médias » ou « Sans médias ».', "Enregistrez le fichier dans « Fichiers » ou envoyez-le-vous par e-mail."],
  },
  android: {
    title: 'Sur Android',
    steps: ['Ouvrez la conversation dans WhatsApp.', 'Touchez les trois points ⋮ en haut à droite.', 'Touchez « Plus » puis « Exporter la discussion ».', 'Choisissez « Inclure les médias » ou « Sans médias ».', 'Enregistrez le fichier ou envoyez-le-vous par e-mail.'],
  },
  howTip: "Ensuite, déposez le fichier .zip ou .txt sur ConversaPDF, depuis votre téléphone ou votre ordinateur.",
  usesTitle: 'À quoi ça sert',
  uses: [
    { title: 'Procédures et avocats', text: "Un PDF ordonné, paginé et avec l'empreinte du fichier original, bien plus clair qu'une pile de captures d'écran." },
    { title: 'Location, assurances et réclamations', text: 'Montrez ce qui a été convenu avec un propriétaire, une entreprise ou une assurance, avec dates et heures.' },
    { title: 'Souvenirs', text: "Gardez les conversations avec quelqu'un d'important, avec ses photos, pour les relire ou les imprimer." },
  ],
  pricingTitle: 'Des tarifs simples',
  pricingIntro: "Aperçu gratuit. Vous payez seulement le PDF dont vous avez besoin, sans abonnement ni compte.",
  faqTitle: 'Questions fréquentes',
  faqs: [
    { q: 'Ma conversation est-elle envoyée sur un serveur ?', a: 'Non. Le fichier est lu et le PDF est créé directement dans votre navigateur. Votre conversation et vos photos ne quittent jamais votre appareil.' },
    { q: "L'autre personne sait-elle que j'exporte la conversation ?", a: "Non. Exporter une discussion depuis WhatsApp n'envoie aucune notification aux autres participants." },
    { q: 'Est-ce valable comme preuve devant un tribunal ?', a: "Un PDF clair et complet est bien plus utile que des captures d'écran, et la version « Preuve » contient l'empreinte SHA-256 du fichier original pour montrer qu'il n'a pas été modifié. Mais c'est le juge qui apprécie la valeur d'une preuve : demandez toujours conseil à votre avocat." },
    { q: 'Ça marche avec les groupes ?', a: 'Oui. Chaque participant apparaît avec son nom et une couleur différente.' },
    { q: 'Et les messages vocaux et vidéos ?', a: 'Un PDF ne peut pas lire de son ni de vidéo : ils sont indiqués à leur place avec le nom du fichier.' },
    { q: 'Ça marche sur téléphone ?', a: 'Oui, sur iPhone et Android. Pour les très longues conversations avec beaucoup de photos, un ordinateur ira plus vite.' },
    { q: "Mon fichier n'est pas reconnu, que faire ?", a: "Utilisez bien l'option « Exporter la discussion » de WhatsApp et déposez le fichier .zip ou .txt sans le modifier. Si ça ne marche toujours pas, écrivez-nous." },
    { q: 'Puis-je être remboursé ?', a: "Oui : si le PDF ne se génère pas ou a un problème que nous ne pouvons pas résoudre, nous vous remboursons." },
  ],
  footer: {
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    refund: 'Remboursements',
    notAffiliated: "ConversaPDF n'est affilié ni à WhatsApp ni à Meta. WhatsApp est une marque de WhatsApp LLC.",
    twemoji: 'Emojis : Twemoji (CC-BY 4.0).',
    languages: 'Langues',
  },
};

const en: UiStrings = {
  langName: 'English',
  meta: {
    title: 'Convert a WhatsApp chat to PDF – with photos, dates and times | ConversaPDF',
    description:
      'Turn an exported WhatsApp chat into a clean, readable PDF: names, dates, times, photos and page numbers. Everything runs in your browser, nothing is uploaded.',
  },
  nav: { how: 'How it works', pricing: 'Pricing', faq: 'FAQ' },
  hero: {
    kicker: 'WhatsApp chat → PDF',
    title: 'Turn your WhatsApp chat into a clear, tidy PDF',
    subtitle:
      'For a lawyer, a court case, a landlord, an insurer, or just to keep it. With names, dates, times and photos where they belong.',
    privacy: 'Your chat never leaves your device: everything runs in your browser.',
  },
  tool: {
    drop: 'Drop your chat export here',
    dropHint: '.zip file (with photos) or .txt exported from WhatsApp',
    choose: 'Choose file',
    loading: 'Reading the chat…',
    errors: {
      'no-chat-file': 'We could not find the chat inside the .zip. Export the chat again from WhatsApp.',
      'bad-zip': 'This .zip cannot be opened. Try exporting the chat again.',
      empty: 'The file is empty.',
      'not-whatsapp': 'This file does not look like a WhatsApp export. Use the “Export chat” option.',
      generic: 'Something went wrong. Please try again.',
      payment: 'We could not confirm the payment. If you were charged, write to us and we will sort it out.',
      'too-big': 'The file is too large for your browser (over 1 GB).',
    },
    summary: 'Chat ready',
    participants: 'Participants',
    messages: 'Messages',
    photos: 'Photos',
    period: 'Period',
    me: 'Who are you? (your messages go on the right)',
    meNone: 'Nobody / prefer not to say',
    from: 'From',
    to: 'To',
    preview: 'See free preview',
    previewing: 'Preparing the preview…',
    choosePlan: 'Choose your PDF',
    buy: 'Download',
    generating: 'Creating your PDF…',
    preparingPhotos: (d, t) => `Preparing photos (${d}/${t})…`,
    downloaded: 'Your PDF is ready! The download has started.',
    downloadAgain: 'Download again',
    another: 'Convert another chat',
    paymentsOff: 'Paid downloads are coming very soon.',
  },
  plans: {
    text: { name: 'Text', desc: 'The whole chat, in order and paginated.', features: ['Names, dates and times', 'Page numbers', 'Attachments listed by name'] },
    photos: { name: 'With photos', desc: 'Photos appear in place inside the chat.', features: ['Everything in “Text”', 'Photos inside the chat', 'Great for keeping memories'] },
    proof: { name: 'Evidence', desc: 'For a lawyer, a court case or a claim.', features: ['Everything in “With photos”', 'Cover page with participants and period', 'SHA-256 fingerprint of the original file', 'Times with seconds'] },
  },
  oneTime: 'one-time payment per chat',
  howTitle: 'How to export your WhatsApp chat',
  howIntro: 'WhatsApp lets you export any chat. Choose “Attach Media” if you want the photos in the PDF.',
  iphone: {
    title: 'On iPhone',
    steps: ['Open the chat in WhatsApp.', 'Tap the contact or group name at the top.', 'Scroll down and tap “Export Chat”.', 'Choose “Attach Media” or “Without Media”.', 'Save the file to Files or email it to yourself.'],
  },
  android: {
    title: 'On Android',
    steps: ['Open the chat in WhatsApp.', 'Tap the three dots ⋮ at the top right.', 'Tap “More”, then “Export chat”.', 'Choose “Include media” or “Without media”.', 'Save the file or email it to yourself.'],
  },
  howTip: 'Then drop the .zip or .txt file on ConversaPDF, from your phone or your computer.',
  usesTitle: 'What it is for',
  uses: [
    { title: 'Court cases and lawyers', text: 'A tidy, paginated PDF with the fingerprint of the original file, far clearer than a pile of screenshots.' },
    { title: 'Rentals, insurance and claims', text: 'Show what was agreed with a landlord, a company or an insurer, with dates and times.' },
    { title: 'Memories', text: 'Keep the chats with someone who matters, photos included, to read again or print.' },
  ],
  pricingTitle: 'Simple pricing',
  pricingIntro: 'Free preview. You only pay for the PDF you need, with no subscription and no account.',
  faqTitle: 'Frequently asked questions',
  faqs: [
    { q: 'Is my chat uploaded to a server?', a: 'No. The file is read and the PDF is built directly in your browser. Your chat and photos never leave your device.' },
    { q: 'Will the other person know I exported the chat?', a: 'No. Exporting a chat from WhatsApp does not notify the other participants.' },
    { q: 'Can I use it as evidence in court?', a: 'A clear, complete PDF is far more useful than screenshots, and the “Evidence” edition includes the SHA-256 fingerprint of the original file to show it was not changed. But whether evidence is admitted is for the court to decide: always check with your lawyer.' },
    { q: 'Does it work with group chats?', a: 'Yes. Each participant appears with their name in a different color.' },
    { q: 'What about voice notes and videos?', a: 'A PDF cannot play sound or video: they are listed in place with their file name.' },
    { q: 'Does it work on a phone?', a: 'Yes, on iPhone and Android. For very long chats with many photos, a computer will be faster.' },
    { q: 'My file is not recognized, what should I do?', a: 'Make sure you used WhatsApp’s “Export chat” option and drop the .zip or .txt file unchanged. If it still fails, write to us.' },
    { q: 'Can I get a refund?', a: 'Yes: if the PDF cannot be created or has a problem we cannot fix, we refund you.' },
  ],
  footer: {
    legal: 'Legal notice',
    privacy: 'Privacy',
    terms: 'Terms',
    refund: 'Refunds',
    notAffiliated: 'ConversaPDF is not affiliated with WhatsApp or Meta. WhatsApp is a trademark of WhatsApp LLC.',
    twemoji: 'Emoji: Twemoji (CC-BY 4.0).',
    languages: 'Languages',
  },
};

const all: Record<Locale, UiStrings> = { es, pt, it, fr, en };

export function ui(locale: Locale): UiStrings {
  return all[locale];
}
