import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
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
} from './ui/dialog';
import {
  ClipboardList,
  Download,
  FileText,
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Share2,
  Clock,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings,
  RefreshCw,
  Mail,
  File,
  Users,
  Building,
  Scale,
  Database,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { GenerateReportDialog } from './GenerateReportDialog';
import { ReportViewer } from './ReportViewer';

export function ReportsModule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [viewingReport, setViewingReport] = useState<any>(null);
  const [realTimeView, setRealTimeView] = useState('24h');
  
  // Individual report filters
  const [complianceFilter, setComplianceFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [riskSeverity, setRiskSeverity] = useState('all');
  const [hitlFilter, setHitlFilter] = useState('all');
  const [systemHealthFilter, setSystemHealthFilter] = useState('all');
  
  // Timestamps for each report
  const [lastUpdated, setLastUpdated] = useState({
    compliance: new Date(),
    risk: new Date(Date.now() - 5 * 60000), // 5 mins ago
    hitl: new Date(Date.now() - 1 * 60000), // 1 min ago
    systemHealth: new Date(Date.now() - 0.5 * 60000) // 30 secs ago
  });

  // Report templates
  const reportTemplates = [
    {
      id: 'compliance-summary',
      name: 'Compliance Summary',
      description: 'Executive summary of compliance status across all AI systems',
      category: 'Compliance',
      icon: Shield,
      frequency: 'Weekly',
      lastGenerated: '2025-11-04',
      color: 'text-blue-600'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment Report',
      description: 'Detailed analysis of identified risks and mitigation strategies',
      category: 'Risk',
      icon: AlertTriangle,
      frequency: 'Monthly',
      lastGenerated: '2025-11-01',
      color: 'text-amber-600'
    },
    {
      id: 'audit-trail',
      name: 'Audit Trail Report',
      description: 'Complete audit trail of all governance activities and decisions',
      category: 'Audit',
      icon: FileText,
      frequency: 'Daily',
      lastGenerated: '2025-11-05',
      color: 'text-purple-600'
    },
    {
      id: 'eu-ai-act',
      name: 'EU AI Act Compliance',
      description: 'Compliance status with EU AI Act requirements and obligations',
      category: 'Regulatory',
      icon: Scale,
      frequency: 'Quarterly',
      lastGenerated: '2025-10-15',
      color: 'text-indigo-600'
    },
    {
      id: 'system-performance',
      name: 'System Performance',
      description: 'Performance metrics and KPIs for all connected AI systems',
      category: 'Performance',
      icon: TrendingUp,
      frequency: 'Weekly',
      lastGenerated: '2025-11-04',
      color: 'text-green-600'
    },
    {
      id: 'hitl-summary',
      name: 'Human-in-the-Loop Summary',
      description: 'Analysis of human oversight activities and intervention rates',
      category: 'Operations',
      icon: Users,
      frequency: 'Weekly',
      lastGenerated: '2025-11-03',
      color: 'text-cyan-600'
    },
    {
      id: 'data-governance',
      name: 'Data Governance Report',
      description: 'Data processing activities, privacy compliance, and data flows',
      category: 'Data',
      icon: Database,
      frequency: 'Monthly',
      lastGenerated: '2025-11-01',
      color: 'text-pink-600'
    },
    {
      id: 'incident-summary',
      name: 'Incident Summary',
      description: 'Summary of incidents, violations, and corrective actions taken',
      category: 'Incidents',
      icon: Activity,
      frequency: 'Monthly',
      lastGenerated: '2025-11-01',
      color: 'text-red-600'
    },
    {
      id: 'executive-dashboard',
      name: 'Executive Dashboard',
      description: 'High-level overview for leadership and stakeholders',
      category: 'Executive',
      icon: BarChart3,
      frequency: 'Monthly',
      lastGenerated: '2025-11-01',
      color: 'text-slate-600'
    },
  ];

  // Recent reports state
  const [recentReports, setRecentReports] = useState([
    {
      id: 1,
      name: 'Q4 2024 Compliance Summary',
      type: 'Compliance',
      generatedBy: 'Michael Chen',
      generatedAt: '2025-11-05 09:30',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed',
      recipients: 5,
      config: {
        template: 'compliance-summary',
        dateFrom: new Date('2024-10-01'),
        dateTo: new Date('2024-12-31')
      }
    },
    {
      id: 2,
      name: 'Weekly Risk Assessment',
      type: 'Risk',
      generatedBy: 'System (Auto)',
      generatedAt: '2025-11-04 18:00',
      size: '1.8 MB',
      format: 'PDF',
      status: 'completed',
      recipients: 3,
      config: {
        template: 'risk-assessment',
        dateFrom: new Date('2025-10-28'),
        dateTo: new Date('2025-11-04')
      }
    },
    {
      id: 3,
      name: 'EU AI Act Compliance Q3 2024',
      type: 'Regulatory',
      generatedBy: 'Sarah Johnson',
      generatedAt: '2025-10-15 14:22',
      size: '5.2 MB',
      format: 'PDF',
      status: 'completed',
      recipients: 8,
      config: {
        template: 'eu-ai-act',
        dateFrom: new Date('2024-07-01'),
        dateTo: new Date('2024-09-30')
      }
    },
    {
      id: 4,
      name: 'Daily Audit Trail - Nov 4',
      type: 'Audit',
      generatedBy: 'System (Auto)',
      generatedAt: '2025-11-04 23:59',
      size: '892 KB',
      format: 'CSV',
      status: 'completed',
      recipients: 2,
      config: {
        template: 'audit-trail',
        dateFrom: new Date('2025-11-04'),
        dateTo: new Date('2025-11-04')
      }
    },
    {
      id: 5,
      name: 'October Incident Summary',
      type: 'Incidents',
      generatedBy: 'Alex Martinez',
      generatedAt: '2025-11-01 10:15',
      size: '1.2 MB',
      format: 'PDF',
      status: 'completed',
      recipients: 4,
      config: {
        template: 'system-performance',
        dateFrom: new Date('2025-10-01'),
        dateTo: new Date('2025-10-31')
      }
    },
    {
      id: 6,
      name: 'System Performance Report',
      type: 'Performance',
      generatedBy: 'System (Auto)',
      generatedAt: '2025-11-04 08:00',
      size: '3.1 MB',
      format: 'XLSX',
      status: 'completed',
      recipients: 6,
      config: {
        template: 'system-performance',
        dateFrom: new Date('2025-10-28'),
        dateTo: new Date('2025-11-04')
      }
    },
    {
      id: 7,
      name: 'Data Processing Activities Report',
      type: 'Data',
      generatedBy: 'Emma Wilson',
      generatedAt: '2025-11-01 16:45',
      size: '4.7 MB',
      format: 'PDF',
      status: 'completed',
      recipients: 5,
      config: {
        template: 'compliance-summary',
        dateFrom: new Date('2025-10-01'),
        dateTo: new Date('2025-10-31')
      }
    },
  ]);

  // Scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Compliance Summary',
      schedule: 'Every Monday at 8:00 AM',
      nextRun: '2025-11-11 08:00',
      recipients: ['compliance@company.com', 'legal@company.com'],
      format: 'PDF',
      status: 'active'
    },
    {
      id: 2,
      name: 'Daily Audit Trail',
      schedule: 'Every day at 11:59 PM',
      nextRun: '2025-11-05 23:59',
      recipients: ['audit@company.com'],
      format: 'CSV',
      status: 'active'
    },
    {
      id: 3,
      name: 'Monthly Risk Assessment',
      schedule: '1st of every month at 9:00 AM',
      nextRun: '2025-12-01 09:00',
      recipients: ['risk@company.com', 'ciso@company.com'],
      format: 'PDF',
      status: 'active'
    },
    {
      id: 4,
      name: 'Quarterly Executive Dashboard',
      schedule: 'First Monday of quarter at 10:00 AM',
      nextRun: '2026-01-06 10:00',
      recipients: ['board@company.com', 'exec@company.com'],
      format: 'PDF',
      status: 'active'
    },
  ];

  const downloadReport = (reportName: string, format: string) => {
    toast.success('Download started', {
      description: `${reportName} is being downloaded as ${format}`,
    });
  };
  
  const refreshReport = (reportType: 'compliance' | 'risk' | 'hitl' | 'systemHealth') => {
    setLastUpdated(prev => ({
      ...prev,
      [reportType]: new Date()
    }));
    toast.success('Report refreshed', {
      description: 'Data has been updated with the latest information',
    });
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    // Format as date/time
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Dynamic data for Compliance Status
  const getComplianceData = () => {
    const data: Record<string, any> = {
      all: {
        compliant: 94,
        pending: 8,
        critical: 2,
        frameworks: [
          { name: 'EU AI Act Compliance', value: 98, color: 'green' },
          { name: 'Data Governance', value: 92, color: 'green' },
          { name: 'Policy Adherence', value: 87, color: 'amber' }
        ]
      },
      'eu-ai-act': {
        compliant: 98,
        pending: 2,
        critical: 0,
        frameworks: [
          { name: 'Transparency Requirements', value: 99, color: 'green' },
          { name: 'Risk Classification', value: 98, color: 'green' },
          { name: 'Documentation Standards', value: 97, color: 'green' }
        ]
      },
      'data-governance': {
        compliant: 92,
        pending: 5,
        critical: 1,
        frameworks: [
          { name: 'Data Quality Standards', value: 95, color: 'green' },
          { name: 'Privacy Controls', value: 91, color: 'green' },
          { name: 'Data Lineage Tracking', value: 89, color: 'amber' }
        ]
      },
      'policy': {
        compliant: 87,
        pending: 7,
        critical: 3,
        frameworks: [
          { name: 'AI Ethics Policy', value: 93, color: 'green' },
          { name: 'Usage Guidelines', value: 85, color: 'amber' },
          { name: 'Review Procedures', value: 82, color: 'amber' }
        ]
      },
      'iso': {
        compliant: 91,
        pending: 4,
        critical: 1,
        frameworks: [
          { name: 'ISO 42001 AI Management', value: 94, color: 'green' },
          { name: 'ISO 27001 Security', value: 90, color: 'green' },
          { name: 'ISO 9001 Quality', value: 88, color: 'amber' }
        ]
      }
    };
    return data[complianceFilter] || data.all;
  };
  
  // Dynamic data for Risk & Threat Alerts
  const getRiskData = () => {
    const allRisks = [
      { severity: 'high', system: 'customer-analytics', title: 'Unauthorized data access attempt', systemName: 'Customer Analytics v2.1', badge: 'High' },
      { severity: 'high', system: 'fraud-detection', title: 'Potential bias in model predictions', systemName: 'Fraud Detection ML', badge: 'High' },
      { severity: 'high', system: 'recommendation', title: 'Data quality degradation detected', systemName: 'Recommendation Engine', badge: 'High' },
      { severity: 'medium', system: 'fraud-detection', title: 'Model drift detected', systemName: 'Fraud Detection ML', badge: 'Medium' },
      { severity: 'medium', system: 'recommendation', title: 'Missing documentation update', systemName: 'Recommendation Engine', badge: 'Medium' },
      { severity: 'medium', system: 'customer-analytics', title: 'Performance degradation observed', systemName: 'Customer Analytics v2.1', badge: 'Medium' },
      { severity: 'low', system: 'customer-analytics', title: 'Minor configuration change needed', systemName: 'Customer Analytics v2.1', badge: 'Low' },
      { severity: 'low', system: 'fraud-detection', title: 'Routine maintenance required', systemName: 'Fraud Detection ML', badge: 'Low' }
    ];
    
    let filtered = allRisks;
    if (riskSeverity !== 'all') {
      filtered = filtered.filter(r => r.severity === riskSeverity);
    }
    if (riskFilter !== 'all') {
      filtered = filtered.filter(r => r.system === riskFilter);
    }
    
    const high = filtered.filter(r => r.severity === 'high').length;
    const medium = filtered.filter(r => r.severity === 'medium').length;
    const low = filtered.filter(r => r.severity === 'low').length;
    
    return {
      high,
      medium,
      low,
      alerts: filtered.slice(0, 3),
      borderColor: high > 0 ? 'red' : medium > 0 ? 'amber' : 'blue'
    };
  };
  
  // Dynamic data for HITL Activity
  const getHITLData = () => {
    const data: Record<string, any> = {
      all: {
        total: 142,
        approved: 127,
        rejected: 15,
        approvalRate: 89,
        avgResponseTime: '3.2 mins',
        supervisors: [
          { name: 'Sarah Johnson', count: 38 },
          { name: 'Michael Chen', count: 34 },
          { name: 'Alex Martinez', count: 29 }
        ]
      },
      approved: {
        total: 127,
        approved: 127,
        rejected: 0,
        approvalRate: 100,
        avgResponseTime: '2.8 mins',
        supervisors: [
          { name: 'Sarah Johnson', count: 35 },
          { name: 'Michael Chen', count: 31 },
          { name: 'Alex Martinez', count: 26 }
        ]
      },
      rejected: {
        total: 15,
        approved: 0,
        rejected: 15,
        approvalRate: 0,
        avgResponseTime: '5.1 mins',
        supervisors: [
          { name: 'Sarah Johnson', count: 6 },
          { name: 'Michael Chen', count: 5 },
          { name: 'Alex Martinez', count: 4 }
        ]
      },
      pending: {
        total: 8,
        approved: 0,
        rejected: 0,
        approvalRate: 0,
        avgResponseTime: 'N/A',
        supervisors: [
          { name: 'Sarah Johnson', count: 3 },
          { name: 'Michael Chen', count: 3 },
          { name: 'Alex Martinez', count: 2 }
        ]
      }
    };
    return data[hitlFilter] || data.all;
  };
  
  // Dynamic data for System Health
  const getSystemHealthData = () => {
    const allSystems = [
      { status: 'healthy', name: 'Customer Analytics v2.1', uptime: '99.9%', color: 'green', badge: 'Healthy' },
      { status: 'healthy', name: 'Fraud Detection ML', uptime: '99.7%', color: 'green', badge: 'Healthy' },
      { status: 'degraded', name: 'Recommendation Engine', uptime: '98.1%', color: 'amber', badge: 'Degraded' },
      { status: 'healthy', name: 'Content Moderation AI', uptime: '99.5%', color: 'green', badge: 'Healthy' },
      { status: 'degraded', name: 'Sentiment Analysis', uptime: '97.8%', color: 'amber', badge: 'Degraded' }
    ];
    
    let filtered = allSystems;
    if (systemHealthFilter !== 'all') {
      filtered = filtered.filter(s => s.status === systemHealthFilter);
    }
    
    const avgUptime = filtered.length > 0 
      ? (filtered.reduce((sum, s) => sum + parseFloat(s.uptime), 0) / filtered.length).toFixed(1) + '%'
      : '0%';
    
    return {
      uptime: avgUptime,
      latency: '234ms',
      errorRate: '0.02%',
      systems: filtered.slice(0, 3)
    };
  };

  const shareReport = (reportName: string) => {
    toast.success('Share dialog opened', {
      description: `Share ${reportName} with team members`,
    });
  };

  const handleGenerateClick = (template: any) => {
    setSelectedTemplate(template);
    setShowGenerateDialog(true);
  };

  const handleGenerateReport = (config: any) => {
    // Create new report
    const newReport = {
      id: recentReports.length + 1,
      name: config.name,
      type: config.template === 'compliance-summary' ? 'Compliance' : 
            config.template === 'risk-assessment' ? 'Risk' :
            config.template === 'audit-trail' ? 'Audit' :
            config.template === 'eu-ai-act' ? 'Regulatory' : 'Performance',
      generatedBy: 'You',
      generatedAt: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      size: '2.1 MB',
      format: config.format.toUpperCase(),
      status: 'completed',
      recipients: 0,
      config
    };

    // Add to recent reports
    setRecentReports([newReport, ...recentReports]);
    
    // Automatically open the report viewer
    setViewingReport(newReport);
    
    // Show success toast
    toast.success('Report generated successfully', {
      description: 'Your report is ready to view and download',
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">Reports</h1>
          <p className="text-muted-foreground">
            Real-time governance insights and report management
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={realTimeView} onValueChange={setRealTimeView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Report
          </Button>
          <Button className="gap-2" onClick={() => {
            if (reportTemplates.length > 0) {
              handleGenerateClick(reportTemplates[0]);
            }
          }}>
            <Plus className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Real-Time Critical Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Live Governance Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Critical metrics from the last {realTimeView === '24h' ? '24 hours' : realTimeView === '7d' ? '7 days' : '30 days'}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3 h-3" />
            Export All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Compliance Status Report */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Compliance Status</CardTitle>
                    <CardDescription>Overall compliance health</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => refreshReport('compliance')}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => downloadReport('Compliance Status - 24h', 'PDF')}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={complianceFilter} onValueChange={setComplianceFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    <SelectItem value="eu-ai-act">EU AI Act</SelectItem>
                    <SelectItem value="data-governance">Data Governance</SelectItem>
                    <SelectItem value="policy">Policy Adherence</SelectItem>
                    <SelectItem value="iso">ISO Standards</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white px-2 rounded-md border">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(lastUpdated.compliance)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const complianceData = getComplianceData();
                return (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600 mb-1">{complianceData.compliant}%</div>
                        <div className="text-xs text-muted-foreground">Compliant</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-amber-600 mb-1">{complianceData.pending}</div>
                        <div className="text-xs text-muted-foreground">Pending</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-red-600 mb-1">{complianceData.critical}</div>
                        <div className="text-xs text-muted-foreground">Critical</div>
                      </div>
                    </div>
                    {complianceData.frameworks.map((framework: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{framework.name}</span>
                          <span className={`font-medium text-${framework.color}-600`}>{framework.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full bg-${framework.color}-600`} style={{ width: `${framework.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </>
                );
              })()}
              <div className="pt-2 flex items-center justify-end text-xs border-t">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  View Full Report â†’
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Risk & Threat Alert Dashboard */}
          <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Risk & Threat Alerts</CardTitle>
                    <CardDescription>Security and risk monitoring</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => refreshReport('risk')}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => downloadReport('Risk Alerts - 24h', 'PDF')}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={riskSeverity} onValueChange={setRiskSeverity}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    <SelectItem value="customer-analytics">Customer Analytics</SelectItem>
                    <SelectItem value="fraud-detection">Fraud Detection</SelectItem>
                    <SelectItem value="recommendation">Recommendation Engine</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white px-2 rounded-md border whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(lastUpdated.risk)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const riskData = getRiskData();
                return (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-red-600 mb-1">{riskData.high}</div>
                        <div className="text-xs text-muted-foreground">High Risk</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-amber-600 mb-1">{riskData.medium}</div>
                        <div className="text-xs text-muted-foreground">Medium</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{riskData.low}</div>
                        <div className="text-xs text-muted-foreground">Low</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {riskData.alerts.length > 0 ? (
                        riskData.alerts.map((alert: any, idx: number) => (
                          <div key={idx} className={`p-3 bg-white rounded-lg border ${alert.severity === 'high' ? 'border-red-200' : alert.severity === 'medium' ? 'border-amber-200' : 'border-blue-200'} flex items-start gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${alert.severity === 'high' ? 'bg-red-600' : alert.severity === 'medium' ? 'bg-amber-600' : 'bg-blue-600'} mt-1.5`} />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{alert.title}</div>
                              <div className="text-xs text-muted-foreground">AI System: {alert.systemName}</div>
                            </div>
                            <Badge variant={alert.severity === 'high' ? 'destructive' : 'outline'} className="text-xs">{alert.badge}</Badge>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 bg-white rounded-lg border text-center text-sm text-muted-foreground">
                          No alerts match the selected filters
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
              <div className="pt-2 flex items-center justify-end text-xs border-t">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  View All Risks â†’
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Human-in-the-Loop Activity */}
          <Card className="border-purple-200 bg-purple-50/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">HITL Activity</CardTitle>
                    <CardDescription>Human oversight and interventions</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => refreshReport('hitl')}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => downloadReport('HITL Activity - 24h', 'PDF')}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={hitlFilter} onValueChange={setHitlFilter}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Decisions</SelectItem>
                    <SelectItem value="approved">Approved Only</SelectItem>
                    <SelectItem value="rejected">Rejected Only</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white px-2 rounded-md border whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(lastUpdated.hitl)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const hitlData = getHITLData();
                return (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-purple-600 mb-1">{hitlData.total}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600 mb-1">{hitlData.approved}</div>
                        <div className="text-xs text-muted-foreground">Approved</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-red-600 mb-1">{hitlData.rejected}</div>
                        <div className="text-xs text-muted-foreground">Rejected</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Approval Rate</span>
                          <span className="font-medium text-green-600">{hitlData.approvalRate}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-600" style={{ width: `${hitlData.approvalRate}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg Response Time</span>
                          <span className="font-medium">{hitlData.avgResponseTime}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: '65%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border">
                      <div className="text-sm font-medium mb-2">Top Supervisors (Today)</div>
                      <div className="space-y-2">
                        {hitlData.supervisors.map((supervisor: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{supervisor.name}</span>
                            <Badge variant="secondary" className="text-xs">{supervisor.count} reviews</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
              <div className="pt-2 flex items-center justify-end text-xs border-t">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  View HITL Module â†’
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Health & Performance */}
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">System Health</CardTitle>
                    <CardDescription>AI systems performance metrics</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => refreshReport('systemHealth')}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => downloadReport('System Health - 24h', 'PDF')}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={systemHealthFilter} onValueChange={setSystemHealthFilter}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    <SelectItem value="healthy">Healthy Only</SelectItem>
                    <SelectItem value="degraded">Degraded Only</SelectItem>
                    <SelectItem value="critical">Critical Only</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white px-2 rounded-md border whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(lastUpdated.systemHealth)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const systemData = getSystemHealthData();
                return (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600 mb-1">{systemData.uptime}</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{systemData.latency}</div>
                        <div className="text-xs text-muted-foreground">Avg Latency</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-amber-600 mb-1">{systemData.errorRate}</div>
                        <div className="text-xs text-muted-foreground">Error Rate</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {systemData.systems.length > 0 ? (
                        systemData.systems.map((system: any, idx: number) => (
                          <div key={idx} className="p-3 bg-white rounded-lg border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-${system.color}-600`} />
                              <div>
                                <div className="text-sm font-medium">{system.name}</div>
                                <div className="text-xs text-muted-foreground">{system.uptime} uptime</div>
                              </div>
                            </div>
                            <Badge variant="outline" className={`text-xs bg-${system.color}-50 text-${system.color}-700 border-${system.color}-200`}>
                              {system.badge}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 bg-white rounded-lg border text-center text-sm text-muted-foreground">
                          No systems match the selected filter
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
              <div className="pt-2 flex items-center justify-end text-xs border-t">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  View All Systems â†’
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">142</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Scheduled Reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{scheduledReports.length}</div>
            <p className="text-xs text-muted-foreground">
              All active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Report Templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{reportTemplates.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Recipients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">24</div>
            <p className="text-xs text-muted-foreground">
              Across all reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Report Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Pre-configured report templates for various governance needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card key={template.id} className="hover:border-primary transition-colors cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`w-10 h-10 rounded-lg bg-background border flex items-center justify-center ${template.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.frequency}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {template.lastGenerated}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <Button size="sm" className="w-full gap-2" onClick={() => handleGenerateClick(template)}>
                          <Plus className="w-3 h-3" />
                          Generate
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Reports Tab */}
        <TabsContent value="recent" className="space-y-4">
          {recentReports.length > 0 && recentReports[0].generatedBy === 'You' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">
                      Your report has been generated!
                    </p>
                    <p className="text-sm text-blue-700 mb-3">
                      Click the <Eye className="w-3 h-3 inline mx-1" /> icon to view or the <Download className="w-3 h-3 inline mx-1" /> icon to download your report.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                View and download recently generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and filters */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="risk">Risk</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="regulatory">Regulatory</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 days</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>Generated By</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{report.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {report.generatedAt}
                          </TableCell>
                          <TableCell className="text-sm">
                            {report.generatedBy}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {report.format}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {report.size}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setViewingReport(report)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => downloadReport(report.name, report.format)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => shareReport(report.name)}
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Manage automated report generation schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule) => (
                  <div key={schedule.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{schedule.name}</h4>
                          <Badge variant={schedule.status === 'active' ? 'default' : 'secondary'}>
                            {schedule.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{schedule.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Next: {schedule.nextRun}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>{schedule.recipients.length} recipients</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {schedule.recipients.map((email, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Trends</CardTitle>
                <CardDescription>Reports generated over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-lg bg-muted/20">
                  <p className="text-sm text-muted-foreground">Chart: Monthly report generation trends</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Types Distribution</CardTitle>
                <CardDescription>Most generated report types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '42%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Audit</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: '28%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-600" style={{ width: '18%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Performance</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Recipients</CardTitle>
                <CardDescription>Most frequent report recipients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { email: 'compliance@company.com', count: 45 },
                    { email: 'audit@company.com', count: 38 },
                    { email: 'legal@company.com', count: 32 },
                    { email: 'exec@company.com', count: 28 },
                    { email: 'board@company.com', count: 15 },
                  ].map((recipient, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{recipient.email}</span>
                      </div>
                      <Badge variant="secondary">{recipient.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Formats</CardTitle>
                <CardDescription>Preferred export formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { format: 'PDF', icon: File, count: 89, color: 'text-red-600' },
                    { format: 'XLSX', icon: File, count: 34, color: 'text-green-600' },
                    { format: 'CSV', icon: FileText, count: 12, color: 'text-blue-600' },
                    { format: 'JSON', icon: File, count: 7, color: 'text-amber-600' },
                  ].map((format, idx) => {
                    const Icon = format.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${format.color}`} />
                          <span className="text-sm">{format.format}</span>
                        </div>
                        <Badge variant="secondary">{format.count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common report operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <Download className="w-4 h-4" />
              Bulk Download
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Email Reports
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Settings className="w-4 h-4" />
              Configure Templates
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Share2 className="w-4 h-4" />
              Share Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Dialog */}
      <GenerateReportDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        template={selectedTemplate}
        onGenerate={handleGenerateReport}
      />

      {/* Report Viewer */}
      {viewingReport && (
        <ReportViewer
          report={viewingReport}
          onClose={() => setViewingReport(null)}
        />
      )}
    </div>
  );
}
