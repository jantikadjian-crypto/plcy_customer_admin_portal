import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Shield,
  Database,
  Eye,
  Settings,
  FileText,
  RefreshCw,
  Download,
  Package,
  FlaskConical,
  GitBranch,
  Layers,
  Lock,
  Globe,
  Server,
  TerminalSquare,
  BookOpen,
  UserCheck,
  Cpu,
  Tag,
  MapPin,
  Calendar,
  Info,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  RotateCcw,
} from 'lucide-react';

interface AISystemDrillDownProps {
  systemId: string;
  systemName: string;
  onBack: () => void;
}

// Per-system mock data factory
function buildSystemData(systemId: string, systemName: string) {
  const catalog: Record<string, any> = {
    'ai-001': {
      owner: 'Priya Sharma',
      team: 'Customer Experience',
      riskTier: 'High',
      purpose: 'Handles customer support queries via chat and email, triages tickets, and escalates to human agents.',
      status: 'Production',
      environment: 'prod-us-east-1',
      lastChange: '2026-06-01',
      users: 1247,
      provider: 'OpenAI',
      model: 'gpt-4o',
      modelVersion: '2024-11-20',
      ragSources: ['Zendesk KB', 'Product Docs v3.2', 'Policy Handbook'],
      dataClassification: 'PII – Customer',
      regions: ['us-east-1', 'eu-west-1'],
      deployedPacks: ['Customer Support AI Pack', 'OWASP LLM Top 10 Pack'],
      activeControls: 14,
      enforcementMode: 'Enforce',
      blockedLast7d: 37,
      requestsLast7d: 12400,
      testPlans: ['Prompt Injection Suite', 'PII Leakage Battery', 'Tone & Safety'],
      lastTestRun: '2026-06-05',
      failedScenarios: 3,
      openFindings: 2,
      residualRisk: 'Medium',
      acceptedRisks: 1,
      pendingApprovals: 4,
      pendingExceptions: 1,
      retentionDays: 365,
      frameworks: ['EU AI Act', 'ISO 42001', 'NIST AI RMF'],
    },
    'ai-002': {
      owner: 'Marcus Chen',
      team: 'People & HR',
      riskTier: 'High',
      purpose: 'Screens resumes, ranks candidates, and schedules interviews based on JD criteria.',
      status: 'Production',
      environment: 'prod-us-west-2',
      lastChange: '2026-05-28',
      users: 42,
      provider: 'Anthropic',
      model: 'claude-sonnet-4-6',
      modelVersion: '2025-04-14',
      ragSources: ['HRIS Data Lake', 'Job Description Library'],
      dataClassification: 'PII – Employee / Candidate',
      regions: ['us-west-2'],
      deployedPacks: ['EU AI Act High-Risk Pack', 'NIST AI RMF Pack'],
      activeControls: 18,
      enforcementMode: 'Enforce',
      blockedLast7d: 9,
      requestsLast7d: 3100,
      testPlans: ['Bias Detection Suite', 'Fairness Benchmark', 'Data Privacy Battery'],
      lastTestRun: '2026-06-03',
      failedScenarios: 1,
      openFindings: 4,
      residualRisk: 'High',
      acceptedRisks: 0,
      pendingApprovals: 2,
      pendingExceptions: 2,
      retentionDays: 730,
      frameworks: ['EU AI Act', 'GDPR', 'EEOC Guidelines'],
    },
    'ai-003': {
      owner: 'Lena Müller',
      team: 'Engineering Platform',
      riskTier: 'Medium',
      purpose: 'Reviews PRs for security issues, suggests refactors, detects secrets and license violations.',
      status: 'Production',
      environment: 'prod-eu-west-1',
      lastChange: '2026-05-20',
      users: 340,
      provider: 'Google',
      model: 'gemini-1.5-pro',
      modelVersion: '002',
      ragSources: ['Internal Codebase Index', 'CVE Database', 'License Registry'],
      dataClassification: 'Confidential – Source Code',
      regions: ['eu-west-1'],
      deployedPacks: ['Code Copilot Pack', 'OWASP LLM Top 10 Pack'],
      activeControls: 11,
      enforcementMode: 'Warn',
      blockedLast7d: 12,
      requestsLast7d: 8700,
      testPlans: ['Secret Detection Suite', 'License Check Battery', 'Insecure Code Tests'],
      lastTestRun: '2026-06-04',
      failedScenarios: 0,
      openFindings: 1,
      residualRisk: 'Low',
      acceptedRisks: 2,
      pendingApprovals: 0,
      pendingExceptions: 0,
      retentionDays: 180,
      frameworks: ['ISO 27001', 'NIST CSF', 'OWASP LLM Top 10'],
    },
  };

  return catalog[systemId] ?? {
    owner: 'Admin',
    team: 'Platform',
    riskTier: 'Medium',
    purpose: systemName,
    status: 'Production',
    environment: 'prod-us-east-1',
    lastChange: '2026-06-01',
    users: 100,
    provider: 'OpenAI',
    model: 'gpt-4o',
    modelVersion: '2024-11-20',
    ragSources: ['Internal KB'],
    dataClassification: 'Internal',
    regions: ['us-east-1'],
    deployedPacks: ['ISO 42001 Readiness Pack'],
    activeControls: 8,
    enforcementMode: 'Monitor',
    blockedLast7d: 5,
    requestsLast7d: 2000,
    testPlans: ['Default Evaluation Profile'],
    lastTestRun: '2026-06-01',
    failedScenarios: 0,
    openFindings: 0,
    residualRisk: 'Low',
    acceptedRisks: 0,
    pendingApprovals: 0,
    pendingExceptions: 0,
    retentionDays: 90,
    frameworks: ['ISO 42001'],
  };
}

function riskBadge(tier: string) {
  if (tier === 'High') return <Badge className="bg-red-100 text-red-700 border-red-300">{tier}</Badge>;
  if (tier === 'Medium') return <Badge className="bg-orange-100 text-orange-700 border-orange-300">{tier}</Badge>;
  return <Badge className="bg-green-100 text-green-700 border-green-300">{tier}</Badge>;
}

function statusBadge(status: string) {
  if (status === 'Production') return <Badge className="bg-green-100 text-green-700 border-green-300">{status}</Badge>;
  if (status === 'Staging') return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">{status}</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

function modeBadge(mode: string) {
  if (mode === 'Enforce') return <Badge className="bg-red-100 text-red-700 border-red-300">{mode}</Badge>;
  if (mode === 'Warn') return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">{mode}</Badge>;
  if (mode === 'Monitor') return <Badge className="bg-blue-100 text-blue-700 border-blue-300">{mode}</Badge>;
  return <Badge variant="outline">{mode}</Badge>;
}

export function AISystemDrillDown({ systemId, systemName, onBack }: AISystemDrillDownProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const d = buildSystemData(systemId, systemName);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
  };

  // Static mock traces
  const traces = [
    { id: 'tr-9921', ts: '2026-06-08 14:32:01', type: 'Chat Completion', policy: 'PII Redact', decision: 'Redacted', latency: '112ms', user: 'u-4421' },
    { id: 'tr-9920', ts: '2026-06-08 14:31:44', type: 'Chat Completion', policy: 'Prompt Injection Guard', decision: 'Blocked', latency: '38ms', user: 'u-8810' },
    { id: 'tr-9919', ts: '2026-06-08 14:31:20', type: 'Tool Call', policy: 'Tool Allowlist', decision: 'Allowed', latency: '55ms', user: 'u-4421' },
    { id: 'tr-9918', ts: '2026-06-08 14:30:58', type: 'Chat Completion', policy: 'Toxicity Filter', decision: 'Allowed', latency: '98ms', user: 'u-3302' },
    { id: 'tr-9917', ts: '2026-06-08 14:30:31', type: 'RAG Retrieval', policy: 'Source Allowlist', decision: 'Allowed', latency: '201ms', user: 'u-9954' },
    { id: 'tr-9916', ts: '2026-06-08 14:29:47', type: 'Chat Completion', policy: 'HITL Threshold', decision: 'Escalated', latency: '45ms', user: 'u-1177' },
  ];

  // Static mock evidence records
  const evidenceRecords = [
    { id: 'ev-001', framework: 'ISO 42001', control: '6.1.2 – Risk assessment', artifact: 'Risk Assessment Report Q2-2026', status: 'Collected', date: '2026-06-01' },
    { id: 'ev-002', framework: 'ISO 42001', control: '8.4 – Monitoring & measurement', artifact: 'Policy Enforcement Log (30d)', status: 'Collected', date: '2026-06-05' },
    { id: 'ev-003', framework: 'NIST AI RMF', control: 'MAP 1.6 – Transparency', artifact: 'Model Card v2.1', status: 'Collected', date: '2026-05-20' },
    { id: 'ev-004', framework: 'NIST AI RMF', control: 'MEASURE 2.3 – Bias evaluation', artifact: 'Evaluation Profile Run #44', status: 'Collected', date: '2026-06-04' },
    { id: 'ev-005', framework: 'EU AI Act', control: 'Art. 9 – Risk management', artifact: 'Threat Model v3', status: 'In Review', date: '2026-06-07' },
    { id: 'ev-006', framework: 'EU AI Act', control: 'Art. 13 – Transparency', artifact: 'User Disclosure Notice', status: 'Gap', date: '—' },
  ];

  // Mock findings
  const findings = [
    { id: 'FND-041', severity: 'High', title: 'PII detected in model output without redaction', source: 'Eval Run #44', status: 'Open', date: '2026-06-04' },
    { id: 'FND-038', severity: 'Medium', title: 'Prompt injection via user file upload vector', source: 'Red Team #12', status: 'Open', date: '2026-05-29' },
    { id: 'FND-031', severity: 'Low', title: 'Response latency spikes during RAG fallback', source: 'Monitoring', status: 'Accepted', date: '2026-05-15' },
    { id: 'FND-029', severity: 'High', title: 'Model version pinning not enforced', source: 'Audit', status: 'Resolved', date: '2026-05-10' },
  ];

  // Mock approvals
  const approvals = [
    { id: 'APR-201', type: 'HITL', description: 'Refund request >$500 – customer Sarah K.', requestedBy: 'Customer Support Bot', age: '14 min ago', priority: 'High' },
    { id: 'APR-200', type: 'HITL', description: 'Account closure confirmation', requestedBy: 'Customer Support Bot', age: '1 hr ago', priority: 'Medium' },
    { id: 'APR-198', type: 'Policy Exception', description: 'Exempt internal test user from PII redaction', requestedBy: 'eng-testing@company.com', age: '3 hr ago', priority: 'Low' },
    { id: 'APR-195', type: 'Change Approval', description: 'Upgrade model to gpt-4o-2025-03', requestedBy: 'Lena Müller', age: '1 day ago', priority: 'Medium' },
  ];

  // Mock test runs
  const testRuns = [
    { id: 'run-44', plan: 'Prompt Injection Suite', date: '2026-06-05', scenarios: 120, passed: 117, failed: 3, status: 'Completed' },
    { id: 'run-43', plan: 'PII Leakage Battery', date: '2026-06-03', scenarios: 80, passed: 80, failed: 0, status: 'Completed' },
    { id: 'run-42', plan: 'Tone & Safety', date: '2026-05-29', scenarios: 60, passed: 58, failed: 2, status: 'Completed' },
    { id: 'run-41', plan: 'Prompt Injection Suite', date: '2026-05-22', scenarios: 120, passed: 114, failed: 6, status: 'Completed' },
  ];

  const tabItems = [
    { value: 'overview', label: 'Overview', icon: Info },
    { value: 'data-models', label: 'Data & Models', icon: Database },
    { value: 'policies', label: 'Policies', icon: Package },
    { value: 'tests', label: 'Tests', icon: FlaskConical },
    { value: 'risks', label: 'Risks & Findings', icon: AlertTriangle },
    { value: 'approvals', label: 'Approvals', icon: CheckSquare },
    { value: 'traces', label: 'Traces', icon: TerminalSquare },
    { value: 'evidence', label: 'Evidence', icon: BookOpen },
    { value: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            AI Systems
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{systemName}</h2>
              {statusBadge(d.status)}
              {riskBadge(d.riskTier + ' Risk')}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{d.team} · {d.environment}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Shield className="w-3 h-3" /> Enforcement</div>
          <div className="font-semibold">{modeBadge(d.enforcementMode)}</div>
          <div className="text-xs text-muted-foreground mt-1">{d.activeControls} active controls</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Requests (7d)</div>
          <div className="font-semibold">{d.requestsLast7d.toLocaleString()}</div>
          <div className="text-xs text-red-600 mt-1">{d.blockedLast7d} blocked</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Open Findings</div>
          <div className="font-semibold text-orange-600">{d.openFindings}</div>
          <div className="text-xs text-muted-foreground mt-1">{d.acceptedRisks} accepted</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><CheckSquare className="w-3 h-3" /> Pending Approvals</div>
          <div className="font-semibold">{d.pendingApprovals}</div>
          <div className="text-xs text-muted-foreground mt-1">{d.pendingExceptions} exceptions</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap h-auto gap-1 p-1 bg-muted rounded-lg">
          {tabItems.map(t => {
            const Icon = t.icon;
            return (
              <TabsTrigger key={t.value} value={t.value} className="flex items-center gap-1.5 text-xs px-3 py-1.5">
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* ── OVERVIEW ─────────────────────────────────────────── */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Info className="w-4 h-4" />System Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Owner" value={d.owner} />
                <Row label="Team" value={d.team} />
                <Row label="Business Purpose" value={d.purpose} />
                <Row label="Risk Tier" value={riskBadge(d.riskTier + ' Risk')} />
                <Row label="Status" value={statusBadge(d.status)} />
                <Row label="Last Change" value={d.lastChange} />
                <Row label="Active Users" value={d.users.toLocaleString()} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4" />Action Centre</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {d.openFindings > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-700 text-xs">
                      {d.openFindings} open finding{d.openFindings > 1 ? 's' : ''} require attention.
                    </AlertDescription>
                  </Alert>
                )}
                {d.pendingApprovals > 0 && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <CheckSquare className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700 text-xs">
                      {d.pendingApprovals} approval{d.pendingApprovals > 1 ? 's' : ''} pending review.
                    </AlertDescription>
                  </Alert>
                )}
                {d.failedScenarios > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700 text-xs">
                      {d.failedScenarios} test scenario{d.failedScenarios > 1 ? 's' : ''} failed in last run.
                    </AlertDescription>
                  </Alert>
                )}
                {d.openFindings === 0 && d.pendingApprovals === 0 && d.failedScenarios === 0 && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700 text-xs">
                      No outstanding action items. System is healthy.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="pt-2 space-y-1">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Framework coverage</div>
                  {d.frameworks.map((f: string) => (
                    <div key={f} className="flex items-center justify-between text-xs py-1 border-b last:border-0">
                      <span>{f}</span>
                      <Badge variant="secondary" className="text-xs">Mapped</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Request Volume — Last 7 Days</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-20">
                {[1780, 1920, 1650, 1830, 1900, 1750, 1570].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-blue-500 rounded-sm" style={{ height: `${(v / 2000) * 64}px` }} />
                    <span className="text-xs text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                {d.requestsLast7d.toLocaleString()} total · {d.blockedLast7d} blocked ({((d.blockedLast7d / d.requestsLast7d) * 100).toFixed(2)}% block rate)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── DATA & MODELS ────────────────────────────────────── */}
        <TabsContent value="data-models" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Cpu className="w-4 h-4" />Model Configuration</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Provider" value={d.provider} />
                <Row label="Model" value={<span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{d.model}</span>} />
                <Row label="Version" value={<span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{d.modelVersion}</span>} />
                <Row label="Data Classification" value={<Badge variant="outline" className="text-xs">{d.dataClassification}</Badge>} />
                <Row label="Regions" value={d.regions.join(', ')} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Layers className="w-4 h-4" />RAG / Knowledge Sources</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {d.ragSources.map((s: string, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded text-sm">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-muted-foreground" />
                        <span>{s}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Globe className="w-4 h-4" />Data Flow Overview</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-2 p-3 border rounded bg-muted/50">
                  <Users className="w-4 h-4" />
                  <span>End Users</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center gap-2 p-3 border rounded bg-blue-50 border-blue-200">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>PLCY Policy Engine</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center gap-2 p-3 border rounded bg-muted/50">
                  <Layers className="w-4 h-4" />
                  <span>RAG Retrieval</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center gap-2 p-3 border rounded bg-muted/50">
                  <Server className="w-4 h-4" />
                  <span>{d.provider} / {d.model}</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center gap-2 p-3 border rounded bg-blue-50 border-blue-200">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Output Controls</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center gap-2 p-3 border rounded bg-muted/50">
                  <Users className="w-4 h-4" />
                  <span>Response</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── POLICIES ─────────────────────────────────────────── */}
        <TabsContent value="policies" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Enforcement Mode</div>
              <div>{modeBadge(d.enforcementMode)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Deployed Packs</div>
              <div className="font-semibold">{d.deployedPacks.length}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Active Controls</div>
              <div className="font-semibold">{d.activeControls}</div>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Package className="w-4 h-4" />Deployed Policy Packs</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {d.deployedPacks.map((pack: string, i: number) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-sm">{pack}</div>
                      <div className="text-xs text-muted-foreground mt-1">Deployed to this system · v2.1.0</div>
                    </div>
                    <div className="flex gap-2">
                      {modeBadge(d.enforcementMode)}
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <span>Controls: <strong className="text-foreground">8</strong></span>
                    <span>Tests: <strong className="text-foreground">24</strong></span>
                    <span>Evidence mappings: <strong className="text-foreground">12</strong></span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4" />Active Control Summary</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Control</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Triggers (7d)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'PII Detection & Redaction', cat: 'Output', mode: 'Enforce', triggers: 22 },
                    { name: 'Prompt Injection Guard', cat: 'Input', mode: 'Enforce', triggers: 15 },
                    { name: 'Toxicity Filter', cat: 'Input', mode: 'Enforce', triggers: 4 },
                    { name: 'Tool Allowlist', cat: 'Tool/Action', mode: 'Enforce', triggers: 0 },
                    { name: 'HITL Escalation Threshold', cat: 'Human Oversight', mode: 'Enforce', triggers: 6 },
                    { name: 'Rate Limiting', cat: 'Runtime', mode: 'Warn', triggers: 0 },
                  ].map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-sm">{c.name}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{c.cat}</Badge></TableCell>
                      <TableCell>{modeBadge(c.mode)}</TableCell>
                      <TableCell className="text-sm">{c.triggers > 0 ? <span className="text-orange-600 font-medium">{c.triggers}</span> : <span className="text-muted-foreground">0</span>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TESTS ────────────────────────────────────────────── */}
        <TabsContent value="tests" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Last Run</div>
              <div className="font-semibold">{d.lastTestRun}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Test Plans</div>
              <div className="font-semibold">{d.testPlans.length}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Failed Scenarios</div>
              <div className={`font-semibold ${d.failedScenarios > 0 ? 'text-red-600' : 'text-green-600'}`}>{d.failedScenarios}</div>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><FlaskConical className="w-4 h-4" />Evaluation Runs</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run</TableHead>
                    <TableHead>Evaluation Profile</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Scenarios</TableHead>
                    <TableHead>Passed</TableHead>
                    <TableHead>Failed</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testRuns.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell className="text-sm">{r.plan}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                      <TableCell className="text-sm">{r.scenarios}</TableCell>
                      <TableCell className="text-green-600 font-medium text-sm">{r.passed}</TableCell>
                      <TableCell className={r.failed > 0 ? 'text-red-600 font-medium text-sm' : 'text-muted-foreground text-sm'}>{r.failed}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{r.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Failed Scenarios — Latest Run</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { id: 'sc-112', name: 'Indirect prompt injection via uploaded PDF', severity: 'High' },
                { id: 'sc-089', name: 'PII leakage in multi-turn conversation context', severity: 'High' },
                { id: 'sc-064', name: 'Hallucinated refund policy amount', severity: 'Medium' },
              ].map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 border rounded text-sm">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
                    <span>{s.name}</span>
                  </div>
                  <Badge className={s.severity === 'High' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-orange-100 text-orange-700 border-orange-300'} variant="outline">{s.severity}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── RISKS & FINDINGS ─────────────────────────────────── */}
        <TabsContent value="risks" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Residual Risk</div>
              <div>{riskBadge(d.residualRisk)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Open Findings</div>
              <div className={`font-semibold ${d.openFindings > 0 ? 'text-orange-600' : 'text-green-600'}`}>{d.openFindings}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Accepted Risks</div>
              <div className="font-semibold">{d.acceptedRisks}</div>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Findings</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Finding</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {findings.map(f => (
                    <TableRow key={f.id}>
                      <TableCell className="font-mono text-xs">{f.id}</TableCell>
                      <TableCell className="text-sm">{f.title}</TableCell>
                      <TableCell>
                        <Badge className={f.severity === 'High' ? 'bg-red-100 text-red-700 border-red-300' : f.severity === 'Medium' ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-yellow-100 text-yellow-700 border-yellow-300'} variant="outline">{f.severity}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{f.source}</TableCell>
                      <TableCell>
                        <Badge variant={f.status === 'Open' ? 'destructive' : f.status === 'Accepted' ? 'outline' : 'secondary'} className="text-xs">{f.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{f.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Threat Model Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { label: 'Input Controls', count: 3, covered: 3 },
                  { label: 'Output Controls', count: 2, covered: 2 },
                  { label: 'Data Exposure', count: 2, covered: 1 },
                  { label: 'Excessive Agency', count: 1, covered: 1 },
                  { label: 'Supply Chain', count: 1, covered: 0 },
                  { label: 'Human Oversight', count: 1, covered: 1 },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded text-sm">
                    <span>{t.label}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(t.covered / t.count) * 100} className="w-20 h-1.5" />
                      <span className="text-xs text-muted-foreground">{t.covered}/{t.count} mitigated</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── APPROVALS ────────────────────────────────────────── */}
        <TabsContent value="approvals" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><UserCheck className="w-4 h-4" />Pending Approvals</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {approvals.length === 0 && (
                <div className="text-sm text-muted-foreground py-4 text-center">No pending approvals.</div>
              )}
              {approvals.map(a => (
                <div key={a.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{a.type}</Badge>
                        <Badge className={a.priority === 'High' ? 'bg-red-100 text-red-700 border-red-300' : a.priority === 'Medium' ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-slate-100 text-slate-600 border-slate-300'} variant="outline">{a.priority}</Badge>
                        <span className="font-mono text-xs text-muted-foreground">{a.id}</span>
                      </div>
                      <div className="text-sm font-medium">{a.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">Requested by {a.requestedBy} · {a.age}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">Deny</Button>
                      <Button size="sm" className="h-7 text-xs">Approve</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TRACES ───────────────────────────────────────────── */}
        <TabsContent value="traces" className="space-y-4 mt-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Traces are OTEL-compliant and immutable. PII in prompts is redacted per your retention policy. Retention: <strong>{d.retentionDays} days</strong>.
            </AlertDescription>
          </Alert>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><TerminalSquare className="w-4 h-4" />Recent Runtime Events</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trace ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Policy Evaluated</TableHead>
                    <TableHead>Decision</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {traces.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-xs">{t.id}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.ts}</TableCell>
                      <TableCell className="text-xs">{t.type}</TableCell>
                      <TableCell className="text-xs">{t.policy}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${
                          t.decision === 'Blocked' ? 'bg-red-100 text-red-700 border-red-300' :
                          t.decision === 'Redacted' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                          t.decision === 'Escalated' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                          'bg-green-100 text-green-700 border-green-300'
                        }`}>{t.decision}</Badge>
                      </TableCell>
                      <TableCell className="text-xs font-mono">{t.latency}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{t.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── EVIDENCE ─────────────────────────────────────────── */}
        <TabsContent value="evidence" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-3">
            {d.frameworks.map((f: string) => {
              const collected = evidenceRecords.filter(e => e.framework === f && e.status === 'Collected').length;
              const total = evidenceRecords.filter(e => e.framework === f).length;
              return (
                <Card key={f} className="p-4">
                  <div className="text-sm font-medium mb-2">{f}</div>
                  <Progress value={total > 0 ? (collected / total) * 100 : 0} className="h-2 mb-1" />
                  <div className="text-xs text-muted-foreground">{collected}/{total} evidence items collected</div>
                </Card>
              );
            })}
          </div>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><BookOpen className="w-4 h-4" />Evidence Records</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Framework</TableHead>
                    <TableHead>Control</TableHead>
                    <TableHead>Artifact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Collected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidenceRecords.map(e => (
                    <TableRow key={e.id}>
                      <TableCell><Badge variant="outline" className="text-xs">{e.framework}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{e.control}</TableCell>
                      <TableCell className="text-sm">{e.artifact}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${
                          e.status === 'Collected' ? 'bg-green-100 text-green-700 border-green-300' :
                          e.status === 'In Review' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                          'bg-red-100 text-red-700 border-red-300'
                        }`}>{e.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{e.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── SETTINGS ─────────────────────────────────────────── */}
        <TabsContent value="settings" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Users className="w-4 h-4" />Ownership</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="System Owner" value={d.owner} />
                <Row label="Team" value={d.team} />
                <Row label="Environment" value={<span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{d.environment}</span>} />
                <Row label="Regions" value={d.regions.join(', ')} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Lock className="w-4 h-4" />Retention & Audit</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Log Retention" value={`${d.retentionDays} days`} />
                <Row label="Trace Retention" value={`${d.retentionDays} days`} />
                <Row label="Evidence Retention" value="7 years" />
                <Row label="Audit Log" value={<Badge variant="secondary" className="text-xs">Immutable</Badge>} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><GitBranch className="w-4 h-4" />Integrations</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {['Slack (alerts)', 'Jira (findings)', 'Splunk (SIEM)', 'GitHub Actions (CI/CD)'].map((i, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                    <span>{i}</span>
                    <Badge variant="secondary" className="text-xs">Connected</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Danger Zone</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-red-200 text-red-700 hover:bg-red-50">
                  <RotateCcw className="w-4 h-4" />
                  Rollback to previous version
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-red-200 text-red-700 hover:bg-red-50">
                  <XCircle className="w-4 h-4" />
                  Disable system (Break Glass)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Small helper for two-column label/value rows
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
