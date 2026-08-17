import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { 
  Plug, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Code,
  Bot,
  MessageSquare,
  Zap,
  Globe,
  Database,
  Shield,
  Play,
  Pause,
  RefreshCw,
  Copy,
  ExternalLink,
  Download,
  Upload,
  Trash2,
  Building,
  FileText
} from 'lucide-react';
import { IndustryConnectorGuide } from './IndustryConnectorGuide';

export function UniversalConnector() {
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [showNewConnectorDialog, setShowNewConnectorDialog] = useState(false);

  const connectorTypes = [
    {
      id: 'ai-agents',
      name: 'AI Agents',
      description: 'LangChain, AutoGPT, CrewAI, and other autonomous agents',
      icon: Bot,
      category: 'Autonomous Systems',
      protocols: ['HTTP API', 'WebSocket', 'gRPC', 'Ray', 'Celery'],
      examples: ['LangChain Agent', 'AutoGPT', 'CrewAI', 'Semantic Kernel']
    },
    {
      id: 'ai-assistants',
      name: 'AI Assistants',
      description: 'OpenAI Assistants, Claude, Gemini, and custom assistants',
      icon: MessageSquare,
      category: 'Conversational AI',
      protocols: ['REST API', 'GraphQL', 'Streaming', 'SSE', 'WebRTC'],
      examples: ['OpenAI Assistants', 'Claude API', 'Gemini Pro', 'Custom Assistant']
    },
    {
      id: 'chatbots',
      name: 'Chatbots',
      description: 'Slack bots, Teams bots, Discord bots, and web chatbots',
      icon: MessageSquare,
      category: 'Chat Platforms',
      protocols: ['Webhook', 'Bot Framework', 'Socket.io', 'MQTT', 'XMPP'],
      examples: ['Slack Bot', 'Teams Bot', 'Discord Bot', 'Web Widget']
    },
    {
      id: 'ml-platforms',
      name: 'ML/AI Platforms',
      description: 'SageMaker, Vertex AI, Azure ML, Databricks, MLflow',
      icon: Database,
      category: 'ML Operations',
      protocols: ['REST API', 'gRPC', 'MLflow', 'Kubeflow', 'Apache Airflow'],
      examples: ['AWS SageMaker', 'Google Vertex AI', 'Azure ML', 'Databricks', 'MLflow']
    },
    {
      id: 'vector-databases',
      name: 'Vector Databases',
      description: 'Pinecone, Weaviate, Chroma, Qdrant, and embedding stores',
      icon: Database,
      category: 'Data Storage',
      protocols: ['REST API', 'gRPC', 'HTTP/2', 'GraphQL', 'Custom TCP'],
      examples: ['Pinecone', 'Weaviate', 'Chroma', 'Qdrant', 'Milvus', 'FAISS']
    },
    {
      id: 'ai-frameworks',
      name: 'AI Development Frameworks',
      description: 'TensorFlow, PyTorch, Jupyter, and development environments',
      icon: Code,
      category: 'Development',
      protocols: ['HTTP API', 'Jupyter Protocol', 'TensorBoard', 'MLflow', 'ONNX'],
      examples: ['TensorFlow Serving', 'PyTorch', 'Jupyter Hub', 'Google Colab', 'Hugging Face']
    },
    {
      id: 'observability',
      name: 'AI Observability',
      description: 'W&B, MLflow, Neptune, Comet, and monitoring platforms',
      icon: Eye,
      category: 'Monitoring',
      protocols: ['REST API', 'Prometheus', 'OpenTelemetry', 'StatsD', 'InfluxDB'],
      examples: ['Weights & Biases', 'MLflow', 'Neptune', 'Comet', 'TensorBoard']
    },
    {
      id: 'prompt-tools',
      name: 'Prompt Engineering',
      description: 'PromptLayer, LangSmith, Helicone, and prompt optimization',
      icon: FileText,
      category: 'Prompt Management',
      protocols: ['REST API', 'GraphQL', 'Webhook', 'SSE'],
      examples: ['PromptLayer', 'LangSmith', 'Helicone', 'Humanloop', 'PromptBase']
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      description: 'Midjourney, DALL-E, Stable Diffusion, and creative AI',
      icon: Bot,
      category: 'Generative AI',
      protocols: ['REST API', 'WebSocket', 'gRPC', 'MQTT'],
      examples: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'RunwayML', 'ElevenLabs']
    },
    {
      id: 'speech-audio',
      name: 'Speech & Audio AI',
      description: 'ElevenLabs, AssemblyAI, Whisper, and audio processing',
      icon: MessageSquare,
      category: 'Audio Processing',
      protocols: ['REST API', 'WebSocket', 'WebRTC', 'gRPC', 'RTMP'],
      examples: ['ElevenLabs', 'AssemblyAI', 'Whisper API', 'Deepgram', 'Rev.ai']
    },
    {
      id: 'vision-ai',
      name: 'Computer Vision',
      description: 'Google Vision, AWS Rekognition, Azure Computer Vision',
      icon: Eye,
      category: 'Image Processing',
      protocols: ['REST API', 'gRPC', 'GraphQL', 'DICOM', 'RTSP'],
      examples: ['Google Vision', 'AWS Rekognition', 'Azure Computer Vision', 'Clarifai']
    },
    {
      id: 'document-ai',
      name: 'Document AI',
      description: 'AWS Textract, Google Document AI, form recognition',
      icon: FileText,
      category: 'Document Processing',
      protocols: ['REST API', 'gRPC', 'GraphQL', 'FHIR', 'HL7'],
      examples: ['AWS Textract', 'Google Document AI', 'Azure Form Recognizer', 'IDP.NET']
    },
    {
      id: 'enterprise-ai',
      name: 'Enterprise AI Platforms',
      description: 'IBM Watson, Microsoft AI, Google AI Platform',
      icon: Shield,
      category: 'Enterprise',
      protocols: ['REST API', 'gRPC', 'SOAP', 'GraphQL', 'Enterprise Bus'],
      examples: ['IBM Watson', 'Microsoft AI Platform', 'Google AI Platform', 'SAP AI']
    },
    {
      id: 'edge-ai',
      name: 'Edge AI Systems',
      description: 'NVIDIA Jetson, Intel OpenVINO, TensorFlow Lite',
      icon: Zap,
      category: 'Edge Computing',
      protocols: ['MQTT', 'CoAP', 'HTTP/2', 'gRPC', 'LoRaWAN', 'Zigbee'],
      examples: ['NVIDIA Jetson', 'Intel OpenVINO', 'TensorFlow Lite', 'Core ML']
    },
    {
      id: 'federated-learning',
      name: 'Federated Learning',
      description: 'Flower, PySyft, TensorFlow Federated systems',
      icon: Globe,
      category: 'Distributed Learning',
      protocols: ['gRPC', 'Federated Protocol', 'HTTP/2', 'Custom TCP'],
      examples: ['Flower', 'PySyft', 'TensorFlow Federated', 'FedML']
    },
    {
      id: 'ai-testing',
      name: 'AI Testing & Evaluation',
      description: 'Giskard, Deepchecks, Evidently AI, and validation tools',
      icon: CheckCircle,
      category: 'Quality Assurance',
      protocols: ['REST API', 'gRPC', 'Webhook', 'Apache Kafka'],
      examples: ['Giskard', 'Deepchecks', 'Evidently AI', 'Great Expectations']
    },
    {
      id: 'streaming-ai',
      name: 'Streaming AI',
      description: 'Kafka ML, Apache Flink, real-time AI processing',
      icon: Zap,
      category: 'Stream Processing',
      protocols: ['Apache Kafka', 'Apache Pulsar', 'Redis Streams', 'Apache Flink'],
      examples: ['Kafka ML', 'Apache Flink', 'Redis AI', 'Amazon Kinesis Analytics']
    },
    {
      id: 'low-code-ai',
      name: 'Low-Code AI',
      description: 'Power Platform AI, Google AppSheet, no-code AI tools',
      icon: Settings,
      category: 'No-Code/Low-Code',
      protocols: ['REST API', 'GraphQL', 'Power Platform', 'Google Apps Script'],
      examples: ['Power Platform AI', 'Google AppSheet', 'Zapier AI', 'Bubble AI']
    },
    {
      id: 'mcp-systems',
      name: 'MCP Systems',
      description: 'Model Context Protocol compatible systems and servers',
      icon: Database,
      category: 'Context Protocols',
      protocols: ['MCP', 'JSON-RPC', 'SSE', 'WebSocket'],
      examples: ['MCP Server', 'Context Provider', 'Tool Server', 'Resource Server']
    },
    {
      id: 'custom-apis',
      name: 'Custom APIs',
      description: 'REST APIs, GraphQL endpoints, and custom integrations',
      icon: Code,
      category: 'Custom Integration',
      protocols: ['REST', 'GraphQL', 'gRPC', 'WebSocket', 'SOAP', 'AsyncAPI'],
      examples: ['Internal API', 'Third-party Service', 'Microservice', 'Lambda Function']
    },
    {
      id: 'workflow-tools',
      name: 'Workflow Tools',
      description: 'Zapier, Make, n8n, and other automation platforms',
      icon: Zap,
      category: 'Automation',
      protocols: ['Webhook', 'REST API', 'Event-driven', 'Apache Airflow', 'Prefect'],
      examples: ['Zapier', 'Make.com', 'n8n', 'Microsoft Power Automate', 'Apache Airflow']
    }
  ];

  const connectedSystems = [
    {
      id: 'slack-support-bot',
      name: 'Slack Support Bot',
      type: 'Chatbot',
      status: 'active',
      health: 98,
      requests: 1247,
      lastSync: '2 min ago',
      endpoint: 'https://hooks.slack.com/services/...',
      dataTypes: ['Customer Messages', 'Support Tickets'],
      regions: ['US', 'EU'],
      policies: 3,
      violations: 0
    },
    {
      id: 'openai-assistant',
      name: 'Customer Service Assistant',
      type: 'AI Assistant',
      status: 'active',
      health: 95,
      requests: 892,
      lastSync: '5 min ago',
      endpoint: 'https://api.openai.com/v1/assistants/...',
      dataTypes: ['Customer Data', 'Product Info'],
      regions: ['US'],
      policies: 5,
      violations: 2
    },
    {
      id: 'langchain-agent',
      name: 'HR Analytics Agent',
      type: 'AI Agent',
      status: 'warning',
      health: 73,
      requests: 234,
      lastSync: '1 hour ago',
      endpoint: 'https://hr-agent.company.com/api',
      dataTypes: ['Employee Data', 'HR Metrics', 'PII'],
      regions: ['EU'],
      policies: 7,
      violations: 1
    },
    {
      id: 'mcp-context-server',
      name: 'Document Context Server',
      type: 'MCP System',
      status: 'active',
      health: 100,
      requests: 567,
      lastSync: '30 sec ago',
      endpoint: 'mcp://context-server.company.com',
      dataTypes: ['Documents', 'Knowledge Base'],
      regions: ['Global'],
      policies: 2,
      violations: 0
    },
    {
      id: 'custom-ai-api',
      name: 'Financial Analysis API',
      type: 'Custom API',
      status: 'maintenance',
      health: 0,
      requests: 0,
      lastSync: '2 hours ago',
      endpoint: 'https://api.company.com/ai/financial',
      dataTypes: ['Financial Data', 'Reports'],
      regions: ['US'],
      policies: 4,
      violations: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'warning': return 'secondary';
      case 'maintenance': return 'outline';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const renderConnectorSetup = (connectorType: any) => (
    <div className="space-y-6">
      <div className="text-center">
        <connectorType.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-lg font-medium mb-2">{connectorType.name}</h3>
        <p className="text-sm text-muted-foreground">{connectorType.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Connection Name</label>
          <Input placeholder={`My ${connectorType.name}`} />
        </div>

        <div>
          <label className="text-sm font-medium">Endpoint URL</label>
          <Input placeholder="https://api.example.com/v1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Protocol</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select protocol" />
              </SelectTrigger>
              <SelectContent>
                {connectorType.protocols.map((protocol: string) => (
                  <SelectItem key={protocol} value={protocol.toLowerCase().replace(' ', '-')}>
                    {protocol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Authentication</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Auth method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api-key">API Key</SelectItem>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">API Key / Token</label>
          <Input type="password" placeholder="Enter your API key or token" />
        </div>

        <div>
          <label className="text-sm font-medium">Data Types Processed</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              'PII', 'Customer Data', 'Employee Data', 'Financial Data', 'Health Data', 'Marketing Data',
              'PHI (HIPAA)', 'PCI Data', 'Biometric Data', 'Genetic Data', 'Location Data', 'Behavioral Data',
              'Voice Data', 'Video Data', 'Document Images', 'Medical Images', 'Financial Records',
              'Trade Secrets', 'IP', 'Research Data', 'Clinical Trial Data', 'Legal Documents'
            ].map((type) => (
              <Badge key={type} variant="outline" className="cursor-pointer hover:bg-accent">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Processing Regions</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              'US', 'EU', 'UK', 'Canada', 'Asia-Pacific', 'Global',
              'US-Gov (FedRAMP)', 'Germany', 'France', 'Switzerland', 'Japan',
              'Australia', 'Singapore', 'Hong Kong', 'India', 'Brazil',
              'On-Premises', 'Private Cloud', 'Hybrid Cloud', 'Edge Locations'
            ].map((region) => (
              <Badge key={region} variant="outline" className="cursor-pointer hover:bg-accent">
                {region}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Configuration (JSON)</label>
          <Textarea 
            placeholder={`{
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 1000
}`}
            className="font-mono text-sm"
            rows={6}
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 className="font-medium text-sm">Enable Governance Monitoring</h4>
            <p className="text-xs text-muted-foreground">Monitor this system for policy compliance</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Test Connection
          </Button>
          <Button className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Connector
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Universal Connector</h2>
          <p className="text-sm text-muted-foreground">
            Connect and govern all your AI systems from one platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Dialog open={showNewConnectorDialog} onOpenChange={setShowNewConnectorDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Connector
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Connector</DialogTitle>
                <DialogDescription>
                  Choose the type of AI system you want to connect
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="select-type" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="select-type">Select Type</TabsTrigger>
                  <TabsTrigger value="configure" disabled={!selectedConnector}>
                    Configure
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="select-type" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {connectorTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card 
                          key={type.id} 
                          className={`cursor-pointer hover:border-primary transition-colors ${
                            selectedConnector?.id === type.id ? 'border-primary bg-accent' : ''
                          }`}
                          onClick={() => setSelectedConnector(type)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              <div>
                                <CardTitle className="text-sm">{type.name}</CardTitle>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {type.category}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-xs mb-3">
                              {type.description}
                            </CardDescription>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground">Protocols:</p>
                                <div className="flex flex-wrap gap-1">
                                  {type.protocols.map((protocol) => (
                                    <Badge key={protocol} variant="secondary" className="text-xs">
                                      {protocol}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                                <p className="text-xs text-muted-foreground">
                                  {type.examples.slice(0, 2).join(', ')}...
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="configure">
                  {selectedConnector && renderConnectorSetup(selectedConnector)}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Plug className="w-4 h-4" />
              Connected Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedSystems.length}</div>
            <p className="text-xs text-muted-foreground">
              {connectedSystems.filter(s => s.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connectedSystems.reduce((sum, system) => sum + system.requests, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Policy Violations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {connectedSystems.reduce((sum, system) => sum + system.violations, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(connectedSystems.reduce((sum, system) => sum + system.health, 0) / connectedSystems.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average uptime
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="connections">Active Connections</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="marketplace">Connector Marketplace</TabsTrigger>
          <TabsTrigger value="industry">Industry Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Connected AI Systems
              </CardTitle>
              <CardDescription>
                Monitor and manage all your connected AI systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedSystems.map((system) => (
                  <div key={system.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{system.name}</h4>
                          <Badge variant={getStatusColor(system.status)}>
                            {system.status}
                          </Badge>
                          <Badge variant="outline">
                            {system.type}
                          </Badge>
                          <span className={`text-sm font-medium ${getHealthColor(system.health)}`}>
                            {system.health}% health
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>📡 {system.requests.toLocaleString()} requests</span>
                          <span>🌍 {system.regions.join(', ')}</span>
                          <span>🛡️ {system.policies} policies</span>
                          <span>⚠️ {system.violations} violations</span>
                          <span>🕒 {system.lastSync}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {system.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <code className="text-xs bg-accent px-2 py-1 rounded">{system.endpoint}</code>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {system.dataTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>System Health</span>
                        <span>{system.health}%</span>
                      </div>
                      <Progress value={system.health} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Real-time Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '14:23:45', system: 'Slack Support Bot', event: 'Message processed', status: 'success' },
                    { time: '14:23:42', system: 'OpenAI Assistant', event: 'API call completed', status: 'success' },
                    { time: '14:23:40', system: 'HR Analytics Agent', event: 'Policy violation detected', status: 'warning' },
                    { time: '14:23:38', system: 'MCP Context Server', event: 'Context retrieved', status: 'success' },
                    { time: '14:23:35', system: 'Financial Analysis API', event: 'Connection timeout', status: 'error' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-accent/50 rounded text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-green-600' : 
                        log.status === 'warning' ? 'bg-amber-600' : 'bg-red-600'
                      }`}></div>
                      <span className="text-muted-foreground font-mono text-xs">{log.time}</span>
                      <span className="font-medium">{log.system}</span>
                      <span className="text-muted-foreground">{log.event}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Policy Enforcement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { policy: 'Cross-Border Data Routing', enforced: 23, blocked: 3 },
                    { policy: 'PII Redaction', enforced: 89, blocked: 0 },
                    { policy: 'Model Access Control', enforced: 45, blocked: 2 },
                    { policy: 'Data Retention', enforced: 12, blocked: 0 }
                  ].map((policy, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{policy.policy}</span>
                        <div className="flex gap-3 text-xs">
                          <span className="text-green-600">{policy.enforced} enforced</span>
                          <span className="text-red-600">{policy.blocked} blocked</span>
                        </div>
                      </div>
                      <Progress 
                        value={(policy.enforced / (policy.enforced + policy.blocked)) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Global Configuration
              </CardTitle>
              <CardDescription>
                Configure global settings for all connectors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Monitoring Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Enable real-time monitoring</label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Auto-retry failed connections</label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Policy enforcement alerts</label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Security Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Default encryption level</label>
                      <Select defaultValue="aes-256">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aes-128">AES-128</SelectItem>
                          <SelectItem value="aes-256">AES-256</SelectItem>
                          <SelectItem value="rsa-2048">RSA-2048</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Connection timeout (seconds)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Webhook Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Global webhook URL</label>
                    <Input placeholder="https://your-domain.com/webhook/ai-governance" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Webhook secret</label>
                    <Input type="password" placeholder="Enter webhook secret" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <IndustryConnectorGuide />
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Connector Marketplace
              </CardTitle>
              <CardDescription>
                Pre-built connectors for popular AI platforms and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  // Core AI Platforms
                  { name: 'OpenAI Platform', category: 'AI Assistant', status: 'available', installs: '2.1k' },
                  { name: 'Anthropic Claude', category: 'AI Assistant', status: 'available', installs: '1.8k' },
                  { name: 'Google Gemini', category: 'AI Assistant', status: 'available', installs: '1.2k' },
                  { name: 'Microsoft Copilot', category: 'AI Assistant', status: 'beta', installs: '634' },
                  
                  // ML/AI Platforms
                  { name: 'AWS SageMaker', category: 'ML Platform', status: 'available', installs: '1.5k' },
                  { name: 'Google Vertex AI', category: 'ML Platform', status: 'available', installs: '1.1k' },
                  { name: 'Azure Machine Learning', category: 'ML Platform', status: 'available', installs: '987' },
                  { name: 'Databricks', category: 'ML Platform', status: 'available', installs: '743' },
                  { name: 'MLflow', category: 'ML Ops', status: 'available', installs: '865' },
                  
                  // Vector Databases
                  { name: 'Pinecone', category: 'Vector DB', status: 'available', installs: '1.4k' },
                  { name: 'Weaviate', category: 'Vector DB', status: 'available', installs: '892' },
                  { name: 'Chroma', category: 'Vector DB', status: 'available', installs: '756' },
                  { name: 'Qdrant', category: 'Vector DB', status: 'available', installs: '623' },
                  { name: 'Milvus', category: 'Vector DB', status: 'beta', installs: '445' },
                  
                  // Development & Frameworks
                  { name: 'Hugging Face', category: 'Model Hub', status: 'available', installs: '2.3k' },
                  { name: 'LangChain Hub', category: 'AI Agent', status: 'available', installs: '1.8k' },
                  { name: 'TensorFlow Serving', category: 'Framework', status: 'available', installs: '1.2k' },
                  { name: 'PyTorch Hub', category: 'Framework', status: 'available', installs: '1.1k' },
                  { name: 'Jupyter Hub', category: 'Development', status: 'available', installs: '967' },
                  
                  // Observability & Monitoring
                  { name: 'Weights & Biases', category: 'Monitoring', status: 'available', installs: '1.3k' },
                  { name: 'Neptune AI', category: 'Monitoring', status: 'available', installs: '678' },
                  { name: 'Comet ML', category: 'Monitoring', status: 'available', installs: '543' },
                  { name: 'TensorBoard', category: 'Monitoring', status: 'available', installs: '1.9k' },
                  
                  // Prompt Engineering
                  { name: 'LangSmith', category: 'Prompt Tools', status: 'available', installs: '892' },
                  { name: 'PromptLayer', category: 'Prompt Tools', status: 'available', installs: '734' },
                  { name: 'Helicone', category: 'Prompt Tools', status: 'beta', installs: '456' },
                  { name: 'Humanloop', category: 'Prompt Tools', status: 'available', installs: '623' },
                  
                  // Content Generation
                  { name: 'Midjourney API', category: 'Content Gen', status: 'beta', installs: '1.1k' },
                  { name: 'Stable Diffusion', category: 'Content Gen', status: 'available', installs: '987' },
                  { name: 'RunwayML', category: 'Content Gen', status: 'available', installs: '765' },
                  { name: 'DALL-E API', category: 'Content Gen', status: 'available', installs: '1.4k' },
                  
                  // Speech & Audio
                  { name: 'ElevenLabs', category: 'Speech AI', status: 'available', installs: '1.2k' },
                  { name: 'AssemblyAI', category: 'Speech AI', status: 'available', installs: '945' },
                  { name: 'Deepgram', category: 'Speech AI', status: 'available', installs: '723' },
                  { name: 'Whisper API', category: 'Speech AI', status: 'available', installs: '1.5k' },
                  
                  // Vision AI
                  { name: 'Google Vision API', category: 'Vision AI', status: 'available', installs: '1.6k' },
                  { name: 'AWS Rekognition', category: 'Vision AI', status: 'available', installs: '1.3k' },
                  { name: 'Azure Computer Vision', category: 'Vision AI', status: 'available', installs: '1.1k' },
                  { name: 'Clarifai', category: 'Vision AI', status: 'available', installs: '834' },
                  
                  // Document AI
                  { name: 'AWS Textract', category: 'Document AI', status: 'available', installs: '945' },
                  { name: 'Google Document AI', category: 'Document AI', status: 'available', installs: '723' },
                  { name: 'Azure Form Recognizer', category: 'Document AI', status: 'available', installs: '678' },
                  
                  // Enterprise AI
                  { name: 'IBM Watson', category: 'Enterprise AI', status: 'available', installs: '876' },
                  { name: 'Microsoft AI Platform', category: 'Enterprise AI', status: 'available', installs: '1.2k' },
                  { name: 'Google AI Platform', category: 'Enterprise AI', status: 'available', installs: '945' },
                  { name: 'SAP AI Core', category: 'Enterprise AI', status: 'beta', installs: '432' },
                  
                  // Edge AI
                  { name: 'NVIDIA Jetson', category: 'Edge AI', status: 'available', installs: '567' },
                  { name: 'Intel OpenVINO', category: 'Edge AI', status: 'available', installs: '456' },
                  { name: 'TensorFlow Lite', category: 'Edge AI', status: 'available', installs: '1.1k' },
                  { name: 'Core ML', category: 'Edge AI', status: 'available', installs: '789' },
                  
                  // Testing & Evaluation
                  { name: 'Giskard', category: 'AI Testing', status: 'available', installs: '345' },
                  { name: 'Deepchecks', category: 'AI Testing', status: 'available', installs: '278' },
                  { name: 'Evidently AI', category: 'AI Testing', status: 'beta', installs: '234' },
                  { name: 'Great Expectations', category: 'AI Testing', status: 'available', installs: '567' },
                  
                  // Streaming & Real-time
                  { name: 'Apache Kafka ML', category: 'Streaming', status: 'available', installs: '434' },
                  { name: 'Redis AI', category: 'Streaming', status: 'available', installs: '678' },
                  { name: 'Apache Flink ML', category: 'Streaming', status: 'beta', installs: '345' },
                  
                  // Low-Code/No-Code
                  { name: 'Power Platform AI', category: 'Low-Code', status: 'available', installs: '892' },
                  { name: 'Google AppSheet AI', category: 'Low-Code', status: 'beta', installs: '456' },
                  { name: 'Zapier AI Actions', category: 'Low-Code', status: 'available', installs: '1.3k' },
                  
                  // Chat Platforms
                  { name: 'Slack AI Apps', category: 'Chatbot', status: 'available', installs: '1.8k' },
                  { name: 'Microsoft Teams AI', category: 'Chatbot', status: 'available', installs: '1.5k' },
                  { name: 'Discord AI Bots', category: 'Chatbot', status: 'available', installs: '967' },
                  
                  // Cloud Platforms
                  { name: 'AWS Bedrock', category: 'Cloud Platform', status: 'available', installs: '1.4k' },
                  { name: 'Google AI Studio', category: 'Cloud Platform', status: 'available', installs: '1.1k' },
                  { name: 'Azure OpenAI', category: 'Cloud Platform', status: 'available', installs: '1.6k' }
                ].map((connector, index) => (
                  <Card key={index} className="hover:border-primary transition-colors cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{connector.name}</CardTitle>
                        <Badge variant={connector.status === 'beta' ? 'secondary' : 'default'}>
                          {connector.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        {connector.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {connector.installs} installs
                        </span>
                        <Button size="sm" variant="outline">
                          Install
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}