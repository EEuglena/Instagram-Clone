import { useContext, useState } from "react";
import { SocketContext } from "../contexts/socket";
import styles from "../styles/Write.module.css";
import { useNavigate } from "react-router-dom";

const Write = () => {
	const userId = localStorage.getItem("userId");
	const postId = Date.now();
	const socket = useContext(SocketContext);
	const [content, setContent] = useState("");
	const [image, setImage] = useState("banana");
	const navigate = useNavigate();

	const submitHandler = (event) => {
		event.preventDefault();
		socket.emit("new_post", userId, content, image, postId, () =>
			navigate("/")
		);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={submitHandler}>
				<label>
					<p>글 내용</p>
					<textarea
						type="text"
						required
						value={content}
						onChange={(event) => setContent(event.target.value)}
					/>
				</label>
				<label>
					<p>사진</p>
					<select
						name="image"
						id="image"
						onChange={(event) => setImage(event.target.value)}
					>
						<option value="banana">banana</option>
						<option value="penguin">penguin</option>
						<option value="bulb">bulb</option>
					</select>
				</label>
				<button type="submit">글쓰기</button>
			</form>
		</div>
	);
};

export default Write;
