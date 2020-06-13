if (typeof window !== "undefined") {
  (function updateFaviconForTheme(window) {
    function onThemeChange(theme) {
      const svg = document.querySelector(
        '.js-site-favicon[type="image/svg+xml"]'
      );
      const png = document.querySelector('.js-site-favicon[type="image/png"]');
      theme = theme || "light";
      const suffix = theme === "light" ? "" : "-dark";
      if (svg && png) {
        const indexOfDarkString = svg.href.indexOf("-dark.svg");
        const hrefWithoutThemeAndPrefix = svg.href.substr(
          0,
          indexOfDarkString !== -1
            ? indexOfDarkString
            : svg.href.lastIndexOf(".")
        );
        svg.href = `${hrefWithoutThemeAndPrefix}${suffix}.svg`;
        png.href = `${hrefWithoutThemeAndPrefix}${suffix}.png`;
      }
    }
    function getMQL() {
      return (
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")
      );
    }
    let mql = getMQL();
    if (mql) {
      onThemeChange(mql.matches ? "dark" : "light");
      mql.addListener(function (e) {
        onThemeChange(e.matches ? "dark" : "light");
      });
    }
  })(window);
}
