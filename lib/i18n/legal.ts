import type { Locale } from '@/config/site';
import { siteConfig } from '@/config/site';

export type LegalSlug = 'privacy' | 'terms' | 'refund' | 'legal';
export const legalSlugs: LegalSlug[] = ['privacy', 'terms', 'refund', 'legal'];

export interface LegalPage {
  title: string;
  sections: { h: string; p: string[] }[];
}

const mail = siteConfig.contact.email;
const l = siteConfig.legal;
const publisher = [l.publisherName, l.publisherStatus, l.publisherAddress].filter(Boolean);

type Pages = Record<LegalSlug, LegalPage>;

const es: Pages = {
  privacy: {
    title: 'Política de privacidad',
    sections: [
      { h: 'Tu conversación no sale de tu dispositivo', p: ['El archivo que exportas desde WhatsApp se lee y el PDF se crea directamente en tu navegador. No subimos, no guardamos y no vemos tus conversaciones ni tus fotos.'] },
      { h: 'Pagos', p: ['Los pagos los gestiona Polar (polar.sh), que actúa como vendedor oficial (Merchant of Record). Polar trata tus datos de pago y tu correo electrónico según su propia política de privacidad. Nosotros solo recibimos la confirmación del pago.'] },
      { h: 'Datos técnicos', p: ['Nuestro proveedor de alojamiento (Cloudflare) registra datos técnicos como la dirección IP para el funcionamiento y la seguridad del sitio. Medimos las visitas de forma anónima y sin cookies con GoatCounter.'] },
      { h: 'Tus derechos', p: [`Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a ${mail}.`] },
    ],
  },
  terms: {
    title: 'Condiciones de uso',
    sections: [
      { h: 'El servicio', p: ['ConversaPDF convierte en PDF las conversaciones exportadas desde WhatsApp. La vista previa es gratuita; el PDF completo se paga una sola vez por conversación.'] },
      { h: 'Tu responsabilidad', p: ['Solo debes convertir conversaciones de las que formas parte o que tienes derecho a usar, y respetar la privacidad de los demás participantes.'] },
      { h: 'Uso como prueba', p: ['ConversaPDF no es un servicio de certificación ni un despacho de abogados. El valor de un documento como prueba lo decide el tribunal.'] },
      { h: 'Compra', p: ['Las compras se realizan a través de Polar (polar.sh), vendedor oficial, cuyas condiciones de compra también se aplican.'] },
    ],
  },
  refund: {
    title: 'Política de reembolso',
    sections: [
      { h: 'Reembolso', p: [`Si el PDF no se genera o tiene un problema que no podemos resolver, escríbenos a ${mail} en un plazo de 14 días y te devolvemos el importe.`] },
      { h: 'Contenido digital', p: ['El PDF es un contenido digital que se entrega de inmediato. Al iniciar la descarga, aceptas que comience la ejecución, lo que pone fin al derecho de desistimiento; aun así, aplicamos la garantía anterior.'] },
    ],
  },
  legal: {
    title: 'Aviso legal',
    sections: [
      { h: 'Editor', p: publisher.length ? publisher : ['ConversaPDF'] },
      { h: 'Contacto', p: [mail] },
      { h: 'Alojamiento', p: [`${l.host.name}, ${l.host.address}`] },
      { h: 'Marcas', p: ['WhatsApp es una marca de WhatsApp LLC. ConversaPDF no está afiliado a WhatsApp ni a Meta.'] },
    ],
  },
};

const pt: Pages = {
  privacy: {
    title: 'Política de privacidade',
    sections: [
      { h: 'Sua conversa não sai do seu aparelho', p: ['O arquivo que você exporta do WhatsApp é lido e o PDF é criado diretamente no seu navegador. Não enviamos, não guardamos e não vemos suas conversas nem suas fotos.'] },
      { h: 'Pagamentos', p: ['Os pagamentos são processados pela Polar (polar.sh), que atua como revendedora oficial (Merchant of Record). A Polar trata seus dados de pagamento e seu e-mail conforme a própria política de privacidade. Nós recebemos apenas a confirmação do pagamento.'] },
      { h: 'Dados técnicos', p: ['Nosso provedor de hospedagem (Cloudflare) registra dados técnicos como o endereço IP para o funcionamento e a segurança do site. Medimos as visitas de forma anônima e sem cookies com o GoatCounter.'] },
      { h: 'Seus direitos', p: [`Você pode exercer seus direitos de acesso, correção e exclusão escrevendo para ${mail}.`] },
    ],
  },
  terms: {
    title: 'Termos de uso',
    sections: [
      { h: 'O serviço', p: ['O ConversaPDF converte em PDF as conversas exportadas do WhatsApp. A prévia é grátis; o PDF completo é pago uma única vez por conversa.'] },
      { h: 'Sua responsabilidade', p: ['Converta apenas conversas das quais você participa ou que tem o direito de usar, e respeite a privacidade dos outros participantes.'] },
      { h: 'Uso como prova', p: ['O ConversaPDF não é um serviço de certificação nem um escritório de advocacia. O valor de um documento como prova é decidido pelo tribunal.'] },
      { h: 'Compra', p: ['As compras são feitas pela Polar (polar.sh), revendedora oficial, cujos termos de compra também se aplicam.'] },
    ],
  },
  refund: {
    title: 'Política de reembolso',
    sections: [
      { h: 'Reembolso', p: [`Se o PDF não for gerado ou tiver um problema que não conseguimos resolver, escreva para ${mail} em até 14 dias e devolvemos o valor.`] },
      { h: 'Conteúdo digital', p: ['O PDF é um conteúdo digital entregue na hora. Ao iniciar o download, você concorda com o início da execução, o que encerra o direito de arrependimento; mesmo assim, aplicamos a garantia acima.'] },
    ],
  },
  legal: {
    title: 'Aviso legal',
    sections: [
      { h: 'Editor', p: publisher.length ? publisher : ['ConversaPDF'] },
      { h: 'Contato', p: [mail] },
      { h: 'Hospedagem', p: [`${l.host.name}, ${l.host.address}`] },
      { h: 'Marcas', p: ['WhatsApp é uma marca da WhatsApp LLC. O ConversaPDF não é afiliado ao WhatsApp nem à Meta.'] },
    ],
  },
};

const it: Pages = {
  privacy: {
    title: 'Informativa sulla privacy',
    sections: [
      { h: 'La tua chat non lascia il tuo dispositivo', p: ['Il file esportato da WhatsApp viene letto e il PDF viene creato direttamente nel tuo browser. Non carichiamo, non conserviamo e non vediamo le tue chat né le tue foto.'] },
      { h: 'Pagamenti', p: ['I pagamenti sono gestiti da Polar (polar.sh), che agisce come rivenditore ufficiale (Merchant of Record). Polar tratta i tuoi dati di pagamento e la tua email secondo la propria informativa. Noi riceviamo solo la conferma del pagamento.'] },
      { h: 'Dati tecnici', p: ['Il nostro fornitore di hosting (Cloudflare) registra dati tecnici come l’indirizzo IP per il funzionamento e la sicurezza del sito. Misuriamo le visite in modo anonimo e senza cookie con GoatCounter.'] },
      { h: 'I tuoi diritti', p: [`Puoi esercitare i tuoi diritti di accesso, rettifica e cancellazione scrivendo a ${mail}.`] },
    ],
  },
  terms: {
    title: 'Condizioni d’uso',
    sections: [
      { h: 'Il servizio', p: ['ConversaPDF converte in PDF le chat esportate da WhatsApp. L’anteprima è gratuita; il PDF completo si paga una sola volta per chat.'] },
      { h: 'La tua responsabilità', p: ['Converti solo chat di cui fai parte o che hai il diritto di usare, rispettando la privacy degli altri partecipanti.'] },
      { h: 'Uso come prova', p: ['ConversaPDF non è un servizio di certificazione né uno studio legale. Il valore di un documento come prova è deciso dal giudice.'] },
      { h: 'Acquisto', p: ['Gli acquisti avvengono tramite Polar (polar.sh), rivenditore ufficiale, le cui condizioni di acquisto si applicano anch’esse.'] },
    ],
  },
  refund: {
    title: 'Politica di rimborso',
    sections: [
      { h: 'Rimborso', p: [`Se il PDF non viene generato o ha un problema che non riusciamo a risolvere, scrivici a ${mail} entro 14 giorni e ti rimborsiamo.`] },
      { h: 'Contenuto digitale', p: ['Il PDF è un contenuto digitale consegnato subito. Avviando il download accetti l’inizio dell’esecuzione, che fa venir meno il diritto di recesso; applichiamo comunque la garanzia qui sopra.'] },
    ],
  },
  legal: {
    title: 'Note legali',
    sections: [
      { h: 'Editore', p: publisher.length ? publisher : ['ConversaPDF'] },
      { h: 'Contatto', p: [mail] },
      { h: 'Hosting', p: [`${l.host.name}, ${l.host.address}`] },
      { h: 'Marchi', p: ['WhatsApp è un marchio di WhatsApp LLC. ConversaPDF non è affiliato a WhatsApp né a Meta.'] },
    ],
  },
};

const fr: Pages = {
  privacy: {
    title: 'Politique de confidentialité',
    sections: [
      { h: 'Votre conversation ne quitte pas votre appareil', p: ["Le fichier exporté depuis WhatsApp est lu et le PDF est créé directement dans votre navigateur. Nous n'envoyons, ne conservons et ne voyons ni vos conversations ni vos photos."] },
      { h: 'Paiements', p: ["Les paiements sont gérés par Polar (polar.sh), revendeur officiel (Merchant of Record). Polar traite vos données de paiement et votre e-mail selon sa propre politique de confidentialité. Nous recevons seulement la confirmation du paiement."] },
      { h: 'Données techniques', p: ["Notre hébergeur (Cloudflare) enregistre des données techniques comme l'adresse IP pour le fonctionnement et la sécurité du site. Nous mesurons l'audience de façon anonyme et sans cookies avec GoatCounter."] },
      { h: 'Vos droits', p: [`Vous pouvez exercer vos droits d'accès, de rectification et de suppression en écrivant à ${mail}.`] },
    ],
  },
  terms: {
    title: "Conditions d'utilisation",
    sections: [
      { h: 'Le service', p: ["ConversaPDF convertit en PDF les conversations exportées depuis WhatsApp. L'aperçu est gratuit ; le PDF complet se paie une seule fois par conversation."] },
      { h: 'Votre responsabilité', p: ['Ne convertissez que des conversations auxquelles vous participez ou que vous avez le droit d’utiliser, en respectant la vie privée des autres participants.'] },
      { h: 'Usage comme preuve', p: ["ConversaPDF n'est ni un service de certification ni un cabinet d'avocats. La valeur de preuve d'un document est appréciée par le juge."] },
      { h: 'Achat', p: ["Les achats se font via Polar (polar.sh), revendeur officiel, dont les conditions d'achat s'appliquent également."] },
    ],
  },
  refund: {
    title: 'Politique de remboursement',
    sections: [
      { h: 'Remboursement', p: [`Si le PDF ne se génère pas ou présente un problème que nous ne pouvons pas résoudre, écrivez-nous à ${mail} sous 14 jours et nous vous remboursons.`] },
      { h: 'Contenu numérique', p: ["Le PDF est un contenu numérique livré immédiatement. En lançant le téléchargement, vous acceptez le début de l'exécution, ce qui met fin au droit de rétractation ; nous appliquons malgré tout la garantie ci-dessus."] },
    ],
  },
  legal: {
    title: 'Mentions légales',
    sections: [
      { h: 'Éditeur', p: publisher.length ? publisher : ['ConversaPDF'] },
      { h: 'Contact', p: [mail] },
      { h: 'Hébergement', p: [`${l.host.name}, ${l.host.address}`] },
      { h: 'Marques', p: ["WhatsApp est une marque de WhatsApp LLC. ConversaPDF n'est affilié ni à WhatsApp ni à Meta."] },
    ],
  },
};

const de: Pages = {
  privacy: {
    title: 'Datenschutzerklärung',
    sections: [
      { h: 'Dein Chat verlässt nicht dein Gerät', p: ['Die aus WhatsApp exportierte Datei wird direkt in deinem Browser gelesen und das PDF dort erstellt. Wir laden deine Chats und Fotos weder hoch, noch speichern oder sehen wir sie.'] },
      { h: 'Zahlungen', p: ['Zahlungen werden von Polar (polar.sh) abgewickelt, das als offizieller Verkäufer (Merchant of Record) auftritt. Polar verarbeitet deine Zahlungsdaten und deine E-Mail-Adresse gemäß seiner eigenen Datenschutzerklärung. Wir erhalten nur die Zahlungsbestätigung.'] },
      { h: 'Technische Daten', p: ['Unser Hosting-Anbieter (Cloudflare) erfasst technische Daten wie die IP-Adresse für den Betrieb und die Sicherheit der Website. Besuche messen wir anonym und ohne Cookies mit GoatCounter.'] },
      { h: 'Deine Rechte', p: [`Du kannst deine Rechte auf Auskunft, Berichtigung und Löschung per E-Mail an ${mail} ausüben.`] },
    ],
  },
  terms: {
    title: 'Allgemeine Geschäftsbedingungen',
    sections: [
      { h: 'Der Dienst', p: ['ConversaPDF wandelt aus WhatsApp exportierte Chats in PDF um. Die Vorschau ist kostenlos; das vollständige PDF wird einmalig pro Chat bezahlt.'] },
      { h: 'Deine Verantwortung', p: ['Wandle nur Chats um, an denen du teilnimmst oder die du verwenden darfst, und achte die Privatsphäre der anderen Teilnehmer.'] },
      { h: 'Verwendung als Beweis', p: ['ConversaPDF ist weder ein Beglaubigungsdienst noch eine Anwaltskanzlei. Über den Beweiswert eines Dokuments entscheidet das Gericht.'] },
      { h: 'Kauf', p: ['Käufe erfolgen über Polar (polar.sh), den offiziellen Verkäufer, dessen Kaufbedingungen ebenfalls gelten.'] },
    ],
  },
  refund: {
    title: 'Erstattungsrichtlinie',
    sections: [
      { h: 'Erstattung', p: [`Wenn das PDF nicht erstellt wird oder ein Problem hat, das wir nicht lösen können, schreib uns innerhalb von 14 Tagen an ${mail} und wir erstatten dir den Betrag.`] },
      { h: 'Digitale Inhalte', p: ['Das PDF ist ein digitaler Inhalt, der sofort geliefert wird. Mit dem Start des Downloads stimmst du dem Beginn der Ausführung zu, wodurch das Widerrufsrecht erlischt; die obige Garantie gilt trotzdem.'] },
    ],
  },
  legal: {
    title: 'Impressum',
    sections: [
      { h: 'Anbieter', p: publisher.length ? publisher : ['ConversaPDF'] },
      { h: 'Kontakt', p: [mail] },
      { h: 'Hosting', p: [`${l.host.name}, ${l.host.address}`] },
      { h: 'Marken', p: ['WhatsApp ist eine Marke der WhatsApp LLC. ConversaPDF ist weder mit WhatsApp noch mit Meta verbunden.'] },
    ],
  },
};

const en: Pages = {
  privacy: {
    title: 'Privacy policy',
    sections: [
      { h: 'Your chat never leaves your device', p: ['The file you export from WhatsApp is read and the PDF is built directly in your browser. We do not upload, store or see your chats or photos.'] },
      { h: 'Payments', p: ['Payments are handled by Polar (polar.sh), our Merchant of Record. Polar processes your payment details and email under its own privacy policy. We only receive the payment confirmation.'] },
      { h: 'Technical data', p: ['Our hosting provider (Cloudflare) logs technical data such as IP addresses to run and secure the site. We measure visits anonymously and without cookies with GoatCounter.'] },
      { h: 'Your rights', p: [`You can exercise your rights of access, correction and deletion by writing to ${mail}.`] },
    ],
  },
  terms: {
    title: 'Terms of use',
    sections: [
      { h: 'The service', p: ['ConversaPDF turns chats exported from WhatsApp into PDF. The preview is free; the full PDF is a one-time payment per chat.'] },
      { h: 'Your responsibility', p: ['Only convert chats you are part of or have the right to use, and respect the privacy of the other participants.'] },
      { h: 'Use as evidence', p: ['ConversaPDF is neither a certification service nor a law firm. The weight of a document as evidence is for the court to decide.'] },
      { h: 'Purchases', p: ['Purchases are made through Polar (polar.sh), our Merchant of Record, whose terms of sale also apply.'] },
    ],
  },
  refund: {
    title: 'Refund policy',
    sections: [
      { h: 'Refunds', p: [`If the PDF cannot be created or has a problem we cannot fix, write to ${mail} within 14 days and we will refund you.`] },
      { h: 'Digital content', p: ['The PDF is digital content delivered immediately. By starting the download you agree that performance begins, which ends the right of withdrawal; we still apply the guarantee above.'] },
    ],
  },
  legal: {
    title: 'Legal notice',
    sections: [
      { h: 'Publisher', p: publisher.length ? publisher : ['ConversaPDF'] },
      { h: 'Contact', p: [mail] },
      { h: 'Hosting', p: [`${l.host.name}, ${l.host.address}`] },
      { h: 'Trademarks', p: ['WhatsApp is a trademark of WhatsApp LLC. ConversaPDF is not affiliated with WhatsApp or Meta.'] },
    ],
  },
};

const all: Record<Locale, Pages> = { es, pt, it, fr, de, en };

export function legalPage(locale: Locale, slug: LegalSlug): LegalPage {
  return all[locale][slug];
}
