import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import { generateEsewaSignature } from "@/utils/payment";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const data = searchParams.get("data");

    if (!data) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);

    try {
        const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
        const { transaction_uuid, status, total_amount, signature, transaction_code } = decodedData;

        if (status !== "COMPLETE") {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);
        }

        await dbConnect();
        const order = await Order.findOne({ transactionId: transaction_uuid });

        if (!order) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-failure`);

        order.status = "completed";
        order.transactionId = transaction_code;
        order.paymentDetails = decodedData;
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
