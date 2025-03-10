import React, { useState, useEffect } from "react";
import Dollar from "../assets/icon-dollar.svg";
import Profile from "../assets/icon-person.svg";

export default function Splitter() {
	const [bill, setBill] = useState("");
	const [numberOfPeople, setNumberOfPeople] = useState("");
	const [focusedInput, setFocusedInput] = useState("");
	const [error, setError] = useState("");
	const [customInputValue, setCustomInputValue] = useState("");
	const [tipAmount, setTipAmount] = useState("0.00");
	const [total, setTotal] = useState("0.00");
	const [activeTip, setActiveTip] = useState("");
	const [tipValue, setTipValue] = useState("");

	useEffect(() => {
		if (bill && tipValue && numberOfPeople > 0) {
			const newTipAmount = ((tipValue / 100) * parseFloat(bill)) / parseFloat(numberOfPeople);
			setTipAmount(newTipAmount.toFixed(2));
			const newTotal =
				((tipValue / 100) * parseFloat(bill) + parseFloat(bill)) / parseFloat(numberOfPeople);
			setTotal(newTotal.toFixed(2));
		}
	}, [bill, activeTip, tipValue, customInputValue, numberOfPeople]);

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
			setTipValue(value);
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
		setBill("");
		setNumberOfPeople("");
		setActiveTip("");
		setTipValue("");
		setTipAmount("0.00");
		setTotal("0.00");
	};

	const handleButtonClick = (tip) => {
		if (tip === "Custom") {
			setActiveTip("Custom");
		} else {
			setActiveTip(tip);
			setTipValue(parseFloat(tip));
			setCustomInputValue("");
		}
	};

	return (
		<main className="flex max-md:flex-col gap-[3rem] max-md:w-max justify-between w-full max-w-[57.5rem] bg-white px-[2rem] py-[2rem] rounded-[1.5rem]">
			{/* Input Section */}
			<section className="w-full max-w-[23.75rem] flex flex-col gap-[3rem]">
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
					<legend className="font-bold text-cyan-600 text-[1rem] mb-[0.5rem]">Select Tip %</legend>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-y-[0.875rem] place-items-center gap-x-[0.8125rem] w-full">
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
			<aside className="w-full min-h-full max-w-[25.8125rem] bg-cyan-800 rounded-[1rem] p-[2.5rem] max-md:p-6">
				<div className="flex flex-col h-full max-md:gap-10">
					<div className="flex flex-col gap-[3rem] mb-auto">
						<OutputDisplay label="Tip Amount" subLabel="/person" value={tipAmount} />
						<OutputDisplay label="Total" subLabel="/person" value={total} />
					</div>
					<ResetButton bill={bill} handleReset={handleReset} tipValue={tipValue} />
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
	customInputValue,
	autoFocus,
	error = "",
}) {
	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className={`font-bold text-[1rem] text-cyan-600 ${
					error ? "flex justify-between items-center" : ""
				}`}
			>
				<p>{label}</p>
				{error ? <p className="text-red-400">{error}</p> : ""}
			</label>
			<div
				className={`flex justify-between items-center rounded-[0.375rem] w-full px-[1rem] py-[0.875rem] h-[3rem] bg-cyan-300 ${
					!error && !window.matchMedia("(hover: none)").matches
						? "hover:border-[0.125rem] hover:border-[#26C0AB]"
						: "border-[0.125rem] border-red-400"
				}`}
				style={{
					border: focusedInput === id && !error ? "0.125rem #26C0AB solid" : "",
					marginBlockStart: id === "customInput" ? "" : "0.5rem",
				}}
			>
				<img src={icon} alt={label} className="max-h-[1rem]" />
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
		backgroundColour = "text-white bg-cyan-800";
	}

	return (
		<button
			type="button"
			className={`h-[3rem] w-full rounded-[0.25rem] font-bold  cursor-pointer ${backgroundColour} ${
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
			<div className="flex flex-col gap-[0.5rem]">
				<h3 className="text-cyan-300 text-[1rem] font-bold max-md:text-[0.8rem]">{label}</h3>
				<p className="text-cyan-500 text-[0.875rem] max-md:text-[0.6rem]">{subLabel}</p>
			</div>
			<output className="text-cyan-700 font-bold text-[3rem] max-md:text-[2.5rem]">${value}</output>
		</div>
	);
}

function ResetButton({ bill, handleReset }) {
	return (
		<button
			type="reset"
			disabled={bill.trim() > 0 ? false : true}
			className="h-[3rem] rounded-[0.25rem] font-bold w-full text-[hsl(183,100%,15%)] bg-[hsl(172,67%,45%)] disabled:opacity-50"
			style={{ cursor: bill.trim() > 0 ? "pointer" : "" }}
			onClick={handleReset}
		>
			RESET
		</button>
	);
}
