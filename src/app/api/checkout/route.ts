// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price, imageUrl } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"], // Klarna is great for Swedish customers
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: title,
              images: [imageUrl],
            },
            unit_amount: price, // This expects the integer format (cents/öre) we saved in the DB
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}