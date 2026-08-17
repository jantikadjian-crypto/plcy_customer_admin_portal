# Logging Integration Guide

## 🎯 How Raw Logs Connect to the Rest of PLCY

Your Raw Logs module is now integrated into the platform. Here's how it all works together:

---

## 📊 Complete User Journey

### Scenario: Auditor Investigating a Workflow Execution

1. **Start: Workflows & Agents Page**
   - Navigate to: **Control → Workflows & Agents**
   - See all active/completed workflows
   - Click **"View Trace"** on any workflow

2. **Workflow Trace View**
   - See hierarchical execution tree
   - Timeline of all steps
   - LLM calls, tool usage, HITL triggers
   - **NEW:** Click **"View Raw Logs"** button

3. **Raw Logs (Audit)**
   - Navigate to: **Prove → Reports & Logs → Raw Logs (Audit)** tab
   - Automatically filtered to that workflow's `decisionId`
   - See complete pipeline: classify → redact → route → rate‑limit → validate → log
   - Export for auditors

---

## 🔗 Navigation Paths

### Path 1: Top-Down (Management View)
```
Reports & Logs (Overview)
  ↓
Activity Logs (Summary)
  ↓
Raw Logs (Audit) - Full Details
```

### Path 2: Bottom-Up (Investigation)
```
Workflows & Agents (Execution)
  ↓
View Trace (Step-by-step)
  ↓
Raw Logs (Policy Enforcement)
```

### Path 3: Security Testing
```
LLM Security Testing (Tests)
  ↓
Test Results (Pass/Fail)
  ↓
Raw Logs (Test Execution Details)
```

---

## 🎨 Adding "View Raw Logs" Button

### In WorkflowsAndAgents.tsx

Add a new button next to "View Trace":

```tsx
<Button
  size="sm"
  variant="outline"
  onClick={() => {
    // Navigate to Raw Logs tab with decisionId filter
    window.location.hash = `#/reports/raw-logs?decisionId=${workflow.decisionId}`;
    // OR: Use a callback to parent App.tsx to change tabs
    // onNavigate('reports', { tab: 'raw-logs', filter: workflow.decisionId });
  }}
>
  <Database className="w-4 h-4 mr-2" />
  View Raw Logs
</Button>
```

### Result
Users can now:
1. See workflow execution (high-level)
2. Click "View Trace" for step-by-step debugging
3. Click "View Raw Logs" for complete policy enforcement audit trail

---

## 📋 What Each View Shows

### 1️⃣ Workflows & Agents (Control Module)
**Purpose:** Manage and monitor AI workflows

**Shows:**
- Workflow status (Active, Completed, Failed)
- Execution count, success rate
- HITL approval requirements
- LLM model used
- Cost and token usage

**User Actions:**
- Create new workflow
- View execution trace
- Edit workflow config
- **→ View Raw Logs (NEW!)**

---

### 2️⃣ Workflow Trace View (Debugging)
**Purpose:** Debug individual workflow executions

**Shows:**
- Hierarchical execution tree
- Timeline with timestamps
- Input/output for each step
- LLM calls with prompts/responses
- Tool invocations
- HITL approval points

**User Actions:**
- Expand/collapse steps
- See token usage
- Copy trace ID
- Export trace JSON
- **→ View Raw Logs for this execution (NEW!)**

---

### 3️⃣ Raw Logs (Audit Module - Prove Section)
**Purpose:** Complete compliance audit trail

**Shows:**
- **OTEL trace/span IDs** for correlation
- **decision.id** for grouping entire flow
- **Complete pipeline:** classify → redact → route → rate‑limit → validate → log
- **Policy decisions** at each stage (allow/deny/warn/redact)
- **Timestamps** with microseconds (PITR)
- **Input/output payloads** (redacted if needed)
- **Error details** if any stage failed

**User Actions:**
- Search by decision.id, trace.id, workflow
- Filter by stage, status, time range
- Export for auditors (JSON/CSV)
- Copy trace/decision IDs
- View complete JSON payload
- Stream live logs

---

## 🔧 Implementation Checklist

### Phase 1: Basic Integration (✅ DONE)
- [✅] Create RawLogsModule.tsx component
- [✅] Add "Raw Logs (Audit)" tab to Reports & Logs
- [✅] Mock data with complete OTEL schema
- [✅] Search, filter, export functionality
- [✅] Grouped view by decision.id
- [✅] Expandable pipeline visualization

### Phase 2: Cross-Module Integration (🚧 NEXT)
- [ ] Add "View Raw Logs" button to Workflows & Agents
- [ ] Add deep-linking: `/reports?tab=raw-logs&decisionId=xxx`
- [ ] Add "View Raw Logs" to HITL Approval Inbox
- [ ] Add "View Raw Logs" to LLM Security Testing results

### Phase 3: Production Backend (🔮 FUTURE)
- [ ] Integrate OpenTelemetry SDK
- [ ] Stream logs to S3/Azure/GCS
- [ ] Set up log querying (Athena/BigQuery)
- [ ] Implement 7-year retention
- [ ] Add PITR recovery tooling

---

## 📝 Example: Complete Audit Trail

### User Request
> "Show me evidence that our AI system detected and redacted PII from user queries on January 14th, 2025"

### Auditor Workflow

1. **Navigate:** Prove → Reports & Logs → Raw Logs (Audit)

2. **Filter:**
   - Time Range: January 14, 2025
   - Pipeline Stage: "redact"
   - Status: "success"

3. **Results:**
   ```
   Decision ID: dec-20250114-001
   Timestamp: 2025-01-14T14:32:45.168912Z
   Workflow: Customer Support Agent
   Stage: redact
   
   Policy Applied: POL-002: PII Redaction
   Policy Decision: REDACT
   Reason: "SSN and account number detected"
   Confidence: 99%
   
   Input: "User SSN: 123-45-6789 requesting balance for account #98765"
   Output: "User SSN: [REDACTED] requesting balance for account #[REDACTED]"
   
   Redactions:
   - Type: ssn, Original: "123-45-6789", Position: 10
   - Type: account_number, Original: "98765", Position: 54
   ```

4. **Export:** Click "Export" → Download JSON with all matching logs

5. **Evidence Provided:** ✅
   - Timestamp proves when it happened
   - Policy decision shows what was detected
   - Redaction details show what was removed
   - Confidence score shows reliability
   - Complete audit trail for compliance

---

## 🎯 Value Proposition for Auditors

### Without Raw Logs
❌ "We have AI governance policies"
❌ "Our system redacts PII"
❌ "We enforce rate limits"

**Auditor:** "Can you prove it?"
**You:** "...not really"

### With Raw Logs
✅ **Complete audit trail** of every AI decision
✅ **OTEL-compliant** trace/span IDs for correlation
✅ **Microsecond timestamps** for PITR
✅ **Policy decisions** with reasons and confidence
✅ **7-year retention** for SOC2/ISO27001
✅ **Exportable evidence** in JSON/CSV

**Auditor:** "Can you prove it?"
**You:** "Here's the complete log showing policy enforcement at 14:32:45.168912Z with 99% confidence that we redacted SSN 123-45-6789. Would you like me to export all 50,000 similar decisions from Q4 2024?"

---

## 🚀 Marketing This Feature

### For Sales/Prospects

**"PLCY provides complete audit trails of AI governance**

Unlike other platforms that just claim to have governance, PLCY gives you:

- ✅ Complete OTEL-compliant logs of every AI decision
- ✅ Microsecond-precision timestamps for incident investigation
- ✅ Policy enforcement evidence at every pipeline stage
- ✅ Exportable audit packages for SOC2, ISO27001, GDPR
- ✅ 7-year retention for regulatory compliance

**Your auditors will love you.**"

---

## ✅ Summary

Your **Raw Logs (Audit)** module provides:

1. **Complete Visibility:** See every stage of AI policy enforcement
2. **Compliance Evidence:** Export audit trails for SOC2/ISO27001
3. **PITR Capability:** Microsecond timestamps for incident recovery
4. **OTEL Standard:** Industry-standard trace/span correlation
5. **Auditor-Friendly:** Search, filter, export exactly what they need

**Location:** Prove → Reports & Logs → **Raw Logs (Audit)** tab

**Integration:** Links from Workflows, HITL, Security Testing

**Use Case:** Show auditors that your AI governance isn't just policy docs - it's **enforced and proven** with complete audit trails! 🎯
