import  { useEffect , useState} from "react"
import api from "../services/api"
import axios from "axios";
import { Link } from "react-router-dom";

function Contests() {
    const [contest, setContest] = useState([]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await api.get("/contest");
                console.log(res.data);
                setContest(res.data);
            }catch(err){
                console.log(err)
            }
        };
        fetchContests();
    }, []);
  return (
    <div>
      <h1>All Contests</h1>
      {contest.map((contest) => (
        <div key={contest.id}>
            <h2>{contest.title}</h2>
            <p>{contest.description}</p>
        </div>
      ))}
      <Link to={`/contest/${contest.id}`}>
      <h2>{contest.title}</h2>
      </Link>
    </div>
  );
}

export default Contests;