import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, MoreHorizontal } from "lucide-react";
import EmptyState from "./EmptyState";
import { fetchAPI } from "@/lib/api";

export default function RecentDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await fetchAPI('/api/documents/');
        // Exclude drafts if you want, or just show the most recent 5
        setDocuments(data.slice(0, 5));
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load documents", err);
        setIsLoading(false);
      }
    };
    fetchDocs();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 tracking-tight text-lg">Recent Documents</h3>
        <Link href="/dashboard/documents" className="text-sm font-semibold text-primary hover:underline">
          View all
        </Link>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {isLoading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ) : documents.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Document Name</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Edited</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="group hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => window.location.href = `/dashboard/builder/${doc.id}`}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm group-hover:text-primary transition-colors">{doc.title || 'Untitled Document'}</p>
                          <p className="text-xs text-slate-500 font-medium">{doc.candidateDetails?.candidateName || 'No Candidate'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-slate-600">{doc.type === 'offer' ? 'Offer Letter' : 'Joining Letter'}</span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                        ${doc.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${doc.status === 'draft' ? 'bg-amber-100 text-amber-700' : ''}
                        ${doc.status === 'exported' ? 'bg-blue-100 text-blue-700' : ''}
                      `}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-medium text-slate-500">{new Date(doc.updatedAt).toLocaleDateString()}</td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
