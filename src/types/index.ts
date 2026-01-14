export type VideoStatus = 'new' | 'watched' | 'pending' | 'not-interested';

export interface Video {
  id: string;
  title: string;
  channelId: string;
  channelName: string;
  thumbnail: string;
  duration: string;
  durationSeconds: number;
  publishedAt: string;
  status: VideoStatus;
  hasTranscript: boolean;
  summary?: string;
  summaryGeneratedAt?: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  categoryId: string;
  url: string;
  videoCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isExpanded: boolean;
}

export interface AppSettings {
  claudeApiKey: string;
  summaryPrompt: string;
  monthlyTokenLimit: number;
  tokensUsed: number;
}

export interface StoreState {
  // Data
  categories: Category[];
  channels: Channel[];
  videos: Video[];
  settings: AppSettings;
  
  // UI State
  activeView: 'dashboard' | 'category' | 'channel' | 'settings';
  activeCategoryId: string | null;
  activeChannelId: string | null;
  selectedVideoId: string | null;
  isAddChannelModalOpen: boolean;
  isSummaryPanelOpen: boolean;
  
  // Filters
  statusFilter: VideoStatus | 'all';
  durationFilter: 'all' | 'short' | 'medium' | 'long';
  dateFilter: 'all' | 'today' | 'week' | 'month';
  
  // Actions
  setActiveView: (view: 'dashboard' | 'category' | 'channel' | 'settings') => void;
  setActiveCategoryId: (id: string | null) => void;
  setActiveChannelId: (id: string | null) => void;
  setSelectedVideoId: (id: string | null) => void;
  toggleAddChannelModal: () => void;
  toggleSummaryPanel: () => void;
  
  // Category actions
  addCategory: (name: string) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryExpanded: (id: string) => void;
  
  // Channel actions
  addChannel: (channel: Omit<Channel, 'id' | 'videoCount'>) => void;
  moveChannel: (channelId: string, newCategoryId: string) => void;
  removeChannel: (id: string) => void;
  
  // Video actions
  updateVideoStatus: (videoId: string, status: VideoStatus) => void;
  setVideoSummary: (videoId: string, summary: string) => void;
  
  // Settings actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  
  // Filter actions
  setStatusFilter: (filter: VideoStatus | 'all') => void;
  setDurationFilter: (filter: 'all' | 'short' | 'medium' | 'long') => void;
  setDateFilter: (filter: 'all' | 'today' | 'week' | 'month') => void;
  
  // Computed
  getVideosByCategory: (categoryId: string) => Video[];
  getVideosByChannel: (channelId: string) => Video[];
  getChannelsByCategory: (categoryId: string) => Channel[];
  getNewVideosCount: (categoryId: string) => number;
  getNewVideosCountByChannel: (channelId: string) => number;
  getTotalNewVideos: () => number;
}
