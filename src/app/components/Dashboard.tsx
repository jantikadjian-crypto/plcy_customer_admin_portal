import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import {
  Shield,
  Bot,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Activity,
  Zap,
  Users,
  Award,
  FlaskConical,
  Lock,
  Eye,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  Circle,
  BarChart3,
  X,
  UserCheck,
  FileText,
} from 'lucide-react';
import { PLCYCloudSetup } from './PLCYCloudSetup';

interface DashboardProps {
  onNavigate?: (tab: string, options?: any) => void;
}

// ─── Mock live data ───────────────────────────────────────────────────────────

const AI_SYSTEMS = [
  {
    id: 'ai-001',
    name: 'Customer Support AI',
    type: 'LLM Agent',
    mode: 'Enforce',
    modeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    requestsWeek: 18400,
    blocked: 52,
    flagged: 38,
    openFindings: 2,
    pendingApprovals: 1,
    packs: ['OWASP LLM Top 10', 'Customer Support AI'],
    status: 'healthy',
  },
  {
    id: 'ai-002',
    name: 'HR Assistant Bot',
    type: 'RAG Agent',
    mode: 'HITL',
    modeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    requestsWeek: 4210,
    blocked: 14,
    flagged: 22,
    openFindings: 3,
    pendingApprovals: 4,
    packs: ['ISO 42001 Readiness'],
    status: 'warning',
  },
  {
    id: 'ai-003',
    name: 'Code Review Copilot',
    type: 'LLM',
    mode: 'Monitor',
    modeColor: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    requestsWeek: 9870,
    blocked: 0,
    flagged: 7,
    openFindings: 1,
    pendingApprovals: 0,
    packs: ['PII Detection & Redaction'],
    status: 'healthy',
  },
];

const DEPLOYED_PACKS = [
  {
    id: 'pack-owasp-llm-top10',
    name: 'OWASP LLM Top 10',
    version: 'v1.5.0',
    mode: 'Enforce',
    modeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    systems: 1,
    requestsWeek: 18400,
    blocked: 52,
    flagged: 38,
    lastUpdated: '2026-06-01',
    health: 'active',
  },
  {
    id: 'pack-customer-support',
    name: 'Customer Support AI Pack',
    version: 'v2.1.0',
    mode: 'Enforce',
    modeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    systems: 1,
    requestsWeek: 18400,
    blocked: 37,
    flagged: 6,
    lastUpdated: '2026-05-28',
    health: 'active',
  },
  {
    id: 'pack-pii-detection',
    name: 'PII Detection & Redaction',
    version: 'v2.1.0',
    mode: 'Block',
    modeColor: 'bg-red-500/10 text-red-600 border-red-500/20',
    systems: 2,
    requestsWeek: 14080,
    blocked: 91,
    flagged: 12,
    lastUpdated: '2026-06-05',
    health: 'active',
  },
];

const PENDING_APPROVALS = [
  {
    id: 'apr-001',
    title: 'Process refund — $2,400',
    system: 'Customer Support AI',
    requestedBy: 'AI Agent',
    risk: 'high',
    age: '14 min ago',
    action: 'Financial action above threshold',
  },
  {
    id: 'apr-002',
    title: 'Access employee records — HR DB',
    system: 'HR Assistant Bot',
    requestedBy: 'AI Agent',
    risk: 'critical',
    age: '32 min ago',
    action: 'Sensitive data access request',
  },
  {
    id: 'apr-003',
    title: 'Send external email to vendor',
    system: 'HR Assistant Bot',
    requestedBy: 'AI Agent',
    risk: 'medium',
    age: '1h ago',
    action: 'External communication',
  },
];

const TEST_RUNS = [
  {
    id: 'run-002',
    name: 'Weekly Comprehensive Test',
    system: 'Customer Support AI',
    status: 'completed',
    passed: 31,
    total: 35,
    failCount: 1,
    runAt: '2026-06-08T01:45Z',
    hasEvidence: true,
  },
  {
    id: 'run-001',
    name: 'Daily Security Scan',
    system: 'Customer Support AI',
    status: 'completed',
    passed: 24,
    total: 28,
    failCount: 2,
    runAt: '2026-06-09T08:15Z',
    hasEvidence: true,
  },
  {
    id: 'run-003',
    name: 'Hourly Quick Scan',
    system: 'Code Review Copilot',
    status: 'running',
    passed: 12,
    total: 15,
    failCount: 0,
    runAt: '2026-06-10T19:00Z',
    hasEvidence: false,
  },
];

const COMPLIANCE = [
  { framework: 'ISO 42001', score: 78, delta: +3, color: 'text-yellow-600', bg: 'bg-yellow-500', nav: 'reports' },
  { framework: 'OWASP LLM Top 10', score: 91, delta: +2, color: 'text-green-600', bg: 'bg-green-500', nav: 'security-testing' },
  { framework: 'NIST AI RMF', score: 85, delta: 0, color: 'text-blue-600', bg: 'bg-blue-500', nav: 'reports' },
  { framework: 'EU AI Act', score: 72, delta: -1, color: 'text-orange-600', bg: 'bg-orange-500', nav: 'reports' },
];

const ACTIVITY = [
  { icon: Package, color: 'text-blue-600 bg-blue-50', text: 'OWASP LLM Top 10 Pack updated to v1.5.0', time: '2h ago', nav: 'policy-packs' },
  { icon: CheckCircle, color: 'text-green-600 bg-green-50', text: 'Approval: HR data access approved by Sarah K.', time: '3h ago', nav: 'audit-logs' },
  { icon: Award, color: 'text-purple-600 bg-purple-50', text: 'Evidence record generated — Weekly Comprehensive Test', time: '5h ago', nav: 'evidence-vault' },
  { icon: AlertTriangle, color: 'text-red-600 bg-red-50', text: 'Finding FND-2026-042: Jailbreak attempt not blocked', time: '8h ago', nav: 'inventory' },
  { icon: Zap, color: 'text-orange-600 bg-orange-50', text: 'PII Detection & Redaction deployed to Code Review Copilot', time: '1d ago', nav: 'policy-packs' },
  { icon: UserCheck, color: 'text-indigo-600 bg-indigo-50', text: 'New HITL supervisor added: Marcus L.', time: '1d ago', nav: 'hitl' },
];

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionHeader({ title, sub, onViewAll }: { title: string; sub?: string; onViewAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <h2 className="font-semibold text-base">{title}</h2>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
      {onViewAll && (
        <Button variant="ghost" size="sm" className="gap-1 text-xs h-7" onClick={onViewAll}>
          View all <ChevronRight className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, string> = {
    critical: 'bg-red-500/10 text-red-600 border-red-500/20',
    high: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    low: 'bg-green-500/10 text-green-600 border-green-500/20',
  };
  return <Badge variant="outline" className={`text-xs ${map[risk] ?? ''}`}>{risk}</Badge>;
}

function StatusDot({ status }: { status: string }) {
  return (
    <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${status === 'healthy' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showBackupsAlert, setShowBackupsAlert] = useState(true);
  const [showAuditAlert, setShowAuditAlert] = useState(true);
  const [showCloudSetup, setShowCloudSetup] = useState(false);
  const [setupMode, setSetupMode] = useState<'backups' | 'audit'>('backups');
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);

  const pendingApprovals = PENDING_APPROVALS.filter(a => !approvedIds.includes(a.id) && !rejectedIds.includes(a.id));
  const totalRequests = AI_SYSTEMS.reduce((s, a) => s + a.requestsWeek, 0);
  const totalBlocked = AI_SYSTEMS.reduce((s, a) => s + a.blocked, 0);
  const totalFindings = AI_SYSTEMS.reduce((s, a) => s + a.openFindings, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Setup alerts */}
      {showBackupsAlert && (
        <Alert className="border-amber-300 bg-amber-50">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span className="text-amber-800"><strong>Backups not configured</strong> — risk level: High</span>
            <div className="flex gap-2 ml-4">
              <Button size="sm" variant="outline" onClick={() => { setSetupMode('backups'); setShowCloudSetup(true); }}>Docs</Button>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={() => { setSetupMode('backups'); setShowCloudSetup(true); }}>Enable via PLCY Cloud</Button>
              <button onClick={() => setShowBackupsAlert(false)}><X className="w-4 h-4 text-amber-600" /></button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {showAuditAlert && (
        <Alert className="border-amber-300 bg-amber-50">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span className="text-amber-800"><strong>Immutable audit log not configured</strong> — required for ISO 42001 §9.1</span>
            <div className="flex gap-2 ml-4">
              <Button size="sm" variant="outline" onClick={() => { setSetupMode('audit'); setShowCloudSetup(true); }}>Docs</Button>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={() => { setSetupMode('audit'); setShowCloudSetup(true); }}>Enable via PLCY Cloud</Button>
              <button onClick={() => setShowAuditAlert(false)}><X className="w-4 h-4 text-amber-600" /></button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Live stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'AI Systems', value: AI_SYSTEMS.length, sub: 'live & monitored', icon: Bot, color: 'text-blue-600', nav: 'inventory' },
          { label: 'Policy Packs', value: DEPLOYED_PACKS.length, sub: 'deployed & enforcing', icon: Package, color: 'text-purple-600', nav: 'policy-packs' },
          { label: 'Requests (7d)', value: totalRequests.toLocaleString(), sub: `${totalBlocked} blocked`, icon: Activity, color: 'text-green-600', nav: 'audit-logs' },
          { label: 'Pending Approvals', value: pendingApprovals.length, sub: 'require action', icon: UserCheck, color: pendingApprovals.length > 0 ? 'text-orange-600' : 'text-green-600', nav: 'approvals' },
          { label: 'Open Findings', value: totalFindings, sub: 'across all systems', icon: AlertTriangle, color: totalFindings > 0 ? 'text-red-600' : 'text-green-600', nav: 'inventory' },
        ].map(s => (
          <Card
            key={s.label}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate?.(s.nav)}
          >
            <CardContent className="pt-4 pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-2xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
                <s.icon className={`w-4 h-4 ${s.color} opacity-60 mt-0.5`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid — top row */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* AI Systems */}
        <div className="lg:col-span-2">
          <SectionHeader
            title="AI Systems"
            sub="Live enforcement status across your AI inventory"
            onViewAll={() => onNavigate?.('inventory')}
          />
          <div className="space-y-2">
            {AI_SYSTEMS.map(sys => (
              <Card
                key={sys.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate?.('inventory')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusDot status={sys.status} />
                        <span className="font-medium text-sm">{sys.name}</span>
                        <Badge variant="outline" className="text-xs">{sys.type}</Badge>
                        <Badge variant="outline" className={`text-xs ${sys.modeColor}`}>{sys.mode}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground flex-wrap">
                        <span>{sys.requestsWeek.toLocaleString()} req/7d</span>
                        <span className="text-red-600 font-medium">{sys.blocked} blocked</span>
                        <span className="text-yellow-600">{sys.flagged} flagged</span>
                        {sys.openFindings > 0 && <span className="text-orange-600">{sys.openFindings} findings</span>}
                        {sys.pendingApprovals > 0 && <span className="text-purple-600">{sys.pendingApprovals} pending approvals</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="flex gap-1 flex-wrap justify-end max-w-32 hidden md:flex">
                        {sys.packs.map(p => (
                          <Badge key={p} variant="secondary" className="text-[10px] px-1.5 py-0">{p}</Badge>
                        ))}
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div>
          <SectionHeader
            title="Pending Approvals"
            sub={`${pendingApprovals.length} action${pendingApprovals.length !== 1 ? 's' : ''} require review`}
            onViewAll={() => onNavigate?.('approvals')}
          />
          <div className="space-y-2">
            {pendingApprovals.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500 opacity-60" />
                  <p className="text-sm">All clear — no pending approvals</p>
                </CardContent>
              </Card>
            ) : pendingApprovals.map(apr => (
              <Card key={apr.id} className={apr.risk === 'critical' ? 'border-red-200' : apr.risk === 'high' ? 'border-orange-200' : ''}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{apr.title}</p>
                      <p className="text-xs text-muted-foreground">{apr.system} · {apr.age}</p>
                    </div>
                    <RiskBadge risk={apr.risk} />
                  </div>
                  <p className="text-xs text-muted-foreground">{apr.action}</p>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs gap-1 text-green-700 border-green-200 hover:bg-green-50"
                      onClick={e => { e.stopPropagation(); setApprovedIds(prev => [...prev, apr.id]); }}
                    >
                      <CheckCircle className="w-3 h-3" />Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs gap-1 text-red-700 border-red-200 hover:bg-red-50"
                      onClick={e => { e.stopPropagation(); setRejectedIds(prev => [...prev, apr.id]); }}
                    >
                      <XCircle className="w-3 h-3" />Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Deployed Policy Packs */}
        <div>
          <SectionHeader
            title="Deployed Policy Packs"
            sub="Active governance bundles and their runtime stats"
            onViewAll={() => onNavigate?.('policy-packs')}
          />
          <div className="space-y-2">
            {DEPLOYED_PACKS.map(pack => (
              <Card
                key={pack.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate?.('policy-packs')}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">{pack.name}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5">{pack.version}</Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Badge variant="outline" className={`text-[10px] px-1.5 ${pack.modeColor}`}>{pack.mode}</Badge>
                        <span className="text-xs text-muted-foreground">{pack.systems} system{pack.systems !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="text-muted-foreground">{pack.requestsWeek.toLocaleString()} req/7d</span>
                    <span className="text-red-600 font-medium">{pack.blocked} blocked</span>
                    <span className="text-yellow-600">{pack.flagged} flagged</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              className="w-full gap-2 text-sm"
              onClick={() => onNavigate?.('policy-packs')}
            >
              <Zap className="w-4 h-4" />Deploy a pack
            </Button>
          </div>
        </div>

        {/* Recent Test Runs */}
        <div>
          <SectionHeader
            title="Recent Test Runs"
            sub="Security & compliance test activity"
            onViewAll={() => onNavigate?.('security-testing')}
          />
          <div className="space-y-2">
            {TEST_RUNS.map(run => {
              const passRate = Math.round((run.passed / run.total) * 100);
              return (
                <Card
                  key={run.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate?.('security-testing')}
                >
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {run.status === 'running'
                            ? <Activity className="w-3 h-3 text-blue-500 animate-pulse" />
                            : run.failCount > 0
                              ? <AlertTriangle className="w-3 h-3 text-yellow-500" />
                              : <CheckCircle className="w-3 h-3 text-green-500" />}
                          <span className="text-sm font-medium">{run.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{run.system} · {new Date(run.runAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ${passRate >= 90 ? 'text-green-600' : passRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {run.status === 'running' ? '…' : `${passRate}%`}
                      </span>
                    </div>
                    <Progress value={run.status === 'running' ? (run.passed / run.total) * 100 : passRate} className="h-1.5" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{run.passed}/{run.total} passed{run.failCount > 0 ? ` · ${run.failCount} failed` : ''}</span>
                      {run.hasEvidence && (
                        <button
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                          onClick={e => { e.stopPropagation(); onNavigate?.('evidence-vault'); }}
                        >
                          <Award className="w-3 h-3" />Evidence
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Compliance Posture */}
        <div>
          <SectionHeader
            title="Compliance Posture"
            sub="Framework scores based on active controls & evidence"
            onViewAll={() => onNavigate?.('reports')}
          />
          <Card>
            <CardContent className="pt-4 space-y-4">
              {COMPLIANCE.map(c => (
                <div
                  key={c.framework}
                  className="cursor-pointer group"
                  onClick={() => onNavigate?.(c.nav)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{c.framework}</span>
                    <div className="flex items-center gap-1.5">
                      {c.delta !== 0 && (
                        <span className={`text-xs ${c.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {c.delta > 0 ? '+' : ''}{c.delta}%
                        </span>
                      )}
                      <span className={`text-sm font-bold ${c.color}`}>{c.score}%</span>
                    </div>
                  </div>
                  <Progress value={c.score} className="h-1.5" />
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full gap-2 text-sm mt-2"
                onClick={() => onNavigate?.('reports')}
              >
                <FileText className="w-4 h-4" />Generate compliance report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom row — activity feed + evidence vault preview */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Activity feed */}
        <div className="lg:col-span-2">
          <SectionHeader
            title="Recent Activity"
            sub="Governance events, policy changes, and interventions"
            onViewAll={() => onNavigate?.('audit-logs')}
          />
          <Card>
            <CardContent className="pt-4 divide-y">
              {ACTIVITY.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2.5 cursor-pointer hover:bg-muted/30 -mx-2 px-2 rounded transition-colors first:pt-0 last:pb-0"
                  onClick={() => onNavigate?.(item.nav)}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Evidence Vault preview */}
        <div>
          <SectionHeader
            title="Evidence Vault"
            sub="Audit-ready records for compliance submissions"
            onViewAll={() => onNavigate?.('evidence-vault')}
          />
          <Card>
            <CardContent className="pt-4 space-y-3">
              {[
                { id: 'ev-2026-001', title: 'OWASP LLM Top 10 — Weekly', clauses: '4/5', passRate: 89, status: 'valid' },
                { id: 'ev-2026-002', title: 'Daily Security Baseline', clauses: '3/3', passRate: 86, status: 'valid' },
                { id: 'ev-2026-003', title: 'ISO 42001 Readiness — HR Bot', clauses: '4/5', passRate: 86, status: 'valid' },
              ].map(rec => (
                <div
                  key={rec.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg border hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => onNavigate?.('evidence-vault')}
                >
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{rec.title}</p>
                    <p className="text-[10px] text-muted-foreground">ISO clauses {rec.clauses} · {rec.passRate}% pass</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20 shrink-0">Valid</Badge>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full gap-2 text-sm"
                onClick={() => onNavigate?.('evidence-vault')}
              >
                <Award className="w-4 h-4" />View all evidence records
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {showCloudSetup && (
        <PLCYCloudSetup
          mode={setupMode}
          onClose={() => setShowCloudSetup(false)}
          onComplete={() => {
            if (setupMode === 'backups') setShowBackupsAlert(false);
            else setShowAuditAlert(false);
          }}
        />
      )}
    </div>
  );
}
