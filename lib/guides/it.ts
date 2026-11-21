import type { Guide, GuideChrome } from './types';

export const chromeIt: GuideChrome = {
  guidesTitle: 'Guide',
  guidesIntro: 'Passo dopo passo per esportare, stampare e salvare le tue chat di WhatsApp.',
  related: 'Altre guide',
  toolTitle: 'Converti la tua chat adesso',
  breadcrumbHome: 'Home',
};

export const guidesIt: Guide[] = [
  {
    key: 'iphone',
    slug: 'esportare-chat-whatsapp-iphone',
    label: 'Esportare una chat WhatsApp su iPhone',
    metaTitle: 'Come esportare una chat WhatsApp in PDF su iPhone (2026) | ConversaPDF',
    metaDescription:
      'Esporta una chat WhatsApp dal tuo iPhone e trasformala in un PDF ordinato, con date, orari e foto. Guida passo passo, senza installare nulla.',
    h1: 'Come esportare una chat WhatsApp in PDF su iPhone',
    intro:
      'WhatsApp non ha un pulsante «Salva come PDF», ma l’iPhone permette di esportare qualsiasi chat in un file .zip. Con quel file, ConversaPDF crea un PDF ordinato in pochi secondi, direttamente nel browser.',
    sections: [
      {
        h: 'Esportare la chat dall’iPhone',
        steps: [
          'Apri WhatsApp ed entra nella chat che vuoi conservare.',
          'Tocca il nome del contatto o del gruppo in alto.',
          'Scorri fino in fondo e tocca «Esporta chat».',
          'Scegli se allegare i media (per avere le foto nel PDF) o senza media (solo testo, più veloce).',
          'Nel menu di condivisione tocca «Salva su File» e scegli una cartella.',
        ],
      },
      {
        h: 'Trasformare il file in PDF',
        steps: [
          'Apri conversapdf.com in Safari, sullo stesso iPhone.',
          'Tocca «Scegli file» e seleziona il .zip appena salvato in File.',
          'Indica chi sei, così i tuoi messaggi appaiono a destra, e scegli le date se ti serve solo una parte.',
          'Guarda l’anteprima gratuita e scarica il PDF completo.',
        ],
      },
      {
        h: 'Consigli',
        bullets: [
          'Il file si chiama «WhatsApp Chat - Nome.zip» e contiene un _chat.txt con i messaggi, più le foto.',
          'Non rinominare né modificare lo .zip: la versione «Prova» calcola l’impronta del file originale.',
          'Per chat molto lunghe WhatsApp può limitare l’esportazione ai messaggi più recenti (si parla di circa 10.000 messaggi con media e 40.000 senza).',
          'Puoi anche inviarti lo .zip via email e aprirlo dal computer.',
        ],
      },
    ],
    faqs: [
      { q: 'Dov’è l’opzione «Esporta chat» su iPhone?', a: 'Nelle info della chat: tocca il nome del contatto o del gruppo in alto e scorri fino in fondo.' },
      { q: 'Devo installare un’app?', a: 'No. Basta WhatsApp e Safari. ConversaPDF funziona nel browser e non carica la tua chat su nessun server.' },
      { q: 'L’altra persona riceve una notifica?', a: 'No. Esportare una chat non invia nessuna notifica agli altri partecipanti.' },
    ],
  },
  {
    key: 'android',
    slug: 'esportare-chat-whatsapp-android',
    label: 'Esportare una chat WhatsApp su Android',
    metaTitle: 'Come esportare una chat WhatsApp in PDF su Android (2026) | ConversaPDF',
    metaDescription:
      'Esporta una chat WhatsApp dal tuo telefono Android e trasformala in PDF con nomi, date, orari e foto. Passo passo, senza installare nulla.',
    h1: 'Come esportare una chat WhatsApp in PDF su Android',
    intro:
      'Su Android, WhatsApp esporta la chat come file di testo (.txt), a volte insieme alle foto. ConversaPDF trasforma questi file in un PDF chiaro e impaginato, senza che la chat lasci il tuo dispositivo.',
    sections: [
      {
        h: 'Esportare la chat da Android',
        steps: [
          'Apri WhatsApp ed entra nella chat.',
          'Tocca i tre puntini ⋮ in alto a destra.',
          'Tocca «Altro» e poi «Esporta chat».',
          'Scegli «Includi file multimediali» se vuoi le foto nel PDF, oppure «Senza file multimediali» per il solo testo.',
          'Salva il risultato su Google Drive, in «File» o invialo alla tua email.',
        ],
      },
      {
        h: 'Trasformare i file in PDF',
        steps: [
          'Apri conversapdf.com in Chrome.',
          'Tocca «Scegli file» e seleziona lo .zip. Se WhatsApp ti ha dato il .txt e le foto separati, selezionali tutti insieme.',
          'Indica chi sei e, se vuoi, il periodo che ti interessa.',
          'Controlla l’anteprima gratuita e scarica il PDF completo.',
        ],
      },
      {
        h: 'Consigli',
        bullets: [
          'Il file di testo di solito si chiama «Chat WhatsApp con Nome.txt».',
          'A seconda della versione di Android, le foto arrivano dentro uno .zip o come file separati: ConversaPDF accetta entrambi.',
          'Alcuni servizi email rifiutano gli allegati pesanti: Google Drive di solito è più affidabile.',
        ],
      },
    ],
    faqs: [
      { q: 'Non trovo «Esporta chat», cosa faccio?', a: 'Aggiorna WhatsApp e cerca in ⋮ > Altro. In alcuni paesi l’esportazione non è disponibile.' },
      { q: 'Posso fare tutto dal telefono?', a: 'Sì. ConversaPDF funziona in Chrome per Android. Per chat molto lunghe con tante foto, il computer è più veloce.' },
      { q: 'I miei messaggi vengono caricati online?', a: 'No. I file vengono letti e il PDF viene creato nel tuo browser.' },
    ],
  },
  {
    key: 'photos',
    slug: 'esportare-whatsapp-con-foto',
    label: 'Esportare una chat WhatsApp con le foto',
    metaTitle: 'Esportare una chat WhatsApp in PDF con le foto | ConversaPDF',
    metaDescription:
      'Come ottenere un PDF di una chat WhatsApp con le foto al loro posto, accanto ai messaggi. Esportazione con media su iPhone e Android.',
    h1: 'Esportare una chat WhatsApp in PDF con le foto',
    intro:
      'Una chat senza foto perde il contesto: l’appartamento in affitto, il danno all’auto, la ricevuta… ConversaPDF mette ogni foto esattamente dove è stata inviata.',
    sections: [
      {
        h: 'La cosa importante: esportare «con i media»',
        p: [
          'Le foto arrivano nel PDF solo se WhatsApp le include nell’esportazione. Quando tocchi «Esporta chat», scegli l’opzione con i media («Allega media» su iPhone, «Includi file multimediali» su Android).',
          'Se scegli «Senza media», il PDF indica comunque dove c’era una foto, ma senza l’immagine.',
        ],
      },
      {
        h: 'Passo dopo passo',
        steps: [
          'Esporta la chat con i media e salva lo .zip (o il .txt e le foto).',
          'Apri conversapdf.com e seleziona lo .zip, oppure tutti i file insieme.',
          'Controlla nel riepilogo quante foto sono state trovate.',
          'Apri l’anteprima gratuita per vedere le foto al loro posto.',
          'Scarica la versione «Con foto» o «Prova».',
        ],
      },
      {
        h: 'Buono a sapersi',
        bullets: [
          'Le foto vengono ridimensionate perché il PDF non sia troppo pesante, mantenendo una buona qualità per leggere e stampare.',
          'Audio e video non si possono riprodurre in un PDF: appaiono indicati con il nome del file.',
          'Con i media, WhatsApp può limitare l’esportazione ai messaggi più recenti (si parla di circa 10.000).',
        ],
      },
    ],
    faqs: [
      { q: 'Perché le mie foto non appaiono nel PDF?', a: 'Probabilmente hai esportato la chat «senza media», o hai selezionato solo il .txt. Esporta di nuovo con i media e seleziona lo .zip completo.' },
      { q: 'Le foto sono di buona qualità?', a: 'Sì, abbastanza per leggere, stampare o presentare il documento. Vengono ridotte solo per mantenere il PDF leggero.' },
      { q: 'Gli sticker sono inclusi?', a: 'Gli sticker appaiono come allegato con il nome del file; le foto normali appaiono come immagini.' },
    ],
  },
  {
    key: 'evidence',
    slug: 'chat-whatsapp-come-prova',
    label: 'Usare una chat WhatsApp come prova',
    metaTitle: 'Chat WhatsApp come prova: come presentarla | ConversaPDF',
    metaDescription:
      'Come preparare un PDF chiaro di una chat WhatsApp per un avvocato, una causa o un reclamo: esportazione completa, date, orari e impronta del file.',
    h1: 'Chat WhatsApp come prova: come prepararla',
    intro:
      'Padroni di casa, aziende, ex partner, assicurazioni: molti conflitti si decidono su ciò che è stato scritto su WhatsApp. Una pila di screenshot è difficile da leggere e facile da contestare. Un documento completo e ordinato aiuta molto di più il tuo avvocato.',
    sections: [
      {
        h: 'Perché gli screenshot non bastano',
        bullets: [
          'Non mostrano tutto il contesto e possono sembrare scelti ad arte.',
          'Le date non sempre si vedono e l’ordine si perde facilmente.',
          'Sono scomodi da stampare e da citare («vedi pagina 4, messaggio delle 19:20»).',
        ],
      },
      {
        h: 'Come preparare un documento solido',
        steps: [
          'Esporta la chat completa da WhatsApp, con i media se le foto contano.',
          'Conserva il file esportato così com’è, senza aprirlo né modificarlo, e conserva anche il telefono.',
          'Su ConversaPDF scegli la versione «Prova»: copertina con partecipanti e periodo, orari con i secondi e impronta SHA-256 del file originale.',
          'Consegna al tuo avvocato il PDF e il file originale: con l’impronta si può verificare che il file non è cambiato.',
        ],
      },
      {
        h: 'Cosa un PDF non sostituisce',
        p: [
          'L’ammissione e il valore di una prova li decide il giudice. Se l’altra parte contesta la chat, in Italia si ricorre di solito a una copia forense o a una perizia informatica sul telefono. ConversaPDF ti dà un documento chiaro e verificabile, ma non è una certificazione né una consulenza legale: rivolgiti sempre al tuo avvocato.',
        ],
      },
    ],
    faqs: [
      { q: 'Cos’è l’impronta SHA-256?', a: 'È un codice calcolato a partire dal file esportato. Se qualcuno cambia anche una sola lettera del file, il codice cambia. Serve a dimostrare che l’originale non è stato modificato.' },
      { q: 'Posso scegliere solo un periodo?', a: 'Sì, puoi scegliere la data di inizio e di fine. Per una causa, di solito è meglio esportare tutto e segnalare le parti importanti.' },
      { q: 'L’altra persona saprà che ho esportato la chat?', a: 'No, WhatsApp non avvisa i partecipanti.' },
    ],
  },
  {
    key: 'group',
    slug: 'esportare-gruppo-whatsapp',
    label: 'Esportare un gruppo WhatsApp',
    metaTitle: 'Esportare un gruppo WhatsApp in PDF (con nomi e colori) | ConversaPDF',
    metaDescription:
      'Trasforma la chat di un gruppo WhatsApp in un PDF leggibile: ogni partecipante con nome e colore, avvisi del gruppo, date e foto.',
    h1: 'Esportare un gruppo WhatsApp in PDF',
    intro:
      'Gruppo del condominio, della classe, del lavoro o della famiglia: un gruppo accumula migliaia di messaggi. ConversaPDF li trasforma in un documento chiaro, dove si vede chi ha detto cosa e quando.',
    sections: [
      {
        h: 'Esportare il gruppo',
        steps: [
          'Apri il gruppo su WhatsApp.',
          'Su iPhone tocca il nome del gruppo in alto; su Android tocca ⋮ e poi «Altro».',
          'Tocca «Esporta chat» e scegli con o senza media.',
          'Salva il file e aprilo su conversapdf.com.',
        ],
      },
      {
        h: 'Come appare un gruppo nel PDF',
        bullets: [
          'Ogni partecipante appare con il suo nome e un colore proprio.',
          'Gli avvisi del gruppo («X ha aggiunto Y», cambio di oggetto…) sono centrati in grigio.',
          'Puoi indicare chi sei perché i tuoi messaggi appaiano a destra.',
          'Una separazione per giorno aiuta a trovare una data precisa.',
        ],
      },
      {
        h: 'Consigli per i gruppi grandi',
        bullets: [
          'Usa le date «Dal» e «Al» per tenere solo il periodo che conta.',
          'Nei gruppi con tante foto, il computer è più veloce del telefono.',
        ],
      },
    ],
    faqs: [
      { q: 'Qualsiasi membro può esportare il gruppo?', a: 'Sì, ogni partecipante può esportare la cronologia presente sul proprio telefono.' },
      { q: 'Appaiono i nomi o i numeri?', a: 'Come li vede il tuo telefono: il nome se il contatto è salvato, altrimenti il numero.' },
      { q: 'C’è un limite di partecipanti?', a: 'No. ConversaPDF funziona con gruppi di qualsiasi dimensione.' },
    ],
  },
  {
    key: 'print',
    slug: 'stampare-chat-whatsapp',
    label: 'Stampare una chat WhatsApp',
    metaTitle: 'Come stampare una chat WhatsApp (senza screenshot) | ConversaPDF',
    metaDescription:
      'Il modo più pulito per stampare una chat WhatsApp: un PDF impaginato con nomi, date, orari e foto, pronto da stampare a casa o in copisteria.',
    h1: 'Come stampare una chat WhatsApp',
    intro:
      'WhatsApp non ha un pulsante per stampare. Fare screenshot e incollarli in un documento richiede ore e il risultato è difficile da leggere. La via più rapida è trasformare la chat in un PDF impaginato e poi stamparlo.',
    sections: [
      {
        h: 'Passo dopo passo',
        steps: [
          'Esporta la chat da WhatsApp («Esporta chat»).',
          'Apri il file su conversapdf.com e scegli il periodo da stampare.',
          'Scarica il PDF.',
          'Aprilo sul computer o sul telefono e stampalo, oppure portalo su una chiavetta USB in copisteria.',
        ],
      },
      {
        h: 'Per una stampa pulita',
        bullets: [
          'Il PDF è in formato A4, con margini e numero di pagina su ogni foglio.',
          'Gli sfondi sono chiari per non consumare troppo inchiostro.',
          'Se ti servono solo poche pagine, scegli un periodo più breve prima di scaricare.',
        ],
      },
    ],
    faqs: [
      { q: 'Posso stampare solo una parte della chat?', a: 'Sì. Scegli le date «Dal» e «Al» prima di generare il PDF.' },
      { q: 'Si stampano anche le foto?', a: 'Sì, se hai esportato con i media e scegli la versione «Con foto» o «Prova».' },
      { q: 'E se non ho una stampante?', a: 'Puoi inviare il PDF via email o portarlo su una chiavetta in copisteria o in cartoleria.' },
    ],
  },
  {
    key: 'txt',
    slug: 'aprire-file-chat-txt-whatsapp',
    label: 'Aprire il file _chat.txt di WhatsApp',
    metaTitle: 'Come aprire il file _chat.txt di WhatsApp e trasformarlo in PDF | ConversaPDF',
    metaDescription:
      'Hai esportato una chat WhatsApp e hai un file _chat.txt illeggibile? Ecco come aprirlo e trasformarlo in un PDF chiaro con date, nomi e foto.',
    h1: 'Come aprire il file _chat.txt di WhatsApp',
    intro:
      'Quando esporti una chat, WhatsApp crea un file di testo: _chat.txt su iPhone o «Chat WhatsApp con Nome.txt» su Android. Si apre con qualsiasi editor di testo, ma è un elenco infinito di righe difficile da leggere.',
    sections: [
      {
        h: 'Cosa contiene il file',
        bullets: [
          'Una riga per messaggio: data, ora, nome di chi scrive e testo.',
          'Riferimenti a foto e audio («<allegato: …jpg>» o «IMG-…jpg (file allegato)»).',
          'Gli avvisi di sistema: crittografia, modifiche al gruppo, messaggi eliminati.',
        ],
      },
      {
        h: 'Aprirlo in modo leggibile',
        steps: [
          'Se hai uno .zip, non serve decomprimerlo: selezionalo direttamente su conversapdf.com.',
          'Se hai solo il .txt, selezionalo così com’è (e le foto insieme, se le hai separate).',
          'ConversaPDF riconosce il formato iPhone e Android in qualsiasi lingua e lo mostra come una chat.',
          'Scarica il risultato in PDF.',
        ],
      },
      {
        h: 'E con un editor di testo?',
        p: [
          'Su Windows puoi aprirlo con Blocco note e su Mac con TextEdit. Va bene per cercare una frase, ma per leggere, stampare o inviare a qualcuno, un PDF ordinato è molto più comodo.',
        ],
      },
    ],
    faqs: [
      { q: 'Il file mostra caratteri strani, è normale?', a: 'Gli editor più vecchi a volte leggono male accenti ed emoji. ConversaPDF legge correttamente il file in UTF-8.' },
      { q: 'Posso convertire un .txt senza le foto?', a: 'Sì. Il PDF indica dove c’era una foto, con il nome del file.' },
      { q: 'Funziona con esportazioni vecchie?', a: 'Sì, purché sia il file originale esportato da WhatsApp.' },
    ],
  },
  {
    key: 'save',
    slug: 'salvare-chat-whatsapp',
    label: 'Salvare una chat WhatsApp per sempre',
    metaTitle: 'Come salvare una chat WhatsApp per sempre | ConversaPDF',
    metaDescription:
      'Conserva le tue chat WhatsApp importanti in un PDF leggibile su qualsiasi dispositivo, con le foto, anche se cambi telefono o elimini l’app.',
    h1: 'Come salvare una chat WhatsApp per sempre',
    intro:
      'Il backup di WhatsApp (iCloud o Google Drive) serve solo a ripristinare l’app: non si può leggere come un documento. Per conservare davvero una chat con una persona importante, la soluzione migliore è trasformarla in PDF.',
    sections: [
      {
        h: 'Perché un PDF',
        bullets: [
          'Si apre su qualsiasi computer, telefono o tablet, oggi e tra molti anni.',
          'Non dipende da WhatsApp né dal tuo telefono.',
          'Si può stampare, rilegare o inviare alla famiglia.',
        ],
      },
      {
        h: 'Come fare',
        steps: [
          'Esporta la chat con i media per conservare le foto.',
          'Trasformala in PDF su conversapdf.com con la versione «Con foto».',
          'Salva il PDF e lo .zip originale in due posti diversi (per esempio il computer e un cloud).',
          'Ripeti l’esportazione ogni tanto se la chat continua.',
        ],
      },
    ],
    faqs: [
      { q: 'Il backup di WhatsApp non basta?', a: 'Serve a ripristinare le chat su un telefono, ma non è un file leggibile. Se un giorno smetti di usare WhatsApp, non potrai leggerlo.' },
      { q: 'Si può stampare come un libro?', a: 'Sì. Il PDF è in A4 e impaginato: puoi stamparlo e rilegarlo in copisteria.' },
      { q: 'Funziona con chat di anni fa?', a: 'Sì, purché siano ancora nel tuo WhatsApp per poterle esportare.' },
    ],
  },
];
