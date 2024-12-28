import axios from "axios";
import { LANGUAGES } from "./constants";

const API = axios.create({
	baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, input) => {
	console.log("input:",input)
	const response = await API.post("/execute", {
		language: language,
		version: LANGUAGES[language],
		files: [
			{
				content: sourceCode,
			},
		],
		stdin: input,
	});
	console.log(language, LANGUAGES[language], sourceCode);
	return response.data;
};
