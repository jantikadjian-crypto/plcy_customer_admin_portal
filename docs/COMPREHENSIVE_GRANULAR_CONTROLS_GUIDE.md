# 🎛️ Comprehensive Granular Controls Guide

## Executive Summary

PLCY's Policy Pack Granular Controls provide enterprise customers with unprecedented flexibility in configuring, deploying, and managing AI governance policies. This guide covers all available customization capabilities across **Phase 1** and **Advanced Features**.

---

## Table of Contents

1. [Overview](#overview)
2. [Phase 1: Core Granular Controls](#phase-1-core-granular-controls)
3. [Advanced Features](#advanced-features)
4. [Complete Feature Matrix](#complete-feature-matrix)
5. [User Workflows](#user-workflows)
6. [Audit Logging Reference](#audit-logging-reference)
7. [Compliance Mapping](#compliance-mapping)
8. [Best Practices](#best-practices)
9. [Real-World Examples](#real-world-examples)

---

## Overview

### What Are Granular Controls?

Granular controls allow customers to customize policy packs at multiple levels:

- **Pack Level** - Global settings affecting entire policy pack
- **Control Level** - Individual control configuration
- **Temporal Level** - Time-based activation schedules
- **Scope Level** - Endpoint, user group, environment targeting
- **Exemption Level** - User and IP-based exceptions
- **Response Level** - Custom error messages

### Why Granular Controls Matter

✅ **Flexibility** - Deploy policies your way, not one-size-fits-all  
✅ **Safety** - Test changes safely with Monitor mode before enforcing  
✅ **Efficiency** - Route alerts to right teams via right channels  
✅ **Compliance** - Complete audit trail for every change  
✅ **Recovery** - One-click rollback for bad configurations  
✅ **Transparency** - Real-time notifications for administrators  

---

## Phase 1: Core Granular Controls

### 1. Per-Control Enforcement Modes 🛡️

**4 enforcement modes per control:**

| Mode | Icon | Behavior | Use Case |
|------|------|----------|----------|
| **Enforce** | 🛡️ | Block violations | Production security |
| **Warn** | ⚠️ | Flag but allow | Gradual rollout |
| **Monitor** | 👁️ | Log only (dry-run) | Testing thresholds |
| **Audit** | 📝 | Silent logging | Minimal impact |

**Configuration:** Controls Tab → Expand control → Enforcement Mode dropdown

**Example:**
```
Week 1: Deploy with "Monitor" mode
  → Gather baseline, zero user impact

Week 2: Switch to "Warn" mode  
  → Alert on violations, requests proceed

Week 3: Switch to "Enforce" mode
  → Block violations, full protection
```

---

### 2. Per-Control Alert Routing 📢

**3 alert channels per control:**

| Channel | Icon | Purpose | Example |
|---------|------|---------|---------|
| **Slack** | 💬 | Real-time team alerts | #security-alerts, #compliance-team |
| **Email** | 📧 | Detailed notifications | security-team@, dpo@ |
| **PagerDuty** | 📟 | High-severity incidents | On-call rotation |

**Configuration:** Controls Tab → Expand control → Alert Routing checkboxes

**Example:**
```
SSN Detection:
  ✓ Slack: #security-alerts
  ✓ Email: security-team@company.com
  ✓ PagerDuty: High severity

Credit Card Masking:
  ✓ Slack: #compliance-team
  ✓ Email: dpo@company.com
  ✗ PagerDuty: Not urgent
```

---

### 3. Configuration Version Control & Rollback 🕐

**Complete change history with rollback:**

- 📋 Every change tracked (deployment, control update, enforcement change)
- 👤 User attribution (who changed what)
- 📝 Justification field (why changed)
- 📊 Impact level (low/medium/high)
- 🔙 One-click rollback
- ♾️ Unlimited rollback depth

**Configuration:** Deployed Packs → History button → Version timeline

**Example Version History:**
```
v5 (Current) - 2025-01-15 10:45 - Admin User
  Type: Advanced Features Configuration
  Changes:
    • Time-based scheduling: Always → Business Hours
    • Scope targeting: All endpoints → /api/chat/*
    • Exemptions added: 2 users, 2 IP ranges
    • Custom message configured
  [Rollback unavailable - current version]

v4 - 2025-01-14 16:30 - Admin User
  Type: Enforcement Change
  Changes:
    • SSN Detection: enforce → monitor
  [Rollback] [View Details]

v3 - 2025-01-14 14:15 - Sarah Chen
  Type: Alert Routing
  Changes:
    • Credit Card Masking: Added PagerDuty
  [Rollback] [View Details]
```

---

### 4. Real-time Admin Notifications 🔔

**Notification center in header:**

- 🔔 Bell icon with unread count badge
- 📬 Real-time alerts for all changes
- 📋 Full change details
- ⚡ Quick actions (View History, Rollback)
- ✅ Read/unread tracking
- ❌ Individual or bulk dismiss

**Configuration:** Top header → Bell icon → Notification panel

**Example Notification:**
```
🟡 Warning: Enforcement Mode Changed

SSN Pattern Detection switched from "Enforce" to "Monitor" mode

Pack: PII Detection & Redaction
Control: SSN Pattern Detection
Changed By: admin@company.com
Time: 2025-01-14 16:30:00

Changes:
  • enforcementMode: enforce → monitor

Impact: SSN violations will be logged but NOT blocked

[View Details] [View History]
```

---

## Advanced Features

### 1. Time-Based Scheduling ⏰

**Apply different enforcement during business hours vs. after hours**

**Available Schedules:**

| Schedule | When Active | Use Case |
|----------|-------------|----------|
| **Always Active (24/7)** | All the time | Security-critical controls |
| **Business Hours Only** | Mon-Fri 9am-5pm | Stricter work-hour enforcement |
| **After Hours Only** | 5pm-9am + weekends | Off-peak protection |
| **Custom Schedule** | User-defined | Specific time windows |

**Configuration:** Controls Tab → Expand control → Time-Based Scheduling dropdown

**Example:**
```
PII Detection:
  Schedule: Business Hours Only
  Reason: Stricter enforcement when employees handle customer data

Rate Limiting:
  Schedule: After Hours Only
  Reason: Protect against automated attacks during off-peak hours
```

---

### 2. Scope/Targeting 🎯

**Apply controls selectively to endpoints, users, or environments**

**Targeting Dimensions:**

**A. Endpoint Patterns**
- Glob pattern matching
- Examples: `/api/chat/*`, `/api/support/*`, `/api/*/sensitive`
- Default: All endpoints

**B. User Groups**
- All Users (default)
- External Users Only
- Internal Users Only
- Contractors Only
- Administrators Only

**C. Environments**
- ✅ Production (default: on)
- ✅ Staging (default: on)
- ☐ Dev (default: off)

**Configuration:** Controls Tab → Expand control → Scope/Targeting section

**Example:**
```
SSN Detection:
  Endpoints: /api/chat/*, /api/support/*
  User Groups: External Users Only
  Environments: Production ✓, Staging ✓, Dev ✗
  
  Result: Only scan customer-facing chat/support 
          in production and staging environments
```

---

### 3. Custom Allowlists/Exemptions 🔓

**Define exceptions for trusted users, systems, or IP ranges**

**Exemption Types:**

**A. Exempt Users (Email-based)**
- Comma-separated email addresses
- Examples: `admin@company.com`, `monitoring-bot@company.com`

**B. Exempt IP Ranges (CIDR notation)**
- Comma-separated IP ranges
- Examples: `10.0.0.0/24`, `192.168.1.0/24`

**C. Exemption Expiry Date**
- Optional expiration date
- Auto-revoke after date
- Use case: Temporary contractor access

**Configuration:** Controls Tab → Expand control → Custom Allowlists/Exemptions section

⚠️ **WARNING:** Exemptions bypass security controls! Always set expiry dates when possible.

**Example:**
```
PII Detection:
  Exempt Users: monitoring-bot@company.com, health-check@company.com
  Exempt IPs: 10.0.0.0/24 (Internal network)
  Expiry: None (permanent)
  Reason: Allow health checks without PII blocking

SSN Masking:
  Exempt Users: compliance-team@company.com
  Exempt IPs: None
  Expiry: 2025-03-31
  Reason: Temporary access for Q1 compliance audit
```

---

### 4. Response Customization 💬

**Provide user-friendly, brand-appropriate error messages**

Instead of:
```
Error: Request blocked by security policy
```

Configure:
```
For your privacy, we cannot process this request.
Please remove sensitive information and try again.
```

**Configuration:** Controls Tab → Expand control → Response Customization section

**Best Practices:**
1. **Be Specific** - Explain what was blocked and why
2. **Be Actionable** - Tell users how to fix the issue
3. **Be Brand-Appropriate** - Match your company's tone
4. **Avoid Jargon** - Use plain language
5. **Provide Alternatives** - Offer legitimate paths forward

**Examples:**
```
PII Detection Block:
  "For your privacy, we cannot process requests containing 
   personally identifiable information. Please remove 
   sensitive data and try again."

Prompt Injection Block:
  "Your request appears to contain malicious input. 
   Please rephrase your question and resubmit."

Rate Limit Block:
  "You've reached the request limit. Please wait 60 seconds 
   before trying again. For higher limits, contact 
   sales@company.com"
```

---

## Complete Feature Matrix

### Control Configuration Options

| Category | Feature | Options | Where |
|----------|---------|---------|-------|
| **Base** | Enable/Disable | Toggle on/off | Controls Tab |
| **Base** | Control Parameters | Threshold, mode, action | Controls Tab → Expand |
| **Phase 1** | Enforcement Mode | Enforce/Warn/Monitor/Audit | Controls Tab → Expand |
| **Phase 1** | Alert Routing | Slack/Email/PagerDuty | Controls Tab → Expand |
| **Phase 1** | Version Control | Full history + rollback | Deployed Packs → History |
| **Phase 1** | Notifications | Real-time alerts | Header → Bell icon |
| **Advanced** | Time Scheduling | Always/Business/AfterHours/Custom | Controls Tab → Expand |
| **Advanced** | Scope Targeting | Endpoints/Users/Environments | Controls Tab → Expand |
| **Advanced** | Exemptions | Users/IPs/Expiry | Controls Tab → Expand |
| **Advanced** | Custom Messages | Brand-appropriate errors | Controls Tab → Expand |
| **Pack** | Log Retention | 7 days → 2 years | Settings Tab |
| **Pack** | Enforcement Level | Monitor/Standard/Strict | Settings Tab |

---

## User Workflows

### Complete Deployment Workflow

```
1. Browse Pack Library → Click pack card

2. Overview Tab
   └─ Read description, understand controls

3. Controls Tab
   ├─ Toggle controls on/off
   ├─ Expand control (▼)
   │
   ├─ BASE: Configure parameters
   │  └─ Threshold, mode, action
   │
   ├─ PHASE 1: Set enforcement mode
   │  └─ Enforce / Warn / Monitor / Audit
   │
   ├─ PHASE 1: Configure alert routing
   │  └─ Slack / Email / PagerDuty
   │
   ├─ ADVANCED: Set schedule
   │  └─ Always / Business Hours / After Hours / Custom
   │
   ├─ ADVANCED: Set scope
   │  ├─ Endpoint patterns
   │  ├─ User groups
   │  └─ Environments
   │
   ├─ ADVANCED: Set exemptions
   │  ├─ Exempt users
   │  ├─ Exempt IPs
   │  └─ Expiry date
   │
   └─ ADVANCED: Customize response
      └─ Custom block message

4. Settings Tab
   ├─ Set log retention (7 days → 2 years)
   └─ Configure pack settings

5. Deploy Pack
   └─ All settings logged in audit trail
   └─ Version #1 created
   └─ Admin notifications sent

6. Post-Deployment
   ├─ Bell icon shows notification
   ├─ Click "History" to view version
   └─ Monitor audit logs in Reports & Logs
```

---

## Audit Logging Reference

### 11 Event Types (OTEL-Compliant)

**Phase 1 Events:**
1. `policy_pack_deployed` - Pack deployment with full config
2. `log_retention_configured` - Log retention changes
3. `control_configured` - Individual control settings
4. `enforcement_mode_changed` - Enforcement mode updates
5. `alert_routing_configured` - Alert channel configuration
6. `config_rollback` - Configuration rollback events
7. `admin_notification_sent` - Notification delivery

**Advanced Feature Events:**
8. `time_based_scheduling_configured` - Schedule changes
9. `scope_targeting_configured` - Scope/targeting changes
10. `exemptions_configured` ⚠️ - Exemptions (severity: warning)
11. `custom_message_configured` - Custom message changes

### Event Schema (OTEL Standard)

```json
{
  "@timestamp": "ISO 8601 with microseconds",
  "event.kind": "event",
  "event.category": ["configuration"],
  "event.type": ["change"],
  "event.action": "...",
  "event.outcome": "success|warning|error",
  "event.severity": "info|warn|critical",
  "user.id": "...",
  "user.email": "...",
  "source.ip": "...",
  "plcy.pack.*": "...",
  "plcy.control.*": "...",
  "plcy.config.*": "...",
  "message": "Human-readable description",
  "tags": ["searchable", "tags"]
}
```

### Viewing Audit Logs

- **Reports & Logs → Raw Logs (Audit)** - All events with full JSON
- **Prove → Governance Audit** - Governance-specific events
- **Deployed Packs → History** - Version control timeline

---

## Compliance Mapping

### SOC2 Trust Services Criteria

| Control | Phase 1 | Advanced |
|---------|---------|----------|
| **CC6.1** - Logical access controls | ✅ Enforcement modes, user attribution | ✅ User group targeting, exemptions |
| **CC6.6** - Access control changes | ✅ Complete audit trail | ✅ Scope targeting logs |
| **CC6.7** - Access restrictions | - | ✅ Exemptions with expiry |
| **CC7.2** - System monitoring | ✅ Real-time notifications | ✅ Time-based enforcement |
| **CC7.3** - Event evaluation | ✅ Alert routing | ✅ Custom messages |

### ISO 27001 Controls

| Control | Phase 1 | Advanced |
|---------|---------|----------|
| **A.9.2** - User access management | ✅ Granular control config | ✅ User group filtering |
| **A.9.4.2** - Access restrictions | - | ✅ Scope targeting documentation |
| **A.12.4.1** - Event logging | ✅ Comprehensive audit logs | ✅ 11 event types |
| **A.12.4.2** - Log protection | ✅ Immutable logging | ✅ Audit trail integrity |
| **A.16.1.5** - Incident response | ✅ Rollback capability | ✅ Emergency exemptions |

### HIPAA Requirements

| Requirement | Phase 1 | Advanced |
|-------------|---------|----------|
| **§164.308(a)(1)(ii)(D)** - System activity review | ✅ Audit logs | ✅ Comprehensive logging |
| **§164.308(a)(5)(ii)(C)** - Log-in monitoring | ✅ User attribution | ✅ User-level exemptions |
| **§164.312(a)(1)** - Unique user ID | - | ✅ User tracking in exemptions |
| **§164.312(b)** - Audit controls | ✅ Complete audit trail | ✅ 11 event types |

### NIST SP 800-53 Controls

| Control | Phase 1 | Advanced |
|---------|---------|----------|
| **AC-6** - Least privilege | ✅ Granular enforcement | ✅ User group targeting |
| **AU-2** - Audit events | ✅ 7 event types | ✅ 11 event types |
| **AU-3** - Audit record content | ✅ OTEL schema | ✅ Complete metadata |
| **AU-6** - Audit review | ✅ Real-time notifications | ✅ Admin alerts |
| **AU-9** - Audit protection | ✅ Immutable logs | ✅ Audit trail integrity |

---

## Best Practices

### 1. Gradual Rollout

**Problem:** Don't know if new threshold will cause false positives

**Solution:**
```
Day 1: Deploy with "Monitor" mode
  → Gather 7 days of baseline data
  → Measure false positive rate
  → Zero user impact

Day 8: Switch to "Warn" mode
  → Alert on violations for 3 days
  → Requests still succeed
  → Verify alert routing works

Day 11: Switch to "Enforce" mode
  → Block violations
  → Full protection active
  → Rollback available if needed
```

---

### 2. Team-Based Alert Routing

**Problem:** Wrong team getting alerts for controls they don't own

**Solution:**
```
Security Controls → #security-alerts + security-team@
  • SSN Detection
  • Prompt Injection Shield
  • Access Control

Compliance Controls → #compliance-team + dpo@
  • Credit Card Masking
  • GDPR Subject Access Requests
  • Audit Logging

DevOps Controls → #platform-alerts + devops@
  • Rate Limiting
  • Resource Optimization
  • System Health
```

---

### 3. Environment-Specific Enforcement

**Problem:** Same strict rules in dev/staging/production

**Solution:**
```
SSN Detection:
  Production:
    • Enforcement Mode: Enforce
    • Schedule: Always Active
    • User Groups: All Users
  
  Staging:
    • Enforcement Mode: Warn
    • Schedule: Business Hours Only
    • User Groups: External Users Only
  
  Dev:
    • Enforcement Mode: Monitor
    • Schedule: Custom (testing hours)
    • User Groups: All Users
    • Exemptions: qa-team@company.com
```

---

### 4. Temporary Access with Expiry

**Problem:** Need to give contractor temporary access

**Solution:**
```
Control: SSN Pattern Detection

Exemptions:
  • Exempt Users: contractor-jane@vendor.com
  • Exempt IPs: None
  • Expiry: 2025-06-30 (end of contract)
  • Reason: "Q2 data migration project - security approval #1234"

Result:
  ✓ Access automatically revoked on July 1st
  ✓ All access logged in audit trail
  ✓ Security team notified (severity: warning)
  ✓ Can rollback immediately if needed
```

---

### 5. Brand-Appropriate Error Messages

**Problem:** Generic error messages confuse users

**Solution:**
```
Generic (Before):
  "Error: Request blocked by security policy"
  
  Result: User confused, opens support ticket

Brand-Appropriate (After):
  "For your privacy, we cannot process requests containing 
   personally identifiable information. Please remove 
   sensitive data like Social Security numbers, credit card 
   numbers, or addresses and try again. Need help? 
   Contact support@company.com"
  
  Result: User understands, fixes issue, no ticket needed
```

---

## Real-World Examples

### Example 1: Healthcare Org with HIPAA

**Scenario:** Hospital deploying PII protection with strict compliance

**Configuration:**
```
Pack: Healthcare HIPAA Compliance v2.0.0

Controls (5/5 enabled):
  1. PHI Detection & Redaction
     • Enforcement Mode: Enforce
     • Alert Routing: Slack (#hipaa-compliance), Email (dpo@), PagerDuty
     • Schedule: Always Active (24/7)
     • Scope: All endpoints, All users, Production only
     • Exemptions: None
     • Custom Message: "HIPAA compliance prevents processing of Protected Health Information through this channel."

  2. PII Detection & Redaction
     • Enforcement Mode: Enforce
     • Alert Routing: Slack (#security), Email (security-team@)
     • Schedule: Always Active (24/7)
     • Scope: /api/*, All users, Production + Staging
     • Exemptions: compliance-team@hospital.org (expiry: 2025-12-31)
     • Custom Message: "For patient privacy, sensitive information cannot be processed."

  3. Access Control & Authorization
     • Enforcement Mode: Enforce
     • Alert Routing: PagerDuty only
     • Schedule: Always Active (24/7)
     • Scope: All endpoints, All users, All environments
     • Exemptions: None

  4. HIPAA Audit Logging (Required - locked)
     • Enforcement Mode: Enforce (locked)
     • Alert Routing: Slack (#audit-logs)
     • Schedule: Always Active (24/7)
     • Exemptions: None

  5. Minimum Necessary Standard
     • Enforcement Mode: Warn (testing phase)
     • Alert Routing: Slack (#hipaa-compliance)
     • Schedule: Business Hours Only
     • Scope: /api/patient/*, Healthcare providers only, Production
     • Exemptions: emergency-access@hospital.org (expiry: None)

Settings:
  • Log Retention: 365 days (HIPAA minimum)
  • Enforcement Level: Strict
  • Detailed Logging: Enabled

Audit Trail:
  ✓ All configuration changes logged
  ✓ Compliance status: COMPLIANT
  ✓ Version: 1 (initial deployment)
```

---

### Example 2: Fintech Startup (Gradual Rollout)

**Scenario:** Testing new SSN detection threshold before enforcing

**Week 1 Configuration:**
```
Pack: PII Detection & Redaction

Control: SSN Pattern Detection
  • Enforcement Mode: Monitor (dry-run)
  • Alert Routing: Slack (#security-alerts only)
  • Schedule: Always Active
  • Scope: /api/chat/*, External users, Production only
  • Exemptions: None
  • Threshold: 95% (strict)

Result after 7 days:
  ✓ 1,234 requests scanned
  ✓ 23 SSNs detected (1.9% of traffic)
  ✓ 2 false positives (8.7% FP rate)
  ✓ Zero user impact
```

**Week 2 Configuration:**
```
Control: SSN Pattern Detection
  • Enforcement Mode: Warn (testing alerts)
  • Alert Routing: Slack + Email + PagerDuty
  • [rest same]

Result after 7 days:
  ✓ 1,189 requests scanned
  ✓ 21 SSNs detected (1.8% of traffic)
  ✓ 1 false positive (4.8% FP rate)
  ✓ Alerts working correctly
  ✓ Requests still succeeded
```

**Week 3 Configuration:**
```
Control: SSN Pattern Detection
  • Enforcement Mode: Enforce (full blocking)
  • [rest same]

Result:
  ✓ SSN violations now blocked
  ✓ Users see custom error message
  ✓ Security team alerted via all channels
  ✓ Rollback available if issues arise
```

---

### Example 3: SaaS Company (Multi-Environment)

**Scenario:** Different enforcement in dev/staging/prod

**Configuration:**
```
Pack: PII Detection & Redaction

Control: Credit Card Masking

Production:
  • Enforcement Mode: Enforce
  • Alert Routing: Slack + Email + PagerDuty
  • Schedule: Always Active
  • Scope: All endpoints, All users, Production only
  • Exemptions: None
  • Custom Message: "Payment information cannot be processed through chat. Visit payments.company.com"

Staging:
  • Enforcement Mode: Warn
  • Alert Routing: Slack only (#eng-staging)
  • Schedule: Business Hours Only
  • Scope: /api/checkout/*, All users, Staging only
  • Exemptions: qa-team@company.com (expiry: None)
  • Custom Message: "STAGING: Credit card detected - would be blocked in production"

Dev:
  • Enforcement Mode: Monitor
  • Alert Routing: None (logs only)
  • Schedule: Custom (9am-6pm)
  • Scope: All endpoints, All users, Dev only
  • Exemptions: All developers (dev-*@company.com)
  • Custom Message: "DEV: Credit card detected"

Result:
  ✓ Full protection in production
  ✓ Testing alerts in staging
  ✓ Monitoring only in dev
  ✓ Developers can test freely
```

---

## Summary

### What's Delivered

**Phase 1: Core Granular Controls**
1. ✅ Per-Control Enforcement Modes (Enforce/Warn/Monitor/Audit)
2. ✅ Per-Control Alert Routing (Slack/Email/PagerDuty)
3. ✅ Configuration Version Control with Rollback
4. ✅ Real-time Admin Notifications

**Advanced Features:**
5. ✅ Time-Based Scheduling (Business Hours/After Hours/Custom)
6. ✅ Scope/Targeting (Endpoints/User Groups/Environments)
7. ✅ Custom Allowlists/Exemptions (Users/IPs/Expiry)
8. ✅ Response Customization (Brand-appropriate messages)

**Supporting Infrastructure:**
9. ✅ 11 OTEL-Compliant Audit Event Types
10. ✅ Complete Audit Trail with User Attribution
11. ✅ Compliance Mapping (SOC2, ISO 27001, HIPAA, NIST)
12. ✅ Real-time Notification System
13. ✅ Configuration History & Rollback UI

---

### Benefits

**For Security Teams:**
- Maximum flexibility without all-or-nothing choices
- Gradual rollout with Monitor → Warn → Enforce progression
- Exempt monitoring tools from rate limits
- Target controls to specific endpoints during incidents

**For Compliance Teams:**
- Complete audit trail for every change
- User attribution and justification tracking
- Temporary access with automatic expiration
- Stricter enforcement in production vs. dev

**For Product Teams:**
- Friendly error messages reduce support tickets
- Custom messages match brand voice
- Targeted enforcement where needed
- A/B test controls on endpoint subsets

**For Executives:**
- Enterprise-grade governance without rigidity
- Complete transparency and auditability
- Risk mitigation through rollback capability
- Compliance evidence for auditors

---

### Status

✅ **Fully Implemented and Production-Ready**

All features are available now in PackDetailModal.tsx with comprehensive audit logging in PolicyPacks.tsx. Every configuration change is tracked in OTEL-compliant format and viewable in Reports & Logs → Raw Logs (Audit).

---

**Everything is logged. Every change is traceable. Full transparency guaranteed.** 🔒
