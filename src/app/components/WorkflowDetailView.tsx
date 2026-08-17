import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Bot,
  User,
  Settings,
  Play,
  Pause,
  StopCircle,
  Download,
  ExternalLink,
  MessageSquare,
  Wrench,
  Database,
  Eye,
  ChevronRight,
  ChevronDown,
  GitBranch,
  Timer,
  Copy,
  FileText,
  Shield,
  AlertCircle,
  CheckSquare,
  Activity,
  Code,
  Search,
  Filter,
  Maximize2,
  Share2,
  List,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { AgentSessionDebugger } from './AgentSessionDebugger';

interface WorkflowStep {
  id: string;
  type: 'llm' | 'tool_call' | 'approval' | 'agent' | 'retrieval' | 'chain' | 'error';
  name: string;
  timestamp: string;
  duration: number;
  status: 'success' | 'failed' | 'pending' | 'running';
  
  // LLM-specific
  role?: 'system' | 'user' | 'assistant';
  content?: string;
  model?: string;
  tokensUsed?: number;
  cost?: number;
  
  // Tool-specific
  toolName?: string;
  toolInput?: Record<string, any>;
  toolOutput?: any;
  
  // Approval-specific
  approvalId?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  
  // Metadata
  metadata?: Record<string, any>;
  error?: string;
  
  // Nested children (for hierarchical tracing)
  children?: WorkflowStep[];
  
  // Retrieval-specific
  query?: string;
  documents?: any[];
  similarity?: number;
}

interface WorkflowExecution {
  id: string;
  name: string;
  agentName: string;
  agentType: 'customer_support' | 'data_analyst' | 'content_moderator' | 'financial_advisor';
  status: 'running' | 'paused' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  totalDuration: number;
  steps: WorkflowStep[];
  hitlPoints: number;
  toolCallsCount: number;
  complianceFrameworks: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface WorkflowDetailViewProps {
  workflowId: string;
  onBack: () => void;
  onViewApproval?: (approvalId: string) => void;
}

export function WorkflowDetailView({ workflowId, onBack, onViewApproval }: WorkflowDetailViewProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['step-1', 'step-2', 'step-3']));
  const [selectedStepId, setSelectedStepId] = useState<string>('step-2');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Mock workflow data with hierarchical structure
  const workflow: WorkflowExecution = {
    id: workflowId,
    name: 'Customer Refund Request Processing',
    agentName: 'Customer Support Agent',
    agentType: 'customer_support',
    status: 'paused',
    startedAt: '2025-12-15T10:23:45Z',
    totalDuration: 18500,
    hitlPoints: 2,
    toolCallsCount: 5,
    complianceFrameworks: ['SOC2', 'ISO27001', 'GDPR'],
    riskLevel: 'high',
    steps: [
      {
        id: 'step-1',
        type: 'agent',
        name: 'Customer Support Agent',
        timestamp: '2025-12-15T10:23:45Z',
        duration: 18500,
        status: 'running',
        children: [
          {
            id: 'step-1-1',
            type: 'llm',
            name: 'System Prompt',
            timestamp: '2025-12-15T10:23:45Z',
            duration: 50,
            status: 'success',
            role: 'system',
            model: 'gpt-4-turbo',
            content: 'You are a customer support agent with access to customer data and refund processing tools. Always verify customer identity before accessing PII. Refunds over $500 require human approval via HITL guardrails.',
            tokensUsed: 89,
            cost: 0.00267
          },
          {
            id: 'step-1-2',
            type: 'llm',
            name: 'User Input',
            timestamp: '2025-12-15T10:23:46Z',
            duration: 100,
            status: 'success',
            role: 'user',
            content: 'I need to process a refund for order #12345. Customer is requesting $750 refund due to product defect.',
            tokensUsed: 32,
          },
          {
            id: 'step-1-3',
            type: 'chain',
            name: 'Refund Processing Chain',
            timestamp: '2025-12-15T10:23:47Z',
            duration: 18200,
            status: 'running',
            children: [
              {
                id: 'step-1-3-1',
                type: 'llm',
                name: 'Agent Reasoning',
                timestamp: '2025-12-15T10:23:47Z',
                duration: 1200,
                status: 'success',
                role: 'assistant',
                model: 'gpt-4-turbo',
                content: 'I\'ll help you process this refund. First, let me look up the order details to verify the request.',
                tokensUsed: 245,
                cost: 0.00735,
                metadata: {
                  temperature: 0.7,
                  maxTokens: 500,
                  reasoning: 'Need to verify order exists and amount matches before proceeding with refund.'
                }
              },
              {
                id: 'step-1-3-2',
                type: 'tool_call',
                name: 'get_order_details',
                timestamp: '2025-12-15T10:23:48Z',
                duration: 850,
                status: 'success',
                toolName: 'get_order_details',
                toolInput: { 
                  order_id: '12345',
                  include_customer_pii: true 
                },
                toolOutput: {
                  order_id: '12345',
                  customer_email: 'john.doe@example.com',
                  customer_name: 'John Doe',
                  amount: 750,
                  status: 'delivered',
                  product: 'Wireless Headphones Pro',
                  order_date: '2025-11-10',
                  shipping_address: '123 Main St, San Francisco, CA 94102'
                },
                metadata: {
                  api_endpoint: '/api/orders/12345',
                  response_time_ms: 850,
                  cache_hit: false
                }
              },
              {
                id: 'step-1-3-3',
                type: 'retrieval',
                name: 'Policy Retrieval',
                timestamp: '2025-12-15T10:23:49Z',
                duration: 420,
                status: 'success',
                query: 'refund approval policy for amounts over $500',
                documents: [
                  {
                    id: 'policy-123',
                    title: 'Refund Authorization Policy',
                    content: 'Refunds exceeding $500 require supervisor approval via HITL process',
                    similarity: 0.94
                  },
                  {
                    id: 'policy-456',
                    title: 'Customer Support Guidelines',
                    content: 'Always document reason for refund in audit log',
                    similarity: 0.87
                  }
                ],
                similarity: 0.94,
                metadata: {
                  vector_db: 'pinecone',
                  namespace: 'policies',
                  top_k: 3
                }
              },
              {
                id: 'step-1-3-4',
                type: 'llm',
                name: 'Decision Making',
                timestamp: '2025-12-15T10:23:50Z',
                duration: 900,
                status: 'success',
                role: 'assistant',
                model: 'gpt-4-turbo',
                content: 'I found the order. The amount matches the refund request ($750). Since this refund is over $500, I need approval before processing. Let me request authorization.',
                tokensUsed: 312,
                cost: 0.00936,
                metadata: {
                  reasoning: 'Policy requires HITL approval for refunds over $500. Triggering approval workflow.',
                  confidence: 0.98
                }
              },
              {
                id: 'step-1-3-5',
                type: 'approval',
                name: 'HITL Approval Request',
                timestamp: '2025-12-15T10:23:51Z',
                duration: 14830,
                status: 'pending',
                approvalId: 'apr-001',
                approvalStatus: 'pending',
                toolName: 'request_approval',
                toolInput: {
                  action: 'process_refund',
                  order_id: '12345',
                  amount: 750,
                  reason: 'Product defect',
                  customer_email: 'john.doe@example.com',
                  risk_level: 'high',
                  requires_supervisor: true
                },
                content: 'Requesting approval to process $750 refund for order #12345 due to product defect. Customer: john.doe@example.com',
                metadata: {
                  approval_type: 'refund_authorization',
                  assigned_to: 'supervisor@company.com',
                  sla_deadline: '2025-12-15T10:38:51Z',
                  compliance_frameworks: ['SOC2', 'GDPR']
                }
              }
            ]
          }
        ]
      }
    ],
  };

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const selectStep = (stepId: string) => {
    setSelectedStepId(stepId);
  };

  // Flatten steps for timeline and searching
  const flattenSteps = (steps: WorkflowStep[]): WorkflowStep[] => {
    const result: WorkflowStep[] = [];
    const traverse = (stepList: WorkflowStep[]) => {
      stepList.forEach(step => {
        result.push(step);
        if (step.children) {
          traverse(step.children);
        }
      });
    };
    traverse(steps);
    return result;
  };

  const allSteps = flattenSteps(workflow.steps);
  const selectedStep = allSteps.find(s => s.id === selectedStepId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'failed': return <XCircle className="w-3 h-3" />;
      case 'success': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'paused': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'success': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
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

  const getStepIcon = (step: WorkflowStep) => {
    switch (step.type) {
      case 'llm':
        if (step.role === 'system') return <Settings className="w-4 h-4 text-gray-500" />;
        if (step.role === 'user') return <User className="w-4 h-4 text-blue-500" />;
        return <Bot className="w-4 h-4 text-purple-500" />;
      case 'tool_call':
        return <Wrench className="w-4 h-4 text-green-500" />;
      case 'approval':
        return <CheckSquare className="w-4 h-4 text-orange-500" />;
      case 'agent':
        return <Bot className="w-4 h-4 text-purple-500" />;
      case 'chain':
        return <GitBranch className="w-4 h-4 text-blue-500" />;
      case 'retrieval':
        return <Database className="w-4 h-4 text-cyan-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'llm': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'tool_call': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'approval': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'agent': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'chain': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'retrieval': return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
      case 'error': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  };

  const handleExportWorkflow = () => {
    const exportData = {
      workflow,
      exportedAt: new Date().toISOString(),
      exportedBy: 'demo@company.com'
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-${workflow.id}-trace.json`;
    a.click();
    toast.success('Workflow trace exported');
  };

  const handleCopyStepDetails = (step: WorkflowStep) => {
    const details = JSON.stringify(step, null, 2);
    navigator.clipboard.writeText(details);
    toast.success('Step details copied to clipboard');
  };

  // Render hierarchical tree node
  const renderTreeNode = (step: WorkflowStep, depth: number = 0) => {
    const isExpanded = expandedSteps.has(step.id);
    const isSelected = selectedStepId === step.id;
    const hasChildren = step.children && step.children.length > 0;

    return (
      <div key={step.id}>
        <div
          className={`
            flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors
            ${isSelected ? 'bg-primary/10 border-l-2 border-primary' : ''}
          `}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => selectStep(step.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleStep(step.id);
              }}
              className="flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-3" />}
          
          <div className="flex-shrink-0">
            {getStepIcon(step)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm truncate">{step.name}</span>
              <Badge className={`text-xs border ${getStepTypeColor(step.type)}`}>
                {step.type.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={`text-xs border ${getStatusColor(step.status)}`}>
              {getStatusIcon(step.status)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDuration(step.duration)}
            </span>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {step.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Render timeline
  const renderTimeline = () => {
    const totalDuration = workflow.totalDuration;
    
    return (
      <div className="relative h-16 bg-muted/30 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center px-4">
          <div className="relative w-full h-8">
            {allSteps.map((step, index) => {
              const startTime = new Date(step.timestamp).getTime() - new Date(workflow.startedAt).getTime();
              const leftPercent = (startTime / totalDuration) * 100;
              const widthPercent = (step.duration / totalDuration) * 100;
              
              return (
                <div
                  key={step.id}
                  className={`absolute h-8 rounded cursor-pointer transition-all hover:brightness-110 ${
                    selectedStepId === step.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${Math.max(widthPercent, 0.5)}%`,
                    backgroundColor: step.type === 'llm' ? '#a855f7' :
                                   step.type === 'tool_call' ? '#22c55e' :
                                   step.type === 'approval' ? '#f97316' :
                                   step.type === 'retrieval' ? '#06b6d4' :
                                   step.type === 'chain' ? '#3b82f6' :
                                   '#6b7280',
                    opacity: 0.8,
                    zIndex: selectedStepId === step.id ? 10 : 1
                  }}
                  onClick={() => selectStep(step.id)}
                  title={`${step.name} - ${formatDuration(step.duration)}`}
                />
              );
            })}
          </div>
        </div>
        
        {/* Time markers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-1 text-xs text-muted-foreground">
          <span>0s</span>
          <span>{formatDuration(totalDuration / 4)}</span>
          <span>{formatDuration(totalDuration / 2)}</span>
          <span>{formatDuration(3 * totalDuration / 4)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>
    );
  };

  // Render detail panel for selected step
  const renderDetailPanel = () => {
    if (!selectedStep) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a step to view details</p>
          </div>
        </div>
      );
    }

    return (
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                {getStepIcon(selectedStep)}
                <div>
                  <h3 className="font-semibold">{selectedStep.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedStep.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopyStepDetails(selectedStep)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Badge className={`border ${getStepTypeColor(selectedStep.type)}`}>
                {selectedStep.type.toUpperCase()}
              </Badge>
              <Badge className={`border ${getStatusColor(selectedStep.status)}`}>
                {selectedStep.status}
              </Badge>
              <Badge variant="outline">
                <Timer className="w-3 h-3 mr-1" />
                {formatDuration(selectedStep.duration)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          {selectedStep.content && (
            <div>
              <h4 className="text-sm font-medium mb-2">Content</h4>
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                {selectedStep.content}
              </div>
            </div>
          )}

          {/* LLM-specific details */}
          {selectedStep.type === 'llm' && (
            <>
              {selectedStep.model && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Model Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Model:</span>{' '}
                      <span className="font-mono">{selectedStep.model}</span>
                    </div>
                    {selectedStep.tokensUsed && (
                      <div>
                        <span className="text-muted-foreground">Tokens:</span>{' '}
                        <span className="font-mono">{selectedStep.tokensUsed}</span>
                      </div>
                    )}
                    {selectedStep.cost && (
                      <div>
                        <span className="text-muted-foreground">Cost:</span>{' '}
                        <span className="font-mono">${selectedStep.cost.toFixed(5)}</span>
                      </div>
                    )}
                    {selectedStep.metadata?.temperature && (
                      <div>
                        <span className="text-muted-foreground">Temperature:</span>{' '}
                        <span className="font-mono">{selectedStep.metadata.temperature}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Tool call details */}
          {selectedStep.toolInput && (
            <div>
              <h4 className="text-sm font-medium mb-2">Tool Input</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="text-xs font-mono overflow-x-auto">
                  {JSON.stringify(selectedStep.toolInput, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {selectedStep.toolOutput && (
            <div>
              <h4 className="text-sm font-medium mb-2">Tool Output</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="text-xs font-mono overflow-x-auto">
                  {JSON.stringify(selectedStep.toolOutput, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Retrieval details */}
          {selectedStep.type === 'retrieval' && selectedStep.documents && (
            <div>
              <h4 className="text-sm font-medium mb-2">Retrieved Documents</h4>
              <div className="space-y-2">
                {selectedStep.documents.map((doc, index) => (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium">{doc.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {(doc.similarity * 100).toFixed(0)}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{doc.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          {selectedStep.metadata && (
            <div>
              <h4 className="text-sm font-medium mb-2">Metadata</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="text-xs font-mono overflow-x-auto">
                  {JSON.stringify(selectedStep.metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Approval details */}
          {selectedStep.approvalId && (
            <div>
              <h4 className="text-sm font-medium mb-2">Approval Details</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Approval ID:</span>
                  <code className="text-sm">{selectedStep.approvalId}</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className={getStatusColor(selectedStep.approvalStatus || 'pending')}>
                    {selectedStep.approvalStatus}
                  </Badge>
                </div>
                {onViewApproval && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewApproval(selectedStep.approvalId!)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View in Approval Inbox
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workflows
            </Button>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <h1 className="text-3xl">{workflow.name}</h1>
            <Badge className={`${getStatusColor(workflow.status)} border`}>
              <span className="flex items-center gap-1.5">
                {getStatusIcon(workflow.status)}
                {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
              </span>
            </Badge>
            <Badge className={getRiskColor(workflow.riskLevel)}>
              {workflow.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {workflow.agentName} • Started {new Date(workflow.startedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportWorkflow}>
            <Download className="w-4 h-4 mr-2" />
            Export Trace
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Execution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {renderTimeline()}
        </CardContent>
      </Card>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Trace Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trace Tree</CardTitle>
            <CardDescription>Hierarchical execution flow</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="py-2">
                {workflow.steps.map(step => renderTreeNode(step, 0))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right: Detail Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Step Details</CardTitle>
            <CardDescription>Detailed information for selected step</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[600px]">
            {renderDetailPanel()}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Steps</p>
                <p className="text-2xl">{allSteps.length}</p>
              </div>
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">LLM Calls</p>
                <p className="text-2xl">{allSteps.filter(s => s.type === 'llm').length}</p>
              </div>
              <Bot className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tool Calls</p>
                <p className="text-2xl">{allSteps.filter(s => s.type === 'tool_call').length}</p>
              </div>
              <Wrench className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">HITL Points</p>
                <p className="text-2xl">{allSteps.filter(s => s.type === 'approval').length}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tokens</p>
                <p className="text-2xl">{allSteps.reduce((sum, s) => sum + (s.tokensUsed || 0), 0)}</p>
              </div>
              <Zap className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}