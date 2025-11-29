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

export async function login({ email, password}) {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if ( !user ) throw new Error("No user found with that email");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if ( !ok) throw new Error('Invalid')

    const token = jwt.sign({ userId: user.id})
    return { token, user};
}


export function setAuthCookie(res, token) {
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}`);
}


export function getUserIdFromReq(req) {
    const cookie = req.headers.get('cookie');
    const match = cookie.match(/ice_auth=([^;]+)/);
    if ( !match ) return null;
    try {
        const payload = jwt.verify(match[1], JWT_SECRET);
        return payload.userId;
    }
    catch (e) {
        return null;
    }
}