import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { AutomatedOWASPTesting } from './AutomatedOWASPTesting';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye,
  Lock,
  Zap,
  Users,
  Bot,
  Database,
  Network,
  Code,
  UserX,
  Brain,
  Clock,
  Target,
  Skull,
  Search,
  TrendingUp,
  FileX,
  Settings,
  Cog,
  GitBranch,
  UserCheck,
  Layers,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Calendar,
  Download,
  FileDown,
  FlaskConical,
  Activity
} from 'lucide-react';

export function ThreatModelingModule() {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [activeFramework, setActiveFramework] = useState('agent-threats');
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [lastTestRun, setLastTestRun] = useState('2024-12-09 14:32 UTC');
  const [testSchedule, setTestSchedule] = useState('weekly');

  // OWASP AI Agent Threat Model - Top 10 for Autonomous AI Agents
  const threatModel = [
    {
      id: 'T1',
      name: 'Agent Authorization & Control Hijacking',
      description: 'Attackers manipulate or bypass an AI agent\'s permission system, causing it to perform actions beyond its intended scope by altering permissions, exploiting role inheritance flaws, or taking over control systems.',
      severity: 'critical',
      likelihood: 'high',
      impact: 'critical',
      category: 'Access Control',
      icon: Lock,
      riskScore: 9.4,
      mitigationStatus: 'partial',
      mitigationProgress: 58,
      affectedSystems: 18,
      detections: 6,
      mitigations: [
        'Implement robust permission validation at every action',
        'Use cryptographic signatures for permission changes',
        'Deploy multi-factor authentication for agent control',
        'Monitor and alert on permission escalations',
        'Implement role-based access control with strict inheritance rules',
        'Regular audits of agent permission assignments'
      ],
      controls: ['CTRL-001', 'CTRL-034', 'CTRL-089'],
      lastIncident: '2024-12-20',
      trends: 'increasing',
      realWorldExample: 'Researchers demonstrated hijacking AI agents from Microsoft and Google with minimal user interaction to exfiltrate data and manipulate workflows'
    },
    {
      id: 'T2',
      name: 'Memory & Context Manipulation (Memory Poisoning)',
      description: 'Attackers inject false or misleading information into AI agent\'s short-term or long-term memory, corrupting the agent\'s decision-making processes and causing it to trust malicious actors or execute faulty commands over time.',
      severity: 'critical',
      likelihood: 'high',
      impact: 'critical',
      category: 'Data Integrity',
      icon: Database,
      riskScore: 9.1,
      mitigationStatus: 'partial',
      mitigationProgress: 62,
      affectedSystems: 15,
      detections: 8,
      mitigations: [
        'Implement memory content validation and integrity checks',
        'Use session isolation mechanisms to prevent cross-contamination',
        'Deploy robust authentication for all memory access operations',
        'Implement anomaly detection for memory patterns',
        'Regular memory sanitization and cleanup routines',
        'Maintain AI-generated memory snapshots for forensic analysis'
      ],
      controls: ['CTRL-002', 'CTRL-045', 'CTRL-078'],
      lastIncident: '2024-12-18',
      trends: 'increasing',
      realWorldExample: 'Poisoned memory can cause an agent to gradually change behavior, executing unsafe actions without apparent external triggers'
    },
    {
      id: 'T3',
      name: 'Tool Misuse & Exploitation',
      description: 'Attackers trick AI agents into abusing access to external tools and APIs through deceptive prompts, leading to unauthorized API calls, data exfiltration, system manipulation, or financial fraud.',
      severity: 'critical',
      likelihood: 'high',
      impact: 'critical',
      category: 'Execution',
      icon: Settings,
      riskScore: 9.2,
      mitigationStatus: 'implemented',
      mitigationProgress: 78,
      affectedSystems: 12,
      detections: 11,
      mitigations: [
        'Implement strict tool access verification and whitelisting',
        'Monitor and analyze tool usage patterns for anomalies',
        'Validate all agent instructions before tool execution',
        'Set clear operational boundaries for each tool',
        'Maintain comprehensive execution logs for audit trails',
        'Require human approval for high-risk tool operations'
      ],
      controls: ['CTRL-003', 'CTRL-023', 'CTRL-067'],
      lastIncident: '2024-12-22',
      trends: 'increasing',
      realWorldExample: 'OWASP has identified tool misuse as a major new threat where agents become weapons for attacking other systems'
    },
    {
      id: 'T4',
      name: 'Critical Systems Interaction',
      description: 'AI agents with access to critical infrastructure or sensitive operational systems can be compromised to manipulate industrial control systems, disrupt essential services, or compromise physical security.',
      severity: 'critical',
      likelihood: 'medium',
      impact: 'critical',
      category: 'Infrastructure',
      icon: Zap,
      riskScore: 9.0,
      mitigationStatus: 'partial',
      mitigationProgress: 55,
      affectedSystems: 8,
      detections: 3,
      mitigations: [
        'Implement air-gapped separation for critical systems',
        'Require multi-person approval for critical operations',
        'Deploy real-time monitoring with immediate alerts',
        'Use hardware-level safety interlocks',
        'Maintain manual override capabilities',
        'Regular penetration testing of critical system access'
      ],
      controls: ['CTRL-004', 'CTRL-056', 'CTRL-098'],
      lastIncident: '2024-12-15',
      trends: 'stable',
      realWorldExample: 'An agent controlling a power grid could be tricked into causing outages, or one with smart building access could compromise physical security'
    },
    {
      id: 'T5',
      name: 'Goal & Instruction Manipulation',
      description: 'Sophisticated attack where adversaries subtly alter an agent\'s core goals or instructions, causing it to pursue detrimental objectives while believing it operates correctly. Targets the agent\'s fundamental mission rather than single actions.',
      severity: 'critical',
      likelihood: 'medium',
      impact: 'critical',
      category: 'Behavioral Control',
      icon: Target,
      riskScore: 8.9,
      mitigationStatus: 'partial',
      mitigationProgress: 48,
      affectedSystems: 11,
      detections: 5,
      mitigations: [
        'Implement goal integrity verification systems',
        'Use cryptographic signing for goal definitions',
        'Monitor goal drift and deviation from baselines',
        'Implement secondary validation of agent objectives',
        'Regular goal alignment audits',
        'Immutable logging of all goal modifications'
      ],
      controls: ['CTRL-005', 'CTRL-087', 'CTRL-134'],
      lastIncident: '2024-12-19',
      trends: 'increasing',
      realWorldExample: 'Attackers manipulate agent understanding of core mission, causing harmful actions while the agent believes it\'s operating correctly'
    },
    {
      id: 'T6',
      name: 'Agent Untraceability & Lack of Forensics',
      description: 'The autonomous and adaptive nature of AI agents makes it difficult to trace actions and understand decision-making processes, hindering incident investigation and making it challenging to assign liability.',
      severity: 'high',
      likelihood: 'high',
      impact: 'high',
      category: 'Accountability',
      icon: FileX,
      riskScore: 8.5,
      mitigationStatus: 'implemented',
      mitigationProgress: 85,
      affectedSystems: 24,
      detections: 4,
      mitigations: [
        'Maintain comprehensive immutable audit logs',
        'Implement cryptographically signed action trails',
        'Record complete decision-making context',
        'Deploy real-time monitoring with full traceability',
        'Use blockchain for critical action recording',
        'Maintain detailed reasoning and rationale logs'
      ],
      controls: ['CTRL-006', 'CTRL-067', 'CTRL-189'],
      lastIncident: '2024-12-10',
      trends: 'decreasing',
      realWorldExample: 'Without proper logging, investigating security incidents becomes nearly impossible and liability cannot be established'
    },
    {
      id: 'T7',
      name: 'Supply Chain & Dependency Attacks',
      description: 'Vulnerabilities in third-party libraries, datasets, and pre-trained models can be exploited to compromise AI agents through malicious backdoors, poisoned training data, or compromised dependencies.',
      severity: 'high',
      likelihood: 'medium',
      impact: 'critical',
      category: 'Supply Chain',
      icon: GitBranch,
      riskScore: 8.7,
      mitigationStatus: 'partial',
      mitigationProgress: 64,
      affectedSystems: 19,
      detections: 7,
      mitigations: [
        'Maintain comprehensive Software Bill of Materials (SBOM)',
        'Verify cryptographic signatures of all dependencies',
        'Implement continuous vulnerability scanning',
        'Use only verified and trusted model sources',
        'Regular security audits of the entire supply chain',
        'Sandbox and test all third-party components'
      ],
      controls: ['CTRL-007', 'CTRL-145', 'CTRL-167'],
      lastIncident: '2024-12-14',
      trends: 'increasing',
      realWorldExample: 'Malicious actors can insert backdoors into widely-used ML libraries that are then incorporated into numerous AI agents'
    },
    {
      id: 'T8',
      name: 'Orchestration & Multi-Agent Exploitation',
      description: 'In systems with multiple interacting AI agents, attackers compromise one agent and use it to manipulate or deceive other agents, causing cascading failures through exploited trust and communication channels.',
      severity: 'high',
      likelihood: 'medium',
      impact: 'high',
      category: 'Multi-Agent Security',
      icon: Layers,
      riskScore: 8.3,
      mitigationStatus: 'partial',
      mitigationProgress: 59,
      affectedSystems: 14,
      detections: 6,
      mitigations: [
        'Implement zero-trust architecture between agents',
        'Use cryptographic verification for inter-agent communication',
        'Deploy behavioral anomaly detection for agent interactions',
        'Implement circuit breakers to prevent cascade failures',
        'Regular security audits of agent communication protocols',
        'Maintain isolation boundaries between agent groups'
      ],
      controls: ['CTRL-008', 'CTRL-098', 'CTRL-156'],
      lastIncident: '2024-12-17',
      trends: 'increasing',
      realWorldExample: 'A compromised agent can manipulate trust relationships to spread malicious behavior throughout a multi-agent system'
    },
    {
      id: 'T9',
      name: 'Overwhelming the Human-in-the-Loop',
      description: 'Attackers flood human operators with high volumes of alerts or requests, causing cognitive overload and fatigue. In this state, humans are more likely to approve malicious actions by mistake.',
      severity: 'high',
      likelihood: 'high',
      impact: 'high',
      category: 'Human Factors',
      icon: UserCheck,
      riskScore: 8.1,
      mitigationStatus: 'partial',
      mitigationProgress: 66,
      affectedSystems: 21,
      detections: 12,
      mitigations: [
        'Implement intelligent alert prioritization and filtering',
        'Use AI-assisted decision support for human reviewers',
        'Deploy dynamic intervention thresholds based on risk',
        'Implement fatigue detection and mandatory breaks',
        'Use hierarchical escalation for high-risk decisions',
        'Regular training on alert fatigue and manipulation tactics'
      ],
      controls: ['CTRL-009', 'CTRL-123', 'CTRL-178'],
      lastIncident: '2024-12-21',
      trends: 'increasing',
      realWorldExample: 'Also known as "Agent Checker Out-of-the-Loop" vulnerability where cognitive overload leads to approval of malicious actions'
    },
    {
      id: 'T10',
      name: 'Agent Alignment Faking',
      description: 'AI agents appear aligned with intended values and goals during testing and development, but underlying behavior is not truly aligned. This deceptive vulnerability allows agents to act in unintended ways once deployed.',
      severity: 'critical',
      likelihood: 'low',
      impact: 'critical',
      category: 'Behavioral Control',
      icon: Skull,
      riskScore: 8.4,
      mitigationStatus: 'partial',
      mitigationProgress: 42,
      affectedSystems: 9,
      detections: 2,
      mitigations: [
        'Implement continuous alignment monitoring in production',
        'Use diverse testing scenarios including adversarial cases',
        'Deploy behavioral consistency validation across contexts',
        'Implement interpretability and explainability tools',
        'Regular red team exercises with novel scenarios',
        'Use multiple validation methods for alignment verification'
      ],
      controls: ['CTRL-010', 'CTRL-234', 'CTRL-267'],
      lastIncident: '2024-12-08',
      trends: 'stable',
      realWorldExample: 'Agents may behave correctly during evaluation but exhibit harmful behaviors in production environments with different constraints'
    }
  ];

  // OWASP Top 10 LLM Application Vulnerabilities 2025
  const llmVulnerabilities = [
    {
      id: 'LLM01',
      name: 'Prompt Injection',
      description: 'User prompts alter the LLM behavior in unintended ways through direct or indirect manipulation',
      severity: 'critical',
      likelihood: 'high',
      impact: 'critical',
      category: 'Input Manipulation',
      icon: Target,
      riskScore: 9.5,
      mitigationStatus: 'partial',
      mitigationProgress: 55,
      affectedSystems: 28,
      detections: 23,
      mitigations: [
        'Constrain model behavior with specific instructions',
        'Define and validate expected output formats',
        'Implement input and output filtering',
        'Enforce privilege control and least privilege access',
        'Require human approval for high-risk actions',
        'Segregate and identify external content'
      ],
      controls: ['CTRL-101', 'CTRL-023', 'CTRL-078'],
      lastIncident: '2024-12-21',
      trends: 'increasing',
      attackScenarios: ['Direct injection via customer chatbot', 'Indirect injection through webpage content', 'Multimodal injection via images']
    },
    {
      id: 'LLM02',
      name: 'Sensitive Information Disclosure',
      description: 'LLMs may expose PII, financial details, proprietary algorithms, or confidential business data',
      severity: 'high',
      likelihood: 'medium',
      impact: 'high',
      category: 'Data Privacy',
      icon: Eye,
      riskScore: 8.1,
      mitigationStatus: 'implemented',
      mitigationProgress: 78,
      affectedSystems: 22,
      detections: 8,
      mitigations: [
        'Integrate data sanitization techniques',
        'Robust input validation',
        'Enforce strict access controls',
        'Utilize federated learning',
        'Incorporate differential privacy',
        'Educate users on safe LLM usage'
      ],
      controls: ['CTRL-102', 'CTRL-045', 'CTRL-089'],
      lastIncident: '2024-12-15',
      trends: 'stable',
      attackScenarios: ['Unintentional data exposure', 'Targeted prompt injection', 'Training data leakage']
    },
    {
      id: 'LLM03',
      name: 'Supply Chain Vulnerabilities',
      description: 'Vulnerabilities in training data, models, and deployment platforms affecting integrity',
      severity: 'high',
      likelihood: 'medium',
      impact: 'high',
      category: 'Supply Chain',
      icon: Network,
      riskScore: 8.3,
      mitigationStatus: 'partial',
      mitigationProgress: 62,
      affectedSystems: 18,
      detections: 5,
      mitigations: [
        'Carefully vet data sources and suppliers',
        'Apply vulnerability scanning and management',
        'Comprehensive AI Red Teaming and evaluations',
        'Maintain up-to-date Software Bill of Materials',
        'Use models from verifiable sources only',
        'Implement strict monitoring for collaborative development'
      ],
      controls: ['CTRL-103', 'CTRL-067', 'CTRL-156'],
      lastIncident: '2024-12-08',
      trends: 'increasing',
      attackScenarios: ['Vulnerable Python library', 'Direct model tampering', 'Compromised LoRA adapters']
    },
    {
      id: 'LLM04',
      name: 'Data and Model Poisoning',
      description: 'Manipulation of training data to introduce vulnerabilities, backdoors, or biases',
      severity: 'critical',
      likelihood: 'medium',
      impact: 'critical',
      category: 'Data Integrity',
      icon: Database,
      riskScore: 8.8,
      mitigationStatus: 'partial',
      mitigationProgress: 58,
      affectedSystems: 16,
      detections: 11,
      mitigations: [
        'Track data origins using ML-BOM tools',
        'Vet data vendors rigorously',
        'Implement strict sandboxing',
        'Use data version control (DVC)',
        'Test model robustness with red team campaigns',
        'Monitor training loss and analyze behavior'
      ],
      controls: ['CTRL-104', 'CTRL-089', 'CTRL-145'],
      lastIncident: '2024-12-12',
      trends: 'increasing',
      attackScenarios: ['Split-view data poisoning', 'Backdoor trigger insertion', 'Toxic data injection']
    },
    {
      id: 'LLM05',
      name: 'Improper Output Handling',
      description: 'Insufficient validation and sanitization of LLM outputs before downstream processing',
      severity: 'high',
      likelihood: 'high',
      impact: 'high',
      category: 'Output Security',
      icon: Code,
      riskScore: 8.4,
      mitigationStatus: 'implemented',
      mitigationProgress: 82,
      affectedSystems: 24,
      detections: 14,
      mitigations: [
        'Treat model as any other user with zero-trust',
        'Follow OWASP ASVS guidelines for validation',
        'Encode model output back to users',
        'Use parameterized queries for database operations',
        'Employ strict Content Security Policies',
        'Implement robust logging and monitoring'
      ],
      controls: ['CTRL-105', 'CTRL-023', 'CTRL-201'],
      lastIncident: '2024-12-18',
      trends: 'decreasing',
      attackScenarios: ['Direct shell execution', 'XSS via generated content', 'SQL injection through crafted queries']
    },
    {
      id: 'LLM06',
      name: 'Excessive Agency',
      description: 'LLM systems granted excessive functionality, permissions, or autonomy enabling damaging actions',
      severity: 'critical',
      likelihood: 'medium',
      impact: 'critical',
      category: 'Access Control',
      icon: Lock,
      riskScore: 9.1,
      mitigationStatus: 'partial',
      mitigationProgress: 48,
      affectedSystems: 19,
      detections: 9,
      mitigations: [
        'Minimize extensions to necessary only',
        'Limit extension functionality',
        'Avoid open-ended extensions',
        'Minimize extension permissions',
        'Execute extensions in user context',
        'Require user approval for high-impact actions'
      ],
      controls: ['CTRL-106', 'CTRL-034', 'CTRL-167'],
      lastIncident: '2024-12-20',
      trends: 'increasing',
      attackScenarios: ['Excessive functionality exploitation', 'Privilege escalation', 'Unauthorized autonomous actions']
    },
    {
      id: 'LLM07',
      name: 'System Prompt Leakage',
      description: 'Risk of system prompts containing sensitive information being discovered by attackers',
      severity: 'medium',
      likelihood: 'high',
      impact: 'medium',
      category: 'Information Disclosure',
      icon: FileX,
      riskScore: 6.8,
      mitigationStatus: 'implemented',
      mitigationProgress: 85,
      affectedSystems: 31,
      detections: 7,
      mitigations: [
        'Separate sensitive data from system prompts',
        'Avoid reliance on system prompts for strict behavior control',
        'Implement external guardrails',
        'Ensure security controls are enforced independently',
        'Use multiple agents for different privilege levels',
        'Regular prompt security audits'
      ],
      controls: ['CTRL-107', 'CTRL-089', 'CTRL-234'],
      lastIncident: '2024-12-16',
      trends: 'stable',
      attackScenarios: ['Credentials in system prompt', 'Internal rules exposure', 'Permission structure disclosure']
    },
    {
      id: 'LLM08',
      name: 'Vector and Embedding Weaknesses',
      description: 'Vulnerabilities in RAG systems and embedding generation, storage, or retrieval processes',
      severity: 'high',
      likelihood: 'medium',
      impact: 'high',
      category: 'RAG Security',
      icon: Brain,
      riskScore: 7.9,
      mitigationStatus: 'partial',
      mitigationProgress: 67,
      affectedSystems: 15,
      detections: 6,
      mitigations: [
        'Implement fine-grained access controls',
        'Data validation and source authentication',
        'Thorough review for data combination',
        'Maintain detailed immutable logs',
        'Permission-aware vector databases',
        'Monitor behavior alteration impacts'
      ],
      controls: ['CTRL-108', 'CTRL-145', 'CTRL-203'],
      lastIncident: '2024-12-14',
      trends: 'increasing',
      attackScenarios: ['Data poisoning in resume screening', 'Cross-context information leaks', 'Embedding inversion attacks']
    },
    {
      id: 'LLM09',
      name: 'Misinformation',
      description: 'LLMs producing false or misleading information that appears credible, including hallucinations',
      severity: 'high',
      likelihood: 'high',
      impact: 'medium',
      category: 'Information Quality',
      icon: AlertTriangle,
      riskScore: 7.4,
      mitigationStatus: 'partial',
      mitigationProgress: 61,
      affectedSystems: 26,
      detections: 18,
      mitigations: [
        'Use Retrieval-Augmented Generation (RAG)',
        'Enhance models with fine-tuning',
        'Cross-verification and human oversight',
        'Implement automatic validation mechanisms',
        'Clear risk communication to users',
        'Secure coding practices for AI outputs'
      ],
      controls: ['CTRL-109', 'CTRL-078', 'CTRL-189'],
      lastIncident: '2024-12-19',
      trends: 'stable',
      attackScenarios: ['Factual inaccuracies in legal context', 'Unsafe code generation', 'Medical misinformation']
    },
    {
      id: 'LLM10',
      name: 'Unbounded Consumption',
      description: 'Excessive and uncontrolled inferences leading to DoS, economic losses, and resource exploitation',
      severity: 'medium',
      likelihood: 'high',
      impact: 'medium',
      category: 'Resource Management',
      icon: Zap,
      riskScore: 6.9,
      mitigationStatus: 'implemented',
      mitigationProgress: 88,
      affectedSystems: 29,
      detections: 22,
      mitigations: [
        'Implement strict input validation',
        'Limit exposure of logits and logprobs',
        'Apply rate limiting and user quotas',
        'Monitor resource allocation dynamically',
        'Set timeouts and throttling',
        'Comprehensive logging and anomaly detection'
      ],
      controls: ['CTRL-110', 'CTRL-056', 'CTRL-098'],
      lastIncident: '2024-12-17',
      trends: 'decreasing',
      attackScenarios: ['Variable-length input flood', 'Denial of Wallet attacks', 'Model extraction via API']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getMitigationStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-600';
      case 'partial': return 'text-yellow-600';
      case 'planned': return 'text-blue-600';
      case 'not-started': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-3 h-3 text-red-600" />;
      case 'decreasing': return <TrendingUp className="w-3 h-3 text-green-600 rotate-180" />;
      case 'stable': return <div className="w-3 h-3 border border-gray-400 rounded-full" />;
      default: return null;
    }
  };

  // Get current active threat model
  const currentThreats = activeFramework === 'agent-threats' ? threatModel : llmVulnerabilities;
  
  const threatsByCategory = currentThreats.reduce((acc, threat) => {
    if (!acc[threat.category]) acc[threat.category] = [];
    acc[threat.category].push(threat);
    return acc;
  }, {} as Record<string, typeof currentThreats>);

  const averageRiskScore = currentThreats.reduce((sum, threat) => sum + threat.riskScore, 0) / currentThreats.length;
  const criticalThreats = currentThreats.filter(t => t.severity === 'critical').length;
  const highThreats = currentThreats.filter(t => t.severity === 'high').length;
  const totalDetections = currentThreats.reduce((sum, threat) => sum + threat.detections, 0);
  const totalAffectedSystems = new Set(currentThreats.flatMap(t => t.affectedSystems)).size;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Shield className="w-5 h-5" />
            AI Agent & LLM Threat Models
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive threat assessment for autonomous AI agents and LLM applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Threat Hunt
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Run Assessment
          </Button>
        </div>
      </div>

      {/* Framework Selection */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button 
          variant={activeFramework === 'agent-threats' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveFramework('agent-threats')}
        >
          AI Agent Threats (10)
        </Button>
        <Button 
          variant={activeFramework === 'llm-vulns' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveFramework('llm-vulns')}
        >
          LLM Top 10 (2025)
        </Button>
      </div>

      {/* Educational Banner for AI Agent Threats */}
      {activeFramework === 'agent-threats' && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTriangle className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            <strong>The New Frontier of AI Security:</strong> As AI graduates from predictive models to autonomous agents capable of executing tasks, 
            a critical set of unique vulnerabilities has emerged. These threats are distinct from traditional LLM vulnerabilities, 
            focusing on agents' ability to act, interact with systems, and operate with autonomy. Sources: OWASP, leading AI security researchers.
          </AlertDescription>
        </Alert>
      )}

      {/* Threat Landscape Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Average Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRiskScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {averageRiskScore >= 8 ? 'High risk environment' : averageRiskScore >= 6 ? 'Medium risk environment' : 'Lower risk environment'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Critical Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalThreats}</div>
            <p className="text-xs text-muted-foreground">
              {highThreats} high-severity threats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Active Detections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDetections}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4" />
              Affected Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAffectedSystems}</div>
            <p className="text-xs text-muted-foreground">
              Requiring protection
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="overview">Threat Overview</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="mitigations">Mitigations</TabsTrigger>
          <TabsTrigger value="automated-testing">
            <FlaskConical className="w-3 h-3 mr-2" />
            Automated Testing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {currentThreats.map((threat) => {
              const Icon = threat.icon;
              return (
                <Card 
                  key={threat.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedThreat(selectedThreat?.id === threat.id ? null : threat)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-accent rounded-lg">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base flex items-center gap-2">
                            {threat.name}
                            <Badge className={`${getSeverityColor(threat.severity)} text-xs`}>
                              {threat.severity}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {threat.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-lg font-bold">{threat.riskScore}</div>
                        {getTrendIcon(threat.trends)}
                      </div>
                    </div>
                  </CardHeader>

                  {selectedThreat?.id === threat.id && (
                    <CardContent className="border-t pt-4 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Threat Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Category:</span>
                              <Badge variant="outline">{threat.category}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Likelihood:</span>
                              <span className="capitalize">{threat.likelihood}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Impact:</span>
                              <span className="capitalize">{threat.impact}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Affected Systems:</span>
                              <span>{threat.affectedSystems}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Recent Detections:</span>
                              <span>{threat.detections}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Incident:</span>
                              <span>{threat.lastIncident}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Mitigation Status</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className={getMitigationStatusColor(threat.mitigationStatus)}>
                                  {threat.mitigationStatus === 'implemented' ? 'Implemented' : 
                                   threat.mitigationStatus === 'partial' ? 'Partially Implemented' : 
                                   'Not Started'}
                                </span>
                                <span>{threat.mitigationProgress}%</span>
                              </div>
                              <Progress value={threat.mitigationProgress} />
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-2">Linked Controls:</div>
                              <div className="flex flex-wrap gap-1">
                                {threat.controls.map((control) => (
                                  <Badge key={control} variant="secondary" className="text-xs">
                                    {control}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {threat.realWorldExample && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            Real-World Example
                          </h4>
                          <p className="text-sm text-orange-900">{threat.realWorldExample}</p>
                        </div>
                      )}

                      {threat.attackScenarios && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-red-600" />
                            Attack Scenarios
                          </h4>
                          <ul className="space-y-1">
                            {threat.attackScenarios.map((scenario, idx) => (
                              <li key={idx} className="text-sm text-red-900 flex items-start gap-2">
                                <span className="text-red-600 mt-1">•</span>
                                <span>{scenario}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Recommended Mitigations
                        </h4>
                        <ul className="space-y-2">
                          {threat.mitigations.map((mitigation, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{mitigation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-2" />
                          View Full Assessment
                        </Button>
                        <Button size="sm">
                          <Shield className="w-3 h-3 mr-2" />
                          Apply Controls
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {Object.entries(threatsByCategory).map(([category, threats]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{category}</span>
                  <Badge variant="secondary">{threats.length} threats</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {threats.map((threat) => (
                    <div 
                      key={threat.id} 
                      className="flex items-center justify-between p-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/70"
                      onClick={() => setSelectedThreat(threat)}
                    >
                      <div className="flex items-center gap-3">
                        <Badge className={`${getSeverityColor(threat.severity)} text-xs`}>
                          {threat.severity}
                        </Badge>
                        <span className="text-sm font-medium">{threat.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{threat.riskScore}</span>
                        {getTrendIcon(threat.trends)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mitigations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mitigation Progress Overview</CardTitle>
              <CardDescription>
                Track implementation status of security controls across all threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentThreats
                  .sort((a, b) => a.mitigationProgress - b.mitigationProgress)
                  .map((threat) => (
                    <div key={threat.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{threat.name}</span>
                          <Badge className={`${getSeverityColor(threat.severity)} text-xs`}>
                            {threat.severity}
                          </Badge>
                        </div>
                        <span className={`text-sm ${getMitigationStatusColor(threat.mitigationStatus)}`}>
                          {threat.mitigationProgress}%
                        </span>
                      </div>
                      <Progress value={threat.mitigationProgress} />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automated-testing" className="space-y-4">
          <AutomatedOWASPTesting />
        </TabsContent>
      </Tabs>
    </div>
  );
}