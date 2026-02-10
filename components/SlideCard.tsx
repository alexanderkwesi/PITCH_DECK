
import React from 'react';
import { SlideContent } from '../types';

interface SlideCardProps {
  slide: SlideContent;
  index: number;
}

const SlideCard: React.FC<SlideCardProps> = ({ slide, index }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-semibold truncate text-sm">
          Slide {index + 1}: {slide.title}
        </h3>
        <span className="text-blue-200 text-xs font-mono uppercase tracking-widest">
          Preview
        </span>
      </div>
      <div className="p-5 flex-1 space-y-4">
        {slide.subtitle && (
          <p className="text-blue-700 font-bold text-base leading-tight">
            {slide.subtitle}
          </p>
        )}
        <ul className="space-y-2">
          {slide.points.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-400 mt-1.5">•</span>
              <span className="text-slate-600 text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium italic">
            Visual Element: {slide.visualHint}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
