import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft, 
  Database, 
  ShieldCheck, 
  Clock, 
  Shield, 
  Cloud, 
  Server,
  Info
} from 'lucide-react';

interface PLCYCloudSetupProps {
  mode: 'backups' | 'audit';
  onClose: () => void;
  onComplete?: () => void;
  onBackupsChange?: (enabled: boolean) => void;
  onAuditChange?: (enabled: boolean) => void;
}

export function PLCYCloudSetup({ mode, onClose, onComplete, onBackupsChange, onAuditChange }: PLCYCloudSetupProps) {
  const [selectedMode, setSelectedMode] = useState<'backups' | 'audit'>(mode);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [retentionPeriod, setRetentionPeriod] = useState('30');
  const [storageLocation, setStorageLocation] = useState('plcy-cloud');
  const [backupItems, setBackupItems] = useState({
    aiSystemConfigurations: true,
    complianceEvidence: true,
    auditLogs: true,
    controlTestResults: true,
    dtiaDocuments: true,
  });

  const handleEnableBackups = () => {
    // Here you would actually enable the backups
    if (onBackupsChange) {
      onBackupsChange(true);
    }
    if (onComplete) {
      onComplete();
    }
    onClose();
  };

  const handleEnableAudit = () => {
    // Here you would actually enable the audit
    if (onAuditChange) {
      onAuditChange(true);
    }
    if (onComplete) {
      onComplete();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">PLCY Cloud Setup</h2>
              <p className="text-sm text-slate-600">
                Enterprise-grade infrastructure for your AI governance platform
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedMode('backups')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedMode === 'backups'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Database className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Backups</h3>
              <p className="text-sm text-slate-600">
                Automated backups with configurable retention
              </p>
            </button>

            <button
              onClick={() => setSelectedMode('audit')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedMode === 'audit'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Immutable Audit</h3>
              <p className="text-sm text-slate-600">
                Tamper-proof audit logging with cryptographic verification
              </p>
            </button>
          </div>

          {selectedMode === 'backups' && (
            <div className="space-y-6 mt-6">
              {/* Backup Configuration Section */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Backup Configuration</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Configure your automated backup settings
                </p>

                {/* Backup Frequency */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-slate-900 mb-3 block">
                    Backup Frequency
                  </Label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: 'hourly', label: 'Hourly', icon: Clock },
                      { value: 'daily', label: 'Daily', icon: Clock },
                      { value: 'weekly', label: 'Weekly', icon: Clock },
                      { value: 'custom', label: 'Custom', icon: Clock },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setBackupFrequency(value)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          backupFrequency === value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Scheduled at 02:00 UTC daily
                  </p>
                </div>

                {/* Retention Period */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-slate-900 mb-3 block">
                    Retention Period
                  </Label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: '7', label: '7 days' },
                      { value: '30', label: '30 days' },
                      { value: '90', label: '90 days' },
                      { value: '365', label: '365 days' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setRetentionPeriod(value)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          retentionPeriod === value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* What to Backup */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-slate-900 mb-3 block">
                    What to Backup
                  </Label>
                  <div className="space-y-3">
                    {[
                      { key: 'aiSystemConfigurations', label: 'AI System Configurations' },
                      { key: 'complianceEvidence', label: 'Compliance Evidence & Reports' },
                      { key: 'auditLogs', label: 'Audit Logs' },
                      { key: 'controlTestResults', label: 'Control Test Results' },
                      { key: 'dtiaDocuments', label: 'DTIA Documents' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                        <Checkbox
                          checked={backupItems[key as keyof typeof backupItems]}
                          onCheckedChange={(checked) =>
                            setBackupItems((prev) => ({ ...prev, [key]: checked }))
                          }
                          id={key}
                        />
                        <label htmlFor={key} className="text-sm text-slate-700 cursor-pointer flex-1">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storage Location */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-slate-900 mb-3 block">
                    Storage Location
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStorageLocation('plcy-cloud')}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        storageLocation === 'plcy-cloud'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Cloud className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                      <div className="font-medium text-sm mb-1">PLCY Cloud</div>
                      <div className="text-xs text-slate-600">Easiest, fully managed</div>
                      {storageLocation === 'plcy-cloud' && (
                        <div className="mt-2 text-xs font-medium text-blue-700">Recommended</div>
                      )}
                    </button>

                    <button
                      onClick={() => setStorageLocation('bring-your-own')}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        storageLocation === 'bring-your-own'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Server className="w-5 h-5 mx-auto mb-2 text-slate-600" />
                      <div className="font-medium text-sm mb-1">Bring Your Own</div>
                      <div className="text-xs text-slate-600">AWS S3, GCS, Azure Blob</div>
                    </button>
                  </div>
                </div>

                {/* Enterprise Security Info */}
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-1">Enterprise Security</h4>
                    <p className="text-sm text-blue-800">
                      All backups are encrypted at rest (AES-256) and in transit (TLS 1.3). Your data is stored in
                      geo-redundant data centers with 99.99% uptime SLA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleEnableBackups}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Enable Backups
                </Button>
              </div>
            </div>
          )}

          {selectedMode === 'audit' && (
            <div className="space-y-6 mt-6">
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Immutable Audit Logging</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Cryptographically verified audit trails that cannot be tampered with or deleted.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left mb-6">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-medium text-sm mb-1">Tamper-Proof</h4>
                    <p className="text-xs text-slate-600">
                      Blockchain-inspired verification
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-medium text-sm mb-1">Compliance Ready</h4>
                    <p className="text-xs text-slate-600">
                      SOC 2, ISO 27001 certified
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleEnableAudit}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Enable Immutable Audit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}