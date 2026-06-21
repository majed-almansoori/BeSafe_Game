import { useEffect, useState } from "react";
import { useBackgroundContext } from "../utils/useBackground";
import { useGameStateContext } from "../utils/useGameState";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types";
import { BACKEND_URL } from "../constants";

const LeaderBoard: React.FC = () => {
  const { setBackground } = useBackgroundContext();
  const { chapter, playerName } = useGameStateContext();
  const navigate = useNavigate();

  const [showContinue, setShowContinue] = useState(false);
  const [scoreRecords, setScoreRecords] = useState<IUser[]>([]);

  useEffect(() => {
    setShowContinue(true);
  }, [chapter]);

  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        const response = await fetch(BACKEND_URL + "/users");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        const users = data as IUser[];
        setScoreRecords(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScoreData();
  }, []);
  setBackground("menu.jpg");

  return (
    <div className="leaderboard">
      <div className="heading1">Leaderboard</div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scoreRecords.map((user, index) => (
              <tr key={user.id} className={user.username === playerName ? "current-player" : ""}>
                <td>{index + 1}</td>
                <td className="username">{user.username}</td>
                <td className="score">{user.knowledge_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="options">
        {showContinue && <button onClick={() => navigate(-1)}>Go Back</button>}
      </div>
    </div>
  );
};

export default LeaderBoard;
