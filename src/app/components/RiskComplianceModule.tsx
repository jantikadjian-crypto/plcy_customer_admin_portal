import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Brain, 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Database,
  Eye,
  Scale,
  BarChart3,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { EUAIActModule } from './EUAIActModule';
import { SOC2Module } from './SOC2Module';
import { ISO27001Module } from './ISO27001Module';
import { GDPRModule } from './GDPRModule';
import { ISO42001Module } from './ISO42001Module';

export function RiskComplianceModule() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [showEUAIAct, setShowEUAIAct] = useState(false);
  const [showSOC2, setShowSOC2] = useState(false);
  const [showISO27001, setShowISO27001] = useState(false);
  const [showGDPR, setShowGDPR] = useState(false);
  const [showISO42001, setShowISO42001] = useState(false);

  // If any framework view is active, show it directly
  if (showEUAIAct) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setShowEUAIAct(false)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Risk & Compliance
        </Button>
        <EUAIActModule />
      </div>
    );
  }

  if (showSOC2) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setShowSOC2(false)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Risk & Compliance
        </Button>
        <SOC2Module />
      </div>
    );
  }

  if (showISO27001) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setShowISO27001(false)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Risk & Compliance
        </Button>
        <ISO27001Module />
      </div>
    );
  }

  if (showGDPR) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setShowGDPR(false)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Risk & Compliance
        </Button>
        <GDPRModule />
      </div>
    );
  }

  if (showISO42001) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setShowISO42001(false)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Risk & Compliance
        </Button>
        <ISO42001Module />
      </div>
    );
  }

  const modelRegistry = [
    {
      id: 'gpt-4-customer-service',
      name: 'GPT-4 Customer Service',
      version: '2.1.0',
      provider: 'OpenAI',
      purpose: 'Customer support automation and ticket classification',
      status: 'production',
      riskScore: 2.3,
      lastEvaluation: '2024-01-20',
      dataTypes: ['Customer Messages', 'Support Tickets'],
      biasScore: 0.12,
      robustnessScore: 0.89,
      privacyScore: 0.95
    },
    {
      id: 'claude-hr-analytics',
      name: 'Claude HR Analytics',
      version: '1.0.3',
      provider: 'Anthropic',
      purpose: 'Employee performance analysis and insights',
      status: 'testing',
      riskScore: 4.1,
      lastEvaluation: '2024-01-25',
      dataTypes: ['Employee Data', 'Performance Metrics', 'PII'],
      biasScore: 0.28,
      robustnessScore: 0.76,
      privacyScore: 0.82
    },
    {
      id: 'azure-openai-legal',
      name: 'Azure OpenAI Legal',
      version: '1.5.2',
      provider: 'Microsoft',
      purpose: 'Legal document review and contract analysis',
      status: 'development',
      riskScore: 5.2,
      lastEvaluation: '2024-01-18',
      dataTypes: ['Legal Documents', 'Contracts', 'Confidential Data'],
      biasScore: 0.15,
      robustnessScore: 0.68,
      privacyScore: 0.91
    }
  ];

  const shadowAI = [
    {
      tool: 'Claude Pro',
      users: 23,
      department: 'Marketing',
      riskLevel: 'medium',
      dataExposure: 'Marketing content, customer data',
      discovered: '2024-01-28',
      status: 'under-review'
    },
    {
      tool: 'Perplexity AI',
      users: 7,
      department: 'Research',
      riskLevel: 'low',
      dataExposure: 'Public research data',
      discovered: '2024-01-25',
      status: 'approved'
    },
    {
      tool: 'Custom ChatGPT',
      users: 12,
      department: 'Engineering',
      riskLevel: 'high',
      dataExposure: 'Source code, technical documentation',
      discovered: '2024-01-30',
      status: 'blocked'
    }
  ];

  const evaluationSuites = [
    {
      id: 'bias-fairness',
      name: 'Bias & Fairness Assessment',
      description: 'Evaluate model outputs for demographic bias and fairness',
      testCases: 847,
      passRate: 92,
      lastRun: '2024-01-20',
      status: 'passed',
      findings: 3
    },
    {
      id: 'robustness',
      name: 'Adversarial Robustness',
      description: 'Test model resilience against adversarial inputs and prompt injection',
      testCases: 1230,
      passRate: 76,
      lastRun: '2024-01-22',
      status: 'warning',
      findings: 12
    },
    {
      id: 'privacy-leakage',
      name: 'Privacy Leakage Detection',
      description: 'Identify potential PII leakage in model outputs',
      testCases: 654,
      passRate: 98,
      lastRun: '2024-01-24',
      status: 'passed',
      findings: 1
    },
    {
      id: 'toxicity',
      name: 'Toxicity & Harm Prevention',
      description: 'Detect toxic, harmful, or inappropriate content generation',
      testCases: 2100,
      passRate: 89,
      lastRun: '2024-01-19',
      status: 'passed',
      findings: 5
    }
  ];

  const incidents = [
    {
      id: 'inc-001',
      title: 'Prompt Injection Detected',
      severity: 'high',
      model: 'GPT-4 Customer Service',
      description: 'Attempted system prompt override in customer chat',
      status: 'resolved',
      reportedDate: '2024-01-28',
      resolvedDate: '2024-01-28',
      mitigation: 'Enhanced input filtering deployed'
    },
    {
      id: 'inc-002',
      title: 'PII Exposure in Logs',
      severity: 'medium',
      model: 'Claude HR Analytics',
      description: 'Employee SSN found in debug logs',
      status: 'investigating',
      reportedDate: '2024-01-30',
      resolvedDate: null,
      mitigation: 'Logs scrubbed, access restricted'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'default';
      case 'testing': return 'secondary';
      case 'development': return 'outline';
      case 'passed': return 'default';
      case 'warning': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 3) return 'text-green-600';
    if (riskScore <= 6) return 'text-amber-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Risk & Compliance</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive trust, risk and security management for AI technologies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Run Evaluation
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              Models Registered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              3 in production
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">
              +5% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Scale className="w-4 h-4" />
              EU AI Act
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">82%</div>
            <p className="text-xs text-muted-foreground">
              Compliance score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">
              High priority
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">Model Registry</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="shadow">Shadow AI</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Compliance Overview
                </CardTitle>
                <CardDescription>
                  Aggregate compliance across all frameworks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <button
                  onClick={() => setShowEUAIAct(true)}
                  className="w-full space-y-2 text-left hover:bg-accent/50 p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      EU AI Act
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </span>
                    <span className="text-blue-600">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </button>
                <button
                  onClick={() => setShowSOC2(true)}
                  className="w-full space-y-2 text-left hover:bg-accent/50 p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      SOC 2
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </span>
                    <span className="text-green-600">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </button>
                <button
                  onClick={() => setShowISO27001(true)}
                  className="w-full space-y-2 text-left hover:bg-accent/50 p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      ISO 27001
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </span>
                    <span className="text-green-600">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </button>
                <button
                  onClick={() => setShowGDPR(true)}
                  className="w-full space-y-2 text-left hover:bg-accent/50 p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      GDPR
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </span>
                    <span className="text-green-600">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </button>
                <button
                  onClick={() => setShowISO42001(true)}
                  className="w-full space-y-2 text-left hover:bg-accent/50 p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      ISO 42001
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </span>
                    <span className="text-green-600">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Risk Management Summary
                </CardTitle>
                <CardDescription>
                  Overall risk posture and mitigation status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">High-Risk Systems</div>
                      <div className="text-xs text-muted-foreground">Identified & documented</div>
                    </div>
                    <Badge variant="default">8 systems</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Shadow AI Tools</div>
                      <div className="text-xs text-muted-foreground">Detected & under review</div>
                    </div>
                    <Badge variant="secondary">3 tools</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Active Evaluations</div>
                      <div className="text-xs text-muted-foreground">Running test suites</div>
                    </div>
                    <Badge variant="outline">4 suites</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Model Registry
              </CardTitle>
              <CardDescription>
                Comprehensive catalog of AI models with risk assessments and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelRegistry.map((model) => (
                  <div key={model.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{model.name}</h4>
                          <Badge variant={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                          <span className={`text-sm font-medium ${getRiskColor(model.riskScore)}`}>
                            Risk: {model.riskScore}/10
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{model.purpose}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Version: {model.version}</span>
                          <span>Provider: {model.provider}</span>
                          <span>Last Eval: {model.lastEvaluation}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Bias Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={(1 - model.biasScore) * 100} className="h-2 flex-1" />
                          <span className="text-xs font-medium">{((1 - model.biasScore) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Robustness</p>
                        <div className="flex items-center gap-2">
                          <Progress value={model.robustnessScore * 100} className="h-2 flex-1" />
                          <span className="text-xs font-medium">{(model.robustnessScore * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Privacy</p>
                        <div className="flex items-center gap-2">
                          <Progress value={model.privacyScore * 100} className="h-2 flex-1" />
                          <span className="text-xs font-medium">{(model.privacyScore * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {model.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Evaluation Harness
              </CardTitle>
              <CardDescription>
                Automated testing suites for bias, robustness, privacy, and safety
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluationSuites.map((suite) => (
                  <div key={suite.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{suite.name}</h4>
                          <Badge variant={getStatusColor(suite.status)}>
                            {suite.status}
                          </Badge>
                          {suite.findings > 0 && (
                            <Badge variant="destructive">
                              {suite.findings} findings
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{suite.description}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Test Cases: {suite.testCases.toLocaleString()}</span>
                          <span>Pass Rate: {suite.passRate}%</span>
                          <span>Last Run: {suite.lastRun}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Progress value={suite.passRate} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{suite.passRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shadow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Shadow AI Discovery
              </CardTitle>
              <CardDescription>
                Detect and manage unauthorized AI tool usage across the organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shadowAI.map((tool, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{tool.tool}</h4>
                          <Badge variant={tool.riskLevel === 'high' ? 'destructive' : tool.riskLevel === 'medium' ? 'secondary' : 'outline'}>
                            {tool.riskLevel} risk
                          </Badge>
                          <Badge variant={tool.status === 'approved' ? 'default' : tool.status === 'blocked' ? 'destructive' : 'secondary'}>
                            {tool.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Users: {tool.users}</span>
                          <span>Department: {tool.department}</span>
                          <span>Discovered: {tool.discovered}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Data Exposure: {tool.dataExposure}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                        {tool.status === 'under-review' && (
                          <Button variant="destructive" size="sm">
                            Block
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                AI Security Incidents
              </CardTitle>
              <CardDescription>
                Track and manage AI-related security and compliance incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{incident.title}</h4>
                          <Badge variant={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                          <Badge variant={incident.status === 'resolved' ? 'default' : 'secondary'}>
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Model: {incident.model}</span>
                          <span>Reported: {incident.reportedDate}</span>
                          {incident.resolvedDate && <span>Resolved: {incident.resolvedDate}</span>}
                        </div>
                        {incident.mitigation && (
                          <p className="text-sm font-medium mt-2">
                            Mitigation: {incident.mitigation}
                          </p>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}