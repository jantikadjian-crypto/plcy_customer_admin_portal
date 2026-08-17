import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { 
  Shield,
  ShieldAlert,
  ShieldCheck,
  Play,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  Settings,
  Zap,
  Target,
  FileText,
  BarChart3,
  Activity,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Code,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface OWASPCategory {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  tests: TestCase[];
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface TestRun {
  id: string;
  name: string;
  workflowId?: string;
  workflowName?: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  schedule?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'on-demand';
  startedAt: string;
  completedAt?: string;
  duration: number;
  totalTests: number;
  passed: number;
  failed: number;
  warnings: number;
  score: number;
  categories: string[];
}

interface TestSchedule {
  id: string;
  name: string;
  workflowIds: string[];
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  enabled: boolean;
  categories: string[];
}

export function LLMSecurityTesting() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewTestDialog, setShowNewTestDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // OWASP LLM Top 10 Categories
  const owaspCategories: OWASPCategory[] = [
    {
      id: 'llm01',
      name: 'LLM01: Prompt Injection',
      description: 'Manipulating LLMs via crafted inputs to cause unintended actions',
      severity: 'critical',
      tests: [
        { id: 'llm01-1', name: 'Direct Prompt Injection', description: 'Test system prompts override', enabled: true },
        { id: 'llm01-2', name: 'Indirect Prompt Injection', description: 'Test external content injection', enabled: true },
        { id: 'llm01-3', name: 'Jailbreak Attempts', description: 'Test model constraint bypass', enabled: true },
      ]
    },
    {
      id: 'llm02',
      name: 'LLM02: Insecure Output Handling',
      description: 'Insufficient validation of LLM outputs leading to downstream risks',
      severity: 'high',
      tests: [
        { id: 'llm02-1', name: 'XSS in Output', description: 'Test for cross-site scripting', enabled: true },
        { id: 'llm02-2', name: 'Code Injection', description: 'Test for malicious code generation', enabled: true },
        { id: 'llm02-3', name: 'SQL Injection', description: 'Test for database query manipulation', enabled: true },
      ]
    },
    {
      id: 'llm03',
      name: 'LLM03: Training Data Poisoning',
      description: 'Tampering with training data or fine-tuning process',
      severity: 'high',
      tests: [
        { id: 'llm03-1', name: 'Data Source Validation', description: 'Test training data integrity', enabled: true },
        { id: 'llm03-2', name: 'Backdoor Detection', description: 'Test for hidden triggers', enabled: false },
      ]
    },
    {
      id: 'llm04',
      name: 'LLM04: Model Denial of Service',
      description: 'Causing excessive resource consumption or service degradation',
      severity: 'medium',
      tests: [
        { id: 'llm04-1', name: 'Token Exhaustion', description: 'Test max token handling', enabled: true },
        { id: 'llm04-2', name: 'Rate Limit Testing', description: 'Test rate limiting effectiveness', enabled: true },
        { id: 'llm04-3', name: 'Recursive Prompt Loops', description: 'Test infinite loop prevention', enabled: true },
      ]
    },
    {
      id: 'llm05',
      name: 'LLM05: Supply Chain Vulnerabilities',
      description: 'Risks from third-party components, datasets, or models',
      severity: 'high',
      tests: [
        { id: 'llm05-1', name: 'Dependency Scanning', description: 'Test third-party component security', enabled: true },
        { id: 'llm05-2', name: 'Model Provenance', description: 'Verify model source authenticity', enabled: true },
      ]
    },
    {
      id: 'llm06',
      name: 'LLM06: Sensitive Information Disclosure',
      description: 'Revealing confidential data through LLM responses',
      severity: 'critical',
      tests: [
        { id: 'llm06-1', name: 'PII Leakage', description: 'Test for personal data exposure', enabled: true },
        { id: 'llm06-2', name: 'API Key Exposure', description: 'Test for credential leakage', enabled: true },
        { id: 'llm06-3', name: 'Training Data Extraction', description: 'Test memorization attacks', enabled: true },
        { id: 'llm06-4', name: 'Context Window Leakage', description: 'Test cross-conversation data leak', enabled: true },
      ]
    },
    {
      id: 'llm07',
      name: 'LLM07: Insecure Plugin Design',
      description: 'Vulnerabilities in LLM plugins/extensions',
      severity: 'high',
      tests: [
        { id: 'llm07-1', name: 'Plugin Input Validation', description: 'Test plugin parameter handling', enabled: true },
        { id: 'llm07-2', name: 'Plugin Authorization', description: 'Test access control bypasses', enabled: true },
      ]
    },
    {
      id: 'llm08',
      name: 'LLM08: Excessive Agency',
      description: 'LLM systems with too much autonomy causing unintended actions',
      severity: 'high',
      tests: [
        { id: 'llm08-1', name: 'Action Scope Testing', description: 'Test unauthorized action prevention', enabled: true },
        { id: 'llm08-2', name: 'HITL Bypass Attempts', description: 'Test approval mechanism enforcement', enabled: true },
        { id: 'llm08-3', name: 'Privilege Escalation', description: 'Test permission boundary violations', enabled: true },
      ]
    },
    {
      id: 'llm09',
      name: 'LLM09: Overreliance',
      description: 'Excessive dependency on LLM outputs without oversight',
      severity: 'medium',
      tests: [
        { id: 'llm09-1', name: 'Confidence Score Validation', description: 'Test uncertainty handling', enabled: true },
        { id: 'llm09-2', name: 'Fact-Checking Mechanisms', description: 'Test output verification', enabled: true },
      ]
    },
    {
      id: 'llm10',
      name: 'LLM10: Model Theft',
      description: 'Unauthorized access or replication of proprietary models',
      severity: 'medium',
      tests: [
        { id: 'llm10-1', name: 'Model Extraction Prevention', description: 'Test query-based stealing', enabled: true },
        { id: 'llm10-2', name: 'API Rate Limiting', description: 'Test extraction rate limits', enabled: true },
      ]
    },
  ];

  // Mock test runs
  const [testRuns, setTestRuns] = useState<TestRun[]>([
    {
      id: 'run-001',
      name: 'Daily Security Scan',
      workflowId: 'wf-001',
      workflowName: 'Customer Support Agent',
      status: 'completed',
      schedule: 'daily',
      startedAt: '2025-01-09T08:00:00Z',
      completedAt: '2025-01-09T08:15:23Z',
      duration: 923000,
      totalTests: 28,
      passed: 24,
      failed: 2,
      warnings: 2,
      score: 86,
      categories: ['LLM01', 'LLM02', 'LLM06', 'LLM08']
    },
    {
      id: 'run-002',
      name: 'Weekly Comprehensive Test',
      status: 'completed',
      schedule: 'weekly',
      startedAt: '2025-01-08T00:00:00Z',
      completedAt: '2025-01-08T01:45:12Z',
      duration: 6312000,
      totalTests: 35,
      passed: 31,
      failed: 1,
      warnings: 3,
      score: 89,
      categories: ['LLM01', 'LLM02', 'LLM03', 'LLM04', 'LLM05', 'LLM06', 'LLM07', 'LLM08', 'LLM09', 'LLM10']
    },
    {
      id: 'run-003',
      name: 'Hourly Quick Scan',
      workflowId: 'wf-002',
      workflowName: 'Financial Advisor Agent',
      status: 'running',
      schedule: 'hourly',
      startedAt: '2025-01-09T14:00:00Z',
      duration: 180000,
      totalTests: 15,
      passed: 12,
      failed: 0,
      warnings: 1,
      score: 80,
      categories: ['LLM01', 'LLM06', 'LLM08']
    },
    {
      id: 'run-004',
      name: 'Monthly Audit Report',
      status: 'scheduled',
      schedule: 'monthly',
      startedAt: '2025-02-01T00:00:00Z',
      duration: 0,
      totalTests: 35,
      passed: 0,
      failed: 0,
      warnings: 0,
      score: 0,
      categories: ['LLM01', 'LLM02', 'LLM03', 'LLM04', 'LLM05', 'LLM06', 'LLM07', 'LLM08', 'LLM09', 'LLM10']
    },
  ]);

  // Mock test schedules
  const [testSchedules, setTestSchedules] = useState<TestSchedule[]>([
    {
      id: 'sched-001',
      name: 'Daily Security Baseline',
      workflowIds: ['wf-001', 'wf-002'],
      frequency: 'daily',
      nextRun: '2025-01-10T08:00:00Z',
      enabled: true,
      categories: ['LLM01', 'LLM02', 'LLM06', 'LLM08']
    },
    {
      id: 'sched-002',
      name: 'Hourly Critical Checks',
      workflowIds: ['wf-002', 'wf-004'],
      frequency: 'hourly',
      nextRun: '2025-01-09T15:00:00Z',
      enabled: true,
      categories: ['LLM01', 'LLM06']
    },
    {
      id: 'sched-003',
      name: 'Monthly Compliance Audit',
      workflowIds: ['wf-001', 'wf-002', 'wf-003', 'wf-004'],
      frequency: 'monthly',
      nextRun: '2025-02-01T00:00:00Z',
      enabled: true,
      categories: ['LLM01', 'LLM02', 'LLM03', 'LLM04', 'LLM05', 'LLM06', 'LLM07', 'LLM08', 'LLM09', 'LLM10']
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'scheduled': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const formatDuration = (ms: number) => {
    if (ms === 0) return '-';
    if (ms < 60000) return `${Math.floor(ms / 1000)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const handleRunTest = () => {
    toast.success('Security test started');
    setShowNewTestDialog(false);
  };

  const handleCreateSchedule = () => {
    toast.success('Test schedule created');
    setShowScheduleDialog(false);
  };

  const handleExportResults = (runId: string) => {
    toast.success('Exporting test results for auditors...');
  };

  const handleViewDetails = (runId: string) => {
    setSelectedRun(runId);
    setActiveTab('results');
  };

  // Calculate stats
  const completedRuns = testRuns.filter(r => r.status === 'completed');
  const averageScore = completedRuns.length > 0
    ? Math.round(completedRuns.reduce((sum, r) => sum + r.score, 0) / completedRuns.length)
    : 0;
  const totalTestsRun = completedRuns.reduce((sum, r) => sum + r.totalTests, 0);
  const activeSchedules = testSchedules.filter(s => s.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl">LLM Security Testing</h1>
          <p className="text-muted-foreground">
            OWASP LLM Top 10 security testing for compliance evidence and audit trails
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => setShowScheduleDialog(true)}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Tests
          </Button>
          <Button onClick={() => setShowNewTestDialog(true)}>
            <Play className="w-4 h-4 mr-2" />
            Run Test Now
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className={`text-3xl font-semibold ${getScoreColor(averageScore)}`}>
                  {averageScore}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Average across all tests
                </p>
              </div>
              <ShieldCheck className={`w-10 h-10 ${getScoreColor(averageScore)} opacity-50`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Schedules</p>
                <p className="text-3xl font-semibold">{activeSchedules}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Automated testing enabled
                </p>
              </div>
              <Calendar className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tests Run</p>
                <p className="text-3xl font-semibold">{totalTestsRun}</p>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% from last week
                </p>
              </div>
              <Activity className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Issues</p>
                <p className="text-3xl font-semibold text-red-600">
                  {testRuns.reduce((sum, r) => sum + r.failed, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Require immediate attention
                </p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">OWASP Tests</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Evidence</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Recent Test Runs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Test Runs</CardTitle>
              <CardDescription>Latest security testing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testRuns.slice(0, 5).map((run) => (
                  <Card key={run.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{run.name}</h4>
                            <Badge className={`border ${getStatusColor(run.status)}`}>
                              {run.status}
                            </Badge>
                            {run.schedule && (
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {run.schedule}
                              </Badge>
                            )}
                          </div>
                          {run.workflowName && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Workflow: {run.workflowName}
                            </p>
                          )}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{run.passed} passed</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span>{run.failed} failed</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              <span>{run.warnings} warnings</span>
                            </div>
                            <div className="text-muted-foreground">
                              Duration: {formatDuration(run.duration)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {run.status === 'completed' && (
                            <>
                              <div className="text-right mr-4">
                                <p className="text-xs text-muted-foreground">Score</p>
                                <p className={`text-2xl font-semibold ${getScoreColor(run.score)}`}>
                                  {run.score}%
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(run.id)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleExportResults(run.id)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {run.status === 'running' && (
                            <div className="flex items-center gap-2 text-blue-500">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span className="text-sm">Running...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* OWASP Categories Quick View */}
          <Card>
            <CardHeader>
              <CardTitle>OWASP LLM Top 10 Coverage</CardTitle>
              <CardDescription>Security testing across all vulnerability categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {owaspCategories.map((category) => {
                  const enabledTests = category.tests.filter(t => t.enabled).length;
                  const totalTests = category.tests.length;
                  
                  return (
                    <Card key={category.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`border text-xs ${getSeverityColor(category.severity)}`}>
                                {category.severity.toUpperCase()}
                              </Badge>
                              <h4 className="text-sm font-medium">{category.name}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-3">
                          <span className="text-muted-foreground">
                            {enabledTests}/{totalTests} tests enabled
                          </span>
                          <Button size="sm" variant="ghost" className="h-6 text-xs">
                            Configure
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OWASP Tests Tab */}
        <TabsContent value="tests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>OWASP LLM Top 10 Test Suite</CardTitle>
              <CardDescription>
                Configure security tests based on OWASP LLM Top 10 vulnerability categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {owaspCategories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{category.name}</h3>
                              <Badge className={`border ${getSeverityColor(category.severity)}`}>
                                {category.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Learn More
                          </Button>
                        </div>
                        <div className="space-y-2 pl-4 border-l-2">
                          {category.tests.map((test) => (
                            <div key={test.id} className="flex items-start gap-3 p-2 hover:bg-muted/30 rounded">
                              <Checkbox
                                id={test.id}
                                checked={test.enabled}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <Label htmlFor={test.id} className="font-medium cursor-pointer">
                                  {test.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {test.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Results Tab */}
        <TabsContent value="results" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Results History</CardTitle>
              <CardDescription>Detailed results from all security test runs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testRuns.filter(r => r.status === 'completed').map((run) => (
                  <Card key={run.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{run.name}</h4>
                            <Badge className={`border ${getStatusColor(run.status)}`}>
                              Score: {run.score}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {new Date(run.startedAt).toLocaleString()} â€¢ Duration: {formatDuration(run.duration)}
                          </p>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Tests</p>
                              <p className="text-lg font-semibold">{run.totalTests}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Passed</p>
                              <p className="text-lg font-semibold text-green-600">{run.passed}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Failed</p>
                              <p className="text-lg font-semibold text-red-600">{run.failed}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Warnings</p>
                              <p className="text-lg font-semibold text-yellow-600">{run.warnings}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {run.categories.map((cat) => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExportResults(run.id)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedules Tab */}
        <TabsContent value="schedules" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Test Schedules</CardTitle>
                  <CardDescription>Automated security testing schedules for continuous compliance</CardDescription>
                </div>
                <Button onClick={() => setShowScheduleDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testSchedules.map((schedule) => (
                  <Card key={schedule.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{schedule.name}</h4>
                            <Badge variant={schedule.enabled ? 'default' : 'secondary'}>
                              {schedule.enabled ? 'Active' : 'Disabled'}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {schedule.frequency}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Next run: {new Date(schedule.nextRun).toLocaleString()}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {schedule.categories.map((cat) => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-2" />
                            Run Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Evidence Tab */}
        <TabsContent value="compliance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Evidence & Audit Trails</CardTitle>
              <CardDescription>
                Security testing evidence for SOC2, ISO27001, and regulatory compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Card className="border border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Audit-Ready Evidence</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          All test results include timestamps, configurations, and detailed logs suitable for compliance audits.
                          Export reports in multiple formats for your auditors.
                        </p>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Compliance Package
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <h4 className="font-medium">SOC 2 Type II</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Continuous monitoring and testing evidence
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        View Evidence
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium">ISO 27001</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Information security testing records
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        View Evidence
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <h4 className="font-medium">Custom Reports</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Tailored compliance documentation
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Testing Schedule Evidence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <div>
                          <p className="font-medium">Hourly Testing</p>
                          <p className="text-sm text-muted-foreground">Critical security checks every hour</p>
                        </div>
                        <Badge variant="outline">âœ“ Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <div>
                          <p className="font-medium">Daily Testing</p>
                          <p className="text-sm text-muted-foreground">Comprehensive daily security scans</p>
                        </div>
                        <Badge variant="outline">âœ“ Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <div>
                          <p className="font-medium">Monthly Audits</p>
                          <p className="text-sm text-muted-foreground">Full OWASP LLM Top 10 audit</p>
                        </div>
                        <Badge variant="outline">âœ“ Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Run Test Dialog */}
      <Dialog open={showNewTestDialog} onOpenChange={setShowNewTestDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Run Security Test</DialogTitle>
            <DialogDescription>
              Execute OWASP LLM security tests on your AI workflows
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Test Name</Label>
              <Input placeholder="Enter test name" />
            </div>
            <div className="space-y-2">
              <Label>Target Workflow (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select workflow or test all" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workflows</SelectItem>
                  <SelectItem value="wf-001">Customer Support Agent</SelectItem>
                  <SelectItem value="wf-002">Financial Advisor Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Test Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {owaspCategories.slice(0, 6).map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox id={`test-${cat.id}`} defaultChecked />
                    <Label htmlFor={`test-${cat.id}`} className="text-sm cursor-pointer">
                      {cat.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTestDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRunTest}>
              <Play className="w-4 h-4 mr-2" />
              Run Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Security Tests</DialogTitle>
            <DialogDescription>
              Set up automated security testing for continuous compliance monitoring
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Schedule Name</Label>
              <Input placeholder="e.g., Daily Security Baseline" />
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Workflows</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select workflows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workflows</SelectItem>
                  <SelectItem value="wf-001">Customer Support Agent</SelectItem>
                  <SelectItem value="wf-002">Financial Advisor Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Test Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {owaspCategories.slice(0, 6).map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox id={`sched-${cat.id}`} defaultChecked />
                    <Label htmlFor={`sched-${cat.id}`} className="text-sm cursor-pointer">
                      {cat.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSchedule}>
              <Calendar className="w-4 h-4 mr-2" />
              Create Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
