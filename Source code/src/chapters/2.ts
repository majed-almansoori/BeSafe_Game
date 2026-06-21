import { Step } from "./type";

const steps: Step[] = [
  {
    actionType: "changeScene",
    background: "chapters/2/1.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/2.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/3.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/4.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/5.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/6.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/7.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/8.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/9.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/10.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "showQuiz",
    question: "Do you think Alex's account has been hacked?",
    options: [
      {
        option: "No, as Alex mentioned, changing his phone passcode should suffice.",
        nextRelativeStep: 1,
      },
      {
        option: "Yes, it's just as Robert said — even after changing the passcode, the phone might still be compromised.",
        nextRelativeStep: 2,
      },
    ],
    correctOption: 2,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/11.png",
    nextRelativeStep: 2,
    prevRelativeStep: 2,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/11b.png",
    nextRelativeStep: 1,
    prevRelativeStep: 3,
  },
  
  {
    actionType: "changeScene",
    background: "chapters/2/12.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/13.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/14.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/15.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "showQuiz",
    question: "Which option should Alex tap?",
    options: [
      {
        option: "Privacy",
        nextRelativeStep: 1,
      },
      {
        option: "Account",
        nextRelativeStep: 1,
      },
      {
        option: "Chats",
        nextRelativeStep: 1,
      },
      {
        option: "Linked devices",
        nextRelativeStep: 2,
      },
    ],
    correctOption: 4,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/17.png",
    nextRelativeStep: 2,
    prevRelativeStep: 2,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/16.png",
    nextRelativeStep: 1,
    prevRelativeStep: 3,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/18.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/19.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/20.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "showQuiz",
    question: "What do you think the person who compromised Alex's account could do?",
    options: [
      {
        option: "The person could read Alex's private chats and send messages, impersonating him.",
        nextRelativeStep: 1,
      },
      {
        option: "There's nothing the person can do.",
        nextRelativeStep: 2,
      },
    ],
    correctOption: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/21.png",
    nextRelativeStep: 2,
    prevRelativeStep: 2,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/22.png",
    nextRelativeStep: 1,
    prevRelativeStep: 3,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/23.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/24.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },

  {
    actionType: "changeScene",
    background: "chapters/2/25.png",
    nextRelativeStep: 1,
    prevRelativeStep: 1,
  },
];

export default steps;
