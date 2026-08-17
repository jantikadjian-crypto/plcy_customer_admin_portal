A cleaner structure can still map to your brand:

PLCY brand promise	Product area
Assess	AI Systems, Risk, Tests & Evaluations
Control	Policies & Controls, Approvals & Incidents
Prove	Evidence & Trust, Audit, Trust Center

NIST’s AI RMF uses Govern, Map, Measure, and Manage as its core functions; your Assess / Control / Prove model can map well to that if the product flow is made clearer.

3. Redesign around the “AI System Detail” page

Instead of forcing admins to jump across 8 sections, each AI system should have a detail page with tabs:

AI Systems → Customer Support Assistant

Tabs:

Overview — owner, status, risk tier, business purpose, users, last change.
Data & Models — provider, model version, RAG sources, data classification, regions.
Policies — deployed packs, active controls, monitor/enforce/block mode.
Tests — test plans, latest runs, failed scenarios, regression history.
Risks & Findings — threat model, open findings, residual risk, accepted risks.
Approvals — pending HITL approvals, policy exceptions, change approvals.
Traces — runtime events, prompts, tool calls, policy decisions, redacted logs.
Evidence — ISO 42001/NIST/EU AI Act evidence mapped to this system.
Settings — owners, environments, integrations, retention.

This is the most important UX change. Admins do not think, “I need the control library.” They think, “Is my Customer Support Assistant safe, compliant, and ready for audit?”

4. Fix primitives vs composite policy packs

Right now, the Policy Packs page feels like a marketplace. That is useful for discovery, but for admins, packs should feel like deployable governance outcomes, not downloadable add-ons.

I would rename the concepts:

Internal concept	Client-facing name
Primitive	Control
Composite Pack	Policy Pack or Governance Bundle
Enforcement Pipeline	Runtime Policy
Test Suite	Evaluation Profile
Logs	Evidence Records
Policy Library	Policy Studio

Keep “primitive” in docs/API for developers, but most admins should see Controls.

Recommended primitive/control categories

You should organize primitives by where they operate in the AI lifecycle:

Control category	Examples
Input controls	Prompt injection detection, PII detection, toxicity detection, file scanning, allow/deny topics
Retrieval controls	Source allowlist, data classification, vector index access, tenant isolation, grounding requirements
Model/provider controls	Approved model list, regional routing, fallback model policy, model version pinning
Output controls	PII/PHI redaction, citation enforcement, schema validation, toxicity filtering, hallucination checks
Tool/action controls	Tool allowlists, parameter validation, least privilege, spend limits, irreversible-action approval
Memory controls	Memory write approval, retention, user data boundaries, memory deletion
Human oversight controls	HITL thresholds, reviewer routing, escalation, two-person approval
Runtime controls	Rate limiting, cost caps, anomaly detection, kill switch, circuit breaker
Evidence controls	Immutable audit log, trace capture, evidence hashing, retention policy
Incident controls	Break glass, containment, rollback, post-incident review
Recommended composite packs

Composite packs should bundle controls, tests, evidence templates, and dashboards.

Examples:

Pack	What it should include
ISO 42001 Readiness Pack	AIMS scope, roles, risk assessment, test plan templates, monitoring evidence, corrective action records
OWASP LLM Top 10 Pack	Prompt injection, sensitive disclosure, supply chain, output handling, excessive agency, vector weakness tests
Customer Support AI Pack	PII redaction, refund approval thresholds, transcript retention, grounding, escalation, tone/safety tests
Agentic Workflow Pack	Tool permissions, step-level traceability, irreversible action approval, budget limits, sandbox testing
RAG / Knowledge Assistant Pack	Source allowlists, retrieval evals, citation checks, data classification, vector leakage tests
EU AI Act High-Risk Pack	Risk classification, logging, human oversight, robustness/cybersecurity/accuracy evidence, documentation exports
Healthcare AI Pack	PHI controls, HIPAA-oriented evidence, clinical escalation, sensitive output monitoring
Code Copilot Pack	Secret detection, license/IP checks, insecure code output tests, repository access controls
Financial Services Pack	Suitability disclaimers, record retention, high-risk advice escalation, audit evidence

Each pack should show:

Recommended for: specific AI systems/use cases.
Controls included: not just count, but the most important controls.
Tests created: which evaluations will run automatically.
Evidence produced: ISO/NIST/EU/HIPAA/etc. mappings.
Deployment mode: Monitor, Enforce, Block, HITL.
Impact preview: “Would have blocked 37 of 12,400 requests in the last 7 days.”
Required integrations: Slack, SIEM, ticketing, cloud, data catalog, identity.
Version diff: what changed since previous pack version.
Rollback: clear recovery path.

Remove or de-emphasize marketplace-style metrics like download counts. Admins care more about coverage, risk reduction, audit evidence, and false positive impact.