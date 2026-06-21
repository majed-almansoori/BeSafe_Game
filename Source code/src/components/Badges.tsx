import { IoMdClose } from "react-icons/io";
import { TOTAL_CHAPTERS } from "../constants";
import { useNavigate } from "react-router-dom";

const Badges = () => {
  const navigate = useNavigate();

  const acquiredBadges = JSON.parse(localStorage.getItem("badges") || "[]") as number[];

  return (
    <div className="badge all-badges">
      <IoMdClose className="close-btn" size={30} onClick={() => navigate(-1)} />
      <div className="badge-header">
        <h1>Badges</h1>
        <p>Acquire badges by completing chapters!</p>
      </div>
      <div className="badge-list">
        {[...Array(TOTAL_CHAPTERS)].map((_, index) => (
          <img
            src={`/images/badges/${index + 1}.png`}
            alt={`Badge for chapter ${index + 1}`}
            data-acquired={acquiredBadges.includes(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Badges;
