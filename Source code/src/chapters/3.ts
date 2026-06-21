import { Step } from "./type";

const steps: Step[] = [
    {
        actionType: "changeScene",
        background: "chapters/3/1.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/2.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/3.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/4.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/5.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/6.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/7.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/8.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "showQuiz",
        question: "what do you think is happening?",
        options: [
            {
                option: "There is a virus in Alex's phone",
                nextRelativeStep: 1,
            },
            {
                option: "Someone hacked Alex's iCloud",
                nextRelativeStep: 2,
            },
            {
                option: "It is caused by a bug in some app",
                nextRelativeStep: 3,
            },
        ],
        correctOption: 2,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/9.png",
        nextRelativeStep: 3,
        prevRelativeStep: 2,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/10.png",
        nextRelativeStep: 2,
        prevRelativeStep: 3,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/11.png",
        nextRelativeStep: 1,
        prevRelativeStep: 4,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/12.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/13.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/14.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/15.jpg",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/16.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/17.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/18.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },

    {
        actionType: "showQuiz",
        question: "do you think changing the password is enough?",
        options: [
            {
                option: "Yes",
                nextRelativeStep: 1,
            },
            {
                option: "No",
                nextRelativeStep: 2,
            },
        ],
        correctOption: 2,
        prevRelativeStep: 1,
    },

    {
        actionType: "changeScene",
        background: "chapters/3/19.png",
        nextRelativeStep: 2,
        prevRelativeStep: 2,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/20.png",
        nextRelativeStep: 1,
        prevRelativeStep: 3,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/21.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/22.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/23.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/24.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/25.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/26.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
    {
        actionType: "changeScene",
        background: "chapters/3/27.png",
        nextRelativeStep: 1,
        prevRelativeStep: 1,
    },
];

export default steps;
