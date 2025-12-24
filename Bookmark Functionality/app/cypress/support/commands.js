// Custom command to simulate login
Cypress.Commands.add("login", () => {
  // Set token in localStorage for authentication
  // This token will be used by JobCard component for API calls
  cy.window().then((win) => {
    win.localStorage.setItem("token", "fake-test-token");
  });
});
