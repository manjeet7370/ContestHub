import { useEffect, useState } from "react";
import api from "../services/api";

function MySubmissions() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmission = async () => {
            try{
                const token = localStorage.getItem("token");

                const res = await api.get("/submission/my", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res.data)
                setSubmissions(res.data.submission);
            }catch(err){
                console.log(err);
            }
        };
    fetchSubmission();
    }, []);
   
return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                My Submissions
            </h1>

            {submissions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <p className="text-gray-500">
                        No submissions found.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left p-4">ID</th>
                                    <th className="text-left p-4">Language</th>
                                    <th className="text-left p-4">Verdict</th>
                                </tr>
                            </thead>

                            <tbody>
                                {submissions.map((submission) => (
                                    <tr
                                        key={submission.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-medium">
                                            #{submission.id}
                                        </td>

                                        <td className="p-4">
                                            {submission.language}
                                        </td>

                                        <td className="p-4">
                                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                                                {submission.verdict}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            )}

        </div>
    </div>
);
}

export default MySubmissions;