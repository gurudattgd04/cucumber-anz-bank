Feature: Calculator Check

  Scenario: Validate borrowing calculation workflow
    When I fill my details with below details:
      | ApplicationType | Single          |
      | NoOfDependents  | 0               |
      | PropertyType    | Home to live in |
    And I fill my income with below details:
      | Income      | 80,000 |
      | OtherIncome | 10,000 |
    And I fill my expenses with below details:
      | LivingExpense      | 500    |
      | HomeLoanRepayment  | 0      |
      | OtherLoanRepayment | 100    |
      | OtherCommitments   | 0      |
      | CreditLimit        | 10,000 |
    And I calculate how much borrow amount is
    Then the borrow amount should be "$507,000"
    When I click on start over
    Then the form should be empty

  Scenario: Validate message when form is incomplete
    When I fill my expenses with below details:
      | LivingExpense      | 1 |
      | HomeLoanRepayment  | 0 |
      | OtherLoanRepayment | 0 |
      | OtherCommitments   | 0 |
      | CreditLimit        | 0 |
    And I calculate how much borrow amount is
    Then I should see error message "Based on the details you've entered, we're unable to give you an estimate of your borrowing power with this calculator. For questions, call us on 1800 035 500."
