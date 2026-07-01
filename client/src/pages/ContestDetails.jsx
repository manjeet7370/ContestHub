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
               
         
                setContest(res.data.contest)
            }catch(err){
                
            }
        };

        fetchContest();
    }, [id])

    if(!contest){
        return <h2>Loading...</h2>
    }
return (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Contest Header ── */}
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 block">
          Contest
        </span>
        <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
          {contest.title}
        </h1>
        <p className="text-slate-400 text-sm leading-6 max-w-2xl">
          {contest.description}
        </p>
        <div className="mt-6 border-t border-slate-800" />
      </div>

      {/* ── Problems Section ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Problems
          </h2>
          <span className="text-xs text-slate-600">
            {contest.problem?.length ?? 0} total
          </span>
        </div>

        {/* Problem List */}
        <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
          {contest.problem?.map((problem, index) => (
            <div
              key={problem.id}
              className="flex items-start gap-5 px-5 py-4 bg-slate-900 hover:bg-slate-800/70 transition-colors duration-150 group"
            >
              {/* Index */}
              <span className="shrink-0 w-7 text-center text-sm font-mono font-semibold text-slate-600 pt-0.5 group-hover:text-slate-400 transition-colors">
                {String.fromCharCode(65 + index)}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Link to={`/problem/${problem.id}`}>
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors duration-150 truncate">
                    {problem.title}
                  </h3>
                </Link>
                <p className="mt-1 text-slate-500 text-xs leading-5 line-clamp-2">
                  {problem.description}
                </p>
              </div>

              {/* Difficulty Badge */}
              <span
                className={`shrink-0 mt-0.5 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wide
                  ${problem.difficulty === "Easy"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : problem.difficulty === "Medium"
                    ? "bg-amber-950 text-amber-400 border border-amber-800"
                    : "bg-red-950 text-red-400 border border-red-800"
                  }`}
              >
                {problem.difficulty}
              </span>

              {/* Arrow */}
              <Link
                to={`/problem/${problem.id}`}
                className="shrink-0 text-slate-700 group-hover:text-indigo-500 transition-colors duration-150 pt-0.5"
                aria-label={`Open ${problem.title}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);


}

export default ContestsDeatils