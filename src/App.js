import "./style/App.css";
import Router from "./router/router";
import { ScoreProvider } from "./contexts/ScoreContext.js";

function App() {
  return (
    <ScoreProvider>
      <Router />
    </ScoreProvider>
  );
}

export default App;
