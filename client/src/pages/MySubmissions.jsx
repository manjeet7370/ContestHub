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
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Page Header ── */}
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 block">
          Account
        </span>
        <div className="flex items-end justify-between">
          <h1 className="text-3xl font-bold text-white leading-tight">
            My Submissions
          </h1>
          {submissions.length > 0 && (
            <span className="text-xs text-slate-600 mb-1">
              {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="mt-6 border-t border-slate-800" />
      </div>

      {/* ── Empty State ── */}
      {submissions.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-16 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-500 text-sm">No submissions yet.</p>
          <p className="text-slate-600 text-xs">Solve a problem to see your results here.</p>
        </div>
      ) : (

        /* ── Submissions Table ── */
        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 w-28">
                    ID
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Language
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Verdict
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="bg-slate-900 hover:bg-slate-800/70 transition-colors duration-150 group"
                  >
                    {/* ID */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                        #{submission.id}
                      </span>
                    </td>

                    {/* Language */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">
                        {submission.language}
                      </span>
                    </td>

                    {/* Verdict */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wide
                          ${submission.verdict === "Accepted"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : submission.verdict === "Wrong Answer"
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : submission.verdict === "Time Limit Exceeded"
                            ? "bg-amber-950 text-amber-400 border border-amber-800"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                      >
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