import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  Calendar,
  TrendingUp,
  Activity,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Award,
  BarChart3,
  Filter,
  Search,
  Edit,
  Trash2,
  Power,
  Coffee,
  Moon,
  Briefcase,
  Home,
  AlertTriangle,
  ChevronRight,
  Plus,
  RefreshCw,
  Zap,
  Target,
  Building
} from 'lucide-react';
import { toast } from 'sonner';
import { AddSupervisorWorkflow } from './AddSupervisorWorkflow';
import { EditSupervisorWorkflow } from './EditSupervisorWorkflow';

interface Supervisor {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'available' | 'busy' | 'offline' | 'away' | 'in-meeting';
  currentLoad: number;
  maxCapacity: number;
  skills: string[];
  avgResponseTime: number;
  totalEscalationsHandled: number;
  satisfactionScore: number;
  shiftStart?: string;
  shiftEnd?: string;
  timezone: string;
  notifications: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
    slack: boolean;
  };
  autoAccept: boolean;
  outOfOffice: {
    enabled: boolean;
    startDate?: string;
    endDate?: string;
    backup?: string;
  };
}

export function SupervisorManagement() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([
    {
      id: 'SUP-001',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Senior AI Governance Lead',
      department: 'Risk & Compliance',
      status: 'available',
      currentLoad: 2,
      maxCapacity: 5,
      skills: ['Financial Risk', 'EU AI Act', 'Model Validation'],
      avgResponseTime: 12,
      totalEscalationsHandled: 234,
      satisfactionScore: 4.8,
      shiftStart: '09:00',
      shiftEnd: '17:00',
      timezone: 'PST',
      notifications: { email: true, inApp: true, sms: true, slack: true },
      autoAccept: true,
      outOfOffice: { enabled: false }
    },
    {
      id: 'SUP-002',
      name: 'Marcus Rodriguez',
      email: 'marcus.r@company.com',
      role: 'AI Ethics Officer',
      department: 'Ethics & Trust',
      status: 'busy',
      currentLoad: 4,
      maxCapacity: 4,
      skills: ['Bias Detection', 'Fairness Review', 'Privacy'],
      avgResponseTime: 18,
      totalEscalationsHandled: 189,
      satisfactionScore: 4.6,
      shiftStart: '10:00',
      shiftEnd: '18:00',
      timezone: 'EST',
      notifications: { email: true, inApp: true, sms: false, slack: true },
      autoAccept: false,
      outOfOffice: { enabled: false }
    },
    {
      id: 'SUP-003',
      name: 'Dr. Aisha Patel',
      email: 'aisha.patel@company.com',
      role: 'Chief AI Risk Officer',
      department: 'Risk & Compliance',
      status: 'available',
      currentLoad: 1,
      maxCapacity: 3,
      skills: ['High-Risk AI', 'Regulatory Compliance', 'Executive Review'],
      avgResponseTime: 8,
      totalEscalationsHandled: 156,
      satisfactionScore: 4.9,
      shiftStart: '08:00',
      shiftEnd: '16:00',
      timezone: 'GMT',
      notifications: { email: true, inApp: true, sms: true, slack: false },
      autoAccept: true,
      outOfOffice: { enabled: false }
    },
    {
      id: 'SUP-004',
      name: 'James Wilson',
      email: 'james.w@company.com',
      role: 'AI Security Lead',
      department: 'Security',
      status: 'in-meeting',
      currentLoad: 2,
      maxCapacity: 5,
      skills: ['Security Review', 'Threat Analysis', 'Data Protection'],
      avgResponseTime: 15,
      totalEscalationsHandled: 201,
      satisfactionScore: 4.7,
      shiftStart: '09:00',
      shiftEnd: '17:00',
      timezone: 'CST',
      notifications: { email: true, inApp: true, sms: true, slack: true },
      autoAccept: true,
      outOfOffice: { enabled: false }
    },
    {
      id: 'SUP-005',
      name: 'Elena Kowalski',
      email: 'elena.k@company.com',
      role: 'Data Governance Manager',
      department: 'Data & Privacy',
      status: 'offline',
      currentLoad: 0,
      maxCapacity: 4,
      skills: ['Data Privacy', 'GDPR', 'Data Quality'],
      avgResponseTime: 20,
      totalEscalationsHandled: 145,
      satisfactionScore: 4.5,
      shiftStart: '07:00',
      shiftEnd: '15:00',
      timezone: 'CET',
      notifications: { email: true, inApp: false, sms: false, slack: true },
      autoAccept: false,
      outOfOffice: { 
        enabled: true, 
        startDate: '2025-10-08',
        endDate: '2025-10-12',
        backup: 'SUP-001'
      }
    }
  ]);

  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusConfig = {
    available: { color: 'bg-green-500', label: 'Available', icon: CheckCircle },
    busy: { color: 'bg-red-500', label: 'Busy', icon: AlertCircle },
    offline: { color: 'bg-gray-400', label: 'Offline', icon: Power },
    away: { color: 'bg-yellow-500', label: 'Away', icon: Coffee },
    'in-meeting': { color: 'bg-orange-500', label: 'In Meeting', icon: Briefcase }
  };

  const getAvailableSupervisors = () => {
    return supervisors.filter(s => 
      s.status === 'available' && 
      s.currentLoad < s.maxCapacity &&
      !s.outOfOffice.enabled
    );
  };

  const getBestSupervisorForSkill = (skill: string) => {
    const available = getAvailableSupervisors();
    const withSkill = available.filter(s => s.skills.some(sk => sk.toLowerCase().includes(skill.toLowerCase())));
    
    if (withSkill.length === 0) return null;
    
    // Sort by: 1) current load (lower is better), 2) avg response time (lower is better), 3) satisfaction score (higher is better)
    return withSkill.sort((a, b) => {
      const loadDiff = (a.currentLoad / a.maxCapacity) - (b.currentLoad / b.maxCapacity);
      if (Math.abs(loadDiff) > 0.1) return loadDiff;
      
      const timeDiff = a.avgResponseTime - b.avgResponseTime;
      if (Math.abs(timeDiff) > 5) return timeDiff;
      
      return b.satisfactionScore - a.satisfactionScore;
    })[0];
  };

  const updateSupervisorStatus = (id: string, status: Supervisor['status']) => {
    setSupervisors(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast.success('Status updated', {
      description: `Supervisor status changed to ${status}`
    });
  };

  const handleAddSupervisor = (newSupervisor: Supervisor) => {
    setSupervisors(prev => [...prev, newSupervisor]);
    setShowAddDialog(false);
    toast.success('Supervisor added', {
      description: `${newSupervisor.name} has been added to the supervisor roster`
    });
  };

  const handleUpdateSupervisor = (updatedSupervisor: Supervisor) => {
    setSupervisors(prev => prev.map(s => s.id === updatedSupervisor.id ? updatedSupervisor : s));
    setSelectedSupervisor(null);
    toast.success('Supervisor updated', {
      description: `${updatedSupervisor.name}'s configuration has been updated`
    });
  };

  const handleDeleteSupervisor = (supervisorId: string) => {
    const supervisor = supervisors.find(s => s.id === supervisorId);
    setSupervisors(prev => prev.filter(s => s.id !== supervisorId));
    setSelectedSupervisor(null);
    toast.success('Supervisor deleted', {
      description: `${supervisor?.name} has been removed from the roster`
    });
  };

  const filteredSupervisors = supervisors.filter(s => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const availableCount = supervisors.filter(s => s.status === 'available' && s.currentLoad < s.maxCapacity && !s.outOfOffice.enabled).length;
  const busyCount = supervisors.filter(s => s.status === 'busy' || s.currentLoad >= s.maxCapacity).length;
  const offlineCount = supervisors.filter(s => s.status === 'offline').length;
  const totalCapacity = supervisors.reduce((sum, s) => sum + s.maxCapacity, 0);
  const currentLoad = supervisors.reduce((sum, s) => sum + s.currentLoad, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Supervisor Management</h1>
        <p className="text-muted-foreground">
          Manage supervisor availability, capacity, and intelligent routing for HITL escalations
        </p>
      </div>

      {/* System Health Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Available Now</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {availableCount} / {supervisors.length}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{availableCount}</span>
              <span className="text-sm text-muted-foreground">supervisors</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">System Capacity</span>
              </div>
              <Badge variant="outline">
                {Math.round((currentLoad / totalCapacity) * 100)}%
              </Badge>
            </div>
            <Progress value={(currentLoad / totalCapacity) * 100} className="h-2 mb-2" />
            <span className="text-xs text-muted-foreground">
              {currentLoad} / {totalCapacity} slots used
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">At Capacity</span>
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {busyCount}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{busyCount}</span>
              <span className="text-sm text-muted-foreground">busy</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Power className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Offline</span>
              </div>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                {offlineCount}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{offlineCount}</span>
              <span className="text-sm text-muted-foreground">offline</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {availableCount === 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Critical:</strong> No supervisors currently available for escalations. New escalations will be queued until someone becomes available.
          </AlertDescription>
        </Alert>
      )}

      {availableCount > 0 && availableCount <= 2 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Warning:</strong> Only {availableCount} supervisor{availableCount === 1 ? '' : 's'} available. Consider enabling backup supervisors or extending shifts.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="roster" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roster" className="gap-2">
            <Users className="w-4 h-4" />
            Supervisor Roster
          </TabsTrigger>
          <TabsTrigger value="routing" className="gap-2">
            <Zap className="w-4 h-4" />
            Smart Routing
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="w-4 h-4" />
            Shift Schedule
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Supervisor Roster */}
        <TabsContent value="roster" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or skill..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="available">Available Only</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="in-meeting">In Meeting</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowAddDialog(true)} className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Supervisor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Supervisor List */}
          <div className="grid gap-4">
            {filteredSupervisors.map(supervisor => {
              const StatusIcon = statusConfig[supervisor.status].icon;
              const capacityPercent = (supervisor.currentLoad / supervisor.maxCapacity) * 100;
              
              return (
                <Card key={supervisor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar and Status */}
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {supervisor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig[supervisor.status].color} rounded-full border-2 border-white`}></div>
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{supervisor.name}</h3>
                            <p className="text-sm text-muted-foreground">{supervisor.role}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${statusConfig[supervisor.status].color} text-white border-0`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[supervisor.status].label}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground truncate">{supervisor.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Building className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{supervisor.department}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {supervisor.shiftStart} - {supervisor.shiftEnd} {supervisor.timezone}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Capacity</span>
                                <span className="font-medium">
                                  {supervisor.currentLoad} / {supervisor.maxCapacity}
                                </span>
                              </div>
                              <Progress 
                                value={capacityPercent} 
                                className={`h-2 ${capacityPercent >= 100 ? '[&>div]:bg-red-500' : capacityPercent >= 80 ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`} 
                              />
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{supervisor.avgResponseTime}m avg</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-3 h-3 text-yellow-500" />
                                <span className="text-muted-foreground">{supervisor.satisfactionScore}/5.0</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {supervisor.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Out of Office Alert */}
                        {supervisor.outOfOffice.enabled && (
                          <Alert className="mb-3 py-2">
                            <Home className="w-4 h-4" />
                            <AlertDescription className="text-sm">
                              Out of office {supervisor.outOfOffice.startDate} - {supervisor.outOfOffice.endDate}
                              {supervisor.outOfOffice.backup && ` â€¢ Backup: ${supervisors.find(s => s.id === supervisor.outOfOffice.backup)?.name}`}
                            </AlertDescription>
                          </Alert>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Select 
                            value={supervisor.status} 
                            onValueChange={(val) => updateSupervisorStatus(supervisor.id, val as Supervisor['status'])}
                          >
                            <SelectTrigger className="w-[150px] h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                  Available
                                </div>
                              </SelectItem>
                              <SelectItem value="busy">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-3 h-3 text-red-600" />
                                  Busy
                                </div>
                              </SelectItem>
                              <SelectItem value="away">
                                <div className="flex items-center gap-2">
                                  <Coffee className="w-3 h-3 text-yellow-600" />
                                  Away
                                </div>
                              </SelectItem>
                              <SelectItem value="in-meeting">
                                <div className="flex items-center gap-2">
                                  <Briefcase className="w-3 h-3 text-orange-600" />
                                  In Meeting
                                </div>
                              </SelectItem>
                              <SelectItem value="offline">
                                <div className="flex items-center gap-2">
                                  <Power className="w-3 h-3 text-gray-600" />
                                  Offline
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedSupervisor(supervisor)}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>

                          <div className="flex items-center gap-1 ml-auto">
                            {supervisor.notifications.email && <Mail className="w-4 h-4 text-muted-foreground" />}
                            {supervisor.notifications.slack && <MessageSquare className="w-4 h-4 text-muted-foreground" />}
                            {supervisor.notifications.sms && <Phone className="w-4 h-4 text-muted-foreground" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Smart Routing */}
        <TabsContent value="routing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Intelligent Routing Engine
              </CardTitle>
              <CardDescription>
                Automatically route escalations to the best available supervisor based on skills, workload, and response time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Routing Rules */}
              <div>
                <h4 className="font-medium mb-3">Routing Priority Rules</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</div>
                    <div>
                      <div className="font-medium text-blue-900">Match Required Skills</div>
                      <div className="text-blue-700">Find supervisors with matching expertise for the escalation type</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</div>
                    <div>
                      <div className="font-medium text-blue-900">Check Availability</div>
                      <div className="text-blue-700">Filter out offline, busy (at capacity), or out-of-office supervisors</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</div>
                    <div>
                      <div className="font-medium text-blue-900">Balance Workload</div>
                      <div className="text-blue-700">Prefer supervisors with lower current load relative to their capacity</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</div>
                    <div>
                      <div className="font-medium text-blue-900">Optimize Response Time</div>
                      <div className="text-blue-700">Among equal candidates, choose supervisor with fastest average response time</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">5</div>
                    <div>
                      <div className="font-medium text-blue-900">Fallback to Queue</div>
                      <div className="text-blue-700">If no match found, add to escalation queue and notify when someone becomes available</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Routing */}
              <div className="p-4 border rounded-lg bg-slate-50">
                <h4 className="font-medium mb-3">Test Routing Logic</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Select Skill Required</Label>
                    <Select defaultValue="financial">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Risk</SelectItem>
                        <SelectItem value="bias">Bias Detection</SelectItem>
                        <SelectItem value="security">Security Review</SelectItem>
                        <SelectItem value="privacy">Data Privacy</SelectItem>
                        <SelectItem value="compliance">Regulatory Compliance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full gap-2" onClick={() => {
                    const best = getBestSupervisorForSkill('Financial Risk');
                    if (best) {
                      toast.success('Best match found!', {
                        description: `${best.name} - ${best.currentLoad}/${best.maxCapacity} capacity, ${best.avgResponseTime}m avg response`
                      });
                    } else {
                      toast.error('No available supervisors', {
                        description: 'Escalation would be queued until someone becomes available'
                      });
                    }
                  }}>
                    <Target className="w-4 h-4" />
                    Find Best Supervisor
                  </Button>
                </div>
              </div>

              {/* Current Routing Stats */}
              <div>
                <h4 className="font-medium mb-3">Routing Performance (Last 30 Days)</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Auto-Routed</div>
                    <div className="text-2xl font-semibold">94%</div>
                    <div className="text-xs text-green-600">+5% from last month</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Avg Assignment Time</div>
                    <div className="text-2xl font-semibold">2.3s</div>
                    <div className="text-xs text-green-600">-0.5s improvement</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Queued Items</div>
                    <div className="text-2xl font-semibold">3</div>
                    <div className="text-xs text-muted-foreground">Currently waiting</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shift Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Coverage Schedule
              </CardTitle>
              <CardDescription>
                Ensure 24/7 coverage with supervisor shift scheduling and on-call rotations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Clock className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Current Coverage:</strong> 6am - 6pm PST (12 hours) â€¢ 
                    <span className="text-orange-600 ml-1">No overnight coverage configured</span>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-medium">Today's Schedule (Oct 10, 2025)</h4>
                  {supervisors.filter(s => s.shiftStart && s.shiftEnd).map(supervisor => (
                    <div key={supervisor.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {supervisor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{supervisor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {supervisor.shiftStart} - {supervisor.shiftEnd} {supervisor.timezone}
                        </div>
                      </div>
                      <Badge variant={supervisor.status === 'available' ? 'default' : 'outline'}>
                        {supervisor.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <Calendar className="w-4 h-4" />
                  Configure Shift Rotations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Supervisor Performance Metrics
              </CardTitle>
              <CardDescription>
                Track response times, satisfaction scores, and escalation handling efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supervisors.map(supervisor => (
                  <div key={supervisor.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {supervisor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{supervisor.name}</div>
                          <div className="text-xs text-muted-foreground">{supervisor.role}</div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        <Award className="w-3 h-3 mr-1" />
                        {supervisor.satisfactionScore}/5.0
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Total Handled</div>
                        <div className="font-semibold">{supervisor.totalEscalationsHandled}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Avg Response Time</div>
                        <div className="font-semibold">{supervisor.avgResponseTime} minutes</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Satisfaction Score</div>
                        <Progress value={supervisor.satisfactionScore * 20} className="h-2 mb-1" />
                        <div className="font-semibold">{supervisor.satisfactionScore}/5.0</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Supervisor Workflow Dialog */}
      <AddSupervisorWorkflow
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onComplete={handleAddSupervisor}
      />

      {/* Edit Supervisor Workflow Dialog */}
      <EditSupervisorWorkflow
        isOpen={!!selectedSupervisor}
        onClose={() => setSelectedSupervisor(null)}
        onComplete={handleUpdateSupervisor}
        onDelete={handleDeleteSupervisor}
        supervisor={selectedSupervisor}
        availableSupervisors={supervisors}
      />
    </div>
  );
}