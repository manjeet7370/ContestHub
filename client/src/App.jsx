import {Routes , Route} from "react-router-dom"
import Contests from "./pages/Contests";
import ContestsDeatils from "./pages/ContestDetails";
import ProblemDeatils from "./pages/ProblemDetails";
import Login from "./pages/Login";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Contests/>} />
        <Route path="/contest/:id" element={<ContestsDeatils/>} />
        <Route path="/problem/:id" element={<ProblemDeatils/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
  );
}

export default App;