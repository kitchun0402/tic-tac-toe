import { COMPUTER_ACTION_DELAY_IN_MS } from '../../src/configs/gameStates'

const soloButtonLabel = 'Solo (PvC)'
const battleButtonLabel = 'Battle (PvP)'
const resumeButtonLabel = 'Resume'
describe('Tic Tac Toe', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should visit the page correctly', () => {
    cy.contains('Game Mode').should('be.visible')
    cy.contains(soloButtonLabel).should('be.visible')
    cy.contains(battleButtonLabel).should('be.visible')
    cy.contains(resumeButtonLabel).should('be.visible')
  })

  it('should play with the computer on PvC', () => {
    cy.get('button').contains(soloButtonLabel).click()
    for (let index = 0; index < 9; index++) {
      const tile = cy.get(`[data-testid=tile-${index}]`)
      tile.should('be.empty')
    }
    cy.contains('PvC mode').should('be.visible')
    // Player X's move
    const playerXMoveAtIndex0 = cy.get('[data-testid=tile-0]')
    playerXMoveAtIndex0.click()
    cy.wait(COMPUTER_ACTION_DELAY_IN_MS)
    // Computer's move
    cy.get('[data-testid^=tile]').contains('O').should('be.visible')
  })

  it('should show a win for the player "X" on PvP', () => {
    cy.get('button').contains(battleButtonLabel).click()
    // Player X's move
    const playerXMoveAtIndex0 = cy.get('[data-testid=tile-0]')
    playerXMoveAtIndex0.click()
    // Player O's move
    cy.get('[data-testid=tile-3]').click()
    // Player X's move
    const playerXMoveAtIndex1 = cy.get('[data-testid=tile-1]')
    playerXMoveAtIndex1.click()
    // Player O's move
    cy.get('[data-testid=tile-6]').click()
    // Player X's move
    const playerXMoveAtIndex2 = cy.get('[data-testid=tile-2]')
    playerXMoveAtIndex2.click()

    for (const playerXMove of [
      playerXMoveAtIndex0,
      playerXMoveAtIndex1,
      playerXMoveAtIndex2,
    ]) {
      playerXMove.contains('X').should('be.visible')
    }
    cy.contains('X won!').should('be.visible')
  })

  it('should persist the game states after refeshing the page', () => {
    cy.get('button').contains(battleButtonLabel).click()
    // click the first tile with "X"
    cy.get('[data-testid=tile-0]').click()
    cy.reload()
    cy.get('button').contains(resumeButtonLabel).click()
    cy.get('[data-testid=tile-0]').contains('X').should('be.visible')
  })

  it('should reset the game after clicking the reset button', () => {
    cy.get('button').contains(battleButtonLabel).click()
    // click the first tile with "X"
    cy.get('[data-testid=tile-0]').click()
    cy.get('[data-testid=reset-button]').click()

    cy.get('[data-testid=tile-0]').should('be.empty')
  })

  it('should change the game mode after clicking the mode button', () => {
    cy.get('button').contains(battleButtonLabel).click()
    cy.contains('PvP mode').should('be.visible')
    cy.get('[data-testid=mode-button]').click()
    cy.get('button').contains(soloButtonLabel).click()
    cy.contains('PvC mode').should('be.visible')
  })

  it('should display all game history after clicking the history button', () => {
    cy.get('button').contains(battleButtonLabel).click()
    // create an end game to store the result into the history
    // Player X's move
    const playerXMoveAtIndex0 = cy.get('[data-testid=tile-0]')
    playerXMoveAtIndex0.click()
    // Player O's move
    cy.get('[data-testid=tile-3]').click()
    // Player X's move
    const playerXMoveAtIndex1 = cy.get('[data-testid=tile-1]')
    playerXMoveAtIndex1.click()
    // Player O's move
    cy.get('[data-testid=tile-6]').click()
    // Player X's move
    const playerXMoveAtIndex2 = cy.get('[data-testid=tile-2]')
    playerXMoveAtIndex2.click()

    // click history button
    cy.get('[data-testid=history-button]').click()

    cy.contains('Mode: PvP').should('be.visible')
    cy.contains('X won').should('be.visible')
    cy.contains('View').should('be.visible')
  })

  it('should keep all game history after refreshing a page', () => {
    cy.get('button').contains(battleButtonLabel).click()
    // create an end game to store the result into the history
    // Player X's move
    const playerXMoveAtIndex0 = cy.get('[data-testid=tile-0]')
    playerXMoveAtIndex0.click()
    // Player O's move
    cy.get('[data-testid=tile-3]').click()
    // Player X's move
    const playerXMoveAtIndex1 = cy.get('[data-testid=tile-1]')
    playerXMoveAtIndex1.click()
    // Player O's move
    cy.get('[data-testid=tile-6]').click()
    // Player X's move
    const playerXMoveAtIndex2 = cy.get('[data-testid=tile-2]')
    playerXMoveAtIndex2.click()

    // Refresh the page
    cy.reload()
    cy.get('button').contains(battleButtonLabel).click()
    // click history button
    cy.get('[data-testid=history-button]').click()

    cy.contains('Mode: PvP').should('be.visible')
    cy.contains('X won').should('be.visible')
    cy.contains('View').should('be.visible')
  })
})
