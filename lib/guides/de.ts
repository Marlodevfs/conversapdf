import type { Guide, GuideChrome } from './types';

export const chromeDe: GuideChrome = {
  guidesTitle: 'Anleitungen',
  guidesIntro: 'Schritt für Schritt deine WhatsApp-Chats exportieren, ausdrucken und sichern.',
  related: 'Weitere Anleitungen',
  toolTitle: 'Wandle deinen Chat jetzt um',
  breadcrumbHome: 'Startseite',
};

export const guidesDe: Guide[] = [
  {
    key: 'iphone',
    slug: 'whatsapp-chat-exportieren-iphone',
    label: 'WhatsApp-Chat auf dem iPhone exportieren',
    metaTitle: 'WhatsApp-Chat auf dem iPhone als PDF exportieren',
    metaDescription:
      'Exportiere einen WhatsApp-Chat von deinem iPhone und mach daraus ein übersichtliches PDF mit Datum, Uhrzeit und Fotos. Schritt für Schritt, ohne App.',
    h1: 'WhatsApp-Chat auf dem iPhone als PDF exportieren',
    intro:
      'WhatsApp hat keinen Button „Als PDF speichern“, aber auf dem iPhone lässt sich jeder Chat als .zip-Datei exportieren. Aus dieser Datei erstellt ConversaPDF in wenigen Sekunden ein sauberes PDF, direkt in deinem Browser.',
    sections: [
      {
        h: 'Den Chat auf dem iPhone exportieren',
        steps: [
          'Öffne WhatsApp und geh in den Chat, den du behalten möchtest.',
          'Tippe oben auf den Namen des Kontakts oder der Gruppe.',
          'Scrolle ganz nach unten und tippe auf „Chat exportieren“.',
          'Wähle „Medien anhängen“ (für Fotos im PDF) oder „Ohne Medien“ (nur Text, schneller).',
          'Tippe im Teilen-Menü auf „In Dateien sichern“ und wähle einen Ordner.',
        ],
      },
      {
        h: 'Die Datei in ein PDF umwandeln',
        steps: [
          'Öffne conversapdf.com in Safari auf demselben iPhone.',
          'Tippe auf „Datei auswählen“ und wähle die in „Dateien“ gespeicherte .zip-Datei.',
          'Gib an, wer du bist, damit deine Nachrichten rechts stehen, und wähle einen Zeitraum, wenn du nur einen Teil brauchst.',
          'Sieh dir die kostenlose Vorschau an und lade dann das vollständige PDF herunter.',
        ],
      },
      {
        h: 'Tipps',
        bullets: [
          'Die Datei heißt „WhatsApp Chat - Name.zip“ und enthält eine _chat.txt mit den Nachrichten sowie die Fotos.',
          'Benenne die .zip-Datei nicht um und verändere sie nicht: Die Version „Beweis“ berechnet den Fingerabdruck der Originaldatei.',
          'Bei sehr langen Chats kann WhatsApp den Export auf die neuesten Nachrichten begrenzen (oft ist von etwa 10.000 Nachrichten mit Medien und 40.000 ohne die Rede).',
          'Du kannst dir die .zip-Datei auch per E-Mail schicken und sie am Computer öffnen.',
        ],
      },
    ],
    faqs: [
      { q: 'Wo finde ich „Chat exportieren“ auf dem iPhone?', a: 'In den Chat-Infos: Tippe oben auf den Namen des Kontakts oder der Gruppe und scrolle ganz nach unten.' },
      { q: 'Muss ich eine App installieren?', a: 'Nein. WhatsApp und Safari reichen. ConversaPDF läuft im Browser und schickt deinen Chat an keinen Server.' },
      { q: 'Wird die andere Person benachrichtigt?', a: 'Nein. Beim Exportieren eines Chats werden die anderen Teilnehmer nicht benachrichtigt.' },
    ],
  },
  {
    key: 'android',
    slug: 'whatsapp-chat-exportieren-android',
    label: 'WhatsApp-Chat auf Android exportieren',
    metaTitle: 'WhatsApp-Chat auf Android als PDF exportieren',
    metaDescription:
      'Exportiere einen WhatsApp-Chat auf Android und mach daraus ein PDF mit Namen, Datum, Uhrzeit und Fotos. Schritt für Schritt, ohne App.',
    h1: 'WhatsApp-Chat auf Android als PDF exportieren',
    intro:
      'Auf Android exportiert WhatsApp den Chat als Textdatei (.txt), manchmal zusammen mit den Fotos. ConversaPDF macht daraus ein übersichtliches PDF mit Seitenzahlen, ohne dass der Chat dein Gerät verlässt.',
    sections: [
      {
        h: 'Den Chat auf Android exportieren',
        steps: [
          'Öffne WhatsApp und geh in den Chat.',
          'Tippe oben rechts auf die drei Punkte ⋮.',
          'Tippe auf „Mehr“ und dann auf „Chat exportieren“.',
          'Wähle „Medien einbeziehen“ für Fotos im PDF oder „Ohne Medien“ für reinen Text.',
          'Speichere das Ergebnis in Google Drive oder in „Dateien“ oder schick es dir per E-Mail.',
        ],
      },
      {
        h: 'Die Dateien in ein PDF umwandeln',
        steps: [
          'Öffne conversapdf.com in Chrome.',
          'Tippe auf „Datei auswählen“ und wähle die .zip-Datei. Hat dir WhatsApp die .txt-Datei und die Fotos getrennt gegeben, wähle alle gleichzeitig aus.',
          'Gib an, wer du bist, und bei Bedarf den gewünschten Zeitraum.',
          'Prüf die kostenlose Vorschau und lade dann das vollständige PDF herunter.',
        ],
      },
      {
        h: 'Tipps',
        bullets: [
          'Die Textdatei heißt meistens „WhatsApp Chat mit Name.txt“.',
          'Je nach Android-Version kommen die Fotos als .zip oder als einzelne Dateien: ConversaPDF nimmt beides.',
          'Manche E-Mail-Dienste lehnen große Anhänge ab: Google Drive ist oft zuverlässiger.',
        ],
      },
    ],
    faqs: [
      { q: 'Ich finde „Chat exportieren“ nicht. Was tun?', a: 'Aktualisiere WhatsApp und schau unter ⋮ > Mehr. In einigen Ländern ist der Export nicht verfügbar.' },
      { q: 'Geht alles auch nur mit dem Handy?', a: 'Ja. ConversaPDF funktioniert in Chrome auf Android. Bei sehr langen Chats mit vielen Fotos geht es am Computer schneller.' },
      { q: 'Werden meine Nachrichten ins Internet geschickt?', a: 'Nein. Die Dateien werden in deinem Browser gelesen und das PDF dort erstellt.' },
    ],
  },
  {
    key: 'photos',
    slug: 'whatsapp-chat-mit-fotos-exportieren',
    label: 'WhatsApp-Chat mit Fotos exportieren',
    metaTitle: 'WhatsApp-Chat mit Fotos als PDF exportieren | ConversaPDF',
    metaDescription:
      'So bekommst du ein PDF deines WhatsApp-Chats mit den Fotos an ihrer Stelle, direkt neben den Nachrichten. Export mit Medien auf iPhone und Android.',
    h1: 'WhatsApp-Chat mit Fotos als PDF exportieren',
    intro:
      'Ein Chat ohne seine Fotos verliert den Zusammenhang: die Wohnung zur Miete, der Schaden am Auto, die Quittung… ConversaPDF setzt jedes Foto genau dorthin, wo es geschickt wurde.',
    sections: [
      {
        h: 'Das Wichtigste: „mit Medien“ exportieren',
        p: [
          'Die Fotos landen nur im PDF, wenn WhatsApp sie in den Export aufnimmt. Wenn du auf „Chat exportieren“ tippst, wähle die Option mit Medien („Medien anhängen“ auf dem iPhone, „Medien einbeziehen“ auf Android).',
          'Wählst du „Ohne Medien“, zeigt das PDF trotzdem an, wo ein Foto war, aber ohne das Bild.',
        ],
      },
      {
        h: 'Schritt für Schritt',
        steps: [
          'Exportiere den Chat mit Medien und behalte die .zip-Datei (oder die .txt-Datei und die Fotos).',
          'Öffne conversapdf.com und wähle die .zip-Datei oder alle Dateien gleichzeitig aus.',
          'Prüf in der Übersicht, wie viele Fotos gefunden wurden.',
          'Öffne die kostenlose Vorschau, um die Fotos an ihrer Stelle zu sehen.',
          'Lade die Version „Mit Fotos“ oder „Beweis“ herunter.',
        ],
      },
      {
        h: 'Gut zu wissen',
        bullets: [
          'Die Fotos werden verkleinert, damit das PDF handlich bleibt, und behalten trotzdem eine gute Qualität zum Lesen und Drucken.',
          'Audios und Videos lassen sich in einem PDF nicht abspielen: Sie werden mit ihrem Dateinamen angezeigt.',
          'Mit Medien kann WhatsApp den Export auf die neuesten Nachrichten begrenzen (oft ist von etwa 10.000 die Rede).',
        ],
      },
    ],
    faqs: [
      { q: 'Warum erscheinen meine Fotos nicht im PDF?', a: 'Wahrscheinlich hast du „Ohne Medien“ exportiert oder nur die .txt-Datei ausgewählt. Exportiere erneut mit Medien und wähle die vollständige .zip-Datei.' },
      { q: 'Haben die Fotos eine gute Qualität?', a: 'Ja, ausreichend zum Lesen, Drucken oder Vorlegen. Sie werden nur verkleinert, damit das PDF handlich bleibt.' },
      { q: 'Sind Sticker enthalten?', a: 'Sticker erscheinen als Anhang mit ihrem Dateinamen; normale Fotos werden als Bild angezeigt.' },
    ],
  },
  {
    key: 'evidence',
    slug: 'whatsapp-chat-als-beweis',
    label: 'WhatsApp-Chat als Beweis verwenden',
    metaTitle: 'WhatsApp-Chat als Beweismittel vor Gericht: so geht’s',
    metaDescription:
      'Ein übersichtliches PDF eines WhatsApp-Chats für den Anwalt, ein Verfahren oder eine Reklamation vorbereiten: vollständiger Export, Datum, Uhrzeit und Fingerabdruck.',
    h1: 'WhatsApp-Chat als Beweis: so bereitest du ihn vor',
    intro:
      'Vermieter, Firma, Ex-Partner, Versicherung: Viele Streitigkeiten drehen sich darum, was auf WhatsApp gesagt wurde. Ein Stapel Screenshots ist schwer zu lesen und leicht anzuzweifeln. Ein vollständiges, geordnetes Dokument hilft deinem Anwalt viel mehr.',
    sections: [
      {
        h: 'Warum Screenshots nicht reichen',
        bullets: [
          'Sie zeigen nicht den ganzen Zusammenhang und können ausgewählt wirken.',
          'Das Datum ist nicht immer sichtbar und die Reihenfolge geht leicht verloren.',
          'Sie sind mühsam auszudrucken und zu zitieren („siehe Seite 4, Nachricht von 19:20 Uhr“).',
        ],
      },
      {
        h: 'Ein belastbares Dokument vorbereiten',
        steps: [
          'Exportiere den ganzen Chat aus WhatsApp, mit Medien, wenn die Fotos wichtig sind.',
          'Bewahre die exportierte Datei unverändert auf, ohne sie zu öffnen oder zu bearbeiten, und behalte auch das Handy.',
          'Wähle auf ConversaPDF die Version „Beweis“: Deckblatt mit Teilnehmern und Zeitraum, Uhrzeit auf die Sekunde und SHA-256-Fingerabdruck der Originaldatei.',
          'Gib deinem Anwalt das PDF und die Originaldatei: Dank des Fingerabdrucks lässt sich prüfen, dass die Datei nicht verändert wurde.',
        ],
      },
      {
        h: 'Was ein PDF nicht ersetzt',
        p: [
          'Ob und wie ein Beweis gewertet wird, entscheidet das Gericht. Bestreitet die Gegenseite den Chat, kann es zum Beispiel das Handy selbst prüfen oder ein Gutachten einholen. ConversaPDF gibt dir ein übersichtliches, überprüfbares Dokument, aber keine Beglaubigung und keine Rechtsberatung: Sprich immer mit deinem Anwalt.',
        ],
      },
    ],
    faqs: [
      { q: 'Was ist der SHA-256-Fingerabdruck?', a: 'Ein Code, der aus der exportierten Datei berechnet wird. Ändert jemand auch nur einen Buchstaben der Datei, ändert sich der Code. So lässt sich zeigen, dass das Original nicht verändert wurde.' },
      { q: 'Kann ich nur einen Zeitraum behalten?', a: 'Ja, du kannst ein Start- und Enddatum wählen. Für ein Verfahren ist es oft besser, alles zu exportieren und die wichtigen Stellen zu markieren.' },
      { q: 'Erfährt die andere Person, dass ich den Chat exportiert habe?', a: 'Nein, WhatsApp benachrichtigt die Teilnehmer nicht.' },
    ],
  },
  {
    key: 'group',
    slug: 'whatsapp-gruppe-exportieren',
    label: 'WhatsApp-Gruppe exportieren',
    metaTitle: 'WhatsApp-Gruppe als PDF exportieren | ConversaPDF',
    metaDescription:
      'Mach aus dem Chat einer WhatsApp-Gruppe ein lesbares PDF: jeder Teilnehmer mit Namen und Farbe, Gruppenhinweise, Datum und Fotos.',
    h1: 'WhatsApp-Gruppe als PDF exportieren',
    intro:
      'Hausgemeinschaft, Elterngruppe, Arbeit oder Familie: In einer Gruppe sammeln sich schnell Tausende Nachrichten. ConversaPDF macht daraus ein übersichtliches Dokument, in dem man sieht, wer was wann gesagt hat.',
    sections: [
      {
        h: 'Die Gruppe exportieren',
        steps: [
          'Öffne die Gruppe in WhatsApp.',
          'Auf dem iPhone tippst du oben auf den Gruppennamen, auf Android auf ⋮ und dann „Mehr“.',
          'Tippe auf „Chat exportieren“ und wähle mit oder ohne Medien.',
          'Speichere die Datei und öffne sie auf conversapdf.com.',
        ],
      },
      {
        h: 'So sieht eine Gruppe im PDF aus',
        bullets: [
          'Jeder Teilnehmer erscheint mit seinem Namen und einer eigenen Farbe.',
          'Gruppenhinweise („X hat Y hinzugefügt“, Namensänderung…) stehen grau in der Mitte.',
          'Du kannst angeben, wer du bist, damit deine Nachrichten rechts stehen.',
          'Eine Trennlinie pro Tag hilft, ein bestimmtes Datum wiederzufinden.',
        ],
      },
      {
        h: 'Tipps für große Gruppen',
        bullets: [
          'Nutze die Felder „Von“ und „Bis“, um nur den relevanten Zeitraum zu behalten.',
          'Bei Gruppen mit vielen Fotos geht es am Computer schneller als am Handy.',
        ],
      },
    ],
    faqs: [
      { q: 'Kann jedes Mitglied die Gruppe exportieren?', a: 'Ja, jeder Teilnehmer kann den Verlauf exportieren, der auf seinem eigenen Handy gespeichert ist.' },
      { q: 'Erscheinen Namen oder Nummern?', a: 'Wie auf deinem Handy: der Name, wenn der Kontakt gespeichert ist, sonst die Nummer.' },
      { q: 'Gibt es eine Teilnehmergrenze?', a: 'Nein. ConversaPDF funktioniert mit Gruppen jeder Größe.' },
    ],
  },
  {
    key: 'print',
    slug: 'whatsapp-chat-drucken',
    label: 'WhatsApp-Chat ausdrucken',
    metaTitle: 'WhatsApp-Chat ausdrucken | ConversaPDF',
    metaDescription:
      'Der sauberste Weg, einen WhatsApp-Chat auszudrucken: ein PDF mit Seitenzahlen, Namen, Datum, Uhrzeit und Fotos, fertig zum Drucken.',
    h1: 'So druckst du einen WhatsApp-Chat aus',
    intro:
      'WhatsApp hat keinen Drucken-Button. Screenshots machen und in ein Dokument einfügen dauert Stunden, und das Ergebnis ist schwer zu lesen. Am schnellsten geht es, wenn du den Chat in ein PDF mit Seitenzahlen umwandelst und dann ausdruckst.',
    sections: [
      {
        h: 'Schritt für Schritt',
        steps: [
          'Exportiere den Chat aus WhatsApp („Chat exportieren“).',
          'Öffne die Datei auf conversapdf.com und wähle den Zeitraum, den du drucken möchtest.',
          'Lade das PDF herunter.',
          'Öffne es am Computer oder Handy und druck es aus, oder bring es auf einem USB-Stick in einen Copyshop.',
        ],
      },
      {
        h: 'Für einen sauberen Ausdruck',
        bullets: [
          'Das PDF ist im A4-Format, mit Rändern und Seitenzahl auf jedem Blatt.',
          'Die Hintergründe sind hell, damit du keine Tinte verschwendest.',
          'Wenn du nur ein paar Seiten brauchst, wähle vor dem Download einen kürzeren Zeitraum.',
        ],
      },
    ],
    faqs: [
      { q: 'Kann ich nur einen Teil ausdrucken?', a: 'Ja. Wähle „Von“ und „Bis“, bevor du das PDF erstellst.' },
      { q: 'Werden die Fotos auch gedruckt?', a: 'Ja, wenn du mit Medien exportiert und die Version „Mit Fotos“ oder „Beweis“ gewählt hast.' },
      { q: 'Und wenn ich keinen Drucker habe?', a: 'Schick das PDF per E-Mail oder bring es auf einem USB-Stick in einen Copyshop.' },
    ],
  },
  {
    key: 'txt',
    slug: 'whatsapp-chat-txt-datei-oeffnen',
    label: 'Die _chat.txt-Datei von WhatsApp öffnen',
    metaTitle: 'Die _chat.txt-Datei von WhatsApp öffnen | ConversaPDF',
    metaDescription:
      'Eine unlesbare _chat.txt-Datei nach dem WhatsApp-Export? So öffnest du sie und machst daraus ein übersichtliches PDF mit Datum, Namen und Fotos.',
    h1: 'Die _chat.txt-Datei von WhatsApp öffnen',
    intro:
      'Wenn du einen Chat exportierst, erstellt WhatsApp eine Textdatei: _chat.txt auf dem iPhone oder „WhatsApp Chat mit Name.txt“ auf Android. Sie lässt sich mit jedem Texteditor öffnen, ist aber eine endlose, schwer lesbare Liste von Zeilen.',
    sections: [
      {
        h: 'Was die Datei enthält',
        bullets: [
          'Eine Zeile pro Nachricht: Datum, Uhrzeit, Name des Absenders und Text.',
          'Verweise auf Fotos und Audios („<Anhang: …jpg>“ oder „IMG-…jpg (Datei angehängt)“).',
          'Systemnachrichten: Verschlüsselung, Änderungen in der Gruppe, gelöschte Nachrichten.',
        ],
      },
      {
        h: 'Sie lesbar öffnen',
        steps: [
          'Wenn du eine .zip-Datei hast, musst du sie nicht entpacken: Wähle sie direkt auf conversapdf.com aus.',
          'Wenn du nur die .txt-Datei hast, wähle sie so aus, wie sie ist (und die Fotos gleichzeitig, falls sie getrennt sind).',
          'ConversaPDF erkennt das iPhone- und Android-Format in allen Sprachen und zeigt es als Chat an.',
          'Lade das Ergebnis als PDF herunter.',
        ],
      },
      {
        h: 'Und mit einem Texteditor?',
        p: [
          'Unter Windows öffnet sie der Editor, auf dem Mac TextEdit. Das ist praktisch, um einen Satz zu suchen, aber zum Lesen, Drucken oder Weiterschicken ist ein gut gestaltetes PDF viel angenehmer.',
        ],
      },
    ],
    faqs: [
      { q: 'Die Datei zeigt seltsame Zeichen. Ist das normal?', a: 'Ältere Editoren lesen Umlaute und Emojis manchmal falsch. ConversaPDF liest die Datei korrekt in UTF-8.' },
      { q: 'Kann man eine .txt-Datei ohne Fotos umwandeln?', a: 'Ja. Das PDF zeigt an, wo ein Foto war, mit seinem Dateinamen.' },
      { q: 'Funktioniert es mit älteren Exporten?', a: 'Ja, solange es die Originaldatei ist, die WhatsApp exportiert hat.' },
    ],
  },
  {
    key: 'save',
    slug: 'whatsapp-chat-dauerhaft-speichern',
    label: 'WhatsApp-Chat dauerhaft speichern',
    metaTitle: 'WhatsApp-Chat dauerhaft als PDF speichern | ConversaPDF',
    metaDescription:
      'Bewahre deine wichtigen WhatsApp-Chats als PDF auf, lesbar auf jedem Gerät, mit Fotos, auch wenn du das Handy wechselst.',
    h1: 'WhatsApp-Chat dauerhaft speichern',
    intro:
      'Das WhatsApp-Backup (iCloud oder Google Drive) dient nur dazu, die App wiederherzustellen: Man kann es nicht wie ein Dokument lesen. Um einen Chat mit einem wichtigen Menschen wirklich aufzubewahren, machst du am besten ein PDF daraus.',
    sections: [
      {
        h: 'Warum ein PDF',
        bullets: [
          'Es lässt sich auf jedem Computer, Handy oder Tablet öffnen, heute wie in zwanzig Jahren.',
          'Es hängt weder von WhatsApp noch von deinem Handy ab.',
          'Man kann es ausdrucken, binden lassen oder an die Familie schicken.',
        ],
      },
      {
        h: 'So geht’s',
        steps: [
          'Exportiere den Chat mit Medien, damit die Fotos erhalten bleiben.',
          'Wandle ihn auf conversapdf.com mit der Version „Mit Fotos“ in ein PDF um.',
          'Bewahre das PDF und die Original-.zip-Datei an zwei verschiedenen Orten auf (zum Beispiel am Computer und in einer Cloud).',
          'Exportiere ab und zu erneut, wenn der Chat weitergeht.',
        ],
      },
    ],
    faqs: [
      { q: 'Reicht das WhatsApp-Backup nicht?', a: 'Es dient dazu, Chats auf einem Handy wiederherzustellen, ist aber keine lesbare Datei. Wenn du WhatsApp eines Tages nicht mehr nutzt, kannst du es nicht lesen.' },
      { q: 'Kann man es wie ein Buch drucken?', a: 'Ja. Das PDF ist im A4-Format und hat Seitenzahlen: Du kannst es ausdrucken und binden lassen.' },
      { q: 'Funktioniert es mit Chats, die mehrere Jahre alt sind?', a: 'Ja, solange sie noch in deinem WhatsApp sind und sich exportieren lassen.' },
    ],
  },
  {
    key: 'instagram',
    slug: 'instagram-chat-als-pdf',
    label: 'Instagram-Chat als PDF',
    metaTitle: 'Instagram-Chat als PDF speichern',
    metaDescription:
      'Exportiere deine Instagram-Direktnachrichten und mach aus einem Chat ein lesbares PDF mit Datum, Uhrzeit und Fotos. Alles passiert in deinem Browser.',
    h1: 'Instagram-Chat als PDF: Direktnachrichten exportieren und drucken',
    intro:
      'Instagram hat keinen Button „Chat exportieren“. Du musst den Download deiner Informationen nutzen, und der liefert eine unlesbare Datei. ConversaPDF macht daraus ein sauberes PDF, so wie der Chat auf deinem Handy aussieht.',
    sections: [
      {
        h: '1. Den Export deiner Nachrichten anfordern',
        steps: [
          'Öffne in Instagram dein Profil, dann das Menü ☰ und die Kontenübersicht.',
          'Geh zu „Deine Informationen und Berechtigungen“, dann „Deine Informationen exportieren“ und „Export erstellen“.',
          'Wähle „Auf Gerät exportieren“, dein Konto und dann „Informationen anpassen“: Markiere nur „Nachrichten“.',
          'Format: JSON (wichtig). Wähle den Zeitraum und starte den Export.',
          'Instagram meldet sich, wenn die Datei fertig ist, meist nach einigen Minuten bis wenigen Stunden. Lade die .zip-Datei herunter.',
        ],
      },
      {
        h: '2. In ein PDF umwandeln',
        steps: [
          'Lade die .zip-Datei unverändert im Tool unten hoch, ohne sie zu entpacken.',
          'Wähle den Chat aus der Liste: Der Export enthält alle deine Chats.',
          'Gib an, wer du bist, damit deine Nachrichten rechts stehen, prüf die kostenlose Vorschau und lade das PDF herunter.',
        ],
      },
      {
        h: 'Ende-zu-Ende-verschlüsselte Chats',
        p: [
          'Ende-zu-Ende-verschlüsselte Chats erscheinen nicht im normalen Export. Am Computer lassen sie sich in Instagram separat unter „Deine Aktivität“ › „Ende-zu-Ende-verschlüsselte Daten herunterladen“ laden, wenn der sichere Speicher aktiviert ist. Auch diese Datei kannst du im Tool hochladen.',
        ],
      },
    ],
    faqs: [
      { q: 'Werden meine Nachrichten an einen Server geschickt?', a: 'Nein. Die Datei wird in deinem Browser gelesen und nichts wird an ConversaPDF geschickt, nicht einmal der ausgewählte Chat.' },
      { q: 'Warum das JSON-Format?', a: 'Dieses Format kann das Tool zuverlässig lesen, mit Umlauten, Emojis und Fotos. Der HTML-Export wird nicht unterstützt.' },
      { q: 'Wird die andere Person benachrichtigt?', a: 'Nein. Der Export betrifft nur dein Konto und löst keine Benachrichtigung aus.' },
    ],
  },
  {
    key: 'messenger',
    slug: 'messenger-chat-als-pdf',
    label: 'Messenger-Chat als PDF',
    metaTitle: 'Messenger-Chat als PDF speichern',
    metaDescription:
      'Exportiere einen Facebook-Messenger-Chat und mach daraus ein übersichtliches PDF mit Datum, Uhrzeit und Fotos. Private Umwandlung im Browser.',
    h1: 'Messenger-Chat als PDF: Nachrichten exportieren und drucken',
    intro:
      'Facebook Messenger speichert deine Nachrichten beim Export in technischen Dateien. ConversaPDF macht daraus ein lesbares Dokument mit Seitenzahlen, nützlich für eine Akte, einen Streit oder einfach, um einen wichtigen Chat aufzubewahren.',
    sections: [
      {
        h: '1. Verschlüsselte Chats (die meisten privaten Chats)',
        p: [
          'Seit 2024 sind private Messenger-Chats Ende-zu-Ende-verschlüsselt. Sie werden separat am Computer heruntergeladen:',
        ],
        steps: [
          'Öffne messenger.com und klicke auf dein Profilbild.',
          'Geh zu „Privatsphäre und Sicherheit“, dann „Ende-zu-Ende-verschlüsselte Chats“ und „Nachrichtenspeicher“.',
          'Wähle, die Daten aus dem sicheren Speicher herunterzuladen, und lade die Datei herunter.',
        ],
      },
      {
        h: '2. Andere Chats: Facebook-Export',
        steps: [
          'Öffne in Facebook die Kontenübersicht › „Deine Informationen und Berechtigungen“ › „Deine Informationen exportieren“.',
          'Erstelle einen Export auf das Gerät und markiere nur „Nachrichten“.',
          'Format: JSON. Starte den Export und lade die .zip-Datei herunter, sobald Facebook dich benachrichtigt.',
        ],
      },
      {
        h: '3. In ein PDF umwandeln',
        steps: [
          'Lade die Datei oder die .zip-Datei unverändert im Tool unten hoch.',
          'Wenn der Export mehrere Chats enthält, wähle den gewünschten aus.',
          'Gib an, wer du bist, prüf die kostenlose Vorschau und lade das PDF herunter.',
        ],
      },
    ],
    faqs: [
      { q: 'Ich finde meinen Chat nicht im Facebook-Export', a: 'Er ist wahrscheinlich Ende-zu-Ende-verschlüsselt. Lade ihn auf messenger.com unter „Nachrichtenspeicher“ herunter, wie oben beschrieben.' },
      { q: 'Werden meine Nachrichten an einen Server geschickt?', a: 'Nein. Alles wird in deinem Browser gelesen und umgewandelt. ConversaPDF sieht deine Nachrichten nie.' },
      { q: 'Sind die Fotos enthalten?', a: 'Ja, wenn sie im Export sind. Wähle die Version „Mit Fotos“, um sie an ihrer Stelle im Chat zu sehen.' },
    ],
  },
];
