// Lay a patch over an object: objects merge key by key, lists of objects item by item, anything else is replaced.
const overlay = (base, patch) => {
  const isObject = (x) => x !== null && typeof x === "object" && !Array.isArray(x);
  Object.keys(patch).forEach((key) => {
    const old = base[key];
    const fresh = patch[key];
    if (Array.isArray(old) && Array.isArray(fresh) && fresh.every(isObject)) {
      fresh.forEach((item, i) => {
        if (isObject(old[i])) overlay(old[i], item);
        else old[i] = item;
      });
    } else if (isObject(old) && isObject(fresh)) {
      overlay(old, fresh);
    } else {
      base[key] = fresh;
    }
  });
};

/* Draw every ```plotly block of the page. The code block stays in the page, hidden, and the chart goes right after it. */
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    document.querySelectorAll("pre>code.language-plotly").forEach((elem) => {
      const jsonData = JSON.parse(elem.textContent);
      const backup = elem.parentElement;
      backup.classList.add("unloaded");

      let chartElement = document.createElement("div");
      backup.after(chartElement);

      // a chart drawn for the text column can carry a "narrow" block: what changes in its data and layout on a phone
      if (jsonData.narrow && chartElement.clientWidth < 520) {
        overlay(jsonData, jsonData.narrow);
      }

      // the site's chart look (plotlyTemplate, in theme.js) goes under whatever the chart sets for itself
      const layout = jsonData.layout || {};
      layout.template = { ...plotlyTemplate(determineComputedTheme()), ...(layout.template || {}) };

      Plotly.react(chartElement, jsonData.data, layout, { displayModeBar: false, responsive: true });
    });
  }
});
