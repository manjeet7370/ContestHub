import  { useEffect , useState} from "react"
import api from "../services/api"
import axios from "axios";
import { Link } from "react-router-dom";

function Contests() {
    const [contest, setContest] = useState([]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await api.get("/contest");
                
                setContest(res.data);
            }catch(err){
                
            }
        };
        fetchContests();
    }, []);
return (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Page Header ── */}
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 block">
          Platform
        </span>
        <div className="flex items-end justify-between">
          <h1 className="text-3xl font-bold text-white leading-tight">
            All Contests
          </h1>
          <span className="text-xs text-slate-600 mb-1">
            {contest.length} contest{contest.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="mt-6 border-t border-slate-800" />
      </div>

      {/* ── Contest List ── */}
      <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
        {contest.map((contest) => (
          <div
            key={contest.id}
            className="flex items-center gap-5 px-5 py-5 bg-slate-900 hover:bg-slate-800/70 transition-colors duration-150 group"
          >
            {/* Icon */}
            <div className="shrink-0 w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors duration-150 truncate">
                {contest.title}
              </h2>
              <p className="mt-1 text-slate-500 text-xs leading-5 line-clamp-2">
                {contest.description}
              </p>
            </div>

            {/* CTA */}
            <Link
              to={`/contest/${contest.id}`}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-150"
            >
              Open
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

    </div>
  </div>
);

}

export default Contests;