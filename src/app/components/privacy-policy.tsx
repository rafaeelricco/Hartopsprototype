import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const LOGO_URL = "https://lirp.cdn-website.com/516d69f6/dms3rep/multi/opt/hart-2Bagency-2Blogo-217w.png";

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <img src={LOGO_URL} alt="Hart Ops" className="h-10 w-auto" />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-8">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }} className="text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-1 text-muted-foreground" style={{ fontSize: "0.875rem" }}>
            Last updated: March 1, 2026
          </p>

          <hr className="my-6 border-border" />

          <div className="space-y-6" style={{ fontSize: "0.875rem", lineHeight: "1.625" }}>
            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                1. Introduction
              </h2>
              <p className="text-muted-foreground">
                Hart Agency ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Hart Ops platform ("Service"). Please read this policy carefully. By using the Service, you consent to the practices described in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-3">
                We collect information in the following categories:
              </p>

              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600 }} className="text-foreground mb-1">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-3">
                <li>Account registration details (name, email address, organization).</li>
                <li>Profile information and preferences.</li>
                <li>Data you upload or enter into the Service, including organizational and event data.</li>
                <li>Communications with our support team.</li>
              </ul>

              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600 }} className="text-foreground mb-1">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Device information (browser type, operating system, device identifiers).</li>
                <li>Log data (IP address, access times, pages viewed, referring URL).</li>
                <li>Usage patterns and feature interaction data.</li>
                <li>Cookies and similar tracking technologies.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-2">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>To provide, operate, and maintain the Service.</li>
                <li>To improve, personalize, and expand the Service.</li>
                <li>To understand and analyze how you use the Service.</li>
                <li>To develop new products, services, features, and functionality.</li>
                <li>To communicate with you, including for customer service and support.</li>
                <li>To send you updates, security alerts, and administrative messages.</li>
                <li>To detect, prevent, and address technical issues and security threats.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground mb-2">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating the Service, subject to confidentiality obligations.</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                <li><strong>With Your Consent:</strong> When you have given explicit permission to share specific information.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                5. Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption in transit and at rest, access controls, regular security assessments, and employee training. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                6. Data Retention
              </h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as your account is active or as needed to provide the Service. We will also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements. Upon account termination, we will delete or anonymize your data within 90 days, unless retention is required by law.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                7. Your Rights
              </h2>
              <p className="text-muted-foreground mb-2">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format.</li>
                <li><strong>Objection:</strong> Object to certain processing of your personal data.</li>
                <li><strong>Restriction:</strong> Request restriction of processing under certain circumstances.</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                To exercise any of these rights, please contact us at privacy@hartagency.com.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                8. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver relevant content. You can control cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of the Service. For more details, refer to our Cookie Policy.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                9. Third-Party Links
              </h2>
              <p className="text-muted-foreground">
                The Service may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you access through the Service.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                10. Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                The Service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information promptly.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                11. Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-foreground mb-2">
                12. Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                Hart Agency<br />
                Email: privacy@hartagency.com<br />
                Website: www.hartagency.com
              </p>
            </section>
          </div>
        </div>

        <p className="mt-6 text-center text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
          &copy; 2026 Hart Agency. All rights reserved.
        </p>
      </div>
    </div>
  );
}
