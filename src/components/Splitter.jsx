import React, { useState } from "react";
import Dollar from "../assets/icon-dollar.svg";
import Profile from "../assets/icon-person.svg";

export default function Splitter() {
	const [bill, setBill] = useState("");
	const [numberOfPeople, setNumberOfPeople] = useState("");
	const [focusedInput, setFocusedInput] = useState("");
	const [custom, setCustom] = useState("");
	const handleChange = (e, id) => {
		const { value } = e.target;
		if (id === "bill") {
			setBill(value);
		} else if (id === "numberOfPeople") {
			setNumberOfPeople(value);
		}
	};

	const handleFocus = (id) => {
		setFocusedInput(id);
	};

	return (
		<main className="w-full flex justify-between max-w-[920px] bg-white px-10 py-8 rounded-3xl">
			{/* Input Section */}
			<section className="w-full max-w-[380px] flex flex-col gap-12">
				<TextInput
					icon={Dollar}
					label="Bill"
					id="bill"
					bill={bill}
					handleChange={handleChange}
					handleFocus={handleFocus}
					focusedInput={focusedInput}
				/>

				<fieldset>
					<legend className="font-bold text-cyan-600 text-[16px] mb-2">Select Tip %</legend>
					<div className="grid grid-cols-3 gap-y-[14px] gap-x-[13px] w-full">
						<TipButton tip="5%" />
						<TipButton tip="10%" />
						<TipButton tip="15%" />
						<TipButton tip="25%" />
						<TipButton tip="50%" />
						<TipButton tip="Custom" custom />
					</div>
				</fieldset>

				<TextInput
					icon={Profile}
					label="Number of People"
					id="numPeople"
					numberOfPeople={numberOfPeople}
					handleChange={handleChange}
					focusedInput={focusedInput}
					handleFocus={handleFocus}
				/>
			</section>

			{/* Results Section */}
			<aside className="w-full min-h-full max-w-[413px] bg-cyan-800 rounded-2xl p-10">
				<div className="flex flex-col h-full">
					<div className="flex flex-col gap-12 mb-auto">
						<OutputDisplay label="Tip Amount" subLabel="/person" value="$0.00" />
						<OutputDisplay label="Total" subLabel="/person" value="$0.00" />
					</div>
					<ResetButton focusedInput={focusedInput} />
				</div>
			</aside>
		</main>
	);
}

function TextInput({
	label,
	icon,
	id,
	bill,
	numberOfPeople,
	handleChange,
	focusedInput,
	handleFocus,
}) {
	return (
		<div className="w-full">
			<label htmlFor={id} className="font-bold text-[16px] text-cyan-600">
				{label}
			</label>
			<div
				className="flex justify-between items-center rounded-[6px] w-full px-4 py-3.5 mt-2 h-[44px] bg-cyan-300"
				style={{ border: focusedInput === id ? "2px #26C0AB solid" : "" }}
			>
				<img src={icon} alt={label} className="max-h-[16px]" />
				<input
					type="number"
					id={id}
					name={id}
					value={id === "bill" ? bill : id === "numberOfPeople" ? numberOfPeople : ""}
					className="w-full text-right font-bold text-cyan-800 placeholder:font-bold placeholder:text-cyan-500 bg-transparent outline-none"
					placeholder="0"
					onChange={(e) => handleChange(e, id)}
					onFocus={() => handleFocus(id)}
				/>
			</div>
		</div>
	);
}

function TipButton({ tip, custom = false }) {
	return (
		<button
			type="button"
			className={`h-[48px] rounded-[4px] font-bold w-[118px] ${
				custom
					? "text-[hsl(186,14%,43%)] bg-[hsl(189,41%,97%)]"
					: "text-white bg-[hsl(183,100%,15%)]"
			}`}
		>
			{tip}
		</button>
	);
}

function OutputDisplay({ label, subLabel, value }) {
	return (
		<div className="flex justify-between items-center">
			<div className="flex flex-col gap-[12px]">
				<h3 className="text-cyan-300 text-[18px] font-bold">{label}</h3>
				<p className="text-cyan-500 text-xl">{subLabel}</p>
			</div>
			<output className="text-cyan-700 font-bold text-5xl">{value}</output>
		</div>
	);
}

function ResetButton({ focusedInput }) {
	return (
		<button
			type="reset"
			disabled={!focusedInput}
			className="h-[48px] rounded-[4px] font-bold w-full text-[hsl(183,100%,15%)] bg-[hsl(172,67%,45%)] disabled:opacity-50"
		>
			RESET
		</button>
	);
}
