Feature: Addition
  Scenario Outline: It should be possible to add numbers
    Given I start with <number1>
    When I add <number2>
    Then I end up with <result_number>

    Examples:
    | number1 | number2 | result_number |
    | 1       | 0       | 1             |
    | 1       | 2       | 3             |
