/* eslint-disable react/prop-types */

export default function InputOutputSection({ output, isError }) {
	return (
		<div className="input-output w-[555px] ml-10 h-[80vh] flex flex-col mt-[70px]">
			<div className="input-box h-1/4 mb-[20px] flex flex-col">
				<div className="Label w-[100px] text-[20px] font-bold mb-1">Input</div>

				<div
					className={`input-border border-4 flex-1 ${
						isError !== null
							? isError
								? "border-red-700"
								: "border-green-700"
							: "border-gray-700"
					} p-2 rounded-[10px] `}
				>

				</div>
			</div>

			<div className="output-box flex-1 flex flex-col">
				<div className="Label w-[100px] text-[20px] font-bold mb-1">Output</div>
				<div
					className={`output-border border-4 flex-1 ${
						isError !== null
							? isError
								? "border-red-700"
								: "border-green-700"
							: "border-gray-700"
					} p-2 rounded-[10px] h-full`}
				>
					<div className="overflow-auto max-w-full max-h-[400px] p-1">
						{output
							? output.split("\n").map((line, i) => (
									<div key={i} className=" break-words">
										{line}
									</div>
							  ))
							: "Run Code to See Output"}
					</div>
				</div>
			</div>
		</div>
	);
}
