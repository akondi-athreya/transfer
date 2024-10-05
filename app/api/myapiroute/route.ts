import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/user';

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  await dbConnect();
  const { name, email } = await request.json();
  
  const newUser = new User({ name, email });
  await newUser.save();
  
  return NextResponse.json(newUser, { status: 201 });
}
