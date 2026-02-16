"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FaTrash, FaArrowLeft, FaCartShopping, FaBagShopping, FaCreditCard } from "react-icons/fa6";

const CartPage = () => {
    const { cartItems, removeFromCart, itemCount } = useCart();

    const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

    if (itemCount === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-white relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.03] architect-grid" />
                <div className="relative z-10 text-center space-y-8 max-w-md">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-sm border border-slate-100">
                        <FaBagShopping className="text-4xl text-slate-300" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Explore our elite masterclass series and start your engineering journey today.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00548B] transition-all shadow-2xl shadow-black/10 no-underline"
                    >
                        <FaArrowLeft /> Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fbff] pt-40 pb-32 px-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Cart Items List */}
                    <div className="flex-grow space-y-8">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                Shopping <span className="text-[#00548B]">Cart</span>
                            </h1>
                            <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 shadow-sm">
                                {itemCount} Items
                            </span>
                        </div>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex items-center gap-8 group hover:border-[#00548B]/30 transition-all duration-500"
                                >
                                    <div className="w-24 h-24 md:w-32 md:h-20 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                                        <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="text-[#00548B] text-[9px] font-black uppercase tracking-widest mb-1">{item.category}</div>
                                        <h3 className="text-lg font-black text-slate-900 group-hover:text-[#00548B] transition-colors">{item.title}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Instructor: {item.instructor}</p>
                                    </div>
                                    <div className="text-right space-y-3">
                                        <div className="text-xl font-black text-slate-900">Rs. {item.price.toLocaleString()}</div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center border border-slate-100"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#00548B] transition-colors no-underline group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Continue Exploring
                        </Link>
                    </div>

                    {/* Order Summary Checkout Card */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-[0_48px_128px_-32px_rgba(0,0,0,0.1)] sticky top-32">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">Order Summary</h2>

                            <div className="space-y-6 mb-10 pb-10 border-b border-slate-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-bold text-sm">Subtotal</span>
                                    <span className="text-slate-900 font-black">Rs. {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-bold text-sm">Processing Fee</span>
                                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Free</span>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <span className="text-slate-900 font-black uppercase text-xs tracking-widest">Total to Pay</span>
                                    <span className="text-3xl font-black text-[#00548B] tracking-tight">Rs. {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-slate-900 text-white flex items-center justify-center gap-4 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.25em] hover:bg-[#00548B] transition-all shadow-2xl shadow-black/10 active:scale-95 no-underline"
                            >
                                <FaCreditCard /> Proceed to Checkout
                            </Link>

                            <p className="text-center text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] mt-8">
                                Secure Architectural Transaction • SSA Encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
