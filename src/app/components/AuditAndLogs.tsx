import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, Activity, Database } from 'lucide-react';
import { GovernanceAuditLog } from './GovernanceAuditLog';
import { LogsModule } from './LogsModule';
import { RawLogsModule } from './RawLogsModule';

export function AuditAndLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Audit & Logs</h1>
        <p className="text-muted-foreground">
          Governance change history, runtime activity, and raw audit stream
        </p>
      </div>

      <Tabs defaultValue="governance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="governance" className="gap-2">
            <Shield className="w-4 h-4" />
            Governance Changes
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="w-4 h-4" />
            Runtime Activity
          </TabsTrigger>
          <TabsTrigger value="raw" className="gap-2">
            <Database className="w-4 h-4" />
            Raw Stream
          </TabsTrigger>
        </TabsList>

        <TabsContent value="governance" className="mt-6">
          <GovernanceAuditLog />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <LogsModule />
        </TabsContent>

        <TabsContent value="raw" className="mt-6">
          <RawLogsModule />
        </TabsContent>
      </Tabs>
    </div>
  );
}
