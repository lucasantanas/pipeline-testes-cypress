const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      mochawesome(on);  // Inicializando o Mochawesome
    },
    specPattern: 'cypress/e2e/**/*.cy.js', // Padrão dos arquivos de teste
    baseUrl: 'http://localhost:8080', // URL do site
    screenshotsFolder: 'cypress/reports/screenshots', // Diretório para salvar as screenshots
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports', // Diretório dos relatórios
      html: true,        // Gerar relatório HTML
      json: true,        // Gerar JSON
      charts: true,      // Gerar gráficos
      embeddedScreenshots: true, // Embutir screenshots no relatório
      inlineAssets: true, // Incluir assets diretamente no HTML
      reportFilename: `relatorio-${new Date().toISOString().replace(/[:.]/g, '-')}`,  // Nome do relatório
    },
    screenshotOnRunFailure: true,
    screenshots: {
      takeOnFailures: true,
      capture: 'fullPage',
      name: (test) => {
        const timestamp = new Date().toISOString().slice(0, 10);  // Formato YYYY-MM-DD
        const testName = test.title.replace(/[^a-zA-Z0-9]/g, '-');  // Substituindo caracteres especiais
        return `${timestamp}-${testName}-screenshot.png`;  // Nome único com timestamp e nome do teste
      }
    },
    video: false
  },
});
