import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  const { workloads, currentEnvironment, userCount, dataSize, priorities, compliance } =
    await request.json();

  const prompt = `You are a senior AWS Solutions Architect with deep expertise in cloud migration.
A client has described their current infrastructure. Analyse it and produce a professional migration assessment.

CURRENT INFRASTRUCTURE:
- Workloads: ${workloads}
- Current Environment: ${currentEnvironment}
- Number of Users: ${userCount}
- Data Size: ${dataSize}
- Priorities: ${priorities}
- Compliance Requirements: ${compliance || "None specified"}

Respond in the following JSON format only, no additional text:
{
  "strategy": "One of: Rehost | Replatform | Refactor | Repurchase | Retire | Retain | Relocate",
  "strategy_reasoning": "2-3 sentences explaining why this strategy fits",
  "recommended_services": [
    { "service": "AWS Service Name", "purpose": "Why this service", "replaces": "What it replaces" }
  ],
  "complexity": "Low | Medium | High",
  "complexity_reasoning": "1-2 sentences on why",
  "risks": ["Risk 1", "Risk 2", "Risk 3"],
  "next_steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "estimated_timeline": "e.g. 3-6 months"
}`;

  const command = new InvokeModelCommand({
    modelId: "us.anthropic.claude-haiku-4-5-20251001",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));
  const text = responseBody.content[0].text;
  const assessment = JSON.parse(text);

  return Response.json({ assessment });
}
