// components/PDFResource.js
// Cover image + intro copy + a direct download button. Replaces the old
// WordPress dflip page-flip viewer -- ungated, no email required, just a
// link straight to the PDF. Used by the 3 Long Play resource pages.
export default function PDFResource({ coverImage, coverAlt, intro, downloadHref }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginBottom: "2.5rem",
      }}
    >
      <img
        src={coverImage}
        alt={coverAlt}
        width={320}
        height={320}
        style={{
          width: "260px",
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: "1 1 300px" }}>
        {intro.map((para, i) => (
          <p key={i} style={{ marginBottom: "1rem" }}>
            {para}
          </p>
        ))}
        <a href={downloadHref} className="btn-primary" download>
          Download the PDF
        </a>
      </div>
    </div>
  );
}
