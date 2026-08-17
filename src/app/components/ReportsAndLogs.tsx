import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ClipboardList, ScrollText, Database } from 'lucide-react';
import { ReportsModule } from './ReportsModule';
import { LogsModule } from './LogsModule';
import { RawLogsModule } from './RawLogsModule';

export function ReportsAndLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Reports & Logs</h1>
        <p className="text-muted-foreground">
          View reports, analytics, activity logs, and raw audit logs for compliance
        </p>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports" className="gap-2">
            <ClipboardList className="w-4 h-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="logs" className="gap-2">
            <ScrollText className="w-4 h-4" />
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="raw-logs" className="gap-2">
            <Database className="w-4 h-4" />
            Raw Logs (Audit)
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="mt-6">
          <ReportsModule />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-6">
          <LogsModule />
        </TabsContent>
        
        <TabsContent value="raw-logs" className="mt-6">
          <RawLogsModule />
        </TabsContent>
      </Tabs>
    </div>
  );
}