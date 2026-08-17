import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarIcon, FileText, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: any;
  onGenerate: (config: any) => void;
}

export function GenerateReportDialog({ open, onOpenChange, template, onGenerate }: GenerateReportDialogProps) {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [reportName, setReportName] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedSystems, setSelectedSystems] = useState<string[]>(['all']);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [detailLevel, setDetailLevel] = useState('detailed');

  const handleNext = () => {
    if (step === 1 && !reportName) {
      toast.error('Please enter a report name');
      return;
    }
    if (step === 1 && !dateFrom) {
      toast.error('Please select a date range');
      return;
    }
    setStep(step + 1);
  };

  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const config = {
        name: reportName,
        dateFrom,
        dateTo,
        format: exportFormat,
        selectedSystems,
        includeCharts,
        includeRecommendations,
        detailLevel,
        template: template.id
      };
      
      onGenerate(config);
      setGenerating(false);
      onOpenChange(false);
      
      // Reset form
      setStep(1);
      setReportName('');
      setDateFrom(undefined);
      setDateTo(new Date());
      setSelectedSystems(['all']);
      setIncludeCharts(true);
      setIncludeRecommendations(true);
      setDetailLevel('detailed');
      
      toast.success('Report generated successfully', {
        description: 'Your report is ready to view and download',
      });
    }, 2500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Report Name</Label>
              <Input
                placeholder={`${template?.name} - ${format(new Date(), 'MMM dd, yyyy')}`}
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 w-4 h-4" />
                      {dateFrom ? format(dateFrom, 'MMM dd, yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 w-4 h-4" />
                      {dateTo ? format(dateTo, 'MMM dd, yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={(date) => date && setDateTo(date)} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {template?.id === 'compliance-summary' && (
              <>
                <div className="space-y-2">
                  <Label>Compliance Frameworks</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={selectedSystems.includes('all')} onCheckedChange={(checked) => {
                        if (checked) setSelectedSystems(['all']);
                      }} />
                      All Frameworks
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={selectedSystems.includes('eu-ai-act')} onCheckedChange={(checked) => {
                        if (checked) setSelectedSystems([...selectedSystems.filter(s => s !== 'all'), 'eu-ai-act']);
                        else setSelectedSystems(selectedSystems.filter(s => s !== 'eu-ai-act'));
                      }} />
                      EU AI Act
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={selectedSystems.includes('iso-42001')} onCheckedChange={(checked) => {
                        if (checked) setSelectedSystems([...selectedSystems.filter(s => s !== 'all'), 'iso-42001']);
                        else setSelectedSystems(selectedSystems.filter(s => s !== 'iso-42001'));
                      }} />
                      ISO 42001
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={selectedSystems.includes('nist')} onCheckedChange={(checked) => {
                        if (checked) setSelectedSystems([...selectedSystems.filter(s => s !== 'all'), 'nist']);
                        else setSelectedSystems(selectedSystems.filter(s => s !== 'nist'));
                      }} />
                      NIST AI RMF
                    </label>
                  </div>
                </div>
              </>
            )}

            {template?.id === 'risk-assessment' && (
              <>
                <div className="space-y-2">
                  <Label>Risk Severity Levels</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      Critical & High Risk
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      Medium Risk
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      Low Risk
                    </label>
                  </div>
                </div>
              </>
            )}

            {template?.id === 'audit-trail' && (
              <>
                <div className="space-y-2">
                  <Label>Activity Types</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      System Changes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      HITL Decisions
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      Policy Updates
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      Access Events
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Detail Level</Label>
              <Select value={detailLevel} onValueChange={setDetailLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="technical">Technical Deep Dive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2 border-t">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={includeCharts} onCheckedChange={(checked) => setIncludeCharts(checked as boolean)} />
                Include Charts & Visualizations
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={includeRecommendations} onCheckedChange={(checked) => setIncludeRecommendations(checked as boolean)} />
                Include Recommendations
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/30">
              <h4 className="font-medium mb-3">Report Configuration Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Report Name:</span>
                  <span className="font-medium">{reportName || 'Untitled Report'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Range:</span>
                  <span className="font-medium">
                    {dateFrom && dateTo ? `${format(dateFrom, 'MMM dd')} - ${format(dateTo, 'MMM dd, yyyy')}` : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium uppercase">{exportFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Detail Level:</span>
                  <span className="font-medium capitalize">{detailLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Charts:</span>
                  <span className="font-medium">{includeCharts ? 'Included' : 'Excluded'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recommendations:</span>
                  <span className="font-medium">{includeRecommendations ? 'Included' : 'Excluded'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/30">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ready to Generate</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This report will be generated and saved to your reports library. Estimated generation time: 2-3 seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate {template?.name}</DialogTitle>
          <DialogDescription>
            Step {step} of 3 - {step === 1 ? 'Basic Configuration' : step === 2 ? 'Report Options' : 'Review & Generate'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  i < step ? 'bg-blue-600 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {i}
                </div>
                {i < 3 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-blue-600' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          {renderStepContent()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
            disabled={generating}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          {step < 3 ? (
            <Button onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleGenerate} disabled={generating}>
              {generating && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
              {generating ? 'Generating...' : 'Generate Report'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
