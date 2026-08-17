# Quick Implementation Guide: HITL & Multi-Step AI

## 🎯 TL;DR - Where Everything Goes

### New Settings Tabs (Priority Order)
1. ✅ **"Routing"** - Already has component, need to integrate ← DO THIS FIRST
2. 🆕 **"Approvals & HITL"** - Configure approval policies ← DO THIS SECOND
3. 🆕 **"Workflows & Agents"** - Multi-step AI configuration ← DO THIS LATER

### New Navigation Items
1. 🆕 **"Approval Inbox"** in `Control` section ← CORE FEATURE
   - Goes between "Human-in-the-Loop" and "Team Management"

### PLCY.dev Wizard Enhancement
1. 🆕 **Step 4: "Guardrails & Approvals"** ← DEVELOPER ONBOARDING
   - Insert between "Data Controls" and "Observability"
   - Can optionally merge with Request Routing

---

## 📊 Visual Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PLCY PLATFORM                          │
└─────────────────────────────────────────────────────────────┘
           │                                    │
           │                                    │
    ┌──────▼──────┐                      ┌─────▼──────┐
    │  PLCY.app   │                      │ PLCY.dev   │
    │ (Control    │                      │ (Data      │
    │  Plane)     │                      │  Plane)    │
    └──────┬──────┘                      └─────┬──────┘
           │                                    │
           │                                    │
┌──────────▼────────────┐            ┌──────────▼──────────┐
│   SETTINGS TABS       │            │  INTEGRATION WIZARD │
├───────────────────────┤            ├─────────────────────┤
│ • General             │            │ 1. Project Setup    │
│ • Notifications       │            │ 2. Select Provider  │
│ • Security            │            │ 3. Data Controls    │
│ • Routing ⭐          │            │ 4. Guardrails ⭐    │
│ • Approvals & HITL ⭐ │            │ 5. Request Routing  │
│ • Integrations        │            │ 6. Observability    │
│ • Compliance          │            │                     │
│ • Workflows/Agents ⭐ │            │ ⭐ = New/Enhanced   │
└───────────────────────┘            └─────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              NAVIGATION STRUCTURE                           │
├─────────────────────────────────────────────────────────────┤
│ Control Section:                                            │
│   • Control Library                                         │
│   • Human-in-the-Loop (Enhanced ⭐)                         │
│   • Approval Inbox (New ⭐)     ← PRIMARY NEW MODULE        │
│   • Team Management                                         │
│   • Data Governance                                         │
│   • Risk & Compliance                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Implementation Priority Queue

### ✅ DONE
- RequestRoutingSettings component exists

### 🔧 TODO #1: Complete Settings Integration (5 minutes)
**File:** `/components/SettingsPage.tsx`  
**Action:** Add the missing `<TabsContent value="routing">` section

**Code to add at line ~408 (after Security tab, before Integrations tab):**
```tsx
{/* Request Routing Settings */}
<TabsContent value="routing" className="space-y-4">
  <RequestRoutingSettings />
</TabsContent>
```

**Import to add at top:**
```tsx
import { RequestRoutingSettings } from './RequestRoutingSettings';
```

---

### 📋 TODO #2: Create Approval Inbox Module (2-3 hours)

**File:** `/components/ApprovalInbox.tsx`

**Key Features:**
```tsx
interface ApprovalRequest {
  id: string;
  timestamp: string;
  agent: string;
  action: {
    type: 'tool_call' | 'data_access' | 'policy_change';
    name: string;
    args: Record<string, any>;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  requester: {
    email: string;
    system: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  approvedAt?: string;
  justification?: string;
}
```

**Mock Data Example:**
```tsx
const mockApprovals: ApprovalRequest[] = [
  {
    id: 'appr_1',
    timestamp: '2024-12-15T10:30:00Z',
    agent: 'Customer Support Agent',
    action: {
      type: 'tool_call',
      name: 'delete_user',
      args: { user_id: 'user_456', email: 'john@example.com' },
      riskLevel: 'high'
    },
    requester: {
      email: 'support@company.com',
      system: 'Support Dashboard'
    },
    status: 'pending'
  },
  // ... more
];
```

---

### 📋 TODO #3: Create Approval Settings Tab (1-2 hours)

**File:** `/components/ApprovalPolicySettings.tsx`

**Structure:**
```tsx
export function ApprovalPolicySettings() {
  // Configure approval policies
  // - Risk thresholds
  // - Tool categories requiring approval
  // - Approver roles
  // - Notification settings
  // - Timeout configurations
}
```

**Then add to SettingsPage.tsx:**
```tsx
<TabsTrigger value="approvals" className="gap-2">
  <UserCheck className="w-4 h-4" />
  Approvals & HITL
</TabsTrigger>

<TabsContent value="approvals">
  <ApprovalPolicySettings />
</TabsContent>
```

---

### 📋 TODO #4: Add to Navigation (5 minutes)

**File:** `/App.tsx`

**Add to authenticatedNavigationGroups in Control section:**
```tsx
{
  label: 'Control',
  items: [
    { id: 'controls', label: 'Control Library', icon: Shield },
    { id: 'hitl', label: 'Human-in-the-Loop', icon: UserCheck },
    { id: 'approvals', label: 'Approval Inbox', icon: CheckSquare }, // ← NEW
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'data', label: 'Data Governance', icon: Globe },
    { id: 'trism', label: 'Risk & Compliance', icon: AlertTriangle },
  ]
}
```

**Add to renderContent switch:**
```tsx
case 'approvals':
  return <ApprovalInbox />;
```

**Import at top:**
```tsx
import { ApprovalInbox } from './components/ApprovalInbox';
import { CheckSquare } from 'lucide-react'; // Add to existing icon imports
```

---

### 📋 TODO #5: PLCY.dev Wizard Step (2-3 hours)

**File:** `/components/GuardrailsWizardStep.tsx`

**Then integrate into PLCYDevLanding.tsx:**
```tsx
// Add to wizard steps
const wizardSteps = [
  { number: 1, title: 'Project Setup', ... },
  { number: 2, title: 'Select Provider', ... },
  { number: 3, title: 'Data Controls', ... },
  { number: 4, title: 'Guardrails & Approvals', ... }, // ← NEW
  { number: 5, title: 'Request Routing', ... },
  { number: 6, title: 'Observability', ... },
];
```

---

### 📋 TODO #6: Workflows & Agents Tab (3-4 hours)

**File:** `/components/WorkflowAgentSettings.tsx`

**Features:**
- Visual workflow builder (simplified)
- Pre-built agent templates
- Action envelope configuration
- Tool registry

---

## 🎨 Design System Guidelines

### Colors
- **Approval/HITL Primary:** `blue-600` (matches PLCY brand)
- **Pending Status:** `yellow-500`
- **Approved Status:** `green-600`
- **Rejected Status:** `red-600`
- **High Risk:** `red-600`
- **Medium Risk:** `orange-500`
- **Low Risk:** `green-600`

### Icons (from lucide-react)
- Approval Inbox: `CheckSquare`
- Pending: `Clock`
- Approved: `CheckCircle`
- Rejected: `XCircle`
- High Risk: `AlertTriangle`
- Tool Call: `Wrench`
- Data Access: `Database`
- Policy Change: `Shield`
- Agent: `Bot`

### Badges
```tsx
// Risk level
<Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
  High Risk
</Badge>

// Status
<Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
  Pending Approval
</Badge>
```

---

## 📝 Approval Inbox UI Mockup (Text)

```
┌────────────────────────────────────────────────────────────┐
│ Approval Inbox                                       [Filter] [Sort] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ 🔴 HIGH RISK                        ⏰ 2 min ago     │  │
│ │                                                      │  │
│ │ delete_user() - Customer Support Agent              │  │
│ │ Requested by: support@company.com                   │  │
│ │                                                      │  │
│ │ Arguments:                                          │  │
│ │   • user_id: user_456                              │  │
│ │   • email: john@example.com                        │  │
│ │                                                      │  │
│ │ ⚠️  Safer alternative suggested: suspend_user()     │  │
│ │                                                      │  │
│ │ [Approve] [Edit & Approve] [Reject]  [View Context] │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ 🟠 MEDIUM RISK                      ⏰ 15 min ago    │  │
│ │                                                      │  │
│ │ export_user_data() - Analytics Agent               │  │
│ │ Requested by: analytics@company.com                │  │
│ │                                                      │  │
│ │ [Approve] [Reject]  [View Context]                 │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌────────────────────── History ─────────────────────┐   │
│ │ ✅ Approved by security@company.com - 1 hour ago   │   │
│ │    grant_database_access()                         │   │
│ │                                                     │   │
│ │ ❌ Rejected by security@company.com - 2 hours ago  │   │
│ │    delete_all_logs()                               │   │
│ └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 🔗 Data Flow: HITL Request to Approval

```
┌─────────────┐
│   User App  │
│  (PLCY.dev) │
└──────┬──────┘
       │ 1. AI request with tool call
       │    plcy.chat.completions.create({
       │      tools: [{ name: "delete_user" }]
       │    })
       ▼
┌──────────────┐
│ PLCY Gateway │
│  (Routing)   │
└──────┬───────┘
       │ 2. Policy engine evaluates
       │    → Risk: HIGH
       │    → Outcome: REQUIRE_APPROVAL
       ▼
┌──────────────┐
│  Approval    │
│   Service    │
└──────┬───────┘
       │ 3. Create approval request
       │    → Notify approvers (Slack/email)
       │    → Return pending response to app
       │
       │ 4. Approval request appears in inbox
       ▼
┌──────────────┐
│  Approval    │
│    Inbox     │
│  (PLCY.app)  │
└──────┬───────┘
       │ 5. Approver reviews & approves
       │    → Add justification
       │    → Generate evidence
       ▼
┌──────────────┐
│  Approval    │
│   Service    │
└──────┬───────┘
       │ 6. Resume workflow
       │    → Execute approved action
       │    → Log to audit trail
       ▼
┌──────────────┐
│ Evidence &   │
│ Audit Logs   │
└──────────────┘
```

---

## 🎯 Success Checklist

### Phase 1: Foundation
- [ ] Request Routing tab integrated in Settings
- [ ] Approval Inbox module created
- [ ] Navigation updated with Approval Inbox
- [ ] Basic approval UI works (approve/reject)

### Phase 2: Full HITL
- [ ] Approval Policy Settings tab created
- [ ] Risk-based approval logic
- [ ] Notification system (toast/email)
- [ ] Approval history and audit trail

### Phase 3: Developer Experience
- [ ] Guardrails wizard step in PLCY.dev
- [ ] Tool permission configuration
- [ ] "Approve once" caching

### Phase 4: Agentic AI
- [ ] Workflows & Agents settings tab
- [ ] Evidence Builder agent MVP
- [ ] Fix My Risk agent MVP
- [ ] Action envelope logging

---

## 📚 API Examples

### Example 1: Require Approval for High-Risk Tool
```typescript
// Developer SDK usage (PLCY.dev)
const chat = await plcy.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Delete user account 12345" }],
  tools: [{
    type: "function",
    function: {
      name: "delete_user",
      description: "Permanently delete a user account",
      parameters: {
        type: "object",
        properties: {
          user_id: { type: "string" }
        }
      }
    }
  }]
});

// PLCY automatically intercepts if tool requires approval
if (chat.requires_approval) {
  // Poll for approval
  const approval = await plcy.approvals.waitFor(chat.approval_id, {
    timeout: 3600 // 1 hour
  });
  
  if (approval.status === 'approved') {
    // Continue execution
  }
}
```

### Example 2: Multi-Step Workflow with HITL
```typescript
// Agent workflow (PLCY.app)
const workflow = plcy.workflows.create({
  name: "Fix Prompt Injection Vulnerability",
  steps: [
    {
      type: "analyze",
      action: "detect_vulnerability",
      params: { target: "user_input_handler" }
    },
    {
      type: "generate",
      action: "create_patch",
      params: { vulnerability_id: "..." },
      // This step requires approval
      require_approval: true,
      risk_level: "medium"
    },
    {
      type: "apply",
      action: "apply_patch",
      params: { patch_id: "..." }
    }
  ]
});

// Workflow executes until approval required
await workflow.run(); // Pauses at step 2

// Approval appears in inbox, then workflow auto-resumes
```

---

## 🤝 Integration Points

### With Existing Modules

**HITLGuardrails:**
- Link to Approval Inbox ("X pending approvals")
- Show policy outcome breakdown (ALLOW, BLOCK, REQUIRE_APPROVAL)

**Threat Modeling:**
- Auto-create approval rules for detected vulnerabilities
- "Fix My Risk" agent can remediate threats

**Reports & Logs:**
- Show approval audit trail
- Export evidence for compliance

**Trust Center:**
- Showcase approval processes to customers
- Publish anonymized approval metrics

---

**Ready to implement? Start with TODO #1 (5-minute fix)!** 🚀
