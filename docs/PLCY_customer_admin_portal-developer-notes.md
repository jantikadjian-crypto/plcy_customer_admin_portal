# PLCY Customer Admin Portal — Developer Notes

<!-- GENERATED FILE — DO NOT EDIT. Source: src/app/devNotes/content.js. Regenerate: npm run devnotes -->

**Module:** `plcy_customer_admin_portal`  
**Last updated:** 2026-08-16

Customer-facing admin surface of the PLCY AI governance platform, built on the "Assess, Control, Prove" methodology. Today it is a complete UI prototype with no backend: every number on screen is an inline fixture.

## Contents

- [Overview](#overview)
- [Business rules](#business-rules)
- [Key data fields](#data-fields)
- [Edge cases](#edge-cases)
- [Integrations](#integrations)
- [Permissions](#permissions)
- [Non-obvious decisions](#decisions)
- [Code vs. intent mismatches](#mismatches)
- [Open questions](#open-questions)

<a id="overview"></a>

## Overview

*What this portal is, who opens it, and what state it is actually in.*

The portal is the customer-facing half of PLCY. A customer runs AI systems (chatbots, RAG agents, copilots); PLCY governs them. The portal is where the customer inventories those systems, attaches policy to them, reviews what the policy caught, and exports proof that governance happened.

> **Important — There is no backend**
>
> No fetch, no API client, no store, no persistence anywhere in the codebase. Each page module declares its own fixture constants at the top of the file. `isAuthenticated` is hardcoded true in App.tsx, so the app boots straight into the authenticated dashboard as "Demo Company". Treat every figure on screen as illustrative, never as a specification of real values.

Three personas share the portal, each entering through a different section. The navigation is deliberately grouped so each persona has a home:

| Persona | Opens it to | Lives in |
| --- | --- | --- |
| Compliance / governance lead | Prove posture to auditors and track framework readiness | Compliance Posture, Reports, Evidence Vault, Trust Center |
| Security engineer | See what was blocked or flagged, triage findings, tune policy | AI Inventory, Policy Packs, Threat Modeling, LLM Security Testing |
| Ops approver | Clear the queue of AI actions that tripped a guardrail | Approval Inbox, Change Approvals, Human-in-the-Loop |

The core governance loop, which is the part worth understanding first: an AI system is registered in the Inventory, one or more Policy Packs are deployed against it in a given enforcement mode, runtime traffic produces blocked/flagged counts and findings, guardrail trips become approval requests, and test runs plus resolved approvals produce evidence records that feed the compliance scores and exported reports.

<a id="business-rules"></a>

## Business rules

*Rules with a `source` are implemented. Rules without one were decided in handover and still need building.*

#### Enforcement modes

Every AI system runs a policy pack in exactly one of four modes. Monitor observes and logs without intervening. Enforce blocks a request when it violates the pack. HITL suspends the action and raises an approval request for a human. Block denies the pack's whole category outright, without evaluating per-request.

*Example:* Code Review Copilot runs OWASP checks in Monitor, so its 7 flagged requests all still went through and its blocked count is 0. Customer Support AI runs the same pack in Enforce, so 52 of its requests were stopped.

*Source:* `Dashboard.tsx AI_SYSTEMS[].mode; AISystemDrillDown.tsx`

#### Change-request risk tiering

A change request is High risk if priority is critical OR the change touches controls. Otherwise it is Medium if priority is high, and Low in every other case. Note the OR: a low-priority controls change is still High.

*Example:* Editing a pack's controls at "low" priority still tiers High, because changeType === "controls" short-circuits the priority check.

*Source:* `ChangeRequestModal.tsx:83 getRiskLevel()`

#### Approver chain stacks with risk

Security Lead approval is always required. Medium and High additionally require a Compliance Officer. High additionally requires the CISO. Approvers accumulate, so a High-risk change needs all three.

*Example:* A critical version bump requires Security Lead, then Compliance Officer, then CISO — three sequential approvals. A low-priority config tweak needs only the Security Lead.

*Source:* `ChangeRequestModal.tsx:89 getApprovalPath()`

#### HITL guardrail thresholds

Guardrails trip on value thresholds and route the action to a human. The shipped values are refunds over $1,000, discounts over 20%, model confidence under 65%, and bulk email over 50 recipients. Refunds also aggregate: multiple small refunds totalling over the threshold within 24h trip the same rule.

*Example:* The AI offers a $1,500 refund. Over the $1,000 threshold, so it is suspended and lands in the Approval Inbox tagged "Financial action above threshold" rather than being executed.

*Source:* `placeholder values` · `HITLGuardrails.tsx:358, :401, :435, :517`

#### HITL timeout fails closed

If no approver acts within the window, the action is denied, not allowed. The AI reports it could not complete the request. Availability is deliberately sacrificed to control — this is a governance product, and a silent auto-approve would defeat its purpose.

*Example:* The $2,400 refund sits unactioned overnight. At timeout it is rejected and logged as a timeout denial; the customer is told the refund needs manual review.

*Source:* **not implemented**

#### Compliance posture score

A weighted composite per framework: controls satisfied carries the majority of the weight, adjusted by evidence freshness and recent test pass rates. The delta shown beside each score is the change since the previous period.

*Example:* ISO 42001 shows 78% with +3%. Under the intended formula that means its satisfied-control ratio dominates, nudged by recent passing runs and non-stale evidence, and it gained 3 points since last period.

*Source:* **not implemented**

#### Test-run pass rate and banding

passRate = round(passed / total * 100). Coloured green at 90 and above, yellow from 70 to 89, red below 70. A run still in progress shows an ellipsis instead of a percentage but still fills its progress bar from partial counts.

*Example:* Weekly Comprehensive Test passed 31 of 35 = 89%, one point under the green band, so it renders yellow.

*Source:* `placeholder values` · `Dashboard.tsx:478, :498`

#### Dashboard aggregates are plain sums

Requests (7d), blocked, and open findings are summed across all AI systems with no weighting or dedup. Pending Approvals counts only items not yet resolved in the current session.

*Example:* 18,400 + 4,210 + 9,870 = 32,480 requests; 52 + 14 + 0 = 66 blocked.

*Source:* `Dashboard.tsx:253-256`

#### Break glass is an audited admin bypass

An Org Admin can temporarily suspend policy enforcement during an incident. Every invocation is written to the immutable audit log and triggers notifications. It is not a per-user escape hatch and must never be silent.

*Example:* A false-positive PII rule is blocking all support traffic at 2am. An admin breaks glass to restore service; the action, actor, and reason are logged and the governance committee is notified.

*Source:* `BreakGlassModal.tsx; AISystemDrillDown.tsx:884`

<a id="data-fields"></a>

## Key data fields

*The main entities and where each field is meant to come from.*

Intended runtime architecture: an inline proxy or gateway sits in the customer's AI request path and does the counting and blocking — that is what makes a "blocked" count possible at all — while the SDK enriches events with application-level context the proxy cannot see. Neither exists yet.

| Entity | Field | Type | Intended source |
| --- | --- | --- | --- |
| AI System | id, name, type | string | Customer-registered in AI Inventory |
| AI System | mode | 'Monitor' \| 'Enforce' \| 'HITL' \| 'Block' | Set per deployed pack |
| AI System | requestsWeek, blocked, flagged | number | Proxy/gateway telemetry, 7-day window |
| AI System | openFindings | number | Derived from test runs and policy violations |
| AI System | status | 'healthy' \| 'warning' \| 'critical' | Derived — rule not yet defined |
| Policy Pack | version | semver string | Pack registry; drives change approvals |
| Policy Pack | systems | number | Count of systems the pack is deployed to |
| Approval | risk | 'critical' \| 'high' \| 'medium' \| 'low' | Assigned by the guardrail that tripped |
| Approval | action | string | Human-readable reason the guardrail fired |
| Approval | age | string | Currently a pre-rendered string, not a timestamp |
| Test Run | passed, total, failCount | number | Test executor results |
| Test Run | hasEvidence | boolean | Whether the run produced an evidence record |
| Evidence | clauses, passRate, status | string / number / string | Generated from a test run |
| Compliance | score, delta | number | Computed per the weighted formula above |

> **Gap — Timestamps are strings**
>
> Approval `age` ships as "14 min ago" and activity `time` as "2h ago" — pre-rendered display strings, not dates. Test runs do use real ISO timestamps (`runAt`). Any real implementation needs actual timestamps everywhere so ageing, SLA timers, and the HITL timeout can be computed.

<a id="edge-cases"></a>

## Edge cases

*What the current code handles, and what it does not.*

- Handled — zero pending approvals renders an explicit "All clear" empty state.
- Handled — a test run with status "running" shows an ellipsis instead of a misleading percentage.
- Not handled — an org with zero AI systems, zero packs, or zero test runs. Those lists render empty with no guidance, and the dashboard would show 0s with no onboarding prompt.
- Not handled — division by zero in passRate if a run reports total = 0, which yields NaN%.
- Not handled — long AI system or pack names. Several flex rows rely on truncation that only some children apply.
- By design — below 768px the sidebar collapses into a sheet behind the header trigger. On a narrow viewport the nav is genuinely absent from the DOM until opened; that is the shadcn sidebar behaviour, not a bug.
- Session-only — dismissing the "Backups not configured" or "Immutable audit log" dashboard alerts does not persist. They return on reload.
- Session-only — approving or rejecting from the dashboard mutates local component state. Navigating away and back resets the queue.
- Fixture artefact — all dates are hardcoded to 2026 (test runs June 2026, pack updates May/June 2026). Nothing is computed relative to now.

<a id="integrations"></a>

## Integrations

> **Important — Nothing shown is a commitment**
>
> Every integration named in the UI is demo dressing. Do not plan around any of them, do not treat the names as a roadmap, and do not build adapters on the assumption that a contract exists. Confirmed explicitly during handover.

| Appears as | Where | Status |
| --- | --- | --- |
| PLCY Cloud (backups, immutable audit log) | Dashboard setup alerts → PLCYCloudSetup | Demo only |
| @plcy/node, @plcy/connect-react SDK | ConnectPage code samples (~line 1434, 1575) | Demo only — samples are strings, not imports |
| OpenAI | ConnectPage code sample | Demo only |
| Slack, Jira, Splunk, GitHub Actions | AISystemDrillDown.tsx:866 | Demo only |
| Zendesk, Salesforce, Slack | AIInventoryModule.tsx:79 | Demo only |

> **Note — The SDK imports are safe**
>
> The `@plcy/node` and `openai` import lines inside ConnectPage are template literal contents rendered as sample code for the user to copy. They are not module imports and the bundler never tries to resolve them.

Failure handling: there is none to document, because there are no calls to fail. When a data layer is added, the HITL timeout rule above is the one failure behaviour already decided — deny, never auto-approve.

<a id="permissions"></a>

## Permissions

> **Gap — No RBAC exists in the code**
>
> `role` appears throughout the codebase only as a display string inside fixture data — approval chains, supervisor records, committee members. Nothing reads a current user's role, and no UI is conditionally rendered or disabled based on one. Every control is visible and clickable to whoever loads the page.

Target model agreed during handover, to be built:

| Role | Can do |
| --- | --- |
| Org Admin | Configure everything: packs, controls, integrations, users. Sole holder of break glass. |
| Approver | Act on the approval queue. Cannot change policy or configuration. |
| Auditor | Read-only across evidence, reports, and audit logs. Cannot act on anything. |
| Viewer | Read-only dashboards. No evidence access, no queue access. |

> **Note — Dev Notes gating**
>
> The Dev Notes button that opened this panel is gated on `import.meta.env.DEV` alone. Vite statically replaces that with `false` in a production build, so both the button and this content are dead-code eliminated and never ship. It is deliberately not role-gated, because no role mechanism exists to gate on.

<a id="decisions"></a>

## Non-obvious decisions

- No router. App.tsx holds an `activeTab` string and switches on it in renderContent(). The cost is real and should be understood before building on it: no deep links, no browser back/forward, no shareable URLs, and no route-level code splitting. Adding a page means editing two places — the nav group array and the switch.
- Fixtures live inside components. Each page module declares its own demo constants at the top of its file rather than importing from a shared mock layer. The migration path is to replace those constants with data-layer calls per module, which can be done page by page without a big-bang rewrite.
- Light mode only. Full dark-mode tokens exist under `.dark` in globals.css and the `@theme inline` mapping is complete, but nothing ever toggles the class. Dark mode is roughly a one-component change (a theme toggle writing the class to <html>) whenever it is wanted.
- Page modules are very large — HITLGuardrails is ~108KB, PLCYDevLanding ~150KB, LogsModule ~101KB, all single files. This is the Figma export's shape. Match the surrounding style when editing rather than restructuring a module wholesale, unless splitting it is the actual task.
- The bundle is one ~1.9MB chunk (~450KB gzipped) because every page module is statically imported by App.tsx. Route-level React.lazy is the first available win if load time starts to matter.

<a id="mismatches"></a>

## Code vs. intent mismatches

*Places where the shipped UI contradicts the intended business rule.*

> **Mismatch — Dashboard quick-approve bypasses the approval flow**
>
> Approve and Reject on the dashboard resolve an item instantly — no confirmation, no justification field, no audit entry. Confirmed during handover that this is wrong: approvals must route through the full flow so a reason is captured. Those buttons should navigate to the Approval Inbox detail rather than decide in place. Dashboard.tsx:400 and :408.

> **Mismatch — Hardcoded thresholds read as product policy**
>
> The $1,000 refund limit, 20% discount cap, 65% confidence floor, and 90/70 pass-rate bands are presented in the UI as if they were configured policy, and one is even labelled "adjustable 50-90%". They are demo placeholders. Build them as configuration with no implied default rather than shipping these constants.

> **Mismatch — Compliance scores are literals, not computations**
>
> The four framework scores and their deltas are hardcoded in a COMPLIANCE array (Dashboard.tsx:193). The intended weighted formula — controls, evidence freshness, test pass rates — is not implemented anywhere.

> **Mismatch — Six components were imported but never existed**
>
> The Figma export's App.tsx imported RiskAssessmentModule, DataGovernancePage, HumanInTheLoopModule, SupervisorManagementPage, ComplianceMatrix, and TrustCenterBuilder, none of which shipped source files. All six were unused by renderContent(), so the imports were removed. If any of those names represented intended functionality, it was never built.

<a id="open-questions"></a>

## Open questions

*Explicitly undecided. Do not infer answers from the fixtures.*

- Evidence record lifecycle. Do records expire on a schedule, and does changing a pack version or its controls invalidate evidence that attested to the old version? The "Valid" badge is demo-only. Undecided.
- How is AI system `status` (healthy / warning / critical) derived? It is a literal in the fixtures with no rule behind it.
- What is the HITL timeout window? Fail-closed is decided; the duration is not.
- Exact weights in the compliance formula — the shape is agreed, the coefficients are not.
- Does the refund aggregation window (multiple small refunds within 24h) apply per customer, per AI system, or per org?
- What happens to in-flight approvals when the pack that raised them is updated or undeployed?
- Is there a tenancy model? Everything assumes a single "Demo Company" with no org switching.

---

Generated from `src/app/devNotes/content.js`. The same source backs the in-app Dev Notes panel (the floating button, visible in dev builds only), so the two can never drift.
