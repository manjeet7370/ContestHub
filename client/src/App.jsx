import {Routes , Route} from "react-router-dom"
import Contests from "./pages/Contests";
import ContestsDeatils from "./pages/ContestDetails";
import ProblemDeatils from "./pages/ProblemDetails";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Contests/>} />
        <Route path="/contest/:id" element={<ContestsDeatils/>} />
        <Route path="/problem/:id" element={<ProblemDeatils/>} />
      </Routes>
  );
}

export default App;