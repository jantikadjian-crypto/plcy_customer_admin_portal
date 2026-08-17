import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Eye, 
  Download, 
  Share, 
  Globe, 
  Shield, 
  CheckCircle, 
  FileText,
  Settings,
  ExternalLink,
  Calendar,
  Award,
  Lock,
  Users,
  Edit3,
  Save,
  Building,
  Zap,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Copy,
  Palette,
  Layout,
  BarChart3,
  RefreshCw,
  Plus,
  ArrowRight,
  Star,
  BookOpen,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Bot
} from 'lucide-react';

export function TrustCenter() {
  const [activeView, setActiveView] = useState('manage'); // manage, preview, or public
  const [isPublished, setIsPublished] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Trust Center Configuration
  const [trustCenterConfig, setTrustCenterConfig] = useState({
    // Basic Info
    companyName: 'Your Company',
    tagline: 'Building trustworthy AI systems',
    description: 'Leading provider of AI-powered business solutions with a commitment to responsible AI development and deployment.',
    website: 'https://yourcompany.com',
    logo: '',
    
    // Customization
    primaryColor: '#030213',
    customDomain: 'trust.yourcompany.com',
    showBranding: true,
    theme: 'light',
    
    // Contact Info
    email: 'trust@yourcompany.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    
    // Display Options
    showCompliance: true,
    showAISystems: true,
    showSecurity: true,
    showPrivacy: true,
    showMetrics: true,
    showCertificates: true,
    showDocumentation: true,
    showFAQ: true,
    
    // Compliance Statements
    euAiActStatement: 'We are committed to full compliance with the EU AI Act and have implemented comprehensive governance frameworks.',
    gdprStatement: 'Our data processing practices are fully compliant with GDPR requirements.',
    customStatement: '',
    
    // Documentation & FAQ Content
    documentationSections: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        content: 'Learn how to get started with our AI systems and understand our governance approach.',
        items: [
          {
            title: 'AI System Overview',
            content: 'Our AI systems are designed with transparency and accountability at their core. Each system undergoes rigorous testing and validation before deployment.'
          },
          {
            title: 'Data Usage Guidelines',
            content: 'We follow strict data minimization principles and only collect data necessary for system functionality.'
          },
          {
            title: 'User Rights & Controls',
            content: 'Users have comprehensive control over their data and AI interactions, including opt-out mechanisms.'
          }
        ]
      },
      {
        id: 'compliance',
        title: 'Compliance & Governance',
        content: 'Detailed information about our compliance frameworks and governance practices.',
        items: [
          {
            title: 'EU AI Act Compliance',
            content: 'Our compliance approach covers risk assessment, quality management, and transparency obligations under the EU AI Act.'
          },
          {
            title: 'GDPR & Privacy',
            content: 'Data protection measures including purpose limitation, storage minimization, and user consent management.'
          },
          {
            title: 'Security Standards',
            content: 'Implementation of ISO 27001 and industry best practices for AI system security.'
          }
        ]
      },
      {
        id: 'technical',
        title: 'Technical Documentation',
        content: 'Technical specifications and integration guidelines for our AI systems.',
        items: [
          {
            title: 'API Documentation',
            content: 'Comprehensive API documentation with examples and best practices for integration.'
          },
          {
            title: 'Model Specifications',
            content: 'Detailed specifications for our AI models including capabilities, limitations, and performance metrics.'
          },
          {
            title: 'Security Implementation',
            content: 'Security measures including encryption, access controls, and audit logging.'
          }
        ]
      }
    ],
    faqItems: [
      {
        id: 'general-1',
        question: 'How do you ensure AI system reliability?',
        answer: 'We employ comprehensive testing, monitoring, and governance frameworks. All AI systems undergo rigorous validation before deployment and continuous monitoring during operation.',
        category: 'General'
      },
      {
        id: 'general-2',
        question: 'What data do your AI systems process?',
        answer: 'Our AI systems only process data necessary for their intended purpose. We follow data minimization principles and provide detailed information about data usage for each system.',
        category: 'General'
      },
      {
        id: 'privacy-1',
        question: 'How is my personal data protected?',
        answer: 'We implement strong data protection measures including encryption, access controls, and regular security audits. Personal data is processed in accordance with GDPR and other applicable regulations.',
        category: 'Privacy & Data Protection'
      },
      {
        id: 'privacy-2',
        question: 'Can I opt out of AI processing?',
        answer: 'Yes, you have the right to opt out of AI processing. We provide clear opt-out mechanisms and respect your choices regarding AI interactions.',
        category: 'Privacy & Data Protection'
      },
      {
        id: 'compliance-1',
        question: 'Are you compliant with the EU AI Act?',
        answer: 'Yes, we are fully compliant with the EU AI Act requirements. Our compliance program covers risk assessment, quality management, transparency, and human oversight.',
        category: 'Compliance'
      },
      {
        id: 'compliance-2',
        question: 'What certifications do you have?',
        answer: 'We maintain multiple certifications including ISO 27001 for information security, SOC 2 Type II for operational security, and GDPR compliance certification.',
        category: 'Compliance'
      },
      {
        id: 'technical-1',
        question: 'How accurate are your AI models?',
        answer: 'Our AI models undergo extensive testing and validation. We publish performance metrics and continuously monitor accuracy in production environments.',
        category: 'Technical'
      },
      {
        id: 'technical-2',
        question: 'How do you handle AI bias?',
        answer: 'We implement comprehensive bias detection and mitigation strategies including diverse training data, fairness testing, and ongoing monitoring.',
        category: 'Technical'
      }
    ]
  });

  // Auto-populated data from the platform (would come from actual governance modules)
  const platformData = {
    trustScore: 4.8,
    complianceScore: 89,
    aiSystemsCount: 15,
    certificationsCount: 6,
    lastUpdated: '2024-12-15',
    monthlyVisitors: 2847,
    
    // From AI Inventory Module
    aiSystems: [
      {
        name: 'Customer Support Assistant',
        purpose: 'Automated customer inquiry handling and routing',
        riskCategory: 'Limited Risk',
        status: 'Active',
        dataTypes: 'Customer communications, support history',
        safeguards: 'Human oversight, bias monitoring, privacy controls'
      },
      {
        name: 'Document Analysis System', 
        purpose: 'Automated document processing and categorization',
        riskCategory: 'Minimal Risk',
        status: 'Active',
        dataTypes: 'Business documents, metadata',
        safeguards: 'Access controls, audit logging, data minimization'
      },
      {
        name: 'Fraud Detection Engine',
        purpose: 'Real-time transaction fraud detection',
        riskCategory: 'High Risk',
        status: 'Active',
        dataTypes: 'Transaction data, user behavior patterns',
        safeguards: 'Human oversight, explainable decisions, audit trails'
      }
    ],
    
    // From Compliance Modules
    compliance: [
      {
        framework: 'EU AI Act',
        status: 'Compliant',
        score: 89,
        lastAudit: 'December 2024',
        description: 'Comprehensive compliance with EU AI Act requirements for high-risk AI systems'
      },
      {
        framework: 'GDPR',
        status: 'Certified',
        score: 95,
        lastAudit: 'November 2024',
        description: 'GDPR compliance with specific focus on AI data processing'
      },
      {
        framework: 'ISO 27001',
        status: 'Certified',
        score: 92,
        lastAudit: 'October 2024',
        description: 'International standard for information security management'
      }
    ],
    
    // From Threat Modeling
    securityMetrics: {
      owasp_coverage: '100%',
      vulnerabilities_resolved: '98%',
      incident_response_time: '< 2 hours'
    }
  };

  const handlePublish = () => {
    setIsPublished(!isPublished);
    if (!isPublished) {
      console.log('Publishing trust center...');
    }
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(`https://${trustCenterConfig.customDomain}`);
  };

  const renderManagementView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2>Trust Center Management</h2>
          <p className="text-muted-foreground">
            Create and customize your public-facing Trust Center powered by your AI governance data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Published</span>
            <Switch checked={isPublished} onCheckedChange={handlePublish} />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setActiveView('preview')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button 
            onClick={() => setActiveView('preview')}
            disabled={!isPublished}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Site
          </Button>
        </div>
      </div>

      {/* Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe className={`w-4 h-4 ${isPublished ? 'text-green-600' : 'text-orange-600'}`} />
              <span className="text-sm font-medium">Status</span>
            </div>
            <div className={`text-2xl font-bold ${isPublished ? 'text-green-600' : 'text-orange-600'}`}>
              {isPublished ? 'Live' : 'Draft'}
            </div>
            {isPublished && (
              <div className="flex items-center gap-1 mt-2">
                <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={handleCopyURL}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy URL
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Monthly Visitors</span>
            </div>
            <div>{platformData.monthlyVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Auto-Updated</span>
            </div>
            <div>{new Date(platformData.lastUpdated).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Trust Score</span>
            </div>
            <div>{platformData.trustScore}/5</div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="data">Live Data</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic information displayed on your Trust Center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company Name</label>
                  <Input 
                    value={trustCenterConfig.companyName}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, companyName: e.target.value})}
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input 
                    value={trustCenterConfig.tagline}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, tagline: e.target.value})}
                    placeholder="Building trustworthy AI systems"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Website</label>
                  <Input 
                    value={trustCenterConfig.website}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, website: e.target.value})}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Custom Domain</label>
                  <Input 
                    value={trustCenterConfig.customDomain}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, customDomain: e.target.value})}
                    placeholder="trust.yourcompany.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea 
                  value={trustCenterConfig.description}
                  onChange={(e) => setTrustCenterConfig({...trustCenterConfig, description: e.target.value})}
                  placeholder="Brief description of your company and AI governance approach..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Contact Email</label>
                  <Input 
                    value={trustCenterConfig.email}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, email: e.target.value})}
                    placeholder="trust@yourcompany.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input 
                    value={trustCenterConfig.phone}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Address</label>
                  <Input 
                    value={trustCenterConfig.address}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, address: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Customization</CardTitle>
              <CardDescription>Customize the look and feel of your Trust Center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Theme</label>
                  <Select value={trustCenterConfig.theme} onValueChange={(value) => setTrustCenterConfig({...trustCenterConfig, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Color</label>
                  <Input 
                    type="color"
                    value={trustCenterConfig.primaryColor}
                    onChange={(e) => setTrustCenterConfig({...trustCenterConfig, primaryColor: e.target.value})}
                    className="w-full h-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={trustCenterConfig.showBranding} 
                  onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showBranding: checked})}
                />
                <label className="text-sm font-medium">Show "Powered by PLCY" branding</label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Sections</CardTitle>
              <CardDescription>Choose which sections to display on your Trust Center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showCompliance} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showCompliance: checked})}
                    />
                    <label className="text-sm font-medium">Compliance Status</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showAISystems} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showAISystems: checked})}
                    />
                    <label className="text-sm font-medium">AI Systems</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showSecurity} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showSecurity: checked})}
                    />
                    <label className="text-sm font-medium">Security & Infrastructure</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showDocumentation} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showDocumentation: checked})}
                    />
                    <label className="text-sm font-medium">Documentation</label>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showPrivacy} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showPrivacy: checked})}
                    />
                    <label className="text-sm font-medium">Privacy & Data Protection</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showMetrics} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showMetrics: checked})}
                    />
                    <label className="text-sm font-medium">Trust Metrics</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showCertificates} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showCertificates: checked})}
                    />
                    <label className="text-sm font-medium">Certificates & Downloads</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trustCenterConfig.showFAQ} 
                      onCheckedChange={(checked) => setTrustCenterConfig({...trustCenterConfig, showFAQ: checked})}
                    />
                    <label className="text-sm font-medium">FAQ</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Documentation Content
              </CardTitle>
              <CardDescription>Manage documentation sections for your Trust Center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {trustCenterConfig.documentationSections.map((section, sectionIndex) => (
                <div key={section.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">{section.title}</h4>
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Section Description</label>
                      <Textarea 
                        value={section.content}
                        onChange={(e) => {
                          const newSections = [...trustCenterConfig.documentationSections];
                          newSections[sectionIndex].content = e.target.value;
                          setTrustCenterConfig({...trustCenterConfig, documentationSections: newSections});
                        }}
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Documentation Items</label>
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-muted p-3 rounded">
                            <Input 
                              value={item.title}
                              onChange={(e) => {
                                const newSections = [...trustCenterConfig.documentationSections];
                                newSections[sectionIndex].items[itemIndex].title = e.target.value;
                                setTrustCenterConfig({...trustCenterConfig, documentationSections: newSections});
                              }}
                              placeholder="Item title"
                              className="mb-2"
                            />
                            <Textarea 
                              value={item.content}
                              onChange={(e) => {
                                const newSections = [...trustCenterConfig.documentationSections];
                                newSections[sectionIndex].items[itemIndex].content = e.target.value;
                                setTrustCenterConfig({...trustCenterConfig, documentationSections: newSections});
                              }}
                              placeholder="Item content"
                              rows={3}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Documentation Section
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQ Content
              </CardTitle>
              <CardDescription>Manage frequently asked questions for your Trust Center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['General', 'Privacy & Data Protection', 'Compliance', 'Technical'].map((category) => (
                  <div key={category} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{category}</h4>
                    <div className="space-y-3">
                      {trustCenterConfig.faqItems
                        .filter(item => item.category === category)
                        .map((item, index) => (
                          <div key={item.id} className="bg-muted p-3 rounded">
                            <Input 
                              value={item.question}
                              onChange={(e) => {
                                const newItems = [...trustCenterConfig.faqItems];
                                const globalIndex = newItems.findIndex(faq => faq.id === item.id);
                                newItems[globalIndex].question = e.target.value;
                                setTrustCenterConfig({...trustCenterConfig, faqItems: newItems});
                              }}
                              placeholder="Question"
                              className="mb-2"
                            />
                            <Textarea 
                              value={item.answer}
                              onChange={(e) => {
                                const newItems = [...trustCenterConfig.faqItems];
                                const globalIndex = newItems.findIndex(faq => faq.id === item.id);
                                newItems[globalIndex].answer = e.target.value;
                                setTrustCenterConfig({...trustCenterConfig, faqItems: newItems});
                              }}
                              placeholder="Answer"
                              rows={3}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add FAQ Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Data Integration</CardTitle>
              <CardDescription>Data automatically synced from your PLCY platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Compliance Data</h4>
                  <div className="space-y-2">
                    {platformData.compliance.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{item.framework}</span>
                        <Badge variant="secondary">{item.score}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">AI Systems</h4>
                  <div className="space-y-2">
                    {platformData.aiSystems.map((system, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{system.name}</span>
                        <Badge variant="outline">{system.riskCategory}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Security Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">OWASP Coverage</span>
                      <Badge variant="secondary">{platformData.securityMetrics.owasp_coverage}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Vulnerabilities Resolved</span>
                      <Badge variant="secondary">{platformData.securityMetrics.vulnerabilities_resolved}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Response Time</span>
                      <Badge variant="secondary">{platformData.securityMetrics.incident_response_time}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Auto-Sync Enabled</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your Trust Center automatically updates with the latest data from your AI governance activities. 
                  Last sync: {new Date(platformData.lastUpdated).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Custom CSS</label>
                <Textarea 
                  placeholder="/* Add custom CSS here */"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">SEO Meta Description</label>
                <Textarea 
                  placeholder="Description for search engines..."
                  rows={2}
                />
              </div>
              <div>
                <h4 className="font-medium mb-3">API Access</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">Trust Center API</span>
                      <p className="text-sm text-muted-foreground">Access Trust Center data programmatically</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Generate Key
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderPreviewView = () => (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Trust Center Preview</h2>
          <p className="text-muted-foreground">Preview how your Trust Center will appear to visitors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveView('manage')}>
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Settings
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <Card>
        <CardContent className="p-0">
          <div className="bg-gray-100 p-4 rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="ml-4 flex-1 bg-white rounded px-3 py-1 text-sm text-muted-foreground">
                https://{trustCenterConfig.customDomain}
              </div>
            </div>
          </div>
          
          {/* Simulated Trust Center Preview */}
          <div className="p-8 bg-white min-h-[600px]">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl mb-8">
                <h1>{trustCenterConfig.companyName} Trust Center</h1>
                <p className="text-lg text-muted-foreground mb-6">{trustCenterConfig.description}</p>
                <div className="text-sm text-muted-foreground">{trustCenterConfig.tagline}</div>
              </div>

              {/* Navigation Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className={`grid w-full ${
                  trustCenterConfig.showDocumentation && trustCenterConfig.showFAQ ? 'grid-cols-5' :
                  (trustCenterConfig.showDocumentation || trustCenterConfig.showFAQ) ? 'grid-cols-4' :
                  'grid-cols-3'
                }`}>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="ai-systems">AI Systems</TabsTrigger>
                  {trustCenterConfig.showDocumentation && (
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  )}
                  {trustCenterConfig.showFAQ && (
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Metrics */}
                  {trustCenterConfig.showMetrics && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center p-4 border rounded-lg">
                        <div>{platformData.aiSystemsCount}</div>
                        <div className="text-sm text-muted-foreground">AI Systems</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div>{platformData.complianceScore}%</div>
                        <div className="text-sm text-muted-foreground">Compliance Score</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div>{platformData.certificationsCount}</div>
                        <div className="text-sm text-muted-foreground">Certifications</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div>{platformData.trustScore}/5</div>
                        <div className="text-sm text-muted-foreground">Trust Score</div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="compliance" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Compliance Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {platformData.compliance.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{item.framework}</span>
                              <Badge variant="secondary">{item.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">{item.description}</div>
                            <div className="flex items-center gap-2">
                              <Progress value={item.score} className="flex-1" />
                              <span className="text-sm font-medium">{item.score}%</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai-systems" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Systems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {platformData.aiSystems.map((system, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{system.name}</h4>
                              <Badge variant={
                                system.riskCategory === 'High Risk' ? 'destructive' :
                                system.riskCategory === 'Limited Risk' ? 'secondary' : 'outline'
                              }>
                                {system.riskCategory}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{system.purpose}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {trustCenterConfig.showDocumentation && (
                  <TabsContent value="documentation" className="space-y-6">
                    <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-8">
                      <h3>Documentation Center</h3>
                      <p className="text-muted-foreground mb-4">Comprehensive guides and resources for AI governance</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {trustCenterConfig.documentationSections.map((section) => (
                        <Card key={section.id} className="h-full">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-primary" />
                              </div>
                              {section.title}
                            </CardTitle>
                            <CardDescription>{section.content}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {section.items.map((item, index) => (
                                <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                                  <h4 className="font-medium mb-2 text-sm">{item.title}</h4>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{item.content}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {trustCenterConfig.showFAQ && (
                  <TabsContent value="faq" className="space-y-6">
                    <div className="text-center py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-8">
                      <h3>Frequently Asked Questions</h3>
                      <p className="text-muted-foreground mb-4">Find answers to common questions about AI governance</p>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Search FAQs..." 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {['General', 'Privacy & Data Protection', 'Compliance', 'Technical'].map((category) => (
                        <div key={category} className="space-y-3">
                          <h3 className="font-medium text-lg border-b pb-2 flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                              <HelpCircle className="w-3 h-3 text-primary" />
                            </div>
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {trustCenterConfig.faqItems
                              .filter(item => item.category === category)
                              .map((item) => (
                                <Card key={item.id} className="cursor-pointer hover:shadow-md transition-all">
                                  <CardContent className="p-4">
                                    <div 
                                      className="flex items-center justify-between"
                                      onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <h4 className="font-medium">{item.question}</h4>
                                      </div>
                                      {expandedFAQ === item.id ? (
                                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                    {expandedFAQ === item.id && (
                                      <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-2">Contact</h4>
                    <p className="text-sm text-muted-foreground">{trustCenterConfig.email}</p>
                    <p className="text-sm text-muted-foreground">{trustCenterConfig.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">{trustCenterConfig.address}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">{new Date(platformData.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                {trustCenterConfig.showBranding && (
                  <p className="text-xs text-muted-foreground">Powered by PLCY</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main render logic
  switch (activeView) {
    case 'preview':
      return renderPreviewView();
    case 'manage':
    default:
      return renderManagementView();
  }
}