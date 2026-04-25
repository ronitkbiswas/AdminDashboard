import * as React from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { orders } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export const DataTable = ({ searchQuery }) => {
  const [sortField, setSortField] = React.useState('date');
  const [sortOrder, setSortOrder] = React.useState('desc');
  const [categoryFilter, setCategoryFilter] = React.useState('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  // Filter and Search logic
  const filteredOrders = React.useMemo(() => {
    return orders
      .filter(order => {
        const matchesSearch = 
          order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || order.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        
        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }
        
        const strA = String(fieldA).toLowerCase();
        const strB = String(fieldB).toLowerCase();
        
        if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
        if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchQuery, categoryFilter, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const categories = ['All', 'Electronics', 'Furniture', 'Clothing', 'Groceries', 'Books'];

  return (
    <Card className="overflow-hidden border-none shadow-premium bg-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-white/50 py-5">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-bold text-slate-900">Recent Transactions</CardTitle>
          <p className="text-xs font-medium text-slate-400">Manage and track your latest business orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 transition-all focus-within:border-primary-indigo focus-within:ring-2 focus-within:ring-indigo-100">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-semibold text-slate-600 outline-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px] tracking-widest">
                  <button onClick={() => toggleSort('id')} className="flex items-center gap-2 hover:text-primary-indigo transition-colors group">
                    Order ID 
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {sortField === 'id' ? (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>) : <ArrowUpDown size={12}/>}
                    </span>
                  </button>
                </th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px] tracking-widest">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-2 hover:text-primary-indigo transition-colors group">
                    Customer
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {sortField === 'name' ? (sortOrder === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>) : <ArrowUpDown size={12}/>}
                    </span>
                  </button>
                </th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px] tracking-widest text-center">Date</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px] tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px] tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-slate-50"
            >
              <AnimatePresence mode="popLayout">
                {paginatedOrders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    variants={item}
                    layout
                    className="group hover:bg-indigo-50/30 transition-all cursor-default"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-medium text-slate-400 group-hover:text-primary-indigo transition-colors">
                        #{order.id.split('-')[1]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{order.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{order.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium text-slate-500">{order.date}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono font-bold text-slate-900">₹{order.revenue.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all",
                        order.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        order.status === 'Pending' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        "bg-rose-50 text-rose-600 border border-rose-100"
                      )}>
                        {order.status === 'Completed' ? 'Success' : order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-slate-50/30 border-t border-slate-100">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="text-slate-900 font-bold">{filteredOrders.length}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-primary-indigo hover:shadow-sleek disabled:opacity-30 transition-all"
            >
              <ChevronsLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-primary-indigo hover:shadow-sleek disabled:opacity-30 transition-all font-bold"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-4">
              <span className="text-xs font-bold text-slate-900 tracking-tighter">PAGE {currentPage} / {totalPages}</span>
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-primary-indigo hover:shadow-sleek disabled:opacity-30 transition-all font-bold"
            >
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-primary-indigo hover:shadow-sleek disabled:opacity-30 transition-all"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
