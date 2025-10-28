/*
import Payment from "../models/Payment.js";
import FeeItem from "../models/FeeItem.js";

export const getFees = async (_, res) => {
  const fees = await FeeItem.find();
  res.json(fees);
};

export const makePayment = async (req, res) => {
  try {
    const { studentId, items } = req.body;
    const total = items.reduce((sum, i) => sum + i.amount, 0);

    const payment = await Payment.create({
      studentId,
      items,
      total,
      provider: "stripe",
      status: "paid",
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  const payments = await Payment.find({ studentId: req.params.studentId });
  res.json(payments);
};*/

// backend/controllers/paymentController.js
import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import FeeItem from "../models/FeeItem.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ============================================================
   1️⃣  FETCH AVAILABLE FEES
============================================================ */
export const getFees = async (_, res) => {
  try {
    const fees = await FeeItem.find();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   2️⃣  CREATE STRIPE CHECKOUT SESSION (Simplified)
============================================================ */
export const createCheckoutSession = async (req, res) => {
  try {
    const { studentId, items } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: "No items provided for payment." });
    }

    // Convert fees to Stripe line items
    const line_items = items.map((i) => ({
      price_data: {
        currency: "eur",
        product_data: { name: i.title || `Fee ${i.feeItemId}` },
        unit_amount: Math.round(i.amount * 100), // Convert euros to cents
      },
      quantity: 1,
    }));

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/portal/fees?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/portal/fees?cancelled=true`,
    });

    // Save payment record as immediately "paid" (sandbox mode)
    const total = items.reduce((sum, i) => sum + i.amount, 0);

    await Payment.create({
      studentId,
      items,
      total,
      provider: "stripe",
      status: "paid", // ✅ directly mark as paid in sandbox
      sessionId: session.id,
    });

    // Return the checkout URL
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ message: "Failed to create payment session" });
  }
};

/* ============================================================
   3️⃣  PAYMENT HISTORY
============================================================ */
export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId }).sort({
      createdAt: -1,
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
