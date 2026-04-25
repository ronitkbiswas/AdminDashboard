import * as React from 'react';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Package, 
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ComingSoonModal } from '../ui/ComingSoonModal';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true, comingSoon: false },
  { icon: BarChart3, label: 'Analytics', active: false, comingSoon: true },
  { icon: Package, label: 'Products', active: false, comingSoon: true },
  { icon: Users, label: 'Customers', active: false, comingSoon: true },
  { icon: Settings, label: 'Settings', active: false, comingSoon: true },
];

export const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState('');

  const handleNavClick = (item) => {
    if (item.comingSoon) {
      setSelectedFeature(item.label);
      setModalOpen(true);
    }
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleLogoutClick = () => {
    setSelectedFeature('Logout');
    setModalOpen(true);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <ComingSoonModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        featureName={selectedFeature} 
      />

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div 
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300',
          collapsed ? 'lg:w-20' : 'lg:w-64',
          'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 bg-slate-50/50">
        {(!collapsed || mobileOpen) && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-indigo text-white shadow-lg shadow-indigo-200">
              <LayoutDashboard size={18} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 uppercase">Admin Dashboard</span>
          </motion.div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-900 transition-all hover:shadow-sleek hidden lg:block"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 py-6 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item)}
            className={cn(
              'group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200',
              item.active 
                ? 'bg-indigo-50 text-primary-indigo font-bold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} className={item.active ? "text-primary-indigo" : "transition-colors group-hover:text-slate-900"} />
            {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            {item.comingSoon && (!collapsed || mobileOpen) && (
              <span className="ml-auto rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Soon</span>
            )}
            {item.active && (
              <motion.div 
                layoutId="active-pill"
                className="absolute left-0 h-6 w-1 rounded-r-full bg-primary-indigo"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-6">

        {(!collapsed || mobileOpen) && (
          <div className="mb-4">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Plan: Professional</p>
            <p className="text-xs font-semibold text-slate-800 mt-1">Team Workspace</p>
          </div>
        )}
        <button 
          onClick={handleLogoutClick}
          className="flex w-full items-center gap-3 text-sm font-medium text-slate-500 transition-colors hover:text-red-500"
        >
          <LogOut size={18} />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </div>
  </>
);
};
