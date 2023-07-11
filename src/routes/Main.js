import { useNavigate } from "react-router-dom";
import styles from "../styles/Main.module.css";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/socket";
import Post from "../components/Post";

const Main = () => {
	const id = localStorage.getItem("userId");
	const [posts, setPosts] = useState([]);
	const socket = useContext(SocketContext);

	const navigate = useNavigate();

	const loadPosts = () => {
		socket.emit("load_posts", (res) => setPosts(res));
	};

	socket.on("posts_change", () => loadPosts());

	useEffect(() => {
		loadPosts();
	}, []);

	return (
		<div className={styles.container}>
			<div>
				<img
					className={styles.profile}
					src="/assets/profile_icon.jpg"
					alt=""
					onClick={() => navigate(`/profile/${id}`)}
				/>
				<p>어서오세요, {id} 님!</p>
			</div>
			<div className={styles.posts}>
				{posts?.map((post, index) => (
					<Post key={index} {...post} />
				))}
			</div>
		</div>
	);
};

export default Main;
