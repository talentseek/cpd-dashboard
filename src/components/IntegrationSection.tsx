import type React from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import styles from "@/components/styles/IntegrationSection.module.css"

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
    <div className={styles.container}>
      {/* ERP Integrations */}
      <Card className={styles.card}>
        <h3 className={styles.title}>Direct ERP Integrations</h3>
        <div className={styles.erpGrid}>
          {erpIntegrations.map((integration) => (
            <div key={integration.name} className={styles.integrationItem}>
              <div className={styles.logoContainer}>
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={`${integration.name} logo`}
                  width={100}
                  height={100}
                  className={styles.logo}
                />
              </div>
              <span className={styles.name}>{integration.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Non-Financial Integrations */}
      <Card className={styles.card}>
        <h3 className={styles.title}>Non-Financial Integrations</h3>
        <div className={styles.nonFinancialGrid}>
          {nonFinancialIntegrations.map((integration) => (
            <div key={integration.name} className={styles.integrationItem}>
              <div className={styles.nonFinancialLogoContainer}>
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={`${integration.name} logo`}
                  width={64}
                  height={64}
                  className={styles.logo}
                />
              </div>
              <span className={styles.nonFinancialName}>{integration.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Integration Notice */}
      <div className={styles.notice}>
        <p>
          Don&#39;t see your integration? We can build custom integrations inexpensively for most CRM, Payroll, HR, and social media packages, or any application with a RESTful API.
        </p>
      </div>
    </div>
  )
}

export default IntegrationSection