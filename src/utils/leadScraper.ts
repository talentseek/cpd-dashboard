import puppeteer from 'puppeteer';
import { supabase } from '@/lib/utils';

interface LeadData {
  name: string;
  position: string;
  company: string;
  profile_link: string;
  // Add more fields if needed
}

interface ScrapeResult {
  totalLeads: number;
  duplicates: number;
  leads: LeadData[];
}

export async function scrapeLeads(
  searchUrl: string,
  campaignId: number
): Promise<ScrapeResult> {
  // Fetch cookies for the campaign
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('cookies')
    .eq('id', campaignId)
    .single();

  if (error || !campaign?.cookies) {
    throw new Error('Cookies not found for the campaign');
  }

  const { li_a, li_at } = campaign.cookies;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Cookies being set for Puppeteer:', { li_a, li_at });

    // Set cookies
    await page.setCookie(
      {
        name: 'li_a',
        value: li_a,
        domain: '.linkedin.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: 'li_at',
        value: li_at,
        domain: '.linkedin.com',
        path: '/',
        httpOnly: true,
        secure: true,
      }
    );

    console.log('Navigating to URL:', searchUrl);
    const response = await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    if (!response) {
    throw new Error('Navigation failed - no response received');
    }
    console.log('Final URL after navigation:', response.url());

    // Example scraping logic
    const leads: LeadData[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.result')).map((el) => ({
        name: el.querySelector('.name')?.textContent?.trim() || '',
        position: el.querySelector('.position')?.textContent?.trim() || '',
        company: el.querySelector('.company')?.textContent?.trim() || '',
        profile_link: el.querySelector('a')?.href || '',
      }));
    });

    console.log(`Scraped ${leads.length} leads.`);

    await browser.close();

    return {
      totalLeads: leads.length,
      duplicates: 0,
      leads,
    };
  } catch (err) {
    console.error('Error during Puppeteer execution:', err);
    await browser.close();
    throw err;
  }
}