import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  TrendingUp,
  Shield,
  ChevronRight,
  Eye,
  MessageSquare,
  CheckSquare,
  XSquare,
  Package,
  Zap,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import type { ChangeRequest } from './ChangeRequestModal';
import type { BreakGlassOverride } from './BreakGlassModal';

export function ApprovalQueue() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');

  // Mock data - in production would come from backend
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([
    {
      id: 'cr-1729876543210',
      packId: 'pack-pii-detection',
      packName: 'PII Detection & Redaction',
      requestedBy: 'demo@company.com',
      requestedAt: '2025-10-15T14:30:00Z',
      changeType: 'configuration',
      priority: 'high',
      status: 'pending',
      justification: 'Need to reduce false positives in email detection to improve user experience while maintaining security compliance',
      businessImpact: 'Will affect 50,000+ daily transactions in customer support chatbot. Expected to reduce false blocks by 30%.',
      affectedSystems: ['customer-chatbot', 'support-api', 'email-processor'],
      approvalPath: [
        {
          role: 'Security Lead',
          approver: 'sarah.chen@company.com',
          status: 'pending'
        },
        {
          role: 'Compliance Officer',
          approver: 'james.wilson@company.com',
          status: 'pending'
        }
      ],
      changes: [
        { field: 'emailRedactionThreshold', oldValue: '0.95', newValue: '0.98' },
        { field: 'allowedDomains', oldValue: '[]', newValue: '["company.com", "partner.com"]' }
      ],
      riskLevel: 'medium',
      estimatedImpact: 'Moderate - affects production traffic',
      rollbackPlan: 'Revert threshold to 0.95 via emergency config push. Estimated rollback time: 2 minutes.',
      testingRequired: true,
      complianceReview: true
    },
    {
      id: 'cr-1729876543211',
      packId: 'pack-prompt-injection',
      packName: 'Prompt Injection Shield',
      requestedBy: 'alice.johnson@company.com',
      requestedAt: '2025-10-14T09:15:00Z',
      changeType: 'version',
      priority: 'critical',
      status: 'pending',
      justification: 'Critical security patch for newly discovered Unicode obfuscation bypass technique (CVE-2025-12345)',
      businessImpact: 'Addresses active exploit vector. No expected negative impact. Deployment during off-peak hours recommended.',
      affectedSystems: ['all-ai-endpoints', 'api-gateway', 'chatbot-fleet'],
      approvalPath: [
        {
          role: 'Security Lead',
          approver: 'sarah.chen@company.com',
          status: 'pending'
        },
        {
          role: 'Compliance Officer',
          approver: 'james.wilson@company.com',
          status: 'pending'
        },
        {
          role: 'CISO',
          approver: 'alex.rodriguez@company.com',
          status: 'pending'
        }
      ],
      changes: [
        { field: 'version', oldValue: '1.8.2', newValue: '1.8.3' },
        { field: 'unicodeNormalization', oldValue: 'false', newValue: 'true' }
      ],
      riskLevel: 'high',
      estimatedImpact: 'High - critical security fix',
      rollbackPlan: 'Maintain v1.8.2 in standby. Can rollback via version pinning in under 60 seconds.',
      testingRequired: true,
      complianceReview: true
    }
  ]);

  const [breakGlassEvents, setBreakGlassEvents] = useState<BreakGlassOverride[]>([
    {
      id: 'bg-1729876543200',
      packId: 'pack-toxic-content',
      packName: 'Toxicity & Hate Speech Filter',
      initiatedBy: 'ops-oncall@company.com',
      initiatedAt: '2025-10-13T22:45:00Z',
      incidentType: 'Active coordinated spam attack',
      severity: 'critical',
      justification: 'Large-scale coordinated attack bypassing toxicity filters. Immediate tightening of thresholds required to protect users.',
      incidentDetails: 'At 22:30 UTC, monitoring detected 10,000+ toxic messages bypassing filters using novel obfuscation. Attack ongoing. Emergency threshold adjustment needed.',
      witnessEmail: 'second-oncall@company.com',
      managerApprovalCode: '******',
      acknowledgedRisks: true,
      postIncidentReviewRequired: true,
      auditTrail: [
        {
          timestamp: '2025-10-13T22:45:00Z',
          action: 'Break glass initiated',
          userId: 'ops-oncall@company.com'
        },
        {
          timestamp: '2025-10-13T22:45:15Z',
          action: 'Manager code verified',
          userId: 'system'
        },
        {
          timestamp: '2025-10-13T22:45:30Z',
          action: 'Configuration updated',
          userId: 'ops-oncall@company.com'
        }
      ]
    }
  ]);

  const handleApprove = () => {
    if (!selectedRequest) return;

    const currentUser = 'sarah.chen@company.com'; // Mock current approver
    const updatedRequest = { ...selectedRequest };

    // Find current user's step in approval path
    const stepIndex = updatedRequest.approvalPath.findIndex(
      step => step.approver === currentUser && step.status === 'pending'
    );

    if (stepIndex !== -1) {
      updatedRequest.approvalPath[stepIndex] = {
        ...updatedRequest.approvalPath[stepIndex],
        status: 'approved',
        timestamp: new Date().toISOString(),
        comments: reviewComments
      };

      // Check if all approvals are complete
      const allApproved = updatedRequest.approvalPath.every(step => step.status === 'approved');
      if (allApproved) {
        updatedRequest.status = 'approved';
      }

      setChangeRequests(prev =>
        prev.map(cr => cr.id === selectedRequest.id ? updatedRequest : cr)
      );

      toast.success('Change request approved', {
        description: allApproved
          ? 'All approvals complete. Change can now be implemented.'
          : 'Forwarded to next approver in chain.'
      });
    }

    setShowReviewModal(false);
    setSelectedRequest(null);
    setReviewComments('');
  };

  const handleReject = () => {
    if (!selectedRequest) return;

    const currentUser = 'sarah.chen@company.com';
    const updatedRequest = { ...selectedRequest };

    const stepIndex = updatedRequest.approvalPath.findIndex(
      step => step.approver === currentUser && step.status === 'pending'
    );

    if (stepIndex !== -1) {
      updatedRequest.approvalPath[stepIndex] = {
        ...updatedRequest.approvalPath[stepIndex],
        status: 'rejected',
        timestamp: new Date().toISOString(),
        comments: reviewComments
      };

      updatedRequest.status = 'rejected';

      setChangeRequests(prev =>
        prev.map(cr => cr.id === selectedRequest.id ? updatedRequest : cr)
      );

      toast.error('Change request rejected', {
        description: 'Requester will be notified of rejection reason.'
      });
    }

    setShowReviewModal(false);
    setSelectedRequest(null);
    setReviewComments('');
  };

  const pendingRequests = changeRequests.filter(cr => cr.status === 'pending');
  const approvedRequests = changeRequests.filter(cr => cr.status === 'approved');
  const rejectedRequests = changeRequests.filter(cr => cr.status === 'rejected');

  const renderChangeRequest = (request: ChangeRequest) => {
    const priorityColors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };

    const riskColors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      implemented: 'bg-blue-100 text-blue-800'
    };

    return (
      <Card key={request.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold">{request.packName}</h3>
                </div>
                <p className="text-sm text-muted-foreground">Request ID: {request.id}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge className={statusColors[request.status]}>
                  {request.status}
                </Badge>
                <Badge className={priorityColors[request.priority]}>
                  {request.priority} priority
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Requested By</p>
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <p className="text-sm font-medium">{request.requestedBy}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Requested At</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <p className="text-sm">{new Date(request.requestedAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Change Type</p>
                <p className="text-sm font-medium capitalize">{request.changeType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                <Badge className={riskColors[request.riskLevel]} variant="outline">
                  {request.riskLevel} risk
                </Badge>
              </div>
            </div>

            {/* Justification */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Business Justification</p>
              <p className="text-sm">{request.justification}</p>
            </div>

            {/* Approval Progress */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Approval Progress</p>
              <div className="space-y-2">
                {request.approvalPath.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {step.status === 'approved' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : step.status === 'rejected' ? (
                      <XCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                    <span className="text-sm flex-1">
                      {step.role} - {step.approver}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {step.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setSelectedRequest(request)}
              >
                <Eye className="w-4 h-4" />
                View Details
              </Button>
              {request.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => {
                      setSelectedRequest(request);
                      setReviewAction('approve');
                      setShowReviewModal(true);
                    }}
                  >
                    <CheckSquare className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => {
                      setSelectedRequest(request);
                      setReviewAction('reject');
                      setShowReviewModal(true);
                    }}
                  >
                    <XSquare className="w-4 h-4" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Approval Queue</h1>
        <p className="text-muted-foreground">
          Review and approve policy pack change requests and monitor break glass events
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-semibold">{pendingRequests.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-semibold">{approvedRequests.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-semibold">{rejectedRequests.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Break Glass Events</p>
                <p className="text-2xl font-semibold">{breakGlassEvents.length}</p>
              </div>
              <Zap className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending
            <Badge variant="secondary">{pendingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <XCircle className="w-4 h-4" />
            Rejected
          </TabsTrigger>
          <TabsTrigger value="breakglass" className="gap-2">
            <Zap className="w-4 h-4" />
            Break Glass Events
            <Badge variant="destructive">{breakGlassEvents.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="font-semibold mb-2">No pending approvals</h3>
                <p className="text-muted-foreground">All change requests have been reviewed</p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map(renderChangeRequest)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="font-semibold mb-2">No approved requests</h3>
                <p className="text-muted-foreground">Approved changes will appear here</p>
              </CardContent>
            </Card>
          ) : (
            approvedRequests.map(renderChangeRequest)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="font-semibold mb-2">No rejected requests</h3>
                <p className="text-muted-foreground">Rejected changes will appear here</p>
              </CardContent>
            </Card>
          ) : (
            rejectedRequests.map(renderChangeRequest)
          )}
        </TabsContent>

        <TabsContent value="breakglass" className="space-y-4">
          {breakGlassEvents.map(event => (
            <Card key={event.id} className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-red-600" />
                      <div>
                        <h3 className="font-semibold">{event.packName}</h3>
                        <p className="text-sm text-muted-foreground">Break Glass Override</p>
                      </div>
                    </div>
                    <Badge className="bg-red-600">
                      {event.severity} severity
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Initiated By</p>
                      <p className="text-sm font-medium">{event.initiatedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                      <p className="text-sm">{new Date(event.initiatedAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Incident Type</p>
                      <p className="text-sm font-medium">{event.incidentType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Witness</p>
                      <p className="text-sm">{event.witnessEmail}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Justification</p>
                    <p className="text-sm">{event.justification}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Audit Trail</p>
                    <div className="space-y-1">
                      {event.auditTrail.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Activity className="w-3 h-3" />
                          <span>{new Date(entry.timestamp).toLocaleString()}</span>
                          <span>•</span>
                          <span>{entry.action}</span>
                          <span>by {entry.userId}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {event.postIncidentReviewRequired && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <AlertDescription className="text-sm text-orange-900">
                        Post-incident review required within 24 hours
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      {showReviewModal && selectedRequest && (
        <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {reviewAction === 'approve' ? 'Approve' : 'Reject'} Change Request
              </DialogTitle>
              <DialogDescription>
                Provide comments for your decision
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-semibold mb-2">{selectedRequest.packName}</p>
                <p className="text-sm text-muted-foreground">{selectedRequest.justification}</p>
              </div>

              <div className="space-y-2">
                <Label>Comments {reviewAction === 'reject' && '(Required)'}</Label>
                <Textarea
                  placeholder={reviewAction === 'approve'
                    ? 'Optional: Add comments or conditions for approval...'
                    : 'Required: Explain why this change is being rejected...'}
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReviewModal(false)}>
                Cancel
              </Button>
              {reviewAction === 'approve' ? (
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approve Change
                </Button>
              ) : (
                <Button
                  onClick={handleReject}
                  disabled={!reviewComments.trim()}
                  className="bg-red-600 hover:bg-red-700 gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Change
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
