beforeEach(() => {
  // Mock the jobs API so the dashboard shows predictable data
  cy.intercept('GET', '**/api/opportunities', {
    statusCode: 200,
    body: [
      {
        id: 'job-1',
        title: 'Frontend Developer',
        description: 'Build cool UIs',
        job_nature: 'Full-time',
        categories: ['Development'],
        organization: {
          name: 'A2SV',
          address: 'Addis Ababa',
          logo: ''
        }
      }
    ]
  }).as('getJobs');

  // Mock bookmarks endpoints used by JobCard
  cy.intercept('GET', '**/bookmarks', { statusCode: 200, body: [] }).as('getBookmarks');
  cy.intercept('POST', '**/bookmarks/*', { statusCode: 200 }).as('addBookmark');
  cy.intercept('DELETE', '**/bookmarks/*', { statusCode: 200 }).as('removeBookmark');
});

describe('Bookmark flow', () => {
  it('prevents unauthenticated bookmarking', () => {
    cy.visit('/dev-dashboard');
    cy.wait('@getJobs');
    cy.get('[data-testid="job-card"]', { timeout: 10000 }).should('exist');
    cy.get('[data-testid="bookmark-button"]').should('not.exist');
  });

  it('allows user to bookmark and unbookmark a job', () => {
    // Use custom command to set token in localStorage so JobCard renders the button
    cy.login();
    cy.visit('/dev-dashboard');
    cy.wait('@getJobs');

    // Ensure the job card appears
    cy.get('[data-testid="job-card"]', { timeout: 10000 }).should('exist');

    // Bookmark the job
    cy.get('[data-testid="bookmark-button"]', { timeout: 10000 })
      .should('be.visible')
      .click();
    cy.wait('@addBookmark');

    // Unbookmark the job
    cy.get('[data-testid="bookmark-button"]', { timeout: 10000 })
      .should('be.visible')
      .click();
    cy.wait('@removeBookmark');
  });
});
