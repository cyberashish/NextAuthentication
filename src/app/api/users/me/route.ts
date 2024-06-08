import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest){
    // Extract data from token
    const token =   request.cookies.get("token")?.value || '';
    const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
    const userId = decodedToken.id;
    const user = await User.find({_id:userId}).select("-password")
    // Check if there is no user
    return NextResponse.json({
        message:"User Found",
        data:user
    })
}