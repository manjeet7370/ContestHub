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
        fetchProblems();
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

    const [problemTitle , setProblemTitle] = useState("");
    const [statement, setStatement] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [contestId, setContestId] = useState("");

    const handleCreateProblem  = async () => {
        try{
            const token = localStorage.getItem("token");

            const res = await api.post(
                "/admin/problem/create",
                {
                    title : problemTitle,
                    statement,
                    difficulty,
                    contestId: Number(contestId),
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            alert("Problem Created Successfully");
            setProblemTitle("");
            setStatement("");
            setDifficulty("Easy");
            setContestId("");
            console.log(res.data);

            
        }catch(err){
            console.log(err);
        }
    }

    const [problemId, setProblemId] = useState("");
    const [input, setInput]= useState("");
    const [expectedOutput, setExpectedOutput] = useState("");
    const [explanation, setExplanation] = useState("");
    const [problems, setProblems] = useState([]);

    const fetchProblems = async () => {
        try{
            const res = await api.get("/problem");

            setProblems(res.data);
        }catch(err){
            console.log(err);
        }
    }
const handleCreateTestCase = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await api.post(
            "/admin/testcase/create",
            {
                problemId,
                input,
                expectedOutput,
                explanation,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert("Test Case Created Successfully");

        setProblemId("");
        setInput("");
        setExpectedOutput("");
        setExplanation("");

        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
};

const [example1Input, setExample1Input] = useState("");
const [example1Output, setExample1Output] = useState("");
const [example1Explanation, setExample1Explanation] = useState("");

const [example2Input, setExample2Input] = useState("");
const [example2Output, setExample2Output] = useState("");
const [example2Explanation, setExample2Explanation] = useState("");

const [example3Input, setExample3Input] = useState("");
const [example3Output, setExample3Output] = useState("");
const [example3Explanation, setExample3Explanation] = useState("");

return (
  <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50 text-slate-800 font-sans">
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-8">
      Admin Dashboard
    </h1>

    {/* Create Contest Card */}
    <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">
        Create Contest
      </h2>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Contest Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none"
        />

        <textarea
          placeholder="Contest Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none resize-y"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
              Start Time
            </span>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors hover:border-slate-400 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
              End Time
            </span>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors hover:border-slate-400 outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleCreateContest}
            disabled={loading}
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </div>
      </div>
    </div>

    {/* Create Problem & Test Cases Card */}
    <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">
        Create Problem
      </h2>

      <div className="space-y-6">
        {/* Problem Details */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Problem Title"
            value={problemTitle}
            onChange={(e) => setProblemTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none"
          />

          <textarea
            placeholder="Problem Statement"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            rows={4}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none resize-y"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors hover:border-slate-400 outline-none cursor-pointer"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={contestId}
              onChange={(e) => setContestId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors hover:border-slate-400 outline-none cursor-pointer"
            >
              <option value="">Select Contest</option>
              {contests && contests.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Example Test Cases Section */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-5">
            Sample Test Cases
          </h3>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 flex items-center">
                <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</span>
                Example 1
              </h4>
              <div className="space-y-4">
                <textarea
                  placeholder="Test Case Input"
                  value={example1Input}
                  onChange={(e) => setExample1Input(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none font-mono"
                />
                <textarea
                  placeholder="Expected Output"
                  value={example1Output}
                  onChange={(e) => setExample1Output(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none font-mono"
                />
                <textarea
                  placeholder="Explanation (Optional)"
                  value={example1Explanation}
                  onChange={(e) => setExample1Explanation(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 flex items-center">
                <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</span>
                Example 2
              </h4>
              <div className="space-y-4">
                <textarea
                  placeholder="Test Case Input"
                  value={example2Input}
                  onChange={(e) => setExample2Input(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none font-mono"
                />
                <textarea
                  placeholder="Expected Output"
                  value={example2Output}
                  onChange={(e) => setExample2Output(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none font-mono"
                />
                <textarea
                  placeholder="Explanation (Optional)"
                  value={example2Explanation}
                  onChange={(e) => setExample2Explanation(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 flex items-center">
                <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</span>
                Example 3
              </h4>
              <div className="space-y-4">
                <textarea
                  placeholder="Test Case Input"
                  value={example3Input}
                  onChange={(e) => setExample3Input(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none font-mono"
                />
                <textarea
                  placeholder="Expected Output"
                  value={example3Output}
                  onChange={(e) => setExample3Output(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none font-mono"
                />
                <textarea
                  placeholder="Explanation (Optional)"
                  value={example3Explanation}
                  onChange={(e) => setExample3Explanation(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 transition-colors hover:border-slate-400 placeholder-slate-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center">
          <button
            onClick={handleCreateProblem}
            disabled={loading}
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-emerald-300 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? "Creating..." : "Create Problem"}
          </button>
        </div>
      </div>
    </div>

    {/* Available Contests Section */}
    <div className="mt-10">
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-1">
        Available Contests
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contests && contests.map((contest) => (
          <div
            key={contest.id}
            className="group relative bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-default flex items-center justify-between"
          >
            <span className="font-semibold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
              {contest.title}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors shrink-0 ml-3">
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default AdminDashboard;