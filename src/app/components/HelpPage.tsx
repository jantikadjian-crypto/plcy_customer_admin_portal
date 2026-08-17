import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  HelpCircle, 
  Search,
  MessageSquare,
  Mail,
  Phone,
  Video,
  BookOpen,
  FileText,
  ExternalLink,
  Send,
  CheckCircle,
  Clock,
  Zap,
  Users,
  Calendar,
  Youtube,
  Github,
  Globe,
  Shield
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportCategory, setSupportCategory] = useState('');

  const handleSubmitTicket = () => {
    if (!supportSubject || !supportMessage || !supportCategory) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Support ticket created', {
      description: 'Our team will respond within 24 hours.'
    });
    
    setSupportSubject('');
    setSupportMessage('');
    setSupportCategory('');
  };

  const quickActions = [
    { icon: BookOpen, label: 'Documentation', description: 'Browse guides and tutorials', href: '#' },
    { icon: Video, label: 'Video Tutorials', description: 'Watch step-by-step videos', href: '#' },
    { icon: MessageSquare, label: 'Community Forum', description: 'Ask questions and share ideas', href: '#' },
    { icon: Mail, label: 'Email Support', description: 'Get help from our team', href: '#' },
  ];

  const popularArticles = [
    { title: 'Getting Started with AI Governance', category: 'Getting Started', views: 1245 },
    { title: 'How to Create Your First Trust Center', category: 'Trust Centers', views: 982 },
    { title: 'Understanding EU AI Act Compliance', category: 'Compliance', views: 876 },
    { title: 'Setting Up HITL Guardrails', category: 'Controls', views: 734 },
    { title: 'Integrating with Your AI Systems', category: 'Integrations', views: 623 },
  ];

  const recentUpdates = [
    { date: '2025-10-14', title: 'New Threat Modeling Module Released', type: 'Feature' },
    { date: '2025-10-10', title: 'Enhanced Logs & Monitoring', type: 'Feature' },
    { date: '2025-10-08', title: 'Performance Improvements', type: 'Update' },
    { date: '2025-10-05', title: 'Security Patch v2.3.1', type: 'Security' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl mb-2">How can we help you?</h1>
        <p className="text-muted-foreground mb-6">
          Search our knowledge base or get in touch with our support team
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, guides, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="cursor-pointer hover:border-blue-600 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <action.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="support" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Contact Support
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="updates" className="gap-2">
            <Zap className="w-4 h-4" />
            What's New
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
                <CardDescription>Most viewed help articles this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{article.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.views} views</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">How do I add a new AI system?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Navigate to the AI Inventory module and click "Add New System". Fill in the required information about your AI model, including its purpose, data sources, and risk classification.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">What is a Trust Center?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      A Trust Center is a public-facing portal that showcases your AI governance practices, compliance status, and security measures. It helps build transparency and trust with customers and stakeholders.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm">How does EU AI Act compliance work?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Our platform automatically assesses your AI systems against EU AI Act requirements, provides compliance scorecards, and generates necessary documentation for regulatory audits.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-sm">Can I integrate with existing tools?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Yes! We offer integrations with Slack, JIRA, ServiceNow, and custom API connections. Visit the Integrations section in Settings to configure your connections.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-sm">How secure is my data?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      We use enterprise-grade security with AES-256 encryption, SOC 2 compliance, and regular security audits. Your data is encrypted at rest and in transit.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Our team typically responds within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                  <Select value={supportCategory} onValueChange={setSupportCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Subscription</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="integration">Integration Support</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                  <Input 
                    id="subject" 
                    placeholder="Brief description of your issue"
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your question or issue..."
                    rows={6}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                  />
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Professional plan customers receive priority support with 4-hour response time
                  </AlertDescription>
                </Alert>

                <Button onClick={handleSubmitTicket} className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Reach Us</CardTitle>
                  <CardDescription>Choose the best way to get help</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@plcy.ai</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+1 (888) 555-PLCY</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Schedule a Call</p>
                      <p className="text-sm text-muted-foreground">Book a 30-minute consultation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Getting Started Guide
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  API Reference
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Integration Guides
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Best Practices
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-red-600" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Youtube className="w-4 h-4" />
                  Platform Overview
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Youtube className="w-4 h-4" />
                  Creating Trust Centers
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Youtube className="w-4 h-4" />
                  Compliance Setup
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Youtube className="w-4 h-4" />
                  Advanced Features
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Globe className="w-4 h-4" />
                  Community Forum
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Slack Community
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Discussions
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Webinars & Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Updates Tab */}
        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Platform Updates</CardTitle>
              <CardDescription>
                Stay up to date with the latest features and improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      update.type === 'Feature' ? 'bg-blue-100' :
                      update.type === 'Security' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {update.type === 'Feature' ? <Zap className="w-5 h-5 text-blue-600" /> :
                       update.type === 'Security' ? <Shield className="w-5 h-5 text-red-600" /> :
                       <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{update.title}</p>
                        <Badge variant="outline">{update.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.date}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-blue-50 border-blue-200">
            <Zap className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Subscribe to our newsletter to receive monthly updates about new features and platform improvements
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}