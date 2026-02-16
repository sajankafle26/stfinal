"use client";
import React, { useState } from "react";
import axios from "axios";

const PaymentModal = ({ course, isOpen, onClose }: { course: any, isOpen: boolean, onClose: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState("");

    if (!isOpen) return null;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setLoading(true);
        setCouponError("");
        try {
            const res = await axios.post("/api/coupons/validate", {
                code: couponCode,
                amount: course.price
            });
            setAppliedCoupon(res.data);
        } catch (err: any) {
            setCouponError(err.response?.data?.message || "Invalid coupon");
            setAppliedCoupon(null);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (method: string) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/payment/initiate", {
                courseId: course._id,
                paymentMethod: method,
                couponCode: appliedCoupon?.code
            });
            // ...

            const { paymentData, paymentMethod } = res.data;

            if (paymentMethod === "esewa") {
                const form = document.createElement("form");
                form.method = "POST";
                form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

                for (const key in paymentData) {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = paymentData[key];
                    form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();
            } else if (paymentMethod === "khalti") {
                window.location.href = paymentData.payment_url;
            } else if (method === "cash") {
                alert("Enrollment submitted! We'll contact you for cash payment.");
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert("Payment initiation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
            <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-10 border border-slate-800 relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <h3 className="text-2xl font-black text-white mb-2">Complete Purchase</h3>
                <p className="text-slate-400 mb-6 text-sm">Select payment method for <b>{course.title}</b>.</p>

                {/* Coupon Input */}
                <div className="mb-8 space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Discount Coupon</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter Code"
                            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold outline-none focus:border-indigo-500 transition-all text-sm"
                        />
                        <button
                            onClick={handleApplyCoupon}
                            disabled={loading || !couponCode}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            Apply
                        </button>
                    </div>
                    {couponError && <p className="text-red-500 text-[10px] font-bold ml-2">{couponError}</p>}
                    {appliedCoupon && (
                        <p className="text-green-400 text-[10px] font-bold ml-2 flex items-center gap-2">
                            <i className="fa-solid fa-circle-check"></i>
                            Coupon Applied: {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}%` : `Rs. ${appliedCoupon.discountValue}`} OFF
                        </p>
                    )}
                </div>

                {/* Price Summary */}
                <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-bold">Course Price</span>
                        <span className="text-white font-black">Rs. {course.price.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Discount</span>
                            <span className="text-red-400 font-black">- Rs. {appliedCoupon.discountAmount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                        <span className="text-white font-black uppercase text-xs tracking-widest">Total to Pay</span>
                        <span className="text-2xl font-black text-indigo-400">
                            Rs. {(appliedCoupon ? appliedCoupon.finalAmount : course.price).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handlePayment("esewa")}
                        disabled={loading}
                        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#60bb46] rounded-xl flex items-center justify-center font-black text-white italic">eSewa</div>
                            <span className="text-white font-bold">Pay with eSewa</span>
                        </div>
                        <i className="fa-solid fa-chevron-right text-slate-600 group-hover:text-white transition-colors"></i>
                    </button>

                    <button
                        onClick={() => handlePayment("khalti")}
                        disabled={loading}
                        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#5c2d91] rounded-xl flex items-center justify-center font-black text-white italic text-xs">Khalti</div>
                            <span className="text-white font-bold">Pay with Khalti</span>
                        </div>
                        <i className="fa-solid fa-chevron-right text-slate-600 group-hover:text-white transition-colors"></i>
                    </button>

                    <button
                        onClick={() => handlePayment("cash")}
                        disabled={loading}
                        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-dashed border-white/10 p-5 rounded-2xl transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center font-black text-white italic text-xs">Cash</div>
                            <div>
                                <span className="text-white font-bold block">Pay by Cash</span>
                                <span className="text-slate-500 text-[10px] font-medium">Offline orientation payment</span>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-slate-600 group-hover:text-white transition-colors"></i>
                    </button>
                </div>

                {loading && <p className="text-center text-indigo-400 mt-6 animate-pulse">Redirecting to payment gateway...</p>}
            </div>
        </div>
    );
};

export default PaymentModal;
