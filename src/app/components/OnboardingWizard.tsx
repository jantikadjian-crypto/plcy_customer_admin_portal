import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Globe,
  Building,
  Key,
  Zap,
  Shield,
  FileText,
  Eye,
  Database,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Copy,
  ExternalLink,
  Clock,
  Sparkles,
  Lock,
  Server,
  Code,
  Webhook,
  Activity,
  Users,
  AlertCircle,
  CloudCog
} from 'lucide-react';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export function OnboardingWizard({ isOpen, onClose, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    region: 'us',
    workspaceName: '',
    ssoEnabled: false,
    scimEnabled: false,
    aiProviders: [] as string[],
    apiKeys: {} as Record<string, string>,
    integrationPath: 'zero-code',
    policyPack: 'nist-ai-rmf',
    industryPack: 'general',
    dataRetention: '90',
    piiRedaction: true,
    encryption: true,
    storageLocation: 'regional',
    otelEnabled: true,
    slackEnabled: false,
    teamsEnabled: false,
    jiraEnabled: false,
    trustCenterSubdomain: ''
  });

  const steps = [
    { id: 'region', title: 'Choose Region', icon: Globe, time: '1 min' },
    { id: 'workspace', title: 'Create Workspace', icon: Building, time: '2 min' },
    { id: 'providers', title: 'Connect AI Providers', icon: Key, time: '3 min' },
    { id: 'integration', title: 'Integration Path', icon: Zap, time: '2 min' },
    { id: 'policy', title: 'Policy Starter Pack', icon: Shield, time: '2 min' },
    { id: 'transparency', title: 'Transparency Assets', icon: Eye, time: '2 min' },
    { id: 'data', title: 'Data Controls', icon: Database, time: '1 min' },
    { id: 'observability', title: 'Observability', icon: BarChart3, time: '1 min' },
    { id: 'notifications', title: 'Notifications', icon: Bell, time: '1 min' },
    { id: 'complete', title: 'Ship Your Badge', icon: Sparkles, time: '1 min' }
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'region':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Select Your Hosting Region</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose the geographic region where your data will be stored. This affects latency, compliance, and data residency.
              </p>
            </div>

            <RadioGroup value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
              <div className="grid gap-3">
                {[
                  { value: 'us', label: 'United States', flag: '🇺🇸', location: 'us-central1 (Iowa)' },
                  { value: 'eu', label: 'Europe', flag: '🇪🇺', location: 'europe-west1 (Belgium)' },
                  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧', location: 'europe-west2 (London)' },
                  { value: 'ca', label: 'Canada', flag: '🇨🇦', location: 'northamerica-northeast1 (Montreal)' },
                  { value: 'apac', label: 'Asia Pacific', flag: '🌏', location: 'asia-southeast1 (Singapore)' }
                ].map((region) => (
                  <label
                    key={region.value}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.region === region.value ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={region.value} id={region.value} />
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{region.flag}</span>
                        <div>
                          <div className="font-medium">{region.label}</div>
                          <div className="text-xs text-muted-foreground">{region.location}</div>
                        </div>
                      </div>
                      {formData.region === region.value && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Data residency compliance:</strong> Selecting EU/UK ensures GDPR compliance with data stored exclusively in those regions.
                </div>
              </div>
            </div>
          </div>
        );

      case 'workspace':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Create Your Workspace</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set up your organization's workspace with authentication options.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="workspace">Workspace Name</Label>
                <Input
                  id="workspace"
                  placeholder="e.g., Acme Corp AI Governance"
                  value={formData.workspaceName}
                  onChange={(e) => updateFormData('workspaceName', e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div className="p-4 border rounded-lg space-y-4">
                <h4>Authentication & Access</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Single Sign-On (SSO)</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable OIDC or SAML 2.0 for enterprise authentication
                    </p>
                  </div>
                  <Switch
                    checked={formData.ssoEnabled}
                    onCheckedChange={(checked) => updateFormData('ssoEnabled', checked)}
                  />
                </div>

                {formData.ssoEnabled && (
                  <div className="pl-4 border-l-2 space-y-3">
                    <div>
                      <Label htmlFor="sso-provider">SSO Provider</Label>
                      <select className="w-full mt-1.5 p-2 border rounded-md bg-background">
                        <option>Okta</option>
                        <option>Azure AD</option>
                        <option>Google Workspace</option>
                        <option>Auth0</option>
                        <option>OneLogin</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex-1">
                    <Label>SCIM 2.0 Provisioning</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto-provision users and groups
                    </p>
                  </div>
                  <Switch
                    checked={formData.scimEnabled}
                    onCheckedChange={(checked) => updateFormData('scimEnabled', checked)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>All authentication is SOC 2 Type II compliant</span>
              </div>
            </div>
          </div>
        );

      case 'providers':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Connect AI Providers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to your AI/LLM providers to auto-discover models and start tracking governance.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'openai', name: 'OpenAI', icon: '🤖', description: 'GPT-4, GPT-3.5, DALL-E' },
                { id: 'anthropic', name: 'Anthropic', icon: '🔷', description: 'Claude 3 Opus, Sonnet, Haiku' },
                { id: 'vertex', name: 'Google Vertex AI', icon: '🔵', description: 'PaLM 2, Gemini, custom models' },
                { id: 'bedrock', name: 'AWS Bedrock', icon: '🟠', description: 'Multiple foundation models' },
                { id: 'azure', name: 'Azure OpenAI', icon: '🔷', description: 'GPT-4, GPT-3.5 on Azure' }
              ].map((provider) => {
                const isSelected = formData.aiProviders.includes(provider.id);
                return (
                  <div key={provider.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData('aiProviders', [...formData.aiProviders, provider.id]);
                            } else {
                              updateFormData('aiProviders', formData.aiProviders.filter(p => p !== provider.id));
                            }
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{provider.icon}</span>
                            <span className="font-medium">{provider.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{provider.description}</p>
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="pl-10 space-y-2">
                        <Label>API Key</Label>
                        <Input
                          type="password"
                          placeholder="sk-..."
                          value={formData.apiKeys[provider.id] || ''}
                          onChange={(e) => updateFormData('apiKeys', {
                            ...formData.apiKeys,
                            [provider.id]: e.target.value
                          })}
                        />
                        {provider.id === 'vertex' && (
                          <p className="text-xs text-muted-foreground">
                            💡 We recommend using GCP Workload Identity Federation for keyless authentication
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex gap-2 text-sm text-green-800">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>We'll auto-discover your models and populate your AI inventory</span>
              </div>
            </div>
          </div>
        );

      case 'integration':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Choose Your Integration Path</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select how you want to integrate AI Governance into your application. You can add more later.
              </p>
            </div>

            <RadioGroup value={formData.integrationPath} onValueChange={(value) => updateFormData('integrationPath', value)}>
              <div className="space-y-3">
                <label
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.integrationPath === 'zero-code' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value="zero-code" id="zero-code" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">Zero-Code: JavaScript Badge</span>
                      <Badge variant="outline" className="text-xs">Fastest</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Copy-paste a JS snippet to embed your trust badge on any page. 60-second install.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.integrationPath === 'gateway' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value="gateway" id="gateway" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Server className="w-4 h-4" />
                      <span className="font-medium">Fast Path: Hosted Gateway</span>
                      <Badge variant="outline" className="text-xs">Recommended</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Route AI traffic through our gateway. No code changes—just update your base URL.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.integrationPath === 'sdk' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value="sdk" id="sdk" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Code className="w-4 h-4" />
                      <span className="font-medium">Code Path: SDK Integration</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Install our SDK (Python, Node, Go, Java) to instrument your AI calls directly.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.integrationPath === 'ops' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value="ops" id="ops" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Webhook className="w-4 h-4" />
                      <span className="font-medium">Ops Path: Webhooks & Streams</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stream events to Pub/Sub, Kafka, or webhooks for custom workflows.
                    </p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'policy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Policy Starter Pack</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bootstrap your governance with prebuilt policy templates mapped to leading frameworks.
              </p>
            </div>

            <div>
              <Label className="mb-3">Governance Framework</Label>
              <RadioGroup value={formData.policyPack} onValueChange={(value) => updateFormData('policyPack', value)}>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                    <RadioGroupItem value="nist-ai-rmf" id="nist" />
                    <div className="flex-1">
                      <div className="font-medium">NIST AI RMF</div>
                      <p className="text-xs text-muted-foreground">
                        Govern, Map, Measure, Manage functions
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                    <RadioGroupItem value="iso-42001" id="iso" />
                    <div className="flex-1">
                      <div className="font-medium">ISO/IEC 42001</div>
                      <p className="text-xs text-muted-foreground">
                        AI Management System controls
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                    <RadioGroupItem value="combined" id="combined" />
                    <div className="flex-1">
                      <div className="font-medium">Combined (NIST + ISO)</div>
                      <p className="text-xs text-muted-foreground">
                        Comprehensive governance coverage
                      </p>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3">Industry Pack (Optional)</Label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={formData.industryPack}
                onChange={(e) => updateFormData('industryPack', e.target.value)}
              >
                <option value="general">General / Technology</option>
                <option value="healthcare">Healthcare (HIPAA, FDA)</option>
                <option value="fintech">Financial Services (SOX, PCI-DSS)</option>
                <option value="education">Education (FERPA)</option>
                <option value="public">Public Sector (FedRAMP)</option>
                <option value="retail">Retail & E-commerce</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">42</div>
                <div className="text-xs text-muted-foreground">Policy Templates</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-green-600">87</div>
                <div className="text-xs text-muted-foreground">Control Points</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-xs text-muted-foreground">Best Practices</div>
              </Card>
            </div>
          </div>
        );

      case 'transparency':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Transparency Assets</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We'll auto-generate governance documentation for your trust center.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Model Cards</div>
                  <p className="text-sm text-muted-foreground">
                    Facts, data sources, eval scores, limitations for each AI model
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">Auto-generated</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">System Cards</div>
                  <p className="text-sm text-muted-foreground">
                    End-to-end AI usage documentation across your product
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">Auto-generated</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">EU AI Act Disclosures</div>
                  <p className="text-sm text-muted-foreground">
                    Synthetic content labels, user-interaction notices
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">Compliance</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Content Provenance (C2PA)</div>
                  <p className="text-sm text-muted-foreground">
                    Media authenticity for AI-generated images, video, audio
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex gap-2 text-sm">
                <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
                <div className="text-purple-800">
                  These assets update automatically as you use the platform and will be published to your trust center.
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Data Controls</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure data retention, privacy, and storage options.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Data Retention Period</Label>
                <RadioGroup value={formData.dataRetention} onValueChange={(value) => updateFormData('dataRetention', value)}>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                      <RadioGroupItem value="30" id="30days" />
                      <span className="text-sm">30 days</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                      <RadioGroupItem value="90" id="90days" />
                      <span className="text-sm">90 days</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                      <RadioGroupItem value="365" id="365days" />
                      <span className="text-sm">1 year</span>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <Label>PII Redaction</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect and redact personal information
                  </p>
                </div>
                <Switch
                  checked={formData.piiRedaction}
                  onCheckedChange={(checked) => updateFormData('piiRedaction', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <Label>Encryption (KMS-backed)</Label>
                  <p className="text-sm text-muted-foreground">
                    Encrypt data at rest with Cloud KMS
                  </p>
                </div>
                <Switch
                  checked={formData.encryption}
                  onCheckedChange={(checked) => updateFormData('encryption', checked)}
                />
              </div>

              <div>
                <Label>Storage Location Type</Label>
                <select
                  className="w-full mt-2 p-2 border rounded-md bg-background"
                  value={formData.storageLocation}
                  onChange={(e) => updateFormData('storageLocation', e.target.value)}
                >
                  <option value="regional">Regional (lowest latency)</option>
                  <option value="dual-region">Dual-region (high availability)</option>
                  <option value="multi-region">Multi-region (global access)</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on your selected region: {formData.region.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        );

      case 'observability':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Observability & QA</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor AI performance, quality, and safety metrics.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4" />
                  <Label>OpenTelemetry Integration</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Export traces, metrics, and logs to your observability stack
                </p>
              </div>
              <Switch
                checked={formData.otelEnabled}
                onCheckedChange={(checked) => updateFormData('otelEnabled', checked)}
              />
            </div>

            {formData.otelEnabled && (
              <div className="pl-4 border-l-2 space-y-3">
                <div>
                  <Label>Export Destination (Optional)</Label>
                  <select className="w-full mt-2 p-2 border rounded-md bg-background">
                    <option>PLCY (Built-in)</option>
                    <option>Grafana Cloud</option>
                    <option>Datadog</option>
                    <option>New Relic</option>
                    <option>Honeycomb</option>
                    <option>Custom OTLP Endpoint</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Prebuilt Dashboards</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Response Latency',
                  'Refusal Rates',
                  'Harmful Content Detection',
                  'Jailbreak Attempts',
                  'Hallucination Flags',
                  'Cost Tracking',
                  'Token Usage',
                  'Model Performance'
                ].map((dashboard) => (
                  <div key={dashboard} className="flex items-center gap-2 p-2 bg-accent rounded">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs">{dashboard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Notifications & Workflow</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect team communication and ticketing tools.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">💬</span>
                  </div>
                  <div>
                    <Label>Slack Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerts for policy violations and risks
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.slackEnabled}
                  onCheckedChange={(checked) => updateFormData('slackEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">💼</span>
                  </div>
                  <div>
                    <Label>Microsoft Teams</Label>
                    <p className="text-sm text-muted-foreground">
                      Adaptive cards for governance events
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.teamsEnabled}
                  onCheckedChange={(checked) => updateFormData('teamsEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                  <div>
                    <Label>Jira Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto-create tickets for violations and drift
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.jiraEnabled}
                  onCheckedChange={(checked) => updateFormData('jiraEnabled', checked)}
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>More integrations available:</strong> PagerDuty, ServiceNow, Linear, Discord, and custom webhooks
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">You're All Set! 🎉</h3>
              <p className="text-sm text-muted-foreground">
                Your PLCY platform is configured and ready to use.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2">Your Trust Center URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.trustCenterSubdomain || 'your-company'}
                    onChange={(e) => updateFormData('trustCenterSubdomain', e.target.value)}
                    placeholder="your-company"
                    className="flex-1"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">
                    .plcy.io
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Custom domains available on Business plan
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Trust Badge Snippet</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => {
                      const snippet = `<div data-plcy-widget data-company-id="${formData.trustCenterSubdomain || 'your-company'}"></div>\n<script src="https://cdn.plcy.io/widget/v1.js"></script>`;
                      navigator.clipboard.writeText(snippet);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                </div>
                <pre className="p-3 bg-slate-950 text-slate-50 rounded-lg text-xs overflow-x-auto">
{`<div data-plcy-widget 
     data-company-id="${formData.trustCenterSubdomain || 'your-company'}">
</div>
<script src="https://cdn.plcy.io/widget/v1.js"></script>`}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">AI Providers</span>
                  </div>
                  <div className="text-2xl font-bold">{formData.aiProviders.length}</div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Policies</span>
                  </div>
                  <div className="text-2xl font-bold">42</div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Region</span>
                  </div>
                  <div className="text-sm font-bold">{formData.region.toUpperCase()}</div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Trust Center</span>
                  </div>
                  <div className="text-sm font-bold">Ready</div>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <StepIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle>15-Minute Setup Wizard</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {totalSteps} • {steps[currentStep].time} • {steps[currentStep].title}
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              ~{15 - currentStep} min left
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </DialogHeader>

        <div className="py-6">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps - 1 && (
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext} className="gap-2">
              {currentStep === totalSteps - 1 ? (
                <>
                  Complete Setup
                  <CheckCircle className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
