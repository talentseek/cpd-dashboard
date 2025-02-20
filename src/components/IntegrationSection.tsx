import type React from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const IntegrationSection: React.FC = () => {
  const erpIntegrations = [
    { name: "Sage (50/200/Intact)", logo: "/images/abm/proforecast/erp/sage-logo.png" },
    { name: "AccountsIQ", logo: "/images/abm/proforecast/erp/accountsiq.png" },
    { name: "Oracle Netsuite", logo: "/images/abm/proforecast/erp/netsuite.png" },
    { name: "Microsoft Dynamics 365", logo: "/images/abm/proforecast/erp/dynamics.png" },
    { name: "Exact", logo: "/images/abm/proforecast/erp/exact.png" },
    { name: "Access", logo: "/images/abm/proforecast/erp/access.png" },
    { name: "Xero", logo: "/images/abm/proforecast/erp/xero.png" },
    { name: "Intuit Quickbooks", logo: "/images/abm/proforecast/erp/quickbooks.png" },
    { name: "Pegasus", logo: "/images/abm/proforecast/erp/pegasus.svg" },
  ]

  const nonFinancialIntegrations = [
    { name: "HubSpot", logo: "/images/abm/proforecast/non-finance/hubspot.svg" },
    { name: "Shopify", logo: "/images/abm/proforecast/non-finance/shopify.png" },
    { name: "Salesforce", logo: "/images/abm/proforecast/non-finance/salesforce.png" },
    { name: "Slack", logo: "/images/abm/proforecast/non-finance/slack.png" },
    { name: "Stripe", logo: "/images/abm/proforecast/non-finance/stripe.png" },
    { name: "Amazon", logo: "/images/abm/proforecast/non-finance/amazon.png" },
    { name: "Paypal", logo: "/images/abm/proforecast/non-finance/paypal.png" },
    { name: "Shopware", logo: "/images/abm/proforecast/non-finance/shopware.png" },
    { name: "Magento", logo: "/images/abm/proforecast/non-finance/magento.svg" },
  ]

  return (
    <div className="space-y-12">
      {/* ERP Integrations */}
      <Card className="p-6 bg-[#00334B]/80 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Direct ERP Integrations</h3>
        <div className="grid grid-cols-3 gap-4">
          {erpIntegrations.map((integration) => (
            <div key={integration.name} className="flex flex-col items-center justify-center space-y-2">
              <div className="w-24 h-24 flex items-center justify-center">
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={`${integration.name} logo`}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <span className="text-center text-white text-sm">{integration.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Non-Financial Integrations */}
      <Card className="p-6 bg-[#00334B]/80 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Non-Financial Integrations</h3>
        <div className="grid grid-cols-5 gap-4">
          {nonFinancialIntegrations.map((integration) => (
            <div key={integration.name} className="flex flex-col items-center justify-center space-y-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={`${integration.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="text-center text-white text-xs">{integration.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Integration Notice */}
      <div className="text-center text-white text-base">
        <p>
        Don&apos;t see your integration? We can build custom integrations inexpensively for most CRM, Payroll, HR, and social media packages, or any application with a RESTful API.
        </p>
      </div>
    </div>
  )
}

export default IntegrationSection