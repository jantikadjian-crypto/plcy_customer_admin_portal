import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { 
  Plug, 
  Code, 
  Zap, 
  Globe, 
  Database, 
  Webhook,
  Server,
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  Radio,
  Link2,
  Eye,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Building,
  Key,
  FileText,
  BarChart3,
  Bell,
  AlertCircle,
  Activity,
  X,
  HelpCircle,
  GitBranch,
  TrendingUp
} from 'lucide-react';

export function ConnectPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    region: 'us',
    workspaceName: '',
    ssoEnabled: false,
    scimEnabled: false,
    aiProviders: [] as string[],
    apiKeys: {} as Record<string, string>,
    integrationPath: 'gateway',
    policyPack: 'nist-ai-rmf',
    industryPack: 'general',
    dataRetention: '90',
    piiRedaction: true,
    encryption: true,
    storageLocation: 'regional',
    routingEnabled: true,
    routingStrategy: 'cost-optimized',
    fallbackEnabled: true,
    geoRouting: true,
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
    { id: 'routing', title: 'Request Routing', icon: GitBranch, time: '2 min' },
    { id: 'observability', title: 'Observability', icon: BarChart3, time: '1 min' },
    { id: 'notifications', title: 'Notifications', icon: Bell, time: '1 min' },
    { id: 'complete', title: 'Ship Your Badge', icon: Sparkles, time: '1 min' }
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete onboarding - show completion message but stay on wizard
      console.log('Onboarding complete:', formData);
      // Could show a success toast or navigate elsewhere
      // For now, keep them on the completion step
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const startOnboarding = () => {
    setIsOnboarding(true);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exitOnboarding = () => {
    // Toggle between wizard view and integration options view
    setIsOnboarding(false);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showOnboarding = () => {
    setIsOnboarding(true);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderOnboardingStep = () => {
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

      case 'routing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Intelligent Request Routing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Route AI requests to different providers based on cost, performance, compliance, and reliability requirements.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <GitBranch className="w-4 h-4 text-blue-600" />
                  <Label>Enable Smart Routing</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically route requests across providers for optimal cost, performance, and compliance
                </p>
              </div>
              <Switch
                checked={formData.routingEnabled}
                onCheckedChange={(checked) => updateFormData('routingEnabled', checked)}
              />
            </div>

            {formData.routingEnabled && (
              <>
                <div>
                  <Label>Primary Routing Strategy</Label>
                  <RadioGroup value={formData.routingStrategy} onValueChange={(value) => updateFormData('routingStrategy', value)}>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                        <RadioGroupItem value="cost-optimized" id="cost-opt" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Cost Optimized</span>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Recommended
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Route simple queries to GPT-3.5/Claude Haiku, complex to GPT-4/Claude Opus
                          </p>
                        </div>
                      </label>
                      
                      <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                        <RadioGroupItem value="performance" id="perf" />
                        <div className="flex-1">
                          <span className="text-sm font-medium">Performance First</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            Prioritize lowest latency providers (e.g., Azure OpenAI for speed)
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                        <RadioGroupItem value="compliance" id="comp" />
                        <div className="flex-1">
                          <span className="text-sm font-medium">Compliance First</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            Route based on data residency and regulatory requirements (GDPR, HIPAA)
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-primary/50">
                        <RadioGroupItem value="balanced" id="bal" />
                        <div className="flex-1">
                          <span className="text-sm font-medium">Balanced</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            Balance cost, performance, and quality across providers
                          </p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <Label>Automatic Failover</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Automatically switch to backup provider if primary is down or rate-limited
                      </p>
                    </div>
                    <Switch
                      checked={formData.fallbackEnabled}
                      onCheckedChange={(checked) => updateFormData('fallbackEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Globe className="w-4 h-4" />
                        <Label>Geographic Routing</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Route EU requests to EU-hosted models, US to US, for compliance
                      </p>
                    </div>
                    <Switch
                      checked={formData.geoRouting}
                      onCheckedChange={(checked) => updateFormData('geoRouting', checked)}
                    />
                  </div>
                </div>

                <div className="p-4 bg-accent border rounded-lg">
                  <div className="text-sm font-medium mb-2">Routing Rules Preview</div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>Simple queries ({"<"}500 tokens) → GPT-3.5 Turbo (lowest cost)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>Complex queries ({">"}500 tokens) → GPT-4 (best quality)</span>
                    </div>
                    {formData.geoRouting && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>EU users → Azure OpenAI EU region (GDPR compliant)</span>
                      </div>
                    )}
                    {formData.fallbackEnabled && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Primary down → Auto-failover to Claude (99.9% uptime)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-2 text-sm">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <div className="text-blue-800">
                      <strong>Advanced routing rules</strong> (A/B testing, custom logic, HITL integration) available in Settings → Request Routing after setup.
                    </div>
                  </div>
                </div>
              </>
            )}
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

  // Helper content for each step
  const getStepHelp = (stepId: string) => {
    const helpContent: Record<string, { tips: string[], video?: string, docs?: string[], tools?: { name: string, desc: string }[] }> = {
      region: {
        tips: [
          'Choose the region closest to your primary user base for best performance',
          'EU/UK regions ensure GDPR compliance with data residency guarantees',
          'You can migrate regions later if needed (with downtime)'
        ],
        video: 'https://player.vimeo.com/video/example-region',
        docs: ['Data Residency Guide', 'GDPR Compliance Overview'],
        tools: [
          { name: 'Region Latency Checker', desc: 'Test latency from your location' }
        ]
      },
      workspace: {
        tips: [
          'Use a descriptive workspace name that includes your company or team',
          'SSO setup can be completed later in Settings',
          'SCIM provisioning automatically syncs your directory with PLCY'
        ],
        video: 'https://player.vimeo.com/video/example-workspace',
        docs: ['SSO Setup Guide', 'SCIM Configuration'],
        tools: [
          { name: 'SSO Test Tool', desc: 'Validate your SSO configuration' }
        ]
      },
      providers: {
        tips: [
          'API keys are encrypted at rest and never logged',
          'We only query model metadata, not actual usage data',
          'Multiple providers can be added and removed at any time'
        ],
        video: 'https://player.vimeo.com/video/example-providers',
        docs: ['API Key Management', 'Provider Integration Guide'],
        tools: [
          { name: 'API Key Validator', desc: 'Test your provider credentials' }
        ]
      },
      integration: {
        tips: [
          'Gateway is fastest to deploy - no code changes required',
          'SDK provides more granular control and custom instrumentation',
          'You can use multiple integration methods simultaneously'
        ],
        video: 'https://player.vimeo.com/video/example-integration',
        docs: ['Integration Comparison', 'Quick Start Guides'],
        tools: [
          { name: 'SDK Playground', desc: 'Test SDK calls in your browser' }
        ]
      },
      policy: {
        tips: [
          'NIST AI RMF is the most popular choice for tech companies',
          'Combined packs provide maximum coverage but more overhead',
          'Industry packs add specific compliance requirements (HIPAA, SOX, etc.)'
        ],
        video: 'https://player.vimeo.com/video/example-policy',
        docs: ['Policy Framework Guide', 'Compliance Mapping'],
        tools: [
          { name: 'Policy Builder', desc: 'Create custom policies' }
        ]
      },
      transparency: {
        tips: [
          'Model cards are auto-generated from your AI inventory',
          'C2PA support adds media authenticity for AI-generated content',
          'All assets update in real-time as your systems change'
        ],
        video: 'https://player.vimeo.com/video/example-transparency',
        docs: ['Model Card Spec', 'C2PA Implementation'],
        tools: [
          { name: 'Model Card Preview', desc: 'See what your cards will look like' }
        ]
      },
      data: {
        tips: [
          '90 days is recommended for most compliance requirements',
          'PII redaction uses ML to detect and redact sensitive data',
          'Regional storage keeps data in your selected geographic region'
        ],
        video: 'https://player.vimeo.com/video/example-data',
        docs: ['Data Retention Policy', 'PII Detection Guide'],
        tools: [
          { name: 'PII Scanner', desc: 'Test PII detection on sample data' }
        ]
      },
      routing: {
        tips: [
          'Cost-optimized routing can reduce LLM costs by 60-80%',
          'Failover ensures 99.9% uptime even if primary provider goes down',
          'Geographic routing ensures GDPR/HIPAA compliance automatically',
          'Advanced rules (A/B testing, HITL integration) available in Settings'
        ],
        video: 'https://player.vimeo.com/video/example-routing',
        docs: ['Routing Strategies Guide', 'Provider Comparison', 'ISO 42001 §8.3 Compliance'],
        tools: [
          { name: 'Cost Calculator', desc: 'Estimate savings with smart routing' },
          { name: 'Latency Tester', desc: 'Test provider response times' }
        ]
      },
      observability: {
        tips: [
          'OpenTelemetry provides standardized metrics and traces',
          'Metrics are sent to your existing observability stack',
          'Custom dashboards can be created in Grafana, DataDog, etc.'
        ],
        video: 'https://player.vimeo.com/video/example-observability',
        docs: ['OTel Configuration', 'Metrics Reference'],
        tools: [
          { name: 'Metrics Explorer', desc: 'Browse available metrics' }
        ]
      },
      notifications: {
        tips: [
          'Slack is the fastest way to get started with alerts',
          'Jira integration creates tickets for policy violations',
          'Configure notification rules after setup in Settings'
        ],
        video: 'https://player.vimeo.com/video/example-notifications',
        docs: ['Notification Rules', 'Slack Bot Setup'],
        tools: [
          { name: 'Alert Tester', desc: 'Send test notifications' }
        ]
      },
      complete: {
        tips: [
          'Your trust center URL is customizable with a custom domain',
          'The trust badge auto-updates with your governance status',
          'You can manage all settings in the main dashboard'
        ],
        video: 'https://player.vimeo.com/video/example-complete',
        docs: ['Trust Center Guide', 'Badge Customization'],
        tools: [
          { name: 'Badge Preview', desc: 'See how your badge looks' }
        ]
      }
    };
    
    return helpContent[stepId] || { tips: [], docs: [], tools: [] };
  };

  // If in onboarding mode, show the step-by-step wizard
  if (isOnboarding) {
    const StepIcon = steps[currentStep].icon;
    const currentStepHelp = getStepHelp(steps[currentStep].id);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
        {/* Header with progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <StepIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2>15-Minute Setup Wizard</h2>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {totalSteps} • {steps[currentStep].time} • {steps[currentStep].title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                ~{15 - currentStep} min left
              </Badge>
              <Button variant="ghost" size="sm" onClick={exitOnboarding}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        {/* Step indicators */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isComplete = idx < currentStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isComplete
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="hidden md:inline">{step.title}</span>
                  <span className="md:hidden">{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <Card className="p-8">
          {renderOnboardingStep()}
        </Card>

        {/* Navigation */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
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
        </Card>
        </div>

        {/* Help sidebar - 1/3 width */}
        <div className="space-y-4">
          {/* Quick Tips */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4>Quick Tips</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {currentStepHelp.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-blue-600 shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Video Tutorial */}
          {currentStepHelp.video && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-purple-600" />
                <h4>Video Tutorial</h4>
              </div>
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                <div className="text-center text-sm text-muted-foreground">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p>Video tutorial available</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <ExternalLink className="w-3 h-3" />
                Watch Tutorial
              </Button>
            </Card>
          )}

          {/* Documentation Links */}
          {currentStepHelp.docs && currentStepHelp.docs.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-green-600" />
                <h4>Documentation</h4>
              </div>
              <div className="space-y-2">
                {currentStepHelp.docs.map((doc, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-sm"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {doc}
                  </Button>
                ))}
              </div>
            </Card>
          )}

          {/* Tools */}
          {currentStepHelp.tools && currentStepHelp.tools.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-orange-600" />
                <h4>Tools</h4>
              </div>
              <div className="space-y-3">
                {currentStepHelp.tools.map((tool, idx) => (
                  <div key={idx}>
                    <div className="font-medium text-sm">{tool.name}</div>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Help CTA */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="text-center space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto text-blue-600" />
              <h4 className="text-sm">Need Help?</h4>
              <p className="text-xs text-muted-foreground">
                Our team is here to assist you with setup
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Default view - show integration options
  const connectOptions = [
    {
      id: 'button',
      icon: Plug,
      title: 'Connect Button & OAuth Flow',
      category: 'Embeddable',
      difficulty: 'Easy',
      time: '5 min',
      description: 'Drop-in "Connect with PLCY" button using OIDC/OAuth 2.0 Authorization Code + PKCE flow',
      features: [
        'Works anywhere (web apps, SaaS dashboards, marketplaces)',
        'OpenID Connect & OAuth 2.0 standard',
        'Dynamic client registration (OpenID/DCR) for scale',
        'Brandable button kit (React/Vue/Vanilla)',
        'SSO support: OIDC & SAML 2.0',
        'SCIM 2.0 for automated user lifecycle'
      ],
      codeExample: `<!-- Vanilla JavaScript -->
<button id="connect-plcy">
  Connect with PLCY
</button>
<script src="https://connect.plcy.io/v1/button.js"></script>
<script>
  PLCYConnect.init({
    clientId: 'YOUR_CLIENT_ID',
    redirectUri: 'https://your-app.com/callback',
    scope: 'openid profile ai:read ai:write'
  });
</script>

// React Component
import { ConnectButton } from '@plcy/connect-react';

<ConnectButton
  clientId="YOUR_CLIENT_ID"
  onSuccess={(data) => console.log(data)}
  plan="pro"
  region="eu"
/>`,
      links: [
        { label: 'View Documentation', url: '#' },
        { label: 'Get API Keys', url: '#' },
        { label: 'Test in Sandbox', url: '#' }
      ]
    },
    {
      id: 'widget',
      icon: Eye,
      title: 'Trust & Transparency Widget',
      category: 'Embeddable',
      difficulty: 'Easy',
      time: '2 min',
      description: 'Lightweight JavaScript snippet that renders your trust badge, compliance score, and opens a detailed drawer with governance data',
      features: [
        '60-second installation with single script tag',
        'Displays trust badge, compliance score, model cards',
        'Interactive drawer with system cards & disclosures',
        'Incident history and policy attestations',
        'Configurable via data attributes',
        'Auto-updates with your governance activities'
      ],
      codeExample: `<!-- Drop this on any page -->
<div 
  data-plcy-widget
  data-company-id="YOUR_COMPANY_ID"
  data-style="badge"
  data-theme="light"
></div>
<script src="https://cdn.plcy.io/widget/v1.js"></script>

<!-- Advanced configuration -->
<div 
  data-plcy-widget
  data-company-id="YOUR_COMPANY_ID"
  data-style="full-panel"
  data-show="compliance,models,incidents"
  data-position="bottom-right"
></div>`,
      links: [
        { label: 'Widget Builder', url: '#' },
        { label: 'Customization Guide', url: '#' },
        { label: 'Live Examples', url: '#' }
      ]
    },
    {
      id: 'gateway',
      icon: Server,
      title: 'LLM/API Gateway',
      category: 'Infrastructure',
      difficulty: 'Medium',
      time: '30 min',
      description: 'Transparent proxy that sits in front of AI providers (OpenAI, Anthropic, Vertex AI, Bedrock) for zero-code governance',
      features: [
        'No application code changes required',
        'Supports all major LLM providers',
        'Policy enforcement & guardrails',
        'PII detection and redaction',
        'Prompt/completion logging & telemetry',
        'Available as hosted or Kubernetes sidecar'
      ],
      codeExample: `# Hosted Gateway (Easiest)
# Just point your API calls to our gateway

export OPENAI_BASE_URL="https://gateway.plcy.io/v1"
export PLCY_API_KEY="your_plcy_key"

# Your existing code works unchanged!
openai.chat.completions.create(...)

# Kubernetes Sidecar Deployment
apiVersion: v1
kind: Pod
metadata:
  name: your-app
spec:
  containers:
  - name: app
    image: your-app:latest
    env:
    - name: OPENAI_BASE_URL
      value: "http://localhost:8080/v1"
  - name: plcy-gateway
    image: plcy/gateway:latest
    env:
    - name: PLCY_API_KEY
      valueFrom:
        secretKeyRef:
          name: plcy-secret
          key: api-key`,
      links: [
        { label: 'Setup Guide', url: '#' },
        { label: 'Kubernetes Deployment', url: '#' },
        { label: 'Provider Support', url: '#' }
      ]
    },
    {
      id: 'sdks',
      icon: Code,
      title: 'Language SDKs',
      category: 'Developer',
      difficulty: 'Easy',
      time: '10 min',
      description: 'Lightweight client libraries to instrument LLM calls and send transparency events with OpenTelemetry semantic conventions',
      features: [
        'Node.js, Python, Go, Java, Ruby',
        'OpenTelemetry-compatible for portability',
        'Works with existing observability stacks',
        'Automatic prompt/response tracking',
        'Custom metadata and tags',
        'Async, non-blocking instrumentation'
      ],
      codeExample: `# Python SDK
pip install plcy-python

from plcy import PLCY
import openai

plcy = PLCY(api_key="your_key")

@plcy.track(
  system="customer-support-bot",
  data_classes=["customer_data", "support_tickets"]
)
def generate_response(prompt):
    return openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

# Node.js SDK
npm install @plcy/node

import { PLCY } from '@plcy/node';
import OpenAI from 'openai';

const plcy = new PLCY({ apiKey: process.env.PLCY_API_KEY });
const openai = plcy.instrument(new OpenAI());

// All calls automatically tracked!
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});`,
      links: [
        { label: 'Python Docs', url: '#' },
        { label: 'Node.js Docs', url: '#' },
        { label: 'Go Docs', url: '#' },
        { label: 'Java Docs', url: '#' }
      ]
    },
    {
      id: 'events',
      icon: Webhook,
      title: 'Event Sinks & Webhooks',
      category: 'Integration',
      difficulty: 'Medium',
      time: '15 min',
      description: 'Real-time webhooks and streaming connectors for high-volume logs and governance events',
      features: [
        'Webhooks for governance events',
        'Google Pub/Sub, Kafka, Kinesis support',
        'Risk findings, policy violations, PII alerts',
        'Content provenance events',
        'Custom event filtering & routing',
        'Retry logic and delivery guarantees'
      ],
      codeExample: `# Configure Webhook Endpoint
POST /api/v1/webhooks
{
  "url": "https://your-app.com/webhooks/plcy",
  "events": [
    "risk.finding.created",
    "policy.violation.detected",
    "pii.alert.triggered",
    "model.deployed"
  ],
  "secret": "your_webhook_secret"
}

# Stream to Pub/Sub
POST /api/v1/streams
{
  "type": "pubsub",
  "project": "your-gcp-project",
  "topic": "plcy-events",
  "credentials": "base64_encoded_sa_key",
  "filter": {
    "severity": ["high", "critical"]
  }
}

# Webhook Payload Example
{
  "event": "risk.finding.created",
  "timestamp": "2025-10-05T14:30:00Z",
  "data": {
    "finding_id": "find_abc123",
    "severity": "high",
    "system": "customer-support-bot",
    "description": "Potential data leakage detected"
  }
}`,
      links: [
        { label: 'Webhook Reference', url: '#' },
        { label: 'Event Types', url: '#' },
        { label: 'Streaming Guide', url: '#' }
      ]
    },
    {
      id: 'connectors',
      icon: Database,
      title: 'Data & Platform Connectors',
      category: 'Integration',
      difficulty: 'Medium',
      time: '20 min',
      description: 'Pre-built connectors for cloud data platforms, MLOps tools, and productivity apps',
      features: [
        'Cloud data: BigQuery, Snowflake, Redshift',
        'Object storage: GCS, S3, Azure Blob',
        'MLOps: Vertex AI, W&B, MLflow',
        'Productivity: Slack, Teams, Jira, PagerDuty',
        'One-click OAuth authentication',
        'Automatic schema detection'
      ],
      codeExample: `# BigQuery Connector
POST /api/v1/connectors/bigquery
{
  "project_id": "your-project",
  "dataset": "ai_governance_logs",
  "credentials": "service_account_json",
  "sync_frequency": "hourly",
  "tables": {
    "prompts": "prompts_log",
    "completions": "completions_log",
    "incidents": "incident_log"
  }
}

# Slack Integration
POST /api/v1/connectors/slack
{
  "workspace": "your-workspace",
  "channel": "#ai-governance",
  "notifications": [
    "high_risk_findings",
    "policy_violations",
    "compliance_milestones"
  ],
  "mention_on_critical": true
}

# MLflow Tracking
export MLFLOW_TRACKING_URI="https://api.plcy.io/mlflow"
export PLCY_API_KEY="your_key"

# Your existing MLflow code works!
mlflow.log_param("model", "gpt-4")
mlflow.log_metric("accuracy", 0.95)`,
      links: [
        { label: 'All Connectors', url: '#' },
        { label: 'Setup Guides', url: '#' },
        { label: 'Request Connector', url: '#' }
      ]
    },
    {
      id: 'nocode',
      icon: Zap,
      title: 'No-Code Integrations',
      category: 'No-Code',
      difficulty: 'Easy',
      time: '5 min',
      description: 'Zapier, Make, and n8n integrations for workflow automation without writing code',
      features: [
        'Zapier: 5000+ app integrations',
        'Make (Integromat) visual workflows',
        'n8n self-hosted automation',
        'Triggers: model deployed, risk detected, compliance milestone',
        'Actions: create system card, update trust center, send notification',
        'Pre-built templates'
      ],
      codeExample: `# Popular Zap Templates

1. "New AI Model Deployed" → Create System Card
   Trigger: PLCY - New Model
   Action: PLCY - Create/Update System Card
   
2. "High Risk Finding" → Notify Team & Create Ticket
   Trigger: PLCY - Risk Finding
   Filter: Severity = "High" or "Critical"
   Actions: 
   - Slack - Send Message
   - Jira - Create Issue
   
3. "Compliance Milestone" → Update Trust Center & Email
   Trigger: PLCY - Compliance Score Change
   Filter: Score ≥ 90%
   Actions:
   - PLCY - Publish Trust Center Update
   - Email - Send Celebration Email

# Make.com Scenario
Watch AI Governance Events
  → Router (by event type)
    → Risk Finding → Create Jira Ticket
    → Model Deployed → Update Google Sheet
    → Policy Violation → Send PagerDuty Alert`,
      links: [
        { label: 'Zapier App', url: '#' },
        { label: 'Make Templates', url: '#' },
        { label: 'n8n Nodes', url: '#' }
      ]
    },
    {
      id: 'trustcenter',
      icon: Globe,
      title: 'Public Trust Center Pages',
      category: 'Public',
      difficulty: 'Easy',
      time: '1 min',
      description: 'Hosted, shareable pages automatically populated with your governance data - your transparency hub',
      features: [
        'Custom domain: trust.yourcompany.com',
        'Auto-generated from your governance activities',
        'Model Cards & System Cards',
        'Third-party model usage disclosure',
        'Data retention & privacy policies',
        'Incident log & status page',
        'EU AI Act transparency disclosures',
        'C2PA content credentials support'
      ],
      codeExample: `# Your Trust Center Structure

https://trust.yourcompany.com/
├── /models              # Model Cards
│   ├── /gpt-4
│   ├── /claude-3
│   └── /custom-model
├── /systems             # System Cards  
│   ├── /customer-support
│   ├── /content-generation
│   └── /risk-assessment
├── /data                # Data Governance
│   ├── /retention
│   ├── /processing
│   └── /privacy
├── /compliance          # Regulatory
│   ├── /eu-ai-act
│   ├── /certifications
│   └── /attestations
├── /incidents           # Transparency
│   └── /status
└── /provenance          # C2PA

# Embed Trust Center in Your Site
<iframe 
  src="https://trust.yourcompany.com/embed"
  width="100%"
  height="600"
  frameborder="0"
></iframe>

# API Access to Trust Center Data
GET https://api.plcy.io/v1/trust-center
Authorization: Bearer YOUR_API_KEY

# Share specific disclosures
https://trust.yourcompany.com/share/abc123`,
      links: [
        { label: 'Setup Custom Domain', url: '#' },
        { label: 'Preview Your Trust Center', url: '#' },
        { label: 'Customization Options', url: '#' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Plug className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="mb-2">Connect & Integrate</h1>
            <p className="text-muted-foreground">
              Choose from 8 integration surfaces so "one click to transparency" is always possible—no matter how your product is built.
              Offer seamless connections to partners, customers, and your own applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <Plug className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-sm">OAuth & SSO</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Eye className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <div className="text-sm">Trust Widgets</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Server className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-sm">API Gateway</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-sm">No-Code Tools</div>
          </div>
        </div>
      </div>

      {/* Quick toggle between wizard and integration docs */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 p-1 bg-accent rounded-lg">
          <Button
            variant={isOnboarding ? "default" : "ghost"}
            size="sm"
            onClick={showOnboarding}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            15-Min Setup Wizard
          </Button>
          <Button
            variant={!isOnboarding ? "default" : "ghost"}
            size="sm"
            onClick={exitOnboarding}
            className="gap-2"
          >
            <Code className="w-4 h-4" />
            Integration Options
          </Button>
        </div>
      </div>

      {/* Onboarding CTA - only show when NOT in wizard mode */}
      {!isOnboarding && (
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-white">Get Started in 15 Minutes</h2>
            </div>
            <p className="text-white/90 mb-4">
              Our guided setup wizard will configure your region, connect AI providers, set up your integration path, 
              and generate your trust center—all with sensible defaults and one-click options.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <CheckCircle className="w-4 h-4" />
                <span>Auto-discover models</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <CheckCircle className="w-4 h-4" />
                <span>Policy templates included</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <CheckCircle className="w-4 h-4" />
                <span>Trust center ready</span>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-white/90 gap-2"
              onClick={showOnboarding}
            >
              <Sparkles className="w-5 h-5" />
              Start 15-Minute Setup
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
      )}

      {/* Quick Stats - only show when NOT in wizard mode */}
      {!isOnboarding && (
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Active Integrations</div>
              <div className="text-2xl">23</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">API Calls (24h)</div>
              <div className="text-2xl">1.2M</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Connected Partners</div>
              <div className="text-2xl">47</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-2xl">99.9%</div>
            </div>
          </div>
        </Card>
      </div>
      )}

      {/* Integration Options - only show when NOT in wizard mode */}
      {!isOnboarding && (
      <div className="space-y-6">
        {connectOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.id} className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2>{option.title}</h2>
                    <Badge variant="outline">{option.category}</Badge>
                    <Badge 
                      variant={option.difficulty === 'Easy' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {option.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      <Clock className="w-3 h-3" />
                      {option.time}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="features" className="mt-4">
                <TabsList>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="code">Code Examples</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="space-y-2 mt-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{option.codeExample}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 gap-2"
                      onClick={() => copyToClipboard(option.codeExample, option.id)}
                    >
                      {copiedCode === option.id ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {option.links.map((link, idx) => (
                      <Button key={idx} variant="outline" className="gap-2">
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          );
        })}

        {/* Security & Standards */}
        <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-start gap-4 mb-4">
          <Lock className="w-8 h-8 shrink-0" />
          <div>
            <h2 className="mb-2 text-white">Security & Standards</h2>
            <p className="text-slate-300">
              All integrations follow industry standards and best practices for security, privacy, and interoperability.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <Shield className="w-6 h-6 mb-2" />
            <h3 className="text-sm mb-1 text-white">Authentication</h3>
            <p className="text-xs text-slate-300">
              OAuth 2.0, OIDC, SAML 2.0, API keys with rotation
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <Lock className="w-6 h-6 mb-2" />
            <h3 className="text-sm mb-1 text-white">Encryption</h3>
            <p className="text-xs text-slate-300">
              TLS 1.3, data encrypted at rest and in transit
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 mb-2" />
            <h3 className="text-sm mb-1 text-white">Compliance</h3>
            <p className="text-xs text-slate-300">
              SOC 2 Type II, GDPR, CCPA, ISO 27001
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <h3 className="text-sm mb-3 text-white">Standards We Support</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">OpenID Connect</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">OAuth 2.0</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">SAML 2.0</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">SCIM 2.0</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">OpenTelemetry</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">C2PA</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">Webhooks</Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">REST API</Badge>
          </div>
        </div>
        </Card>

        {/* Support CTA */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="mb-1">Need Help Getting Started?</h3>
            <p className="text-sm text-muted-foreground">
              Our integration team is here to help you choose the right connection method and get up and running quickly.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline">
              View Documentation
            </Button>
            <Button>
              Contact Integration Team
            </Button>
          </div>
        </div>
        </Card>
      </div>
      )}
    </div>
  );
}
