/*

import { useFeesQuery, usePaymentHistoryQuery, useCheckoutMutation } from "../../services/api.js";
import { useSelector, useDispatch } from "react-redux";
import { setCheckoutLoading } from "../../features/payments/paymentSlice.js";
import toast from "react-hot-toast";

export default function Fees() {
  const sid = useSelector((s)=>s.auth.student?.studentId);
  const { data: fees = [], isLoading } = useFeesQuery();
  const { data: history = [] } = usePaymentHistoryQuery(sid, { skip: !sid });
  const [checkout] = useCheckoutMutation();
  const dispatch = useDispatch();

  const handlePay = async () => {
    try {
      dispatch(setCheckoutLoading(true));
      const items = fees.map(f => ({ feeItemId: f.id, amount: f.amount }));
      const { url } = await checkout({ studentId: sid, items }).unwrap();
      window.location.href = url; // Stripe
    } catch (e) {
      toast.error(e?.data?.message || "Payment init failed");
      dispatch(setCheckoutLoading(false));
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl border p-4">
        <h3 className="font-semibold mb-3">Outstanding Fees</h3>
        {isLoading ? "Loading..." : (
          <ul className="space-y-1">
            {fees.map(f => <li key={f.id} className="flex justify-between"><span>{f.title}</span><span>€{f.amount}</span></li>)}
          </ul>
        )}
        <button onClick={handlePay} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Pay Tuition</button>
        <p className="text-xs text-gray-500 mt-2">Redirects to Stripe Checkout.</p>
      </section>

      <section className="bg-white rounded-2xl border p-4">
        <h3 className="font-semibold mb-3">Payment History</h3>
        {!history.length ? <p>No payments yet.</p> : history.map(p => (
          <div key={p._id} className="border rounded p-3 mb-2">
            <div className="flex justify-between text-sm"><span>Status: {p.status}</span><span>Total: €{p.total}</span></div>
            <div className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

*/


import { useEffect } from "react";
import { useFeesQuery, usePaymentHistoryQuery, useCheckoutMutation } from "../../services/api.js";
import { useSelector, useDispatch } from "react-redux";
import { setCheckoutLoading } from "../../features/payments/paymentSlice.js";
import toast from "react-hot-toast";
import { Card, Spinner, Button, Table, Alert } from "react-bootstrap";

export default function Fees() {
  const sid = useSelector((s) => s.auth.student?.studentId);
  const { data: fees = [], isLoading } = useFeesQuery();
  const { data: history = [] } = usePaymentHistoryQuery(sid, { skip: !sid });
  const [checkout] = useCheckoutMutation();
  const dispatch = useDispatch();

  // ✅ Detect success/cancelled in query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      toast.success("✅ Payment completed successfully!");
    } else if (params.get("cancelled")) {
      toast.error("❌ Payment was cancelled.");
    }
  }, []);

  const handlePay = async () => {
    try {
      dispatch(setCheckoutLoading(true));
      const items = fees.map((f) => ({
        feeItemId: f.id,
        title: f.title,
        amount: f.amount,
      }));

      const { url } = await checkout({ studentId: sid, items }).unwrap();
      window.location.href = url; // redirect to Stripe
    } catch (e) {
      toast.error(e?.data?.message || "Payment initiation failed");
      dispatch(setCheckoutLoading(false));
    }
  };

  return (
    <div className="py-4">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Card.Title className="fw-bold text-primary mb-3">
            Outstanding Fees
          </Card.Title>

          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : !fees.length ? (
            <Alert variant="info">No outstanding fees.</Alert>
          ) : (
            <>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Amount (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((f) => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td>{f.title}</td>
                      <td>{f.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-grid mt-3">
                <Button onClick={handlePay} variant="success">
                  Pay Tuition Now
                </Button>
              </div>
              <p className="text-muted mt-2 small">
                Redirects to Stripe test checkout. Use test card 4242 4242 4242 4242.
              </p>
            </>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="fw-bold text-success mb-3">
            Payment History
          </Card.Title>

          {!history.length ? (
            <Alert variant="info">No payment records found.</Alert>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total (€)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((p) => (
                  <tr key={p._id}>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                    <td>{p.status}</td>
                    <td>{p.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
