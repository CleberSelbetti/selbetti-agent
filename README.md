# Selbetti Agent Widget

Widget de chat em Web Component que permite integrar um agente de IA em qualquer site utilizando apenas uma tag HTML.

O componente cria automaticamente um botão flutuante que abre um chat e envia perguntas para uma API externa.

---

# Características

- Web Component nativo
- Shadow DOM (isolamento de CSS)
- Sem dependência de framework
- Integração simples via script
- Botão flutuante com suporte a drag
- Upload automático de arquivos de contexto

Funciona em qualquer aplicação web:

- HTML puro
- React
- Angular
- Vue
- Wordpress
- CMS em geral

---

# Estrutura do projeto

```
inovation-selbetti-agent-app
│
├─ package.json
├─ README.md
│
└─ src
   ├─ index.html
   └─ selbetti-agent.js
```

Descrição dos arquivos:

| Arquivo           | Descrição                             |
| ----------------- | ------------------------------------- |
| selbetti-agent.js | Web Component responsável pelo widget |
| index.html        | Página de exemplo para testes         |
| package.json      | Configuração do projeto               |

---

# Instalação

Inclua o script do widget na página, após 
<app-root></app-root>

Exemplo usando CDN:

```html
<script
   type="module"
   src="https://cdn.jsdelivr.net/gh/CleberSelbetti/selbetti-agent@v1.0.24/src/selbetti-agent.js"
></script>
```

---

# Uso

Adicione o componente no HTML da página.

```html
<selbetti-agent
  id="idAgent"
  api-url="https://geniahomol.duckdns.org"
  api-key="SUA_API_KEY"
  dataset-id="meu-dataset"
>
</selbetti-agent>
```

Após carregar a página, um botão flutuante aparecerá no canto inferior direito.

Ao clicar nele, o chat será aberto.

---

# Fluxo de funcionamento

1. O componente é carregado na página.
2. O botão flutuante é renderizado.
3. O usuário abre o chat.
4. A pergunta é enviada para a API.
5. A resposta é exibida na interface.

---

# Exemplo completo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />

    <script
         type="module"
         src="https://cdn.jsdelivr.net/gh/CleberSelbetti/selbetti-agent@v1.0.24/src/selbetti-agent.js"
      ></script>
  </head>

  <body>
    <h1>Site de exemplo</h1>

    <selbetti-agent
        id="idAgent"
        api-url="https://geniahomol.duckdns.org"
        api-key="123"
        dataset-id="meu-dataset"
      >
      </selbetti-agent>
  </body>
</html>
```

---

# Compatibilidade

Requer navegadores com suporte a:

- ES Modules
- Web Components
- Shadow DOM
- Fetch API

Compatível com:

- Chrome
- Edge
- Firefox
- Safari

---

# Licença

Copyright © Selbetti
