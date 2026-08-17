# Raw Logs Architecture for Audit Compliance

## 🎯 Overview

The **Raw Logs (Audit)** module provides complete, immutable, OTEL-compliant logging of the entire AI policy enforcement pipeline for SOC2, ISO27001, and regulatory compliance.

---

## 📍 Location

**Navigate:** Prove → Reports & Logs → **Raw Logs (Audit)** tab

This placement makes sense because:
- ✅ **Prove** section = Evidence for auditors and stakeholders
- ✅ Grouped with Reports (aggregated) and Activity Logs (summary)
- ✅ Natural drill-down: Report → Activity Log → Raw Log
- ✅ All audit evidence in one section

---

## 🔧 Complete Pipeline Tracked

Every AI request flows through this enforcement pipeline:

```
┌──────────┐   ┌─────────┐   ┌───────┐   ┌────────────┐   ┌──────────┐   ┌─────┐   ┌──────────┐
│ CLASSIFY │ → │ REDACT  │ → │ ROUTE │ → │ RATE LIMIT │ → │ VALIDATE │ → │ LOG │ → │ COMPLETE │
└──────────┘   └─────────┘   └───────┘   └────────────┘   └──────────┘   └─────┘   └──────────┘
   45ms          12ms         8ms           3ms              15ms          2ms       225ms total
```

Each stage generates a **separate log entry** with:
- ✅ OTEL trace.id + span.id for correlation
- ✅ decision.id for grouping the complete flow
- ✅ ISO 8601 timestamp with **microseconds** (PITR requirement)
- ✅ Input/output payloads
- ✅ Policies applied and decisions made
- ✅ Duration per stage

---

## 📊 Log Entry Schema

### OTEL Standard Fields
```json
{
  "timestamp": "2025-01-14T14:32:45.123456Z",  // ISO 8601 with microseconds for PITR
  "traceId": "trace-a1b2c3d4e5f6g7h8",        // OTEL trace ID
  "spanId": "span-12345678",                   // OTEL span ID
  "decisionId": "dec-20250114-001"             // Groups entire pipeline flow
}
```

### Context
```json
{
  "workflowId": "wf-001",
  "workflowName": "Customer Support Agent",
  "agentId": "agent-support-01",
  "agentName": "Support Assistant",
  "userId": "user-12345",
  "sessionId": "session-abc123"
}
```

### Pipeline Stage
```json
{
  "stage": "classify",              // classify | redact | route | rate_limit | validate | log | complete
  "stageDuration": 45               // milliseconds
}
```

### Policy Enforcement
```json
{
  "policiesApplied": [
    "POL-001: PII Detection",
    "POL-005: Financial Data"
  ],
  "policyDecisions": [
    {
      "policyId": "POL-001",
      "policyName": "PII Detection",
      "result": "warn",             // allow | deny | warn | redact
      "reason": "Query contains potential PII reference",
      "confidence": 0.92
    }
  ]
}
```

### Input/Output Payloads
```json
{
  "input": {
    "prompt": "What is my account balance?",
    "context": { "userId": "user-12345" }
  },
  "output": {
    "classification": "pii_query",
    "sensitivity": "high",
    "categories": ["financial", "personal_data"]
  }
}
```

### Status & Metadata
```json
{
  "status": "success",              // success | warning | error | blocked
  "severity": "info",               // info | warn | error | critical
  "metadata": {
    "modelProvider": "openai",
    "modelName": "gpt-4",
    "tokensUsed": 156,
    "cost": 0.00234,
    "latency": 45,
    "hitlTriggered": false,
    "redactionApplied": false,
    "rateLimitRemaining": 94
  }
}
```

### Error Details (if applicable)
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again after 2025-01-14T15:00:00Z",
    "stack": "..."                  // Optional for debugging
  }
}
```

---

## 🔍 Example: Complete Flow

A single user request generates **multiple log entries** (one per pipeline stage):

### 1️⃣ CLASSIFY Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.123456Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "classify",
  "stageDuration": 45,
  "input": { "prompt": "What is my SSN?" },
  "output": { "classification": "pii_query", "sensitivity": "high" },
  "policiesApplied": ["POL-001: PII Detection"],
  "policyDecisions": [
    { "policyId": "POL-001", "result": "warn", "reason": "PII query detected" }
  ]
}
```

### 2️⃣ REDACT Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.168912Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "redact",
  "stageDuration": 12,
  "input": { "text": "User SSN: 123-45-6789" },
  "output": { 
    "redactedText": "User SSN: [REDACTED]",
    "redactions": [{ "type": "ssn", "original": "123-45-6789" }]
  },
  "policiesApplied": ["POL-002: PII Redaction"]
}
```

### 3️⃣ ROUTE Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.181234Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "route",
  "stageDuration": 8,
  "output": {
    "targetService": "identity-api",
    "endpoint": "/api/v1/user/ssn"
  }
}
```

### 4️⃣ RATE_LIMIT Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.189567Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "rate_limit",
  "stageDuration": 3,
  "output": {
    "allowed": true,
    "remaining": 94,
    "limit": 100
  },
  "metadata": { "rateLimitRemaining": 94 }
}
```

### 5️⃣ VALIDATE Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.198901Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "validate",
  "stageDuration": 15,
  "output": {
    "valid": true,
    "validatedFields": ["userId"],
    "sanitizedPayload": { "userId": "user-12345" }
  }
}
```

### 6️⃣ LOG Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.345678Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "log",
  "stageDuration": 2,
  "output": {
    "logged": true,
    "storageLocation": "s3://plcy-audit-logs/2025/01/14/dec-001.json",
    "retention": "7-years"
  }
}
```

### 7️⃣ COMPLETE Stage
```json
{
  "timestamp": "2025-01-14T14:32:45.348901Z",
  "traceId": "trace-abc123",
  "decisionId": "dec-001",
  "stage": "complete",
  "stageDuration": 225,
  "output": {
    "response": "Your SSN is [REDACTED] for security",
    "totalDuration": 225,
    "stagesCompleted": 6,
    "policiesEnforced": 7
  }
}
```

**All 7 entries share the same `decisionId` and `traceId`** for complete correlation.

---

## 🎨 UI Features

### 1. Grouped View (Default)
- Logs grouped by `decision.id`
- Shows collapsed pipeline visualization: `classify → redact → route → ...`
- Summary: timestamp, workflow, total duration, status
- Expand to see each stage in detail

### 2. Search & Filter
- **Search:** decision.id, trace.id, workflow name, user ID
- **Time Range:** 15m, 1h, 6h, 24h, 7d, 30d, custom
- **Pipeline Stage:** All, classify, redact, route, rate_limit, validate, log, complete
- **Status:** All, success, warning, error, blocked

### 3. Real-Time Streaming
- Toggle "Start Stream" for live log updates
- Auto-refresh as new logs arrive
- Useful for debugging live workflows

### 4. Export Options
- **JSON Export:** Complete audit trail for auditors
- **CSV Export:** Tabular format for analysis
- **Filtered Export:** Export only matching logs
- **Time-Range Export:** Export specific time periods

### 5. Detail View
- Click "View JSON" to see complete log entry
- Copy decision.id / trace.id to clipboard
- Link to OTEL trace visualization (if integrated)
- Link to workflow execution (if applicable)

---

## 🛡️ Compliance Features

### SOC 2 Type II Requirements
✅ **Logging & Monitoring (CC7.2)**
- Complete audit trail of all AI decisions
- Immutable timestamp with microseconds
- 7-year retention policy

✅ **Change Management (CC8.1)**
- Policy decisions tracked per stage
- Input/output logged for each transformation

### ISO 27001 Requirements
✅ **A.12.4.1 Event Logging**
- User activities, exceptions, faults logged
- Date/time, user ID, event type recorded

✅ **A.12.4.3 Administrator Logs**
- System administrator activities tracked
- Privileged operations logged

### GDPR Requirements
✅ **Article 30: Records of Processing**
- Complete record of personal data processing
- Purposes, categories, recipients tracked

✅ **Article 32: Security Measures**
- Technical measures to ensure security
- Ability to restore data (PITR timestamps)

### OWASP LLM Top 10 Evidence
✅ **LLM01: Prompt Injection**
- Classification stage logs detect injection attempts
- Redaction stage shows sanitization

✅ **LLM06: Sensitive Info Disclosure**
- Redaction stage tracks PII removal
- Complete audit trail of data access

✅ **LLM08: Excessive Agency**
- Validation stage shows HITL triggers
- Policy decisions show approval requirements

---

## 🔗 Integration Points

### 1. Workflows & Agents Module
- Click "View Logs" on any workflow execution
- Deep-link to filtered raw logs for that `decisionId`

### 2. LLM Security Testing Module
- Test runs generate logs with `testRun.id`
- Filter logs by security test execution

### 3. HITL Approval Inbox
- Approval requests link to `decisionId`
- See complete pipeline that triggered HITL

### 4. Trust Center (Public)
- Export sanitized logs for transparency
- Show policy enforcement statistics

---

## 📈 Analytics from Raw Logs

From these raw logs, you can generate:
- **Security Reports:** Policy violations, blocked requests
- **Performance Reports:** Average latency per stage
- **Cost Reports:** Token usage and API costs
- **Compliance Reports:** Coverage of policies applied
- **HITL Reports:** Human approval rates and response times

---

## 💾 Storage & Retention

### Production Implementation
```
Storage: S3 / Azure Blob / Google Cloud Storage
Format: JSON Lines (.jsonl) - one log entry per line
Partitioning: /year=2025/month=01/day=14/hour=14/decisionId.jsonl
Retention: 7 years (SOC2/ISO27001 requirement)
Encryption: AES-256 at rest, TLS 1.3 in transit
Compression: Gzip (reduces storage by ~70%)
```

### Querying
```
Primary Index: (decisionId, timestamp)
Secondary Indexes: (traceId, workflowId, userId, sessionId)
Query Engine: Athena / BigQuery / Azure Data Explorer
```

---

## 🚀 Next Steps for Production

1. **Integrate OTEL SDK**
   - Add OpenTelemetry instrumentation to PLCY.dev
   - Emit trace/span IDs for all pipeline stages

2. **Configure Log Shipping**
   - Stream logs to S3/Azure/GCS
   - Set up partitioning by date for efficient queries

3. **Add Log Analysis**
   - Integrate with Athena/BigQuery for ad-hoc queries
   - Build dashboards from raw log data

4. **Implement PITR**
   - Use microsecond timestamps for point-in-time recovery
   - Support "rewind" to any decision point

5. **Compliance Automation**
   - Auto-generate SOC2 evidence from logs
   - Export ISO27001 audit reports monthly

---

## ✅ What Auditors Will See

When auditors review your PLCY logs, they'll find:

1. **Complete Traceability**
   - Every AI decision has a unique `decisionId`
   - Full pipeline execution from start to finish
   - Exact timestamps with microsecond precision

2. **Policy Enforcement Evidence**
   - Which policies were evaluated
   - What decisions were made (allow/deny/warn/redact)
   - Why each decision was made (reason + confidence)

3. **Data Protection Proof**
   - PII detection and redaction logged
   - HITL triggers for high-risk actions
   - Rate limiting and validation enforced

4. **Retention Compliance**
   - 7-year retention for all logs
   - Immutable storage with audit trail
   - PITR capability for incident investigation

5. **Exportable Evidence**
   - JSON exports for forensic analysis
   - CSV for spreadsheet analysis
   - Time-range filtering for specific audits

---

This architecture provides **bulletproof compliance evidence** that your AI systems are governed, controlled, and auditable! 🎯
