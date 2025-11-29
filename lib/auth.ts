import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET
const COOKIE_NAME = "ice_auth"

export async function register({ email, username, password}) {
    const existing = await prisma.user.findFirst({
        where: { OR : [ { email}, { username}]}
    })    

    if (existing) throw new Error("User with that email or username already exists");
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ data: { email, username, passwordHash}});
    return user;
}