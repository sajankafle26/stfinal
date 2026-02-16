"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaShield, FaLock, FaCreditCard, FaCircleCheck } from "react-icons/fa6";
import axios from "axios";

const CheckoutPage = () => {
    const { cartItems, itemCount, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<"esewa" | "khalti" | "cash">("esewa");

    // Coupon states
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState("");
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
    const finalAmount = appliedCoupon ? appliedCoupon.finalAmount : subtotal;

    useEffect(() => {
        if (!session) {
            router.push("/studentlogin?callbackUrl=/checkout");
        } else if (cartItems.length === 0) {
            router.push("/");
        }
    }, [session, cartItems, router]);

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setIsValidatingCoupon(true);
        setCouponError("");
        try {
            const res = await axios.post("/api/coupons/validate", {
                code: couponCode,
                amount: subtotal
            });
            setAppliedCoupon(res.data);
        } catch (err: any) {
            setCouponError(err.response?.data?.message || "Invalid coupon");
            setAppliedCoupon(null);
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Initiate multi-course payment
            const res = await axios.post("/api/payment/initiate", {
                courseIds: cartItems.map(item => item.id || (item as any)._id),
                paymentMethod: selectedMethod,
                amount: finalAmount,
                couponCode: appliedCoupon?.code
            });

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
            } else if (selectedMethod === "cash") {
                alert("Order submitted! We'll contact you for cash payment.");
                clearCart();
                router.push("/dashboard/student");
            }
        } catch (err) {
            console.error(err);
            alert("Checkout initiation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!session || cartItems.length === 0) return null;

    return (
        <div className="min-h-screen bg-[#f8fbff] pt-40 pb-32 px-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Left: Shipping & Payment Details */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <Link href="/cart" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00548B] hover:text-slate-900 transition-colors no-underline group">
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Finalize Selection
                            </Link>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Checkout</h1>
                        </div>

                        {/* User Summary Section */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-4 shadow-sm">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Verified</div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-[#00548B] rounded-full flex items-center justify-center font-black">
                                    {session.user?.name?.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-slate-900 font-black">{session.user?.name}</div>
                                    <div className="text-slate-500 text-xs font-medium">{session.user?.email}</div>
                                </div>
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-black">%</span>
                                Applied Discount
                            </h3>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter Architectural Coupon"
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-indigo-500 transition-all text-sm uppercase tracking-widest"
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={isValidatingCoupon || !couponCode}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                                >
                                    {isValidatingCoupon ? "Validating..." : "Apply"}
                                </button>
                            </div>

                            {couponError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-2">{couponError}</p>}
                            {appliedCoupon && (
                                <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 p-4 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                                    <FaCircleCheck className="text-lg" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest">{appliedCoupon.code} Applied</div>
                                        <div className="text-xs font-bold">You save Rs. {appliedCoupon.discountAmount.toLocaleString()} extra</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Selection */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                <FaCreditCard className="text-[#00548B]" /> Select Payment Architecture
                            </h3>

                            <div className="grid gap-4">
                                <button
                                    onClick={() => setSelectedMethod("esewa")}
                                    className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group
                                    ${selectedMethod === 'esewa' ? 'bg-[#60bb46]/5 border-[#60bb46] shadow-lg shadow-[#60bb46]/10' : 'bg-white border-slate-100 opacity-60 hover:opacity-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#60bb46] rounded-xl flex items-center justify-center font-black text-white italic">eSewa</div>
                                        <div className="text-left font-black text-slate-900 uppercase tracking-widest text-[11px]">Instant Digital Transfer</div>
                                    </div>
                                    {selectedMethod === 'esewa' && <FaCircleCheck className="text-[#60bb46]" />}
                                </button>

                                <button
                                    onClick={() => setSelectedMethod("khalti")}
                                    className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group
                                    ${selectedMethod === 'khalti' ? 'bg-[#5c2d91]/5 border-[#5c2d91] shadow-lg shadow-[#5c2d91]/10' : 'bg-white border-slate-100 opacity-60 hover:opacity-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#5c2d91] rounded-xl flex items-center justify-center font-black text-white italic text-xs">Khalti</div>
                                        <div className="text-left font-black text-slate-900 uppercase tracking-widest text-[11px]">Secure Online Hub</div>
                                    </div>
                                    {selectedMethod === 'khalti' && <FaCircleCheck className="text-[#5c2d91]" />}
                                </button>

                                <button
                                    onClick={() => setSelectedMethod("cash")}
                                    className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group
                                    ${selectedMethod === 'cash' ? 'bg-slate-900/5 border-slate-900 shadow-lg shadow-black/10' : 'bg-white border-slate-100 opacity-60 hover:opacity-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center font-black text-white italic text-xs">Cash</div>
                                        <div className="text-left">
                                            <div className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Offline Orientation</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Visit our local center</div>
                                        </div>
                                    </div>
                                    {selectedMethod === 'cash' && <FaCircleCheck className="text-slate-900" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Checkout Sidebar */}
                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-[0_48px_128px_-32px_rgba(0,0,0,0.1)]">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">Summary Verification</h2>

                            <div className="max-h-[300px] overflow-y-auto mb-10 pr-2 space-y-4 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <img src={item.thumbnail} className="w-16 h-12 rounded object-cover shadow-sm" alt="" />
                                        <div className="flex-grow">
                                            <div className="text-slate-900 font-black text-xs line-clamp-1">{item.title}</div>
                                            <div className="text-[#00548B] font-bold text-[10px]">Rs. {item.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-slate-100 mb-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-bold">Subtotal Amount</span>
                                    <span className="text-slate-900 font-black">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-emerald-600 font-bold flex items-center gap-2">
                                            Coupon Savings
                                            <span className="text-[8px] bg-emerald-100 px-2 py-0.5 rounded-full">{appliedCoupon.code}</span>
                                        </span>
                                        <span className="text-emerald-600 font-black">- Rs. {appliedCoupon.discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-slate-900 font-black uppercase text-xs tracking-widest underline decoration-[#00548B] decoration-2 underline-offset-4">Total Amount</span>
                                    <span className="text-3xl font-black text-slate-900 tracking-tight">Rs. {finalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-[#00548B] text-white flex items-center justify-center gap-4 py-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-900 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "Processing Encryption..." : <><FaShield /> Finalize Payment</>}
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <FaLock className="text-[#00548B]" /> 256-bit Architect SSL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
