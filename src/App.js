import { SocketContext, socket } from "./contexts/socket";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Main from "./routes/Main";
import Find from "./routes/Find";
import Profile from "./routes/Profile";
import Write from "./routes/Write";
import Login from "./routes/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App">
			<SocketContext.Provider value={socket}>
				<Router>
					<Header />
					<Routes>
						<Route path="/find" element={<Find />} />
						<Route path="/profile/:id" element={<Profile />} />
						<Route path="/write" element={<Write />} />
						<Route path="/home" element={<Main />} />
						<Route path="/" element={<Login />} />
					</Routes>
					<Footer />
				</Router>
			</SocketContext.Provider>
		</div>
	);
}

export default App;
