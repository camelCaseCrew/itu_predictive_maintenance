import 'cypress-iframe';

const dimensions = require('../dimensions.js')
// Home page tests

describe('Homepage tab title', () => {
  it('Tab title equals "PredictIT - Home"', () => {
    cy.visit('http://localhost:3003/')
    cy.title().should('eq', "PredictIT - Home")
  })
})

describe('Presence of bar graph test', () => {
  Object.values(dimensions).map((key, i) => {
    it('Tests that the critical grafana bar graph is on the page', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Critical-goto-graph-id').should('exist')
    })
  })
})
describe('Presence of bar graph test', () => {
  Object.values(dimensions).map((key, i) => {
    it('Tests that the risky grafana bar graph is on the page', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Risk-goto-graph-id').should('exist')
    })
  })
})
describe('Presence of bar graph test', () => {
  Object.values(dimensions).map((key, i) => {
    it('Tests that the healthy grafana bar graph is on the page', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Healthy-goto-graph-id').should('exist')
    })
  })
})

//Home Page - Graph Redirection

describe('Critical Graph goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Graph goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Critical-goto-graph-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Critical Graph filters for Critical', () => {
  Object.values(dimensions).map((key, i) => {
    it('Graph goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Critical-goto-graph-id]').click()
      cy.wait(1000)
      cy.get('#iframeContainer').children().invoke('attr', 'src').should('contain', 'var-risk_group=critical')
    })
  })
})

describe('Risk Graph goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Graph goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Risk-goto-graph-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Risk Graph filters for Risk', () => {
  Object.values(dimensions).map((key, i) => {
    it('Graph goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Risk-goto-graph-id]').click()
      cy.wait(1000)
      cy.get('#iframeContainer').children().invoke('attr', 'src').should('contain', 'var-risk_group=risk')
    })
  })
})

describe('Healthy graph goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Graph goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Healthy-goto-graph-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Healthy Graph filters for Healthy', () => {
  Object.values(dimensions).map((key, i) => {
    it('Graph goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Healthy-goto-graph-id]').click()
      cy.wait(1000)
      cy.get('#iframeContainer').children().invoke('attr', 'src').should('contain', 'var-risk_group=healthy')
    })
  })
})

// Home page - Overview buttons

describe('Critical button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Critical button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Critical-goto-btn-idsquare').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})
describe('Critical got-to button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Healthy button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Critical-goto-btn-idbutton').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Critical button filters for Critical', () => {
  Object.values(dimensions).map((key, i) => {
    it('Critical button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Critical-goto-btn-idsquare').click()
      cy.wait(1000)
      cy.get('#iframeContainer').children().invoke('attr', 'src').should('contain', 'var-risk_group=critical')
      
    })
  })
})

describe('Grafana Graph test, will break if health_graphs page is removed', () => {
    it('Visits the test page', () => {
      cy.visit('http://localhost:3001/health_graphs')
      
      cy.get('iframe[src="http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk"]').should('exist'); 
    })
})

describe('Risk button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Risk button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Risk-goto-btn-idsquare').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Risk got-to button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Risk got-to button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Risk-goto-btn-idbutton').click({multiple: true})
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Risk button filters for Risk', () => {
  Object.values(dimensions).map((key, i) => {
    it('Risk button filters for Risk', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Risk-goto-btn-idsquare').click()
      cy.wait(1000)
      cy.get('#iframeContainer').children().invoke('attr', 'src').should('contain', 'var-risk_group=risk')
      
    })
  })
})


describe('Healthy button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Healthy button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Healthy-goto-btn-idsquare').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Healthy button filters for Healthy', () => {
  Object.values(dimensions).map((key, i) => {
    it('Healthy button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Healthy-goto-btn-idsquare').click()
      cy.wait(1000)
      cy.get('#iframeContainer').children().invoke('attr', 'src').should('contain', 'var-risk_group=healthy')
     
    })
  })
})

describe('Healthy got-to button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Healthy button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('#Healthy-goto-btn-idbutton').click({multiple: true})
      cy.url().should('include', '/health_graphs')
    })
  })
})

// Navbar tests

describe('Presence of Logo', () => {
  it('Checks for the presence of and "PredictIT"', () => {
    cy.visit('http://localhost:3001')
    cy.contains('Systematic')
    cy.contains('PredictIT')
  })
})

