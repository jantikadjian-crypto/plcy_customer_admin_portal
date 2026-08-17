Below is a full “website-ready” package for the Healthcare HIPAA Compliance composite Policy Pack: what it is, who it’s for, every included primitive, and a complete control list (with actions + evidence).

Note: This pack helps operationalize controls aligned to HIPAA Privacy/Security/Breach rules, but it does not “certify compliance.” HIPAA compliance also depends on organizational processes, agreements (e.g., BAAs), and administrative/physical safeguards.

Healthcare HIPAA Compliance Pack (Composite) — Full Package

Pack ID: healthcare_hipaa_compliance
Type: Composite
Category: Health · Privacy · Security
AI usage: Optional (recommended for higher accuracy PHI & injection detection)
What it aligns to:

HIPAA Security Rule technical safeguards (access control, audit controls, integrity, authentication, transmission security).
HIPAA Privacy Rule “minimum necessary” standard (with configurable exceptions such as treatment workflows).
HIPAA Breach Notification Rule requirements for breach notification following breach of unsecured PHI.
What this pack is

A turnkey governance bundle for AI systems that may process PHI/ePHI. When enabled, it automatically deploys a set of primitive packs that:

detect and minimize PHI exposure
restrict where PHI can be sent (providers/tools)
enforce access control + tool permissions
generate audit-ready evidence (decision logs + traces)
trigger incident events for breach workflows

The HIPAA Security Rule emphasizes “reasonable and appropriate” safeguards with flexibility in implementation—this pack provides a strong default baseline you can tune to your environment and risk posture.

Who it’s for
Covered entities and business associates building:
patient support chatbots
clinical documentation automation
call center copilots
RAG assistants over clinical notes
agent workflows that touch EHR/claims systems
What it enforces at runtime

PLCY evaluates each request pre-flight (before the LLM) and post-flight (before the user sees the output) to reduce PHI leakage risk and produce audit evidence. Decisions are deterministic through OPA/Rego; AI (if enabled) only produces signals (e.g., “PHI detected”, “injection risk score”).

Included primitives (the HIPAA composite is built from these)

Enable HIPAA once → PLCY enables the following primitives automatically:

PHI Detection & Redaction (PHI profile)
Data Minimization
Purpose & Minimum Necessary Gate
Provider/Model Allowlist + Subprocessor Control
Tool Access Control & Egress Firewall
Prompt Injection Shield
Secrets Scrub
Audit Log Pack
Retention & Deletion Guard
Incident Alerting & Breach Workflow Hooks
Smart Rate Limiting
Output Validation & Grounding (monitor by default; enforce optional)
Control catalog (complete list)

Each control includes:

Action: allow/deny/transform/route/review/log/alert
Evidence: what PLCY records (OTel + structured decision logs)
1) Primitive: PHI Detection & Redaction (PHI profile)

Goal: Detect PHI/ePHI in prompts, tool inputs, and outputs; redact or block based on policy.

Controls
HIPAA-PHI-01 — PHI detection (input): Detect PHI in user prompts and tool inputs.
Action: log + optional transform:redact
Evidence: phi.detected, phi.entity_types, phi.entity_count, pack_version
HIPAA-PHI-02 — PHI detection (output): Detect PHI in model outputs and tool outputs.
Action: log + optional transform:redact or deny
Evidence: phi.detected, phi.entity_types, phi.entity_count, decision.reason_codes
HIPAA-PHI-03 — PHI redaction (prompt): Redact PHI entities from prompt before sending to non-approved destinations.
Action: transform:redact(prompt)
Evidence: redaction.applied=true, redaction.profile=phi, destination.provider
HIPAA-PHI-04 — PHI redaction (response): Redact PHI from response before returning to end user (policy-configurable).
Action: transform:redact(response)
Evidence: redaction.applied=true, response_hash, phi.summary
HIPAA-PHI-05 — “PHI cannot egress” guard: If PHI detected and destination is not PHI-approved → block or route to internal model pool.
Action: deny OR route(internal_pool)
Evidence: egress.blocked=true, route.pool, reason=HIPAA_PHI_EGRESS
HIPAA-PHI-06 — “No PHI values in logs” mode: Store only PHI counts/types (no PHI strings) in telemetry and audits.
Action: log(minimal)
Evidence: phi.entity_count only, prompt_hash, response_hash
2) Primitive: Data Minimization

Goal: Enforce “send the minimum needed,” especially when minimum necessary applies. (HIPAA minimum necessary is a core Privacy Rule concept; it is purpose-dependent.)

Controls
HIPAA-MIN-01 — Field allowlist for patient context: Only allow approved patient fields (configurable) into prompts/tools.
Action: transform:drop_fields or deny
Evidence: minimization.dropped_fields_count, purpose
HIPAA-MIN-02 — Truncation/summary mode: If long notes/records are supplied, summarize and drop raw sections before LLM egress (optional).
Action: transform:summarize_then_send
Evidence: minimization.mode=summary, input_chars_before/after
HIPAA-MIN-03 — RAG snippet minimization: Limit retrieval to top-K snippets; strip identifiers; clip to max chars.
Action: transform:minimize_rag
Evidence: rag.k, rag.snippet_chars, rag.sources_count
HIPAA-MIN-04 — Whole-record guard: When minimum necessary applies, block sending an “entire medical record” unless explicitly justified via purpose metadata.
Action: deny or transform:minimize
Evidence: min_necessary.enforced=true, purpose, reason_code
HIPAA-MIN-05 — “De-identify for external calls” mode: Before external routing, remove direct identifiers (configurable).
Action: transform:deidentify
Evidence: deidentify.applied=true, destination.provider
3) Primitive: Purpose & Minimum Necessary Gate

Goal: Make PHI handling purpose-aware and enforce minimum necessary when applicable. The HIPAA Privacy Rule explicitly states minimum necessary applies in general, and also lists cases where it does not apply (e.g., disclosures for treatment).

Controls
HIPAA-PUR-01 — Purpose tag required: For PHI workflows, require a declared purpose (e.g., treatment/payment/operations/other).
Action: deny OR require_review
Evidence: purpose_tag, decision.reason=PURPOSE_MISSING
HIPAA-PUR-02 — Minimum necessary enforcement: If purpose is in configured set where minimum necessary applies → enforce minimization/redaction constraints.
Action: transform:minimize or deny
Evidence: min_necessary.applies=true, min_necessary.rule_id
HIPAA-PUR-03 — Exception handling (configurable): Support exceptions where minimum necessary does not apply (e.g., treatment flows), with stricter audit logging still enabled.
Action: allow + log(enhanced)
Evidence: min_necessary.exception=true, purpose
HIPAA-PUR-04 — Restricted disclosures to business associates: If destination is a “business associate/subprocessor,” require “satisfactory assurances” flag (e.g., BAA on file) before PHI transmission.
Action: deny or route(internal_pool)
Evidence: subprocessor.assurance=true/false, destination.provider
HIPAA-PUR-05 — Purpose recorded in evidence: Persist purpose, policy decision path, and enforcement actions for audits.
Action: log(structured)
Evidence: purpose_tag, policy.bundle_digest, policy.rule_path
4) Primitive: Provider/Model Allowlist + Subprocessor Control

Goal: Ensure PHI is only sent to approved models/providers, and enforce “BAA/assurance required” gating where applicable.

Controls
HIPAA-SUP-01 — Provider allowlist: Only allow approved providers/models for PHI processing.
Action: deny or route(approved_pool)
Evidence: provider, model, allowlist_match
HIPAA-SUP-02 — “Assurance required” flag: Block PHI egress to any provider not flagged as having required assurances/BAA.
Action: deny
Evidence: provider.assurance=false, reason=BAA_REQUIRED
HIPAA-SUP-03 — Retention/training constraints: Block providers/endpoints flagged as training on customer data or retaining payloads (tenant policy).
Action: deny or route(private)
Evidence: provider.data_use_policy, decision.reason
HIPAA-SUP-04 — Default-to-internal routing: If PHI is present and no approved external endpoint exists → route to internal/tenant model gateway.
Action: route(internal_pool)
Evidence: route.pool=internal, phi.detected=true
HIPAA-SUP-05 — Provider selection audit: Every provider/model choice is logged for later audits and investigations.
Action: log(structured)
Evidence: provider, model, region, pack_version
5) Primitive: Tool Access Control & Egress Firewall

Goal: Prevent PHI from flowing into unsafe tools (HTTP, email, CRM exports, etc.) and restrict tool usage by role.

Controls
HIPAA-TOOL-01 — Tools off-by-default for PHI: If PHI detected, tools are disabled unless allowlisted.
Action: tools:disable_all or tools:allowlist
Evidence: tools.mode, phi.detected
HIPAA-TOOL-02 — Tool allowlist by role: Only approved roles can use PHI-adjacent tools (EHR read, claims lookup, ticketing).
Action: deny_tool
Evidence: actor.roles, tool.name, decision.reason
HIPAA-TOOL-03 — Network egress allowlist: External HTTP calls require domain allowlist; block by default.
Action: deny or require_review
Evidence: egress.domain, egress.allowed=false
HIPAA-TOOL-04 — PHI masking for tools: If allowed tool call requires PHI, redact to minimum necessary before execution.
Action: transform:redact(tool_args)
Evidence: tool.redaction.applied=true, tool.name
HIPAA-TOOL-05 — Tool audit trail: Log tool invocations (redacted), including arguments schema hash + response size.
Action: log(structured)
Evidence: tool.invoked=true, tool.schema_hash, trace_id
6) Primitive: Prompt Injection Shield

Goal: Protect system boundaries and prevent “exfiltrate PHI” or “override policy” attacks.

Controls
HIPAA-INJ-01 — Injection risk scoring: Score prompt injection risk (heuristic + optional AI).
Action: log
Evidence: injection.score, injection.attack_family
HIPAA-INJ-02 — Tool restriction on risk: If injection score above threshold, disable tools or restrict to safe allowlist.
Action: tools:disable_all or tools:allowlist
Evidence: tools.mode, injection.score
HIPAA-INJ-03 — Deny on high-risk + PHI: If high injection risk and PHI detected → deny or require review.
Action: deny or require_review
Evidence: phi.detected, injection.score, reason=INJ_AND_PHI
HIPAA-INJ-04 — System boundary enforcement: Block attempts to reveal system prompts, policies, or secrets.
Action: deny
Evidence: reason=SYSTEM_BOUNDARY, policy.rule_id
HIPAA-INJ-05 — Attack evidence: Emit security event with reason codes for SIEM correlation.
Action: alert(high)
Evidence: security_event.type=prompt_injection, trace_id
7) Primitive: Secrets Scrub

Goal: Prevent accidental leakage of API keys/tokens into prompts, outputs, logs, or tools.

Controls
HIPAA-SEC-01 — Secret detection (in/out): Detect secrets in prompts/outputs.
Action: transform:redact or deny
Evidence: secrets.detected, secrets.types, secrets.count
HIPAA-SEC-02 — Secret redaction: Redact secrets before any egress or logging.
Action: transform:redact
Evidence: redaction.profile=secrets, destination
HIPAA-SEC-03 — Block secret-in-tool: Deny tool calls containing secrets.
Action: deny
Evidence: tool.name, secrets.detected=true
HIPAA-SEC-04 — Secret leak alert: Alert when secrets appear in model output.
Action: alert(high)
Evidence: security_event.type=secret_leak, trace_id
HIPAA-SEC-05 — Evidence for investigations: Persist reason codes and counts (no raw secret strings).
Action: log(structured)
Evidence: reason_codes, secrets.summary
8) Primitive: Audit Log Pack

HIPAA’s technical safeguards include audit controls: mechanisms to record and examine activity in systems that contain or use ePHI.

Controls
HIPAA-AUD-01 — Policy decision logging: Record allow/deny/transform decisions with rule IDs and pack version.
Action: log(structured)
Evidence: decision.effect, decision.reasons[], pack_version, bundle_digest
HIPAA-AUD-02 — Access attempt logging: Log all access attempts to PHI endpoints/tools (success + deny).
Action: log(structured)
Evidence: actor.subject_id, auth.type, decision.effect
HIPAA-AUD-03 — Destination logging: Persist where PHI data attempted to go (provider/model/tool).
Action: log(structured)
Evidence: destination.provider, destination.model, tool.name
HIPAA-AUD-04 — Correlation IDs: Attach trace_id/request_id to every event for audit chain-of-custody.
Action: log
Evidence: trace_id, request_id
HIPAA-AUD-05 — Export-ready evidence: Enable export of decisions + security events for audits and investigations.
Action: log(exportable)
Evidence: export.format=otlp/json, retention.policy_id
9) Primitive: Retention & Deletion Guard

Goal: Govern how long evidence and (optionally) payloads are retained; support secure deletion and legal hold.

Controls
HIPAA-RET-01 — Evidence retention policy: Set retention rules for audit events (tenant-configurable).
Action: log(retention)
Evidence: retention.days, retention.policy_id
HIPAA-RET-02 — No raw payload retention by default: Store hashes + summaries, not raw PHI text.
Action: log(minimal)
Evidence: prompt_hash, response_hash, phi.summary
HIPAA-RET-03 — Secure deletion hooks: Support deletion workflow for stored artifacts where applicable (customer-controlled).
Action: emit(deletion_job)
Evidence: deletion.job_id, deletion.scope
HIPAA-RET-04 — Legal hold mode: On incident flag, prevent deletion and extend retention for evidence.
Action: hold(enable)
Evidence: legal_hold=true, incident_id
HIPAA-RET-05 — Retention change audit: Log every retention configuration change (who/when/what).
Action: log(structured)
Evidence: config.change_event, actor.admin_id
10) Primitive: Incident Alerting & Breach Workflow Hooks

HIPAA breach notification rules require notification after breach of unsecured PHI, and define notification timing and content elements; business associates must notify covered entities following discovery.

Controls
HIPAA-INC-01 — Suspected PHI disclosure event: If PHI is detected in an unauthorized disclosure path, emit incident event.
Action: alert(high) + log(structured)
Evidence: incident.type=phi_disclosure, destination, trace_id
HIPAA-INC-02 — Breach risk assessment fields: Capture the minimum evidence inputs needed for a breach assessment (types of identifiers, unauthorized recipient, whether acquired/viewed, mitigation).
Action: log(structured)
Evidence: breach.assessment.factors[]
HIPAA-INC-03 — Timeliness timestamps: Record discovered_at and reported_at timestamps to support “without unreasonable delay” workflows (customer process).
Action: log
Evidence: incident.discovered_at, incident.updated_at
HIPAA-INC-04 — “Safe mode” escalation: When incident severity is high, tighten policies (disable tools, deny external egress, enforce strict redaction).
Action: policy_mode=strict
Evidence: safe_mode=true, policy.thresholds
HIPAA-INC-05 — Notification bundle export: Generate an evidence bundle aligned to breach notice content needs (what happened, PHI types, mitigation steps, contact info pointers).
Action: export(incident_bundle)
Evidence: bundle.id, bundle.contents_manifest
11) Primitive: Smart Rate Limiting

Goal: Reduce risk from abuse, automated exfil attempts, and DoS behavior (helps maintain availability and security posture).

Controls
HIPAA-RATE-01 — Token-aware rate limiting: Cap tokens per user/app to prevent runaway usage.
Action: limit
Evidence: limit.tokens, limit.scope
HIPAA-RATE-02 — Burst protection: Throttle bursts indicative of scraping/exfil.
Action: limit or deny
Evidence: rate.burst_detected=true
HIPAA-RATE-03 — Tool call quotas: Separate quotas for tool calls (EHR lookups, exports, webhooks).
Action: limit
Evidence: tool.rate_limit, tool.name
HIPAA-RATE-04 — Suspicious pattern throttling: Block repeated “dump all patient records” style access patterns (detector-driven).
Action: deny or require_review
Evidence: abuse.signal, decision.reason
HIPAA-RATE-05 — Rate-limit audit: Log throttling decisions for investigations.
Action: log(structured)
Evidence: rate.limit_event, trace_id
12) Primitive: Output Validation & Grounding (monitor by default)

Goal: Reduce harmful/unreliable outputs in clinical contexts and improve integrity of generated content.

Controls
HIPAA-OUT-01 — Output PHI leak check: Post-flight scan of responses for PHI before returning to end user.
Action: transform:redact or deny
Evidence: phi.detected, redaction.applied
HIPAA-OUT-02 — Structured output schema validation: For configured workflows (summaries, discharge instructions), enforce schema rules.
Action: deny or transform:fix_format
Evidence: schema.valid=true/false, schema.name
HIPAA-OUT-03 — Grounding/citation mode (optional): Require references to approved sources (RAG provenance) for factual claims in configured workflows.
Action: require_review or transform:add_provenance
Evidence: grounding.sources_count, grounding.required=true
HIPAA-OUT-04 — High-risk content escalation: If model outputs include risky clinical directives in unsupported contexts, require review.
Action: require_review
Evidence: risk.category=clinical_high_risk, review.queue
HIPAA-OUT-05 — Output integrity evidence: Record decision trace for why a response was allowed/redacted/blocked.
Action: log(structured)
Evidence: decision.reasons[], policy.rule_ids[]
HIPAA alignment (how this maps to the regulation)

This pack operationalizes parts of:

HIPAA Security Rule — Technical safeguards (45 CFR 164.312)
Access control → Provider/model allowlists + tool controls + purpose gating
Audit controls → Audit Log Pack records and examines activity involving ePHI
Integrity → Output validation, injection defenses, hashing evidence
Person/entity authentication → Require authenticated identity/roles for PHI endpoints
Transmission security → Egress firewall, encryption/TLS enforcement flags, approved destination routing
HIPAA Privacy Rule — Minimum necessary (45 CFR 164.502(b))
Purpose gate + minimization controls enforce “reasonable efforts” to limit PHI to the minimum necessary, with configurable exceptions like treatment flows.
HIPAA Breach Notification Rule (45 CFR 164.400–414)
Incident hooks capture breach evidence factors and support notification workflows, including business associate notification obligations.
What you configure (recommended defaults)

To make this pack “turnkey,” you typically set:

Approved destinations
internal model gateway (default for PHI)
external providers/models that are PHI-approved (and flagged for required assurances/BAA where applicable)
Purpose taxonomy
allowed purposes: treatment, payment, operations, support, other
which purposes trigger minimum necessary enforcement
Redaction profile
PHI entity types: names, MRNs, DOB, diagnoses, addresses, phone/email, etc.
strict vs balanced redaction modes
Evidence settings
retention days for audit events
whether to store raw payloads (recommended: no, store hashes only)
Incident destinations
SIEM (OTel/OTLP)
incident queues (Jira/PagerDuty/Slack) via your integration