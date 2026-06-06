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
  <div className="max-w-5xl mx-auto p-6">
    
    <h1 className="text-3xl font-bold mb-6">
      All Contests
    </h1>

    <div className="grid gap-4">
      {contest.map((contest) => (
        <div
          key={contest.id}
          className="border rounded-lg p-5 shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">
            {contest.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {contest.description}
          </p>

          <Link
            to={`/contest/${contest.id}`}
            className="inline-block mt-4 text-blue-600 font-medium"
          >
            View Contest →
          </Link>
        </div>
      ))}
    </div>

  </div>
);
}

export default Contests;