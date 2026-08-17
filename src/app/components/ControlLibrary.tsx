import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText,
  ExternalLink,
  Settings
} from 'lucide-react';

export function ControlLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('all');

  const frameworks = [
    { id: 'eu-ai-act', name: 'EU AI Act', articles: 24 },
    { id: 'nist-ai-rmf', name: 'NIST AI RMF', functions: 4 },
    { id: 'iso-42001', name: 'ISO/IEC 42001', clauses: 31 },
    { id: 'gdpr-ai', name: 'GDPR (AI-specific)', articles: 12 },
  ];

  const controls = [
    {
      id: 'CB-ROUTE-001',
      title: 'Cross-Border Data Routing',
      description: 'Ensure data processing occurs within approved jurisdictions',
      status: 'active',
      riskLevel: 'high',
      mappings: [
        { framework: 'EU AI Act', reference: 'Article 25 (GPAI models)' },
        { framework: 'GDPR', reference: 'Article 44-49 (International transfers)' },
        { framework: 'NIST AI RMF', reference: 'GOVERN-2.1' }
      ],
      enforcement: ['Prompt Proxy', 'Region Router', 'TEE Attestation'],
      testFrequency: 'Continuous',
      owner: 'Privacy Team',
      lastTested: '2 hours ago'
    },
    {
      id: 'PII-REDACT-002',
      title: 'PII Redaction in Prompts',
      description: 'Automatically detect and redact personal information before LLM processing',
      status: 'active',
      riskLevel: 'high',
      mappings: [
        { framework: 'EU AI Act', reference: 'Article 10 (Data governance)' },
        { framework: 'GDPR', reference: 'Article 5 (Data minimization)' },
        { framework: 'ISO/IEC 42001', reference: '8.5 (Data management)' }
      ],
      enforcement: ['Content Filter', 'Tokenization', 'Audit Logging'],
      testFrequency: 'Daily',
      owner: 'Security Team',
      lastTested: '6 hours ago'
    },
    {
      id: 'BIAS-EVAL-003',
      title: 'Bias Evaluation & Monitoring',
      description: 'Regular assessment of AI systems for fairness and bias',
      status: 'warning',
      riskLevel: 'medium',
      mappings: [
        { framework: 'EU AI Act', reference: 'Article 13 (Transparency)' },
        { framework: 'NIST AI RMF', reference: 'MEASURE-2.3' },
        { framework: 'ISO/IEC 42001', reference: '9.1 (Performance evaluation)' }
      ],
      enforcement: ['Automated Testing', 'Model Cards', 'Reporting'],
      testFrequency: 'Monthly',
      owner: 'AI Ethics Committee',
      lastTested: '15 days ago'
    },
    {
      id: 'MODEL-DOC-004',
      title: 'Model Documentation & Cards',
      description: 'Comprehensive documentation of AI models and their capabilities',
      status: 'active',
      riskLevel: 'low',
      mappings: [
        { framework: 'EU AI Act', reference: 'Article 11 (Technical documentation)' },
        { framework: 'NIST AI RMF', reference: 'GOVERN-4.1' },
        { framework: 'ISO/IEC 42001', reference: '7.5 (Documented information)' }
      ],
      enforcement: ['Documentation Portal', 'Version Control', 'Review Process'],
      testFrequency: 'Quarterly',
      owner: 'AI Product Team',
      lastTested: '30 days ago'
    },
    {
      id: 'INCIDENT-RESP-005',
      title: 'AI Incident Response',
      description: 'Procedures for handling AI-related security and compliance incidents',
      status: 'needs-update',
      riskLevel: 'medium',
      mappings: [
        { framework: 'EU AI Act', reference: 'Article 62 (Reporting obligations)' },
        { framework: 'NIST AI RMF', reference: 'MANAGE-4.1' },
        { framework: 'ISO/IEC 42001', reference: '10.1 (Incident management)' }
      ],
      enforcement: ['Playbooks', 'Alert System', 'Escalation Matrix'],
      testFrequency: 'Bi-annual',
      owner: 'Security Operations',
      lastTested: '90 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'warning': return 'secondary';
      case 'needs-update': return 'destructive';
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

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = selectedFramework === 'all' || 
                           control.mappings.some(mapping => 
                             mapping.framework.toLowerCase().includes(selectedFramework.replace('-', ' '))
                           );
    return matchesSearch && matchesFramework;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Control Library</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive controls mapped to global AI governance frameworks
          </p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Configure Controls
        </Button>
      </div>

      {/* Framework Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map((framework) => (
          <Card key={framework.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{framework.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {framework.articles || framework.functions || framework.clauses}
              </div>
              <p className="text-xs text-muted-foreground">
                {framework.articles ? 'Articles' : framework.functions ? 'Functions' : 'Clauses'} mapped
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search controls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                <SelectItem value="eu-ai">EU AI Act</SelectItem>
                <SelectItem value="nist">NIST AI RMF</SelectItem>
                <SelectItem value="iso">ISO/IEC 42001</SelectItem>
                <SelectItem value="gdpr">GDPR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Controls List */}
      <div className="space-y-4">
        {filteredControls.map((control) => (
          <Card key={control.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-base">{control.title}</CardTitle>
                    <Badge variant={getStatusColor(control.status)}>
                      {control.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant={getRiskColor(control.riskLevel)}>
                      {control.riskLevel} risk
                    </Badge>
                  </div>
                  <CardDescription>{control.description}</CardDescription>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>ID: {control.id}</span>
                    <span>Owner: {control.owner}</span>
                    <span>Test Frequency: {control.testFrequency}</span>
                    <span>Last Tested: {control.lastTested}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mappings" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mappings">Framework Mappings</TabsTrigger>
                  <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                </TabsList>
                
                <TabsContent value="mappings" className="mt-4">
                  <div className="space-y-2">
                    {control.mappings.map((mapping, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-accent rounded">
                        <div>
                          <span className="font-medium text-sm">{mapping.framework}</span>
                          <p className="text-xs text-muted-foreground">{mapping.reference}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="enforcement" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {control.enforcement.map((method, index) => (
                      <Badge key={index} variant="outline">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Control test passed
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Audit evidence generated
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Next review scheduled
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredControls.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No controls found matching your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}