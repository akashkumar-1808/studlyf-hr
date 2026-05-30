"use client"

import React, { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { useEditorStore } from "@/store/editorStore"

export default function TiptapEditor() {
  const { contentHTML, setContentHTML } = useEditorStore()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable headings to prevent layout breaking
        horizontalRule: false,
        codeBlock: false,
        blockquote: false,
      })
    ],
    content: contentHTML,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[250px] p-4 bg-muted/20 border border-border rounded-b-xl",
      },
    },
    onUpdate: ({ editor }) => {
      setContentHTML(editor.getHTML())
    },
  })

  // Keep editor in sync if global content changes from outside (e.g., template load)
  useEffect(() => {
    if (editor && contentHTML !== editor.getHTML()) {
      editor.commands.setContent(contentHTML)
    }
  }, [contentHTML, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col h-full border border-border rounded-xl shadow-sm overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b border-border bg-muted/40">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('bold') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('italic') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-border mx-1"></div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('bulletList') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
      
      {/* Helper */}
      <div className="p-2 border-t border-border bg-muted/10 text-xs text-muted-foreground">
        Use {"{{candidate_name}}"}, {"{{salary}}"}, etc. to insert dynamic variables.
      </div>
    </div>
  )
}
