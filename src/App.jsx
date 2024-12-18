import { useEffect, useState } from "react";
import LanguageMenu from "./components/LanguageMenu";
import Editor from "@monaco-editor/react";
import { CODE_SNIPPETS } from "./constants";
import { executeCode } from "./Api";

function App() {
	const [language, setLanguage] = useState("javascript");
	const [code, setCode] = useState("Write your code here");
	const [output, setOutput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	const editorOptions = {
		minimap: { enabled: false }, // Optional: Disable minimap
		padding: { top: 20, bottom: 0 }, // Add padding at the top
		fontSize: 15, // Optional: Set font size
		scrollBeyondLastLine: false, // Optional: Avoid excessive bottom padding
	};

	useEffect(() => {
		setCode(CODE_SNIPPETS[language]);
		setOutput("")
	}, [language]);

	useEffect(()=>{
		setIsError(null)
	},[code])

	async function runCode() {
		if (!code) return;
		try {
			setIsLoading(true);
			const { run: result } = await executeCode(language, code);
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
		<div className="main-container pl-[50px] pr-[50px] pt-10 flex ">
			<div className="editor grow">
				<div className="labels flex align-bottom mb-5">
					<div className="label w-[100px] text-[20px] font-bold ml-3">
						Editor
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
			</div>

			<div className="output w-[555px] ml-5">
				<div className="flex align-bottom mb-5">
					<div className="label w-[100px] text-[20px] font-bold ml-3">
						Output
					</div>
				</div>
				<div
					className={`editor border-4 ${
						isError!==null ? (isError?"border-red-800" : "border-green-800"):"border-gray-800"
					} p-2 rounded-[10px] h-[80vh]`}
				>
					{output
						? output.map((line, i) => (
								<div key={i} className=" break-words">
									{line}
								</div>
						  ))
						: "Run Code to See Output"}
				</div>
			</div>
		</div>
	);
}

export default App;
