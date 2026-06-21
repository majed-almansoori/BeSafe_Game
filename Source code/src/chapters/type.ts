type ChangeScene = {
  actionType: "changeScene";
  background: string;
  nextRelativeStep: number;
  prevRelativeStep: number;
};

type ShowQuiz = {
  actionType: "showQuiz";
  question: string;
  options: {
    option: string;
    nextRelativeStep: number;
  }[];
  correctOption: number | null;
  prevRelativeStep: number;
};

export type Step = ChangeScene | ShowQuiz;

export type ChapterDescriptions = {
  [key: string]: string;
};
