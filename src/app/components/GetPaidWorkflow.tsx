import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  DollarSign, 
  Users,
  TrendingUp,
  Gift,
  Share2,
  Copy,
  Mail,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  Award,
  Percent,
  CreditCard,
  Link as LinkIcon,
  ExternalLink,
  Building
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

export function GetPaidWorkflow() {
  const [referralCode, setReferralCode] = useState('DEMO2025');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const copyReferralLink = () => {
    const link = `https://plcy.ai/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied', {
      description: 'Share it with your network to start earning!'
    });
  };

  const handleSendInvite = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    toast.success('Invitation sent', {
      description: `Referral invitation sent to ${email}`
    });
    setEmail('');
    setMessage('');
    setShowShareDialog(false);
  };

  const stats = {
    totalReferrals: 12,
    activeCustomers: 8,
    pendingSignups: 4,
    totalEarnings: 4850,
    thisMonthEarnings: 1200,
    nextPayout: 1950
  };

  const recentReferrals = [
    { company: 'TechCorp Inc.', status: 'Active', earnings: '$850', date: '2025-10-10' },
    { company: 'Innovation Labs', status: 'Active', earnings: '$850', date: '2025-10-08' },
    { company: 'DataFlow Systems', status: 'Trial', earnings: '$0', date: '2025-10-05' },
    { company: 'AI Solutions Co.', status: 'Active', earnings: '$850', date: '2025-09-28' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl mb-2">Get Paid to Share PLCY</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Earn <span className="font-semibold text-blue-600">20% recurring commission</span> for every customer you refer. 
          Help organizations implement AI governance and get rewarded.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="gap-2" onClick={() => setShowShareDialog(true)}>
            <Share2 className="w-4 h-4" />
            Share Now
          </Button>
          <Button size="lg" variant="outline" className="gap-2" onClick={copyReferralLink}>
            <Copy className="w-4 h-4" />
            Copy Referral Link
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+${stats.thisMonthEarnings} this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Referrals</p>
                <p className="text-3xl font-bold">{stats.activeCustomers}</p>
                <p className="text-xs text-blue-600 mt-1">{stats.pendingSignups} pending signups</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payout</p>
                <p className="text-3xl font-bold">${stats.nextPayout.toLocaleString()}</p>
                <p className="text-xs text-purple-600 mt-1">Due Nov 1, 2025</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              How It Works
            </CardTitle>
            <CardDescription>
              Start earning in three simple steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium mb-1">Share Your Link</p>
                <p className="text-sm text-muted-foreground">
                  Send your unique referral link to companies that need AI governance
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-600">2</span>
              </div>
              <div>
                <p className="font-medium mb-1">They Sign Up</p>
                <p className="text-sm text-muted-foreground">
                  When they subscribe to any paid plan, you start earning commissions
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-600">3</span>
              </div>
              <div>
                <p className="font-medium mb-1">Get Paid Monthly</p>
                <p className="text-sm text-muted-foreground">
                  Receive 20% recurring commission as long as they remain a customer
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Tiers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-600" />
              Commission Structure
            </CardTitle>
            <CardDescription>
              Earn more as you refer more customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Starter Tier</span>
                </div>
                <Badge className="bg-blue-600">Current</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">1-10 referrals</span>
                <span className="font-bold text-blue-600">20% commission</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Growth Tier</span>
                </div>
                <Badge variant="outline">2 more needed</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">11-25 referrals</span>
                <span className="font-bold text-purple-600">25% commission</span>
              </div>
              <Progress value={80} className="mt-2 h-2" />
            </div>

            <div className="p-4 border rounded-lg opacity-60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">Partner Tier</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">26+ referrals</span>
                <span className="font-bold text-orange-600">30% commission</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            Your Referral Link
          </CardTitle>
          <CardDescription>
            Share this link with your network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={`https://plcy.ai/signup?ref=${referralCode}`}
              readOnly
              className="font-mono"
            />
            <Button onClick={copyReferralLink} className="gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2" onClick={() => setShowShareDialog(true)}>
              <Mail className="w-4 h-4" />
              Email Invitation
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" />
              Share on LinkedIn
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" />
              Share on Twitter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
          <CardDescription>
            Track your referral activity and earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{referral.company}</p>
                    <p className="text-sm text-muted-foreground">Signed up {referral.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{referral.earnings}</p>
                    <p className="text-xs text-muted-foreground">lifetime value</p>
                  </div>
                  <Badge className={
                    referral.status === 'Active' ? 'bg-green-100 text-green-800' :
                    referral.status === 'Trial' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold mb-1">Recurring Revenue</p>
                <p className="text-sm text-muted-foreground">
                  Earn 20% every month for the lifetime of each customer
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold mb-1">No Limits</p>
                <p className="text-sm text-muted-foreground">
                  Unlimited earning potential - refer as many customers as you want
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold mb-1">Marketing Support</p>
                <p className="text-sm text-muted-foreground">
                  Get access to sales materials, demos, and dedicated support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          <strong>Limited Time Bonus:</strong> Refer 5 customers in your first 90 days and receive a $1,000 bonus payment!
        </AlertDescription>
      </Alert>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Send Referral Invitation
            </DialogTitle>
            <DialogDescription>
              Invite someone to try PLCY and start earning commissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input 
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-message">Personal Message (Optional)</Label>
              <Textarea 
                id="invite-message"
                placeholder="I thought you might be interested in PLCY for AI governance..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Your referral link will be automatically included in the email
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSendInvite} className="flex-1 gap-2">
                <Mail className="w-4 h-4" />
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
