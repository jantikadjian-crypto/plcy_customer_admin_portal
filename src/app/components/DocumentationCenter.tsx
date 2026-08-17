import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Shield, 
  Lock, 
  Users, 
  Database, 
  Server, 
  Globe, 
  CheckCircle, 
  Search,
  ExternalLink,
  Download,
  BookOpen,
  PlayCircle,
  Code,
  Settings,
  AlertTriangle,
  Eye,
  Zap,
  BarChart3,
  Award,
  Target,
  Laptop,
  UserCheck,
  Key,
  FileCheck,
  Briefcase,
  Star
} from 'lucide-react';

export function DocumentationCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documentationCategories = [
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Comprehensive reporting and analytics documentation',
      items: [
        { title: 'EU AI Act Compliance Report', status: 'available', type: 'PDF' },
        { title: 'Risk Assessment Dashboard', status: 'available', type: 'Guide' },
        { title: 'Threat Modeling Report', status: 'available', type: 'PDF' },
        { title: 'OWASP Vulnerability Scan', status: 'available', type: 'Report' },
        { title: 'Compliance Scorecard', status: 'available', type: 'Interactive' }
      ]
    },
    {
      id: 'access-control',
      title: 'Access Control',
      icon: Lock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'User access and permission management',
      items: [
        { title: 'Role-Based Access Control', status: 'available', type: 'Guide' },
        { title: 'Multi-Factor Authentication', status: 'available', type: 'Setup' },
        { title: 'API Access Management', status: 'available', type: 'Guide' },
        { title: 'Session Management', status: 'available', type: 'Config' },
        { title: 'Audit Logging', status: 'available', type: 'Guide' }
      ]
    },
    {
      id: 'app-security',
      title: 'App Security',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Application security and development lifecycle',
      items: [
        { title: 'Secure Development Guidelines', status: 'available', type: 'Guide' },
        { title: 'Code Review Checklist', status: 'available', type: 'Checklist' },
        { title: 'Vulnerability Management', status: 'available', type: 'Process' },
        { title: 'Security Testing Framework', status: 'available', type: 'Framework' },
        { title: 'Incident Response Plan', status: 'available', type: 'Playbook' }
      ]
    },
    {
      id: 'data-privacy',
      title: 'Data Privacy',
      icon: Eye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Privacy protection and data governance',
      items: [
        { title: 'GDPR Compliance Guide', status: 'available', type: 'Guide' },
        { title: 'Data Retention Policies', status: 'available', type: 'Policy' },
        { title: 'Privacy Impact Assessment', status: 'available', type: 'Template' },
        { title: 'Consent Management', status: 'available', type: 'Guide' },
        { title: 'Data Subject Rights', status: 'available', type: 'Process' }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Data protection and encryption standards',
      items: [
        { title: 'Encryption Standards', status: 'available', type: 'Standard' },
        { title: 'Data Classification', status: 'available', type: 'Framework' },
        { title: 'Backup & Recovery', status: 'available', type: 'Process' },
        { title: 'Data Loss Prevention', status: 'available', type: 'Guide' },
        { title: 'Storage Security', status: 'available', type: 'Best Practices' }
      ]
    },
    {
      id: 'endpoint-security',
      title: 'Endpoint Security',
      icon: Laptop,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Device and endpoint protection measures',
      items: [
        { title: 'Device Management Policy', status: 'available', type: 'Policy' },
        { title: 'Endpoint Detection & Response', status: 'available', type: 'Guide' },
        { title: 'Mobile Device Security', status: 'available', type: 'Standard' },
        { title: 'Remote Access Security', status: 'available', type: 'Guide' },
        { title: 'Endpoint Compliance', status: 'available', type: 'Checklist' }
      ]
    },
    {
      id: 'product-security',
      title: 'Product Security',
      icon: Briefcase,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Product security lifecycle and standards',
      items: [
        { title: 'Security by Design', status: 'available', type: 'Framework' },
        { title: 'Threat Modeling Process', status: 'available', type: 'Process' },
        { title: 'Security Requirements', status: 'available', type: 'Template' },
        { title: 'Penetration Testing', status: 'available', type: 'Guide' },
        { title: 'Security Architecture', status: 'available', type: 'Standard' }
      ]
    },
    {
      id: 'self-assessments',
      title: 'Self-Assessments',
      icon: FileCheck,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Self-assessment tools and frameworks',
      items: [
        { title: 'AI Governance Maturity Assessment', status: 'available', type: 'Assessment' },
        { title: 'Compliance Readiness Check', status: 'available', type: 'Checklist' },
        { title: 'Risk Assessment Template', status: 'available', type: 'Template' },
        { title: 'Security Posture Review', status: 'available', type: 'Framework' },
        { title: 'Gap Analysis Tool', status: 'available', type: 'Tool' }
      ]
    },
    {
      id: 'security-grades',
      title: 'Security Grades',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Security scoring and grading system',
      items: [
        { title: 'Security Score Methodology', status: 'available', type: 'Guide' },
        { title: 'Compliance Grade Calculator', status: 'available', type: 'Tool' },
        { title: 'Industry Benchmarking', status: 'available', type: 'Report' },
        { title: 'Continuous Monitoring', status: 'available', type: 'Process' },
        { title: 'Improvement Roadmap', status: 'available', type: 'Template' }
      ]
    }
  ];

  const quickStartGuides = [
    {
      title: 'Getting Started with AI Governance',
      description: 'Complete guide to setting up your AI governance framework',
      duration: '10 min read',
      type: 'guide',
      category: 'Getting Started'
    },
    {
      title: 'EU AI Act Compliance Checklist',
      description: 'Step-by-step checklist for EU AI Act compliance',
      duration: '15 min read',
      type: 'checklist',
      category: 'Compliance'
    },
    {
      title: 'Setting Up Your First AI System',
      description: 'Tutorial for adding and configuring AI systems',
      duration: '8 min read',
      type: 'tutorial',
      category: 'Setup'
    },
    {
      title: 'API Integration Guide',
      description: 'How to integrate with external systems and APIs',
      duration: '20 min read',
      type: 'integration',
      category: 'Development'
    }
  ];

  const filteredCategories = documentationCategories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl">
        <h1 className="text-3xl font-bold mb-4">Documentation Center</h1>
        <p className="text-lg text-slate-200 mb-6 max-w-3xl mx-auto">
          Comprehensive guides, tutorials, and resources for AI governance implementation
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Browse All Docs
          </Button>
          <Button variant="outline" size="lg" className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
            <Download className="w-4 h-4" />
            Download PDF Guide
          </Button>
        </div>
      </div>

      {/* Search and Navigation */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <Button 
            variant={selectedCategory === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Button>
          {documentationCategories.slice(0, 6).map(category => (
            <Button 
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.title}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Documentation</TabsTrigger>
          <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          {/* Documentation Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="bg-slate-800 text-white border-slate-700 hover:bg-slate-750 transition-colors">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-white">{category.title}</CardTitle>
                    <p className="text-sm text-slate-300">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-slate-200">{item.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                    {category.items.length > 4 && (
                      <div className="pt-2 border-t border-slate-700">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-slate-300 hover:text-white p-0 h-auto"
                        >
                          View more ({category.items.length - 4} more items)
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="quick-start" className="space-y-6">
          <div className="grid gap-4">
            {quickStartGuides.map((guide, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold">{guide.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {guide.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{guide.duration}</span>
                        <span>•</span>
                        <span className="capitalize">{guide.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                API Reference
              </CardTitle>
              <p className="text-muted-foreground">
                Complete API documentation for integrating with PLCY
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-3">API keys, OAuth, and authentication methods</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-3 h-3" />
                    View Docs
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">AI Systems API</h4>
                  <p className="text-sm text-muted-foreground mb-3">Manage AI systems, models, and configurations</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-3 h-3" />
                    View Docs
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Compliance API</h4>
                  <p className="text-sm text-muted-foreground mb-3">Access compliance data and reports</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-3 h-3" />
                    View Docs
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Webhooks</h4>
                  <p className="text-sm text-muted-foreground mb-3">Real-time notifications and events</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-3 h-3" />
                    View Docs
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium mb-2">API Status</h4>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">All systems operational</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>API Version: v1.2.3</span>
                  <span>•</span>
                  <span>99.9% uptime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help & Support */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6 text-center">
          <h3 className="font-semibold mb-2">Need Additional Help?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="gap-2">
              <Users className="w-4 h-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="gap-2">
              <PlayCircle className="w-4 h-4" />
              Video Tutorials
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Community Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}