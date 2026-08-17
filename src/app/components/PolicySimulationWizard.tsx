import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Zap,
  Eye,
  UserCheck,
  Wrench,
  Clock,
  TrendingDown,
  Info,
  Play,
  FlaskConical,
  Activity,
  FileText,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AISystem {
  id: string;
  name: string;
  provider: string;
  model: string;
  requestsLast7d: number;
  environment: string;
  riskTier: string;
}

interface FalsePositiveSample {
  id: string;
  input: string;
  control: string;
  reason: string;
  verdict: 'fp_likely' | 'fp_possible' | 'correct';
}

interface SimulationResult {
  totalRequests: number;
  blocked: number;
  redacted: number;
  escalated: number;
  toolsDenied: number;
  allowed: number;
  falsePositiveEstimate: number;
  fpSamples: FalsePositiveSample[];
  avgLatencyAddedMs: number;
  estimatedCostPerMonth: string;
  controlBreakdown: { control: string; triggered: number; action: string }[];
}

interface PolicySimulationWizardProps {
  pack: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDeploy: (system: AISystem, mode: string, configuration: any) => void;
}

// ── Mock AI systems ────────────────────────────────────────────────────────────

const AI_SYSTEMS: AISystem[] = [
  { id: 'ai-001', name: 'Customer Support Assistant', provider: 'OpenAI', model: 'gpt-4o', requestsLast7d: 12400, environment: 'prod-us-east-1', riskTier: 'High' },
  { id: 'ai-002', name: 'HR Recruitment Bot', provider: 'Anthropic', model: 'claude-sonnet-4-6', requestsLast7d: 3100, environment: 'prod-us-west-2', riskTier: 'High' },
  { id: 'ai-003', name: 'Code Review Agent', provider: 'Google', model: 'gemini-1.5-pro', requestsLast7d: 8700, environment: 'prod-eu-west-1', riskTier: 'Medium' },
  { id: 'ai-004', name: 'Financial Fraud Detection', provider: 'OpenAI', model: 'gpt-4o', requestsLast7d: 22100, environment: 'prod-us-east-1', riskTier: 'High' },
];

// ── Simulation engine (deterministic mock) ────────────────────────────────────

function runSimulation(system: AISystem, pack: any): SimulationResult {
  const base = system.requestsLast7d;
  const seed = system.id.charCodeAt(system.id.length - 1) + (pack.id?.length ?? 5);

  const blocked = Math.round(base * (0.002 + (seed % 4) * 0.001));
  const redacted = Math.round(base * (0.008 + (seed % 3) * 0.002));
  const escalated = Math.round(base * (0.001 + (seed % 2) * 0.0005));
  const toolsDenied = pack.topControls?.some((c: string) => c.toLowerCase().includes('tool')) ? Math.round(base * 0.002) : 0;
  const allowed = base - blocked - redacted - escalated - toolsDenied;
  const falsePositiveEstimate = Math.round((blocked + redacted) * (0.04 + (seed % 3) * 0.01));

  const fpSamples: FalsePositiveSample[] = [
    {
      id: 'fp-001',
      input: '"Please update my account email to john.doe@newcompany.com"',
      control: pack.topControls?.[0] ?? 'PII Detection',
      reason: 'Email address matched PII pattern — likely legitimate user request',
      verdict: 'fp_likely',
    },
    {
      id: 'fp-002',
      input: '"What is the refund policy for order #48291?"',
      control: pack.topControls?.[1] ?? 'Prompt Injection Shield',
      reason: 'Order number pattern triggered injection heuristic at 73% confidence',
      verdict: 'fp_possible',
    },
    {
      id: 'fp-003',
      input: '"Summarise the last 3 support tickets for this account"',
      control: pack.topControls?.[0] ?? 'PII Detection',
      reason: 'Blocked correctly — response contained customer name and phone number',
      verdict: 'correct',
    },
  ];

  const controlBreakdown = (pack.topControls ?? [pack.name]).slice(0, 5).map((control: string, i: number) => ({
    control,
    triggered: Math.round(base * (0.003 - i * 0.0003 + (seed % 3) * 0.0002)),
    action: ['Block', 'Redact', 'Escalate', 'Deny', 'Monitor'][i % 5],
  }));

  return {
    totalRequests: base,
    blocked,
    redacted,
    escalated,
    toolsDenied,
    allowed,
    falsePositiveEstimate,
    fpSamples,
    avgLatencyAddedMs: 8 + (seed % 6),
    estimatedCostPerMonth: `$${(base * 4 * 0.00002 * (1 + (seed % 4) * 0.1)).toFixed(2)}`,
    controlBreakdown,
  };
}

// ── Wizard steps ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'system', label: 'Select System' },
  { id: 'simulate', label: 'Simulate' },
  { id: 'review', label: 'Review Impact' },
  { id: 'mode', label: 'Choose Mode' },
  { id: 'confirm', label: 'Deploy' },
];

const MODES = [
  {
    id: 'monitor',
    label: 'Monitor only',
    description: 'Log all violations. No action taken. Zero user impact.',
    icon: Eye,
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    risk: 'Lowest risk',
  },
  {
    id: 'warn',
    label: 'Warn',
    description: 'Flag violations and log them. Allow request through.',
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-200',
    risk: 'Low risk',
  },
  {
    id: 'redact',
    label: 'Redact',
    description: 'Remove or mask sensitive content. Request proceeds with redactions.',
    icon: Shield,
    color: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-200',
    risk: 'Low-medium risk',
  },
  {
    id: 'hitl',
    label: 'HITL approval',
    description: 'Route high-risk requests to a human reviewer before proceeding.',
    icon: UserCheck,
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200',
    risk: 'Medium risk',
  },
  {
    id: 'block',
    label: 'Block',
    description: 'Reject violating requests with a configurable error message.',
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50 border-red-200',
    risk: 'Highest impact',
  },
];

// ── Simulation log lines ──────────────────────────────────────────────────────

function useSimulationLog(running: boolean) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const LOG_LINES = [
    'Connecting to trace store…',
    'Loading last 7 days of request traces…',
    'Applying pack controls to trace corpus…',
    'Evaluating prompt injection patterns…',
    'Running PII detection on 12,400 requests…',
    'Checking output grounding and citation rules…',
    'Identifying HITL escalation candidates…',
    'Calculating false-positive rate…',
    'Estimating latency overhead…',
    'Computing per-control trigger counts…',
    'Generating impact report…',
    'Simulation complete.',
  ];

  useEffect(() => {
    if (!running) return;
    setLines([]);
    setProgress(0);
    setDone(false);
    let i = 0;
    ref.current = setInterval(() => {
      if (i < LOG_LINES.length) {
        setLines(prev => [...prev, LOG_LINES[i]]);
        setProgress(Math.round(((i + 1) / LOG_LINES.length) * 100));
        i++;
      } else {
        clearInterval(ref.current!);
        setDone(true);
      }
    }, 280);
    return () => clearInterval(ref.current!);
  }, [running]);

  return { lines, progress, done };
}

// ── Main component ────────────────────────────────────────────────────────────

export function PolicySimulationWizard({ pack, isOpen, onClose, onConfirmDeploy }: PolicySimulationWizardProps) {
  const [step, setStep] = useState(0);
  const [selectedSystem, setSelectedSystem] = useState<AISystem | null>(null);
  const [simRunning, setSimRunning] = useState(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [selectedMode, setSelectedMode] = useState('monitor');
  const [regressionScheduled, setRegressionScheduled] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  const { lines, progress, done } = useSimulationLog(simRunning);

  useEffect(() => {
    if (done && selectedSystem) {
      setSimResult(runSimulation(selectedSystem, pack));
      setSimRunning(false);
    }
  }, [done, selectedSystem]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setSelectedSystem(null);
      setSimRunning(false);
      setSimResult(null);
      setSelectedMode('monitor');
    }
  }, [isOpen]);

  const canAdvance = () => {
    if (step === 0) return !!selectedSystem;
    if (step === 1) return !!simResult;
    return true;
  };

  const advance = () => {
    if (step === 1 && !simRunning && !simResult) {
      setSimRunning(true);
    }
    if (canAdvance()) setStep(s => s + 1);
  };

  const Icon = pack?.icon;
  const currentMode = MODES.find(m => m.id === selectedMode)!;

  // ── Step renderers ──────────────────────────────────────────────────────────

  const renderSystemSelect = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose the AI system to run the simulation against. The wizard will replay the last 7 days of its request traces through the pack's controls.
      </p>
      <div className="space-y-2">
        {AI_SYSTEMS.map(sys => (
          <button
            key={sys.id}
            onClick={() => setSelectedSystem(sys)}
            className={`w-full text-left p-4 border rounded-lg transition-all ${
              selectedSystem?.id === sys.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-border hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{sys.name}</span>
                  <Badge variant={sys.riskTier === 'High' ? 'destructive' : 'secondary'} className="text-xs">{sys.riskTier} Risk</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {sys.provider} / {sys.model} · {sys.environment}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">{sys.requestsLast7d.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">req / 7d</div>
              </div>
            </div>
            {selectedSystem?.id === sys.id && (
              <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                <CheckCircle className="w-3 h-3" /> Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSimulate = () => (
    <div className="space-y-4">
      {!simRunning && !simResult && (
        <div className="space-y-3">
          <Alert>
            <FlaskConical className="w-4 h-4" />
            <AlertDescription className="text-sm">
              Ready to simulate <strong>{pack.name}</strong> against <strong>{selectedSystem?.name}</strong>'s last 7 days of traces ({selectedSystem?.requestsLast7d.toLocaleString()} requests). No production traffic will be affected.
            </AlertDescription>
          </Alert>
          <div className="p-4 border rounded-lg bg-slate-50 space-y-2">
            <div className="text-xs font-medium text-muted-foreground mb-2">Controls that will be evaluated</div>
            {(pack.topControls ?? [pack.name]).slice(0, 5).map((c: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>{c}</span>
              </div>
            ))}
          </div>
          <Button className="w-full gap-2" onClick={() => setSimRunning(true)}>
            <Play className="w-4 h-4" />
            Run Simulation
          </Button>
        </div>
      )}

      {(simRunning || simResult) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Simulation progress</span>
            <span className="font-mono text-xs">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="bg-slate-900 rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs">
            {lines.map((line, i) => (
              <div key={i} className={`py-0.5 ${i === lines.length - 1 ? 'text-green-400' : 'text-slate-300'}`}>
                <span className="text-slate-500 mr-2">{String(i + 1).padStart(2, '0')}</span>
                {line}
              </div>
            ))}
            {simRunning && (
              <div className="text-blue-400 animate-pulse py-0.5">▋</div>
            )}
            <div ref={logEndRef} />
          </div>

          {simResult && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800 text-sm font-medium">
                Simulation complete. Click Next to review the impact report.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );

  const renderReview = () => {
    if (!simResult) return null;
    const blockRate = ((simResult.blocked / simResult.totalRequests) * 100).toFixed(2);
    const fpRate = ((simResult.falsePositiveEstimate / (simResult.blocked + simResult.redacted)) * 100).toFixed(1);

    return (
      <div className="space-y-5">
        {/* Top-level impact stats */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Simulated impact — last 7 days ({simResult.totalRequests.toLocaleString()} requests)</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard icon={XCircle} label="Blocked" value={simResult.blocked} sub={`${blockRate}% block rate`} color="text-red-600" bg="bg-red-50" />
            <StatCard icon={Shield} label="Redacted" value={simResult.redacted} sub="PII/sensitive removed" color="text-purple-600" bg="bg-purple-50" />
            <StatCard icon={UserCheck} label="Escalated" value={simResult.escalated} sub="Routed to HITL" color="text-orange-600" bg="bg-orange-50" />
            <StatCard icon={Wrench} label="Tool calls denied" value={simResult.toolsDenied} sub="Action control triggers" color="text-slate-600" bg="bg-slate-100" />
            <StatCard icon={AlertTriangle} label="Est. false positives" value={simResult.falsePositiveEstimate} sub={`~${fpRate}% FP rate`} color="text-yellow-600" bg="bg-yellow-50" />
            <StatCard icon={Clock} label="Latency added" value={`+${simResult.avgLatencyAddedMs}ms`} sub="p50 per request" color="text-blue-600" bg="bg-blue-50" />
          </div>
        </div>

        <Separator />

        {/* False positive samples */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">False-positive samples</div>
          <div className="space-y-2">
            {simResult.fpSamples.map(s => (
              <div key={s.id} className="border rounded-lg p-3 text-sm">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-mono text-xs bg-slate-100 rounded px-2 py-0.5 flex-1 truncate">{s.input}</span>
                  <Badge variant="outline" className={`text-xs shrink-0 ${
                    s.verdict === 'fp_likely' ? 'border-red-300 text-red-700' :
                    s.verdict === 'fp_possible' ? 'border-yellow-300 text-yellow-700' :
                    'border-green-300 text-green-700'
                  }`}>
                    {s.verdict === 'fp_likely' ? 'FP likely' : s.verdict === 'fp_possible' ? 'FP possible' : 'Correct'}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-slate-600">{s.control}</span> — {s.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Per-control breakdown */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Per-control triggers</div>
          <div className="space-y-2">
            {simResult.controlBreakdown.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Activity className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{c.control}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-medium">{c.triggered}</span>
                  <Badge variant="outline" className="text-xs">{c.action}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost / latency note */}
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800 text-xs">
            Estimated policy overhead: <strong>+{simResult.avgLatencyAddedMs}ms</strong> p50 latency · <strong>{simResult.estimatedCostPerMonth}/month</strong> in additional processing cost at current volume.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  const renderMode = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose how the pack enforces controls on <strong>{selectedSystem?.name}</strong>. You can change this after deployment.
      </p>
      {simResult && (
        <Alert className="border-slate-200 bg-slate-50 py-2">
          <TrendingDown className="w-4 h-4 text-slate-500" />
          <AlertDescription className="text-xs text-slate-600">
            Based on simulation: <strong>{simResult.blocked + simResult.redacted + simResult.escalated}</strong> of <strong>{simResult.totalRequests.toLocaleString()}</strong> requests would be actioned in the first 7 days.
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        {MODES.map(mode => {
          const ModeIcon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`w-full text-left p-3 border rounded-lg transition-all ${
                selectedMode === mode.id ? mode.bg + ' border-opacity-100' : 'border-border hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${selectedMode === mode.id ? 'bg-white' : 'bg-slate-100'}`}>
                  <ModeIcon className={`w-4 h-4 ${selectedMode === mode.id ? mode.color : 'text-slate-400'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{mode.label}</span>
                    <Badge variant="outline" className="text-xs">{mode.risk}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
                </div>
                {selectedMode === mode.id && <CheckCircle className={`w-4 h-4 ${mode.color} shrink-0 mt-1`} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderConfirm = () => (
    <div className="space-y-4">
      {/* Summary card */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Deployment summary</div>
        </div>
        <div className="divide-y">
          <SummaryRow label="Pack" value={pack.name} />
          <SummaryRow label="Target system" value={selectedSystem?.name ?? '—'} />
          <SummaryRow label="Environment" value={selectedSystem?.environment ?? '—'} />
          <SummaryRow label="Enforcement mode" value={
            <Badge className={`text-xs ${currentMode.bg.replace('bg-', 'bg-')} ${currentMode.color} border`} variant="outline">
              {currentMode.label}
            </Badge>
          } />
          <SummaryRow label="Controls enabled" value={`${pack.controls?.length ?? 0} of ${pack.controls?.length ?? 0}`} />
          {simResult && (
            <>
              <SummaryRow label="Simulated block rate" value={`${((simResult.blocked / simResult.totalRequests) * 100).toFixed(2)}%`} />
              <SummaryRow label="Est. FP rate" value={`~${((simResult.falsePositiveEstimate / (simResult.blocked + simResult.redacted)) * 100).toFixed(1)}%`} />
            </>
          )}
        </div>
      </div>

      {/* Regression tests */}
      <button
        onClick={() => setRegressionScheduled(v => !v)}
        className={`w-full text-left p-3 border rounded-lg flex items-center gap-3 transition-all ${
          regressionScheduled ? 'border-green-300 bg-green-50' : 'border-border'
        }`}
      >
        <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${regressionScheduled ? 'bg-green-100' : 'bg-slate-100'}`}>
          <FlaskConical className={`w-4 h-4 ${regressionScheduled ? 'text-green-600' : 'text-slate-400'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Schedule regression tests</span>
            {regressionScheduled && <Badge variant="secondary" className="text-xs">Weekly</Badge>}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Re-run simulation automatically each week. Drift alerts if block rate changes by &gt;10%.
          </p>
        </div>
        {regressionScheduled && <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />}
      </button>

      {/* Evidence record */}
      <Alert className="border-indigo-200 bg-indigo-50">
        <FileText className="w-4 h-4 text-indigo-600" />
        <AlertDescription className="text-indigo-800 text-xs">
          Deploying will generate an <strong>evidence record</strong> capturing this simulation run, the selected mode, pack version, and control configuration — ready for ISO 42001 §8.4 and EU AI Act Art. 12.
        </AlertDescription>
      </Alert>

      {/* Approval warning for high-risk */}
      {selectedSystem?.riskTier === 'High' && selectedMode === 'block' && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800 text-xs">
            Deploying in <strong>Block</strong> mode to a <strong>High Risk</strong> system requires a second approver. You will be prompted to assign one after clicking Deploy.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const STEP_CONTENT = [renderSystemSelect, renderSimulate, renderReview, renderMode, renderConfirm];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            {Icon && (
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${pack.iconColor}`} />
              </div>
            )}
            <div>
              <DialogTitle className="text-base">Simulate & Deploy — {pack.name}</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Dry-run this pack against real traces before committing to production.</p>
            </div>
          </div>

          {/* Step progress */}
          <div className="flex items-center gap-1 mt-3">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 ${
                  i < step ? 'bg-green-600 text-white' :
                  i === step ? 'bg-blue-600 text-white' :
                  'bg-slate-200 text-slate-500'
                }`}>
                  {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <div className={`hidden sm:block text-xs ml-1 ${i === step ? 'font-medium' : 'text-muted-foreground'}`}>{s.label}</div>
                {i < STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300 mx-1 flex-1" />}
              </div>
            ))}
          </div>
        </DialogHeader>

        <Separator />

        {/* Step content */}
        <div className="py-2 min-h-[280px]">
          {STEP_CONTENT[step]?.()}
        </div>

        <Separator />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
            disabled={step === 1 && simRunning}
          >
            {step === 0 ? 'Cancel' : <><ChevronLeft className="w-4 h-4 mr-1" />Back</>}
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              size="sm"
              onClick={() => {
                if (step === 1 && !simRunning && !simResult) {
                  setSimRunning(true);
                } else if (canAdvance()) {
                  setStep(s => s + 1);
                }
              }}
              disabled={(step === 1 && simRunning) || (step !== 1 && !canAdvance())}
              className="gap-1"
            >
              {step === 1 && !simRunning && !simResult ? (
                <><Play className="w-4 h-4" />Run Simulation</>
              ) : step === 1 && simRunning ? (
                <>Simulating…</>
              ) : (
                <>Next<ChevronRight className="w-4 h-4" /></>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                onConfirmDeploy(selectedSystem!, selectedMode, { mode: selectedMode, regressionScheduled });
                onClose();
              }}
              className="gap-2"
            >
              <Zap className="w-4 h-4" />
              Deploy Pack
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color, bg }: {
  icon: any; label: string; value: string | number; sub: string; color: string; bg: string;
}) {
  return (
    <div className={`${bg} rounded-lg p-3 border`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className={`font-semibold text-lg ${color}`}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
