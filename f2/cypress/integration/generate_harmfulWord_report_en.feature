 @regression
Feature: Test full report with harmful words workflow in english
  I want to create an online investgation report
  
  Scenario: Home page
    Given I open the report home page
    When I click on create a report button
    Then I read before you start instructions
    And I click continue without checking consent
    Then "Check the box to accept the terms of the Privacy statement." should be shown
    When I check the consent checkbox
    Then I click "Continue"

  Scenario: Report anonymously
    Given "Report anonymously?" should be shown
    When I fill NoReportAnonymously page forms
    Then I click "Continue"

  Scenario: Who are you reporting for
    Given "Who are you reporting for?" should be shown
    When I fill WhoAreYouReportingMyself page forms
    Then I click "Continue"

  Scenario: How did it start
    Given "How did the incident start?" should be shown
    When I fill howdiditstartMailPhone page forms
    Then I click "Continue"

  Scenario: When did it happen
    Given "When did the incident happen?" should be shown
    When I fill whendidithappenonce page forms
    Then I click "Continue"

  Scenario: What could be affected
    Given "What do you think could be affected?" should be shown
    When I fill Whatcouldbeaffected1 page forms
    Then I click "Continue"

  Scenario: How were your money affected
    Given "How were your money or finances affected?" should be shown
    When I fill Howwereyourmoney2 page forms
    Then I click "Continue"  
  
  Scenario: What happened?
    Given "What happened?" should be shown
    When I fill WhathappenedHarmful page forms
    Then I click "Continue"

  Scenario: Add suspect clues
    Given "Add suspect clues" should be shown
    When I fill Addsuspectclues13 page forms
    Then I click "Continue"

  Scenario: Attach supporting evidence
    Given "Attach supporting evidence" should be shown
    When I fill AttachSupportingEvidence page forms
    Then I click "Continue"

  Scenario: your location
    Given "Enter your location" should be shown
    When I fill postalCode1 page forms
    Then I click "Continue"

  Scenario: your contact details
    Given "Enter your contact details" should be shown
    When I fill yourContactDetails page forms
    Then I click "Continue"

  Scenario: Review  your report and  capture a screenshot
    Given "Review your report" should be shown
    Then Take summary page screenshot
    Then I submit report

  Scenario: Confirm Report ID is generated
    Then "Thank you for reporting" should be shown
    And "Your reference number:" should be shown
