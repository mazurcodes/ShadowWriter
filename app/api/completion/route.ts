import { createCompletion } from '@/utils/aiUtils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const completion = await createCompletion(body);
    return NextResponse.json(completion.data.choices[0].message?.content);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
