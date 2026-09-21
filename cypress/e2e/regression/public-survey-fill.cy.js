import PublicSurveyPage from "../../pages/PublicSurveyPage";

// TODO: confirm this org/flow slug is still valid — it's a specific
// demo flow ID from the recorder export and may need refreshing.
const DEMO_FLOW = { orgSlug: "TEST", flowId: "FTQda1d7" };

// No login required — this is the public-facing respondent flow.
describe("ClientShot — Public Survey: Demo Form Flow", () => {
  it("submits a full patient-feedback survey end to end", () => {
    PublicSurveyPage.visitFlow(DEMO_FLOW.orgSlug, DEMO_FLOW.flowId);

    PublicSurveyPage.selectRadioOption("No");
    PublicSurveyPage.clickNext();

    PublicSurveyPage.fillTextArea("Give me money");
    PublicSurveyPage.clickNext();

    PublicSurveyPage.fillPhoneNumber("08000000000");
    PublicSurveyPage.clickNext();

    PublicSurveyPage.fillEmail("qa-survey-test@example.com");
    PublicSurveyPage.submit();

    PublicSurveyPage.assertSubmissionComplete();
  });
});
