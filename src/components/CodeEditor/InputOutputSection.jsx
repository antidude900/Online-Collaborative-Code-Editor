/* eslint-disable react/prop-types */

export default function InputOutputSection({ output, isError }) {
	return (
		<div className="input-output grow ml-10 h-[80vh] flex flex-col mt-[70px]">
			<div className="input-box h-[30%] mb-[20px] flex flex-col">
				<div className="Label w-[100px] text-[20px] font-bold h-[20%]">
					Input
				</div>

				<div
					className={`input-border border-4 h-[80%] ${
						isError !== null
							? isError
								? "border-red-700"
								: "border-green-700"
							: "border-gray-700"
					} p-2 rounded-[10px] `}
				></div>
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
					<div className="overflow-auto max-w-full h-[98%] p-1">
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
