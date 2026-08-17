import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { 
  CheckSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Database,
  Wrench,
  Bot,
  User,
  Search,
  Filter,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Edit,
  History,
  ArrowRight,
  FileText,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Mail,
  MessageSquare,
  Check,
  X,
  Info,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface ApprovalRequest {
  id: string;
  timestamp: string;
  agent: string;
  action: {
    type: 'tool_call' | 'data_access' | 'policy_change' | 'data_export';
    name: string;
    args: Record<string, any>;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    saferAlternative?: string;
  };
  requester: {
    email: string;
    system: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  approvedAt?: string;
  rejectedAt?: string;
  justification?: string;
  complianceMapping: Array<{
    framework: string;
    control: string;
  }>;
  context?: {
    userImpact?: string;
    dataScope?: string;
    reversible?: boolean;
  };
}

export function ApprovalInbox() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | 'edit'>('approve');
  const [justification, setJustification] = useState('');
  const [editedArgs, setEditedArgs] = useState<Record<string, any>>({});
  const [expandedApproval, setExpandedApproval] = useState<string | null>(null);

  // Mock approval requests
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: 'appr_001',
      timestamp: '2024-12-15T10:30:00Z',
      agent: 'Customer Support Agent',
      action: {
        type: 'tool_call',
        name: 'delete_user',
        args: { 
          user_id: 'user_456', 
          email: 'john.doe@example.com',
          reason: 'GDPR right to erasure request'
        },
        riskLevel: 'high',
        description: 'Permanently delete user account and all associated data',
        saferAlternative: 'suspend_user() - Temporarily suspend account instead of permanent deletion'
      },
      requester: {
        email: 'support@company.com',
        system: 'Support Dashboard'
      },
      status: 'pending',
      complianceMapping: [
        { framework: 'GDPR', control: 'Article 17' },
        { framework: 'ISO 42001', control: 'A.5.2' }
      ],
      context: {
        userImpact: 'User will lose all account data permanently',
        dataScope: 'User profile, purchase history, preferences, 847 records',
        reversible: false
      }
    },
    {
      id: 'appr_002',
      timestamp: '2024-12-15T10:15:00Z',
      agent: 'Analytics Agent',
      action: {
        type: 'data_export',
        name: 'export_user_data',
        args: { 
          segment: 'enterprise_customers',
          fields: ['email', 'name', 'company', 'revenue'],
          format: 'csv'
        },
        riskLevel: 'medium',
        description: 'Export customer data for business intelligence analysis'
      },
      requester: {
        email: 'analytics@company.com',
        system: 'BI Platform'
      },
      status: 'pending',
      complianceMapping: [
        { framework: 'GDPR', control: 'Article 32' },
        { framework: 'SOC 2', control: 'CC6.1' }
      ],
      context: {
        userImpact: 'No direct user impact',
        dataScope: '2,847 customer records',
        reversible: true
      }
    },
    {
      id: 'appr_003',
      timestamp: '2024-12-15T09:45:00Z',
      agent: 'DevOps Agent',
      action: {
        type: 'tool_call',
        name: 'grant_database_access',
        args: { 
          user: 'contractor_42',
          database: 'production',
          permissions: ['READ', 'WRITE'],
          duration: '7 days'
        },
        riskLevel: 'critical',
        description: 'Grant production database access to external contractor',
        saferAlternative: 'grant_read_only_access() - Limit to read-only permissions initially'
      },
      requester: {
        email: 'devops@company.com',
        system: 'Infrastructure Manager'
      },
      status: 'pending',
      complianceMapping: [
        { framework: 'SOC 2', control: 'CC6.2' },
        { framework: 'ISO 27001', control: 'A.9.2.1' }
      ],
      context: {
        userImpact: 'Contractor gains write access to production data',
        dataScope: 'Full production database (all customer data)',
        reversible: true
      }
    },
    {
      id: 'appr_004',
      timestamp: '2024-12-15T09:20:00Z',
      agent: 'Compliance Agent',
      action: {
        type: 'policy_change',
        name: 'update_data_retention',
        args: { 
          policy: 'log_retention',
          old_value: '90 days',
          new_value: '30 days',
          affected_systems: ['audit_logs', 'access_logs']
        },
        riskLevel: 'medium',
        description: 'Reduce log retention period from 90 to 30 days'
      },
      requester: {
        email: 'compliance@company.com',
        system: 'Governance Platform'
      },
      status: 'pending',
      complianceMapping: [
        { framework: 'EU AI Act', control: 'Article 12' },
        { framework: 'ISO 42001', control: 'A.7.3' }
      ],
      context: {
        userImpact: 'Older logs will be purged sooner',
        dataScope: 'All audit and access logs',
        reversible: true
      }
    },
    {
      id: 'appr_005',
      timestamp: '2024-12-15T08:50:00Z',
      agent: 'Marketing Automation Agent',
      action: {
        type: 'data_export',
        name: 'export_engagement_metrics',
        args: { 
          campaign_id: 'campaign_winter_2024',
          include_pii: false,
          aggregation_level: 'segment'
        },
        riskLevel: 'low',
        description: 'Export aggregated campaign performance metrics'
      },
      requester: {
        email: 'marketing@company.com',
        system: 'Marketing Platform'
      },
      status: 'pending',
      complianceMapping: [
        { framework: 'GDPR', control: 'Article 25' }
      ],
      context: {
        userImpact: 'No direct user impact (aggregated data only)',
        dataScope: 'Aggregated metrics, no PII',
        reversible: true
      }
    },
    // Historical approvals
    {
      id: 'appr_006',
      timestamp: '2024-12-15T08:00:00Z',
      agent: 'Security Agent',
      action: {
        type: 'tool_call',
        name: 'rotate_api_keys',
        args: { 
          service: 'payment_gateway',
          notify_integrations: true
        },
        riskLevel: 'medium',
        description: 'Rotate payment gateway API keys'
      },
      requester: {
        email: 'security@company.com',
        system: 'Security Operations'
      },
      status: 'approved',
      approver: 'security-lead@company.com',
      approvedAt: '2024-12-15T08:10:00Z',
      justification: 'Routine security maintenance. Keys are over 90 days old.',
      complianceMapping: [
        { framework: 'SOC 2', control: 'CC6.1' },
        { framework: 'ISO 27001', control: 'A.9.4.3' }
      ]
    },
    {
      id: 'appr_007',
      timestamp: '2024-12-15T07:30:00Z',
      agent: 'Data Cleanup Agent',
      action: {
        type: 'tool_call',
        name: 'delete_all_logs',
        args: { 
          log_type: 'all',
          time_range: 'all_time'
        },
        riskLevel: 'critical',
        description: 'Delete all system logs permanently'
      },
      requester: {
        email: 'intern@company.com',
        system: 'Admin Console'
      },
      status: 'rejected',
      approver: 'security-lead@company.com',
      rejectedAt: '2024-12-15T07:32:00Z',
      justification: 'Request denied. Deleting all logs would violate compliance requirements and eliminate audit trail. Suggested alternative: archive old logs.',
      complianceMapping: [
        { framework: 'SOC 2', control: 'CC5.2' },
        { framework: 'EU AI Act', control: 'Article 12' }
      ]
    },
    {
      id: 'appr_008',
      timestamp: '2024-12-15T06:45:00Z',
      agent: 'Customer Support Agent',
      action: {
        type: 'data_access',
        name: 'view_customer_payment_history',
        args: { 
          customer_id: 'cust_789',
          purpose: 'refund_investigation'
        },
        riskLevel: 'low',
        description: 'Access customer payment history for refund investigation'
      },
      requester: {
        email: 'support@company.com',
        system: 'Support Dashboard'
      },
      status: 'approved',
      approver: 'support-manager@company.com',
      approvedAt: '2024-12-15T06:50:00Z',
      justification: 'Approved for customer service investigation. Legitimate business purpose.',
      complianceMapping: [
        { framework: 'GDPR', control: 'Article 6(1)(b)' }
      ]
    }
  ]);

  // Filter approvals
  const filteredApprovals = approvalRequests.filter(approval => {
    // Status filter
    if (activeTab === 'pending' && approval.status !== 'pending') return false;
    if (activeTab === 'approved' && approval.status !== 'approved') return false;
    if (activeTab === 'rejected' && approval.status !== 'rejected') return false;
    if (activeTab === 'history' && approval.status === 'pending') return false;

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        approval.agent.toLowerCase().includes(searchLower) ||
        approval.action.name.toLowerCase().includes(searchLower) ||
        approval.requester.email.toLowerCase().includes(searchLower) ||
        approval.action.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Risk filter
    if (riskFilter !== 'all' && approval.action.riskLevel !== riskFilter) return false;

    // Type filter
    if (typeFilter !== 'all' && approval.action.type !== typeFilter) return false;

    return true;
  });

  // Count stats
  const pendingCount = approvalRequests.filter(a => a.status === 'pending').length;
  const approvedCount = approvalRequests.filter(a => a.status === 'approved').length;
  const rejectedCount = approvalRequests.filter(a => a.status === 'rejected').length;

  const handleApprove = (approval: ApprovalRequest) => {
    setSelectedApproval(approval);
    setApprovalAction('approve');
    setJustification('');
    setShowApprovalDialog(true);
  };

  const handleReject = (approval: ApprovalRequest) => {
    setSelectedApproval(approval);
    setApprovalAction('reject');
    setJustification('');
    setShowApprovalDialog(true);
  };

  const handleEditAndApprove = (approval: ApprovalRequest) => {
    setSelectedApproval(approval);
    setApprovalAction('edit');
    setEditedArgs(approval.action.args);
    setJustification('');
    setShowApprovalDialog(true);
  };

  const confirmApproval = () => {
    if (!selectedApproval) return;

    setApprovalRequests(requests =>
      requests.map(req =>
        req.id === selectedApproval.id
          ? {
              ...req,
              status: approvalAction === 'reject' ? 'rejected' : 'approved',
              approver: 'demo@company.com',
              approvedAt: approvalAction !== 'reject' ? new Date().toISOString() : undefined,
              rejectedAt: approvalAction === 'reject' ? new Date().toISOString() : undefined,
              justification: justification || undefined,
              action: approvalAction === 'edit' 
                ? { ...req.action, args: editedArgs }
                : req.action
            }
          : req
      )
    );

    const actionText = approvalAction === 'reject' 
      ? 'rejected' 
      : approvalAction === 'edit'
        ? 'approved with modifications'
        : 'approved';

    toast.success(`Approval ${actionText}`, {
      description: `${selectedApproval.action.name} has been ${actionText}.`
    });

    setShowApprovalDialog(false);
    setSelectedApproval(null);
    setJustification('');
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'tool_call': return <Wrench className="w-4 h-4" />;
      case 'data_access': return <Database className="w-4 h-4" />;
      case 'data_export': return <FileText className="w-4 h-4" />;
      case 'policy_change': return <Shield className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl">Approval Inbox</h1>
            <p className="text-muted-foreground">
              Review and approve AI agent actions requiring human oversight
            </p>
          </div>
          <Badge variant="outline" className="gap-2">
            <Clock className="w-3 h-3" />
            {pendingCount} pending
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-semibold">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected Today</p>
                <p className="text-2xl font-semibold">{rejectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-semibold">12m</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search approvals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tool_call">Tool Calls</SelectItem>
                <SelectItem value="data_access">Data Access</SelectItem>
                <SelectItem value="data_export">Data Export</SelectItem>
                <SelectItem value="policy_change">Policy Changes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedCount})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <XCircle className="w-4 h-4" />
            Rejected ({rejectedCount})
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            All History
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredApprovals.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <CheckSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  {activeTab === 'pending' 
                    ? 'No pending approvals. All caught up!' 
                    : `No ${activeTab} approvals found.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredApprovals.map((approval) => (
                <motion.div
                  key={approval.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`overflow-hidden ${
                    approval.status === 'pending' 
                      ? 'border-l-4 border-l-yellow-500' 
                      : approval.status === 'approved'
                        ? 'border-l-4 border-l-green-500'
                        : 'border-l-4 border-l-red-500'
                  }`}>
                    <CardContent className="pt-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{approval.action.name}()</h3>
                              <Badge variant="outline" className={getRiskColor(approval.action.riskLevel)}>
                                {getRiskIcon(approval.action.riskLevel)}
                                <span className="ml-1 capitalize">{approval.action.riskLevel} Risk</span>
                              </Badge>
                              <Badge variant="outline" className="gap-1">
                                {getActionIcon(approval.action.type)}
                                {approval.action.type.replace('_', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{approval.action.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Bot className="w-3 h-3" />
                                {approval.agent}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {approval.requester.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {getTimeAgo(approval.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {approval.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(approval)}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            {approval.action.saferAlternative && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditAndApprove(approval)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            )}
                            <Button
                              size="sm"
                              onClick={() => handleApprove(approval)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        )}

                        {approval.status === 'approved' && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        )}

                        {approval.status === 'rejected' && (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                      </div>

                      {/* Expandable Details */}
                      <div className="space-y-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between"
                          onClick={() => setExpandedApproval(
                            expandedApproval === approval.id ? null : approval.id
                          )}
                        >
                          <span className="text-sm">
                            {expandedApproval === approval.id ? 'Hide' : 'Show'} Details
                          </span>
                          {expandedApproval === approval.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>

                        <AnimatePresence>
                          {expandedApproval === approval.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-4 pt-4 border-t">
                                {/* Arguments */}
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-2 block">
                                    Arguments
                                  </Label>
                                  <div className="bg-slate-50 border rounded-lg p-3 font-mono text-xs">
                                    <pre>{JSON.stringify(approval.action.args, null, 2)}</pre>
                                  </div>
                                </div>

                                {/* Context */}
                                {approval.context && (
                                  <div className="grid grid-cols-3 gap-3">
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                      <p className="text-xs text-muted-foreground mb-1">User Impact</p>
                                      <p className="text-sm">{approval.context.userImpact}</p>
                                    </div>
                                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                      <p className="text-xs text-muted-foreground mb-1">Data Scope</p>
                                      <p className="text-sm">{approval.context.dataScope}</p>
                                    </div>
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                      <p className="text-xs text-muted-foreground mb-1">Reversible</p>
                                      <p className="text-sm">
                                        {approval.context.reversible ? '✓ Yes' : '✗ No'}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Safer Alternative */}
                                {approval.action.saferAlternative && approval.status === 'pending' && (
                                  <Alert className="bg-green-50 border-green-200">
                                    <Sparkles className="w-4 h-4 text-green-600" />
                                    <AlertDescription className="text-green-800 text-sm">
                                      <strong>Safer alternative suggested:</strong><br />
                                      {approval.action.saferAlternative}
                                    </AlertDescription>
                                  </Alert>
                                )}

                                {/* Compliance Mapping */}
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-2 block">
                                    Compliance Mapping
                                  </Label>
                                  <div className="flex flex-wrap gap-2">
                                    {approval.complianceMapping.map((mapping, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        <Shield className="w-3 h-3 mr-1" />
                                        {mapping.framework} {mapping.control}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Approval/Rejection Info */}
                                {(approval.status === 'approved' || approval.status === 'rejected') && (
                                  <div className={`p-4 rounded-lg border ${
                                    approval.status === 'approved' 
                                      ? 'bg-green-50 border-green-200' 
                                      : 'bg-red-50 border-red-200'
                                  }`}>
                                    <div className="flex items-start gap-3">
                                      {approval.status === 'approved' ? (
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                      ) : (
                                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                      )}
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium">
                                            {approval.status === 'approved' ? 'Approved' : 'Rejected'} by {approval.approver}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {getTimeAgo(approval.approvedAt || approval.rejectedAt || '')}
                                          </span>
                                        </div>
                                        {approval.justification && (
                                          <p className="text-sm mt-2">
                                            <strong>Justification:</strong> {approval.justification}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {approvalAction === 'approve' && 'Approve Request'}
              {approvalAction === 'reject' && 'Reject Request'}
              {approvalAction === 'edit' && 'Edit & Approve Request'}
            </DialogTitle>
            <DialogDescription>
              {selectedApproval && (
                <>
                  {approvalAction === 'approve' && 'Confirm approval of this action. Add an optional justification.'}
                  {approvalAction === 'reject' && 'Explain why this request is being rejected.'}
                  {approvalAction === 'edit' && 'Modify the arguments and approve with changes.'}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedApproval && (
            <div className="space-y-4">
              {/* Request Summary */}
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={getRiskColor(selectedApproval.action.riskLevel)}>
                    {getRiskIcon(selectedApproval.action.riskLevel)}
                    <span className="ml-1 capitalize">{selectedApproval.action.riskLevel} Risk</span>
                  </Badge>
                </div>
                <p className="font-medium mb-1">{selectedApproval.action.name}()</p>
                <p className="text-sm text-muted-foreground">{selectedApproval.action.description}</p>
              </div>

              {/* Edit Args */}
              {approvalAction === 'edit' && (
                <div>
                  <Label className="mb-2 block">Modified Arguments</Label>
                  <Textarea
                    value={JSON.stringify(editedArgs, null, 2)}
                    onChange={(e) => {
                      try {
                        setEditedArgs(JSON.parse(e.target.value));
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }}
                    className="font-mono text-xs"
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Edit the JSON to modify request parameters
                  </p>
                </div>
              )}

              {/* Justification */}
              <div>
                <Label className="mb-2 block">
                  Justification {approvalAction === 'reject' && <span className="text-red-600">*</span>}
                </Label>
                <Textarea
                  placeholder={
                    approvalAction === 'approve' 
                      ? 'Optional: Explain why this request is approved...'
                      : 'Required: Explain why this request is rejected...'
                  }
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Compliance Notice */}
              <Alert>
                <Shield className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  This decision will be logged for compliance and mapped to:{' '}
                  {selectedApproval.complianceMapping.map(m => `${m.framework} ${m.control}`).join(', ')}
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmApproval}
              disabled={approvalAction === 'reject' && !justification.trim()}
              variant={approvalAction === 'reject' ? 'destructive' : 'default'}
            >
              {approvalAction === 'approve' && 'Approve'}
              {approvalAction === 'reject' && 'Reject'}
              {approvalAction === 'edit' && 'Approve with Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
