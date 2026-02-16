"use client";
import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaCartShopping, FaXmark } from "react-icons/fa6";
import { VideoCourse } from "@/types";

interface CartToastProps {
    course: VideoCourse | null;
    onClose: () => void;
}

const CartToast: React.FC<CartToastProps> = ({ course, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (course) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300); // Wait for fade-out animation
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [course, onClose]);

    if (!course && !visible) return null;

    return (
        <div className={`fixed top-24 right-6 z-[200] transition-all duration-500 transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl shadow-2xl flex items-center gap-5 min-w-[320px]">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-lg">
                    <img src={course?.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-0.5">
                        <FaCircleCheck className="text-xs" /> Added to Cart
                    </div>
                    <h4 className="text-white font-bold text-sm line-clamp-1">{course?.title}</h4>
                </div>
                <button
                    onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 flex items-center justify-center transition-colors border border-white/5"
                >
                    <FaXmark className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default CartToast;
