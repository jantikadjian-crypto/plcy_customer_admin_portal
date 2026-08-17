import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  FlaskConical,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Calendar,
  Download,
  FileDown,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Shield,
  FileText,
  Zap,
  Database,
  Lock,
  Code,
  Eye,
  Network,
  Brain,
  ChevronDown,
  ChevronRight,
  Info,
  Terminal
} from 'lucide-react';

interface AutomatedTestResult {
  id: string;
  testName: string;
  category: string;
  status: 'passed' | 'failed' | 'warning';
  timestamp: string;
  duration: string;
  findingsCount: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  complianceMapping: string[];
}

interface TestFinding {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  affectedEndpoint: string;
  recommendation: string;
  cvssScore?: number;
}

export function AutomatedOWASPTesting() {
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [selectedTests, setSelectedTests] = useState<string[]>([
    'prompt-injection',
    'data-poisoning',
    'excessive-agency'
  ]);
  const [testSchedule, setTestSchedule] = useState('weekly');
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<AutomatedTestResult[]>([
    {
      id: '1',
      testName: 'Prompt Injection Vulnerability Scanner',
      category: 'Input Manipulation',
      status: 'warning',
      timestamp: '2024-12-09 14:32 UTC',
      duration: '14m 23s',
      findingsCount: 3,
      severity: 'high',
      complianceMapping: ['ISO 42001 §7.3.2', 'EU AI Act Art. 15']
    },
    {
      id: '2',
      testName: 'Data & Model Poisoning Detection',
      category: 'Data Integrity',
      status: 'passed',
      timestamp: '2024-12-09 14:18 UTC',
      duration: '23m 12s',
      findingsCount: 0,
      severity: 'low',
      complianceMapping: ['ISO 42001 §6.2.4', 'EU AI Act Art. 10']
    },
    {
      id: '3',
      testName: 'Excessive Agency & Permissions Audit',
      category: 'Access Control',
      status: 'failed',
      timestamp: '2024-12-09 14:05 UTC',
      duration: '11m 45s',
      findingsCount: 7,
      severity: 'critical',
      complianceMapping: ['ISO 42001 §8.1.1', 'EU AI Act Art. 14']
    },
    {
      id: '4',
      testName: 'Sensitive Information Disclosure Scanner',
      category: 'Data Privacy',
      status: 'warning',
      timestamp: '2024-12-09 13:42 UTC',
      duration: '19m 08s',
      findingsCount: 2,
      severity: 'medium',
      complianceMapping: ['ISO 42001 §7.2.3', 'EU AI Act Art. 9', 'GDPR Art. 32']
    },
    {
      id: '5',
      testName: 'Supply Chain Security Validation',
      category: 'Supply Chain',
      status: 'passed',
      timestamp: '2024-12-09 13:18 UTC',
      duration: '17m 34s',
      findingsCount: 0,
      severity: 'low',
      complianceMapping: ['ISO 42001 §8.3.2', 'EU AI Act Art. 13']
    }
  ]);

  // Detailed findings for each test result
  const testFindings: Record<string, TestFinding[]> = {
    '1': [
      {
        id: '1-1',
        title: 'Direct Prompt Injection via User Input',
        severity: 'high',
        description: 'The system accepts user input without proper sanitization, allowing attackers to inject malicious prompts that can override system instructions.',
        affectedEndpoint: '/api/chat/completions',
        recommendation: 'Implement input validation and filtering. Use structured prompts with clear delimiters between system instructions and user input.',
        cvssScore: 7.8
      },
      {
        id: '1-2',
        title: 'Indirect Prompt Injection via External Content',
        severity: 'high',
        description: 'The LLM processes external content (URLs, documents) without validation, allowing attackers to embed malicious instructions in external resources.',
        affectedEndpoint: '/api/document/process',
        recommendation: 'Sanitize and validate all external content before processing. Implement content origin verification.',
        cvssScore: 7.2
      },
      {
        id: '1-3',
        title: 'Insufficient System Prompt Protection',
        severity: 'medium',
        description: 'System prompts can be exposed through carefully crafted user queries, revealing internal logic and constraints.',
        affectedEndpoint: '/api/chat/completions',
        recommendation: 'Use encryption for system prompts and implement output filtering to prevent exposure.',
        cvssScore: 5.4
      }
    ],
    '3': [
      {
        id: '3-1',
        title: 'Unrestricted File System Access',
        severity: 'critical',
        description: 'The AI agent has full read/write access to the file system without proper permission boundaries or approval workflows.',
        affectedEndpoint: '/api/agent/file-operations',
        recommendation: 'Implement strict file system permissions with allowlist-based access. Require human approval for sensitive operations.',
        cvssScore: 9.3
      },
      {
        id: '3-2',
        title: 'Unvalidated API Calls to External Services',
        severity: 'critical',
        description: 'Agent can make arbitrary API calls to external services without validation or rate limiting.',
        affectedEndpoint: '/api/agent/external-call',
        recommendation: 'Implement API allowlisting, request validation, and rate limiting. Log all external API calls.',
        cvssScore: 8.9
      },
      {
        id: '3-3',
        title: 'Missing Human-in-the-Loop for High-Impact Actions',
        severity: 'critical',
        description: 'High-impact actions (data deletion, financial transactions) can be executed without human approval.',
        affectedEndpoint: '/api/agent/execute',
        recommendation: 'Implement HITL workflows for all high-impact actions. Define clear thresholds for automation vs. approval.',
        cvssScore: 9.1
      },
      {
        id: '3-4',
        title: 'Overly Broad Tool Access Permissions',
        severity: 'high',
        description: 'Agent has access to all available tools without role-based restrictions or contextual limitations.',
        affectedEndpoint: '/api/agent/tools',
        recommendation: 'Implement role-based access control for tools. Limit tool access based on agent context and user permissions.',
        cvssScore: 7.6
      },
      {
        id: '3-5',
        title: 'No Audit Trail for Agent Actions',
        severity: 'high',
        description: 'Agent actions are not logged comprehensively, making it difficult to audit or rollback problematic operations.',
        affectedEndpoint: 'Global',
        recommendation: 'Implement comprehensive logging for all agent actions with tamper-proof audit trails.',
        cvssScore: 7.4
      },
      {
        id: '3-6',
        title: 'Insufficient Resource Quotas',
        severity: 'high',
        description: 'No limits on agent resource consumption (API calls, tokens, execution time), enabling potential abuse.',
        affectedEndpoint: '/api/agent/execute',
        recommendation: 'Implement per-user and per-agent resource quotas. Monitor and alert on abnormal consumption patterns.',
        cvssScore: 7.1
      },
      {
        id: '3-7',
        title: 'Weak Agent Authentication',
        severity: 'medium',
        description: 'Agent authentication relies solely on API keys without additional verification mechanisms.',
        affectedEndpoint: '/api/agent/auth',
        recommendation: 'Implement multi-factor authentication for agent access. Use cryptographic signatures for agent identity verification.',
        cvssScore: 6.2
      }
    ],
    '4': [
      {
        id: '4-1',
        title: 'PII Leakage in Training Data Outputs',
        severity: 'medium',
        description: 'The model occasionally outputs personally identifiable information that appears to be from training data.',
        affectedEndpoint: '/api/chat/completions',
        recommendation: 'Implement output filtering for PII patterns. Review and sanitize training data. Use differential privacy techniques.',
        cvssScore: 6.8
      },
      {
        id: '4-2',
        title: 'Credentials Exposure in Error Messages',
        severity: 'medium',
        description: 'Error messages and debug logs may contain API keys, database credentials, or internal system information.',
        affectedEndpoint: '/api/error-handler',
        recommendation: 'Sanitize all error messages and logs. Implement separate debug modes with restricted access.',
        cvssScore: 6.3
      }
    ]
  };

  const availableTests = [
    {
      id: 'prompt-injection',
      name: 'Prompt Injection Vulnerability Scanner',
      category: 'Input Manipulation',
      description: 'Tests for direct and indirect prompt injection vulnerabilities',
      estimatedDuration: '~15 min',
      complianceMappings: ['ISO 42001 §7.3.2', 'EU AI Act Art. 15'],
      icon: Shield
    },
    {
      id: 'data-poisoning',
      name: 'Data & Model Poisoning Detection',
      category: 'Data Integrity',
      description: 'Scans for compromised training data and model backdoors',
      estimatedDuration: '~25 min',
      complianceMappings: ['ISO 42001 §6.2.4', 'EU AI Act Art. 10'],
      icon: Database
    },
    {
      id: 'excessive-agency',
      name: 'Excessive Agency & Permissions Audit',
      category: 'Access Control',
      description: 'Validates LLM permissions and autonomy boundaries',
      estimatedDuration: '~10 min',
      complianceMappings: ['ISO 42001 §8.1.1', 'EU AI Act Art. 14'],
      icon: Lock
    },
    {
      id: 'output-handling',
      name: 'Output Handling & Sanitization Test',
      category: 'Output Security',
      description: 'Tests output validation before downstream processing',
      estimatedDuration: '~12 min',
      complianceMappings: ['ISO 42001 §7.4.1'],
      icon: Code
    },
    {
      id: 'info-disclosure',
      name: 'Sensitive Information Disclosure Scanner',
      category: 'Data Privacy',
      description: 'Detects potential PII, credentials, and proprietary data leakage',
      estimatedDuration: '~20 min',
      complianceMappings: ['ISO 42001 §7.2.3', 'EU AI Act Art. 9', 'GDPR Art. 32'],
      icon: Eye
    },
    {
      id: 'supply-chain',
      name: 'Supply Chain Security Validation',
      category: 'Supply Chain',
      description: 'Scans dependencies, models, and third-party components',
      estimatedDuration: '~18 min',
      complianceMappings: ['ISO 42001 §8.3.2', 'EU AI Act Art. 13'],
      icon: Network
    },
    {
      id: 'vector-embedding',
      name: 'RAG & Vector Database Security Test',
      category: 'RAG Security',
      description: 'Tests embedding weaknesses and cross-context leaks',
      estimatedDuration: '~15 min',
      complianceMappings: ['ISO 42001 §7.3.4'],
      icon: Brain
    },
    {
      id: 'unbounded-consumption',
      name: 'Resource Consumption & DoS Protection',
      category: 'Resource Management',
      description: 'Tests rate limiting, quotas, and resource controls',
      estimatedDuration: '~8 min',
      complianceMappings: ['ISO 42001 §8.2.1'],
      icon: Zap
    }
  ];

  const handleRunTests = () => {
    setTestingInProgress(true);
    
    // Simulate test execution and add new results
    setTimeout(() => {
      const now = new Date();
      const newResults = selectedTests.map((testId, index) => {
        const test = availableTests.find(t => t.id === testId);
        if (!test) return null;
        
        const statuses: Array<'passed' | 'failed' | 'warning'> = ['passed', 'warning', 'warning', 'passed'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const findingsCount = randomStatus === 'passed' ? 0 : randomStatus === 'failed' ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 3) + 1;
        
        return {
          id: `new-${Date.now()}-${index}`,
          testName: test.name,
          category: test.category,
          status: randomStatus,
          timestamp: now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          duration: `${Math.floor(Math.random() * 20) + 5}m ${Math.floor(Math.random() * 60)}s`,
          findingsCount,
          severity: (randomStatus === 'failed' ? 'critical' : randomStatus === 'warning' ? 'medium' : 'low') as 'critical' | 'high' | 'medium' | 'low',
          complianceMapping: test.complianceMappings
        };
      }).filter(Boolean) as AutomatedTestResult[];
      
      setTestResults(prev => [...newResults, ...prev]);
      setTestingInProgress(false);
    }, 3000);
  };

  const handleToggleTest = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const passedTests = testResults.filter(t => t.status === 'passed').length;
  const failedTests = testResults.filter(t => t.status === 'failed').length;
  const warningTests = testResults.filter(t => t.status === 'warning').length;
  const totalFindings = testResults.reduce((sum, t) => sum + t.findingsCount, 0);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Alert className="bg-blue-50 border-blue-200">
        <FlaskConical className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-sm text-blue-900">
          <strong>Automated OWASP Testing:</strong> Run comprehensive security tests based on OWASP Top 10 for LLM Applications. 
          Results are automatically logged and mapped to ISO 42001 and EU AI Act compliance requirements for audit trails.
        </AlertDescription>
      </Alert>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Passed Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{passedTests}</div>
            <p className="text-xs text-muted-foreground">
              No vulnerabilities detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              Failed Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedTests}</div>
            <p className="text-xs text-muted-foreground">
              Critical issues found
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningTests}</div>
            <p className="text-xs text-muted-foreground">
              Moderate risk detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Total Findings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFindings}</div>
            <p className="text-xs text-muted-foreground">
              Across all tests
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Test Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Test Configuration
            </CardTitle>
            <CardDescription>
              Select tests to run and configure automated scheduling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Available Tests ({selectedTests.length} selected)</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTests(selectedTests.length === availableTests.length ? [] : availableTests.map(t => t.id))}
                >
                  {selectedTests.length === availableTests.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableTests.map((test) => {
                  const Icon = test.icon;
                  return (
                    <div 
                      key={test.id}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleToggleTest(test.id)}
                    >
                      <Checkbox 
                        checked={selectedTests.includes(test.id)}
                        onCheckedChange={() => handleToggleTest(test.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-1">
                          <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{test.name}</div>
                            <p className="text-xs text-muted-foreground mt-0.5">{test.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {test.estimatedDuration}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {test.category}
                          </Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {test.complianceMappings.map((mapping, idx) => (
                            <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              {mapping}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <label className="text-sm font-medium">Automated Schedule</label>
              <Select value={testSchedule} onValueChange={setTestSchedule}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily (Every 24 hours)</SelectItem>
                  <SelectItem value="weekly">Weekly (Every Monday)</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly (1st & 15th)</SelectItem>
                  <SelectItem value="monthly">Monthly (1st of month)</SelectItem>
                  <SelectItem value="manual">Manual only</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Tests will run automatically according to this schedule and results will be logged for compliance audits
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1"
                onClick={handleRunTests}
                disabled={testingInProgress || selectedTests.length === 0}
              >
                {testingInProgress ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Run Selected Tests
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results & Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Test Results
                </CardTitle>
                <CardDescription>
                  Click on a result to view detailed findings
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-3 h-3 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {testResults.map((result) => {
                const isExpanded = selectedResult === result.id;
                const findings = testFindings[result.id] || [];
                
                return (
                  <div 
                    key={result.id}
                    className="border rounded-lg transition-all"
                  >
                    <div 
                      className="p-3 hover:bg-accent/50 cursor-pointer"
                      onClick={() => setSelectedResult(isExpanded ? null : result.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            <span className="text-sm font-medium">{result.testName}</span>
                            <Badge className={`${getStatusColor(result.status)} text-xs`}>
                              {result.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
                            <Clock className="w-3 h-3" />
                            {result.timestamp}
                            <span>•</span>
                            <span>{result.duration}</span>
                          </div>
                        </div>
                        {result.findingsCount > 0 && (
                          <Badge className={`${getSeverityColor(result.severity)} text-xs`}>
                            {result.findingsCount} {result.findingsCount === 1 ? 'finding' : 'findings'}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2 ml-6">
                        {result.complianceMapping.map((mapping, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {mapping}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Detailed Findings */}
                    {isExpanded && findings.length > 0 && (
                      <div className="border-t bg-accent/20 p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Terminal className="w-4 h-4" />
                          <span className="text-sm font-medium">Detailed Findings</span>
                        </div>
                        {findings.map((finding) => (
                          <div key={finding.id} className="p-3 bg-background border rounded-lg space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">{finding.title}</span>
                                  <Badge className={`${getSeverityColor(finding.severity)} text-xs`}>
                                    {finding.severity}
                                  </Badge>
                                  {finding.cvssScore && (
                                    <Badge variant="outline" className="text-xs">
                                      CVSS: {finding.cvssScore}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{finding.description}</p>
                            <div className="pt-2 space-y-1">
                              <div className="flex items-start gap-2 text-xs">
                                <span className="font-medium text-muted-foreground">Affected:</span>
                                <code className="bg-muted px-1.5 py-0.5 rounded">{finding.affectedEndpoint}</code>
                              </div>
                              <div className="flex items-start gap-2 text-xs">
                                <Info className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-600" />
                                <span className="text-blue-900">{finding.recommendation}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isExpanded && findings.length === 0 && result.status === 'passed' && (
                      <div className="border-t bg-green-50 p-4">
                        <div className="flex items-center gap-2 text-sm text-green-800">
                          <CheckCircle className="w-4 h-4" />
                          <span>All tests passed successfully. No vulnerabilities detected.</span>
                        </div>
                      </div>
                    )}

                    {result.status === 'failed' && !isExpanded && (
                      <div className="mx-3 mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-900">
                        <strong>Critical issues detected:</strong> Click to view details and remediation steps
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Button variant="outline" className="w-full mt-4" size="sm">
              <FileDown className="w-3 h-3 mr-2" />
              View Complete Test Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Compliance & Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance Documentation & Audit Trail
          </CardTitle>
          <CardDescription>
            Automated test results are mapped to ISO 42001 and EU AI Act requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">ISO 42001 Coverage</div>
              <div className="text-2xl font-bold mb-1">89%</div>
              <Progress value={89} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                28 of 32 control requirements tested
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">EU AI Act Compliance</div>
              <div className="text-2xl font-bold mb-1">92%</div>
              <Progress value={92} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                23 of 25 requirements validated
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">Audit Readiness</div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-lg font-bold text-green-600">Ready</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Complete audit trail with timestamped logs
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Export ISO 42001 Report
            </Button>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Export EU AI Act Report
            </Button>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Export Full Audit Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
