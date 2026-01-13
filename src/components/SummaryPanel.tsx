import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Sparkles, Clock, User, FileText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '@/store/useStore';

export const SummaryPanel = () => {
  const { 
    videos, 
    selectedVideoId, 
    isSummaryPanelOpen, 
    toggleSummaryPanel,
    setVideoSummary,
    settings,
    updateSettings
  } = useStore();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const video = videos.find(v => v.id === selectedVideoId);

  const handleGenerateSummary = async () => {
    if (!video) return;
    
    setIsGenerating(true);
    
    // Simulated summary generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockSummary = `# ${video.title}

## 🎯 Puntos Clave

1. **Concepto principal**: Este video explora en profundidad los conceptos fundamentales del tema.

2. **Implementación práctica**: Se muestran ejemplos reales de cómo aplicar estas ideas en proyectos del mundo real.

3. **Mejores prácticas**: El creador comparte consejos probados que ha aprendido a lo largo de su carrera.

## 📌 Momentos Destacados

> "La clave del éxito no está en la cantidad de trabajo, sino en la calidad de tu enfoque."

### Herramientas mencionadas
- Herramienta A - para gestión
- Herramienta B - para automatización
- Herramienta C - para análisis

## ⚡ Conclusiones

- Enfócate en lo esencial antes de añadir complejidad
- Mide resultados constantemente
- Itera basándote en datos, no en suposiciones

## 🔗 Recursos

- [Documentación oficial](#)
- [Tutorial complementario](#)

---

*Resumen generado automáticamente. Tokens utilizados: ~450*`;

    setVideoSummary(video.id, mockSummary);
    updateSettings({ tokensUsed: settings.tokensUsed + 450 });
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (video?.summary) {
      await navigator.clipboard.writeText(video.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (video?.summary) {
      const blob = new Blob([video.summary], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resumen.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <AnimatePresence>
      {isSummaryPanelOpen && video && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSummaryPanel}
            className="modal-overlay"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="slide-panel w-full max-w-xl"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-border">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-semibold text-foreground line-clamp-2">{video.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {video.channelName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {video.duration}
                    </span>
                    {video.hasTranscript && (
                      <span className="flex items-center gap-1 text-success">
                        <FileText className="w-4 h-4" />
                        Transcripción
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={toggleSummaryPanel}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {video.summary ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{video.summary}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">Generando resumen...</h3>
                        <p className="text-muted-foreground">Esto puede tardar unos segundos</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Sin resumen aún</h3>
                        <p className="text-muted-foreground mb-6">
                          Genera un resumen con IA para extraer los puntos clave sin ver el video completo
                        </p>
                        <button
                          onClick={handleGenerateSummary}
                          disabled={!settings.claudeApiKey && false} // For demo, always enabled
                          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium glow-violet"
                        >
                          <Sparkles className="w-5 h-5" />
                          Generar Resumen
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {video.summary && (
                <div className="flex items-center justify-between p-4 border-t border-border bg-surface-elevated">
                  <span className="text-sm text-muted-foreground">
                    Generado {video.summaryGeneratedAt && new Date(video.summaryGeneratedAt).toLocaleDateString('es-ES')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar .md
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
