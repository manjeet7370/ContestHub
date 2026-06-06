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
    <div className="max-w-5xl mx-auto p-6">

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold mb-3">
                {contest.title}
            </h1>

            <p className="text-gray-600">
                {contest.description}
            </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
            Problems
        </h2>

        <div className="grid gap-4">
            {contest.problem?.map((problem) => (
                <div
                    key={problem.id}
                    className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
                >
                    <Link to={`/problem/${problem.id}`}>
                        <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                            {problem.title}
                        </h3>
                    </Link>

                    <p className="mt-2 text-gray-600">
                        {problem.description}
                    </p>

                    <span className="inline-block mt-3 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {problem.difficulty}
                    </span>
                </div>
            ))}
        </div>

    </div>
);
}

export default ContestsDeatils