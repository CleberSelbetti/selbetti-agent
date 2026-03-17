# Selbetti Agent Widget

![version](https://img.shields.io/badge/version-1.0.24-blue)
![license](https://img.shields.io/badge/license-Selbetti-lightgrey)
![status](https://img.shields.io/badge/status-stable-green)

Widget de chat baseado em **Web Components** que permite integrar um agente de IA em qualquer site utilizando apenas uma tag HTML.

O componente renderiza automaticamente um botão flutuante que abre um chat e envia mensagens para uma API externa.

---

## ✨ Características

* Web Component nativo
* Uso de Shadow DOM (isolamento de CSS)
* Sem dependência de frameworks
* Integração simples via script
* Botão flutuante com suporte a drag
* Upload automático de arquivos de contexto

Compatível com qualquer aplicação web:

* HTML puro
* React
* Angular
* Vue
* Wordpress
* CMS em geral

---

## 📦 Instalação

Inclua o script do widget na sua página HTML:

```html
<script
  type="module"
  src="https://dyq0rpds5yz5d.cloudfront.net"
></script>
```

---

## ⚙️ Uso básico

```html
<selbetti-agent
  id="idAgent"
  api-url="https://geniahomol.duckdns.org"
  api-key="SUA_API_KEY"
  dataset-id="meu-dataset"
>
</selbetti-agent>
```

> ⚠️ **Importante:** A `API KEY` deve ser fornecida pela equipe responsável da Selbetti.

Após o carregamento da página, um botão flutuante será exibido no canto inferior direito.
Ao clicar, o chat será aberto automaticamente.

---

## 🔧 Atributos do componente

| Atributo   | Tipo   | Obrigatório | Descrição                        |
| ---------- | ------ | ----------- | -------------------------------- |
| api-url    | string | Sim         | URL da API                       |
| api-key    | string | Sim         | Chave de autenticação            |
| dataset-id | string | Sim         | Identificador do dataset         |
| id         | string | Não         | Identificador do elemento no DOM |

---

## 📦 Carregando dados de contexto

Você pode injetar dados dinamicamente no componente:

```html
<script>
  window.addEventListener("DOMContentLoaded", async () => {
    const comp = document.getElementById("idAgent");

    if (!comp) {
      console.error("Elemento idAgent não encontrado");
      return;
    }

    try {
      const [schema, data] = await Promise.all([
        fetch("dicionario_dados.json").then((r) => r.json()),
        fetch("precificacao.json").then((r) => r.json()),
      ]);

      comp.data = {
        file1: schema,
        file2: data,
      };
    } catch (err) {
      console.error("Erro ao carregar arquivos:", err);
    }
  });
</script>
```

---

## 🔄 Fluxo de funcionamento

1. O componente é carregado na página
2. O botão flutuante é renderizado
3. O usuário abre o chat
4. A mensagem é enviada para a API
5. A resposta é exibida na interface

---

## 📌 Exemplos de uso

### HTML puro

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />

    <script type="module" src="https://dyq0rpds5yz5d.cloudfront.net"></script>
  </head>

  <body>
    <h1>Site de exemplo</h1>

    <selbetti-agent
      id="idAgent"
      api-url="https://geniahomol.duckdns.org"
      api-key="SUA_API_KEY"
      dataset-id="meu-dataset"
    >
    </selbetti-agent>
  </body>
</html>
```

---

### React

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://dyq0rpds5yz5d.cloudfront.net";
      document.body.appendChild(script);
  }, []);

  return (
    <selbetti-agent
      api-url="https://geniahomol.duckdns.org"
      api-key="SUA_API_KEY"
      dataset-id="meu-dataset"
    />
  );
}

export default App;
```

---

### Vue

```html
<template>
  <selbetti-agent
    api-url="https://geniahomol.duckdns.org"
    api-key="SUA_API_KEY"
    dataset-id="meu-dataset"
  />
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.type = "module";
  script.src =
    "https://dyq0rpds5yz5d.cloudfront.net";
  document.body.appendChild(script);
});
</script>
```

---

### Angular

```ts
// app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Site Angular</h1>

    <selbetti-agent
      api-url="https://geniahomol.duckdns.org"
      api-key="SUA_API_KEY"
      dataset-id="meu-dataset">
    </selbetti-agent>
  `
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://dyq0rpds5yz5d.cloudfront.net';
    document.body.appendChild(script);
  }

}
```

---

## 📁 Estrutura do projeto

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

### Descrição dos arquivos

| Arquivo           | Descrição                             |
| ----------------- | ------------------------------------- |
| selbetti-agent.js | Web Component responsável pelo widget |
| index.html        | Página de exemplo para testes         |
| package.json      | Configuração do projeto               |

---

## 🌐 Compatibilidade

Requer navegadores com suporte a:

* ES Modules
* Web Components
* Shadow DOM
* Fetch API

### Navegadores suportados

* Chrome
* Edge
* Firefox
* Safari

---

## 🛠️ Configuração avançada

Você pode expandir o comportamento do widget via propriedades JavaScript:

```js
const agent = document.getElementById("idAgent");

agent.data = {
  file1: {...},
  file2: {...}
};
```

---

## 📄 Licença

Copyright © Selbetti
