// /src/components/QuizQuestions.ts

export type Option = {
  id: string
  text: string
}

export type Question = {
  id: string
  text: string
  options: Option[]
  correctOptionId: string
  explanation: string
}

export type Level = {
  id: number
  questions: Question[]
}

export const easyQuestions: Question[] = [
  {
    id: "1-1",
    text: "What is the primary focus of the Worker Protection (Amendment of Equality Act 2010) Act 2023?",
    options: [
      { id: "a", text: "Punishing employees who commit sexual harassment." },
      { id: "b", text: "Placing a duty on employers to react to incidents of sexual harassment." },
      { id: "c", text: "Placing a duty on employers to take reasonable steps to prevent sexual harassment." },
      { id: "d", text: "Providing compensation to employees who have experienced sexual harassment." },
    ],
    correctOptionId: "c",
    explanation: "The Act places a proactive duty on employers to prevent sexual harassment.",
  },
  {
    id: "1-2",
    text: "When did the Worker Protection (Amendment of Equality Act 2010) Act 2023 come into effect?",
    options: [
      { id: "a", text: "October 26, 2023" },
      { id: "b", text: "November 26, 2023" },
      { id: "c", text: "January 1, 2024" },
      { id: "d", text: "October 26, 2024" },
    ],
    correctOptionId: "d",
    explanation: "The Act came into effect on October 26, 2024.",
  },
  {
    id: "1-3",
    text: "According to the Act, who has a legal duty to prevent sexual harassment of workers?",
    options: [
      { id: "a", text: "Employees" },
      { id: "b", text: "Trade unions" },
      { id: "c", text: "Employers" },
      { id: "d", text: "The government" },
    ],
    correctOptionId: "c",
    explanation: "Employers are legally responsible for preventing sexual harassment.",
  },
  {
    id: "1-4",
    text: "Does the duty to prevent sexual harassment under this Act only apply to harassment by colleagues?",
    options: [
      { id: "a", text: "Yes, the Act focuses solely on internal workplace harassment." },
      { id: "b", text: "No, the duty also includes taking reasonable steps to prevent harassment from third parties." },
      { id: "c", text: "The Act is unclear on whether third-party harassment is included." },
      { id: "d", text: "Third-party harassment is covered under separate legislation." },
    ],
    correctOptionId: "b",
    explanation: "The Act includes harassment from third parties, such as clients or customers.",
  },
  {
    id: "1-5",
    text: "What is the Equality Act 2010?",
    options: [
      { id: "a", text: "A piece of legislation focused solely on preventing sexual harassment." },
      { id: "b", text: "The primary legislation in Great Britain concerning equality and non-discrimination." },
      { id: "c", text: "A set of guidelines issued by the Equality and Human Rights Commission." },
      { id: "d", text: "Legislation that only applies to public sector employers." },
    ],
    correctOptionId: "b",
    explanation: "The Equality Act 2010 is the main equality legislation in Great Britain.",
  },
  {
    id: "1-6",
    text: "Which body has been given powers to advise on the equality and human rights implications of laws in the UK?",
    options: [
      { id: "a", text: "ACAS (Advisory, Conciliation and Arbitration Service)" },
      { id: "b", text: "The Health and Safety Executive (HSE)" },
      { id: "c", text: "The Equality and Human Rights Commission (EHRC)" },
      { id: "d", text: "The Employment Tribunal" },
    ],
    correctOptionId: "c",
    explanation: "The EHRC advises on equality and human rights laws.",
  },
  {
    id: "1-7",
    text: "What is the aim of the new preventative duty introduced by the Act?",
    options: [
      { id: "a", text: "To punish employers after incidents of sexual harassment occur." },
      { id: "b", text: "To improve workplace cultures by requiring employers to proactively protect their workers from sexual harassment." },
      { id: "c", text: "To encourage employees to report all incidents of sexual harassment to the police." },
      { id: "d", text: "To shift the responsibility of preventing harassment entirely to individual employees." },
    ],
    correctOptionId: "b",
    explanation: "The duty aims to foster better workplace cultures through prevention.",
  },
  {
    id: "1-8",
    text: 'What does the term "reasonable steps" refer to in the context of this Act?',
    options: [
      { id: "a", text: "The minimum actions an employer must take, regardless of their size or resources." },
      { id: "b", text: "Actions that are proportionate and appropriate for an employer to take to prevent sexual harassment." },
      { id: "c", text: "Only actions that are explicitly listed in the Act." },
      { id: "d", text: "Actions that are solely determined by the employer's discretion." },
    ],
    correctOptionId: "b",
    explanation: '"Reasonable steps" are proportionate to the employer’s context.',
  },
]

export const mediumQuestions: Question[] = [
  {
    id: "2-1",
    text: "According to the Equality Act 2010, what is the definition of sexual harassment?",
    options: [
      { id: "a", text: "Any unwanted behaviour in the workplace." },
      { id: "b", text: "Unwanted conduct of a sexual nature that violates a person's dignity or creates a hostile environment." },
      { id: "c", text: "Physical contact of a sexual nature without consent." },
      { id: "d", text: "Any form of discrimination based on sex." },
    ],
    correctOptionId: "b",
    explanation: "This is the legal definition under the Equality Act 2010.",
  },
  {
    id: "2-2",
    text: 'What factors might an Employment Tribunal consider when determining whether an employer has taken "reasonable steps" to prevent sexual harassment?',
    options: [
      { id: "a", text: "Only the cost of implementing preventative measures." },
      { id: "b", text: "The size and resources of the employer, the nature of the working environment, and the risks present." },
      { id: "c", text: "Solely whether the employer has a written anti-harassment policy." },
      { id: "d", text: "Only whether an incident of sexual harassment has previously occurred." },
    ],
    correctOptionId: "b",
    explanation: "Tribunals consider various contextual factors.",
  },
  {
    id: "2-3",
    text: "What potential consequence might an employer face if an employee successfully claims sexual harassment and the employer is found to have breached the preventative duty?",
    options: [
      { id: "a", text: "A criminal prosecution." },
      { id: "b", text: "An unlimited fine." },
      { id: "c", text: "An uplift in compensation awarded to the employee by up to 25%." },
      { id: "d", text: "Automatic dismissal of the employee who committed the harassment." },
    ],
    correctOptionId: "c",
    explanation: "Compensation can be increased by up to 25% for breaches.",
  },
  {
    id: "2-4",
    text: 'Why is the preventative duty considered an "anticipatory duty"?',
    options: [
      { id: "a", text: "Because employers are only required to act after an incident of sexual harassment has been reported." },
      { id: "b", text: "Because employers should anticipate scenarios where workers may be subject to sexual harassment and take action to prevent it." },
      { id: "c", text: "Because the Act anticipates future amendments to equality legislation." },
      { id: "d", text: "Because it encourages employees to anticipate and avoid potentially harassing situations." },
    ],
    correctOptionId: "b",
    explanation: "The duty requires proactive prevention.",
  },
  {
    id: "2-5",
    text: 'What are some examples of "reasonable steps" an employer could take to prevent sexual harassment from third parties?',
    options: [
      { id: "a", text: "Ignoring any complaints of harassment from third parties as they are not direct employees." },
      { id: "b", text: "Communicating to third parties that there is a zero-tolerance approach to sexual harassment and encouraging staff to report it." },
      { id: "c", text: "Only intervening if a physical assault occurs." },
      { id: "d", text: "Assuming that third-party harassment is a normal part of certain jobs." },
    ],
    correctOptionId: "b",
    explanation: "Clear communication and reporting encouragement are key steps.",
  },
  {
    id: "2-6",
    text: "What role does training play in complying with the Worker Protection (Amendment of Equality Act 2010) Act 2023?",
    options: [
      { id: "a", text: "Training is optional and not considered a 'reasonable step.'" },
      { id: "b", text: "Ensuring all workers receive training on what sexual harassment looks like, how to report it, and how complaints are handled is a key 'reasonable step.'" },
      { id: "c", text: "Only managers and senior staff need to be trained on this legislation." },
      { id: "d", text: "Training should only be provided after an incident of sexual harassment has occurred." },
    ],
    correctOptionId: "b",
    explanation: "Training is a critical preventative measure.",
  },
  {
    id: "2-7",
    text: "What is the significance of the EHRC's statutory Code of Practice in relation to this Act?",
    options: [
      { id: "a", text: "It provides a legally binding set of rules that employers must follow." },
      { id: "b", text: "It will set out the steps that employers should take to prevent and respond to sexual harassment to comply with the duty." },
      { id: "c", text: "It is only relevant for large organizations with over 250 employees." },
      { id: "d", text: "It primarily focuses on the rights of employees who have been sexually harassed." },
    ],
    correctOptionId: "b",
    explanation: "The Code of Practice provides guidance on compliance.",
  },
]

export const hardQuestions: Question[] = [
  {
    id: "3-1",
    text: "An employee reports an incident of sexual harassment by a client. The employer investigates and takes action against the client but has not previously conducted any risk assessments or provided specific training on third-party harassment. Could the employer be found to have breached their preventative duty?",
    options: [
      { id: "a", text: "No, because they took action after the incident was reported." },
      { id: "b", text: "Yes, because the duty is anticipatory and requires proactive steps like risk assessments and training to prevent such incidents." },
      { id: "c", text: "Possibly, depending on the size and resources of the employer." },
      { id: "d", text: "No, because the Act does not hold employers liable for the actions of third parties." },
    ],
    correctOptionId: "b",
    explanation: "The duty requires proactive measures, not just reactive ones.",
  },
  {
    id: "3-2",
    text: "An Employment Tribunal finds that an employer failed to take reasonable steps to prevent sexual harassment, leading to a successful harassment claim by an employee. The initial compensation awarded for the harassment is £20,000. What is the maximum additional compensation the tribunal could award due to the breach of the preventative duty?",
    options: [
      { id: "a", text: "£2,500" },
      { id: "b", text: "£5,000" },
      { id: "c", text: "£10,000" },
      { id: "d", text: "£25,000" },
    ],
    correctOptionId: "b",
    explanation: "A 25% uplift on £20,000 is £5,000.",
  },
  {
    id: "3-3",
    text: "What factors might the EHRC consider when deciding whether to take enforcement action against an employer for failing to comply with the preventative duty, even if no specific incident of sexual harassment has been reported?",
    options: [
      { id: "a", text: "Only if they have received multiple anonymous complaints." },
      { id: "b", text: "Evidence of a systemic failure to implement reasonable preventative steps, such as a complete lack of policies or training." },
      { id: "c", text: "Only if the employer is a large corporation." },
      { id: "d", text: "If a competitor reports the employer for non-compliance." },
    ],
    correctOptionId: "b",
    explanation: "Systemic failures are a key focus for enforcement.",
  },
  {
    id: "3-4",
    text: "An employer conducts a risk assessment and identifies that employees in customer-facing roles are at a higher risk of third-party harassment. What would be considered a reasonable step for this employer to take, beyond general anti-harassment training?",
    options: [
      { id: "a", text: "Instructing employees to tolerate inappropriate behaviour from customers to maintain good business relations." },
      { id: "b", text: "Providing specific training on how to handle challenging customer interactions and setting clear boundaries, as well as providing a protocol for dealing with such incidents." },
      { id: "c", text: "Avoiding placing employees in customer-facing roles altogether." },
      { id: "d", text: "Telling employees to call the police directly for any incidents of harassment." },
    ],
    correctOptionId: "b",
    explanation: "Specific training and protocols are reasonable steps.",
  },
  {
    id: "3-5",
    text: "An employer has a comprehensive anti-harassment policy that covers all forms of harassment but does not specifically mention sexual harassment or third-party harassment. Would this policy likely be considered sufficient to meet the requirements of the Worker Protection (Amendment of Equality Act 2010) Act 2023?",
    options: [
      { id: "a", text: "Yes, as long as it generally prohibits unwanted behaviour." },
      { id: "b", text: "No, the EHRC guidance suggests having either a separate policy on sexual harassment or ensuring a single policy clearly addresses it and includes third-party harassment." },
      { id: "c", text: "Possibly, depending on how effectively the policy is communicated to employees." },
      { id: "d", text: "Yes, because the Act itself does not mandate a specific policy format." },
    ],
    correctOptionId: "b",
    explanation: "EHRC guidance emphasizes specificity in policies.",
  },
]