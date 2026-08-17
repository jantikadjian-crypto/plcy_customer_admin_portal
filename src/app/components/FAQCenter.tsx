import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  HelpCircle, 
  Lightbulb, 
  MessageCircle, 
  Mail, 
  Phone,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
  Bot,
  Scale,
  Users,
  CreditCard,
  Settings,
  FileText,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

export function FAQCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Lightbulb,
      color: 'text-blue-600',
      count: 12
    },
    {
      id: 'ai-governance',
      title: 'AI Governance',
      icon: Bot,
      color: 'text-purple-600',
      count: 18
    },
    {
      id: 'compliance',
      title: 'Compliance & Legal',
      icon: Scale,
      color: 'text-green-600',
      count: 15
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      color: 'text-red-600',
      count: 10
    },
    {
      id: 'billing',
      title: 'Billing & Plans',
      icon: CreditCard,
      color: 'text-orange-600',
      count: 8
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Settings,
      color: 'text-teal-600',
      count: 14
    }
  ];

  const faqs = [
    // Getting Started
    {
      id: 1,
      category: 'getting-started',
      question: 'What is PLCY and how does it help my organization?',
      answer: 'PLCY is a comprehensive platform that helps organizations implement responsible AI practices following the "Assess, Control, Prove" methodology. It provides tools for AI system inventory, risk assessment, compliance management, and public trust center creation to demonstrate your commitment to responsible AI.',
      popularity: 'high',
      tags: ['overview', 'benefits']
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'How do I get started with the platform?',
      answer: 'Getting started is easy: 1) Sign up for an account and select your plan, 2) Complete the company onboarding process, 3) Add your first AI system to the inventory, 4) Configure your governance framework, and 5) Publish your trust center. Our onboarding wizard guides you through each step.',
      popularity: 'high',
      tags: ['setup', 'onboarding']
    },
    {
      id: 3,
      category: 'getting-started',
      question: 'What information do I need to provide during setup?',
      answer: 'During setup, you\'ll need: company information (name, industry, size), details about your AI systems, compliance requirements (EU AI Act, GDPR, etc.), operating regions, and key contact information. This helps us customize the platform for your specific needs.',
      popularity: 'medium',
      tags: ['setup', 'requirements']
    },

    // AI Governance
    {
      id: 4,
      category: 'ai-governance',
      question: 'How does the AI inventory system work?',
      answer: 'The AI inventory system catalogues all your AI systems with detailed information including purpose, risk classification, data types, safeguards, and compliance status. It supports automated discovery through our Universal Connector and provides drill-down views for detailed system analysis.',
      popularity: 'high',
      tags: ['inventory', 'systems']
    },
    {
      id: 5,
      category: 'ai-governance',
      question: 'What is the "Assess, Control, Prove" methodology?',
      answer: 'Our methodology has three phases: ASSESS - evaluate AI risks and create comprehensive inventories; CONTROL - implement governance frameworks and controls; PROVE - demonstrate compliance through public trust centers and transparent reporting.',
      popularity: 'high',
      tags: ['methodology', 'framework']
    },
    {
      id: 6,
      category: 'ai-governance',
      question: 'How do you handle AI system risk classification?',
      answer: 'We classify AI systems based on EU AI Act categories: Prohibited, High Risk, Limited Risk, and Minimal Risk. The platform automatically suggests classifications based on use case and data types, with options for manual override and expert review.',
      popularity: 'medium',
      tags: ['risk', 'classification']
    },

    // Compliance & Legal
    {
      id: 7,
      category: 'compliance',
      question: 'Does the platform help with EU AI Act compliance?',
      answer: 'Yes, we provide comprehensive EU AI Act compliance tools including risk assessments, documentation templates, conformity declarations, and ongoing monitoring. The platform tracks your compliance score and provides actionable recommendations for improvement.',
      popularity: 'high',
      tags: ['eu-ai-act', 'compliance']
    },
    {
      id: 8,
      category: 'compliance',
      question: 'What other compliance frameworks are supported?',
      answer: 'We support multiple frameworks including GDPR, NIST AI RMF, ISO 27001, SOC 2, HIPAA, and industry-specific regulations. The platform maps controls across frameworks to minimize duplication and streamline compliance efforts.',
      popularity: 'high',
      tags: ['frameworks', 'standards']
    },
    {
      id: 9,
      category: 'compliance',
      question: 'Can I generate compliance reports automatically?',
      answer: 'Yes, the platform generates automated compliance reports for auditors, regulators, and stakeholders. Reports include compliance scores, gap analysis, remediation plans, and evidence documentation. You can schedule regular reports or generate them on-demand.',
      popularity: 'medium',
      tags: ['reporting', 'automation']
    },

    // Security & Privacy
    {
      id: 10,
      category: 'security',
      question: 'How is my data protected on the platform?',
      answer: 'We implement enterprise-grade security including end-to-end encryption, zero-trust architecture, SOC 2 compliance, and regular security audits. Your data is stored in geographically appropriate regions with strict access controls and audit logging.',
      popularity: 'high',
      tags: ['security', 'privacy']
    },
    {
      id: 11,
      category: 'security',
      question: 'What is the OWASP coverage in threat modeling?',
      answer: 'Our threat modeling covers both OWASP Top 10 LLM vulnerabilities (LLM01-LLM10) and OWASP AI Agent Security threats (T1-T15). We provide vulnerability scanning, risk assessment, and mitigation recommendations specific to your AI systems.',
      popularity: 'medium',
      tags: ['owasp', 'threats']
    },

    // Billing & Plans
    {
      id: 12,
      category: 'billing',
      question: 'What are the different pricing plans available?',
      answer: 'We offer three plans: Starter ($299/month) for small companies with up to 5 AI systems, Professional ($799/month) for growing companies with up to 25 systems, and Enterprise (custom pricing) for large-scale deployments with unlimited systems.',
      popularity: 'high',
      tags: ['pricing', 'plans']
    },
    {
      id: 13,
      category: 'billing',
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. We provide prorated billing for mid-cycle changes.',
      popularity: 'medium',
      tags: ['billing', 'changes']
    },

    // Technical Support
    {
      id: 14,
      category: 'technical',
      question: 'How do I integrate with existing systems?',
      answer: 'Our Universal Connector supports integration with 100+ systems including cloud platforms, HR systems, and development tools. We provide REST APIs, webhooks, and pre-built connectors. Our technical team can assist with custom integrations.',
      popularity: 'high',
      tags: ['integration', 'api']
    },
    {
      id: 15,
      category: 'technical',
      question: 'What support options are available?',
      answer: 'Support varies by plan: Starter includes email support, Professional adds priority support and weekly reports, Enterprise includes 24/7 support and dedicated success manager. All plans include access to our documentation and community forum.',
      popularity: 'medium',
      tags: ['support', 'help']
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = faqs.filter(faq => faq.popularity === 'high').slice(0, 5);

  const getPriorityIcon = (popularity: string) => {
    switch (popularity) {
      case 'high': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'medium': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
          Find answers to common questions about AI governance, compliance, and platform usage
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <FileText className="w-4 h-4" />
            Browse Documentation
          </Button>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedCategory === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Questions ({faqs.length})
        </Button>
        {faqCategories.map(category => (
          <Button 
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            <category.icon className="w-3 h-3" />
            {category.title} ({category.count})
          </Button>
        ))}
      </div>

      <Tabs defaultValue="all-faqs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-faqs">All FAQs</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="all-faqs" className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No FAQs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      {getPriorityIcon(faq.popularity)}
                      <div className="flex-1">
                        <div className="font-medium">{faq.question}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {faq.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {faq.popularity === 'high' && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="pl-7">
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <div className="mt-3 text-sm text-muted-foreground">
                        Was this helpful? 
                        <Button variant="link" size="sm" className="p-1 h-auto ml-2">
                          Yes
                        </Button>
                        <Button variant="link" size="sm" className="p-1 h-auto">
                          No
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Most Popular Questions
              </CardTitle>
              <CardDescription>
                The most frequently asked questions by our users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {popularFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`popular-${faq.id}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-start gap-3 text-left">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        <div className="font-medium">{faq.question}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="pl-7">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Still need help? Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">Email Support</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get help via email with detailed responses
                    </p>
                    <div className="text-sm">
                      <div>General: support@plcy.io</div>
                      <div>Technical: technical@plcy.io</div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Response time: 24-48 hours
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Phone Support</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Speak directly with our support team
                    </p>
                    <div className="text-sm">
                      <div>+1 (555) 123-4567</div>
                      <div>Monday - Friday, 9 AM - 6 PM PST</div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Professional and Enterprise plans only
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium">Live Chat</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Chat with our support team in real-time
                    </p>
                    <Button className="w-full">
                      Start Live Chat
                    </Button>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Available during business hours
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <h4 className="font-medium">Community Forum</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect with other users and experts
                    </p>
                    <Button variant="outline" className="w-full">
                      Visit Forum
                    </Button>
                    <div className="mt-2 text-xs text-muted-foreground">
                      24/7 community support
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Response Times */}
          <Card>
            <CardHeader>
              <CardTitle>Support Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">2 hours</div>
                  <div className="text-sm text-muted-foreground">Critical Issues</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">24 hours</div>
                  <div className="text-sm text-muted-foreground">General Support</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">72 hours</div>
                  <div className="text-sm text-muted-foreground">Feature Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}