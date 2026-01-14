import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { CategoryView } from '@/components/CategoryView';
import { ChannelView } from '@/components/ChannelView';
import { SettingsView } from '@/components/SettingsView';
import { SummaryPanel } from '@/components/SummaryPanel';
import { AddChannelModal } from '@/components/AddChannelModal';
import { useStore } from '@/store/useStore';

const Index = () => {
  const { activeView, activeCategoryId, activeChannelId } = useStore();

  const renderMainContent = () => {
    if (activeView === 'settings') {
      return <SettingsView />;
    }
    
    if (activeView === 'channel' && activeChannelId) {
      return <ChannelView />;
    }
    
    if (activeView === 'category' && activeCategoryId) {
      return <CategoryView />;
    }
    
    return <Dashboard />;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {renderMainContent()}
      </main>
      <SummaryPanel />
      <AddChannelModal />
    </div>
  );
};

export default Index;
