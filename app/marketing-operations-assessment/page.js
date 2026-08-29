// app/marketing-operations-assessment/page.js
//
// Standalone landing page for the Marketing Operations Assessment --
// a service offer (not a Long Play ebook), so it doesn't live under
// /rockstar-cmo-presents-the-long-play or appear in that hub's grid.
// Uses the same PDFResource cover+download pattern as the Long Play
// pages purely as a UI building block. Copy combines the Notion draft
// ("Website Migration" > MOPS Assessment) with the fuller detail from
// the flyer PDF (5-step program, principal bio) since the Notion draft
// was a skeleton. CTA at the bottom points to /rockstar-b2b (Work With
// Us) rather than the generic /contact + WantAnLP used on Long Play pages.

import Link from "next/link";
import PDFResource from "../../components/PDFResource";

export const metadata = {
  title: "Marketing Operations Assessment | Rockstar CMO",
  description:
    "Understand your marketing machine in 5 f'in' steps -- a marketing operations competency assessment covering tech stack, reporting, data, process and demand center operations.",
};

const STEPS = [
  {
    n: "1",
    title: "Discovery",
    body: "Understand your business objectives, marketing goals and uncover specific areas of focus for improvement.",
  },
  {
    n: "2",
    title: "Assessment",
    body: "We interview the team, stakeholders and internal customers and assemble the results across the capabilities.",
  },
  {
    n: "3",
    title: "Analysis",
    body: "Review the assessment findings against our 5-point maturity plan and provide ranked recommendations.",
  },
  {
    n: "4",
    title: "Assessment report",
    body: "Prepare and present our executive recommendations report and our Marketing Ops Capability Assessment Guide.",
  },
  {
    n: "5",
    title: "Remediation Planning",
    body: "Define next steps, review budget and planning.",
  },
];

export default function MarketingOperationsAssessmentPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Rockstar CMO Presents: The Marketing Operations Assessment</h1>
      <p
        style={{
          fontFamily: "var(--font-bevan), Georgia, serif",
          color: "#F22F29",
          fontSize: "1.1rem",
          marginBottom: "1.5rem",
        }}
      >
        Understand your marketing machine in 5 f&rsquo;in&rsquo; steps.
      </p>

      <p>
        You can&rsquo;t run a race without a good pit crew. People, Process and Technology are the
        tried and true elements that make any team work well together. Today, you have to add
        data &mdash; it&rsquo;s what the people need and processes deliver, and tech ingests and
        spits out. And then there&rsquo;s how you make sense of all that data: Analytics. These
        five capabilities make today&rsquo;s marketing engine hum.
      </p>
      <p>
        As a CMO or marketing leader in a new role with a new team, or just trying to figure out
        how to make the marketing engine run better, you need an objective assessment. Does your
        operations team have the skills, tools, and resources to fine-tune your marketing engine?
        Time invested in boosting your ops team will pay off in races won.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>Time for a Tune-up</h2>

      <PDFResource
        coverImage="/images/mops-assessment/mops-assessment-cover.png"
        coverAlt="Rockstar CMO Presents: The Marketing Operations Assessment"
        downloadHref="/pdfs/mops-assessment/marketing-operations-assessment.pdf"
        intro={[
          "Our marketing operations competency report covers 5 marketing operations capabilities, evaluated against a maturity model of three simple steps: Basic, Intermediate and Advanced.",
          "We assess each of your organization\u2019s capabilities against over 100 criteria across the five capabilities to see where your machine stands today \u2014 and where you need to be. Result: a gap analysis you can put into action.",
        ]}
      />

      <h2>A 5 F&rsquo;in&rsquo; Step Program</h2>
      <div style={{ marginBottom: "2.5rem" }}>
        {STEPS.map((step) => (
          <div
            key={step.n}
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "flex-start",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bevan), Georgia, serif",
                color: "#F22F29",
                fontSize: "2rem",
                lineHeight: 1,
                flexShrink: 0,
                width: "2.5rem",
              }}
            >
              {step.n}
            </span>
            <div>
              <h3 style={{ marginBottom: "0.25rem" }}>{step.title}</h3>
              <p style={{ marginBottom: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Applied Practical Experience</h2>
      <p>
        This isn&rsquo;t rocket science, but it does take a scientific approach. We have worked
        with dozens of midsize and large enterprises to assess their capabilities and deliver an
        action plan for the CMO. The action plans arm the CMO and their marketing leadership with
        targeted training, staffing and capability improvements that become part of the
        masterplan.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
          margin: "2rem 0 2.5rem",
          flexWrap: "wrap",
        }}
      >
        <img
          src="/images/rockstar-b2b/jeff-clark.jpg"
          alt="Jeff Clark, Principal, Strategic Advisory"
          width={160}
          height={160}
          className="blog-image"
          style={{
            width: "140px",
            height: "auto",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: "1 1 300px" }}>
          <h3 style={{ marginBottom: "0.15rem" }}>Jeff Clark</h3>
          <p style={{ color: "#666", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
            Principal, Strategic Advisory &mdash; Boston, USA
          </p>
          <p style={{ marginBottom: "0.75rem" }}>
            Jeff Clark leads our Marketing Operations advisory and is a creative marketing
            executive with over 30 years of experience running corporate and product marketing
            teams for enterprise software companies and start-ups.
          </p>
          <p style={{ marginBottom: 0 }}>
            Jeff is a former principal analyst for Marketing Operations at Forrester
            SiriusDecisions, where he helped hundreds of clients improve planning and execution
            processes, including the adoption of integrated campaign strategies, martech
            optimization, and agile marketing.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <h2>Time to tune up your marketing machine?</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Get an objective, criteria-based read on where your marketing operations stand today
          &mdash; and a gap analysis you can act on.
        </p>
        <Link href="/rockstar-b2b" className="btn-primary">
          Work with Us
        </Link>
      </div>
    </main>
  );
}

