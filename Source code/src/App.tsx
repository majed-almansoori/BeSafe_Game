import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainMenu from "./components/MainMenu";
import { BackgroundProvider } from "./utils/useBackground";
import { GameStateProvider } from "./utils/useGameState";
import GamePlay from "./components/GamePlay";
import Chapters from "./components/Chapters";
import NickName from "./components/NickName";
import LeaderBoard from "./components/LeaderBoard";
import { useState } from "react";
import Badges from "./components/Badges";

function FullScreenDialog({ isOpen, onConfirm }: { isOpen: boolean; onConfirm: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fullscreen-dialog-overlay">
      <div className="fullscreen-dialog">
        <p>This game runs best in full screen landscape mode.</p>
        <button onClick={onConfirm}>Proceed to the game</button>
      </div>
    </div>
  );
}

function App() {
  const [isFullScreenDialogOpen, setFullScreenDialogOpen] = useState(true);

  function requestFullScreen() {
    var root = document.documentElement;
    if (root && root.requestFullscreen) root.requestFullscreen();
    // @ts-ignore
    window.screen.orientation.lock("landscape");
  }

  function handleConfirm() {
    setFullScreenDialogOpen(false);
    requestFullScreen();
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <FullScreenDialog isOpen={isFullScreenDialogOpen} onConfirm={handleConfirm} />
      <GameStateProvider>
        <BackgroundProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<MainMenu />} />
              <Route path="play" element={<GamePlay />} />
              <Route path="chapters" element={<Chapters />} />
              <Route path="nickname" element={<NickName />} />
              <Route path="leaderboard" element={<LeaderBoard />} />
              <Route path="badges" element={<Badges />} />
            </Routes>
          </BrowserRouter>
        </BackgroundProvider>
      </GameStateProvider>
    </>
  );
}

export default App;
