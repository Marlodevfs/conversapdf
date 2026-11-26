import type { Locale } from '@/config/site';

export interface PdfStrings {
  page: (n: number, total: number) => string;
  /** Takes the app name: WhatsApp, Instagram, Messenger. */
  conversation: (app: string) => string;
  participants: string;
  period: string;
  messages: string;
  sourceFile: string;
  fileFingerprint: string;
  generatedOn: string;
  proofTitle: string;
  proofNote: (app: string) => string;
  attachment: string;
  photoMissing: string;
  mediaOmitted: string;
  deleted: string;
  previewWatermark: string;
  previewEnd: string;
  notAffiliated: string;
}

const strings: Record<Locale, PdfStrings> = {
  es: {
    page: (n, t) => `Página ${n} de ${t}`,
    conversation: (a) => `Conversación de ${a}`,
    participants: 'Participantes',
    period: 'Periodo',
    messages: 'Mensajes',
    sourceFile: 'Archivo de origen',
    fileFingerprint: 'Huella SHA-256 del archivo exportado',
    generatedOn: 'Documento generado el',
    proofTitle: 'Registro de conversación',
    proofNote:
      (a) =>
      `Este documento reproduce fielmente el archivo exportado desde ${a}. La huella SHA-256 permite comprobar que el archivo de origen no ha sido modificado: si se vuelve a calcular sobre el mismo archivo, el resultado es idéntico. Este documento no es una certificación ni un asesoramiento jurídico; su valor como prueba lo decide el tribunal.`,
    attachment: 'Archivo adjunto',
    photoMissing: 'Foto no incluida en la exportación',
    mediaOmitted: 'Archivo no incluido en la exportación',
    deleted: 'Mensaje eliminado',
    previewWatermark: 'VISTA PREVIA',
    previewEnd: 'Fin de la vista previa. Descarga el PDF completo en conversapdf.com',
    notAffiliated: 'ConversaPDF no está afiliado a WhatsApp, Instagram, Messenger ni Meta.',
  },
  pt: {
    page: (n, t) => `Página ${n} de ${t}`,
    conversation: (a) => `Conversa do ${a}`,
    participants: 'Participantes',
    period: 'Período',
    messages: 'Mensagens',
    sourceFile: 'Arquivo de origem',
    fileFingerprint: 'Impressão digital SHA-256 do arquivo exportado',
    generatedOn: 'Documento gerado em',
    proofTitle: 'Registro de conversa',
    proofNote:
      (a) =>
      `Este documento reproduz fielmente o arquivo exportado do ${a}. A impressão digital SHA-256 permite verificar que o arquivo de origem não foi alterado: se calculada novamente sobre o mesmo arquivo, o resultado é idêntico. Este documento não é uma certificação nem aconselhamento jurídico; o seu valor como prova é decidido pelo tribunal.`,
    attachment: 'Anexo',
    photoMissing: 'Foto não incluída na exportação',
    mediaOmitted: 'Arquivo não incluído na exportação',
    deleted: 'Mensagem apagada',
    previewWatermark: 'PRÉ-VISUALIZAÇÃO',
    previewEnd: 'Fim da pré-visualização. Baixe o PDF completo em conversapdf.com',
    notAffiliated: 'O ConversaPDF não é afiliado ao WhatsApp, Instagram, Messenger nem à Meta.',
  },
  it: {
    page: (n, t) => `Pagina ${n} di ${t}`,
    conversation: (a) => `Chat di ${a}`,
    participants: 'Partecipanti',
    period: 'Periodo',
    messages: 'Messaggi',
    sourceFile: 'File di origine',
    fileFingerprint: 'Impronta SHA-256 del file esportato',
    generatedOn: 'Documento generato il',
    proofTitle: 'Registro della conversazione',
    proofNote:
      (a) =>
      `Questo documento riproduce fedelmente il file esportato da ${a}. L'impronta SHA-256 permette di verificare che il file di origine non sia stato modificato: ricalcolata sullo stesso file, dà lo stesso risultato. Questo documento non è una certificazione né una consulenza legale; il suo valore come prova è deciso dal giudice.`,
    attachment: 'Allegato',
    photoMissing: "Foto non inclusa nell'esportazione",
    mediaOmitted: "File non incluso nell'esportazione",
    deleted: 'Messaggio eliminato',
    previewWatermark: 'ANTEPRIMA',
    previewEnd: "Fine dell'anteprima. Scarica il PDF completo su conversapdf.com",
    notAffiliated: 'ConversaPDF non è affiliato a WhatsApp, Instagram, Messenger né a Meta.',
  },
  fr: {
    page: (n, t) => `Page ${n} sur ${t}`,
    conversation: (a) => `Conversation ${a}`,
    participants: 'Participants',
    period: 'Période',
    messages: 'Messages',
    sourceFile: "Fichier d'origine",
    fileFingerprint: 'Empreinte SHA-256 du fichier exporté',
    generatedOn: 'Document généré le',
    proofTitle: 'Relevé de conversation',
    proofNote:
      (a) =>
      `Ce document reproduit fidèlement le fichier exporté depuis ${a}. L'empreinte SHA-256 permet de vérifier que le fichier d'origine n'a pas été modifié : recalculée sur le même fichier, elle donne le même résultat. Ce document n'est ni une certification ni un conseil juridique ; sa valeur de preuve est appréciée par le juge.`,
    attachment: 'Pièce jointe',
    photoMissing: "Photo non incluse dans l'export",
    mediaOmitted: "Fichier non inclus dans l'export",
    deleted: 'Message supprimé',
    previewWatermark: 'APERÇU',
    previewEnd: "Fin de l'aperçu. Téléchargez le PDF complet sur conversapdf.com",
    notAffiliated: "ConversaPDF n'est affilié ni à WhatsApp, ni à Instagram, ni à Messenger, ni à Meta.",
  },
  de: {
    page: (n, t) => `Seite ${n} von ${t}`,
    conversation: (a) => `${a}-Chat`,
    participants: 'Teilnehmer',
    period: 'Zeitraum',
    messages: 'Nachrichten',
    sourceFile: 'Originaldatei',
    fileFingerprint: 'SHA-256-Fingerabdruck der exportierten Datei',
    generatedOn: 'Dokument erstellt am',
    proofTitle: 'Chatprotokoll',
    proofNote:
      (a) =>
      `Dieses Dokument gibt die aus ${a} exportierte Datei originalgetreu wieder. Mit dem SHA-256-Fingerabdruck lässt sich prüfen, dass die Originaldatei nicht verändert wurde: Erneut über dieselbe Datei berechnet, ergibt er dasselbe Ergebnis. Dieses Dokument ist weder eine Beglaubigung noch eine Rechtsberatung; über seinen Beweiswert entscheidet das Gericht.`,
    attachment: 'Anhang',
    photoMissing: 'Foto nicht im Export enthalten',
    mediaOmitted: 'Datei nicht im Export enthalten',
    deleted: 'Nachricht gelöscht',
    previewWatermark: 'VORSCHAU',
    previewEnd: 'Ende der Vorschau. Lade das vollständige PDF auf conversapdf.com herunter',
    notAffiliated: 'ConversaPDF ist weder mit WhatsApp noch mit Instagram, Messenger oder Meta verbunden.',
  },
  en: {
    page: (n, t) => `Page ${n} of ${t}`,
    conversation: (a) => `${a} conversation`,
    participants: 'Participants',
    period: 'Period',
    messages: 'Messages',
    sourceFile: 'Source file',
    fileFingerprint: 'SHA-256 fingerprint of the exported file',
    generatedOn: 'Document generated on',
    proofTitle: 'Conversation record',
    proofNote:
      (a) =>
      `This document faithfully reproduces the file exported from ${a}. The SHA-256 fingerprint makes it possible to check that the source file was not modified: computed again on the same file, it gives the same result. This document is neither a certification nor legal advice; its weight as evidence is for the court to decide.`,
    attachment: 'Attachment',
    photoMissing: 'Photo not included in the export',
    mediaOmitted: 'File not included in the export',
    deleted: 'Deleted message',
    previewWatermark: 'PREVIEW',
    previewEnd: 'End of preview. Download the full PDF at conversapdf.com',
    notAffiliated: 'ConversaPDF is not affiliated with WhatsApp, Instagram, Messenger or Meta.',
  },
};

export function pdfStrings(locale: Locale): PdfStrings {
  return strings[locale];
}

/** BCP-47 tags used for date formatting. */
export const intlLocale: Record<Locale, string> = {
  es: 'es-ES',
  pt: 'pt-BR',
  it: 'it-IT',
  fr: 'fr-FR',
  de: 'de-DE',
  en: 'en-GB',
};

export const appName = (app: string | undefined) =>
  app === 'instagram' ? 'Instagram' : app === 'messenger' ? 'Messenger' : app === 'meta' ? 'Instagram / Messenger' : 'WhatsApp';
