/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LanguageMenu from "./LanguageMenu";
import { CODE_SNIPPETS } from "../../constants.js";
import { executeCode } from "../../Api";
import EditorSection from "./EditorSection.jsx";
import InputOutputSection from "./InputOutputSection.jsx";
import SendEmail from "./SendEmail.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCodeEditor } from "../../store/states/CodeEditor/CodeEditorSlice.js";

export default function CodeEditor() {

	const { code, language, input, isLoading } = useSelector(
		(state) => state.codeEditor
	);

	const dispatch = useDispatch();
	const setState = (state) => {
		dispatch(setCodeEditor(state));
	};
	
	useEffect(() => {
		setState({ code: CODE_SNIPPETS[language] });
		setState({ output: [] });
	}, [language]);

	useEffect(() => {
		setState({ isError: null });
	}, [code]);

	async function runCode() {
		if (!code) return;
		try {
			setState({ isLoading: true });
			const { run: result } = await executeCode(language, code, input);
			const formattedOutput = result.output
				.split("\n")
				.map((line) => line.replace(/\t/g, "    "));

			setState({ output: formattedOutput });
			setState({ isError: result.stderr ? true : false });

			console.log(result.output.split("\n"));
		} catch (error) {
			console.log(error);
		} finally {
			setState({ isLoading: false });
		}
	}
	return (
		<>
		
			<div className="whole-editor flex">
				<div className="editor w-[60vw]">
					<div className="labels flex items-center mb-5 h-[50px]">
						<div className="label w-[100px] font-bold ml-3">
							<img src="/logo.png" width={70} height={10} />
						</div>
						<div className="label-buttons flex justify-between grow mr-3">
							<LanguageMenu />

							<SendEmail/>
							<div
								className={`btn ${
									isLoading ? "cursor-not-allowed opacity-50" : ""
								}`}
								onClick={runCode}
							>
								Run
							</div>
						</div>
					</div>
					<EditorSection />
				</div>

				<InputOutputSection />
			</div>
		</>
	);
}
// code={code} input={input} output={output.join("\n")}
