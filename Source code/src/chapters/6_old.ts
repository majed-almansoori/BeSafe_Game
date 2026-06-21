import { Step } from "./type";

const steps: Step[] = [
    {
        actionType: "changeScene",
        background: "chapters/6/1.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/2.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/3.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/4.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/4_ss.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "showQuiz",
        question: "can you help Alex to select which tab she should go?",
        options: [
            {
                option: "General",
                nextRelativeStep: 1,
            },
            {
                option: "Privacy & Security",
                nextRelativeStep: 3,
            },
            {
                option: "Use search bar",
                nextRelativeStep: 2,
            },
        ],
        correctOption: 2,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/5.png",
        nextRelativeStep: 3,
        prevRelativeStep: 2,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/6.png",
        nextRelativeStep: 2,
        prevRelativeStep: 3,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/7.png",
        nextRelativeStep: 1,
        prevRelativeStep: 4,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/8.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/9.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/10.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/6/11.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
];

export default steps;
