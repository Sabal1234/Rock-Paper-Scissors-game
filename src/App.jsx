import "./App.css";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useState } from "react";

const actionIcons = {
  rock: FaHandRock,
  paper: FaHandPaper,
  scissors: FaHandScissors,
};

function getRandomAction() {
  const actions = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * actions.length);
  return actions[randomIndex];
}

function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player"; 
  }
  return "computer"; 
}

function ActionIcon({ action, size }) {
  const Icon = actionIcons[action];



  return <Icon size={size} />;
}

function Player({ name, score, action }) {
  return (
    <div className="player">
      <div className="score">{name}: {score}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action, onClick }) {
  return (
    <button className="round-btn" onClick={() => onClick(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}


function ShowWinner({ winner }) {
  let message = "";
  if (winner === "tie") {
     message = "It's a Tie!";
  }
  else if (winner === "player") {
     message = "You lose";
  }
  else {
    message = "You Lose!";
  }
  return <h2>{message}</h2>;
}

function App() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameResult, setGameResult] = useState(""); 
  const handleActionClick = (choice) => {
    const computerChoice = getRandomAction();  
    setPlayerChoice(choice);  
    setComputerChoice(computerChoice);  

    const result = getWinner(choice, computerChoice);
    setGameResult(result);
    if (result === "player") {
      setPlayerScore(playerScore + 1);
    } else if (result === "computer") {
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div className="main-container">
      <h1>Rock Paper Scissors Game</h1>
      <div className="container">
        <Player name="Player" score={playerScore} action={playerChoice} />
        <Player name="Computer" score={computerScore} action={computerChoice} />
      </div>
      <div className="actions">
        <ActionButton action="rock" onClick={handleActionClick} />
        <ActionButton action="paper" onClick={handleActionClick} />
        <ActionButton action="scissors" onClick={handleActionClick} />
      </div>
      <ShowWinner winner={gameResult} />
    </div>
  );
}

export default App;
