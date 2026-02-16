import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import axios from "axios";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const pidx = searchParams.get("pidx");
    const txnId = searchParams.get("txnId");
    const status = searchParams.get("status");
    const orderId = searchParams.get("purchase_order_id");

    if (status !== "Completed" || !pidx) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);
    }

    try {
        await dbConnect();
        const order = await Order.findById(orderId);
        if (!order) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);

        // Verify with Khalti (Optional but recommended)
        // const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
        // const verifyRes = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", 
        //     { pidx }, 
        //     { headers: { Authorization: `Key ${KHALTI_SECRET_KEY}` } }
        // );
        // if (verifyRes.data.status !== "Completed") return ...

        order.status = "completed";
        order.transactionId = txnId || pidx;
        order.paymentDetails = Object.fromEntries(searchParams.entries());
        await order.save();

        // Enroll student in all items
        const user = await User.findById(order.user);
        if (!user) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);

        const enrollmentItems = order.items && order.items.length > 0 ? order.items : (order.courseId ? [{ courseId: order.courseId }] : []);

        for (const item of enrollmentItems) {
            const course = await VideoCourse.findById(item.courseId);
            if (course) {
                if (!user.enrolledCourses.includes(course._id)) {
                    user.enrolledCourses.push(course._id);
                }
                if (!course.enrolledStudents.includes(user._id)) {
                    course.enrolledStudents.push(user._id);
                    await course.save();
                }
            }
        }
        await user.save();

        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/student`);
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);
    }
}
