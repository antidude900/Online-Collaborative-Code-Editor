/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const placeholder = `Example:
for input x
      input y z
you can do:
      2 
      3 4
which assigns: x=2,y=3,z=4

Also, you don't need input message like: input_msg "Enter x:"
It will only make your output look ugly!
`;

export default function InputOutputSection({ output, isError, setInput }) {
	const [isScrollable, setIsScrollable] = useState(false);
	const textareaRef = useRef(null);

	// Combined function to check if textarea is scrollable and handle arrow visibility
	const checkIfScrollable = () => {
		if (textareaRef.current) {
			const isScrollable =
				textareaRef.current.scrollHeight > textareaRef.current.clientHeight;
			const isAtBottom =
				textareaRef.current.scrollHeight - textareaRef.current.scrollTop ===
				textareaRef.current.clientHeight;

			setIsScrollable(isScrollable && !isAtBottom); // Show arrow if scrollable and not at the bottom
		}
	};

	useEffect(() => {
		// Check scrollability on mount
		checkIfScrollable();

		// Add event listener for scroll
		if (textareaRef.current) {
			textareaRef.current.addEventListener("scroll", checkIfScrollable);
		}

		// Re-check if scrollable when window is resized
		window.addEventListener("resize", checkIfScrollable);

		return () => {
			if (textareaRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				textareaRef.current.removeEventListener("scroll", checkIfScrollable);
			}
			window.removeEventListener("resize", checkIfScrollable);
		};
	}, []);

	const scrollToBottom = () => {
		if (textareaRef.current) 
		  textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
		
	}
	

	const handleInputChange = (e) => {
		setInput(e.target.value);
		checkIfScrollable(); // Recheck scrollability on input change
	};

	return (
		<div className="input-output w-[40vw] ml-10 h-[80vh] flex flex-col mt-[70px]">
			<div className="input-box h-[30%] mb-[20px] flex flex-col">
				<div className="Label w-[100px] text-[20px] font-bold h-[20%]">
					Input
				</div>

				<div
					className={`relative input-border border-4 h-[80%] ${
						isError !== null
							? isError
								? "border-red-700"
								: "border-green-700"
							: "border-gray-700"
					} p-2 rounded-[10px]`}
				>
					<textarea
						ref={textareaRef}
						className="w-full h-full bg-inherit outline-none resize-none"
						placeholder={placeholder}
						onChange={handleInputChange}
					/>
					{isScrollable && (
						<div className="absolute top-[110px] right-[260px] text-white opacity-50 font-bold">
							<span className="text-xl border-4 border-gray-500 rounded-full cursor-pointer" onClick={scrollToBottom}>
								↓
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="output-box h-[70%] flex flex-col">
				<div className="Label w-[100px] text-[20px] font-bold h-[8.62%]">
					Output
				</div>
				<div
					className={`output-border border-4 h-[91.38%] ${
						isError !== null
							? isError
								? "border-red-700"
								: "border-green-700"
							: "border-gray-700"
					} p-2 rounded-[10px]`}
				>
					<div className="overflow-auto w-full h-[98%] p-1">
						{output
							? output.map((line, i) => (
									<pre key={i} className="whitespace-pre-wrap break-words">
										{line}
									</pre>
							  ))
							: "Run Code to See Output"}
					</div>
				</div>
			</div>
		</div>
	);
}
