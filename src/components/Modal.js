import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaperPlane,
	faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../contexts/socket";
import { useNavigate } from "react-router-dom";

const Modal = ({
	author,
	content,
	likes = [],
	comments,
	image,
	postId,
	setIsModalOpen,
}) => {
	const modalRef = useRef();
	const socket = useContext(SocketContext);
	const userId = localStorage.getItem("userId");
	const [isLike, setIsLike] = useState(false);
	const [comment, setComment] = useState("");
	const navigate = useNavigate();

	const handler = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			setIsModalOpen(false);
		}
	};

	const likeHandler = () => {
		socket.emit("like", postId, userId);
	};

	const profileNavigator = () => {
		navigate(`/profile/${author}`);
	};

	const commentHandler = (event) => {
		event.preventDefault();
		socket.emit("new_comment", postId, userId, comment);
	};

	useEffect(() => {
		setIsLike(
			JSON.parse(likes).findIndex((like) => like === userId) !== -1
		);
	}, [userId, likes]);

	useEffect(() => {
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	});

	return (
		<div ref={modalRef} className={styles.container}>
			<img
				src={`/assets/${image}.jpg`}
				alt=""
				onDoubleClick={likeHandler}
			/>
			<div>
				<div className={styles.body}>
					<div className={styles.profile}>
						<img
							src="/assets/profile_icon.jpg"
							alt=""
							onClick={profileNavigator}
						/>
						<p onClick={profileNavigator}>
							<strong>{author}</strong>
						</p>
					</div>
					<p>{content}</p>
				</div>
				<div className={styles.comments}>
					{comments &&
						JSON.parse(comments).map((comment, index) => (
							<p key={index}>
								<strong>{comment.author}</strong>{" "}
								{comment.content}
							</p>
						))}
				</div>
				<div className={styles.input}>
					{isLike ? (
						<FontAwesomeIcon
							beat
							icon={solidHeart}
							style={{
								color: "#ff4747",
								"--fa-animation-iteration-count": 1,
								"--fa-animation-duration": "0.5s",
							}}
							onClick={likeHandler}
						/>
					) : (
						<FontAwesomeIcon
							icon={regularHeart}
							onClick={likeHandler}
						/>
					)}
					<form
						onSubmit={(event) => {
							commentHandler(event);
							setComment("");
						}}
					>
						<input
							type="text"
							required
							value={comment}
							onChange={(event) => setComment(event.target.value)}
							placeholder="댓글을 입력하세요"
						/>
						<button type="submit">
							<FontAwesomeIcon icon={faPaperPlane} />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Modal;
