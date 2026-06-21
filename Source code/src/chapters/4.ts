import { Step } from "./type";

const steps: Step[] = [
    {
        actionType: "changeScene",
        background: "chapters/4/1.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/1_2.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/2.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/3.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/4.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/5.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/6.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/7.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "showQuiz",
        question: "what might be causing the issue Alex is experiencing?",
        options: [
            {
                option: "There is a problem with Google's services.",
                nextRelativeStep: 2,
            },
            {
                option: "His account has been compromised.",
                nextRelativeStep: 1,
            },
            {
                option: "No one has sent him an email yet.",
                nextRelativeStep: 3,
            },
        ],
        correctOption: 2,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/8.png",
        nextRelativeStep: 3,
        prevRelativeStep: 2,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/9.png",
        nextRelativeStep: 2,
        prevRelativeStep: 3,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/10.png",
        nextRelativeStep: 1,
        prevRelativeStep: 4,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/11.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/12.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/13.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/14.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/15.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/16.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/17.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/17_ss.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "showQuiz",
        question: "which option should Alex choose?",
        options: [
            {
                option: "Personal info",
                nextRelativeStep: 1,
            },
            {
                option: "Data and privacy",
                nextRelativeStep: 2,
            },
            {
                option: "Security",
                nextRelativeStep: 3,
            },
        ],
        correctOption: 3,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/18.png",
        nextRelativeStep: 3,
        prevRelativeStep: 2,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/19.png",
        nextRelativeStep: 2,
        prevRelativeStep: 3,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/20.png",
        nextRelativeStep: 1,
        prevRelativeStep: 4,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/21.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "showQuiz",
        question: "which should Alex do now?",
        options: [
            {
                option: "Enabling 2-factor authentication",
                nextRelativeStep: 1,
            },
            {
                option: "Add recovery email and phone",
                nextRelativeStep: 1,
            },
            {
                option: "Review connected devices",
                nextRelativeStep: 3,
            },
        ],
        correctOption: 3,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/22.png",
        nextRelativeStep: 2,
        prevRelativeStep: 2,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/23.png",
        nextRelativeStep: 1,
        prevRelativeStep: 3,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/24.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/24_ss.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/25.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/25_ss.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/26.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/4/27.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
];

export default steps;
