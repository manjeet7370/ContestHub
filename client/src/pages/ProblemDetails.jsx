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
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Problem Panel */}
      <div className="lg:col-span-5 bg-white shadow-lg border border-gray-100 rounded-2xl flex flex-col h-[calc(100vh-3rem)] overflow-hidden">

        <div className="p-6 overflow-y-auto">

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {problem.title}
            </h1>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
              {problem.difficulty}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <div className="max-w-none text-gray-700 text-[15px] leading-8">
              <p>{problem.statement}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="lg:col-span-7 bg-white shadow-lg border border-gray-100 rounded-2xl flex flex-col h-[calc(100vh-3rem)] overflow-hidden">

        {/* Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <label
              htmlFor="language-select"
              className="text-sm font-medium text-slate-600"
            >
              Language
            </label>

            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="JavaScript">JavaScript</option>
              <option value="C++">C++</option>
              <option value="Python">Python</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
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
            Submit Solution
          </button>

        </div>

        {/* Editor */}
        <div className="flex-grow bg-[#0f172a] p-5">

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here..."
            spellCheck="false"
            className="w-full h-full bg-transparent text-slate-200 font-mono text-[15px] leading-7 resize-none focus:outline-none placeholder-slate-500"
          />

        </div>

      </div>

    </div>
  </div>
);
}

export default ProblemDeatils