import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // 1. Total Earnings (Sum of completed orders)
        const totalEarningsArr = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalEarnings = totalEarningsArr[0]?.total || 0;

        // 2. Sales Volume
        const totalSales = await Order.countDocuments({ status: 'completed' });

        // 3. User Stats
        const totalStudents = await User.countDocuments({ role: 'student' });

        // 4. Pending Orders (Potential revenue)
        const pendingOrders = await Order.countDocuments({ status: 'pending' });

        // 5. Recent Purchases (Last 5)
        const recentPurchases = await Order.find({ status: 'completed' })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email');

        // 6. Earnings by CourseType (Video vs Live)
        const typeStats = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: "$courseType", total: { $sum: "$amount" }, count: { $sum: 1 } } }
        ]);

        return NextResponse.json({
            totalEarnings,
            totalSales,
            totalStudents,
            pendingOrders,
            recentPurchases,
            typeStats
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
