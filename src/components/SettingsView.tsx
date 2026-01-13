import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, FileText, Gauge, Trash2, Edit2, Check, X, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const SettingsView = () => {
  const { settings, updateSettings, categories, updateCategory, deleteCategory } = useStore();
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [testingKey, setTestingKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleTestKey = async () => {
    setTestingKey(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setKeyStatus(settings.claudeApiKey.length > 10 ? 'success' : 'error');
    setTestingKey(false);
    setTimeout(() => setKeyStatus('idle'), 3000);
  };

  const startEditCategory = (id: string, name: string) => {
    setEditingCategoryId(id);
    setEditingName(name);
  };

  const saveCategory = () => {
    if (editingCategoryId && editingName.trim()) {
      updateCategory(editingCategoryId, { name: editingName.trim() });
    }
    setEditingCategoryId(null);
    setEditingName('');
  };

  const usagePercent = (settings.tokensUsed / settings.monthlyTokenLimit) * 100;
  const estimatedCost = (settings.tokensUsed / 1000) * 0.00025; // Claude Haiku pricing estimate

  return (
    <div className="flex-1 h-screen overflow-y-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground mt-1">Personaliza ContentHub a tu manera</p>
        </div>

        <div className="space-y-6">
          {/* API Key Section */}
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Claude API Key</h2>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.claudeApiKey}
                  onChange={(e) => updateSettings({ claudeApiKey: e.target.value })}
                  placeholder="sk-ant-api03-..."
                  className="w-full px-4 py-3 pr-24 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTestKey}
                  disabled={testingKey || !settings.claudeApiKey}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  {testingKey ? 'Probando...' : 'Probar conexión'}
                </button>
                {keyStatus === 'success' && (
                  <span className="flex items-center gap-1 text-success text-sm">
                    <Check className="w-4 h-4" /> Conexión exitosa
                  </span>
                )}
                {keyStatus === 'error' && (
                  <span className="flex items-center gap-1 text-destructive text-sm">
                    <X className="w-4 h-4" /> Error de conexión
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Summary Prompt Section */}
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Prompt de Resumen</h2>
            </div>
            
            <textarea
              value={settings.summaryPrompt}
              onChange={(e) => updateSettings({ summaryPrompt: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono text-sm"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Este prompt se usa para generar los resúmenes con Claude.
            </p>
          </section>

          {/* Usage Section */}
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Gauge className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Uso y Límites</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Tokens usados este mes</span>
                  <span className="text-sm font-medium text-foreground">
                    {settings.tokensUsed.toLocaleString()} / {settings.monthlyTokenLimit.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Costo estimado</span>
                <span className="text-lg font-semibold text-foreground">
                  ${estimatedCost.toFixed(4)}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Límite mensual de tokens
                </label>
                <input
                  type="number"
                  value={settings.monthlyTokenLimit}
                  onChange={(e) => updateSettings({ monthlyTokenLimit: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Gestión de Categorías</h2>
            
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  {editingCategoryId === category.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveCategory()}
                      autoFocus
                      className="flex-1 px-3 py-1 bg-card border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-foreground">{category.name}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    {editingCategoryId === category.id ? (
                      <>
                        <button
                          onClick={saveCategory}
                          className="p-2 text-success hover:bg-success/20 rounded transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingCategoryId(null)}
                          className="p-2 text-muted-foreground hover:bg-muted rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditCategory(category.id, category.name)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-card rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/20 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
