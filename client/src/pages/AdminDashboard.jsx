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
      
      setContests(res.data);
      // console.log(res.data.problem.testCases);
    } catch (err) {
     
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
      
    } catch (err) {
      
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

      
    } catch (err) {
      
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

      
    } catch (err) {
      
    }
  };

// Define these shared classes at the top of your component or file
const inputBase = "w-full bg-slate-50 border border-slate-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-colors";
const cardBase = "bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm";
const btnBase = "px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-60 transition-colors w-full sm:w-auto";
const sectionTitle = "text-xl font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3";

return (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Page Header ── */}
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2 block">
          Admin
        </span>
        <h1 className="text-3xl font-bold text-white leading-tight">
          Dashboard
        </h1>
        <div className="mt-6 border-t border-slate-800" />
      </div>

      <div className="space-y-6">

        {/* ── Create Contest ── */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-indigo-950 border border-indigo-800 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-slate-100">Create Contest</h2>
          </div>

          <div className="p-5 space-y-4">
            <input
              type="text"
              placeholder="Contest title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <textarea
              placeholder="Contest description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleCreateContest}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-150
                ${loading ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
            >
              {loading ? "Creating..." : "Create Contest"}
            </button>
          </div>
        </section>

        {/* ── Create Problem ── */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-emerald-950 border border-emerald-800 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-slate-100">Create Problem</h2>
          </div>

          <div className="p-5 space-y-4">
            <input
              type="text"
              placeholder="Problem title"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <textarea
              placeholder="Problem statement"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select
                value={contestId}
                onChange={(e) => setContestId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="">Select contest</option>
                {contests?.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>

            {/* Sample Test Cases */}
            <div className="pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                Sample Test Cases
              </h3>
              <div className="space-y-3">
                {[
                  { num: 1, i: example1Input, setI: setExample1Input, o: example1Output, setO: setExample1Output, e: example1Explanation, setE: setExample1Explanation },
                  { num: 2, i: example2Input, setI: setExample2Input, o: example2Output, setO: setExample2Output, e: example2Explanation, setE: setExample2Explanation },
                  { num: 3, i: example3Input, setI: setExample3Input, o: example3Output, setO: setExample3Output, e: example3Explanation, setE: setExample3Explanation }
                ].map((tc) => (
                  <div key={tc.num} className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-700 bg-slate-800">
                      <span className="text-xs font-medium text-slate-400">Example {tc.num}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 uppercase tracking-widest mb-1 block">Input</label>
                        <textarea
                          placeholder="stdin"
                          value={tc.i}
                          onChange={(e) => tc.setI(e.target.value)}
                          rows={2}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-600 text-xs font-mono rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 uppercase tracking-widest mb-1 block">Output</label>
                        <textarea
                          placeholder="expected stdout"
                          value={tc.o}
                          onChange={(e) => tc.setO(e.target.value)}
                          rows={2}
                          className="w-full bg-slate-950 border border-slate-700 text-emerald-300 placeholder-slate-600 text-xs font-mono rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 uppercase tracking-widest mb-1 block">Explanation <span className="normal-case text-slate-600">(optional)</span></label>
                        <textarea
                          placeholder="Brief explanation"
                          value={tc.e}
                          onChange={(e) => tc.setE(e.target.value)}
                          rows={1}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-300 placeholder-slate-600 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateProblem}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 mt-1
                ${loading ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
            >
              {loading ? "Creating..." : "Create Problem"}
            </button>
          </div>
        </section>

        {/* ── Add Hidden Test Case ── */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-purple-950 border border-purple-800 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-slate-100">Add Hidden Test Case</h2>
          </div>

          <div className="p-5 space-y-4">
            <select
              value={problemId}
              onChange={(e) => setProblemId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="">Select problem</option>
              {problems?.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Hidden Input</label>
              <textarea
                placeholder="stdin"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-600 text-xs font-mono rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Expected Output</label>
              <textarea
                placeholder="expected stdout"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 text-emerald-300 placeholder-slate-600 text-xs font-mono rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleCreateTestCase}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors duration-150"
            >
              Add Test Case
            </button>
          </div>
        </section>

        {/* ── Available Contests ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Available Contests
            </h2>
            <span className="text-xs text-slate-600">{contests?.length ?? 0} total</span>
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
            {contests?.map((contest) => (
              <div
                key={contest.id}
                className="flex items-center justify-between px-5 py-4 bg-slate-900 hover:bg-slate-800/70 transition-colors duration-150 group cursor-default"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded bg-indigo-950 border border-indigo-800 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-200 truncate">{contest.title}</span>
                </div>
                <svg className="w-4 h-4 text-slate-700 group-hover:text-indigo-500 transition-colors shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  </div>
);

}

export default AdminDashboard;
