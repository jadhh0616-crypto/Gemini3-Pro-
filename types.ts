export interface ScoreData {
  gemini3: string;
  gemini25: string;
  claude: string;
  gpt: string;
}

export interface BenchmarkItem {
  id: string;
  name: string;
  description: string;
  subDescription?: string; // For things like "No tools" vs "With tools"
  category: string; // e.g., "Academic reasoning"
  scores: ScoreData;
  isHeader?: boolean; // To group related rows if needed, though we might just flat list
  isBestGemini3: boolean; // To highlight the score
}

export interface BenchmarkGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  variations: BenchmarkItem[];
}
