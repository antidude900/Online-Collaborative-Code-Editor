/* eslint-disable react/prop-types */

export default function OutputSection({ output, isError }) {
	return (
		<div className="output w-[555px] ml-5">
			<div className="flex align-bottom mb-5">
				<div className="label w-[100px] text-[20px] font-bold ml-3">Output</div>
			</div>
			<div
				className={`editor border-4 ${
					isError !== null
						? isError
							? "border-red-700"
							: "border-green-700"
						: "border-gray-700"
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
	);
}
