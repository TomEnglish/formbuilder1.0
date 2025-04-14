import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './EditableField.css'; // We'll create this for basic styling

const EditableField = ({ initialContent, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent || '', // Use initialContent or default to empty string
    onUpdate: ({ editor }) => {
      if (onChange) {
        // Pass the HTML content back up
        onChange(editor.getHTML());
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContent editor={editor} className="editable-field" />
  );
};

export default EditableField;