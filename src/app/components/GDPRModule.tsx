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
  Globe,
  UserX,
  Scale
} from 'lucide-react';

export function GDPRModule() {
  // GDPR Principles
  const gdprPrinciples = [
    {
      name: 'Lawfulness, Fairness & Transparency',
      description: 'Processing must be lawful, fair and transparent',
      compliance: 94,
      status: 'compliant',
      articles: ['Art. 5(1)(a)', 'Art. 6']
    },
    {
      name: 'Purpose Limitation',
      description: 'Data collected for specified, explicit and legitimate purposes',
      compliance: 91,
      status: 'compliant',
      articles: ['Art. 5(1)(b)']
    },
    {
      name: 'Data Minimization',
      description: 'Adequate, relevant and limited to what is necessary',
      compliance: 87,
      status: 'near-compliant',
      articles: ['Art. 5(1)(c)']
    },
    {
      name: 'Accuracy',
      description: 'Data must be accurate and kept up to date',
      compliance: 89,
      status: 'near-compliant',
      articles: ['Art. 5(1)(d)']
    },
    {
      name: 'Storage Limitation',
      description: 'Kept only as long as necessary for purposes',
      compliance: 92,
      status: 'compliant',
      articles: ['Art. 5(1)(e)']
    },
    {
      name: 'Integrity & Confidentiality',
      description: 'Appropriate security of personal data',
      compliance: 95,
      status: 'compliant',
      articles: ['Art. 5(1)(f)', 'Art. 32']
    },
    {
      name: 'Accountability',
      description: 'Demonstrate compliance with GDPR principles',
      compliance: 88,
      status: 'near-compliant',
      articles: ['Art. 5(2)']
    }
  ];

  const dataSubjectRights = [
    {
      right: 'Right to Access',
      article: 'Art. 15',
      description: 'Individuals can request access to their personal data',
      requests: 23,
      fulfilled: 23,
      avgResponseTime: '18 days',
      status: 'compliant'
    },
    {
      right: 'Right to Rectification',
      article: 'Art. 16',
      description: 'Right to have inaccurate personal data corrected',
      requests: 8,
      fulfilled: 8,
      avgResponseTime: '12 days',
      status: 'compliant'
    },
    {
      right: 'Right to Erasure',
      article: 'Art. 17',
      description: 'Right to deletion ("right to be forgotten")',
      requests: 12,
      fulfilled: 11,
      avgResponseTime: '25 days',
      status: 'review-needed'
    },
    {
      right: 'Right to Data Portability',
      article: 'Art. 20',
      description: 'Receive personal data in structured, machine-readable format',
      requests: 5,
      fulfilled: 5,
      avgResponseTime: '20 days',
      status: 'compliant'
    },
    {
      right: 'Right to Object',
      article: 'Art. 21',
      description: 'Object to processing of personal data',
      requests: 3,
      fulfilled: 3,
      avgResponseTime: '15 days',
      status: 'compliant'
    }
  ];

  const processingActivities = [
    {
      activity: 'Customer Support AI',
      legalBasis: 'Legitimate Interest',
      dataCategories: ['Name', 'Email', 'Support Queries'],
      retention: '24 months',
      dpia: 'Completed',
      status: 'compliant'
    },
    {
      activity: 'HR Analytics AI',
      legalBasis: 'Contractual Necessity',
      dataCategories: ['Employee Data', 'Performance Metrics'],
      retention: '36 months',
      dpia: 'Required - In Progress',
      status: 'in-progress'
    },
    {
      activity: 'Marketing Automation',
      legalBasis: 'Consent',
      dataCategories: ['Name', 'Email', 'Preferences', 'Behavior'],
      retention: '12 months',
      dpia: 'Completed',
      status: 'compliant'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'border-green-200 bg-green-50';
      case 'near-compliant': return 'border-yellow-200 bg-yellow-50';
      case 'review-needed': return 'border-orange-200 bg-orange-50';
      case 'non-compliant': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const overallCompliance = 91;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Scale className="w-5 h-5" />
            GDPR Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            General Data Protection Regulation (EU) 2016/679
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
            Overall GDPR Compliance Score
          </CardTitle>
          <CardDescription>
            Based on GDPR principles and data subject rights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{overallCompliance}%</span>
                <Badge variant={overallCompliance >= 90 ? 'default' : overallCompliance >= 75 ? 'secondary' : 'destructive'}>
                  {overallCompliance >= 90 ? 'GDPR Compliant' : overallCompliance >= 75 ? 'Near Compliant' : 'Needs Work'}
                </Badge>
              </div>
              <Progress value={overallCompliance} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Last DPO Review</div>
              <div className="text-sm font-medium">January 28, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principles">GDPR Principles</TabsTrigger>
          <TabsTrigger value="rights">Data Subject Rights</TabsTrigger>
          <TabsTrigger value="processing">Processing Activities</TabsTrigger>
          <TabsTrigger value="dpia">DPIA & Records</TabsTrigger>
        </TabsList>

        <TabsContent value="principles" className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Article 5 GDPR sets out 7 key principles for processing personal data. All AI systems processing EU personal data must comply.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {gdprPrinciples.map((principle, idx) => (
              <Card key={idx} className={getStatusColor(principle.status)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm">{principle.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {principle.description}
                      </CardDescription>
                      <div className="flex gap-1 mt-2">
                        {principle.articles.map((article) => (
                          <Badge key={article} variant="outline" className="text-xs">
                            {article}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{principle.compliance}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={principle.compliance} className="h-2" />
                    <Button variant="outline" size="sm" className="w-full">
                      View Implementation Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Data Subject Rights Management
              </CardTitle>
              <CardDescription>
                Tracking and fulfillment of GDPR rights requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSubjectRights.map((right, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-sm">{right.right}</h4>
                          <Badge variant="outline" className="text-xs">
                            {right.article}
                          </Badge>
                          {right.status === 'compliant' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{right.description}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Requests: {right.requests}</span>
                          <span>Fulfilled: {right.fulfilled}</span>
                          <span>Avg Response: {right.avgResponseTime}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Requests
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={(right.fulfilled / right.requests) * 100} className="h-2 flex-1" />
                      <span className="text-xs font-medium">
                        {((right.fulfilled / right.requests) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Records of Processing Activities (ROPA)
              </CardTitle>
              <CardDescription>
                Article 30 - Documentation of data processing activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingActivities.map((activity, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-sm">{activity.activity}</h4>
                          {activity.status === 'compliant' ? (
                            <Badge variant="default">Compliant</Badge>
                          ) : (
                            <Badge variant="secondary">In Progress</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Legal Basis</p>
                            <p className="text-sm">{activity.legalBasis}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Retention Period</p>
                            <p className="text-sm">{activity.retention}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">DPIA Status</p>
                            <p className="text-sm">{activity.dpia}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Data Categories</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {activity.dataCategories.slice(0, 2).map((cat, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {cat}
                                </Badge>
                              ))}
                              {activity.dataCategories.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{activity.dataCategories.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit ROPA
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dpia" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Data Protection Impact Assessments
                </CardTitle>
                <CardDescription>
                  Article 35 - DPIAs for high-risk processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">DPIAs Completed</h4>
                      <Badge variant="default">8</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">All AI systems assessed</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">DPIAs In Progress</h4>
                      <Badge variant="secondary">2</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">New systems under review</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">High Risk Findings</h4>
                      <Badge variant="destructive">3</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Mitigation plans active</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">DPO Consultations</h4>
                      <Badge variant="outline">12</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Regular consultations held</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  International Transfers
                </CardTitle>
                <CardDescription>
                  Chapter V - Transfers outside the EEA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-sm">Adequacy Decisions</h4>
                    <p className="text-xs text-muted-foreground">2 transfers to adequate countries</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-sm">Standard Contractual Clauses</h4>
                    <p className="text-xs text-muted-foreground">5 SCCs in place for US transfers</p>
                  </div>
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-medium text-sm">Binding Corporate Rules</h4>
                    <p className="text-xs text-muted-foreground">BCRs approved for intra-group transfers</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-medium text-sm">Transfer Impact Assessments</h4>
                    <p className="text-xs text-muted-foreground">TIAs completed for all transfers</p>
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
