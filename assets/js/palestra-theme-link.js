// Links to Palestra carry the theme setting the site is using (system, light or dark),
// so the app opens in the same colours; Palestra reads ?tema= and remembers it.
document.querySelectorAll('a[href^="https://palestra-opal.vercel.app"]').forEach((link) => {
  const withTheme = () => {
    const setting = document.documentElement.getAttribute("data-theme-setting") || "system";
    const url = new URL(link.href);
    url.searchParams.set("tema", setting);
    link.href = url.toString();
  };
  // pointerdown and focus run before any way of opening the link: click, middle click, keyboard
  ["pointerdown", "focus", "click"].forEach((event) => link.addEventListener(event, withTheme));
});
