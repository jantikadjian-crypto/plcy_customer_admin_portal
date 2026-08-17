import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  GitBranch,
  TrendingUp,
  Globe,
  DollarSign,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  Play,
  Pause,
  BarChart3,
  Clock,
  Target,
  Activity,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

export function RequestRoutingSettings() {
  const [routingEnabled, setRoutingEnabled] = useState(true);
  const [primaryStrategy, setPrimaryStrategy] = useState('cost-optimized');
  const [fallbackEnabled, setFallbackEnabled] = useState(true);
  const [geoRoutingEnabled, setGeoRoutingEnabled] = useState(true);
  const [loadBalancing, setLoadBalancing] = useState(false);
  const [abTestingEnabled, setAbTestingEnabled] = useState(false);
  const [costThreshold, setCostThreshold] = useState([500]);
  const [latencyThreshold, setLatencyThreshold] = useState([200]);
  
  // Mock routing rules
  const [routingRules, setRoutingRules] = useState([
    {
      id: '1',
      name: 'Simple Queries → GPT-3.5',
      condition: 'Token count < 500',
      target: 'OpenAI GPT-3.5 Turbo',
      priority: 1,
      active: true
    },
    {
      id: '2',
      name: 'Complex Analysis → GPT-4',
      condition: 'Token count > 500',
      target: 'OpenAI GPT-4',
      priority: 2,
      active: true
    },
    {
      id: '3',
      name: 'EU Traffic → Azure EU',
      condition: 'Request origin: EU',
      target: 'Azure OpenAI (EU West)',
      priority: 3,
      active: true
    },
    {
      id: '4',
      name: 'PII Detected → On-Prem',
      condition: 'Contains PII',
      target: 'On-Premise Llama 3',
      priority: 4,
      active: true
    }
  ]);

  // Mock provider performance data
  const providerStats = [
    {
      provider: 'OpenAI GPT-4',
      requests: 2847,
      avgLatency: 1.2,
      successRate: 99.8,
      cost: '$127.42'
    },
    {
      provider: 'OpenAI GPT-3.5',
      requests: 8923,
      avgLatency: 0.6,
      successRate: 99.9,
      cost: '$42.18'
    },
    {
      provider: 'Anthropic Claude',
      requests: 1205,
      avgLatency: 1.1,
      successRate: 99.7,
      cost: '$89.34'
    },
    {
      provider: 'Azure OpenAI (EU)',
      requests: 456,
      avgLatency: 0.9,
      successRate: 99.9,
      cost: '$31.22'
    }
  ];

  const handleSave = () => {
    toast.success('Routing settings saved', {
      description: 'Your routing configuration has been updated.'
    });
  };

  const toggleRule = (id: string) => {
    setRoutingRules(rules =>
      rules.map(rule =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
    toast.success('Rule updated');
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <GitBranch className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-sm">
          <strong>Smart Request Routing</strong> optimizes cost, performance, and compliance by intelligently routing AI requests across multiple providers. 
          <span className="block mt-1 text-xs text-muted-foreground">
            Current month savings: $2,847 (62% cost reduction) • 12,431 requests routed
          </span>
        </AlertDescription>
      </Alert>

      {/* Main Toggle & Strategy */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Routing Configuration
              </CardTitle>
              <CardDescription>
                Configure intelligent routing strategies across AI providers
              </CardDescription>
            </div>
            <Switch
              checked={routingEnabled}
              onCheckedChange={setRoutingEnabled}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {routingEnabled && (
            <>
              <div>
                <Label className="mb-3">Primary Routing Strategy</Label>
                <div className="grid gap-3">
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="radio"
                      name="strategy"
                      value="cost-optimized"
                      checked={primaryStrategy === 'cost-optimized'}
                      onChange={(e) => setPrimaryStrategy(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Cost Optimized</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          Recommended
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Route to cheapest provider that meets quality requirements. Savings: 60-80%
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="radio"
                      name="strategy"
                      value="performance"
                      checked={primaryStrategy === 'performance'}
                      onChange={(e) => setPrimaryStrategy(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium">Performance First</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Prioritize lowest latency providers for real-time applications
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="radio"
                      name="strategy"
                      value="compliance"
                      checked={primaryStrategy === 'compliance'}
                      onChange={(e) => setPrimaryStrategy(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Compliance First</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Route based on data residency, GDPR, HIPAA, and regulatory requirements
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="radio"
                      name="strategy"
                      value="quality"
                      checked={primaryStrategy === 'quality'}
                      onChange={(e) => setPrimaryStrategy(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">Quality Optimized</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Always use highest quality models (GPT-4, Claude Opus) regardless of cost
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label>Advanced Options</Label>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Automatic Failover</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Switch to backup provider if primary fails or is rate-limited
                    </p>
                  </div>
                  <Switch
                    checked={fallbackEnabled}
                    onCheckedChange={setFallbackEnabled}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">Geographic Routing</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Automatically route based on user location for compliance
                    </p>
                  </div>
                  <Switch
                    checked={geoRoutingEnabled}
                    onCheckedChange={setGeoRoutingEnabled}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm font-medium">Load Balancing</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Distribute traffic evenly across providers to prevent rate limits
                    </p>
                  </div>
                  <Switch
                    checked={loadBalancing}
                    onCheckedChange={setLoadBalancing}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-medium">A/B Testing Mode</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Send 10% of traffic to alternative models for quality comparison
                    </p>
                  </div>
                  <Switch
                    checked={abTestingEnabled}
                    onCheckedChange={setAbTestingEnabled}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label>Threshold Configuration</Label>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Token Count Threshold</span>
                    <span className="text-sm font-medium">{costThreshold[0]} tokens</span>
                  </div>
                  <Slider
                    value={costThreshold}
                    onValueChange={setCostThreshold}
                    min={100}
                    max={2000}
                    step={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    Requests below this threshold use cheaper models (GPT-3.5), above use premium (GPT-4)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Acceptable Latency</span>
                    <span className="text-sm font-medium">{latencyThreshold[0]}ms</span>
                  </div>
                  <Slider
                    value={latencyThreshold}
                    onValueChange={setLatencyThreshold}
                    min={50}
                    max={500}
                    step={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    Route to fastest available provider if latency exceeds this threshold
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Routing Rules */}
      {routingEnabled && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Custom Routing Rules</CardTitle>
                <CardDescription>
                  Define specific routing logic based on request characteristics
                </CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="w-3 h-3 mr-2" />
                Add Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {routingRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`flex items-center justify-between p-3 border rounded-lg ${
                    !rule.active ? 'opacity-50 bg-accent/20' : 'bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Badge variant="outline" className="text-xs">
                      #{rule.priority}
                    </Badge>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{rule.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {rule.condition} → {rule.target}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.active}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Alert className="mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-xs">
                Rules are evaluated in priority order. First matching rule determines the routing target.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Provider Performance */}
      {routingEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Provider Performance (Last 30 Days)
            </CardTitle>
            <CardDescription>
              Real-time metrics for connected AI providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providerStats.map((stat, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{stat.provider}</span>
                    <Badge variant="outline" className="text-xs">
                      {stat.requests.toLocaleString()} requests
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Avg Latency</div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{stat.avgLatency}s</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Success Rate</div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="font-medium">{stat.successRate}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Total Cost</div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span className="font-medium">{stat.cost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Progress value={stat.successRate} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Routing Settings
        </Button>
      </div>
    </div>
  );
}
