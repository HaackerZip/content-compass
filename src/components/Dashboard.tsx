import { motion } from 'framer-motion';
import { Video, TrendingUp, FileText, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { VideoCard } from './VideoCard';

export const Dashboard = () => {
  const { categories, videos, getVideosByCategory, getNewVideosCount, setActiveCategoryId } = useStore();
  
  const totalNew = videos.filter(v => v.status === 'new').length;
  const totalPending = videos.filter(v => v.status === 'pending').length;
  const summariesThisWeek = videos.filter(v => v.summary).length;
  
  const stats = [
    { label: 'Videos nuevos (24h)', value: totalNew, icon: Video, color: 'text-primary' },
    { label: 'Pendientes de revisar', value: totalPending, icon: Clock, color: 'text-warning' },
    { label: 'Resúmenes generados', value: summariesThisWeek, icon: FileText, color: 'text-success' },
  ];

  return (
    <div className="flex-1 h-screen overflow-y-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Resumen de tu contenido</h1>
          <p className="text-muted-foreground mt-1">Mantén el control de lo que consumes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories with videos */}
        <div className="space-y-6">
          {categories.map((category, categoryIndex) => {
            const categoryVideos = getVideosByCategory(category.id);
            const newVideos = categoryVideos.filter(v => v.status === 'new');
            
            if (newVideos.length === 0) return null;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + categoryIndex * 0.1 }}
                className="category-section"
              >
                <button
                  onClick={() => setActiveCategoryId(category.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                      {newVideos.length} nuevos
                    </span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </button>
                
                <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newVideos.slice(0, 3).map((video) => (
                    <VideoCard key={video.id} video={video} compact />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
