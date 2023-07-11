import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/socket";

import styles from "../styles/Login.module.css";

const Login = () => {
	const socket = useContext(SocketContext);
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const loginHandler = (event) => {
		event.preventDefault();
		socket.emit("login", id, password, (success) => {
			if (success) {
				localStorage.setItem("userId", id);
				navigate("/home");
			} else {
				alert("로그인에 실패했습니다.");
			}
		});
	};

	useEffect(() => {
		if (localStorage.getItem("userId")) {
			navigate("/home");
		}
	}, []);

	return (
		<div className={styles.container}>
			<h1>Instagrain</h1>
			<form onSubmit={loginHandler}>
				<label>
					<p>아이디</p>
					<input
						type="text"
						required
						value={id}
						onChange={(event) => setId(event.target.value)}
						placeholder="아이디를 입력하세요"
					/>
				</label>
				<label>
					<p>패스워드</p>
					<input
						type="password"
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="패스워드를 입력하세요"
					/>
				</label>
				<button type="submit">로그인</button>
			</form>
		</div>
	);
};

export default Login;
