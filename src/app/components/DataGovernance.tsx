import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Globe, 
  Database, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  FileText,
  Map,
  Lock,
  Eye
} from 'lucide-react';

interface DataGovernanceProps {
  defaultTab?: string;
}

export function DataGovernance({ defaultTab = 'flows' }: DataGovernanceProps) {
  const [selectedFlow, setSelectedFlow] = useState(null);

  const dataFlows = [
    {
      id: 'flow-001',
      source: 'Customer Support Slack',
      destination: 'OpenAI GPT-4',
      dataTypes: ['Customer Messages', 'Support Tickets', 'PII'],
      sourceRegion: 'EU (Frankfurt)',
      destinationRegion: 'US (Virginia)',
      status: 'blocked',
      risk: 'high',
      volume: '1,247 requests/day',
      dtiaStatus: 'required',
      lastAssessment: '2024-01-15'
    },
    {
      id: 'flow-002',
      source: 'HR Database',
      destination: 'Claude (Anthropic)',
      dataTypes: ['Employee Records', 'Performance Data'],
      sourceRegion: 'EU (Frankfurt)',
      destinationRegion: 'EU (Ireland)',
      status: 'approved',
      risk: 'low',
      volume: '89 requests/day',
      dtiaStatus: 'completed',
      lastAssessment: '2024-01-20'
    },
    {
      id: 'flow-003',
      source: 'Financial Reports',
      destination: 'Azure OpenAI',
      dataTypes: ['Financial Data', 'Business Metrics'],
      sourceRegion: 'US (California)',
      destinationRegion: 'US (East)',
      status: 'approved',
      risk: 'medium',
      volume: '234 requests/day',
      dtiaStatus: 'completed',
      lastAssessment: '2024-01-18'
    },
    {
      id: 'flow-004',
      source: 'Marketing Analytics',
      destination: 'Google Bard',
      dataTypes: ['User Behavior', 'Marketing Data'],
      sourceRegion: 'Global',
      destinationRegion: 'US (Multiple)',
      status: 'under-review',
      risk: 'medium',
      volume: '456 requests/day',
      dtiaStatus: 'in-progress',
      lastAssessment: 'In progress'
    }
  ];

  const dataClassification = [
    { type: 'PII', count: 15, percentage: 35, trend: '+2%' },
    { type: 'PHI', count: 3, percentage: 7, trend: '0%' },
    { type: 'Financial', count: 8, percentage: 19, trend: '+1%' },
    { type: 'IP/Trade Secrets', count: 12, percentage: 28, trend: '-1%' },
    { type: 'Public', count: 5, percentage: 11, trend: '+3%' }
  ];

  const dtiaTemplates = [
    {
      id: 'dtia-001',
      title: 'Customer Support AI Integration',
      status: 'completed',
      riskLevel: 'high',
      regions: ['EU', 'US'],
      dataTypes: ['PII', 'Customer Data'],
      createdDate: '2024-01-15',
      approver: 'Privacy Officer',
      nextReview: '2024-07-15'
    },
    {
      id: 'dtia-002',
      title: 'HR Analytics Platform',
      status: 'draft',
      riskLevel: 'medium',
      regions: ['EU'],
      dataTypes: ['Employee Data', 'Performance Metrics'],
      createdDate: '2024-01-20',
      approver: 'Pending',
      nextReview: 'TBD'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'blocked': return 'destructive';
      case 'under-review': return 'secondary';
      default: return 'outline';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Data Governance</h2>
          <p className="text-sm text-muted-foreground">
            AI-specific data lineage, cross-border monitoring, and DTIA management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate DTIA
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Audit Pack
          </Button>
        </div>
      </div>

      {/* Data Classification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dataClassification.map((item) => (
          <Card key={item.type}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{item.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.percentage}% of flows</span>
                <span className={item.trend.startsWith('+') ? 'text-green-600' : item.trend.startsWith('-') ? 'text-red-600' : ''}>
                  {item.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flows">Data Flows</TabsTrigger>
          <TabsTrigger value="lineage">Lineage Map</TabsTrigger>
          <TabsTrigger value="dtia">DTIA Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="flows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Cross-Border Data Flows
              </CardTitle>
              <CardDescription>
                Monitor and control AI data processing across jurisdictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataFlows.map((flow) => (
                  <div key={flow.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{flow.source} → {flow.destination}</h4>
                          <Badge variant={getStatusColor(flow.status)}>
                            {flow.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant={getRiskColor(flow.risk)}>
                            {flow.risk} risk
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>📍 {flow.sourceRegion} → {flow.destinationRegion}</span>
                          <span>📊 {flow.volume}</span>
                          <span>🗓️ {flow.lastAssessment}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {flow.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`flex items-center gap-1 ${
                          flow.dtiaStatus === 'completed' ? 'text-green-600' : 
                          flow.dtiaStatus === 'in-progress' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {flow.dtiaStatus === 'completed' ? <CheckCircle className="w-3 h-3" /> : 
                           flow.dtiaStatus === 'in-progress' ? <Database className="w-3 h-3" /> : 
                           <AlertTriangle className="w-3 h-3" />}
                          DTIA: {flow.dtiaStatus}
                        </span>
                      </div>
                      {flow.status === 'blocked' && (
                        <Button variant="destructive" size="sm">
                          <Lock className="w-3 h-3 mr-1" />
                          Blocked by Policy
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lineage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                Data Lineage Visualization
              </CardTitle>
              <CardDescription>
                End-to-end tracking of data through AI systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-accent/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Interactive Lineage Map</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visualize data flow from source systems through AI processing to outputs
                  </p>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Launch Full View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dtia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Data Transfer Impact Assessments
              </CardTitle>
              <CardDescription>
                Manage and track DTIAs for cross-border AI data processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dtiaTemplates.map((dtia) => (
                  <div key={dtia.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{dtia.title}</h4>
                          <Badge variant={dtia.status === 'completed' ? 'default' : 'secondary'}>
                            {dtia.status}
                          </Badge>
                          <Badge variant={getRiskColor(dtia.riskLevel)}>
                            {dtia.riskLevel} risk
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>ID: {dtia.id}</span>
                          <span>Created: {dtia.createdDate}</span>
                          <span>Approver: {dtia.approver}</span>
                          <span>Next Review: {dtia.nextReview}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dtia.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span>Regions: {dtia.regions.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Create New DTIA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Immutable log of all data governance actions and decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'Cross-border flow blocked', details: 'EU→US customer data to OpenAI', time: '2 minutes ago', user: 'System' },
                  { action: 'DTIA approved', details: 'Customer Support AI Integration v2.1', time: '1 hour ago', user: 'privacy.officer@company.com' },
                  { action: 'Data classification updated', details: 'HR performance data marked as sensitive', time: '3 hours ago', user: 'data.controller@company.com' },
                  { action: 'Lineage map generated', details: 'Financial reporting pipeline audit', time: '6 hours ago', user: 'System' },
                  { action: 'Policy violation detected', details: 'Unauthorized PII in marketing prompts', time: '1 day ago', user: 'System' }
                ].map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent/50 rounded">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{event.details}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{event.time}</span>
                        <span>by {event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}