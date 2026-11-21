import type { Guide, GuideChrome } from './types';

export const chromeEn: GuideChrome = {
  guidesTitle: 'Guides',
  guidesIntro: 'Step-by-step help to export, print and keep your WhatsApp chats.',
  related: 'More guides',
  toolTitle: 'Convert your chat now',
  breadcrumbHome: 'Home',
};

export const guidesEn: Guide[] = [
  {
    key: 'iphone',
    slug: 'export-whatsapp-chat-iphone',
    label: 'Export a WhatsApp chat on iPhone',
    metaTitle: 'Export a WhatsApp Chat to PDF on iPhone | ConversaPDF',
    metaDescription:
      'Export a WhatsApp conversation from your iPhone and turn it into a clean PDF with dates, times and photos. Step-by-step, nothing to install.',
    h1: 'How to export a WhatsApp chat to PDF on iPhone',
    intro:
      'WhatsApp has no “Save as PDF” button, but your iPhone can export any conversation as a .zip file. ConversaPDF turns that file into a tidy PDF in seconds, right in your browser.',
    sections: [
      {
        h: 'Export the chat from your iPhone',
        steps: [
          'Open WhatsApp and go into the chat you want to keep.',
          'Tap the contact or group name at the top.',
          'Scroll to the bottom and tap “Export Chat”.',
          'Choose “Attach Media” (to get photos in the PDF) or “Without Media” (text only, faster).',
          'In the share sheet, tap “Save to Files” and pick a folder.',
        ],
      },
      {
        h: 'Turn the file into a PDF',
        steps: [
          'Open conversapdf.com in Safari on the same iPhone.',
          'Tap “Choose file” and select the .zip you just saved in Files.',
          'Pick which participant is you so your messages appear on the right, and set dates if you only need part of it.',
          'Check the free preview, then download the full PDF.',
        ],
      },
      {
        h: 'Tips',
        bullets: [
          'The file is called “WhatsApp Chat - Name.zip” and holds a _chat.txt with the messages, plus the photos.',
          'Don’t rename or edit the .zip: the Evidence edition fingerprints the original file.',
          'For very long chats WhatsApp may only export the most recent messages (commonly reported as about 10,000 with media and 40,000 without).',
          'You can also email the .zip to yourself and open it on a computer.',
        ],
      },
    ],
    faqs: [
      { q: 'Where is “Export Chat” on iPhone?', a: 'In the chat info screen: tap the contact or group name at the top and scroll all the way down.' },
      { q: 'Do I need to install an app?', a: 'No. WhatsApp and Safari are all you need. ConversaPDF runs in your browser and never uploads your chat to a server.' },
      { q: 'Does the other person get notified?', a: 'No. Exporting a chat sends no notification to the other participants.' },
    ],
  },
  {
    key: 'android',
    slug: 'export-whatsapp-chat-android',
    label: 'Export a WhatsApp chat on Android',
    metaTitle: 'Export a WhatsApp Chat to PDF on Android | ConversaPDF',
    metaDescription:
      'Export a WhatsApp conversation from your Android phone and turn it into a PDF with names, dates, times and photos. Step-by-step, nothing to install.',
    h1: 'How to export a WhatsApp chat to PDF on Android',
    intro:
      'On Android, WhatsApp exports a chat as a text file (.txt), sometimes together with the photos. ConversaPDF turns those files into a clear, paginated PDF without your chat ever leaving your device.',
    sections: [
      {
        h: 'Export the chat from Android',
        steps: [
          'Open WhatsApp and go into the chat.',
          'Tap the three dots ⋮ in the top right.',
          'Tap “More”, then “Export chat”.',
          'Choose “Include media” to get photos in the PDF, or “Without media” for text only.',
          'Save the result to Google Drive or Files, or email it to yourself.',
        ],
      },
      {
        h: 'Turn the files into a PDF',
        steps: [
          'Open conversapdf.com in Chrome.',
          'Tap “Choose file” and select the .zip. If WhatsApp gave you the .txt and the photos as separate files, select them all at once.',
          'Pick which participant is you and, optionally, the date range you need.',
          'Check the free preview, then download the full PDF.',
        ],
      },
      {
        h: 'Tips',
        bullets: [
          'The text file is usually named “WhatsApp Chat with Name.txt”.',
          'Depending on your Android version, photos come inside a .zip or as loose files: ConversaPDF accepts both.',
          'Some email providers reject large attachments: Google Drive is usually more reliable.',
        ],
      },
    ],
    faqs: [
      { q: 'I can’t find “Export chat”. What now?', a: 'Update WhatsApp and look under ⋮ > More. In a few countries the export feature isn’t available.' },
      { q: 'Can I do everything on my phone?', a: 'Yes. ConversaPDF works in Chrome on Android. For very long chats with lots of photos, a computer will be faster.' },
      { q: 'Are my messages uploaded anywhere?', a: 'No. The files are read and the PDF is built inside your browser.' },
    ],
  },
  {
    key: 'photos',
    slug: 'export-whatsapp-chat-with-photos',
    label: 'Export a WhatsApp chat with photos',
    metaTitle: 'Export a WhatsApp Chat to PDF with Photos | ConversaPDF',
    metaDescription:
      'How to get a PDF of a WhatsApp conversation with every photo in place, next to the messages. Exporting with media on iPhone and Android.',
    h1: 'Export a WhatsApp chat to PDF with photos',
    intro:
      'A conversation without its photos loses its context: the flat you were renting, the damage to the car, the receipt… ConversaPDF puts every photo exactly where it was sent in the chat.',
    sections: [
      {
        h: 'The key step: export “with media”',
        p: [
          'Photos only reach the PDF if WhatsApp includes them in the export. When you tap “Export chat”, pick the media option (“Attach Media” on iPhone, “Include media” on Android).',
          'If you choose “Without media”, the PDF still shows where a photo was, just without the image.',
        ],
      },
      {
        h: 'Step by step',
        steps: [
          'Export the chat with media and keep the .zip (or the .txt and the photos).',
          'Open conversapdf.com and select the .zip, or all the files at once.',
          'Check the summary for the number of photos found.',
          'Open the free preview to see the photos in place.',
          'Download the “With photos” or “Evidence” edition.',
        ],
      },
      {
        h: 'Good to know',
        bullets: [
          'Photos are downscaled so the PDF stays light, while keeping good quality for reading and printing.',
          'Voice notes and videos can’t play inside a PDF: they’re listed by file name.',
          'With media, WhatsApp may only export the most recent messages (commonly reported as about 10,000).',
        ],
      },
    ],
    faqs: [
      { q: 'Why don’t my photos show in the PDF?', a: 'You probably exported “without media”, or selected only the .txt. Export again with media and select the whole .zip.' },
      { q: 'Are the photos good quality?', a: 'Yes, good enough to read, print or present. They’re only reduced to keep the PDF light.' },
      { q: 'Are stickers included?', a: 'Stickers appear as an attachment with their file name; regular photos are shown as images.' },
    ],
  },
  {
    key: 'evidence',
    slug: 'whatsapp-chat-as-evidence',
    label: 'Use a WhatsApp chat as evidence',
    metaTitle: 'WhatsApp Chat as Evidence: How to Present It | ConversaPDF',
    metaDescription:
      'How to prepare a clear PDF of a WhatsApp conversation for a lawyer, a court case or a complaint: full export, dates, times and a file fingerprint.',
    h1: 'WhatsApp chat as evidence: how to prepare it',
    intro:
      'Landlords, employers, ex-partners, insurers: plenty of disputes come down to what was said on WhatsApp. A pile of screenshots is hard to read and easy to challenge. A complete, ordered document is far more useful to your lawyer.',
    sections: [
      {
        h: 'Why screenshots aren’t enough',
        bullets: [
          'They don’t show the full context and can look cherry-picked.',
          'Dates aren’t always visible and the order gets lost easily.',
          'They’re awkward to print and to reference (“see page 4, the 7:20 pm message”).',
        ],
      },
      {
        h: 'How to prepare a solid document',
        steps: [
          'Export the full conversation from WhatsApp, with media if the photos matter.',
          'Keep the exported file exactly as it is, unopened and unedited, and keep the phone too.',
          'In ConversaPDF, choose the Evidence edition: a cover page with participants and period, times to the second, and the SHA-256 fingerprint of the original file.',
          'Give your lawyer both the PDF and the original file: the fingerprint lets anyone check the file hasn’t changed.',
        ],
      },
      {
        h: 'What a PDF doesn’t replace',
        p: [
          'Whether evidence is admitted, and how much weight it carries, is up to the court. If the other side disputes the chat, a forensic examination of the phone by an expert is the usual next step. ConversaPDF gives you a clear, verifiable document, but it is not a certification or legal advice: always check with your lawyer.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the SHA-256 fingerprint?', a: 'A code computed from the exported file. Change a single letter in the file and the code changes. It shows the original hasn’t been altered.' },
      { q: 'Can I keep only a date range?', a: 'Yes, you can set a start and end date. For legal use, it’s usually better to export everything and point to the key parts.' },
      { q: 'Will the other person know I exported the chat?', a: 'No, WhatsApp doesn’t notify participants.' },
    ],
  },
  {
    key: 'group',
    slug: 'export-whatsapp-group-chat',
    label: 'Export a WhatsApp group chat',
    metaTitle: 'Export a WhatsApp Group Chat to PDF | ConversaPDF',
    metaDescription:
      'Turn a WhatsApp group conversation into a readable PDF: each participant with their name and color, group notices, dates and photos.',
    h1: 'Export a WhatsApp group chat to PDF',
    intro:
      'Neighbors, school parents, work or family: a group chat piles up thousands of messages fast. ConversaPDF turns them into a clear document where you can see who said what, and when.',
    sections: [
      {
        h: 'Export the group',
        steps: [
          'Open the group in WhatsApp.',
          'On iPhone, tap the group name at the top; on Android, tap ⋮ then “More”.',
          'Tap “Export chat” and choose with or without media.',
          'Save the file and open it on conversapdf.com.',
        ],
      },
      {
        h: 'How a group looks in the PDF',
        bullets: [
          'Each participant appears with their name and their own color.',
          'Group notices (“X added Y”, subject changes…) are centered in grey.',
          'You can pick which participant is you so your messages sit on the right.',
          'A divider for each day makes it easy to find a specific date.',
        ],
      },
      {
        h: 'Tips for big groups',
        bullets: [
          'Use the “From” and “To” dates to keep only the period that matters.',
          'For groups with lots of photos, a computer will be faster than a phone.',
        ],
      },
    ],
    faqs: [
      { q: 'Can any member export the group?', a: 'Yes, any participant can export the history stored on their own phone.' },
      { q: 'Will it show names or phone numbers?', a: 'Whatever your phone shows: the name if the contact is saved, the number if not.' },
      { q: 'Is there a participant limit?', a: 'No. ConversaPDF works with groups of any size.' },
    ],
  },
  {
    key: 'print',
    slug: 'print-whatsapp-chat',
    label: 'Print a WhatsApp chat',
    metaTitle: 'How to Print a WhatsApp Chat | ConversaPDF',
    metaDescription:
      'The cleanest way to print a WhatsApp conversation: a paginated PDF with names, dates, times and photos, ready to print at home or at a print shop.',
    h1: 'How to print a WhatsApp chat',
    intro:
      'WhatsApp has no print button. Taking screenshots and pasting them into a document takes hours, and the result is hard to read. The quickest route is to turn the chat into a paginated PDF and print that.',
    sections: [
      {
        h: 'Step by step',
        steps: [
          'Export the chat from WhatsApp (“Export chat”).',
          'Open the file on conversapdf.com and pick the period you want to print.',
          'Download the PDF.',
          'Open it on your computer or phone and print it, or take it on a USB stick to a print shop.',
        ],
      },
      {
        h: 'For a clean print',
        bullets: [
          'The PDF uses A4 pages with margins and a page number on every sheet.',
          'Backgrounds are light so you don’t waste ink.',
          'If you only need a few pages, choose a shorter period before downloading.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I print just part of a chat?', a: 'Yes. Set the “From” and “To” dates before generating the PDF.' },
      { q: 'Do the photos print too?', a: 'Yes, if you exported with media and chose the “With photos” or “Evidence” edition.' },
      { q: 'What if I don’t have a printer?', a: 'Email the PDF or take it on a USB stick to a print shop or library.' },
    ],
  },
  {
    key: 'txt',
    slug: 'open-whatsapp-chat-txt-file',
    label: 'Open a WhatsApp _chat.txt file',
    metaTitle: 'Open a WhatsApp _chat.txt File as a PDF | ConversaPDF',
    metaDescription:
      'Exported a WhatsApp chat and ended up with an unreadable _chat.txt? Here’s how to open it and turn it into a clear PDF with dates, names and photos.',
    h1: 'How to open a WhatsApp _chat.txt file',
    intro:
      'When you export a chat, WhatsApp creates a text file: _chat.txt on iPhone or “WhatsApp Chat with Name.txt” on Android. Any text editor can open it, but it’s an endless wall of lines that’s hard to read.',
    sections: [
      {
        h: 'What’s inside the file',
        bullets: [
          'One line per message: date, time, sender name and text.',
          'References to photos and voice notes (“<attached: …jpg>” or “IMG-…jpg (file attached)”).',
          'System notices: encryption, group changes, deleted messages.',
        ],
      },
      {
        h: 'Open it in a readable way',
        steps: [
          'If you have a .zip, no need to unzip it: select it directly on conversapdf.com.',
          'If you only have the .txt, select it as is (and the photos at the same time, if they’re separate).',
          'ConversaPDF recognizes iPhone and Android formats in any language and shows it as a chat.',
          'Download the result as a PDF.',
        ],
      },
      {
        h: 'What about a text editor?',
        p: [
          'On Windows, Notepad will open it; on Mac, TextEdit. That’s fine for searching for a phrase, but for reading, printing or sending to someone, a well-laid-out PDF is much easier.',
        ],
      },
    ],
    faqs: [
      { q: 'The file shows strange characters. Is that normal?', a: 'Older editors sometimes misread accents and emoji. ConversaPDF reads the file correctly as UTF-8.' },
      { q: 'Can I convert a .txt without the photos?', a: 'Yes. The PDF shows where each photo was, with its file name.' },
      { q: 'Does it work with old exports?', a: 'Yes, as long as it’s the original file exported by WhatsApp.' },
    ],
  },
  {
    key: 'save',
    slug: 'save-whatsapp-chat',
    label: 'Save a WhatsApp chat forever',
    metaTitle: 'How to Save a WhatsApp Chat Forever | ConversaPDF',
    metaDescription:
      'Keep your important WhatsApp conversations as a PDF you can read on any device, photos included, even if you switch phones or delete the app.',
    h1: 'How to save a WhatsApp chat forever',
    intro:
      'WhatsApp backups (iCloud or Google Drive) only restore the app: you can’t read them like a document. To truly keep a conversation with someone who matters, the best option is to turn it into a PDF.',
    sections: [
      {
        h: 'Why a PDF',
        bullets: [
          'It opens on any computer, phone or tablet, today and decades from now.',
          'It doesn’t depend on WhatsApp or on your phone.',
          'You can print it, bind it or share it with family.',
        ],
      },
      {
        h: 'How to do it',
        steps: [
          'Export the chat with media so the photos are kept.',
          'Turn it into a PDF on conversapdf.com with the “With photos” edition.',
          'Store the PDF and the original .zip in two different places (for example your computer and a cloud drive).',
          'Repeat the export now and then if the conversation continues.',
        ],
      },
    ],
    faqs: [
      { q: 'Isn’t the WhatsApp backup enough?', a: 'It restores chats onto a phone, but it isn’t a readable file. If you ever stop using WhatsApp, you won’t be able to read it.' },
      { q: 'Can I print it like a book?', a: 'Yes. The PDF is A4 and paginated: you can print it and have it bound.' },
      { q: 'Does it work with chats from years ago?', a: 'Yes, as long as they’re still in your WhatsApp so you can export them.' },
    ],
  },
  {
    "key": "instagram",
    "slug": "instagram-dm-to-pdf",
    "label": "Instagram DMs to PDF",
    "metaTitle": "Instagram DMs to PDF: export and print a conversation",
    "metaDescription": "Export your Instagram direct messages and turn a conversation into a readable PDF with dates, times and photos. Everything runs in your browser.",
    "h1": "Instagram DMs to PDF: export and print a conversation",
    "intro": "Instagram has no \"export chat\" button. You have to download your information, which gives you files nobody can read. ConversaPDF turns them into a clean PDF that looks like the conversation on your phone.",
    "sections": [
      {
        "h": "1. Request your messages",
        "steps": [
          "In Instagram, open your profile, then the ☰ menu and Accounts Center.",
          "Go to \"Your information and permissions\", then \"Export your information\" and \"Create export\".",
          "Pick \"Export to device\", your account, then \"Customize information\": tick only \"Messages\".",
          "Format: JSON (this matters). Choose the date range and start the export.",
          "Instagram lets you know when the file is ready, usually within minutes to a few hours. Download the .zip."
        ]
      },
      {
        "h": "2. Turn it into a PDF",
        "steps": [
          "Drop the .zip as it is into the tool below, without unzipping it.",
          "Pick the conversation from the list: the export holds all your chats.",
          "Say who you are so your messages sit on the right, check the free preview and download the PDF."
        ]
      },
      {
        "h": "End-to-end encrypted chats",
        "p": [
          "End-to-end encrypted chats are not in the regular export. On a computer, Instagram lets you download them separately from \"Your activity\" › \"Download end-to-end encrypted data\", if secure storage is on. That file works in the tool too."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Are my messages uploaded to a server?",
        "a": "No. The file is read in your browser and nothing is sent to ConversaPDF, not even the conversation you pick."
      },
      {
        "q": "Why JSON?",
        "a": "It is the format the tool reads reliably, with accents, emojis and photos. The HTML export is not supported."
      },
      {
        "q": "Will the other person be notified?",
        "a": "No. The export only concerns your account and sends no notification."
      }
    ]
  },
  {
    "key": "messenger",
    "slug": "messenger-chat-to-pdf",
    "label": "Messenger chat to PDF",
    "metaTitle": "Messenger chat to PDF: export and print your messages",
    "metaDescription": "Export a Facebook Messenger conversation and turn it into a clear PDF with dates, times and photos. Private conversion, right in your browser.",
    "h1": "Messenger chat to PDF: export and print your messages",
    "intro": "When you export Facebook Messenger, your messages end up in technical files. ConversaPDF turns them into a readable, paginated document, for a case, a dispute or simply to keep a conversation that matters.",
    "sections": [
      {
        "h": "1. Encrypted chats (most private conversations)",
        "p": [
          "Since 2024, private Messenger conversations are end-to-end encrypted. They are downloaded separately, from a computer:"
        ],
        "steps": [
          "Open messenger.com and click your profile picture.",
          "Go to \"Privacy & safety\", then \"End-to-end encrypted chats\" and \"Message storage\".",
          "Choose to download your secure storage data, then save the file."
        ]
      },
      {
        "h": "2. Other conversations: Facebook export",
        "steps": [
          "In Facebook, open Accounts Center › \"Your information and permissions\" › \"Export your information\".",
          "Create an export to your device and tick only \"Messages\".",
          "Format: JSON. Start the export, then download the .zip when Facebook lets you know."
        ]
      },
      {
        "h": "3. Turn it into a PDF",
        "steps": [
          "Drop the file or the .zip as it is into the tool below.",
          "If the export holds several conversations, pick the one you need.",
          "Say who you are, check the free preview and download the PDF."
        ]
      }
    ],
    "faqs": [
      {
        "q": "My conversation is not in the Facebook export",
        "a": "It is most likely end-to-end encrypted. Download it from messenger.com, under \"Message storage\", as explained above."
      },
      {
        "q": "Are my messages uploaded to a server?",
        "a": "No. Everything is read and converted in your browser. ConversaPDF never sees your messages."
      },
      {
        "q": "Are photos included?",
        "a": "Yes, when they are in the export. Pick the \"With photos\" edition to see them in place in the conversation."
      }
    ]
  },
];
