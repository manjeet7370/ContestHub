import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api"
import { Link } from "react-router-dom";

function ContestsDeatils() {
    const {id} = useParams();

    const [contest, setContest] = useState(null);

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const res = await api.get(`/contest/${id}`);
                console.log(res.data.contest)
         
                setContest(res.data.contest)
            }catch(err){
                console.log(err)
            }
        };

        fetchContest();
    }, [id])

    if(!contest){
        return <h2>Loading...</h2>
    }
    return (
        <div>
           <h1>{contest.title}</h1>

           <p>{contest.description}</p>

           <h2>Problem</h2>
           {contest.problem?.map((problem) => (
            <div key={problem.id}>
                <Link to={`/problem/${problem.id}`}>
                 <h3>{problem.title}</h3>
                </Link>
                <p>{problem.description}</p>
                {/* <p>{problem.statement}</p> */}
                <p>{problem.difficulty}</p>
            </div>
           ))}
        </div>
        
    )
}

export default ContestsDeatils