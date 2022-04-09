import React from "react";
import { Routes, Route  } from "react-router-dom";

import Homescreen from '../pages/Homescreen';
import Game from '../pages/Game';
import Scoreboard from '../pages/Scoreboard';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homescreen/>}/>

      <Route path="game" element={<Game/>}/>

      <Route path="scoreboard" element={<Scoreboard/>}/>

    </Routes>
  );
}

export default Router;