export const roadmap = () => {
  return {
    assuntos: [
      {
        titulo: 'HTML',
        descricao:
          'Hypertext Markup Language é uma linguagem de marcação usada para estruturar e se comunicar conteúdo na web. É o elemento básico da construção da estrutura de uma página, permitindo que os desenvolvedores criem layouts, adicione título, subtítulo, parágrafos, imagens, vídeos, formulários, tabelas, links entre páginas, etc. A linguagem HTML é responsável por fornecer a estrutura para que o conteúdo seja exibido na página. É uma linguagem de marcação, não de programação, ou seja, não realiza operações lógicas ou matemáticas, apenas define como o conteúdo deve ser exibido.',
        conteudo: [
          'Elementos semânticos (header, nav, main, section, article, aside, footer)',
          'Atributos comuns (id, class, style, title)',
          'Tags para texto e cores (p, span, em, strong, u, i, b, color, font-size)',
          'Estruturas de dados (table, tr, th, td)',
          'Formulários (form, input, textarea, select, button)'
        ],
        documentacao: [
          {
            titulo: 'MDN Web Docs - HTML',
            url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML'
          },
          {
            titulo: 'W3Schools - HTML',
            url: 'https://www.w3schools.com/html/'
          }
        ]
      },
      {
        titulo: 'CSS',
        descricao:
          'Cascading Style Sheets é uma linguagem de estilo usada para adicionar visualizações a um website. Ela permite mudar layout e aparência da página, como cores, fontes, espaçamentos, etc. Com ela, os desenvolvedores podem criar layouts personalizados, sem ter que mexer na estrutura da página em si. Além disso, também é possível adicionar animações, transições e outros efeitos visuais. A linguagem CSS é baseada em regras, chamadas de seletores, que permitem a aplicação de estilos a elementos HTML específicos.',
        conteudo: [
          'Séletor (class, id, tag, atributo)',
          'Propriedades comuns (color, background-color, font-size, text-align)',
          'Modelo de caixa (box-sizing, padding, margin, border)',
          'Posicionamento de elementos (position, top, right, bottom, left)',
          'Efeitos e animações'
        ],
        documentacao: [
          {
            titulo: 'MDN Web Docs - CSS',
            url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS'
          },
          {
            titulo: 'W3Schools - CSS',
            url: 'https://www.w3schools.com/css/'
          }
        ]
      },
      {
        titulo: 'JavaScript',
        descricao:
          'JavaScript é uma linguagem de programação interpretada, usada para adicionar interatividade a um website. Ela permite que os desenvolvedores criem scripts que sejam executados no cliente (navegador), permitindo interações com o usuário, realizar requisições HTTP, manipular elementos HTML, etc. Com ela, é possível criar sites dinâmicos, realizar efeitos visuais, calcular valores matemáticos, verificar condições de negócios, entre outras funcionalidades. A linguagem JavaScript é usada em ambos os lados do cliente (navegador) e servidor.',
        conteudo: [
          'Tipos de dados',
          'Variáveis',
          'Funções',
          'Condicionais (if, else)',
          'Laços de repetição (for, while)',
          'Arrays',
          'Objetos'
        ],
        documentacao: [
          {
            titulo: 'MDN Web Docs - JavaScript',
            url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'
          },
          {
            titulo: 'W3Schools - JavaScript',
            url: 'https://www.w3schools.com/js/'
          }
        ]
      },
      {
        titulo: 'React',
        descricao:
          'React é uma biblioteca de JavaScript usada para criar interfaces de usuário em aplicativos web e mobile. Ela permite que os desenvolvedores criem componentes reutilizáveis, permitindo a criação de interface de usuário complexas com facilidade. Com ela, é possível atualizar partes da página sem recarregar toda a página. A biblioteca React é amplamente usada em sites web e aplicativos mobile.',
        conteudo: [
          'Componentes (JSX)',
          'Propriedades',
          'Estado',
          'Métodos de ciclo de vida',
          'Context API'
        ],
        documentacao: [
          {
            titulo: 'React Documentation',
            url: 'https://pt-br.reactjs.org/docs/getting-started.html'
          },
          {
            titulo: 'W3Schools - React',
            url: 'https://www.w3schools.com/react/'
          }
        ]
      },
      {
        titulo: 'Node.js',
        descricao:
          'Node.js é um ambiente de execução para JavaScript no lado do servidor. Ele permite que os desenvolvedores criem scripts em JavaScript que sejam executados no servidor, permitindo a criação de servidores web, gerenciamento de banco de dados, etc. Com ele, é possível criar aplicativos web dinâmicos e escaláveis.',
        conteudo: [
          'Express.js',
          'Frameworks (Koa.js, Hapi)',
          'Gerenciamento de banco de dados',
          'Autenticação e autorização'
        ],
        documentacao: [
          {
            titulo: 'Node.js Documentation',
            url: 'https://nodejs.org/en/docs/'
          },
          {
            titulo: 'W3Schools - Node.js',
            url: 'https://www.w3schools.com/nodejs/'
          }
        ]
      },
      {
        titulo: 'MySQL',
        descricao:
          'MySQL é um gerenciador de banco de dados relacional. Ele permite que os desenvolvedores armazenem e recuperem dados em uma estrutura lógica, permitindo a criação de tabelas, índices, relacionamentos entre tabelas, etc.',
        conteudo: [
          'Criando e manipulando tabelas',
          'Inserindo, atualizando e excluindo dados',
          'Realizando consultas SQL'
        ],
        documentacao: [
          {
            titulo: 'MySQL Documentation',
            url: 'https://dev.mysql.com/doc/refman/8.0/en/'
          },
          {
            titulo: 'W3Schools - MySQL',
            url: 'https://www.w3schools.com/sql/'
          }
        ]
      },
      {
        titulo: 'HTML5',
        descricao:
          'HTML5 é a especificação atual do padrão HTML (HyperText Markup Language). Ela permite que os desenvolvedores criem conteúdo web estruturado, com recurso a elementos e atributos específicos. Além disso, também é possível adicionar recursos como áudio, vídeo, canvas, etc.',
        conteudo: ['Elementos básicos', 'Elementos de formulário', 'Recurso de mídia'],
        documentacao: [
          {
            titulo: 'W3Schools - HTML5',
            url: 'https://www.w3schools.com/html/'
          },
          {
            titulo: 'MDN Web Docs - HTML5',
            url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML'
          }
        ]
      },
      {
        titulo: 'Flexbox',
        descricao:
          'Flexbox é um modelo de layout para elementos flexíveis. Ele permite que os desenvolvedores criem layouts complexos, com recurso a propriedades como justificação, alinhamento, espaçamento e ordenação.',
        conteudo: ['Propriedades básicas', 'Justificação', 'Alinhamento'],
        documentacao: [
          {
            titulo: 'W3Schools - Flexbox',
            url: 'https://www.w3schools.com/css/css3_flexbox.asp'
          },
          {
            titulo: 'MDN Web Docs - Flexbox',
            url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/flex'
          }
        ]
      },
      {
        titulo: 'Bootstrap',
        descricao:
          'Bootstrap é um framework de front-end para desenvolvimento web. Ele permite que os desenvolvedores criem layouts e componentes reutilizáveis com facilidade, sem ter que mexer na estrutura da página em si.',
        conteudo: ['Componentes básicos', 'Grid System', 'Recurso de mídia'],
        documentacao: [
          {
            titulo: 'Bootstrap Documentation',
            url: 'https://getbootstrap.com/docs/4.0/getting-started/introduction/'
          },
          {
            titulo: 'W3Schools - Bootstrap',
            url: 'https://www.w3schools.com/bootstrap/default.asp'
          }
        ]
      },
      {
        titulo: 'Angular',
        descricao:
          'Angular é um framework de JavaScript para desenvolvimento web. Ele permite que os desenvolvedores criem interfaces de usuário complexas, com recurso a componentes reutilizáveis e serviços.',
        conteudo: ['Componentes (TS)', 'Serviços', 'Módulos'],
        documentacao: [
          {
            titulo: 'Angular Documentation',
            url: 'https://angular.io/docs/ts/latest/'
          },
          {
            titulo: 'W3Schools - Angular',
            url: 'https://www.w3schools.com/angular/default.asp'
          }
        ]
      }
    ]
  }
}
