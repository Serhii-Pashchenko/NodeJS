"use strict";

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "http",

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
		http: {
			rest: {
				method: "GET",
				path: "/polling",
			},
			async handler(ctx) {
				const dataSize = 3 * 1024 * 1024;
				function generateLargeData(size) {
					const data = "0".repeat(size);
					return data;
				}
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
	async started() {
		app.get("/polling", (req, res) => {
			res.sendFile(__dirname + "/index.html");
		});

		app.get("/polling", (req, res) => {
			console.log("Отримано запит на дані через HTTP polling");
			const data = generateLargeData(dataSize);
			res.send(data);
		});
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
