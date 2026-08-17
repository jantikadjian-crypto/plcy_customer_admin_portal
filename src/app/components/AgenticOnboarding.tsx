import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Rocket,
  Target,
  Shield,
  Filter,
  GitBranch,
  Gauge,
  UserCheck,
  FileText,
  Layers,
  Zap,
  Clock,
  Users,
  Bell
} from 'lucide-react';
import { motion } from 'motion/react';
import { AgenticWorkflowWizard } from './AgenticWorkflowWizard';
import { toast } from 'sonner';

export function AgenticOnboarding() {
  const [showWizard, setShowWizard] = useState(false);

  const pipelineSteps = [
    {
      icon: Target,
      name: 'Classify',
      description: 'Detect sensitive data & risk scoring',
      color: 'blue'
    },
    {
      icon: Shield,
      name: 'Validate',
      description: 'Deterministic safety checks',
      color: 'green'
    },
    {
      icon: Filter,
      name: 'Transform',
      description: 'Redact & tokenize sensitive data',
      color: 'purple'
    },
    {
      icon: GitBranch,
      name: 'Route',
      description: 'Model & provider selection',
      color: 'orange'
    },
    {
      icon: Gauge,
      name: 'Rate Limit',
      description: 'Budget & concurrency controls',
      color: 'yellow'
    },
    {
      icon: FileText,
      name: 'Log',
      description: 'OTEL-compliant audit trail',
      color: 'pink'
    }
  ];

  const wizardFeatures = [
    {
      icon: Layers,
      title: 'Template-Based Setup',
      description: 'Start with pre-configured templates for Customer Support, IT Ops, Finance, or build custom workflows'
    },
    {
      icon: Shield,
      title: '6-Step Enforcement Pipeline',
      description: 'Configure PLCY\'s full governance pipeline: Classify â†’ Validate â†’ Transform â†’ Route â†’ Rate Limit â†’ Log'
    },
    {
      icon: Users,
      title: 'HITL Supervisor Onboarding',
      description: 'Onboard supervisors and approvers directly in the wizard with role-based permissions'
    },
    {
      icon: Bell,
      title: 'Multi-Channel Notifications',
      description: 'Configure alerts via In-App, Email, Slack, Teams, Discord, or custom webhooks'
    },
    {
      icon: Target,
      title: 'Risk & Compliance Controls',
      description: 'Set up PII/PCI/PHI detection, redaction rules, and approval thresholds'
    },
    {
      icon: Zap,
      title: 'Production-Ready in Minutes',
      description: 'Deploy with shadow mode for testing or go live immediately with full enforcement'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Agentic Onboarding</h1>
              <p className="text-sm text-muted-foreground">
                Configure agentic workflows with PLCY's governance enforcement pipeline
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main CTA Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Create Your First Agentic Workflow
              </CardTitle>
              <CardDescription className="mt-2">
                Use our guided wizard to configure agentic workflows with comprehensive governance controls,
                HITL supervisors, and multi-channel notifications
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Setup time: ~10 minutes</span>
            <span className="mx-2">â€¢</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-muted-foreground">10 configuration steps</span>
          </div>
          <Button onClick={() => setShowWizard(true)} size="lg" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Launch Configuration Wizard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      {/* PLCY Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            PLCY 6-Step Enforcement Pipeline
          </CardTitle>
          <CardDescription>
            Every agentic workflow runs through PLCY's comprehensive governance pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 bg-${step.color}-100 rounded-lg flex items-center justify-center`}>
                          <StepIcon className={`w-4 h-4 text-${step.color}-600`} />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Step {index + 1}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm">{step.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Wizard Features */}
      <Card>
        <CardHeader>
          <CardTitle>What You'll Configure</CardTitle>
          <CardDescription>
            The wizard guides you through all aspects of agentic workflow setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wizardFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 p-3 rounded-lg border bg-card"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <FeatureIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">{feature.title}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>
            What to expect when you launch the wizard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: 'Choose a Template',
                description: 'Start with Customer Support, IT Ops, Finance, Developer, or Custom workflow'
              },
              {
                step: 2,
                title: 'Configure Workflow Basics',
                description: 'Name your workflow, set environment (prod/staging/dev), and region'
              },
              {
                step: 3,
                title: 'Define States & Tools',
                description: 'Set up workflow states with allowed tools per state (anti-prompt-injection)'
              },
              {
                step: 4,
                title: 'Configure Tool Registry',
                description: 'Define tools with JSON schemas, risk levels, and categories'
              },
              {
                step: 5,
                title: 'Set Up Classification & Risk Scoring',
                description: 'Enable PII/PCI/PHI/secrets detection and configure risk rules'
              },
              {
                step: 6,
                title: 'Configure Validation Rules',
                description: 'Set payment caps, allowed destinations, and business constraints'
              },
              {
                step: 7,
                title: 'Define Transform & Redaction',
                description: 'Configure input redaction and output filtering for privacy protection'
              },
              {
                step: 8,
                title: 'Set Up Routing Rules',
                description: 'Configure model/provider selection and fallback logic'
              },
              {
                step: 9,
                title: 'Configure Budgets & Rate Limits',
                description: 'Set max calls, tokens, cost limits, and circuit breakers'
              },
              {
                step: 10,
                title: 'Add HITL Supervisors & Notifications',
                description: 'Onboard approvers and configure multi-channel notifications'
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agentic Workflow Wizard */}
      <AgenticWorkflowWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onComplete={(config) => {
          console.log('Workflow configuration:', config);
          toast.success(`Workflow "${config.name}" created successfully!`);
        }}
      />
    </div>
  );
}
