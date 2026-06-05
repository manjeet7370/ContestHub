import { useEffect, useState } from "react";
import api from "../services/api";

function MySubmissions() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmission = async () => {
            try{
                const token = localStorage.getItem("token");

                const res = await api.get("/submission/my", {
                    header: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res.data)
                setSubmissions(res.data.submissions);
            }catch(err){
                console.log(err);
            }
        };
    fetchSubmission();
    }, []);
   
    return (
        <div>
            <h2>My Submissions</h2>

            {submissions.map((submission) => (
                <div key={submission.id}>
                    <p>Language: {submission.language}</p>
                    <p>Verdict: {submission.verdict}</p>
                </div>
                    
            ))}
        </div>
    )
}

export default MySubmissions;