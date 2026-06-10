import { useState, useEffect } from "react";
import api from "../services/api";

function AdminDashboard () {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [contests ,setContests] = useState([]);

    const fetchContests = async () => {
        try{
            const res = await api.get("/contest");
            console.log(res.data);
            setContests(res.data);
        }catch(err){
            console.log(err);
        }
    
    }

    useEffect(() => {
        fetchContests();
    }, []);

    const handleCreateContest = async () => {
        try{
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await api.post(
                "/admin/contest/create", {
                    title,
                    description,
                    startTime,
                    endTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Contest Created, Successfully"),
           await fetchContests();
            setTitle("");
            setDescription("");
            setStartTime("");
            setEndTime("");
            console.log(res.data);
        }catch(err){
            console.log(err);
            alert(err.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    };
  
    return (
        
        <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Create Contest
        </h2>
    
    

        <input
          type="text"
          placeholder="Contest Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <textarea
          placeholder="Contest Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleCreateContest}
          disabled= {loading}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Contest"}
        </button>
      </div>
          <div className="mt-6">
    <h2 className="text-xl font-bold mb-2">
        Available Contests
    </h2>

    {contests.map((contest) => (
        <div
            key={contest.id}
            className="border p-3 rounded mb-2"
        >
            {contest.title}
        </div>
       ))}
      </div>
    </div>
    );
}

export default AdminDashboard;