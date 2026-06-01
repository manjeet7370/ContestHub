import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api"

function ContestsDeatils() {
    const {id} = useParams();

    const [contest, setContest] = useState(null);

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const res = await api.get(`/contest/${id}`);
                console.log(res.data)
                setContest(res.data)
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
        </div>
    )
}

export default ContestsDeatils