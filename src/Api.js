import axios from "axios";
import { LANGUAGES } from "./constants";

const API = axios.create({
	baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
	const response = await API.post("/execute", {
		language: language,
		version: LANGUAGES[language],
		files: [
			{
				content: sourceCode,
			},
		],
	});
    console.log(language,LANGUAGES[language],sourceCode);
	return response.data;
    
};
