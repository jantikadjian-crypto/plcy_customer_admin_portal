# Healthcare HIPAA Compliance Pack - Full Specification

## Pack Overview

**Pack ID:** `pack-healthcare-hipaa`  
**Type:** Composite  
**Version:** 3.0.0  
**Category:** Industry Pack · Health · Privacy · Security  
**AI Usage:** Optional (recommended for higher accuracy PHI & injection detection)

## What This Pack Aligns To

- **HIPAA Security Rule** technical safeguards (access control, audit controls, integrity, authentication, transmission security)
- **HIPAA Privacy Rule** "minimum necessary" standard (with configurable exceptions such as treatment workflows)
- **HIPAA Breach Notification Rule** requirements for breach notification following breach of unsecured PHI

## What This Pack Is

A turnkey governance bundle for AI systems that may process PHI/ePHI. When enabled, it automatically deploys a set of primitive packs that:

- ✅ Detect and minimize PHI exposure
- ✅ Restrict where PHI can be sent (providers/tools)
- ✅ Enforce access control + tool permissions
- ✅ Generate audit-ready evidence (decision logs + traces)
- ✅ Trigger incident events for breach workflows

The HIPAA Security Rule emphasizes "reasonable and appropriate" safeguards with flexibility in implementation—this pack provides a strong default baseline you can tune to your environment and risk posture.

## Who It's For

**Covered entities and business associates building:**
- Patient support chatbots
- Clinical documentation automation
- Call center copilots
- RAG assistants over clinical notes
- Agent workflows that touch EHR/claims systems

## What It Enforces at Runtime

PLCY evaluates each request pre-flight (before the LLM) and post-flight (before the user sees the output) to reduce PHI leakage risk and produce audit evidence. Decisions are deterministic through OPA/Rego; AI (if enabled) only produces signals (e.g., "PHI detected", "injection risk score").

---

## Included Primitives (12 Total, 60 Controls)

Enable HIPAA once → PLCY enables the following primitives automatically:

1. PHI Detection & Redaction (PHI profile)
2. Data Minimization
3. Purpose & Minimum Necessary Gate
4. Provider/Model Allowlist + Subprocessor Control
5. Tool Access Control & Egress Firewall
6. Prompt Injection Shield
7. Secrets Scrub
8. Audit Log Pack
9. Retention & Deletion Guard
10. Incident Alerting & Breach Workflow Hooks
11. Smart Rate Limiting
12. Output Validation & Grounding (monitor by default; enforce optional)

---

## Control Catalog (Complete List)

### 1. PHI Detection & Redaction (PHI profile)

**Goal:** Detect PHI/ePHI in prompts, tool inputs, and outputs; redact or block based on policy.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-PHI-01** | PHI Detection (Input) | Validation | ✅ Yes | log + optional transform:redact | phi.detected, phi.entity_types, phi.entity_count, pack_version |
| **HIPAA-PHI-02** | PHI Detection (Output) | Validation | ✅ Yes | log + optional transform:redact or deny | phi.detected, phi.entity_types, phi.entity_count, decision.reason_codes |
| **HIPAA-PHI-03** | PHI Redaction (Prompt) | Transformation | ✅ Yes | transform:redact(prompt) | redaction.applied=true, redaction.profile=phi, destination.provider |
| **HIPAA-PHI-04** | PHI Redaction (Response) | Transformation | ☐ No | transform:redact(response) | redaction.applied=true, response_hash, phi.summary |
| **HIPAA-PHI-05** | PHI Cannot Egress Guard | Validation | ✅ Yes | deny OR route(internal_pool) | egress.blocked=true, route.pool, reason=HIPAA_PHI_EGRESS |
| **HIPAA-PHI-06** | No PHI Values in Logs Mode | Audit | ✅ Yes | log(minimal) | phi.entity_count only, prompt_hash, response_hash |

---

### 2. Data Minimization

**Goal:** Enforce "send the minimum needed," especially when minimum necessary applies. (HIPAA minimum necessary is a core Privacy Rule concept; it is purpose-dependent.)

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-MIN-01** | Field Allowlist for Patient Context | Transformation | ☐ No | transform:drop_fields or deny | minimization.dropped_fields_count, purpose |
| **HIPAA-MIN-02** | Truncation/Summary Mode | Transformation | ☐ No | transform:summarize_then_send | minimization.mode=summary, input_chars_before/after |
| **HIPAA-MIN-03** | RAG Snippet Minimization | Transformation | ☐ No | transform:minimize_rag | rag.k, rag.snippet_chars, rag.sources_count |
| **HIPAA-MIN-04** | Whole-Record Guard | Validation | ✅ Yes | deny or transform:minimize | min_necessary.enforced=true, purpose, reason_code |
| **HIPAA-MIN-05** | De-identify for External Calls | Transformation | ☐ No | transform:deidentify | deidentify.applied=true, destination.provider |

---

### 3. Purpose & Minimum Necessary Gate

**Goal:** Make PHI handling purpose-aware and enforce minimum necessary when applicable. The HIPAA Privacy Rule explicitly states minimum necessary applies in general, and also lists cases where it does not apply (e.g., disclosures for treatment).

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-PUR-01** | Purpose Tag Required | Validation | ✅ Yes | deny OR require_review | purpose_tag, decision.reason=PURPOSE_MISSING |
| **HIPAA-PUR-02** | Minimum Necessary Enforcement | Transformation | ✅ Yes | transform:minimize or deny | min_necessary.applies=true, min_necessary.rule_id |
| **HIPAA-PUR-03** | Minimum Necessary Exception Handling | Audit | ☐ No | allow + log(enhanced) | min_necessary.exception=true, purpose |
| **HIPAA-PUR-04** | Restricted Disclosures to Business Associates | Validation | ✅ Yes | deny or route(internal_pool) | subprocessor.assurance=true/false, destination.provider |
| **HIPAA-PUR-05** | Purpose Recorded in Evidence | Audit | ✅ Yes | log(structured) | purpose_tag, policy.bundle_digest, policy.rule_path |

---

### 4. Provider/Model Allowlist + Subprocessor Control

**Goal:** Ensure PHI is only sent to approved models/providers, and enforce "BAA/assurance required" gating where applicable.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-SUP-01** | Provider Allowlist | Validation | ✅ Yes | deny or route(approved_pool) | provider, model, allowlist_match |
| **HIPAA-SUP-02** | Assurance Required Flag (BAA) | Validation | ✅ Yes | deny | provider.assurance=false, reason=BAA_REQUIRED |
| **HIPAA-SUP-03** | Retention/Training Constraints | Validation | ✅ Yes | deny or route(private) | provider.data_use_policy, decision.reason |
| **HIPAA-SUP-04** | Default-to-Internal Routing | Routing | ✅ Yes | route(internal_pool) | route.pool=internal, phi.detected=true |
| **HIPAA-SUP-05** | Provider Selection Audit | Audit | ✅ Yes | log(structured) | provider, model, region, pack_version |

---

### 5. Tool Access Control & Egress Firewall

**Goal:** Prevent PHI from flowing into unsafe tools (HTTP, email, CRM exports, etc.) and restrict tool usage by role.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-TOOL-01** | Tools Off-by-Default for PHI | Validation | ✅ Yes | tools:disable_all or tools:allowlist | tools.mode, phi.detected |
| **HIPAA-TOOL-02** | Tool Allowlist by Role | Validation | ✅ Yes | deny_tool | actor.roles, tool.name, decision.reason |
| **HIPAA-TOOL-03** | Network Egress Allowlist | Validation | ✅ Yes | deny or require_review | egress.domain, egress.allowed=false |
| **HIPAA-TOOL-04** | PHI Masking for Tools | Transformation | ✅ Yes | transform:redact(tool_args) | tool.redaction.applied=true, tool.name |
| **HIPAA-TOOL-05** | Tool Audit Trail | Audit | ✅ Yes | log(structured) | tool.invoked=true, tool.schema_hash, trace_id |

---

### 6. Prompt Injection Shield

**Goal:** Protect system boundaries and prevent "exfiltrate PHI" or "override policy" attacks.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-INJ-01** | Injection Risk Scoring | Validation | ✅ Yes | log | injection.score, injection.attack_family |
| **HIPAA-INJ-02** | Tool Restriction on Risk | Validation | ✅ Yes | tools:disable_all or tools:allowlist | tools.mode, injection.score |
| **HIPAA-INJ-03** | Deny on High-Risk + PHI | Validation | ✅ Yes | deny or require_review | phi.detected, injection.score, reason=INJ_AND_PHI |
| **HIPAA-INJ-04** | System Boundary Enforcement | Validation | ✅ Yes | deny | reason=SYSTEM_BOUNDARY, policy.rule_id |
| **HIPAA-INJ-05** | Attack Evidence | Audit | ✅ Yes | alert(high) | security_event.type=prompt_injection, trace_id |

---

### 7. Secrets Scrub

**Goal:** Prevent accidental leakage of API keys/tokens into prompts, outputs, logs, or tools.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-SEC-01** | Secret Detection (In/Out) | Validation | ✅ Yes | transform:redact or deny | secrets.detected, secrets.types, secrets.count |
| **HIPAA-SEC-02** | Secret Redaction | Transformation | ✅ Yes | transform:redact | redaction.profile=secrets, destination |
| **HIPAA-SEC-03** | Block Secret-in-Tool | Validation | ✅ Yes | deny | tool.name, secrets.detected=true |
| **HIPAA-SEC-04** | Secret Leak Alert | Audit | ✅ Yes | alert(high) | security_event.type=secret_leak, trace_id |
| **HIPAA-SEC-05** | Secret Evidence for Investigations | Audit | ✅ Yes | log(structured) | reason_codes, secrets.summary |

---

### 8. Audit Log Pack

**Goal:** HIPAA's technical safeguards include audit controls: mechanisms to record and examine activity in systems that contain or use ePHI.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-AUD-01** | Policy Decision Logging | Audit | ✅ Yes | log(structured) | decision.effect, decision.reasons[], pack_version, bundle_digest |
| **HIPAA-AUD-02** | Access Attempt Logging | Audit | ✅ Yes | log(structured) | actor.subject_id, auth.type, decision.effect |
| **HIPAA-AUD-03** | Destination Logging | Audit | ✅ Yes | log(structured) | destination.provider, destination.model, tool.name |
| **HIPAA-AUD-04** | Correlation IDs | Audit | ✅ Yes | log | trace_id, request_id |
| **HIPAA-AUD-05** | Export-Ready Evidence | Audit | ✅ Yes | log(exportable) | export.format=otlp/json, retention.policy_id |

---

### 9. Retention & Deletion Guard

**Goal:** Govern how long evidence and (optionally) payloads are retained; support secure deletion and legal hold.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-RET-01** | Evidence Retention Policy | Audit | ✅ Yes | log(retention) | retention.days, retention.policy_id |
| **HIPAA-RET-02** | No Raw Payload Retention by Default | Audit | ✅ Yes | log(minimal) | prompt_hash, response_hash, phi.summary |
| **HIPAA-RET-03** | Secure Deletion Hooks | Custom Control | ☐ No | emit(deletion_job) | deletion.job_id, deletion.scope |
| **HIPAA-RET-04** | Legal Hold Mode | Custom Control | ☐ No | hold(enable) | legal_hold=true, incident_id |
| **HIPAA-RET-05** | Retention Change Audit | Audit | ✅ Yes | log(structured) | config.change_event, actor.admin_id |

---

### 10. Incident Alerting & Breach Workflow Hooks

**Goal:** HIPAA breach notification rules require notification after breach of unsecured PHI, and define notification timing and content elements; business associates must notify covered entities following discovery.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-INC-01** | Suspected PHI Disclosure Event | Audit | ✅ Yes | alert(high) + log(structured) | incident.type=phi_disclosure, destination, trace_id |
| **HIPAA-INC-02** | Breach Risk Assessment Fields | Audit | ✅ Yes | log(structured) | breach.assessment.factors[] |
| **HIPAA-INC-03** | Timeliness Timestamps | Audit | ✅ Yes | log | incident.discovered_at, incident.updated_at |
| **HIPAA-INC-04** | Safe Mode Escalation | Custom Control | ☐ No | policy_mode=strict | safe_mode=true, policy.thresholds |
| **HIPAA-INC-05** | Notification Bundle Export | Custom Control | ☐ No | export(incident_bundle) | bundle.id, bundle.contents_manifest |

---

### 11. Smart Rate Limiting

**Goal:** Reduce risk from abuse, automated exfil attempts, and DoS behavior (helps maintain availability and security posture).

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-RATE-01** | Token-Aware Rate Limiting | Rate Limit | ☐ No | limit | limit.tokens, limit.scope |
| **HIPAA-RATE-02** | Burst Protection | Rate Limit | ✅ Yes | limit or deny | rate.burst_detected=true |
| **HIPAA-RATE-03** | Tool Call Quotas | Rate Limit | ☐ No | limit | tool.rate_limit, tool.name |
| **HIPAA-RATE-04** | Suspicious Pattern Throttling | Validation | ✅ Yes | deny or require_review | abuse.signal, decision.reason |
| **HIPAA-RATE-05** | Rate-Limit Audit | Audit | ✅ Yes | log(structured) | rate.limit_event, trace_id |

---

### 12. Output Validation & Grounding

**Goal:** Reduce harmful/unreliable outputs in clinical contexts and improve integrity of generated content.

| Control ID | Name | Type | Required | Action | Evidence |
|------------|------|------|----------|--------|----------|
| **HIPAA-OUT-01** | Output PHI Leak Check | Validation | ✅ Yes | transform:redact or deny | phi.detected, redaction.applied |
| **HIPAA-OUT-02** | Structured Output Schema Validation | Validation | ☐ No | deny or transform:fix_format | schema.valid=true/false, schema.name |
| **HIPAA-OUT-03** | Grounding/Citation Mode | Custom Control | ☐ No | require_review or transform:add_provenance | grounding.sources_count, grounding.required=true |
| **HIPAA-OUT-04** | High-Risk Content Escalation | Custom Control | ☐ No | require_review | risk.category=clinical_high_risk, review.queue |
| **HIPAA-OUT-05** | Output Integrity Evidence | Audit | ✅ Yes | log(structured) | decision.reasons[], policy.rule_ids[] |

---

## HIPAA Alignment (Regulatory Mapping)

This pack operationalizes parts of:

### HIPAA Security Rule — Technical Safeguards (45 CFR 164.312)

- **Access control** → Provider/model allowlists + tool controls + purpose gating
- **Audit controls** → Audit Log Pack records and examines activity involving ePHI
- **Integrity** → Output validation, injection defenses, hashing evidence
- **Person/entity authentication** → Require authenticated identity/roles for PHI endpoints
- **Transmission security** → Egress firewall, encryption/TLS enforcement flags, approved destination routing

### HIPAA Privacy Rule — Minimum Necessary (45 CFR 164.502(b))

Purpose gate + minimization controls enforce "reasonable efforts" to limit PHI to the minimum necessary, with configurable exceptions like treatment flows.

### HIPAA Breach Notification Rule (45 CFR 164.400–414)

Incident hooks capture breach evidence factors and support notification workflows, including business associate notification obligations.

---

## Configuration Guide

### Recommended Settings

To make this pack "turnkey," you typically set:

#### 1. Approved Destinations
- Internal model gateway (default for PHI)
- External providers/models that are PHI-approved (and flagged for required assurances/BAA where applicable)

#### 2. Purpose Taxonomy
- Allowed purposes: treatment, payment, operations, support, other
- Which purposes trigger minimum necessary enforcement

#### 3. Redaction Profile
- PHI entity types: names, MRNs, DOB, diagnoses, addresses, phone/email, etc.
- Strict vs balanced redaction modes

#### 4. Evidence Settings
- Retention days for audit events
- Whether to store raw payloads (recommended: no, store hashes only)

#### 5. Incident Destinations
- SIEM (OTel/OTLP)
- Incident queues (Jira/PagerDuty/Slack) via your integration

---

## Summary

**Total Controls:** 60 (12 primitives × 5 controls each)  
**Required Controls:** 47  
**Optional Controls:** 13  

**Control Type Breakdown:**
- Validation: 25 controls
- Audit: 20 controls
- Transformation: 10 controls
- Rate Limit: 5 controls
- Routing: 1 control
- Custom Control: 7 controls

**Status:** ✅ Fully specified and ready for deployment

**Note:** This pack helps operationalize controls aligned to HIPAA Privacy/Security/Breach rules, but it does not "certify compliance." HIPAA compliance also depends on organizational processes, agreements (e.g., BAAs), and administrative/physical safeguards.
