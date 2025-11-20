import React from 'react';
import { Link } from 'react-router-dom';
import { BENCHMARK_DATA } from '../constants';
import { BenchmarkGroup, BenchmarkItem } from '../types';
import { ChevronRight } from 'lucide-react';
import BenchmarkChart from './BenchmarkChart';

const TableRow: React.FC<{ item: BenchmarkItem; groupName: string; isFirstInGroup: boolean; rowSpan: number }> = ({ item, groupName, isFirstInGroup, rowSpan }) => {
  return (
    <tr className="group hover:bg-gray-50 transition-colors duration-150">
      {isFirstInGroup && (
        <td className="py-4 pl-6 pr-4 align-top border-b border-gray-100" rowSpan={rowSpan}>
          <div className="flex flex-col">
            <Link 
                to={`/benchmark/${item.id}`}
                className="font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1 text-[15px]"
            >
              {groupName}
              <ChevronRight size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            {/* Mobile only helper text */}
            <span className="text-xs text-gray-400 md:hidden mt-1 font-normal">点击查看详情</span>
          </div>
        </td>
      )}
      
      <td className="py-4 px-4 align-top border-b border-gray-100">
         <div className="flex flex-col justify-center h-full">
            <span className="text-sm text-gray-600 font-normal">{item.description || item.category}</span>
         </div>
      </td>

      <td className="py-4 px-4 align-middle border-b border-white bg-blue-50/50 relative">
        {/* The blue column background is achieved by the bg color here */}
        <div className="flex items-center font-feature-settings-tnum">
          <span className={`text-lg ${item.isBestGemini3 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
            {item.scores.gemini3}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 align-middle border-b border-gray-100">
        <span className="text-lg font-normal text-gray-600 font-feature-settings-tnum">{item.scores.gemini25}</span>
      </td>
      <td className="py-4 px-4 align-middle border-b border-gray-100">
        <span className="text-lg font-normal text-gray-600 font-feature-settings-tnum">{item.scores.claude}</span>
      </td>
      <td className="py-4 px-4 align-middle border-b border-gray-100">
        <span className="text-lg font-normal text-gray-600 font-feature-settings-tnum">{item.scores.gpt}</span>
      </td>
    </tr>
  );
};

const BenchmarkTable: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 pt-12 pb-8 px-6 sm:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Gemini 3 Pro 技术报告</h1>
        <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
          Gemini 3 Pro 与当前领先的SOTA模型在各项基准测试中的综合对比结果。
          点击任意测试名称可查看详细的测试方法和技术解析。
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Visualization Section */}
        <BenchmarkChart />

        {/* Data Table */}
        <div className="overflow-x-auto pb-20">
          <div className="min-w-[900px]"> {/* Force table width for scrolling on mobile */}
              <table className="w-full text-left border-collapse">
              <thead>
                  <tr className="border-b-2 border-gray-100">
                  <th className="py-6 pl-6 pr-4 font-medium text-gray-500 text-sm uppercase tracking-wider w-1/4">基准测试 (Benchmark)</th>
                  <th className="py-6 px-4 font-medium text-gray-500 text-sm uppercase tracking-wider w-1/4">描述 (Description)</th>
                  <th className="py-6 px-4 bg-blue-50 rounded-t-lg">
                      <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-base">Gemini 3 Pro</span>
                      </div>
                  </th>
                  <th className="py-6 px-4 font-semibold text-gray-900 text-base">Gemini 2.5 Pro</th>
                  <th className="py-6 px-4 font-semibold text-gray-900 text-base">Claude Sonnet 4.5</th>
                  <th className="py-6 px-4 font-semibold text-gray-900 text-base">GPT-5.1</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                  {BENCHMARK_DATA.map((group: BenchmarkGroup) => (
                      group.variations.map((item, index) => (
                      <TableRow 
                          key={item.id} 
                          item={item} 
                          groupName={group.name}
                          isFirstInGroup={index === 0}
                          rowSpan={group.variations.length}
                      />
                      ))
                  ))}
              </tbody>
              </table>
          </div>
          
          <div className="mt-12 text-center text-gray-400 text-sm pb-12">
             有关我们评估方法的详细信息，请参阅 deepmind.google/models/evals-methodology/gemini-3-pro
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkTable;