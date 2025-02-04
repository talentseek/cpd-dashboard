import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead } = body;
    if (!lead) {
      return NextResponse.json({ error: "No lead data provided" }, { status: 400 });
    }

    // ----------------------------------------------------------------
    // 1) Instruct GPT not to use fences or extra text in the output
    // ----------------------------------------------------------------
    const prompt = `
Given this lead's info: 
Name: ${lead.first_name} ${lead.last_name}
Company: ${lead.company}
Position: ${lead.position}
LinkedIn: ${lead.linkedin ?? "N/A"}

You are provided with lead information from sources such as LinkedIn and Sales Navigator. Your task is to generate a JSON object that encapsulates the following details for each lead:

- **roll1, roll2, roll3:** Three role titles representing ideal job titles within the target companies that the lead would want to reach.
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


For reference the variables will be used in a message like this so it is important it reads clearly, think carefully before creating the json so that it works in this context:
      Hi {first_namee}, I took a look at {company} and it seems like we could connect you with prospects such as {custom.roll1}, {custom.roll2}, and {custom.roll3}. Reaching out to {custom.industry1}, {custom.industry2}, and {custom.industry3} needing {custom.solution}.
Generate the JSON based on the lead information provided. Make sure the JSON is clean, properly formatted, and ready to be copied directly.
`;

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

    // ----------------------------------------------------------------
    // 2) Clean up any potential triple backticks from GPT's response
    // ----------------------------------------------------------------
    let rawText = completion.choices[0]?.message?.content?.trim() || "";
    // Remove ```json or ``` if GPT included it anyway
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "");

    if (!rawText) {
      return NextResponse.json(
        { error: "No completion text returned from GPT-4o." },
        { status: 500 }
      );
    }

    let generatedJson;
    try {
      generatedJson = JSON.parse(rawText);
    } catch (err) {
      // If it still doesn't parse, just return the raw text
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