import { useState } from 'react';
import { PLCYCloudSetup } from './PLCYCloudSetup';
import { RequestRoutingSettings } from './RequestRoutingSettings';
import { ApprovalPolicySettings } from './ApprovalPolicySettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Bell, 
  Shield, 
  GitBranch, 
  UserCheck, 
  Zap, 
  Database, 
  Eye, 
  Mail, 
  Smartphone, 
  Lock, 
  CheckCircle, 
  Key, 
  AlertCircle,
  Info,
  ShieldCheck,
  Timer,
  Globe,
  RefreshCw,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [policyViolations, setPolicyViolations] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [dataRetention, setDataRetention] = useState('90');
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [automatedBackups, setAutomatedBackups] = useState(false);
  const [pitrEnabled, setPitrEnabled] = useState(false);
  const [pitrRetention, setPitrRetention] = useState('30');
  const [immutableAudit, setImmutableAudit] = useState(false);
  const [showCloudSetup, setShowCloudSetup] = useState(false);
  const [setupMode, setSetupMode] = useState<'backups' | 'audit'>('backups');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully', {
      description: 'Your preferences have been updated.'
    });
  };

  const handleResetSettings = () => {
    setEmailNotifications(true);
    setSlackNotifications(false);
    setWeeklyReports(true);
    setSecurityAlerts(true);
    setPolicyViolations(true);
    setTwoFactorEnabled(false);
    setSessionTimeout('30');
    setDataRetention('90');
    setApiRateLimit('1000');
    toast.success('Settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2">Platform Settings</h1>
        <p className="text-muted-foreground">
          Manage your PLCY platform configuration, notifications, and security settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="routing" className="gap-2">
            <GitBranch className="w-4 h-4" />
            Routing
          </TabsTrigger>
          <TabsTrigger value="approvals" className="gap-2">
            <UserCheck className="w-4 h-4" />
            Approvals
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <Database className="w-4 h-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Configure your organization's basic information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Demo Company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger id="industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                      <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                      <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                      <SelectItem value="cet">Central European Time (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="trust-center-url">Trust Center URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="trust-center-url" 
                    defaultValue="demo-company.plcy.ai" 
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your public trust center will be accessible at this URL
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize how information is displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-sm text-muted-foreground">Show more information in less space</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Advanced Options</Label>
                  <p className="text-sm text-muted-foreground">Display technical configuration options</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dashboard Auto-refresh</Label>
                  <p className="text-sm text-muted-foreground">Automatically refresh dashboard every 5 minutes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <div>
                    <Label>Slack Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get alerts in your Slack workspace</p>
                  </div>
                </div>
                <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div>
                    <Label>In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications within the platform</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Select which events trigger notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Security Alerts</Label>
                <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label>Policy Violations</Label>
                <Switch checked={policyViolations} onCheckedChange={setPolicyViolations} />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label>Weekly Summary Reports</Label>
                <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label>Compliance Deadline Reminders</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label>AI Model Updates</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication & Access</CardTitle>
              <CardDescription>
                Manage authentication methods and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <div>
                    <Label>Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              {twoFactorEnabled && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Two-factor authentication is enabled and protecting your account
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger id="session-timeout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>API Access</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    defaultValue="••••••••••••••••••••" 
                    className="flex-1 font-mono"
                    readOnly
                  />
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this key to authenticate API requests
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure security requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Require strong passwords</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label>IP whitelist enforcement</Label>
                <Switch />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label>Audit log all access attempts</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Request Routing Settings */}
        <TabsContent value="routing" className="space-y-4">
          <RequestRoutingSettings />
        </TabsContent>

        {/* Approval Policy Settings */}
        <TabsContent value="approvals" className="space-y-4">
          <ApprovalPolicySettings />
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>
                Manage integrations with third-party services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Slack</p>
                    <p className="text-sm text-muted-foreground">Connected to #ai-governance</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">JIRA</p>
                    <p className="text-sm text-muted-foreground">Incident management enabled</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <Zap className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">ServiceNow</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <Zap className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Microsoft Teams</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure API rate limits and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rate-limit">API Rate Limit (requests/hour)</Label>
                <Select value={apiRateLimit} onValueChange={setApiRateLimit}>
                  <SelectTrigger id="rate-limit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests/hour</SelectItem>
                    <SelectItem value="1000">1,000 requests/hour</SelectItem>
                    <SelectItem value="10000">10,000 requests/hour</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Current API usage: 247 requests in the last hour
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Settings */}
        <TabsContent value="compliance" className="space-y-4">
          {/* Automated Backups */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  <div>
                    <CardTitle>Automated Backups</CardTitle>
                    <CardDescription>
                      Configure automated backups for your AI governance data
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-slate-600">
                  {automatedBackups ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Enable Automated Backups</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Protect your data with automated backups
                    </p>
                  </div>
                  <Switch 
                    checked={automatedBackups} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSetupMode('backups');
                        setShowCloudSetup(true);
                      } else {
                        setAutomatedBackups(false);
                      }
                    }} 
                  />
                </div>
              </div>

              {!automatedBackups && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Backups are not configured. Your data may be at risk. Enable backups to protect against data loss.
                  </AlertDescription>
                </Alert>
              )}

              {automatedBackups && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Automated backups are enabled and running daily at 02:00 UTC
                  </AlertDescription>
                </Alert>
              )}

              {/* PITR Section - only shown when backups are enabled */}
              {automatedBackups && (
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <Timer className="w-5 h-5 text-purple-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label className="font-medium">Point-in-Time Recovery (PITR)</Label>
                          <Badge variant="outline" className="bg-white border-purple-300 text-purple-700 text-xs">
                            Advanced
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Restore to any specific timestamp within your retention window
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={pitrEnabled} 
                      onCheckedChange={setPitrEnabled}
                    />
                  </div>

                  {pitrEnabled && (
                    <div className="mt-4 ml-4 pl-4 border-l-2 border-purple-200 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="pitr-retention" className="text-sm">Transaction Log Retention</Label>
                        <Select value={pitrRetention} onValueChange={setPitrRetention}>
                          <SelectTrigger id="pitr-retention" className="max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days (Recommended)</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Restore to any moment within this window
                        </p>
                      </div>

                      <Alert className="bg-purple-50 border-purple-200">
                        <Info className="h-4 w-4 text-purple-600" />
                        <AlertDescription className="text-purple-900 text-xs">
                          💾 Continuous transaction logs enable recovery to any second. Storage cost is approximately 2-3x standard backups.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {!pitrEnabled && (
                    <Alert className="mt-3 ml-4">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        With PITR disabled, you can only restore from scheduled backup snapshots
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Immutable Audit Logging */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <div>
                    <CardTitle>Immutable Audit Logging</CardTitle>
                    <CardDescription>
                      Tamper-proof audit trails with cryptographic verification
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-slate-600">
                  {immutableAudit ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Enable Immutable Audit Logging</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compliance-grade tamper-proof logging
                    </p>
                  </div>
                  <Switch 
                    checked={immutableAudit} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSetupMode('audit');
                        setShowCloudSetup(true);
                      } else {
                        setImmutableAudit(false);
                      }
                    }} 
                  />
                </div>
              </div>

              {!immutableAudit && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Immutable audit logging is not enabled. Enable to meet compliance requirements for tamper-proof record keeping.
                  </AlertDescription>
                </Alert>
              )}

              {immutableAudit && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Immutable audit logging is active with cryptographic verification
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>
                Configure how long data is retained in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                <Select value={dataRetention} onValueChange={setDataRetention}>
                  <SelectTrigger id="log-retention">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days (Recommended)</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Logs older than this will be automatically archived
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Encrypt archived data</Label>
                  <p className="text-sm text-muted-foreground">Use AES-256 encryption for archived logs</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Frameworks</CardTitle>
              <CardDescription>
                Active compliance frameworks for your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>EU AI Act</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>GDPR</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>SOC 2</span>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>ISO 27001</span>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleResetSettings} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="w-4 h-4" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cloud Setup Modal */}
      {showCloudSetup && (
        <PLCYCloudSetup
          mode={setupMode}
          onBackupsChange={setAutomatedBackups}
          onAuditChange={setImmutableAudit}
          onClose={() => setShowCloudSetup(false)}
        />
      )}
    </div>
  );
}