import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import {
  TrendingUp,
  User,
  Mail,
  Bell,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  ArrowRight,
  Send,
  Users,
  Smartphone,
  Slack,
  XCircle
} from 'lucide-react';

interface EscalationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEscalate: (escalationData: any) => void;
  reviewItem: {
    id: string;
    action: string;
    riskScore: number;
    confidence: number;
    type: string;
  } | null;
}

export function EscalationDialog({ isOpen, onClose, onEscalate, reviewItem }: EscalationDialogProps) {
  const [escalationReason, setEscalationReason] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notificationMethods, setNotificationMethods] = useState({
    email: true,
    inApp: true,
    sms: false,
    slack: false
  });
  const [additionalReviewers, setAdditionalReviewers] = useState<string[]>([]);

  // Real-time supervisor availability data
  const supervisors = [
    {
      id: 'sarah.chen',
      name: 'Sarah Chen',
      role: 'Senior AI Governance Lead',
      email: 'sarah.chen@company.com',
      status: 'available',
      statusReason: 'Online and accepting escalations',
      currentLoad: 2,
      maxCapacity: 5,
      avgResponseTime: '12 minutes',
      satisfactionScore: 4.8,
      specialties: ['Financial Risk', 'EU AI Act', 'Model Validation'],
      shiftEndsIn: '6 hours',
      isRecommended: true,
      recommendReason: 'Best match: Low workload (40%), fast response, high satisfaction'
    },
    {
      id: 'aisha.patel',
      name: 'Dr. Aisha Patel',
      role: 'Chief AI Risk Officer',
      email: 'aisha.patel@company.com',
      status: 'available',
      statusReason: 'Available for high-priority items only',
      currentLoad: 1,
      maxCapacity: 3,
      avgResponseTime: '8 minutes',
      satisfactionScore: 4.9,
      specialties: ['High-Risk AI', 'Regulatory Compliance', 'Executive Review'],
      shiftEndsIn: '2 hours',
      isRecommended: false,
      recommendReason: null
    },
    {
      id: 'marcus.rodriguez',
      name: 'Marcus Rodriguez',
      role: 'AI Ethics Officer',
      email: 'marcus.r@company.com',
      status: 'busy',
      statusReason: 'At capacity (4/4 active escalations)',
      currentLoad: 4,
      maxCapacity: 4,
      avgResponseTime: '18 minutes',
      satisfactionScore: 4.6,
      specialties: ['Bias Detection', 'Fairness Review', 'Privacy'],
      shiftEndsIn: '8 hours',
      isRecommended: false,
      recommendReason: null
    },
    {
      id: 'james.wilson',
      name: 'James Wilson',
      role: 'AI Security Lead',
      email: 'james.w@company.com',
      status: 'in-meeting',
      statusReason: 'In meeting until 2:30 PM (45 min)',
      currentLoad: 2,
      maxCapacity: 5,
      avgResponseTime: '15 minutes',
      satisfactionScore: 4.7,
      specialties: ['Security Review', 'Threat Analysis', 'Data Protection'],
      shiftEndsIn: '7 hours',
      isRecommended: false,
      recommendReason: null
    },
    {
      id: 'elena.kowalski',
      name: 'Elena Kowalski',
      role: 'Data Governance Manager',
      email: 'elena.k@company.com',
      status: 'offline',
      statusReason: 'Out of office until Oct 12 (Backup: Sarah Chen)',
      currentLoad: 0,
      maxCapacity: 4,
      avgResponseTime: '20 minutes',
      satisfactionScore: 4.5,
      specialties: ['Data Privacy', 'GDPR', 'Data Quality'],
      shiftEndsIn: null,
      isRecommended: false,
      recommendReason: null
    }
  ];

  const additionalReviewerOptions = [
    { id: 'finance-team', name: 'Finance Team', email: 'finance@company.com' },
    { id: 'legal-team', name: 'Legal Team', email: 'legal@company.com' },
    { id: 'security-team', name: 'Security Operations', email: 'security@company.com' },
    { id: 'executive-team', name: 'Executive Leadership', email: 'executives@company.com' }
  ];

  const handleEscalate = () => {
    const escalationData = {
      reviewItemId: reviewItem?.id,
      supervisor: selectedSupervisor,
      reason: escalationReason,
      priority,
      notificationMethods,
      additionalReviewers,
      timestamp: new Date().toISOString()
    };
    onEscalate(escalationData);
    // Reset form
    setEscalationReason('');
    setSelectedSupervisor('');
    setPriority('medium');
    setAdditionalReviewers([]);
  };

  const toggleAdditionalReviewer = (reviewerId: string) => {
    setAdditionalReviewers(prev =>
      prev.includes(reviewerId)
        ? prev.filter(id => id !== reviewerId)
        : [...prev, reviewerId]
    );
  };

  const selectedSupervisorData = supervisors.find(s => s.id === selectedSupervisor);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Escalate to Supervisor
          </DialogTitle>
          <DialogDescription>
            This action requires supervisor approval. Select a reviewer and provide context for the escalation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* What's Being Escalated */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                What's Being Escalated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Review Item: {reviewItem?.id}</p>
                <p className="text-sm text-blue-800">{reviewItem?.action}</p>
              </div>
              <div className="flex gap-4 text-xs text-blue-700">
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Risk: {reviewItem ? (reviewItem.riskScore * 100).toFixed(0) : 0}%
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Confidence: {reviewItem ? (reviewItem.confidence * 100).toFixed(0) : 0}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Escalate */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Why Escalate to a Supervisor?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Escalations are appropriate when the decision requires higher authority, specialized expertise, 
                or involves significant organizational impact. Your supervisor will receive full context and can 
                make an informed decision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Good Escalation Reasons</p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      <li>• Exceeds your approval authority</li>
                      <li>• Requires specialized expertise</li>
                      <li>• High financial or reputational risk</li>
                      <li>• Ambiguous policy interpretation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">When NOT to Escalate</p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      <li>• Clear policy violation (reject it)</li>
                      <li>• Within your authority (decide it)</li>
                      <li>• Minor procedural questions</li>
                      <li>• To avoid responsibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Select Supervisor */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Supervisor *</label>
              <p className="text-xs text-muted-foreground mb-3">
                Choose the most appropriate supervisor based on their expertise and availability
              </p>
            </div>

            <div className="space-y-2">
              {supervisors.map((supervisor) => {
                const isAvailable = supervisor.status === 'available';
                const isBusy = supervisor.status === 'busy';
                const isOffline = supervisor.status === 'offline';
                const canSelect = isAvailable;
                
                return (
                  <div
                    key={supervisor.id}
                    className={`p-4 border rounded-lg transition-all ${
                      !canSelect ? 'opacity-60 cursor-not-allowed bg-slate-50' :
                      selectedSupervisor === supervisor.id
                        ? 'border-primary bg-primary/5 cursor-pointer'
                        : 'hover:border-primary/50 hover:bg-accent/50 cursor-pointer'
                    } ${supervisor.isRecommended ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => canSelect && setSelectedSupervisor(supervisor.id)}
                  >
                    {supervisor.isRecommended && (
                      <div className="mb-2 px-2 py-1 bg-blue-100 border border-blue-300 rounded text-xs font-medium text-blue-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Recommended: {supervisor.recommendReason}
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <User className="w-4 h-4" />
                          <span className="font-medium text-sm">{supervisor.name}</span>
                          <Badge
                            variant={isAvailable ? 'default' : 'secondary'}
                            className={`text-xs ${
                              isAvailable ? 'bg-green-600' :
                              isBusy ? 'bg-red-600 text-white' :
                              isOffline ? 'bg-gray-600 text-white' :
                              'bg-orange-600 text-white'
                            }`}
                          >
                            {isAvailable ? <CheckCircle className="w-3 h-3 mr-1" /> :
                             isBusy ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                             isOffline ? <XCircle className="w-3 h-3 mr-1" /> :
                             <Clock className="w-3 h-3 mr-1" />}
                            {supervisor.status === 'available' ? 'Available' :
                             supervisor.status === 'busy' ? 'At Capacity' :
                             supervisor.status === 'offline' ? 'Offline' :
                             supervisor.status === 'in-meeting' ? 'In Meeting' : 'Away'}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-2">{supervisor.role}</p>
                        
                        {/* Status Reason */}
                        <div className="mb-2 p-2 bg-slate-100 rounded text-xs">
                          <div className="flex items-center gap-1 text-slate-700">
                            <Info className="w-3 h-3" />
                            {supervisor.statusReason}
                          </div>
                        </div>
                        
                        {/* Capacity Indicator */}
                        {supervisor.currentLoad !== undefined && (
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Current Load</span>
                              <span className="font-medium">{supervisor.currentLoad} / {supervisor.maxCapacity}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  supervisor.currentLoad >= supervisor.maxCapacity ? 'bg-red-500' :
                                  supervisor.currentLoad / supervisor.maxCapacity > 0.7 ? 'bg-orange-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${(supervisor.currentLoad / supervisor.maxCapacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {supervisor.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {supervisor.avgResponseTime} avg
                          </div>
                          {supervisor.satisfactionScore && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {supervisor.satisfactionScore}/5.0
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {supervisor.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedSupervisor === supervisor.id && canSelect && (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Priority Level */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Escalation Priority *</label>
              <p className="text-xs text-muted-foreground mb-3">
                Set the urgency level to help your supervisor prioritize their response
              </p>
            </div>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Low - Can wait 24-48 hours
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Medium - Need response within 4 hours
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    High - Need response within 1 hour
                  </div>
                </SelectItem>
                <SelectItem value="critical">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Critical - Immediate attention required
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Escalation Reason */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Escalation Reason *</label>
              <p className="text-xs text-muted-foreground mb-3">
                Explain why this needs supervisor review. Be specific about what makes this decision challenging.
                Do not include sensitive customer data.
              </p>
            </div>
            <Textarea
              value={escalationReason}
              onChange={(e) => setEscalationReason(e.target.value)}
              placeholder="Example: This refund exceeds my $1000 approval limit and involves a VIP customer with ongoing legal discussions. The AI suggested 25% but customer is requesting 40%. I need guidance on balancing customer satisfaction with our refund policy given the legal context."
              className="min-h-32"
            />
            {escalationReason.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {escalationReason.length} characters • Good escalation notes are 100-300 characters
              </p>
            )}
          </div>

          <Separator />

          {/* Notification Methods */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">How Will They Be Notified?</label>
              <p className="text-xs text-muted-foreground mb-3">
                Select notification channels. Higher priority escalations should use multiple channels.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50"
                onClick={() => setNotificationMethods(prev => ({ ...prev, email: !prev.email }))}
              >
                <Checkbox checked={notificationMethods.email} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Email</span>
                    <Badge variant="outline" className="text-xs">Recommended</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Detailed notification with full context and action links
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50"
                onClick={() => setNotificationMethods(prev => ({ ...prev, inApp: !prev.inApp }))}
              >
                <Checkbox checked={notificationMethods.inApp} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">In-App Notification</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Real-time alert in the platform with one-click review
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50"
                onClick={() => setNotificationMethods(prev => ({ ...prev, sms: !prev.sms }))}
              >
                <Checkbox checked={notificationMethods.sms} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">SMS</span>
                    <Badge variant="outline" className="text-xs">High/Critical only</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Text message for urgent escalations
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50"
                onClick={() => setNotificationMethods(prev => ({ ...prev, slack: !prev.slack }))}
              >
                <Checkbox checked={notificationMethods.slack} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Slack</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Direct message in #governance-reviews channel
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Reviewers */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Additional Reviewers (Optional)
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Loop in other teams who should be aware of this decision. They'll receive a copy 
                of the escalation and can provide input to the supervisor.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {additionalReviewerOptions.map((reviewer) => (
                <div
                  key={reviewer.id}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50"
                  onClick={() => toggleAdditionalReviewer(reviewer.id)}
                >
                  <Checkbox checked={additionalReviewers.includes(reviewer.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span className="text-sm">{reviewer.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{reviewer.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* What Happens Next */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-600" />
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-green-800">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    1
                  </span>
                  <div>
                    <p className="font-medium">Immediate notification sent</p>
                    <p className="text-xs text-green-700">
                      {selectedSupervisorData?.name || 'The supervisor'} will be notified via your selected 
                      channels within seconds
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    2
                  </span>
                  <div>
                    <p className="font-medium">Action is paused</p>
                    <p className="text-xs text-green-700">
                      The original AI action is blocked and cannot execute until supervisor decision
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    3
                  </span>
                  <div>
                    <p className="font-medium">Supervisor reviews with full context</p>
                    <p className="text-xs text-green-700">
                      They'll see the original action, your notes, risk signals, and all relevant data
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    4
                  </span>
                  <div>
                    <p className="font-medium">You're notified of the decision</p>
                    <p className="text-xs text-green-700">
                      You'll receive an alert when they approve, reject, or request more information
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    5
                  </span>
                  <div>
                    <p className="font-medium">Complete audit trail created</p>
                    <p className="text-xs text-green-700">
                      Every step is logged: your escalation, supervisor's review, final decision, and rationale
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Expected Response Time */}
          {selectedSupervisorData && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Expected Response Time</p>
                    <p className="text-xs text-yellow-800 mt-1">
                      Based on {selectedSupervisorData.name}'s history, you can expect a response within{' '}
                      <span className="font-medium">{selectedSupervisorData.avgResponseTime}</span> for {priority} priority items.
                      {priority === 'critical' && ' Critical escalations trigger enhanced notifications.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleEscalate}
            disabled={!selectedSupervisor || !escalationReason.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Escalate to {selectedSupervisorData?.name || 'Supervisor'}
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground text-center pb-2">
          ⓘ This escalation will be permanently recorded in the audit log with your name, timestamp, 
          and rationale for compliance and training purposes.
        </p>
      </DialogContent>
    </Dialog>
  );
}
