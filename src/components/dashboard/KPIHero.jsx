import * as React from 'react';
import { IndianRupee, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const KPICard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sleek transition-all hover:border-primary-indigo/30 hover:shadow-premium"
  >
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">{title}</p>
        <h3 className="font-mono text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
      </div>
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
        isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
    </div>
    
    <div className="mt-6 flex items-center gap-2">
      <div className={cn(
        "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
      )}>
        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {change}
      </div>
      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Since last month</span>
    </div>

    {/* Subtle purely decorative background icon */}
    <div className="absolute -bottom-4 -right-4 opacity-[0.03] grayscale transition-all group-hover:scale-110 group-hover:opacity-[0.05]">
      <Icon size={120} />
    </div>
  </motion.div>
);


export const KPIHero = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <KPICard 
        title="Total Revenue" 
        value="₹2,58,430.00" 
        change="12.5%" 
        isPositive={true} 
        icon={IndianRupee} 
        delay={0.1}
      />
      <KPICard 
        title="Total Orders" 
        value="1,240" 
        change="8.2%" 
        isPositive={true} 
        icon={ShoppingCart} 
        delay={0.2}
      />
      <KPICard 
        title="Net Profit" 
        value="₹84,832.00" 
        change="5.4%" 
        isPositive={true} 
        icon={TrendingUp} 
        delay={0.3}
      />
    </div>
  );
};
