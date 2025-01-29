import React, { useState } from 'react';
import {
  //   Pencil,
  MousePointer,
  TrendingUp,
  Type,
  Square,
  Circle,
  Hash,
  BarChart2,
  Activity,
  Minimize2,
  Grid,
  Settings,
  Smile,
} from 'lucide-react';

const ToolButton = ({ icon: Icon, active, onClick, tooltip }) => (
  <div className='relative group'>
    <button
      onClick={onClick}
      className={`p-2 w-full hover:bg-gray-700/50 rounded-lg transition-colors
        ${active ? 'bg-gray-700/50' : ''}`}
    >
      <Icon
        size={18}
        className={`${active ? 'text-blue-400' : 'text-gray-400'}`}
      />
    </button>
    {tooltip && (
      <div className='absolute z-50 hidden px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded group-hover:block left-full whitespace-nowrap'>
        {tooltip}
      </div>
    )}
  </div>
);

const Toolbar = ({ onToolSelect }) => {
  const [activeDrawingTool, setActiveDrawingTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveDrawingTool(activeDrawingTool === tool ? null : tool);
    onToolSelect(tool);
  };

  const tools = [
    { id: 'cursor', icon: MousePointer, tooltip: 'Cursor' },
    { id: 'crosshair', icon: Hash, tooltip: 'Crosshair' },
    { id: 'line', icon: TrendingUp, tooltip: 'Trend Line' },
    { id: 'text', icon: Type, tooltip: 'Text' },
    { id: 'rect', icon: Square, tooltip: 'Rectangle' },
    { id: 'circle', icon: Circle, tooltip: 'Circle' },
    { id: 'fibonacci', icon: Minimize2, tooltip: 'Fibonacci Retracement' },
    { id: 'indicators', icon: BarChart2, tooltip: 'Indicators' },
    { id: 'technicals', icon: Activity, tooltip: 'Technical Analysis' },
    { id: 'grid', icon: Grid, tooltip: 'Grid Lines' },
    { id: 'settings', icon: Settings, tooltip: 'Chart Settings' },
    { id: 'templates', icon: Smile, tooltip: 'Templates' },
  ];

  return (
    <div
      className='absolute left-0 top-0 bottom-0 w-12 bg-[#1E222D] border-r border-gray-700/50 
      flex flex-col items-center py-2 space-y-1'
    >
      {tools.map((tool, index) =>
        tool === null ? (
          <div
            key={`separator-${index}`}
            className='w-8 h-px my-2 bg-gray-700/50'
          />
        ) : (
          <ToolButton
            key={tool.id}
            icon={tool.icon}
            active={activeDrawingTool === tool.id}
            onClick={() => handleToolClick(tool.id)}
            tooltip={tool.tooltip}
          />
        )
      )}
    </div>
  );
};

export default Toolbar;
