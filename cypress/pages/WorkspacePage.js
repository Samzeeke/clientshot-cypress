import BasePage from "./BasePage";

/**
 * WorkspacePage
 * The recorder export shows that after login, ClientShot can present
 * a "choose the workspace you want to work in" screen (workspace
 * avatars, labelled by initial, e.g. an "S" avatar for the QA
 * account's workspace) with a Continue button. This appears to
 * happen when the account belongs to more than one workspace.
 *
 * TODO: confirm with the dev team whether this screen ALWAYS shows
 * for this account or only sometimes (e.g. only on first login of a
 * session/browser). If it's inconsistent, the conditional check
 * below (cy.get('body').then(...)) is the pragmatic way to handle
 * it in Cypress, though explicit is always better than conditional —
 * replace with a hard assertion once you know the real behavior.
 */
class WorkspacePage extends BasePage {
  selectors = {
    // Recorded as a label immediately following the workspace's
    // initial-letter avatar span, inside the workspace picker.
    workspaceCard: (workspaceInitial) =>
      `.workspace-list, [class*="workspace"]`, // TODO: replace with a real data-testid selector
    continueButton: "button", // TODO: scope this — recorder captured a generic button/span here
  };

  /**
   * Selects a workspace by its visible name/initial and continues,
   * but only if the workspace-picker screen is actually showing.
   * No-ops (safely) if login dropped straight into the dashboard.
   */
  selectWorkspaceIfPresent(workspaceName) {
    cy.get("body").then(($body) => {
      const pickerShowing = $body.text().includes("workspace");
      if (pickerShowing) {
        cy.contains(workspaceName).click();
        cy.contains("button", "Continue").click();
      }
    });
    return this;
  }
}

export default new WorkspacePage();
