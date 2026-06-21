import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL, TOTAL_CHAPTERS } from "../constants";

type FeatureType = "knowledge_meter" | "leaderboard" | "badge";

interface IGameStateContext {
  setChapter: (chapter: number) => void;
  chapter: number;
  stepIndex: number;
  setStepIndex: (stepIndex: number) => void;
  correctQuizzes: string[];
  addCorrectQuiz: (quizCode: string) => void;
  playerName: string;
  setPlayerName: (playerName: string) => void;
  addNewBadge: () => boolean;
  setClickCounter: (arg0: FeatureType) => void;
  chapterDurationCounterStart: () => void;
  chapterDurationCounterStop: () => void;
  recordPrevBtnClick: () => void;
  recordNextBtnClick: () => void;
  showFeatures: boolean;
  searchParams: URLSearchParams;
  isChapterPreset: boolean;
}

const GameStateContext = createContext<IGameStateContext>({
  setChapter: () => {},
  chapter: 1,
  stepIndex: 1,
  setStepIndex: () => {},
  correctQuizzes: [],
  addCorrectQuiz: () => {},
  playerName: "",
  setPlayerName: () => {},
  addNewBadge: () => false,
  setClickCounter: () => {},
  chapterDurationCounterStart: () => {},
  chapterDurationCounterStop: () => {},
  recordPrevBtnClick: () => {},
  recordNextBtnClick: () => {},
  showFeatures: false,
  searchParams: new URLSearchParams(),
  isChapterPreset: false
});

export const useGameStateContext = () => useContext(GameStateContext);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParamsInternal] = useState<URLSearchParams>(new URLSearchParams());
  const [isChapterPreset, setIsChapterPreset] = useState(false);
  const [chapter, setChapterNumber] = useState(1);
  const [stepIndex, setStepIndexInternal] = useState(0);
  const [correctQuizzes, setCorrectQuizzes] = useState<string[]>([]);
  const [playerName, setPlayerNickName] = useState<string>("");

  const showFeatures = import.meta.env.VITE_SHOW_FEATURES === "true";

  useEffect(() => {
    const savedChapter = localStorage.getItem("chapter");
    if (savedChapter) setChapterNumber(parseInt(savedChapter));
    else setChapterNumber(1);

    const savedStepIndex = localStorage.getItem("step_index");
    if (savedStepIndex) setStepIndexInternal(parseInt(savedStepIndex));
    else setStepIndexInternal(0);

    const savedCorrectQuizzes = localStorage.getItem("correct_quizzes");
    if (savedCorrectQuizzes) setCorrectQuizzes(JSON.parse(savedCorrectQuizzes));

    const savedPlayerName = localStorage.getItem("player_name");
    if (savedPlayerName) setPlayerNickName(savedPlayerName);
  }, []);

  const setChapter = (chapter: number) => {
    setChapterNumber(chapter);
    localStorage.setItem("chapter", `${chapter}`);
  };

  const setStepIndex = (stepIndex: number) => {
    setStepIndexInternal(stepIndex);
    localStorage.setItem("step_index", `${stepIndex}`);
  };

  const addCorrectQuiz = async (quizCode: string) => {
    if (correctQuizzes.includes(quizCode)) return;
    const newCorrectQuizzes = [...correctQuizzes, quizCode];
    setCorrectQuizzes(newCorrectQuizzes);
    try {
      await fetch(BACKEND_URL + "/update", {
        method: "POST",
        body: JSON.stringify({ username: playerName, score: newCorrectQuizzes.length * 5 }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
    localStorage.setItem("correct_quizzes", JSON.stringify(newCorrectQuizzes));
  };

  const setPlayerName = (playerName: string) => {
    setPlayerNickName(playerName);
    localStorage.setItem("player_name", playerName);
  };

  const addNewBadge = (): boolean => {
    const existingBadges = localStorage.getItem("badges");
    if (existingBadges) {
      const badges = JSON.parse(existingBadges);
      if (!badges.includes(chapter)) {
        badges.push(chapter);
        localStorage.setItem("badges", JSON.stringify(badges));
        return true;
      }
      return false;
    } else {
      localStorage.setItem("badges", JSON.stringify([chapter]));
      return true;
    }
  };

  const updateClickCounter = (counter: number, featureName: FeatureType) => {
    try {
      fetch(BACKEND_URL + "/clickcounter", {
        method: "POST",
        body: JSON.stringify({ count: counter, username: playerName, featurename: featureName }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error sending POST request to update click:", error);
    }
  };

  const setClickCounter = (featureName: FeatureType) => {
    let clickCount = parseInt(localStorage.getItem(`${featureName}_counter`) || "0");
    clickCount = clickCount + 1;
    localStorage.setItem(`${featureName}_counter`, `${clickCount}`);
    updateClickCounter(clickCount, featureName);
  };

  const updateChapterDurations = () => {
    const chapterDurations: number[] = [];
    for (var i = 1; i <= TOTAL_CHAPTERS; i++) {
      const chapterDuration = parseInt(localStorage.getItem(`chapter_${i}_duration`) || "0");
      chapterDurations.push(chapterDuration / 1000);
    }

    try {
      fetch(BACKEND_URL + "/update-chapter-durations", {
        method: "POST",
        body: JSON.stringify({ username: playerName, durations: chapterDurations }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const chapterDurationCounterStart = () => {
    localStorage.setItem(`chapter_${chapter}_start_time`, new Date().toISOString());
  };

  const chapterDurationCounterStop = () => {
    const chapterStartTime = localStorage.getItem(`chapter_${chapter}_start_time`) || new Date().toISOString();
    const chapterEndTime = new Date().getTime();

    const prevChapterDuration = parseInt(localStorage.getItem(`chapter_${chapter}_duration`) || "0");
    const currentChapterDuration = chapterEndTime - new Date(chapterStartTime).getTime();
    localStorage.setItem(`chapter_${chapter}_duration`, `${prevChapterDuration + currentChapterDuration}`);

    updateChapterDurations();
  };

  const updatePrevBtnClickTimestamp = () => {
    const prevBtnClickTimestamps = JSON.parse(localStorage.getItem("prev_btn_click_timestamps") || "[]");
    try {
      fetch(BACKEND_URL + "/update-btn-click-timestamps", {
        method: "POST",
        body: JSON.stringify({ username: playerName, timestamps: prevBtnClickTimestamps, btn_type: "prev" }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  }

  const recordPrevBtnClick = () => {
    const prevBtnClickTimestamps = JSON.parse(localStorage.getItem("prev_btn_click_timestamps") || "[]");
    prevBtnClickTimestamps.push(Date.now());
    localStorage.setItem("prev_btn_click_timestamps", JSON.stringify(prevBtnClickTimestamps));

    updatePrevBtnClickTimestamp();
  }

  const updateNextBtnClickTimestamp = () => {
    const nextBtnClickTimestamps = JSON.parse(localStorage.getItem("next_btn_click_timestamps") || "[]");
    try {
      fetch(BACKEND_URL + "/update-btn-click-timestamps", {
        method: "POST",
        body: JSON.stringify({ username: playerName, timestamps: nextBtnClickTimestamps, btn_type: "next" }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  }

  const recordNextBtnClick = () => {
    const nextBtnClickTimestamps = JSON.parse(localStorage.getItem("next_btn_click_timestamps") || "[]");
    nextBtnClickTimestamps.push(Date.now());
    localStorage.setItem("next_btn_click_timestamps", JSON.stringify(nextBtnClickTimestamps));

    updateNextBtnClickTimestamp();
  }

  const setChapterPreset = (searchParams : URLSearchParams) => {
    const chapterId = searchParams.get("story");
    if(chapterId !== null && chapterId.length > 0) {
      setChapter(parseInt(chapterId));
      setIsChapterPreset(true);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    if(params.size) {
      setSearchParamsInternal(params);
      setChapterPreset(params)
      localStorage.setItem("search-params", params.toString());
    } else {
      const savedParams = localStorage.getItem("search-params")
      if(savedParams !== null && savedParams.length > 0) {
        const savedParamsParsed = new URLSearchParams(savedParams);
        setSearchParamsInternal(savedParamsParsed);
        setChapterPreset(savedParamsParsed)
      }
    }
  }, [])

  return (
    <GameStateContext.Provider
      value={{
        chapter,
        setChapter,
        stepIndex,
        setStepIndex,
        correctQuizzes,
        addCorrectQuiz,
        playerName,
        setPlayerName,
        addNewBadge,
        setClickCounter,
        chapterDurationCounterStart,
        chapterDurationCounterStop,
        recordPrevBtnClick,
        recordNextBtnClick,
        showFeatures,
        searchParams,
        isChapterPreset
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
