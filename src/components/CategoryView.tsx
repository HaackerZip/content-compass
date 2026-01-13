import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { VideoCard } from './VideoCard';
import { VideoStatus } from '@/types';

export const CategoryView = () => {
  const {
    categories,
    activeCategoryId,
    getVideosByCategory,
    statusFilter,
    durationFilter,
    dateFilter,
    setStatusFilter,
    setDurationFilter,
    setDateFilter,
    toggleAddChannelModal,
  } = useStore();

  const category = categories.find(c => c.id === activeCategoryId);
  if (!category) return null;

  let videos = getVideosByCategory(category.id);

  // Apply filters
  if (statusFilter !== 'all') {
    videos = videos.filter(v => v.status === statusFilter);
  }

  if (durationFilter !== 'all') {
    videos = videos.filter(v => {
      if (durationFilter === 'short') return v.durationSeconds < 600;
      if (durationFilter === 'medium') return v.durationSeconds >= 600 && v.durationSeconds < 1800;
      return v.durationSeconds >= 1800;
    });
  }

  if (dateFilter !== 'all') {
    const now = new Date();
    videos = videos.filter(v => {
      const published = new Date(v.publishedAt);
      const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
      if (dateFilter === 'today') return diffDays < 1;
      if (dateFilter === 'week') return diffDays < 7;
      return diffDays < 30;
    });
  }

  const statusOptions: { value: VideoStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'new', label: 'Nuevo' },
    { value: 'watched', label: 'Visto' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'not-interested', label: 'No interesa' },
  ];

  const durationOptions = [
    { value: 'all', label: 'Cualquier duración' },
    { value: 'short', label: '< 10 min' },
    { value: 'medium', label: '10-30 min' },
    { value: 'long', label: '> 30 min' },
  ];

  const dateOptions = [
    { value: 'all', label: 'Cualquier fecha' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
  ];

  return (
    <div className="flex-1 h-screen overflow-y-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
            <span className="px-2 py-1 text-sm font-medium rounded-full bg-muted text-muted-foreground">
              {videos.length} videos
            </span>
          </div>
          <button
            onClick={toggleAddChannelModal}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir canal aquí</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
          <Filter className="w-5 h-5 text-muted-foreground" />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VideoStatus | 'all')}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value as 'all' | 'short' | 'medium' | 'long')}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {durationOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as 'all' | 'today' | 'week' | 'month')}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {dateOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No hay videos</h3>
            <p className="text-muted-foreground">Ajusta los filtros o añade más canales</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
