import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  UserCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Wrench,
  Database,
  FileText,
  Lock,
  Zap,
  Mail,
  MessageSquare,
  Bell,
  Play,
  Pause,
  Plus,
  Trash2,
  Info,
  TrendingUp,
  Save,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

export function ApprovalPolicySettings() {
  const [hitlEnabled, setHitlEnabled] = useState(true);
  const [autoApproveInDev, setAutoApproveInDev] = useState(true);
  const [approvalTimeout, setApprovalTimeout] = useState('3600');
  const [escalationEnabled, setEscalationEnabled] = useState(true);
  const [escalationTime, setEscalationTime] = useState('1800');
  const [slackNotifications, setSlackNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  
  // Tool category permissions
  const [toolCategories, setToolCategories] = useState([
    {
      id: 'write_ops',
      name: 'Write Operations',
      description: 'Database writes, IAM changes, file modifications',
      icon: Database,
      requireApproval: true,
      riskLevel: 'high',
      examples: ['delete_user', 'update_permissions', 'modify_config']
    },
    {
      id: 'data_export',
      name: 'Data Export',
      description: 'Export customer data, download files, bulk exports',
      icon: FileText,
      requireApproval: true,
      riskLevel: 'high',
      examples: ['export_users', 'download_logs', 'generate_report']
    },
    {
      id: 'secrets_access',
      name: 'Secrets Access',
      description: 'API keys, passwords, tokens, credentials',
      icon: Lock,
      requireApproval: true,
      riskLevel: 'critical',
      examples: ['get_api_key', 'read_credentials', 'access_vault']
    },
    {
      id: 'prod_ops',
      name: 'Production Operations',
      description: 'Deployments, server changes, production access',
      icon: Zap,
      requireApproval: true,
      riskLevel: 'critical',
      examples: ['deploy_to_prod', 'restart_service', 'scale_resources']
    },
    {
      id: 'policy_changes',
      name: 'Policy Changes',
      description: 'Governance policies, retention rules, access controls',
      icon: Shield,
      requireApproval: true,
      riskLevel: 'medium',
      examples: ['update_policy', 'change_retention', 'modify_access_rules']
    },
    {
      id: 'data_deletion',
      name: 'Data Deletion',
      description: 'Permanent data removal, account deletion, log purging',
      icon: Trash2,
      requireApproval: true,
      riskLevel: 'critical',
      examples: ['delete_account', 'purge_logs', 'remove_records']
    }
  ]);

  // Approval roles
  const [approverRoles, setApproverRoles] = useState([
    {
      id: 'security_team',
      name: 'Security Team',
      email: 'security@company.com',
      canApprove: ['secrets_access', 'prod_ops', 'data_deletion'],
      active: true
    },
    {
      id: 'compliance_team',
      name: 'Compliance Team',
      email: 'compliance@company.com',
      canApprove: ['policy_changes', 'data_export', 'data_deletion'],
      active: true
    },
    {
      id: 'engineering_leads',
      name: 'Engineering Leads',
      email: 'eng-leads@company.com',
      canApprove: ['write_ops', 'prod_ops'],
      active: true
    },
    {
      id: 'data_protection',
      name: 'Data Protection Officer',
      email: 'dpo@company.com',
      canApprove: ['data_export', 'data_deletion', 'policy_changes'],
      active: false
    }
  ]);

  // Risk thresholds
  const [riskThresholds, setRiskThresholds] = useState({
    low: 'auto_approve',
    medium: 'require_approval',
    high: 'require_approval',
    critical: 'require_2_person_approval'
  });

  const toggleToolCategory = (categoryId: string) => {
    setToolCategories(cats =>
      cats.map(cat =>
        cat.id === categoryId
          ? { ...cat, requireApproval: !cat.requireApproval }
          : cat
      )
    );
  };

  const toggleApproverRole = (roleId: string) => {
    setApproverRoles(roles =>
      roles.map(role =>
        role.id === roleId
          ? { ...role, active: !role.active }
          : role
      )
    );
  };

  const handleSave = () => {
    toast.success('Approval policies saved', {
      description: 'Your HITL configuration has been updated.'
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <UserCheck className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-sm">
          <strong>Human-in-the-Loop (HITL) Approvals</strong> ensure high-risk AI agent actions require human review before execution. 
          Configure approval policies, approver roles, and notification settings.
          <span className="block mt-1 text-xs text-muted-foreground">
            Active approvals: 5 pending â€¢ 127 approved this month â€¢ 3 rejected
          </span>
        </AlertDescription>
      </Alert>

      {/* Main Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                HITL Configuration
              </CardTitle>
              <CardDescription>
                Enable and configure approval workflows for AI agent actions
              </CardDescription>
            </div>
            <Switch
              checked={hitlEnabled}
              onCheckedChange={setHitlEnabled}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {hitlEnabled && (
            <>
              {/* Environment Settings */}
              <div className="space-y-4">
                <Label>Environment-Specific Settings</Label>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Play className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-sm">Auto-approve in Development</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Skip approvals in dev environment after first approval (cached for 24h)
                    </p>
                  </div>
                  <Switch
                    checked={autoApproveInDev}
                    onCheckedChange={setAutoApproveInDev}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="approval-timeout">Approval Timeout</Label>
                    <Select value={approvalTimeout} onValueChange={setApprovalTimeout}>
                      <SelectTrigger id="approval-timeout">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="900">15 minutes</SelectItem>
                        <SelectItem value="1800">30 minutes</SelectItem>
                        <SelectItem value="3600">1 hour (Recommended)</SelectItem>
                        <SelectItem value="7200">2 hours</SelectItem>
                        <SelectItem value="14400">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Auto-reject if no response within this time
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="escalation-time">Escalation Time</Label>
                    <Select value={escalationTime} onValueChange={setEscalationTime}>
                      <SelectTrigger id="escalation-time">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="600">10 minutes</SelectItem>
                        <SelectItem value="900">15 minutes</SelectItem>
                        <SelectItem value="1800">30 minutes (Recommended)</SelectItem>
                        <SelectItem value="3600">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Escalate to backup approver after this time
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Risk Thresholds */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Risk-Based Approval Policies</Label>
                  <Badge variant="outline" className="text-xs">
                    Policy Outcomes
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Define what happens when actions of different risk levels are requested
                </p>

                <div className="space-y-3">
                  {[
                    { level: 'critical', label: 'Critical Risk', icon: AlertTriangle },
                    { level: 'high', label: 'High Risk', icon: AlertTriangle },
                    { level: 'medium', label: 'Medium Risk', icon: Info },
                    { level: 'low', label: 'Low Risk', icon: CheckCircle }
                  ].map(({ level, label, icon: Icon }) => (
                    <div key={level} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getRiskColor(level)}>
                          <Icon className="w-3 h-3 mr-1" />
                          {label}
                        </Badge>
                      </div>
                      <Select
                        value={riskThresholds[level as keyof typeof riskThresholds]}
                        onValueChange={(value) =>
                          setRiskThresholds({ ...riskThresholds, [level]: value })
                        }
                      >
                        <SelectTrigger className="w-[240px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto_approve">Auto Approve</SelectItem>
                          <SelectItem value="require_approval">Require Approval</SelectItem>
                          <SelectItem value="require_2_person_approval">
                            Require 2-Person Approval
                          </SelectItem>
                          <SelectItem value="auto_reject">Auto Reject</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Tool Category Permissions */}
      {hitlEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Tool Category Permissions
            </CardTitle>
            <CardDescription>
              Configure which types of tool calls require approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {toolCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      category.requireApproval ? 'bg-blue-50 border-blue-200' : 'bg-accent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          category.requireApproval ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            category.requireApproval ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{category.name}</span>
                            <Badge variant="outline" className={getRiskColor(category.riskLevel)}>
                              {category.riskLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {category.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {category.examples.map((example, idx) => (
                              <code key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded">
                                {example}()
                              </code>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={category.requireApproval}
                        onCheckedChange={() => toggleToolCategory(category.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <Alert className="mt-4">
              <Info className="w-4 h-4" />
              <AlertDescription className="text-xs">
                Tool calls matching these categories will require approval based on your risk thresholds. 
                Custom tool categorization can be configured in the tool registry.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Approver Roles */}
      {hitlEnabled && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Approver Roles & Permissions
                </CardTitle>
                <CardDescription>
                  Define who can approve different types of actions
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approverRoles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 border rounded-lg ${
                    role.active ? 'bg-background' : 'opacity-50 bg-accent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{role.name}</span>
                        {role.active && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{role.email}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">Can approve:</span>
                        {role.canApprove.map((categoryId) => {
                          const category = toolCategories.find(c => c.id === categoryId);
                          return category ? (
                            <Badge key={categoryId} variant="outline" className="text-xs">
                              {category.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <Switch
                      checked={role.active}
                      onCheckedChange={() => toggleApproverRole(role.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <Shield className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-900 text-xs">
                <strong>Segregation of Duties:</strong> For critical actions requiring 2-person approval, 
                the second approver must be from a different role to satisfy compliance requirements.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      {hitlEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Approval Notifications
            </CardTitle>
            <CardDescription>
              Configure how approvers are notified of pending requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <div>
                  <Label>Slack Notifications</Label>
                  <p className="text-xs text-muted-foreground">Send approval requests to Slack channels</p>
                </div>
              </div>
              <Switch
                checked={slackNotifications}
                onCheckedChange={setSlackNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Send email alerts for pending approvals</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600" />
                <div>
                  <Label>In-App Notifications</Label>
                  <p className="text-xs text-muted-foreground">Show real-time notifications in PLCY platform</p>
                </div>
              </div>
              <Switch
                checked={inAppNotifications}
                onCheckedChange={setInAppNotifications}
              />
            </div>

            {slackNotifications && (
              <Alert className="bg-purple-50 border-purple-200">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <AlertDescription className="text-purple-900 text-xs">
                  Slack integration connected to <strong>#ai-approvals</strong> channel. 
                  Approvers can approve/reject directly from Slack using interactive buttons.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {hitlEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Approval Performance Metrics
            </CardTitle>
            <CardDescription>
              Track approval workflow efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-muted-foreground">Avg Response Time</span>
                </div>
                <p className="text-2xl font-semibold">12m</p>
                <p className="text-xs text-green-600">â†“ 23% vs last month</p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Approval Rate</span>
                </div>
                <p className="text-2xl font-semibold">94%</p>
                <p className="text-xs text-muted-foreground">127 of 135 approved</p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-muted-foreground">Cache Hit Rate</span>
                </div>
                <p className="text-2xl font-semibold">68%</p>
                <p className="text-xs text-muted-foreground">Auto-approved via cache</p>
              </div>
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
          Save Approval Policies
        </Button>
      </div>
    </div>
  );
}
