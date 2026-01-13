import { Clock, FileText, Sparkles, Eye, Pause, XCircle } from 'lucide-react';
import { Video, VideoStatus } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  compact?: boolean;
}

const statusConfig: Record<VideoStatus, { label: string; className: string }> = {
  new: { label: 'Nuevo', className: 'badge-new' },
  watched: { label: 'Visto', className: 'badge-watched' },
  pending: { label: 'Pendiente', className: 'badge-pending' },
  'not-interested': { label: 'No interesa', className: 'badge-not-interested' },
};

export const VideoCard = ({ video, compact = false }: VideoCardProps) => {
  const { setSelectedVideoId, updateVideoStatus } = useStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 24) return `hace ${Math.floor(diffHours)}h`;
    if (diffHours < 48) return 'ayer';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const statusActions: { status: VideoStatus; icon: React.ElementType; tip: string }[] = [
    { status: 'watched', icon: Eye, tip: 'Marcar como visto' },
    { status: 'pending', icon: Pause, tip: 'Marcar pendiente' },
    { status: 'not-interested', icon: XCircle, tip: 'No me interesa' },
  ];

  return (
    <div className="video-card group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-background/90 rounded text-xs font-medium text-foreground">
          {video.duration}
        </div>
        
        {/* Transcript indicator */}
        {video.hasTranscript && (
          <div className="absolute top-2 left-2 p-1 bg-success/90 rounded" title="Transcripción disponible">
            <FileText className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Summary indicator */}
        {video.summary && (
          <div className="absolute top-2 right-2 p-1 bg-primary/90 rounded" title="Resumen disponible">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className={cn(
          "font-medium text-foreground line-clamp-2 mb-2",
          compact ? "text-sm" : "text-base"
        )}>
          {video.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span className="truncate">{video.channelName}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(video.publishedAt)}
          </span>
        </div>

        {/* Status and actions */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "px-2 py-0.5 text-xs font-medium rounded-full",
            statusConfig[video.status].className
          )}>
            {statusConfig[video.status].label}
          </span>

          <div className="flex items-center gap-1">
            {/* Quick status buttons */}
            {!compact && statusActions.map(({ status, icon: Icon, tip }) => (
              <button
                key={status}
                onClick={() => updateVideoStatus(video.id, status)}
                title={tip}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  video.status === status
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}

            {/* Summary button */}
            <button
              onClick={() => setSelectedVideoId(video.id)}
              className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-3 h-3" />
              {video.summary ? 'Ver' : 'Resumir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
