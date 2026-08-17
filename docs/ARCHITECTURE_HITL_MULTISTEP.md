# PLCY Architecture: HITL & Multi-Step AI Integration

## Executive Summary

This document outlines the strategic placement of **Human-in-the-Loop (HITL)** and **Multi-Step AI (Agentic Workflows)** features within the PLCY platform, designed to strengthen the platform's wedge as "Vanta for AI" while maintaining the "Assess, Control, Prove" methodology.

---

## Feature Placement Strategy

### 🎯 Core Principle
HITL and Multi-Step AI should be **first-class policy outcomes** that generate compliance evidence, not just UI features. They sit at the intersection of developer utility (PLCY.dev) and compliance evidence (PLCY.app).

---

## 1. Settings Page: New "Approvals & HITL" Tab

**Location:** `/Settings` → New tab between "Routing" and "Integrations"

**Purpose:** Central configuration for approval policies and HITL workflows

### Features:
```
✓ Approval Policy Configuration
  - Define when approvals are required (REQUIRE_APPROVAL, REQUIRE_2_PERSON_APPROVAL)
  - Risk thresholds (low/medium/high/critical)
  - Policy outcomes: ALLOW, BLOCK, REDACT, REWRITE, REQUIRE_APPROVAL
  
✓ Role-Based Approver Management
  - Who can approve what actions
  - Segregation of duties rules
  - Escalation paths
  
✓ Tool Category Permissions
  - Write actions (DB writes, IAM changes, emails, payments)
  - Data export (files, customer lists)
  - Secrets access
  - Production operations
  
✓ Workflow Configuration
  - Approval timeouts
  - Auto-escalation rules
  - Notification channels (Slack, email, in-app)
  - Approval templates
```

**Why here?** Settings is where platform-wide policies live. This makes HITL configuration discoverable and manageable alongside other governance settings.

---

## 2. New Module: "Approval Inbox" 

**Location:** Navigation → "Control" section (after "Human-in-the-Loop")

**Navigation Path:** `Control → Approval Inbox`

**Purpose:** Dedicated workspace for managing pending approvals and viewing approval history

### Features:
```
✓ Pending Approvals Queue
  - Real-time pending requests
  - Risk level indicators
  - Context-rich summaries ("Agent wants to run delete_user(user_id=...)")
  - Original vs. suggested safer alternatives
  
✓ Approval Actions
  - Approve / Reject / Edit & Approve
  - "Approve once" vs "Always allow in dev" toggles
  - Add justification/comments
  - Attach to compliance controls
  
✓ Approval History & Audit Trail
  - Who approved what, when, why
  - Compliance evidence export
  - Time-series analytics
  - Filter by risk level, type, approver, status
  
✓ Workflow Management
  - Delegation when out-of-office
  - Bulk actions
  - Saved filters
  - Slack/email notifications
```

**Why a separate module?** Approvals need dedicated real estate. This is a daily operational workspace, not just configuration. Think of it like "Issues" in Jira or "Pull Requests" in GitHub.

---

## 3. PLCY.dev Integration Wizard: "Guardrails & Approvals" Step

**Location:** PLCY.dev Wizard → New Step 4 (between "Data Controls" and "Observability")

**Current Wizard Flow:**
1. Project Setup
2. Select AI Provider
3. Data Controls
4. **[NEW] Guardrails & Approvals** ⬅️ INSERT HERE
5. Request Routing (optional, can merge with #4)
6. Observability & QA

**Purpose:** No-code wizard step for developers to configure HITL policies during integration

### Features:
```
✓ Quick Setup Presets
  - "Development" (permissive, approve once + cache)
  - "Staging" (moderate, approve on first use per day)
  - "Production" (strict, always require approval for high-risk)
  
✓ Tool Permission Wizard
  - Visual tool category selector (write, export, secrets, prod)
  - Risk-based defaults
  - Custom permission rules
  
✓ Action Envelope Configuration
  - Define what gets logged (LLM_CALL, TOOL_CALL_PROPOSED, DATA_ACCESS, etc.)
  - Compliance mapping preview
  
✓ Approval Workflow Setup
  - Select approvers from team
  - Set notification preferences
  - Configure approval timeouts
```

**Why in wizard?** Developers setting up PLCY.dev need to configure guardrails during onboarding. This makes HITL a natural part of the integration flow, not an afterthought.

---

## 4. Settings Page: New "Workflows & Agents" Tab

**Location:** `/Settings` → New tab (after "Compliance")

**Purpose:** Configure multi-step AI (agentic) workflows that generate compliance evidence

### Features:
```
✓ Workflow Builder
  - Visual workflow designer (think Zapier/n8n but for AI agents)
  - Pre-built templates: "Fix My Risk" and "Evidence Builder"
  - Interrupt/resume capability configuration
  
✓ "Fix My Risk" Agent Configuration
  - Detect patterns: PII leakage, prompt injection, missing audit logs
  - Auto-generate PR/patches
  - Run checks
  - Require approval before applying
  - Log evidence: "risk detected → mitigated → approved"
  
✓ "Evidence Builder" Agent Configuration
  - Select compliance baseline (SOC2-lite, ISO 42001-lite, EU AI Act)
  - Auto-collect artifacts: configs, logs, policy definitions
  - Map to controls
  - Draft narratives
  - Require sign-off before GRC submission
  
✓ Tool Registry & Permissions
  - Register available tools/APIs
  - Define permission levels per tool
  - Set approval requirements
  
✓ Action Envelope Definitions
  - Configure what events agents emit
  - Standard events: LLM_CALL, TOOL_CALL_PROPOSED, TOOL_CALL_EXECUTED, 
    DATA_ACCESS, POLICY_CHANGE, EVIDENCE_EXPORT, EVIDENCE_SUBMIT
```

**Why a separate tab?** Multi-step AI is advanced functionality. Separating it from HITL (which is more operational) keeps Settings organized and progressive disclosure works better.

---

## 5. Enhanced "Human-in-the-Loop" Module

**Location:** Existing navigation → `Control → Human-in-the-Loop`

**Current State:** Already exists as `HITLGuardrails`

**Enhancement Required:** Expand from just "guardrails" to full HITL lifecycle

### New Features to Add:
```
✓ Policy Outcomes Dashboard
  - Visual breakdown of ALLOW, BLOCK, REDACT, REWRITE, REQUIRE_APPROVAL
  - Real-time metrics
  - Trend analysis
  
✓ Quick Link to Approval Inbox
  - "X pending approvals" badge
  - Jump to inbox
  
✓ HITL Performance Metrics
  - Average approval time
  - Approval rate by type
  - Bottleneck identification
  - Approver workload distribution
  
✓ Integration with Evidence
  - Show how HITL decisions map to compliance controls
  - Export evidence of segregation of duties
  - Audit trail visualization
```

**Why enhance existing?** You already have brand recognition for "Human-in-the-Loop" in navigation. Enhance it to be the analytics/overview page, while "Approval Inbox" is the operational workspace.

---

## 6. Enhanced "Reports & Logs" Module

**Location:** Existing navigation → `Prove → Reports & Logs`

**Enhancement Required:** Add multi-step AI agent evidence

### New Features to Add:
```
✓ Agent Activity Logs
  - All agent actions (Fix My Risk, Evidence Builder)
  - Action envelopes with full context
  - Approval chains
  
✓ Automated Evidence Collection
  - Show artifacts auto-collected by Evidence Builder agent
  - Map to compliance controls (ISO 42001, EU AI Act, SOC2)
  - Export for GRC tools
  
✓ Compliance Evidence Dashboard
  - "Evidence collected" progress bars
  - Missing evidence alerts
  - One-click export packages
```

**Why here?** "Prove" is where evidence lives. Multi-step AI agents generate evidence, so their outputs should be visible in the existing compliance reporting area.

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
1. ✅ Add "Approvals & HITL" tab to Settings
2. ✅ Create basic Approval Inbox module
3. ✅ Integrate RequestRoutingSettings into Settings (already done)

### Phase 2: Developer Experience (Week 3-4)
4. ✅ Add "Guardrails & Approvals" step to PLCY.dev wizard
5. ✅ Connect wizard to Settings policies
6. ✅ Implement "interrupt/resume" API contracts

### Phase 3: Agentic AI (Week 5-6)
7. ✅ Add "Workflows & Agents" tab to Settings
8. ✅ Build "Fix My Risk" agent MVP
9. ✅ Build "Evidence Builder" agent MVP

### Phase 4: Evidence & Integration (Week 7-8)
10. ✅ Enhance Reports & Logs with agent activity
11. ✅ Create compliance evidence export
12. ✅ Integrate with existing modules

---

## Navigation Structure (Proposed Changes)

### Current Navigation (Authenticated)
```
Overview
├─ Dashboard

Assess
├─ AI Inventory
├─ Threat Modeling

Control
├─ Control Library
├─ Human-in-the-Loop
├─ Team Management
├─ Data Governance
├─ Risk & Compliance

Prove
├─ My Trust Center
├─ Reports & Logs

Integrate
├─ PLCY.dev
├─ Integrations
```

### NEW Navigation (with HITL + Multi-Step AI)
```
Overview
├─ Dashboard

Assess
├─ AI Inventory
├─ Threat Modeling

Control
├─ Control Library
├─ Human-in-the-Loop
├─ 🆕 Approval Inbox ⬅️ NEW MODULE
├─ Team Management
├─ Data Governance
├─ Risk & Compliance

Prove
├─ My Trust Center
├─ Reports & Logs

Integrate
├─ PLCY.dev
├─ Integrations
```

### Settings Tabs (Proposed)
```
BEFORE:
- General
- Notifications
- Security
- Routing
- Integrations
- Compliance

AFTER:
- General
- Notifications
- Security
- Routing
- 🆕 Approvals & HITL ⬅️ NEW TAB
- Integrations
- Compliance
- 🆕 Workflows & Agents ⬅️ NEW TAB
```

### PLCY.dev Wizard Steps (Proposed)
```
BEFORE:
1. Project Setup
2. Select AI Provider
3. Data Controls
4. Observability & QA

AFTER:
1. Project Setup
2. Select AI Provider
3. Data Controls
4. 🆕 Guardrails & Approvals ⬅️ NEW STEP
5. Request Routing (can merge with #4)
6. Observability & QA
```

---

## Data Model: Action Envelope

Every step in multi-step AI emits a standard event:

```json
{
  "envelope_id": "evt_123abc",
  "timestamp": "2024-12-15T10:30:00Z",
  "type": "TOOL_CALL_PROPOSED",
  "agent_id": "fix-my-risk-agent-01",
  "context": {
    "tool_name": "delete_user",
    "args": { "user_id": "user_456" },
    "risk_level": "high",
    "risk_context": "Permanent data deletion"
  },
  "policy_outcome": "REQUIRE_APPROVAL",
  "approval": {
    "required": true,
    "approvers": ["security@company.com"],
    "timeout_seconds": 3600,
    "approval_id": "appr_789xyz"
  },
  "compliance_mapping": [
    { "framework": "ISO42001", "control": "A.5.2" },
    { "framework": "EU_AI_ACT", "article": "Article 14" }
  ]
}
```

---

## API Contracts (Developer-Facing)

### 1. Request with HITL
```javascript
// PLCY.dev SDK usage
const response = await plcy.chat.completions.create({
  model: "gpt-4",
  messages: [...],
  tools: [
    { type: "function", function: { name: "delete_user", ... } }
  ],
  // PLCY-specific: approval policy
  hitl_policy: {
    require_approval_for: ["delete_user"],
    approvers: ["security@company.com"],
    timeout_seconds: 3600
  }
});

// If approval required, SDK returns special response
if (response.requires_approval) {
  // Show approval pending UI
  // Poll for approval: plcy.approvals.get(response.approval_id)
}
```

### 2. Workflow Interrupt/Resume
```javascript
// Agent workflow
const workflow = await plcy.workflows.create({
  type: "fix_my_risk",
  target: "prompt_injection_vulnerability"
});

// Workflow runs until it needs approval
await workflow.waitForApproval(); // Pauses deterministically

// After approval, resume
await workflow.resume({
  approval_token: "signed_token_from_approval"
});
```

---

## UI/UX Principles

### 1. Progressive Disclosure
- Basic users see simple on/off toggles
- Advanced users see full workflow builders
- Settings show "Simple" vs "Advanced" view toggle

### 2. Zero-Config Defaults
- Sensible defaults based on environment (dev/staging/prod)
- One-click enable common patterns
- "Recommended" badges guide users

### 3. Evidence-First Design
- Every HITL decision generates evidence
- Every agent action creates audit trail
- One-click export for compliance
- Compliance mapping shown inline

### 4. Developer-Friendly
- PLCY.dev wizard makes HITL easy to set up
- SDK handles interrupt/resume complexity
- Clear error messages
- Example code snippets everywhere

---

## Competitive Differentiation

### vs. LangChain/LlamaIndex (just orchestration)
✓ PLCY adds compliance evidence automatically
✓ Built-in approval workflows (not DIY)
✓ Turnkey solution vs. framework

### vs. HumanSignal/Labelbox (just HITL UI)
✓ PLCY integrates with governance policies
✓ Evidence for auditors, not just labels
✓ Multi-step AI, not just single reviews

### vs. Vanta/Drata (just compliance automation)
✓ PLCY has developer utility (HITL + routing)
✓ Real-time enforcement, not just audit
✓ AI-specific controls, not generic IT

---

## Success Metrics

### Developer Adoption (PLCY.dev)
- Time to first successful HITL approval: < 10 minutes
- % of integrations using HITL: Target 40%+
- Developer satisfaction (NPS): Target 50+

### Compliance Value (PLCY.app)
- Evidence artifacts generated per month: Track growth
- Time saved on audit prep: Target 60% reduction
- Compliance score improvement: Track before/after

### Operational Efficiency
- Average approval time: Target < 30 minutes
- Approval automation rate: Target 70% (via caching)
- False positive rate: Target < 5%

---

## Next Steps

1. **Immediate:** Complete Settings integration for Request Routing (mentioned as incomplete)
2. **Week 1:** Build "Approval Inbox" module
3. **Week 2:** Add "Approvals & HITL" tab to Settings
4. **Week 3:** Add wizard step to PLCY.dev
5. **Month 2:** Build first agent (Evidence Builder or Fix My Risk)

---

## Questions for Product Decision

1. **Should Request Routing and Guardrails be combined or separate wizard steps?**
   - Option A: Separate steps (more granular, longer wizard)
   - Option B: Combined "Smart Routing & Guardrails" step (shorter wizard, less overwhelming)
   - **Recommendation:** Start combined, split later if needed

2. **Should Approval Inbox be in Control or at top-level?**
   - Option A: Under Control section (better organization)
   - Option B: Top-level nav item (higher visibility)
   - **Recommendation:** Control section to start, can promote later if usage is high

3. **Which agent to build first: Fix My Risk or Evidence Builder?**
   - Fix My Risk: Better developer utility, more viral
   - Evidence Builder: Better compliance value, easier to sell
   - **Recommendation:** Evidence Builder first (closer to "Vanta wedge")

---

## Appendix: Component Architecture

### New Components Needed
```
/components/ApprovalInbox.tsx              # Main inbox module
/components/ApprovalInboxCard.tsx          # Individual approval card
/components/ApprovalHistoryTable.tsx       # History view
/components/ApprovalPolicySettings.tsx     # Settings tab content
/components/WorkflowAgentSettings.tsx      # Workflows & Agents tab
/components/FixMyRiskAgent.tsx             # Agent configuration
/components/EvidenceBuilderAgent.tsx       # Agent configuration
/components/GuardrailsWizardStep.tsx       # PLCY.dev wizard step
/components/ActionEnvelopeViewer.tsx       # Debug/logs component
```

### Components to Enhance
```
/components/HITLGuardrails.tsx             # Add policy outcomes dashboard
/components/SettingsPage.tsx               # Add 2 new tabs
/components/PLCYDevLanding.tsx             # Add wizard step
/components/ReportsAndLogs.tsx             # Add agent activity
```

---

**Document Version:** 1.0  
**Last Updated:** December 15, 2024  
**Author:** PLCY Product Architecture Team
