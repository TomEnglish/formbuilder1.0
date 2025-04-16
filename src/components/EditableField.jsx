import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar'; // Import the MenuBar component
import './EditableField.css';

const EditableField = ({ initialContent, onChange, error, editable = true }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent || '',
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`editable-field-container ${error ? 'error' : ''}`}
      style={{
        '--border-color': error ? '#dc3545' : '#ccc',
        '--background-color': error ? '#fff5f5' : 'transparent'
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editable-field" />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default EditableField;