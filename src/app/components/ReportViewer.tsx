import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Download,
  Share2,
  Printer,
  FileText,
  Activity,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface ReportViewerProps {
  report: any;
  onClose: () => void;
}

export function ReportViewer({ report, onClose }: ReportViewerProps) {
  const handleDownload = () => {
    try {
      // Generate HTML report
      const reportHTML = generateReportHTML();
      
      // Create a Blob from the HTML
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully', {
        description: 'The report has been saved to your downloads folder',
      });
    } catch (error) {
      toast.error('Download failed', {
        description: 'There was an error downloading the report',
      });
    }
  };

  const generateReportHTML = () => {
    const dateRange = report.config.dateFrom && report.config.dateTo 
      ? `${new Date(report.config.dateFrom).toLocaleDateString()} to ${new Date(report.config.dateTo).toLocaleDateString()}`
      : 'N/A';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #fff;
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 30px;
      margin-bottom: 40px;
    }
    .logo-text {
      font-size: 32px;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #0f172a;
    }
    .meta {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      background: #fff;
    }
    .card-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #0f172a;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    .stat-box {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }
    .stat-box.success { background: #f0fdf4; border-color: #86efac; }
    .stat-box.warning { background: #fef3c7; border-color: #fcd34d; }
    .stat-box.danger { background: #fee2e2; border-color: #fca5a5; }
    .stat-label {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .stat-value.success { color: #16a34a; }
    .stat-value.warning { color: #ca8a04; }
    .stat-value.danger { color: #dc2626; }
    .stat-detail {
      font-size: 12px;
      color: #64748b;
    }
    .framework-item {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
    }
    .framework-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .framework-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .framework-name {
      font-weight: 600;
      font-size: 16px;
    }
    .framework-score {
      font-weight: 700;
      font-size: 16px;
      color: #16a34a;
    }
    .progress-bar {
      height: 10px;
      background: #e2e8f0;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .progress-fill {
      height: 100%;
      background: #16a34a;
      transition: width 0.3s;
    }
    .progress-fill.warning {
      background: #ca8a04;
    }
    .framework-detail {
      font-size: 13px;
      color: #64748b;
    }
    .finding-box {
      border: 1px solid #e2e8f0;
      border-left: 4px solid;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .finding-box.success {
      border-left-color: #16a34a;
      background: #f0fdf4;
    }
    .finding-box.warning {
      border-left-color: #ca8a04;
      background: #fef3c7;
    }
    .finding-box.info {
      border-left-color: #2563eb;
      background: #eff6ff;
    }
    .finding-title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 8px;
    }
    .finding-description {
      font-size: 13px;
      color: #64748b;
      line-height: 1.5;
    }
    .executive-summary {
      font-size: 15px;
      color: #475569;
      line-height: 1.8;
      margin-bottom: 24px;
    }
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #94a3b8;
      font-size: 13px;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-text">PLCY</div>
    <h1>${report.name}</h1>
    <div class="meta"><strong>Generated:</strong> ${new Date(report.generatedAt).toLocaleString()}</div>
    <div class="meta"><strong>Report Period:</strong> ${dateRange}</div>
    <div class="meta"><strong>Format:</strong> ${report.config.format?.toUpperCase() || 'N/A'}</div>
  </div>

  ${report.config.template === 'compliance-summary' ? `
  <div class="section">
    <h2 class="section-title">Executive Summary</h2>
    <div class="card">
      <div class="executive-summary">
        This report provides a comprehensive overview of compliance status across all AI systems and frameworks 
        for the period ${dateRange}. The organization maintains a strong compliance posture with 94% overall 
        compliance rate, exceeding the industry average of 87%. Our assessment covers three major frameworks: 
        EU AI Act, ISO 42001, and NIST AI RMF, with particular focus on high-risk AI systems and their 
        associated controls.
      </div>

      <div class="stats-grid">
        <div class="stat-box success">
          <div class="stat-label">âœ“ Compliant</div>
          <div class="stat-value success">94%</div>
          <div class="stat-detail">32 systems</div>
        </div>
        <div class="stat-box warning">
          <div class="stat-label">â± Pending Review</div>
          <div class="stat-value warning">4%</div>
          <div class="stat-detail">2 systems</div>
        </div>
        <div class="stat-box danger">
          <div class="stat-label">âœ— Non-Compliant</div>
          <div class="stat-value danger">2%</div>
          <div class="stat-detail">1 system</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Framework Compliance Details</h2>
    <div class="card">
      <div class="framework-item">
        <div class="framework-header">
          <div class="framework-name">EU AI Act</div>
          <div class="framework-score">98%</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 98%"></div>
        </div>
        <div class="framework-detail">34 of 35 requirements met â€¢ 2 High-Risk Systems Compliant</div>
      </div>

      <div class="framework-item">
        <div class="framework-header">
          <div class="framework-name">ISO 42001 - AI Management System</div>
          <div class="framework-score">91%</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 91%"></div>
        </div>
        <div class="framework-detail">28 of 31 controls implemented â€¢ 3 controls in progress</div>
      </div>

      <div class="framework-item">
        <div class="framework-header">
          <div class="framework-name">NIST AI Risk Management Framework</div>
          <div class="framework-score" style="color: #ca8a04;">87%</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill warning" style="width: 87%"></div>
        </div>
        <div class="framework-detail">22 of 25 categories addressed â€¢ 3 categories require attention</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Key Findings & Recommendations</h2>
    <div class="card">
      <div class="finding-box success">
        <div class="finding-title">âœ“ Strong Overall Compliance</div>
        <div class="finding-description">
          The organization demonstrates excellent compliance with 94% compliance rate, exceeding the industry 
          average of 87%. All high-risk AI systems are properly classified and have appropriate oversight 
          mechanisms in place.
        </div>
      </div>

      <div class="finding-box warning">
        <div class="finding-title">âš  Documentation Gaps Identified</div>
        <div class="finding-description">
          Two AI systems require updated risk assessments and data lineage documentation. The Recommendation 
          Engine system (deployed in production) and Customer Segmentation Model need immediate attention 
          to maintain compliance status. Estimated remediation time: 2-3 weeks.
        </div>
      </div>

      <div class="finding-box info">
        <div class="finding-title">â†’ Recommended Actions</div>
        <div class="finding-description">
          <strong>Priority 1:</strong> Schedule compliance review for Recommendation Engine system by November 15, 2025.<br>
          <strong>Priority 2:</strong> Update data lineage documentation for Customer Segmentation Model.<br>
          <strong>Priority 3:</strong> Implement quarterly compliance audits for all high-risk systems.<br>
          <strong>Priority 4:</strong> Enhance NIST AI RMF coverage in the Govern and Map functions.
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">System Compliance Breakdown</h2>
    <div class="card">
      <div class="card-title">High-Risk AI Systems (EU AI Act Classification)</div>
      
      <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <strong>Fraud Detection ML Model v2.3</strong>
          <span style="color: #16a34a; font-weight: 600;">âœ“ Compliant</span>
        </div>
        <div style="font-size: 13px; color: #64748b;">
          Status: Active â€¢ Risk Level: High â€¢ Last Audit: Oct 28, 2025 â€¢ Next Review: Jan 28, 2026
        </div>
      </div>

      <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <strong>Loan Application Scoring System</strong>
          <span style="color: #16a34a; font-weight: 600;">âœ“ Compliant</span>
        </div>
        <div style="font-size: 13px; color: #64748b;">
          Status: Active â€¢ Risk Level: High â€¢ Last Audit: Nov 1, 2025 â€¢ Next Review: Feb 1, 2026
        </div>
      </div>

      <div class="card-title" style="margin-top: 30px;">Limited Risk AI Systems</div>
      
      <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong>Customer Analytics Engine v2.1</strong>
          <span style="color: #16a34a; font-weight: 600;">âœ“ Compliant</span>
        </div>
      </div>

      <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong>Content Moderation AI</strong>
          <span style="color: #16a34a; font-weight: 600;">âœ“ Compliant</span>
        </div>
      </div>

      <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <div style="display: flex; justify-between; margin-bottom: 4px;">
          <strong>Recommendation Engine</strong>
          <span style="color: #ca8a04; font-weight: 600;">â± Pending Review</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Compliance Metrics & Trends</h2>
    <div class="card">
      <div style="margin-bottom: 24px;">
        <div class="card-title">30-Day Compliance Trend</div>
        <div style="font-size: 14px; color: #64748b; margin-bottom: 12px;">
          Overall compliance has improved by 2% over the past 30 days, with 5 systems upgraded from 
          "Pending" to "Compliant" status.
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
          <div style="text-align: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
            <div style="font-size: 12px; color: #64748b;">Week 1</div>
            <div style="font-size: 20px; font-weight: 700; color: #16a34a;">92%</div>
          </div>
          <div style="text-align: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
            <div style="font-size: 12px; color: #64748b;">Week 2</div>
            <div style="font-size: 20px; font-weight: 700; color: #16a34a;">93%</div>
          </div>
          <div style="text-align: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
            <div style="font-size: 12px; color: #64748b;">Week 3</div>
            <div style="font-size: 20px; font-weight: 700; color: #16a34a;">93%</div>
          </div>
          <div style="text-align: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;">
            <div style="font-size: 12px; color: #64748b;">Week 4</div>
            <div style="font-size: 20px; font-weight: 700; color: #16a34a;">94%</div>
          </div>
        </div>
      </div>

      <div>
        <div class="card-title">Control Effectiveness</div>
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-between; margin-bottom: 8px; font-size: 14px;">
            <span>Technical Controls</span>
            <span style="font-weight: 600;">96%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 96%"></div>
          </div>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-between; margin-bottom: 8px; font-size: 14px;">
            <span>Procedural Controls</span>
            <span style="font-weight: 600;">93%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 93%"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-between; margin-bottom: 8px; font-size: 14px;">
            <span>Documentation Controls</span>
            <span style="font-weight: 600; color: #ca8a04;">89%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill warning" style="width: 89%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Next Steps & Action Items</h2>
    <div class="card">
      <div style="margin-bottom: 16px; padding-left: 20px;">
        <div style="font-weight: 600; margin-bottom: 8px;">Immediate Actions (Within 7 Days)</div>
        <ul style="margin-left: 20px; color: #475569;">
          <li style="margin-bottom: 6px;">Schedule review meeting for Recommendation Engine system compliance</li>
          <li style="margin-bottom: 6px;">Collect updated risk assessment documentation from system owners</li>
          <li>Assign compliance officer to Customer Segmentation Model review</li>
        </ul>
      </div>

      <div style="margin-bottom: 16px; padding-left: 20px;">
        <div style="font-weight: 600; margin-bottom: 8px;">Short-term Actions (Within 30 Days)</div>
        <ul style="margin-left: 20px; color: #475569;">
          <li style="margin-bottom: 6px;">Complete data lineage documentation for 2 pending systems</li>
          <li style="margin-bottom: 6px;">Conduct NIST AI RMF gap analysis for all systems</li>
          <li style="margin-bottom: 6px;">Update AI governance policies to reflect latest EU AI Act guidance</li>
          <li>Schedule Q1 2026 compliance training for all AI system owners</li>
        </ul>
      </div>

      <div style="padding-left: 20px;">
        <div style="font-weight: 600; margin-bottom: 8px;">Long-term Initiatives (Within 90 Days)</div>
        <ul style="margin-left: 20px; color: #475569;">
          <li style="margin-bottom: 6px;">Implement automated compliance monitoring dashboard</li>
          <li style="margin-bottom: 6px;">Establish quarterly compliance review cadence</li>
          <li style="margin-bottom: 6px;">Enhance documentation standards for all AI systems</li>
          <li>Develop compliance metrics scorecard for executive reporting</li>
        </ul>
      </div>
    </div>
  </div>
  ` : `
  <div class="section">
    <h2 class="section-title">Report Content</h2>
    <div class="card">
      <p>This report type (${report.config.template}) is currently being viewed in the application. 
      Please use the application interface to view the full report details.</p>
    </div>
  </div>
  `}

  <div class="footer">
    <p><strong>PLCY</strong> - AI Governance Platform</p>
    <p>This report is confidential and intended for internal use only.</p>
    <p>Generated by PLCY v1.0 â€¢ ${new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;
  };

  const renderComplianceSummary = () => (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This report provides a comprehensive overview of compliance status across all AI systems and frameworks 
            for the period {report.config.dateFrom && new Date(report.config.dateFrom).toLocaleDateString()} to {new Date(report.config.dateTo).toLocaleDateString()}.
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Compliant</span>
              </div>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <p className="text-xs text-muted-foreground mt-1">32 systems</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-amber-50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">4%</div>
              <p className="text-xs text-muted-foreground mt-1">2 systems</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium">Non-Compliant</span>
              </div>
              <div className="text-2xl font-bold text-red-600">2%</div>
              <p className="text-xs text-muted-foreground mt-1">1 system</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Framework Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Framework Compliance Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">EU AI Act</span>
                <span className="text-sm font-medium text-green-600">98%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '98%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                34 of 35 requirements met
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">ISO 42001</span>
                <span className="text-sm font-medium text-green-600">91%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '91%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                28 of 31 controls implemented
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">NIST AI RMF</span>
                <span className="text-sm font-medium text-amber-600">87%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-600" style={{ width: '87%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                22 of 25 categories addressed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 p-3 border rounded-lg bg-green-50">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Strong Overall Compliance</p>
              <p className="text-xs text-muted-foreground mt-1">
                94% compliance rate exceeds industry average of 87%
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 border rounded-lg bg-amber-50">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Documentation Gaps Identified</p>
              <p className="text-xs text-muted-foreground mt-1">
                2 systems require updated risk assessments and data lineage documentation
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 border rounded-lg bg-blue-50">
            <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Recommended Action</p>
              <p className="text-xs text-muted-foreground mt-1">
                Schedule compliance review for Recommendation Engine system by Nov 15
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRiskAssessment = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">48</div>
              <p className="text-sm text-muted-foreground">Total Risks</p>
            </div>
            <div className="p-4 border rounded-lg bg-red-50">
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
            <div className="p-4 border rounded-lg bg-amber-50">
              <div className="text-2xl font-bold text-amber-600">12</div>
              <p className="text-sm text-muted-foreground">High</p>
            </div>
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">33</div>
              <p className="text-sm text-muted-foreground">Medium/Low</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="p-4 border-l-4 border-red-600 bg-red-50 rounded">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">Data Privacy Violation Risk</h4>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Insufficient data anonymization in customer analytics pipeline
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Impact: High</span>
                <span>Probability: Medium</span>
                <span>System: Customer Analytics</span>
              </div>
            </div>

            <div className="p-4 border-l-4 border-amber-600 bg-amber-50 rounded">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">Model Bias Detection</h4>
                <Badge className="bg-amber-600">High</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Potential demographic bias in fraud detection model predictions
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Impact: High</span>
                <span>Probability: Low</span>
                <span>System: Fraud Detection</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Mitigation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Active Mitigations</p>
                <p className="text-xs text-muted-foreground">Control measures in place</p>
              </div>
              <div className="text-xl font-bold text-green-600">38</div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Planned Mitigations</p>
                <p className="text-xs text-muted-foreground">Scheduled implementations</p>
              </div>
              <div className="text-xl font-bold text-blue-600">7</div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Accepted Risks</p>
                <p className="text-xs text-muted-foreground">Within risk tolerance</p>
              </div>
              <div className="text-xl font-bold text-amber-600">3</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAuditTrail = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">342</div>
              <p className="text-sm text-muted-foreground">HITL Decisions</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">89</div>
              <p className="text-sm text-muted-foreground">Policy Changes</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">System Updates</p>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            {[
              { time: '2025-11-05 14:32', user: 'Sarah Johnson', action: 'Approved HITL Decision #1847', type: 'HITL', icon: Users },
              { time: '2025-11-05 13:18', user: 'Michael Chen', action: 'Updated Risk Assessment for Fraud Detection', type: 'Risk', icon: AlertTriangle },
              { time: '2025-11-05 11:45', user: 'Admin', action: 'System Configuration Changed - Customer Analytics', type: 'System', icon: Activity },
              { time: '2025-11-05 10:22', user: 'Alex Martinez', action: 'Rejected HITL Decision #1846', type: 'HITL', icon: Users },
              { time: '2025-11-05 09:15', user: 'Sarah Johnson', action: 'Created New Compliance Report', type: 'Report', icon: FileText },
            ].map((event, idx) => {
              const Icon = event.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <Icon className="w-4 h-4 text-muted-foreground mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                      <span className="text-xs text-muted-foreground">â€¢</span>
                      <span className="text-xs text-muted-foreground">{event.user}</span>
                      <Badge variant="secondary" className="text-xs ml-auto">{event.type}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEUAIAct = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>EU AI Act Compliance Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium">Overall Compliance Score</h4>
                <p className="text-xs text-muted-foreground">Based on EU AI Act requirements</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">98%</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">High-Risk Systems</p>
              <div className="text-xl font-bold">2</div>
              <p className="text-xs text-green-600 mt-1">âœ“ All compliant</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Limited Risk Systems</p>
              <div className="text-xl font-bold">8</div>
              <p className="text-xs text-green-600 mt-1">âœ“ All compliant</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h4 className="font-medium">Compliance Requirements</h4>
            {[
              { name: 'Risk Management System', status: 'complete', score: 100 },
              { name: 'Data Governance', status: 'complete', score: 100 },
              { name: 'Technical Documentation', status: 'complete', score: 98 },
              { name: 'Transparency & User Information', status: 'complete', score: 95 },
              { name: 'Human Oversight', status: 'partial', score: 92 },
            ].map((req, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{req.name}</span>
                  <Badge variant={req.status === 'complete' ? 'default' : 'secondary'} className="bg-green-600">
                    {req.score}%
                  </Badge>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: `${req.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemPerformance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Uptime</p>
              <div className="text-2xl font-bold text-green-600">99.7%</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+0.3% from last month</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Latency</p>
              <div className="text-2xl font-bold">234ms</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingDown className="w-3 h-3" />
                <span>-12ms from last month</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Error Rate</p>
              <div className="text-2xl font-bold">0.02%</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingDown className="w-3 h-3" />
                <span>-0.01% from last month</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h4 className="font-medium">Individual System Performance</h4>
            {[
              { name: 'Customer Analytics v2.1', uptime: 99.9, latency: 198, errors: 0.01, status: 'excellent' },
              { name: 'Fraud Detection ML', uptime: 99.7, latency: 245, errors: 0.02, status: 'good' },
              { name: 'Recommendation Engine', uptime: 98.1, latency: 312, errors: 0.05, status: 'degraded' },
              { name: 'Content Moderation AI', uptime: 99.5, latency: 221, errors: 0.02, status: 'good' },
            ].map((system, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{system.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Uptime: {system.uptime}%</span>
                      <span>â€¢</span>
                      <span>Latency: {system.latency}ms</span>
                      <span>â€¢</span>
                      <span>Errors: {system.errors}%</span>
                    </div>
                  </div>
                  <Badge variant={system.status === 'excellent' ? 'default' : system.status === 'good' ? 'secondary' : 'outline'}
                    className={system.status === 'excellent' ? 'bg-green-600' : system.status === 'degraded' ? 'bg-amber-600' : ''}>
                    {system.status}
                  </Badge>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${system.status === 'excellent' ? 'bg-green-600' : system.status === 'good' ? 'bg-blue-600' : 'bg-amber-600'}`}
                    style={{ width: `${system.uptime}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportContent = () => {
    switch (report.config.template) {
      case 'compliance-summary':
        return renderComplianceSummary();
      case 'risk-assessment':
        return renderRiskAssessment();
      case 'audit-trail':
        return renderAuditTrail();
      case 'eu-ai-act':
        return renderEUAIAct();
      case 'system-performance':
        return renderSystemPerformance();
      default:
        return <div>Report content not available</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{report.name}</h1>
              <p className="text-sm text-muted-foreground">
                Generated on {new Date(report.generatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {renderReportContent()}
      </div>
    </div>
  );
}
