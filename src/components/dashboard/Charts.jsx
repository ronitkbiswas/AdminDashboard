import * as React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { monthlyData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-premium backdrop-blur-md">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <div className="flex flex-col gap-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs font-bold text-slate-900">
                {entry.name}: <span className="font-mono">{formatter ? formatter(entry.value) : entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const Charts = () => {
  const currencyFormatter = (value) => `₹${value.toLocaleString()}`;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Sales Trend */}
      <Card className="lg:col-span-2 border-none shadow-premium overflow-hidden bg-white">
        <CardHeader className="flex flex-col gap-1 border-b border-slate-50 py-5">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800">Operational Momentum</CardTitle>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Monthly Sales Performance (Units)</p>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: "#94A3B8", fontWeight: 700, fontFamily: "var(--font-mono)" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: "#94A3B8", fontWeight: 700, fontFamily: "var(--font-mono)" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#4F46E5" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Users Growth */}
      <Card className="border-none shadow-premium overflow-hidden bg-white">
        <CardHeader className="flex flex-col gap-1 border-b border-slate-50 py-5">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800">User Acquisition</CardTitle>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Active Accounts over intervals</p>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: "#94A3B8", fontWeight: 700, fontFamily: "var(--font-mono)" }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: "#94A3B8", fontWeight: 700, fontFamily: "var(--font-mono)" }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="users" 
                  fill="#10B981" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Comparison */}
      <Card className="lg:col-span-3 border-none shadow-premium overflow-hidden bg-white">
        <CardHeader className="flex flex-col gap-1 items-center border-b border-slate-50 py-5">
          <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-slate-800">Financial Integrity Report</CardTitle>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Analysis of Gross Revenue vs. Operational Profit</p>
        </CardHeader>
        <CardContent className="pt-10">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" strokeOpacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 700, fontFamily: "var(--font-mono)" }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 700, fontFamily: "var(--font-mono)" }}
                  tickFormatter={currencyFormatter}
                />
                <Tooltip content={<CustomTooltip formatter={currencyFormatter} />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ 
                    fontSize: '10px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    paddingBottom: '20px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Gross Revenue"
                  fill="#4F46E5" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  fillOpacity={0.06} 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  name="Net Profit"
                  fill="#10B981" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={0.06} 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
