import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, UserCheck } from 'lucide-react';
import { SupervisorManagement } from './SupervisorManagement';
import { GovernanceCommittee } from './GovernanceCommittee';

export function TeamGovernance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Team Management</h1>
        <p className="text-muted-foreground">
          Manage your supervisors and governance committees in one place
        </p>
      </div>

      <Tabs defaultValue="supervisors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supervisors" className="gap-2">
            <UserCheck className="w-4 h-4" />
            Supervisor Management
          </TabsTrigger>
          <TabsTrigger value="committee" className="gap-2">
            <Users className="w-4 h-4" />
            Governance Committee
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="supervisors" className="mt-6">
          <SupervisorManagement />
        </TabsContent>
        
        <TabsContent value="committee" className="mt-6">
          <GovernanceCommittee />
        </TabsContent>
      </Tabs>
    </div>
  );
}