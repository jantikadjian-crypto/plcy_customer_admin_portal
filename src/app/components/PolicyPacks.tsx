import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import {
  Package,
  Boxes,
  Shield,
  CheckCircle,
  Search,
  Filter,
  Star,
  Download,
  Settings,
  TrendingUp,
  Globe,
  Building,
  Lock,
  Zap,
  FileText,
  AlertTriangle,
  Eye,
  Ban,
  GitBranch,
  Clock,
  Users,
  Activity,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Trash2,
  Info,
  Sparkles,
  Target,
  Scale,
  ShieldCheck,
  Database,
  Code,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';
import { PackDetailModal } from './PackDetailModal';
import { ConfigurationHistory } from './ConfigurationHistory';

interface PolicyPack {
  id: string;
  name: string;
  type: 'primitive' | 'composite';
  category: string;
  framework?: string;
  industry?: string;
  description: string;
  version: string;
  downloads: number;
  featured: boolean;
  icon: any;
  iconColor: string;
  controls: {
    name: string;
    type: string;
    required?: boolean;
  }[];
  configuration?: {
    [key: string]: any;
  };
  // Governance metadata (composite packs)
  recommendedFor?: string[];
  topControls?: string[];
  testsCreated?: string[];
  evidenceMapped?: string[];
  defaultDeployMode?: 'Monitor' | 'Enforce' | 'Block' | 'HITL';
  impactPreview?: string;
  requiredIntegrations?: string[];
  versionChanges?: string[];
  rollbackNotes?: string;
}

interface DeployedPack {
  packId: string;
  pack: PolicyPack;
  deployedAt: string;
  version: string;
  status: 'active' | 'paused';
  requestsProcessed: number;
  blocked: number;
  flagged: number;
  lastUpdated: string;
  configuration: {
    [key: string]: any;
  };
}

export function PolicyPacks() {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedPack, setSelectedPack] = useState<PolicyPack | null>(null);
  const [initialModalTab, setInitialModalTab] = useState<string>('overview');

  const openPackDeploy = (pack: PolicyPack, e: React.MouseEvent) => {
    e.stopPropagation();
    setInitialModalTab('deploy');
    setSelectedPack(pack);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [frameworkFilter, setFrameworkFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [viewingHistory, setViewingHistory] = useState<string | null>(null);

  // Policy Pack Library
  const policyPacks: PolicyPack[] = [
    // CONTROLS
    {
      id: 'pack-pii-detection',
      name: 'PII Detection & Redaction',
      type: 'primitive',
      category: 'Data Privacy',
      description: 'Detect and redact personally identifiable information (SSN, credit cards, phone numbers, emails) from AI requests and responses',
      version: '2.1.0',
      downloads: 1240,
      featured: true,
      icon: Lock,
      iconColor: 'text-purple-600',
      controls: [
        { name: 'SSN Pattern Detection', type: 'Validation' },
        { name: 'Credit Card Masking', type: 'Transformation' },
        { name: 'Email Redaction', type: 'Transformation' },
        { name: 'Phone Number Filtering', type: 'Validation' }
      ]
    },
    {
      id: 'pack-prompt-injection',
      name: 'Prompt Injection Shield',
      type: 'primitive',
      category: 'Security',
      description: 'Block adversarial prompt injection attempts, jailbreak patterns, and system prompt leakage',
      version: '1.8.2',
      downloads: 2180,
      featured: true,
      icon: Shield,
      iconColor: 'text-red-600',
      controls: [
        { name: 'Jailbreak Pattern Detection', type: 'Block' },
        { name: 'System Prompt Leak Prevention', type: 'Block' },
        { name: 'Multi-language Injection Defense', type: 'Validation' },
        { name: 'Unicode Obfuscation Detection', type: 'Validation' }
      ]
    },
    {
      id: 'pack-toxic-content',
      name: 'Toxicity & Hate Speech Filter',
      type: 'primitive',
      category: 'Content Safety',
      description: 'Detect and block toxic, hateful, or harmful content in both inputs and model outputs',
      version: '3.0.1',
      downloads: 1890,
      featured: true,
      icon: Ban,
      iconColor: 'text-orange-600',
      controls: [
        { name: 'Hate Speech Detection', type: 'Block' },
        { name: 'Profanity Filter', type: 'Block' },
        { name: 'Threat Detection', type: 'Flag & Route' },
        { name: 'Toxicity Scoring', type: 'Audit' }
      ]
    },
    {
      id: 'pack-rate-limiting',
      name: 'Smart Rate Limiting',
      type: 'primitive',
      category: 'Resource Control',
      description: 'Token-aware rate limiting with burst protection and user-based quotas',
      version: '2.0.0',
      downloads: 980,
      featured: false,
      icon: Zap,
      iconColor: 'text-yellow-600',
      controls: [
        { name: 'Per-User Token Quotas', type: 'Rate Limit' },
        { name: 'Burst Protection', type: 'Rate Limit' },
        { name: 'Cost-based Throttling', type: 'Rate Limit' },
        { name: 'Fair Usage Enforcement', type: 'Audit' }
      ]
    },
    {
      id: 'pack-output-validation',
      name: 'Output Validation & Grounding',
      type: 'primitive',
      category: 'Quality Control',
      description: 'Validate AI outputs for factual grounding, hallucination detection, and response quality',
      version: '1.5.0',
      downloads: 750,
      featured: false,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      controls: [
        { name: 'Hallucination Detection', type: 'Validation' },
        { name: 'Citation Requirement', type: 'Validation' },
        { name: 'Confidence Scoring', type: 'Audit' },
        { name: 'Source Verification', type: 'Validation' }
      ]
    },
    {
      id: 'pack-data-minimization',
      name: 'Data Minimization',
      type: 'primitive',
      category: 'Privacy',
      description: 'Enforce data minimization principles by limiting what information AI systems can access',
      version: '1.2.0',
      downloads: 620,
      featured: false,
      icon: Database,
      iconColor: 'text-blue-600',
      controls: [
        { name: 'Context Window Limiting', type: 'Transform' },
        { name: 'Unnecessary Field Stripping', type: 'Transform' },
        { name: 'Retention Policy Enforcement', type: 'Audit' }
      ]
    },

    // POLICY PACKS
    {
      id: 'pack-iso-42001',
      name: 'ISO 42001 Readiness Pack',
      type: 'composite',
      category: 'Compliance Framework',
      framework: 'ISO/IEC 42001',
      description: 'End-to-end AIMS implementation covering scope definition, roles, risk assessment, test plan templates, monitoring evidence, and corrective action records — audit-ready for ISO/IEC 42001 certification.',
      version: '2.0.0',
      downloads: 0,
      featured: true,
      icon: Target,
      iconColor: 'text-violet-700',
      recommendedFor: ['AI systems seeking ISO 42001 certification', 'Enterprise AI governance programs', 'Regulated industries building AIMS'],
      topControls: ['Risk Assessment Framework', 'AIMS Scope & Roles Governance', 'Monitoring Evidence Collection', 'Corrective Action Records', 'Policy Decision Logging'],
      testsCreated: ['AIMS Scope Validation Suite', 'Risk Register Completeness Check', 'Control Effectiveness Evaluation', 'Corrective Action Tracking Test'],
      evidenceMapped: ['ISO 42001 §6.1 – Risk assessment', 'ISO 42001 §6.2 – AI objectives', 'ISO 42001 §8.4 – Monitoring & measurement', 'ISO 42001 §10.1 – Continual improvement', 'NIST AI RMF GOVERN-1.1'],
      defaultDeployMode: 'Monitor',
      impactPreview: 'Would have flagged 18 governance gaps across 3 AI systems in the last 7 days.',
      requiredIntegrations: ['Jira (corrective actions)', 'Slack (alerts)', 'SIEM (evidence export)'],
      versionChanges: ['Added corrective action record templates (§10.2)', 'Expanded AIMS scope controls to cover agentic systems', 'New evidence export for ISO 42001 Annex A controls'],
      rollbackNotes: 'Disabling rolls back to monitor-only mode. All collected evidence is preserved. Re-enabling resumes from last known good configuration.',
      controls: [
        { name: 'AIMS Scope & Roles Governance', type: 'Custom Control', required: true },
        { name: 'Risk Assessment Framework', type: 'Custom Control', required: true },
        { name: 'Test Plan Template Enforcement', type: 'Custom Control', required: true },
        { name: 'Monitoring Evidence Collection', type: 'Audit', required: true },
        { name: 'Corrective Action Records', type: 'Audit', required: true },
        { name: 'PII Detection & Redaction', type: 'Control', required: true },
        { name: 'Output Validation & Grounding', type: 'Control', required: false },
        { name: 'Policy Decision Logging', type: 'Audit', required: true },
        { name: 'Continuous Monitoring', type: 'Custom Control', required: true }
      ]
    },
    {
      id: 'pack-owasp-llm-top10',
      name: 'OWASP LLM Top 10 Pack',
      type: 'composite',
      category: 'Security Framework',
      framework: 'OWASP LLM',
      description: 'Full coverage of the OWASP Top 10 for LLM applications — prompt injection, sensitive information disclosure, supply chain risks, insecure output handling, excessive agency, and vector/embedding weaknesses.',
      version: '1.5.0',
      downloads: 0,
      featured: true,
      icon: Shield,
      iconColor: 'text-red-700',
      recommendedFor: ['Any production LLM system', 'External-facing chatbots', 'Agentic systems with tool access', 'RAG pipelines'],
      topControls: ['Prompt Injection Shield', 'Sensitive Information Disclosure Guard', 'Supply Chain Validation', 'Excessive Agency Limiter', 'Output Handling Enforcement'],
      testsCreated: ['OWASP LLM01 – Prompt Injection Battery (120 scenarios)', 'OWASP LLM06 – Sensitive Disclosure Tests', 'OWASP LLM08 – Excessive Agency Scenarios', 'Vector Embedding Leakage Tests', 'Supply Chain Integrity Checks'],
      evidenceMapped: ['OWASP LLM01 – Prompt Injection', 'OWASP LLM02 – Insecure Output Handling', 'OWASP LLM05 – Supply Chain Vulnerabilities', 'OWASP LLM06 – Sensitive Information Disclosure', 'OWASP LLM08 – Excessive Agency', 'NIST AI RMF MEASURE-2.5'],
      defaultDeployMode: 'Enforce',
      impactPreview: 'Would have blocked 52 of 18,400 requests in the last 7 days (0.28% block rate).',
      requiredIntegrations: ['Slack (#security-alerts)', 'PagerDuty (critical severity)', 'SIEM'],
      versionChanges: ['Added vector embedding leakage detection (LLM-VEC-01)', 'Updated prompt injection patterns for GPT-4o and Claude 3.x models', 'New supply chain manifest validation control'],
      rollbackNotes: 'One-click rollback to v1.4.0 available. Previous configuration snapshot preserved for 30 days. Rollback takes effect within 60 seconds.',
      controls: [
        { name: 'Prompt Injection Shield', type: 'Block', required: true },
        { name: 'Sensitive Information Disclosure Guard', type: 'Validation', required: true },
        { name: 'Supply Chain Manifest Validation', type: 'Validation', required: true },
        { name: 'Insecure Output Handling Detection', type: 'Validation', required: true },
        { name: 'Excessive Agency Limiter', type: 'Validation', required: true },
        { name: 'Vector Embedding Leakage Detection', type: 'Validation', required: true },
        { name: 'Model Denial-of-Service Guard', type: 'Rate Limit', required: false },
        { name: 'PII Detection & Redaction', type: 'Control', required: true },
        { name: 'Output Integrity Evidence', type: 'Audit', required: true }
      ]
    },
    {
      id: 'pack-customer-support',
      name: 'Customer Support AI Pack',
      type: 'composite',
      category: 'Use Case Pack',
      description: 'Governance bundle for customer support AI: PII redaction, refund approval thresholds, transcript retention, response grounding, escalation routing, and tone/safety evaluation profiles.',
      version: '2.1.0',
      downloads: 0,
      featured: true,
      icon: Users,
      iconColor: 'text-pink-600',
      recommendedFor: ['Customer support chatbots', 'Ticketing AI assistants', 'Refund & billing automation', 'Live chat escalation systems'],
      topControls: ['PII Detection & Redaction', 'Refund Approval Threshold Gate', 'Transcript Retention Policy', 'Grounding & Citation Enforcement', 'HITL Escalation Routing'],
      testsCreated: ['Tone & Safety Evaluation (60 scenarios)', 'PII Leakage Battery', 'Refund Policy Accuracy Tests', 'Escalation Trigger Validation'],
      evidenceMapped: ['GDPR Art. 5 – Data minimization', 'ISO 42001 §8.4 – Human oversight', 'NIST AI RMF MAP-3.5 – Deployment context', 'EU AI Act Art. 14 – Human oversight'],
      defaultDeployMode: 'Enforce',
      impactPreview: 'Would have blocked 37 of 12,400 requests and escalated 6 to human review in the last 7 days.',
      requiredIntegrations: ['Zendesk or Intercom (ticketing)', 'Slack (escalation alerts)', 'Data catalog (retention)'],
      versionChanges: ['Added configurable refund approval thresholds by transaction amount', 'New transcript retention control with configurable TTL', 'Tone evaluation profile updated with 40 new test scenarios'],
      rollbackNotes: 'Rollback to v2.0.1 available. Escalation routing rules revert to previous state. In-flight approvals are preserved and must be resolved manually.',
      controls: [
        { name: 'PII Detection & Redaction', type: 'Control', required: true },
        { name: 'Refund Approval Threshold Gate', type: 'Custom Control', required: true },
        { name: 'Transcript Retention Policy', type: 'Audit', required: true },
        { name: 'Grounding & Citation Enforcement', type: 'Validation', required: false },
        { name: 'HITL Escalation Routing', type: 'Custom Control', required: true },
        { name: 'Toxicity & Hate Speech Filter', type: 'Control', required: true },
        { name: 'Brand Voice Validation', type: 'Custom Control', required: false },
        { name: 'Response Quality Scoring', type: 'Audit', required: false }
      ]
    },
    {
      id: 'pack-agentic-workflow',
      name: 'Agentic Workflow Pack',
      type: 'composite',
      category: 'Use Case Pack',
      description: 'Safety controls for autonomous AI agents: tool permission management, step-level traceability, irreversible action approval gates, budget limits, and sandboxed evaluation testing.',
      version: '1.3.0',
      downloads: 0,
      featured: false,
      icon: GitBranch,
      iconColor: 'text-orange-700',
      recommendedFor: ['Autonomous AI agents with tool access', 'Multi-step workflow AI', 'AI systems that write, delete, or send', 'RPA + LLM pipelines'],
      topControls: ['Tool Allowlist Enforcement', 'Irreversible Action Approval Gate', 'Step-Level Trace Capture', 'Budget & Spend Limiter', 'Sandbox Test Execution'],
      testsCreated: ['Irreversible Action Boundary Tests (45 scenarios)', 'Tool Permission Escalation Battery', 'Budget Overflow Simulation', 'Multi-Step Traceability Audit'],
      evidenceMapped: ['NIST AI RMF MANAGE-2.2 – Incident response', 'OWASP LLM08 – Excessive Agency', 'EU AI Act Art. 9 – Risk management', 'ISO 42001 §8.5 – AI system operation'],
      defaultDeployMode: 'HITL',
      impactPreview: 'Would have routed 14 high-risk tool calls to human approval and blocked 3 budget overruns in the last 7 days.',
      requiredIntegrations: ['Slack (approval notifications)', 'Jira (incident tracking)', 'Cloud IAM (permission enforcement)'],
      versionChanges: ['Added configurable spend limits per agent session', 'New sandbox test execution control for pre-deployment testing', 'Step-level trace now captures tool parameters (redacted)'],
      rollbackNotes: 'Rollback suspends agent execution until configuration is restored. Pending HITL approvals remain in queue. Full rollback to v1.2.0 takes ~2 minutes.',
      controls: [
        { name: 'Tool Allowlist Enforcement', type: 'Validation', required: true },
        { name: 'Irreversible Action Approval Gate', type: 'Custom Control', required: true },
        { name: 'Step-Level Trace Capture', type: 'Audit', required: true },
        { name: 'Budget & Spend Limiter', type: 'Rate Limit', required: true },
        { name: 'Sandbox Test Execution', type: 'Custom Control', required: false },
        { name: 'Parameter Validation & Sanitization', type: 'Validation', required: true },
        { name: 'Least Privilege Enforcement', type: 'Validation', required: true },
        { name: 'Agent Session Audit Trail', type: 'Audit', required: true }
      ]
    },
    {
      id: 'pack-rag-knowledge',
      name: 'RAG / Knowledge Assistant Pack',
      type: 'composite',
      category: 'Use Case Pack',
      description: 'Governance for retrieval-augmented generation pipelines: source allowlists, retrieval quality evals, citation enforcement, data classification, and vector index leakage detection.',
      version: '1.1.0',
      downloads: 0,
      featured: false,
      icon: Database,
      iconColor: 'text-cyan-700',
      recommendedFor: ['RAG-based chatbots and assistants', 'Internal knowledge base AI', 'Document Q&A systems', 'AI search and summarization'],
      topControls: ['Source Allowlist Enforcement', 'Citation Requirement Gate', 'Data Classification Check', 'Vector Leakage Detection', 'Retrieval Quality Evaluation'],
      testsCreated: ['Retrieval Relevance Evaluation (80 scenarios)', 'Citation Accuracy Battery', 'Vector Embedding Leakage Tests', 'Source Boundary Enforcement Tests'],
      evidenceMapped: ['NIST AI RMF MAP-1.6 – Transparency', 'GDPR Art. 5 – Data minimization', 'ISO 42001 §8.3 – AI system development', 'OWASP LLM05 – Supply Chain'],
      defaultDeployMode: 'Enforce',
      impactPreview: 'Would have blocked 11 out-of-scope source retrievals and flagged 4 uncited responses in the last 7 days.',
      requiredIntegrations: ['Data catalog (source classification)', 'Vector DB (Pinecone, Weaviate, or pgvector)', 'Slack (citation alerts)'],
      versionChanges: ['Added tenant isolation control for multi-tenant RAG deployments', 'New vector index boundary enforcement', 'Citation enforcement now configurable per document type'],
      rollbackNotes: 'Rollback restores previous source allowlist and citation rules. Vector index access controls revert immediately.',
      controls: [
        { name: 'Source Allowlist Enforcement', type: 'Validation', required: true },
        { name: 'Citation Requirement Gate', type: 'Validation', required: true },
        { name: 'Data Classification Check', type: 'Validation', required: true },
        { name: 'Vector Embedding Leakage Detection', type: 'Validation', required: true },
        { name: 'Retrieval Quality Evaluation', type: 'Custom Control', required: false },
        { name: 'Tenant Isolation Enforcement', type: 'Validation', required: false },
        { name: 'RAG Snippet Minimization', type: 'Transformation', required: false },
        { name: 'Grounding & Citation Evidence', type: 'Audit', required: true }
      ]
    },
    {
      id: 'pack-eu-ai-act',
      name: 'EU AI Act High-Risk Pack',
      type: 'composite',
      category: 'Compliance Framework',
      framework: 'EU AI Act',
      description: 'Controls and evidence for high-risk AI systems under the EU AI Act: risk classification, mandatory logging, human oversight gates, robustness/accuracy/cybersecurity evidence, and documentation exports.',
      version: '1.2.0',
      downloads: 0,
      featured: true,
      icon: Globe,
      iconColor: 'text-indigo-700',
      recommendedFor: ['High-risk AI systems (Annex III)', 'AI in critical infrastructure, HR, education, law enforcement', 'AI systems sold into EU markets', 'GPAI model providers'],
      topControls: ['High-Risk Classification Gate', 'Human Oversight Enforcement', 'Robustness & Accuracy Evidence', 'Mandatory Logging (Art. 12)', 'Documentation Export (Art. 11)'],
      testsCreated: ['High-Risk Classification Validation', 'Human Oversight Trigger Tests', 'Robustness Adversarial Battery', 'Cybersecurity Control Verification', 'Accuracy Benchmark Suite'],
      evidenceMapped: ['EU AI Act Art. 9 – Risk management', 'EU AI Act Art. 10 – Data governance', 'EU AI Act Art. 11 – Technical documentation', 'EU AI Act Art. 12 – Record-keeping', 'EU AI Act Art. 13 – Transparency', 'EU AI Act Art. 14 – Human oversight'],
      defaultDeployMode: 'Enforce',
      impactPreview: 'Would have generated 6 compliance evidence packages and triggered 3 human oversight gates in the last 7 days.',
      requiredIntegrations: ['SIEM (Art. 12 logging)', 'Document management (technical documentation)', 'Slack (oversight alerts)', 'Identity provider (user consent)'],
      versionChanges: ['Updated to reflect EU AI Act Delegated Acts (2025)', 'Added GPAI model transparency controls', 'New documentation export templates for Art. 11 technical file'],
      rollbackNotes: 'Rollback preserves all collected evidence. Logging continues in monitor-only mode during rollback. Art. 12 logs are immutable and cannot be rolled back.',
      controls: [
        { name: 'High-Risk Classification Gate', type: 'Custom Control', required: true },
        { name: 'Human Oversight Enforcement', type: 'Custom Control', required: true },
        { name: 'PII Detection & Redaction', type: 'Control', required: true },
        { name: 'Mandatory Logging (Art. 12)', type: 'Audit', required: true },
        { name: 'Technical Documentation Export', type: 'Custom Control', required: true },
        { name: 'Robustness & Accuracy Evidence', type: 'Audit', required: true },
        { name: 'Cybersecurity Control Verification', type: 'Validation', required: true },
        { name: 'Transparency Disclosure Gate', type: 'Custom Control', required: true }
      ]
    },
    {
      id: 'pack-healthcare-hipaa',
      name: 'Healthcare AI Pack',
      type: 'composite',
      category: 'Industry Pack',
      industry: 'Healthcare',
      framework: 'HIPAA',
      description: 'PHI controls, HIPAA-oriented audit evidence, clinical escalation routing, and sensitive output monitoring for AI systems operating in healthcare environments.',
      version: '3.0.0',
      downloads: 0,
      featured: true,
      icon: ShieldCheck,
      iconColor: 'text-teal-700',
      recommendedFor: ['Clinical decision support AI', 'Patient-facing chatbots', 'EHR-integrated AI', 'Telehealth AI assistants'],
      topControls: ['PHI Detection & Redaction', 'Clinical Escalation Routing', 'Sensitive Output Monitoring', 'Minimum Necessary Enforcement', 'HIPAA Breach Workflow'],
      testsCreated: ['PHI Leakage Battery (60 scenarios)', 'Clinical Escalation Trigger Tests', 'Sensitive Output Monitoring Eval', 'HIPAA Access Control Verification', 'Breach Notification Readiness Check'],
      evidenceMapped: ['HIPAA Security Rule §164.312 – Technical safeguards', 'HIPAA Privacy Rule §164.502 – Minimum necessary', 'HIPAA Breach Notification §164.410', 'ISO 42001 §6.1 – Risk assessment', 'NIST AI RMF MAP-5.1'],
      defaultDeployMode: 'Enforce',
      impactPreview: 'Would have blocked 29 PHI exposure attempts and escalated 2 clinical high-risk responses in the last 7 days.',
      requiredIntegrations: ['EHR system (context)', 'Slack (clinical alerts)', 'SIEM (breach evidence)', 'Identity provider (BAA enforcement)'],
      versionChanges: ['Expanded PHI detection to cover clinical notes and ICD-10 codes', 'New clinical escalation routing control with configurable severity thresholds', 'Added HIPAA breach notification workflow hooks'],
      rollbackNotes: 'Rollback to v2.0.0 available. PHI detection rules revert immediately. Breach workflow hooks are disabled during rollback — manual monitoring required.',
      controls: [
        { name: 'PHI Detection (Input)', type: 'Validation', required: true },
        { name: 'PHI Detection (Output)', type: 'Validation', required: true },
        { name: 'PHI Redaction', type: 'Transformation', required: true },
        { name: 'Minimum Necessary Enforcement', type: 'Transformation', required: true },
        { name: 'Clinical Escalation Routing', type: 'Custom Control', required: true },
        { name: 'Sensitive Output Monitoring', type: 'Audit', required: true },
        { name: 'Provider Allowlist (BAA)', type: 'Validation', required: true },
        { name: 'HIPAA Breach Workflow Hooks', type: 'Custom Control', required: true },
        { name: 'Audit Log Export', type: 'Audit', required: true }
      ]
    },
    {
      id: 'pack-code-copilot',
      name: 'Code Copilot Pack',
      type: 'composite',
      category: 'Use Case Pack',
      description: 'Security and IP governance for AI code generation: secret and credential detection, license/IP compliance checks, insecure code output tests, and repository access controls.',
      version: '1.3.0',
      downloads: 0,
      featured: false,
      icon: Code,
      iconColor: 'text-slate-700',
      recommendedFor: ['AI code generation tools', 'GitHub Copilot-style assistants', 'Automated PR review agents', 'IDE-integrated AI'],
      topControls: ['Secret & Credential Detection', 'License Compliance Check', 'Insecure Code Pattern Detection', 'Repository Access Control', 'IP Boundary Enforcement'],
      testsCreated: ['Secret Detection Battery (90 scenarios)', 'License Violation Tests', 'Insecure Code Output Evaluation (OWASP Top 10)', 'Repository Access Boundary Tests'],
      evidenceMapped: ['OWASP LLM05 – Supply Chain Vulnerabilities', 'OWASP LLM10 – Model Theft', 'ISO 27001 A.8 – Asset management', 'NIST CSF PR.DS-5 – Data-at-rest protection'],
      defaultDeployMode: 'Warn',
      impactPreview: 'Would have flagged 8 hardcoded secrets and 3 license violations in generated code in the last 7 days.',
      requiredIntegrations: ['GitHub/GitLab (repository access)', 'Slack (violation alerts)', 'License registry', 'SAST tooling (optional)'],
      versionChanges: ['Added detection for AI-generated insecure code patterns (SQLi, XSS, path traversal)', 'New IP boundary enforcement for proprietary code', 'License check now covers AGPL and SSPL edge cases'],
      rollbackNotes: 'Rollback to v1.2.0 available. Secret detection rules revert. License check configuration is preserved separately and must be manually reverted if needed.',
      controls: [
        { name: 'Secret & Credential Detection', type: 'Validation', required: true },
        { name: 'License Compliance Check', type: 'Validation', required: true },
        { name: 'Insecure Code Pattern Detection', type: 'Validation', required: true },
        { name: 'Repository Access Control', type: 'Validation', required: true },
        { name: 'IP Boundary Enforcement', type: 'Custom Control', required: false },
        { name: 'Output Validation & Grounding', type: 'Control', required: false },
        { name: 'Code Generation Audit Trail', type: 'Audit', required: true }
      ]
    },
    {
      id: 'pack-financial-services',
      name: 'Financial Services Pack',
      type: 'composite',
      category: 'Industry Pack',
      industry: 'Financial Services',
      framework: 'FINRA',
      description: 'Governance bundle for AI in financial services: suitability disclaimers, record retention, high-risk financial advice escalation, and audit evidence for FINRA/SEC examinations.',
      version: '1.4.0',
      downloads: 0,
      featured: false,
      icon: Building,
      iconColor: 'text-emerald-700',
      recommendedFor: ['Financial advisory AI', 'Wealth management chatbots', 'Loan and credit AI', 'Insurance AI assistants'],
      topControls: ['Suitability Disclaimer Injection', 'High-Risk Advice Escalation', 'Record Retention Enforcement', 'Material Information Detection', 'FINRA Audit Evidence Export'],
      testsCreated: ['Suitability Disclaimer Verification', 'High-Risk Advice Detection Battery', 'Record Retention Compliance Tests', 'Material Non-Public Information Detection'],
      evidenceMapped: ['FINRA Rule 2111 – Suitability', 'FINRA Rule 4511 – Record retention', 'SEC Rule 17a-4 – Electronic records', 'MiFID II Art. 25 – Suitability', 'ISO 42001 §6.1 – Risk assessment'],
      defaultDeployMode: 'Enforce',
      impactPreview: 'Would have injected suitability disclaimers in 94 responses and escalated 5 high-risk advice requests in the last 7 days.',
      requiredIntegrations: ['CRM (Salesforce/HubSpot)', 'Slack (escalation alerts)', 'SIEM (FINRA evidence)', 'Archival storage (record retention)'],
      versionChanges: ['Updated suitability disclaimer templates for MiFID II 2025 revisions', 'Added material non-public information (MNPI) detection', 'New FINRA exam-ready evidence export format'],
      rollbackNotes: 'Rollback to v1.3.0 available. Disclaimer injection rules revert immediately. Retained records are unaffected — retention is append-only.',
      controls: [
        { name: 'Suitability Disclaimer Injection', type: 'Custom Control', required: true },
        { name: 'High-Risk Advice Escalation', type: 'Custom Control', required: true },
        { name: 'Record Retention Enforcement', type: 'Audit', required: true },
        { name: 'Material Information Detection', type: 'Validation', required: true },
        { name: 'PII Detection & Redaction', type: 'Control', required: true },
        { name: 'FINRA Audit Evidence Export', type: 'Audit', required: true },
        { name: 'Suitability Review Routing', type: 'Custom Control', required: false }
      ]
    }
  ];

  // Deployed Packs
  const [deployedPacks, setDeployedPacks] = useState<DeployedPack[]>([
    {
      packId: 'pack-owasp-llm-top10',
      pack: policyPacks.find(p => p.id === 'pack-owasp-llm-top10')!,
      deployedAt: '2026-05-01',
      version: '1.5.0',
      status: 'active',
      requestsProcessed: 51340,
      blocked: 52,
      flagged: 38,
      lastUpdated: '2026-06-01',
      configuration: { enforcementLevel: 'strict', detailedLogging: true }
    },
    {
      packId: 'pack-customer-support',
      pack: policyPacks.find(p => p.id === 'pack-customer-support')!,
      deployedAt: '2026-04-15',
      version: '2.1.0',
      status: 'active',
      requestsProcessed: 38920,
      blocked: 37,
      flagged: 6,
      lastUpdated: '2026-05-28',
      configuration: { enforcementLevel: 'standard', detailedLogging: true }
    },
    {
      packId: 'pack-pii-detection',
      pack: policyPacks.find(p => p.id === 'pack-pii-detection')!,
      deployedAt: '2026-04-01',
      version: '2.1.0',
      status: 'active',
      requestsProcessed: 45230,
      blocked: 342,
      flagged: 89,
      lastUpdated: '2026-05-10',
      configuration: { redactionMode: 'full', auditLevel: 'detailed' }
    }
  ]);

  // Filter packs
  const filteredPacks = policyPacks.filter(pack => {
    const matchesSearch = pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pack.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || pack.type === typeFilter;
    const matchesFramework = frameworkFilter === 'all' || pack.framework === frameworkFilter;
    const matchesIndustry = industryFilter === 'all' || pack.industry === industryFilter;
    
    return matchesSearch && matchesType && matchesFramework && matchesIndustry;
  });

  const controlPacks = filteredPacks.filter(p => p.type === 'primitive');
  const compositePacks = filteredPacks.filter(p => p.type === 'composite');
  const featuredPacks = filteredPacks.filter(p => p.featured);

  const handleDeployPack = (pack: PolicyPack, configuration: any) => {
    const timestamp = new Date().toISOString();

    const newDeployment: DeployedPack = {
      packId: pack.id,
      pack,
      deployedAt: timestamp.split('T')[0],
      version: pack.version,
      status: 'active',
      requestsProcessed: 0,
      blocked: 0,
      flagged: 0,
      lastUpdated: timestamp.split('T')[0],
      configuration
    };

    setDeployedPacks(prev => [...prev, newDeployment]);

    // COMPREHENSIVE AUDIT LOGGING - OTEL Compliant
    const auditEvent = {
      '@timestamp': timestamp,
      'event.kind': 'event',
      'event.category': ['configuration'],
      'event.type': ['creation', 'change'],
      'event.action': 'policy_pack_deployed',
      'event.outcome': 'success',
      'event.severity': configuration.enabledControls?.length < pack.controls?.length ? 'warning' : 'info',

      // User context
      'user.id': 'demo@company.com',
      'user.email': 'demo@company.com',
      'user.name': 'Demo User',

      // Source context
      'source.ip': '192.168.1.100',
      'source.geo.country_name': 'United States',

      // Service context
      'service.name': 'plcy-control-plane',
      'service.version': '1.0.0',

      // PLCY-specific fields
      'plcy.pack.id': pack.id,
      'plcy.pack.name': pack.name,
      'plcy.pack.type': pack.type,
      'plcy.pack.version': pack.version,
      'plcy.pack.category': pack.category,
      'plcy.pack.framework': pack.framework || null,

      // Configuration details
      'plcy.deployment.id': `deploy-${Date.now()}`,
      'plcy.deployment.status': 'active',
      'plcy.deployment.total_controls': pack.controls.length,
      'plcy.deployment.enabled_controls': configuration.enabledControls?.length || pack.controls.length,
      'plcy.deployment.disabled_controls': pack.controls.length - (configuration.enabledControls?.length || pack.controls.length),
      'plcy.deployment.custom_settings_applied': Object.keys(configuration.controlSettings || {}).length > 0,
      'plcy.deployment.controls_customized': Object.keys(configuration.controlSettings || {}).length,

      // Pack-level configuration
      'plcy.config.log_retention_days': configuration.logRetentionDays || 30,
      'plcy.config.enforcement_mode': configuration.enforcementMode || configuration.enforcementLevel || 'standard',
      'plcy.config.detailed_logging': configuration.detailedLogging !== false,

      // Control-level details
      'plcy.controls.enabled': configuration.enabledControls?.map((idx: number) => pack.controls[idx]?.name) || pack.controls.map((c: any) => c.name),
      'plcy.controls.disabled': pack.controls
        .filter((_: any, idx: number) => !(configuration.enabledControls || []).includes(idx))
        .map((c: any) => c.name),
      'plcy.controls.custom_settings': configuration.controlSettings || {},

      // Compliance flags
      'plcy.compliance.frameworks': pack.framework ? [pack.framework] : [],
      'plcy.compliance.industry': pack.industry || null,
      'plcy.compliance.customization_level':
        (configuration.enabledControls?.length < pack.controls?.length ||
         Object.keys(configuration.controlSettings || {}).length > 0) ? 'customized' : 'default',

      // Risk indicators
      'plcy.risk.controls_disabled': pack.controls.length - (configuration.enabledControls?.length || pack.controls.length) > 0,
      'plcy.risk.below_framework_requirements': pack.framework && configuration.enabledControls?.length < pack.controls?.length,

      // Message
      message: `Policy pack deployed: ${pack.name} v${pack.version} with ${configuration.enabledControls?.length || pack.controls.length}/${pack.controls.length} controls enabled`,

      // Tags for filtering
      tags: [
        'policy-pack',
        'deployment',
        pack.type,
        pack.category.toLowerCase().replace(/\s+/g, '-'),
        configuration.enabledControls?.length < pack.controls?.length ? 'customized' : 'default'
      ].concat(pack.framework ? [pack.framework.toLowerCase().replace(/\s+/g, '-')] : [])
    };

    // Log to console (in production, send to logging infrastructure)
    console.log('[AUDIT LOG - OTEL]', JSON.stringify(auditEvent, null, 2));

    // Also log individual control configurations
    if (configuration.controlSettings && Object.keys(configuration.controlSettings).length > 0) {
      Object.entries(configuration.controlSettings).forEach(([controlIndex, settings]: [string, any]) => {
        const control = pack.controls[parseInt(controlIndex)];
        const controlAuditEvent = {
          '@timestamp': timestamp,
          'event.kind': 'event',
          'event.category': ['configuration'],
          'event.type': ['change'],
          'event.action': 'control_configured',
          'event.outcome': 'success',
          'event.severity': settings.enforcementMode === 'monitor' || settings.enforcementMode === 'audit' ? 'warning' : 'info',

          'user.id': 'demo@company.com',
          'plcy.pack.id': pack.id,
          'plcy.pack.name': pack.name,
          'plcy.control.name': control.name,
          'plcy.control.type': control.type,
          'plcy.control.settings': settings,

          // Enforcement mode details
          'plcy.control.enforcement_mode': settings.enforcementMode || 'enforce',
          'plcy.control.threshold': settings.threshold,
          'plcy.control.action': settings.action,

          // Alert routing details
          'plcy.alert.slack_enabled': settings.alertSlack || false,
          'plcy.alert.email_enabled': settings.alertEmail || false,
          'plcy.alert.pagerduty_enabled': settings.alertPagerDuty || false,

          // Time-based scheduling (NEW)
          'plcy.schedule.type': settings.schedule || 'always',
          'plcy.schedule.business_hours_only': settings.schedule === 'business_hours',
          'plcy.schedule.after_hours_only': settings.schedule === 'after_hours',

          // Scope/Targeting (NEW)
          'plcy.scope.endpoints': settings.scopeEndpoints || 'all',
          'plcy.scope.user_groups': settings.scopeUserGroups || 'all',
          'plcy.scope.environments': {
            production: settings.envProduction !== false,
            staging: settings.envStaging !== false,
            dev: settings.envDev || false
          },

          // Custom Allowlists (NEW)
          'plcy.exemptions.users': settings.exemptUsers ? settings.exemptUsers.split(',').map((u: string) => u.trim()) : [],
          'plcy.exemptions.ip_ranges': settings.exemptIPs ? settings.exemptIPs.split(',').map((ip: string) => ip.trim()) : [],
          'plcy.exemptions.expiry': settings.exemptionExpiry || null,

          // Response Customization (NEW)
          'plcy.response.custom_block_message': settings.customBlockMessage || null,
          'plcy.response.message_customized': !!settings.customBlockMessage,

          message: `Control configured: ${control.name} in ${pack.name} [Mode: ${settings.enforcementMode || 'enforce'}]`,
          tags: ['control-configuration', pack.id, control.type.toLowerCase(), settings.enforcementMode || 'enforce']
        };

        console.log('[AUDIT LOG - CONTROL CONFIG]', JSON.stringify(controlAuditEvent, null, 2));

        // Separate log for enforcement mode changes (if not default)
        if (settings.enforcementMode && settings.enforcementMode !== 'enforce') {
          const enforcementModeEvent = {
            '@timestamp': timestamp,
            'event.kind': 'event',
            'event.category': ['configuration'],
            'event.type': ['change'],
            'event.action': 'enforcement_mode_changed',
            'event.outcome': 'success',
            'event.severity': settings.enforcementMode === 'monitor' || settings.enforcementMode === 'audit' ? 'warning' : 'info',

            'user.id': 'demo@company.com',
            'plcy.pack.id': pack.id,
            'plcy.pack.name': pack.name,
            'plcy.control.name': control.name,
            'plcy.enforcement_mode.old': 'enforce',
            'plcy.enforcement_mode.new': settings.enforcementMode,
            'plcy.enforcement_mode.impact': settings.enforcementMode === 'monitor' ? 'violations will be logged but not blocked' :
                                            settings.enforcementMode === 'warn' ? 'violations will be flagged but allowed' :
                                            settings.enforcementMode === 'audit' ? 'silent logging only' :
                                            'unknown',

            message: `Enforcement mode changed to ${settings.enforcementMode} for ${control.name}`,
            tags: ['enforcement-mode-change', settings.enforcementMode, pack.id]
          };

          console.log('[AUDIT LOG - ENFORCEMENT MODE]', JSON.stringify(enforcementModeEvent, null, 2));
        }

        // Separate log for alert routing configuration
        if (settings.alertSlack || settings.alertEmail || settings.alertPagerDuty) {
          const alertRoutingEvent = {
            '@timestamp': timestamp,
            'event.kind': 'event',
            'event.category': ['configuration'],
            'event.type': ['change'],
            'event.action': 'alert_routing_configured',
            'event.outcome': 'success',

            'user.id': 'demo@company.com',
            'plcy.pack.id': pack.id,
            'plcy.pack.name': pack.name,
            'plcy.control.name': control.name,
            'plcy.alert.channels': [
              settings.alertSlack && 'slack',
              settings.alertEmail && 'email',
              settings.alertPagerDuty && 'pagerduty'
            ].filter(Boolean),
            'plcy.alert.slack_channel': settings.alertSlack ? '#security-alerts' : null,
            'plcy.alert.email_recipients': settings.alertEmail ? ['security-team@company.com'] : [],
            'plcy.alert.pagerduty_enabled': settings.alertPagerDuty || false,

            message: `Alert routing configured for ${control.name}: ${[
              settings.alertSlack && 'Slack',
              settings.alertEmail && 'Email',
              settings.alertPagerDuty && 'PagerDuty'
            ].filter(Boolean).join(', ')}`,
            tags: ['alert-routing', pack.id, control.name.toLowerCase().replace(/\s+/g, '-')]
          };

          console.log('[AUDIT LOG - ALERT ROUTING]', JSON.stringify(alertRoutingEvent, null, 2));
        }

        // Separate log for time-based scheduling (if configured)
        if (settings.schedule && settings.schedule !== 'always') {
          const schedulingEvent = {
            '@timestamp': timestamp,
            'event.kind': 'event',
            'event.category': ['configuration'],
            'event.type': ['change'],
            'event.action': 'time_based_scheduling_configured',
            'event.outcome': 'success',

            'user.id': 'demo@company.com',
            'plcy.pack.id': pack.id,
            'plcy.pack.name': pack.name,
            'plcy.control.name': control.name,
            'plcy.schedule.type': settings.schedule,
            'plcy.schedule.description':
              settings.schedule === 'business_hours' ? 'Active Monday-Friday 9am-5pm only' :
              settings.schedule === 'after_hours' ? 'Active outside business hours and weekends' :
              settings.schedule === 'custom' ? 'Custom schedule configured' :
              'Always active',

            message: `Time-based scheduling configured: ${settings.schedule} for ${control.name}`,
            tags: ['time-scheduling', settings.schedule, pack.id]
          };

          console.log('[AUDIT LOG - SCHEDULING]', JSON.stringify(schedulingEvent, null, 2));
        }

        // Separate log for scope/targeting configuration
        if (settings.scopeEndpoints || settings.scopeUserGroups !== 'all' || settings.envProduction === false) {
          const scopeEvent = {
            '@timestamp': timestamp,
            'event.kind': 'event',
            'event.category': ['configuration'],
            'event.type': ['change'],
            'event.action': 'scope_targeting_configured',
            'event.outcome': 'success',

            'user.id': 'demo@company.com',
            'plcy.pack.id': pack.id,
            'plcy.pack.name': pack.name,
            'plcy.control.name': control.name,
            'plcy.scope.endpoints': settings.scopeEndpoints || 'all',
            'plcy.scope.user_groups': settings.scopeUserGroups || 'all',
            'plcy.scope.environments': {
              production: settings.envProduction !== false,
              staging: settings.envStaging !== false,
              dev: settings.envDev || false
            },
            'plcy.scope.targeted': true,

            message: `Scope targeting configured for ${control.name}: ${
              settings.scopeEndpoints ? `Endpoints: ${settings.scopeEndpoints}` : ''
            } ${settings.scopeUserGroups !== 'all' ? `Users: ${settings.scopeUserGroups}` : ''}`,
            tags: ['scope-targeting', pack.id, control.name.toLowerCase().replace(/\s+/g, '-')]
          };

          console.log('[AUDIT LOG - SCOPE TARGETING]', JSON.stringify(scopeEvent, null, 2));
        }

        // Separate log for custom allowlists/exemptions
        if (settings.exemptUsers || settings.exemptIPs) {
          const exemptionEvent = {
            '@timestamp': timestamp,
            'event.kind': 'event',
            'event.category': ['configuration'],
            'event.type': ['change'],
            'event.action': 'exemptions_configured',
            'event.outcome': 'success',
            'event.severity': 'warning', // Exemptions are security-relevant

            'user.id': 'demo@company.com',
            'plcy.pack.id': pack.id,
            'plcy.pack.name': pack.name,
            'plcy.control.name': control.name,
            'plcy.exemptions.users': settings.exemptUsers ? settings.exemptUsers.split(',').map((u: string) => u.trim()) : [],
            'plcy.exemptions.ip_ranges': settings.exemptIPs ? settings.exemptIPs.split(',').map((ip: string) => ip.trim()) : [],
            'plcy.exemptions.expiry_date': settings.exemptionExpiry || null,
            'plcy.exemptions.requires_approval': true,
            'plcy.exemptions.audit_required': true,

            message: `Exemptions configured for ${control.name}: ${
              settings.exemptUsers ? `Users: ${settings.exemptUsers}` : ''
            } ${settings.exemptIPs ? `IPs: ${settings.exemptIPs}` : ''}${
              settings.exemptionExpiry ? ` (Expires: ${settings.exemptionExpiry})` : ''
            }`,
            tags: ['exemptions', 'allowlist', pack.id, 'security-review-required']
          };

          console.log('[AUDIT LOG - EXEMPTIONS]', JSON.stringify(exemptionEvent, null, 2));
        }

        // Separate log for custom response messages
        if (settings.customBlockMessage) {
          const customMessageEvent = {
            '@timestamp': timestamp,
            'event.kind': 'event',
            'event.category': ['configuration'],
            'event.type': ['change'],
            'event.action': 'custom_message_configured',
            'event.outcome': 'success',

            'user.id': 'demo@company.com',
            'plcy.pack.id': pack.id,
            'plcy.pack.name': pack.name,
            'plcy.control.name': control.name,
            'plcy.response.custom_message': settings.customBlockMessage,
            'plcy.response.message_type': 'block',
            'plcy.response.user_facing': true,

            message: `Custom response message configured for ${control.name}`,
            tags: ['custom-message', 'user-experience', pack.id]
          };

          console.log('[AUDIT LOG - CUSTOM MESSAGE]', JSON.stringify(customMessageEvent, null, 2));
        }
      });
    }

    // If log retention was customized, log that specifically
    if (configuration.logRetentionDays && configuration.logRetentionDays !== 30) {
      const retentionAuditEvent = {
        '@timestamp': timestamp,
        'event.kind': 'event',
        'event.category': ['configuration'],
        'event.type': ['change'],
        'event.action': 'log_retention_configured',
        'event.outcome': 'success',

        'user.id': 'demo@company.com',
        'plcy.pack.id': pack.id,
        'plcy.pack.name': pack.name,
        'plcy.config.log_retention_days.old': 30,
        'plcy.config.log_retention_days.new': configuration.logRetentionDays,
        'plcy.config.retention_period_human': `${configuration.logRetentionDays} days`,

        message: `Log retention configured: ${configuration.logRetentionDays} days for ${pack.name}`,
        tags: ['log-retention', 'configuration', pack.id]
      };

      console.log('[AUDIT LOG - LOG RETENTION]', JSON.stringify(retentionAuditEvent, null, 2));
    }

    setSelectedPack(null);
    setActiveTab('deployed');

    toast.success('Policy pack deployed', {
      description: `${pack.name} v${pack.version} is now active and enforcing`
    });
  };

  const handleTogglePackStatus = (packId: string) => {
    setDeployedPacks(prev => prev.map(dp => 
      dp.packId === packId 
        ? { ...dp, status: dp.status === 'active' ? 'paused' : 'active' as 'active' | 'paused' }
        : dp
    ));
    
    const pack = deployedPacks.find(dp => dp.packId === packId);
    toast.success(pack?.status === 'active' ? 'Pack paused' : 'Pack activated', {
      description: pack?.status === 'active' 
        ? 'Pack is no longer enforcing policies' 
        : 'Pack is now actively enforcing'
    });
  };

  const handleRemovePack = (packId: string) => {
    const pack = deployedPacks.find(dp => dp.packId === packId);
    setDeployedPacks(prev => prev.filter(dp => dp.packId !== packId));

    toast.success('Pack removed', {
      description: `${pack?.pack.name} has been undeployed`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Policy Packs</h1>
        <p className="text-muted-foreground">
          Deploy pre-built governance bundles or compose custom policy packs for runtime AI enforcement
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Packs</p>
                <p className="text-2xl font-semibold">{policyPacks.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deployed</p>
                <p className="text-2xl font-semibold">{deployedPacks.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Enforcement</p>
                <p className="text-2xl font-semibold">
                  {deployedPacks.filter(dp => dp.status === 'active').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-semibold">
                  {deployedPacks.reduce((sum, dp) => sum + dp.requestsProcessed, 0).toLocaleString()}
                </p>
              </div>
              <Activity className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="library" className="gap-2">
            <Boxes className="w-4 h-4" />
            Pack Library
          </TabsTrigger>
          <TabsTrigger value="deployed" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Deployed Packs
            <Badge variant="secondary" className="ml-1">
              {deployedPacks.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* PACK LIBRARY */}
        <TabsContent value="library" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[250px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search policy packs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="primitive">Controls Only</SelectItem>
                    <SelectItem value="composite">Composite Only</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    <SelectItem value="ISO/IEC 42001">ISO 42001</SelectItem>
                    <SelectItem value="OWASP LLM">OWASP LLM Top 10</SelectItem>
                    <SelectItem value="EU AI Act">EU AI Act</SelectItem>
                    <SelectItem value="HIPAA">HIPAA</SelectItem>
                    <SelectItem value="FINRA">FINRA</SelectItem>
                    <SelectItem value="NIST AI RMF">NIST AI RMF</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Financial Services">Financial Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Packs */}
          {featuredPacks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <h2 className="text-xl font-semibold">Featured Packs</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredPacks.map(pack => {
                  const Icon = pack.icon;
                  const isDeployed = deployedPacks.some(dp => dp.packId === pack.id);
                  
                  return (
                    <Card key={pack.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPack(pack)}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pack.type === 'primitive' ? 'from-blue-50 to-blue-100' : 'from-purple-50 to-purple-100'} flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${pack.iconColor}`} />
                          </div>
                          <Badge variant={pack.type === 'primitive' ? 'outline' : 'default'} className={pack.type === 'composite' ? 'bg-purple-600' : ''}>
                            {pack.type === 'primitive' ? 'Control' : 'Policy Pack'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            {pack.defaultDeployMode && (
                              <Badge variant="outline" className="text-xs">{pack.defaultDeployMode}</Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              v{pack.version}
                            </Badge>
                            {pack.framework && <Badge variant="secondary" className="text-xs">{pack.framework}</Badge>}
                            {pack.industry && <Badge variant="outline" className="text-xs">{pack.industry}</Badge>}
                          </div>
                          {pack.impactPreview && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{pack.impactPreview}</p>
                          )}
                          <div className="pt-1">
                            {isDeployed ? (
                              <Button variant="outline" className="w-full gap-2" disabled>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Already Deployed
                              </Button>
                            ) : (
                              <Button className="w-full gap-2" onClick={(e) => openPackDeploy(pack, e)}>
                                <Zap className="w-4 h-4" />
                                Simulate & Deploy
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Policy Packs */}
          {compositePacks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold">Policy Packs</h2>
                <Badge variant="secondary">{compositePacks.length}</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compositePacks.filter(p => !featuredPacks.includes(p)).map(pack => {
                  const Icon = pack.icon;
                  const isDeployed = deployedPacks.some(dp => dp.packId === pack.id);
                  return (
                    <Card key={pack.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPack(pack)}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                            <Icon className={`w-6 h-6 ${pack.iconColor}`} />
                          </div>
                          <Badge className="bg-purple-600">Policy Pack</Badge>
                        </div>
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            {pack.defaultDeployMode && (
                              <Badge variant="outline" className="text-xs">{pack.defaultDeployMode}</Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">v{pack.version}</Badge>
                            {pack.framework && <Badge variant="secondary" className="text-xs">{pack.framework}</Badge>}
                            {pack.industry && <Badge variant="outline" className="text-xs">{pack.industry}</Badge>}
                          </div>
                          {pack.impactPreview && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{pack.impactPreview}</p>
                          )}
                          <div className="pt-1">
                            {isDeployed ? (
                              <Button variant="outline" className="w-full gap-2" disabled>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Already Deployed
                              </Button>
                            ) : (
                              <Button className="w-full gap-2" onClick={(e) => openPackDeploy(pack, e)}>
                                <Zap className="w-4 h-4" />
                                Simulate & Deploy
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Controls */}
          {controlPacks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Controls</h2>
                <Badge variant="secondary">{controlPacks.length}</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {controlPacks.filter(p => !featuredPacks.includes(p)).map(pack => {
                  const Icon = pack.icon;
                  const isDeployed = deployedPacks.some(dp => dp.packId === pack.id);
                  
                  return (
                    <Card key={pack.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPack(pack)}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                            <Icon className={`w-6 h-6 ${pack.iconColor}`} />
                          </div>
                          <Badge variant="outline">Control</Badge>
                        </div>
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge variant="secondary" className="text-xs">v{pack.version}</Badge>
                          <div className="pt-1">
                            {isDeployed ? (
                              <Button variant="outline" className="w-full gap-2" disabled>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Already Deployed
                              </Button>
                            ) : (
                              <Button className="w-full gap-2" onClick={(e) => openPackDeploy(pack, e)}>
                                <Zap className="w-4 h-4" />
                                Add Control
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>

        {/* DEPLOYED PACKS */}
        <TabsContent value="deployed" className="space-y-4">
          {deployedPacks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="font-semibold mb-2">No packs deployed yet</h3>
                <p className="text-muted-foreground mb-4">
                  Deploy policy packs from the library to start enforcing governance controls
                </p>
                <Button onClick={() => setActiveTab('library')}>
                  Browse Pack Library
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {deployedPacks.map(deployed => {
                const Icon = deployed.pack.icon;
                
                return (
                  <Card key={deployed.packId}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${deployed.pack.type === 'primitive' ? 'from-blue-50 to-blue-100' : 'from-purple-50 to-purple-100'} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-7 h-7 ${deployed.pack.iconColor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{deployed.pack.name}</h3>
                                <Badge variant={deployed.pack.type === 'primitive' ? 'outline' : 'default'} className={`text-xs ${deployed.pack.type === 'composite' ? 'bg-purple-600' : ''}`}>
                                  {deployed.pack.type === 'primitive' ? 'Control' : 'Policy Pack'}
                                </Badge>
                                <Badge variant={deployed.status === 'active' ? 'default' : 'secondary'} className={`text-xs ${deployed.status === 'active' ? 'bg-green-600' : ''}`}>
                                  {deployed.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{deployed.pack.description}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-4 gap-4 my-4">
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Requests Processed</div>
                              <div className="text-lg font-semibold">{deployed.requestsProcessed.toLocaleString()}</div>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Blocked</div>
                              <div className="text-lg font-semibold text-red-700">{deployed.blocked}</div>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Flagged</div>
                              <div className="text-lg font-semibold text-orange-700">{deployed.flagged}</div>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Version</div>
                              <div className="text-lg font-semibold text-blue-700">v{deployed.version}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                            <Clock className="w-3 h-3" />
                            <span>Deployed {deployed.deployedAt}</span>
                            <span>•</span>
                            <span>Last updated {deployed.lastUpdated}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={deployed.status === 'active' ? 'outline' : 'default'}
                              onClick={() => handleTogglePackStatus(deployed.packId)}
                              className="gap-2"
                            >
                              {deployed.status === 'active' ? (
                                <>
                                  <Pause className="w-4 h-4" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4" />
                                  Activate
                                </>
                              )}
                            </Button>

                            <Button size="sm" variant="outline" className="gap-2">
                              <Settings className="w-4 h-4" />
                              Configure
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => setViewingHistory(deployed.packId)}
                            >
                              <GitBranch className="w-4 h-4" />
                              History
                            </Button>

                            <Button size="sm" variant="outline" className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Logs
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemovePack(deployed.packId)}
                              className="gap-2 ml-auto text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </Button>
                          </div>

                          {/* Configuration History (Expanded) */}
                          {viewingHistory === deployed.packId && (
                            <div className="mt-4 pt-4 border-t">
                              <ConfigurationHistory packId={deployed.packId} />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Pack Detail Modal */}
      {selectedPack && (
        <PackDetailModal
          pack={selectedPack}
          isOpen={!!selectedPack}
          onClose={() => { setSelectedPack(null); setInitialModalTab('overview'); }}
          onDeploy={handleDeployPack}
          isDeployed={deployedPacks.some(dp => dp.packId === selectedPack.id)}
          initialTab={initialModalTab}
        />
      )}
    </div>
  );
}
