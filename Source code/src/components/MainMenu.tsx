import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { useBackgroundContext } from "../utils/useBackground";
import { useNavigate } from "react-router-dom";
import { useGameStateContext } from "../utils/useGameState";
import { BACKEND_URL, TOTAL_CHAPTERS } from "../constants";
import toast from "react-hot-toast";

function generateRandomString(length: number): string {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const getPosttestID = (isChapterPreset : boolean): string | null => {
  const badges: number[] = JSON.parse(localStorage.getItem("badges") || "[]");
  const isGameOver = badges.length === TOTAL_CHAPTERS || (isChapterPreset && badges.length === 1);

  if (!isGameOver) {
    return null;
  }

  var posttestID = localStorage.getItem("posttest_id");
  if (!posttestID) {
    posttestID = generateRandomString(15);
    localStorage.setItem("posttest_id", posttestID);

    fetch(`${BACKEND_URL}/posttest-id`, {
      method: "POST",
      body: JSON.stringify({ username: localStorage.getItem("player_name"), survey_id: posttestID }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to send posttest ID");
        }
      })
      .catch((error) => {
        console.error("Error sending posttest ID:", error);
      });
  }

  return posttestID;
};

const MainMenu = () => {
  const { setBackground } = useBackgroundContext();
  const { setChapter, setStepIndex, setClickCounter, showFeatures, searchParams, isChapterPreset } = useGameStateContext();
  const navigate = useNavigate();

  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const savedChapter = localStorage.getItem("chapter");
    const nickname = localStorage.getItem("player_name");
    if (savedChapter && nickname) setShowContinue(true);
  }, [localStorage]);

  const nickname = localStorage.getItem("player_name");

  const handleNewGame = () => {
    if (nickname) {
      localStorage.clear();
      setStepIndex(0);
      localStorage.setItem("player_name", nickname);
      if(searchParams.size) {
        localStorage.setItem("search-params", searchParams.toString())
      } else {
        setChapter(1);
      }
      navigate("/play");
    } else {
      localStorage.clear();
      if(searchParams.size) localStorage.setItem("search-params", searchParams.toString())
      navigate("/nickname");
    }
  };

  const handleCopy = () => {
    const posttestID = getPosttestID(isChapterPreset);
    if (posttestID) {
      toast.promise(navigator.clipboard.writeText(posttestID), {
        loading: "Copying...",
        success: "Copied to clipboard",
        error: "Failed to copy",
      });
    }
  };

  const posttestID = getPosttestID(isChapterPreset);

  setBackground("menu.jpg");

  return (
    <div className="main-menu">
      <div className="title">BeSafe</div>
      {nickname && <div className="subtitle">Welcome back, {nickname}!</div>}
      <div className="options">
        {showContinue && <button onClick={() => navigate("/play")}>Continue Playing</button>}
        <button onClick={handleNewGame}>New Game</button>
        {showFeatures && showContinue && (
          <>
            <button onClick={() => navigate("/chapters")}>Chapters</button>
            <button
              onClick={() => {
                setClickCounter("leaderboard");
                navigate("/leaderboard");
              }}
            >
              Leaderboard
            </button>
            <button
              onClick={() => {
                setClickCounter("badge");
                navigate("/badges");
              }}
            >
              Badges
            </button>
          </>
        )}
      </div>
      {posttestID !== null && (
        <div className="posttest-id">
          <div className="label">Please copy and paste the following code in the next survey to get the payment.</div>
          <div className="code-container" onClick={handleCopy}>
            <div className="code">{posttestID}</div>
            <IoCopyOutline className="copy" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
