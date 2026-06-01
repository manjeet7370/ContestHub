import {Routes , Route} from "react-router-dom"
import Contests from "./pages/Contests";
import ContestsDeatils from "./pages/ContestDetails";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Contests/>} />
        <Route path="/contest/:id" element={<ContestsDeatils/>} />
      </Routes>
  );
}

export default App;