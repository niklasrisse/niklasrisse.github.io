// Theme persistence (localStorage; falls back to system preference)
(function () {
    var body = document.body;
    var toggle = document.getElementById("themeToggle");
    var stored = localStorage.getItem("theme");
    var prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored ? stored === "dark" : prefersDark;
    if (isDark) {
        body.classList.add("dark");
        toggle.checked = true;
    }
    toggle.addEventListener("change", function () {
        if (toggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    });
})();

// Mobile menu
(function () {
    var nav = document.getElementById("topnav");
    var btn = document.getElementById("hamburger");
    btn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("#mobileMenu a").forEach(function (a) {
        a.addEventListener("click", function () {
            nav.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
        });
    });
})();
