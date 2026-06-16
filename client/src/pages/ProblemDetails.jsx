import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Editor from "@monaco-editor/react";

function ProblemDeatils() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("Python");
  const [loading, setLoading] = useState(false);

  const templates = {
    JavaScript: `function solve() {


  }

solve();`,

    Python: `def solve():
      pass
      
      
 solve()`,

    "C++": `#include <bits/stdc++.h>
using namespace std;
      
  int main() {
    
        
    return 0;
  }`,
  };
  const [code, setCode] = useState(templates["Python"]);
  const [verdict, setVerdict] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await api.get(`/problem/${id}`);
        // console.log(res.data);

        setProblem(res.data.problem);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContest();
  }, [id]);

  if (!problem) {
    return <h2>Loading</h2>;
  }
  const editorLanguage = {
    JavaScript: "javascript",
    Python: "python",
    "C++": "cpp",
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(res.data);
      // console.log(errorMessage);
      // console.log(res.data.submmision);
      const submission = res.data.submission;
        setVerdict(submission.verdict);
       setErrorMessage(submission.errorMessage);
      
       
    } catch (err) {
      console.log(err.res?.data);
    } finally {
      setLoading(false);
    }
  };
  localStorage.getItem(false);

  return (
    <div className="h-screen bg-slate-950 p-3 flex flex-col">
      <div className="flex-1 max-w-[1500px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
        {/* ── Problem Panel ── */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl flex flex-col min-h-0 overflow-hidden border border-slate-800">
          {/* Panel header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-slate-500 text-xs font-mono uppercase tracking-widest shrink-0">
                Problem
              </span>
              <span className="text-slate-700 text-xs">·</span>
              <h1 className="text-white text-sm font-semibold truncate">
                {problem.title}
              </h1>
            </div>
            <span
              className={`shrink-0 ml-4 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wide
              ${
                problem.difficulty === "Easy"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  : problem.difficulty === "Medium"
                    ? "bg-amber-950 text-amber-400 border border-amber-800"
                    : "bg-red-950 text-red-400 border border-red-800"
              }`}
            >
              {problem.difficulty}
            </span>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
            {/* Statement */}
            <p className="text-slate-300 text-sm leading-7">
              {problem.statement}
            </p>

            {/* Examples */}
            {problem.testCases?.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Examples
                </h2>

                {problem.testCases.map((testCase, index) => (
                  <div
                    key={testCase.id}
                    className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-700 bg-slate-800">
                      <span className="text-slate-400 text-xs font-medium">
                        Example {index + 1}
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide block mb-1">
                          Input
                        </span>
                        <pre className="bg-slate-950 text-slate-200 text-xs font-mono px-3 py-2.5 rounded border border-slate-700 overflow-x-auto leading-5">
                          {testCase.input}
                        </pre>
                      </div>

                      <div>
                        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide block mb-1">
                          Output
                        </span>
                        <pre className="bg-slate-950 text-emerald-300 text-xs font-mono px-3 py-2.5 rounded border border-slate-700 overflow-x-auto leading-5">
                          {testCase.expectedOutput}
                        </pre>
                      </div>

                      {testCase.explanation && (
                        <div>
                          <span className="text-slate-500 text-xs font-medium uppercase tracking-wide block mb-1">
                            Explanation
                          </span>
                          <p className="text-slate-400 text-xs leading-5">
                            {testCase.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Code Editor Panel ── */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl flex flex-col min-h-0 overflow-hidden border border-slate-800">
          {/* Toolbar */}
          <div className="shrink-0 bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="language-select"
                className="text-slate-400 text-xs font-medium"
              >
                Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => {
                  const setlectedLanguage = e.target.value;
                  setLanguage(setlectedLanguage);
                  setCode(templates[setlectedLanguage]);
                }}
                className="bg-slate-700 border border-slate-600 text-slate-200 text-xs rounded-md px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150
              ${
                loading
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-900 hover:shadow-indigo-800"
              }`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {loading ? "Judging…" : "Run & Submit"}
            </button>
          </div>

          {/* Verdict bar */}
          {verdict && (
            <div
              className={`shrink-0 px-4 py-2.5 border-b flex items-center gap-2 text-xs font-medium
              ${
                verdict.toLowerCase().includes("accept")
                  ? "bg-emerald-950/60 border-emerald-800 text-emerald-400"
                  : verdict.toLowerCase().includes("wrong") ||
                      verdict.toLowerCase().includes("error")
                    ? "bg-red-950/60 border-red-800 text-red-400"
                    : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              <span className="font-semibold text-slate-400">Verdict:</span>
              <span>{verdict}</span>
            </div>
          )}
         {errorMessage && (
  <pre className="text-red-400 text-xs whitespace-pre-wrap bg-slate-950 p-3 rounded mx-4 mb-2">
    {errorMessage}
  </pre>
)}

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0 bg-[#0f172a]">
            <Editor
              height="100%"
              theme="vs-dark"
              language={editorLanguage[language]}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDeatils;
