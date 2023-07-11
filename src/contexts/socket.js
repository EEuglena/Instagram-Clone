import React from "react";
import io from "socket.io-client";

export const socket = io.connect("http://localhost:5500", {
	cors: {
		origin: "*",
	},
});
export const SocketContext = React.createContext();
