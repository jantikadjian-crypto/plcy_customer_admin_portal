import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import {
  Zap,
  AlertTriangle,
  Shield,
  Eye,
  Clock,
  FileWarning,
  ShieldAlert
} from 'lucide-react';

interface BreakGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (override: BreakGlassOverride) => void;
  pack: any;
}

export interface BreakGlassOverride {
  id: string;
  packId: string;
  packName: string;
  initiatedBy: string;
  initiatedAt: string;
  incidentType: string;
  severity: 'critical' | 'high';
  justification: string;
  incidentDetails: string;
  witnessEmail: string;
  managerApprovalCode: string;
  acknowledgedRisks: boolean;
  postIncidentReviewRequired: boolean;
  auditTrail: {
    timestamp: string;
    action: string;
    userId: string;
  }[];
}

export function BreakGlassModal({ isOpen, onClose, onConfirm, pack }: BreakGlassModalProps) {
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState<'critical' | 'high'>('critical');
  const [justification, setJustification] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [witnessEmail, setWitnessEmail] = useState('');
  const [managerCode, setManagerCode] = useState('');
  const [acknowledgedRisks, setAcknowledgedRisks] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const handleConfirm = () => {
    const override: BreakGlassOverride = {
      id: `bg-${Date.now()}`,
      packId: pack.id,
      packName: pack.name,
      initiatedBy: 'demo@company.com',
      initiatedAt: new Date().toISOString(),
      incidentType,
      severity,
      justification,
      incidentDetails,
      witnessEmail,
      managerApprovalCode: managerCode,
      acknowledgedRisks,
      postIncidentReviewRequired: true,
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: 'Break glass initiated',
          userId: 'demo@company.com'
        }
      ]
    };

    onConfirm(override);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setIncidentType('');
    setSeverity('critical');
    setJustification('');
    setIncidentDetails('');
    setWitnessEmail('');
    setManagerCode('');
    setAcknowledgedRisks(false);
    setConfirmationText('');
  };

  const isFormValid = () => {
    return incidentType.trim() !== '' &&
           justification.trim() !== '' &&
           incidentDetails.trim() !== '' &&
           witnessEmail.includes('@') &&
           managerCode.length >= 6 &&
           acknowledgedRisks &&
           confirmationText === 'EMERGENCY OVERRIDE';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-red-500">
        <DialogHeader className="bg-red-50 -mx-6 -mt-6 px-6 py-4 border-b-4 border-red-500">
          <DialogTitle className="flex items-center gap-2 text-red-900">
            <Zap className="w-6 h-6 text-red-600 animate-pulse" />
            Break Glass Emergency Override
          </DialogTitle>
          <DialogDescription className="text-red-800 font-semibold">
            WARNING: This action bypasses all approval workflows and is heavily audited
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Critical Warning */}
          <Alert className="border-red-500 bg-red-50 border-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <AlertDescription className="text-sm text-red-900">
              <p className="font-bold mb-2">EMERGENCY ACCESS ONLY</p>
              <ul className="text-xs space-y-1 ml-4 list-disc">
                <li>This action is recorded in immutable audit logs</li>
                <li>Security team will be notified immediately</li>
                <li>Post-incident review is mandatory within 24 hours</li>
                <li>Unauthorized use may result in disciplinary action</li>
                <li>All changes are reversible and monitored</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Pack Information */}
          <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
            <p className="text-sm text-muted-foreground mb-1">Target Policy Pack</p>
            <p className="font-semibold">{pack?.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Pack ID: {pack?.id}</p>
          </div>

          {/* Incident Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-red-900">Incident Type *</Label>
              <Input
                placeholder="e.g., Active security breach, Data leak, System compromise"
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="border-red-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-red-900">Severity</Label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as 'critical' | 'high')}
                className="w-full border border-red-200 rounded-md px-3 py-2 text-sm"
              >
                <option value="critical">Critical - Immediate threat</option>
                <option value="high">High - Urgent but contained</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-red-900">Emergency Justification *</Label>
              <Textarea
                placeholder="Explain the emergency situation requiring immediate action..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={3}
                className="resize-none border-red-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-red-900">Detailed Incident Description *</Label>
              <Textarea
                placeholder="Provide specific details about the incident, affected systems, and timeline..."
                value={incidentDetails}
                onChange={(e) => setIncidentDetails(e.target.value)}
                rows={4}
                className="resize-none border-red-200"
              />
            </div>
          </div>

          {/* Authorization Requirements */}
          <div className="space-y-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-orange-600" />
              <h4 className="font-semibold text-sm text-orange-900">Authorization Required</h4>
            </div>

            <div className="space-y-2">
              <Label className="text-orange-900">Witness Email (Second team member) *</Label>
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={witnessEmail}
                onChange={(e) => setWitnessEmail(e.target.value)}
                className="border-orange-200"
              />
              <p className="text-xs text-orange-700">A notification will be sent to verify this action</p>
            </div>

            <div className="space-y-2">
              <Label className="text-orange-900">Manager Approval Code *</Label>
              <Input
                type="password"
                placeholder="Enter 6-digit manager code"
                value={managerCode}
                onChange={(e) => setManagerCode(e.target.value)}
                maxLength={6}
                className="border-orange-200 font-mono"
              />
              <p className="text-xs text-orange-700">Obtain from your direct manager or on-call lead</p>
            </div>
          </div>

          {/* Risk Acknowledgment */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgedRisks}
                onChange={(e) => setAcknowledgedRisks(e.target.checked)}
                className="mt-1 w-4 h-4"
              />
              <div className="text-sm">
                <p className="font-semibold text-yellow-900 mb-1">I acknowledge the following:</p>
                <ul className="text-xs text-yellow-800 space-y-1 ml-4 list-disc">
                  <li>This action bypasses all standard approval controls</li>
                  <li>I am responsible for the consequences of this change</li>
                  <li>I will complete post-incident documentation within 24 hours</li>
                  <li>I understand this action is permanently logged and auditable</li>
                  <li>Misuse of break glass access is a security violation</li>
                </ul>
              </div>
            </label>

            <div className="space-y-2">
              <Label className="text-red-900">Type "EMERGENCY OVERRIDE" to confirm *</Label>
              <Input
                placeholder="EMERGENCY OVERRIDE"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="border-red-300 font-mono"
              />
            </div>
          </div>

          {/* Audit Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <Eye className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-xs">
              <div className="space-y-1">
                <p className="font-semibold text-blue-900">Automatic Audit Trail:</p>
                <div className="flex items-center gap-2 text-blue-800">
                  <Clock className="w-3 h-3" />
                  <span>Timestamp: {new Date().toISOString()}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <FileWarning className="w-3 h-3" />
                  <span>User: demo@company.com</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Shield className="w-3 h-3" />
                  <span>IP: 192.168.1.100 (tracked)</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="bg-red-50 -mx-6 -mb-6 px-6 py-4 border-t-2 border-red-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isFormValid()}
            className="bg-red-600 hover:bg-red-700 text-white gap-2"
          >
            <Zap className="w-4 h-4" />
            Execute Emergency Override
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
