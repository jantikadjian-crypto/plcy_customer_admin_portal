import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Shield,
  Headphones,
  BookOpen,
  Terminal,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  Activity,
  AlertCircle,
  Eye,
  EyeOff,
  Radio,
  Globe,
  Search,
  Bot,
  MessageSquare,
  Cpu,
  Database,
  Code,
  LineChart,
  Wand2,
  Image,
  Mic,
  Camera,
  FileText,
  Building,
  Zap,
  Network,
  TestTube,
  Workflow,
  Layers,
  Box,
  Blocks,
  GitBranch,
  Flag,
  Lock,
  Server,
  Webhook,
  FileCheck,
  BarChart3,
  ShieldCheck,
  Timer,
  Users,
  UserCheck,
  AlertTriangle,
  Trash2,
  Info,
  CheckCircle
} from 'lucide-react';

export function PLCYDevLanding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [providerSearchQuery, setProviderSearchQuery] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [scimEnabled, setScimEnabled] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('combined');
  const [selectedIndustry, setSelectedIndustry] = useState('general-tech');

  // Data Controls step state
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState('90-days');
  const [piiRedactionEnabled, setPiiRedactionEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [storageLocationType, setStorageLocationType] = useState('regional');

  // Observability & QA step state
  const [openTelemetryEnabled, setOpenTelemetryEnabled] = useState(true);
  const [exportDestination, setExportDestination] = useState('plcy-builtin');
  const [dashboards, setDashboards] = useState({
    responseLatency: true,
    harmfulContent: true,
    hallucinationFlags: true,
    tokenUsage: true,
    refusalRates: true,
    jailbreakAttempts: true,
    costTracking: true,
    modelPerformance: true,
  });

  // Guardrails & Approvals step state (optional step)
  const [hitlEnabled, setHitlEnabled] = useState(false);
  const [approvalPreset, setApprovalPreset] = useState('development'); // development, staging, production
  const [criticalRiskApproval, setCriticalRiskApproval] = useState('require_2_person_approval');
  const [highRiskApproval, setHighRiskApproval] = useState('require_approval');
  const [toolCategoriesEnabled, setToolCategoriesEnabled] = useState({
    write_ops: true,
    data_export: true,
    secrets_access: true,
    prod_ops: true,
    data_deletion: true
  });

  // Notifications & Workflow step state
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [microsoftTeams, setMicrosoftTeams] = useState(false);
  const [jiraIntegration, setJiraIntegration] = useState(false);

  // Ship Your Badge step state
  const [trustCenterUrl, setTrustCenterUrl] = useState('your-company');

  // Security & Compliance step state
  const [backupsEnabled, setBackupsEnabled] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [backupRetention, setBackupRetention] = useState('30');
  const [pitrEnabled, setPitrEnabled] = useState(false);
  const [pitrRetention, setPitrRetention] = useState('30');
  const [immutableAuditEnabled, setImmutableAuditEnabled] = useState(false);

  // Simulate connection after 5 seconds in listening state
  useEffect(() => {
    if (isListening && !isConnected) {
      const timer = setTimeout(() => {
        setIsConnected(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isListening, isConnected]);

  const regions = [
    {
      id: 'us',
      name: 'United States',
      code: 'US',
      location: 'us-central1 (Iowa)',
      flag: '🇺🇸',
      compliance: ['SOC 2', 'HIPAA'],
      latency: 'Low'
    },
    {
      id: 'eu',
      name: 'Europe',
      code: 'EU',
      location: 'europe-west1 (Belgium)',
      flag: '🇪🇺',
      compliance: ['GDPR', 'EU AI Act'],
      latency: 'Low'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      code: 'GB',
      location: 'europe-west2 (London)',
      flag: '🇬🇧',
      compliance: ['GDPR', 'UK GDPR'],
      latency: 'Low'
    },
    {
      id: 'ca',
      name: 'Canada',
      code: 'CA',
      location: 'northamerica-northeast1 (Montreal)',
      flag: '🇨🇦',
      compliance: ['PIPEDA', 'SOC 2'],
      latency: 'Medium'
    },
    {
      id: 'apac',
      name: 'Asia Pacific',
      code: 'APAC',
      location: 'asia-southeast1 (Singapore)',
      flag: '🌏',
      compliance: ['PDPA', 'ISO 27001'],
      latency: 'Medium'
    }
  ];

  const personas = [
    {
      id: 'ai-agents',
      name: 'AI Agents',
      subtitle: 'Autonomous Systems',
      icon: Bot,
      description: 'Self-running AI that completes multi-step tasks on its own, like researching topics, writing reports, or managing workflows without constant human input.',
      examples: 'AutoGPT, CrewAI, LangChain Agents',
      color: 'blue'
    },
    {
      id: 'ai-assistants',
      name: 'AI Assistants',
      subtitle: 'Conversational AI',
      icon: MessageSquare,
      description: 'Interactive chatbots that hold conversations, answer questions, and help users complete specific tasks through natural dialogue.',
      examples: 'ChatGPT, Claude, Gemini, Custom GPTs',
      color: 'purple'
    },
    {
      id: 'chatbots',
      name: 'Chatbots',
      subtitle: 'Platform Integrations',
      icon: Headphones,
      description: 'Bots living inside messaging apps that handle customer support, team communications, or automated responses on Slack, Discord, or Teams.',
      examples: 'Intercom bot, Zendesk AI, Slackbot',
      color: 'green'
    },
    {
      id: 'ml-platforms',
      name: 'ML/AI Platforms',
      subtitle: 'Cloud ML Services',
      icon: Cpu,
      description: 'Enterprise cloud platforms for training, deploying, and managing machine learning models at scale with built-in infrastructure.',
      examples: 'AWS SageMaker, Google Vertex AI, Azure ML',
      color: 'blue'
    },
    {
      id: 'vector-databases',
      name: 'Vector Databases',
      subtitle: 'Semantic Search',
      icon: Database,
      description: 'Specialized databases that store and search through AI embeddings, powering semantic search and RAG (Retrieval-Augmented Generation) applications.',
      examples: 'Pinecone, Weaviate, Chroma, Qdrant',
      color: 'purple'
    },
    {
      id: 'ai-frameworks',
      name: 'AI Development Frameworks',
      subtitle: 'Model Building',
      icon: Code,
      description: 'Programming libraries and tools used by data scientists to build, train, and deploy neural networks and deep learning models from scratch.',
      examples: 'TensorFlow, PyTorch, Keras, Jupyter',
      color: 'green'
    },
    {
      id: 'ai-observability',
      name: 'AI Observability',
      subtitle: 'Performance Tracking',
      icon: LineChart,
      description: 'Tools that monitor how your AI models perform in production, tracking accuracy, costs, latency, and user satisfaction metrics.',
      examples: 'Weights & Biases, MLflow, Langsmith',
      color: 'blue'
    },
    {
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      subtitle: 'Prompt Optimization',
      icon: Wand2,
      description: 'Platforms that help you design, test, version-control, and optimize the prompts you send to AI models for better responses.',
      examples: 'PromptLayer, Helicone, Humanloop',
      color: 'purple'
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      subtitle: 'Creative AI',
      icon: Image,
      description: 'AI tools that create images, videos, art, or visual content from text descriptions, used for marketing, design, and creative work.',
      examples: 'Midjourney, DALL-E, Stable Diffusion',
      color: 'green'
    },
    {
      id: 'speech-audio',
      name: 'Speech & Audio AI',
      subtitle: 'Voice Technology',
      icon: Mic,
      description: 'Services that convert speech to text, text to realistic voices, or generate music and audio content using AI.',
      examples: 'ElevenLabs, AssemblyAI, Whisper',
      color: 'blue'
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      subtitle: 'Visual Recognition',
      icon: Camera,
      description: 'AI that analyzes photos and videos to detect objects, faces, text, or activities—used in security, retail, and quality control.',
      examples: 'Google Vision AI, AWS Rekognition',
      color: 'purple'
    },
    {
      id: 'document-ai',
      name: 'Document AI',
      subtitle: 'Intelligent Document Processing',
      icon: FileText,
      description: 'Extract and understand information from PDFs, invoices, forms, and scanned documents automatically using OCR and AI.',
      examples: 'AWS Textract, Document AI, DocuSign AI',
      color: 'green'
    },
    {
      id: 'enterprise-ai',
      name: 'Enterprise AI Platforms',
      subtitle: 'Enterprise Solutions',
      icon: Building,
      description: 'All-in-one AI platforms designed for large organizations with enterprise security, compliance, and integration capabilities.',
      examples: 'IBM Watson, Microsoft Copilot Studio',
      color: 'blue'
    },
    {
      id: 'edge-ai',
      name: 'Edge AI Systems',
      subtitle: 'Device-Level AI',
      icon: Zap,
      description: 'Run AI models directly on devices like cameras, drones, or IoT sensors without sending data to the cloud for faster, private processing.',
      examples: 'NVIDIA Jetson, Coral AI, Apple Neural Engine',
      color: 'purple'
    },
    {
      id: 'federated-learning',
      name: 'Federated Learning',
      subtitle: 'Privacy-Preserving ML',
      icon: Network,
      description: 'Train AI models across multiple devices or organizations without sharing raw data—used when privacy regulations are strict.',
      examples: 'Flower Framework, PySyft, TensorFlow Federated',
      color: 'green'
    },
    {
      id: 'ai-testing',
      name: 'AI Testing & Evaluation',
      subtitle: 'Quality Assurance',
      icon: TestTube,
      description: 'Test your AI models for bias, accuracy, hallucinations, and safety issues before deploying them to real users.',
      examples: 'Giskard, Deepchecks, Evidently AI',
      color: 'blue'
    },
    {
      id: 'streaming-ai',
      name: 'Streaming AI',
      subtitle: 'Real-Time Processing',
      icon: Activity,
      description: 'Process continuous streams of data in real-time with AI, like analyzing live video feeds, sensor data, or financial transactions.',
      examples: 'Kafka with ML, Apache Flink ML, Bytewax',
      color: 'purple'
    },
    {
      id: 'low-code-ai',
      name: 'Low-Code AI',
      subtitle: 'Visual AI Builders',
      icon: Layers,
      description: 'Build AI-powered apps using drag-and-drop interfaces without writing code—perfect for business users and citizen developers.',
      examples: 'Microsoft Power Platform, Google AppSheet',
      color: 'green'
    },
    {
      id: 'mcp-systems',
      name: 'MCP Systems',
      subtitle: 'Context Protocol',
      icon: Blocks,
      description: 'Connect AI models to your data sources and tools using the Model Context Protocol standard for seamless integration.',
      examples: 'Claude Desktop MCP, Custom MCP Servers',
      color: 'blue'
    },
    {
      id: 'custom-apis',
      name: 'Custom APIs',
      subtitle: 'Your Own Integration',
      icon: Terminal,
      description: 'Any custom-built API or internal system that uses AI—whether REST, GraphQL, or proprietary protocols your team developed.',
      examples: 'Internal AI service, Third-party API wrapper',
      color: 'purple'
    },
    {
      id: 'workflow-tools',
      name: 'Workflow Automation',
      subtitle: 'Process Automation',
      icon: Workflow,
      description: 'Connect AI to your business workflows and automate tasks across different apps without coding using automation platforms.',
      examples: 'Zapier AI, Make.com, n8n with AI nodes',
      color: 'green'
    },
    {
      id: 'knowledge-base',
      name: 'Knowledge Base',
      subtitle: 'Internal Q&A',
      icon: BookOpen,
      description: 'AI that answers employee questions by searching through your company documentation, wikis, and internal knowledge repositories.',
      examples: 'Notion AI, Confluence AI, Glean',
      color: 'slate'
    },
    {
      id: 'custom-other',
      name: 'Custom / Other',
      subtitle: 'Something Else',
      icon: Sparkles,
      description: "Your AI project doesn't fit the categories above, or you're building something completely unique and innovative.",
      examples: 'Experimental AI, Research project',
      color: 'slate'
    }
  ];

  // Filter personas based on search query
  const filteredPersonas = personas.filter((persona) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      persona.name.toLowerCase().includes(query) ||
      persona.subtitle.toLowerCase().includes(query) ||
      persona.description.toLowerCase().includes(query) ||
      persona.examples.toLowerCase().includes(query)
    );
  });

  const providers = [
    { id: 'openai', name: 'OpenAI', logo: '🤖', category: 'Popular' },
    { id: 'anthropic', name: 'Anthropic', logo: '🧠', category: 'Popular' },
    { id: 'google', name: 'Google Gemini', logo: '✨', category: 'Popular' },
    { id: 'azure', name: 'Azure OpenAI', logo: '☁️', category: 'Cloud' },
    { id: 'aws-bedrock', name: 'AWS Bedrock', logo: '🪨', category: 'Cloud' },
    { id: 'groq', name: 'Groq', logo: '⚡', category: 'Popular' },
    { id: 'mistral', name: 'Mistral AI', logo: '🌬️', category: 'Popular' },
    { id: 'cohere', name: 'Cohere', logo: '🔮', category: 'Enterprise' },
    { id: 'together', name: 'Together AI', logo: '🤝', category: 'Inference' },
    { id: 'replicate', name: 'Replicate', logo: '🦙', category: 'Inference' },
    { id: 'perplexity', name: 'Perplexity', logo: '🔍', category: 'Search' },
    { id: 'huggingface', name: 'Hugging Face', logo: '🤗', category: 'Open Source' },
    { id: 'ollama', name: 'Ollama', logo: '🦙', category: 'Local' },
    { id: 'lmstudio', name: 'LM Studio', logo: '🎬', category: 'Local' },
    { id: 'vertex', name: 'Vertex AI', logo: '🔺', category: 'Cloud' },
    { id: 'palm', name: 'Google PaLM', logo: '🌴', category: 'Cloud' },
    { id: 'ai21', name: 'AI21 Labs', logo: '🔬', category: 'Enterprise' },
    { id: 'aleph-alpha', name: 'Aleph Alpha', logo: '🅰️', category: 'Enterprise' },
    { id: 'anyscale', name: 'Anyscale', logo: '📊', category: 'Inference' },
    { id: 'fireworks', name: 'Fireworks AI', logo: '🎆', category: 'Inference' },
    { id: 'deepinfra', name: 'DeepInfra', logo: '🏗️', category: 'Inference' },
    { id: 'novita', name: 'Novita AI', logo: '🌟', category: 'Inference' },
    { id: 'deepseek', name: 'DeepSeek', logo: '🔎', category: 'Enterprise' },
    { id: 'writer', name: 'Writer', logo: '✍️', category: 'Enterprise' },
    { id: 'voyage', name: 'Voyage AI', logo: '🚀', category: 'Embeddings' },
    { id: 'jina', name: 'Jina AI', logo: '🧬', category: 'Embeddings' },
    { id: 'openrouter', name: 'OpenRouter', logo: '🔀', category: 'Aggregator' },
    { id: 'custom', name: 'Custom Provider', logo: '⚙️', category: 'Custom' }
  ];

  // Filter providers based on search query
  const filteredProviders = providers.filter((provider) => {
    if (!providerSearchQuery) return true;
    const query = providerSearchQuery.toLowerCase();
    return (
      provider.name.toLowerCase().includes(query) ||
      provider.category.toLowerCase().includes(query)
    );
  });

  const policies = [
    {
      id: 'strict',
      name: 'Strict (EU/GDPR)',
      description: 'Blocks all PII, forces EU routing, logs everything.',
      recommended: 'Recommended for HR/Finance',
      color: 'red',
      compliance: [
        'SOC 2/ISO-aligned logging',
        'GDPR-aware data minimization',
        'EU AI Act evidence (Arts. 12/13/14)',
        'HIPAA / FERPA aligned logging',
        'PCI DSS v4.0 scope controls',
        'CPRA/CPPA risk-assessment ready'
      ]
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Redacts credit cards & SSN, allows general names.',
      recommended: 'Good for Support',
      color: 'blue',
      compliance: [
        'SOC 2/ISO-aligned logging',
        'GDPR-aware data minimization',
        'PCI DSS v4.0 scope controls',
        'CPRA/CPPA risk-assessment ready'
      ]
    },
    {
      id: 'monitor',
      name: 'Monitor Only',
      description: "Doesn't block anything, just logs for visibility.",
      recommended: 'Good for testing',
      color: 'green',
      compliance: [
        'SOC 2/ISO-aligned logging',
        'CPRA/CPPA risk-assessment ready'
      ]
    }
  ];

  const handleCopy = (field: string, value: string) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedField(field);
      setShowConfetti(true);
      setTimeout(() => {
        setCopiedField(null);
        setShowConfetti(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hover: 'hover:border-blue-400',
        text: 'text-blue-700',
        icon: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        hover: 'hover:border-purple-400',
        text: 'text-purple-700',
        icon: 'text-purple-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        hover: 'hover:border-green-400',
        text: 'text-green-700',
        icon: 'text-green-600'
      },
      slate: {
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        hover: 'hover:border-slate-400',
        text: 'text-slate-700',
        icon: 'text-slate-600'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700'
      }
    };
    return colors[color] || colors.blue;
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedRegion !== '';
    if (currentStep === 2) return workspaceName.trim() !== '';
    if (currentStep === 3) return selectedPersona !== '';
    if (currentStep === 4) return selectedProvider !== '';
    if (currentStep === 5) return selectedIntegration !== '';
    if (currentStep === 6) return selectedFramework !== '';
    if (currentStep === 7) return selectedPolicy !== '';
    if (currentStep === 8) return true; // Data Controls - no validation needed, has defaults
    if (currentStep === 9) return true; // Observability & QA - no validation needed, has defaults
    if (currentStep === 10) return true; // Guardrails & Approvals - optional step, no validation
    if (currentStep === 11) return true; // Notifications & Workflow - no validation needed, has defaults
    return true;
  };

  const stepList = [
    { number: 1, label: 'Region Selection', skippable: false },
    { number: 2, label: 'Create Workspace', skippable: false },
    { number: 3, label: 'What are we securing', skippable: false },
    { number: 4, label: 'AI Provider', skippable: false },
    { number: 5, label: 'Choose Integration', skippable: false },
    { number: 6, label: 'Bootstrap Governance', skippable: true },
    { number: 7, label: 'Select Safety Level', skippable: true },
    { number: 8, label: 'Data Controls', skippable: true },
    { number: 9, label: 'Observability & QA', skippable: true },
    { number: 10, label: 'Guardrails & Approvals', skippable: true },
    { number: 11, label: 'Notifications & Workflow', skippable: true },
    { number: 12, label: 'Connection Details', skippable: false },
    { number: 13, label: 'Listening for traffic', skippable: false },
    { number: 14, label: 'Security & Compliance', skippable: true },
    { number: 15, label: 'Ship Your Badge', skippable: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, x: 0, opacity: 1 }}
                animate={{
                  y: Math.random() * 200 - 100,
                  x: Math.random() * 200 - 100,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 10}%`,
                  top: `${50 + (Math.random() - 0.5) * 10}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container with Sidebar */}
      <div className="w-full max-w-7xl flex gap-8">
        {/* Side Progress Menu */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sticky top-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-6">Integration Setup</h2>
            <div className="space-y-0">
              {stepList.map((step, index) => {
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;

                return (
                  <div key={step.number} className="relative">
                    {/* Vertical line connecting to next step */}
                    {index < stepList.length - 1 && (
                      <div className={`absolute left-5 top-9 w-0.5 h-8 z-0 ${
                        isCompleted ? 'bg-blue-600' : 'bg-slate-200'
                      }`} />
                    )}
                    
                    {/* Step item */}
                    <button
                      onClick={() => setCurrentStep(step.number)}
                      className={`relative z-10 w-full flex items-center gap-3 py-2 px-2 rounded-lg transition-colors cursor-pointer hover:bg-slate-50 ${
                        isCurrent ? 'bg-blue-50' : ''
                      }`}
                    >
                      {/* Circle indicator */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted 
                          ? 'bg-blue-600' 
                          : isCurrent 
                            ? 'border-2 border-blue-600 bg-white' 
                            : 'border-2 border-slate-300 bg-white'
                      }`}>
                        {isCompleted && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                        {isCurrent && (
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      
                      {/* Step label and optional badge */}
                      <div className="flex-1 flex items-center justify-between gap-2">
                        <span className={`text-sm ${
                          isCompleted 
                            ? 'text-slate-900 font-medium' 
                            : isCurrent 
                              ? 'text-blue-700 font-semibold' 
                              : 'text-slate-500'
                        }`}>
                          {step.label}
                        </span>
                        {step.skippable && !isCompleted && (
                          <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            Optional
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Wizard Container */}
        <div className="flex-1 min-w-0">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step {currentStep} of 14</span>
            <span className="text-sm text-slate-600">{Math.round((currentStep / 14) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 14) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white border-slate-200 shadow-xl">
          <CardContent className="p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Region */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Where should we deploy?
                    </h1>
                    <p className="text-lg text-slate-600">
                      Choose the region for data residency and compliance.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {regions.map((region) => {
                      const isSelected = selectedRegion === region.id;

                      return (
                        <motion.button
                          key={region.id}
                          onClick={() => setSelectedRegion(region.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? 'border-blue-400 bg-blue-50 shadow-lg'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-4 right-4">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                          
                          {/* Large Flag */}
                          <div className="text-6xl mb-4">{region.flag}</div>
                          
                          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                            {region.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                            <Globe className="w-3 h-3" />
                            {region.location}
                          </div>
                          
                          {/* Compliance Badges */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {region.compliance.map((item, idx) => (
                              <Badge 
                                key={idx}
                                variant="outline" 
                                className="text-xs bg-white border-slate-200 text-slate-600"
                              >
                                <Shield className="w-2.5 h-2.5 mr-1 text-slate-500" />
                                {item}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Latency Indicator */}
                          <div className="flex items-center gap-1.5 mt-2">
                            <div className={`w-2 h-2 rounded-full ${
                              region.latency === 'Low' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                            <span className="text-xs text-slate-600">{region.latency} Latency</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Create Workspace */}
              {currentStep === 2 && (
                <motion.div
                  key="step2-workspace"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Create Your Workspace
                    </h1>
                    <p className="text-lg text-slate-600">
                      Set up your organization's workspace with authentication options.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    {/* Workspace Name */}
                    <div className="space-y-3">
                      <Label htmlFor="workspace-name">
                        Workspace Name
                      </Label>
                      <Input
                        id="workspace-name"
                        type="text"
                        placeholder="e.g., Acme Corp AI Governance"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="border-slate-300 bg-slate-50"
                      />
                    </div>

                    {/* Authentication & Access Section */}
                    <div className="space-y-4 p-6 border border-slate-200 rounded-xl bg-white">
                      <h3 className="font-semibold text-slate-900 mb-4">
                        Authentication & Access
                      </h3>

                      {/* SSO Toggle */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Label htmlFor="sso-toggle" className="font-semibold text-slate-900">
                            Single Sign-On (SSO)
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Enable OIDC or SAML 2.0 for enterprise authentication
                          </p>
                        </div>
                        <Switch
                          id="sso-toggle"
                          checked={ssoEnabled}
                          onCheckedChange={setSsoEnabled}
                        />
                      </div>

                      {/* SCIM Toggle */}
                      <div className="flex items-start justify-between gap-4 pt-4 border-t border-slate-200">
                        <div className="flex-1">
                          <Label htmlFor="scim-toggle" className="font-semibold text-slate-900">
                            SCIM 2.0 Provisioning
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Auto-provision users and groups
                          </p>
                        </div>
                        <Switch
                          id="scim-toggle"
                          checked={scimEnabled}
                          onCheckedChange={setScimEnabled}
                        />
                      </div>
                    </div>

                    {/* Compliance Note */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <span>All authentication is SOC 2 Type II compliant</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Select Persona (was Step 2) */}
              {currentStep === 3 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      What are we securing today?
                    </h1>
                    <p className="text-lg text-slate-600">
                      Tell us about your AI project so we can set up the right safeguards.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search project types (e.g., LangChain, Chatbot, Vector Database...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-slate-300 bg-white"
                    />
                  </div>

                  {/* Scrollable Grid */}
                  <div className="max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <div className="grid grid-cols-2 gap-4">
                      {filteredPersonas.map((persona) => {
                        const Icon = persona.icon;
                        const colors = getColorClasses(persona.color);
                        const isSelected = selectedPersona === persona.id;

                        return (
                          <motion.button
                            key={persona.id}
                            onClick={() => setSelectedPersona(persona.id)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? `${colors.border} ${colors.bg} shadow-lg`
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3">
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              </div>
                            )}
                            <Icon className={`w-9 h-9 mb-3 ${isSelected ? colors.icon : 'text-slate-400'}`} />
                            <h3 className={`font-semibold mb-1 ${isSelected ? colors.text : 'text-slate-900'}`}>
                              {persona.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mb-2">{persona.subtitle}</p>
                            <p className="text-sm text-slate-600 mb-2 leading-relaxed">{persona.description}</p>
                            <p className="text-xs text-slate-400">
                              <span className="font-medium">Examples:</span> {persona.examples}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* No Results Message */}
                    {filteredPersonas.length === 0 && (
                      <div className="text-center py-12">
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No project types match your search.</p>
                        <Button
                          variant="link"
                          onClick={() => setSearchQuery('')}
                          className="text-blue-600 mt-2"
                        >
                          Clear search
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Results Count */}
                  <p className="text-xs text-center text-slate-500">
                    Showing {filteredPersonas.length} of {personas.length} project types
                  </p>
                </motion.div>
              )}

              {/* Step 4: Select Provider */}
              {currentStep === 4 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Which AI provider is your project using?
                    </h1>
                    <p className="text-lg text-slate-600">
                      We'll set up a secure connection to your AI brain.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search providers (e.g., OpenAI, Groq, Anthropic...)"
                      value={providerSearchQuery}
                      onChange={(e) => setProviderSearchQuery(e.target.value)}
                      className="pl-10 border-slate-300 bg-white"
                    />
                  </div>

                  {/* Scrollable Grid */}
                  <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <div className="grid grid-cols-4 gap-3">
                      {filteredProviders.map((provider) => {
                        const isSelected = selectedProvider === provider.id;

                        return (
                          <motion.button
                            key={provider.id}
                            onClick={() => setSelectedProvider(provider.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-5 rounded-xl border-2 transition-all ${
                              isSelected
                                ? 'border-blue-400 bg-blue-50 shadow-lg'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              </div>
                            )}
                            <div className="text-4xl mb-2">{provider.logo}</div>
                            <div className={`text-xs font-medium mb-1 ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                              {provider.name}
                            </div>
                            <Badge 
                              variant="outline" 
                              className="text-xs border-slate-300 text-slate-500"
                            >
                              {provider.category}
                            </Badge>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* No Results Message */}
                    {filteredProviders.length === 0 && (
                      <div className="text-center py-12">
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No providers match your search.</p>
                        <Button
                          variant="link"
                          onClick={() => setProviderSearchQuery('')}
                          className="text-blue-600 mt-2"
                        >
                          Clear search
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Results Count */}
                  <p className="text-xs text-center text-slate-500">
                    Showing {filteredProviders.length} of {providers.length} providers
                  </p>
                </motion.div>
              )}

              {/* Step 5: Choose Integration Path */}
              {currentStep === 5 && (
                <motion.div
                  key="step5-integration"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Choose Your Integration Path
                    </h1>
                    <p className="text-lg text-slate-600">
                      Select how you want to integrate AI Governance into your application. You can add more later.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    {/* Fast Path: Hosted Gateway */}
                    <motion.button
                      onClick={() => setSelectedIntegration('fast-path')}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        selectedIntegration === 'fast-path'
                          ? 'border-blue-400 bg-blue-50 shadow-lg'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Server className="w-6 h-6 text-slate-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-semibold ${selectedIntegration === 'fast-path' ? 'text-blue-700' : 'text-slate-900'}`}>
                              Fast Path: Hosted Gateway
                            </h3>
                            <Badge variant="outline" className="bg-blue-50 border-blue-300 text-blue-700 text-xs">
                              Recommended
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Route AI traffic through our gateway. No code changes—just update your base URL.
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    {/* Code Path: SDK Integration */}
                    <motion.button
                      onClick={() => setSelectedIntegration('code-path')}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        selectedIntegration === 'code-path'
                          ? 'border-blue-400 bg-blue-50 shadow-lg'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Code className="w-6 h-6 text-slate-600 mt-1" />
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-2 ${selectedIntegration === 'code-path' ? 'text-blue-700' : 'text-slate-900'}`}>
                            Code Path: SDK Integration
                          </h3>
                          <p className="text-sm text-slate-600">
                            Install our SDK (Python, Node, Go, Java) to instrument your AI calls directly.
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    {/* Ops Path: Webhooks & Streams */}
                    <motion.button
                      onClick={() => setSelectedIntegration('ops-path')}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        selectedIntegration === 'ops-path'
                          ? 'border-blue-400 bg-blue-50 shadow-lg'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Webhook className="w-6 h-6 text-slate-600 mt-1" />
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-2 ${selectedIntegration === 'ops-path' ? 'text-blue-700' : 'text-slate-900'}`}>
                            Ops Path: Webhooks & Streams
                          </h3>
                          <p className="text-sm text-slate-600">
                            Stream events to Pub/Sub, Kafka, or webhooks for custom workflows.
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Divider with "Or" text */}
                  <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm text-slate-500">Or just display your trust badge</span>
                    </div>
                  </div>

                  {/* Zero-Code Badge Section - Visually Separated */}
                  <div className="space-y-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                      💡 <span className="font-medium">Note:</span> This option only displays a visual trust badge—it does not provide governance, monitoring, or policy enforcement.
                    </div>
                    
                    {/* Zero-Code: JavaScript Badge */}
                    <motion.button
                      onClick={() => setSelectedIntegration('zero-code')}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        selectedIntegration === 'zero-code'
                          ? 'border-amber-400 bg-amber-50 shadow-lg'
                          : 'border-amber-200 hover:border-amber-300 bg-amber-50/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Eye className="w-6 h-6 text-amber-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-semibold ${selectedIntegration === 'zero-code' ? 'text-amber-900' : 'text-slate-900'}`}>
                              Zero-Code: JavaScript Badge
                            </h3>
                            <Badge variant="outline" className="bg-white border-amber-300 text-amber-700 text-xs">
                              Display Only
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Copy-paste a JS snippet to embed your trust badge on any page. 60-second install. (No governance features)
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Policy Starter Pack */}
              {currentStep === 6 && (
                <motion.div
                  key="step6-policy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Bootstrap Your Governance
                    </h1>
                    <p className="text-lg text-slate-600">
                      Get prebuilt policy templates mapped to leading frameworks.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                      💡 <span className="font-medium">Optional:</span> Skip this to use our Combined Framework (NIST + ISO + EU AI Act). You can customize later.
                    </div>
                  </div>

                  {/* Policy Starter Pack Content */}
                  <div className="space-y-6">
                      {/* Governance Framework Selection */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-base font-semibold text-slate-900">
                            Governance Framework
                          </Label>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            Choose the regulatory blueprint that guides how you'll manage AI risks, document decisions, and prove compliance. We'll map your controls to these standards automatically.
                          </p>
                        </div>

                        {/* Scrollable Framework Options */}
                        <div className="max-h-[320px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                          {/* NIST AI RMF */}
                          <button
                            onClick={() => setSelectedFramework('nist')}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFramework === 'nist'
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedFramework === 'nist' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                  {selectedFramework === 'nist' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-1">NIST AI RMF</h4>
                                <p className="text-sm text-slate-600">U.S. federal standard with Govern, Map, Measure, Manage functions</p>
                              </div>
                            </div>
                          </button>

                          {/* ISO/IEC 42001 */}
                          <button
                            onClick={() => setSelectedFramework('iso-42001')}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFramework === 'iso-42001'
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedFramework === 'iso-42001' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                  {selectedFramework === 'iso-42001' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-1">ISO/IEC 42001</h4>
                                <p className="text-sm text-slate-600">International AI Management System standard (certifiable)</p>
                              </div>
                            </div>
                          </button>

                          {/* EU AI Act */}
                          <button
                            onClick={() => setSelectedFramework('eu-ai-act')}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFramework === 'eu-ai-act'
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedFramework === 'eu-ai-act' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                  {selectedFramework === 'eu-ai-act' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-slate-900">EU AI Act</h4>
                                  <Badge variant="outline" className="bg-blue-50 border-blue-300 text-blue-700 text-xs">
                                    2025 Compliance
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600">Risk-based regulation for AI systems deployed in EU (Articles 8-15)</p>
                              </div>
                            </div>
                          </button>

                          {/* ISO 27001 */}
                          <button
                            onClick={() => setSelectedFramework('iso-27001')}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFramework === 'iso-27001'
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedFramework === 'iso-27001' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                  {selectedFramework === 'iso-27001' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-1">ISO 27001</h4>
                                <p className="text-sm text-slate-600">Information security management with AI-specific Annex A controls</p>
                              </div>
                            </div>
                          </button>

                          {/* SOC 2 */}
                          <button
                            onClick={() => setSelectedFramework('soc2')}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFramework === 'soc2'
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedFramework === 'soc2' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                  {selectedFramework === 'soc2' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-1">SOC 2 Type II</h4>
                                <p className="text-sm text-slate-600">Trust service criteria for AI SaaS vendors (Security, Availability, Privacy)</p>
                              </div>
                            </div>
                          </button>

                          {/* Combined (NIST + ISO + EU) */}
                          <button
                            onClick={() => setSelectedFramework('combined')}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFramework === 'combined'
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedFramework === 'combined' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                  {selectedFramework === 'combined' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-slate-900">Combined Framework</h4>
                                  <Badge variant="outline" className="bg-green-50 border-green-300 text-green-700 text-xs">
                                    Recommended
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600">Harmonized controls mapped to NIST, ISO 42001, EU AI Act & SOC 2</p>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Industry Pack Dropdown */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-900">
                          Industry Pack (Optional)
                        </Label>
                        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                          <SelectTrigger className="border-slate-300 bg-white">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general-tech">General / Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare / Medical</SelectItem>
                            <SelectItem value="finance">Financial Services</SelectItem>
                            <SelectItem value="retail">Retail / E-commerce</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="government">Government / Public Sector</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Statistics Cards */}
                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="p-6 rounded-xl border border-slate-200 bg-white text-center">
                          <div className="text-4xl font-bold text-blue-600 mb-2">42</div>
                          <div className="text-sm text-slate-600">Policy Templates</div>
                        </div>
                        <div className="p-6 rounded-xl border border-slate-200 bg-white text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">87</div>
                          <div className="text-sm text-slate-600">Control Points</div>
                        </div>
                        <div className="p-6 rounded-xl border border-slate-200 bg-white text-center">
                          <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
                          <div className="text-sm text-slate-600">Best Practices</div>
                        </div>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* Step 7: Select Safety Level (was Step 8, was Step 7, was Step 6, was Step 5) */}
              {currentStep === 7 && (
                <motion.div
                  key="step6-safety"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Select a Safety Level
                    </h1>
                    <p className="text-lg text-slate-600">
                      Choose how strictly we should protect sensitive information.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
                      ⚡ <span className="font-medium">Optional:</span> Skip to use our Balanced policy. You can fine-tune settings later in the dashboard.
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    {policies.map((policy) => {
                      const isSelected = selectedPolicy === policy.id;
                      const colors = getColorClasses(policy.color);

                      return (
                        <motion.button
                          key={policy.id}
                          onClick={() => setSelectedPolicy(policy.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? `${colors.border} ${colors.bg} shadow-lg`
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="pt-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                              }`}>
                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`font-semibold ${isSelected ? colors.text : 'text-slate-900'}`}>
                                  {policy.name}
                                </h3>
                                <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                                  {policy.recommended}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{policy.description}</p>
                              
                              {/* Compliance Badges */}
                              <div className="flex flex-wrap gap-1.5">
                                {policy.compliance.map((item, idx) => (
                                  <Badge 
                                    key={idx}
                                    variant="outline" 
                                    className="text-xs bg-white border-slate-200 text-slate-600"
                                  >
                                    <Shield className="w-3 h-3 mr-1 text-slate-500" />
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 8: Data Controls */}
              {currentStep === 8 && (
                <motion.div
                  key="step8-data-controls"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      Data Controls
                    </h1>
                    <p className="text-slate-600">
                      Configure data retention, privacy, and storage options.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                      ⚙️ <span className="font-medium">Optional:</span> Skip to use recommended defaults. You can adjust these settings anytime.
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Data Retention Period */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        Data Retention Period
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setDataRetentionPeriod('30-days')}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            dataRetentionPeriod === '30-days'
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              dataRetentionPeriod === '30-days' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                            }`}>
                              {dataRetentionPeriod === '30-days' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium text-slate-900">30 days</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setDataRetentionPeriod('90-days')}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            dataRetentionPeriod === '90-days'
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              dataRetentionPeriod === '90-days' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                            }`}>
                              {dataRetentionPeriod === '90-days' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium text-slate-900">90 days</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setDataRetentionPeriod('1-year')}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            dataRetentionPeriod === '1-year'
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              dataRetentionPeriod === '1-year' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                            }`}>
                              {dataRetentionPeriod === '1-year' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium text-slate-900">1 year</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* PII Redaction */}
                    <div className="p-5 rounded-xl border-2 border-slate-200 bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">PII Redaction</h3>
                          <p className="text-sm text-slate-600">
                            Automatically detect and redact personal information
                          </p>
                        </div>
                        <Switch
                          checked={piiRedactionEnabled}
                          onCheckedChange={setPiiRedactionEnabled}
                        />
                      </div>
                    </div>

                    {/* Encryption */}
                    <div className="p-5 rounded-xl border-2 border-slate-200 bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">Encryption (KMS-backed)</h3>
                          <p className="text-sm text-slate-600">
                            Encrypt data at rest with Cloud KMS
                          </p>
                        </div>
                        <Switch
                          checked={encryptionEnabled}
                          onCheckedChange={setEncryptionEnabled}
                        />
                      </div>
                    </div>

                    {/* Storage Location Type */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        Storage Location Type
                      </Label>
                      <Select value={storageLocationType} onValueChange={setStorageLocationType}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regional">Regional (lowest latency)</SelectItem>
                          <SelectItem value="multi-regional">Multi-Regional (higher availability)</SelectItem>
                          <SelectItem value="dual-regional">Dual-Regional (balanced)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-slate-500">
                        Based on your selected region: {regions.find(r => r.id === selectedRegion)?.code || 'US'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 9: Connection Details (was Step 8, was Step 9, was Step 8, was Step 7, was Step 6) */}
              {currentStep === 9 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      Let's link your app
                    </h1>
                    <p className="text-lg text-slate-600">
                      Paste these two values into your AI application settings.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    {/* PLCY Link */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        The PLCY Link (Base URL)
                      </Label>
                      <div className="relative">
                        <Input
                          readOnly
                          value="https://api.plcy.dev/v1/project_x"
                          className="pr-24 font-mono text-sm bg-slate-50 border-slate-300"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleCopy('url', 'https://api.plcy.dev/v1/project_x')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
                        >
                          {copiedField === 'url' ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-slate-500">
                        Replace the default OpenAI URL with this.
                      </p>
                    </div>

                    {/* PLCY Key */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        Your PLCY Key
                      </Label>
                      <div className="relative">
                        <Input
                          readOnly
                          value="plcy_sk_live_abc123xyz789"
                          className="pr-32 font-mono text-sm bg-slate-50 border-slate-300"
                          type={showKey ? 'text' : 'password'}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowKey(!showKey)}
                            className="h-8 px-2 hover:bg-slate-200"
                          >
                            {showKey ? (
                              <EyeOff className="w-4 h-4 text-slate-600" />
                            ) : (
                              <Eye className="w-4 h-4 text-slate-600" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleCopy('key', 'plcy_sk_live_abc123xyz789')}
                            className="h-8 bg-blue-600 hover:bg-blue-700"
                          >
                            {copiedField === 'key' ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">
                        Use this instead of your OpenAI Key.
                      </p>
                    </div>

                    {/* Helper Alert */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-900">
                        <p className="font-medium mb-1">Where do I paste these?</p>
                        <p>In your app's settings, look for "OpenAI API Configuration" or similar. Replace the base URL and API key with these values.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 9: Observability & QA */}
              {currentStep === 9 && (
                <motion.div
                  key="step9-observability"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      Observability & QA
                    </h1>
                    <p className="text-slate-600">
                      Monitor AI performance, quality, and safety metrics.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* OpenTelemetry Integration */}
                    <div className="p-5 rounded-xl border-2 border-slate-200 bg-white">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 flex items-start gap-3">
                          <Activity className="w-5 h-5 text-slate-700 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-1">OpenTelemetry Integration</h3>
                            <p className="text-sm text-slate-600">
                              Export traces, metrics, and logs to your observability stack
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={openTelemetryEnabled}
                          onCheckedChange={setOpenTelemetryEnabled}
                        />
                      </div>

                      {openTelemetryEnabled && (
                        <div className="space-y-2 pl-8">
                          <Label className="text-sm text-slate-700">Export Destination (Optional)</Label>
                          <Select value={exportDestination} onValueChange={setExportDestination}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plcy-builtin">PLCY (Built-in)</SelectItem>
                              <SelectItem value="datadog">Datadog</SelectItem>
                              <SelectItem value="new-relic">New Relic</SelectItem>
                              <SelectItem value="honeycomb">Honeycomb</SelectItem>
                              <SelectItem value="custom">Custom Endpoint</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Prebuilt Dashboards */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        Prebuilt Dashboards
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Response Latency</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Refusal Rates</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Harmful Content Detection</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Jailbreak Attempts</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Hallucination Flags</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Cost Tracking</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Token Usage</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-900">Model Performance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 10: Guardrails & Approvals (Optional) */}
              {currentStep === 10 && (
                <motion.div
                  key="step10-guardrails"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                      <UserCheck className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl mb-2">Guardrails & Approvals</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                      Configure Human-in-the-Loop (HITL) approval workflows for high-risk AI actions. 
                      <span className="block mt-1 text-sm">
                        <Badge variant="outline" className="mt-2">Optional</Badge> - Skip this step to configure later in Settings
                      </span>
                    </p>
                  </div>

                  {/* Enable HITL Toggle */}
                  <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <UserCheck className="w-5 h-5 text-blue-600" />
                            <Label className="font-semibold text-lg">Enable HITL Approvals</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Require human review for high-risk AI agent actions like data deletion, 
                            production changes, and sensitive data access
                          </p>
                        </div>
                        <Switch
                          checked={hitlEnabled}
                          onCheckedChange={setHitlEnabled}
                          className="ml-4"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {hitlEnabled && (
                    <>
                      {/* Environment Presets */}
                      <div>
                        <Label className="mb-3 block">Choose Environment Preset</Label>
                        <div className="grid gap-3">
                          <label
                            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              approvalPreset === 'development'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="approvalPreset"
                              value="development"
                              checked={approvalPreset === 'development'}
                              onChange={(e) => setApprovalPreset(e.target.value)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">Development</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                  Recommended for testing
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Permissive approval rules. Auto-approve after first manual approval (24h cache). 
                                Perfect for rapid iteration during development.
                              </p>
                            </div>
                          </label>

                          <label
                            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              approvalPreset === 'staging'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="approvalPreset"
                              value="staging"
                              checked={approvalPreset === 'staging'}
                              onChange={(e) => setApprovalPreset(e.target.value)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">Staging</span>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                                  Moderate oversight
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Require approval on first use per day. Suitable for pre-production testing 
                                with realistic governance policies.
                              </p>
                            </div>
                          </label>

                          <label
                            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              approvalPreset === 'production'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="approvalPreset"
                              value="production"
                              checked={approvalPreset === 'production'}
                              onChange={(e) => setApprovalPreset(e.target.value)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">Production</span>
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                  Strict enforcement
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Always require approval for high-risk actions. Critical operations need 
                                2-person approval. Full compliance mode.
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Risk-Based Policies */}
                      <div>
                        <Label className="mb-3 block">Risk-Based Approval Policies</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200">
                            <div className="flex items-center gap-3 flex-1">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              <div>
                                <span className="font-medium text-sm">Critical Risk Actions</span>
                                <p className="text-xs text-muted-foreground">
                                  Prod DB access, secret rotation, mass deletions
                                </p>
                              </div>
                            </div>
                            <Select value={criticalRiskApproval} onValueChange={setCriticalRiskApproval}>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto_approve">Auto Approve</SelectItem>
                                <SelectItem value="require_approval">Require Approval</SelectItem>
                                <SelectItem value="require_2_person_approval">2-Person Approval</SelectItem>
                                <SelectItem value="auto_reject">Auto Reject</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50 border-orange-200">
                            <div className="flex items-center gap-3 flex-1">
                              <AlertTriangle className="w-5 h-5 text-orange-600" />
                              <div>
                                <span className="font-medium text-sm">High Risk Actions</span>
                                <p className="text-xs text-muted-foreground">
                                  User data deletion, policy changes, data exports
                                </p>
                              </div>
                            </div>
                            <Select value={highRiskApproval} onValueChange={setHighRiskApproval}>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto_approve">Auto Approve</SelectItem>
                                <SelectItem value="require_approval">Require Approval</SelectItem>
                                <SelectItem value="require_2_person_approval">2-Person Approval</SelectItem>
                                <SelectItem value="auto_reject">Auto Reject</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Tool Categories */}
                      <div>
                        <Label className="mb-3 block">Tool Categories Requiring Approval</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              toolCategoriesEnabled.write_ops
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-accent border-slate-200'
                            }`}
                            onClick={() =>
                              setToolCategoriesEnabled({
                                ...toolCategoriesEnabled,
                                write_ops: !toolCategoriesEnabled.write_ops
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4" />
                                <span className="font-medium text-sm">Write Operations</span>
                              </div>
                              <Switch checked={toolCategoriesEnabled.write_ops} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              DB writes, IAM changes, config updates
                            </p>
                          </div>

                          <div
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              toolCategoriesEnabled.data_export
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-accent border-slate-200'
                            }`}
                            onClick={() =>
                              setToolCategoriesEnabled({
                                ...toolCategoriesEnabled,
                                data_export: !toolCategoriesEnabled.data_export
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span className="font-medium text-sm">Data Export</span>
                              </div>
                              <Switch checked={toolCategoriesEnabled.data_export} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Customer data, logs, bulk exports
                            </p>
                          </div>

                          <div
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              toolCategoriesEnabled.secrets_access
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-accent border-slate-200'
                            }`}
                            onClick={() =>
                              setToolCategoriesEnabled({
                                ...toolCategoriesEnabled,
                                secrets_access: !toolCategoriesEnabled.secrets_access
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                <span className="font-medium text-sm">Secrets Access</span>
                              </div>
                              <Switch checked={toolCategoriesEnabled.secrets_access} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              API keys, passwords, credentials
                            </p>
                          </div>

                          <div
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              toolCategoriesEnabled.prod_ops
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-accent border-slate-200'
                            }`}
                            onClick={() =>
                              setToolCategoriesEnabled({
                                ...toolCategoriesEnabled,
                                prod_ops: !toolCategoriesEnabled.prod_ops
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span className="font-medium text-sm">Production Ops</span>
                              </div>
                              <Switch checked={toolCategoriesEnabled.prod_ops} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Deployments, scaling, prod changes
                            </p>
                          </div>

                          <div
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              toolCategoriesEnabled.data_deletion
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-accent border-slate-200'
                            }`}
                            onClick={() =>
                              setToolCategoriesEnabled({
                                ...toolCategoriesEnabled,
                                data_deletion: !toolCategoriesEnabled.data_deletion
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                <span className="font-medium text-sm">Data Deletion</span>
                              </div>
                              <Switch checked={toolCategoriesEnabled.data_deletion} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Permanent removals, purges
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <Alert className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <AlertDescription>
                          <strong>HITL Configured!</strong> High-risk actions will require approval before execution. 
                          You can manage approvers and fine-tune policies in Settings → Approvals & HITL.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  {!hitlEnabled && (
                    <Alert>
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        HITL approvals are optional. You can enable them later in Settings if you need 
                        human oversight for sensitive AI agent actions.
                      </AlertDescription>
                    </Alert>
                  )}
                </motion.div>
              )}

              {/* Step 11: Notifications & Workflow */}
              {currentStep === 11 && (
                <motion.div
                  key="step11-notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      Notifications & Workflow
                    </h1>
                    <p className="text-slate-600">
                      Connect team communication and ticketing tools.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Slack Notifications */}
                    <div className="p-5 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Slack Notifications</h3>
                            <p className="text-sm text-slate-600">
                              Get alerts for policy violations and risks
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={slackNotifications}
                          onCheckedChange={setSlackNotifications}
                        />
                      </div>
                    </div>

                    {/* Microsoft Teams */}
                    <div className="p-5 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Microsoft Teams</h3>
                            <p className="text-sm text-slate-600">
                              Adaptive cards for governance events
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={microsoftTeams}
                          onCheckedChange={setMicrosoftTeams}
                        />
                      </div>
                    </div>

                    {/* Jira Integration */}
                    <div className="p-5 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Jira Integration</h3>
                            <p className="text-sm text-slate-600">
                              Auto-create tickets for violations and drift
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={jiraIntegration}
                          onCheckedChange={setJiraIntegration}
                        />
                      </div>
                    </div>

                    {/* More integrations info */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">
                        <span className="font-medium">More integrations available:</span> PagerDuty, ServiceNow, Linear, Discord, and custom webhooks
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 12: Connection Details */}
              {currentStep === 12 && (
                <motion.div
                  key="step11-connection"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      Connection Details
                    </h1>
                    <p className="text-slate-600">
                      Copy your API credentials to connect your application.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* API Endpoint */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-900">API Endpoint</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm text-slate-900">
                          https://{selectedRegion || 'us'}.api.plcy.dev/v1
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(`https://${selectedRegion || 'us'}.api.plcy.dev/v1`);
                            setCopiedField('endpoint');
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="flex-shrink-0"
                        >
                          {copiedField === 'endpoint' ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* API Key */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-900">API Key</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm text-slate-900 flex items-center gap-2">
                          <span className="flex-1">
                            {showKey ? 'plcy_sk_1a2b3c4d5e6f7g8h9i0j' : '••••••••••••••••••••••••'}
                          </span>
                          <button
                            onClick={() => setShowKey(!showKey)}
                            className="text-slate-500 hover:text-slate-700"
                          >
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText('plcy_sk_1a2b3c4d5e6f7g8h9i0j');
                            setCopiedField('apiKey');
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="flex-shrink-0"
                        >
                          {copiedField === 'apiKey' ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Code Example */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-900">Quick Start Example</Label>
                      <div className="relative">
                        <pre className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 overflow-x-auto">
{`import { PLCYClient } from '@plcy/sdk';

const plcy = new PLCYClient({
  apiKey: process.env.PLCY_API_KEY,
  region: '${selectedRegion || 'us'}'
});

// Wrap your AI calls
const response = await plcy.chat({
  provider: '${selectedProvider}',
  model: 'gpt-4',
  messages: [/* your messages */]
});`}
                        </pre>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const code = `import { PLCYClient } from '@plcy/sdk';\n\nconst plcy = new PLCYClient({\n  apiKey: process.env.PLCY_API_KEY,\n  region: '${selectedRegion || 'us'}'\n});\n\n// Wrap your AI calls\nconst response = await plcy.chat({\n  provider: '${selectedProvider}',\n  model: 'gpt-4',\n  messages: [/* your messages */]\n});`;
                            navigator.clipboard.writeText(code);
                            setCopiedField('code');
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="absolute top-2 right-2 bg-slate-800 border-slate-600 hover:bg-slate-700"
                        >
                          {copiedField === 'code' ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Documentation Link */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-blue-900 mb-2">
                          <span className="font-medium">Need help integrating?</span> Check out our comprehensive documentation.
                        </p>
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                          View Docs
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 13: Listening for traffic */}
              {currentStep === 13 && (
                <motion.div
                  key="step12-listening"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-slate-900">
                      {isConnected ? 'Connected!' : 'Listening for traffic...'}
                    </h1>
                    <p className="text-lg text-slate-600">
                      {isConnected
                        ? 'We see your AI traffic! Your setup is complete.'
                        : 'Send a test message from your app to complete the connection.'}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center py-12">
                    {isConnected ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="text-center"
                      >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <Check className="w-12 h-12 text-green-600" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                            <Activity className="w-4 h-4 text-green-600" />
                            <span>First message received at {new Date().toLocaleTimeString()}</span>
                          </div>
                          <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => {/* Navigate to activity log */}}
                          >
                            View Activity Log
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="relative"
                        onViewportEnter={() => setIsListening(true)}
                      >
                        {/* Radar Animation */}
                        <div className="relative w-48 h-48">
                          <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
                          <div className="absolute inset-4 border-4 border-blue-300 rounded-full" />
                          <div className="absolute inset-8 border-4 border-blue-400 rounded-full" />
                          <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          >
                            <div className="absolute top-0 left-1/2 w-1 h-24 bg-gradient-to-b from-blue-600 to-transparent origin-bottom -translate-x-1/2" />
                          </motion.div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Radio className="w-12 h-12 text-blue-600" />
                          </div>
                        </div>
                        <p className="text-center mt-6 text-slate-600">
                          Waiting for the first message...
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 14: Security & Compliance */}
              {currentStep === 14 && (
                <motion.div
                  key="step13-security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      Security & Compliance
                    </h1>
                    <p className="text-slate-600">
                      Enable enterprise-grade security features to protect your AI governance data.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Automated Backups Card */}
                    <div className={`p-6 rounded-xl border-2 transition-all ${
                      backupsEnabled 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-slate-200 bg-white'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            backupsEnabled ? 'bg-blue-600' : 'bg-slate-100'
                          }`}>
                            <Database className={`w-6 h-6 ${
                              backupsEnabled ? 'text-white' : 'text-slate-400'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">Automated Backups</h3>
                            <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
                              Recommended
                            </Badge>
                          </div>
                        </div>
                        <Switch 
                          checked={backupsEnabled} 
                          onCheckedChange={setBackupsEnabled}
                        />
                      </div>

                      <p className="text-sm text-slate-600 mb-4">
                        Protect your AI governance data with automated backups. Configure frequency, retention, and storage location.
                      </p>

                      {backupsEnabled && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-4 pt-4 border-t border-slate-200"
                        >
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Backup Frequency</Label>
                            <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily (Recommended)</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Retention Period</Label>
                            <Select value={backupRetention} onValueChange={setBackupRetention}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="365">365 days</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                            <p className="text-xs text-blue-900">
                              <strong>Storage:</strong> PLCY Cloud (AES-256 encrypted, geo-redundant)
                            </p>
                          </div>

                          {/* PITR Section - Sub-option of backups */}
                          <div className="pt-4 mt-4 border-t-2 border-slate-300">
                            <div className="flex items-start justify-between p-3 rounded-lg bg-purple-50 border-2 border-purple-200">
                              <div className="flex items-center gap-3">
                                <Timer className="w-5 h-5 text-purple-600" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Label className="text-sm font-semibold text-slate-900">Point-in-Time Recovery (PITR)</Label>
                                    <Badge variant="outline" className="bg-white border-purple-300 text-purple-700 text-xs">
                                      Advanced
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-slate-600 mt-1">
                                    Restore to any specific timestamp, not just the last backup
                                  </p>
                                </div>
                              </div>
                              <Switch 
                                checked={pitrEnabled} 
                                onCheckedChange={setPitrEnabled}
                              />
                            </div>

                            {pitrEnabled && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-3 pl-7"
                              >
                                <div className="space-y-2">
                                  <Label className="text-xs font-medium text-slate-700">Transaction Log Retention</Label>
                                  <Select value={pitrRetention} onValueChange={setPitrRetention}>
                                    <SelectTrigger className="h-9 text-sm">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="7">7 days</SelectItem>
                                      <SelectItem value="14">14 days</SelectItem>
                                      <SelectItem value="30">30 days (Recommended)</SelectItem>
                                      <SelectItem value="90">90 days</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <p className="text-xs text-slate-500">
                                    Restore to any moment within this window
                                  </p>
                                </div>

                                <div className="p-2 rounded bg-purple-50 border border-purple-200">
                                  <p className="text-xs text-purple-900">
                                    💾 Continuous transaction logs enable recovery to any second. Storage cost: ~2-3x standard backups.
                                  </p>
                                </div>
                              </motion.div>
                            )}

                            {!pitrEnabled && (
                              <div className="p-2 rounded bg-slate-50 border border-slate-200 ml-7">
                                <p className="text-xs text-slate-600">
                                  With PITR disabled, you can only restore from scheduled backup snapshots
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {!backupsEnabled && (
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-600">
                            Without backups, your data may be at risk. Enable to protect against data loss.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Immutable Audit Logging Card */}
                    <div className={`p-6 rounded-xl border-2 transition-all ${
                      immutableAuditEnabled 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-slate-200 bg-white'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            immutableAuditEnabled ? 'bg-blue-600' : 'bg-slate-100'
                          }`}>
                            <ShieldCheck className={`w-6 h-6 ${
                              immutableAuditEnabled ? 'text-white' : 'text-slate-400'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">Immutable Audit</h3>
                            <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
                              Recommended
                            </Badge>
                          </div>
                        </div>
                        <Switch 
                          checked={immutableAuditEnabled} 
                          onCheckedChange={setImmutableAuditEnabled}
                        />
                      </div>

                      <p className="text-sm text-slate-600 mb-4">
                        Compliance-grade tamper-proof audit trails with cryptographic verification for regulatory requirements.
                      </p>

                      {immutableAuditEnabled && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 pt-4 border-t border-slate-200"
                        >
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Blockchain-inspired verification</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Cryptographic timestamping</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Tamper detection & alerts</span>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                            <p className="text-xs text-blue-900">
                              <strong>Compliance:</strong> SOC 2, ISO 27001, GDPR, EU AI Act ready
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {!immutableAuditEnabled && (
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-600">
                            Enable to meet compliance requirements for tamper-proof record keeping.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info Banner */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">
                          <strong>Optional but Recommended:</strong> These features can be enabled later from Settings, but we recommend enabling them now to protect your data from day one.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 15: Ship Your Badge */}
              {currentStep === 15 && (
                <motion.div
                  key="step13-badge"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      Ship Your Badge 🚀
                    </h1>
                    <p className="text-slate-600">
                      Publish your AI trust center and display your compliance badge.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Trust Center URL */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        Your Trust Center URL
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">https://trust.plcy.app/</span>
                        <Input
                          value={trustCenterUrl}
                          onChange={(e) => setTrustCenterUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className="flex-1"
                          placeholder="your-company"
                        />
                      </div>
                      <p className="text-sm text-slate-500">
                        Share this link with customers to showcase your AI governance practices.
                      </p>
                    </div>

                    {/* Trust Center Preview */}
                    <div className="p-6 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {workspaceName || 'Your Company'} AI Trust Center
                          </h3>
                          <p className="text-sm text-slate-600">
                            Verified by PLCY • Last updated {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-white border border-slate-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-slate-900">Governance Active</span>
                          </div>
                          <p className="text-xs text-slate-500">{selectedFramework}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-slate-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Lock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-slate-900">Data Protected</span>
                          </div>
                          <p className="text-xs text-slate-500">{piiRedactionEnabled ? 'PII Redacted' : 'Standard'}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-slate-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-slate-900">Region Compliant</span>
                          </div>
                          <p className="text-xs text-slate-500">{regions.find(r => r.id === selectedRegion)?.code || 'US'}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-slate-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-slate-900">Monitored 24/7</span>
                          </div>
                          <p className="text-xs text-slate-500">Real-time alerts</p>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Preview Trust Center
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    {/* Embed Badge */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-900">
                        Embed Badge on Your Site
                      </Label>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <code className="text-sm text-slate-100 flex-1 break-all">
                            {`<a href="https://trust.plcy.app/${trustCenterUrl || 'your-company'}"><img src="https://trust.plcy.app/badge/${trustCenterUrl || 'your-company'}" alt="AI Governance Verified" /></a>`}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`<a href="https://trust.plcy.app/${trustCenterUrl || 'your-company'}"><img src="https://trust.plcy.app/badge/${trustCenterUrl || 'your-company'}" alt="AI Governance Verified" /></a>`);
                              setCopiedField('badge');
                              setTimeout(() => setCopiedField(null), 2000);
                            }}
                            className="flex-shrink-0 bg-slate-800 border-slate-600 hover:bg-slate-700"
                          >
                            {copiedField === 'badge' ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                        <div className="p-3 rounded-lg bg-white flex items-center justify-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="font-medium">AI Governance Verified by PLCY</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Completion Message */}
                    <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-2">
                            Setup Complete! 🎉
                          </h3>
                          <p className="text-sm text-slate-600 mb-4">
                            Your AI governance platform is ready. Visit <span className="font-medium text-blue-600">plcy.app</span> to manage policies, review logs, and configure advanced settings.
                          </p>
                          <div className="flex gap-2">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Go to Dashboard
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                            <Button variant="outline" className="border-slate-300">
                              View Docs
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="border-slate-300"
              >
                Back
              </Button>

              <div className="flex items-center gap-3">
                {/* Skip button for steps 6, 7, 8, 9, 10, 13 */}
                {(currentStep === 6 || currentStep === 7 || currentStep === 8 || currentStep === 9 || currentStep === 10 || currentStep === 13) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Set defaults when skipping
                      if (currentStep === 6 && selectedFramework === '') {
                        setSelectedFramework('combined');
                      }
                      if (currentStep === 7 && selectedPolicy === '') {
                        setSelectedPolicy('balanced');
                      }
                      // Steps 8, 9, 10 already have defaults set
                      // Step 13 security features are optional
                      setCurrentStep(currentStep + 1);
                    }}
                    className="border-slate-300 text-slate-600"
                  >
                    Skip for now
                  </Button>
                )}

                {currentStep < 12 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : currentStep === 12 ? (
                  isConnected && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setCurrentStep(13)}
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )
                ) : currentStep === 13 ? (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setCurrentStep(14)}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {/* Navigate to dashboard */}}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Need help? Our team is here to guide you. <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
        </p>
        </div>
      </div>
    </div>
  );
}