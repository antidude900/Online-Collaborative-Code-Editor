import Editor from "@monaco-editor/react";

// eslint-disable-next-line react/prop-types
export default function EditorSection({ code, setCode, language }) {
	const editorOptions = {
		minimap: { enabled: false },
		padding: { top: 20, bottom: 0 },
		fontSize: 15,
		scrollBeyondLastLine: false,
	};

	return (
		<div className="editor border-4 border-gray-800 p-2 rounded-[10px] h-[80vh]">
			<Editor
				height="100%"
				theme="vs-dark"
				language={language === "c/cpp" ? "cpp" : language}
				value={code}
				onChange={(value) => setCode(value)}
				options={editorOptions}
			/>
		</div>
	);
}
