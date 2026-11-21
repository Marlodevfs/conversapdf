import type { Guide, GuideChrome } from './types';

export const chromePt: GuideChrome = {
  guidesTitle: 'Guias',
  guidesIntro: 'Passo a passo para exportar, imprimir e guardar suas conversas do WhatsApp.',
  related: 'Outros guias',
  toolTitle: 'Converta sua conversa agora',
  breadcrumbHome: 'Início',
};

export const guidesPt: Guide[] = [
  {
    key: 'iphone',
    slug: 'exportar-conversa-whatsapp-iphone',
    label: 'Exportar uma conversa do WhatsApp no iPhone',
    metaTitle: 'Como exportar uma conversa do WhatsApp em PDF no iPhone (2026) | ConversaPDF',
    metaDescription:
      'Exporte uma conversa do WhatsApp do seu iPhone e transforme em um PDF organizado, com datas, horários e fotos. Passo a passo, sem instalar nada.',
    h1: 'Como exportar uma conversa do WhatsApp em PDF no iPhone',
    intro:
      'O WhatsApp não tem um botão «Salvar como PDF», mas o iPhone permite exportar qualquer conversa em um arquivo .zip. Com esse arquivo, o ConversaPDF cria um PDF organizado em poucos segundos, direto no navegador.',
    sections: [
      {
        h: 'Exportar a conversa no iPhone',
        steps: [
          'Abra o WhatsApp e entre na conversa que você quer guardar.',
          'Toque no nome do contato ou do grupo, no topo da tela.',
          'Role até o fim e toque em «Exportar conversa».',
          'Escolha anexar mídia (para ter as fotos no PDF) ou sem mídia (só o texto, mais rápido).',
          'No menu de compartilhamento, toque em «Salvar em Arquivos» e escolha uma pasta.',
        ],
      },
      {
        h: 'Transformar o arquivo em PDF',
        steps: [
          'Abra conversapdf.com no Safari, no mesmo iPhone.',
          'Toque em «Escolher arquivo» e selecione o .zip que você salvou em Arquivos.',
          'Indique quem é você para que suas mensagens fiquem à direita e, se quiser, escolha um período.',
          'Veja a prévia grátis e baixe o PDF completo.',
        ],
      },
      {
        h: 'Dicas',
        bullets: [
          'O arquivo se chama «WhatsApp Chat - Nome.zip» e contém um _chat.txt com as mensagens, além das fotos.',
          'Não renomeie nem altere o .zip: a versão «Prova» calcula a impressão digital do arquivo original.',
          'Em conversas muito longas, o WhatsApp pode limitar a exportação às mensagens mais recentes (fala-se em cerca de 10.000 mensagens com mídia e 40.000 sem mídia).',
          'Você também pode enviar o .zip para o seu e-mail e abrir no computador.',
        ],
      },
    ],
    faqs: [
      { q: 'Onde fica a opção «Exportar conversa» no iPhone?', a: 'Nos dados da conversa: toque no nome do contato ou do grupo no topo e role até o fim da tela.' },
      { q: 'Preciso instalar algum aplicativo?', a: 'Não. Tudo é feito com o WhatsApp e o Safari. O ConversaPDF funciona no navegador e não envia sua conversa para nenhum servidor.' },
      { q: 'A outra pessoa fica sabendo?', a: 'Não. Exportar uma conversa não envia nenhuma notificação aos outros participantes.' },
    ],
  },
  {
    key: 'android',
    slug: 'exportar-conversa-whatsapp-android',
    label: 'Exportar uma conversa do WhatsApp no Android',
    metaTitle: 'Como exportar uma conversa do WhatsApp em PDF no Android (2026) | ConversaPDF',
    metaDescription:
      'Exporte uma conversa do WhatsApp do seu celular Android e transforme em PDF com nomes, datas, horários e fotos. Passo a passo, sem instalar nada.',
    h1: 'Como exportar uma conversa do WhatsApp em PDF no Android',
    intro:
      'No Android, o WhatsApp exporta a conversa como um arquivo de texto (.txt), às vezes acompanhado das fotos. O ConversaPDF transforma esses arquivos em um PDF claro e paginado, sem que a conversa saia do seu aparelho.',
    sections: [
      {
        h: 'Exportar a conversa no Android',
        steps: [
          'Abra o WhatsApp e entre na conversa.',
          'Toque nos três pontinhos ⋮ no canto superior direito.',
          'Toque em «Mais» e depois em «Exportar conversa».',
          'Escolha «Incluir mídia» para ter as fotos no PDF, ou «Sem mídia» para só o texto.',
          'Salve o resultado no Google Drive, em «Arquivos» ou envie para o seu e-mail.',
        ],
      },
      {
        h: 'Transformar os arquivos em PDF',
        steps: [
          'Abra conversapdf.com no Chrome.',
          'Toque em «Escolher arquivo» e selecione o .zip. Se o WhatsApp entregou o .txt e as fotos separados, selecione todos de uma vez.',
          'Indique quem é você e, se quiser, o período que interessa.',
          'Confira a prévia grátis e baixe o PDF completo.',
        ],
      },
      {
        h: 'Dicas',
        bullets: [
          'O arquivo de texto costuma se chamar «Conversa do WhatsApp com Nome.txt».',
          'Dependendo da versão do Android, as fotos vêm dentro de um .zip ou como arquivos soltos: o ConversaPDF aceita os dois.',
          'Alguns serviços de e-mail recusam anexos pesados: o Google Drive costuma ser mais confiável.',
        ],
      },
    ],
    faqs: [
      { q: 'Não encontro «Exportar conversa», e agora?', a: 'Atualize o WhatsApp e procure em ⋮ > Mais. Em alguns países a exportação não está disponível.' },
      { q: 'Dá para fazer tudo pelo celular?', a: 'Sim. O ConversaPDF funciona no Chrome para Android. Para conversas muito longas e cheias de fotos, o computador é mais rápido.' },
      { q: 'Minhas mensagens vão para a internet?', a: 'Não. Os arquivos são lidos e o PDF é criado no seu navegador.' },
    ],
  },
  {
    key: 'photos',
    slug: 'exportar-whatsapp-com-fotos',
    label: 'Exportar uma conversa do WhatsApp com fotos',
    metaTitle: 'Exportar uma conversa do WhatsApp em PDF com as fotos | ConversaPDF',
    metaDescription:
      'Como gerar um PDF de uma conversa do WhatsApp com as fotos no lugar certo, junto das mensagens. Exportação com mídia no iPhone e no Android.',
    h1: 'Exportar uma conversa do WhatsApp em PDF com as fotos',
    intro:
      'Uma conversa sem as fotos perde o contexto: o apartamento anunciado, o estrago no carro, o comprovante… O ConversaPDF coloca cada foto no lugar exato em que foi enviada.',
    sections: [
      {
        h: 'O essencial: exportar «com mídia»',
        p: [
          'As fotos só chegam ao PDF se o WhatsApp incluí-las na exportação. Ao tocar em «Exportar conversa», escolha a opção com mídia («Anexar mídia» no iPhone, «Incluir mídia» no Android).',
          'Se você escolher «Sem mídia», o PDF mostra onde havia uma foto, mas sem a imagem.',
        ],
      },
      {
        h: 'Passo a passo',
        steps: [
          'Exporte a conversa com mídia e salve o .zip (ou o .txt e as fotos).',
          'Abra conversapdf.com e selecione o .zip, ou todos os arquivos de uma vez.',
          'Confira no resumo quantas fotos foram encontradas.',
          'Abra a prévia grátis para ver as fotos no lugar.',
          'Baixe a versão «Com fotos» ou «Prova».',
        ],
      },
      {
        h: 'Bom saber',
        bullets: [
          'As fotos são reduzidas para o PDF não ficar pesado, mantendo boa qualidade para ler e imprimir.',
          'Áudios e vídeos não tocam em um PDF: eles aparecem indicados pelo nome do arquivo.',
          'Com mídia, o WhatsApp pode limitar a exportação às mensagens mais recentes (fala-se em cerca de 10.000).',
        ],
      },
    ],
    faqs: [
      { q: 'Por que minhas fotos não aparecem no PDF?', a: 'Provavelmente a conversa foi exportada «sem mídia», ou só o .txt foi selecionado. Exporte de novo com mídia e selecione o .zip completo.' },
      { q: 'As fotos ficam com boa qualidade?', a: 'Sim, o suficiente para ler, imprimir ou apresentar. Elas são reduzidas só para o PDF continuar leve.' },
      { q: 'As figurinhas aparecem?', a: 'As figurinhas aparecem como anexo com o nome do arquivo; as fotos normais aparecem como imagem.' },
    ],
  },
  {
    key: 'evidence',
    slug: 'conversa-whatsapp-como-prova',
    label: 'Usar uma conversa do WhatsApp como prova',
    metaTitle: 'Conversa do WhatsApp como prova: como apresentar | ConversaPDF',
    metaDescription:
      'Como preparar um PDF claro de uma conversa do WhatsApp para um advogado, um processo ou uma reclamação: exportação completa, datas, horários e impressão digital do arquivo.',
    h1: 'Conversa do WhatsApp como prova: como preparar',
    intro:
      'Locador, empresa, ex-companheiro, seguradora: muitos conflitos se resolvem com o que foi dito no WhatsApp. Uma pilha de prints é difícil de ler e fácil de contestar. Um documento completo e organizado ajuda muito mais o seu advogado.',
    sections: [
      {
        h: 'Por que só prints não bastam',
        bullets: [
          'Não mostram o contexto completo e podem parecer escolhidos a dedo.',
          'Nem sempre mostram a data, e a ordem se perde fácil.',
          'São difíceis de imprimir e de citar («ver página 4, mensagem das 19h20»).',
        ],
      },
      {
        h: 'Como preparar um documento sólido',
        steps: [
          'Exporte a conversa inteira pelo WhatsApp, com mídia se as fotos forem importantes.',
          'Guarde o arquivo exportado como está, sem abrir nem alterar, e guarde também o celular.',
          'No ConversaPDF, escolha a versão «Prova»: capa com participantes e período, horários com segundos e impressão digital SHA-256 do arquivo original.',
          'Entregue ao advogado o PDF e o arquivo original: com a impressão digital, dá para conferir que o arquivo não mudou.',
        ],
      },
      {
        h: 'O que um PDF não substitui',
        p: [
          'Quem decide se uma prova é aceita e quanto ela vale é o juiz. Se a outra parte contestar a conversa, no Brasil costuma-se recorrer a uma ata notarial em cartório ou a uma perícia técnica no celular. O ConversaPDF entrega um documento claro e verificável, mas não é uma certificação nem um aconselhamento jurídico: fale sempre com o seu advogado.',
        ],
      },
    ],
    faqs: [
      { q: 'O que é a impressão digital SHA-256?', a: 'É um código calculado a partir do arquivo exportado. Se alguém mudar uma única letra do arquivo, o código muda. Serve para mostrar que o original não foi alterado.' },
      { q: 'Posso escolher só um período?', a: 'Sim, dá para escolher a data de início e de fim. Para um processo, geralmente é melhor exportar tudo e destacar as partes importantes.' },
      { q: 'A outra pessoa vai saber que exportei a conversa?', a: 'Não, o WhatsApp não avisa os participantes.' },
    ],
  },
  {
    key: 'group',
    slug: 'exportar-grupo-whatsapp',
    label: 'Exportar um grupo do WhatsApp',
    metaTitle: 'Exportar um grupo do WhatsApp em PDF (com nomes e cores) | ConversaPDF',
    metaDescription:
      'Transforme a conversa de um grupo do WhatsApp em um PDF fácil de ler: cada participante com nome e cor, avisos do grupo, datas e fotos.',
    h1: 'Exportar um grupo do WhatsApp em PDF',
    intro:
      'Grupo do condomínio, da escola, do trabalho ou da família: um grupo acumula milhares de mensagens. O ConversaPDF transforma tudo em um documento claro, em que dá para ver quem disse o quê e quando.',
    sections: [
      {
        h: 'Exportar o grupo',
        steps: [
          'Abra o grupo no WhatsApp.',
          'No iPhone, toque no nome do grupo no topo; no Android, toque em ⋮ e depois em «Mais».',
          'Toque em «Exportar conversa» e escolha com ou sem mídia.',
          'Salve o arquivo e abra em conversapdf.com.',
        ],
      },
      {
        h: 'Como o grupo aparece no PDF',
        bullets: [
          'Cada participante aparece com o nome e uma cor própria.',
          'Os avisos do grupo («X adicionou Y», mudança de nome…) ficam centralizados, em cinza.',
          'Você pode indicar quem é para que suas mensagens fiquem à direita.',
          'Uma separação por dia ajuda a achar uma data específica.',
        ],
      },
      {
        h: 'Dicas para grupos grandes',
        bullets: [
          'Use as datas «De» e «Até» para ficar só com o período que importa.',
          'Em grupos com muitas fotos, o computador é mais rápido que o celular.',
        ],
      },
    ],
    faqs: [
      { q: 'Qualquer membro pode exportar o grupo?', a: 'Sim, qualquer participante pode exportar o histórico que está no próprio celular.' },
      { q: 'Aparecem os nomes ou os números?', a: 'Do jeito que aparecem no seu celular: o nome se o contato estiver salvo, ou o número se não estiver.' },
      { q: 'Existe limite de participantes?', a: 'Não. O ConversaPDF funciona com grupos de qualquer tamanho.' },
    ],
  },
  {
    key: 'print',
    slug: 'imprimir-conversa-whatsapp',
    label: 'Imprimir uma conversa do WhatsApp',
    metaTitle: 'Como imprimir uma conversa do WhatsApp (sem prints) | ConversaPDF',
    metaDescription:
      'O jeito mais limpo de imprimir uma conversa do WhatsApp: um PDF paginado com nomes, datas, horários e fotos, pronto para imprimir em casa ou na gráfica.',
    h1: 'Como imprimir uma conversa do WhatsApp',
    intro:
      'O WhatsApp não tem botão de imprimir. Tirar prints e colar em um documento leva horas, e o resultado fica difícil de ler. O mais rápido é transformar a conversa em um PDF paginado e depois imprimir.',
    sections: [
      {
        h: 'Passo a passo',
        steps: [
          'Exporte a conversa pelo WhatsApp («Exportar conversa»).',
          'Abra o arquivo em conversapdf.com e escolha o período que quer imprimir.',
          'Baixe o PDF.',
          'Abra no computador ou no celular e imprima, ou leve em um pen drive até uma gráfica ou papelaria.',
        ],
      },
      {
        h: 'Para a impressão ficar boa',
        bullets: [
          'O PDF vem em formato A4, com margens e número de página em todas as folhas.',
          'Os fundos são claros para não gastar muita tinta.',
          'Se você só precisa de algumas páginas, escolha um período mais curto antes de baixar.',
        ],
      },
    ],
    faqs: [
      { q: 'Posso imprimir só uma parte da conversa?', a: 'Sim. Escolha as datas «De» e «Até» antes de gerar o PDF.' },
      { q: 'As fotos também saem na impressão?', a: 'Sim, se você exportou com mídia e escolheu a versão «Com fotos» ou «Prova».' },
      { q: 'E se eu não tiver impressora?', a: 'Envie o PDF por e-mail ou leve em um pen drive até uma gráfica ou papelaria.' },
    ],
  },
  {
    key: 'txt',
    slug: 'abrir-arquivo-chat-txt-whatsapp',
    label: 'Abrir o arquivo _chat.txt do WhatsApp',
    metaTitle: 'Como abrir o arquivo _chat.txt do WhatsApp e transformar em PDF | ConversaPDF',
    metaDescription:
      'Exportou uma conversa do WhatsApp e ficou com um _chat.txt difícil de ler? Veja como abrir e transformar em um PDF claro, com datas, nomes e fotos.',
    h1: 'Como abrir o arquivo _chat.txt do WhatsApp',
    intro:
      'Quando você exporta uma conversa, o WhatsApp cria um arquivo de texto: _chat.txt no iPhone ou «Conversa do WhatsApp com Nome.txt» no Android. Ele abre em qualquer editor de texto, mas vira uma lista enorme de linhas difícil de ler.',
    sections: [
      {
        h: 'O que tem dentro do arquivo',
        bullets: [
          'Uma linha por mensagem: data, horário, nome de quem escreveu e o texto.',
          'Referências às fotos e áudios («<anexado: …jpg>» ou «IMG-…jpg (arquivo anexado)»).',
          'Avisos do sistema: criptografia, mudanças no grupo, mensagens apagadas.',
        ],
      },
      {
        h: 'Abrir de um jeito legível',
        steps: [
          'Se você tem um .zip, não precisa descompactar: selecione direto em conversapdf.com.',
          'Se só tem o .txt, selecione do jeito que está (e as fotos junto, se estiverem separadas).',
          'O ConversaPDF reconhece o formato do iPhone e do Android em qualquer idioma e mostra como uma conversa.',
          'Baixe o resultado em PDF.',
        ],
      },
      {
        h: 'E com um editor de texto?',
        p: [
          'No Windows dá para abrir no Bloco de Notas e no Mac no TextEdit. Serve para procurar uma frase, mas para ler, imprimir ou mandar para alguém, um PDF organizado é muito mais prático.',
        ],
      },
    ],
    faqs: [
      { q: 'O arquivo mostra caracteres estranhos, é normal?', a: 'Editores antigos às vezes leem mal acentos e emojis. O ConversaPDF lê o arquivo corretamente em UTF-8.' },
      { q: 'Dá para converter um .txt sem as fotos?', a: 'Sim. O PDF indica onde havia uma foto, com o nome do arquivo.' },
      { q: 'Funciona com exportações antigas?', a: 'Sim, desde que seja o arquivo original exportado pelo WhatsApp.' },
    ],
  },
  {
    key: 'save',
    slug: 'guardar-conversa-whatsapp',
    label: 'Guardar uma conversa do WhatsApp para sempre',
    metaTitle: 'Como guardar uma conversa do WhatsApp para sempre | ConversaPDF',
    metaDescription:
      'Guarde suas conversas importantes do WhatsApp em um PDF que abre em qualquer aparelho, com as fotos, mesmo se você trocar de celular ou apagar o app.',
    h1: 'Como guardar uma conversa do WhatsApp para sempre',
    intro:
      'O backup do WhatsApp (iCloud ou Google Drive) só serve para restaurar o app: não dá para ler como um documento. Para guardar de verdade uma conversa com alguém importante, o melhor é transformá-la em PDF.',
    sections: [
      {
        h: 'Por que um PDF',
        bullets: [
          'Abre em qualquer computador, celular ou tablet, hoje e daqui a muitos anos.',
          'Não depende do WhatsApp nem do seu celular.',
          'Pode ser impresso, encadernado ou enviado para a família.',
        ],
      },
      {
        h: 'Como fazer',
        steps: [
          'Exporte a conversa com mídia para guardar as fotos.',
          'Transforme em PDF em conversapdf.com com a versão «Com fotos».',
          'Guarde o PDF e o .zip original em dois lugares diferentes (por exemplo, no computador e na nuvem).',
          'Repita a exportação de vez em quando se a conversa continuar.',
        ],
      },
    ],
    faqs: [
      { q: 'O backup do WhatsApp não basta?', a: 'Ele serve para restaurar as conversas em um celular, mas não é um arquivo legível. Se um dia você parar de usar o WhatsApp, não vai conseguir lê-lo.' },
      { q: 'Dá para imprimir como um livro?', a: 'Sim. O PDF é A4 e paginado: dá para imprimir e encadernar em uma gráfica.' },
      { q: 'Funciona com conversas de anos atrás?', a: 'Sim, desde que elas ainda estejam no seu WhatsApp para serem exportadas.' },
    ],
  },
];
