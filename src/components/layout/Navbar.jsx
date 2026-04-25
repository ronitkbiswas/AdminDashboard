import * as React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ComingSoonModal } from '../ui/ComingSoonModal';

export const Navbar = ({ searchQuery, setSearchQuery, onMenuClick }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = React.useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setModalOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8 transition-colors">
      <ComingSoonModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        featureName="Search" 
        customMessage="The search feature is being built, please wait. We are optimizing our indexing engine for better results!"
      />

      <ComingSoonModal 
        isOpen={notificationModalOpen} 
        onClose={() => setNotificationModalOpen(false)} 
        featureName="Notifications" 
        title="Notifications"
        customMessage="No new notifications"
      />

      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="rounded-lg p-1.5 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <div className="relative w-64 max-w-full hidden sm:block">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5">
            <Search className="text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search records..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setNotificationModalOpen(true)}
          className="relative text-xl text-slate-500 transition-colors hover:text-slate-900"
        >
          <Bell size={20} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </button>


        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">Ronit K. Biswas</p>
            <p className="text-[10px] font-medium text-slate-500">Admin</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-indigo text-[12px] font-bold text-white uppercase">
            RB
          </div>
        </div>
      </div>
    </header>

  );
};
