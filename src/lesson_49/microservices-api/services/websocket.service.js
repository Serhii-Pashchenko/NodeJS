"use strict";
const { ServiceSchemaError } = require("moleculer").Errors;
const { Server } = require("http");
const { ServiceBroker } = require("moleculer");
const { io } = require("socket.io");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "websocket",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: ["http"],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */

		websocket: {
			rest: {
				method: "GET",
				path: "/",
			},
			async handler(ctx) {
				const dataSize = 3 * 1024 * 1024;
				function generateLargeData(size) {
					const data = "0".repeat(size);
					return data;
				}

				const httpServer = await ctx.call("http.getServer");
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
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};