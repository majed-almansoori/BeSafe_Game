import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu, IoMdBook } from "react-icons/io";
import { IoPodiumOutline } from "react-icons/io5";
import { BsPause } from "react-icons/bs";
import { SlBadge } from "react-icons/sl";
import { useGameStateContext } from "../utils/useGameState";

const Hamburger = () => {
  const { setClickCounter, chapterDurationCounterStop, showFeatures } = useGameStateContext();
  const [isOpen, setIsOpen] = useState(false);

  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!hamburgerRef.current) return;

      if (!hamburgerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div className="hamburger" ref={hamburgerRef} onClick={() => setIsOpen(true)}>
      <IoIosMenu size={30} />
      <div className="menu-list" data-open={isOpen}>
        <Link to="/" className="menu-item" onClick={chapterDurationCounterStop}>
          <BsPause size={25} /> Pause game
        </Link>
        <Link to="/chapters" className="menu-item" onClick={chapterDurationCounterStop}>
          <IoMdBook size={25} /> All chapters
        </Link>
        {showFeatures && (
          <>
            <Link
              to="/leaderboard"
              className="menu-item"
              onClick={() => {
                setClickCounter("leaderboard");
                chapterDurationCounterStop();
              }}
            >
              <IoPodiumOutline size={25} /> Leaderboard
            </Link>
            <Link
              to="/badges"
              className="menu-item"
              onClick={() => {
                setClickCounter("badge");
                chapterDurationCounterStop();
              }}
            >
              <SlBadge size={25} /> Badges
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Hamburger;
