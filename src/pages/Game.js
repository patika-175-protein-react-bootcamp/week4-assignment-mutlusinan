import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../contexts/ScoreContext.js";

import "../style/Homescreen.css";

import TeacherSVG from "../components/teacherSVG.js";
import AnswerLine from "../components/answerLine.js";

let questionArray = [];

//Session skor

function Game() {
  //Sorunun doğru cevabı
  const [correctAnswer, setCorrectAnswer] = useState(0);
  //Seçeneğin çizgi renkleri
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  //Soru kaç puan
  const [questionPoint, setQuestionPoint] = useState(0);
  //Buton tıklanabilir mi?
  const [binarya, setBinarya] = useState(true);
  //İşlemin ilk elemanı
  const [first, setFirst] = useState(0);
  //İşlemin ikinci elemanı
  const [second, setSecond] = useState(0);
  const [answerArray, setAnswerArray] = useState([]);

  let navigate = useNavigate();
  const {
    kacSoru,
    kacDogru,
    kacPuan,
    sessionQ,
    sessionP,
    sessionCA,
    tour,
    newGame,
  } = useContext(ScoreContext);

  useEffect(() => {
    //Puanları getirir
    newGame();
    newQuestion();
    questionArray = [];
  }, []);

  function newQuestion() {
    //Sayıları oluşturur
    setFirst(Math.floor(Math.random() * 8) + 2);
    setSecond(Math.floor(Math.random() * 8) + 2);
    //Sayıları rastgele şıklara yerleştirir
    let random1 = Math.floor(Math.random() * 3);
    let random2 = (random1 + Math.floor(Math.random() * 2 + 1)) % 3;
    let random3 = (3 - ((random1 + random2) % 3)) % 3;
    let answerArray2 = [];
    answerArray2[random1] = first * second;
    answerArray2[random2] = (first - 1) * second;
    answerArray2[random3] = (second + 1) * first;
    //Oluşturduğumuz array'i state'e atama
    setAnswerArray(answerArray2);
    //Doğru cevap
    setCorrectAnswer(first * second);
    //Doğru cevabın kaç puan olacağı
    setQuestionPoint(Math.floor(Math.sqrt(first * second)));
    console.log(answerArray);
  }

  function answered(session, answerNumber, binarya) {
    if (binarya) {
      setBinarya(false);
      answer(answerNumber);
      if ((session + 1) % 8 === 0) {
        localStorage.setItem("questionArray", JSON.stringify(questionArray));
        console.log(questionArray);
        setTimeout(function () {
          setBinarya(true);
          backToNormal();
          navigate("/scoreboard");
        }, 3000);
      } else {
        setTimeout(function () {
          setBinarya(true);
          backToNormal();
          newQuestion();
        }, 500);
      }
    }
  }

  function backToNormal() {
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    document.body.style.backgroundColor = "#2D2D2D";
  }

  function answer(answerNumber) {
    switch (answerNumber) {
      case 1:
        setAnswer1("black");
        break;
      case 2:
        setAnswer2("black");
        break;
      case 3:
        setAnswer3("black");
        break;
      default:
    }
    if (answerNumber === correctAnswer) {
      //Soruları ve cevapları bas

      questionArray.push({
        question: first + " X " + second + " = " + first * second,
        answer: true,
      });

      document.body.style.backgroundColor = "#00BF63";
      kacSoru(1);
      kacDogru(1);
      kacPuan(questionPoint);
    } else {
      //Soruları ve cevapları bas
      questionArray.push({
        question: first + " X " + second + " = " + first * second,
        answer: false,
      });

      document.body.style.backgroundColor = "#FA0000";
      kacSoru(1);
      switch (correctAnswer) {
        case 1:
          setAnswer1("#00BF63");
          break;
        case 2:
          setAnswer2("#00BF63");
          break;
        case 3:
          setAnswer3("#00BF63");
          break;
        default:
      }
    }
  }

  return (
    <div className="containerGame">
      <TeacherSVG />
      <span id="question">
        {first} X {second}
      </span>
      <div className="scoreboard">
        <span id="score">Score: {sessionP}</span>
        <span id="tour">Tour: {tour}</span>
        <span id="questions">
          Questions: {sessionCA}/{sessionQ}
        </span>
      </div>
      <div className="answers">
        <span className="answerBlock" id="answerBlock1">
          <AnswerLine fill={answer1 || "white"} />
          <span
            className="answer"
            onClick={() => answered(sessionQ, answerArray[0], binarya)}
          >
            {answerArray[0]}
          </span>
        </span>
        <span className="answerBlock" id="answerBlock2">
          <AnswerLine fill={answer2 || "white"} />
          <span
            className="answer"
            onClick={() => answered(sessionQ, answerArray[1], binarya)}
          >
            {answerArray[1]}
          </span>
        </span>
        <span className="answerBlock" id="answerBlock3">
          <AnswerLine fill={answer3 || "white"} />
          <span
            className="answer"
            onClick={() => answered(sessionQ, answerArray[2], binarya)}
          >
            {answerArray[1]}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Game;
