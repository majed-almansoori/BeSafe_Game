import { TOTAL_CHAPTERS } from "../constants";
import { useBackgroundContext } from "../utils/useBackground";
import { useGameStateContext } from "../utils/useGameState";
import { useNavigate } from "react-router-dom";
import chapterDescriptionsJson from "../chapters/descriptions.json";
import { ChapterDescriptions } from "../chapters/type";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const Chapters = () => {
  const { setBackground } = useBackgroundContext();
  const { chapter, setChapter, setStepIndex, isChapterPreset } = useGameStateContext();
  const navigate = useNavigate();

  const chapterDescriptions: ChapterDescriptions = chapterDescriptionsJson;

  const completedChapters = JSON.parse(localStorage.getItem("badges") || "[]") as number[];

  setBackground("menu.jpg");

  const renderChapterButtons = () => {
    const chapterButtons = [];
    for (let i = 1; i <= TOTAL_CHAPTERS; i++) {
      if(!isChapterPreset || (isChapterPreset && chapter === i)) {
        chapterButtons.push(
          <button
            key={`chapter-${i}`}
            onClick={() => {
              setStepIndex(0);
              setChapter(i);
              navigate("/play");
            }}
          >
            {chapterDescriptions[i]}
            {completedChapters.includes(i) && <FaCheck />}
          </button>,
        );
      }
    }
    return chapterButtons;
  };

  return (
    <div className="chapters">
      <div className="title">Chapters</div>
      <div className="options">{renderChapterButtons()}
        <button className="go-back-btn" onClick={() => navigate(-1)}><IoIosArrowRoundBack /> Go Back</button>
      </div>
    </div>
  );
};

export default Chapters;
