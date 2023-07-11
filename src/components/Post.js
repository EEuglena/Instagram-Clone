import { useNavigate } from "react-router-dom";
import styles from "../styles/Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart as regularHeart,
	faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/socket";
import Modal from "./Modal";

const Post = ({ author, content, likes, comments, image, postId }) => {
	const navigate = useNavigate();
	const id = localStorage.getItem("userId");
	const [isLike, setIsLike] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const socket = useContext(SocketContext);

	useEffect(() => {
		setIsLike(JSON.parse(likes).findIndex((like) => like === id) !== -1);
	}, [id, likes]);

	const profileNavigator = () => {
		navigate(`/profile/${author}`);
	};
	const likeHandler = () => {
		socket.emit("like", postId, id);
	};

	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<img
					src="/assets/profile_icon.jpg"
					alt=""
					onClick={profileNavigator}
				/>
				<p onClick={profileNavigator}>{author}</p>
			</div>
			<img
				src={`/assets/${image}.jpg`}
				alt=""
				onDoubleClick={likeHandler}
			/>
			<p>{content}</p>
			<div className={styles.toolbar}>
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
				<FontAwesomeIcon
					icon={faComment}
					onClick={() => setIsModalOpen(true)}
				/>
			</div>
			<div className={styles.comments}>
				{comments &&
					JSON.parse(comments).map((comment, index) => (
						<p key={index}>
							<strong>{comment.author}</strong> {comment.content}
						</p>
					))}
			</div>
			{isModalOpen && (
				<Modal
					{...{
						author,
						content,
						likes,
						comments,
						image,
						postId,
						setIsModalOpen,
					}}
				/>
			)}
		</div>
	);
};

export default Post;
