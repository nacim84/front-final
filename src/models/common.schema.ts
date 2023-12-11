import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/** User */
export type TUserSchema = z.infer<typeof userSchema>;
const userSchema = z.object({
 firstName: z.string().min(4, {
  message: "FirstName must be at least 4 characters.",
 }),
 lastName: z.string().min(4, {
  message: "LastName must be at least 4 characters.",
 }),
 address: z.string().min(42, {
  message: "Address must be at least 42 characters.",
 }),
 dateBirth: z.coerce.date(),
 email: z.string().email("Email is required."),
 role: z.enum(["USER", "ADMIN"])
});
export const userFormResolver = zodResolver(userSchema);

// Vote
export type TVoteSchema = z.infer<typeof voteSchema>;
const voteSchema = z.object({
 type: z.enum(["RESOLUTIONS", "CANDIDATES_PROPOSALS", "ELECTIONS"]),
 voteTemporality: z.object({ type: z.enum(["LIVE", "PLANNED"]), startDate: z.date(), endDate: z.date() }),
 title: z.string().min(4, {
  message: "Title must be at least 4 characters.",
 }),
 description: z.string().min(4, {
  message: "Description must be at least 4 characters.",
 }),
 alertSender: z.string().min(4, {
  message: "Sender must be at least 4 characters.",
 }),
});
export const voteFormResolver = zodResolver(voteSchema);

// Invite
export type TContactSchema = z.infer<typeof contactSchema>;
const contactSchema = z.object({
 receiverEmail: z.string().email().min(4, {
  message: "Receiver email is required.",
 }),
 subject: z.string().min(4, {
  message: "Object must be at least 4 characters.",
 }),
 comment: z.string().min(10, {
  message: "Comment must be at least 10 characters.",
 })
});
export const contactFormResolver = zodResolver(contactSchema);