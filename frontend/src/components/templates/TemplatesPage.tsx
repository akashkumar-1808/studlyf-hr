"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { SAMPLE_TEMPLATES, TemplateDisplay } from "@/lib/sampleTemplates";
import TemplateCard from "./TemplateCard";
import TemplatePreviewModal from "./TemplatePreviewModal";
import { useDocumentBuilderStore } from "@/store/documentBuilderStore";
import { fetchAPI } from "@/lib/api";

const CATEGORIES = [
  "All",
  "Offer Letter",
  "Joining Letter",
  "Internship Letter",
  "Employment Letter",
  "Acknowledgement",
  "Corporate",
  "Minimal",
  "Modern",
  "Classic"
];

export default function TemplatesPage() {
  const router = useRouter();
  const setTemplateConfig = useDocumentBuilderStore(state => state.setTemplateConfig);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDisplay | null>(null);

  const filteredTemplates = SAMPLE_TEMPLATES.filter(t => {
    const matchesSearch = t.templateName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleUseTemplate = async (template: TemplateDisplay) => {
    if (isCreating) return;
    try {
      setIsCreating(true);
      setTemplateConfig(template);
      
      const data = await fetchAPI('/api/documents/create', {
        method: 'POST',
        body: JSON.stringify({
          title: `Untitled Document (${template.templateName})`,
          type: 'offer',
          status: 'draft',
          template_id: template.id,
          candidateDetails: {},
          contentJSON: { html: '' }
        })
      });
      
      router.push(`/dashboard/builder/${data.id}`);
    } catch (err) {
      console.error("Failed to create document from template", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] p-8 lg:p-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Template Gallery</h1>
          <p className="text-slate-500 mt-2 text-lg">Browse our premium collection of professional HR document templates. Instantly apply them to your documents.</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col xl:flex-row gap-6 mb-10 items-start xl:items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search templates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 w-full xl:w-auto shrink-0">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors shrink-0">
            <SlidersHorizontal size={20} />
          </button>
          <div className="w-px h-8 bg-slate-200 mx-2 shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onPreview={setPreviewTemplate}
              onUse={handleUseTemplate}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-slate-200 rounded-3xl border-dashed">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Search className="text-slate-400" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No templates found</h3>
          <p className="text-slate-500 max-w-sm">We couldn't find any templates matching your search criteria. Try adjusting your filters.</p>
        </div>
      )}

      {/* Preview Modal */}
      <TemplatePreviewModal 
        isOpen={!!previewTemplate}
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onUse={handleUseTemplate}
      />
    </div>
  );
}
