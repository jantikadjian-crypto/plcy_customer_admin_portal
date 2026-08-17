import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import {
  AlertTriangle,
  Users,
  Clock,
  FileText,
  ChevronRight,
  Shield,
  Info,
  Zap,
  AlertCircle
} from 'lucide-react';

interface ChangeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (changeRequest: ChangeRequest) => void;
  onBreakGlass: () => void;
  pack: any;
  currentConfig: any;
}

export interface ChangeRequest {
  id: string;
  packId: string;
  packName: string;
  requestedBy: string;
  requestedAt: string;
  changeType: 'configuration' | 'version' | 'controls';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  justification: string;
  businessImpact: string;
  affectedSystems: string[];
  approvalPath: ApprovalStep[];
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  riskLevel: 'low' | 'medium' | 'high';
  estimatedImpact: string;
  rollbackPlan: string;
  testingRequired: boolean;
  complianceReview: boolean;
}

interface ApprovalStep {
  role: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: string;
  comments?: string;
}

export function ChangeRequestModal({
  isOpen,
  onClose,
  onSubmit,
  onBreakGlass,
  pack,
  currentConfig
}: ChangeRequestModalProps) {
  const [changeType, setChangeType] = useState<'configuration' | 'version' | 'controls'>('configuration');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [justification, setJustification] = useState('');
  const [businessImpact, setBusinessImpact] = useState('');
  const [rollbackPlan, setRollbackPlan] = useState('');
  const [affectedSystems, setAffectedSystems] = useState('');
  const [testingRequired, setTestingRequired] = useState(true);
  const [complianceReview, setComplianceReview] = useState(false);
  const [configChanges, setConfigChanges] = useState<any>({});

  const getRiskLevel = (): 'low' | 'medium' | 'high' => {
    if (priority === 'critical' || changeType === 'controls') return 'high';
    if (priority === 'high') return 'medium';
    return 'low';
  };

  const getApprovalPath = (): ApprovalStep[] => {
    const riskLevel = getRiskLevel();
    const path: ApprovalStep[] = [];

    // Base approval: Security Team (always required)
    path.push({
      role: 'Security Lead',
      approver: 'sarah.chen@company.com',
      status: 'pending'
    });

    // Medium risk: Add Compliance approval
    if (riskLevel === 'medium' || riskLevel === 'high') {
      path.push({
        role: 'Compliance Officer',
        approver: 'james.wilson@company.com',
        status: 'pending'
      });
    }

    // High risk: Add CISO approval
    if (riskLevel === 'high') {
      path.push({
        role: 'CISO',
        approver: 'alex.rodriguez@company.com',
        status: 'pending'
      });
    }

    return path;
  };

  const handleSubmit = () => {
    const changeRequest: ChangeRequest = {
      id: `cr-${Date.now()}`,
      packId: pack.id,
      packName: pack.name,
      requestedBy: 'demo@company.com',
      requestedAt: new Date().toISOString(),
      changeType,
      priority,
      status: 'pending',
      justification,
      businessImpact,
      affectedSystems: affectedSystems.split(',').map(s => s.trim()).filter(Boolean),
      approvalPath: getApprovalPath(),
      changes: Object.keys(configChanges).map(key => ({
        field: key,
        oldValue: currentConfig[key],
        newValue: configChanges[key]
      })),
      riskLevel: getRiskLevel(),
      estimatedImpact: businessImpact,
      rollbackPlan,
      testingRequired,
      complianceReview
    };

    onSubmit(changeRequest);
    onClose();
  };

  const isFormValid = () => {
    return justification.trim() !== '' &&
           businessImpact.trim() !== '' &&
           rollbackPlan.trim() !== '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Request Policy Pack Change
          </DialogTitle>
          <DialogDescription>
            Submit a governed change request for {pack?.name}. All changes require approval.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Risk Warning */}
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <AlertDescription className="text-sm">
              Policy pack changes affect runtime enforcement. All modifications require approval through the governance workflow.
            </AlertDescription>
          </Alert>

          {/* Change Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Change Type</Label>
                <Select value={changeType} onValueChange={(v: any) => setChangeType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="configuration">Configuration Update</SelectItem>
                    <SelectItem value="version">Version Upgrade</SelectItem>
                    <SelectItem value="controls">Control Modification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Business Justification *</Label>
              <Textarea
                placeholder="Explain why this change is needed and what business problem it solves..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Business Impact Assessment *</Label>
              <Textarea
                placeholder="Describe the expected impact on systems, users, and compliance posture..."
                value={businessImpact}
                onChange={(e) => setBusinessImpact(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Rollback Plan *</Label>
              <Textarea
                placeholder="Describe how to revert this change if issues arise..."
                value={rollbackPlan}
                onChange={(e) => setRollbackPlan(e.target.value)}
                rows={2}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Affected Systems (comma-separated)</Label>
              <Input
                placeholder="e.g., customer-chatbot, api-gateway, data-pipeline"
                value={affectedSystems}
                onChange={(e) => setAffectedSystems(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={testingRequired}
                  onChange={(e) => setTestingRequired(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Testing required before deployment</span>
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={complianceReview}
                  onChange={(e) => setComplianceReview(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Compliance review required</span>
              </label>
            </div>
          </div>

          {/* Approval Path Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-sm">Approval Path</h4>
                <Badge variant={getRiskLevel() === 'high' ? 'destructive' : 'secondary'} className="ml-auto">
                  {getRiskLevel()} risk
                </Badge>
              </div>

              <div className="space-y-2">
                {getApprovalPath().map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{step.role}</p>
                      <p className="text-xs text-muted-foreground">{step.approver}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>

              <Alert className="mt-4 border-blue-200 bg-blue-50">
                <Info className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-xs">
                  Expected approval time: {getRiskLevel() === 'high' ? '24-48 hours' : getRiskLevel() === 'medium' ? '12-24 hours' : '4-8 hours'}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Break Glass Option */}
          <Alert className="border-red-200 bg-red-50">
            <Zap className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-red-900 mb-1">Emergency Override Available</p>
                  <p className="text-red-800 text-xs">
                    For critical security incidents, you can bypass approval workflow with "Break Glass" emergency access.
                    This action is heavily audited and requires post-incident justification.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4 border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() => {
                    onClose();
                    onBreakGlass();
                  }}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Break Glass
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid()} className="gap-2">
            <FileText className="w-4 h-4" />
            Submit Change Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
