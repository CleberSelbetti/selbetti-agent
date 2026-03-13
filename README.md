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

Inclua o script do widget na página.

Exemplo usando CDN:

```html
<script
  type="module"
  src="https://cdn.seudominio.com/selbetti-agent/selbetti-agent.js"
></script>
```

---

# Uso

Adicione o componente no HTML da página.

```html
<selbetti-agent
  api-url="https://api.seudominio.com/chat"
  api-key="SUA_API_KEY"
  dataset-id="meu-dataset"
>
</selbetti-agent>
```

Após carregar a página, um botão flutuante aparecerá no canto inferior direito.

Ao clicar nele, o chat será aberto.

---

# Atributos do componente

| Atributo   | Obrigatório | Descrição                            |
| ---------- | ----------- | ------------------------------------ |
| api-url    | Sim         | URL da API que receberá as perguntas |
| api-key    | Sim         | Chave de autenticação                |
| dataset-id | Não         | Identificador do dataset             |

Exemplo:

```html
<selbetti-agent
  api-url="https://api.exemplo.com/agent"
  api-key="123456"
  dataset-id="faq"
>
</selbetti-agent>
```

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
      src="https://cdn.seudominio.com/selbetti-agent/selbetti-agent.js"
    ></script>
  </head>

  <body>
    <h1>Site de exemplo</h1>

    <selbetti-agent
      api-url="https://api.meuservico.com/chat"
      api-key="123456"
      dataset-id="faq"
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

# Segurança

Recomendações para produção:

- validar `api-key` no backend
- aplicar rate limit na API
- restringir domínios autorizados
- validar origem das requisições

---

# Licença

Copyright © Selbetti
