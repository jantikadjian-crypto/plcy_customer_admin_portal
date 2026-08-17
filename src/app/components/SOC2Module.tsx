import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText,
  Lock,
  Database,
  Eye,
  Clock,
  Users,
  Server,
  BarChart3,
  Settings
} from 'lucide-react';

export function SOC2Module() {
  // SOC 2 Trust Service Criteria
  const trustServiceCriteria = {
    security: {
      name: 'Security (Common Criteria)',
      description: 'The system is protected against unauthorized access',
      compliance: 96,
      status: 'compliant',
      controls: 42,
      findings: 2
    },
    availability: {
      name: 'Availability',
      description: 'The system is available for operation and use as committed',
      compliance: 92,
      status: 'compliant',
      controls: 18,
      findings: 3
    },
    processingIntegrity: {
      name: 'Processing Integrity',
      description: 'System processing is complete, valid, accurate, timely, and authorized',
      compliance: 89,
      status: 'near-compliant',
      controls: 24,
      findings: 5
    },
    confidentiality: {
      name: 'Confidentiality',
      description: 'Information designated as confidential is protected',
      compliance: 94,
      status: 'compliant',
      controls: 31,
      findings: 1
    },
    privacy: {
      name: 'Privacy',
      description: 'Personal information is collected, used, retained, disclosed, and disposed of properly',
      compliance: 88,
      status: 'near-compliant',
      controls: 28,
      findings: 4
    }
  };

  const controls = [
    {
      id: 'CC1.1',
      category: 'Control Environment',
      title: 'Integrity and Ethical Values',
      description: 'Organization demonstrates commitment to integrity and ethical values',
      status: 'implemented',
      evidence: ['Code of Conduct', 'Ethics Training', 'Policy Documentation'],
      lastReview: '2024-01-15',
      owner: 'Compliance Team'
    },
    {
      id: 'CC2.1',
      category: 'Communication',
      title: 'Internal Communication',
      description: 'Communicates quality information internally',
      status: 'implemented',
      evidence: ['Internal Memos', 'Compliance Bulletins', 'Team Meetings'],
      lastReview: '2024-01-20',
      owner: 'Communications Team'
    },
    {
      id: 'CC6.1',
      category: 'Logical Access',
      title: 'Access Control',
      description: 'Logical and physical access controls restrict access to authorized users',
      status: 'in-progress',
      evidence: ['Access Logs', 'RBAC Policies', 'MFA Implementation'],
      lastReview: '2024-01-25',
      owner: 'Security Team'
    },
    {
      id: 'CC7.2',
      category: 'System Operations',
      title: 'Change Management',
      description: 'System changes are authorized, tested, and approved',
      status: 'implemented',
      evidence: ['Change Tickets', 'Approval Workflows', 'Testing Reports'],
      lastReview: '2024-01-18',
      owner: 'Engineering Team'
    },
    {
      id: 'A1.2',
      category: 'Availability',
      title: 'Monitoring and Incident Response',
      description: 'System availability is monitored and incidents are responded to',
      status: 'review-needed',
      evidence: ['Monitoring Dashboards', 'Incident Reports', 'SLA Reports'],
      lastReview: '2024-01-22',
      owner: 'DevOps Team'
    }
  ];

  const auditReadiness = [
    { area: 'Control Documentation', score: 95, status: 'ready' },
    { area: 'Evidence Collection', score: 88, status: 'ready' },
    { area: 'Gap Remediation', score: 82, status: 'in-progress' },
    { area: 'Testing Completion', score: 91, status: 'ready' },
    { area: 'Management Review', score: 78, status: 'in-progress' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'review-needed': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'not-started': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'border-green-200 bg-green-50';
      case 'near-compliant': return 'border-yellow-200 bg-yellow-50';
      case 'non-compliant': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const overallCompliance = 92;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Shield className="w-5 h-5" />
            SOC 2 Type II Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            System and Organization Controls for Service Organizations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Run Audit Check
          </Button>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Overall SOC 2 Compliance Score
          </CardTitle>
          <CardDescription>
            Based on Trust Service Criteria and control implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{overallCompliance}%</span>
                <Badge variant={overallCompliance >= 90 ? 'default' : overallCompliance >= 75 ? 'secondary' : 'destructive'}>
                  {overallCompliance >= 90 ? 'Audit Ready' : overallCompliance >= 75 ? 'Near Ready' : 'Needs Work'}
                </Badge>
              </div>
              <Progress value={overallCompliance} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Next Audit</div>
              <div className="text-sm font-medium">March 15, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="criteria" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="criteria">Trust Service Criteria</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="audit">Audit Readiness</TabsTrigger>
          <TabsTrigger value="timeline">Audit Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="criteria" className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              SOC 2 Type II attestation covers five Trust Service Criteria. All AI systems must meet Security (Common Criteria) at minimum.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {Object.entries(trustServiceCriteria).map(([key, criteria]) => (
              <Card key={key} className={getStatusColor(criteria.status)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm">{criteria.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {criteria.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{criteria.compliance}%</div>
                      <div className="text-xs text-muted-foreground">{criteria.controls} controls</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={criteria.compliance} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{criteria.controls - criteria.findings} controls passed</span>
                      </div>
                      {criteria.findings > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-orange-600" />
                          <span>{criteria.findings} findings to address</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Controls & Evidence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="controls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Control Implementation Status
              </CardTitle>
              <CardDescription>
                Key controls across Trust Service Criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {controls.map((control) => (
                  <div key={control.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(control.status)}
                          <h4 className="font-medium text-sm">{control.id}: {control.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {control.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{control.description}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Owner: {control.owner}</span>
                          <span>Last Review: {control.lastReview}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium mb-2">Evidence:</h5>
                      <div className="flex flex-wrap gap-2">
                        {control.evidence.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Audit Readiness Assessment
                </CardTitle>
                <CardDescription>
                  Preparation status for SOC 2 Type II audit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditReadiness.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.area}</span>
                      <span className={item.status === 'ready' ? 'text-green-600' : 'text-yellow-600'}>
                        {item.score}%
                      </span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Remediation Status
                </CardTitle>
                <CardDescription>
                  Open findings and remediation progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Critical Findings</h4>
                      <Badge variant="destructive">0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">No critical issues</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">High Priority</h4>
                      <Badge variant="secondary">3</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">In remediation (Due: Feb 15)</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Medium Priority</h4>
                      <Badge variant="outline">7</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Planned for Q1 2025</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Low Priority</h4>
                      <Badge variant="outline">5</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Continuous improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Audit Timeline & Milestones
              </CardTitle>
              <CardDescription>
                Key dates for SOC 2 Type II audit cycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">Audit Planning Complete</h4>
                    <Badge variant="default">Complete</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">January 15, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">Evidence Collection Period</h4>
                    <Badge variant="default">In Progress</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Jan 15 - Feb 28, 2025 (6 months observation)</p>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">Fieldwork & Testing</h4>
                    <Badge variant="secondary">Upcoming</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">March 1-15, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-gray-500 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">Report Issuance</h4>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">March 31, 2025 (Target)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
