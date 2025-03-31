import express from "express";
import { bookTicket,getUserTickets } from "../controllers/ticket.js";
import {VerifyToken} from "../middleware/verify.js";

const router = express.Router();
router.post("/book",VerifyToken,bookTicket);
router.get("/my-tickets",VerifyToken,getUserTickets);

export default router;
