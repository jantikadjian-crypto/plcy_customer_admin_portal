import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Shield,
  Zap,
  FileEdit,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Activity,
  Download,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Eye,
  Database
} from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: 'change_request' | 'approval' | 'rejection' | 'break_glass' | 'implementation' | 'rollback';
  severity: 'info' | 'warning' | 'critical';
  userId: string;
  targetPack: string;
  action: string;
  details: {
    [key: string]: any;
  };
  ipAddress: string;
  sessionId: string;
  complianceFlags: string[];
}

export function GovernanceAuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Mock audit events - in production these would come from immutable audit log storage
  const auditEvents: AuditEvent[] = [
    {
      id: 'audit-1729876543210',
      timestamp: '2025-10-15T14:30:15.234Z',
      eventType: 'change_request',
      severity: 'warning',
      userId: 'demo@company.com',
      targetPack: 'PII Detection & Redaction',
      action: 'Change request submitted',
      details: {
        requestId: 'cr-1729876543210',
        changeType: 'configuration',
        priority: 'high',
        riskLevel: 'medium',
        fieldsModified: ['emailRedactionThreshold', 'allowedDomains'],
        justification: 'Reduce false positives in email detection',
        approvalPathLength: 2
      },
      ipAddress: '192.168.1.100',
      sessionId: 'sess-abc123def456',
      complianceFlags: ['GDPR', 'SOC2']
    },
    {
      id: 'audit-1729876543211',
      timestamp: '2025-10-15T14:35:42.891Z',
      eventType: 'approval',
      severity: 'info',
      userId: 'sarah.chen@company.com',
      targetPack: 'PII Detection & Redaction',
      action: 'Change request approved (Security Lead)',
      details: {
        requestId: 'cr-1729876543210',
        approverRole: 'Security Lead',
        comments: 'Threshold adjustment looks reasonable. Approved for compliance review.',
        approvalStep: 1,
        totalSteps: 2
      },
      ipAddress: '192.168.1.105',
      sessionId: 'sess-xyz789ghi012',
      complianceFlags: ['SOC2']
    },
    {
      id: 'audit-1729876543200',
      timestamp: '2025-10-13T22:45:00.123Z',
      eventType: 'break_glass',
      severity: 'critical',
      userId: 'ops-oncall@company.com',
      targetPack: 'Toxicity & Hate Speech Filter',
      action: 'Break glass override executed',
      details: {
        overrideId: 'bg-1729876543200',
        incidentType: 'Active coordinated spam attack',
        incidentSeverity: 'critical',
        justification: 'Emergency threshold adjustment for ongoing attack',
        witnessEmail: 'second-oncall@company.com',
        managerCodeVerified: true,
        configChanges: {
          toxicityThreshold: { from: 0.7, to: 0.9 },
          blockMode: { from: 'flag', to: 'immediate' }
        }
      },
      ipAddress: '192.168.1.200',
      sessionId: 'sess-emergency-001',
      complianceFlags: ['CRITICAL_SECURITY_EVENT', 'POST_INCIDENT_REVIEW_REQUIRED']
    },
    {
      id: 'audit-1729876543212',
      timestamp: '2025-10-14T09:20:30.456Z',
      eventType: 'change_request',
      severity: 'critical',
      userId: 'alice.johnson@company.com',
      targetPack: 'Prompt Injection Shield',
      action: 'Change request submitted',
      details: {
        requestId: 'cr-1729876543211',
        changeType: 'version',
        priority: 'critical',
        riskLevel: 'high',
        versionUpgrade: { from: '1.8.2', to: '1.8.3' },
        securityPatch: 'CVE-2025-12345',
        justification: 'Critical security vulnerability patch',
        approvalPathLength: 3
      },
      ipAddress: '192.168.1.110',
      sessionId: 'sess-sec456patch',
      complianceFlags: ['SECURITY_PATCH', 'CVE']
    },
    {
      id: 'audit-1729876543205',
      timestamp: '2025-10-12T16:20:00.789Z',
      eventType: 'rejection',
      severity: 'warning',
      userId: 'james.wilson@company.com',
      targetPack: 'Smart Rate Limiting',
      action: 'Change request rejected (Compliance Officer)',
      details: {
        requestId: 'cr-1729876543205',
        approverRole: 'Compliance Officer',
        comments: 'Insufficient business justification. Rate limit changes need more detailed cost-benefit analysis.',
        rejectionReason: 'INSUFFICIENT_JUSTIFICATION'
      },
      ipAddress: '192.168.1.120',
      sessionId: 'sess-comp789review',
      complianceFlags: ['POLICY_ENFORCEMENT']
    }
  ];

  const filteredEvents = auditEvents.filter(event => {
    const matchesSearch = event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.targetPack.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || event.eventType === eventTypeFilter;
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'change_request': return FileEdit;
      case 'approval': return CheckCircle;
      case 'rejection': return XCircle;
      case 'break_glass': return Zap;
      case 'implementation': return Activity;
      case 'rollback': return AlertTriangle;
      default: return Shield;
    }
  };

  const exportAuditLog = () => {
    const csv = [
      ['Timestamp', 'Event Type', 'Severity', 'User', 'Target Pack', 'Action', 'IP Address', 'Session ID'],
      ...filteredEvents.map(event => [
        event.timestamp,
        event.eventType,
        event.severity,
        event.userId,
        event.targetPack,
        event.action,
        event.ipAddress,
        event.sessionId
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `governance-audit-log-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Governance Audit Log</h1>
          <p className="text-muted-foreground">
            Immutable audit trail of all policy pack governance actions
          </p>
        </div>
        <Button onClick={exportAuditLog} className="gap-2">
          <Download className="w-4 h-4" />
          Export Log
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-semibold">{auditEvents.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Change Requests</p>
                <p className="text-2xl font-semibold">
                  {auditEvents.filter(e => e.eventType === 'change_request').length}
                </p>
              </div>
              <FileEdit className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Break Glass Events</p>
                <p className="text-2xl font-semibold text-red-700">
                  {auditEvents.filter(e => e.eventType === 'break_glass').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Events</p>
                <p className="text-2xl font-semibold text-orange-700">
                  {auditEvents.filter(e => e.severity === 'critical').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search audit events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="border border-input rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="all">All Event Types</option>
              <option value="change_request">Change Requests</option>
              <option value="approval">Approvals</option>
              <option value="rejection">Rejections</option>
              <option value="break_glass">Break Glass</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="border border-input rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Events */}
      <div className="space-y-3">
        {filteredEvents.map(event => {
          const EventIcon = getEventIcon(event.eventType);

          return (
            <Card key={event.id} className={`border-l-4 ${
              event.severity === 'critical' ? 'border-l-red-500' :
              event.severity === 'warning' ? 'border-l-yellow-500' :
              'border-l-blue-500'
            }`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        event.severity === 'critical' ? 'bg-red-100' :
                        event.severity === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <EventIcon className={`w-5 h-5 ${
                          event.severity === 'critical' ? 'text-red-600' :
                          event.severity === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{event.action}</h3>
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                          {event.eventType === 'break_glass' && (
                            <Badge className="bg-red-600 text-white">
                              BREAK GLASS
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.targetPack}
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <User className="w-3 h-3" />
                        <span>{event.userId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid md:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg text-xs">
                    <div>
                      <span className="text-muted-foreground">Event ID:</span>
                      <span className="ml-2 font-mono">{event.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Session ID:</span>
                      <span className="ml-2 font-mono">{event.sessionId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">IP Address:</span>
                      <span className="ml-2 font-mono">{event.ipAddress}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Event Type:</span>
                      <span className="ml-2 capitalize">{event.eventType.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Event-Specific Details */}
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-semibold text-blue-900 mb-2">Event Details:</p>
                    <pre className="text-xs text-blue-800 font-mono overflow-x-auto">
                      {JSON.stringify(event.details, null, 2)}
                    </pre>
                  </div>

                  {/* Compliance Flags */}
                  {event.complianceFlags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Compliance Flags:</span>
                      <div className="flex gap-1">
                        {event.complianceFlags.map(flag => (
                          <Badge key={flag} variant="outline" className="text-xs">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* OTEL Compliance Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 mb-1">OTEL-Compliant Audit Logging</p>
              <p className="text-sm text-green-800">
                All governance events are logged with OpenTelemetry-compliant schema including trace IDs,
                span context, and distributed tracing support. Logs are immutable and cryptographically
                signed for audit integrity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
