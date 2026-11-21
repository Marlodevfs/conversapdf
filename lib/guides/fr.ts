import type { Guide, GuideChrome } from './types';

export const chromeFr: GuideChrome = {
  guidesTitle: 'Guides',
  guidesIntro: 'Pas à pas pour exporter, imprimer et sauvegarder vos conversations WhatsApp.',
  related: 'Autres guides',
  toolTitle: 'Convertissez votre conversation maintenant',
  breadcrumbHome: 'Accueil',
};

export const guidesFr: Guide[] = [
  {
    key: 'iphone',
    slug: 'exporter-conversation-whatsapp-iphone',
    label: 'Exporter une conversation WhatsApp sur iPhone',
    metaTitle: 'Exporter une conversation WhatsApp en PDF sur iPhone',
    metaDescription:
      'Exportez une conversation WhatsApp depuis votre iPhone et transformez-la en PDF clair, avec dates, heures et photos. Guide pas à pas, sans rien installer.',
    h1: 'Exporter une conversation WhatsApp en PDF sur iPhone',
    intro:
      'WhatsApp n’a pas de bouton « Enregistrer en PDF », mais l’iPhone permet d’exporter n’importe quelle conversation dans un fichier .zip. Avec ce fichier, ConversaPDF crée un PDF propre en quelques secondes, directement dans votre navigateur.',
    sections: [
      {
        h: 'Exporter la conversation depuis l’iPhone',
        steps: [
          'Ouvrez WhatsApp et entrez dans la conversation à garder.',
          'Touchez le nom du contact ou du groupe en haut de l’écran.',
          'Descendez tout en bas et touchez « Exporter la discussion ».',
          'Choisissez « Joindre les médias » (pour avoir les photos dans le PDF) ou « Sans médias » (texte seul, plus rapide).',
          'Dans le menu de partage, touchez « Enregistrer dans Fichiers » et choisissez un dossier.',
        ],
      },
      {
        h: 'Transformer le fichier en PDF',
        steps: [
          'Ouvrez conversapdf.com dans Safari, sur le même iPhone.',
          'Touchez « Choisir un fichier » et sélectionnez le .zip enregistré dans Fichiers.',
          'Indiquez qui vous êtes pour que vos messages s’affichent à droite, et choisissez des dates si vous ne voulez qu’une partie.',
          'Regardez l’aperçu gratuit puis téléchargez le PDF complet.',
        ],
      },
      {
        h: 'Conseils',
        bullets: [
          'Le fichier s’appelle « WhatsApp Chat - Nom.zip » et contient un _chat.txt avec les messages, plus les photos.',
          'Ne renommez pas et ne modifiez pas le .zip : la version « Preuve » calcule l’empreinte du fichier d’origine.',
          'Pour les très longues conversations, WhatsApp peut limiter l’export aux messages les plus récents (on parle souvent d’environ 10 000 messages avec médias et 40 000 sans).',
          'Vous pouvez aussi vous envoyer le .zip par e-mail et l’ouvrir sur ordinateur.',
        ],
      },
    ],
    faqs: [
      { q: 'Où se trouve « Exporter la discussion » sur iPhone ?', a: 'Dans les infos de la conversation : touchez le nom du contact ou du groupe en haut, puis descendez tout en bas.' },
      { q: 'Faut-il installer une application ?', a: 'Non. WhatsApp et Safari suffisent. ConversaPDF fonctionne dans le navigateur et n’envoie votre conversation sur aucun serveur.' },
      { q: 'L’autre personne est-elle prévenue ?', a: 'Non. Exporter une conversation n’envoie aucune notification aux autres participants.' },
    ],
  },
  {
    key: 'android',
    slug: 'exporter-conversation-whatsapp-android',
    label: 'Exporter une conversation WhatsApp sur Android',
    metaTitle: 'Exporter une conversation WhatsApp en PDF sur Android',
    metaDescription:
      'Exportez une conversation WhatsApp depuis Android et transformez-la en PDF avec noms, dates, heures et photos. Pas à pas, sans rien installer.',
    h1: 'Exporter une conversation WhatsApp en PDF sur Android',
    intro:
      'Sur Android, WhatsApp exporte la conversation sous forme de fichier texte (.txt), parfois accompagné des photos. ConversaPDF transforme ces fichiers en un PDF clair et paginé, sans que la conversation quitte votre appareil.',
    sections: [
      {
        h: 'Exporter la conversation depuis Android',
        steps: [
          'Ouvrez WhatsApp et entrez dans la conversation.',
          'Touchez les trois points ⋮ en haut à droite.',
          'Touchez « Plus » puis « Exporter la discussion ».',
          'Choisissez « Inclure les médias » pour avoir les photos dans le PDF, ou « Sans médias » pour le texte seul.',
          'Enregistrez le résultat dans Google Drive, dans « Fichiers » ou envoyez-le vous par e-mail.',
        ],
      },
      {
        h: 'Transformer les fichiers en PDF',
        steps: [
          'Ouvrez conversapdf.com dans Chrome.',
          'Touchez « Choisir un fichier » et sélectionnez le .zip. Si WhatsApp vous a donné le .txt et les photos séparément, sélectionnez-les tous en même temps.',
          'Indiquez qui vous êtes et, si besoin, la période qui vous intéresse.',
          'Vérifiez l’aperçu gratuit puis téléchargez le PDF complet.',
        ],
      },
      {
        h: 'Conseils',
        bullets: [
          'Le fichier texte s’appelle généralement « Discussion WhatsApp avec Nom.txt ».',
          'Selon la version d’Android, les photos arrivent dans un .zip ou en fichiers séparés : ConversaPDF accepte les deux.',
          'Certaines messageries refusent les pièces jointes lourdes : Google Drive est souvent plus fiable.',
        ],
      },
    ],
    faqs: [
      { q: 'Je ne trouve pas « Exporter la discussion », que faire ?', a: 'Mettez WhatsApp à jour et cherchez dans ⋮ > Plus. Dans certains pays, l’export n’est pas disponible.' },
      { q: 'Peut-on tout faire depuis le téléphone ?', a: 'Oui. ConversaPDF fonctionne dans Chrome sur Android. Pour les très longues conversations avec beaucoup de photos, un ordinateur ira plus vite.' },
      { q: 'Mes messages sont-ils envoyés sur internet ?', a: 'Non. Les fichiers sont lus et le PDF est créé dans votre navigateur.' },
    ],
  },
  {
    key: 'photos',
    slug: 'exporter-whatsapp-avec-photos',
    label: 'Exporter une conversation WhatsApp avec les photos',
    metaTitle: 'Exporter WhatsApp en PDF avec photos | ConversaPDF',
    metaDescription:
      'Comment obtenir un PDF d’une conversation WhatsApp avec les photos à leur place, à côté des messages. Export avec médias sur iPhone et Android.',
    h1: 'Exporter une conversation WhatsApp en PDF avec les photos',
    intro:
      'Une conversation sans ses photos perd son contexte : l’appartement à louer, les dégâts sur la voiture, le reçu… ConversaPDF place chaque photo exactement là où elle a été envoyée.',
    sections: [
      {
        h: 'L’essentiel : exporter « avec médias »',
        p: [
          'Les photos n’arrivent dans le PDF que si WhatsApp les inclut dans l’export. Quand vous touchez « Exporter la discussion », choisissez l’option avec médias (« Joindre les médias » sur iPhone, « Inclure les médias » sur Android).',
          'Si vous choisissez « Sans médias », le PDF indique quand même où se trouvait une photo, mais sans l’image.',
        ],
      },
      {
        h: 'Pas à pas',
        steps: [
          'Exportez la conversation avec médias et gardez le .zip (ou le .txt et les photos).',
          'Ouvrez conversapdf.com et sélectionnez le .zip, ou tous les fichiers en même temps.',
          'Vérifiez dans le résumé le nombre de photos trouvées.',
          'Ouvrez l’aperçu gratuit pour voir les photos à leur place.',
          'Téléchargez la version « Avec photos » ou « Preuve ».',
        ],
      },
      {
        h: 'Bon à savoir',
        bullets: [
          'Les photos sont réduites pour que le PDF reste léger, tout en gardant une bonne qualité pour la lecture et l’impression.',
          'Les audios et vidéos ne peuvent pas être lus dans un PDF : ils sont indiqués avec leur nom de fichier.',
          'Avec médias, WhatsApp peut limiter l’export aux messages les plus récents (on parle souvent d’environ 10 000).',
        ],
      },
    ],
    faqs: [
      { q: 'Pourquoi mes photos n’apparaissent pas dans le PDF ?', a: 'Vous avez sans doute exporté « sans médias », ou sélectionné uniquement le .txt. Exportez à nouveau avec médias et sélectionnez le .zip complet.' },
      { q: 'Les photos sont-elles de bonne qualité ?', a: 'Oui, suffisante pour lire, imprimer ou présenter le document. Elles sont réduites uniquement pour garder un PDF léger.' },
      { q: 'Les stickers sont-ils inclus ?', a: 'Les stickers apparaissent comme pièce jointe avec leur nom de fichier ; les photos normales s’affichent en image.' },
    ],
  },
  {
    key: 'evidence',
    slug: 'conversation-whatsapp-preuve-justice',
    label: 'Utiliser une conversation WhatsApp comme preuve',
    metaTitle: 'Conversation WhatsApp comme preuve en justice : le guide',
    metaDescription:
      'Préparer un PDF clair d’une conversation WhatsApp pour un avocat, une procédure ou une réclamation : export complet, dates, heures et empreinte du fichier.',
    h1: 'Conversation WhatsApp comme preuve : comment la préparer',
    intro:
      'Propriétaire, entreprise, ex-conjoint, assurance : beaucoup de litiges se jouent sur ce qui s’est dit sur WhatsApp. Une pile de captures d’écran est difficile à lire et facile à contester. Un document complet et ordonné aide bien plus votre avocat.',
    sections: [
      {
        h: 'Pourquoi les captures d’écran ne suffisent pas',
        bullets: [
          'Elles ne montrent pas tout le contexte et peuvent sembler choisies.',
          'Les dates ne sont pas toujours visibles et l’ordre se perd facilement.',
          'Elles sont pénibles à imprimer et à citer (« voir page 4, message de 19 h 20 »).',
        ],
      },
      {
        h: 'Préparer un document solide',
        steps: [
          'Exportez toute la conversation depuis WhatsApp, avec médias si les photos comptent.',
          'Gardez le fichier exporté tel quel, sans l’ouvrir ni le modifier, et conservez aussi le téléphone.',
          'Sur ConversaPDF, choisissez la version « Preuve » : page de garde avec participants et période, heures à la seconde et empreinte SHA-256 du fichier d’origine.',
          'Remettez à votre avocat le PDF et le fichier d’origine : grâce à l’empreinte, on peut vérifier que le fichier n’a pas changé.',
        ],
      },
      {
        h: 'Ce qu’un PDF ne remplace pas',
        p: [
          'C’est le juge qui apprécie la recevabilité et la valeur d’une preuve. Si l’autre partie conteste la conversation, on fait souvent appel en France à un constat de commissaire de justice (ex-huissier) sur le téléphone. ConversaPDF vous donne un document clair et vérifiable, mais ce n’est ni une certification ni un conseil juridique : parlez-en toujours à votre avocat.',
        ],
      },
    ],
    faqs: [
      { q: 'C’est quoi l’empreinte SHA-256 ?', a: 'Un code calculé à partir du fichier exporté. Si quelqu’un change une seule lettre du fichier, le code change. Ça permet de montrer que l’original n’a pas été modifié.' },
      { q: 'Puis-je ne garder qu’une période ?', a: 'Oui, vous pouvez choisir une date de début et de fin. Pour une procédure, il vaut souvent mieux tout exporter et signaler les passages importants.' },
      { q: 'L’autre personne saura-t-elle que j’ai exporté la conversation ?', a: 'Non, WhatsApp ne prévient pas les participants.' },
    ],
  },
  {
    key: 'group',
    slug: 'exporter-groupe-whatsapp',
    label: 'Exporter un groupe WhatsApp',
    metaTitle: 'Exporter un groupe WhatsApp en PDF | ConversaPDF',
    metaDescription:
      'Transformez la conversation d’un groupe WhatsApp en PDF lisible : chaque participant avec son nom et sa couleur, messages du groupe, dates et photos.',
    h1: 'Exporter un groupe WhatsApp en PDF',
    intro:
      'Groupe de copropriété, de parents d’élèves, de travail ou de famille : un groupe accumule vite des milliers de messages. ConversaPDF les transforme en un document clair où l’on voit qui a dit quoi, et quand.',
    sections: [
      {
        h: 'Exporter le groupe',
        steps: [
          'Ouvrez le groupe dans WhatsApp.',
          'Sur iPhone, touchez le nom du groupe en haut ; sur Android, touchez ⋮ puis « Plus ».',
          'Touchez « Exporter la discussion » et choisissez avec ou sans médias.',
          'Enregistrez le fichier et ouvrez-le sur conversapdf.com.',
        ],
      },
      {
        h: 'À quoi ressemble un groupe dans le PDF',
        bullets: [
          'Chaque participant apparaît avec son nom et sa propre couleur.',
          'Les messages du groupe (« X a ajouté Y », changement de nom…) sont centrés en gris.',
          'Vous pouvez indiquer qui vous êtes pour que vos messages soient à droite.',
          'Un séparateur par jour aide à retrouver une date précise.',
        ],
      },
      {
        h: 'Conseils pour les gros groupes',
        bullets: [
          'Utilisez les dates « Du » et « Au » pour ne garder que la période utile.',
          'Pour les groupes avec beaucoup de photos, l’ordinateur ira plus vite que le téléphone.',
        ],
      },
    ],
    faqs: [
      { q: 'N’importe quel membre peut-il exporter le groupe ?', a: 'Oui, chaque participant peut exporter l’historique présent sur son propre téléphone.' },
      { q: 'Ce sont les noms ou les numéros qui apparaissent ?', a: 'Comme sur votre téléphone : le nom si le contact est enregistré, sinon le numéro.' },
      { q: 'Y a-t-il une limite de participants ?', a: 'Non. ConversaPDF fonctionne avec des groupes de toute taille.' },
    ],
  },
  {
    key: 'print',
    slug: 'imprimer-conversation-whatsapp',
    label: 'Imprimer une conversation WhatsApp',
    metaTitle: 'Imprimer une conversation WhatsApp | ConversaPDF',
    metaDescription:
      'La façon la plus propre d’imprimer une conversation WhatsApp : un PDF paginé avec noms, dates, heures et photos, prêt à imprimer.',
    h1: 'Comment imprimer une conversation WhatsApp',
    intro:
      'WhatsApp n’a pas de bouton imprimer. Faire des captures et les coller dans un document prend des heures, et le résultat est difficile à lire. Le plus rapide : transformer la conversation en PDF paginé, puis l’imprimer.',
    sections: [
      {
        h: 'Pas à pas',
        steps: [
          'Exportez la conversation depuis WhatsApp (« Exporter la discussion »).',
          'Ouvrez le fichier sur conversapdf.com et choisissez la période à imprimer.',
          'Téléchargez le PDF.',
          'Ouvrez-le sur votre ordinateur ou téléphone et imprimez-le, ou apportez-le sur une clé USB dans un point d’impression.',
        ],
      },
      {
        h: 'Pour une impression propre',
        bullets: [
          'Le PDF est au format A4, avec marges et numéro de page sur chaque feuille.',
          'Les fonds sont clairs pour ne pas gaspiller d’encre.',
          'Si vous n’avez besoin que de quelques pages, choisissez une période plus courte avant de télécharger.',
        ],
      },
    ],
    faqs: [
      { q: 'Puis-je imprimer une partie seulement ?', a: 'Oui. Choisissez les dates « Du » et « Au » avant de générer le PDF.' },
      { q: 'Les photos s’impriment-elles aussi ?', a: 'Oui, si vous avez exporté avec médias et choisi la version « Avec photos » ou « Preuve ».' },
      { q: 'Et si je n’ai pas d’imprimante ?', a: 'Envoyez le PDF par e-mail ou apportez-le sur une clé USB dans une papeterie ou un point d’impression.' },
    ],
  },
  {
    key: 'txt',
    slug: 'ouvrir-fichier-chat-txt-whatsapp',
    label: 'Ouvrir le fichier _chat.txt de WhatsApp',
    metaTitle: 'Ouvrir le fichier _chat.txt de WhatsApp | ConversaPDF',
    metaDescription:
      'Un fichier _chat.txt illisible après l’export WhatsApp ? Voici comment l’ouvrir et le transformer en PDF clair, avec dates, noms et photos.',
    h1: 'Ouvrir le fichier _chat.txt de WhatsApp',
    intro:
      'Quand vous exportez une conversation, WhatsApp crée un fichier texte : _chat.txt sur iPhone ou « Discussion WhatsApp avec Nom.txt » sur Android. Il s’ouvre avec n’importe quel éditeur de texte, mais c’est une liste interminable de lignes difficile à lire.',
    sections: [
      {
        h: 'Ce que contient le fichier',
        bullets: [
          'Une ligne par message : date, heure, nom de l’auteur et texte.',
          'Des références aux photos et audios (« <pièce jointe : …jpg> » ou « IMG-…jpg (fichier joint) »).',
          'Les messages système : chiffrement, changements dans le groupe, messages supprimés.',
        ],
      },
      {
        h: 'L’ouvrir de façon lisible',
        steps: [
          'Si vous avez un .zip, inutile de le décompresser : sélectionnez-le directement sur conversapdf.com.',
          'Si vous n’avez que le .txt, sélectionnez-le tel quel (et les photos en même temps si elles sont séparées).',
          'ConversaPDF reconnaît le format iPhone et Android dans toutes les langues et l’affiche comme une conversation.',
          'Téléchargez le résultat en PDF.',
        ],
      },
      {
        h: 'Et avec un éditeur de texte ?',
        p: [
          'Sur Windows, le Bloc-notes l’ouvre, et TextEdit sur Mac. C’est pratique pour chercher une phrase, mais pour lire, imprimer ou envoyer à quelqu’un, un PDF bien présenté est beaucoup plus confortable.',
        ],
      },
    ],
    faqs: [
      { q: 'Le fichier affiche des caractères bizarres, c’est normal ?', a: 'Les anciens éditeurs lisent parfois mal les accents et les emojis. ConversaPDF lit correctement le fichier en UTF-8.' },
      { q: 'Peut-on convertir un .txt sans les photos ?', a: 'Oui. Le PDF indique où se trouvait une photo, avec son nom de fichier.' },
      { q: 'Ça marche avec d’anciens exports ?', a: 'Oui, tant que c’est le fichier d’origine exporté par WhatsApp.' },
    ],
  },
  {
    key: 'save',
    slug: 'sauvegarder-conversation-whatsapp',
    label: 'Sauvegarder une conversation WhatsApp pour toujours',
    metaTitle: 'Sauvegarder une conversation WhatsApp en PDF | ConversaPDF',
    metaDescription:
      'Gardez vos conversations WhatsApp importantes dans un PDF lisible sur n’importe quel appareil, avec les photos, même si vous changez de téléphone.',
    h1: 'Sauvegarder une conversation WhatsApp pour toujours',
    intro:
      'La sauvegarde WhatsApp (iCloud ou Google Drive) sert uniquement à restaurer l’application : on ne peut pas la lire comme un document. Pour vraiment garder une conversation avec quelqu’un qui compte, le mieux est de la transformer en PDF.',
    sections: [
      {
        h: 'Pourquoi un PDF',
        bullets: [
          'Il s’ouvre sur n’importe quel ordinateur, téléphone ou tablette, aujourd’hui comme dans vingt ans.',
          'Il ne dépend ni de WhatsApp ni de votre téléphone.',
          'On peut l’imprimer, le relier ou l’envoyer à la famille.',
        ],
      },
      {
        h: 'Comment faire',
        steps: [
          'Exportez la conversation avec médias pour garder les photos.',
          'Transformez-la en PDF sur conversapdf.com avec la version « Avec photos ».',
          'Gardez le PDF et le .zip d’origine à deux endroits différents (par exemple l’ordinateur et un cloud).',
          'Refaites l’export de temps en temps si la conversation continue.',
        ],
      },
    ],
    faqs: [
      { q: 'La sauvegarde WhatsApp ne suffit pas ?', a: 'Elle sert à restaurer les discussions sur un téléphone, mais ce n’est pas un fichier lisible. Si un jour vous n’utilisez plus WhatsApp, vous ne pourrez pas la lire.' },
      { q: 'Peut-on l’imprimer comme un livre ?', a: 'Oui. Le PDF est en A4 et paginé : vous pouvez l’imprimer et le faire relier.' },
      { q: 'Ça marche avec des conversations vieilles de plusieurs années ?', a: 'Oui, tant qu’elles sont encore dans votre WhatsApp pour pouvoir les exporter.' },
    ],
  },
];
