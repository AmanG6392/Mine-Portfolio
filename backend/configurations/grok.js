import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import portfolioData from "./portfolioData.js" 

const model = groq("grok-2", {
  apiKey: process.env.GROQ_API_KEY,
});

const systemInstruction = `
You are an AI assistant for my personal portfolio website.

RULES:
- Answer ONLY from the provided portfolio data
- Do NOT hallucinate or add external information
- Be concise, clear, and professional
- Always include relevant section links if applicable
- If something is not found, say you don’t have that information

PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}

EXAMPLES:

User: What projects have you built?
Response:
I have worked on multiple projects including ->
)- DBGenie -> which is database agent , can assist to manage your dataabse 
   it can create ,update ,insert, sort and delete the data and contents.
   can provide u the better result for your queries 

)- ProjectHub -> it is interactive app where u can chat ,video call, ai powered  so u can query take suggestion, also can share ur medias emojis, videos ,can create server or ask code for view can also run that code on this plateform, can create design your visuals thought design logos and can share them

)- Portfolio -> here I have made a modern very attractive portfolio which ai integrated , uses 3D model for great eyecatching portfolio , also u can ask question through the AI assistance , email me , can contact me 

.......

Always include section links in this exact markdown format at the end if relevant:

👉 [View Projects Section](#projects)
👉 [View Education Section](#education)
👉 [View About Section](#about)

Use ONLY these links.
Do not invent new links.

User: What is your degree?
Response:
I am pursuing a B.Tech in Computer Science.
👉 [View Education Section](/#education)
`;


const askPortfolioAI = async (prompt) => {
  try {
    const result = await generateText({
      model:groq("llama-3.1-8b-instant"),
      system: systemInstruction,
      prompt,
      temperature: 0.3,
    });

    return result.text;
  } catch (error) {
    console.error("Portfolio AI error:", error);
    return "Sorry, I couldn't process your request right now.";
  }
};

export default askPortfolioAI;
