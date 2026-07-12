import "./commands";

// Prevent uncaught app exceptions (e.g. third-party widgets) from
// failing a smoke test that isn't actually about that error.
// Tighten this per-spec if you want stricter failure behavior.
Cypress.on("uncaught:exception", (err) => {
  console.warn("Uncaught exception in app under test:", err.message);
  return false;
});
