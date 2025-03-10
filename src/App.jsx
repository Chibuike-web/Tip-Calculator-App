import "./App.css";
import Logo from "./assets/logo.svg";
import Splitter from "./components/Splitter";

function App() {
	return (
		<div className="content-center justify-items-center min-h-screen py-40 bg-cyan-400">
			<img src={Logo} alt="Logo" className="w-full max-w-[86.66px] mb-[88px]" />
			<Splitter />
		</div>
	);
}

export default App;
