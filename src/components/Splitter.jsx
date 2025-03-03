import React from "react";
import Dollar from "../assets/icon-dollar.svg";
import Profile from "../assets/icon-person.svg";

export default function Splitter() {
	return (
		<div className="w-full max-w-[920px] bg-white px-10 py-8 rounded-3xl">
			<div className="w-full max-w-[380px] flex flex-col gap-12">
				<TextInput icon={Dollar} label={"Bill"} />

				<div>
					<p className="font-bold text-cyan-600 text-[16px] mb-2">Select Tip %</p>
					<div className="grid grid-cols-3 gap-y-[14px] gap-x-[13px] w-full">
						<Button color={"white"} bgColor={"hsl(183, 100%, 15%)"} width={118}>
							5%
						</Button>
						<Button color={"white"} bgColor={"hsl(183, 100%, 15%)"} width={118}>
							10%
						</Button>
						<Button color={"white"} bgColor={"hsl(183, 100%, 15%)"} width={118}>
							15%
						</Button>
						<Button color={"white"} bgColor={"hsl(183, 100%, 15%)"} width={118}>
							25%
						</Button>
						<Button color={"white"} bgColor={"hsl(183, 100%, 15%)"} width={118}>
							50%
						</Button>
						<Button color={"hsl(186, 14%, 43%)"} bgColor={"hsl(189, 41%, 97%)"} width={118}>
							Custom
						</Button>
					</div>
				</div>
				<TextInput icon={Profile} label={"Number of People"} />
			</div>
		</div>
	);
}

function TextInput({ label, icon }) {
	return (
		<form className="w-full">
			<label htmlFor={label} className="font-bold text-[16px] text-cyan-600">
				{label}
			</label>
			<div className="flex justify-between items-center w-full px-4 py-3.5 mt-2 h-[44px] bg-cyan-300">
				<img src={icon} alt={label} className="max-h-[16px]" />
				<input
					type="number"
					name={label}
					className="w-full text-right font-bold text-cyan-800 placeholder:font-bold placeholder:text-cyan-500"
					placeholder="0"
				/>
			</div>
		</form>
	);
}

function Button({ children, color, bgColor, isDisabled, width }) {
	return (
		<button
			className="h-[48px] rounded-[4px] font-bold"
			style={{
				width: `${width}px`,
				color: color,
				background: bgColor,
				opacity: isDisabled ? "0.15" : "",
			}}
		>
			{children}
		</button>
	);
}
