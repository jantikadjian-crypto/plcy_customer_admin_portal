import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DollarSign,
  Users,
  MousePointerClick,
  UserPlus,
  TrendingUp,
  ArrowUpRight,
  Search,
  Download,
  Filter,
  Mail,
  Copy,
  ExternalLink,
  ChevronRight,
  Calendar,
  CreditCard,
  Settings,
  BarChart3,
  FileText,
  Zap,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

export function PartnersProgram() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('all-time');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for the dashboard
  const stats = {
    totalRevenue: 10857.26,
    totalClicks: 6878,
    totalLeads: 222,
    totalCustomers: 41,
  };

  const topPartners = [
    {
      id: 1,
      name: 'Daniel Godek',
      email: 'daniel@acmecorp.io',
      revenue: 8357.26,
      date: '5 February 2025',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Abdullah Omar',
      email: 'abdullah@techstart.ai',
      revenue: 1115.00,
      date: '10 December 2024 12:25 pm',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Ansh Sarla',
      email: 'ansh@aicloud.com',
      revenue: 327.49,
      date: '10 December 2024 11:23 pm',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Eliza Tam',
      email: 'eliza@dataflow.io',
      revenue: 273.00,
      date: '9 December 2024',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Delvyn Lee',
      email: 'delvyn@mlops.ai',
      revenue: 198.00,
      date: '24 December 2024 07:12 pm',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Rojan Shrestha',
      email: 'rojan@innovate.ai',
      revenue: 145.00,
      date: '17 December 2024 08:45 am',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Ian Lee',
      email: 'ian@cloudai.com',
      revenue: 125.00,
      date: '12 December 2024 02:30 pm',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Erik Grenberg',
      email: 'erik@aiventures.io',
      revenue: 78.00,
      date: '12 December 2024 10:30 am',
      status: 'Pending'
    },
  ];

  const recentCustomers = [
    {
      id: 1,
      date: '5 February 2025',
      time: '09:30 am',
      email: 'alice@fintech.io',
      partner: 'Daniel Godek',
      partnerEmail: 'daniel@acmecorp.io',
      amount: 0.00,
      status: 'Lead'
    },
    {
      id: 2,
      date: '10 December 2024',
      time: '12:25 pm',
      email: '333',
      partner: 'Daniel Godek',
      partnerEmail: 'daniel@acmecorp.io',
      amount: 0.00,
      status: 'Lead'
    },
    {
      id: 3,
      date: '10 December 2024',
      time: '11:23 pm',
      email: 'b.s.c@enterprise.io',
      partner: 'Daniel Godek',
      partnerEmail: 'daniel@acmecorp.io',
      amount: 0.00,
      status: 'Lead'
    },
    {
      id: 4,
      date: '9 December 2024',
      time: '03:15 pm',
      email: 'team@retail.com',
      partner: 'Daniel Godek',
      partnerEmail: 'daniel@acmecorp.io',
      amount: 0.00,
      status: 'Lead'
    },
    {
      id: 5,
      date: '24 December 2024',
      time: '07:12 pm',
      email: 'N/A',
      partner: 'Daniel Godek',
      partnerEmail: 'daniel@acmecorp.io',
      amount: 6.50,
      status: 'Active'
    },
    {
      id: 6,
      date: '17 December 2024',
      time: '08:45 am',
      email: 'support@saas.com',
      partner: 'Daniel Godek',
      partnerEmail: 'daniel@acmecorp.io',
      amount: 1398.30,
      status: 'Active'
    },
    {
      id: 7,
      date: '12 December 2024',
      time: '02:30 pm',
      email: 'contact@startup.ai',
      partner: 'Griselda Haydn',
      partnerEmail: 'griselda@growth.ai',
      amount: 0.00,
      status: 'Lead'
    },
  ];

  const copyReferralLink = () => {
    const link = 'https://plcy.ai/signup?ref=PARTNER2025';
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied!', {
      description: 'Share it with potential partners to start earning.',
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">
            Good afternoon, Michael! 👋
          </h1>
          <p className="text-muted-foreground">
            Welcome to your partner dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button className="gap-2">
            <Settings className="w-4 h-4" />
            Program Settings
          </Button>
        </div>
      </div>

      {/* Program Badge */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">PLCY's Affiliate Program</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total revenue generated</CardDescription>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              ${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="link" className="h-auto p-0 text-xs">
                View partners
              </Button>
              <Button size="sm" variant="link" className="h-auto p-0 text-xs">
                View customers
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total clicks</CardDescription>
              <MousePointerClick className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {stats.totalClicks.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              All clicks from partner links
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total leads</CardDescription>
              <UserPlus className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {stats.totalLeads}
            </div>
            <p className="text-xs text-muted-foreground">
              All sign ups from partner links
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total referred customers</CardDescription>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {stats.totalCustomers}
            </div>
            <p className="text-xs text-muted-foreground">
              All paid referred customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Partners */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top partners by revenue brought in</CardTitle>
              <Button variant="link" className="gap-1 h-auto p-0 text-sm">
                View all
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search and filters */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search partners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPartners.slice(0, 7).map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{partner.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {partner.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {partner.date}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${partner.revenue.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Customers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent referred customers</CardTitle>
              <Button variant="link" className="gap-1 h-auto p-0 text-sm">
                View all
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referral date</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Amount paid</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCustomers.slice(0, 7).map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="text-sm">
                          <div>{customer.date}</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.time}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {customer.email}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.partner}</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.partnerEmail}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          ${customer.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.status === 'Active' ? 'default' : 'secondary'
                            }
                            className={
                              customer.status === 'Active'
                                ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            }
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Copy className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Share Your Link</CardTitle>
            </div>
            <CardDescription>
              Copy your unique referral link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value="https://plcy.ai/signup?ref=PARTNER2025"
                readOnly
                className="font-mono text-sm"
              />
              <Button onClick={copyReferralLink} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Invite Partners</CardTitle>
            </div>
            <CardDescription>
              Send invitations to potential partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full gap-2">
              <Mail className="w-4 h-4" />
              Send Invitations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Analytics</CardTitle>
            </div>
            <CardDescription>
              View detailed performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full gap-2">
              <BarChart3 className="w-4 h-4" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Commission Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
          <CardDescription>
            Earn competitive commissions for every customer you refer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Starter Plan</div>
                  <div className="text-sm text-muted-foreground">20% recurring</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Earn 20% commission on all Starter plan subscriptions
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Professional Plan</div>
                  <div className="text-sm text-muted-foreground">25% recurring</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Earn 25% commission on all Professional plan subscriptions
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Enterprise Plan</div>
                  <div className="text-sm text-muted-foreground">30% recurring</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Earn 30% commission on all Enterprise plan subscriptions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Resources</CardTitle>
          <CardDescription>
            Everything you need to succeed as a PLCY partner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <FileText className="w-4 h-4" />
              Marketing Materials
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <BarChart3 className="w-4 h-4" />
              Partner Training
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Users className="w-4 h-4" />
              Partner Community
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <CreditCard className="w-4 h-4" />
              Payout Settings
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
