import styles from "../styles/Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faPoo,
	faPenToSquare,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	if (location.pathname === "/") return null;

	return (
		<div className={styles.header}>
			<FontAwesomeIcon className={styles.logo} icon={faPoo} />
			<p onClick={() => navigate("/home")}>Instagrain</p>
			<FontAwesomeIcon
				className={styles.logout}
				icon={faArrowRightFromBracket}
				onClick={() => {
					localStorage.removeItem("userId");
					navigate("/");
				}}
			/>
			<FontAwesomeIcon
				className={styles.find}
				icon={faMagnifyingGlass}
				onClick={() => navigate("/find")}
			/>
			<FontAwesomeIcon
				className={styles.write}
				icon={faPenToSquare}
				onClick={() => navigate("/write")}
			/>
		</div>
	);
};

export default Header;
