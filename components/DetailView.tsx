import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, BrainCircuit, Target, BookOpen, Microscope, Key, AlertCircle } from 'lucide-react';
import { BENCHMARK_DATA } from '../constants';
import { fetchBenchmarkDetails } from '../services/geminiService';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // API Key state management
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Find the group that contains this specific variation ID
  const group = BENCHMARK_DATA.find(g => g.variations.some(v => v.id === id));
  const benchmarkItem = group?.variations.find(v => v.id === id);

  // Load key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('user_gemini_api_key');
    // Check if process.env has a key (for dev environment)
    const envKey = process.env.API_KEY;
    
    if (storedKey) {
        setApiKey(storedKey);
    } else if (envKey) {
        setApiKey(envKey);
    } else {
        setShowKeyInput(true);
    }
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (benchmarkItem && group && apiKey && !details) {
        setLoading(true);
        setError(null);
        try {
            const text = await fetchBenchmarkDetails(apiKey, group.name, group.category);
            setDetails(text);
        } catch (err) {
            setError("无法获取分析结果。请检查您的 API Key 是否正确或网络连接。");
            setShowKeyInput(true); // Re-show input on error
        } finally {
            setLoading(false);
        }
      }
    };

    if (apiKey) {
        loadDetails();
    }
  }, [benchmarkItem, group, apiKey, details]);

  const handleKeySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const input = (document.getElementById('apiKeyInput') as HTMLInputElement).value;
      if (input.trim()) {
          localStorage.setItem('user_gemini_api_key', input.trim());
          setApiKey(input.trim());
          setShowKeyInput(false);
      }
  };

  const clearKey = () => {
      localStorage.removeItem('user_gemini_api_key');
      setApiKey('');
      setDetails(null);
      setShowKeyInput(true);
  };

  if (!benchmarkItem || !group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">未找到该测试项目</h2>
          <Link to="/" className="text-blue-600 hover:underline">返回主页</Link>
        </div>
      </div>
    );
  }

  // Simple parser to split the Gemini text into paragraphs for rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.trim() === '') return <br key={idx} />;
      // Simple bold parsing for **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="text-gray-900 font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">返回基准测试列表</span>
          </Link>
          
          {apiKey && !showKeyInput && (
              <button onClick={clearKey} className="text-xs text-gray-400 hover:text-red-500 flex items-center">
                  <Key size={12} className="mr-1" /> 重置 API Key
              </button>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
            {group.category}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{group.name}</h1>
          <p className="text-xl text-gray-500 font-light">{group.description}</p>
          {benchmarkItem.description && benchmarkItem.description !== group.description && (
             <p className="text-md text-gray-400 mt-2 italic border-l-4 border-gray-200 pl-3">
               特定条件: {benchmarkItem.description}
             </p>
          )}
        </div>

        {/* Scores Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><Target size={64} /></div>
            <div className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-1">Gemini 3 Pro</div>
            <div className="text-3xl font-bold text-blue-900">{benchmarkItem.scores.gemini3}</div>
          </div>
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
             <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Gemini 2.5 Pro</div>
             <div className="text-2xl font-semibold text-gray-700">{benchmarkItem.scores.gemini25}</div>
          </div>
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
             <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Claude 3.5 Sonnet</div>
             <div className="text-2xl font-semibold text-gray-700">{benchmarkItem.scores.claude}</div>
          </div>
           <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
             <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">GPT-5.1</div>
             <div className="text-2xl font-semibold text-gray-700">{benchmarkItem.scores.gpt}</div>
          </div>
        </div>

        {/* Dynamic AI Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BrainCircuit className="w-6 h-6 mr-2 text-purple-600" />
            基准测试分析 (由 Gemini 生成)
          </h2>
          
          {showKeyInput && !details ? (
             <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <Key className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">需要 API Key 才能查看深度分析</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
                    此部分内容由 Gemini 实时生成。为了在公共网页上使用，请提供您自己的 Google Gemini API Key。
                    <br/>您的 Key 仅存储在本地浏览器中，不会上传到任何服务器。
                </p>
                <form onSubmit={handleKeySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="password" 
                        id="apiKeyInput"
                        placeholder="输入您的 API Key" 
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        确认
                    </button>
                </form>
                <div className="mt-4 text-xs text-gray-400">
                    没有 Key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">点击此处免费获取</a>
                </div>
             </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
              <p>正在咨询 Gemini 以获取详细分析...</p>
            </div>
          ) : error ? (
             <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center text-red-600">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>{error}</p>
                <button onClick={() => setShowKeyInput(true)} className="mt-4 text-sm font-medium underline hover:text-red-800">
                    重新输入 Key
                </button>
             </div>
          ) : (
            <div className="bg-white rounded-2xl">
              {details && renderContent(details)}
            </div>
          )}
        </div>

        {/* Feature Grid (Static Visual Decoration) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-100">
            <div className="flex flex-col items-start">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg mb-4"><Microscope size={24} /></div>
                <h3 className="font-semibold text-gray-900">科学严谨</h3>
                <p className="text-sm text-gray-500 mt-2">该基准测试旨在严格评估特定的认知能力。</p>
            </div>
            <div className="flex flex-col items-start">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg mb-4"><BookOpen size={24} /></div>
                <h3 className="font-semibold text-gray-900">广泛覆盖</h3>
                <p className="text-sm text-gray-500 mt-2">测试广泛的领域，以确保模型的泛化能力。</p>
            </div>
            <div className="flex flex-col items-start">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg mb-4"><Target size={24} /></div>
                <h3 className="font-semibold text-gray-900">高精确度</h3>
                <p className="text-sm text-gray-500 mt-2">使用经过验证的答案集，以尽量减少评估中的误报。</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default DetailView;