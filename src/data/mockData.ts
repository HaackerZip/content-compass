import { Category, Channel, Video, AppSettings } from '@/types';

export const defaultCategories: Category[] = [
  { id: 'devops', name: 'DevOps', icon: 'Server', color: '#22c55e', isExpanded: true },
  { id: 'youtube-growth', name: 'YouTube Growth', icon: 'TrendingUp', color: '#f43f5e', isExpanded: true },
  { id: 'ux-ui', name: 'UX/UI', icon: 'Palette', color: '#8b5cf6', isExpanded: false },
  { id: 'personal', name: 'Personal', icon: 'User', color: '#06b6d4', isExpanded: false },
];

export const defaultChannels: Channel[] = [
  // DevOps
  { id: 'nana', name: 'TechWorld with Nana', avatar: 'https://i.pravatar.cc/100?u=nana', categoryId: 'devops', url: 'https://youtube.com/@TechWorldwithNana', videoCount: 5 },
  { id: 'devops-toolkit', name: 'DevOps Toolkit', avatar: 'https://i.pravatar.cc/100?u=devops', categoryId: 'devops', url: 'https://youtube.com/@DevOpsToolkit', videoCount: 4 },
  // YouTube Growth
  { id: 'ali-abdaal', name: 'Ali Abdaal', avatar: 'https://i.pravatar.cc/100?u=ali', categoryId: 'youtube-growth', url: 'https://youtube.com/@aliabdaal', videoCount: 6 },
  { id: 'think-media', name: 'Think Media', avatar: 'https://i.pravatar.cc/100?u=think', categoryId: 'youtube-growth', url: 'https://youtube.com/@ThinkMedia', videoCount: 5 },
  // UX/UI
  { id: 'aj-smart', name: 'AJ&Smart', avatar: 'https://i.pravatar.cc/100?u=aj', categoryId: 'ux-ui', url: 'https://youtube.com/@AJSmart', videoCount: 4 },
  { id: 'the-futur', name: 'The Futur', avatar: 'https://i.pravatar.cc/100?u=futur', categoryId: 'ux-ui', url: 'https://youtube.com/@thefutur', videoCount: 5 },
];

export const defaultVideos: Video[] = [
  // DevOps - TechWorld with Nana
  { id: 'v1', title: 'Kubernetes Tutorial for Beginners - Full Course in 4 Hours', channelId: 'nana', channelName: 'TechWorld with Nana', thumbnail: 'https://picsum.photos/seed/k8s/320/180', duration: '4:02:15', durationSeconds: 14535, publishedAt: '2024-01-12T10:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v2', title: 'Docker Compose Tutorial - Complete Guide', channelId: 'nana', channelName: 'TechWorld with Nana', thumbnail: 'https://picsum.photos/seed/docker/320/180', duration: '1:45:30', durationSeconds: 6330, publishedAt: '2024-01-11T14:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v3', title: 'GitOps with ArgoCD - Production Setup', channelId: 'nana', channelName: 'TechWorld with Nana', thumbnail: 'https://picsum.photos/seed/argo/320/180', duration: '58:22', durationSeconds: 3502, publishedAt: '2024-01-10T09:00:00Z', status: 'watched', hasTranscript: true },
  { id: 'v4', title: 'Terraform Best Practices 2024', channelId: 'nana', channelName: 'TechWorld with Nana', thumbnail: 'https://picsum.photos/seed/tf/320/180', duration: '45:10', durationSeconds: 2710, publishedAt: '2024-01-08T11:00:00Z', status: 'pending', hasTranscript: false },
  { id: 'v5', title: 'CI/CD Pipeline with GitHub Actions', channelId: 'nana', channelName: 'TechWorld with Nana', thumbnail: 'https://picsum.photos/seed/ghactions/320/180', duration: '1:12:45', durationSeconds: 4365, publishedAt: '2024-01-05T16:00:00Z', status: 'not-interested', hasTranscript: true },
  
  // DevOps - DevOps Toolkit
  { id: 'v6', title: 'Platform Engineering in 2024', channelId: 'devops-toolkit', channelName: 'DevOps Toolkit', thumbnail: 'https://picsum.photos/seed/platform/320/180', duration: '32:18', durationSeconds: 1938, publishedAt: '2024-01-13T08:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v7', title: 'Crossplane vs Terraform - Which One?', channelId: 'devops-toolkit', channelName: 'DevOps Toolkit', thumbnail: 'https://picsum.photos/seed/cross/320/180', duration: '28:45', durationSeconds: 1725, publishedAt: '2024-01-12T15:00:00Z', status: 'new', hasTranscript: true, summary: `# Crossplane vs Terraform: Key Insights\n\n## 🎯 Main Takeaways\n\n1. **Crossplane** excels at Kubernetes-native infrastructure\n2. **Terraform** remains king for multi-cloud setups\n3. Both can coexist in enterprise environments\n\n## ⚡ Quick Comparison\n\n| Feature | Crossplane | Terraform |\n|---------|------------|----------|\n| Learning curve | Steeper | Moderate |\n| K8s integration | Native | Via provider |\n| State management | In-cluster | External |\n\n## 📌 Recommendation\n\nStart with Terraform for general IaC, add Crossplane when you need GitOps-native resource management.`, summaryGeneratedAt: '2024-01-12T16:30:00Z' },
  { id: 'v8', title: 'Backstage Developer Portal Setup', channelId: 'devops-toolkit', channelName: 'DevOps Toolkit', thumbnail: 'https://picsum.photos/seed/backstage/320/180', duration: '41:22', durationSeconds: 2482, publishedAt: '2024-01-09T12:00:00Z', status: 'pending', hasTranscript: true },
  { id: 'v9', title: 'Kyverno Policy Engine Deep Dive', channelId: 'devops-toolkit', channelName: 'DevOps Toolkit', thumbnail: 'https://picsum.photos/seed/kyverno/320/180', duration: '35:55', durationSeconds: 2155, publishedAt: '2024-01-06T10:00:00Z', status: 'watched', hasTranscript: false },
  
  // YouTube Growth - Ali Abdaal
  { id: 'v10', title: 'How I Made $5M on YouTube Last Year', channelId: 'ali-abdaal', channelName: 'Ali Abdaal', thumbnail: 'https://picsum.photos/seed/money/320/180', duration: '22:15', durationSeconds: 1335, publishedAt: '2024-01-13T06:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v11', title: 'The Perfect YouTube Workflow in Notion', channelId: 'ali-abdaal', channelName: 'Ali Abdaal', thumbnail: 'https://picsum.photos/seed/notion/320/180', duration: '18:42', durationSeconds: 1122, publishedAt: '2024-01-12T09:00:00Z', status: 'new', hasTranscript: true, summary: `# YouTube Workflow in Notion\n\n## 📝 System Overview\n\nAli shares his team's content pipeline:\n\n### Stages\n1. **Ideation** → Capture ideas in database\n2. **Research** → Link sources and outlines\n3. **Script** → Draft with AI assistance\n4. **Production** → Track filming/editing\n5. **Post** → Schedule and monitor\n\n## 🔑 Key Templates\n\n- Video Database with custom properties\n- Linked content calendar\n- Analytics dashboard\n\n## 💡 Pro Tip\n\n> Use Relations to connect ideas to published videos for content repurposing.`, summaryGeneratedAt: '2024-01-12T10:00:00Z' },
  { id: 'v12', title: 'Why Most YouTube Channels Fail', channelId: 'ali-abdaal', channelName: 'Ali Abdaal', thumbnail: 'https://picsum.photos/seed/fail/320/180', duration: '25:30', durationSeconds: 1530, publishedAt: '2024-01-10T14:00:00Z', status: 'pending', hasTranscript: true },
  { id: 'v13', title: 'My Camera Setup for 2024', channelId: 'ali-abdaal', channelName: 'Ali Abdaal', thumbnail: 'https://picsum.photos/seed/camera/320/180', duration: '15:18', durationSeconds: 918, publishedAt: '2024-01-07T11:00:00Z', status: 'not-interested', hasTranscript: true },
  { id: 'v14', title: 'How to Edit Videos 10x Faster', channelId: 'ali-abdaal', channelName: 'Ali Abdaal', thumbnail: 'https://picsum.photos/seed/edit/320/180', duration: '19:45', durationSeconds: 1185, publishedAt: '2024-01-04T08:00:00Z', status: 'watched', hasTranscript: true },
  { id: 'v15', title: 'The Science of Viral Thumbnails', channelId: 'ali-abdaal', channelName: 'Ali Abdaal', thumbnail: 'https://picsum.photos/seed/thumb/320/180', duration: '21:10', durationSeconds: 1270, publishedAt: '2024-01-02T12:00:00Z', status: 'watched', hasTranscript: false },
  
  // YouTube Growth - Think Media
  { id: 'v16', title: 'Best Budget Camera for YouTube 2024', channelId: 'think-media', channelName: 'Think Media', thumbnail: 'https://picsum.photos/seed/budget/320/180', duration: '16:22', durationSeconds: 982, publishedAt: '2024-01-13T11:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v17', title: 'YouTube Algorithm Secrets Revealed', channelId: 'think-media', channelName: 'Think Media', thumbnail: 'https://picsum.photos/seed/algo/320/180', duration: '24:55', durationSeconds: 1495, publishedAt: '2024-01-11T08:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v18', title: 'Lighting Setup Under $100', channelId: 'think-media', channelName: 'Think Media', thumbnail: 'https://picsum.photos/seed/light/320/180', duration: '12:30', durationSeconds: 750, publishedAt: '2024-01-09T15:00:00Z', status: 'watched', hasTranscript: true },
  { id: 'v19', title: 'How to Get Your First 1000 Subscribers', channelId: 'think-media', channelName: 'Think Media', thumbnail: 'https://picsum.photos/seed/subs/320/180', duration: '28:15', durationSeconds: 1695, publishedAt: '2024-01-06T13:00:00Z', status: 'pending', hasTranscript: true },
  { id: 'v20', title: 'YouTube Shorts Strategy That Works', channelId: 'think-media', channelName: 'Think Media', thumbnail: 'https://picsum.photos/seed/shorts/320/180', duration: '18:40', durationSeconds: 1120, publishedAt: '2024-01-03T10:00:00Z', status: 'new', hasTranscript: false },
  
  // UX/UI - AJ&Smart
  { id: 'v21', title: 'Design Sprint in 60 Minutes', channelId: 'aj-smart', channelName: 'AJ&Smart', thumbnail: 'https://picsum.photos/seed/sprint/320/180', duration: '58:30', durationSeconds: 3510, publishedAt: '2024-01-12T07:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v22', title: 'Figma Tips No One Talks About', channelId: 'aj-smart', channelName: 'AJ&Smart', thumbnail: 'https://picsum.photos/seed/figma/320/180', duration: '22:18', durationSeconds: 1338, publishedAt: '2024-01-10T11:00:00Z', status: 'pending', hasTranscript: true },
  { id: 'v23', title: 'User Research on a Budget', channelId: 'aj-smart', channelName: 'AJ&Smart', thumbnail: 'https://picsum.photos/seed/research/320/180', duration: '31:45', durationSeconds: 1905, publishedAt: '2024-01-07T14:00:00Z', status: 'watched', hasTranscript: true },
  { id: 'v24', title: 'The Best UX Portfolio Examples', channelId: 'aj-smart', channelName: 'AJ&Smart', thumbnail: 'https://picsum.photos/seed/portfolio/320/180', duration: '19:22', durationSeconds: 1162, publishedAt: '2024-01-04T09:00:00Z', status: 'new', hasTranscript: false },
  
  // UX/UI - The Futur
  { id: 'v25', title: 'Pricing Design Services in 2024', channelId: 'the-futur', channelName: 'The Futur', thumbnail: 'https://picsum.photos/seed/pricing/320/180', duration: '45:12', durationSeconds: 2712, publishedAt: '2024-01-13T09:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v26', title: 'Client Red Flags to Watch For', channelId: 'the-futur', channelName: 'The Futur', thumbnail: 'https://picsum.photos/seed/client/320/180', duration: '28:55', durationSeconds: 1735, publishedAt: '2024-01-11T13:00:00Z', status: 'pending', hasTranscript: true },
  { id: 'v27', title: 'Building a Design Agency', channelId: 'the-futur', channelName: 'The Futur', thumbnail: 'https://picsum.photos/seed/agency/320/180', duration: '52:30', durationSeconds: 3150, publishedAt: '2024-01-08T10:00:00Z', status: 'watched', hasTranscript: true },
  { id: 'v28', title: 'Logo Design Process Explained', channelId: 'the-futur', channelName: 'The Futur', thumbnail: 'https://picsum.photos/seed/logo/320/180', duration: '38:18', durationSeconds: 2298, publishedAt: '2024-01-05T15:00:00Z', status: 'new', hasTranscript: true },
  { id: 'v29', title: 'Freelance vs Full-Time Design', channelId: 'the-futur', channelName: 'The Futur', thumbnail: 'https://picsum.photos/seed/freelance/320/180', duration: '33:42', durationSeconds: 2022, publishedAt: '2024-01-02T08:00:00Z', status: 'not-interested', hasTranscript: false },
];

export const defaultSettings: AppSettings = {
  claudeApiKey: '',
  summaryPrompt: `Eres un asistente experto en resumir videos de YouTube. Tu tarea es crear un resumen conciso y útil del contenido.

Formato del resumen:
1. Usa markdown con headers, listas y emojis
2. Incluye los puntos clave principales (máximo 5)
3. Añade citas textuales importantes si las hay
4. Incluye una sección de "Conclusiones" o "Para recordar"
5. Si es tutorial, lista los pasos principales
6. Mantén el resumen en menos de 500 palabras

Objetivo: Que el lector obtenga el 80% del valor del video en 2 minutos de lectura.`,
  monthlyTokenLimit: 100000,
  tokensUsed: 12450,
};
