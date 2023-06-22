const { ServiceBroker } = require("moleculer");
const io = require("socket.io");

const dataSize = 3 * 1024 * 1024;
function generateLargeData(size) {
	const data = "0".repeat(size);
	return data;
}

const websocketService = {
	name: "websocket",

	started() {
		const httpServer = this.broker.getLocalService("http").app;
		const socketServer = io(httpServer);

		socketServer.on("connection", (socket) => {
			console.log("Новий клієнт підключився!");

			socket.on("chat message", (data) => {
				socketServer.emit("chat message", data);
			});

			socket.on("disconnect", () => {
				console.log("Клієнт відключився!");
			});

			const data = generateLargeData(dataSize);

			socket.on("requestData", () => {
				console.log("Отримано запит на дані через WebSocket");
				socket.emit("data", data);
			});
		});

		console.log("WebSocket-сервер запущено");
	},
};

const broker = new ServiceBroker();
broker.createService(websocketService);
broker.start();
