# Projeto com testes automatizados, integração contínua e geração de relatórios

Este projeto é uma aplicação web simples com alguns bugs inseridos, desenvolvida com o objetivo de demonstrar a execução de **testes automatizados**, **integração contínua (CI)** e **entrega contínua (CD)**.

A cada commit na branch `main`, o **GitHub Actions** executa uma pipeline que:

1. Roda os testes automatizados com **Cypress**;
2. Gera um relatório de execução com **Mochawesome**;
3. Faz o upload dos relatórios para um bucket **AWS S3**;
4. Publica automaticamente a aplicação no **AWS Amplify**.

---

## Funcionalidades

- Geração de arquivos fictícios com nome, tamanho e extensão definidos.
- Testes E2E com Cypress.
- Geração de relatório dos testes com Mochawesome.
- Envio do relatório e screenshots para o AWS S3.
- Pipeline CI/CD com execução automática dos testes e deploy para AWS Amplify.

---

## Testes Automatizados

Os testes estão localizados em `cypress/e2e/testes_geracao_arquivos.cy.js`, com os seguintes cenários:

1. ✅ **Geração de arquivos com sucesso**
2. ❌ **Validação da mensagem de tamanho máximo de 2GB com botão "Gerar" desabilitado**
3. ✅ **Verificação da seleção de todas as extensões**
4. ✅ **Validação apenas da mensagem de tamanho máximo de 2GB na geração de arquivo**

---

O arquivo `cypress.config.js` define a estrutura de testes, incluindo:

- Diretórios de testes e relatórios;
- Configuração de `reporter` com **mochawesome**;
- Caminho de saída dos relatórios e screenshots em `cypress/reports/`.

---

## Scripts disponíveis

```json
"scripts": {
  "cypress:run": "cypress run",
  "merge-reports": "mochawesome-merge cypress/reports/*.json > cypress/reports/mochawesome.json || true",
  "generate-report": "marge cypress/reports/mochawesome.json -f report -o cypress/reports || true",
  "posttest": "npm run merge-reports && npm run generate-report",
  "test:full": "npm run cypress:run && npm run posttest"
}
```
---

Para rodar os testes localmente:

```bash
npm ci
npx http-server . -p 8080
npx cypress open # Para executar na interface do Cypress
npm run test:full # Se preferir executar sem a interface do Cypress
```
Após a execução, os relatórios estarão disponíveis em `cypress/reports/`

---

## Pipeline de Testes e Deploy

O pipeline está definido em `.github/workflows/deploy-and-tests.yml` com os seguintes passos:

1. Clona o repositório
2. Instala dependências
3. Inicia servidor local para acessar a aplicação comas últimas alterações (`http-server`)
4. Executa testes Cypress (`npm run test:full`). Nesta etapa, a opção para o pipeline continuar em casos de falha nos testes foi habilitada;
5. Faz upload dos relatórios para o S3
6. Realiza o deploy para o AWS Amplify com monitoramento de status

---

Os relatórios e os screenshots são gerados em `cypress/reports/`.

---

## Estrutura de pastas

```
├── index.html
├── package.json
├── package-lock.json
├── cypress.config.js
├── cypress/
│   ├── e2e/
│   │   └── testes_geracao_arquivos.cy.js
│   └── support/
│   │   └── e2e.js
│   │   └── commands.js
│   └── fixtures/
├── .github/
│   └── workflows/
│       └── deploy-and-tests.yml
```

---

## Tecnologias

- [Cypress](https://www.cypress.io/)
- [Mochawesome](https://github.com/adamgruber/mochawesome)
- [GitHub Actions](https://github.com/features/actions)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [http-server](https://www.npmjs.com/package/http-server)
- HTML5 / JavaScript