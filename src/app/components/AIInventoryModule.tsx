import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { 
  Bot, 
  MessageCircle, 
  Brain, 
  Zap, 
  Database, 
  Eye, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Settings, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  Download, 
  Upload, 
  Users, 
  Globe, 
  Lock, 
  Activity,
  Cpu,
  Network,
  Code,
  FileText,
  BarChart3,
  Calendar,
  Star
} from 'lucide-react';

interface AIInventoryModuleProps {
  onDrillDown?: (system: { id: string; name: string }) => void;
}

export function AIInventoryModule({ onDrillDown }: AIInventoryModuleProps = {}) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // AI Tools and Initiatives Inventory
  const aiInventory = [
    {
      id: 'ai-001',
      name: 'Customer Support Assistant',
      type: 'Assistant',
      category: 'Customer Service',
      status: 'production',
      riskLevel: 'medium',
      compliance: 85,
      lastUpdate: '2024-12-20',
      owner: 'Customer Success Team',
      users: 1247,
      description: 'AI-powered customer support assistant handling tier-1 inquiries',
      technology: 'GPT-4',
      deployment: 'Cloud',
      dataTypes: ['Customer Data', 'Support Logs', 'Product Info'],
      integrations: ['Zendesk', 'Salesforce', 'Slack'],
      threats: ['T2', 'T15'],
      euAiActCategory: 'Limited Risk',
      monthlyUsage: 15420,
      accuracy: 94.2,
      uptime: 99.8,
      cost: 2340,
      lastIncident: '2024-11-15',
      nextReview: '2025-01-15'
    },
    {
      id: 'ai-002',
      name: 'HR Recruitment Bot',
      type: 'Chatbot',
      category: 'Human Resources',
      status: 'production',
      riskLevel: 'high',
      compliance: 72,
      lastUpdate: '2024-12-18',
      owner: 'HR Department',
      users: 89,
      description: 'Automated initial screening and candidate engagement',
      technology: 'Claude 3',
      deployment: 'On-premise',
      dataTypes: ['Personal Data', 'Resume Data', 'Interview Records'],
      integrations: ['Workday', 'LinkedIn', 'BambooHR'],
      threats: ['T3', 'T7', 'T15'],
      euAiActCategory: 'High Risk',
      monthlyUsage: 2180,
      accuracy: 87.5,
      uptime: 98.2,
      cost: 890,
      lastIncident: '2024-12-10',
      nextReview: '2025-01-08'
    },
    {
      id: 'ai-003',
      name: 'Code Review Agent',
      type: 'Agent',
      category: 'Development',
      status: 'development',
      riskLevel: 'medium',
      compliance: 91,
      lastUpdate: '2024-12-22',
      owner: 'Engineering Team',
      users: 45,
      description: 'Autonomous code review and security vulnerability detection',
      technology: 'GitHub Copilot + Custom',
      deployment: 'Hybrid',
      dataTypes: ['Source Code', 'Commit Logs', 'Security Scans'],
      integrations: ['GitHub', 'SonarQube', 'Jira'],
      threats: ['T11', 'T13'],
      euAiActCategory: 'Minimal Risk',
      monthlyUsage: 8750,
      accuracy: 96.1,
      uptime: 99.5,
      cost: 1560,
      lastIncident: null,
      nextReview: '2025-02-01'
    },
    {
      id: 'ai-004',
      name: 'Financial Fraud Detection',
      type: 'ML Model',
      category: 'Finance',
      status: 'production',
      riskLevel: 'critical',
      compliance: 95,
      lastUpdate: '2024-12-19',
      owner: 'Risk Management',
      users: 12,
      description: 'Real-time transaction fraud detection and prevention',
      technology: 'Custom ML Pipeline',
      deployment: 'On-premise',
      dataTypes: ['Transaction Data', 'User Behavior', 'Financial Records'],
      integrations: ['Core Banking', 'Payment Gateway', 'Risk Systems'],
      threats: ['T1', 'T3', 'T8'],
      euAiActCategory: 'High Risk',
      monthlyUsage: 45000,
      accuracy: 98.7,
      uptime: 99.9,
      cost: 8500,
      lastIncident: '2024-10-22',
      nextReview: '2025-01-03'
    },
    {
      id: 'ai-005',
      name: 'MCP Server - Document Analysis',
      type: 'MCP Server',
      category: 'Document Processing',
      status: 'pilot',
      riskLevel: 'medium',
      compliance: 78,
      lastUpdate: '2024-12-21',
      owner: 'Data Science Team',
      users: 23,
      description: 'Model Context Protocol server for document analysis and extraction',
      technology: 'Anthropic MCP + Claude',
      deployment: 'Cloud',
      dataTypes: ['Documents', 'Metadata', 'Extracted Content'],
      integrations: ['SharePoint', 'Google Drive', 'Confluence'],
      threats: ['T1', 'T12'],
      euAiActCategory: 'Limited Risk',
      monthlyUsage: 3200,
      accuracy: 91.8,
      uptime: 97.3,
      cost: 650,
      lastIncident: '2024-12-05',
      nextReview: '2025-01-20'
    },
    {
      id: 'ai-006',
      name: 'Sales Intelligence Assistant',
      type: 'Assistant',
      category: 'Sales',
      status: 'production',
      riskLevel: 'medium',
      compliance: 88,
      lastUpdate: '2024-12-17',
      owner: 'Sales Operations',
      users: 156,
      description: 'AI assistant for lead scoring and sales opportunity analysis',
      technology: 'OpenAI GPT-4',
      deployment: 'Cloud',
      dataTypes: ['Lead Data', 'Sales History', 'Customer Communications'],
      integrations: ['HubSpot', 'Salesforce', 'Outreach'],
      threats: ['T2', 'T9'],
      euAiActCategory: 'Limited Risk',
      monthlyUsage: 6800,
      accuracy: 89.4,
      uptime: 99.1,
      cost: 1280,
      lastIncident: '2024-11-28',
      nextReview: '2025-01-25'
    },
    {
      id: 'ai-007',
      name: 'Compliance Monitoring Agent',
      type: 'Agent',
      category: 'Compliance',
      status: 'production',
      riskLevel: 'high',
      compliance: 97,
      lastUpdate: '2024-12-23',
      owner: 'Compliance Team',
      users: 8,
      description: 'Autonomous monitoring of regulatory compliance across systems',
      technology: 'Custom Agent Framework',
      deployment: 'On-premise',
      dataTypes: ['Audit Logs', 'Policy Documents', 'Compliance Reports'],
      integrations: ['GRC Platform', 'SIEM', 'Document Management'],
      threats: ['T6', 'T8', 'T13'],
      euAiActCategory: 'High Risk',
      monthlyUsage: 1200,
      accuracy: 97.6,
      uptime: 99.7,
      cost: 3200,
      lastIncident: null,
      nextReview: '2025-01-10'
    },
    {
      id: 'ai-008',
      name: 'Marketing Content Generator',
      type: 'Generative AI',
      category: 'Marketing',
      status: 'production',
      riskLevel: 'low',
      compliance: 83,
      lastUpdate: '2024-12-16',
      owner: 'Marketing Team',
      users: 67,
      description: 'AI-powered content generation for marketing campaigns',
      technology: 'DALL-E 3 + GPT-4',
      deployment: 'Cloud',
      dataTypes: ['Brand Guidelines', 'Campaign Data', 'Generated Content'],
      integrations: ['Adobe Creative Suite', 'Canva', 'Social Media APIs'],
      threats: ['T5', 'T15'],
      euAiActCategory: 'Limited Risk',
      monthlyUsage: 4560,
      accuracy: 85.3,
      uptime: 98.9,
      cost: 780,
      lastIncident: '2024-12-12',
      nextReview: '2025-02-15'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Assistant': return Bot;
      case 'Chatbot': return MessageCircle;
      case 'Agent': return Brain;
      case 'ML Model': return Cpu;
      case 'MCP Server': return Network;
      case 'Generative AI': return Code;
      default: return Bot;
    }
  };

  const filteredInventory = aiInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.technology.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inventoryStats = {
    total: aiInventory.length,
    production: aiInventory.filter(i => i.status === 'production').length,
    development: aiInventory.filter(i => i.status === 'development').length,
    pilot: aiInventory.filter(i => i.status === 'pilot').length,
    highRisk: aiInventory.filter(i => i.riskLevel === 'high' || i.riskLevel === 'critical').length,
    totalUsers: aiInventory.reduce((sum, i) => sum + i.users, 0),
    totalCost: aiInventory.reduce((sum, i) => sum + i.cost, 0),
    avgCompliance: Math.round(aiInventory.reduce((sum, i) => sum + i.compliance, 0) / aiInventory.length)
  };

  const categories = [...new Set(aiInventory.map(item => item.category))];
  const types = [...new Set(aiInventory.map(item => item.type))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Tools & Initiatives Inventory
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive catalog and management of all AI systems across the organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add AI Tool
          </Button>
        </div>
      </div>

      {/* Inventory Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Total AI Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {inventoryStats.production} in production
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all AI systems
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              High Risk Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{inventoryStats.highRisk}</div>
            <p className="text-xs text-muted-foreground">
              Requiring enhanced governance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Avg Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.avgCompliance}%</div>
            <p className="text-xs text-muted-foreground">
              Overall compliance score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search AI tools, descriptions, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="pilot">Pilot</SelectItem>
                <SelectItem value="deprecated">Deprecated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredInventory.map((tool) => {
              const Icon = getTypeIcon(tool.type);
              return (
                <Card key={tool.id} 
                      className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
                        selectedTool?.id === tool.id ? 'border-primary bg-accent' : ''
                      }`}
                      onClick={() => setSelectedTool(selectedTool?.id === tool.id ? null : tool)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className="w-6 h-6 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-base">{tool.name}</CardTitle>
                            <Badge className={getStatusColor(tool.status)}>
                              {tool.status}
                            </Badge>
                            <Badge className={getRiskLevelColor(tool.riskLevel)}>
                              {tool.riskLevel} risk
                            </Badge>
                            <Badge variant="outline">{tool.type}</Badge>
                          </div>
                          <CardDescription className="text-sm mb-2">
                            {tool.description}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Owner: {tool.owner}</span>
                            <span>Users: {tool.users}</span>
                            <span>Last Update: {tool.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{tool.compliance}%</div>
                        <div className="text-xs text-muted-foreground">Compliance</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {selectedTool?.id === tool.id && (
                    <CardContent className="border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        <div>
                          <h4 className="font-medium text-sm mb-3">Technical Details</h4>
                          <div className="space-y-2 text-xs">
                            <div><span className="text-muted-foreground">Technology:</span> {tool.technology}</div>
                            <div><span className="text-muted-foreground">Deployment:</span> {tool.deployment}</div>
                            <div><span className="text-muted-foreground">EU AI Act:</span> {tool.euAiActCategory}</div>
                            <div><span className="text-muted-foreground">Monthly Usage:</span> {tool.monthlyUsage.toLocaleString()}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-3">Performance Metrics</h4>
                          <div className="space-y-2 text-xs">
                            <div><span className="text-muted-foreground">Accuracy:</span> {tool.accuracy}%</div>
                            <div><span className="text-muted-foreground">Uptime:</span> {tool.uptime}%</div>
                            <div><span className="text-muted-foreground">Monthly Cost:</span> ${tool.cost}</div>
                            <div><span className="text-muted-foreground">Next Review:</span> {tool.nextReview}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-3">Risk & Compliance</h4>
                          <div className="space-y-2">
                            <div className="text-xs">
                              <span className="text-muted-foreground">Threat IDs:</span>
                              <div className="flex gap-1 mt-1">
                                {tool.threats.map((threat) => (
                                  <Badge key={threat} variant="outline" className="text-xs">
                                    {threat}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-xs">
                              <span className="text-muted-foreground">Data Types:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {tool.dataTypes.slice(0, 2).map((type) => (
                                  <Badge key={type} variant="secondary" className="text-xs">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedTool?.name} - Detailed Overview</DialogTitle>
                              <DialogDescription>
                                Comprehensive technical and operational details
                              </DialogDescription>
                            </DialogHeader>
                            {selectedTool && <AISystemDetailView tool={selectedTool} />}
                          </DialogContent>
                        </Dialog>

                        <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <FileText className="w-3 h-3 mr-1" />
                              Full Report
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedTool?.name} - Compliance Report</DialogTitle>
                              <DialogDescription>
                                Detailed compliance, security, and governance report
                              </DialogDescription>
                            </DialogHeader>
                            {selectedTool && <AISystemReportView tool={selectedTool} />}
                          </DialogContent>
                        </Dialog>

                        <Sheet open={showConfigModal} onOpenChange={setShowConfigModal}>
                          <SheetTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Settings className="w-3 h-3 mr-1" />
                              Configure
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[600px] sm:w-[800px]">
                            <SheetHeader>
                              <SheetTitle>{selectedTool?.name} - Configuration</SheetTitle>
                              <SheetDescription>
                                Manage system settings, governance controls, and monitoring parameters
                              </SheetDescription>
                            </SheetHeader>
                            {selectedTool && <AISystemConfigView tool={selectedTool} />}
                          </SheetContent>
                        </Sheet>

                        <Sheet open={showDashboard} onOpenChange={setShowDashboard}>
                          <SheetTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Activity className="w-3 h-3 mr-1" />
                              Live Dashboard
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-[90vw]">
                            <SheetHeader>
                              <SheetTitle>{selectedTool?.name} - Live Dashboard</SheetTitle>
                              <SheetDescription>
                                Real-time monitoring, performance metrics, and operational insights
                              </SheetDescription>
                            </SheetHeader>
                            {selectedTool && <AISystemDashboard tool={selectedTool} />}
                          </SheetContent>
                        </Sheet>
                        
                        {onDrillDown && (
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => onDrillDown({ id: selectedTool.id, name: selectedTool.name })}
                          >
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Drill Down
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const categoryTools = aiInventory.filter(tool => tool.category === category);
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>{category}</span>
                      <Badge variant="outline">{categoryTools.length} tools</Badge>
                    </CardTitle>
                    <CardDescription>
                      AI systems in {category.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categoryTools.map((tool) => {
                        const Icon = getTypeIcon(tool.type);
                        return (
                          <div key={tool.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{tool.name}</span>
                              <Badge className={getRiskLevelColor(tool.riskLevel)} variant="outline">
                                {tool.riskLevel}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{tool.compliance}%</span>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Monitor compliance scores and governance requirements across all AI systems.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {aiInventory
              .sort((a, b) => a.compliance - b.compliance)
              .map((tool) => {
                const Icon = getTypeIcon(tool.type);
                return (
                  <Card key={tool.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {tool.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskLevelColor(tool.riskLevel)}>
                            {tool.riskLevel} risk
                          </Badge>
                          <Badge variant="outline">{tool.euAiActCategory}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Compliance Score</span>
                            <span className={tool.compliance >= 90 ? 'text-green-600' : tool.compliance >= 75 ? 'text-yellow-600' : 'text-red-600'}>
                              {tool.compliance}%
                            </span>
                          </div>
                          <Progress value={tool.compliance} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Last Incident:</span>
                            <div className="font-medium">
                              {tool.lastIncident ? tool.lastIncident : 'None'}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Review:</span>
                            <div className="font-medium">{tool.nextReview}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Threat Count:</span>
                            <div className="font-medium">{tool.threats.length} identified</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Data Sensitivity:</span>
                            <div className="font-medium">
                              {tool.dataTypes.includes('Personal Data') ? 'High' : 'Medium'}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="w-3 h-3 mr-1" />
                            Compliance Report
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            Schedule Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  System Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {types.map((type) => {
                    const count = aiInventory.filter(tool => tool.type === type).length;
                    const percentage = (count / aiInventory.length) * 100;
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{type}</span>
                          <span>{count} systems ({percentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded">
                      <div className="text-2xl font-bold">${inventoryStats.totalCost.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Monthly Cost</div>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <div className="text-2xl font-bold">
                        {Math.round(aiInventory.reduce((sum, i) => sum + i.accuracy, 0) / aiInventory.length)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Accuracy</div>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <div className="text-2xl font-bold">
                        {Math.round(aiInventory.reduce((sum, i) => sum + i.uptime, 0) / aiInventory.length)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Uptime</div>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <div className="text-2xl font-bold">
                        {aiInventory.reduce((sum, i) => sum + i.monthlyUsage, 0).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Monthly Usage</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper functions for the new components
const getStatusColor = (status: string) => {
  switch (status) {
    case 'production': return 'text-green-600 bg-green-100';
    case 'development': return 'text-blue-600 bg-blue-100';
    case 'pilot': return 'text-yellow-600 bg-yellow-100';
    case 'deprecated': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'critical': return 'text-red-600 bg-red-100 border-red-200';
    case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
    case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    case 'low': return 'text-green-600 bg-green-100 border-green-200';
    default: return 'text-gray-600 bg-gray-100 border-gray-200';
  }
};

// AI System Detail View Component
function AISystemDetailView({ tool }) {
  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">System ID:</span>
                <span className="font-mono">{tool.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline">{tool.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(tool.status)}>{tool.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Level:</span>
                <Badge className={getRiskLevelColor(tool.riskLevel)}>{tool.riskLevel}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium">{tool.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime:</span>
                <span className="font-medium">{tool.uptime}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Usage:</span>
                <span className="font-medium">{tool.monthlyUsage.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Users:</span>
                <span className="font-medium">{tool.users}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Score</span>
                <span className="font-bold">{tool.compliance}%</span>
              </div>
              <Progress value={tool.compliance} className="h-2" />
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground mb-1">EU AI Act Category:</div>
              <Badge variant="secondary">{tool.euAiActCategory}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Technology Stack</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary Technology:</span>
                  <span>{tool.technology}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deployment:</span>
                  <span>{tool.deployment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Cost:</span>
                  <span>${tool.cost}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Data Processing</h4>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground mb-1">Data Types:</div>
                <div className="flex flex-wrap gap-1">
                  {tool.dataTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Threats */}
      <Card>
        <CardHeader>
          <CardTitle>Security Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Identified Threats</h4>
              <div className="flex flex-wrap gap-2">
                {tool.threats.map((threat, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {threat}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Integrations</h4>
              <div className="flex flex-wrap gap-2">
                {tool.integrations.map((integration, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {integration}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// AI System Report View Component
function AISystemReportView({ tool }) {
  const reportSections = [
    {
      title: "Executive Summary",
      content: `${tool.name} is a ${tool.type.toLowerCase()} deployed in ${tool.deployment.toLowerCase()} environment, serving ${tool.users} active users with ${tool.accuracy}% accuracy rate. Current compliance score is ${tool.compliance}% with ${tool.riskLevel} risk classification.`
    },
    {
      title: "Compliance Assessment",
      content: `EU AI Act Classification: ${tool.euAiActCategory}. System meets ${tool.compliance}% of required governance controls. Next review scheduled for ${tool.nextReview}.`
    },
    {
      title: "Risk Analysis", 
      content: `Identified ${tool.threats.length} security threats requiring monitoring. Risk level assessed as ${tool.riskLevel} based on data sensitivity and operational impact.`
    },
    {
      title: "Operational Metrics",
      content: `Monthly usage: ${tool.monthlyUsage.toLocaleString()} requests. System uptime: ${tool.uptime}%. Operating cost: ${tool.cost}/month.`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{tool.name} - Governance Report</h3>
            <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          <Badge className={getRiskLevelColor(tool.riskLevel)}>
            {tool.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-4">
        {reportSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Compliance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Last Reviewed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Data Governance</TableCell>
                <TableCell><Badge variant="secondary">Compliant</Badge></TableCell>
                <TableCell>92%</TableCell>
                <TableCell>{tool.lastUpdate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Security Controls</TableCell>
                <TableCell><Badge variant="secondary">Compliant</Badge></TableCell>
                <TableCell>88%</TableCell>
                <TableCell>{tool.lastUpdate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AI Ethics</TableCell>
                <TableCell><Badge variant="outline">In Progress</Badge></TableCell>
                <TableCell>75%</TableCell>
                <TableCell>{tool.lastUpdate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Risk Management</TableCell>
                <TableCell><Badge variant="secondary">Compliant</Badge></TableCell>
                <TableCell>95%</TableCell>
                <TableCell>{tool.lastUpdate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
              <div>
                <div className="font-medium text-sm">Complete AI Ethics Assessment</div>
                <div className="text-xs text-muted-foreground">Due: {tool.nextReview}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <Shield className="w-4 h-4 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium text-sm">Update Security Documentation</div>
                <div className="text-xs text-muted-foreground">Priority: Medium</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// AI System Configuration View Component
function AISystemConfigView({ tool }) {
  return (
    <div className="space-y-6 mt-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">System Name</label>
                  <Input defaultValue={tool.name} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Owner</label>
                  <Input defaultValue={tool.owner} className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input defaultValue={tool.description} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue={tool.status}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="pilot">Pilot</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Risk Level</label>
                  <Select defaultValue={tool.riskLevel}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Enable Threat Monitoring</div>
                    <div className="text-xs text-muted-foreground">Monitor for security threats</div>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Data Encryption</div>
                    <div className="text-xs text-muted-foreground">Encrypt data in transit and at rest</div>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Access Logging</div>
                    <div className="text-xs text-muted-foreground">Log all system access</div>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Alert Threshold (Usage)</label>
                  <Input defaultValue="10000" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Performance Alert (%)</label>
                  <Input defaultValue="85" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notification Email</label>
                <Input defaultValue="admin@company.com" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Review Frequency</label>
                <Select defaultValue="monthly">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Next Review Date</label>
                <Input defaultValue={tool.nextReview} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

// AI System Live Dashboard Component
function AISystemDashboard({ tool }) {
  // Generate real-time mock data
  const generateRealtimeData = () => {
    const now = Date.now();
    return Array.from({ length: 24 }, (_, i) => ({
      time: new Date(now - (23 - i) * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      requests: Math.floor(Math.random() * 1000) + 500,
      errors: Math.floor(Math.random() * 50),
      latency: Math.floor(Math.random() * 200) + 50
    }));
  };

  const realtimeData = generateRealtimeData();
  const currentMetrics = {
    requestsPerMinute: Math.floor(Math.random() * 100) + 50,
    errorRate: (Math.random() * 2 + 0.1).toFixed(2),
    avgLatency: Math.floor(Math.random() * 150) + 80,
    activeUsers: Math.floor(Math.random() * 50) + tool.users - 50
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Requests/Min</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentMetrics.requestsPerMinute}</div>
            <p className="text-xs text-muted-foreground">Live updates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{currentMetrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground">Last 5 minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentMetrics.avgLatency}ms</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>CPU Usage</span>
                  <span>64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage Usage</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div>System health check passed</div>
                  <div className="text-xs text-muted-foreground">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div>Configuration updated</div>
                  <div className="text-xs text-muted-foreground">15 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div>High usage alert resolved</div>
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Request Timeline (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span>Total Requests: {realtimeData.reduce((sum, d) => sum + d.requests, 0).toLocaleString()}</span>
              <span>Avg Response Time: {Math.floor(realtimeData.reduce((sum, d) => sum + d.latency, 0) / realtimeData.length)}ms</span>
            </div>
            
            {/* Simple timeline visualization */}
            <div className="grid grid-cols-12 gap-1 h-32">
              {realtimeData.slice(-12).map((data, index) => (
                <div key={index} className="relative">
                  <div 
                    className="bg-blue-500 rounded-t-sm absolute bottom-0 w-full"
                    style={{ height: `${(data.requests / 1500) * 100}%` }}
                    title={`${data.time}: ${data.requests} requests`}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{realtimeData[realtimeData.length - 12]?.time}</span>
              <span>Now</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tool.threats.slice(0, 3).map((threat, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Threat {threat} Detected</div>
                  <div className="text-xs text-muted-foreground">Monitoring active - no action required</div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            ))}
            
            {tool.threats.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-sm">No active alerts</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}