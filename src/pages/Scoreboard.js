import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../style/Homescreen.css";

import { ScoreContext } from "../contexts/ScoreContext.js";

import CorrectTick from "../components/correctTick.js";
import WrongTick from "../components/wrongTick.js";
import FinalLine from "../components/finalLine.js";
import RestartLine from "../components/restartLine.js";
import QuestionLine from "../components/questionLine.js";

function Scoreboard() {
  const [questionList, setQuestionList] = useState([]);
  
  const { sessionQ, sessionP, sessionCA} = useContext(ScoreContext);

  useEffect(() => {
      
    setQuestionList(JSON.parse(localStorage.getItem("questionArray")));
    localStorage.setItem("totalP", parseInt(localStorage.getItem("totalP"))+sessionP);
    localStorage.setItem("totalQ", parseInt(localStorage.getItem("totalQ"))+sessionQ);
    localStorage.setItem("totalCA", parseInt(localStorage.getItem("totalCA"))+sessionCA);
  }, []);


  return (
    <div className="containScore">
      <div id="finalScreen">
        <div id="column1">
          <div id="final">Final</div>
          <FinalLine />
          <div id="pointFinal">Point: {sessionP}</div>
          <div id="questionsFinal">Questions: {sessionQ}</div>
          <div id="correctAnswers">Correct Answers: {sessionCA}</div>
          <div id="restartButton">
            <RestartLine />

            <div id="restart">
              <a href="game">
                <Link to="/game">Restart</Link>
              </a>
            </div>
          </div>
        </div>
        <div id="column2">
          <div id="allQuestion">All Question</div>
          <QuestionLine />
          {questionList.map((question, index) => {
    return (
      <div className="columnQuestion" key={index}>
        <div className="finalQuestion">{question.question}</div>
        {question.answer ? <CorrectTick /> : <WrongTick />}
      </div>
    );
  })}
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
