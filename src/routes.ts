import { Express, Response } from "express";
import { getAllNominations } from "./data/queries";
import { getWinningIntervals } from "./analyzer";

function handleRouteError(res: Response, error: unknown): void {
	console.error("Route request failed:", error);
	res.status(500).json({ error: "System could not process the request" });
}

export function registerRoutes(app: Express): void {
	app.get("/health", (_req, res) => {
		res.json({ status: "ok" });
	});

	app.get("/csv-data", (_req, res) => {
		try {
			const nominations = getAllNominations.all();
			res.json(nominations);
		} catch (error: unknown) {
			handleRouteError(res, error);
		}
	});

	app.get("/winning-intervals", (_req, res) => {
		try {
			const winningIntervals = getWinningIntervals();
			
			res.json(winningIntervals);
		} catch (error: unknown) {
			handleRouteError(res, error);
		}
	});
}
