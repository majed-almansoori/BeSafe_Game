import { Step } from "../chapters/type";

export const getChapterSteps = async (chapter: number): Promise<Step[]> => {
  const module = await import(`../chapters/${chapter}.ts`);
  return module.default;
};
