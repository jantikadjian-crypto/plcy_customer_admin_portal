import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { 
  Building, 
  Mail, 
  Lock, 
  User, 
  Globe, 
  Users, 
  Shield, 
  Star, 
  CheckCircle, 
  CreditCard,
  Zap,
  ArrowRight,
  Award,
  Eye
} from 'lucide-react';

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  initialMode?: 'login' | 'signup';
}

export function AuthenticationModal({ isOpen, onClose, onSuccess, initialMode = 'login' }: AuthenticationModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'plan-selection' | 'company-setup'>(initialMode);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [formData, setFormData] = useState({
    // Login/Signup
    email: '',
    password: '',
    confirmPassword: '',
    
    // Company Setup
    companyName: '',
    industry: '',
    companySize: '',
    headquarters: '',
    website: '',
    description: '',
    
    // Contact Info
    firstName: '',
    lastName: '',
    jobTitle: '',
    phone: '',
    
    // Preferences
    aiSystems: '',
    complianceNeeds: [] as string[],
    regions: [] as string[]
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for small companies getting started with AI governance',
      features: [
        'Basic Trust Center',
        'Up to 5 AI systems',
        'EU AI Act compliance starter',
        'Basic threat modeling',
        'Email support',
        'Monthly compliance reports'
      ],
      badge: null,
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$799',
      period: '/month',
      description: 'Comprehensive governance for growing AI-first companies',
      features: [
        'Advanced Trust Center',
        'Up to 25 AI systems',
        'Full EU AI Act compliance',
        'Advanced threat modeling',
        'OWASP LLM & Agent coverage',
        'Custom policy frameworks',
        'Priority support',
        'Weekly compliance reports',
        'Integration connectors'
      ],
      badge: 'Most Popular',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Enterprise-grade governance for large-scale AI deployments',
      features: [
        'White-label Trust Center',
        'Unlimited AI systems',
        'Multi-framework compliance',
        'Advanced analytics & BI',
        'Custom integrations',
        'Dedicated success manager',
        '24/7 priority support',
        'Real-time monitoring',
        'Custom SLAs',
        'On-premise deployment'
      ],
      badge: 'Enterprise',
      popular: false
    }
  ];

  const industries = [
    'Technology', 'Financial Services', 'Healthcare', 'Automotive', 
    'Retail', 'Education', 'Manufacturing', 'Media & Entertainment', 
    'Government', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-1000 employees', '1001-5000 employees', '5000+ employees'
  ];

  const complianceOptions = [
    'EU AI Act', 'GDPR', 'CCPA', 'HIPAA', 'SOX', 'PCI DSS', 
    'ISO 27001', 'SOC 2', 'NIST AI RMF', 'FedRAMP'
  ];

  const regionOptions = ['EU', 'US', 'UK', 'APAC', 'Canada', 'Latin America'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      // Simulate login
      onSuccess({
        email: formData.email,
        type: 'existing-user'
      });
    } else if (mode === 'signup') {
      setMode('plan-selection');
    } else if (mode === 'plan-selection') {
      setMode('company-setup');
    } else if (mode === 'company-setup') {
      // Complete signup
      onSuccess({
        ...formData,
        plan: selectedPlan,
        type: 'new-user'
      });
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key as keyof typeof prev].includes(value)
        ? (prev[key as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[key as keyof typeof prev] as string[]), value]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {mode === 'login' && (
          <div>
            <DialogHeader>
              <DialogTitle>Welcome Back</DialogTitle>
              <DialogDescription>
                Sign in to access your PLCY platform
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your@company.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  type="button"
                  onClick={() => setMode('signup')}
                >
                  Don't have an account? Sign up
                </Button>
              </div>
            </form>
          </div>
        )}

        {mode === 'signup' && (
          <div>
            <DialogHeader>
              <DialogTitle>Create Your Account</DialogTitle>
              <DialogDescription>
                Join the leading PLCY platform
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your@company.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData('jobTitle', e.target.value)}
                  placeholder="e.g., Chief AI Officer, Compliance Manager"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Continue to Plan Selection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  type="button"
                  onClick={() => setMode('login')}
                >
                  Already have an account? Sign in
                </Button>
              </div>
            </form>
          </div>
        )}

        {mode === 'plan-selection' && (
          <div>
            <DialogHeader>
              <DialogTitle>Choose Your Plan</DialogTitle>
              <DialogDescription>
                Select the plan that best fits your AI governance needs
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-6 space-y-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {plan.name}
                          {plan.badge && plan.badge !== 'Most Popular' && (
                            <Badge variant="outline">{plan.badge}</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{plan.price}</div>
                        <div className="text-sm text-muted-foreground">{plan.period}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                onClick={() => setMode('company-setup')}
                disabled={!selectedPlan}
                className="w-full"
              >
                Continue with {plans.find(p => p.id === selectedPlan)?.name} Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {mode === 'company-setup' && (
          <div>
            <DialogHeader>
              <DialogTitle>Company Information</DialogTitle>
              <DialogDescription>
                Tell us about your company to customize your AI governance experience
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Company Basics */}
              <div className="space-y-4">
                <h3 className="font-medium">Company Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => updateFormData('website', e.target.value)}
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map(industry => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map(size => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="headquarters">Headquarters</Label>
                  <Input
                    id="headquarters"
                    value={formData.headquarters}
                    onChange={(e) => updateFormData('headquarters', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Brief description of your company and AI use cases..."
                    rows={3}
                  />
                </div>
              </div>

              {/* AI & Compliance Needs */}
              <div className="space-y-4">
                <h3 className="font-medium">AI & Compliance Needs</h3>
                
                <div>
                  <Label htmlFor="aiSystems">Number of AI Systems</Label>
                  <Select value={formData.aiSystems} onValueChange={(value) => updateFormData('aiSystems', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 systems</SelectItem>
                      <SelectItem value="6-15">6-15 systems</SelectItem>
                      <SelectItem value="16-50">16-50 systems</SelectItem>
                      <SelectItem value="50+">50+ systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Compliance Requirements (select all that apply)</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {complianceOptions.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.complianceNeeds.includes(option)}
                          onCheckedChange={() => toggleArrayValue('complianceNeeds', option)}
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Operating Regions (select all that apply)</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {regionOptions.map(region => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox
                          id={region}
                          checked={formData.regions.includes(region)}
                          onCheckedChange={() => toggleArrayValue('regions', region)}
                        />
                        <Label htmlFor={region} className="text-sm">{region}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Complete Setup & Create Trust Center
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}