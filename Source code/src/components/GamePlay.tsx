import { useEffect, useRef, useState } from "react";
import { getChapterSteps } from "../utils/chapter";
import { useGameStateContext } from "../utils/useGameState";
import { Step } from "../chapters/type";
import { useBackgroundContext } from "../utils/useBackground";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { TOTAL_CHAPTERS } from "../constants";
import KnowledgeMeter, { KnowledgeMeterRef } from "./KnowledgeMeter";
import Badge from "./Badge";
import Hamburger from "./Hamburger";
import { useNavigate } from "react-router-dom";

const GamePlay = () => {
  const {
    chapter,
    setChapter,
    stepIndex,
    setStepIndex,
    correctQuizzes,
    addCorrectQuiz,
    playerName,
    addNewBadge,
    chapterDurationCounterStart,
    chapterDurationCounterStop,
    recordPrevBtnClick,
    recordNextBtnClick,
    showFeatures,
    isChapterPreset
  } = useGameStateContext();
  const { setBackground } = useBackgroundContext();
  const navigate = useNavigate();

  const [chapterSteps, setChapterSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showBadge, setShowBadge] = useState<number | null>(null);

  const knowledgeMeterRef = useRef<KnowledgeMeterRef>(null);

  const currentStep = chapterSteps[currentStepIndex];

  useEffect(() => {
    const changeChapter = async () => {
      const steps = await getChapterSteps(chapter);
      setChapterSteps([...steps]);
      if (stepIndex === 0) setCurrentStepIndex(stepIndex);
      else {
        if (steps[stepIndex].actionType === "changeScene") {
          setCurrentStepIndex(stepIndex);
        } else {
          setCurrentStepIndex(stepIndex - 1);
        }
      }
    };

    changeChapter();
    chapterDurationCounterStart();
  }, [chapter]);

  const showPrev = (steps: number): boolean => {
    return currentStepIndex - steps >= 0;
  };

  const handlePrev = (steps: number) => {
    recordPrevBtnClick();
    if (showPrev(steps)) {
      setCurrentStepIndex(currentStepIndex - steps);
      setStepIndex(currentStepIndex - steps);
    }
  };

  const showNext = (steps: number): boolean => {
    return currentStepIndex + steps <= chapterSteps.length - 1;
  };

  const handleNext = (steps: number) => {
    recordNextBtnClick();
    if (showNext(steps)) {
      setCurrentStepIndex(currentStepIndex + steps);
      setStepIndex(currentStepIndex + steps);
    }
  };

  const onChapterComplete = () => {
    if (addNewBadge() && showFeatures) setShowBadge(chapter);
    else {
      setStepIndex(0);
      chapterDurationCounterStop();
      if (chapter === TOTAL_CHAPTERS || isChapterPreset) navigate("/");
      else {
        setChapter(chapter + 1);
        navigate("/chapters");
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);
      if (event.key === "ArrowRight") {
        if (currentStep.actionType === "changeScene" && showNext(currentStep.nextRelativeStep))
          handleNext(currentStep.nextRelativeStep);
      } else if (event.key === "ArrowLeft") {
        if (currentStep.actionType === "changeScene" && showPrev(currentStep.prevRelativeStep))
          handlePrev(currentStep.prevRelativeStep);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep]);

  if (chapterSteps.length === 0) return null;

  if (currentStep.actionType === "changeScene") {
    setBackground(currentStep.background);
  }

  return (
    <div className="gameplay">
      <Hamburger />
      {showFeatures && <KnowledgeMeter ref={knowledgeMeterRef} progress={correctQuizzes.length * 5} />}
      {showBadge !== null && (
        <Badge
          chapter={showBadge}
          onClose={() => {
            setShowBadge(null);
            setStepIndex(0);
            chapterDurationCounterStop();
            if (chapter === TOTAL_CHAPTERS || isChapterPreset) navigate("/");
            else {
              setChapter(chapter + 1);
              navigate("/chapters");
            }
          }}
        />
      )}
      {currentStep.actionType === "changeScene" ? (
        <div className="action-btns">
          {showPrev(currentStep.prevRelativeStep) && (
            <button className="prev-btn" onClick={() => handlePrev(currentStep.prevRelativeStep)}>
              <GrFormPreviousLink size={30} />
            </button>
          )}
          {!showPrev(currentStep.prevRelativeStep) && chapter > 1 && !isChapterPreset && (
            <button
              className="prev-btn prev-chapter"
              onClick={() => {
                setStepIndex(0);
                setChapter(chapter - 1);
              }}
            >
              Previous Chapter
            </button>
          )}
          {showNext(currentStep.nextRelativeStep) && (
            <button className="next-btn" onClick={() => handleNext(currentStep.nextRelativeStep)}>
              <GrFormNextLink size={30} />
            </button>
          )}
          {!showNext(currentStep.nextRelativeStep) && chapter <= TOTAL_CHAPTERS && (
            <button className="next-btn next-chapter" onClick={onChapterComplete}>
              {chapter === TOTAL_CHAPTERS || isChapterPreset ? "Finish" : "Next Chapter"}
            </button>
          )}
        </div>
      ) : (
        <div className="quiz">
          <div className="question">{playerName + ", " + currentStep.question}</div>
          <div className="options">
            {currentStep.options.map((option, index) => (
              <div
                className="option"
                onClick={() => {
                  handleNext(option.nextRelativeStep);
                  if (currentStep.correctOption === index + 1) {
                    addCorrectQuiz(`${chapter}.${currentStepIndex}`);
                    knowledgeMeterRef.current?.expandTemporarily();
                  }
                }}
              >
                <GrFormNextLink /> <span>{option.option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePlay;
