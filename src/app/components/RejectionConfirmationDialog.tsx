import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  XCircle,
  AlertTriangle,
  Mail,
  Bell,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  User,
  Lock
} from 'lucide-react';

interface RejectionConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reviewItem: {
    id: string;
    action: string;
    type: string;
    context: {
      user?: string;
      recipient?: string;
      amount?: number;
    };
  } | null;
  rejectionReason: string;
}

export function RejectionConfirmationDialog({ 
  isOpen, 
  onClose, 
  reviewItem,
  rejectionReason 
}: RejectionConfirmationDialogProps) {
  if (!reviewItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Action Rejected Successfully
          </DialogTitle>
          <DialogDescription>
            The AI-generated action has been blocked and will not be executed
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* What Was Rejected */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 mb-1">Rejected Action</h4>
                  <p className="text-sm text-red-800 mb-2">{reviewItem.action}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">Review ID: {reviewItem.id}</Badge>
                    <Badge variant="destructive" className="text-xs">BLOCKED</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rejection Reason */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Your Rejection Rationale
            </h4>
            <div className="p-3 bg-slate-50 border rounded-lg">
              <p className="text-sm text-slate-700">{rejectionReason}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This rationale has been permanently recorded in the audit log and attached to your reviewer profile
            </p>
          </div>

          {/* What Happens Next */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                What Happens Next
              </h4>
              
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Action is immediately blocked</p>
                    <p className="text-xs text-blue-700">
                      {reviewItem.type === 'refund' && `The $${reviewItem.context.amount?.toLocaleString()} refund will NOT be processed. No funds will be transferred.`}
                      {reviewItem.type === 'email' && `The email will NOT be sent to ${reviewItem.context.recipient}. No communication will occur.`}
                      {reviewItem.type === 'message' && 'The message will NOT be shown to the customer. They will see a generic response instead.'}
                      {reviewItem.type === 'deletion' && 'The account will NOT be deleted. All data remains intact and accessible.'}
                      {reviewItem.type === 'export' && 'The data export will NOT be generated. No files will be created or sent.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Requester is notified</p>
                    <p className="text-xs text-blue-700">
                      {reviewItem.context.user && `${reviewItem.context.user} will receive a notification that their request was reviewed and denied with your rationale.`}
                      {!reviewItem.context.user && 'The requesting system will receive an error response indicating the action was blocked by human review.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Audit trail created</p>
                    <p className="text-xs text-blue-700">
                      A complete record is logged including: timestamp, your reviewer ID, the rejected action, your rationale, and the original AI recommendation with risk scores.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">AI model is updated</p>
                    <p className="text-xs text-blue-700">
                      Your rejection helps train future AI recommendations. Similar patterns will be flagged for review or blocked automatically based on your decision.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Sent */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications Sent
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <Mail className="w-4 h-4 text-green-600" />
                <span className="text-green-800">
                  Email sent to {reviewItem.context.user || 'requesting system'}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <Bell className="w-4 h-4 text-green-600" />
                <span className="text-green-800">
                  In-app notification created
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-green-800">
                  Audit log entry created with full context
                </span>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-slate-600" />
                Impact Summary
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Business Impact</p>
                  <p className="font-medium text-slate-700">
                    {reviewItem.type === 'refund' && 'Customer refund request denied'}
                    {reviewItem.type === 'email' && 'Customer communication blocked'}
                    {reviewItem.type === 'message' && 'Custom message not shown'}
                    {reviewItem.type === 'deletion' && 'Account deletion prevented'}
                    {reviewItem.type === 'export' && 'Data export blocked'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Risk Mitigation</p>
                  <p className="font-medium text-slate-700">
                    {reviewItem.type === 'refund' && 'Financial loss prevented'}
                    {reviewItem.type === 'email' && 'Communication risk avoided'}
                    {reviewItem.type === 'message' && 'Content risk avoided'}
                    {reviewItem.type === 'deletion' && 'Data loss prevented'}
                    {reviewItem.type === 'export' && 'Privacy breach prevented'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Actions */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">Suggested Next Steps</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Review similar pending items in the queue</li>
              <li>• Update trigger policies if this pattern should be auto-rejected</li>
              <li>• Contact {reviewItem.context.user || 'the requester'} if manual intervention is needed</li>
              <li>• Document this decision in your team's knowledge base</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Back to Queue
          </Button>
          <Button onClick={onClose}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
