/// <reference types="cypress"/>

describe('Testes - Arquivos e Erros', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.viewport(1366, 768)
  });

  // Cenario 1
  it('Gerar arquivos - Validar sucesso', () => {
    cy.get('#filename').type('ArquivoTeste')
    cy.get('#filesize').type('10')
    cy.get('#sizeUnit').select('MB')
    cy.get('#tar').click()
    cy.get('#pdf').click()
    cy.get('#png').click()
    cy.get('#generateBtn').click()
    cy.get('#progressText').should('contain.text', 'Arquivos gerados com sucesso!');
    cy.get('#downloadZip').should('contain.text', 'Baixar Todos (ZIP)');
    cy.screenshot();
  });

  // Cenario 2
  it('Erro - Definir tamanho para 10GB', () => {
    cy.get('#filename').type('ArquivoTeste')
    cy.get('#filesize').type('10')
    cy.get('#sizeUnit').select('GB')
    cy.get('#size-error').should('contain.text', 'O tamanho máximo para geração em navegador é de aproximadamente 2GB.') // Mensagem será exibida
    cy.get('#generateBtn').should('be.disabled') // Botão nao será desabilitado e o teste falhará
    cy.screenshot();
  });

  // Cenario 3
  it('Gerar arquivos - Seleção das extensões', () => {
    cy.get('#selectAll').click();
    cy.get('#extensionsGrid input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should('be.checked');
    });
    cy.screenshot();
  });

  // Cenario 4
  it('Validar mensagem de tamanho máximo 2GB', () => {
    cy.get('#filename').type('Teste')
    cy.get('#filesize').type('3000')
    cy.get('#sizeUnit').select('MB')
    cy.get('#generateBtn').click()
    cy.get('#size-error').should('contain.text', 'O tamanho máximo para geração em navegador é de aproximadamente 2GB.');
    cy.screenshot();
  });

})