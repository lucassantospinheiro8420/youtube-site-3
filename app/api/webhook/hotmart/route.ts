import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const status = body?.event;
  const utmContent = body?.data?.purchase?.tracking_parameters?.utm_content || '';

  if (status !== 'PURCHASE_APPROVED') {
    return NextResponse.json({ ok: true });
  }

  if (!utmContent) {
    return NextResponse.json({ ok: true });
  }

  await supabase
    .from('yt_rewards_events')
    .insert({ variant: utmContent, event: 'purchase' });

  return NextResponse.json({ ok: true });
}
