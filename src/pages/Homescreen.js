import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../style/Homescreen.css";
import { ScoreContext } from "../contexts/ScoreContext.js";

function Homescreen() {
  const { totalQ, totalCA, totalP, checkPoint } = useContext(ScoreContext);

  useEffect(() => {
    //Puanları getirir
    checkPoint();
  }, []);

  return (
    <div className="containHome">
      <div className="startPage" id="header">
        Mathematics Game
      </div>
      <svg id="headerLine" width="640" height="10" viewBox="0 0 640 10">
        <path
          fill="#FF0000"
          d="M639.998 1.72994C641.22 -1.50429 12.5197 0.574858 5.18769 1.72994C-2.14435 2.88503 -1.30127 5.72697 5.18769 9.1225C11.6766 12.518 619.626 4.96418 619.626 4.96418C619.626 4.96418 638.776 4.96418 639.998 1.72994Z"
        />
      </svg>
      <div className="startPage" id="totalP">
        Total Point: {totalP}
      </div>
      <div className="startPage" id="totalQ">
        Total Questions: {totalQ}
      </div>
      <div className="startPage" id="correctA">
        Correct Answers: {totalCA}
      </div>
      <div className="start">
        <svg id="startLine" width="447" height="139" viewBox="0 0 447 139">
          <path
            d="M28.965 97.6124C-59.2656 35.2924 132.507 6.33039 232.022 7.29094C241.757 5.44668 225.802 4.40928 216.608 4.1211C138.456 2.19999 0 20.5466 0 64.9243C0 128.609 174.422 137.254 214.986 138.695C289.622 141.346 465.667 127.457 445.385 67.5178C425.103 7.5791 257.171 -1.01049 203.628 0.0867675C169.879 0.778373 177.667 3.06449 185.78 4.1211C362.636 -1.93041 440.737 49.1335 440.737 75.3567C440.737 147.687 99.5451 147.465 28.965 97.6124Z"
            fill="white"
          />
        </svg>
        <div className="startPage" id="startButton">
          <Link to="/Game">Start</Link>
        </div>
      </div>
    </div>
  );
}

export default Homescreen;
