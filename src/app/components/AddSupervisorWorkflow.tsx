import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import {
  User,
  Mail,
  Briefcase,
  Building,
  ChevronRight,
  ChevronLeft,
  Check,
  Shield,
  Clock,
  Bell,
  Settings,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Globe,
  Zap,
  Plus,
  X
} from 'lucide-react';

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

interface AddSupervisorWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (supervisor: Supervisor) => void;
}

const COMMON_SKILLS = [
  'Financial Risk',
  'EU AI Act',
  'Model Validation',
  'Bias Detection',
  'Fairness Review',
  'Privacy',
  'High-Risk AI',
  'Regulatory Compliance',
  'Executive Review',
  'Security Review',
  'Threat Analysis',
  'Data Protection',
  'Data Privacy',
  'GDPR',
  'Data Quality',
  'Model Monitoring',
  'Algorithmic Transparency',
  'Ethical AI',
  'Explainability',
  'Safety Assessment'
];

const DEPARTMENTS = [
  'Risk & Compliance',
  'Ethics & Trust',
  'Security',
  'Data & Privacy',
  'Legal',
  'Engineering',
  'Product',
  'Executive'
];

const TIMEZONES = [
  'PST',
  'MST',
  'CST',
  'EST',
  'GMT',
  'CET',
  'IST',
  'JST',
  'AEST'
];

export function AddSupervisorWorkflow({ isOpen, onClose, onComplete }: AddSupervisorWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    skills: [] as string[],
    maxCapacity: 5,
    timezone: 'PST',
    shiftStart: '09:00',
    shiftEnd: '17:00',
    notifications: {
      email: true,
      inApp: true,
      sms: false,
      slack: false
    },
    autoAccept: false
  });

  const [customSkill, setCustomSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Basic Info', icon: User },
    { number: 2, title: 'Skills', icon: Award },
    { number: 3, title: 'Capacity', icon: Users },
    { number: 4, title: 'Schedule', icon: Clock },
    { number: 5, title: 'Notifications', icon: Bell },
    { number: 6, title: 'Review', icon: CheckCircle }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        if (!formData.department) newErrors.department = 'Department is required';
        break;
      case 2:
        if (formData.skills.length === 0) {
          newErrors.skills = 'Please select at least one skill';
        }
        break;
      case 3:
        if (formData.maxCapacity < 1 || formData.maxCapacity > 20) {
          newErrors.maxCapacity = 'Capacity must be between 1 and 20';
        }
        break;
      case 4:
        if (!formData.shiftStart) newErrors.shiftStart = 'Start time is required';
        if (!formData.shiftEnd) newErrors.shiftEnd = 'End time is required';
        if (formData.shiftStart && formData.shiftEnd && formData.shiftStart >= formData.shiftEnd) {
          newErrors.shiftEnd = 'End time must be after start time';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleComplete = () => {
    if (!validateStep(currentStep)) return;

    const newSupervisor: Supervisor = {
      id: `SUP-${String(Date.now()).slice(-3)}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      status: 'offline',
      currentLoad: 0,
      maxCapacity: formData.maxCapacity,
      skills: formData.skills,
      avgResponseTime: 0,
      totalEscalationsHandled: 0,
      satisfactionScore: 5.0,
      shiftStart: formData.shiftStart,
      shiftEnd: formData.shiftEnd,
      timezone: formData.timezone,
      notifications: formData.notifications,
      autoAccept: formData.autoAccept,
      outOfOffice: { enabled: false }
    };

    onComplete(newSupervisor);
    handleReset();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      skills: [],
      maxCapacity: 5,
      timezone: 'PST',
      shiftStart: '09:00',
      shiftEnd: '17:00',
      notifications: {
        email: true,
        inApp: true,
        sms: false,
        slack: false
      },
      autoAccept: false
    });
    setErrors({});
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    setErrors(prev => ({ ...prev, skills: '' }));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()]
      }));
      setCustomSkill('');
      setErrors(prev => ({ ...prev, skills: '' }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-medium mb-1">Basic Information</h3>
              <p className="text-sm text-muted-foreground">
                Let's start with the supervisor's basic details
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="e.g., Sarah Chen"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className="pl-9"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g., sarah.chen@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className="pl-9"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">
                  Job Title/Role <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="role"
                    placeholder="e.g., Senior AI Governance Lead"
                    value={formData.role}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, role: e.target.value }));
                      setErrors(prev => ({ ...prev, role: '' }));
                    }}
                    className="pl-9"
                  />
                </div>
                {errors.role && (
                  <p className="text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, department: value }));
                    setErrors(prev => ({ ...prev, department: '' }));
                  }}
                >
                  <SelectTrigger id="department">
                    <Building className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-600">{errors.department}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Skills & Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Select the areas of expertise for this supervisor
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">
                  Select Skills <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2 mb-4 max-h-[200px] overflow-y-auto p-3 border rounded-lg bg-accent/30">
                  {COMMON_SKILLS.map(skill => (
                    <Badge
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => toggleSkill(skill)}
                    >
                      {formData.skills.includes(skill) && (
                        <Check className="w-3 h-3 mr-1" />
                      )}
                      {skill}
                    </Badge>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-sm text-red-600 mb-2">{errors.skills}</p>
                )}
              </div>

              <div>
                <Label htmlFor="customSkill" className="mb-2 block">Add Custom Skill</Label>
                <div className="flex gap-2">
                  <Input
                    id="customSkill"
                    placeholder="Enter a custom skill"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomSkill();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCustomSkill}
                    disabled={!customSkill.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {formData.skills.length > 0 && (
                <div>
                  <Label className="mb-2 block">Selected Skills ({formData.skills.length})</Label>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-blue-50">
                    {formData.skills.map(skill => (
                      <Badge key={skill} variant="default" className="gap-1">
                        {skill}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-200"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Capacity Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure how many escalations this supervisor can handle
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxCapacity">
                  Maximum Concurrent Escalations <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  <Input
                    id="maxCapacity"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.maxCapacity}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) || 1 }));
                      setErrors(prev => ({ ...prev, maxCapacity: '' }));
                    }}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lower capacity</span>
                    <span className="text-muted-foreground">Higher capacity</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  {errors.maxCapacity && (
                    <p className="text-sm text-red-600">{errors.maxCapacity}</p>
                  )}
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-medium text-blue-900">Capacity Recommendations</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>1-3 escalations:</strong> Executive or specialist roles</li>
                        <li>• <strong>4-7 escalations:</strong> Standard supervisor capacity</li>
                        <li>• <strong>8+ escalations:</strong> High-volume operational roles</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-accent/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Preview</span>
                  <Badge variant="outline">
                    {formData.maxCapacity} max escalations
                  </Badge>
                </div>
                <Progress value={0} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  This supervisor will be marked as "busy" when handling {formData.maxCapacity} simultaneous escalations
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-medium mb-1">Work Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Set the supervisor's working hours and timezone
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">
                  Timezone <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
                >
                  <SelectTrigger id="timezone">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map(tz => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shiftStart">
                    Shift Start <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shiftStart"
                    type="time"
                    value={formData.shiftStart}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, shiftStart: e.target.value }));
                      setErrors(prev => ({ ...prev, shiftStart: '', shiftEnd: '' }));
                    }}
                  />
                  {errors.shiftStart && (
                    <p className="text-sm text-red-600">{errors.shiftStart}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shiftEnd">
                    Shift End <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shiftEnd"
                    type="time"
                    value={formData.shiftEnd}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, shiftEnd: e.target.value }));
                      setErrors(prev => ({ ...prev, shiftEnd: '' }));
                    }}
                  />
                  {errors.shiftEnd && (
                    <p className="text-sm text-red-600">{errors.shiftEnd}</p>
                  )}
                </div>
              </div>

              <Card className="bg-accent/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Schedule Summary</span>
                    <Badge variant="outline">{formData.timezone}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {formData.shiftStart} - {formData.shiftEnd}
                    </span>
                  </div>
                  {formData.shiftStart && formData.shiftEnd && formData.shiftStart < formData.shiftEnd && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Total: {(() => {
                        const start = parseInt(formData.shiftStart.split(':')[0]);
                        const end = parseInt(formData.shiftEnd.split(':')[0]);
                        return end - start;
                      })()} hours per day
                    </p>
                  )}
                </CardContent>
              </Card>

              <Alert>
                <Clock className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  The supervisor will only receive escalations during their scheduled hours. Outside these hours, their status will automatically be set to "Offline".
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-medium mb-1">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Choose how this supervisor should be notified
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive escalation alerts via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Show notifications in the platform
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.notifications.inApp}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, inApp: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.527 14.514A.998.998 0 0 0 6 15.5v2.04c0 .596.496 1.103 1.1 1.103h9.8c.604 0 1.1-.507 1.1-1.103V15.5c0-.387-.223-.736-.576-.904l-1.924-.917v-2.183c.993-.4 1.65-1.353 1.65-2.396 0-.88-.439-1.661-1.113-2.123.032-.2.061-.39.061-.597C15.098 5.033 13.564 3.5 11.5 3.5S7.902 5.033 7.902 6.88c0 .207.029.397.061.597-.674.462-1.113 1.243-1.113 2.123 0 1.043.657 1.996 1.65 2.396v2.183l-1.973.935z"/>
                      </svg>
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send text messages for urgent cases
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.notifications.sms}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                      </svg>
                      <div>
                        <p className="font-medium">Slack Integration</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified via Slack direct message
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.notifications.slack}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, slack: checked }
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Auto-Accept Escalations</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically accept assigned escalations without manual confirmation
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.autoAccept}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, autoAccept: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {!formData.notifications.email && !formData.notifications.inApp && 
               !formData.notifications.sms && !formData.notifications.slack && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Warning:</strong> No notification channels are enabled. The supervisor will not receive any alerts for new escalations.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Review & Confirm</h3>
              <p className="text-sm text-muted-foreground">
                Please review all information before adding the supervisor
              </p>
            </div>

            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium">Basic Information</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Role</p>
                      <p className="font-medium">{formData.role}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Department</p>
                      <p className="font-medium">{formData.department}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-purple-600" />
                    <h4 className="font-medium">Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.skills.map(skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <h4 className="font-medium">Schedule & Capacity</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Max Capacity</p>
                      <p className="font-medium">{formData.maxCapacity} escalations</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Timezone</p>
                      <p className="font-medium">{formData.timezone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Work Hours</p>
                      <p className="font-medium">{formData.shiftStart} - {formData.shiftEnd}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Auto-Accept</p>
                      <p className="font-medium">{formData.autoAccept ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="w-4 h-4 text-pink-600" />
                    <h4 className="font-medium">Notifications</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.notifications.email && (
                      <Badge variant="outline" className="gap-1">
                        <Mail className="w-3 h-3" /> Email
                      </Badge>
                    )}
                    {formData.notifications.inApp && (
                      <Badge variant="outline" className="gap-1">
                        <Bell className="w-3 h-3" /> In-App
                      </Badge>
                    )}
                    {formData.notifications.sms && (
                      <Badge variant="outline" className="gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.527 14.514A.998.998 0 0 0 6 15.5v2.04c0 .596.496 1.103 1.1 1.103h9.8c.604 0 1.1-.507 1.1-1.103V15.5c0-.387-.223-.736-.576-.904l-1.924-.917v-2.183c.993-.4 1.65-1.353 1.65-2.396 0-.88-.439-1.661-1.113-2.123.032-.2.061-.39.061-.597C15.098 5.033 13.564 3.5 11.5 3.5S7.902 5.033 7.902 6.88c0 .207.029.397.061.597-.674.462-1.113 1.243-1.113 2.123 0 1.043.657 1.996 1.65 2.396v2.183l-1.973.935z"/>
                        </svg> SMS
                      </Badge>
                    )}
                    {formData.notifications.slack && (
                      <Badge variant="outline" className="gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"/>
                        </svg> Slack
                      </Badge>
                    )}
                    {!formData.notifications.email && !formData.notifications.inApp && 
                     !formData.notifications.sms && !formData.notifications.slack && (
                      <Badge variant="outline" className="text-muted-foreground">
                        No notifications enabled
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  The supervisor will be added with an initial status of "Offline". You can activate them and set their status after creation.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleReset();
        onClose();
      }
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Supervisor</DialogTitle>
          <DialogDescription>
            Follow the steps to configure a new supervisor for HITL escalations
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs text-center ${
                        isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      style={{ marginTop: '-20px' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-4 min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="gap-2">
              <Check className="w-4 h-4" />
              Add Supervisor
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
