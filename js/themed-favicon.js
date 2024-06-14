if (typeof window !== "undefined") {
  (function updateFaviconForTheme(window) {
    function onThemeChange(theme) {
      const svg = document.querySelector(
        '.js-site-favicon[type="image/svg+xml"]',
      );
      const png = document.querySelector('.js-site-favicon[type="image/png"]');
      if (svg) {
        svg.href = getNewHref(svg.href, theme, "svg");
      }
      if (png) {
        png.href = getNewHref(png.href, theme, "png");
      }
    }
    function getNewHref(href, theme, fileType) {
      theme = theme || "light";
      const suffix = theme === "light" ? "" : "-dark";
      const url = new URL(href);
      const indexOfDarkString = url.pathname.indexOf("-dark");
      const pathnameWithoutThemeAndPrefix = url.pathname.slice(
        0,
        indexOfDarkString !== -1
          ? indexOfDarkString
          : url.pathname.lastIndexOf("."),
      );
      url.pathname = `${pathnameWithoutThemeAndPrefix}${suffix}.${fileType}`;
      return url.href;
    }
    function getMQL() {
      return (
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")
      );
    }
    let mql = getMQL();
    if (mql) {
      onThemeChange(mql.matches ? "dark" : "light");
      mql.addEventListener("change", function (e) {
        onThemeChange(e.matches ? "dark" : "light");
      });
    }
  })(window);
}
