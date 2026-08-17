import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { EscalationDialog } from './EscalationDialog';
import { RejectionConfirmationDialog } from './RejectionConfirmationDialog';
import { toast } from 'sonner';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Shield,
  TrendingUp,
  AlertCircle,
  Edit,
  Send,
  DollarSign,
  Mail,
  FileDown,
  UserX,
  MessageSquare,
  Activity,
  BarChart3,
  Settings,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  Copy,
  Play,
  Pause,
  RefreshCw,
  FileText,
  Zap,
  Lock,
  BookOpen,
  ChevronDown,
  Info,
  Target,
  Code,
  Database,
  CreditCard,
  Scale
} from 'lucide-react';

interface ReviewItem {
  id: string;
  timestamp: string;
  type: 'email' | 'refund' | 'message' | 'export' | 'deletion';
  action: string;
  riskScore: number;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  assignee?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  sla: string;
  triggers: string[];
  context: {
    user?: string;
    recipient?: string;
    amount?: number;
    content?: string;
    detectedPII?: string[];
  };
}

export function HITLGuardrails() {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editedContent, setEditedContent] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showEscalationDialog, setShowEscalationDialog] = useState(false);
  const [showRejectionConfirmation, setShowRejectionConfirmation] = useState(false);
  const [rejectedItem, setRejectedItem] = useState<ReviewItem | null>(null);
  const [finalRejectionReason, setFinalRejectionReason] = useState('');
  const [expandedTriggers, setExpandedTriggers] = useState<string[]>([]);
  const [triggerStates, setTriggerStates] = useState<Record<string, boolean>>({
    'pii-email': true,
    'pii-phone': true,
    'pii-address': true,
    'medical': true,
    'legal': false,
    'hate': true,
    'refund': true,
    'discount': true,
    'email-external': true,
    'data-export': true,
    'account-delete': true,
    'low-confidence': true,
    'hallucination': true,
    'new-domain': true,
    'vip-customer': true
  });

  const toggleTrigger = (triggerId: string) => {
    setTriggerStates(prev => {
      const newState = !prev[triggerId];
      toast.success(
        newState ? 'Trigger enabled' : 'Trigger disabled',
        {
          description: `${triggers.flatMap(g => g.items).find(i => i.id === triggerId)?.label} is now ${newState ? 'active' : 'inactive'}.`
        }
      );
      return {
        ...prev,
        [triggerId]: newState
      };
    });
  };

  // Mock data for review queue
  const reviewQueue: ReviewItem[] = [
    {
      id: 'RV-2024-001',
      timestamp: '2024-10-10 14:23:45',
      type: 'refund',
      action: 'Process $1,500 refund for customer order #45823',
      riskScore: 0.76,
      confidence: 0.52,
      status: 'pending',
      assignee: 'ComplianceLead',
      priority: 'high',
      sla: '2h 15m remaining',
      triggers: ['High dollar amount', 'Low confidence', 'Tool: Refund'],
      context: {
        user: 'support@company.com',
        recipient: 'customer@example.com',
        amount: 1500,
        content: 'I apologize for the inconvenience with your recent order. Based on our investigation, I\'d like to offer a 25% refund of $1,500 to resolve this matter.'
      }
    },
    {
      id: 'RV-2024-002',
      timestamp: '2024-10-10 14:20:12',
      type: 'email',
      action: 'Send external email to new domain',
      riskScore: 0.68,
      confidence: 0.71,
      status: 'pending',
      priority: 'medium',
      sla: '3h 42m remaining',
      triggers: ['External email', 'New recipient domain', 'PII detected'],
      context: {
        user: 'sales@company.com',
        recipient: 'prospect@newclient.com',
        content: 'Hi Sarah, Following up on our conversation. Here are the details you requested...',
        detectedPII: ['Phone number', 'Email address']
      }
    },
    {
      id: 'RV-2024-003',
      timestamp: '2024-10-10 14:18:33',
      type: 'message',
      action: 'Send customer-facing message',
      riskScore: 0.82,
      confidence: 0.45,
      status: 'pending',
      assignee: 'SeniorAgent',
      priority: 'critical',
      sla: '1h 05m remaining',
      triggers: ['Low confidence', 'Product recall topic', 'Customer-facing'],
      context: {
        recipient: 'VIP Customer',
        content: 'We\'re investigating a potential issue with your device. As a precaution, please stop using it immediately...'
      }
    },
    {
      id: 'RV-2024-004',
      timestamp: '2024-10-10 14:15:01',
      type: 'deletion',
      action: 'Delete user account and data',
      riskScore: 0.91,
      confidence: 0.88,
      status: 'pending',
      assignee: 'DataProtectionOfficer',
      priority: 'critical',
      sla: '45m remaining',
      triggers: ['Account deletion', 'Data export', 'Irreversible action'],
      context: {
        user: 'admin@company.com',
        content: 'Delete account user_12345 including all associated data per GDPR request'
      }
    },
    {
      id: 'RV-2024-005',
      timestamp: '2024-10-10 13:58:22',
      type: 'export',
      action: 'Export customer database',
      riskScore: 0.85,
      confidence: 0.92,
      status: 'approved',
      assignee: 'SecurityOps',
      priority: 'high',
      sla: 'Completed',
      triggers: ['Data export', 'Large dataset', 'PII included'],
      context: {
        user: 'analytics@company.com',
        content: 'Export last 90 days of customer interactions for Q4 analysis'
      }
    }
  ];

  const metrics = {
    pendingReviews: 4,
    avgTimeToDecision: '12m',
    autoApproveRate: 87.3,
    escalationRate: 4.2,
    todayReviews: 47,
    blockedActions: 8
  };

  const triggers = [
    {
      category: 'Content Detection',
      description: 'Automatically detect and flag sensitive content in AI outputs',
      items: [
        { 
          id: 'pii-email', 
          label: 'PII: Email addresses', 
          enabled: true,
          description: 'Triggers when email addresses are detected in AI-generated responses',
          whatItDoes: 'Scans all AI outputs for email address patterns (e.g., user@example.com) and flags them for human review before sending.',
          whyItMatters: 'Email addresses are personal data under GDPR/CCPA. Sharing incorrect or unauthorized email addresses can violate privacy regulations and damage customer trust.',
          examples: [
            'AI response: "Contact support@company.com" â†’ Flagged if external recipient',
            'AI response: "Your account is john.doe@gmail.com" â†’ Always flagged for verification'
          ],
          technicalDetails: {
            method: 'Regex pattern matching + NLP entity recognition',
            falsePositiveRate: '~2%',
            processingTime: '<50ms'
          },
          complianceImpact: ['GDPR Article 5', 'CCPA Â§ 1798.100', 'ISO 27701'],
          recommendedFor: ['Customer support responses', 'External communications', 'Data export requests']
        },
        { 
          id: 'pii-phone', 
          label: 'PII: Phone numbers', 
          enabled: true,
          description: 'Detects phone numbers in various international formats',
          whatItDoes: 'Identifies phone numbers (US, international, with/without country codes) in AI responses and requires human verification before proceeding.',
          whyItMatters: 'Phone numbers are sensitive PII. Incorrect numbers can lead to privacy breaches, harassment, or failed critical communications.',
          examples: [
            'AI: "Call us at (555) 123-4567" â†’ Flagged for verification',
            'AI: "Your number on file is +1-555-987-6543" â†’ Requires confirmation',
            'International: "+44 20 7123 4567" â†’ Detected and flagged'
          ],
          technicalDetails: {
            method: 'Multi-format regex + libphonenumber validation',
            supportedFormats: ['E.164', 'National', 'RFC3966', 'Custom'],
            processingTime: '<50ms'
          },
          complianceImpact: ['GDPR Article 5', 'TCPA compliance', 'CPRA'],
          recommendedFor: ['Customer callbacks', 'Account verification', 'Emergency contacts']
        },
        { 
          id: 'pii-address', 
          label: 'PII: Physical addresses', 
          enabled: true,
          description: 'Detects physical mailing addresses and geographic locations',
          whatItDoes: 'Scans for street addresses, postal codes, and location information in AI outputs to prevent unauthorized disclosure.',
          whyItMatters: 'Physical addresses can be used for identity theft, stalking, or unwanted mail. Critical for protecting vulnerable individuals.',
          examples: [
            'AI: "Ship to 123 Main St, Anytown, CA 90210" â†’ Requires review',
            'AI: "Your registered address is..." â†’ Flagged for verification',
            'Partial addresses: "Lives on Main Street in Boston" â†’ Also detected'
          ],
          technicalDetails: {
            method: 'NER (Named Entity Recognition) + geocoding validation',
            coverage: 'Global address formats',
            processingTime: '<100ms'
          },
          complianceImpact: ['GDPR', 'Data Protection Act 2018', 'PIPEDA'],
          recommendedFor: ['Shipping confirmations', 'Billing communications', 'Location-based services']
        },
        { 
          id: 'medical', 
          label: 'Medical information', 
          enabled: true,
          description: 'Identifies health-related data and medical terminology',
          whatItDoes: 'Detects medical conditions, diagnoses, medications, and health data. Triggers immediate review due to HIPAA sensitivity.',
          whyItMatters: 'Medical information is protected under HIPAA (US), GDPR (EU), and similar laws worldwide. Unauthorized disclosure can result in massive fines and lawsuits.',
          examples: [
            'AI: "Based on your diabetes diagnosis..." â†’ Critical flag',
            'AI: "You mentioned taking Metformin" â†’ Health data detected',
            'AI: "Your recent surgery on..." â†’ Immediate review required',
            'Mental health: "Your anxiety symptoms..." â†’ Extra sensitive'
          ],
          technicalDetails: {
            method: 'Medical NLP models + SNOMED CT/ICD-10 matching',
            medicalDatabases: ['UMLS', 'RxNorm', 'SNOMED CT'],
            accuracy: '94.7%'
          },
          complianceImpact: ['HIPAA', 'HITECH Act', 'GDPR Article 9', 'State medical privacy laws'],
          recommendedFor: ['Healthcare applications', 'Wellness chatbots', 'Insurance communications']
        },
        { 
          id: 'legal', 
          label: 'Legal content', 
          enabled: false,
          description: 'Detects legal advice, contract terms, and regulatory language',
          whatItDoes: 'Flags responses containing legal terminology, contract language, or regulatory guidance that could constitute unauthorized legal advice.',
          whyItMatters: 'Providing legal advice without proper licensing exposes your organization to liability. Even disclaimers may not protect you.',
          examples: [
            'AI: "You should sue them for breach of contract" â†’ Legal advice detected',
            'AI: "This violates Section 1983 of..." â†’ Flagged for review',
            'AI: "You have the right to..." â†’ May be legal interpretation',
            'Safe: "Consider consulting an attorney" â†’ Educational, not advice'
          ],
          technicalDetails: {
            method: 'Legal ontology matching + intent classification',
            legalDatabases: ['Black\'s Law Dictionary', 'USC', 'CFR references'],
            confidence: '89.3%'
          },
          complianceImpact: ['Unauthorized practice of law', 'Professional liability', 'State bar regulations'],
          recommendedFor: ['Legal tech platforms', 'Compliance tools', 'HR systems']
        },
        { 
          id: 'hate', 
          label: 'Hate speech / harassment', 
          enabled: true,
          description: 'Detects toxic, abusive, or discriminatory language',
          whatItDoes: 'Uses advanced toxicity models to identify hate speech, harassment, discrimination, and harmful content in AI outputs.',
          whyItMatters: 'Allowing hateful or harassing content violates platform policies, damages brand reputation, and may violate anti-discrimination laws.',
          examples: [
            'Slurs or epithets targeting protected classes',
            'Threats or intimidation',
            'Discriminatory statements about race, gender, religion, etc.',
            'Subtle bias: "You people always..." â†’ Context-aware detection'
          ],
          technicalDetails: {
            method: 'Perspective API + custom ML models',
            categories: ['Toxicity', 'Severe Toxicity', 'Identity Attack', 'Insult', 'Threat'],
            languages: '100+ supported'
          },
          complianceImpact: ['Title VII (US)', 'Equality Act 2010 (UK)', 'EU Digital Services Act', 'Platform TOS'],
          recommendedFor: ['All customer-facing AI', 'Moderation systems', 'Public communications']
        }
      ]
    },
    {
      category: 'Financial Actions',
      description: 'Require approval for monetary transactions and financial commitments',
      items: [
        { 
          id: 'refund', 
          label: 'Refunds > $1000', 
          enabled: true,
          description: 'Requires human approval for refund requests exceeding $1,000',
          whatItDoes: 'Automatically detects when AI attempts to issue refunds over $1,000 and routes them to authorized personnel for approval.',
          whyItMatters: 'Large refunds impact revenue, can indicate fraud patterns, and require proper authorization chains per SOX compliance and internal controls.',
          examples: [
            'AI: "I\'ll process a $1,500 refund" â†’ Blocked, requires approval',
            'AI: "You qualify for a full refund of $2,400" â†’ Escalated to finance team',
            'Multiple small refunds totaling >$1000 â†’ Also detected if within 24h'
          ],
          technicalDetails: {
            method: 'Intent classification + amount extraction',
            aggregation: 'Tracks cumulative refunds per customer per period',
            fraudDetection: 'Integrated with fraud scoring system'
          },
          complianceImpact: ['SOX Section 404', 'Internal controls', 'Fraud prevention', 'Revenue recognition'],
          recommendedFor: ['E-commerce', 'SaaS subscriptions', 'Financial services'],
          configurable: {
            threshold: '$1000 (adjustable)',
            timeWindow: '24 hours',
            exemptions: 'VIP customers can have higher limits'
          }
        },
        { 
          id: 'discount', 
          label: 'Discounts > 20%', 
          enabled: true,
          description: 'Flags discount offers exceeding 20% of product/service value',
          whatItDoes: 'Detects when AI offers discounts greater than 20% and requires manager approval to prevent margin erosion.',
          whyItMatters: 'Large discounts affect profitability, pricing strategy, and can set unrealistic customer expectations. Authorization prevents revenue leakage.',
          examples: [
            'AI: "I can offer you 25% off" â†’ Requires approval',
            'AI: "Here\'s a 30% discount code: SAVE30" â†’ Blocked',
            'Combo deals: "Buy one get one 50% off" â†’ Calculated as 25% total discount'
          ],
          technicalDetails: {
            method: 'Price extraction + discount calculation engine',
            handles: ['Percentage discounts', 'Dollar amounts', 'Combo offers', 'Free shipping'],
            marginProtection: 'Integrated with product cost data'
          },
          complianceImpact: ['Pricing integrity', 'Revenue management', 'Competitive pricing policies'],
          recommendedFor: ['Retail', 'B2B sales', 'Subscription services'],
          configurable: {
            threshold: '20% (adjustable by product category)',
            approverRoles: ['Sales manager', 'Revenue operations'],
            blackoutPeriods: 'Higher restrictions during key sales periods'
          }
        }
      ]
    },
    {
      category: 'Communication Actions',
      description: 'Control external communications and data sharing',
      items: [
        { 
          id: 'email-external', 
          label: 'Outbound emails', 
          enabled: true,
          description: 'Reviews all AI-composed emails before sending to external recipients',
          whatItDoes: 'Queues every email generated by AI for human review before it reaches customers, partners, or external parties.',
          whyItMatters: 'Email is your brand\'s voice. AI errors, tone issues, or factual mistakes in email can damage relationships and violate anti-spam laws.',
          examples: [
            'Customer support emails â†’ Always reviewed',
            'Sales outreach â†’ Checked for accuracy and tone',
            'Partner communications â†’ Verified for professionalism',
            'Mass emails â†’ Extra scrutiny for CAN-SPAM compliance'
          ],
          technicalDetails: {
            method: 'Email intent classification + recipient validation',
            checks: ['Tone analysis', 'Factual accuracy', 'Brand voice', 'Spam indicators'],
            integration: 'Connects with your email system (Gmail, Outlook, SendGrid)'
          },
          complianceImpact: ['CAN-SPAM Act', 'GDPR email consent', 'CASL (Canada)', 'Brand protection'],
          recommendedFor: ['All AI email tools', 'Customer service automation', 'Marketing automation'],
          configurable: {
            exemptions: 'Internal emails can be auto-approved',
            urgency: 'Critical emails have 15-min SLA',
            bulkThreshold: 'Emails to >50 recipients require extra review'
          }
        },
        { 
          id: 'data-export', 
          label: 'Data exports', 
          enabled: true,
          description: 'Requires approval for any customer data export or download',
          whatItDoes: 'Intercepts AI attempts to export customer data, user lists, reports, or databases. Routes to data protection officer for approval.',
          whyItMatters: 'Data exports are primary vectors for data breaches. GDPR requires strict controls. Unauthorized exports can lead to massive fines and reputation damage.',
          examples: [
            'AI: "Exporting customer list to CSV" â†’ Blocked immediately',
            'AI: "Downloading user activity report" â†’ Requires DPO approval',
            'API calls exporting >100 records â†’ Flagged automatically',
            'GDPR data portability requests â†’ Legal review required'
          ],
          technicalDetails: {
            method: 'Data flow monitoring + export detection',
            monitors: ['File downloads', 'API exports', 'Database queries', 'Screen scraping'],
            encryption: 'All approved exports are encrypted at rest'
          },
          complianceImpact: ['GDPR Article 32', 'CCPA data security', 'SOC 2', 'ISO 27001', 'Data breach prevention'],
          recommendedFor: ['All applications handling customer data', 'CRM systems', 'Analytics platforms'],
          configurable: {
            recordLimit: 'Auto-approve exports <10 records',
            dataTypes: 'Stricter rules for PII vs. aggregated data',
            destinations: 'Whitelist approved export locations'
          }
        },
        { 
          id: 'account-delete', 
          label: 'Account deletions', 
          enabled: true,
          description: 'Prevents AI from deleting user accounts without explicit authorization',
          whatItDoes: 'Blocks all account deletion attempts by AI. Routes deletion requests through proper verification and approval workflow.',
          whyItMatters: 'Account deletion is irreversible. Mistakes can delete paying customers, violate retention policies, or fail to comply with "right to deletion" procedures.',
          examples: [
            'AI: "Deleting your account as requested" â†’ Stopped, requires verification',
            'Inactive account cleanup â†’ Must have manager approval',
            'GDPR deletion requests â†’ Legal review + identity verification required',
            'Accidental deletions â†’ Prevention is critical (no undo)'
          ],
          technicalDetails: {
            method: 'Destructive action detection + identity verification',
            safeguards: ['Multi-step confirmation', 'Cooling-off period', 'Data backup', 'Audit trail'],
            recovery: '30-day soft delete before permanent removal'
          },
          complianceImpact: ['GDPR Right to Erasure', 'CCPA deletion rights', 'Data retention policies', 'SOX'],
          recommendedFor: ['All user account systems', 'SaaS platforms', 'Subscription services'],
          configurable: {
            coolingOff: '48-hour minimum before permanent deletion',
            verificationMethod: 'Email + phone + security questions',
            retention: 'Keep audit logs per compliance requirements'
          }
        }
      ]
    },
    {
      category: 'Model Confidence',
      description: 'Flag uncertain or potentially unreliable AI outputs',
      items: [
        { 
          id: 'low-confidence', 
          label: 'Model confidence < 65%', 
          enabled: true,
          description: 'Triggers review when AI confidence score falls below 65%',
          whatItDoes: 'Every AI response includes a confidence score (0-100%). Responses below 65% are automatically flagged because the AI itself is uncertain.',
          whyItMatters: 'Low confidence means the AI is guessing. In critical applications (support, medical, financial), wrong answers can cause serious harm.',
          examples: [
            'AI 45% confident: "I think your order was..." â†’ Requires human verification',
            'AI 60% confident on policy question â†’ Escalated to expert',
            'Complex technical query with 55% confidence â†’ Routed to specialist',
            'Simple FAQ with 95% confidence â†’ Auto-approved'
          ],
          technicalDetails: {
            method: 'Model logit/probability analysis + calibration',
            calibration: 'Confidence scores are temperature-scaled for accuracy',
            modelTypes: 'Works with LLMs, classification models, ensemble systems'
          },
          complianceImpact: ['AI Act transparency requirements', 'Accuracy standards', 'Consumer protection'],
          recommendedFor: ['High-stakes decisions', 'Regulated industries', 'Customer-facing AI'],
          configurable: {
            threshold: '65% (adjustable 50-90%)',
            contextAware: 'Lower threshold OK for casual chat, higher for financial advice',
            trainingFeedback: 'Low confidence cases used to improve model'
          }
        },
        { 
          id: 'hallucination', 
          label: 'Hallucination detection', 
          enabled: true,
          description: 'Detects when AI generates false or unsupported information',
          whatItDoes: 'Runs secondary validation to detect when AI makes up facts, cites non-existent sources, or provides information not in training data.',
          whyItMatters: 'Hallucinations erode trust and can cause serious harm (wrong medical info, fake citations, false claims). Detection prevents brand damage.',
          examples: [
            'AI cites "Section 123.4.5" that doesn\'t exist â†’ Hallucination detected',
            'AI: "According to our 2024 study" when no such study exists â†’ Flagged',
            'Made-up product features or capabilities â†’ Blocked',
            'Invented customer testimonials or statistics â†’ Requires verification'
          ],
          technicalDetails: {
            method: 'Multi-model validation + knowledge base grounding',
            techniques: ['Consistency checking', 'Source validation', 'Fact verification', 'Retrieval augmentation'],
            accuracy: '91.2% hallucination detection rate'
          },
          complianceImpact: ['AI Act accuracy requirements', 'FTC false advertising', 'Professional standards'],
          recommendedFor: ['All AI applications', 'Especially: medical, legal, financial, educational'],
          configurable: {
            sensitivity: 'Adjust false positive vs. false negative trade-off',
            knowledgeBase: 'Connect to your authoritative data sources',
            citations: 'Require AI to cite sources (then verify them)'
          }
        }
      ]
    },
    {
      category: 'Recipient Risk',
      description: 'Apply extra scrutiny based on who will receive the AI output',
      items: [
        { 
          id: 'new-domain', 
          label: 'New domains / contacts', 
          enabled: true,
          description: 'Flags communications to email domains or contacts not in your system',
          whatItDoes: 'Detects when AI attempts to send info to previously unknown email domains or new contacts. Prevents data leakage and social engineering attacks.',
          whyItMatters: 'New domains could be typos, phishing attempts, or unauthorized data exfiltration. Verification protects against social engineering and data breaches.',
          examples: [
            'AI sends data to "companey.com" (typo) â†’ Caught and corrected',
            'Request from "ceo@totallyrealcompany.com" â†’ Verified before responding',
            'First-time vendor communication â†’ Extra scrutiny applied',
            'Unusual TLD (.xyz, .top) â†’ Higher fraud risk'
          ],
          technicalDetails: {
            method: 'Domain reputation checking + historical analysis',
            checks: ['Domain age', 'MX records', 'Reputation scores', 'Typosquatting detection'],
            integrations: ['Whois lookup', 'DNS validation', 'Threat intelligence feeds']
          },
          complianceImpact: ['Data breach prevention', 'Anti-phishing', 'SOC 2', 'Cyber insurance requirements'],
          recommendedFor: ['Financial services', 'Healthcare', 'Government contractors', 'Any regulated industry'],
          configurable: {
            whitelist: 'Pre-approved domains bypass this check',
            domainAge: 'Flag domains <30 days old as suspicious',
            reputation: 'Integration with threat intel for known bad actors'
          }
        },
        { 
          id: 'vip-customer', 
          label: 'VIP / high-value customers', 
          enabled: true,
          description: 'Applies extra review for communications with your most important customers',
          whatItDoes: 'Identifies VIP customers (high LTV, executives, key accounts) and routes their AI interactions to senior staff for quality assurance.',
          whyItMatters: 'VIP customers expect white-glove service. AI mistakes with these accounts can cost millions in revenue or damage critical relationships.',
          examples: [
            'Enterprise customer with $1M ARR â†’ Always reviewed by account manager',
            'Executive from Fortune 500 client â†’ Routed to VP of Customer Success',
            'Renewal at risk + high LTV â†’ Extra care and personalization',
            'Board member or investor â†’ CEO review required'
          ],
          technicalDetails: {
            method: 'CRM integration + customer segmentation',
            vipCriteria: ['Revenue', 'Contract value', 'Strategic importance', 'Custom tags'],
            routing: 'Intelligent assignment to appropriate reviewer based on account'
          },
          complianceImpact: ['SLA compliance', 'Contract commitments', 'Relationship management'],
          recommendedFor: ['B2B SaaS', 'Enterprise sales', 'Wealth management', 'Premium services'],
          configurable: {
            vipDefinition: 'Define by revenue, tags, or custom attributes',
            tierLevels: 'Different review processes for different VIP tiers',
            responseTime: 'VIP SLAs typically 1-2 hours max'
          }
        }
      ]
    }
  ];

  const auditLog = [
    {
      id: 'AUD-001',
      timestamp: '2024-10-10 13:58:45',
      reviewer: 'sarah.chen@company.com',
      action: 'Approved with edits',
      itemId: 'RV-2024-005',
      changes: 'Reduced export scope to 60 days, removed SSN column',
      rationale: 'Sufficient data for analysis without unnecessary PII exposure'
    },
    {
      id: 'AUD-002',
      timestamp: '2024-10-10 13:45:12',
      reviewer: 'mike.rodriguez@company.com',
      action: 'Rejected',
      itemId: 'RV-2024-007',
      rationale: 'Refund amount exceeds customer lifetime value. Escalated to finance.'
    },
    {
      id: 'AUD-003',
      timestamp: '2024-10-10 13:32:08',
      reviewer: 'system',
      action: 'Auto-approved',
      itemId: 'RV-2024-008',
      rationale: 'Risk score 0.15, all checks passed'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'escalated': return 'outline';
      default: return 'secondary';
    }
  };

  const handleApprove = () => {
    console.log('Approved:', selectedReview?.id);
    setSelectedReview(null);
  };

  const handleApproveWithEdits = () => {
    console.log('Approved with edits:', selectedReview?.id, editedContent);
    setSelectedReview(null);
    setEditedContent('');
  };

  const handleReject = () => {
    console.log('Rejected:', selectedReview?.id, rejectReason);
    // Store the rejected item and reason for confirmation dialog
    setRejectedItem(selectedReview);
    setFinalRejectionReason(rejectReason);
    setShowRejectionConfirmation(true);
    // Clear the form
    setSelectedReview(null);
    setRejectReason('');
  };

  const handleEscalate = (escalationData: any) => {
    console.log('Escalated:', selectedReview?.id, escalationData);
    toast.success('Escalation sent successfully', {
      description: `${escalationData.supervisor} will be notified immediately via selected channels.`
    });
    setSelectedReview(null);
    setShowEscalationDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Human-in-the-Loop Guardrails</h2>
          <p className="text-sm text-muted-foreground">
            Require human approval for sensitive actions and responses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.todayReviews}</div>
            <p className="text-xs text-muted-foreground">Total reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              Avg Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgTimeToDecision}</div>
            <p className="text-xs text-muted-foreground">To decision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Auto-approve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.autoApproveRate}%</div>
            <p className="text-xs text-muted-foreground">Pass rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Escalations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.escalationRate}%</div>
            <p className="text-xs text-muted-foreground">Of reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-600" />
              Blocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.blockedActions}</div>
            <p className="text-xs text-muted-foreground">Risky actions</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="queue">Review Queue</TabsTrigger>
          <TabsTrigger value="escalations">Escalations</TabsTrigger>
          <TabsTrigger value="triggers">Triggers & Policies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        {/* Review Queue */}
        <TabsContent value="queue" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search reviews..." className="pl-10" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Queue List */}
            <div className="space-y-3">
              {reviewQueue
                .filter(item => filterStatus === 'all' || item.status === filterStatus)
                .map((item) => (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedReview?.id === item.id ? 'border-primary shadow-md' : ''
                    }`}
                    onClick={() => {
                      setSelectedReview(item);
                      setEditedContent(item.context.content || '');
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{item.id}</span>
                          </div>
                          <CardTitle className="text-sm">{item.action}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-xs">
                        {item.timestamp} â€¢ {item.sla}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-orange-600" />
                          <span>Risk: {(item.riskScore * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-blue-600" />
                          <span>Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.triggers.map((trigger, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                      {item.assignee && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          Assigned to {item.assignee}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Review Detail Panel */}
            <div className="lg:sticky lg:top-4">
              {selectedReview ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Review Details
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReview(null)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      {selectedReview.id} â€¢ {selectedReview.timestamp}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* What's Being Requested */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-sm text-blue-900 mb-2">What's Being Requested</h4>
                      <p className="text-sm text-blue-800 mb-3">
                        {selectedReview.action}
                      </p>
                      <div className="space-y-2 text-xs text-blue-700">
                        {selectedReview.context.user && (
                          <div className="flex items-start gap-2">
                            <User className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Initiated by:</span> {selectedReview.context.user}
                            </div>
                          </div>
                        )}
                        {selectedReview.context.recipient && (
                          <div className="flex items-start gap-2">
                            <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Recipient:</span> {selectedReview.context.recipient}
                            </div>
                          </div>
                        )}
                        {selectedReview.context.amount && (
                          <div className="flex items-start gap-2">
                            <DollarSign className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Amount:</span> ${selectedReview.context.amount.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Why This Needs Review */}
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-sm text-orange-900 mb-2">Why This Needs Review</h4>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-orange-800">Risk Score</span>
                          <span className="font-medium text-orange-900">{(selectedReview.riskScore * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={selectedReview.riskScore * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-orange-800">AI Confidence</span>
                          <span className="font-medium text-orange-900">{(selectedReview.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={selectedReview.confidence * 100} className="h-2" />
                      </div>
                      <p className="text-xs text-orange-700">
                        This action was flagged because it exceeds automated approval thresholds. 
                        {selectedReview.riskScore > 0.7 && ' High risk score requires human oversight.'}
                        {selectedReview.confidence < 0.7 && ' Low AI confidence requires verification.'}
                      </p>
                    </div>

                    {/* Triggered Policy Rules */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Triggered Policy Rules</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedReview.triggers.map((trigger, idx) => (
                          <Badge key={idx} variant="secondary">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* PII Detection */}
                    {selectedReview.context.detectedPII && selectedReview.context.detectedPII.length > 0 && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">Sensitive Data Detected</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {selectedReview.context.detectedPII.map((pii, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {pii}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-purple-700">
                          This content contains personally identifiable information that requires careful review.
                        </p>
                      </div>
                    )}

                    {/* Content Preview/Editor */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">AI-Generated Content</label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Review and edit the content below before approval. Changes will be tracked in the audit log.
                      </p>
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="min-h-32 font-mono text-sm"
                      />
                      {editedContent !== selectedReview.context.content && (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                          <AlertTriangle className="w-3 h-3" />
                          Content has been modified - use "Approve with Edits" to save changes
                        </div>
                      )}
                    </div>

                    {/* Response Time SLA */}
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Review SLA: {selectedReview.sla}
                        </span>
                      </div>
                      <p className="text-xs text-yellow-700">
                        Please review and take action before the SLA expires to prevent delays.
                      </p>
                    </div>

                    {/* What Happens Next - Decision Outcomes */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                      <h4 className="font-medium text-sm">Decision Outcomes</h4>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex gap-2 items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-green-800">Approve (as-is)</div>
                            <div className="text-muted-foreground">
                              {selectedReview.type === 'refund' && `The ${selectedReview.context.amount?.toLocaleString()} refund will be processed immediately and the customer will be notified.`}
                              {selectedReview.type === 'email' && 'The email will be sent to the recipient without modifications.'}
                              {selectedReview.type === 'message' && 'The message will be shown to the customer exactly as written.'}
                              {selectedReview.type === 'deletion' && 'The account and all associated data will be permanently deleted.'}
                              {selectedReview.type === 'export' && 'The data export will begin and files will be generated for download.'}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 items-start">
                          <Edit className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-blue-800">Approve with Edits</div>
                            <div className="text-muted-foreground">
                              Your modified version will be used instead of the AI-generated content. All changes are logged with your name and timestamp.
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 items-start">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-red-800">Reject</div>
                            <div className="text-muted-foreground">
                              The action will be blocked and not executed. The requester will be notified with your rationale. This decision is recorded in the audit log.
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 items-start">
                          <TrendingUp className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-purple-800">Escalate</div>
                            <div className="text-muted-foreground">
                              Route this to a supervisor or specialist for additional review. The SLA timer continues during escalation.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t">
                      {/* Approve Buttons */}
                      <div className="space-y-2">
                        <Button className="w-full" onClick={handleApprove}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve (as-is)
                        </Button>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={handleApproveWithEdits}
                          disabled={editedContent === selectedReview.context.content}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Approve with Edits
                        </Button>
                      </div>

                      {/* Reject Section - More Prominent */}
                      <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg space-y-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-900 text-sm mb-1">Reject This Action</h4>
                            <p className="text-xs text-red-700">
                              Blocking this action requires a detailed explanation. Your rationale will be sent to the requester and permanently logged.
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-red-900 block">
                            Rejection Reason (Required) *
                          </label>
                          <Textarea
                            placeholder="Example: This refund exceeds policy limits for this customer segment. The customer has already received two refunds this quarter totaling $2,400. Per Policy G-402, additional refunds require executive approval."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className={`min-h-24 ${rejectReason.trim() ? 'border-red-300 bg-white' : 'border-red-200'}`}
                          />
                          {rejectReason.length > 0 && (
                            <div className="flex items-center justify-between text-xs">
                              <span className={rejectReason.length >= 50 ? 'text-green-700' : 'text-red-700'}>
                                {rejectReason.length} characters
                              </span>
                              <span className="text-muted-foreground">
                                Good rejections are 50-200 characters
                              </span>
                            </div>
                          )}
                          
                          <div className="p-2 bg-red-100 border border-red-300 rounded text-xs text-red-800">
                            <strong>Include:</strong> Policy violations, risk factors, and alternative actions
                            <br />
                            <strong>Don't include:</strong> Sensitive customer data or personal opinions
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={handleReject}
                          disabled={!rejectReason.trim()}
                          size="lg"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject & Block Action
                        </Button>

                        {!rejectReason.trim() && (
                          <p className="text-xs text-red-600 text-center">
                            âš ï¸ You must provide a rejection reason to proceed
                          </p>
                        )}
                      </div>

                      {/* Escalate Button */}
                      <Button className="w-full" variant="outline" onClick={() => setShowEscalationDialog(true)}>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Escalate to Supervisor
                      </Button>
                    </div>

                    {/* Audit Note */}
                    <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                      â“˜ Approving attaches your name, rationale, and full trace to this action
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Eye className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No Item Selected</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a review item from the queue to view details and take action
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Escalations Tab */}
        <TabsContent value="escalations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Active Escalations
              </CardTitle>
              <CardDescription>
                Review items that have been escalated to supervisors and are awaiting their decision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Escalated Items */}
              {[
                {
                  id: 'RV-2024-007',
                  originalReviewId: 'RV-2024-007',
                  action: 'Refund amount exceeds customer lifetime value',
                  escalatedBy: 'mike.rodriguez@company.com',
                  escalatedTo: 'Sarah Chen - Senior Compliance Officer',
                  escalatedAt: '2024-10-10 13:45:12',
                  priority: 'high',
                  status: 'awaiting-supervisor',
                  reason: 'Refund amount exceeds customer lifetime value. Escalated to finance.',
                  notificationMethods: ['Email', 'In-App', 'Slack'],
                  expectedResponseTime: '1 hour',
                  timeRemaining: '23 minutes',
                  supervisorAvgResponseTime: '15 minutes'
                },
                {
                  id: 'RV-2024-009',
                  originalReviewId: 'RV-2024-009',
                  action: 'Export customer data with GDPR implications',
                  escalatedBy: 'anna.wilson@company.com',
                  escalatedTo: 'Alex Kim - Data Protection Officer',
                  escalatedAt: '2024-10-10 12:30:45',
                  priority: 'critical',
                  status: 'supervisor-reviewing',
                  reason: 'Cross-border data transfer requires DPO approval per GDPR Article 45.',
                  notificationMethods: ['Email', 'In-App', 'SMS'],
                  expectedResponseTime: 'Immediate',
                  timeRemaining: 'In progress',
                  supervisorAvgResponseTime: '1.2 hours',
                  supervisorNote: 'Reviewing with legal team. Will respond within 30 minutes.'
                },
                {
                  id: 'RV-2024-003',
                  originalReviewId: 'RV-2024-003',
                  action: 'Delete high-value customer account',
                  escalatedBy: 'james.park@company.com',
                  escalatedTo: 'Michael Rodriguez - VP of Governance',
                  escalatedAt: '2024-10-10 11:15:22',
                  priority: 'medium',
                  status: 'resolved',
                  resolution: 'Approved with modifications',
                  reason: 'Customer retention strategy requires executive approval for accounts >$50k LTV.',
                  notificationMethods: ['Email', 'In-App'],
                  expectedResponseTime: '4 hours',
                  resolvedAt: '2024-10-10 14:05:18',
                  supervisorDecision: 'Approved account deletion after 30-day retention hold and personal outreach from account manager.',
                  supervisorAvgResponseTime: '23 minutes'
                }
              ].map((escalation) => (
                <Card key={escalation.id} className={escalation.status === 'resolved' ? 'opacity-60' : ''}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{escalation.id}</span>
                            <Badge
                              variant={
                                escalation.priority === 'critical' ? 'destructive' :
                                escalation.priority === 'high' ? 'default' :
                                'secondary'
                              }
                              className="text-xs"
                            >
                              {escalation.priority}
                            </Badge>
                            <Badge
                              variant={
                                escalation.status === 'resolved' ? 'default' :
                                escalation.status === 'supervisor-reviewing' ? 'secondary' :
                                'outline'
                              }
                            >
                              {escalation.status === 'awaiting-supervisor' && 'Awaiting Supervisor'}
                              {escalation.status === 'supervisor-reviewing' && 'Supervisor Reviewing'}
                              {escalation.status === 'resolved' && 'Resolved'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{escalation.action}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Full Details
                        </Button>
                      </div>

                      {/* Escalation Path */}
                      <div className="grid md:grid-cols-2 gap-4 p-3 bg-accent rounded-lg">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-3 h-3 text-blue-600" />
                            <span className="text-xs font-medium">Escalated By</span>
                          </div>
                          <p className="text-sm">{escalation.escalatedBy}</p>
                          <p className="text-xs text-muted-foreground">{escalation.escalatedAt}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-medium">Escalated To</span>
                          </div>
                          <p className="text-sm">{escalation.escalatedTo}</p>
                          <p className="text-xs text-muted-foreground">
                            Avg response: {escalation.supervisorAvgResponseTime}
                          </p>
                        </div>
                      </div>

                      {/* Reason */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="w-3 h-3" />
                          <span className="text-xs font-medium">Escalation Reason</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{escalation.reason}</p>
                      </div>

                      {/* Notification Methods */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Send className="w-3 h-3" />
                          <span className="text-xs font-medium">Notification Channels</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {escalation.notificationMethods.map((method, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {method}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      {escalation.status === 'awaiting-supervisor' && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-900">Awaiting Response</span>
                          </div>
                          <p className="text-xs text-yellow-800">
                            Expected within {escalation.expectedResponseTime} â€¢ {escalation.timeRemaining} remaining
                          </p>
                        </div>
                      )}

                      {escalation.status === 'supervisor-reviewing' && escalation.supervisorNote && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Supervisor Update</span>
                          </div>
                          <p className="text-xs text-blue-800">{escalation.supervisorNote}</p>
                        </div>
                      )}

                      {escalation.status === 'resolved' && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">
                              {escalation.resolution}
                            </span>
                          </div>
                          <p className="text-xs text-green-800">
                            Resolved at {escalation.resolvedAt}
                          </p>
                          {escalation.supervisorDecision && (
                            <div className="pt-2 border-t border-green-200">
                              <p className="text-xs font-medium text-green-900 mb-1">Supervisor Decision:</p>
                              <p className="text-xs text-green-800">{escalation.supervisorDecision}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Buttons for Escalator */}
                      {escalation.status !== 'resolved' && (
                        <div className="flex gap-2 pt-2 border-t">
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="w-3 h-3" />
                            Request Update
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageSquare className="w-3 h-3" />
                            Add Context
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Empty State - Only show if no escalations */}
              {false && (
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No Active Escalations</h3>
                  <p className="text-sm text-muted-foreground">
                    When review items are escalated to supervisors, they'll appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Escalation Workflow Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Escalation Workflow
              </CardTitle>
              <CardDescription>
                Understanding the escalation process and what happens at each stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Workflow Steps */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-medium text-sm">
                        1
                      </div>
                      <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-medium mb-1">Reviewer Initiates Escalation</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Reviewer determines the decision requires higher authority or specialized expertise and clicks "Escalate to Supervisor"
                      </p>
                      <Badge variant="outline" className="text-xs">Status: Initiated</Badge>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-medium text-sm">
                        2
                      </div>
                      <div className="w-0.5 h-full bg-purple-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-medium mb-1">Supervisor Notified</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Selected supervisor receives notifications via chosen channels (Email, In-App, SMS, Slack) with full context
                      </p>
                      <Badge variant="outline" className="text-xs">Status: Awaiting Supervisor</Badge>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-medium text-sm">
                        3
                      </div>
                      <div className="w-0.5 h-full bg-orange-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-medium mb-1">Supervisor Reviews</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Supervisor accesses full review context, risk signals, escalation reason, and can request additional information
                      </p>
                      <Badge variant="outline" className="text-xs">Status: Supervisor Reviewing</Badge>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-medium text-sm">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">Decision & Resolution</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Supervisor approves, rejects, or approves with modifications. Original reviewer and stakeholders are notified
                      </p>
                      <Badge variant="default" className="text-xs">Status: Resolved</Badge>
                    </div>
                  </div>
                </div>

                {/* SLA Guidelines */}
                <div className="p-4 bg-slate-50 border rounded-lg">
                  <h4 className="font-medium mb-3">Expected Response Times by Priority</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Critical Priority</span>
                      </div>
                      <span className="text-muted-foreground">Immediate response required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>High Priority</span>
                      </div>
                      <span className="text-muted-foreground">Within 1 hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Medium Priority</span>
                      </div>
                      <span className="text-muted-foreground">Within 4 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Low Priority</span>
                      </div>
                      <span className="text-muted-foreground">Within 24-48 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Triggers & Policies */}
        <TabsContent value="triggers" className="space-y-6">
          {/* Info Banner */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900">Understanding Triggers & Policies</h4>
                  <p className="text-sm text-blue-800">
                    Triggers define when AI actions require human review. Click any trigger below to expand and see detailed information including:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4">
                    <li>â€¢ <strong>What it does</strong> - How the trigger works technically</li>
                    <li>â€¢ <strong>Why it matters</strong> - The business and compliance rationale</li>
                    <li>â€¢ <strong>Examples</strong> - Real-world scenarios that trigger review</li>
                    <li>â€¢ <strong>Technical details</strong> - Implementation specifics and accuracy metrics</li>
                    <li>â€¢ <strong>Compliance impact</strong> - Relevant regulations and standards</li>
                    <li>â€¢ <strong>Configuration options</strong> - How to customize for your needs</li>
                  </ul>
                  <p className="text-sm text-blue-800 mt-2">
                    ðŸ’¡ <strong>Tip:</strong> Start with recommended triggers enabled, then adjust based on your risk tolerance and team capacity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Trigger Configuration
              </CardTitle>
              <CardDescription>
                Configure when human review is required for AI actions and responses. Click any trigger to view complete details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bulk Actions */}
              <div className="flex items-center justify-between p-4 bg-slate-50 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium">Quick Actions</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setTriggerStates(prev => {
                        const newStates = { ...prev };
                        Object.keys(newStates).forEach(key => {
                          newStates[key] = true;
                        });
                        toast.success('All triggers enabled', {
                          description: 'Maximum protection is now active.'
                        });
                        return newStates;
                      });
                    }}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enable All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setTriggerStates(prev => {
                        const newStates = { ...prev };
                        Object.keys(newStates).forEach(key => {
                          newStates[key] = false;
                        });
                        toast.warning('All triggers disabled', {
                          description: 'AI actions will proceed without human review.'
                        });
                        return newStates;
                      });
                    }}
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Disable All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setTriggerStates({
                        'pii-email': true,
                        'pii-phone': true,
                        'pii-address': true,
                        'medical': true,
                        'legal': false,
                        'hate': true,
                        'refund': true,
                        'discount': true,
                        'email-external': true,
                        'data-export': true,
                        'account-delete': true,
                        'low-confidence': true,
                        'hallucination': true,
                        'new-domain': true,
                        'vip-customer': true
                      });
                      toast.success('Reset to defaults', {
                        description: 'Recommended trigger configuration applied.'
                      });
                    }}
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>

              {triggers.map((group) => {
                const activeCount = group.items.filter(item => triggerStates[item.id] ?? item.enabled).length;
                const totalCount = group.items.length;
                
                return (
                <div key={group.category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{group.category}</h4>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={activeCount === totalCount 
                        ? "bg-green-50 text-green-700 border-green-300" 
                        : activeCount > 0 
                          ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                          : "bg-gray-50 text-gray-700 border-gray-300"
                      }
                    >
                      {activeCount}/{totalCount} Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <Collapsible
                        key={item.id}
                        open={expandedTriggers.includes(item.id)}
                        onOpenChange={(open) => {
                          setExpandedTriggers(prev =>
                            open
                              ? [...prev, item.id]
                              : prev.filter(id => id !== item.id)
                          );
                        }}
                      >
                        <div className={`border rounded-lg transition-colors ${
                          (triggerStates[item.id] ?? item.enabled) 
                            ? 'border-green-200 bg-green-50/30' 
                            : 'border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between p-3 hover:bg-accent/50">
                            <div className="flex items-center gap-3 flex-1">
                              <Switch 
                                checked={triggerStates[item.id] ?? item.enabled} 
                                onCheckedChange={() => toggleTrigger(item.id)}
                              />
                              <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-2 flex-1 cursor-pointer">
                                  <label className="text-sm font-medium cursor-pointer">{item.label}</label>
                                  <ChevronDown
                                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                                      expandedTriggers.includes(item.id) ? 'transform rotate-180' : ''
                                    }`}
                                  />
                                </div>
                              </CollapsibleTrigger>
                            </div>
                            <Badge 
                              variant={(triggerStates[item.id] ?? item.enabled) ? "default" : "outline"} 
                              className={(triggerStates[item.id] ?? item.enabled) 
                                ? "ml-2 bg-green-600 text-white hover:bg-green-700" 
                                : "ml-2"
                              }
                            >
                              {(triggerStates[item.id] ?? item.enabled) ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>

                          <CollapsibleContent>
                            <div className="border-t p-4 bg-accent/30 space-y-4">
                              {/* Description */}
                              <div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>

                              {/* What It Does */}
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <h5 className="text-sm font-medium text-blue-900">What It Does</h5>
                                    <p className="text-sm text-blue-800 mt-1">{item.whatItDoes}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Why It Matters */}
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <Shield className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <h5 className="text-sm font-medium text-purple-900">Why It Matters</h5>
                                    <p className="text-sm text-purple-800 mt-1">{item.whyItMatters}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Examples */}
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <FileText className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <h5 className="text-sm font-medium text-green-900 mb-2">Examples</h5>
                                    <ul className="space-y-1.5">
                                      {item.examples.map((example, idx) => (
                                        <li key={idx} className="text-sm text-green-800 pl-3 border-l-2 border-green-300">
                                          {example}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Technical Details */}
                              {item.technicalDetails && (
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Code className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-orange-900 mb-2">Technical Details</h5>
                                      <div className="bg-orange-50 border border-orange-200 rounded p-3 space-y-1.5">
                                        {Object.entries(item.technicalDetails).map(([key, value]) => (
                                          <div key={key} className="flex items-start gap-2 text-sm">
                                            <span className="font-medium text-orange-900 capitalize min-w-[120px]">
                                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </span>
                                            <span className="text-orange-800">
                                              {Array.isArray(value) ? value.join(', ') : value}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Compliance Impact */}
                              {item.complianceImpact && item.complianceImpact.length > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Scale className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-indigo-900 mb-2">Compliance Impact</h5>
                                      <div className="flex flex-wrap gap-1.5">
                                        {item.complianceImpact.map((impact, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-300">
                                            {impact}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Recommended For */}
                              {item.recommendedFor && item.recommendedFor.length > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-teal-900 mb-2">Recommended For</h5>
                                      <div className="flex flex-wrap gap-1.5">
                                        {item.recommendedFor.map((rec, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">
                                            {rec}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Configurable Options */}
                              {item.configurable && (
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Settings className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-gray-900 mb-2">Configuration Options</h5>
                                      <div className="bg-gray-50 border border-gray-200 rounded p-3 space-y-1.5">
                                        {Object.entries(item.configurable).map(([key, value]) => (
                                          <div key={key} className="flex items-start gap-2 text-sm">
                                            <span className="font-medium text-gray-900 capitalize min-w-[120px]">
                                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </span>
                                            <span className="text-gray-700">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Settings className="w-3 h-3 mr-1" />
                                  Configure
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Play className="w-3 h-3 mr-1" />
                                  Test
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  View Stats
                                </Button>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}
                  </div>
                </div>
              );
              })}

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-medium">Advanced Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Risk Score Threshold
                    </label>
                    <Input type="number" defaultValue="0.65" step="0.05" min="0" max="1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Queue items with risk score above this value
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Confidence Threshold
                    </label>
                    <Input type="number" defaultValue="0.65" step="0.05" min="0" max="1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Queue items with confidence below this value
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  {Object.values(triggerStates).filter(Boolean).length} of {Object.keys(triggerStates).length} triggers active
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setTriggerStates({
                        'pii-email': true,
                        'pii-phone': true,
                        'pii-address': true,
                        'medical': true,
                        'legal': false,
                        'hate': true,
                        'refund': true,
                        'discount': true,
                        'email-external': true,
                        'data-export': true,
                        'account-delete': true,
                        'low-confidence': true,
                        'hallucination': true,
                        'new-domain': true,
                        'vip-customer': true
                      });
                      toast.success('Reset to defaults', {
                        description: 'Recommended trigger configuration applied.'
                      });
                    }}
                  >
                    Reset to Defaults
                  </Button>
                  <Button
                    onClick={() => {
                      toast.success('Configuration saved', {
                        description: 'Your trigger settings have been saved successfully.'
                      });
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Start Example
              </CardTitle>
              <CardDescription>
                Copy this YAML to enable HITL for high-risk actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-slate-950 text-slate-50 rounded-lg text-xs overflow-x-auto">
{`# Human-in-the-Loop Policy
hitl:
  enabled: true
  rules:
    - name: "High-value refunds"
      when:
        action_type: "refund"
        amount: "> 1000"
      then:
        require_review: true
        assign_to: ["ComplianceLead", "FinanceOwner"]
        sla: "2h"
        
    - name: "Low-confidence responses"
      when:
        confidence: "< 0.65"
        user_facing: true
      then:
        require_review: true
        assign_to: ["SeniorAgent"]
        sla: "1h"
        
    - name: "PII in external comms"
      when:
        pii_detected: true
        recipient: "external"
      then:
        require_review: true
        assign_to: ["PrivacyOfficer"]
        sla: "3h"`}
              </pre>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="gap-2">
                  <Copy className="w-4 h-4" />
                  Copy YAML
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileDown className="w-4 h-4" />
                  Download Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Review Outcomes (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-approved</span>
                  <span className="font-medium">87.3%</span>
                </div>
                <Progress value={87.3} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Approved (as-is)</span>
                  <span className="font-medium">8.2%</span>
                </div>
                <Progress value={8.2} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Approved with edits</span>
                  <span className="font-medium">2.1%</span>
                </div>
                <Progress value={2.1} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rejected</span>
                  <span className="font-medium">1.8%</span>
                </div>
                <Progress value={1.8} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Escalated</span>
                  <span className="font-medium">0.6%</span>
                </div>
                <Progress value={0.6} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Time to Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">p50 (median)</span>
                  <span className="text-2xl font-bold">8m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">p95</span>
                  <span className="text-2xl font-bold">23m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">p99</span>
                  <span className="text-2xl font-bold">47m</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>15% faster than last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Top Rejection Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { reason: 'Amount exceeds policy limit', count: 12, pct: 42 },
                  { reason: 'Insufficient justification', count: 8, pct: 28 },
                  { reason: 'Compliance risk identified', count: 5, pct: 18 },
                  { reason: 'Incorrect recipient', count: 3, pct: 12 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.reason}</span>
                      <span className="text-muted-foreground">{item.count} times</span>
                    </div>
                    <Progress value={item.pct} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Reviewer Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'sarah.chen@company.com', reviews: 47, avgTime: '11m', overrides: 2 },
                  { name: 'mike.rodriguez@company.com', reviews: 38, avgTime: '15m', overrides: 1 },
                  { name: 'alex.kim@company.com', reviews: 31, avgTime: '9m', overrides: 0 }
                ].map((reviewer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{reviewer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {reviewer.reviews} reviews â€¢ {reviewer.avgTime} avg time
                      </div>
                    </div>
                    <Badge variant={reviewer.overrides > 2 ? 'secondary' : 'outline'}>
                      {reviewer.overrides} overrides
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Immutable Audit Log
                  </CardTitle>
                  <CardDescription>
                    Complete history of all review decisions and changes
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <FileDown className="w-4 h-4 mr-2" />
                  Export Log
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLog.map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{entry.action}</Badge>
                        <span className="text-sm font-medium">{entry.itemId}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{entry.reviewer}</span>
                    </div>
                    {entry.changes && (
                      <div className="text-sm">
                        <span className="font-medium">Changes: </span>
                        {entry.changes}
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium">Rationale: </span>
                      {entry.rationale}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Human Final Say Clause</h3>
              <p className="text-sm text-muted-foreground mb-3">
                HITL Guardrails ensure AI never acts alone on sensitive tasks. Set granular policies,
                route to the right reviewers, and retain full audit trails. Meet internal controls
                ("four-eyes"), regulatory expectations, and customer trustâ€”all without slowing teams down.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Best Practices Guide
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Dialog */}
      <EscalationDialog
        isOpen={showEscalationDialog}
        onClose={() => setShowEscalationDialog(false)}
        onEscalate={handleEscalate}
        reviewItem={selectedReview}
      />

      {/* Rejection Confirmation Dialog */}
      <RejectionConfirmationDialog
        isOpen={showRejectionConfirmation}
        onClose={() => setShowRejectionConfirmation(false)}
        reviewItem={rejectedItem}
        rejectionReason={finalRejectionReason}
      />
    </div>
  );
}
