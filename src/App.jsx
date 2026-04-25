import * as React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { KPIHero } from './components/dashboard/KPIHero';
import { Charts } from './components/dashboard/Charts';
import { DataTable } from './components/dashboard/DataTable';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300">
      <Sidebar 
        collapsed={isSidebarCollapsed} 
        setCollapsed={setIsSidebarCollapsed}
        mobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen}
      />
      
      <main className={cn(
        "transition-all duration-300 min-h-screen flex flex-col",
        "pl-0 lg:pl-20",
        !isSidebarCollapsed && "lg:pl-64"
      )}>
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />


        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[60vh] flex-col items-center justify-center gap-4 text-slate-500"
              >
                <div className="h-10 w-10 animate-spin rounded-full border-3 border-slate-200 border-t-primary-indigo" />
                <p className="text-xs font-semibold uppercase tracking-widest animate-pulse">Loading Admin Dashboard...</p>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-800">Dashboard Overview</h1>
                  <p className="text-sm font-medium text-slate-500">Real-time metrics and order history for your workspace.</p>
                </div>


                <KPIHero />
                
                <Charts />
                
                <DataTable searchQuery={searchQuery} />

                
                <footer className="pt-12 pb-6 text-center text-xs text-zinc-400">
                  <p>&copy; 2026 Admin Dashboard. All rights reserved.</p>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
