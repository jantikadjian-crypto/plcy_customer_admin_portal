import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import {
  Clock,
  User,
  RotateCcw,
  GitBranch,
  ChevronRight,
  Eye,
  AlertTriangle,
  CheckCircle,
  FileText,
  Activity,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface ConfigVersion {
  id: string;
  version: number;
  timestamp: string;
  userId: string;
  userName: string;
  changeType: 'deployment' | 'control_update' | 'enforcement_change' | 'alert_routing' | 'rollback';
  packName: string;
  changes: ConfigChange[];
  status: 'active' | 'historical';
  reason?: string;
}

interface ConfigChange {
  controlName?: string;
  field: string;
  oldValue: any;
  newValue: any;
  impact: 'low' | 'medium' | 'high';
}

export function ConfigurationHistory({ packId }: { packId: string }) {
  const [selectedVersion, setSelectedVersion] = useState<ConfigVersion | null>(null);
  const [showRollbackDialog, setShowRollbackDialog] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState<ConfigVersion | null>(null);

  // Mock version history
  const versionHistory: ConfigVersion[] = [
    {
      id: 'v5',
      version: 5,
      timestamp: '2025-01-14T16:30:00Z',
      userId: 'admin@company.com',
      userName: 'Admin User',
      changeType: 'enforcement_change',
      packName: 'PII Detection & Redaction',
      status: 'active',
      reason: 'Enabling monitor mode for new SSN detection threshold testing',
      changes: [
        {
          controlName: 'SSN Pattern Detection',
          field: 'enforcementMode',
          oldValue: 'enforce',
          newValue: 'monitor',
          impact: 'high'
        },
        {
          controlName: 'SSN Pattern Detection',
          field: 'threshold',
          oldValue: 0.85,
          newValue: 0.95,
          impact: 'medium'
        }
      ]
    },
    {
      id: 'v4',
      version: 4,
      timestamp: '2025-01-14T14:15:00Z',
      userId: 'security-lead@company.com',
      userName: 'Sarah Chen',
      changeType: 'alert_routing',
      packName: 'PII Detection & Redaction',
      status: 'historical',
      reason: 'Added PagerDuty alerts for credit card detection',
      changes: [
        {
          controlName: 'Credit Card Masking',
          field: 'alertPagerDuty',
          oldValue: false,
          newValue: true,
          impact: 'low'
        },
        {
          controlName: 'Credit Card Masking',
          field: 'alertSlack',
          oldValue: true,
          newValue: true,
          impact: 'low'
        }
      ]
    },
    {
      id: 'v3',
      version: 3,
      timestamp: '2025-01-14T10:00:00Z',
      userId: 'compliance-admin@company.com',
      userName: 'James Wilson',
      changeType: 'control_update',
      packName: 'PII Detection & Redaction',
      status: 'historical',
      reason: 'Increased log retention for compliance audit',
      changes: [
        {
          field: 'logRetentionDays',
          oldValue: 30,
          newValue: 90,
          impact: 'medium'
        }
      ]
    },
    {
      id: 'v2',
      version: 2,
      timestamp: '2025-01-12T09:30:00Z',
      userId: 'dev-user@company.com',
      userName: 'Developer User',
      changeType: 'control_update',
      packName: 'PII Detection & Redaction',
      status: 'historical',
      reason: 'Disabled phone number filtering per product requirements',
      changes: [
        {
          controlName: 'Phone Number Filtering',
          field: 'enabled',
          oldValue: true,
          newValue: false,
          impact: 'medium'
        }
      ]
    },
    {
      id: 'v1',
      version: 1,
      timestamp: '2025-01-10T15:00:00Z',
      userId: 'admin@company.com',
      userName: 'Admin User',
      changeType: 'deployment',
      packName: 'PII Detection & Redaction',
      status: 'historical',
      reason: 'Initial deployment with default configuration',
      changes: [
        {
          field: 'deployment',
          oldValue: null,
          newValue: 'deployed',
          impact: 'high'
        }
      ]
    }
  ];

  const handleRollback = (version: ConfigVersion) => {
    setRollbackTarget(version);
    setShowRollbackDialog(true);
  };

  const confirmRollback = () => {
    if (!rollbackTarget) return;

    // Log rollback event
    console.log('[AUDIT] Configuration rollback:', {
      timestamp: new Date().toISOString(),
      action: 'config_rollback',
      rollbackFrom: versionHistory[0].version,
      rollbackTo: rollbackTarget.version,
      userId: 'demo@company.com',
      reason: 'Manual rollback via configuration history'
    });

    toast.success('Configuration rolled back', {
      description: `Reverted to version ${rollbackTarget.version} from ${new Date(rollbackTarget.timestamp).toLocaleString()}`
    });

    setShowRollbackDialog(false);
    setRollbackTarget(null);
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'deployment': return Activity;
      case 'control_update': return FileText;
      case 'enforcement_change': return AlertTriangle;
      case 'alert_routing': return RefreshCw;
      case 'rollback': return RotateCcw;
      default: return GitBranch;
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'deployment': return 'bg-blue-100 text-blue-800';
      case 'control_update': return 'bg-purple-100 text-purple-800';
      case 'enforcement_change': return 'bg-yellow-100 text-yellow-800';
      case 'alert_routing': return 'bg-green-100 text-green-800';
      case 'rollback': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatValue = (value: any) => {
    if (value === null) return 'None';
    if (typeof value === 'boolean') return value ? 'Enabled' : 'Disabled';
    if (typeof value === 'number') return value.toString();
    return value;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Configuration History</h3>
          <p className="text-sm text-muted-foreground">
            Track and rollback changes to this policy pack
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <GitBranch className="w-3 h-3" />
          {versionHistory.length} versions
        </Badge>
      </div>

      {/* Version Timeline */}
      <div className="space-y-3">
        {versionHistory.map((version, index) => {
          const Icon = getChangeTypeIcon(version.changeType);
          const isActive = version.status === 'active';
          const canRollback = index > 0; // Can't rollback to current version

          return (
            <Card key={version.id} className={isActive ? 'border-blue-500 border-2' : ''}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">Version {version.version}</h4>
                          {isActive && (
                            <Badge className="bg-blue-600 text-xs">Current</Badge>
                          )}
                          <Badge className={`${getChangeTypeColor(version.changeType)} text-xs`}>
                            {version.changeType.replace('_', ' ')}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(version.timestamp).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{version.userName}</span>
                          </div>
                        </div>

                        {version.reason && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            "{version.reason}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs gap-1"
                        onClick={() => setSelectedVersion(selectedVersion?.id === version.id ? null : version)}
                      >
                        <Eye className="w-3 h-3" />
                        {selectedVersion?.id === version.id ? 'Hide' : 'View'}
                      </Button>
                      {canRollback && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={() => handleRollback(version)}
                        >
                          <RotateCcw className="w-3 h-3" />
                          Rollback
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Changes Summary */}
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      {version.changes.length} {version.changes.length === 1 ? 'change' : 'changes'}
                    </Badge>
                    {version.changes.map((change, i) => (
                      <Badge key={i} className={`${getImpactColor(change.impact)} text-xs`}>
                        {change.impact} impact
                      </Badge>
                    ))}
                  </div>

                  {/* Expanded Details */}
                  {selectedVersion?.id === version.id && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg border">
                      <h5 className="text-xs font-semibold mb-2">Changes:</h5>
                      <div className="space-y-2">
                        {version.changes.map((change, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              {change.controlName && (
                                <p className="font-semibold text-blue-700">{change.controlName}</p>
                              )}
                              <p className="text-muted-foreground">
                                <span className="font-medium">{change.field}:</span>{' '}
                                <span className="line-through">{formatValue(change.oldValue)}</span>
                                {' â†’ '}
                                <span className="text-green-700 font-semibold">{formatValue(change.newValue)}</span>
                              </p>
                            </div>
                            <Badge className={`${getImpactColor(change.impact)} text-[10px]`}>
                              {change.impact}
                            </Badge>
                          </div>
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

      {/* Rollback Confirmation Dialog */}
      <Dialog open={showRollbackDialog} onOpenChange={setShowRollbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-orange-600" />
              Confirm Configuration Rollback
            </DialogTitle>
            <DialogDescription>
              This will revert your policy pack configuration to a previous version
            </DialogDescription>
          </DialogHeader>

          {rollbackTarget && (
            <div className="space-y-4 py-4">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-sm text-orange-900">
                  <p className="font-semibold mb-2">Impact of Rollback:</p>
                  <ul className="text-xs space-y-1 ml-4 list-disc">
                    <li>Current configuration (v{versionHistory[0].version}) will be saved as historical</li>
                    <li>Version {rollbackTarget.version} will become active immediately</li>
                    <li>This action will be logged in the audit trail</li>
                    <li>You can rollback again if needed</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-semibold mb-2">Rolling back to:</h4>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Version:</span> {rollbackTarget.version}</p>
                  <p><span className="font-medium">Date:</span> {new Date(rollbackTarget.timestamp).toLocaleString()}</p>
                  <p><span className="font-medium">Changed by:</span> {rollbackTarget.userName}</p>
                  <p><span className="font-medium">Changes:</span> {rollbackTarget.changes.length} configuration items</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-semibold mb-2 text-blue-900">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  What will be restored:
                </h4>
                <div className="space-y-1">
                  {rollbackTarget.changes.map((change, i) => (
                    <div key={i} className="text-xs text-blue-800">
                      â€¢ {change.controlName && `${change.controlName} - `}
                      {change.field}: <span className="font-semibold">{formatValue(change.newValue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRollbackDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRollback} className="bg-orange-600 hover:bg-orange-700 gap-2">
              <RotateCcw className="w-4 h-4" />
              Confirm Rollback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
