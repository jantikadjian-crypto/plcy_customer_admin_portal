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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { 
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Bot,
  Activity,
  GitBranch,
  Zap,
  AlertTriangle,
  CheckSquare,
  Wrench,
  Calendar,
  TrendingUp,
  BarChart3,
  FileText,
  RefreshCw,
  ArrowUpRight,
  Settings,
  Timer,
  Shield,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkflowDetailView } from './WorkflowDetailView';
import { AgentSessionDebugger } from './AgentSessionDebugger';
import { toast } from 'sonner';

interface WorkflowListItem {
  id: string;
  name: string;
  agentName: string;
  agentType: 'customer_support' | 'data_analyst' | 'content_moderator' | 'financial_advisor';
  status: 'running' | 'paused' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  duration: number;
  stepsCount: number;
  hitlCount: number;
  toolCallsCount: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceFrameworks: string[];
}

export function WorkflowsAndAgents() {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agentTypeFilter, setAgentTypeFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7d');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'session'>('tree');
  const [workflowsList, setWorkflowsList] = useState<WorkflowListItem[]>([
    {
      id: 'wf-001',
      name: 'Customer Refund Request Processing',
      agentName: 'Customer Support Agent',
      agentType: 'customer_support',
      status: 'paused',
      startedAt: '2025-12-15T10:23:45Z',
      duration: 12500,
      stepsCount: 7,
      hitlCount: 2,
      toolCallsCount: 5,
      riskLevel: 'high',
      complianceFrameworks: ['SOC2', 'ISO27001', 'GDPR']
    },
    {
      id: 'wf-002',
      name: 'Financial Report Generation',
      agentName: 'Data Analyst Agent',
      agentType: 'data_analyst',
      status: 'running',
      startedAt: '2025-12-15T10:15:30Z',
      duration: 8200,
      stepsCount: 12,
      hitlCount: 0,
      toolCallsCount: 8,
      riskLevel: 'medium',
      complianceFrameworks: ['SOC2', 'ISO27001']
    },
    {
      id: 'wf-003',
      name: 'Content Moderation - User Post Review',
      agentName: 'Content Moderator Agent',
      agentType: 'content_moderator',
      status: 'completed',
      startedAt: '2025-12-15T09:45:12Z',
      completedAt: '2025-12-15T09:47:33Z',
      duration: 141000,
      stepsCount: 8,
      hitlCount: 1,
      toolCallsCount: 4,
      riskLevel: 'low',
      complianceFrameworks: ['GDPR']
    },
    {
      id: 'wf-004',
      name: 'Investment Recommendation Analysis',
      agentName: 'Financial Advisor Agent',
      agentType: 'financial_advisor',
      status: 'completed',
      startedAt: '2025-12-15T08:30:00Z',
      completedAt: '2025-12-15T08:38:45Z',
      duration: 525000,
      stepsCount: 15,
      hitlCount: 3,
      toolCallsCount: 11,
      riskLevel: 'critical',
      complianceFrameworks: ['SOC2', 'ISO27001', 'SEC']
    },
    {
      id: 'wf-005',
      name: 'Database Schema Migration',
      agentName: 'Data Analyst Agent',
      agentType: 'data_analyst',
      status: 'failed',
      startedAt: '2025-12-15T07:20:15Z',
      completedAt: '2025-12-15T07:22:50Z',
      duration: 155000,
      stepsCount: 6,
      hitlCount: 1,
      toolCallsCount: 3,
      riskLevel: 'high',
      complianceFrameworks: ['ISO27001']
    },
    {
      id: 'wf-006',
      name: 'User Access Review',
      agentName: 'Customer Support Agent',
      agentType: 'customer_support',
      status: 'completed',
      startedAt: '2025-12-15T06:10:30Z',
      completedAt: '2025-12-15T06:12:15Z',
      duration: 105000,
      stepsCount: 9,
      hitlCount: 2,
      toolCallsCount: 6,
      riskLevel: 'medium',
      complianceFrameworks: ['SOC2', 'GDPR']
    }
  ]);

  // New workflow form state
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    agentName: '',
    agentType: 'customer_support' as WorkflowListItem['agentType'],
    riskLevel: 'medium' as WorkflowListItem['riskLevel'],
    requiresHitl: false,
    complianceFrameworks: [] as string[],
    autoStart: false
  });

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name.trim()) {
      toast.error('Please enter a workflow name');
      return;
    }
    if (!newWorkflow.agentName.trim()) {
      toast.error('Please enter an agent name');
      return;
    }

    const newId = `wf-${String(workflowsList.length + 1).padStart(3, '0')}`;
    const newWorkflowItem: WorkflowListItem = {
      id: newId,
      name: newWorkflow.name,
      agentName: newWorkflow.agentName,
      agentType: newWorkflow.agentType,
      status: newWorkflow.autoStart ? 'running' : 'paused',
      startedAt: new Date().toISOString(),
      duration: 0,
      stepsCount: 0,
      hitlCount: newWorkflow.requiresHitl ? 1 : 0,
      toolCallsCount: 0,
      riskLevel: newWorkflow.riskLevel,
      complianceFrameworks: newWorkflow.complianceFrameworks
    };
    setWorkflowsList([newWorkflowItem, ...workflowsList]);
    toast.success(`Workflow "${newWorkflow.name}" created successfully!`);
    
    // Reset form
    setNewWorkflow({
      name: '',
      description: '',
      agentName: '',
      agentType: 'customer_support',
      riskLevel: 'medium',
      requiresHitl: false,
      complianceFrameworks: [],
      autoStart: false
    });
    setShowCreateDialog(false);
  };

  const toggleComplianceFramework = (framework: string) => {
    if (newWorkflow.complianceFrameworks.includes(framework)) {
      setNewWorkflow({
        ...newWorkflow,
        complianceFrameworks: newWorkflow.complianceFrameworks.filter(f => f !== framework)
      });
    } else {
      setNewWorkflow({
        ...newWorkflow,
        complianceFrameworks: [...newWorkflow.complianceFrameworks, framework]
      });
    }
  };

  // Filter workflows
  const filteredWorkflows = workflowsList.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.agentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    const matchesAgentType = agentTypeFilter === 'all' || workflow.agentType === agentTypeFilter;
    const matchesRisk = riskFilter === 'all' || workflow.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesAgentType && matchesRisk;
  });

  const activeWorkflows = filteredWorkflows.filter(w => w.status === 'running' || w.status === 'paused');
  const completedWorkflows = filteredWorkflows.filter(w => w.status === 'completed');
  const failedWorkflows = filteredWorkflows.filter(w => w.status === 'failed');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'paused': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/10 text-green-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'high': return 'bg-orange-500/10 text-orange-500';
      case 'critical': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'customer_support': return '👥';
      case 'data_analyst': return '📊';
      case 'content_moderator': return '🛡️';
      case 'financial_advisor': return '💰';
      default: return '🤖';
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const handleExportAll = () => {
    toast.success('Exporting all workflows...');
  };

  const handleViewWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
  };

  if (selectedWorkflowId) {
    return (
      <WorkflowDetailView 
        workflowId={selectedWorkflowId}
        onBack={() => setSelectedWorkflowId(null)}
        onViewApproval={(approvalId) => {
          toast.info(`Opening approval ${approvalId}...`);
          // Would navigate to Approval Inbox with this approval selected
        }}
      />
    );
  }

  const renderWorkflowCard = (workflow: WorkflowListItem) => (
    <motion.div
      key={workflow.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{workflow.name}</h3>
                <Badge className={`${getStatusColor(workflow.status)} border`}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(workflow.status)}
                    {workflow.status}
                  </span>
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{getAgentTypeIcon(workflow.agentType)}</span>
                <span>{workflow.agentName}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleViewWorkflow(workflow.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Trace
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Steps</p>
              <p className="text-sm font-medium">{workflow.stepsCount}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">HITL Points</p>
              <p className="text-sm font-medium flex items-center gap-1">
                {workflow.hitlCount}
                {workflow.hitlCount > 0 && <CheckSquare className="w-3 h-3 text-orange-500" />}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tool Calls</p>
              <p className="text-sm font-medium">{workflow.toolCallsCount}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{formatDuration(workflow.duration)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <Badge className={`text-xs ${getRiskColor(workflow.riskLevel)}`}>
                {workflow.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              {workflow.complianceFrameworks.map((framework) => (
                <Badge key={framework} variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  {framework}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Started {new Date(workflow.startedAt).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl">Workflows & Agents</h1>
          <p className="text-muted-foreground">
            Monitor and trace agentic AI workflows with HITL approval points
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAll}>
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Workflows</p>
                <p className="text-3xl">{activeWorkflows.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeWorkflows.filter(w => w.status === 'paused').length} paused
                </p>
              </div>
              <Activity className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">HITL Approvals</p>
                <p className="text-3xl">
                  {activeWorkflows.reduce((sum, w) => sum + w.hitlCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Waiting for approval
                </p>
              </div>
              <CheckSquare className="w-10 h-10 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-3xl">{completedWorkflows.length}</p>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from yesterday
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Workflows</p>
                <p className="text-3xl">{failedWorkflows.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Requires investigation
                </p>
              </div>
              <XCircle className="w-10 h-10 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={agentTypeFilter} onValueChange={setAgentTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Agent Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="customer_support">Customer Support</SelectItem>
                <SelectItem value="data_analyst">Data Analyst</SelectItem>
                <SelectItem value="content_moderator">Content Moderator</SelectItem>
                <SelectItem value="financial_advisor">Financial Advisor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeWorkflows.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedWorkflows.length})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Failed ({failedWorkflows.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All Workflows ({filteredWorkflows.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {activeWorkflows.length > 0 ? (
                activeWorkflows.map(workflow => renderWorkflowCard(workflow))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No active workflows</p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {completedWorkflows.length > 0 ? (
                completedWorkflows.map(workflow => renderWorkflowCard(workflow))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No completed workflows</p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="failed" className="mt-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {failedWorkflows.length > 0 ? (
                failedWorkflows.map(workflow => renderWorkflowCard(workflow))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <XCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No failed workflows</p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredWorkflows.length > 0 ? (
                filteredWorkflows.map(workflow => renderWorkflowCard(workflow))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No workflows found matching your filters</p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Workflow Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>
              Add a new workflow to monitor and trace agentic AI workflows with HITL approval points.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workflow Name</Label>
              <Input
                id="name"
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                placeholder="Enter workflow name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newWorkflow.description}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                placeholder="Enter workflow description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                value={newWorkflow.agentName}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, agentName: e.target.value })}
                placeholder="Enter agent name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agentType">Agent Type</Label>
              <Select
                value={newWorkflow.agentType}
                onValueChange={(value) => setNewWorkflow({ ...newWorkflow, agentType: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select agent type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer_support">Customer Support</SelectItem>
                  <SelectItem value="data_analyst">Data Analyst</SelectItem>
                  <SelectItem value="content_moderator">Content Moderator</SelectItem>
                  <SelectItem value="financial_advisor">Financial Advisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select
                value={newWorkflow.riskLevel}
                onValueChange={(value) => setNewWorkflow({ ...newWorkflow, riskLevel: value as WorkflowListItem['riskLevel'] })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Compliance Frameworks</Label>
              <div className="space-y-2">
                {['SOC2', 'ISO27001', 'GDPR', 'SEC'].map((framework) => (
                  <div key={framework} className="flex items-center space-x-2">
                    <Checkbox
                      id={`framework-${framework}`}
                      checked={newWorkflow.complianceFrameworks.includes(framework)}
                      onCheckedChange={() => toggleComplianceFramework(framework)}
                    />
                    <Label 
                      htmlFor={`framework-${framework}`} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {framework}
                    </Label>
                  </div>
                ))}
              </div>
              {newWorkflow.complianceFrameworks.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-2">
                  {newWorkflow.complianceFrameworks.map((framework) => (
                    <Badge key={framework} variant="outline" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      {framework}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requiresHitl"
                checked={newWorkflow.requiresHitl}
                onCheckedChange={(checked) => setNewWorkflow({ ...newWorkflow, requiresHitl: checked as boolean })}
              />
              <Label htmlFor="requiresHitl" className="text-sm font-normal cursor-pointer">
                Requires HITL Approval
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoStart"
                checked={newWorkflow.autoStart}
                onCheckedChange={(checked) => setNewWorkflow({ ...newWorkflow, autoStart: checked as boolean })}
              />
              <Label htmlFor="autoStart" className="text-sm font-normal cursor-pointer">
                Auto-start workflow immediately after creation
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateWorkflow}
            >
              Create Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}