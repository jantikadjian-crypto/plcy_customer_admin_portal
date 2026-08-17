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
  Eye,
  Clock,
  Users,
  BarChart3,
  FileCheck,
  Target
} from 'lucide-react';

export function ISO27001Module() {
  // ISO 27001 Annex A Controls (organized by domains)
  const controlDomains = [
    {
      id: 'A.5',
      name: 'Organizational Controls',
      description: 'Information security policies, roles, and responsibilities',
      totalControls: 37,
      implemented: 34,
      compliance: 92,
      status: 'compliant'
    },
    {
      id: 'A.6',
      name: 'People Controls',
      description: 'Screening, terms of employment, awareness and training',
      totalControls: 8,
      implemented: 7,
      compliance: 88,
      status: 'near-compliant'
    },
    {
      id: 'A.7',
      name: 'Physical Controls',
      description: 'Physical security of facilities and equipment',
      totalControls: 14,
      implemented: 13,
      compliance: 93,
      status: 'compliant'
    },
    {
      id: 'A.8',
      name: 'Technological Controls',
      description: 'Access control, cryptography, and secure development',
      totalControls: 34,
      implemented: 30,
      compliance: 88,
      status: 'near-compliant'
    }
  ];

  const keyControls = [
    {
      id: 'A.5.1',
      title: 'Information Security Policies',
      description: 'Policies for information security defined and approved',
      status: 'implemented',
      riskLevel: 'low',
      lastAudit: '2024-01-15',
      owner: 'CISO',
      evidence: 'Policy documents, approval records'
    },
    {
      id: 'A.8.2',
      title: 'Privileged Access Rights',
      description: 'Allocation and use of privileged access rights restricted and controlled',
      status: 'implemented',
      riskLevel: 'medium',
      lastAudit: '2024-01-20',
      owner: 'Security Team',
      evidence: 'Access logs, PAM system records'
    },
    {
      id: 'A.8.5',
      title: 'Secure Authentication',
      description: 'Secure authentication technologies and procedures implemented',
      status: 'in-progress',
      riskLevel: 'medium',
      lastAudit: '2024-01-18',
      owner: 'Identity Team',
      evidence: 'MFA implementation, SSO configuration'
    },
    {
      id: 'A.8.23',
      title: 'Web Filtering',
      description: 'Access to external websites filtered and managed',
      status: 'implemented',
      riskLevel: 'low',
      lastAudit: '2024-01-22',
      owner: 'Network Team',
      evidence: 'Firewall rules, web proxy logs'
    },
    {
      id: 'A.8.28',
      title: 'Secure Coding',
      description: 'Secure coding principles applied to software development',
      status: 'review-needed',
      riskLevel: 'high',
      lastAudit: '2024-01-25',
      owner: 'Engineering Team',
      evidence: 'Code review records, SAST results'
    }
  ];

  const riskAssessment = [
    {
      area: 'Confidentiality',
      score: 91,
      trend: 'improving',
      controls: 28
    },
    {
      area: 'Integrity',
      score: 87,
      trend: 'stable',
      controls: 24
    },
    {
      area: 'Availability',
      score: 89,
      trend: 'improving',
      controls: 21
    }
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

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high': return <Badge variant="destructive">High Risk</Badge>;
      case 'medium': return <Badge variant="secondary">Medium Risk</Badge>;
      case 'low': return <Badge variant="outline">Low Risk</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const overallCompliance = 89;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Shield className="w-5 h-5" />
            ISO 27001:2022 Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            Information Security Management System (ISMS)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Run Assessment
          </Button>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Overall ISO 27001 Compliance Score
          </CardTitle>
          <CardDescription>
            Based on Annex A controls implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{overallCompliance}%</span>
                <Badge variant={overallCompliance >= 90 ? 'default' : overallCompliance >= 75 ? 'secondary' : 'destructive'}>
                  {overallCompliance >= 90 ? 'Certified Ready' : overallCompliance >= 75 ? 'Near Ready' : 'Needs Work'}
                </Badge>
              </div>
              <Progress value={overallCompliance} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Certification Valid Until</div>
              <div className="text-sm font-medium">December 31, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="domains" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="domains">Control Domains</TabsTrigger>
          <TabsTrigger value="controls">Key Controls</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="isms">ISMS Management</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              ISO 27001:2022 includes 93 controls across 4 main domains (Annex A). All controls relevant to AI systems must be implemented.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {controlDomains.map((domain) => (
              <Card key={domain.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Badge variant="outline">{domain.id}</Badge>
                        {domain.name}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {domain.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{domain.compliance}%</div>
                      <div className="text-xs text-muted-foreground">
                        {domain.implemented}/{domain.totalControls} controls
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={domain.compliance} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{domain.implemented} implemented</span>
                      </div>
                      {domain.totalControls - domain.implemented > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-orange-600" />
                          <span>{domain.totalControls - domain.implemented} in progress</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Controls
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
                <FileCheck className="w-5 h-5" />
                Key Control Implementation
              </CardTitle>
              <CardDescription>
                Critical controls for AI system security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyControls.map((control) => (
                  <div key={control.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(control.status)}
                          <h4 className="font-medium text-sm">{control.id}: {control.title}</h4>
                          {getRiskBadge(control.riskLevel)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{control.description}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Owner: {control.owner}</span>
                          <span>Last Audit: {control.lastAudit}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{control.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  CIA Triad Assessment
                </CardTitle>
                <CardDescription>
                  Confidentiality, Integrity, and Availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskAssessment.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{item.area}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.controls} controls
                        </Badge>
                      </div>
                      <span className={item.score >= 90 ? 'text-green-600' : 'text-yellow-600'}>
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
                  <AlertTriangle className="w-5 h-5" />
                  Risk Treatment Status
                </CardTitle>
                <CardDescription>
                  Information security risks and treatment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Risks Accepted</h4>
                      <Badge variant="outline">5</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Documented and approved</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Risks Mitigated</h4>
                      <Badge variant="default">23</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Controls implemented</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Risks in Treatment</h4>
                      <Badge variant="secondary">8</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Action plans in progress</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Risks Transferred</h4>
                      <Badge variant="outline">3</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Insurance or third-party</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="isms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  ISMS Performance Metrics
                </CardTitle>
                <CardDescription>
                  Key performance indicators for ISMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Policy Compliance</span>
                      <span className="text-green-600">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Training Completion</span>
                      <span className="text-green-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Incident Response Time</span>
                      <span className="text-yellow-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Audit Findings Closed</span>
                      <span className="text-green-600">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Management Review Schedule
                </CardTitle>
                <CardDescription>
                  Upcoming ISMS reviews and audits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-sm">Quarterly Management Review</h4>
                    <p className="text-xs text-muted-foreground">February 15, 2025</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-medium text-sm">Internal Audit</h4>
                    <p className="text-xs text-muted-foreground">March 1-15, 2025</p>
                  </div>
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-medium text-sm">Risk Assessment Review</h4>
                    <p className="text-xs text-muted-foreground">April 1, 2025</p>
                  </div>
                  <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-medium text-sm">External Surveillance Audit</h4>
                    <p className="text-xs text-muted-foreground">June 15-17, 2025</p>
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
