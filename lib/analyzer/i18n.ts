import type { Locale } from '@/config/site';
import type { Faq } from '@/lib/i18n/ui';

export interface AnalyzerStrings {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  messages: string;
  words: string;
  days: string;
  since: (date: string) => string;
  perPerson: string;
  wordsPerMessage: string;
  starts: string;
  reply: string;
  noReply: string;
  hours: string;
  weekdays: string;
  emojis: string;
  noEmojis: string;
  busiestDay: string;
  messagesOn: (n: string) => string;
  streak: string;
  inARow: (n: string) => string;
  activeDays: (active: string, span: string) => string;
  media: string;
  deleted: string;
  ctaTitle: string;
  ctaText: string;
  another: string;
  whatTitle: string;
  what: string[];
  faqs: Faq[];
}

const es: AnalyzerStrings = {
  slug: 'analizar-chat-whatsapp',
  label: 'Analizar un chat de WhatsApp (gratis)',
  metaTitle: 'Analizar chat de WhatsApp gratis | ConversaPDF',
  metaDescription: 'Quién escribe más, emojis favoritos, horas de actividad y tiempo de respuesta de tu chat de WhatsApp. Gratis y privado: todo en tu navegador.',
  h1: 'Analiza tu chat de WhatsApp',
  intro: 'Suelta la exportación de tu chat y descubre quién escribe más, vuestros emojis favoritos, a qué hora habláis y lo rápido que respondéis. Gratis, y tu chat no sale de tu dispositivo.',
  messages: 'Mensajes',
  words: 'Palabras',
  days: 'Días de conversación',
  since: (d) => `desde el ${d}`,
  perPerson: 'Quién escribe más',
  wordsPerMessage: 'palabras por mensaje',
  starts: 'conversaciones iniciadas',
  reply: 'responde en',
  noReply: 'sin respuestas medidas',
  hours: 'A qué hora habláis',
  weekdays: 'Los días más activos',
  emojis: 'Emojis favoritos',
  noEmojis: 'Ningún emoji en este chat.',
  busiestDay: 'El día con más mensajes',
  messagesOn: (n) => `${n} mensajes`,
  streak: 'La racha más larga',
  inARow: (n) => `${n} días seguidos`,
  activeDays: (a, s) => `${a} días con mensajes de ${s}`,
  media: 'Fotos y archivos',
  deleted: 'Mensajes eliminados',
  ctaTitle: 'Guarda esta conversación para siempre',
  ctaText: 'Conviértela en un PDF limpio con las fotos en su sitio, para releerla, imprimirla o regalarla.',
  another: 'Analizar otro chat',
  whatTitle: 'Qué muestra el análisis',
  what: [
    'El número de mensajes y palabras de cada persona, y su parte en la conversación.',
    'Quién suele empezar las conversaciones y cuánto tarda cada uno en responder.',
    'Las horas y los días de la semana en los que más habláis.',
    'Vuestros emojis favoritos, el día con más mensajes y la racha más larga.',
  ],
  faqs: [
    { q: '¿Se sube mi chat a algún sitio?', a: 'No. El análisis se hace por completo en tu navegador: tus mensajes no salen de tu dispositivo y no se guarda nada.' },
    { q: '¿Funciona con chats de grupo?', a: 'Sí. Cada participante tiene sus propias estadísticas: mensajes, palabras por mensaje, conversaciones iniciadas y tiempo de respuesta.' },
    { q: '¿Cómo se calcula el tiempo de respuesta?', a: 'Para cada persona medimos el tiempo entre el mensaje de otra persona y su respuesta, sin contar las pausas de más de 12 horas, y mostramos la mediana para que una respuesta lenta no lo distorsione.' },
  ],
};

const pt: AnalyzerStrings = {
  slug: 'analisar-conversa-whatsapp',
  label: 'Analisar uma conversa do WhatsApp (grátis)',
  metaTitle: 'Analisar conversa do WhatsApp grátis | ConversaPDF',
  metaDescription: 'Quem escreve mais, emojis favoritos, horários de atividade e tempo de resposta da sua conversa do WhatsApp. Grátis e privado, no seu navegador.',
  h1: 'Analise sua conversa do WhatsApp',
  intro: 'Solte a exportação da sua conversa e descubra quem escreve mais, os emojis favoritos, em que horário vocês conversam e quão rápido respondem. Grátis, e a conversa não sai do seu aparelho.',
  messages: 'Mensagens',
  words: 'Palavras',
  days: 'Dias de conversa',
  since: (d) => `desde ${d}`,
  perPerson: 'Quem escreve mais',
  wordsPerMessage: 'palavras por mensagem',
  starts: 'conversas iniciadas',
  reply: 'responde em',
  noReply: 'sem respostas medidas',
  hours: 'Em que horário vocês conversam',
  weekdays: 'Os dias mais ativos',
  emojis: 'Emojis favoritos',
  noEmojis: 'Nenhum emoji nesta conversa.',
  busiestDay: 'O dia com mais mensagens',
  messagesOn: (n) => `${n} mensagens`,
  streak: 'A maior sequência',
  inARow: (n) => `${n} dias seguidos`,
  activeDays: (a, s) => `${a} dias com mensagens de ${s}`,
  media: 'Fotos e arquivos',
  deleted: 'Mensagens apagadas',
  ctaTitle: 'Guarde esta conversa para sempre',
  ctaText: 'Transforme-a em um PDF limpo com as fotos no lugar, para reler, imprimir ou dar de presente.',
  another: 'Analisar outra conversa',
  whatTitle: 'O que a análise mostra',
  what: [
    'O número de mensagens e palavras de cada pessoa e a sua parte na conversa.',
    'Quem costuma começar as conversas e quanto tempo cada um leva para responder.',
    'Os horários e os dias da semana em que vocês mais conversam.',
    'Os emojis favoritos, o dia com mais mensagens e a maior sequência de dias.',
  ],
  faqs: [
    { q: 'Minha conversa é enviada para algum lugar?', a: 'Não. A análise é feita inteiramente no seu navegador: suas mensagens não saem do seu aparelho e nada é armazenado.' },
    { q: 'Funciona com grupos?', a: 'Sim. Cada participante tem as suas próprias estatísticas: mensagens, palavras por mensagem, conversas iniciadas e tempo de resposta.' },
    { q: 'Como é calculado o tempo de resposta?', a: 'Para cada pessoa, medimos o tempo entre a mensagem de outra pessoa e a resposta, ignorando pausas de mais de 12 horas, e mostramos a mediana para que uma resposta lenta não distorça o resultado.' },
  ],
};

const it: AnalyzerStrings = {
  slug: 'analizzare-chat-whatsapp',
  label: 'Analizzare una chat WhatsApp (gratis)',
  metaTitle: 'Analizzare una chat WhatsApp gratis | ConversaPDF',
  metaDescription: 'Chi scrive di più, emoji preferite, orari di attività e tempi di risposta della tua chat WhatsApp. Gratis e privato: tutto nel tuo browser.',
  h1: 'Analizza la tua chat WhatsApp',
  intro: 'Trascina l’esportazione della chat e scopri chi scrive di più, le vostre emoji preferite, a che ora parlate e quanto in fretta rispondete. Gratis, e la chat non lascia il tuo dispositivo.',
  messages: 'Messaggi',
  words: 'Parole',
  days: 'Giorni di conversazione',
  since: (d) => `dal ${d}`,
  perPerson: 'Chi scrive di più',
  wordsPerMessage: 'parole per messaggio',
  starts: 'conversazioni avviate',
  reply: 'risponde in',
  noReply: 'nessuna risposta misurata',
  hours: 'A che ora parlate',
  weekdays: 'I giorni più attivi',
  emojis: 'Emoji preferite',
  noEmojis: 'Nessuna emoji in questa chat.',
  busiestDay: 'Il giorno con più messaggi',
  messagesOn: (n) => `${n} messaggi`,
  streak: 'La serie più lunga',
  inARow: (n) => `${n} giorni di fila`,
  activeDays: (a, s) => `${a} giorni con messaggi su ${s}`,
  media: 'Foto e file',
  deleted: 'Messaggi eliminati',
  ctaTitle: 'Conserva questa conversazione per sempre',
  ctaText: 'Trasformala in un PDF pulito con le foto al loro posto, da rileggere, stampare o regalare.',
  another: 'Analizza un’altra chat',
  whatTitle: 'Cosa mostra l’analisi',
  what: [
    'Il numero di messaggi e parole di ogni persona e la sua parte nella conversazione.',
    'Chi inizia di solito le conversazioni e quanto ci mette ognuno a rispondere.',
    'Gli orari e i giorni della settimana in cui parlate di più.',
    'Le vostre emoji preferite, il giorno con più messaggi e la serie più lunga.',
  ],
  faqs: [
    { q: 'La mia chat viene caricata da qualche parte?', a: 'No. L’analisi avviene interamente nel tuo browser: i tuoi messaggi non lasciano il dispositivo e non viene salvato nulla.' },
    { q: 'Funziona con i gruppi?', a: 'Sì. Ogni partecipante ha le sue statistiche: messaggi, parole per messaggio, conversazioni avviate e tempo di risposta.' },
    { q: 'Come si calcola il tempo di risposta?', a: 'Per ogni persona misuriamo il tempo tra il messaggio di un altro e la sua risposta, ignorando le pause oltre le 12 ore, e mostriamo la mediana così una risposta lenta non falsa il risultato.' },
  ],
};

const fr: AnalyzerStrings = {
  slug: 'analyse-conversation-whatsapp',
  label: 'Analyser une conversation WhatsApp (gratuit)',
  metaTitle: 'Analyse de conversation WhatsApp gratuite | ConversaPDF',
  metaDescription: 'Qui écrit le plus, emojis préférés, heures d’activité, temps de réponse : les stats de votre conversation WhatsApp. Gratuit et privé.',
  h1: 'Analysez votre conversation WhatsApp',
  intro: 'Déposez l’export de votre conversation et découvrez qui écrit le plus, vos emojis préférés, à quelle heure vous parlez et à quelle vitesse vous répondez. Gratuit, et la conversation ne quitte pas votre appareil.',
  messages: 'Messages',
  words: 'Mots',
  days: 'Jours de conversation',
  since: (d) => `depuis le ${d}`,
  perPerson: 'Qui écrit le plus',
  wordsPerMessage: 'mots par message',
  starts: 'conversations lancées',
  reply: 'répond en',
  noReply: 'pas de réponse mesurée',
  hours: 'À quelle heure vous parlez',
  weekdays: 'Les jours les plus actifs',
  emojis: 'Emojis préférés',
  noEmojis: 'Aucun emoji dans cette conversation.',
  busiestDay: 'Le jour le plus bavard',
  messagesOn: (n) => `${n} messages`,
  streak: 'La plus longue série',
  inARow: (n) => `${n} jours d’affilée`,
  activeDays: (a, s) => `${a} jours avec des messages sur ${s}`,
  media: 'Photos et fichiers',
  deleted: 'Messages supprimés',
  ctaTitle: 'Gardez cette conversation pour toujours',
  ctaText: 'Transformez-la en PDF propre avec les photos à leur place, pour la relire, l’imprimer ou l’offrir.',
  another: 'Analyser une autre conversation',
  whatTitle: 'Ce que montre l’analyse',
  what: [
    'Le nombre de messages et de mots de chaque personne, et sa part dans la conversation.',
    'Qui lance le plus souvent la conversation et combien de temps chacun met à répondre.',
    'Les heures et les jours de la semaine où vous parlez le plus.',
    'Vos emojis préférés, le jour le plus bavard et la plus longue série de jours.',
  ],
  faqs: [
    { q: 'Ma conversation est-elle envoyée quelque part ?', a: 'Non. L’analyse se fait entièrement dans votre navigateur : vos messages ne quittent pas votre appareil et rien n’est enregistré.' },
    { q: 'Ça marche avec les groupes ?', a: 'Oui. Chaque participant a ses propres stats : messages, mots par message, conversations lancées et temps de réponse.' },
    { q: 'Comment est calculé le temps de réponse ?', a: 'Pour chaque personne, on mesure le temps entre le message de quelqu’un d’autre et sa réponse, sans compter les pauses de plus de 12 heures, et on affiche la médiane pour qu’une réponse lente ne fausse pas tout.' },
  ],
};

const de: AnalyzerStrings = {
  slug: 'whatsapp-chat-analysieren',
  label: 'WhatsApp-Chat analysieren (kostenlos)',
  metaTitle: 'WhatsApp-Chat kostenlos analysieren | ConversaPDF',
  metaDescription: 'Wer schreibt am meisten, Lieblings-Emojis, aktivste Uhrzeiten, Antwortzeit: die Statistik deines WhatsApp-Chats. Kostenlos und privat.',
  h1: 'Analysiere deinen WhatsApp-Chat',
  intro: 'Lade den Export deines Chats hoch und finde heraus, wer am meisten schreibt, welche Emojis ihr am liebsten nutzt, wann ihr schreibt und wie schnell ihr antwortet. Kostenlos, und der Chat verlässt nicht dein Gerät.',
  messages: 'Nachrichten',
  words: 'Wörter',
  days: 'Tage Chat',
  since: (d) => `seit dem ${d}`,
  perPerson: 'Wer schreibt am meisten',
  wordsPerMessage: 'Wörter pro Nachricht',
  starts: 'begonnene Gespräche',
  reply: 'antwortet in',
  noReply: 'keine Antwortzeit gemessen',
  hours: 'Um wie viel Uhr ihr schreibt',
  weekdays: 'Die aktivsten Wochentage',
  emojis: 'Lieblings-Emojis',
  noEmojis: 'Keine Emojis in diesem Chat.',
  busiestDay: 'Der gesprächigste Tag',
  messagesOn: (n) => `${n} Nachrichten`,
  streak: 'Die längste Serie',
  inARow: (n) => `${n} Tage am Stück`,
  activeDays: (a, s) => `${a} Tage mit Nachrichten von ${s}`,
  media: 'Fotos und Dateien',
  deleted: 'Gelöschte Nachrichten',
  ctaTitle: 'Bewahre diesen Chat für immer auf',
  ctaText: 'Mach daraus ein sauberes PDF mit den Fotos an ihrer Stelle, zum Wiederlesen, Ausdrucken oder Verschenken.',
  another: 'Einen weiteren Chat analysieren',
  whatTitle: 'Was die Analyse zeigt',
  what: [
    'Die Anzahl der Nachrichten und Wörter jeder Person und ihren Anteil am Chat.',
    'Wer das Gespräch am häufigsten beginnt und wie lange jeder zum Antworten braucht.',
    'Die Uhrzeiten und Wochentage, an denen ihr am meisten schreibt.',
    'Eure Lieblings-Emojis, den gesprächigsten Tag und die längste Serie an Tagen.',
  ],
  faqs: [
    { q: 'Wird mein Chat irgendwohin geschickt?', a: 'Nein. Die Analyse läuft komplett in deinem Browser: Deine Nachrichten verlassen nicht dein Gerät und nichts wird gespeichert.' },
    { q: 'Funktioniert es mit Gruppen?', a: 'Ja. Jeder Teilnehmer bekommt seine eigene Statistik: Nachrichten, Wörter pro Nachricht, begonnene Gespräche und Antwortzeit.' },
    { q: 'Wie wird die Antwortzeit berechnet?', a: 'Für jede Person messen wir die Zeit zwischen der Nachricht eines anderen und ihrer Antwort, ohne Pausen von mehr als 12 Stunden, und zeigen den Median, damit eine einzelne langsame Antwort nicht alles verfälscht.' },
  ],
};

const en: AnalyzerStrings = {
  slug: 'whatsapp-chat-analyzer',
  label: 'WhatsApp chat analyzer (free)',
  metaTitle: 'WhatsApp Chat Analyzer: Free Stats | ConversaPDF',
  metaDescription: 'See who texts most, favourite emojis, busiest hours and reply times in your WhatsApp chat. Free and private: everything runs in your browser.',
  h1: 'WhatsApp chat analyzer',
  intro: 'Drop your exported chat and see who writes the most, your favourite emojis, when you talk and how fast you reply. Free, and your chat never leaves your device.',
  messages: 'Messages',
  words: 'Words',
  days: 'Days of conversation',
  since: (d) => `since ${d}`,
  perPerson: 'Who writes the most',
  wordsPerMessage: 'words per message',
  starts: 'conversations started',
  reply: 'replies in',
  noReply: 'no replies measured',
  hours: 'When you talk',
  weekdays: 'Busiest days of the week',
  emojis: 'Favourite emojis',
  noEmojis: 'No emojis in this chat.',
  busiestDay: 'Busiest day',
  messagesOn: (n) => `${n} messages`,
  streak: 'Longest streak',
  inARow: (n) => `${n} days in a row`,
  activeDays: (a, s) => `${a} days with messages out of ${s}`,
  media: 'Photos and files',
  deleted: 'Deleted messages',
  ctaTitle: 'Keep this conversation for good',
  ctaText: 'Turn it into a clean PDF with the photos in place, to read again, print or give as a gift.',
  another: 'Analyze another chat',
  whatTitle: 'What the analysis shows',
  what: [
    'How many messages and words each person sent, and their share of the conversation.',
    'Who usually starts the conversation and how long each person takes to reply.',
    'The hours and days of the week when you talk the most.',
    'Your favourite emojis, the busiest day and the longest streak of days.',
  ],
  faqs: [
    { q: 'Is my chat uploaded anywhere?', a: 'No. The analysis runs entirely in your browser: your messages never leave your device and nothing is stored.' },
    { q: 'Does it work with group chats?', a: 'Yes. Every participant gets their own stats: messages, words per message, conversations started and reply time.' },
    { q: 'How is the reply time calculated?', a: 'For each person, we measure the time between someone else’s message and their answer, ignoring gaps longer than 12 hours, and show the median so one slow reply doesn’t skew it.' },
  ],
};

const all: Record<Locale, AnalyzerStrings> = { es, pt, it, fr, de, en };
export const analyzer = (l: Locale) => all[l];
