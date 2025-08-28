import { addGpu, showGPUData, checkRowData, indexSelector } from "./helper"

describe('GPU List app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.visit('')
  })

  it('debug env', () => {
  cy.log('Backend:', Cypress.env('BACKEND'))
})

  describe('Basic page access', function() {
    it('main page can be opened', function() {
      cy.contains('GPU List')
    })
  })

  describe('Testing the add form', function() {
    it('a new GPU can be added', function() {
      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'RTX 3060 Gaming X Trio',
        cores: 3584,
        tmus: 112,
        rops: 48,
        vram: 12,
        bus: 192,
        memtype: 'GDDR6',
        baseclock: 1320,
        boostclock: 1965,
        memclock: 15
      })
  
      cy.contains('MSI GeForce RTX 3060 Gaming X Trio')
    })

    it('an empty name cannot be added', function() {
      addGpu({
        manufacturer: ' ',
        gpuline: ' ',
        model: ' ',
        cores: 3584,
        tmus: 112,
        rops: 48,
        vram: 12,
        bus: 192,
        memtype: 'GDDR6',
        baseclock: 1320,
        boostclock: 1965,
        memclock: 15
      })

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Invalid GPU data')
      }).then(() => {
        cy.get('.gpu-data-table').should('not.exist')
      })
    })

    it('invalid specifications', function() {
      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'RTX 3060 Gaming X Trio',
        cores: 'no cores',
        tmus: -1,
        rops: 0,
        vram: 0,
        bus: -1,
        memtype: ' ',
        baseclock: 1320,
        boostclock: 1965,
        memclock: 15
      })
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Invalid GPU data')
      }).then(() => {
        cy.get('.gpu-data-table').should('not.exist')
      })
    })
  
    it('invalid clock speeds', function() {
      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'RTX 3060 Gaming X Trio',
        cores: 3584,
        tmus: 112,
        rops: 48,
        vram: 12,
        bus: 192,
        memtype: 'GDDR6',
        baseclock: -1,
        boostclock: 0,
        memclock: 'no clock'
      })

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Invalid GPU data')
      }).then(() => {
        cy.get('.gpu-data-table').should('not.exist')
      })
    })
  })

  describe('testing the GPU data table', function() {
    beforeEach(function() {
      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'RTX 3060 Gaming X Trio',
        cores: 3584,
        tmus: 112,
        rops: 48,
        vram: 12,
        bus: 192,
        memtype: 'GDDR6',
        baseclock: 1320,
        boostclock: 1965,
        memclock: 15
      })

      showGPUData('MSI GeForce RTX 3060 Gaming X Trio')
    })

    it('all GPU specifications are displayed when clicking the show button', function() {
      cy.get('.gpu-data-table thead tr th').should('contain', 'MSI GeForce RTX 3060 Gaming X Trio')
      checkRowData('CORES', 3584)
      checkRowData('TMUs', 112)
      checkRowData('ROPs', 48)
      checkRowData('VRAM', '12GB GDDR6')
      checkRowData('BUS WIDTH', '192 bit')
      checkRowData('BASE CLOCK', '1320 MHz')
      checkRowData('BOOST CLOCK', '1965 MHz')
      checkRowData('MEMORY CLOCK', '15 Gbps effective')
    })

    it('the theoretical performance is correct', function() {
      checkRowData('FP32(float)', '14.09 TFLOPS')
      checkRowData('TEXTURE RATE', '220.08 GTexel/s')
      checkRowData('PIXEL RATE', '94.32 GPixel/s')
      checkRowData('BANDWIDTH', '360.00 GB/s')
    })

    it('the GPU can be deleted', function() {
      cy.get('.gpu-data-table tbody #delete-gpu-button').click()
      cy.get('.gpu-data-table').should('not.exist')
    })
  })

  describe('the show all data button works', function() {
    beforeEach(function() {
      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'RTX 3060 Gaming X Trio',
        cores: 3584,
        tmus: 112,
        rops: 48,
        vram: 12,
        bus: 192,
        memtype: 'GDDR6',
        baseclock: 1320,
        boostclock: 1965,
        memclock: 15
      })

      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'GTX 970 OC',
        cores: 1664,
        tmus: 104,
        rops: 56,
        vram: 4,
        bus: 256,
        memtype: 'GDDR5',
        baseclock: 1102,
        boostclock: 1304,
        memclock: 7
      })

      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'GTX 650 OC',
        cores: 384,
        tmus: 32,
        rops: 16,
        vram: 1,
        bus: 128,
        memtype: 'GDDR5',
        baseclock: 1084,
        boostclock: 1084,
        memclock: 5
      })
    })

    it('it expands all tables on the page', function() {
      cy.get('.gpu-data-table')
        .eq(0)
        .then(($table) => {
          cy.wrap($table).find('thead tr th').should('contain', 'MSI GeForce RTX 3060 Gaming X Trio')
          cy.wrap($table)
            .find('button')
            .contains('Show')
            .click()
          checkRowData('CORES', 3584)
          checkRowData('TMUs', 112)
          checkRowData('ROPs', 48)
          checkRowData('VRAM', '12GB GDDR6')
          checkRowData('BUS WIDTH', '192 bit')
          checkRowData('BASE CLOCK', '1320 MHz')
          checkRowData('BOOST CLOCK', '1965 MHz')
          checkRowData('MEMORY CLOCK', '15 Gbps effective')
        })

      cy.get('.gpu-data-table')
        .eq(1)
        .then(($table) => {
          cy.wrap($table).find('thead tr th').should('contain', 'MSI GeForce GTX 970 OC')
          cy.wrap($table)
            .find('button')
            .contains('Show')
            .click()
          checkRowData('CORES', 1664)
          checkRowData('TMUs', 104)
          checkRowData('ROPs', 56)
          checkRowData('VRAM', '4GB GDDR5')
          checkRowData('BUS WIDTH', '256 bit')
          checkRowData('BASE CLOCK', '1102 MHz')
          checkRowData('BOOST CLOCK', '1304 MHz')
          checkRowData('MEMORY CLOCK', '7 Gbps effective')
        })

      cy.get('.gpu-data-table')
        .eq(2)
        .then(($table) => {
          cy.wrap($table).find('thead tr th').should('contain', 'MSI GeForce GTX 650 OC')
          cy.wrap($table)
            .find('button')
            .contains('Show')
            .click()
          checkRowData('CORES', 384)
          checkRowData('TMUs', 32)
          checkRowData('ROPs', 16)
          checkRowData('VRAM', '1GB GDDR5')
          checkRowData('BUS WIDTH', '128 bit')
          checkRowData('BASE CLOCK', '1084 MHz')
          checkRowData('BOOST CLOCK', '1084 MHz')
          checkRowData('MEMORY CLOCK', '5 Gbps effective')
        })
    })
  })

  describe('testing the index', function() {
    beforeEach(function() {
      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'RTX 3060 Gaming X Trio',
        cores: 3584,
        tmus: 112,
        rops: 48,
        vram: 12,
        bus: 192,
        memtype: 'GDDR6',
        baseclock: 1320,
        boostclock: 1965,
        memclock: 15
      })

      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'GTX 970 OC',
        cores: 1664,
        tmus: 104,
        rops: 56,
        vram: 4,
        bus: 256,
        memtype: 'GDDR5',
        baseclock: 1102,
        boostclock: 1304,
        memclock: 7
      })

      addGpu({
        manufacturer: 'MSI',
        gpuline: 'GeForce',
        model: 'GTX 650 OC',
        cores: 384,
        tmus: 32,
        rops: 16,
        vram: 1,
        bus: 128,
        memtype: 'GDDR5',
        baseclock: 1084,
        boostclock: 1084,
        memclock: 5
      })
    })

    it('the index can be shown', function() {
      cy.get('#page-index')
        .find('button')
        .contains('Show index')
        .click()

      cy.get('#page-index')
        .find('button')
        .should('contain', 'Hide index')
    })

    it('checking if the graphics cards are present in the index', function() {
      cy.get('#page-index')
        .find('#show-index-button')
        .contains('Show index')
        .click()

      cy.get('.page-index-list li')
        .eq(0)
        .contains('MSI GeForce RTX 3060 Gaming X Trio')

      cy.get('.page-index-list li')
        .eq(1)
        .contains('MSI GeForce GTX 970 OC')

      cy.get('.page-index-list li')
        .eq(2)
        .contains('MSI GeForce GTX 650 OC')
    })

    it('clicking on an index item', function() {
      cy.get('#page-index')
        .find('button')
        .contains('Show index')
        .click()

      indexSelector('MSI GeForce RTX 3060 Gaming X Trio')
    })

    it('the index can be hidden', function() {
      cy.get('#page-index')
        .find('button')
        .contains('Show index')
        .click()
        
      cy.get('#page-index')
        .find('button')
        .should('contain', 'Hide index')

      cy.get('#page-index')
        .find('button')
        .contains('Hide index')
        .click()

      cy.get('#page-index')
        .find('button')
        .should('contain', 'Show index')
    })

    it('the back to index button works properly', function() {
      cy.get('#page-index')
        .find('button')
        .contains('Show index')
        .click()

      indexSelector('MSI GeForce RTX 3060 Gaming X Trio')

      cy.get('.gpu-data-table')
        .eq(0)
        .parent()
        .find('.back-to-index-button')
        .click()

      cy.get('.page-index-list')
        .should('be.visible')
    })
  })
})