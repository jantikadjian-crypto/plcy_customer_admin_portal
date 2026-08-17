import { useState } from 'react';
import { 
  Shield, 
  Scale,
  Bot,
  Users,
  Eye,
  Plug,
  Settings,
  HelpCircle,
  BookOpen,
  Home,
  ClipboardList,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  Globe,
  User,
  ChevronDown,
  ChevronRight,
  Building,
  LogIn,
  UserPlus,
  CheckCircle,
  Clock,
  Award,
  CheckSquare,
  GitBranch,
  Rocket,
  Package,
  FileCheck,
  FileText as FileTextIcon
} from 'lucide-react';
import { Button } from './components/ui/button';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import plcyLogo from '../imports/Color_logo_-_no_background.png';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarTrigger 
} from './components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './components/ui/collapsible';
import { AIInventoryModule } from './components/AIInventoryModule';
import { ConnectPage } from './components/ConnectPage';
import { Dashboard } from './components/Dashboard';
import { DataGovernance } from './components/DataGovernance';
import { ThreatModelingModule } from './components/ThreatModelingModule';
import { ReportsModule } from './components/ReportsModule';
import { SettingsPage } from './components/SettingsPage';
import { UserAccountPage } from './components/UserAccountPage';
import { HelpPage } from './components/HelpPage';
import { GetPaidWorkflow } from './components/GetPaidWorkflow';
import { PartnersProgram } from './components/PartnersProgram';
import { PLCYDevLanding } from './components/PLCYDevLanding';
import { AISystemDrillDown } from './components/AISystemDrillDown';
import { ControlLibrary } from './components/ControlLibrary';
import { HITLGuardrails } from './components/HITLGuardrails';
import { ApprovalInbox } from './components/ApprovalInbox';
import { TeamGovernance } from './components/TeamGovernance';
import { RiskComplianceModule } from './components/RiskComplianceModule';
import { TrustCenter } from './components/TrustCenter';
import { ReportsAndLogs } from './components/ReportsAndLogs';
import { DocumentationCenter } from './components/DocumentationCenter';
import { FAQCenter } from './components/FAQCenter';
import { WorkflowsAndAgents } from './components/WorkflowsAndAgents';
import { LLMSecurityTesting } from './components/LLMSecurityTesting';
import { Toaster } from './components/ui/sonner';
import { AuthenticationModal } from './components/AuthenticationModal';
import { UnifiedOnboarding } from './components/UnifiedOnboarding';
import { PolicyPacks } from './components/PolicyPacks';
import { ApprovalQueue } from './components/ApprovalQueue';
import { GovernanceAuditLog } from './components/GovernanceAuditLog';
import { AuditAndLogs } from './components/AuditAndLogs';
import { AuditEvidenceVault } from './components/AuditEvidenceVault';
import { AdminNotifications } from './components/AdminNotifications';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataGovernanceTab, setDataGovernanceTab] = useState('flows');
  const [drillDownSystem, setDrillDownSystem] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState({
    email: 'demo@company.com',
    companyName: 'Demo Company',
    plan: 'Professional'
  });

  const publicNavigationItems = [
    { id: 'about', label: 'About PLCY', icon: Shield },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const authenticatedNavigationGroups = [
    {
      label: 'Home',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'onboarding', label: 'Onboarding', icon: Rocket },
      ]
    },
    {
      label: 'AI Systems',
      items: [
        { id: 'inventory', label: 'AI Inventory', icon: Bot },
        { id: 'workflows', label: 'Workflows & Agents', icon: GitBranch },
        { id: 'data', label: 'Data Flows', icon: Globe },
      ]
    },
    {
      label: 'Policies & Controls',
      items: [
        { id: 'policy-packs', label: 'Policy Packs', icon: Package },
        { id: 'controls', label: 'Control Library', icon: Shield },
        { id: 'trism', label: 'Risk & Compliance', icon: AlertTriangle },
      ]
    },
    {
      label: 'Tests & Evaluations',
      items: [
        { id: 'threats', label: 'Threat Modeling', icon: ShieldAlert },
        { id: 'security-testing', label: 'LLM Security Testing', icon: ShieldCheck },
      ]
    },
    {
      label: 'Approvals & Incidents',
      items: [
        { id: 'approvals', label: 'Approval Inbox', icon: CheckSquare },
        { id: 'approval-queue', label: 'Change Approvals', icon: FileCheck },
        { id: 'hitl', label: 'Human-in-the-Loop', icon: UserCheck },
      ]
    },
    {
      label: 'Evidence & Trust',
      items: [
        { id: 'reports', label: 'Reports', icon: ClipboardList },
        { id: 'audit-logs', label: 'Audit & Logs', icon: FileTextIcon },
        { id: 'evidence-vault', label: 'Evidence Vault', icon: Award },
        { id: 'trust', label: 'My Trust Center', icon: Eye },
      ]
    },
    {
      label: 'Settings',
      items: [
        { id: 'team', label: 'Users & Teams', icon: Users },
        { id: 'connectors', label: 'Integrations', icon: Plug },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'account', label: 'My Account', icon: User },
      ]
    }
  ];

  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Home', 'AI Systems', 'Policies & Controls', 'Tests & Evaluations', 'Approvals & Incidents', 'Evidence & Trust', 'Settings']);

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupLabel) 
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  const handleAuthSuccess = (userData: any) => {
    setCurrentUser(userData);
    setShowAuthModal(false);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('about');
    setDrillDownSystem(null);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleNavigate = (tab: string, options?: { dataGovernanceTab?: string }) => {
    setActiveTab(tab);
    if (options?.dataGovernanceTab) {
      setDataGovernanceTab(options.dataGovernanceTab);
    }
  };

  const renderContent = () => {
    // If we're in drill-down mode (authenticated users only)
    if (drillDownSystem && isAuthenticated) {
      return (
        <AISystemDrillDown 
          systemId={drillDownSystem.id}
          systemName={drillDownSystem.name}
          onBack={() => setDrillDownSystem(null)}
        />
      );
    }

    // Authenticated mode
    if (isAuthenticated) {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard onNavigate={handleNavigate} />;
        case 'onboarding':
          return <UnifiedOnboarding />;
        case 'inventory':
          return <AIInventoryModule onDrillDown={setDrillDownSystem} />;
        case 'plcy-dev':
          return <PLCYDevLanding />;
        case 'connectors':
          return <ConnectPage />;
        case 'threats':
          return <ThreatModelingModule />;
        case 'security-testing':
          return <LLMSecurityTesting />;
        case 'policy-packs':
          return <PolicyPacks />;
        case 'controls':
          return <ControlLibrary />;
        case 'hitl':
          return <HITLGuardrails />;
        case 'approvals':
          return <ApprovalInbox />;
        case 'approval-queue':
          return <ApprovalQueue />;
        case 'workflows':
          return <WorkflowsAndAgents />;
        case 'team':
          return <TeamGovernance />;
        case 'data':
          return <DataGovernance defaultTab={dataGovernanceTab} />;
        case 'trism':
          return <RiskComplianceModule />;
        case 'risk-compliance':
          return <RiskComplianceModule />;
        case 'trust':
          return <TrustCenter />;
        case 'reports':
          return <ReportsModule />;
        case 'audit-logs':
          return <AuditAndLogs />;
        case 'evidence-vault':
          return <AuditEvidenceVault />;
        case 'partners':
          return <PartnersProgram />;
        case 'settings':
          return <SettingsPage />;
        case 'account':
          return <UserAccountPage />;
        case 'help':
          return <HelpPage />;
        case 'get-paid':
          return <GetPaidWorkflow />;
        case 'documentation':
          return <DocumentationCenter />;
        case 'faq':
          return <FAQCenter />;
        default:
          return <Dashboard />;
      }
    }

    // Public/Unauthenticated mode
    switch (activeTab) {
      case 'documentation':
        return <DocumentationCenter />;
      case 'faq':
        return <FAQCenter />;
      case 'about':
      default:
        return (
          <div className="space-y-6">
            <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <h1 className="text-3xl font-bold mb-4">PLCY</h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                The world's first comprehensive AI governance platform following the "Assess, Control, Prove" methodology. 
                Build trust in your AI systems with enterprise-grade compliance and transparency tools.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={handleSignUpClick} size="lg" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" onClick={handleLoginClick} className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </div>
            </div>
            
            {/* Platform features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Assess</h3>
                <p className="text-sm text-muted-foreground">Comprehensive AI risk assessment and inventory management</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <Settings className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Control</h3>
                <p className="text-sm text-muted-foreground">Implement governance controls and policy frameworks</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <Eye className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Prove</h3>
                <p className="text-sm text-muted-foreground">Create public trust centers to showcase your AI governance</p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose PLCY?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">For Your Organization</h3>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>• Comprehensive AI system inventory and risk management</li>
                    <li>• EU AI Act compliance automation and reporting</li>
                    <li>• OWASP threat modeling for AI security</li>
                    <li>• Policy-as-code governance frameworks</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">For Your Stakeholders</h3>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>• Public trust centers showcasing your AI practices</li>
                    <li>• Transparent compliance reporting and certifications</li>
                    <li>• Real-time governance metrics and dashboards</li>
                    <li>• Professional security documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          <Sidebar>
            <SidebarContent className="p-4">
              <div className="mb-8">
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 mb-2 w-full justify-start p-2 h-auto hover:bg-accent/50"
                  onClick={() => setActiveTab(isAuthenticated ? 'dashboard' : 'about')}
                >
                  <ImageWithFallback
                    src={plcyLogo}
                    alt="PLCY"
                    className="h-7 w-auto object-contain"
                  />
                </Button>
                
                {/* User status */}
                {!isAuthenticated && (
                  <div className="mt-4 space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-2"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="w-3 h-3" />
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full gap-2"
                      onClick={handleSignUpClick}
                    >
                      <UserPlus className="w-3 h-3" />
                      Sign Up
                    </Button>
                  </div>
                )}
                
                {isAuthenticated && currentUser && (
                  <div className="mt-4 p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="w-3 h-3" />
                      <span className="text-xs font-medium">
                        {currentUser.companyName || currentUser.email}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>

              <nav className="space-y-1">
                {isAuthenticated ? (
                  // Grouped navigation for authenticated users
                  authenticatedNavigationGroups.map((group) => {
                    const isSingle = group.items.length === 1;
                    if (isSingle) {
                      const item = group.items[0];
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.id}
                          variant={activeTab === item.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 h-9 px-2 text-sm"
                          onClick={() => setActiveTab(item.id)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Button>
                      );
                    }
                    return (
                      <Collapsible
                        key={group.label}
                        open={expandedGroups.includes(group.label)}
                        onOpenChange={() => toggleGroup(group.label)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                          >
                            {group.label}
                            {expandedGroups.includes(group.label) ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 mt-1">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Button
                                key={item.id}
                                variant={activeTab === item.id ? "secondary" : "ghost"}
                                className="w-full justify-start gap-2 h-9 pl-4 text-sm"
                                onClick={() => setActiveTab(item.id)}
                              >
                                <Icon className="w-4 h-4" />
                                {item.label}
                              </Button>
                            );
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })
                ) : (
                  // Simple navigation for public users
                  publicNavigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3 h-10"
                        onClick={() => setActiveTab(item.id)}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Button>
                    );
                  })
                )}
              </nav>

              {/* Show compliance info only for authenticated users */}
              {isAuthenticated && (
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => setActiveTab('risk-compliance')}
                    className="w-full p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Compliance Score</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Overall: 87% across frameworks
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </button>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-green-800">Next Milestone</span>
                    </div>
                    <p className="text-xs text-green-700">
                      ISO 42001 certification review Q2 2025
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('trust')}
                    className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">Trust Center</span>
                    </div>
                    <p className="text-xs text-blue-700">
                      Published • 92% complete
                    </p>
                  </button>
                </div>
              )}

              {/* Platform stats for unauthenticated users */}
              {!isAuthenticated && (
                <div className="mt-8 space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">AI Governance</span>
                    </div>
                    <p className="text-xs text-blue-700">
                      Complete platform solution
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-3 h-3 text-purple-600" />
                      <span className="text-xs font-medium text-purple-800">Enterprise Ready</span>
                    </div>
                    <p className="text-xs text-purple-700">
                      SOC 2 & ISO 27001 compliant
                    </p>
                  </div>
                </div>
              )}
            </SidebarContent>
          </Sidebar>

          <div className="flex-1 flex flex-col">
            <header className="border-b bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <div>
                    <h1 className="font-medium">
                      {isAuthenticated 
                        ? 'PLCY Platform' 
                        : 'PLCY'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {isAuthenticated 
                        ? 'Assess • Control • Prove your AI governance'
                        : 'Enterprise AI governance made simple'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {isAuthenticated && (
                    <>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        Last sync: 2 min ago
                      </Badge>
                      <AdminNotifications />
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {!isAuthenticated && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleLoginClick}>
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                      <Button size="sm" onClick={handleSignUpClick}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <main className="flex-1 p-6 bg-accent/20 overflow-x-hidden">
              <div className={activeTab === 'connect' || activeTab === 'plcy-dev' || activeTab === 'workflows' || activeTab === 'onboarding' ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'}>
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>

      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      {/* Toast Notifications */}
      <Toaster />
    </>
  );
}