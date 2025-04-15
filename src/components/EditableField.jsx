import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar'; // Import the MenuBar component
import './EditableField.css';

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
    <div className="editable-field-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editable-field" />
    </div>
  );
};

export default EditableField;