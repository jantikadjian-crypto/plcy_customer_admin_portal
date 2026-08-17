import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PolicySimulationWizard } from './PolicySimulationWizard';
import {
  Download,
  CheckCircle,
  Info,
  Shield,
  GitBranch,
  FileText,
  Settings as SettingsIcon,
  Zap,
  Eye,
  Lock,
  Ban,
  AlertTriangle,
  Clock,
  ChevronRight,
  Package,
  Layers,
  Target,
  ChevronDown,
  ChevronUp,
  Sliders,
  Calendar,
  MapPin,
  Users,
  Globe,
  MessageSquare,
  Plus,
  X,
  FlaskConical,
  BookOpen,
  BarChart2,
  RotateCcw,
  Plug,
  TrendingDown
} from 'lucide-react';

interface PackDetailModalProps {
  pack: any;
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (pack: any, configuration: any) => void;
  isDeployed: boolean;
  initialTab?: string;
}

export function PackDetailModal({ pack, isOpen, onClose, onDeploy, isDeployed, initialTab = 'overview' }: PackDetailModalProps) {
  const [configuration, setConfiguration] = useState<any>({
    enabledControls: pack.controls?.map((c: any, i: number) => i) || [], // All enabled by default
    controlSettings: {} // Individual control settings
  });
  const [activeTab, setActiveTab] = useState(initialTab);
  const [expandedControl, setExpandedControl] = useState<number | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

  const toggleControl = (index: number) => {
    setConfiguration((prev: any) => {
      const enabled = prev.enabledControls || [];
      const isEnabled = enabled.includes(index);

      return {
        ...prev,
        enabledControls: isEnabled
          ? enabled.filter((i: number) => i !== index)
          : [...enabled, index]
      };
    });
  };

  const isControlEnabled = (index: number) => {
    return (configuration.enabledControls || []).includes(index);
  };

  const updateControlSetting = (controlIndex: number, key: string, value: any) => {
    setConfiguration((prev: any) => ({
      ...prev,
      controlSettings: {
        ...prev.controlSettings,
        [controlIndex]: {
          ...(prev.controlSettings[controlIndex] || {}),
          [key]: value
        }
      }
    }));
  };

  const getControlSettings = (control: any, controlIndex: number) => {
    // Define configurable parameters for different control types
    if (control.type === 'Validation' || control.type === 'Block') {
      return (
        <div className="space-y-4 p-3 bg-white rounded border">
          {/* Basic Settings */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Enforcement Mode</Label>
              <Select
                defaultValue="enforce"
                onValueChange={(val) => updateControlSetting(controlIndex, 'enforcementMode', val)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enforce">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-red-600" />
                      <span>Enforce - Block violations</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="warn">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-yellow-600" />
                      <span>Warn - Flag but allow</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="monitor">
                    <div className="flex items-center gap-2">
                      <Eye className="w-3 h-3 text-blue-600" />
                      <span>Monitor - Log only (dry-run)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="audit">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-gray-600" />
                      <span>Audit - Silent logging</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">How to handle detected violations</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Sensitivity Threshold</Label>
              <Select
                defaultValue="0.85"
                onValueChange={(val) => updateControlSetting(controlIndex, 'threshold', parseFloat(val))}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.70">70% - Lenient</SelectItem>
                  <SelectItem value="0.85">85% - Default</SelectItem>
                  <SelectItem value="0.95">95% - Strict</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Time-Based Scheduling */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-blue-600" />
              <Label className="text-xs font-semibold">Time-Based Scheduling</Label>
            </div>
            <div className="space-y-2">
              <Select
                defaultValue="always"
                onValueChange={(val) => updateControlSetting(controlIndex, 'schedule', val)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always Active (24/7)</SelectItem>
                  <SelectItem value="business_hours">Business Hours Only (9am-5pm Mon-Fri)</SelectItem>
                  <SelectItem value="after_hours">After Hours Only (5pm-9am + Weekends)</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Scope/Targeting */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-purple-600" />
              <Label className="text-xs font-semibold">Scope & Targeting</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">Apply to Endpoints</Label>
              <Input
                placeholder="/api/chat/*, /api/support/*"
                className="h-7 text-xs"
                onChange={(e) => updateControlSetting(controlIndex, 'scopeEndpoints', e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">Comma-separated patterns. Leave empty for all.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">User Groups</Label>
              <Select
                defaultValue="all"
                onValueChange={(val) => updateControlSetting(controlIndex, 'scopeUserGroups', val)}
              >
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="external">External Users Only</SelectItem>
                  <SelectItem value="contractors">Contractors Only</SelectItem>
                  <SelectItem value="custom">Custom Groups</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">Environment</Label>
              <div className="flex gap-2">
                <label className="flex items-center gap-1 text-[10px]">
                  <input type="checkbox" defaultChecked className="h-3 w-3"
                    onChange={(e) => updateControlSetting(controlIndex, 'envProduction', e.target.checked)} />
                  Production
                </label>
                <label className="flex items-center gap-1 text-[10px]">
                  <input type="checkbox" defaultChecked className="h-3 w-3"
                    onChange={(e) => updateControlSetting(controlIndex, 'envStaging', e.target.checked)} />
                  Staging
                </label>
                <label className="flex items-center gap-1 text-[10px]">
                  <input type="checkbox" className="h-3 w-3"
                    onChange={(e) => updateControlSetting(controlIndex, 'envDev', e.target.checked)} />
                  Dev
                </label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Custom Allowlists */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <Label className="text-xs font-semibold">Exemptions & Allowlists</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">Exempt Users (emails)</Label>
              <Input
                placeholder="admin@company.com, monitoring-bot@company.com"
                className="h-7 text-xs"
                onChange={(e) => updateControlSetting(controlIndex, 'exemptUsers', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">Exempt IP Ranges</Label>
              <Input
                placeholder="10.0.0.0/24, 192.168.1.0/24"
                className="h-7 text-xs"
                onChange={(e) => updateControlSetting(controlIndex, 'exemptIPs', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">Exemption Expiry</Label>
              <Input
                type="date"
                className="h-7 text-xs"
                onChange={(e) => updateControlSetting(controlIndex, 'exemptionExpiry', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Response Customization */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-orange-600" />
              <Label className="text-xs font-semibold">Response Customization</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground">Custom Block Message</Label>
              <Input
                placeholder="For your privacy, we cannot process this request."
                className="h-7 text-xs"
                onChange={(e) => updateControlSetting(controlIndex, 'customBlockMessage', e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">Shown to users when request is blocked</p>
            </div>
          </div>

          <Separator />

          {/* Alert Routing */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Alert Routing</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`slack-${controlIndex}`}
                  defaultChecked
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertSlack', e.target.checked)}
                />
                <Label htmlFor={`slack-${controlIndex}`} className="text-xs font-normal">
                  Slack: #security-alerts
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`email-${controlIndex}`}
                  defaultChecked
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertEmail', e.target.checked)}
                />
                <Label htmlFor={`email-${controlIndex}`} className="text-xs font-normal">
                  Email: security-team@company.com
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`pagerduty-${controlIndex}`}
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertPagerDuty', e.target.checked)}
                />
                <Label htmlFor={`pagerduty-${controlIndex}`} className="text-xs font-normal">
                  PagerDuty: High severity only
                </Label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (control.type === 'Transformation' || control.type === 'Transform') {
      return (
        <div className="space-y-3 p-3 bg-white rounded border">
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Enforcement Mode</Label>
            <Select
              defaultValue="enforce"
              onValueChange={(val) => updateControlSetting(controlIndex, 'enforcementMode', val)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enforce">Enforce - Apply transformation</SelectItem>
                <SelectItem value="warn">Warn - Alert but don't transform</SelectItem>
                <SelectItem value="monitor">Monitor - Log only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Transformation Mode</Label>
            <Select
              defaultValue="redact"
              onValueChange={(val) => updateControlSetting(controlIndex, 'mode', val)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="redact">Full Redaction (***)</SelectItem>
                <SelectItem value="mask">Partial Mask (XXX-XX-1234)</SelectItem>
                <SelectItem value="hash">Hash Value</SelectItem>
                <SelectItem value="token">Tokenize</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs">Preserve Format</Label>
            <Switch
              defaultChecked
              onCheckedChange={(checked) => updateControlSetting(controlIndex, 'preserveFormat', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold">Alert Routing</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`slack-trans-${controlIndex}`}
                  defaultChecked
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertSlack', e.target.checked)}
                />
                <Label htmlFor={`slack-trans-${controlIndex}`} className="text-xs font-normal">
                  Slack: #compliance-team
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`email-trans-${controlIndex}`}
                  defaultChecked
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertEmail', e.target.checked)}
                />
                <Label htmlFor={`email-trans-${controlIndex}`} className="text-xs font-normal">
                  Email: dpo@company.com
                </Label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (control.type === 'Rate Limit') {
      return (
        <div className="space-y-3 p-3 bg-white rounded border">
          <div className="space-y-2">
            <Label className="text-xs">Requests per Minute</Label>
            <Input
              type="number"
              defaultValue="100"
              className="h-8 text-xs"
              onChange={(e) => updateControlSetting(controlIndex, 'requestsPerMinute', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Burst Allowance</Label>
            <Input
              type="number"
              defaultValue="20"
              className="h-8 text-xs"
              onChange={(e) => updateControlSetting(controlIndex, 'burstAllowance', parseInt(e.target.value))}
            />
          </div>
        </div>
      );
    }

    if (control.type === 'Audit' || control.type === 'Custom Control') {
      return (
        <div className="space-y-3 p-3 bg-white rounded border">
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Enforcement Mode</Label>
            <Select
              defaultValue="enforce"
              onValueChange={(val) => updateControlSetting(controlIndex, 'enforcementMode', val)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enforce">Enforce - Full audit logging</SelectItem>
                <SelectItem value="monitor">Monitor - Reduced logging</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Log Detail Level</Label>
            <Select
              defaultValue="standard"
              onValueChange={(val) => updateControlSetting(controlIndex, 'logLevel', val)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs">Real-time Alerts</Label>
            <Switch
              defaultChecked
              onCheckedChange={(checked) => updateControlSetting(controlIndex, 'realTimeAlerts', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold">Alert Routing</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`slack-audit-${controlIndex}`}
                  defaultChecked
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertSlack', e.target.checked)}
                />
                <Label htmlFor={`slack-audit-${controlIndex}`} className="text-xs font-normal">
                  Slack: #audit-logs
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`email-audit-${controlIndex}`}
                  className="h-3 w-3"
                  onChange={(e) => updateControlSetting(controlIndex, 'alertEmail', e.target.checked)}
                />
                <Label htmlFor={`email-audit-${controlIndex}`} className="text-xs font-normal">
                  Email: compliance@company.com
                </Label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default settings for other types - with Must-Have features
    return (
      <div className="space-y-3 p-3 bg-white rounded border">
        {/* Time-Based Scheduling */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-blue-600" />
            <Label className="text-xs font-semibold">Schedule</Label>
          </div>
          <Select
            defaultValue="always"
            onValueChange={(val) => updateControlSetting(controlIndex, 'schedule', val)}
          >
            <SelectTrigger className="h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="always">Always Active</SelectItem>
              <SelectItem value="business_hours">Business Hours</SelectItem>
              <SelectItem value="after_hours">After Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Scope */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-3 h-3 text-purple-600" />
            <Label className="text-xs font-semibold">Scope</Label>
          </div>
          <Input
            placeholder="Endpoints (optional)"
            className="h-7 text-xs"
            onChange={(e) => updateControlSetting(controlIndex, 'scopeEndpoints', e.target.value)}
          />
        </div>

        <Separator />

        {/* Exemptions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <Label className="text-xs font-semibold">Exemptions</Label>
          </div>
          <Input
            placeholder="Exempt users (optional)"
            className="h-7 text-xs"
            onChange={(e) => updateControlSetting(controlIndex, 'exemptUsers', e.target.value)}
          />
        </div>

        <Separator />

        {/* Custom Message */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-3 h-3 text-orange-600" />
            <Label className="text-xs font-semibold">Custom Message</Label>
          </div>
          <Input
            placeholder="Custom message (optional)"
            className="h-7 text-xs"
            onChange={(e) => updateControlSetting(controlIndex, 'customBlockMessage', e.target.value)}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <Label className="text-xs">Enable Logging</Label>
          <Switch
            defaultChecked
            onCheckedChange={(checked) => updateControlSetting(controlIndex, 'enableLogging', checked)}
          />
        </div>
      </div>
    );
  };

  const Icon = pack.icon;

  const handleDeploy = () => {
    onDeploy(pack, configuration);
  };

  // Configuration options based on pack type
  const getConfigurationFields = () => {
    if (pack.id === 'pack-pii-detection') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="redaction-mode">Redaction Mode</Label>
            <Select
              defaultValue="full"
              onValueChange={(val) => setConfiguration({ ...configuration, redactionMode: val })}
            >
              <SelectTrigger id="redaction-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Redaction (***)</SelectItem>
                <SelectItem value="partial">Partial Masking (XXX-XX-1234)</SelectItem>
                <SelectItem value="hash">Hash Replacement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audit-level">Audit Logging Level</Label>
            <Select
              defaultValue="detailed"
              onValueChange={(val) => setConfiguration({ ...configuration, auditLevel: val })}
            >
              <SelectTrigger id="audit-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal (counts only)</SelectItem>
                <SelectItem value="standard">Standard (matches + actions)</SelectItem>
                <SelectItem value="detailed">Detailed (full context)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="log-retention">Log Retention Period</Label>
            <Select
              defaultValue="30"
              onValueChange={(val) => setConfiguration({ ...configuration, logRetentionDays: parseInt(val) })}
            >
              <SelectTrigger id="log-retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days (default)</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days (6 months)</SelectItem>
                <SelectItem value="365">365 days (1 year)</SelectItem>
                <SelectItem value="730">730 days (2 years)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">How long to retain PII detection logs for audit purposes</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detection-threshold">Detection Confidence Threshold</Label>
            <Select
              defaultValue="0.85"
              onValueChange={(val) => setConfiguration({ ...configuration, detectionThreshold: parseFloat(val) })}
            >
              <SelectTrigger id="detection-threshold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.70">70% (more detections, more false positives)</SelectItem>
                <SelectItem value="0.85">85% (default, balanced)</SelectItem>
                <SelectItem value="0.95">95% (fewer false positives)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Confidence level required to flag potential PII</p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label>Block on Detection</Label>
              <p className="text-sm text-muted-foreground">Block request if PII is detected</p>
            </div>
            <Switch
              onCheckedChange={(checked) => setConfiguration({ ...configuration, blockOnDetection: checked })}
            />
          </div>
        </div>
      );
    }

    if (pack.id === 'pack-prompt-injection') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sensitivity">Detection Sensitivity</Label>
            <Select
              defaultValue="high"
              onValueChange={(val) => setConfiguration({ ...configuration, sensitivity: val })}
            >
              <SelectTrigger id="sensitivity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (fewer false positives)</SelectItem>
                <SelectItem value="medium">Medium (balanced)</SelectItem>
                <SelectItem value="high">High (maximum protection)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="block-mode">Block Mode</Label>
            <Select
              defaultValue="immediate"
              onValueChange={(val) => setConfiguration({ ...configuration, blockMode: val })}
            >
              <SelectTrigger id="block-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate Block</SelectItem>
                <SelectItem value="flag">Flag & Allow</SelectItem>
                <SelectItem value="route">Route to Human Review</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="log-retention">Attack Log Retention</Label>
            <Select
              defaultValue="90"
              onValueChange={(val) => setConfiguration({ ...configuration, logRetentionDays: parseInt(val) })}
            >
              <SelectTrigger id="log-retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days (default)</SelectItem>
                <SelectItem value="180">180 days (6 months)</SelectItem>
                <SelectItem value="365">365 days (1 year)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Retention period for security incident logs</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-retries">Max Retry Attempts</Label>
            <Select
              defaultValue="3"
              onValueChange={(val) => setConfiguration({ ...configuration, maxRetries: parseInt(val) })}
            >
              <SelectTrigger id="max-retries">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 attempt (strict)</SelectItem>
                <SelectItem value="3">3 attempts (default)</SelectItem>
                <SelectItem value="5">5 attempts (lenient)</SelectItem>
                <SelectItem value="0">Unlimited (not recommended)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Retry attempts before permanent block</p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label>Notify Security Team</Label>
              <p className="text-sm text-muted-foreground">Alert on blocked attempts</p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={(checked) => setConfiguration({ ...configuration, notifyOnBlock: checked })}
            />
          </div>
        </div>
      );
    }

    if (pack.type === 'composite') {
      return (
        <div className="space-y-4">
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              This composite pack includes multiple controls. Configure individual primitives after deployment.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="enforcement-mode">Enforcement Mode</Label>
            <Select
              defaultValue="enforce"
              onValueChange={(val) => setConfiguration({ ...configuration, enforcementMode: val })}
            >
              <SelectTrigger id="enforcement-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monitor">Monitor Only (no blocking)</SelectItem>
                <SelectItem value="enforce">Full Enforcement</SelectItem>
                <SelectItem value="gradual">Gradual Rollout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="composite-log-retention">Global Log Retention</Label>
            <Select
              defaultValue="90"
              onValueChange={(val) => setConfiguration({ ...configuration, logRetentionDays: parseInt(val) })}
            >
              <SelectTrigger id="composite-log-retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days (default)</SelectItem>
                <SelectItem value="180">180 days (6 months)</SelectItem>
                <SelectItem value="365">365 days (1 year)</SelectItem>
                <SelectItem value="730">730 days (2 years)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Applies to all controls in this pack. {pack.framework && `${pack.framework} requires minimum retention periods.`}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-threshold">Alert Threshold</Label>
            <Select
              defaultValue="medium"
              onValueChange={(val) => setConfiguration({ ...configuration, alertThreshold: val })}
            >
              <SelectTrigger id="alert-threshold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (all events)</SelectItem>
                <SelectItem value="medium">Medium (important events)</SelectItem>
                <SelectItem value="high">High (critical only)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Minimum severity for notifications</p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label>Enable All Controls</Label>
              <p className="text-sm text-muted-foreground">Activate all included primitives</p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={(checked) => setConfiguration({ ...configuration, enableAll: checked })}
            />
          </div>
        </div>
      );
    }

    // Default configuration for all other primitive packs
    return (
      <div className="space-y-4">
        <Alert>
          <Info className="w-4 h-4" />
          <AlertDescription>
            Configure basic settings for this {pack.type} pack. Additional options available after deployment.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="default-log-retention">Log Retention Period</Label>
          <Select
            defaultValue="30"
            onValueChange={(val) => setConfiguration({ ...configuration, logRetentionDays: parseInt(val) })}
          >
            <SelectTrigger id="default-log-retention">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days (default)</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="180">180 days (6 months)</SelectItem>
              <SelectItem value="365">365 days (1 year)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">How long to retain enforcement logs</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="default-enforcement">Enforcement Level</Label>
          <Select
            defaultValue="standard"
            onValueChange={(val) => setConfiguration({ ...configuration, enforcementLevel: val })}
          >
            <SelectTrigger id="default-enforcement">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monitor">Monitor Only</SelectItem>
              <SelectItem value="standard">Standard Enforcement</SelectItem>
              <SelectItem value="strict">Strict Enforcement</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">How strictly to enforce policy violations</p>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <Label>Enable Detailed Logging</Label>
            <p className="text-sm text-muted-foreground">Capture full context for audit trails</p>
          </div>
          <Switch
            defaultChecked
            onCheckedChange={(checked) => setConfiguration({ ...configuration, detailedLogging: checked })}
          />
        </div>
      </div>
    );
  };

  // Group evidence by framework
  const groupedEvidence = (pack.evidenceMapped || []).reduce((acc: Record<string, string[]>, item: string) => {
    const match = item.match(/^([A-Z][^–]+?)(?:\s*–|\s*§)/);
    const fw = match ? match[1].trim() : 'Other';
    if (!acc[fw]) acc[fw] = [];
    acc[fw].push(item);
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-3">
            <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${pack.type === 'primitive' ? 'from-blue-50 to-blue-100' : 'from-purple-50 to-purple-100'} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-7 h-7 ${pack.iconColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <DialogTitle className="text-xl">{pack.name}</DialogTitle>
                <Badge variant={pack.type === 'primitive' ? 'outline' : 'default'} className={pack.type === 'composite' ? 'bg-purple-600' : ''}>
                  {pack.type === 'primitive' ? 'Control' : 'Policy Pack'}
                </Badge>
                {pack.defaultDeployMode && (
                  <Badge variant="outline" className="text-xs">{pack.defaultDeployMode} mode</Badge>
                )}
              </div>
              <DialogDescription className="text-sm">{pack.description}</DialogDescription>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" />v{pack.version}</span>
                {pack.framework && <Badge variant="secondary" className="text-xs">{pack.framework}</Badge>}
                {pack.industry && <Badge variant="outline" className="text-xs">{pack.industry}</Badge>}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="flex w-full h-auto gap-0.5 p-1">
            <TabsTrigger value="overview" className="flex-1 text-xs py-1.5">Overview</TabsTrigger>
            <TabsTrigger value="controls" className="flex-1 text-xs py-1.5 gap-1">
              Controls
              {(configuration.enabledControls?.length ?? pack.controls?.length) < pack.controls?.length && (
                <Badge variant="secondary" className="text-xs px-1">{configuration.enabledControls?.length}/{pack.controls?.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex-1 text-xs py-1.5">Tests</TabsTrigger>
            <TabsTrigger value="evidence" className="flex-1 text-xs py-1.5">Evidence</TabsTrigger>
            <TabsTrigger value="deploy" className="flex-1 text-xs py-1.5">Deploy</TabsTrigger>
          </TabsList>

          {/* ── OVERVIEW ───────────────────────────────────────── */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Impact preview callout */}
            {pack.impactPreview && (
              <Alert className="border-blue-200 bg-blue-50">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-900 text-sm">
                  <span className="font-semibold">Impact estimate — </span>{pack.impactPreview}
                  <p className="text-xs text-blue-700 mt-1">Estimated based on last 7 days of traffic across similar deployments.</p>
                </AlertDescription>
              </Alert>
            )}

            {/* Recommended for */}
            {pack.recommendedFor && pack.recommendedFor.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-purple-600" />Recommended for</h4>
                <div className="flex flex-wrap gap-2">
                  {pack.recommendedFor.map((r: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">{r}</Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Key stats row */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">{pack.controls?.length ?? 0}</div>
                <div className="text-xs text-muted-foreground">Controls</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">{pack.testsCreated?.length ?? 0}</div>
                <div className="text-xs text-muted-foreground">Eval profiles</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">{pack.evidenceMapped?.length ?? 0}</div>
                <div className="text-xs text-muted-foreground">Evidence mappings</div>
              </div>
            </div>

            {/* Required integrations */}
            {pack.requiredIntegrations && pack.requiredIntegrations.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2"><Plug className="w-4 h-4 text-slate-500" />Required integrations</h4>
                <div className="flex flex-wrap gap-2">
                  {pack.requiredIntegrations.map((r: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">{r}</Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* ── CONTROLS ───────────────────────────────────────── */}
          <TabsContent value="controls" className="space-y-4 mt-4">
            {/* Top controls highlight */}
            {pack.topControls && pack.topControls.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-blue-600" />Key controls in this pack</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {pack.topControls.map((c: string, i: number) => (
                    <Badge key={i} className="text-xs bg-blue-100 text-blue-800 border-blue-300" variant="outline">{c}</Badge>
                  ))}
                </div>
                <Separator />
              </div>
            )}

            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">All controls ({pack.controls?.length})</h4>
              <div className="text-xs text-muted-foreground">
                {configuration.enabledControls?.length ?? pack.controls?.length} / {pack.controls?.length} enabled
              </div>
            </div>

            {pack.framework && (
              <Alert className="py-2">
                <Info className="w-4 h-4" />
                <AlertDescription className="text-xs">
                  Toggle controls on/off as needed. Controls marked Required cannot be disabled for {pack.framework} compliance.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              {pack.controls?.map((control: any, index: number) => {
                const enabled = isControlEnabled(index);
                const isExpanded = expandedControl === index;
                const isRequired = control.required === true;
                return (
                  <div key={index} className={`border rounded-lg transition-all ${enabled ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                    <div className="flex items-start gap-3 p-3">
                      <div className="flex items-center gap-3 flex-1">
                        <Switch checked={enabled} onCheckedChange={() => toggleControl(index)} disabled={isRequired} />
                        <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${enabled ? 'bg-blue-100' : 'bg-slate-200'}`}>
                          <CheckCircle className={`w-4 h-4 ${enabled ? 'text-blue-600' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-sm">{control.name}</div>
                            {isRequired && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-xs">{control.type}</Badge>
                            {!enabled && !isRequired && <span className="text-xs text-muted-foreground italic">Disabled</span>}
                          </div>
                        </div>
                      </div>
                      {enabled && (
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setExpandedControl(isExpanded ? null : index)}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      )}
                    </div>
                    {enabled && isExpanded && (
                      <div className="px-3 pb-3">
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                          <Sliders className="w-3 h-3" /><span>Control Settings</span>
                        </div>
                        {getControlSettings(control, index)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {(configuration.enabledControls?.length ?? 0) < (pack.controls?.length ?? 0) && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <AlertDescription className="text-yellow-900 text-xs">
                  {(pack.controls?.length ?? 0) - (configuration.enabledControls?.length ?? 0)} control(s) disabled. This may reduce compliance coverage.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* ── TESTS ──────────────────────────────────────────── */}
          <TabsContent value="tests" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">These evaluation profiles run automatically when this pack is deployed.</p>
            {pack.testsCreated && pack.testsCreated.length > 0 ? (
              <div className="space-y-2">
                {pack.testsCreated.map((t: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-7 h-7 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Runs on deployment · Results available in Tests & Evaluations</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No evaluation profiles defined for this pack.</p>
            )}
          </TabsContent>

          {/* ── EVIDENCE ───────────────────────────────────────── */}
          <TabsContent value="evidence" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">Framework controls this pack produces evidence for.</p>
            {Object.keys(groupedEvidence).length > 0 ? (
              Object.entries(groupedEvidence).map(([fw, items]) => (
                <div key={fw}>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />{fw}
                  </h4>
                  <div className="space-y-1">
                    {(items as string[]).map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-2 border rounded text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No framework evidence mappings defined.</p>
            )}
          </TabsContent>

          {/* ── DEPLOY ─────────────────────────────────────────── */}
          <TabsContent value="deploy" className="space-y-4 mt-4">
            <div>
              <h4 className="font-medium text-sm mb-3">Deployment Configuration</h4>
              {getConfigurationFields()}
            </div>

            <Separator />

            {/* Version diff */}
            {pack.versionChanges && pack.versionChanges.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2"><GitBranch className="w-4 h-4 text-slate-500" />What's new in v{pack.version}</h4>
                <div className="space-y-1">
                  {pack.versionChanges.map((change: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs py-1 border-b last:border-0">
                      <TrendingDown className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0 rotate-180" />
                      <span>{change}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Rollback */}
            {pack.rollbackNotes && (
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2"><RotateCcw className="w-4 h-4 text-orange-500" />Rollback</h4>
                <p className="text-xs text-muted-foreground p-3 border rounded-lg bg-orange-50 border-orange-200">{pack.rollbackNotes}</p>
              </div>
            )}

            <Alert>
              <SettingsIcon className="w-4 h-4" />
              <AlertDescription className="text-xs">
                All configuration changes are OTEL-logged and can be reviewed in the Governance Audit log.
              </AlertDescription>
            </Alert>

            <Separator />

            {/* Customisation summary */}
            {((configuration.enabledControls?.length ?? pack.controls?.length) < (pack.controls?.length ?? 0) ||
              Object.keys(configuration.controlSettings || {}).length > 0) && (
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800">
                  <span className="font-semibold block mb-1">Customisations applied:</span>
                  <ul className="space-y-0.5">
                    {(configuration.enabledControls?.length ?? 0) < (pack.controls?.length ?? 0) && (
                      <li>• {(pack.controls?.length ?? 0) - (configuration.enabledControls?.length ?? 0)} control(s) disabled</li>
                    )}
                    {Object.keys(configuration.controlSettings || {}).length > 0 && (
                      <li>• {Object.keys(configuration.controlSettings).length} control(s) with custom settings</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              {isDeployed ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />Deployed</span>
                  <Button onClick={() => setShowSimulation(true)} variant="outline" className="gap-2">
                    <Zap className="w-4 h-4" />Simulate & Redeploy
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowSimulation(true)} className="gap-2">
                  <Zap className="w-4 h-4" />Simulate & Deploy
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
      <PolicySimulationWizard
        pack={pack}
        isOpen={showSimulation}
        onClose={() => setShowSimulation(false)}
        onConfirmDeploy={(system, mode, config) => {
          onDeploy(pack, { ...configuration, deployMode: mode, targetSystem: system.id, ...config });
          setShowSimulation(false);
          onClose();
        }}
      />
    </Dialog>
  );
}
