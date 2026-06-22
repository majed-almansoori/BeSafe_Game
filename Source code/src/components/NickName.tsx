import toast from "react-hot-toast";
import { BACKEND_URL } from "../constants";
import { useBackgroundContext } from "../utils/useBackground";
import { useGameStateContext } from "../utils/useGameState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NickName = () => {
  const { setBackground } = useBackgroundContext();
  const { playerName, setPlayerName } = useGameStateContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(playerName);

  const setNicknameInServer = async () => {
    if (username === "") {
      toast.error("Please enter a nickname!");
      return;
    }

    try {
      const response = await fetch(BACKEND_URL + "/new", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Welcome " + username + "!");
        setPlayerName(username);
        navigate("/chapters");
      } else if (response.status === 409) {
        toast.error("Nickname already taken, please try another one!");
      }
    } catch (error) {
      toast.error("Error sending POST request");
      console.error("Error sending POST request:", error);
    }
  };

  setBackground("menu.jpg");

  return (
    <div className="main-menu">
      <div className="title">Enter nickname</div>
      <div className="options">
        <p style={{ color: "white", fontSize: "140%", fontWeight: "bold" }}>
          Type your nickname in the box:
        </p>

        <input
          id="playerName"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          name="playerName"
          placeholder="How would you like to be called?"
          maxLength={16}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setNicknameInServer();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NickName;
