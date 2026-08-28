// Minimal slide viewer with speaker notes.
// Data comes from talks/talks.js (window.TALKS); see talks/README.md.
(function () {
    var talks = window.TALKS || [];

    var el = {
        event: document.getElementById("talkEvent"),
        title: document.getElementById("talkTitle"),
        context: document.getElementById("talkContext"),
        pickerWrap: document.getElementById("talkPickerWrap"),
        picker: document.getElementById("talkPicker"),
        img: document.getElementById("slideImg"),
        frame: document.querySelector(".slide-frame"),
        notes: document.getElementById("notesBody"),
        counter: document.getElementById("counter"),
        bar: document.getElementById("progressBar"),
        progress: document.getElementById("progress"),
        stage: document.querySelector(".stage"),
        head: document.querySelector(".viewer-head"),
        empty: document.getElementById("viewerEmpty"),
        first: document.getElementById("btnFirst"),
        prev: document.getElementById("btnPrev"),
        next: document.getElementById("btnNext"),
        last: document.getElementById("btnLast"),
        edgePrev: document.getElementById("edgePrev"),
        edgeNext: document.getElementById("edgeNext"),
    };

    function showEmpty(msg) {
        el.stage.hidden = true;
        el.head.hidden = true;
        el.empty.hidden = false;
        el.empty.textContent = msg;
    }

    if (!talks.length) {
        showEmpty("No talks are available yet.");
        return;
    }

    var params = new URLSearchParams(window.location.search);

    function findTalk(id) {
        for (var i = 0; i < talks.length; i++) {
            if (talks[i].id === id) return talks[i];
        }
        return null;
    }

    var talk = findTalk(params.get("talk")) || talks[0];
    var index = 0; // 0-based

    // Image path for a slide, e.g. talks/<id>/slides/07.jpg
    function srcFor(i) {
        var slide = talk.slides[i];
        var n = String(slide.n);
        var pad = talk.pad || 0;
        while (n.length < pad) n = "0" + n;
        return talk.dir + "/" + n + "." + (talk.ext || "jpg");
    }

    // Notes are plain text; blank lines split paragraphs.
    function renderNotes(text) {
        el.notes.innerHTML = "";
        if (!text || !text.trim()) {
            var none = document.createElement("p");
            none.className = "no-notes";
            none.textContent = "No notes for this slide.";
            el.notes.appendChild(none);
            return;
        }
        text.split(/\n\s*\n/).forEach(function (para) {
            var p = document.createElement("p");
            p.textContent = para.replace(/\n/g, " ");
            el.notes.appendChild(p);
        });
    }

    var preloaded = {};
    function preload(i) {
        if (i < 0 || i >= talk.slides.length || preloaded[i]) return;
        preloaded[i] = true;
        var img = new Image();
        img.src = srcFor(i);
    }

    function syncUrl() {
        var q = "?talk=" + encodeURIComponent(talk.id) + "&slide=" + (index + 1);
        window.history.replaceState(null, "", q);
    }

    function render() {
        var total = talk.slides.length;

        el.img.classList.add("loading");
        el.img.onload = function () {
            el.img.classList.remove("loading");
        };
        el.img.onerror = function () {
            el.img.classList.remove("loading");
        };
        el.img.src = srcFor(index);
        el.img.alt = "Slide " + (index + 1) + " of " + total;

        renderNotes(talk.slides[index].notes);
        el.notes.scrollTop = 0;

        el.counter.textContent = index + 1 + " / " + total;
        var pct = total > 1 ? (index / (total - 1)) * 100 : 100;
        el.bar.style.width = pct + "%";
        el.progress.setAttribute("aria-valuenow", String(index + 1));
        el.progress.setAttribute("aria-valuemin", "1");
        el.progress.setAttribute("aria-valuemax", String(total));

        var atStart = index === 0;
        var atEnd = index === total - 1;
        el.first.disabled = atStart;
        el.prev.disabled = atStart;
        el.edgePrev.disabled = atStart;
        el.next.disabled = atEnd;
        el.last.disabled = atEnd;
        el.edgeNext.disabled = atEnd;

        preload(index + 1);
        preload(index - 1);
        syncUrl();
    }

    function go(i) {
        var clamped = Math.max(0, Math.min(talk.slides.length - 1, i));
        if (clamped === index) return;
        index = clamped;
        render();
    }

    function loadTalk(t, startAt) {
        talk = t;
        preloaded = {};
        el.event.textContent = t.event || "";
        el.event.hidden = !t.event;
        el.title.textContent = t.title || "";
        var ctx = [t.context, t.date].filter(Boolean).join(" · ");
        el.context.textContent = ctx;
        el.context.hidden = !ctx;
        document.title = (t.title || "Slides") + " — Niklas Risse";
        index = Math.max(0, Math.min(t.slides.length - 1, startAt || 0));
        render();
    }

    // Talk picker, shown only once there is more than one talk
    if (talks.length > 1) {
        el.pickerWrap.hidden = false;
        talks.forEach(function (t) {
            var opt = document.createElement("option");
            opt.value = t.id;
            opt.textContent = t.event ? t.event + " — " + t.title : t.title;
            el.picker.appendChild(opt);
        });
        el.picker.value = talk.id;
        el.picker.addEventListener("change", function () {
            var t = findTalk(el.picker.value);
            if (t) loadTalk(t, 0);
        });
    }

    // Controls
    el.first.addEventListener("click", function () {
        go(0);
    });
    el.prev.addEventListener("click", function () {
        go(index - 1);
    });
    el.next.addEventListener("click", function () {
        go(index + 1);
    });
    el.last.addEventListener("click", function () {
        go(talk.slides.length - 1);
    });
    el.edgePrev.addEventListener("click", function () {
        go(index - 1);
    });
    el.edgeNext.addEventListener("click", function () {
        go(index + 1);
    });

    // Keyboard
    document.addEventListener("keydown", function (e) {
        var tag = (e.target.tagName || "").toLowerCase();
        if (tag === "input" || tag === "select" || tag === "textarea") return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        switch (e.key) {
            case "ArrowRight":
            case "PageDown":
            case " ":
                go(index + 1);
                break;
            case "ArrowLeft":
            case "PageUp":
                go(index - 1);
                break;
            case "Home":
                go(0);
                break;
            case "End":
                go(talk.slides.length - 1);
                break;
            default:
                return;
        }
        e.preventDefault();
    });

    // Swipe on the slide (touch)
    (function () {
        var x0 = null;
        var y0 = null;
        el.frame.addEventListener(
            "touchstart",
            function (e) {
                x0 = e.changedTouches[0].clientX;
                y0 = e.changedTouches[0].clientY;
            },
            { passive: true },
        );
        el.frame.addEventListener(
            "touchend",
            function (e) {
                if (x0 === null) return;
                var dx = e.changedTouches[0].clientX - x0;
                var dy = e.changedTouches[0].clientY - y0;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
                    go(dx < 0 ? index + 1 : index - 1);
                }
                x0 = null;
                y0 = null;
            },
            { passive: true },
        );
    })();

    var startAt = parseInt(params.get("slide"), 10);
    loadTalk(talk, isNaN(startAt) ? 0 : startAt - 1);
})();
