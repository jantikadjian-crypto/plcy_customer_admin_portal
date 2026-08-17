# Advanced Granular Control Features - Implementation Complete

## Overview

Four critical "must-have" features have been implemented to provide customers with even more granular control over policy pack behavior. These features complement the Phase 1 capabilities and provide enterprise-grade flexibility for real-world deployment scenarios.

---

## 1. Time-Based Scheduling ⏰

**Purpose:** Apply different enforcement during business hours vs. after hours

### Available Schedules:

**🕐 Always Active (24/7)** (Default)
- Control enforced around the clock
- Standard production mode
- Recommended for security-critical controls

**🏢 Business Hours Only**
- Active: Monday-Friday, 9am-5pm
- Inactive: Evenings and weekends
- Use case: Stricter controls during work hours

**🌙 After Hours Only**
- Active: 5pm-9am + weekends
- Inactive: Business hours
- Use case: Lighter enforcement during peak productivity

**📅 Custom Schedule**
- User-defined time windows
- Day-of-week granularity
- Timezone-aware

### Configuration

**Location:** Controls Tab → Expand Control → Time-Based Scheduling dropdown

**Example Use Cases:**

```
PII Detection:
  Schedule: Business Hours Only
  Reason: Stricter enforcement during work hours when employees handle customer data

Rate Limiting:
  Schedule: After Hours Only
  Reason: Protect against automated attacks during off-peak hours

Audit Logging:
  Schedule: Always Active (24/7)
  Reason: Continuous compliance documentation required
```

### Audit Logging

```json
{
  "@timestamp": "2025-01-15T10:30:00.000Z",
  "event.action": "time_based_scheduling_configured",
  "event.severity": "info",
  "plcy.pack.name": "PII Detection & Redaction",
  "plcy.control.name": "SSN Pattern Detection",
  "plcy.schedule.type": "business_hours",
  "plcy.schedule.description": "Active Monday-Friday 9am-5pm only",
  "plcy.schedule.timezone": "America/Los_Angeles",
  "user.id": "admin@company.com",
  "message": "Time-based scheduling configured: business_hours for SSN Pattern Detection"
}
```

---

## 2. Scope/Targeting 🎯

**Purpose:** Apply controls selectively to specific endpoints, user groups, or environments

### Targeting Dimensions:

#### **Endpoint Patterns**
- Glob pattern matching
- Examples:
  - `/api/chat/*` - All chat endpoints
  - `/api/support/*` - Support endpoints only
  - `/api/*/sensitive` - Any endpoint with "sensitive" path
- Default: All endpoints

#### **User Groups**
- **All Users** (Default) - Apply to everyone
- **External Users Only** - Public-facing traffic
- **Internal Users Only** - Employee traffic
- **Contractors Only** - Third-party access
- **Administrators Only** - Privileged users

#### **Environments**
- ✅ **Production** (Default: On)
- ✅ **Staging** (Default: On)
- ☐ **Dev** (Default: Off)

### Configuration

**Location:** Controls Tab → Expand Control → Scope/Targeting section

**Example Configurations:**

```
SSN Detection:
  Endpoints: /api/chat/*, /api/support/*
  User Groups: External Users Only
  Environments: Production ✓, Staging ✓, Dev ✗
  Reason: Only scan customer-facing chat and support in production/staging

Credit Card Masking:
  Endpoints: /api/payments/*
  User Groups: All Users
  Environments: Production ✓, Staging ✓, Dev ✓
  Reason: Mask payment data in all environments

Rate Limiting:
  Endpoints: /api/*
  User Groups: External Users Only
  Environments: Production ✓, Staging ✗, Dev ✗
  Reason: Only limit external traffic in production
```

### Audit Logging

```json
{
  "@timestamp": "2025-01-15T10:35:00.000Z",
  "event.action": "scope_targeting_configured",
  "event.severity": "info",
  "plcy.pack.name": "PII Detection & Redaction",
  "plcy.control.name": "SSN Pattern Detection",
  "plcy.scope.endpoints": "/api/chat/*, /api/support/*",
  "plcy.scope.user_groups": "external",
  "plcy.scope.environments": {
    "production": true,
    "staging": true,
    "dev": false
  },
  "user.id": "admin@company.com",
  "message": "Scope targeting configured: SSN Pattern Detection limited to /api/chat/*, /api/support/* for external users in production/staging"
}
```

---

## 3. Custom Allowlists/Exemptions 🔓

**Purpose:** Define exceptions for trusted users, systems, or IP ranges

### Exemption Types:

#### **Exempt Users (Email-based)**
- Comma-separated email addresses
- Examples:
  - `admin@company.com` - System administrator
  - `monitoring-bot@company.com` - Health check service
  - `data-pipeline@company.com` - Automated ETL process

#### **Exempt IP Ranges (CIDR notation)**
- Comma-separated IP ranges
- Examples:
  - `10.0.0.0/24` - Internal network
  - `192.168.1.0/24` - VPN subnet
  - `203.0.113.0/24` - Partner API gateway

#### **Exemption Expiry Date**
- Optional expiration date
- Auto-revoke after date
- Audit trail of expired exemptions
- Use case: Temporary access for contractors, testing

### Security Considerations

⚠️ **WARNING:** Exemptions bypass security controls!

- Document exemption reason
- Set expiry dates when possible
- Review exemption list quarterly
- Audit log captures all exemptions (severity: warning)
- Notify security team via configured alert channels

### Configuration

**Location:** Controls Tab → Expand Control → Custom Allowlists/Exemptions section

**Example Configurations:**

```
PII Detection:
  Exempt Users: monitoring-bot@company.com, health-check@company.com
  Exempt IPs: 10.0.0.0/24 (Internal network)
  Expiry: None (permanent)
  Reason: Allow health checks and internal monitoring without PII blocking

SSN Masking:
  Exempt Users: compliance-team@company.com
  Exempt IPs: None
  Expiry: 2025-03-31
  Reason: Temporary access for Q1 compliance audit

Rate Limiting:
  Exempt Users: None
  Exempt IPs: 192.168.1.0/24 (Partner API gateway)
  Expiry: None
  Reason: Trusted partner with high-volume legitimate traffic
```

### Audit Logging

```json
{
  "@timestamp": "2025-01-15T10:40:00.000Z",
  "event.action": "exemptions_configured",
  "event.severity": "warning",
  "plcy.pack.name": "PII Detection & Redaction",
  "plcy.control.name": "SSN Pattern Detection",
  "plcy.exemptions.users": [
    "admin@company.com",
    "monitoring-bot@company.com"
  ],
  "plcy.exemptions.ip_ranges": [
    "10.0.0.0/24",
    "192.168.1.0/24"
  ],
  "plcy.exemptions.expiry_date": "2025-03-31",
  "plcy.exemptions.count": 4,
  "user.id": "admin@company.com",
  "message": "SECURITY: Exemptions configured for SSN Pattern Detection - 2 users, 2 IP ranges exempt until 2025-03-31",
  "tags": ["security", "exemption", "audit"]
}
```

**Note:** `event.severity: "warning"` because exemptions reduce security posture

---

## 4. Response Customization 💬

**Purpose:** Provide user-friendly, brand-appropriate error messages

### Custom Block Messages

Instead of generic error:
```
Error: Request blocked by security policy
```

Customers can configure:
```
For your privacy, we cannot process this request. 
Please remove sensitive information and try again.
```

### Benefits:

✅ **User Experience** - Clear, actionable guidance  
✅ **Brand Voice** - Match company communication style  
✅ **Compliance** - Align with privacy policies  
✅ **Reduced Support** - Self-service error resolution  

### Configuration

**Location:** Controls Tab → Expand Control → Response Customization section

**Example Messages:**

```
PII Detection Block:
  "For your privacy, we cannot process requests containing personally identifiable information. Please remove sensitive data and try again."

Prompt Injection Block:
  "Your request appears to contain malicious input. Please rephrase your question and resubmit."

Rate Limit Block:
  "You've reached the request limit. Please wait 60 seconds before trying again. For higher limits, contact sales@company.com"

Credit Card Detection:
  "We detected a credit card number in your message. For security, we cannot process payment information through chat. Visit payments.company.com instead."
```

### Best Practices:

1. **Be Specific** - Explain what was blocked and why
2. **Be Actionable** - Tell users how to fix the issue
3. **Be Brand-Appropriate** - Match your company's tone
4. **Avoid Technical Jargon** - Use plain language
5. **Provide Alternatives** - Offer legitimate paths forward

### Audit Logging

```json
{
  "@timestamp": "2025-01-15T10:45:00.000Z",
  "event.action": "custom_message_configured",
  "event.severity": "info",
  "plcy.pack.name": "PII Detection & Redaction",
  "plcy.control.name": "SSN Pattern Detection",
  "plcy.response.custom_message": "For your privacy, we cannot process this request. Please remove sensitive information and try again.",
  "plcy.response.message_length": 108,
  "user.id": "admin@company.com",
  "message": "Custom block message configured for SSN Pattern Detection"
}
```

---

## Integration with Phase 1 Features

### How These Features Work Together

**Example: Production SSN Detection for External Users**

```
Control: SSN Pattern Detection

Enforcement Mode: Enforce (Phase 1)
  → Block violations in production

Alert Routing: (Phase 1)
  → Slack: #security-alerts
  → Email: security-team@company.com
  → PagerDuty: Enabled

Time-Based Scheduling: (New)
  → Business Hours Only

Scope/Targeting: (New)
  → Endpoints: /api/chat/*, /api/support/*
  → User Groups: External Users Only
  → Environments: Production only

Exemptions: (New)
  → monitoring-bot@company.com (exempt)
  → 10.0.0.0/24 (internal network exempt)

Custom Message: (New)
  → "For your privacy, we cannot process requests containing Social Security Numbers. Please remove and try again."

Result:
  ✓ External users in /api/chat during business hours are protected
  ✓ Internal monitoring tools continue to work
  ✓ Users get helpful error message
  ✓ Security team alerted via Slack/Email/PagerDuty
  ✓ All activity logged in audit trail
  ✓ Can rollback if needed (Phase 1)
```

---

## Complete Audit Event Summary

### 11 Total Event Types (7 from Phase 1 + 4 New)

**Phase 1 Events:**
1. `policy_pack_deployed`
2. `log_retention_configured`
3. `control_configured`
4. `enforcement_mode_changed`
5. `alert_routing_configured`
6. `config_rollback`
7. `admin_notification_sent`

**New Events:**
8. `time_based_scheduling_configured`
9. `scope_targeting_configured`
10. `exemptions_configured` ⚠️ (severity: warning)
11. `custom_message_configured`

All events viewable in: **Reports & Logs → Raw Logs (Audit)**

---

## User Workflow

### Deploying with Advanced Features:

```
1. Browse Pack Library → Click pack

2. Controls Tab:
   ├─ Toggle control on/off
   ├─ Expand control (▼)
   │
   ├─ SET ENFORCEMENT MODE (Phase 1)
   │  └─ Enforce / Warn / Monitor / Audit
   │
   ├─ CONFIGURE PARAMETERS (Base)
   │  └─ Thresholds, modes, actions
   │
   ├─ SET ALERT ROUTING (Phase 1)
   │  └─ Slack / Email / PagerDuty
   │
   ├─ SET SCHEDULE (New)
   │  └─ Always / Business Hours / After Hours / Custom
   │
   ├─ SET SCOPE (New)
   │  ├─ Endpoint patterns
   │  ├─ User groups
   │  └─ Environments
   │
   ├─ SET EXEMPTIONS (New)
   │  ├─ Exempt users
   │  ├─ Exempt IPs
   │  └─ Expiry date
   │
   └─ CUSTOMIZE RESPONSE (New)
      └─ Custom block message

3. Settings Tab:
   └─ Log retention, enforcement level

4. Deploy Pack
   └─ All settings logged in audit trail
```

---

## Compliance Benefits

### Additional Compliance Coverage:

✅ **SOC2 CC6.7** - Logical access controls restrict access to appropriate users (exemptions with expiry)  
✅ **ISO 27001 A.9.4.2** - Access restrictions documented (scope targeting)  
✅ **NIST SP 800-53 AC-6** - Least privilege enforcement (user group targeting)  
✅ **HIPAA §164.312(a)(1)** - Unique user identification (user exemptions tracked)  
✅ **PCI-DSS 7.2** - System access limited based on role (user group filtering)  

---

## Benefits Summary

### For Security Teams:
✅ **Flexibility** - Fine-tune controls without all-or-nothing choices  
✅ **Gradual Rollout** - Test in dev, monitor in staging, enforce in production  
✅ **Operational Efficiency** - Exempt monitoring tools from rate limits  
✅ **Incident Response** - Target controls to affected endpoints during incident  

### For Compliance Teams:
✅ **Audit Trail** - Every exemption logged with severity warning  
✅ **Temporary Access** - Contractor exemptions with expiration dates  
✅ **Environment Separation** - Enforce stricter rules in production  
✅ **User Accountability** - User-level exemptions tracked  

### For Product Teams:
✅ **User Experience** - Friendly error messages reduce support tickets  
✅ **Brand Consistency** - Custom messages match brand voice  
✅ **Targeted Enforcement** - Apply controls where needed, not everywhere  
✅ **A/B Testing** - Test controls on subset of endpoints first  

---

## Summary

**4 New Advanced Features:**

1. ⏰ **Time-Based Scheduling** - Business hours / after hours / custom
2. 🎯 **Scope/Targeting** - Endpoints / user groups / environments
3. 🔓 **Custom Allowlists** - User / IP exemptions with expiry
4. 💬 **Response Customization** - Brand-appropriate error messages

**Result:** Maximum flexibility with complete auditability

**Status:** ✅ Fully implemented and production-ready
