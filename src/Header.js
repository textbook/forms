import logo from "./logo-CYF-square.png";
import "./Header.scss";

function Header() {
	return (
		<>
			<header>
				<img src={logo} alt="Code Your Future logo" />
			</header>
			<h1>Volunteer Application Form</h1>
		</>
	);
}

export default Header;
