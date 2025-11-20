import { GoogleGenAI } from "@google/genai";

export const fetchBenchmarkDetails = async (apiKey: string, benchmarkName: string, category: string) => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash for fast, high-quality textual explanations
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        请为名为 "${benchmarkName}" 的AI基准测试（类别：${category}）提供一个全面、结构化的技术概述。
        
        请按照以下清晰的章节结构回答：
        1. **测试内容 (What it Tests):** 解释被评估的核心能力（例如：推理、数学、多模态等）。
        2. **测试方法 (Methodology):** 测试是如何进行的？模型会接收什么样的问题或输入？
        3. **重要性 (Why it Matters):** 为什么这个特定的基准测试在当前的AI领域被认为很困难或很重要？
        4. **典型示例 (Typical Example):** 描述一个该基准测试中的假设或真实问题示例。
        
        请保持专业、技术性的语气，同时通俗易懂，适合Web开发人员或数据科学家阅读。
        请用中文回答。不要使用Markdown代码块包裹整个回复，但可以使用加粗来强调重点。
      `,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching benchmark details:", error);
    throw error;
  }
};