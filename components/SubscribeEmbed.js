// components/SubscribeEmbed.js
// Beehiiv's "slim" subscribe widget -- same embed used site-wide on the old
// WordPress site (Long Play pages, sidebar, etc). Just an email input + submit,
// so it renders short; no gating, gives free access to what's above/below it.
export default function SubscribeEmbed() {
  return (
    <iframe
      src="https://embeds.beehiiv.com/b95558c1-3668-45a6-901a-77bb0e302274?slim=true"
      title="Subscribe to The Beat by Rockstar CMO"
      style={{ width: "100%", height: "52px", border: "none", borderRadius: "4px" }}
      scrolling="no"
    />
  );
}
