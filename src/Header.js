import logo from "./logo-CYF-square.png";
import "./Header.scss";

function Header() {
	return (
		<>
			<header>
				<img src={logo} alt="Code Your Future logo" />
			</header>
			<h1>Volunteer Application Form</h1>
			<p>
				Thank you for your interest! To ensure we’re a great fit, please
				complete the form below:
			</p>
		</>
	);
}

export default Header;
