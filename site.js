(function () {
  var toggle = document.querySelector("[data-menu-open]");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;
  var closeBtn = menu.querySelector("[data-menu-close]");

  function focusables() {
    return Array.prototype.slice.call(menu.querySelectorAll("a, button")).filter(function (el) {
      return !el.hasAttribute("disabled");
    });
  }

  var last = null;

  function openMenu() {
    last = document.activeElement;
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-lock");
    var nodes = focusables();
    (closeBtn || nodes[0]).focus();
  }

  function closeMenu() {
    if (menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-lock");
    if (last && typeof last.focus === "function") last.focus();
  }

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (e) {
    if (menu.hidden) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key !== "Tab") return;
    var nodes = focusables();
    if (!nodes.length) return;
    var first = nodes[0];
    var end = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      end.focus();
    } else if (!e.shiftKey && document.activeElement === end) {
      e.preventDefault();
      first.focus();
    }
  });
})();
