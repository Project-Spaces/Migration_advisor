import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION || process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.BEDROCK_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BEDROCK_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  const {
    workloads,
    currentEnvironment,
    industry,
    userCount,
    dataSize,
    priorities,
    painPoints,
    budget,
    awsExpertise,
    compliance,
  } = await request.json();

  const prompt = `You are a senior AWS Solutions Architect with deep expertise in cloud migration strategy.
A client has described their current infrastructure and business context. Produce a professional, actionable migration assessment written for a CTO — focus on business outcomes, timelines, and risk. Avoid deep technical jargon unless necessary.

CLIENT PROFILE:
- Industry: ${industry}
- Current Environment: ${currentEnvironment}
- Workloads: ${workloads}
- Current Pain Points: ${painPoints}
- Number of Users: ${userCount}
- Data Size: ${dataSize}
- Primary Priority: ${priorities}
- Migration Budget: ${budget}
- In-house AWS Expertise: ${awsExpertise}
- Compliance Requirements: ${compliance || "None specified"}

INSTRUCTIONS:
1. Assess each workload individually and assign the most appropriate migration strategy from the 7 Rs (Rehost, Replatform, Refactor, Repurchase, Retire, Retain, Relocate).
2. Design a phased migration plan — what moves first, second, and third — based on risk, dependency, and business priority.
3. Recommend specific AWS services for each phase, including discovery and assessment tools where relevant.
4. Factor in the client's AWS expertise level when recommending managed vs self-managed services.
5. Factor in industry-specific compliance and architecture requirements.
6. Provide an estimated cost saving range based on the migration approach.
7. Keep the tone clear and outcome-focused — this will be read by a CTO, not a cloud engineer.

Respond in the following JSON format only, no additional text:
{
  "executive_summary": "3-4 sentence plain-English summary of the recommended approach and expected business outcome",
  "workload_breakdown": [
    {
      "workload": "Name or description of the workload",
      "recommended_r": "One of the 7 Rs",
      "reasoning": "1-2 sentences on why this R fits this specific workload"
    }
  ],
  "phases": [
    {
      "phase": "Phase 1 — e.g. Discovery & Foundation",
      "duration": "e.g. 1-2 months",
      "description": "What happens in this phase and why it comes first",
      "key_actions": ["Action 1", "Action 2", "Action 3"]
    }
  ],
  "recommended_services": [
    {
      "service": "AWS Service Name",
      "purpose": "What it does in this migration",
      "replaces": "What it replaces on-prem or in current environment",
      "phase": "Phase 1 / Phase 2 / Phase 3"
    }
  ],
  "estimated_cost_savings": "e.g. 30-45% reduction in infrastructure costs over 3 years",
  "complexity": "Low | Medium | High",
  "complexity_reasoning": "1-2 sentences explaining the complexity rating",
  "risks": ["Risk 1", "Risk 2", "Risk 3"],
  "next_steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "estimated_timeline": "e.g. 9-12 months end-to-end"
}`;

  const command = new InvokeModelCommand({
    modelId: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));
  const raw = responseBody.content[0].text;
  const text = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
  const assessment = JSON.parse(text);

  return Response.json({ assessment });
}
