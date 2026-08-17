import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  User, 
  Mail, 
  Building, 
  Shield,
  CreditCard,
  Key,
  Bell,
  Activity,
  Calendar,
  MapPin,
  Phone,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

export function UserAccountPage() {
  const [firstName, setFirstName] = useState('Demo');
  const [lastName, setLastName] = useState('User');
  const [email, setEmail] = useState('demo@company.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [jobTitle, setJobTitle] = useState('AI Governance Lead');
  const [department, setDepartment] = useState('Compliance');

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully', {
      description: 'Your account information has been saved.'
    });
  };

  const handleChangePassword = () => {
    toast.success('Password change initiated', {
      description: 'Check your email for instructions to complete the password change.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl mb-2">My Account</h1>
          <p className="text-muted-foreground">
            Manage your profile, subscription, and account preferences
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Photo
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24 text-2xl">
                <AvatarFallback className="bg-blue-600 text-white">
                  DU
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{firstName} {lastName}</h3>
                <p className="text-sm text-muted-foreground">{jobTitle}</p>
              </div>
              <Badge variant="outline" className="gap-1">
                <Building className="w-3 h-3" />
                Demo Company
              </Badge>
              <Separator />
              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="subscription" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="w-4 h-4" />
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input 
                        id="job-title" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Your subscription details and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Professional Plan</p>
                        <p className="text-sm text-muted-foreground">Billed annually</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$499</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Unlimited AI Systems</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Track all your AI initiatives</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Advanced Compliance</span>
                      </div>
                      <p className="text-xs text-muted-foreground">EU AI Act, GDPR & more</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Custom Trust Center</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Branded public portal</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Priority Support</span>
                      </div>
                      <p className="text-xs text-muted-foreground">24/7 expert assistance</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span className="font-medium">January 15, 2026</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment method</span>
                      <span className="font-medium">•••• •••• •••• 4242</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">Change Plan</Button>
                    <Button variant="outline" className="flex-1">Update Payment</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>Your platform usage this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">AI Systems Tracked</span>
                    </div>
                    <span className="font-semibold">24 / Unlimited</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="text-sm">API Calls</span>
                    </div>
                    <span className="font-semibold">12,847 / 50,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Team Members</span>
                    </div>
                    <span className="font-semibold">8 / 25</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Authentication</CardTitle>
                  <CardDescription>
                    Manage your password and authentication settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label>Password</Label>
                        <p className="text-sm text-muted-foreground">Last changed 45 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleChangePassword}>
                      Change Password
                    </Button>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Two-factor authentication is enabled on your account
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Devices where you're currently logged in
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Chrome on macOS • San Francisco, CA</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <Activity className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-xs text-muted-foreground">iOS • Last active 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Revoke</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">Created incident <span className="font-mono">INC-2025001</span></p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">Updated AI system: GPT-4 Customer Support</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">Published Trust Center updates</p>
                        <p className="text-xs text-muted-foreground">Yesterday at 3:42 PM</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">Completed threat modeling assessment</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">Added 3 new team members</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
