# Agent Tracing & Debugging Guide - PLCY Platform

## Overview

PLCY now includes comprehensive agent tracing and debugging capabilities for full visibility into AI agentic workflows. This enables compliance auditing, debugging, and performance monitoring.

## Two Tracing Views Available

### 1. **Hierarchical Tree View** (WorkflowDetailView.tsx)
**Best for:** Technical debugging, understanding nested execution chains

**Features:**
- **Timeline Visualization**: Horizontal timeline showing all steps with duration blocks
- **Tree Structure**: Collapsible hierarchical tree showing parent-child relationships
- **Detail Panel**: Full step details including inputs, outputs, metadata
- **Step Types**: LLM calls, Tool calls, Approvals, Retrievals, Chains, Agents
- **Real-time Selection**: Click timeline blocks or tree nodes to view details

**Access:** Click "View Trace" on any workflow card

### 2. **Session-Based Grouped View** (AgentSessionDebugger.tsx)
**Best for:** Understanding logical workflow progression, presenting to stakeholders

**Features:**
- **Session Management**: Left sidebar with multiple execution sessions
- **Grouped Steps**: Logical sections (Overview, Destination Insights, etc.)
- **Role Badges**: System, User, Assistant indicators
- **Expand All**: Quick expand/collapse all groups
- **Playground**: Test and iterate on workflows
- **Timeline**: Visual gantt-style execution timeline

**Access:** Alternative view for step-by-step debugging

## Key Components Implemented

### Data Structure for Full Traceability

```typescript
interface WorkflowStep {
  id: string;
  type: 'llm' | 'tool_call' | 'approval' | 'retrieval' | 'chain' | 'agent';
  name: string;
  timestamp: string;
  duration: number;
  status: 'success' | 'failed' | 'pending' | 'running';
  
  // LLM-specific
  role?: 'system' | 'user' | 'assistant';
  content?: string;
  model?: string;
  tokensUsed?: number;
  cost?: number;
  
  // Tool-specific
  toolInput?: Record<string, any>;
  toolOutput?: any;
  
  // Approval-specific (HITL)
  approvalId?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  
  // Nested children for hierarchical tracing
  children?: WorkflowStep[];
  
  // Retrieval-specific (RAG)
  documents?: Array<{
    title: string;
    content: string;
    similarity: number;
  }>;
}
```

## Workflow to Achieve Full Traceability

### Step 1: Instrument Your Agent Framework

To get this level of visibility, you need to capture:

```typescript
// 1. Agent/Chain Start
logStep({
  type: 'agent',
  name: 'Customer Support Agent',
  timestamp: new Date().toISOString(),
  children: []
});

// 2. LLM Calls
logStep({
  type: 'llm',
  role: 'system' | 'user' | 'assistant',
  content: prompt,
  model: 'gpt-4-turbo',
  tokensUsed: response.usage.total_tokens,
  cost: calculateCost(response.usage)
});

// 3. Tool Calls
logStep({
  type: 'tool_call',
  toolName: 'get_order_details',
  toolInput: { order_id: '12345' },
  toolOutput: orderData,
  duration: executionTime
});

// 4. HITL Approval Points
logStep({
  type: 'approval',
  approvalId: 'apr-001',
  approvalStatus: 'pending',
  content: 'Requesting approval for $750 refund',
  metadata: {
    risk_level: 'high',
    compliance_frameworks: ['SOC2', 'GDPR']
  }
});

// 5. Vector DB / RAG Retrievals
logStep({
  type: 'retrieval',
  query: 'refund policy over $500',
  documents: retrievedDocs,
  metadata: {
    vector_db: 'pinecone',
    similarity_threshold: 0.8
  }
});
```

### Step 2: Store Hierarchical Traces

Structure your traces with parent-child relationships:

```typescript
{
  id: 'agent-1',
  type: 'agent',
  children: [
    {
      id: 'llm-1',
      type: 'llm',
      role: 'system'
    },
    {
      id: 'chain-1',
      type: 'chain',
      children: [
        { id: 'llm-2', type: 'llm', role: 'assistant' },
        { id: 'tool-1', type: 'tool_call' },
        { id: 'approval-1', type: 'approval' }
      ]
    }
  ]
}
```

### Step 3: Real-time Monitoring

Push trace events to your workflow monitoring system:

```typescript
// WebSocket or Server-Sent Events
socketEmit('workflow:step', {
  workflowId: 'wf-001',
  step: stepData,
  timestamp: new Date().toISOString()
});
```

### Step 4: Compliance Evidence Export

Export full execution traces for audit trails:

```typescript
// Export includes:
- Full step-by-step execution
- All inputs and outputs
- Approval points and decisions
- Timestamps and durations
- Compliance framework mappings
```

## Integration Points

### With HITL Guardrails
- Approval steps link directly to Approval Inbox
- Click "View in Approval Inbox" to see full approval context
- Tracks who approved/rejected and when

### With Compliance Frameworks
- Each workflow maps to SOC2, ISO27001, GDPR, SEC controls
- Provides audit evidence for compliance requirements
- Export functionality generates compliance reports

### With Agent Frameworks

**LangChain:**
```python
from langchain.callbacks import BaseCallbackHandler

class PLCYTraceCallback(BaseCallbackHandler):
    def on_llm_start(self, ...):
        # Log LLM call
    def on_tool_start(self, ...):
        # Log tool call
    def on_chain_start(self, ...):
        # Log chain start
```

**AutoGPT/CrewAI/Autogen:**
Similar callback/observer patterns to capture:
- Agent starts/stops
- Tool invocations
- Sub-agent spawning
- Decision points

## Key Features

### Timeline Visualization
- Color-coded blocks by step type:
  - Purple: LLM calls
  - Green: Tool calls
  - Orange: HITL approvals
  - Cyan: Vector DB retrievals
  - Blue: Chains/sub-agents

### Filtering & Search
- Filter by step type (LLM, Tool, Approval, etc.)
- Search across all step content
- Filter by status (success, failed, pending)

### Performance Metrics
- Total execution time
- Per-step duration
- Token usage and costs
- Tool call latency

### Compliance Mapping
- Automatic mapping to compliance frameworks
- Audit trail generation
- Evidence export for regulators

## Best Practices

1. **Log Everything**: Capture all LLM calls, tool invocations, and decisions
2. **Include Context**: Store prompts, inputs, outputs, and reasoning
3. **Track Costs**: Monitor token usage and API costs per workflow
4. **Link HITL Points**: Connect approval steps to your HITL guardrails
5. **Export Regularly**: Generate compliance evidence exports
6. **Monitor Real-time**: Watch active workflows for debugging

## Example Use Cases

### 1. Debugging Agent Failures
- Click failed workflow
- View hierarchical trace
- Identify exact step that failed
- See inputs/outputs that caused failure

### 2. Compliance Auditing
- Export workflow trace
- Show step-by-step execution
- Prove HITL approvals occurred
- Demonstrate policy adherence

### 3. Performance Optimization
- Identify slow tool calls
- Find expensive LLM calls
- Optimize prompt token usage
- Reduce unnecessary steps

### 4. Customer Support
- Show customer exactly what agent did
- Explain why approval was needed
- Demonstrate fairness and transparency

## Future Enhancements

- [ ] Real-time streaming of live workflow execution
- [ ] A/B testing different agent configurations
- [ ] Cost optimization suggestions
- [ ] Automatic anomaly detection
- [ ] Integration with more agent frameworks
- [ ] Advanced search and filtering
- [ ] Workflow replay and debugging
- [ ] Performance benchmarking

---

## Questions?

This tracing system provides enterprise-grade observability for AI agents, enabling the "Prove" phase of PLCY's "Assess, Control, Prove" methodology.
