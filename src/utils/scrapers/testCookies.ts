import puppeteer from "puppeteer";

export async function testCookies(li_a: string, li_at: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("Setting cookies:", { li_a, li_at });

    // Set LinkedIn cookies
    await page.setCookie(
      { name: "li_a", value: li_a, domain: ".linkedin.com" },
      { name: "li_at", value: li_at, domain: ".linkedin.com" }
    );

    // Navigate to LinkedIn Sales Navigator
    const response = await page.goto("https://www.linkedin.com/sales/home", {
      waitUntil: "domcontentloaded", // Adjust navigation strategy
      timeout: 10000, // Timeout for preventing hangs
    });

    // Check if response is null
    if (!response) {
      throw new Error("Navigation failed: No response received.");
    }

    const statusCode = response.status();
    const finalUrl = response.url();

    console.log("Navigation result:", { statusCode, finalUrl });

    // Check for too many redirects or unusual behavior
    if (statusCode >= 300 && statusCode < 400) {
      console.warn("Detected too many redirects.");
      throw new Error("Too many redirects. Possible invalid cookies.");
    }

    // Determine if the cookies are valid
    if (finalUrl === "https://www.linkedin.com/sales/home") {
      return "Cookies are valid!";
    } else if (finalUrl.includes("linkedin.com/sales/login")) {
      return "Cookies are invalid. Redirected to the login page.";
    } else {
      return `Unexpected navigation behavior: ${finalUrl}`;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Specific handling for redirect errors
      if (error.message.includes("Too many redirects")) {
        throw new Error("Invalid cookies. Too many redirects encountered.");
      }

      // Generic error handling
      console.error("Error during cookie validation:", error.message);
      throw new Error(error.message || "An unknown error occurred during cookie validation.");
    } else {
      console.error("Unexpected non-Error exception during cookie validation:", error);
      throw new Error("An unknown error occurred during cookie validation.");
    }
  } finally {
    await browser.close();
  }
}