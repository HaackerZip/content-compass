import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreState, Category, Channel, Video, VideoStatus } from '@/types';
import { defaultCategories, defaultChannels, defaultVideos, defaultSettings } from '@/data/mockData';

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial data
      categories: defaultCategories,
      channels: defaultChannels,
      videos: defaultVideos,
      settings: defaultSettings,
      
      // UI State
      activeView: 'dashboard',
      activeCategoryId: null,
      selectedVideoId: null,
      isAddChannelModalOpen: false,
      isSummaryPanelOpen: false,
      
      // Filters
      statusFilter: 'all',
      durationFilter: 'all',
      dateFilter: 'all',
      
      // UI Actions
      setActiveView: (view) => set({ activeView: view, activeCategoryId: view === 'dashboard' ? null : get().activeCategoryId }),
      setActiveCategoryId: (id) => set({ activeCategoryId: id, activeView: id ? 'category' : 'dashboard' }),
      setSelectedVideoId: (id) => set({ selectedVideoId: id, isSummaryPanelOpen: !!id }),
      toggleAddChannelModal: () => set((state) => ({ isAddChannelModalOpen: !state.isAddChannelModalOpen })),
      toggleSummaryPanel: () => set((state) => ({ isSummaryPanelOpen: !state.isSummaryPanelOpen, selectedVideoId: state.isSummaryPanelOpen ? null : state.selectedVideoId })),
      
      // Category Actions
      addCategory: (name) => {
        const id = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
        const newCategory: Category = {
          id,
          name,
          icon: 'Folder',
          color: '#8b5cf6',
          isExpanded: true,
        };
        set((state) => ({ categories: [...state.categories, newCategory] }));
      },
      
      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...updates } : cat
          ),
        }));
      },
      
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
          channels: state.channels.filter((ch) => ch.categoryId !== id),
        }));
      },
      
      toggleCategoryExpanded: (id) => {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, isExpanded: !cat.isExpanded } : cat
          ),
        }));
      },
      
      // Channel Actions
      addChannel: (channel) => {
        const id = 'ch-' + Date.now();
        const newChannel: Channel = {
          ...channel,
          id,
          videoCount: 0,
        };
        set((state) => ({ channels: [...state.channels, newChannel] }));
      },
      
      moveChannel: (channelId, newCategoryId) => {
        set((state) => ({
          channels: state.channels.map((ch) =>
            ch.id === channelId ? { ...ch, categoryId: newCategoryId } : ch
          ),
        }));
      },
      
      removeChannel: (id) => {
        set((state) => ({
          channels: state.channels.filter((ch) => ch.id !== id),
          videos: state.videos.filter((v) => v.channelId !== id),
        }));
      },
      
      // Video Actions
      updateVideoStatus: (videoId, status) => {
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === videoId ? { ...v, status } : v
          ),
        }));
      },
      
      setVideoSummary: (videoId, summary) => {
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === videoId
              ? { ...v, summary, summaryGeneratedAt: new Date().toISOString() }
              : v
          ),
        }));
      },
      
      // Settings Actions
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },
      
      // Filter Actions
      setStatusFilter: (filter) => set({ statusFilter: filter }),
      setDurationFilter: (filter) => set({ durationFilter: filter }),
      setDateFilter: (filter) => set({ dateFilter: filter }),
      
      // Computed helpers
      getVideosByCategory: (categoryId) => {
        const state = get();
        const categoryChannels = state.channels.filter((ch) => ch.categoryId === categoryId);
        const channelIds = categoryChannels.map((ch) => ch.id);
        return state.videos.filter((v) => channelIds.includes(v.channelId));
      },
      
      getChannelsByCategory: (categoryId) => {
        return get().channels.filter((ch) => ch.categoryId === categoryId);
      },
      
      getNewVideosCount: (categoryId) => {
        const videos = get().getVideosByCategory(categoryId);
        return videos.filter((v) => v.status === 'new').length;
      },
      
      getTotalNewVideos: () => {
        return get().videos.filter((v) => v.status === 'new').length;
      },
    }),
    {
      name: 'contenthub-storage',
      partialize: (state) => ({
        categories: state.categories,
        channels: state.channels,
        videos: state.videos,
        settings: state.settings,
      }),
    }
  )
);
