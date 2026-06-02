import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProblemDeatils (){

    const {id} = useParams();

    const [problem, setProblem] = useState(null);
    const [language, setLanguage] = useState("Python");
    const [code, setCode] = useState("")

    useEffect(() => {
        const fetchContest = async () => {
            try{
                const res = await api.get(`/problem/${id}`);
                console.log(res.data)

                setProblem(res.data.problem)
            }catch(err){
                console.log(err)
            }
        }
        fetchContest();
    }, [id]);

    if(!problem){
        return <h2>Loading</h2>
    }

   const  handleSubmit  = async () => {
      
        try{
            const token = localStorage.getItem("token");

            const res = await api.post(
                "/submission/create",
                {
                    problemId: id,
                    language,
                    code,
                },
                {
                    headers: {
                        Authorization : `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data);
        }catch(err){
            console.log(err.res?.data)
        }
    }
    localStorage.getItem("token")

    return (
        <div>
            <h1>{problem.title}</h1>
            <p>{problem.difficulty}</p>
            <p>{problem.statement}</p>

            <h2>Submit Solution</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
             >
                <option>JavaScript</option>
                <option>C++</option>
                <option>Python</option>
            </select>

            <br />
            <br />

            <textarea 
              rows = "10"
              cols=  "60"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder=" Write your code here..."
            ></textarea>

            <br />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ProblemDeatils