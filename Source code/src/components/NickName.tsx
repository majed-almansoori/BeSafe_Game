import toast from "react-hot-toast";
import { BACKEND_URL } from "../constants";
import { useBackgroundContext } from "../utils/useBackground";
import { useGameStateContext } from "../utils/useGameState";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NickName = () => {
  const { setBackground } = useBackgroundContext();
  const { playerName, setPlayerName, searchParams } = useGameStateContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(playerName);
  const [pretestID, setPretestID] = useState<string>("");

  const setNicknameInServer = async () => {
    if (username === "") {
      toast.error("Please enter a nickname!");
      return;
    } else if (pretestID === "") {
      toast.error("Please enter your Prolific ID!");
      return;
    }

    try {
      const response = await fetch(BACKEND_URL + "/new", {
        method: "POST",
        body: JSON.stringify({ username, survey_id: pretestID }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status == 200 || response.status == 201) {
        toast.success("Welcome " + username + "!");
        setPlayerName(username);
        navigate("/chapters");
      } else if (response.status == 409) toast.error("Nickname alredy taken, please try another one!");
    } catch (error) {
      toast.error("Error sending POST request");
      console.error("Error sending POST request:", error);
    }
  };

  useEffect(() => {
    const prolificID = searchParams.get("prolific")
    if(prolificID !== null && prolificID.length > 0) {
      setPretestID(prolificID);
    }
  }, [searchParams]);

  setBackground("menu.jpg");
  return (
    <div className="main-menu">
      <div className="title">Enter nickname</div>
      <div className="options">
        <p style={{ color: "white", fontSize: "140%", fontWeight: "bold" }}>Type your nickname in the box:</p>
        <input
          id="playerName"
          type="text"
          onChange={(event) => {
            const value = event.target.value;
            setUsername(value);
          }}
          value={username}
          name="playerName"
          placeholder="How would you like to be called?"
          maxLength={16}
        />
        <p style={{ color: "white", fontSize: "140%", fontWeight: "bold" }}>Please check that your Prolific ID is correct:</p>
        <input
          id="pretest-id"
          type="text"
          onChange={(event) => {
            const value = event.target.value;
            setPretestID(value);
          }}
          name="pretest-id"
          value={pretestID}
          placeholder="Please enter your Prolific ID here"
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
