import { Request, Response, NextFunction } from "express";
import path from "path";
import { UserNotFoundError, TripNotFoundError, PlaceNotFoundError, UnauthorizedAccess } from "./errors";
import { logger } from "./logger";


export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    logger.writeError(error);
    if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: "User not found" });
    } else if (error instanceof TripNotFoundError) {
        return res.status(404).json({ error: "Trip not found" });
    } else if (error instanceof PlaceNotFoundError) {
        return res.status(404).json({ error: "Place not found" });
    } else if (error instanceof UnauthorizedAccess) {
        return res.status(403).json({ error: "Unauthorized access" });
    } else if (error instanceof Error) {
        return res.status(500).json({ error: error.message, stack: error.stack });
    } else {
        return res.status(500).json({ error: "Unknown error" });
    }
}