import { useState, useEffect } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState([]);

  const fetchContests = async () => {
    try {
      const res = await api.get("/contest");
      console.log(res.data);
      setContests(res.data);
      console.log(res.data.problem.testCases);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContests();
    fetchProblems();
  }, []);

  const handleCreateContest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/admin/contest/create",
        {
          title,
          description,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      (alert("Contest Created, Successfully"), await fetchContests());
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [problemTitle, setProblemTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [contestId, setContestId] = useState("");

  const [example1Input, setExample1Input] = useState("");
  const [example1Output, setExample1Output] = useState("");
  const [example1Explanation, setExample1Explanation] = useState("");

  const [example2Input, setExample2Input] = useState("");
  const [example2Output, setExample2Output] = useState("");
  const [example2Explanation, setExample2Explanation] = useState("");

  const [example3Input, setExample3Input] = useState("");
  const [example3Output, setExample3Output] = useState("");
  const [example3Explanation, setExample3Explanation] = useState("");

  const handleCreateProblem = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/admin/problem/create",
        {
          title: problemTitle,
          statement,
          difficulty,
          contestId: Number(contestId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const problemId = res.data.problem.id;

      await api.post(
        "/admin/testcase/create",
        {
          problemId,
          input: example1Input,
          expectedOutput: example1Output,
          explanation: example1Explanation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await api.post(
        "/admin/testcase/create",
        {
          problemId,
          input: example2Input,
          expectedOutput: example2Output,
          explanation: example2Explanation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await api.post(
        "/admin/testcase/create",
        {
          problemId,
          input: example3Input,
          expectedOutput: example3Output,
          explanation: example3Explanation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Problem + Test Cases Created Successfully");
      // alert("Problem Created Successfully");
      setProblemTitle("");
      setStatement("");
      setDifficulty("Easy");
      setContestId("");
      // const problemId = res.data.problem.id;
      setExample1Input("");
      setExample1Output("");
      setExample1Explanation("");

      setExample2Input("");
      setExample2Output("");
      setExample2Explanation("");

      setExample3Input("");
      setExample3Output("");
      setExample3Explanation("");

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [problemId, setProblemId] = useState("");
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const res = await api.get("/problem");

      setProblems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
        },
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

// Define these shared classes at the top of your component or file
const inputBase = "w-full bg-slate-50 border border-slate-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-colors";
const cardBase = "bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm";
const btnBase = "px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-60 transition-colors w-full sm:w-auto";
const sectionTitle = "text-xl font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3";

return (
  <div className="max-w-5xl mx-auto p-4 sm:p-6 min-h-screen text-slate-800 font-sans">
    <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Admin Dashboard</h1>

    {/* Create Contest */}
    <div className={cardBase}>
      <h2 className={sectionTitle}>Create Contest</h2>
      <div className="space-y-4">
        <input type="text" placeholder="Contest Title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputBase} />
        <textarea placeholder="Contest Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputBase} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Start Time</label>
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputBase} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">End Time</label>
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputBase} />
          </div>
        </div>
        <button onClick={handleCreateContest} disabled={loading} className={btnBase}>
          {loading ? "Creating..." : "Create Contest"}
        </button>
      </div>
    </div>

    {/* Create Problem */}
    <div className={cardBase}>
      <h2 className={sectionTitle}>Create Problem</h2>
      <div className="space-y-4">
        <input type="text" placeholder="Problem Title" value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} className={inputBase} />
        <textarea placeholder="Problem Statement" value={statement} onChange={(e) => setStatement(e.target.value)} rows={4} className={inputBase} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={inputBase}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={contestId} onChange={(e) => setContestId(e.target.value)} className={inputBase}>
            <option value="">Select Contest</option>
            {contests?.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>

        {/* Sample Test Cases */}
        <h3 className="text-lg font-semibold text-slate-800 pt-4">Sample Test Cases</h3>
        <div className="space-y-4">
          {[ 
            { num: 1, i: example1Input, setI: setExample1Input, o: example1Output, setO: setExample1Output, e: example1Explanation, setE: setExample1Explanation },
            { num: 2, i: example2Input, setI: setExample2Input, o: example2Output, setO: setExample2Output, e: example2Explanation, setE: setExample2Explanation },
            { num: 3, i: example3Input, setI: setExample3Input, o: example3Output, setO: setExample3Output, e: example3Explanation, setE: setExample3Explanation }
          ].map((tc) => (
            <div key={tc.num} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="text-sm font-bold text-slate-600 mb-3">Example {tc.num}</h4>
              <div className="grid gap-3">
                <textarea placeholder="Input" value={tc.i} onChange={(e) => tc.setI(e.target.value)} rows={2} className={`${inputBase} font-mono`} />
                <textarea placeholder="Output" value={tc.o} onChange={(e) => tc.setO(e.target.value)} rows={2} className={`${inputBase} font-mono`} />
                <textarea placeholder="Explanation (Optional)" value={tc.e} onChange={(e) => tc.setE(e.target.value)} rows={1} className={inputBase} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleCreateProblem} disabled={loading} className={`${btnBase} bg-emerald-600 hover:bg-emerald-700 mt-2`}>
          {loading ? "Creating..." : "Create Problem"}
        </button>
      </div>
    </div>

    {/* Add Hidden Test Case (Previously Unstyled) */}
    <div className={cardBase}>
      <h2 className={sectionTitle}>Add Hidden Test Case</h2>
      <div className="space-y-4">
        <select value={problemId} onChange={(e) => setProblemId(e.target.value)} className={inputBase}>
          <option value="">Select Problem</option>
          {problems?.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <textarea placeholder="Hidden Input" value={input} onChange={(e) => setInput(e.target.value)} rows={2} className={`${inputBase} font-mono`} />
        <textarea placeholder="Expected Output" value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)} rows={2} className={`${inputBase} font-mono`} />
        <button onClick={handleCreateTestCase} className={`${btnBase} bg-purple-600 hover:bg-purple-700`}>
          Add Test Case
        </button>
      </div>
    </div>

    {/* Available Contests */}
    <div className="mt-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Available Contests</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contests?.map((contest) => (
          <div key={contest.id} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm hover:border-blue-400 flex items-center justify-between cursor-default transition-all">
            <span className="font-semibold text-slate-700 truncate">{contest.title}</span>
            <span className="text-blue-500 font-bold text-xl ml-2">→</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default AdminDashboard;
