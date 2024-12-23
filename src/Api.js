import { LANGUAGES } from "./constants";

export async function makeSubmission({ code, language, callback }) {
	const url =
		"https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
	const options = {
		method: "POST",
		headers: {
			"x-rapidapi-key": "e17fa44b69msh7224f5e019c1d56p1c1d13jsn44a81e384cf6",
			"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			language_id: LANGUAGES[language],
			source_code: btoa(code),
			// stdin: "SnVkZ2Uw",
		}),
	};
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		const tokenId = result.token;
		let status = 0;
		let SubmissionResult;
		do {
			try {
				SubmissionResult = await getSubmission(tokenId);
				status = SubmissionResult.status_id;
			} catch (error) {
				console.log(error);
			}
		} while (status === 2 || status === 1);

		if (SubmissionResult && status !== 2) {
			callback({ data: SubmissionResult });
		}
	} catch (error) {
		console.error(error);
	}
}

export async function getSubmission(tokenId) {
	const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-key": "e17fa44b69msh7224f5e019c1d56p1c1d13jsn44a81e384cf6",
			"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}
