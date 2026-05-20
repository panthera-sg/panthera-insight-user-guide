/* Header tab-strip scroller
   --------------------------
   With 10 top-level sections the Material tab strip used to wrap onto
   two lines. Instead we keep it on a single row that scrolls
   horizontally, and inject a left / right chevron button at each edge.
   Each button only shows when there is more strip to reveal in that
   direction, and clicking it scrolls the row by roughly one viewport. */
(function () {
  "use strict";

  function initTabScroll() {
    var list = document.querySelector(".md-tabs__list");
    var inner = list ? list.parentElement : null; // the .md-grid wrapper
    if (!inner || !list) return;
    if (inner.dataset.scrollInit === "1") return; // guard against double-init
    inner.dataset.scrollInit = "1";

    var SVG =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
      '<path d="M0 0h24v24H0z" fill="none"/>' +
      '<path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';

    function makeBtn(dir) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "md-tabs__scroll md-tabs__scroll--" + dir;
      b.setAttribute(
        "aria-label",
        dir === "prev" ? "Scroll sections left" : "Scroll sections right"
      );
      b.innerHTML = SVG;
      b.addEventListener("click", function () {
        var step = Math.max(list.clientWidth * 0.7, 160);
        list.scrollBy({
          left: dir === "prev" ? -step : step,
          behavior: "smooth",
        });
      });
      return b;
    }

    var prev = makeBtn("prev");
    var next = makeBtn("next");
    inner.appendChild(prev);
    inner.appendChild(next);

    function update() {
      var max = list.scrollWidth - list.clientWidth;
      var x = list.scrollLeft;
      // 1px tolerance for sub-pixel rounding
      prev.classList.toggle("is-visible", x > 1);
      next.classList.toggle("is-visible", x < max - 1);
    }

    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Run once after layout settles (fonts can shift tab widths).
    update();
    window.setTimeout(update, 250);

    // Keep the active tab in view on load.
    var active = list.querySelector(
      ".md-tabs__item--active, .md-tabs__link--active"
    );
    if (active && active.scrollIntoView) {
      active.scrollIntoView({ inline: "center", block: "nearest" });
    }
  }

  // Material may swap the DOM on instant navigation; subscribe to its
  // document observable when present, otherwise fall back to DOMContentLoaded.
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initTabScroll);
  } else if (document.readyState !== "loading") {
    initTabScroll();
  } else {
    document.addEventListener("DOMContentLoaded", initTabScroll);
  }
})();
