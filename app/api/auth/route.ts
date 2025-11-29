import { NextResponse } from "next/server";
import { register, login, setAuthCookie } from "@/lib/auth";
import { resumeAndPrerenderToNodeStream } from "react-dom/static";

export async function POST(req: Request) {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    const body = await req.json();

    if ( action === 'signup') {
        try {
            const user = await register(body);
            return NextResponse.json({ user });
        } catch (e: any) {
            return NextResponse.json({ error: e.message}, { status: 400 })

        }
    }
    else if ( action === 'login') {
        try {
            const { token, user } = await login(body);
            const res = NextResponse.json({ user });
            setAuthCookie(res, token);
            return res;
        } catch (e: any) {
            return NextResponse.json({ error: e.message}, { status: 401})
        }
    }
}