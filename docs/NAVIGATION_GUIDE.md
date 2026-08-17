# Navigation Guide - Accessing Workflows & Agents

## ✅ Workflows & Agents is Already Available!

The **Workflows & Agents** module is accessible from the main navigation sidebar.

### Location:

**Sidebar → Control Section → Workflows & Agents**

```
📊 Overview
  └─ Dashboard

🔍 Assess
  ├─ AI Inventory
  └─ Threat Modeling

🛡️ Control                    ← This section
  ├─ Control Library
  ├─ Human-in-the-Loop
  ├─ Approval Inbox
  ├─ Workflows & Agents       ← HERE! Click this
  ├─ Team Management
  ├─ Data Governance
  └─ Risk & Compliance

👁️ Prove
  ├─ My Trust Center
  └─ Reports & Logs

🔌 Integrate
  ├─ PLCY.dev
  └─ Integrations
```

### Navigation Details:

- **Icon**: GitBranch (branching workflow icon)
- **Section**: Control (expanded by default)
- **Full Path**: Control → Workflows & Agents

### What You'll See:

When you click on "Workflows & Agents", you'll access:

1. **Workflows Dashboard** with:
   - Active, Completed, and Failed workflow tabs
   - Real-time workflow monitoring
   - Create new workflow button
   - Search and filter capabilities

2. **Workflow Trace Views**:
   - Click "View Trace" on any workflow card
   - See hierarchical execution tree
   - Timeline visualization
   - Step-by-step debugging
   - Full agent observability

3. **Key Features**:
   - Monitor AI agent workflows
   - Track HITL approval points
   - Debug agent execution
   - Export compliance evidence
   - View LLM calls, tool usage, and costs

### Quick Access:

The navigation sidebar is collapsible. If you don't see it:
1. Look for the hamburger menu icon (☰) in the top-left
2. Click it to expand the sidebar
3. Scroll to the "Control" section
4. Click "Workflows & Agents"

---

## Navigation is Pre-configured!

All navigation items are already set up in your application:
- **Line 128** in App.tsx: Navigation item definition
- **Line 232** in App.tsx: Component rendering
- **Line 159** in App.tsx: "Control" section expanded by default

No additional configuration needed - just click and use!
