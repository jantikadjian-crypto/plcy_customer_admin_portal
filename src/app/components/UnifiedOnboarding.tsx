import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Sparkles,
  Rocket,
  Bot,
  Shield,
  Zap,
  Plug,
  Globe,
  Building,
  Key,
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Activity,
  Layers,
  GitBranch,
  FileText,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  TrendingUp,
  Briefcase,
  Scale,
  DollarSign,
  UserCheck,
  Code,
  Cpu,
  Hospital,
  Eye,
  Package,
  Lock,
  Megaphone,
  LineChart,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { AgenticWorkflowWizard } from './AgenticWorkflowWizard';
import { OnboardingWizard } from './OnboardingWizard';
import { toast } from 'sonner';

export function UnifiedOnboarding() {
  const [showAgenticWizard, setShowAgenticWizard] = useState(false);
  const [showPLCYDevWizard, setShowPLCYDevWizard] = useState(false);
  const [showAgenticUseCases, setShowAgenticUseCases] = useState(false);
  const [showPlatformUseCases, setShowPlatformUseCases] = useState(false);

  const agenticFeatures = [
    { icon: Bot, label: '6-Step Enforcement Pipeline', description: 'Classify → Validate → Transform → Route → Rate Limit → Log' },
    { icon: Users, label: 'HITL Supervisor Onboarding', description: 'Human-in-the-loop approval workflows' },
    { icon: Shield, label: 'Risk & Compliance Controls', description: 'PII/PCI/PHI detection and redaction' },
    { icon: Activity, label: 'Multi-Channel Notifications', description: 'Slack, Teams, Discord, webhooks' }
  ];

  const plcyDevFeatures = [
    { icon: Globe, label: 'Regional Deployment', description: 'Choose your data residency region' },
    { icon: Key, label: 'AI Provider Connections', description: 'OpenAI, Anthropic, Azure, GCP, AWS' },
    { icon: Building, label: 'Workspace Setup', description: 'Configure SSO, SCIM, and team access' },
    { icon: FileText, label: 'Policy Starter Packs', description: 'NIST AI RMF, ISO/IEC 42001, and more' }
  ];

  // Detailed use case categories
  const agenticUseCaseCategories = [
    {
      icon: DollarSign,
      title: 'Finance & Fraud',
      examples: ['Fraud scoring & identity verification', 'Payment operations & approvals', 'Financial planning assistants (FP&A)']
    },
    {
      icon: Scale,
      title: 'Legal & Compliance',
      examples: ['Contract review & drafting automation', 'CLM (contract lifecycle management)', 'Policy helpdesks & compliance copilots']
    },
    {
      icon: Code,
      title: 'IT & DevOps',
      examples: ['Code deployment & infrastructure changes', 'Break-glass approvals & runbooks', 'Cloud assistants & IaC automation']
    },
    {
      icon: MessageSquare,
      title: 'Customer Operations',
      examples: ['Account changes & data access requests', 'Refund processing & billing changes', 'High-value support escalations']
    },
    {
      icon: Hospital,
      title: 'Healthcare & Clinical Operations',
      examples: ['Clinical decision support with automated actions', 'Prescription/prior authorization submissions', 'Patient triage with escalation triggers']
    },
    {
      icon: Package,
      title: 'Supply Chain & Procurement',
      examples: ['Automated purchase order generation & approval', 'Supplier/vendor onboarding & contract execution', 'Logistics & shipment routing decisions']
    },
    {
      icon: Lock,
      title: 'Data Access & Privacy Operations',
      examples: ['GDPR/CCPA data deletion requests', 'Access provisioning & deprovisioning', 'Data subject rights automation (portability, rectification)']
    },
    {
      icon: Megaphone,
      title: 'Marketing & Brand Operations',
      examples: ['Ad spend & campaign budget adjustments', 'Content publishing & social media posting', 'Promotional pricing & discount code generation']
    },
    {
      icon: LineChart,
      title: 'Trading & Investment Operations',
      examples: ['Automated trading execution & order routing', 'Portfolio rebalancing & risk adjustments', 'Margin calls & collateral management']
    },
    {
      icon: ShieldCheck,
      title: 'Physical Security & Access Control',
      examples: ['Building access & badge provisioning', 'Incident response & lockdown automation', 'Visitor management & clearance workflows']
    }
  ];

  const platformUseCaseCategories = [
    {
      icon: MessageSquare,
      title: 'Customer Experience & Support',
      examples: ['Web/mobile chatbots & virtual agents', 'Voice/IVR bots & call-center copilots', 'Onboarding & account assistants (KYC/KYB)']
    },
    {
      icon: TrendingUp,
      title: 'Sales, Marketing, and Growth',
      examples: ['Sales email/call copilots & CRM updates', 'Marketing content generation (ads, blogs, social)', 'Product content enrichment & SEO metadata']
    },
    {
      icon: Briefcase,
      title: 'Employee Productivity & Knowledge',
      examples: ['Company-wide copilots (Slack/Teams/Email)', 'Enterprise search & RAG assistants', 'BI/Narrative analytics bots & SQL generation']
    },
    {
      icon: Scale,
      title: 'Legal, Risk, and Compliance',
      examples: ['Contract review/drafting & CLM automation', 'Policy helpdesks & compliance copilots', 'Content moderation & UGC safety']
    },
    {
      icon: DollarSign,
      title: 'Finance, Security, and Fraud',
      examples: ['FP&A assistants & financial narrative', 'Fraud & risk scoring with HITL', 'Security copilots & SOC triage']
    },
    {
      icon: UserCheck,
      title: 'Talent, HR, and Internal Ops',
      examples: ['Recruiting screeners & interview assistants', 'HR policy assistants (benefits, payroll)', 'RPA + LLM orchestration for back-office tasks']
    },
    {
      icon: Code,
      title: 'Product & Engineering',
      examples: ['Code copilots & code review bots', 'DevOps & cloud assistants (IaC, runbooks)', 'Embedded AI features & in-product assistants']
    },
    {
      icon: Cpu,
      title: 'Data Science, MLOps, and Model Lifecycle',
      examples: ['Training/fine-tuning jobs & model development', 'Evaluation & red-teaming workflows', 'Model serving/gateways (LLMs, embeddings)']
    },
    {
      icon: Hospital,
      title: 'Industry-Specific (Regulated & High-stakes)',
      examples: ['Healthcare: clinical triage, HIPAA/PHI controls', 'Financial services: trading research, FINRA compliance', 'Insurance: claims automation, underwriting', 'Public sector: citizen service bots, FOIA policies']
    },
    {
      icon: Eye,
      title: 'Edge, Vision, and Autonomous Systems',
      examples: ['Computer vision QA & safety (manufacturing, retail)', 'IoT/field service & remote ops assistants', 'Autonomous/agentic workflows with tool execution']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome to PLCY Onboarding
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your onboarding path to get started with AI governance
        </p>
      </div>

      {/* Two Onboarding Options */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Agentic Workflows */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-blue-50/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Agentic Workflows</CardTitle>
                    <CardDescription className="text-base mt-1">
                      For AI agents that take autonomous actions
                    </CardDescription>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Bot className="w-3 h-3" />
                  AI Agents
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Shield className="w-3 h-3" />
                  HITL Controls
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Target className="w-3 h-3" />
                  Risk Management
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Configure governance for AI agents that execute tools, make payments, access databases, 
                or perform critical operations. Includes human oversight, risk scoring, and comprehensive audit trails.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {agenticFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{feature.label}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white/50 rounded-lg border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10</div>
                  <div className="text-xs text-muted-foreground">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">~10</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">6</div>
                  <div className="text-xs text-muted-foreground">Pipeline Steps</div>
                </div>
              </div>

              {/* CTA */}
              <Button 
                onClick={() => setShowAgenticWizard(true)} 
                size="lg" 
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Rocket className="w-5 h-5" />
                Configure Agentic Workflow
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Use Cases */}
              <div className="pt-3 border-t">
                <div className="text-xs font-medium text-muted-foreground mb-2">BEST FOR:</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Customer Support Agents</Badge>
                  <Badge variant="outline" className="text-xs">Finance/Payments</Badge>
                  <Badge variant="outline" className="text-xs">IT Operations</Badge>
                  <Badge variant="outline" className="text-xs">Code Deployment</Badge>
                </div>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowAgenticUseCases(!showAgenticUseCases)}
                  >
                    {showAgenticUseCases ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {showAgenticUseCases ? 'Hide' : 'Show'} Use Cases
                  </Button>
                </div>
                {showAgenticUseCases && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Agentic Workflows are ideal for AI agents that need to execute tools, make payments, access databases, or perform critical operations. They provide human oversight, risk scoring, and comprehensive audit trails to ensure compliance and security.
                    </p>
                    <div className="space-y-2">
                      {agenticUseCaseCategories.map((category, index) => {
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <category.icon className="w-4 h-4 text-blue-600" />
                              <div className="font-medium text-sm text-blue-900">{category.title}</div>
                            </div>
                            <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                              {category.examples.map((example, exIndex) => {
                                return (
                                  <li key={exIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span>{example}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PLCY.dev Integration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full border-2 border-green-200 bg-gradient-to-br from-green-50/50 via-teal-50/30 to-green-50/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Platform Integration</CardTitle>
                    <CardDescription className="text-base mt-1">
                      For general AI infrastructure setup
                    </CardDescription>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Plug className="w-3 h-3" />
                  Quick Setup
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Globe className="w-3 h-3" />
                  Multi-Region
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Key className="w-3 h-3" />
                  Provider Setup
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Set up your PLCY workspace, connect AI providers, configure policies, and publish your trust center. 
                Perfect for getting your AI governance infrastructure ready.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {plcyDevFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{feature.label}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white/50 rounded-lg border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">10</div>
                  <div className="text-xs text-muted-foreground">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">~15</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">5+</div>
                  <div className="text-xs text-muted-foreground">Providers</div>
                </div>
              </div>

              {/* CTA */}
              <Button 
                onClick={() => setShowPLCYDevWizard(true)} 
                size="lg" 
                className="w-full gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                <Zap className="w-5 h-5" />
                Setup Platform Integration
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Use Cases */}
              <div className="pt-3 border-t">
                <div className="text-xs font-medium text-muted-foreground mb-2">BEST FOR:</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Workspace Setup</Badge>
                  <Badge variant="outline" className="text-xs">Provider Integration</Badge>
                  <Badge variant="outline" className="text-xs">Trust Centers</Badge>
                  <Badge variant="outline" className="text-xs">Policy Frameworks</Badge>
                </div>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowPlatformUseCases(!showPlatformUseCases)}
                  >
                    {showPlatformUseCases ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {showPlatformUseCases ? 'Hide' : 'Show'} Use Cases
                  </Button>
                </div>
                {showPlatformUseCases && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Platform Integration is perfect for setting up your AI governance infrastructure. It allows you to connect multiple AI providers, deploy policy frameworks, and publish public trust centers to ensure compliance and security.
                    </p>
                    <div className="space-y-2">
                      {platformUseCaseCategories.map((category, index) => {
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <category.icon className="w-4 h-4 text-green-600" />
                              <div className="font-medium text-sm text-green-900">{category.title}</div>
                            </div>
                            <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                              {category.examples.map((example, exIndex) => {
                                return (
                                  <li key={exIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>{example}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Comparison Section */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="text-center">Not sure which to choose?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="font-semibold text-blue-600 flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Choose Agentic Workflows if you need:
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>AI agents that execute tools or take actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Human approval workflows for critical operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>PII/PCI/PHI detection and redaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Budget controls and rate limiting</span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-green-600 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Choose Platform Integration if you need:
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Basic AI infrastructure and workspace setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Connect multiple AI providers (OpenAI, Anthropic, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Deploy policy frameworks and compliance packs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Publish public trust centers</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm text-blue-900">You can complete both!</div>
                <div className="text-xs text-blue-700 mt-1">
                  Start with Platform Integration to set up your infrastructure, then configure 
                  Agentic Workflows for specific AI agents that need governance controls.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="w-4 h-4" />
              Documentation
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              Talk to Sales
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Clock className="w-4 h-4" />
              Book a Demo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wizards */}
      <AgenticWorkflowWizard
        isOpen={showAgenticWizard}
        onClose={() => setShowAgenticWizard(false)}
        onComplete={(config) => {
          console.log('Agentic workflow configuration:', config);
          toast.success(`Workflow "${config.name}" created successfully!`);
        }}
      />

      <OnboardingWizard
        isOpen={showPLCYDevWizard}
        onClose={() => setShowPLCYDevWizard(false)}
        onComplete={(data) => {
          console.log('PLCY.dev onboarding complete:', data);
          toast.success('PLCY.dev workspace configured successfully!');
        }}
      />
    </div>
  );
}