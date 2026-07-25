# Detalhes dos alertas Dependabot (referência)

Para facilitar futuras correções, seguem exemplos com os alertas tratados:

- **`mongoose`** (`server/package.json`)
  - Advisory: **GHSA-664h-wqgq-64gw**
  - Problema: prototype pollution em casting de update
  - Faixa vulnerável: `>=8.0.0 <8.24.1`
  - Versão segura aplicada: **`8.24.1`**

- **`postcss`** (`client/package.json`)
  - Advisory: **GHSA-r28c-9q8g-f849**
  - Problema: path traversal no carregamento automático de source map
  - Faixa vulnerável: `<=8.5.17`
  - Versão segura aplicada: **`8.5.23`**

- **`brace-expansion`** (`client/package-lock.json`, transitiva)
  - Problema: DoS por expansão exponencial de grupos consecutivos `{}`
  - Faixa vulnerável: `<1.1.16`
  - Versão segura aplicada: **`1.1.16`**
