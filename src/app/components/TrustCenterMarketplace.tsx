import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Globe, 
  Shield, 
  Award, 
  Users, 
  Building, 
  MapPin, 
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  Lock,
  Zap
} from 'lucide-react';

interface TrustCenterEntry {
  id: string;
  companyName: string;
  industry: string;
  description: string;
  complianceScore: number;
  certifications: string[];
  regions: string[];
  aiSystems: number;
  employees: string;
  headquarters: string;
  trustScore: number;
  isVerified: boolean;
  isPremium: boolean;
  lastUpdated: string;
  url: string;
}

export function TrustCenterMarketplace({ onCompanySelect, onSignUp }: { 
  onCompanySelect: (company: TrustCenterEntry) => void;
  onSignUp: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('trust-score');

  // Mock data for trust center marketplace
  const trustCenters: TrustCenterEntry[] = [
    {
      id: 'tc-001',
      companyName: 'TechCorp AI Solutions',
      industry: 'Technology',
      description: 'Leading AI platform provider with comprehensive governance frameworks for enterprise clients.',
      complianceScore: 94,
      certifications: ['ISO 27001', 'SOC 2', 'EU AI Act', 'GDPR'],
      regions: ['EU', 'US', 'UK'],
      aiSystems: 12,
      employees: '1000-5000',
      headquarters: 'San Francisco, CA',
      trustScore: 4.8,
      isVerified: true,
      isPremium: true,
      lastUpdated: '2024-12-15',
      url: 'trust.techcorp.com'
    },
    {
      id: 'tc-002',
      companyName: 'FinanceGuard AI',
      industry: 'Financial Services',
      description: 'AI-powered financial risk management with regulatory compliance across global markets.',
      complianceScore: 96,
      certifications: ['ISO 27001', 'PCI DSS', 'EU AI Act', 'SOX'],
      regions: ['EU', 'US', 'APAC'],
      aiSystems: 8,
      employees: '500-1000',
      headquarters: 'London, UK',
      trustScore: 4.9,
      isVerified: true,
      isPremium: true,
      lastUpdated: '2024-12-14',
      url: 'compliance.financeguard.com'
    },
    {
      id: 'tc-003',
      companyName: 'HealthAI Innovations',
      industry: 'Healthcare',
      description: 'Medical AI systems with patient privacy protection and clinical governance standards.',
      complianceScore: 92,
      certifications: ['HIPAA', 'ISO 13485', 'EU AI Act', 'FDA 510(k)'],
      regions: ['EU', 'US'],
      aiSystems: 15,
      employees: '200-500',
      headquarters: 'Boston, MA',
      trustScore: 4.7,
      isVerified: true,
      isPremium: false,
      lastUpdated: '2024-12-13',
      url: 'trust.healthai.com'
    },
    {
      id: 'tc-004',
      companyName: 'AutoDrive Systems',
      industry: 'Automotive',
      description: 'Autonomous vehicle AI with safety-critical system governance and transparency.',
      complianceScore: 89,
      certifications: ['ISO 26262', 'EU AI Act', 'UNECE WP.29'],
      regions: ['EU', 'US', 'JP'],
      aiSystems: 6,
      employees: '1000+',
      headquarters: 'Stuttgart, Germany',
      trustScore: 4.6,
      isVerified: true,
      isPremium: false,
      lastUpdated: '2024-12-12',
      url: 'safety.autodrive.com'
    },
    {
      id: 'tc-005',
      companyName: 'RetailMind Analytics',
      industry: 'Retail',
      description: 'Customer analytics AI with privacy-first approach and ethical recommendation systems.',
      complianceScore: 85,
      certifications: ['GDPR', 'CCPA', 'EU AI Act'],
      regions: ['EU', 'US'],
      aiSystems: 9,
      employees: '100-200',
      headquarters: 'Amsterdam, NL',
      trustScore: 4.4,
      isVerified: false,
      isPremium: false,
      lastUpdated: '2024-12-10',
      url: 'transparency.retailmind.com'
    },
    {
      id: 'tc-006',
      companyName: 'EduTech AI Platform',
      industry: 'Education',
      description: 'Educational AI tools with student data protection and bias-free learning algorithms.',
      complianceScore: 88,
      certifications: ['FERPA', 'COPPA', 'EU AI Act', 'ISO 27001'],
      regions: ['EU', 'US', 'CA'],
      aiSystems: 11,
      employees: '50-100',
      headquarters: 'Toronto, CA',
      trustScore: 4.5,
      isVerified: true,
      isPremium: false,
      lastUpdated: '2024-12-11',
      url: 'governance.edutech.com'
    }
  ];

  const industries = ['all', 'Technology', 'Financial Services', 'Healthcare', 'Automotive', 'Retail', 'Education'];
  const regions = ['all', 'EU', 'US', 'UK', 'APAC', 'CA', 'JP'];

  // Filter and sort trust centers
  const filteredCenters = trustCenters.filter(center => {
    const matchesSearch = center.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || center.industry === selectedIndustry;
    const matchesRegion = selectedRegion === 'all' || center.regions.includes(selectedRegion);
    
    return matchesSearch && matchesIndustry && matchesRegion;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'trust-score':
        return b.trustScore - a.trustScore;
      case 'compliance-score':
        return b.complianceScore - a.complianceScore;
      case 'company-name':
        return a.companyName.localeCompare(b.companyName);
      case 'last-updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <h1 className="text-3xl font-bold mb-4">AI Governance Trust Center Directory</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
          Discover how leading companies implement AI governance, compliance, and transparency. 
          Compare trust centers, explore best practices, and build confidence in AI systems.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={onSignUp} size="lg" className="gap-2">
            <Building className="w-4 h-4" />
            Create Your Trust Center
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Download Marketplace Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold mb-1">{trustCenters.length}</div>
            <div className="text-sm text-muted-foreground">Trust Centers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold mb-1">{industries.length - 1}</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold mb-1">{Math.round(trustCenters.reduce((acc, tc) => acc + tc.complianceScore, 0) / trustCenters.length)}%</div>
            <div className="text-sm text-muted-foreground">Avg Compliance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold mb-1">{trustCenters.filter(tc => tc.isVerified).length}</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies, industries, or governance practices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trust-score">Trust Score</SelectItem>
                <SelectItem value="compliance-score">Compliance Score</SelectItem>
                <SelectItem value="company-name">Company Name</SelectItem>
                <SelectItem value="last-updated">Last Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6">
        {filteredCenters.map((center) => (
          <Card key={center.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Company Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{center.companyName}</h3>
                        {center.isVerified && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                        {center.isPremium && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {center.industry}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {center.headquarters}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {center.employees}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{center.description}</p>
                      
                      {/* Certifications */}
                      <div className="flex flex-wrap gap-1">
                        {center.certifications.slice(0, 4).map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {center.certifications.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{center.certifications.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Compliance Score</span>
                      <Badge className={getComplianceColor(center.complianceScore)}>
                        {center.complianceScore}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Trust Score</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{center.trustScore}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">AI Systems</span>
                      <span className="text-sm font-medium">{center.aiSystems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Regions</span>
                      <div className="flex gap-1">
                        {center.regions.slice(0, 3).map((region, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => onCompanySelect(center)}
                    className="w-full gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Trust Center
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Visit {center.url}
                  </Button>
                  <div className="text-xs text-muted-foreground text-center">
                    Updated {new Date(center.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <div className="text-muted-foreground mb-4">
              No trust centers found matching your criteria.
            </div>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedIndustry('all');
              setSelectedRegion('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6 text-center py-8">
          <h3 className="font-semibold text-lg mb-2">Ready to Build Trust in Your AI?</h3>
          <p className="text-muted-foreground mb-4">
            Join the leading companies showcasing their AI governance and compliance practices.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={onSignUp} className="gap-2">
              <Zap className="w-4 h-4" />
              Start Your Trust Center
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}