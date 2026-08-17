import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Bot,
  Shield,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Circle,
  DollarSign,
  Zap,
  Database,
  AlertTriangle,
  Eye,
  Lock,
  Filter,
  GitBranch,
  Settings,
  PlayCircle,
  Users,
  CreditCard,
  MessageSquare,
  Wrench,
  Activity,
  TrendingUp,
  Code,
  Target,
  Clock,
  ShieldCheck,
  FileJson,
  ArrowRight,
  Layers,
  Router,
  Gauge,
  UserCheck,
  FileText,
  CheckSquare,
  Mail,
  Bell,
  Hash,
  Webhook,
  Phone,
  UserPlus,
  Trash2,
  Edit,
  Send,
  Globe,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (config: any) => void;
}

interface WorkflowConfig {
  // Step 1: Basics
  name: string;
  description: string;
  environment: 'production' | 'staging' | 'development';
  tenantId: string;
  region: string;
  isolationMode: 'single-tenant' | 'multi-tenant' | 'dedicated';
  
  // Step 2: States & Tools
  states: {
    id: string;
    name: string;
    allowedTools: string[];
  }[];
  
  // Step 3: Tool Registry
  tools: {
    id: string;
    name: string;
    description: string;
    category: 'read' | 'write' | 'external_comm' | 'security_sensitive' | 'financial';
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    argsSchema: string;
    outputSchema: string;
  }[];
  
  // Step 4: Classification
  classification: {
    detectPII: boolean;
    detectPCI: boolean;
    detectPHI: boolean;
    detectSecrets: boolean;
    trustLevel: 'trusted_internal' | 'untrusted_external';
    riskScoring: {
      baseRiskByTool: boolean;
      addRiskIfUntrusted: boolean;
      addRiskByAmount: boolean;
    };
  };
  
  // Step 5: Validation
  validation: {
    toolAllowlist: string[];
    schemaValidation: boolean;
    paymentCaps: number;
    allowedDestinations: string[];
    blockSecrets: boolean;
  };
  
  // Step 6: Transform
  transform: {
    redactCardNumbers: boolean;
    redactSSN: boolean;
    redactAPIKeys: boolean;
    filterSecrets: boolean;
    tokenizePII: boolean;
  };
  
  // Step 7: Routing
  routing: {
    regionBased: boolean;
    vendorRestrictions: string[];
    costTier: 'low' | 'medium' | 'high';
    fallbackEnabled: boolean;
  };
  
  // Step 8: Budgets
  budgets: {
    maxToolCalls: number;
    maxModelCalls: number;
    maxTokens: number;
    maxCost: number;
    concurrencyCap: number;
    circuitBreakerThreshold: number;
  };
  
  // Step 9: HITL
  hitl: {
    requiredForTools: string[];
    approvalThresholds: {
      paymentAmount: number;
      requireFourEyes: boolean;
    };
    approverGroups: string[];
    channels: string[];
  };
  
  // Step 10: HITL Supervisors & Notifications
  supervisors: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'approver' | 'supervisor' | 'admin';
    permissions: string[];
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      slack: boolean;
      inApp: boolean;
    };
  }[];
  
  notifications: {
    inApp: {
      enabled: boolean;
      events: string[];
    };
    email: {
      enabled: boolean;
      recipients: string[];
      events: string[];
    };
    slack: {
      enabled: boolean;
      webhookUrl: string;
      channel: string;
      events: string[];
    };
    teams: {
      enabled: boolean;
      webhookUrl: string;
      events: string[];
    };
    discord: {
      enabled: boolean;
      webhookUrl: string;
      events: string[];
    };
    webhook: {
      enabled: boolean;
      url: string;
      events: string[];
      headers: Record<string, string>;
    };
  };
}

const templates = [
  {
    id: 'customer-support',
    name: 'Customer Support Agent',
    description: 'Handle refunds, account updates, and order inquiries',
    icon: MessageSquare,
    color: 'blue',
    presets: {
      tools: ['read_orders', 'update_account', 'issue_refund', 'send_email'],
      hitlTools: ['issue_refund'],
      maxRefundAmount: 500,
      detectPII: true
    }
  },
  {
    id: 'it-ops',
    name: 'IT Ops Agent',
    description: 'Incident remediation and infrastructure management',
    icon: Wrench,
    color: 'purple',
    presets: {
      tools: ['restart_service', 'scale_resources', 'check_logs', 'create_ticket'],
      hitlTools: ['restart_service', 'scale_resources'],
      detectSecrets: true
    }
  },
  {
    id: 'developer',
    name: 'Developer Agent',
    description: 'Code review, deployment, and CI/CD automation',
    icon: Code,
    color: 'green',
    presets: {
      tools: ['deploy_code', 'run_tests', 'merge_pr', 'create_branch'],
      hitlTools: ['deploy_code', 'merge_pr'],
      detectSecrets: true
    }
  },
  {
    id: 'finance',
    name: 'Finance/Payments Agent',
    description: 'Process payments, invoices, and financial transactions',
    icon: DollarSign,
    color: 'orange',
    presets: {
      tools: ['make_payment', 'create_invoice', 'read_account', 'send_receipt'],
      hitlTools: ['make_payment'],
      maxPaymentAmount: 10000,
      detectPCI: true
    }
  },
  {
    id: 'custom',
    name: 'Custom Workflow',
    description: 'Start from scratch with a blank workflow',
    icon: Sparkles,
    color: 'gray',
    presets: {}
  }
];

const predefinedTools = [
  { id: 'read_orders', name: 'Read Orders', category: 'read', riskLevel: 'low' },
  { id: 'update_account', name: 'Update Account', category: 'write', riskLevel: 'medium' },
  { id: 'issue_refund', name: 'Issue Refund', category: 'financial', riskLevel: 'high' },
  { id: 'make_payment', name: 'Make Payment', category: 'financial', riskLevel: 'critical' },
  { id: 'send_email', name: 'Send Email', category: 'external_comm', riskLevel: 'low' },
  { id: 'restart_service', name: 'Restart Service', category: 'write', riskLevel: 'high' },
  { id: 'scale_resources', name: 'Scale Resources', category: 'write', riskLevel: 'high' },
  { id: 'check_logs', name: 'Check Logs', category: 'read', riskLevel: 'low' },
  { id: 'create_ticket', name: 'Create Ticket', category: 'write', riskLevel: 'low' },
  { id: 'deploy_code', name: 'Deploy Code', category: 'write', riskLevel: 'critical' },
  { id: 'run_tests', name: 'Run Tests', category: 'read', riskLevel: 'low' },
  { id: 'merge_pr', name: 'Merge PR', category: 'write', riskLevel: 'high' },
  { id: 'create_branch', name: 'Create Branch', category: 'write', riskLevel: 'low' },
  { id: 'create_invoice', name: 'Create Invoice', category: 'financial', riskLevel: 'medium' },
  { id: 'read_account', name: 'Read Account', category: 'read', riskLevel: 'low' },
  { id: 'send_receipt', name: 'Send Receipt', category: 'external_comm', riskLevel: 'low' }
];

const defaultStates = [
  { id: 'intake', name: 'Intake', allowedTools: [] },
  { id: 'research', name: 'Research', allowedTools: [] },
  { id: 'propose', name: 'Propose Action', allowedTools: [] },
  { id: 'execute', name: 'Execute', allowedTools: [] },
  { id: 'close', name: 'Close', allowedTools: [] }
];

export function AgenticWorkflowWizard({ isOpen, onClose, onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAddSupervisor, setShowAddSupervisor] = useState(false);
  const [newSupervisor, setNewSupervisor] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'approver' as 'approver' | 'supervisor' | 'admin',
    permissions: [] as string[],
    notificationPreferences: {
      email: true,
      sms: false,
      slack: false,
      inApp: true
    }
  });
  
  const [config, setConfig] = useState<WorkflowConfig>({
    name: '',
    description: '',
    environment: 'production',
    tenantId: '',
    region: 'us-east-1',
    isolationMode: 'multi-tenant',
    states: defaultStates,
    tools: [],
    classification: {
      detectPII: true,
      detectPCI: false,
      detectPHI: false,
      detectSecrets: true,
      trustLevel: 'trusted_internal',
      riskScoring: {
        baseRiskByTool: true,
        addRiskIfUntrusted: true,
        addRiskByAmount: true
      }
    },
    validation: {
      toolAllowlist: [],
      schemaValidation: true,
      paymentCaps: 5000,
      allowedDestinations: [],
      blockSecrets: true
    },
    transform: {
      redactCardNumbers: true,
      redactSSN: true,
      redactAPIKeys: true,
      filterSecrets: true,
      tokenizePII: true
    },
    routing: {
      regionBased: true,
      vendorRestrictions: [],
      costTier: 'medium',
      fallbackEnabled: true
    },
    budgets: {
      maxToolCalls: 100,
      maxModelCalls: 500,
      maxTokens: 1000000,
      maxCost: 100,
      concurrencyCap: 10,
      circuitBreakerThreshold: 3
    },
    hitl: {
      requiredForTools: [],
      approvalThresholds: {
        paymentAmount: 1000,
        requireFourEyes: false
      },
      approverGroups: [],
      channels: ['in-app']
    },
    supervisors: [],
    notifications: {
      inApp: {
        enabled: true,
        events: ['approval_required', 'workflow_completed', 'workflow_failed', 'high_risk_detected']
      },
      email: {
        enabled: false,
        recipients: [],
        events: []
      },
      slack: {
        enabled: false,
        webhookUrl: '',
        channel: '',
        events: []
      },
      teams: {
        enabled: false,
        webhookUrl: '',
        events: []
      },
      discord: {
        enabled: false,
        webhookUrl: '',
        events: []
      },
      webhook: {
        enabled: false,
        url: '',
        events: [],
        headers: {}
      }
    }
  });

  // Load saved progress from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedConfig = localStorage.getItem('agenticWorkflowConfig');
      const savedStep = localStorage.getItem('agenticWorkflowStep');
      const savedTemplate = localStorage.getItem('agenticWorkflowTemplate');
      
      if (savedConfig) {
        try {
          setConfig(JSON.parse(savedConfig));
        } catch (e) {
          console.error('Failed to load saved config', e);
        }
      }
      
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
      
      if (savedTemplate) {
        setSelectedTemplate(savedTemplate);
      }
    }
  }, [isOpen]);

  // Save progress to localStorage whenever config changes
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem('agenticWorkflowConfig', JSON.stringify(config));
    }
  }, [config, isOpen]);

  // Save current step
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem('agenticWorkflowStep', currentStep.toString());
    }
  }, [currentStep, isOpen]);

  // Save selected template
  useEffect(() => {
    if (isOpen && selectedTemplate) {
      localStorage.setItem('agenticWorkflowTemplate', selectedTemplate);
    }
  }, [selectedTemplate, isOpen]);

  const steps = [
    { id: 0, name: 'Template', icon: Sparkles, description: 'Choose a starting template' },
    { id: 1, name: 'Workflow Basics', icon: FileText, description: 'Name and environment' },
    { id: 2, name: 'States & Tools', icon: GitBranch, description: 'Define workflow states' },
    { id: 3, name: 'Tool Registry', icon: Wrench, description: 'Configure available tools' },
    { id: 4, name: 'Classify & Risk', icon: Target, description: 'Risk scoring rules' },
    { id: 5, name: 'Validation', icon: ShieldCheck, description: 'Deterministic checks' },
    { id: 6, name: 'Transform', icon: Filter, description: 'Redaction & filtering' },
    { id: 7, name: 'Routing', icon: Router, description: 'Model & provider routing' },
    { id: 8, name: 'Budgets', icon: Gauge, description: 'Rate limits & budgets' },
    { id: 9, name: 'HITL Rules', icon: UserCheck, description: 'Human approval flows' },
    { id: 10, name: 'Review & Deploy', icon: CheckSquare, description: 'Final review' }
  ];

  // Helper function to check if a step is completed
  const isStepCompleted = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return selectedTemplate !== null;
      case 1:
        return config.name !== '';
      case 2:
        return config.states.some(s => s.allowedTools.length > 0);
      case 3:
        return config.tools.length > 0;
      case 4:
        return true; // Classification has defaults
      case 5:
        return true; // Validation has defaults
      case 6:
        return true; // Transform has defaults
      case 7:
        return true; // Routing has defaults
      case 8:
        return true; // Budgets has defaults
      case 9:
        return config.hitl.requiredForTools.length > 0 || true; // Optional
      case 10:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template && template.presets) {
      // Apply template presets to config
      const presetTools = template.presets.tools?.map(toolId => {
        const tool = predefinedTools.find(t => t.id === toolId);
        return tool ? {
          id: tool.id,
          name: tool.name,
          description: '',
          category: tool.category as any,
          riskLevel: tool.riskLevel as any,
          argsSchema: '{}',
          outputSchema: '{}'
        } : null;
      }).filter(Boolean) || [];
      
      setConfig(prev => ({
        ...prev,
        tools: presetTools as any,
        hitl: {
          ...prev.hitl,
          requiredForTools: template.presets.hitlTools || []
        },
        classification: {
          ...prev.classification,
          detectPII: template.presets.detectPII || prev.classification.detectPII,
          detectPCI: template.presets.detectPCI || prev.classification.detectPCI,
          detectSecrets: template.presets.detectSecrets || prev.classification.detectSecrets
        },
        validation: {
          ...prev.validation,
          paymentCaps: template.presets.maxPaymentAmount || prev.validation.paymentCaps
        }
      }));
    }
  };

  const handleComplete = () => {
    // Clear saved progress
    localStorage.removeItem('agenticWorkflowConfig');
    localStorage.removeItem('agenticWorkflowStep');
    localStorage.removeItem('agenticWorkflowTemplate');
    
    onComplete(config);
    toast.success('Workflow configuration created successfully!');
    onClose();
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start with a pre-configured template or build from scratch
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => {
                const TemplateIcon = template.icon;
                const isSelected = selectedTemplate === template.id;
                return (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'border-blue-500 shadow-md' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-${template.color}-100 rounded-lg flex items-center justify-center`}>
                            <TemplateIcon className={`w-5 h-5 text-${template.color}-600`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{template.name}</CardTitle>
                          </div>
                        </div>
                        {isSelected && <CheckCircle className="w-5 h-5 text-blue-600" />}
                      </div>
                      <CardDescription className="mt-2">{template.description}</CardDescription>
                    </CardHeader>
                    {template.presets.tools && (
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-xs font-medium">Pre-configured:</div>
                          <div className="flex flex-wrap gap-1">
                            {template.presets.tools.slice(0, 3).map(tool => (
                              <Badge key={tool} variant="outline" className="text-xs">
                                {tool.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                            {template.presets.tools.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.presets.tools.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Workflow Basics</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure core workflow settings
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Workflow Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Customer Support Refund Agent"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this workflow does..."
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="environment">Environment</Label>
                  <Select
                    value={config.environment}
                    onValueChange={(value: any) => setConfig({ ...config, environment: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select
                    value={config.region}
                    onValueChange={(value) => setConfig({ ...config, region: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                      <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="isolation">Isolation Mode</Label>
                <Select
                  value={config.isolationMode}
                  onValueChange={(value: any) => setConfig({ ...config, isolationMode: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multi-tenant">Multi-tenant</SelectItem>
                    <SelectItem value="single-tenant">Single-tenant</SelectItem>
                    <SelectItem value="dedicated">Dedicated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Workflow States & Allowed Tools</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Define states and which tools are allowed in each (prevents prompt injection)
              </p>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {config.states.map((state, index) => (
                  <Card key={state.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        {state.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label className="text-xs">Allowed Tools</Label>
                        <div className="space-y-2">
                          {predefinedTools.map(tool => (
                            <div key={tool.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${state.id}-${tool.id}`}
                                checked={state.allowedTools.includes(tool.id)}
                                onCheckedChange={(checked) => {
                                  const newStates = [...config.states];
                                  const stateIndex = newStates.findIndex(s => s.id === state.id);
                                  if (checked) {
                                    newStates[stateIndex].allowedTools.push(tool.id);
                                  } else {
                                    newStates[stateIndex].allowedTools = 
                                      newStates[stateIndex].allowedTools.filter(t => t !== tool.id);
                                  }
                                  setConfig({ ...config, states: newStates });
                                }}
                              />
                              <label
                                htmlFor={`${state.id}-${tool.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                              >
                                {tool.name}
                                <Badge variant="outline" className="text-xs">
                                  {tool.riskLevel}
                                </Badge>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tool Registry</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure available tools with schemas and risk levels
              </p>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {config.tools.map((tool, index) => (
                  <Card key={tool.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          {tool.name}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{tool.category}</Badge>
                          <Badge
                            variant={
                              tool.riskLevel === 'critical' ? 'destructive' :
                              tool.riskLevel === 'high' ? 'default' :
                              'outline'
                            }
                          >
                            {tool.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>ID: {tool.id}</div>
                        <div>Category: {tool.category}</div>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Code className="w-3 h-3 mr-1" />
                            Edit Schema
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Classify & Risk Score Rules</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure sensitivity detection and risk scoring
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sensitivity Detection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pii">Detect PII (Personal Info)</Label>
                    <Switch
                      id="pii"
                      checked={config.classification.detectPII}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: { ...config.classification, detectPII: checked }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pci">Detect PCI (Payment Card)</Label>
                    <Switch
                      id="pci"
                      checked={config.classification.detectPCI}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: { ...config.classification, detectPCI: checked }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phi">Detect PHI (Health Info)</Label>
                    <Switch
                      id="phi"
                      checked={config.classification.detectPHI}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: { ...config.classification, detectPHI: checked }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="secrets">Detect Secrets (API Keys)</Label>
                    <Switch
                      id="secrets"
                      checked={config.classification.detectSecrets}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: { ...config.classification, detectSecrets: checked }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Trust Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={config.classification.trustLevel}
                    onValueChange={(value: any) =>
                      setConfig({
                        ...config,
                        classification: { ...config.classification, trustLevel: value }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trusted_internal">Trusted Internal</SelectItem>
                      <SelectItem value="untrusted_external">Untrusted External</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Risk Scoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="baseRisk">Base risk by tool</Label>
                    <Switch
                      id="baseRisk"
                      checked={config.classification.riskScoring.baseRiskByTool}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: {
                            ...config.classification,
                            riskScoring: { ...config.classification.riskScoring, baseRiskByTool: checked }
                          }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="untrustedRisk">Add risk if untrusted source</Label>
                    <Switch
                      id="untrustedRisk"
                      checked={config.classification.riskScoring.addRiskIfUntrusted}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: {
                            ...config.classification,
                            riskScoring: { ...config.classification.riskScoring, addRiskIfUntrusted: checked }
                          }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amountRisk">Add risk by payment amount</Label>
                    <Switch
                      id="amountRisk"
                      checked={config.classification.riskScoring.addRiskByAmount}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          classification: {
                            ...config.classification,
                            riskScoring: { ...config.classification.riskScoring, addRiskByAmount: checked }
                          }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Deterministic Validation Rules</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure business constraints and safety checks
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Schema Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="schemaValidation">Enforce JSON schema validation</Label>
                    <Switch
                      id="schemaValidation"
                      checked={config.validation.schemaValidation}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          validation: { ...config.validation, schemaValidation: checked }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Business Constraints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="paymentCap">Payment Cap ($)</Label>
                    <Input
                      id="paymentCap"
                      type="number"
                      value={config.validation.paymentCaps}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          validation: { ...config.validation, paymentCaps: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Safety Constraints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="blockSecrets">Block secrets in external calls</Label>
                    <Switch
                      id="blockSecrets"
                      checked={config.validation.blockSecrets}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          validation: { ...config.validation, blockSecrets: checked }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Transform & Redact Rules</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure privacy firewall and output filtering
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Input Redaction (before model/tool)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="redactCards">Redact card numbers</Label>
                  <Switch
                    id="redactCards"
                    checked={config.transform.redactCardNumbers}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        transform: { ...config.transform, redactCardNumbers: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="redactSSN">Redact SSN</Label>
                  <Switch
                    id="redactSSN"
                    checked={config.transform.redactSSN}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        transform: { ...config.transform, redactSSN: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="redactKeys">Redact API keys</Label>
                  <Switch
                    id="redactKeys"
                    checked={config.transform.redactAPIKeys}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        transform: { ...config.transform, redactAPIKeys: checked }
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Output Filtering (before returning to model)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="filterSecrets">Filter secrets from output</Label>
                  <Switch
                    id="filterSecrets"
                    checked={config.transform.filterSecrets}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        transform: { ...config.transform, filterSecrets: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tokenizePII">Tokenize PII in output</Label>
                  <Switch
                    id="tokenizePII"
                    checked={config.transform.tokenizePII}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        transform: { ...config.transform, tokenizePII: checked }
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Routing Rules</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure model/provider selection and routing logic
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Routing Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="regionBased">Enable region-based routing</Label>
                    <Switch
                      id="regionBased"
                      checked={config.routing.regionBased}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          routing: { ...config.routing, regionBased: checked }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fallback">Enable fallback logic</Label>
                    <Switch
                      id="fallback"
                      checked={config.routing.fallbackEnabled}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          routing: { ...config.routing, fallbackEnabled: checked }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Cost Tier</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={config.routing.costTier}
                    onValueChange={(value: any) =>
                      setConfig({
                        ...config,
                        routing: { ...config.routing, costTier: value }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Cost (slower models)</SelectItem>
                      <SelectItem value="medium">Medium (balanced)</SelectItem>
                      <SelectItem value="high">High Performance (premium models)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Budgets & Rate Limits</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prevent runaway loops and control costs
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Call Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="maxToolCalls">Max Tool Calls (per workflow run)</Label>
                    <Input
                      id="maxToolCalls"
                      type="number"
                      value={config.budgets.maxToolCalls}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          budgets: { ...config.budgets, maxToolCalls: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxModelCalls">Max Model Calls (per workflow run)</Label>
                    <Input
                      id="maxModelCalls"
                      type="number"
                      value={config.budgets.maxModelCalls}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          budgets: { ...config.budgets, maxModelCalls: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      value={config.budgets.maxTokens}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          budgets: { ...config.budgets, maxTokens: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Cost & Concurrency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="maxCost">Max Cost ($)</Label>
                    <Input
                      id="maxCost"
                      type="number"
                      value={config.budgets.maxCost}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          budgets: { ...config.budgets, maxCost: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="concurrency">Concurrency Cap</Label>
                    <Input
                      id="concurrency"
                      type="number"
                      value={config.budgets.concurrencyCap}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          budgets: { ...config.budgets, concurrencyCap: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="circuitBreaker">Circuit Breaker (failed retries)</Label>
                    <Input
                      id="circuitBreaker"
                      type="number"
                      value={config.budgets.circuitBreakerThreshold}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          budgets: { ...config.budgets, circuitBreakerThreshold: Number(e.target.value) }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">HITL Rules (Human-in-the-Loop)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure human approval flows for critical actions
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tools Requiring Approval</CardTitle>
                  <CardDescription className="text-xs">
                    Select tools that need human approval before execution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {config.tools.map(tool => (
                        <div key={tool.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`hitl-${tool.id}`}
                            checked={config.hitl.requiredForTools.includes(tool.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConfig({
                                  ...config,
                                  hitl: {
                                    ...config.hitl,
                                    requiredForTools: [...config.hitl.requiredForTools, tool.id]
                                  }
                                });
                              } else {
                                setConfig({
                                  ...config,
                                  hitl: {
                                    ...config.hitl,
                                    requiredForTools: config.hitl.requiredForTools.filter(t => t !== tool.id)
                                  }
                                });
                              }
                            }}
                          />
                          <label
                            htmlFor={`hitl-${tool.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                          >
                            {tool.name}
                            <Badge
                              variant={tool.riskLevel === 'critical' || tool.riskLevel === 'high' ? 'destructive' : 'outline'}
                              className="text-xs"
                            >
                              {tool.riskLevel}
                            </Badge>
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Approval Thresholds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="paymentThreshold">Payment Amount Threshold ($)</Label>
                    <Input
                      id="paymentThreshold"
                      type="number"
                      value={config.hitl.approvalThresholds.paymentAmount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          hitl: {
                            ...config.hitl,
                            approvalThresholds: {
                              ...config.hitl.approvalThresholds,
                              paymentAmount: Number(e.target.value)
                            }
                          }
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Require approval for payments above this amount
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fourEyes">Require "Four Eyes" (dual approval)</Label>
                      <p className="text-xs text-muted-foreground">For high-value transactions</p>
                    </div>
                    <Switch
                      id="fourEyes"
                      checked={config.hitl.approvalThresholds.requireFourEyes}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          hitl: {
                            ...config.hitl,
                            approvalThresholds: {
                              ...config.hitl.approvalThresholds,
                              requireFourEyes: checked
                            }
                          }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Approval Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="channel-app" checked disabled />
                      <label htmlFor="channel-app" className="text-sm font-medium">
                        In-app approval queue (required)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="channel-slack" />
                      <label htmlFor="channel-slack" className="text-sm font-medium">
                        Slack integration (coming soon)
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 10:
        return (
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Review & Deploy</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure HITL supervisors, notifications, and review your workflow
                </p>
              </div>

              {/* HITL Supervisors Onboarding */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        HITL Supervisors & Approvers
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Onboard personnel who will approve critical actions
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setShowAddSupervisor(!showAddSupervisor)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      {showAddSupervisor ? 'Cancel' : 'Add Supervisor'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Add Supervisor Form */}
                  {showAddSupervisor && (
                    <Card className="bg-accent/50">
                      <CardContent className="pt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="sup-name" className="text-xs">Full Name *</Label>
                            <Input
                              id="sup-name"
                              placeholder="Jane Doe"
                              value={newSupervisor.name}
                              onChange={(e) => setNewSupervisor({ ...newSupervisor, name: e.target.value })}
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sup-email" className="text-xs">Email *</Label>
                            <Input
                              id="sup-email"
                              type="email"
                              placeholder="jane@company.com"
                              value={newSupervisor.email}
                              onChange={(e) => setNewSupervisor({ ...newSupervisor, email: e.target.value })}
                              className="text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="sup-phone" className="text-xs">Phone (optional)</Label>
                            <Input
                              id="sup-phone"
                              placeholder="+1 (555) 123-4567"
                              value={newSupervisor.phone}
                              onChange={(e) => setNewSupervisor({ ...newSupervisor, phone: e.target.value })}
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sup-role" className="text-xs">Role *</Label>
                            <Select
                              value={newSupervisor.role}
                              onValueChange={(value: any) => setNewSupervisor({ ...newSupervisor, role: value })}
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="approver">Approver</SelectItem>
                                <SelectItem value="supervisor">Supervisor</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs mb-2 block">Notification Preferences</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="pref-email"
                                checked={newSupervisor.notificationPreferences.email}
                                onCheckedChange={(checked) =>
                                  setNewSupervisor({
                                    ...newSupervisor,
                                    notificationPreferences: { ...newSupervisor.notificationPreferences, email: !!checked }
                                  })
                                }
                              />
                              <label htmlFor="pref-email" className="text-xs">Email</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="pref-sms"
                                checked={newSupervisor.notificationPreferences.sms}
                                onCheckedChange={(checked) =>
                                  setNewSupervisor({
                                    ...newSupervisor,
                                    notificationPreferences: { ...newSupervisor.notificationPreferences, sms: !!checked }
                                  })
                                }
                              />
                              <label htmlFor="pref-sms" className="text-xs">SMS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="pref-slack"
                                checked={newSupervisor.notificationPreferences.slack}
                                onCheckedChange={(checked) =>
                                  setNewSupervisor({
                                    ...newSupervisor,
                                    notificationPreferences: { ...newSupervisor.notificationPreferences, slack: !!checked }
                                  })
                                }
                              />
                              <label htmlFor="pref-slack" className="text-xs">Slack</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="pref-app"
                                checked={newSupervisor.notificationPreferences.inApp}
                                onCheckedChange={(checked) =>
                                  setNewSupervisor({
                                    ...newSupervisor,
                                    notificationPreferences: { ...newSupervisor.notificationPreferences, inApp: !!checked }
                                  })
                                }
                              />
                              <label htmlFor="pref-app" className="text-xs">In-App</label>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            if (newSupervisor.name && newSupervisor.email) {
                              setConfig({
                                ...config,
                                supervisors: [
                                  ...config.supervisors,
                                  {
                                    id: `sup-${Date.now()}`,
                                    ...newSupervisor
                                  }
                                ]
                              });
                              setNewSupervisor({
                                name: '',
                                email: '',
                                phone: '',
                                role: 'approver',
                                permissions: [],
                                notificationPreferences: {
                                  email: true,
                                  sms: false,
                                  slack: false,
                                  inApp: true
                                }
                              });
                              setShowAddSupervisor(false);
                              toast.success('Supervisor added successfully');
                            } else {
                              toast.error('Name and email are required');
                            }
                          }}
                          className="w-full gap-2"
                          size="sm"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add Supervisor
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Supervisors List */}
                  {config.supervisors.length > 0 ? (
                    <div className="space-y-2">
                      {config.supervisors.map((supervisor) => (
                        <Card key={supervisor.id} className="bg-card">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{supervisor.name}</div>
                                  <div className="text-xs text-muted-foreground">{supervisor.email}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {supervisor.role}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setConfig({
                                      ...config,
                                      supervisors: config.supervisors.filter(s => s.id !== supervisor.id)
                                    });
                                    toast.success('Supervisor removed');
                                  }}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-2 flex gap-1">
                              {supervisor.notificationPreferences.email && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Mail className="w-3 h-3" />
                                  Email
                                </Badge>
                              )}
                              {supervisor.notificationPreferences.sms && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Phone className="w-3 h-3" />
                                  SMS
                                </Badge>
                              )}
                              {supervisor.notificationPreferences.slack && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Hash className="w-3 h-3" />
                                  Slack
                                </Badge>
                              )}
                              {supervisor.notificationPreferences.inApp && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Bell className="w-3 h-3" />
                                  In-App
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-lg">
                      <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                      No supervisors added yet. Add supervisors to enable human approval workflows.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notification Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Agentic Activity Notifications
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Configure where and how you receive notifications about agentic workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* In-App Notifications */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-blue-600" />
                          <CardTitle className="text-sm">In-App Notifications</CardTitle>
                        </div>
                        <Switch
                          checked={config.notifications.inApp.enabled}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                inApp: { ...config.notifications.inApp, enabled: checked }
                              }
                            })
                          }
                        />
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Email Notifications */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <CardTitle className="text-sm">Email Notifications</CardTitle>
                        </div>
                        <Switch
                          checked={config.notifications.email.enabled}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                email: { ...config.notifications.email, enabled: checked }
                              }
                            })
                          }
                        />
                      </div>
                    </CardHeader>
                    {config.notifications.email.enabled && (
                      <CardContent className="pt-0 space-y-2">
                        <Label className="text-xs">Recipients (comma-separated)</Label>
                        <Input
                          placeholder="team@company.com, alerts@company.com"
                          className="text-sm"
                          value={config.notifications.email.recipients.join(', ')}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                email: {
                                  ...config.notifications.email,
                                  recipients: e.target.value.split(',').map(s => s.trim())
                                }
                              }
                            })
                          }
                        />
                      </CardContent>
                    )}
                  </Card>

                  {/* Slack Integration */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-purple-600" />
                          <CardTitle className="text-sm">Slack Integration</CardTitle>
                        </div>
                        <Switch
                          checked={config.notifications.slack.enabled}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                slack: { ...config.notifications.slack, enabled: checked }
                              }
                            })
                          }
                        />
                      </div>
                    </CardHeader>
                    {config.notifications.slack.enabled && (
                      <CardContent className="pt-0 space-y-2">
                        <div>
                          <Label className="text-xs">Webhook URL</Label>
                          <Input
                            placeholder="https://hooks.slack.com/services/..."
                            className="text-sm"
                            value={config.notifications.slack.webhookUrl}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                notifications: {
                                  ...config.notifications,
                                  slack: { ...config.notifications.slack, webhookUrl: e.target.value }
                                }
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Channel</Label>
                          <Input
                            placeholder="#ai-governance"
                            className="text-sm"
                            value={config.notifications.slack.channel}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                notifications: {
                                  ...config.notifications,
                                  slack: { ...config.notifications.slack, channel: e.target.value }
                                }
                              })
                            }
                          />
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Microsoft Teams */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          <CardTitle className="text-sm">Microsoft Teams</CardTitle>
                        </div>
                        <Switch
                          checked={config.notifications.teams.enabled}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                teams: { ...config.notifications.teams, enabled: checked }
                              }
                            })
                          }
                        />
                      </div>
                    </CardHeader>
                    {config.notifications.teams.enabled && (
                      <CardContent className="pt-0">
                        <Label className="text-xs">Webhook URL</Label>
                        <Input
                          placeholder="https://outlook.office.com/webhook/..."
                          className="text-sm"
                          value={config.notifications.teams.webhookUrl}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                teams: { ...config.notifications.teams, webhookUrl: e.target.value }
                              }
                            })
                          }
                        />
                      </CardContent>
                    )}
                  </Card>

                  {/* Discord */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-indigo-600" />
                          <CardTitle className="text-sm">Discord</CardTitle>
                        </div>
                        <Switch
                          checked={config.notifications.discord.enabled}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                discord: { ...config.notifications.discord, enabled: checked }
                              }
                            })
                          }
                        />
                      </div>
                    </CardHeader>
                    {config.notifications.discord.enabled && (
                      <CardContent className="pt-0">
                        <Label className="text-xs">Webhook URL</Label>
                        <Input
                          placeholder="https://discord.com/api/webhooks/..."
                          className="text-sm"
                          value={config.notifications.discord.webhookUrl}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                discord: { ...config.notifications.discord, webhookUrl: e.target.value }
                              }
                            })
                          }
                        />
                      </CardContent>
                    )}
                  </Card>

                  {/* Custom Webhook */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Webhook className="w-4 h-4 text-orange-600" />
                          <CardTitle className="text-sm">Custom Webhook</CardTitle>
                        </div>
                        <Switch
                          checked={config.notifications.webhook.enabled}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                webhook: { ...config.notifications.webhook, enabled: checked }
                              }
                            })
                          }
                        />
                      </div>
                    </CardHeader>
                    {config.notifications.webhook.enabled && (
                      <CardContent className="pt-0">
                        <Label className="text-xs">Webhook URL</Label>
                        <Input
                          placeholder="https://your-endpoint.com/webhooks/ai-events"
                          className="text-sm"
                          value={config.notifications.webhook.url}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              notifications: {
                                ...config.notifications,
                                webhook: { ...config.notifications.webhook, url: e.target.value }
                              }
                            })
                          }
                        />
                      </CardContent>
                    )}
                  </Card>
                </CardContent>
              </Card>

              {/* Workflow Pipeline Diagram */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    PLCY Enforcement Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Filter className="w-4 h-4 text-purple-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Router className="w-4 h-4 text-orange-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Gauge className="w-4 h-4 text-yellow-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-pink-600" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-2 text-xs text-center">
                      <div>Classify</div>
                      <div>Validate</div>
                      <div>Transform</div>
                      <div>Route</div>
                      <div>Rate Limit</div>
                      <div>Log</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deployment Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Deployment Mode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="shadowMode" />
                    <label htmlFor="shadowMode" className="text-sm font-medium">
                      Start in Shadow Mode (log-only, no enforcement)
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shadow mode allows you to test and validate rules before enforcing them
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Agentic Workflow Wizard
          </DialogTitle>
          <DialogDescription>
            Configure your agentic workflow with PLCY's 6-step enforcement pipeline
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Progress auto-saved</span>
              <span className="font-medium">{Math.round(progress)}% Complete</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = isStepCompleted(index);
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors cursor-pointer hover:opacity-80 ${
                  isActive ? 'bg-blue-100 text-blue-700' :
                  isCompleted ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-500'
                }`}
              >
                {isCompleted && !isActive && <CheckCircle className="w-3 h-3" />}
                {!isCompleted && !isActive && <Circle className="w-3 h-3" />}
                <StepIcon className="w-3 h-3" />
                <span className="whitespace-nowrap hidden md:inline">{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <ScrollArea className="flex-1 pr-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete} className="gap-2">
                <PlayCircle className="w-4 h-4" />
                Deploy Workflow
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
