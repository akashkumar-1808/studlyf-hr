import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, MoreHorizontal, Edit, Copy, Trash } from "lucide-react";
import { fetchAPI } from "@/lib/api";

export default function DraftsSection() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const allDocs = await fetchAPI('/api/documents/');
        const draftsOnly = allDocs.filter((doc: any) => doc.status === 'draft');
        setDrafts(draftsOnly.slice(0, 4)); // Show top 4 drafts
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load drafts", err);
        setIsLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  if (isLoading) {
    return <div className="h-40 bg-slate-50 animate-pulse rounded-2xl border border-slate-200"></div>;
  }

  if (drafts.length === 0) return null; // Don't show section if no drafts

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 tracking-tight text-lg">My Drafts</h3>
        <Link href="/dashboard/documents" className="text-sm font-semibold text-primary hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {drafts.map((draft) => (
          <div key={draft.id} className="bg-white rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col relative group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <FileText size={18} />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
                Draft
              </span>
            </div>
            
            <h4 className="font-bold text-slate-900 mb-1 line-clamp-1">{draft.title || 'Untitled Document'}</h4>
            <p className="text-xs font-medium text-slate-500 mb-4">{draft.type === 'offer' ? 'Offer Letter' : 'Joining Letter'}</p>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Last edited {new Date(draft.updatedAt).toLocaleDateString()}</span>
              
              <Link 
                href={`/dashboard/builder/${draft.id}`}
                className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1"
              >
                <Edit size={12} />
                Continue
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
