import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, Search, Check, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const AddChannelModal = () => {
  const { isAddChannelModalOpen, toggleAddChannelModal, categories, addChannel, activeCategoryId } = useStore();
  
  const [url, setUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryId || categories[0]?.id || '');
  const [isValidating, setIsValidating] = useState(false);
  const [validatedChannel, setValidatedChannel] = useState<{ name: string; avatar: string } | null>(null);
  const [error, setError] = useState('');

  const handleValidate = async () => {
    if (!url.trim()) return;
    
    setIsValidating(true);
    setError('');
    setValidatedChannel(null);
    
    // Simulated validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.startsWith('@')) {
      const randomId = Math.random().toString(36).substring(7);
      setValidatedChannel({
        name: url.includes('@') ? url.replace('@', '') : 'Canal de YouTube',
        avatar: `https://i.pravatar.cc/100?u=${randomId}`,
      });
    } else {
      setError('URL no válida. Introduce una URL de YouTube o un @handle');
    }
    
    setIsValidating(false);
  };

  const handleAdd = () => {
    if (!validatedChannel || !selectedCategory) return;
    
    addChannel({
      name: validatedChannel.name,
      avatar: validatedChannel.avatar,
      categoryId: selectedCategory,
      url: url,
    });
    
    // Reset and close
    setUrl('');
    setValidatedChannel(null);
    setSelectedCategory(activeCategoryId || categories[0]?.id || '');
    toggleAddChannelModal();
  };

  const handleClose = () => {
    setUrl('');
    setValidatedChannel(null);
    setError('');
    toggleAddChannelModal();
  };

  return (
    <AnimatePresence>
      {isAddChannelModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="modal-overlay"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Youtube className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Añadir Canal</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* URL Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL o ID del canal
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://youtube.com/@canal o @canal"
                      className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={handleValidate}
                      disabled={!url.trim() || isValidating}
                      className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
                    >
                      {isValidating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-destructive">{error}</p>
                  )}
                </div>

                {/* Validated Channel Preview */}
                <AnimatePresence>
                  {validatedChannel && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 p-4 bg-success/10 border border-success/30 rounded-lg"
                    >
                      <img
                        src={validatedChannel.avatar}
                        alt={validatedChannel.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{validatedChannel.name}</p>
                        <p className="text-sm text-muted-foreground">Canal validado</p>
                      </div>
                      <Check className="w-5 h-5 text-success" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Category Select */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-surface-elevated">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!validatedChannel || !selectedCategory}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Añadir Canal
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
