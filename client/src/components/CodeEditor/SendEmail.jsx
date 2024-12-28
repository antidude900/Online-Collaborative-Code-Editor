import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SendEmail({ code, input, output }) {
	const [sending, setSending] = useState(false);
	const [address, setAddress] = useState("");
	async function send(to, message) {
		console.log(to, message);
		try {
			setSending(true);
			await axios.post("http://localhost:3030/", {
				from: "splashfwater900@gmail.com",
				to: to,
				subject: "Code From LinkCode",
				message: message,
			});
			alert("Email sent!");
		} catch (err) {
			alert(err);
		} finally {
			setSending(false);
		}
	}
	return (
		<div className="dropdown">
			<div
				tabIndex="0"
				role="button"
				className={`btn ${sending ? "cursor-not-allowed opacity-50" : ""}`}
			>
				Send to Mail
			</div>
			<ul
				tabIndex="0"
				className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[450px] p-2 shadow"
			>
				{" "}
				<li>
					<div className="flex">
						<input
							type="email"
							placeholder="Enter your address here..."
							className="input w-[300px]"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
						<div
							className="btn"
							onClick={() =>
								send(
									address,
									`Code:\n${code},\nInput:\n${input},\nOutput:\n${output}`
								)
							}
						>
							Submit
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}

// send("a", `Code:\n${code},Input:\n${input},Output:\n${output}`)
