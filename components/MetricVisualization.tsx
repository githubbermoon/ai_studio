
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_TRAINING_DATA } from '../constants';

const MetricVisualization: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-chart-line text-sky-400"></i>
          Training Accuracy Curve
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_TRAINING_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="accuracy" name="Train Acc" stroke="#38bdf8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="val_accuracy" name="Val Acc" stroke="#818cf8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-wave-square text-rose-400"></i>
          Model Loss History
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_TRAINING_DATA}>
              <defs>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" dataKey="loss" name="Train Loss" stroke="#f43f5e" fillOpacity={1} fill="url(#colorLoss)" />
              <Area type="monotone" dataKey="val_loss" name="Val Loss" stroke="#fb7185" fill="none" strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricVisualization;
