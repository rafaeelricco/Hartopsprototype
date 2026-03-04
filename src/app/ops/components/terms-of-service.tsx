import React from "react";
import { LegalPageLayout } from "../../shared/components/layouts/legal-page-layout";

export function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 1, 2026">
      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          1. Acceptance of Terms
        </h2>
        <p className="text-muted-foreground">
          By accessing or using the Hart Ops platform ("Service"), you agree to
          be bound by these Terms of Service ("Terms"). If you do not agree to
          these Terms, you may not access or use the Service. These Terms apply
          to all users, including administrators, organization members, and
          visitors.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          2. Description of Service
        </h2>
        <p className="text-muted-foreground">
          Hart Ops is an operational management platform that provides event
          monitoring, organizational management, data quality reporting, and
          related analytical services. The Service is provided "as is" and may
          be updated, modified, or discontinued at any time without prior
          notice.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          3. User Accounts
        </h2>
        <p className="text-muted-foreground mb-2">
          To access certain features of the Service, you must create an account.
          You agree to:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Provide accurate, current, and complete information during
            registration.
          </li>
          <li>
            Maintain the security of your password and account credentials.
          </li>
          <li>
            Promptly notify Hart Ops of any unauthorized use of your account.
          </li>
          <li>
            Accept responsibility for all activities that occur under your
            account.
          </li>
        </ul>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          4. Acceptable Use
        </h2>
        <p className="text-muted-foreground mb-2">
          You agree not to use the Service to:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Violate any applicable local, state, national, or international law
            or regulation.
          </li>
          <li>
            Transmit any material that is defamatory, offensive, or otherwise
            objectionable.
          </li>
          <li>
            Attempt to gain unauthorized access to any portion of the Service or
            related systems.
          </li>
          <li>
            Interfere with or disrupt the integrity or performance of the
            Service.
          </li>
          <li>
            Collect or harvest any personally identifiable information from
            other users.
          </li>
        </ul>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          5. Data Ownership and Usage
        </h2>
        <p className="text-muted-foreground">
          You retain ownership of all data you submit to the Service. By using
          the Service, you grant Hart Ops a limited, non-exclusive license to
          process, store, and display your data solely for the purpose of
          providing the Service. Hart Ops will not sell, share, or distribute
          your data to third parties except as required by law or as described
          in our Privacy Policy.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          6. Intellectual Property
        </h2>
        <p className="text-muted-foreground">
          The Service and its original content, features, and functionality are
          owned by Hart Agency and are protected by international copyright,
          trademark, patent, trade secret, and other intellectual property laws.
          You may not copy, modify, distribute, sell, or lease any part of our
          Service without explicit written permission.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          7. Service Availability
        </h2>
        <p className="text-muted-foreground">
          Hart Ops strives to maintain high availability of the Service.
          However, we do not guarantee uninterrupted or error-free operation.
          The Service may be subject to scheduled maintenance windows, during
          which access may be temporarily limited. We will endeavor to provide
          advance notice of planned maintenance.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          8. Limitation of Liability
        </h2>
        <p className="text-muted-foreground">
          To the maximum extent permitted by applicable law, Hart Agency shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, including but not limited to loss of profits, data,
          use, or goodwill, arising from your access to or use of the Service.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          9. Termination
        </h2>
        <p className="text-muted-foreground">
          Hart Ops may terminate or suspend your account and access to the
          Service immediately, without prior notice or liability, for any
          reason, including breach of these Terms. Upon termination, your right
          to use the Service will cease immediately. You may request export of
          your data within 30 days of termination.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          10. Changes to Terms
        </h2>
        <p className="text-muted-foreground">
          Hart Ops reserves the right to modify these Terms at any time. We will
          notify you of any changes by posting the updated Terms on this page
          and updating the "Last updated" date. Your continued use of the
          Service after any modifications constitutes acceptance of the revised
          Terms.
        </p>
      </section>

      <section>
        <h2
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
          className="text-foreground mb-2"
        >
          11. Contact Information
        </h2>
        <p className="text-muted-foreground">
          If you have any questions about these Terms of Service, please contact
          us at:
        </p>
        <p className="text-muted-foreground mt-2">
          Hart Agency
          <br />
          Email: legal@hartagency.com
          <br />
          Website: www.hartagency.com
        </p>
      </section>
    </LegalPageLayout>
  );
}
