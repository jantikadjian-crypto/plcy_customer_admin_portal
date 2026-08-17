import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  Globe, 
  Shield, 
  Award, 
  Users, 
  Building, 
  MapPin, 
  CheckCircle,
  Calendar,
  Download,
  Mail,
  Phone,
  Lock,
  Zap,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  TrendingUp
} from 'lucide-react';

interface TrustCenterEntry {
  id: string;
  companyName: string;
  industry: string;
  description: string;
  complianceScore: number;
  certifications: string[];
  regions: string[];
  aiSystems: number;
  employees: string;
  headquarters: string;
  trustScore: number;
  isVerified: boolean;
  isPremium: boolean;
  lastUpdated: string;
  url: string;
}

export function CompanyTrustCenterView({ 
  company, 
  onBack 
}: { 
  company: TrustCenterEntry; 
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed data for the selected company
  const detailedData = {
    overview: {
      mission: "We are committed to developing and deploying AI systems that are safe, transparent, and beneficial for all stakeholders.",
      established: "2018",
      aiJourney: "6+ years of responsible AI development",
      totalInvestment: "$50M+ in AI governance"
    },
    compliance: [
      {
        framework: 'EU AI Act',
        status: 'Fully Compliant',
        score: company.complianceScore,
        lastAudit: '2024-12-01',
        certificate: 'EU-AI-CERT-2024-156',
        validUntil: '2025-12-01',
        description: 'Comprehensive compliance with EU AI Act requirements for high-risk AI systems including bias testing, human oversight, and transparency obligations.',
        evidence: ['Risk Assessment Report', 'Conformity Declaration', 'Quality Management System']
      },
      {
        framework: 'ISO 27001',
        status: 'Certified',
        score: 98,
        lastAudit: '2024-11-15',
        certificate: 'ISO27001-2024-892',
        validUntil: '2027-11-15',
        description: 'Information security management system certification covering all AI data processing and model development activities.',
        evidence: ['Security Policy', 'Risk Register', 'Incident Response Plan']
      },
      {
        framework: 'SOC 2 Type II',
        status: 'Certified',
        score: 95,
        lastAudit: '2024-10-30',
        certificate: 'SOC2-T2-2024-445',
        validUntil: '2025-10-30',
        description: 'Controls for security, availability, processing integrity, confidentiality, and privacy of AI systems.',
        evidence: ['Control Environment', 'Monitoring Activities', 'Risk Assessment']
      }
    ],
    aiSystems: [
      {
        name: 'Customer Intelligence Platform',
        purpose: 'AI-powered customer behavior analysis and personalization',
        riskCategory: 'Limited Risk',
        dataTypes: ['Customer interactions', 'Purchase history', 'Behavioral patterns'],
        safeguards: ['Data anonymization', 'Bias monitoring', 'Human review of decisions'],
        status: 'Active',
        users: '50K+ customers',
        accuracy: '94.2%'
      },
      {
        name: 'Fraud Detection System',
        purpose: 'Real-time transaction fraud detection and prevention',
        riskCategory: 'High Risk',
        dataTypes: ['Transaction data', 'User patterns', 'Device fingerprints'],
        safeguards: ['Real-time monitoring', 'Explainable decisions', 'Human oversight'],
        status: 'Active',
        users: '1M+ transactions/day',
        accuracy: '99.1%'
      },
      {
        name: 'Document Processing AI',
        purpose: 'Automated document classification and data extraction',
        riskCategory: 'Minimal Risk',
        dataTypes: ['Business documents', 'Metadata', 'File properties'],
        safeguards: ['Access controls', 'Audit logging', 'Data retention policies'],
        status: 'Active',
        users: '10K+ documents/day',
        accuracy: '96.8%'
      }
    ],
    security: {
      certifications: company.certifications,
      incidentResponse: 'Average response time: < 1 hour for critical incidents',
      dataProtection: 'End-to-end encryption, zero-trust architecture',
      monitoring: '24/7 security operations center',
      compliance: '99.9% uptime SLA with continuous monitoring'
    },
    transparency: {
      reportingFrequency: 'Monthly compliance reports, quarterly risk assessments',
      publicationPolicy: 'All non-sensitive governance documentation publicly available',
      stakeholderEngagement: 'Regular stakeholder consultations and feedback sessions',
      auditTrail: 'Complete audit trail for all AI decision-making processes'
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'minimal risk': return 'bg-green-100 text-green-800';
      case 'limited risk': return 'bg-yellow-100 text-yellow-800';
      case 'high risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-100';
    if (score >= 85) return 'text-blue-600 bg-blue-100';
    if (score >= 75) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{company.companyName} Trust Center</h1>
            {company.isVerified && (
              <CheckCircle className="w-6 h-6 text-blue-600" />
            )}
            {company.isPremium && (
              <Badge variant="secondary" className="gap-1">
                <Star className="w-3 h-3" />
                Premium Partner
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{company.description}</p>
        </div>
        <Button className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Visit {company.url}
        </Button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">{company.complianceScore}%</div>
            <div className="text-sm text-muted-foreground">Compliance Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold">{company.trustScore}</span>
            </div>
            <div className="text-sm text-muted-foreground">Trust Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{company.aiSystems}</div>
            <div className="text-sm text-muted-foreground">AI Systems</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{company.certifications.length}</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{company.regions.length}</div>
            <div className="text-sm text-muted-foreground">Regions</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="ai-systems">AI Systems</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Overview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    About {company.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{detailedData.overview.mission}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Established</div>
                        <div className="text-sm text-muted-foreground">{detailedData.overview.established}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Headquarters</div>
                        <div className="text-sm text-muted-foreground">{company.headquarters}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Company Size</div>
                        <div className="text-sm text-muted-foreground">{company.employees}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Industry</div>
                        <div className="text-sm text-muted-foreground">{company.industry}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">AI Governance Journey</h4>
                    <p className="text-sm text-muted-foreground mb-2">{detailedData.overview.aiJourney}</p>
                    <p className="text-sm text-muted-foreground">{detailedData.overview.totalInvestment}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Operating Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {company.regions.map((region, index) => (
                      <Badge key={index} variant="outline">{region}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {company.certifications.slice(0, 4).map((cert, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{cert}</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trust Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Transparency Score</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Security Rating</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Rating</span>
                      <span>{company.complianceScore}%</span>
                    </div>
                    <Progress value={company.complianceScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Regulatory Compliance Status
              </CardTitle>
              <CardDescription>
                Comprehensive overview of regulatory compliance and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {detailedData.compliance.map((item, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{item.framework}</h3>
                          <Badge className={getComplianceColor(item.score)}>
                            {item.status}
                          </Badge>
                          <span className="text-sm font-medium">{item.score}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Last Audit:</span>
                            <div className="text-muted-foreground">{item.lastAudit}</div>
                          </div>
                          <div>
                            <span className="font-medium">Certificate:</span>
                            <div className="text-muted-foreground">{item.certificate}</div>
                          </div>
                          <div>
                            <span className="font-medium">Valid Until:</span>
                            <div className="text-muted-foreground">{item.validUntil}</div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </Button>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="font-medium text-sm mb-2">Supporting Evidence:</div>
                      <div className="flex flex-wrap gap-2">
                        {item.evidence.map((evidence, evidenceIndex) => (
                          <Badge key={evidenceIndex} variant="outline" className="text-xs">
                            {evidence}
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

        <TabsContent value="ai-systems" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI Systems Portfolio
              </CardTitle>
              <CardDescription>
                Detailed information about deployed AI systems and their governance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {detailedData.aiSystems.map((system, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{system.name}</h3>
                          <Badge className={getRiskColor(system.riskCategory)}>
                            {system.riskCategory}
                          </Badge>
                          <Badge variant="secondary">{system.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{system.purpose}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="font-medium text-sm">Data Types:</span>
                            <div className="text-sm text-muted-foreground mt-1">
                              {system.dataTypes.join(', ')}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-sm">Safeguards:</span>
                            <div className="text-sm text-muted-foreground mt-1">
                              {system.safeguards.join(', ')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Users/Scale:</span>
                            <div className="text-muted-foreground">{system.users}</div>
                          </div>
                          <div>
                            <span className="font-medium">Accuracy:</span>
                            <div className="text-muted-foreground">{system.accuracy}</div>
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            <div className="text-muted-foreground">{system.status}</div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Data Protection
              </CardTitle>
              <CardDescription>
                Comprehensive security measures and data protection practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Security Certifications</h3>
                    {detailedData.security.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <span className="font-medium">{cert}</span>
                        <Badge variant="secondary">Certified</Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Security Practices</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 mt-1 text-green-600" />
                        <div>
                          <div className="font-medium text-sm">Incident Response</div>
                          <div className="text-sm text-muted-foreground">{detailedData.security.incidentResponse}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lock className="w-4 h-4 mt-1 text-blue-600" />
                        <div>
                          <div className="font-medium text-sm">Data Protection</div>
                          <div className="text-sm text-muted-foreground">{detailedData.security.dataProtection}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Eye className="w-4 h-4 mt-1 text-orange-600" />
                        <div>
                          <div className="font-medium text-sm">Monitoring</div>
                          <div className="text-sm text-muted-foreground">{detailedData.security.monitoring}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 mt-1 text-purple-600" />
                        <div>
                          <div className="font-medium text-sm">Compliance</div>
                          <div className="text-sm text-muted-foreground">{detailedData.security.compliance}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4">Transparency & Reporting</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Reporting Frequency:</span>
                      <div className="text-muted-foreground">{detailedData.transparency.reportingFrequency}</div>
                    </div>
                    <div>
                      <span className="font-medium">Publication Policy:</span>
                      <div className="text-muted-foreground">{detailedData.transparency.publicationPolicy}</div>
                    </div>
                    <div>
                      <span className="font-medium">Stakeholder Engagement:</span>
                      <div className="text-muted-foreground">{detailedData.transparency.stakeholderEngagement}</div>
                    </div>
                    <div>
                      <span className="font-medium">Audit Trail:</span>
                      <div className="text-muted-foreground">{detailedData.transparency.auditTrail}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">Trust & Transparency Team</div>
                  <div className="text-sm text-muted-foreground">trust@{company.companyName.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
                <div>
                  <div className="font-medium">Data Protection Officer</div>
                  <div className="text-sm text-muted-foreground">dpo@{company.companyName.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
                <div>
                  <div className="font-medium">AI Ethics Officer</div>
                  <div className="text-sm text-muted-foreground">ai-ethics@{company.companyName.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
                <div>
                  <div className="font-medium">Security Team</div>
                  <div className="text-sm text-muted-foreground">security@{company.companyName.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Download className="w-4 h-4" />
                  Download Compliance Report
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <FileText className="w-4 h-4" />
                  Request Security Whitepaper
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Shield className="w-4 h-4" />
                  Security Questionnaire
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <AlertCircle className="w-4 h-4" />
                  Report Concern
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date(company.lastUpdated).toLocaleDateString()} • 
                This Trust Center is updated monthly to reflect current practices
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}