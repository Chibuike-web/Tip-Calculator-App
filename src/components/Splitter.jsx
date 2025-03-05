import React, { useState } from "react";
import Dollar from "../assets/icon-dollar.svg";
import Profile from "../assets/icon-person.svg";

export default function Splitter() {
	const [bill, setBill] = useState("");
	const [numberOfPeople, setNumberOfPeople] = useState("");
	const [focusedInput, setFocusedInput] = useState("");
	const [error, setError] = useState(false);
	const [customInput, setCustomInput] = useState(false);
	const [customInputValue, setCustomInputValue] = useState("");
	const handleChange = (e, id) => {
		const { value } = e.target;
		if (id === "bill") {
			setBill(value);
		} else if (id === "numberOfPeople") {
			setNumberOfPeople(value);
		} else if (id === "customInput") {
			setCustomInputValue(value);
		}
	};

	const handleFocus = (id) => {
		setFocusedInput(id);
	};

	const handleBlur = () => {
		setFocusedInput("");
	};

	const handleCustomInput = () => {
		setCustomInput(true);
	};

	return (
		<main className="flex max-md:flex-col gap-[48px] max-md:w-max justify-between w-full max-w-[920px] bg-white px-10 py-8 rounded-3xl">
			{/* Input Section */}
			<section className="w-full max-w-[380px] flex flex-col gap-12">
				<TextInput
					icon={Dollar}
					label="Bill"
					id="bill"
					bill={bill}
					focusedInput={focusedInput}
					handleChange={handleChange}
					handleFocus={handleFocus}
					handleBlur={handleBlur}
				/>

				<fieldset>
					<legend className="font-bold text-cyan-600 text-[16px] mb-2">Select Tip %</legend>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-y-[14px] place-items-center gap-x-[13px] w-full">
						<TipButton tip="5%" />
						<TipButton tip="10%" />
						<TipButton tip="15%" />
						<TipButton tip="25%" />
						<TipButton tip="50%" />
						{customInput ? (
							<TextInput
								customInput={customInput}
								customInputValue={customInputValue}
								id="customInput"
								handleFocus={handleFocus}
								handleChange={handleChange}
								handleBlur={handleBlur}
								autoFocus
							/>
						) : (
							<TipButton tip="Custom" custom handleCustomInput={handleCustomInput} />
						)}
					</div>
				</fieldset>

				<TextInput
					icon={Profile}
					label="Number of People"
					id="numberOfPeople"
					numberOfPeople={numberOfPeople}
					handleChange={handleChange}
					focusedInput={focusedInput}
					handleFocus={handleFocus}
					handleBlur={handleBlur}
				/>
			</section>

			{/* Results Section */}
			<aside className="w-full min-h-full max-w-[413px] bg-cyan-800 rounded-2xl p-10">
				<div className="flex flex-col h-full">
					<div className="flex flex-col gap-12 mb-auto">
						<OutputDisplay label="Tip Amount" subLabel="/person" value="$0.00" />
						<OutputDisplay label="Total" subLabel="/person" value="$0.00" />
					</div>
					<ResetButton bill={bill} />
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
	handleBlur,
	customInput,
	customInputValue,
	autoFocus,
}) {
	return (
		<div className="w-full">
			<label htmlFor={id} className="font-bold text-[16px] text-cyan-600">
				{label}
			</label>
			<div
				className="flex justify-between items-center rounded-[6px] w-full px-4 py-3.5 h-[48px]  bg-cyan-300 hover:border-[2px] hover:border-[#26C0AB]"
				style={{
					border: focusedInput === id ? "2px #26C0AB solid" : "",
					marginBlockStart: customInput ? "" : "8px",
				}}
			>
				<img src={icon} alt={label} className="max-h-[16px]" />
				<input
					type="number"
					id={id}
					name={id}
					value={
						id === "bill"
							? bill
							: id === "numberOfPeople"
							? numberOfPeople
							: id === "customInput"
							? customInputValue
							: ""
					}
					className="w-full text-right font-bold text-cyan-800 placeholder:font-bold placeholder:text-cyan-500 bg-transparent outline-none cursor-pointer"
					placeholder="0"
					onChange={(e) => handleChange(e, id)}
					onFocus={() => handleFocus(id)}
					onBlur={handleBlur}
					autoFocus={autoFocus}
				/>
			</div>
		</div>
	);
}

function TipButton({ tip, custom = false, handleCustomInput }) {
	return (
		<button
			type="button"
			className={`h-[48px] w-full rounded-[4px] font-bold w-[118px] cursor-pointer ${
				custom
					? "text-[hsl(186,14%,43%)] bg-[hsl(189,41%,97%)]"
					: "text-white bg-[hsl(183,100%,15%)]"
			} ${custom ? "" : "hover:bg-[#9EE9DF] hover:text-[#00494D]"}`}
			onClick={custom ? handleCustomInput : null}
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

function ResetButton({ bill }) {
	return (
		<button
			type="reset"
			disabled={bill.trim() > 0 ? false : true}
			className="h-[48px] rounded-[4px] font-bold w-full text-[hsl(183,100%,15%)] bg-[hsl(172,67%,45%)] disabled:opacity-50"
		>
			RESET
		</button>
	);
}
