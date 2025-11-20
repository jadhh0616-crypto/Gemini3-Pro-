import React from 'react';
import { Link } from 'react-router-dom';
import { BENCHMARK_DATA } from '../constants';
import { BenchmarkItem } from '../types';
import { BarChart2 } from 'lucide-react';

// Utility to parse values like "37.5%", "$5,478.16", "2,439"
const parseScore = (score: string): number => {
  if (!score || score === '—' || score === 'not supported') return 0;
  const clean = score.replace(/[%$,]/g, '');
  return parseFloat(clean);
};

// Check if a score string represents a valid, displayable score
const isValidScore = (score: string) => {
  if (!score) return false;
  const s = score.trim().toLowerCase();
  return s !== '—' && s !== '-' && s !== 'not supported' && s !== '';
};

const ChartCard: React.FC<{ item: BenchmarkItem; groupName: string }> = ({ item, groupName }) => {
  const scores = item.scores;
  const rawData = [
    { name: 'Gemini 3 Pro', value: parseScore(scores.gemini3), rawScore: scores.gemini3, color: 'bg-blue-600', label: 'Gemini 3' },
    { name: 'Gemini 2.5', value: parseScore(scores.gemini25), rawScore: scores.gemini25, color: 'bg-blue-200', label: 'Gemini 2.5' },
    { name: 'Claude 3.5', value: parseScore(scores.claude), rawScore: scores.claude, color: 'bg-orange-400', label: 'Claude' },
    { name: 'GPT-5.1', value: parseScore(scores.gpt), rawScore: scores.gpt, color: 'bg-green-500', label: 'GPT' },
  ];

  // Determine if lower is better (specific logic for OmniDoc)
  // const isLowerBetter = item.id.includes('omnidoc'); // Not strictly used for height calculation currently

  // Calculate max for scale
  const validValues = rawData.map(d => d.value);
  const maxVal = Math.max(...validValues);
  
  return (
    <Link to={`/benchmark/${item.id}`} className="block h-full">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col h-full group cursor-pointer relative">
        <div className="mb-4 h-[76px]">
            <div className="flex items-center justify-between mb-1">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</div>
            </div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors" title={groupName}>
                {groupName}
            </h3>
            {/* Show variation description if it differs from main name, truncated */}
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed" title={item.description}>
                {item.description}
            </p>
        </div>
        
        <div className="flex-1 flex items-end justify-around space-x-1 min-h-[120px] pb-2 border-b border-gray-100">
            {rawData.map((d, idx) => {
                // Calculate height percentage
                let heightPct = 0;
                if (maxVal > 0) {
                    // Standard visualization: height proportional to value
                    heightPct = (d.value / maxVal) * 100;
                }
                
                // Ensure a minimum visual sliver
                heightPct = Math.max(heightPct, 4); 

                return (
                <div key={idx} className="flex flex-col items-center justify-end w-full relative h-full">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        {d.name}: {d.rawScore}
                    </div>
                    
                    <div className="w-full flex flex-col justify-end h-full">
                        <div className="text-[10px] font-bold text-gray-700 mb-1 text-center w-full tracking-tighter scale-90">
                            {d.rawScore}
                        </div>
                        <div className="w-full px-0.5 flex items-end justify-center h-full">
                            <div 
                                className={`w-full max-w-[24px] rounded-t-sm transition-all duration-500 ${d.color}`}
                                style={{ height: `${heightPct}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="mt-2 text-[9px] text-gray-400 font-medium uppercase tracking-tighter text-center w-full truncate">
                        {d.label}
                    </div>
                </div>
                );
            })}
        </div>
        </div>
    </Link>
  );
};

const BenchmarkChart: React.FC = () => {
  const allCharts: Array<{ item: BenchmarkItem, groupName: string }> = [];
  
  BENCHMARK_DATA.forEach(group => {
    group.variations.forEach(item => {
        // STRICT FILTERING:
        // Only show chart if ALL 4 models have a valid score.
        // If any model has '—', 'not supported', or empty, we skip this item in visualization.
        if (
            isValidScore(item.scores.gemini3) &&
            isValidScore(item.scores.gemini25) &&
            isValidScore(item.scores.claude) &&
            isValidScore(item.scores.gpt)
        ) {
            allCharts.push({ item, groupName: group.name });
        }
    });
  });

  if (allCharts.length === 0) return null;

  return (
    <div className="mb-16">
        <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                <BarChart2 size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">可视化性能概览</h2>
                <p className="text-gray-500 text-sm">
                    直观展示各模型在关键基准上的得分对比 (仅展示包含完整四模型数据的测试项目，点击卡片查看详情)
                </p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allCharts.map((entry) => (
                <ChartCard key={entry.item.id} item={entry.item} groupName={entry.groupName} />
            ))}
        </div>
    </div>
  );
};

export default BenchmarkChart;