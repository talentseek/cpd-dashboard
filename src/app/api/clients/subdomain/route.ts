import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    return NextResponse.json(
      { error: 'Missing clientId parameter' },
      { status: 400 }
    );
  }

  try {
    // Fetch the client's subdomain
    const { data: client, error } = await supabase
      .from('clients')
      .select('subdomain')
      .eq('id', clientId)
      .single();

    if (error || !client) {
      console.error(
        'Error fetching client subdomain:',
        error?.message || 'Client not found'
      );
      return NextResponse.json(
        { error: 'Client not found or invalid' },
        { status: 404 }
      );
    }

    return NextResponse.json({ subdomain: client.subdomain });
  } catch (unknownError) {
    // By default, 'unknownError' is type 'unknown' in a catch block
    let errorMessage = 'Failed to fetch client subdomain';

    if (unknownError instanceof Error) {
      errorMessage = unknownError.message;
    }

    console.error('Error fetching client subdomain:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}