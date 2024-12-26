import { useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";
import { CODE_SNIPPETS } from "../../constants.js";
import { executeCode } from "../../Api";
import EditorSection from "./EditorSection.jsx";
import InputOutputSection from "./InputOutputSection.jsx";

export default function CodeEditor() {
	const [language, setLanguage] = useState("javascript");
	const [code, setCode] = useState("Write your code here:");
	const [output, setOutput] = useState("");
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		setCode(CODE_SNIPPETS[language]);
		setOutput("");
		setInput("");
	}, [language]);

	useEffect(() => {
		console.log(output);
	}, [output]);

	useEffect(() => {
		console.log(input);
	}, [input]);

	useEffect(() => {
		setIsError(null);
	}, [code]);

	async function runCode() {
		if (!code) return;
		try {
			setIsLoading(true);
			const { run: result } = await executeCode(
				language,
				code,
				input,
				setInput
			);
			setOutput(result.output.split("\n"));
			result.stderr ? setIsError(true) : setIsError(false);
			console.log(result.output.split("\n"));
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<>
			<div className="whole-editor flex">
				<div className="editor w-[60vw]">
					<div className="labels flex items-center mb-5 h-[50px]">
						<div className="label w-[100px] font-bold ml-3">
							<img src="../logo.png" width={70} height={10} />
						</div>
						<div className="label-buttons flex justify-between grow mr-3">
							<LanguageMenu language={language} setLanguage={setLanguage} />
							<div
								className={`btn ${
									isLoading ? "cursor-not-allowed opacity-50" : ""
								}`}
								onClick={runCode}
							>
								Submit
							</div>
						</div>
					</div>
					<EditorSection
						setCode={setCode}
						language={language}
						isLoading={isLoading}
					/>
				</div>

				<InputOutputSection
					output={output}
					isError={isError}
					input={input}
					setInput={setInput}
				/>
			</div>
		</>
	);
}
