import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import logger from "./logger";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required");
}

// Synchronous initialization for the auth adapter
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  sendVerificationEmail: async ({ user, url, token }) => {
    logger.info(`Verification URL for ${user.email}: ${url}`);
    await resend.emails.send({
      from: "Notebook App <abhayraj.dunerya@nucleusteq.com>",
      to: user.email,
      subject: "Verify your email address",
      html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
    });
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session age every 1 day
  },

  plugins: [
    nextCookies(), // make sure this is the last plugin in the array
  ],
});

export type Session = typeof auth.$Infer.Session;
