import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  Server,
  TrendingUp,
  Palette,
  User,
  Folder,
  Youtube
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Server,
  TrendingUp,
  Palette,
  User,
  Folder,
};

export const Sidebar = () => {
  const {
    categories,
    channels,
    activeView,
    activeCategoryId,
    activeChannelId,
    setActiveView,
    setActiveCategoryId,
    setActiveChannelId,
    toggleCategoryExpanded,
    toggleAddChannelModal,
    getNewVideosCount,
    getNewVideosCountByChannel,
    addCategory,
  } = useStore();

  const handleAddCategory = () => {
    const name = prompt('Nombre de la nueva categoría:');
    if (name?.trim()) {
      addCategory(name.trim());
    }
  };

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Youtube className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">ContentHub</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Dashboard */}
        <button
          onClick={() => setActiveView('dashboard')}
          className={cn(
            'sidebar-item w-full',
            activeView === 'dashboard' && !activeCategoryId && 'sidebar-item-active'
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        {/* Categories */}
        <div className="pt-4">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Categorías
          </div>
          
          <div className="space-y-0.5">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || Folder;
              const categoryChannels = channels.filter(ch => ch.categoryId === category.id);
              const newCount = getNewVideosCount(category.id);
              
              return (
                <div key={category.id}>
                  <button
                    onClick={() => {
                      if (activeCategoryId === category.id) {
                        toggleCategoryExpanded(category.id);
                      } else {
                        setActiveCategoryId(category.id);
                      }
                    }}
                    className={cn(
                      'sidebar-item w-full group',
                      activeCategoryId === category.id && 'sidebar-item-active'
                    )}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategoryExpanded(category.id);
                      }}
                      className="p-0.5 hover:bg-sidebar-border rounded"
                    >
                      {category.isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                    <span className="flex-1 text-left truncate">{category.name}</span>
                    {newCount > 0 && (
                      <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                        {newCount}
                      </span>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {category.isExpanded && categoryChannels.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 py-1 space-y-0.5">
                          {categoryChannels.map((channel) => {
                            const channelNewCount = getNewVideosCountByChannel(channel.id);
                            return (
                              <button
                                key={channel.id}
                                onClick={() => setActiveChannelId(channel.id)}
                                className={cn(
                                  "flex items-center gap-2 px-2 py-1.5 text-sm w-full rounded transition-colors",
                                  activeChannelId === channel.id
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                                )}
                              >
                                <img
                                  src={channel.avatar}
                                  alt={channel.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                <span className="truncate flex-1 text-left">{channel.name}</span>
                                {channelNewCount > 0 && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                                    {channelNewCount}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={toggleAddChannelModal}
          className="sidebar-item w-full text-primary hover:text-primary"
        >
          <Plus className="w-5 h-5" />
          <span>Añadir Canal</span>
        </button>
        
        <button
          onClick={handleAddCategory}
          className="sidebar-item w-full"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Categoría</span>
        </button>
        
        <button
          onClick={() => setActiveView('settings')}
          className={cn(
            'sidebar-item w-full',
            activeView === 'settings' && 'sidebar-item-active'
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Configuración</span>
        </button>
      </div>
    </aside>
  );
};
