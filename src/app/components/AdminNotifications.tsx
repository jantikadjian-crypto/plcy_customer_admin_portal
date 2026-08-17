import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Settings,
  RotateCcw,
  Eye,
  Clock,
  User,
  Package,
  Activity,
  Mail,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export interface AdminNotification {
  id: string;
  timestamp: string;
  type: 'control_modified' | 'pack_deployed' | 'enforcement_changed' | 'rollback' | 'alert_routing_changed';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  packName: string;
  controlName?: string;
  userId: string;
  userName: string;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  reason?: string;
  read: boolean;
  dismissed: boolean;
}

export function AdminNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<AdminNotification | null>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: 'notif-001',
      timestamp: '2025-01-14T16:30:00Z',
      type: 'enforcement_changed',
      severity: 'warning',
      title: 'Enforcement Mode Changed to Monitor',
      message: 'SSN Pattern Detection switched from "Enforce" to "Monitor" mode',
      packName: 'PII Detection & Redaction',
      controlName: 'SSN Pattern Detection',
      userId: 'admin@company.com',
      userName: 'Admin User',
      changes: [
        { field: 'enforcementMode', oldValue: 'enforce', newValue: 'monitor' },
        { field: 'threshold', oldValue: 0.85, newValue: 0.95 }
      ],
      reason: 'Testing new threshold before full enforcement',
      read: false,
      dismissed: false
    },
    {
      id: 'notif-002',
      timestamp: '2025-01-14T14:15:00Z',
      type: 'alert_routing_changed',
      severity: 'info',
      title: 'Alert Routing Updated',
      message: 'PagerDuty alerts enabled for Credit Card Masking control',
      packName: 'PII Detection & Redaction',
      controlName: 'Credit Card Masking',
      userId: 'security-lead@company.com',
      userName: 'Sarah Chen',
      changes: [
        { field: 'alertPagerDuty', oldValue: false, newValue: true }
      ],
      read: false,
      dismissed: false
    },
    {
      id: 'notif-003',
      timestamp: '2025-01-14T10:00:00Z',
      type: 'control_modified',
      severity: 'info',
      title: 'Log Retention Extended',
      message: 'Log retention period increased from 30 to 90 days',
      packName: 'PII Detection & Redaction',
      userId: 'compliance-admin@company.com',
      userName: 'James Wilson',
      changes: [
        { field: 'logRetentionDays', oldValue: 30, newValue: 90 }
      ],
      reason: 'Compliance audit requirement',
      read: true,
      dismissed: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read && !n.dismissed).length;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'control_modified': return Settings;
      case 'pack_deployed': return Package;
      case 'enforcement_changed': return Shield;
      case 'rollback': return RotateCcw;
      case 'alert_routing_changed': return Bell;
      default: return Activity;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, dismissed: true } : n
    ));
    toast.success('Notification dismissed');
  };

  const dismissAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, dismissed: true })));
    toast.success('All notifications dismissed');
  };

  const handleNotificationClick = (notification: AdminNotification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
  };

  const activeNotifications = notifications.filter(n => !n.dismissed);

  const formatValue = (value: any) => {
    if (value === null) return 'None';
    if (typeof value === 'boolean') return value ? 'Enabled' : 'Disabled';
    if (typeof value === 'number') return value.toString();
    return value;
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 relative"
          onClick={() => setIsOpen(true)}
        >
          <Bell className="w-4 h-4" />
          <span className="hidden md:inline">Notifications</span>
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <DialogTitle>Admin Notifications</DialogTitle>
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount} new</Badge>
                )}
              </div>
              {activeNotifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={dismissAll}
                  className="text-xs"
                >
                  Dismiss All
                </Button>
              )}
            </div>
            <DialogDescription>
              Real-time alerts for policy pack configuration changes
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            {activeNotifications.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeNotifications.map((notification) => {
                  const SeverityIcon = getSeverityIcon(notification.severity);
                  const TypeIcon = getTypeIcon(notification.type);

                  return (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        !notification.read ? 'border-blue-500 border-l-4' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(notification.severity)}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissNotification(notification.id);
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                <span>{notification.packName}</span>
                              </div>
                              {notification.controlName && (
                                <div className="flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  <span>{notification.controlName}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{notification.userName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(notification.timestamp).toLocaleString()}</span>
                              </div>
                            </div>

                            {notification.reason && (
                              <div className="mt-2 p-2 bg-slate-50 rounded text-xs italic">
                                Reason: {notification.reason}
                              </div>
                            )}

                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotificationClick(notification);
                                }}
                              >
                                <Eye className="w-3 h-3" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // In production, navigate to configuration history
                                  toast.info('Opening configuration history...');
                                }}
                              >
                                <RotateCcw className="w-3 h-3" />
                                View History
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Notification Details Dialog */}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = getTypeIcon(selectedNotification.type);
                  return <Icon className="w-5 h-5" />;
                })()}
                {selectedNotification.title}
              </DialogTitle>
              <DialogDescription>
                {selectedNotification.message}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Policy Pack</p>
                  <p className="text-sm font-medium">{selectedNotification.packName}</p>
                </div>
                {selectedNotification.controlName && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Control</p>
                    <p className="text-sm font-medium">{selectedNotification.controlName}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Changed By</p>
                  <p className="text-sm font-medium">{selectedNotification.userName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                  <p className="text-sm font-medium">
                    {new Date(selectedNotification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Changes */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Changes Made:</h4>
                <div className="space-y-2">
                  {selectedNotification.changes.map((change, i) => (
                    <div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-1">{change.field}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="line-through text-red-700">{formatValue(change.oldValue)}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold text-green-700">{formatValue(change.newValue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reason */}
              {selectedNotification.reason && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs font-semibold text-yellow-900 mb-1">Justification:</p>
                  <p className="text-xs text-yellow-800 italic">"{selectedNotification.reason}"</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => {
                    toast.info('Opening configuration history...');
                    setSelectedNotification(null);
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                  View Full History
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => {
                    dismissNotification(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                >
                  <X className="w-4 h-4" />
                  Dismiss
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
