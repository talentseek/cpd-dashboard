import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body.
    const body = await request.json();
    const { lead, debug } = body;

    if (debug) {
      console.log("DEBUG: Incoming request body:", JSON.stringify(body, null, 2));
    }

    if (!lead) {
      if (debug) console.error("DEBUG: No lead data provided in the request.");
      return NextResponse.json({ error: "No lead data provided" }, { status: 400 });
    }

    // Prepare company_data string for the prompt.
    let companyDataStr = "N/A";
    if (lead.company_data) {
      try {
        companyDataStr = JSON.stringify(lead.company_data, null, 2);
      } catch (err) {
        companyDataStr = String(lead.company_data);
        if (debug) console.error("DEBUG: Error stringifying company_data:", err);
      }
    }

    // Build the prompt including all available fields.
    const prompt = `
Given this lead's info: 
Name: ${lead.first_name} ${lead.last_name}
Company: ${lead.company}
Position: ${lead.position}
LinkedIn: ${lead.linkedin ?? "N/A"}
Company Website: ${lead.website ?? "N/A"}
Company Data: ${companyDataStr}

You are provided with detailed lead information from various sources. Your task is to research thoroughly and generate a JSON object that encapsulates the following details for each lead:

- **roll1, roll2, roll3:** Three role titles representing ideal job titles within the target companies that the lead would want to reach (their Ideal Customer Profile).
- **solution:** A concise description of the solution or value proposition offered by the lead’s company. This should be written in a way that it can be directly inserted into marketing phrases.
- **industry1, industry2, industry3:** Three target industries or market sectors the lead’s company serves.
- **painPoints:** An array of pain points that the target customers likely experience, which the lead’s solution can address. (Note: Each pain point can start with a capital letter.)
- **exampleJobTitle, exampleCompanyName, exampleProspectName:** Example prospect details that can be used to illustrate an ideal customer profile.

Your answer must be in valid JSON format with no additional text, markdown formatting, or commentary. Use the following template for your output:

{
  "roll1": "[ideal role title 1]",
  "roll2": "[ideal role title 2]",
  "roll3": "[ideal role title 3]",
  "solution": "[concise description of the solution, do not mention the company name and do not start with a capital letter]",
  "industry1": "[target industry 1]",
  "industry2": "[target industry 2]",
  "industry3": "[target industry 3]",
  "painPoints": [
    "[Pain point 1]",
    "[Pain point 2]",
    "[Pain point 3]",
    "[Pain point 4]",
    "[Pain point 5]"
  ],
  "exampleJobTitle": "[example prospect job title]",
  "exampleCompanyName": "[example prospect company]",
  "exampleProspectName": "[example prospect name]"
}

For reference, the variables will be used in a message like this:
  Hi {first_namee}, I took a look at {company} and it seems like we could connect you with prospects such as {custom.roll1}, {custom.roll2}, and {custom.roll3}. Reaching out to {custom.industry1}, {custom.industry2}, and {custom.industry3} companies needing {custom.solution}.
Generate the JSON based on the lead information provided. Make sure the JSON is clean, properly formatted, and ready to be copied directly.

This means it needs to read well pay close attention to how it would look especially this sentence it seems like we could connect you with prospects such as {custom.roll1}, {custom.roll2}, and {custom.roll3}. Reaching out to {custom.industry1}, {custom.industry2}, and {custom.industry3} needing {custom.solution}.

Remember the word "needing" is just before the solution so for example "needing a custom solution". 

`;

    // Log the full prompt if debugging is enabled.
    if (debug) {
      console.log("DEBUG: Full prompt sent to OpenAI:", prompt);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-4"
      messages: [
        {
          role: "system",
          content:
            "You are an AI that crafts short JSON personalization. Return ONLY valid JSON, no markdown.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Log the full OpenAI completion object if debugging is enabled.
    if (debug) {
      console.log("DEBUG: OpenAI completion response:", JSON.stringify(completion, null, 2));
    }

    // Clean up any potential triple backticks from GPT's response.
    let rawText = completion.choices[0]?.message?.content?.trim() || "";
    if (debug) {
      console.log("DEBUG: Raw text before cleaning:", rawText);
    }
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "");
    if (debug) {
      console.log("DEBUG: Raw text after cleaning:", rawText);
    }

    if (!rawText) {
      if (debug) console.error("DEBUG: No completion text returned from GPT-4o.");
      return NextResponse.json(
        { error: "No completion text returned from GPT-4o." },
        { status: 500 }
      );
    }

    let generatedJson;
    try {
      generatedJson = JSON.parse(rawText);
      if (debug) {
        console.log("DEBUG: Generated JSON parsed successfully:", generatedJson);
      }
    } catch (err) {
      if (debug) {
        console.error("DEBUG: Error parsing JSON from GPT output:", err);
      }
      // If it still doesn't parse, just return the raw text.
      return NextResponse.json({
        generatedPersonalization: rawText,
        warning: "Could not parse GPT output as JSON; returning raw text.",
      });
    }

    return NextResponse.json({
      generatedPersonalization: generatedJson,
    });
  } catch (error) {
    console.error("Error in generating personalization:", error);
    return NextResponse.json(
      { error: "Failed to generate personalization" },
      { status: 500 }
    );
  }
}