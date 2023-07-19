export const textMessages = {
  requireCredentials:
    "Please enter a username with a minimum of 6 digits and a password with at least 4 digits. Example: username password",
  showTermsToStart:
    "Sorry, I don't understand. Type one of each following terms to start the chat: 'Hello', 'I want', 'Good' or 'Goodbye'",
  wrongFormat:
    "Wrong format, enter a username with a minimum of 6 digits and a password with at least 4 digits. Example: username password",
  usernameInvalid:
    "Please, the username must be at least 6 digits. Enter your username and password again. Example: username password",
  passwordInvalid:
    "Please, the password must be at least 4 digits. Enter your username and password again. Example: username password",
  loanOptionsSplitted: {
    a: "a - Do you want to apply for a loan?",
    b: "b - Loan conditions",
    c: "c - Help",
  },
  loanOptions: `Choose and click on one of the options below for more information: 
    a - Do you want to apply for a loan?
    b - Loan conditions
    c - Help`,
  loanOptionDetails: {
    a: `If you want to start a new business venture, 
    renovate your home or consolidate debt, we are here to help you with your loan. 
    Click here to see more informations.`,
    b: `Our loan conditions offer flexibility and convenience. 
    Borrow any amount between $1,000 and $100,000 at competitive rates starting from 3.5%. 
    Repay comfortably with flexible terms ranging from 6 months to 5 years and fixed monthly installments. 
    Collateral may be required, and additional fees may apply. 
    Review the lender's specific terms and conditions for accurate details.
    Click here to see more informations.`,
    c: `If you have any questions or need guidance regarding our loan application process, 
    our friendly customer support team is here to help. 
    Click here to see more informations.`,
  },
  endChat:
    "If that's all you need, simply type 'Goodbye' to end the chat. If you want to see the options again, type 'loan'. Thank you!",
  goodbye: `Thank you for using our services! 
  If you have any more questions in the future, feel free to ask. 
  Goodbye and have a great day! Click in the button to download the chat history in CSV format`,
  dontUnderstand: "Sorry, i don't understand.",
  clearChat: "The chat will be cleared in 10 seconds",
};

export const htmlMessages = {
  loanOptionsSplitted: {
    a: `<span class="option" id="a">a - Do you want to apply for a loan?</span>"`,
    b: `<span class="option" id="b">b - Loan conditions</span>`,
    c: `<span class="option" id="c">c - Help</span>`,
  },
  loanOptions: `
  <div class="loanOptions">
    <span>Choose and click on one of the options below for more information:</span>
    <span class="option" id="a">a - Do you want to apply for a loan?</span>
    <span class="option" id="b">b - Loan conditions</span>
    <span class="option" id="c">c - Help</span>
  </div>`,
  loanOptionDetails: {
    a: `<span>If you want to start a new business venture, 
    renovate your home or consolidate debt, we are here to help you with your loan. 
    Click <a href="http://loan-more-information-url" target="_blank">here</a>
     to see more informations.</span>
    `,
    b: `Our loan conditions offer flexibility and convenience. 
    Borrow any amount between $1,000 and $100,000 at competitive rates starting from 3.5%. 
    Repay comfortably with flexible terms ranging from 6 months to 5 years and fixed monthly installments. 
    Collateral may be required, and additional fees may apply. 
    Review the lender's specific terms and conditions for accurate details.
    Click <a href="http://loan-more-information-url" target="_blank">here</a>
     to see more informations.</span>`,
    c: `If you have any questions or need guidance regarding our loan application process, 
    our friendly customer support team is here to help. 
    Click <a href="http://loan-help-url" target="_blank">here</a>
     to see more informations.</span>`,
  },
  goodbye: `<span>Thank you for using our services! 
  If you have any more questions in the future, feel free to ask. 
  Goodbye and have a great day!</span><br>
  <span>Click in the button to download the chat history in CSV format`,
};
