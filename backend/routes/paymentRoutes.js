/*import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getFees, makePayment, getPaymentHistory } from "../controllers/paymentController.js";

const router = express.Router();
router.get("/fees", protect, getFees);
router.post("/pay", protect, makePayment);
router.get("/history/:studentId", protect, getPaymentHistory);
export default router;
*/
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getFees,
  createCheckoutSession,
  getPaymentHistory,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/fees", protect, getFees);
router.post("/checkout", protect, createCheckoutSession);
router.get("/history/:studentId", protect, getPaymentHistory);

export default router;
