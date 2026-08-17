import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  Bot,
  User,
  Settings,
  Download,
  Wrench,
  Database,
  Code,
  Maximize2,
  Play,
  Shield,
  Timer,
  MessageSquare,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface WorkflowStep {
  id: string;
  type: 'llm' | 'tool' | 'vector_db' | 'chain';
  role?: 'system' | 'user' | 'assistant';
  name: string;
  timestamp: string;
  duration: number;
  status: 'success' | 'failed' | 'running';
  content?: string;
  input?: any;
  output?: any;
  metadata?: Record<string, any>;
}

interface WorkflowGroup {
  id: string;
  name: string;
  duration: number;
  steps: WorkflowStep[];
}

interface AgentSession {
  id: string;
  name: string;
  agentName: string;
  startedAt: string;
  duration: number;
  status: 'running' | 'completed' | 'failed';
  groups: WorkflowGroup[];
}

interface AgentSessionDebuggerProps {
  workflowId: string;
  onBack: () => void;
}

export function AgentSessionDebugger({ workflowId, onBack }: AgentSessionDebuggerProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string>('session-1');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['group-1', 'group-2']));
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(false);
  const [prettyFormat, setPrettyFormat] = useState(true);

  // Mock sessions data
  const sessions: AgentSession[] = [
    {
      id: 'session-1',
      name: 'User\'s travel plan',
      agentName: 'Travel Planning Agent',
      startedAt: '2025-12-16T10:00:00Z',
      duration: 50547,
      status: 'completed',
      groups: [
        {
          id: 'group-1',
          name: 'Overview',
          duration: 863,
          steps: [
            {
              id: 'step-1-1',
              type: 'llm',
              role: 'system',
              name: 'User\'s travel plan',
              timestamp: '2025-12-16T10:00:00Z',
              duration: 150,
              status: 'success',
              content: 'You are an expert travel itinerary planner. Cover all essential aspects for a smooth travel experience, including flights, accommodations, local transportation, and curated activities.',
            },
            {
              id: 'step-1-2',
              type: 'llm',
              role: 'user',
              name: 'User input',
              timestamp: '2025-12-16T10:00:01Z',
              duration: 50,
              status: 'success',
              content: 'I want to travel to Cost Rica from June 10 to June 15. I\'m interested in sightseeing and local cuisine.',
            },
            {
              id: 'step-1-3',
              type: 'llm',
              role: 'assistant',
              name: 'Initial response',
              timestamp: '2025-12-16T10:00:02Z',
              duration: 663,
              status: 'success',
              content: 'Great choice! Costa Rica in June is a fantastic time to experience its breathtaking landscapes and vibrant local flavors. I\'ll start crafting a personalized itinerary for your trip from June 10 to June 15, focusing on must-see sights and authentic culinary experiences. Let\'s walk through each detail to ensure this journey is exactly how you imagine it!',
              output: {
                function: 'userTravelPlan',
                destination: 'Costa Rica',
                startDate: 'June 10, 2024',
                endDate: 'June 15, 2024',
                preferences: 'sightseeing, local cuisine'
              }
            }
          ]
        },
        {
          id: 'group-2',
          name: 'Destination Insights',
          duration: 1007,
          steps: [
            {
              id: 'step-2-1',
              type: 'tool',
              name: 'Weather API',
              timestamp: '2025-12-16T10:00:03Z',
              duration: 420,
              status: 'success',
              input: {
                location: 'San Jose, Costa Rica',
                startDate: '2024-06-10',
                endDate: '2024-06-15'
              },
              output: {
                forecast: [
                  { date: '2024-06-10', temp: 28, condition: 'Partly Cloudy', precipitation: '40%' },
                  { date: '2024-06-11', temp: 27, condition: 'Light Rain', precipitation: '60%' },
                  { date: '2024-06-12', temp: 29, condition: 'Sunny', precipitation: '20%' }
                ]
              }
            },
            {
              id: 'step-2-2',
              type: 'tool',
              name: 'Travel advisories API',
              timestamp: '2025-12-16T10:00:04Z',
              duration: 380,
              status: 'success',
              input: {
                country: 'Costa Rica',
                date: '2024-06-10'
              },
              output: {
                advisoryLevel: 'Level 1: Exercise Normal Precautions',
                safetyTips: [
                  'Be aware of your surroundings',
                  'Keep valuables secure',
                  'Use authorized transportation'
                ],
                healthAdvisories: ['Routine vaccines recommended']
              }
            },
            {
              id: 'step-2-3',
              type: 'llm',
              role: 'assistant',
              name: 'Retrieve travel tips',
              timestamp: '2025-12-16T10:00:05Z',
              duration: 207,
              status: 'success',
              content: 'Based on the weather forecast and travel advisories, I recommend bringing light rain gear and comfortable walking shoes. Costa Rica is safe with normal precautions.'
            }
          ]
        },
        {
          id: 'group-3',
          name: 'Itinerary',
          duration: 8518,
          steps: [
            {
              id: 'step-3-1',
              type: 'llm',
              role: 'assistant',
              name: 'Day-by-day planning',
              timestamp: '2025-12-16T10:00:06Z',
              duration: 1200,
              status: 'success',
              content: 'Let me create a detailed day-by-day itinerary covering your 5 days in Costa Rica, focusing on sightseeing and local cuisine experiences.'
            }
          ]
        },
        {
          id: 'group-4',
          name: 'Flight',
          duration: 12358,
          steps: [
            {
              id: 'step-4-1',
              type: 'tool',
              name: 'Flight booking API',
              timestamp: '2025-12-16T10:00:10Z',
              duration: 2100,
              status: 'success',
              input: {
                origin: 'LAX',
                destination: 'SJO',
                departDate: '2024-06-10',
                returnDate: '2024-06-15',
                passengers: 1
              },
              output: {
                outbound: {
                  airline: 'United Airlines',
                  flightNumber: 'UA1850',
                  departure: '2024-06-10T08:30',
                  arrival: '2024-06-10T16:45',
                  price: 487
                },
                return: {
                  airline: 'United Airlines',
                  flightNumber: 'UA1851',
                  departure: '2024-06-15T18:30',
                  arrival: '2024-06-16T00:45',
                  price: 487
                }
              }
            },
            {
              id: 'step-4-2',
              type: 'llm',
              role: 'assistant',
              name: 'Flight option summary',
              timestamp: '2025-12-16T10:00:12Z',
              duration: 580,
              status: 'success',
              content: 'I found great flight options with United Airlines. The total cost for round-trip is $974. The flights have convenient times with your outbound leaving in the morning and return in the evening.'
            }
          ]
        },
        {
          id: 'group-5',
          name: 'Accommodation',
          duration: 12227,
          steps: [
            {
              id: 'step-5-1',
              type: 'tool',
              name: 'Hotel search API',
              timestamp: '2025-12-16T10:00:15Z',
              duration: 3200,
              status: 'success',
              input: {
                location: 'San Jose, Costa Rica',
                checkIn: '2024-06-10',
                checkOut: '2024-06-15',
                guests: 1
              },
              output: {
                hotels: [
                  {
                    name: 'Hotel Presidente',
                    rating: 4.5,
                    pricePerNight: 120,
                    amenities: ['WiFi', 'Restaurant', 'Gym']
                  },
                  {
                    name: 'Barcelo San Jose',
                    rating: 4.3,
                    pricePerNight: 105,
                    amenities: ['WiFi', 'Pool', 'Restaurant']
                  }
                ]
              }
            },
            {
              id: 'step-5-2',
              type: 'vector_db',
              name: 'Hotel reviews',
              timestamp: '2025-12-16T10:00:18Z',
              duration: 890,
              status: 'success',
              input: {
                query: 'Hotel Presidente San Jose Costa Rica reviews',
                topK: 5
              },
              output: {
                reviews: [
                  {
                    rating: 4.5,
                    text: 'Excellent location in downtown San Jose. Staff very helpful.',
                    similarity: 0.92
                  },
                  {
                    rating: 4.0,
                    text: 'Clean rooms, good breakfast. Perfect for business and leisure.',
                    similarity: 0.89
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'session-2',
      name: 'Vacation API',
      agentName: 'Travel Planning Agent',
      startedAt: '2025-12-16T09:00:00Z',
      duration: 42000,
      status: 'completed',
      groups: []
    },
    {
      id: 'session-3',
      name: 'Travel advisory API',
      agentName: 'Travel Planning Agent',
      startedAt: '2025-12-16T08:00:00Z',
      duration: 35000,
      status: 'completed',
      groups: []
    }
  ];

  const selectedSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedGroups(new Set());
      setExpandedSteps(new Set());
    } else {
      const allGroups = new Set(selectedSession.groups.map(g => g.id));
      const allSteps = new Set(selectedSession.groups.flatMap(g => g.steps.map(s => s.id)));
      setExpandedGroups(allGroups);
      setExpandedSteps(allSteps);
    }
    setExpandAll(!expandAll);
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getStepIcon = (step: WorkflowStep) => {
    switch (step.type) {
      case 'llm':
        if (step.role === 'system') return <Settings className="w-4 h-4" />;
        if (step.role === 'user') return <User className="w-4 h-4" />;
        return <Bot className="w-4 h-4" />;
      case 'tool':
        return <Wrench className="w-4 h-4" />;
      case 'vector_db':
        return <Database className="w-4 h-4" />;
      case 'chain':
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStepBadgeColor = (type: string) => {
    switch (type) {
      case 'llm':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'tool':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'vector_db':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
      case 'chain':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'system':
        return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
      case 'user':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'assistant':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  const handleExport = () => {
    const exportData = {
      session: selectedSession,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-session-${selectedSession.id}.json`;
    a.click();
    toast.success('Session trace exported');
  };

  // Render timeline
  const renderTimeline = () => {
    const totalDuration = selectedSession.duration;
    let cumulativeDuration = 0;
    
    return (
      <div className="relative h-20 bg-muted/30 rounded-lg overflow-hidden mb-6">
        <div className="absolute inset-0 flex items-center px-4">
          <div className="relative w-full h-10">
            {selectedSession.groups.map((group, index) => {
              const widthPercent = (group.duration / totalDuration) * 100;
              const leftPercent = (cumulativeDuration / totalDuration) * 100;
              cumulativeDuration += group.duration;
              
              const colors = [
                '#60a5fa', // blue
                '#34d399', // green
                '#f59e0b', // orange
                '#a78bfa', // purple
                '#ec4899', // pink
              ];
              
              return (
                <div
                  key={group.id}
                  className="absolute h-10 rounded cursor-pointer transition-all hover:brightness-110"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${Math.max(widthPercent, 1)}%`,
                    backgroundColor: colors[index % colors.length],
                    opacity: 0.7
                  }}
                  onClick={() => toggleGroup(group.id)}
                  title={`${group.name} - ${formatDuration(group.duration)}`}
                >
                  <div className="p-2 truncate text-xs text-white font-medium">
                    {group.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Time markers */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
          <span>0s</span>
          <span>{formatDuration(totalDuration / 4)}</span>
          <span>{formatDuration(totalDuration / 2)}</span>
          <span>{formatDuration(3 * totalDuration / 4)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Sessions */}
      <div className="w-64 border-r bg-background">
        <div className="p-4 border-b">
          <Button variant="ghost" size="sm" onClick={onBack} className="w-full justify-start">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </Button>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">Sessions</h3>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSessionId === session.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {session.status === 'completed' ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : session.status === 'failed' ? (
                      <XCircle className="w-3 h-3 text-red-500" />
                    ) : (
                      <Clock className="w-3 h-3 text-orange-500" />
                    )}
                    <span className="text-sm font-medium truncate">{session.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDuration(session.duration)}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-1">{selectedSession.name}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedSession.agentName} â€¢ {new Date(selectedSession.startedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExpandAll}>
                <Maximize2 className="w-4 h-4 mr-2" />
                {expandAll ? 'Collapse All' : 'Expand All'}
              </Button>
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Playground
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Timeline */}
          {renderTimeline()}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-xl font-semibold">{formatDuration(selectedSession.duration)}</p>
                  </div>
                  <Timer className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Steps</p>
                    <p className="text-xl font-semibold">
                      {selectedSession.groups.reduce((sum, g) => sum + g.steps.length, 0)}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">LLM Calls</p>
                    <p className="text-xl font-semibold">
                      {selectedSession.groups.reduce((sum, g) => 
                        sum + g.steps.filter(s => s.type === 'llm').length, 0
                      )}
                    </p>
                  </div>
                  <Bot className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tool Calls</p>
                    <p className="text-xl font-semibold">
                      {selectedSession.groups.reduce((sum, g) => 
                        sum + g.steps.filter(s => s.type === 'tool').length, 0
                      )}
                    </p>
                  </div>
                  <Wrench className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step-by-step Groups */}
          <div className="space-y-4">
            {selectedSession.groups.map((group, groupIndex) => (
              <Card key={group.id}>
                <CardContent className="p-0">
                  {/* Group Header */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleGroup(group.id)}
                  >
                    <div className="flex items-center gap-3">
                      {expandedGroups.has(group.id) ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                      <h3 className="font-medium">{group.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {formatDuration(group.duration)}
                      </Badge>
                    </div>
                  </div>

                  {/* Group Steps */}
                  <AnimatePresence>
                    {expandedGroups.has(group.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="border-t">
                          {group.steps.map((step, stepIndex) => (
                            <div
                              key={step.id}
                              className="border-b last:border-b-0"
                            >
                              {/* Step Header */}
                              <div
                                className="flex items-center justify-between p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                                onClick={() => toggleStep(step.id)}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <Badge className={`border ${getStepBadgeColor(step.type)}`}>
                                    {step.type === 'llm' ? 'LLM' : 
                                     step.type === 'tool' ? 'Tool' : 
                                     step.type === 'vector_db' ? 'vector_db' : 
                                     'Chain'}
                                  </Badge>
                                  
                                  {step.role && (
                                    <Badge className={`border ${getRoleBadgeColor(step.role)}`}>
                                      {step.role}
                                    </Badge>
                                  )}
                                  
                                  <span className="text-sm">{step.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Badge 
                                    className={
                                      step.status === 'success' 
                                        ? 'bg-green-500/10 text-green-600 border-green-500/30' 
                                        : 'bg-red-500/10 text-red-600 border-red-500/30'
                                    }
                                  >
                                    {step.status === 'success' ? 'Success' : 'Failed'}
                                  </Badge>
                                  {expandedSteps.has(step.id) ? (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              </div>

                              {/* Step Details */}
                              <AnimatePresence>
                                {expandedSteps.has(step.id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-muted/30"
                                  >
                                    <div className="p-6 space-y-4">
                                      {step.content && (
                                        <div>
                                          <div className="flex items-center gap-2 mb-2">
                                            {step.role && (
                                              <Badge className={`border text-xs ${getRoleBadgeColor(step.role)}`}>
                                                {step.role}
                                              </Badge>
                                            )}
                                          </div>
                                          <div className="bg-background p-4 rounded-lg text-sm border">
                                            {step.content}
                                          </div>
                                        </div>
                                      )}

                                      {step.input && (
                                        <div>
                                          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Input</h4>
                                          <div className="bg-background p-4 rounded-lg border">
                                            <pre className="text-xs font-mono overflow-x-auto">
                                              {JSON.stringify(step.input, null, prettyFormat ? 2 : 0)}
                                            </pre>
                                          </div>
                                        </div>
                                      )}

                                      {step.output && (
                                        <div>
                                          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Output</h4>
                                          <div className="bg-background p-4 rounded-lg border">
                                            <pre className="text-xs font-mono overflow-x-auto">
                                              {JSON.stringify(step.output, null, prettyFormat ? 2 : 0)}
                                            </pre>
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Timer className="w-3 h-3" />
                                        <span>Duration: {formatDuration(step.duration)}</span>
                                        <span className="mx-2">â€¢</span>
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(step.timestamp).toLocaleTimeString()}</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
