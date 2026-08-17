import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, 
  Heart, 
  Banknote, 
  ShoppingCart, 
  Factory, 
  Building, 
  Plane,
  Truck,
  GraduationCap,
  Landmark,
  Server,
  Database,
  Zap
} from 'lucide-react';

export function IndustryConnectorGuide() {
  const industryConnectors = {
    healthcare: {
      icon: Heart,
      name: 'Healthcare & Life Sciences',
      protocols: ['FHIR R4', 'HL7 v2/v3', 'DICOM', 'IHE XDS', 'CDA', 'SMART on FHIR'],
      systems: [
        'Epic MyChart API', 'Cerner PowerChart', 'Allscripts', 'athenahealth',
        'GE Healthcare', 'Philips HealthSuite', 'Siemens Healthineers',
        'Medical Device APIs', 'Telemedicine Platforms', 'EHR Systems'
      ],
      dataTypes: ['PHI', 'Medical Images', 'Clinical Notes', 'Lab Results', 'Genetic Data'],
      compliance: ['HIPAA', 'FDA 21 CFR Part 11', 'GDPR', 'MDR'],
      regions: ['US-HIPAA', 'EU-GDPR', 'Canada-PIPEDA']
    },
    financial: {
      icon: Banknote,
      name: 'Financial Services',
      protocols: ['FIX Protocol', 'SWIFT MT/MX', 'ISO 20022', 'Open Banking API', 'PCI DSS'],
      systems: [
        'Bloomberg Terminal', 'Reuters Eikon', 'Refinitiv', 'Murex',
        'Calypso', 'Trading Platforms', 'Core Banking Systems', 'Payment Rails',
        'Crypto Exchanges', 'RegTech Platforms', 'Risk Management Systems'
      ],
      dataTypes: ['PCI Data', 'Trading Data', 'KYC/AML', 'Credit Scores', 'Transaction History'],
      compliance: ['PCI DSS', 'SOX', 'Basel III', 'MiFID II', 'GDPR', 'CCPA'],
      regions: ['US-Financial', 'EU-Financial', 'APAC-Financial', 'UK-FCA']
    },
    retail: {
      icon: ShoppingCart,
      name: 'Retail & E-commerce',
      protocols: ['REST API', 'GraphQL', 'Shopify API', 'WooCommerce', 'Magento API'],
      systems: [
        'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Salesforce Commerce',
        'Amazon Marketplace', 'eBay API', 'POS Systems', 'Inventory Management',
        'Customer Reviews APIs', 'Recommendation Engines'
      ],
      dataTypes: ['Customer Profiles', 'Purchase History', 'Behavioral Data', 'Inventory Data'],
      compliance: ['GDPR', 'CCPA', 'PCI DSS', 'Consumer Protection Laws'],
      regions: ['Global', 'US-Retail', 'EU-GDPR', 'APAC-Commerce']
    },
    manufacturing: {
      icon: Factory,
      name: 'Manufacturing & Industrial',
      protocols: ['OPC UA', 'Modbus', 'MQTT', 'CoAP', 'DDS', 'EtherCAT', 'PROFINET'],
      systems: [
        'SAP MES', 'Oracle WMS', 'Siemens MindSphere', 'GE Predix',
        'PTC ThingWorx', 'Rockwell FactoryTalk', 'Schneider EcoStruxure',
        'ABB Ability', 'Honeywell Forge', 'Industrial IoT Platforms'
      ],
      dataTypes: ['Sensor Data', 'Production Metrics', 'Quality Data', 'Maintenance Records'],
      compliance: ['ISO 27001', 'IEC 62443', 'NIST Cybersecurity Framework'],
      regions: ['Global', 'Industrial Networks', 'Edge Computing']
    },
    government: {
      icon: Landmark,
      name: 'Government & Public Sector',
      protocols: ['FedRAMP', 'FISMA', 'SAML 2.0', 'PIV/CAC', 'CJIS', 'DoD 8570'],
      systems: [
        'AWS GovCloud', 'Azure Government', 'Google Cloud for Government',
        'Salesforce Government', 'ServiceNow GRC', 'Palantir Gotham',
        'Case Management Systems', 'Citizen Services Portals'
      ],
      dataTypes: ['CUI', 'PII', 'Law Enforcement Data', 'Intelligence Data', 'Citizen Data'],
      compliance: ['FedRAMP', 'FISMA', 'CJIS', 'ITAR', 'StateRAMP'],
      regions: ['US-Gov', 'US-DoD', 'State/Local Gov']
    },
    transportation: {
      icon: Truck,
      name: 'Transportation & Logistics',
      protocols: ['GTFS', 'SIRI', 'TPEG', 'CAN Bus', 'J1939', 'Fleet Management APIs'],
      systems: [
        'Uber API', 'Lyft API', 'Google Maps Fleet', 'HERE Tracking',
        'Trimble Transportation', 'Samsara Fleet', 'Geotab', 'Fleetio',
        'CargoWise', 'Manhattan WMS', 'SAP TM'
      ],
      dataTypes: ['GPS Tracking', 'Route Data', 'Vehicle Diagnostics', 'Driver Behavior'],
      compliance: ['DOT Regulations', 'ELD Mandate', 'GDPR', 'Data Localization'],
      regions: ['Global', 'US-DOT', 'EU-Transport', 'Cross-Border']
    },
    education: {
      icon: GraduationCap,
      name: 'Education & Research',
      protocols: ['LTI', 'SCORM', 'xAPI', 'QTI', 'SIF', 'Ed-Fi', 'OneRoster'],
      systems: [
        'Canvas API', 'Blackboard', 'Moodle', 'Google Classroom',
        'Microsoft Teams for Education', 'Zoom Education', 'Coursera',
        'Research Data Repositories', 'Student Information Systems'
      ],
      dataTypes: ['Student Records', 'Research Data', 'Learning Analytics', 'Academic Performance'],
      compliance: ['FERPA', 'COPPA', 'GDPR', 'Student Privacy Laws'],
      regions: ['US-Education', 'EU-Education', 'Global-Academic']
    },
    energy: {
      icon: Zap,
      name: 'Energy & Utilities',
      protocols: ['IEC 61850', 'DNP3', 'Modbus', 'BACnet', 'LonWorks', 'Smart Grid APIs'],
      systems: [
        'GE Digital Energy', 'Siemens Energy', 'ABB Power Systems',
        'Schneider Electric', 'Honeywell Energy', 'Oracle Utilities',
        'Smart Meter APIs', 'Grid Management Systems', 'SCADA Systems'
      ],
      dataTypes: ['Meter Data', 'Grid Telemetry', 'Energy Consumption', 'Outage Data'],
      compliance: ['NERC CIP', 'FERC', 'Environmental Regulations', 'Grid Security'],
      regions: ['US-Energy', 'EU-Energy', 'Regional Grids']
    }
  };

  const enterpriseIntegrationPatterns = [
    {
      pattern: 'Enterprise Service Bus (ESB)',
      description: 'Centralized integration hub for enterprise applications',
      protocols: ['SOAP', 'REST', 'JMS', 'AMQP', 'File Transfer'],
      examples: ['MuleSoft', 'IBM Integration Bus', 'Apache Camel', 'WSO2 ESB'],
      useCase: 'Legacy system integration with modern AI services'
    },
    {
      pattern: 'API Gateway',
      description: 'Centralized API management and security layer',
      protocols: ['REST', 'GraphQL', 'gRPC', 'WebSocket', 'OAuth 2.0'],
      examples: ['Kong', 'Ambassador', 'AWS API Gateway', 'Azure API Management'],
      useCase: 'Secure AI API access with rate limiting and analytics'
    },
    {
      pattern: 'Message Queue Systems',
      description: 'Asynchronous messaging for real-time AI processing',
      protocols: ['AMQP', 'Apache Kafka', 'RabbitMQ', 'AWS SQS', 'Redis Streams'],
      examples: ['Apache Kafka', 'RabbitMQ', 'Amazon SQS', 'Azure Service Bus'],
      useCase: 'Event-driven AI workflows and real-time data processing'
    },
    {
      pattern: 'Service Mesh',
      description: 'Infrastructure layer for microservices communication',
      protocols: ['HTTP/2', 'gRPC', 'mTLS', 'Envoy Proxy', 'OpenTelemetry'],
      examples: ['Istio', 'Linkerd', 'Consul Connect', 'AWS App Mesh'],
      useCase: 'Secure AI microservices with observability and traffic management'
    },
    {
      pattern: 'Event Streaming',
      description: 'Real-time data streaming for AI/ML pipelines',
      protocols: ['Apache Kafka', 'Apache Pulsar', 'Amazon Kinesis', 'Event Hubs'],
      examples: ['Confluent', 'Apache Pulsar', 'Amazon Kinesis', 'Azure Event Hubs'],
      useCase: 'Real-time AI inference on streaming data'
    },
    {
      pattern: 'Data Federation',
      description: 'Virtual data integration across multiple sources',
      protocols: ['GraphQL', 'OData', 'SQL Federation', 'Data Virtualization'],
      examples: ['Denodo', 'Tibco Data Virtualization', 'IBM Cloud Pak', 'Starburst'],
      useCase: 'AI training on federated datasets without data movement'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Industry-Specific AI Connectors</h2>
        <p className="text-muted-foreground">
          Pre-configured connectors for industry-standard systems and protocols
        </p>
      </div>

      <Tabs defaultValue="industries" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="industries">Industry Connectors</TabsTrigger>
          <TabsTrigger value="patterns">Integration Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="industries" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(industryConnectors).map(([key, industry]) => {
              const Icon = industry.icon;
              return (
                <Card key={key} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {industry.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Industry Protocols</h4>
                      <div className="flex flex-wrap gap-1">
                        {industry.protocols.map((protocol) => (
                          <Badge key={protocol} variant="secondary" className="text-xs">
                            {protocol}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Common Systems</h4>
                      <div className="text-xs text-muted-foreground">
                        {industry.systems.slice(0, 4).join(', ')}...
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Data Types</h4>
                      <div className="flex flex-wrap gap-1">
                        {industry.dataTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Compliance Requirements</h4>
                      <div className="flex flex-wrap gap-1">
                        {industry.compliance.map((comp) => (
                          <Badge key={comp} variant="destructive" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View {industry.systems.length} Connectors
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {enterpriseIntegrationPatterns.map((pattern, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Server className="w-5 h-5" />
                    {pattern.pattern}
                  </CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Protocols</h4>
                      <div className="flex flex-wrap gap-1">
                        {pattern.protocols.map((protocol) => (
                          <Badge key={protocol} variant="secondary" className="text-xs">
                            {protocol}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Examples</h4>
                      <div className="text-xs text-muted-foreground">
                        {pattern.examples.join(', ')}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">AI Use Case</h4>
                      <div className="text-xs text-muted-foreground">
                        {pattern.useCase}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}