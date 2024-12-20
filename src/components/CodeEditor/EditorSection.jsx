import { EditorState } from "@codemirror/state";
import { openSearchPanel, highlightSelectionMatches } from "@codemirror/search";
import {
	indentWithTab,
	history,
	defaultKeymap,
	historyKeymap,
} from "@codemirror/commands";
import {
	foldGutter,
	indentOnInput,
	indentUnit,
	bracketMatching,
	foldKeymap,
	syntaxHighlighting,
	defaultHighlightStyle,
} from "@codemirror/language";
import {
	closeBrackets,
	autocompletion,
	closeBracketsKeymap,
	completionKeymap,
} from "@codemirror/autocomplete";
import {
	lineNumbers,
	highlightActiveLineGutter,
	highlightSpecialChars,
	drawSelection,
	dropCursor,
	rectangularSelection,
	crosshairCursor,
	highlightActiveLine,
	keymap,
	EditorView,
} from "@codemirror/view";

// Theme
import { dracula } from "thememirror";

// Language
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef } from "react";
import "./a.css"

// eslint-disable-next-line react/prop-types
export default function EditorSection({ code, setCode, language, isLoading }) {
	const editor = useRef();

	const onUpdate = EditorView.updateListener.of((v) => {
		setCode(v.state.doc.toString());
	});

	let extensions = [
		lineNumbers(),
		highlightActiveLineGutter(),
		highlightSpecialChars(),
		history(),
		foldGutter(),
		drawSelection(),
		indentUnit.of("    "),
		EditorState.allowMultipleSelections.of(true),
		indentOnInput(),
		bracketMatching(),
		closeBrackets(),
		autocompletion(),
		rectangularSelection(),
		crosshairCursor(),
		highlightSelectionMatches(),
		keymap.of([
			indentWithTab,
			...closeBracketsKeymap,
			...defaultKeymap,
			...historyKeymap,
			...foldKeymap,
			...completionKeymap,
		]),
		javascript(),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
		dracula,
		onUpdate,
	];

	useEffect(() => {
		const startState = EditorState.create({
			doc: "Hello World",
			extensions,
		});

		const view = new EditorView({ state: startState, parent: editor.current });

		return () => {
			view.destroy();
		};
	}, []);

	return (
		<div
			className={`${
				isLoading ? "card" : "border-4 rounded-[10px] border-gray-700"
			} h-[80vh] `}
		>
			<div className="bg-[#282A36] h-full z-1 p-5 border border-transparent rounded-[10px]	">
				<div ref={editor}></div>
			</div>
		</div>
	);
}
