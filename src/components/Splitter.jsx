import React, { useState } from "react";
import Dollar from "../assets/icon-dollar.svg";
import Profile from "../assets/icon-person.svg";

export default function Splitter() {
	const [bill, setBill] = useState("");
	const [numberOfPeople, setNumberOfPeople] = useState("");
	const [focusedInput, setFocusedInput] = useState("");
	const [error, setError] = useState("");
	const [customInput, setCustomInput] = useState(false);
	const [customInputValue, setCustomInputValue] = useState("");
	const [tipAmount, setTipAmount] = useState("0.00");
	const [total, setTotal] = useState("0.00");
	const [activeTip, setActiveTip] = useState("");

	const handleChange = (e, id) => {
		const { value } = e.target;
		if (id === "bill") {
			setBill(value);
		} else if (id === "numberOfPeople") {
			setNumberOfPeople(value);

			if (value === "" || +value > 0) {
				setError("");
			} else if (+value === 0) {
				setError("Can't be zero");
			}
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

	const handleReset = (e) => {
		e.preventDefault();
	};

	const handleButtonClick = (tip) => {
		if (tip === "Custom") {
			setActiveTip("Custom");
			setCustomInputValue("");
		} else {
			setActiveTip(tip);
			setCustomInputValue("");
		}
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
						<TipButton
							tip="5%"
							handleButtonClick={handleButtonClick}
							isActive={activeTip === "5%"}
						/>
						<TipButton
							tip="10%"
							handleButtonClick={handleButtonClick}
							isActive={activeTip === "10%"}
						/>
						<TipButton
							tip="15%"
							handleButtonClick={handleButtonClick}
							isActive={activeTip === "15%"}
						/>
						<TipButton
							tip="25%"
							handleButtonClick={handleButtonClick}
							isActive={activeTip === "25%"}
						/>
						<TipButton
							tip="50%"
							handleButtonClick={handleButtonClick}
							isActive={activeTip === "50%"}
						/>
						{activeTip === "Custom" ? (
							<TextInput
								customInputValue={customInputValue}
								id="customInput"
								handleFocus={handleFocus}
								handleChange={handleChange}
								handleBlur={handleBlur}
								autoFocus
							/>
						) : (
							<TipButton
								tip="Custom"
								custom
								isActive={activeTip === "Custom"}
								handleButtonClick={handleButtonClick}
							/>
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
					error={error}
				/>
			</section>

			{/* Results Section */}
			<aside className="w-full min-h-full max-w-[413px] bg-cyan-800 rounded-2xl p-10">
				<div className="flex flex-col h-full">
					<div className="flex flex-col gap-12 mb-auto">
						<OutputDisplay label="Tip Amount" subLabel="/person" value={tipAmount} />
						<OutputDisplay label="Total" subLabel="/person" value={total} />
					</div>
					<ResetButton bill={bill} handleReset={handleReset} />
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
	error = "",
}) {
	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className={`font-bold text-[16px] text-cyan-600 ${
					error ? "flex justify-between items-center" : ""
				}`}
			>
				<p> {label}</p>
				{error ? <p className="text-red-400">{error}</p> : ""}
			</label>
			<div
				className={`flex justify-between items-center rounded-[6px] w-full px-4 py-3.5 h-[48px]  bg-cyan-300 ${
					!error ? "hover:border-[2px] hover:border-[#26C0AB]" : "border-[2px] border-red-400"
				}`}
				style={{
					border: focusedInput === id && !error ? "2px #26C0AB solid" : "",
					marginBlockStart: id === "customInput" ? "" : "8px",
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

function TipButton({ tip, custom = false, isActive, handleButtonClick }) {
	let backgroundColour;
	if (custom) {
		backgroundColour = "text-cyan-800 bg-cyan-300";
	} else if (isActive) {
		backgroundColour = "bg-cyan-700 text-cyan-800";
	} else {
		backgroundColour = "text-white bg-[hsl(183,100%,15%)]";
	}

	return (
		<button
			type="button"
			className={`h-[48px] w-full rounded-[4px] font-bold max-w-[118px] cursor-pointer ${backgroundColour} ${
				!custom && !isActive ? "hover:bg-[#9EE9DF] hover:text-[#00494D]" : ""
			}`}
			onClick={() => {
				handleButtonClick(tip);
			}}
		>
			{tip}
		</button>
	);
}

function OutputDisplay({ label, subLabel, value }) {
	return (
		<div className="flex justify-between items-center">
			<div className="flex flex-col gap-[8px]">
				<h3 className="text-cyan-300 text-[16px] font-bold">{label}</h3>
				<p className="text-cyan-500 text-[14px]">{subLabel}</p>
			</div>
			<output className="text-cyan-700 font-bold text-5xl">${value}</output>
		</div>
	);
}

function ResetButton({ bill, handleReset }) {
	return (
		<button
			type="reset"
			disabled={bill.trim() > 0 ? false : true}
			className="h-[48px] rounded-[4px] font-bold w-full text-[hsl(183,100%,15%)] bg-[hsl(172,67%,45%)] disabled:opacity-50"
			style={{ cursor: bill.trim() > 0 ? "pointer" : "" }}
			onClick={handleReset}
		>
			RESET
		</button>
	);
}
