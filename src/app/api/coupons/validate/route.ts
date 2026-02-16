import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/Coupon";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const { code, amount } = await req.json();
        const amountInput = Number(amount) || 0;
        if (!code) {
            return NextResponse.json({ message: "Coupon code is required" }, { status: 400 });
        }

        await dbConnect();
        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) {
            return NextResponse.json({ message: "Invalid coupon code" }, { status: 400 });
        }

        const now = new Date();
        const expiry = new Date(coupon.expiryDate);
        expiry.setHours(23, 59, 59, 999); // Allow until end of day

        if (now > expiry) {
            return NextResponse.json({ message: "Coupon has expired" }, { status: 400 });
        }

        if (coupon.usageCount >= coupon.usageLimit) {
            return NextResponse.json({ message: "Coupon usage limit reached" }, { status: 400 });
        }

        if (amountInput && amountInput < coupon.minOrderAmount) {
            return NextResponse.json({
                message: `Minimum order amount for this coupon is Rs. ${coupon.minOrderAmount}`
            }, { status: 400 });
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (amountInput * coupon.discountValue) / 100;
        } else {
            discount = coupon.discountValue;
        }

        return NextResponse.json({
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            discountAmount: discount,
            finalAmount: Math.max(0, amountInput - discount),
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
