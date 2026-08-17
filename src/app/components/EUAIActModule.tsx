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
  Eye,
  FileText,
  Users,
  Gavel,
  Lock,
  Database,
  Settings,
  BarChart3,
  Clock,
  Globe,
  Building,
  Scale,
  BookOpen,
  Zap
} from 'lucide-react';

export function EUAIActModule() {
  const [selectedSystem, setSelectedSystem] = useState(null);

  // EU AI Act Risk Categories
  const riskCategories = {
    prohibited: {
      name: 'Prohibited AI Systems',
      color: 'bg-red-600',
      textColor: 'text-red-600',
      description: 'AI systems that pose unacceptable risks and are banned',
      examples: [
        'Social scoring by public authorities',
        'Real-time remote biometric identification in public spaces',
        'AI systems using subliminal techniques',
        'AI systems exploiting vulnerabilities of specific groups'
      ],
      count: 0,
      status: 'compliant'
    },
    highRisk: {
      name: 'High-Risk AI Systems',
      color: 'bg-orange-600',
      textColor: 'text-orange-600',
      description: 'AI systems subject to strict obligations before market placement',
      examples: [
        'Biometric identification and categorisation',
        'Management of critical infrastructure',
        'Educational and vocational training',
        'Employment, workers management and access to self-employment',
        'Access to essential private and public services',
        'Law enforcement',
        'Migration, asylum and border control management',
        'Administration of justice and democratic processes'
      ],
      count: 8,
      status: 'in-progress'
    },
    limitedRisk: {
      name: 'Limited Risk AI Systems',
      color: 'bg-yellow-600',
      textColor: 'text-yellow-600',
      description: 'AI systems with specific transparency obligations',
      examples: [
        'AI systems that interact with humans',
        'Emotion recognition systems',
        'Biometric categorisation systems',
        'AI systems that generate or manipulate content'
      ],
      count: 12,
      status: 'review-needed'
    },
    minimalRisk: {
      name: 'Minimal Risk AI Systems',
      color: 'bg-green-600',
      textColor: 'text-green-600',
      description: 'AI systems with voluntary codes of conduct',
      examples: [
        'AI-enabled video games',
        'Spam filters',
        'Most recommendation systems',
        'Basic chatbots'
      ],
      count: 34,
      status: 'compliant'
    }
  };

  // Compliance Requirements for High-Risk Systems
  const complianceRequirements = [
    {
      id: 'risk-management',
      title: 'Risk Management System',
      description: 'Establish, implement, document and maintain a risk management system',
      status: 'compliant',
      progress: 95,
      articles: ['Article 9'],
      tasks: [
        'Risk assessment framework established',
        'Continuous monitoring implemented',
        'Risk mitigation measures documented',
        'Regular risk reviews scheduled'
      ]
    },
    {
      id: 'data-governance',
      title: 'Data and Data Governance',
      description: 'Ensure appropriate data governance and management practices',
      status: 'in-progress',
      progress: 78,
      articles: ['Article 10'],
      tasks: [
        'Training data quality assessment',
        'Data bias detection implemented',
        'Data lineage documentation',
        'Validation data sets prepared'
      ]
    },
    {
      id: 'technical-documentation',
      title: 'Technical Documentation',
      description: 'Prepare comprehensive technical documentation',
      status: 'in-progress',
      progress: 82,
      articles: ['Article 11', 'Annex IV'],
      tasks: [
        'System architecture documented',
        'Algorithm description complete',
        'Performance metrics defined',
        'Testing procedures documented'
      ]
    },
    {
      id: 'record-keeping',
      title: 'Record-keeping',
      description: 'Maintain detailed logs of system operations',
      status: 'compliant',
      progress: 91,
      articles: ['Article 12'],
      tasks: [
        'Automated logging implemented',
        'Log retention policies defined',
        'Access controls established',
        'Audit trail maintained'
      ]
    },
    {
      id: 'transparency',
      title: 'Transparency and Information',
      description: 'Provide clear information to users and deployers',
      status: 'review-needed',
      progress: 65,
      articles: ['Article 13'],
      tasks: [
        'User instructions prepared',
        'System capabilities documented',
        'Limitations clearly stated',
        'Human oversight requirements defined'
      ]
    },
    {
      id: 'human-oversight',
      title: 'Human Oversight',
      description: 'Ensure appropriate human oversight of AI systems',
      status: 'in-progress',
      progress: 71,
      articles: ['Article 14'],
      tasks: [
        'Oversight roles defined',
        'Intervention mechanisms implemented',
        'Alert systems configured',
        'Override capabilities tested'
      ]
    },
    {
      id: 'accuracy-robustness',
      title: 'Accuracy, Robustness and Cybersecurity',
      description: 'Achieve appropriate levels of accuracy, robustness and cybersecurity',
      status: 'in-progress',
      progress: 88,
      articles: ['Article 15'],
      tasks: [
        'Performance benchmarks established',
        'Robustness testing completed',
        'Security measures implemented',
        'Monitoring systems active'
      ]
    }
  ];

  // Stakeholder Obligations
  const stakeholderObligations = [
    {
      role: 'Provider',
      description: 'Entity that develops AI system or has it developed with view to placing it on market',
      obligations: [
        'Ensure compliance with requirements',
        'Establish quality management system',
        'Draw up technical documentation',
        'Establish conformity assessment procedures',
        'Affix CE marking'
      ],
      systems: 15
    },
    {
      role: 'Deployer',
      description: 'Entity using AI system under its authority (except for personal use)',
      obligations: [
        'Use AI system in accordance with instructions',
        'Ensure human oversight',
        'Monitor operation for incidents',
        'Keep logs generated by AI system',
        'Conduct impact assessment for high-risk systems'
      ],
      systems: 23
    },
    {
      role: 'Importer',
      description: 'Entity placing AI system from third country on EU market',
      obligations: [
        'Ensure compliance before placing on market',
        'Verify conformity assessment procedures',
        'Keep copy of technical documentation',
        'Ensure AI system bears CE marking',
        'Provide competent authorities with information'
      ],
      systems: 3
    },
    {
      role: 'Distributor',
      description: 'Entity in supply chain that makes AI system available on market',
      obligations: [
        'Verify AI system bears CE marking',
        'Verify provider information is complete',
        'Ensure storage/transport conditions preserve compliance',
        'Cooperate with competent authorities',
        'Inform provider/importer of non-compliance'
      ],
      systems: 7
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'review-needed': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'non-compliant': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'border-green-200 bg-green-50';
      case 'in-progress': return 'border-yellow-200 bg-yellow-50';
      case 'review-needed': return 'border-orange-200 bg-orange-50';
      case 'non-compliant': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const overallComplianceScore = Math.round(
    complianceRequirements.reduce((sum, req) => sum + req.progress, 0) / complianceRequirements.length
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Scale className="w-5 h-5" />
            EU AI Act Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive compliance management for the European Union AI Act
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Compliance Scan
          </Button>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Overall EU AI Act Compliance Score
          </CardTitle>
          <CardDescription>
            Based on risk assessment and compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{overallComplianceScore}%</span>
                <Badge variant={overallComplianceScore >= 90 ? 'default' : overallComplianceScore >= 75 ? 'secondary' : 'destructive'}>
                  {overallComplianceScore >= 90 ? 'Compliant' : overallComplianceScore >= 75 ? 'Near Compliant' : 'Needs Attention'}
                </Badge>
              </div>
              <Progress value={overallComplianceScore} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Target: 95%</div>
              <div className="text-sm text-muted-foreground">
                {overallComplianceScore >= 95 ? '✅ Target met' : `${95 - overallComplianceScore}% to target`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="risk-assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Requirements</TabsTrigger>
          <TabsTrigger value="obligations">Stakeholder Obligations</TabsTrigger>
          <TabsTrigger value="governance">Governance Structure</TabsTrigger>
          <TabsTrigger value="monitoring">Continuous Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                AI System Risk Classification
              </CardTitle>
              <CardDescription>
                Classification based on EU AI Act risk-based approach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(riskCategories).map(([key, category]) => (
                  <Card key={key} className={`${getStatusColor(category.status)}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          {category.name}
                        </CardTitle>
                        <Badge variant="outline">{category.count} systems</Badge>
                      </div>
                      <CardDescription className="text-xs">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground">Examples:</h4>
                        <ul className="space-y-1">
                          {category.examples.slice(0, 3).map((example, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="text-primary mt-1">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View {category.count} Systems
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              These requirements apply primarily to high-risk AI systems as defined in Annex III of the EU AI Act.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {complianceRequirements.map((requirement) => (
              <Card key={requirement.id} className={`${getStatusColor(requirement.status)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {getStatusIcon(requirement.status)}
                        {requirement.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {requirement.description}
                      </CardDescription>
                      <div className="flex gap-1 mt-2">
                        {requirement.articles.map((article) => (
                          <Badge key={article} variant="outline" className="text-xs">
                            {article}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{requirement.progress}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={requirement.progress} className="h-2" />
                    <div className="space-y-1">
                      {requirement.tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details & Evidence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="obligations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Stakeholder Obligations
              </CardTitle>
              <CardDescription>
                Obligations for different actors in the AI value chain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakeholderObligations.map((stakeholder, index) => (
                  <Card key={index} className="border border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>{stakeholder.role}</span>
                        <Badge variant="outline">{stakeholder.systems} systems</Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {stakeholder.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground">Key Obligations:</h4>
                        <ul className="space-y-1">
                          {stakeholder.obligations.slice(0, 3).map((obligation, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="text-primary mt-1">•</span>
                              {obligation}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View All Obligations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  EU Governance Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">European AI Office</h4>
                    <p className="text-xs text-muted-foreground">Central coordination and oversight</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">AI Board</h4>
                    <p className="text-xs text-muted-foreground">Advisory body with member state representatives</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Scientific Panel</h4>
                    <p className="text-xs text-muted-foreground">Independent expert advisory panel</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">National Competent Authorities</h4>
                    <p className="text-xs text-muted-foreground">Member state enforcement bodies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Codes of Practice & Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Code of Practice (Article 69)</h4>
                    <p className="text-xs text-muted-foreground">For foundation models with systemic risk</p>
                    <Badge variant="outline" className="text-xs mt-1">In Development</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Harmonised Standards</h4>
                    <p className="text-xs text-muted-foreground">Technical standards for compliance</p>
                    <Badge variant="outline" className="text-xs mt-1">Available</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Common Specifications</h4>
                    <p className="text-xs text-muted-foreground">When standards are insufficient</p>
                    <Badge variant="outline" className="text-xs mt-1">Planned</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Real-time Compliance Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Risk assessments current</span>
                      <span className="text-green-600">✓ 100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Technical documentation</span>
                      <span className="text-yellow-600">⚠ 82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Record keeping</span>
                      <span className="text-green-600">✓ 91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Human oversight measures</span>
                      <span className="text-yellow-600">⚠ 71%</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-500 bg-red-50">
                    <h4 className="font-medium text-sm">Foundation Model Compliance</h4>
                    <p className="text-xs text-muted-foreground">Aug 2, 2025 - 45 days remaining</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-medium text-sm">High-Risk System Registration</h4>
                    <p className="text-xs text-muted-foreground">Feb 2, 2026 - 6 months remaining</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-sm">Full Enforcement</h4>
                    <p className="text-xs text-muted-foreground">Aug 2, 2026 - 12 months remaining</p>
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