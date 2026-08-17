import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  MessageSquare,
  FileText,
  Vote,
  UserPlus,
  Bell
} from 'lucide-react';

export function GovernanceCommittee() {
  const committees = [
    {
      id: 'ai-ethics',
      name: 'AI Ethics Committee',
      description: 'Oversees ethical AI development and deployment practices',
      members: 8,
      chair: 'Dr. Sarah Chen',
      nextMeeting: '2024-02-15',
      status: 'active',
      decisions: 23,
      pendingReviews: 4
    },
    {
      id: 'privacy-board',
      name: 'Privacy & Data Protection Board',
      description: 'Ensures compliance with privacy regulations in AI systems',
      members: 6,
      chair: 'Michael Rodriguez',
      nextMeeting: '2024-02-12',
      status: 'active',
      decisions: 31,
      pendingReviews: 2
    },
    {
      id: 'risk-management',
      name: 'AI Risk Management Committee',
      description: 'Assesses and mitigates AI-related risks across the organization',
      members: 7,
      chair: 'Jennifer Walsh',
      nextMeeting: '2024-02-18',
      status: 'active',
      decisions: 19,
      pendingReviews: 6
    },
    {
      id: 'technical-review',
      name: 'Technical Review Board',
      description: 'Reviews technical implementations and security aspects of AI systems',
      members: 9,
      chair: 'Alex Thompson',
      nextMeeting: '2024-02-14',
      status: 'active',
      decisions: 45,
      pendingReviews: 3
    }
  ];

  const members = [
    {
      id: 'sarah-chen',
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Ethics Officer',
      department: 'AI Ethics',
      committees: ['AI Ethics Committee'],
      avatar: '/api/placeholder/40/40',
      status: 'active',
      completedTraining: 95,
      lastActive: '2 hours ago'
    },
    {
      id: 'michael-rodriguez',
      name: 'Michael Rodriguez',
      role: 'Data Protection Officer',
      department: 'Privacy & Legal',
      committees: ['Privacy & Data Protection Board', 'AI Risk Management Committee'],
      avatar: '/api/placeholder/40/40',
      status: 'active',
      completedTraining: 100,
      lastActive: '1 hour ago'
    },
    {
      id: 'jennifer-walsh',
      name: 'Jennifer Walsh',
      role: 'Chief Risk Officer',
      department: 'Risk Management',
      committees: ['AI Risk Management Committee', 'Technical Review Board'],
      avatar: '/api/placeholder/40/40',
      status: 'active',
      completedTraining: 88,
      lastActive: '30 minutes ago'
    },
    {
      id: 'alex-thompson',
      name: 'Alex Thompson',
      role: 'Principal Security Engineer',
      department: 'Security',
      committees: ['Technical Review Board', 'AI Ethics Committee'],
      avatar: '/api/placeholder/40/40',
      status: 'active',
      completedTraining: 92,
      lastActive: '45 minutes ago'
    }
  ];

  const pendingDecisions = [
    {
      id: 'decision-001',
      title: 'Customer Service ChatGPT Integration',
      description: 'Approval for integrating GPT-4 into customer service workflows',
      committee: 'AI Ethics Committee',
      priority: 'high',
      submittedBy: 'Product Team',
      submittedDate: '2024-01-28',
      deadline: '2024-02-15',
      status: 'under-review',
      riskLevel: 'medium',
      dataTypes: ['Customer Communications', 'Support Tickets']
    },
    {
      id: 'decision-002',
      title: 'HR Analytics AI Model',
      description: 'Implementation of AI-powered performance evaluation system',
      committee: 'Privacy & Data Protection Board',
      priority: 'medium',
      submittedBy: 'HR Department',
      submittedDate: '2024-01-30',
      deadline: '2024-02-20',
      status: 'awaiting-review',
      riskLevel: 'high',
      dataTypes: ['Employee Data', 'Performance Metrics', 'PII']
    },
    {
      id: 'decision-003',
      title: 'Marketing Personalization Engine',
      description: 'AI system for personalized marketing content generation',
      committee: 'Technical Review Board',
      priority: 'low',
      submittedBy: 'Marketing Team',
      submittedDate: '2024-02-01',
      deadline: '2024-02-25',
      status: 'draft',
      riskLevel: 'low',
      dataTypes: ['User Behavior', 'Marketing Data']
    }
  ];

  const recentDecisions = [
    {
      id: 'dec-001',
      title: 'Financial Reporting AI Assistant',
      decision: 'Approved with conditions',
      committee: 'AI Risk Management Committee',
      date: '2024-01-25',
      chair: 'Jennifer Walsh',
      conditions: ['Monthly bias audits', 'EU data residency requirement']
    },
    {
      id: 'dec-002',
      title: 'Legal Document Review AI',
      decision: 'Rejected',
      committee: 'Privacy & Data Protection Board',
      date: '2024-01-22',
      chair: 'Michael Rodriguez',
      reason: 'Insufficient privacy safeguards for client data'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review': return 'secondary';
      case 'awaiting-review': return 'outline';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Governance Committee</h2>
          <p className="text-sm text-muted-foreground">
            Dedicated oversight groups ensuring responsible AI governance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Committee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {committees.map((committee) => (
          <Card key={committee.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{committee.name}</CardTitle>
              <CardDescription className="text-xs">{committee.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Members</span>
                  <span className="font-medium">{committee.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Decisions</span>
                  <span className="font-medium">{committee.decisions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Pending</span>
                  <Badge variant="secondary" className="text-xs">
                    {committee.pendingReviews}
                  </Badge>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Chair: {committee.chair}</p>
                  <p className="text-xs text-muted-foreground">Next: {committee.nextMeeting}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="decisions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="decisions">Pending Decisions</TabsTrigger>
          <TabsTrigger value="members">Members & Roles</TabsTrigger>
          <TabsTrigger value="history">Decision History</TabsTrigger>
          <TabsTrigger value="training">Training & Attestation</TabsTrigger>
        </TabsList>

        <TabsContent value="decisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="w-4 h-4" />
                Pending Committee Decisions
              </CardTitle>
              <CardDescription>
                AI use cases awaiting committee review and approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDecisions.map((decision) => (
                  <div key={decision.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{decision.title}</h4>
                          <Badge variant={getPriorityColor(decision.priority)}>
                            {decision.priority} priority
                          </Badge>
                          <Badge variant={getStatusColor(decision.status)}>
                            {decision.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{decision.description}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>Committee: {decision.committee}</span>
                          <span>Submitted: {decision.submittedDate}</span>
                          <span>Deadline: {decision.deadline}</span>
                          <span>Risk: {decision.riskLevel}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {decision.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Committee Members
              </CardTitle>
              <CardDescription>
                Governance committee members and their responsibilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{member.name}</h4>
                          <Badge variant="outline">{member.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{member.role} • {member.department}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {member.committees.map((committee, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {committee}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Training Completion</p>
                            <div className="flex items-center gap-2">
                              <Progress value={member.completedTraining} className="h-2 flex-1" />
                              <span className="font-medium">{member.completedTraining}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Active</p>
                            <p className="font-medium">{member.lastActive}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Edit Role
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Decision History
              </CardTitle>
              <CardDescription>
                Record of all committee decisions and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDecisions.map((decision) => (
                  <div key={decision.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{decision.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Committee: {decision.committee}</span>
                          <span>Date: {decision.date}</span>
                          <span>Chair: {decision.chair}</span>
                        </div>
                      </div>
                      <Badge variant={decision.decision.includes('Approved') ? 'default' : 'destructive'}>
                        {decision.decision}
                      </Badge>
                    </div>
                    
                    {decision.conditions && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Conditions:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {decision.conditions.map((condition, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-current rounded-full"></div>
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {decision.reason && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Reason:</p>
                        <p className="text-sm text-muted-foreground">{decision.reason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Training & Attestation
              </CardTitle>
              <CardDescription>
                Governance training requirements and attestation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Overall Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">94%</div>
                      <p className="text-xs text-muted-foreground">Committee average</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Due This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-600">3</div>
                      <p className="text-xs text-muted-foreground">Training modules</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Attestations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">Completed this quarter</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {[
                    { module: 'AI Ethics Fundamentals', completion: 100, dueDate: 'Completed', status: 'completed' },
                    { module: 'Privacy by Design in AI', completion: 85, dueDate: '2024-02-20', status: 'in-progress' },
                    { module: 'EU AI Act Compliance', completion: 0, dueDate: '2024-03-01', status: 'not-started' },
                    { module: 'Risk Assessment Methodology', completion: 100, dueDate: 'Completed', status: 'completed' }
                  ].map((training, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{training.module}</h4>
                        <Badge variant={training.status === 'completed' ? 'default' : training.status === 'in-progress' ? 'secondary' : 'outline'}>
                          {training.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress value={training.completion} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{training.completion}%</span>
                        <span className="text-sm text-muted-foreground">Due: {training.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}