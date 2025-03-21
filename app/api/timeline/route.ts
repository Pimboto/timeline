// Path: app/api/timeline/route.ts
import { NextResponse } from 'next/server';
import { getTimelineData, updateTimelineData, TimelineData } from '@/lib/timelineState';

export async function GET() {
  const data = getTimelineData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data: TimelineData = await request.json();
  const updatedData = updateTimelineData(data);
  return NextResponse.json(updatedData);
}