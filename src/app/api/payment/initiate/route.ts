import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import VideoCourse from "@/models/VideoCourse";
import { generateEsewaSignature } from "@/utils/payment";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { courseId, courseIds, paymentMethod, couponCode } = await req.json();
        await dbConnect();

        let finalAmount = 0;
        let originalAmount = 0;
        let discount = 0;
        let items = [];
        let orderTitle = "";

        if (courseIds && Array.isArray(courseIds)) {
            // Cart based checkout
            const courses = await VideoCourse.find({ _id: { $in: courseIds } });
            if (courses.length === 0) return NextResponse.json({ message: "No courses found" }, { status: 404 });

            originalAmount = courses.reduce((acc, c) => acc + c.price, 0);
            items = courses.map(c => ({
                courseId: c._id,
                courseType: 'VideoCourse',
                courseTitle: c.title,
                price: c.price
            }));
            orderTitle = courses.length === 1 ? courses[0].title : `${courses.length} Masterclasses`;
        } else if (courseId) {
            // Single course checkout
            const course = await VideoCourse.findById(courseId);
            if (!course) return NextResponse.json({ message: "Course not found" }, { status: 404 });

            originalAmount = course.price;
            items = [{
                courseId: course._id,
                courseType: 'VideoCourse',
                courseTitle: course.title,
                price: course.price
            }];
            orderTitle = course.title;
        } else {
            return NextResponse.json({ message: "No courses specified" }, { status: 400 });
        }

        finalAmount = originalAmount;

        if (couponCode) {
            const Coupon = (await import("@/models/Coupon")).default;
            const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });

            if (coupon) {
                const now = new Date();
                const expiry = new Date(coupon.expiryDate);
                expiry.setHours(23, 59, 59, 999);

                const isValid = now <= expiry &&
                    coupon.usageCount < coupon.usageLimit &&
                    originalAmount >= coupon.minOrderAmount;

                if (isValid) {
                    if (coupon.discountType === 'percentage') {
                        discount = (originalAmount * coupon.discountValue) / 100;
                    } else {
                        discount = coupon.discountValue;
                    }
                    finalAmount = Math.max(0, originalAmount - discount);

                    // Increment usage count
                    await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usageCount: 1 } });
                }
            }
        }

        const transaction_uuid = `${Date.now()}-${(session.user as any).id}`;

        const order = await Order.create({
            user: (session.user as any).id,
            items: items,
            amount: finalAmount,
            paymentMethod,
            status: "pending",
            transactionId: transaction_uuid,
            courseTitle: orderTitle // Using aggregate title
        });

        if (paymentMethod === "esewa") {
            const product_code = "EPAYTEST"; // Use sandbox code
            const secret = "8g8MM8T38V8ORw9Y"; // Sandbox secret
            const message = `total_amount=${finalAmount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
            const signature = await generateEsewaSignature(secret, message);

            const paymentData = {
                amount: finalAmount,
                failure_url: `${process.env.NEXTAUTH_URL}/payment-failure`,
                product_delivery_charge: "0",
                product_service_charge: "0",
                product_code: product_code,
                signature: signature,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                success_url: `${process.env.NEXTAUTH_URL}/api/payment/esewa-callback`,
                tax_amount: "0",
                total_amount: finalAmount,
                transaction_uuid: transaction_uuid,
            };

            return NextResponse.json({ paymentMethod: "esewa", paymentData });
        }

        if (paymentMethod === "khalti") {
            const KHALTI_SECRET_KEY = "Key test_secret_key_..."; // User should provide this
            const response = await axios.post(
                "https://a.khalti.com/api/v2/epayment/initiate/",
                {
                    return_url: `${process.env.NEXTAUTH_URL}/api/payment/khalti-callback`,
                    website_url: process.env.NEXTAUTH_URL,
                    amount: finalAmount * 100, // Khalti expects paisa
                    purchase_order_id: order._id,
                    purchase_order_name: orderTitle,
                    customer_info: {
                        name: session.user?.name,
                        email: session.user?.email,
                    },
                },
                {
                    headers: {
                        Authorization: `Key ${KHALTI_SECRET_KEY}`,
                    },
                }
            );

            return NextResponse.json({ paymentMethod: "khalti", paymentData: response.data });
        }

        if (paymentMethod === "cash") {
            return NextResponse.json({ message: "Order created for cash payment", paymentMethod: "cash" });
        }

        return NextResponse.json({ message: "Invalid payment method" }, { status: 400 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
