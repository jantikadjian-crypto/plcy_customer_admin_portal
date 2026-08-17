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
  Brain,
  Eye,
  Clock,
  Users,
  BarChart3,
  Target,
  Sparkles,
  Settings
} from 'lucide-react';

export function ISO42001Module() {
  // ISO 42001 Control Objectives
  const controlObjectives = [
    {
      id: '5.1',
      name: 'AI Management System',
      description: 'Establish, implement, maintain and continually improve AI management system',
      compliance: 91,
      status: 'compliant',
      controls: 8
    },
    {
      id: '5.2',
      name: 'AI Policy',
      description: 'Define AI policy appropriate to purpose and context',
      compliance: 95,
      status: 'compliant',
      controls: 4
    },
    {
      id: '6',
      name: 'Planning',
      description: 'AI objectives and planning to achieve them',
      compliance: 87,
      status: 'near-compliant',
      controls: 12
    },
    {
      id: '7',
      name: 'Support',
      description: 'Resources, competence, awareness, communication',
      compliance: 89,
      status: 'near-compliant',
      controls: 15
    },
    {
      id: '8',
      name: 'Operation',
      description: 'Operational planning, control and AI system lifecycle',
      compliance: 84,
      status: 'near-compliant',
      controls: 28
    },
    {
      id: '9',
      name: 'Performance Evaluation',
      description: 'Monitoring, measurement, analysis and evaluation',
      compliance: 92,
      status: 'compliant',
      controls: 10
    },
    {
      id: '10',
      name: 'Improvement',
      description: 'Nonconformity, corrective action and continual improvement',
      compliance: 88,
      status: 'near-compliant',
      controls: 7
    }
  ];

  const aiLifecycleControls = [
    {
      phase: 'Planning & Design',
      controls: [
        'AI impact assessment',
        'Stakeholder identification',
        'Requirements specification',
        'Risk assessment'
      ],
      progress: 92,
      status: 'implemented'
    },
    {
      phase: 'Data & Development',
      controls: [
        'Data quality management',
        'Training data governance',
        'Model development standards',
        'Testing & validation'
      ],
      progress: 85,
      status: 'in-progress'
    },
    {
      phase: 'Verification & Validation',
      controls: [
        'Performance evaluation',
        'Bias detection',
        'Safety testing',
        'Acceptance criteria'
      ],
      progress: 88,
      status: 'in-progress'
    },
    {
      phase: 'Deployment',
      controls: [
        'Deployment authorization',
        'User documentation',
        'Monitoring setup',
        'Rollback procedures'
      ],
      progress: 90,
      status: 'implemented'
    },
    {
      phase: 'Operation & Monitoring',
      controls: [
        'Continuous monitoring',
        'Performance tracking',
        'Incident management',
        'Human oversight'
      ],
      progress: 94,
      status: 'implemented'
    },
    {
      phase: 'Retirement',
      controls: [
        'Decommissioning plan',
        'Data retention',
        'Knowledge transfer',
        'Lessons learned'
      ],
      progress: 78,
      status: 'review-needed'
    }
  ];

  const aiPrinciples = [
    {
      principle: 'Transparency',
      description: 'AI systems and their outputs should be transparent and explainable',
      implementation: 89,
      keyControls: ['Explainability mechanisms', 'Documentation', 'User communication']
    },
    {
      principle: 'Accountability',
      description: 'Clear roles and responsibilities for AI system outcomes',
      implementation: 92,
      keyControls: ['Governance structure', 'Decision authority', 'Audit trails']
    },
    {
      principle: 'Fairness',
      description: 'AI systems should be fair and avoid bias',
      implementation: 85,
      keyControls: ['Bias testing', 'Fairness metrics', 'Mitigation strategies']
    },
    {
      principle: 'Privacy',
      description: 'Protect personal data and privacy throughout AI lifecycle',
      implementation: 93,
      keyControls: ['Privacy by design', 'Data protection', 'Consent management']
    },
    {
      principle: 'Safety & Security',
      description: 'AI systems should be safe, secure and robust',
      implementation: 91,
      keyControls: ['Security controls', 'Robustness testing', 'Incident response']
    },
    {
      principle: 'Human Oversight',
      description: 'Appropriate human oversight and control mechanisms',
      implementation: 87,
      keyControls: ['Human-in-the-loop', 'Override capabilities', 'Escalation procedures']
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'border-green-200 bg-green-50';
      case 'near-compliant': return 'border-yellow-200 bg-yellow-50';
      case 'non-compliant': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const overallCompliance = 89;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Brain className="w-5 h-5" />
            ISO/IEC 42001:2023 Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            Artificial Intelligence Management System (AIMS)
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
            Overall ISO 42001 Compliance Score
          </CardTitle>
          <CardDescription>
            Based on AI Management System controls and AI lifecycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{overallCompliance}%</span>
                <Badge variant={overallCompliance >= 90 ? 'default' : overallCompliance >= 75 ? 'secondary' : 'destructive'}>
                  {overallCompliance >= 90 ? 'AIMS Ready' : overallCompliance >= 75 ? 'Near Ready' : 'Needs Work'}
                </Badge>
              </div>
              <Progress value={overallCompliance} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Target Certification</div>
              <div className="text-sm font-medium">Q3 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="objectives" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="objectives">Control Objectives</TabsTrigger>
          <TabsTrigger value="lifecycle">AI Lifecycle</TabsTrigger>
          <TabsTrigger value="principles">AI Principles</TabsTrigger>
          <TabsTrigger value="management">AIMS Management</TabsTrigger>
        </TabsList>

        <TabsContent value="objectives" className="space-y-4">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              ISO 42001 provides requirements for establishing, implementing, and maintaining an AI Management System (AIMS).
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {controlObjectives.map((objective) => (
              <Card key={objective.id} className={getStatusColor(objective.status)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Badge variant="outline">Clause {objective.id}</Badge>
                        {objective.name}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {objective.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{objective.compliance}%</div>
                      <div className="text-xs text-muted-foreground">{objective.controls} controls</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={objective.compliance} className="h-2" />
                    <Button variant="outline" size="sm" className="w-full">
                      View Controls & Evidence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI System Lifecycle Controls
              </CardTitle>
              <CardDescription>
                Controls across the complete AI system lifecycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiLifecycleControls.map((phase, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(phase.status)}
                          <h4 className="font-medium text-sm">{phase.phase}</h4>
                          <Badge variant={phase.progress >= 90 ? 'default' : 'secondary'}>
                            {phase.progress}%
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {phase.controls.map((control, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {control}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Progress value={phase.progress} className="h-2 flex-1" />
                      <span className="text-xs font-medium">{phase.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Ethical Principles Implementation
              </CardTitle>
              <CardDescription>
                Key AI principles embedded in the management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiPrinciples.map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{item.principle}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.keyControls.map((control, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {control}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium">{item.implementation}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.implementation} className="h-2 flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  AIMS Performance Metrics
                </CardTitle>
                <CardDescription>
                  Key performance indicators for AI management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>AI Policy Adherence</span>
                    <span className="text-green-600">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Lifecycle Compliance</span>
                    <span className="text-green-600">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Risk Management</span>
                    <span className="text-yellow-600">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Continual Improvement</span>
                    <span className="text-green-600">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Management Review & Audit
                </CardTitle>
                <CardDescription>
                  AIMS review schedule and findings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Critical Findings</h4>
                      <Badge variant="destructive">0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">No critical issues identified</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Major Findings</h4>
                      <Badge variant="secondary">2</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Action plans in progress</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Minor Findings</h4>
                      <Badge variant="outline">5</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Continuous improvement items</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Observations</h4>
                      <Badge variant="outline">8</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Best practice recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                AIMS Review Timeline
              </CardTitle>
              <CardDescription>
                Scheduled management reviews and audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-medium text-sm">Quarterly Management Review</h4>
                  <p className="text-xs text-muted-foreground">February 28, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                  <h4 className="font-medium text-sm">Internal AIMS Audit</h4>
                  <p className="text-xs text-muted-foreground">March 15-22, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-medium text-sm">AI Risk Assessment Review</h4>
                  <p className="text-xs text-muted-foreground">April 10, 2025</p>
                </div>
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="font-medium text-sm">External Certification Audit</h4>
                  <p className="text-xs text-muted-foreground">June 1-5, 2025 (Stage 1)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
