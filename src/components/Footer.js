import { useLocation } from "react-router-dom";

import styles from "../styles/Footer.module.css";

const Footer = () => {
	const location = useLocation();

	if (location.pathname === "/") return null;
	return <div className={styles.footer}>Footer</div>;
};

export default Footer;
