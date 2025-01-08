import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { supabase } from '@/lib/utils';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await the params
    const { id: campaignId } = await context.params;

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    // Fetch cookies from the database
    const { data, error } = await supabase
      .from('campaigns')
      .select('cookies')
      .eq('id', campaignId)
      .single();

    if (error || !data || !data.cookies) {
      return NextResponse.json(
        { error: 'Campaign not found or cookies missing' },
        { status: 404 }
      );
    }

    const cookies = data.cookies;
    if (!cookies.li_a || !cookies.li_at) {
      return NextResponse.json({ error: 'Invalid cookies in database' }, { status: 400 });
    }

    // Puppeteer validation
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Set cookies
      await page.setCookie(
        { name: 'li_a', value: cookies.li_a, domain: '.linkedin.com' },
        { name: 'li_at', value: cookies.li_at, domain: '.linkedin.com' }
      );

    // Navigate to the target URL
    const response = await page.goto('https://www.linkedin.com/sales/home', {
    waitUntil: 'networkidle2',
    });

    if (!response) {
    return NextResponse.json(
        { error: 'Failed to navigate to LinkedIn Sales Navigator' },
        { status: 500 }
    );
    }

    const finalUrl = response.url();
    console.log('Final URL after navigation:', finalUrl);

      if (finalUrl === 'https://www.linkedin.com/sales/home') {
        return NextResponse.json({ message: 'Cookies are valid!' }, { status: 200 });
      } else if (finalUrl === 'https://www.linkedin.com/sales/login') {
        return NextResponse.json(
          { error: 'Cookies are invalid. Redirected to login page.' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: `Unexpected navigation behavior: ${finalUrl}` },
          { status: 400 }
        );
      }
    } catch (err) {
      console.error('Puppeteer validation error:', err);
      return NextResponse.json(
        { error: 'Failed to validate cookies with Puppeteer' },
        { status: 500 }
      );
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error('Unexpected server error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}