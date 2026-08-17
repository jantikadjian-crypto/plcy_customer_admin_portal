# Policy Pack Customization Guide

## Overview

PLCY customers can fully customize Policy Packs during deployment to match their organization's specific requirements and risk tolerance.

## Two Levels of Customization

### 1. Pack-Level Settings
Configure global settings that apply to the entire pack:

**All Packs:**
- **Log Retention Period**: 7 days → 2 years
- Enforcement level (monitor/standard/strict)
- Detailed logging toggle

**PII Detection Pack:**
- Redaction mode (full/partial/hash)
- Detection confidence threshold (70%/85%/95%)
- Audit logging level
- Block on detection toggle

**Prompt Injection Shield:**
- Detection sensitivity
- Block mode (immediate/flag/route to review)
- Attack log retention period
- Max retry attempts before permanent block
- Security team notifications

**Composite Packs (NIST, EU AI Act, HIPAA, etc.):**
- Enforcement mode (monitor/enforce/gradual rollout)
- Global log retention (framework-aware recommendations)
- Alert threshold (low/medium/high)
- Enable/disable all controls toggle

### 2. Control-Level Customization

**Enable/Disable Controls:**
- Toggle individual controls on/off within a pack
- Required controls (for compliance) cannot be disabled
- Visual indicator shows enabled vs disabled controls
- Counter shows X/Y enabled controls

**Configure Control Parameters:**
Click the expand arrow on any enabled control to customize:

**Validation/Block Controls:**
- Sensitivity threshold (70%/85%/95%)
- Action on match (block/flag/route to review)

**Transformation Controls:**
- Transformation mode (redact/mask/hash/tokenize)
- Preserve format toggle

**Rate Limit Controls:**
- Requests per minute
- Burst allowance

**Audit/Custom Controls:**
- Log detail level (minimal/standard/detailed)
- Real-time alerts toggle

**Default Controls:**
- Enable logging toggle

## Compliance Considerations

### Framework Requirements
When deploying compliance framework packs (NIST AI RMF, EU AI Act, HIPAA, etc.):

- **Required controls** are marked with a red "Required" badge
- Required controls cannot be disabled
- Framework-specific log retention minimums are suggested
- Warnings appear when disabling controls affects compliance coverage

### Risk Warnings
- Disabling controls shows warning: "You've disabled X control(s). This may reduce your compliance coverage."
- Customization summary displays at deployment showing what's been changed from defaults

## Use Cases

### Example 1: Healthcare Organization (HIPAA)
**Scenario:** Need extended log retention for PHI access audits

**Customization:**
1. Deploy "Healthcare HIPAA Compliance" pack
2. Go to Settings tab → Set log retention to **365 days** (1 year)
3. Keep all controls enabled (required for HIPAA)
4. Deploy with extended retention

### Example 2: Startup with Limited Budget
**Scenario:** Want core security without expensive features

**Customization:**
1. Deploy "PII Detection & Redaction" pack
2. Go to Controls tab → Disable "Phone Number Filtering" (not needed)
3. Keep SSN, Credit Card, and Email controls enabled
4. Set log retention to **30 days** to reduce costs
5. Deploy minimal configuration

### Example 3: Financial Services (High Security)
**Scenario:** Maximum protection for trading algorithms

**Customization:**
1. Deploy "Prompt Injection Shield" pack
2. Go to Controls tab → Expand each control
3. Set all thresholds to **95%** (strict)
4. Set max retries to **1 attempt**
5. Set log retention to **730 days** (2 years for SEC compliance)
6. Enable all security notifications
7. Deploy hardened configuration

### Example 4: Gradual Rollout
**Scenario:** Testing new governance in production

**Customization:**
1. Deploy "EU AI Act Compliance" pack
2. Go to Settings tab → Set enforcement mode to **"Monitor Only"**
3. Enable all controls for visibility
4. Set log retention to **90 days**
5. Deploy in observation mode
6. After 2 weeks, return and switch to "Full Enforcement"

## Deployment Flow

1. **Browse Pack Library** → Click any pack
2. **Overview Tab** → Read what the pack does
3. **Controls Tab** → Enable/disable specific controls, configure parameters
4. **Settings Tab** → Configure pack-level settings (log retention, enforcement, etc.)
5. **Review Customization Summary** → See what's changed from defaults
6. **Deploy Pack** → Applies to your runtime environment

## Visual Indicators

- **Blue highlight** = Control enabled
- **Gray + opacity** = Control disabled
- **Red "Required" badge** = Cannot be disabled (compliance)
- **Badge on Controls tab** = Shows X/Y enabled if customized
- **Expand arrow** = Click to configure control parameters
- **Customization summary** = Appears at bottom before deployment

## Best Practices

✅ **Do:**
- Review all controls before deploying
- Set log retention based on compliance requirements
- Use "Monitor Only" mode for initial testing
- Configure thresholds based on your risk tolerance
- Keep required controls enabled for framework compliance

❌ **Don't:**
- Disable audit/logging controls (compliance risk)
- Set log retention below regulatory minimums
- Disable all controls and expect compliance
- Skip configuring control parameters for high-risk packs

## After Deployment

Once deployed, you can:
- View pack in "Deployed Packs" dashboard
- See real-time metrics (requests processed, blocked, flagged)
- Access configuration (future: modify settings)
- View logs and audit trails
- Pause/activate pack
- Remove pack

## Summary

PLCY provides **complete flexibility** to customize policy packs:
- ✅ Enable/disable individual controls
- ✅ Configure control-specific parameters (thresholds, modes, actions)
- ✅ Set log retention from 7 days to 2 years
- ✅ Choose enforcement levels
- ✅ Framework-aware compliance guidance
- ✅ Real-time customization summary

This ensures PLCY works for **every organization** - from startups to enterprises, across all industries and compliance frameworks.
