// components/WantAnLP.js
import Link from "next/link";

export default function WantAnLP() {
  return (
    <div
      style={{
        marginTop: "3rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <h2>Want an LP of your own?</h2>
      <p>
        Do you have a topic that you would like to see given the Rockstar CMO treatment? Would you
        like to create something beautiful that will perk up your buyer that&rsquo;s a bit different
        from the boring blah blah blah? Then please,{" "}
        <Link href="/contact" className="blog-hover-red">
          get in touch.
        </Link>
      </p>
    </div>
  );
}
