"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projects } from "@/lib/content";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SiteMotion() {
  const started = useRef(false);

  useIsoLayoutEffect(() => {
    // React strict mode mounts twice in dev — only run the intro once.
    if (started.current) return;
    started.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    let lenis = null;
    const cleanups = [];
    const on = (target, type, fn, opts) => {
      if (!target) return;
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const ctx = gsap.context(() => {
      // -------------------------------------------------------
      // Hero portrait — fall back to stock if there is no cut-out yet
      // -------------------------------------------------------
      const portrait = $(".hero__figure img");
      if (portrait) {
        const fallback = portrait.getAttribute("data-fallback");
        const swap = () => {
          if (!fallback || portrait.src === fallback) return;
          portrait.src = fallback;
          // Frames the stock photo rather than pretending it is a cut-out.
          portrait.closest(".hero__figure").classList.add("is-fallback");
        };
        on(portrait, "error", swap);
        if (portrait.complete && portrait.naturalWidth === 0) swap();
      }

      // -------------------------------------------------------
      // Fit each hero line to the viewport width
      // -------------------------------------------------------
      const heroWord = $(".hero__word");
      const heroLines = $$(".hero__line");

      const fitHero = () => {
        if (!heroWord || !heroLines.length) return;

        const avail = heroWord.clientWidth;
        if (!avail) return;

        const range = document.createRange();
        const measure = (line) => {
          range.selectNodeContents(line);
          return range.getBoundingClientRect().width;
        };

        heroLines.forEach((line) => {
          let size = 100;
          line.style.fontSize = `${size}px`;

          // Glyph advance scales linearly, so each pass lands very close.
          // Repeating absorbs the metric shift when the webfont swaps in.
          for (let pass = 0; pass < 4; pass += 1) {
            const width = measure(line);
            if (!width) return;
            if (Math.abs(width - avail) < 0.5) break;

            // The cap stops a very short word (a stray "R") ballooning.
            size = Math.min((size * avail) / width, 340);
            line.style.fontSize = `${size}px`;
          }
        });
      };

      // Webfonts change the metrics, so fit again once they have loaded.
      fitHero();
      if (document.fonts?.ready) document.fonts.ready.then(fitHero);
      on(window, "resize", fitHero);

      // -------------------------------------------------------
      // Theme toggle. The inline script in layout.jsx has already set
      // data-theme before paint; this only handles changes.
      // -------------------------------------------------------
      const root = document.documentElement;
      const themeBtn = $("#themeToggle");

      const applyTheme = (next, remember) => {
        root.setAttribute("data-theme", next);
        themeBtn?.setAttribute("aria-pressed", String(next === "dark"));
        if (remember) {
          try {
            localStorage.setItem("theme", next);
          } catch {
            /* private mode — the choice just will not persist */
          }
        }
        // Keep the browser UI (address bar) in step.
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", next === "dark" ? "#0d0d0d" : "#f4f3f1");
      };

      applyTheme(root.getAttribute("data-theme") || "light", false);

      on(themeBtn, "click", () => {
        const next =
          root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next, true);
        ScrollTrigger.refresh();
      });

      // -------------------------------------------------------
      // Smooth scroll
      // -------------------------------------------------------
      if (!reduce) {
        lenis = new Lenis({ lerp: 0.1 });
        lenis.stop();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      const scrollTo = (el) => {
        if (lenis) lenis.scrollTo(el, { offset: -70 });
        else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      };

      // -------------------------------------------------------
      // Preloader
      // -------------------------------------------------------
      const preloader = $("#preloader");
      const countEl = $("#count");
      const barEl = $("#bar");

      let pageStarted = false;
      const startPage = () => {
        // The intro timeline and a safety timeout both call this — only
        // the first one should run, so the reveal never fires twice.
        if (pageStarted) return;
        pageStarted = true;

        document.body.style.overflow = "";
        if (lenis) lenis.start();

        if (!reduce) {
          gsap.to(".hero__word > span", {
            yPercent: 0,
            duration: 1.1,
            ease: "power3.out",
          });
          gsap.from(".hero__figure", {
            yPercent: 12,
            opacity: 0,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
          });
        }

        ScrollTrigger.refresh();
      };

      if (reduce) {
        if (preloader) preloader.style.display = "none";
      } else {
        document.body.style.overflow = "hidden";
        gsap.set(".hero__word > span", { yPercent: 110 });
        gsap.set(".preloader__word > span", { yPercent: 110 });

        const progress = { v: 0 };

        gsap
          .timeline()
          .to(".preloader__word > span", {
            yPercent: 0,
            duration: 0.7,
            ease: "power3.out",
          })
          .to(
            progress,
            {
              v: 100,
              duration: 1.4,
              ease: "power2.inOut",
              onUpdate: () => {
                const n = Math.round(progress.v);
                if (countEl) countEl.textContent = n;
                if (barEl) barEl.style.width = `${n}%`;
              },
            },
            0.1
          )
          .to(".preloader__word > span, .preloader__count", {
            yPercent: -110,
            duration: 0.5,
            ease: "power3.in",
            stagger: 0.05,
          })
          .to(
            preloader,
            {
              yPercent: -100,
              duration: 0.7,
              ease: "power3.inOut",
              onComplete: startPage,
            },
            "-=0.1"
          );

        // Failsafe: if anything stalls the intro timeline, reveal the page
        // anyway so the content is never trapped behind the preloader.
        const revealFailsafe = setTimeout(() => {
          if (pageStarted) return;
          if (preloader) preloader.style.display = "none";
          startPage();
        }, 4000);
        cleanups.push(() => clearTimeout(revealFailsafe));
      }

      // -------------------------------------------------------
      // Sticky header + back-to-top visibility
      // -------------------------------------------------------
      const header = $("#header");
      const toTop = $("#toTop");

      const onScroll = () => {
        if (header) header.classList.toggle("is-stuck", window.scrollY > 40);
        if (toTop) toTop.classList.toggle("is-shown", window.scrollY > 700);
      };

      on(window, "scroll", onScroll, { passive: true });
      onScroll();

      // -------------------------------------------------------
      // Offcanvas menu
      // -------------------------------------------------------
      const offcanvas = $("#offcanvas");
      const scrim = $("#scrim");
      const menuBtn = $("#menuBtn");

      const setMenu = (open) => {
        if (!offcanvas) return;

        offcanvas.classList.toggle("is-open", open);
        if (scrim) scrim.classList.toggle("is-open", open);
        offcanvas.setAttribute("aria-hidden", String(!open));
        if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
        if (lenis) (open ? lenis.stop() : lenis.start());
        document.body.style.overflow = open ? "hidden" : "";

        if (open) {
          const first = offcanvas.querySelector("a");
          if (first) first.focus();
        } else if (menuBtn) {
          menuBtn.focus();
        }
      };

      on(menuBtn, "click", () => setMenu(true));
      on($("#menuClose"), "click", () => setMenu(false));
      on(scrim, "click", () => setMenu(false));

      // -------------------------------------------------------
      // Project popup
      // -------------------------------------------------------
      const popup = $("#popup");

      const setPopup = (open, project) => {
        if (!popup) return;

        if (open && project) {
          $("#popupKicker").textContent = `${project.role} · ${project.year}`;
          $("#popupTitle").textContent = project.title;
          $("#popupBody").textContent = project.meta;

          const img = $("#popupImage");
          img.src = project.image;
          img.alt = project.title;

          const stack = $("#popupTags");
          stack.innerHTML = "";
          project.stack.forEach((item) => {
            const span = document.createElement("span");
            span.textContent = item;
            stack.appendChild(span);
          });

          // Only show the link when the project actually has one.
          const link = $("#popupLink");
          if (project.href) {
            link.href = project.href;
            link.style.display = "";
          } else {
            link.style.display = "none";
          }
        }

        popup.classList.toggle("is-open", open);
        popup.setAttribute("aria-hidden", String(!open));
        if (lenis) (open ? lenis.stop() : lenis.start());
        document.body.style.overflow = open ? "hidden" : "";
      };

      on(document, "click", (e) => {
        const opener = e.target.closest("[data-project]");
        if (opener) {
          setPopup(true, projects[Number(opener.getAttribute("data-project"))]);
          return;
        }
        if (e.target.id === "popupClose" || e.target.id === "popup") {
          setPopup(false);
        }
      });

      // Cards are focusable, so let the keyboard open them too.
      $$("[data-project]").forEach((card) => {
        on(card, "keydown", (e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          setPopup(true, projects[Number(card.getAttribute("data-project"))]);
        });
      });

      on(document, "keydown", (e) => {
        if (e.key !== "Escape") return;
        setPopup(false);
        setMenu(false);
      });

      // -------------------------------------------------------
      // Ripple
      // -------------------------------------------------------
      $$("[data-ripple]").forEach((btn) => {
        on(btn, "click", (e) => {
          if (reduce) return;

          const rect = btn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * 2;
          const span = document.createElement("span");

          span.className = "ripple";
          span.style.width = `${size}px`;
          span.style.height = `${size}px`;
          span.style.left = `${e.clientX - rect.left - size / 2}px`;
          span.style.top = `${e.clientY - rect.top - size / 2}px`;
          btn.appendChild(span);

          gsap.to(span, {
            scale: 1,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => span.remove(),
          });
        });
      });

      // -------------------------------------------------------
      // Reveals — also drives the orange flip on the years badge
      // -------------------------------------------------------
      $$("[data-reveal], [data-fade], [data-badge]").forEach((el) => {
        if (reduce) {
          el.classList.add("is-in");
          return;
        }
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => el.classList.add("is-in"),
        });
      });

      // -------------------------------------------------------
      // Statement — words light up as the section scrolls through
      // -------------------------------------------------------
      const statement = $("#statementText");

      if (statement) {
        const words = Array.from(statement.querySelectorAll(".statement__word"));

        if (reduce) {
          words.forEach((w) => w.classList.add("is-lit"));
        } else {
          ScrollTrigger.create({
            trigger: statement,
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
            onUpdate: (self) => {
              // Light every word up to the scroll position, unlight the rest.
              const lit = Math.round(self.progress * words.length);
              words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
            },
          });
        }
      }

      // -------------------------------------------------------
      // Service rows drift sideways in alternating directions
      // -------------------------------------------------------
      const drift = () =>
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--svc-drift")
        ) || 0;

      if (!reduce) {
        $$(".svc").forEach((row, i) => {
          const dir = i % 2 ? 1 : -1;
          gsap.fromTo(
            row,
            { x: dir * drift() },
            {
              x: -dir * drift(),
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }

      // -------------------------------------------------------
      // Years badge — leans toward the pointer
      // -------------------------------------------------------
      const badge = $("[data-badge]");

      if (badge && canHover && !reduce) {
        const host = badge.closest(".bio") || badge.parentElement;
        const toX = gsap.quickTo(badge, "x", { duration: 0.6, ease: "power3.out" });
        const toY = gsap.quickTo(badge, "y", { duration: 0.6, ease: "power3.out" });
        const inner = badge.querySelector("b");
        const inX = gsap.quickTo(inner, "x", { duration: 0.8, ease: "power3.out" });
        const inY = gsap.quickTo(inner, "y", { duration: 0.8, ease: "power3.out" });

        const onMove = (e) => {
          const box = badge.getBoundingClientRect();
          const cx = box.left + box.width / 2;
          const cy = box.top + box.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const reach = box.width * 1.9;

          if (dist > reach) {
            toX(0);
            toY(0);
            inX(0);
            inY(0);
            badge.classList.remove("is-near");
            return;
          }

          // Pull harder the closer the pointer gets.
          const pull = (1 - dist / reach) * 0.42;
          toX(dx * pull);
          toY(dy * pull);
          inX(dx * pull * 0.35);
          inY(dy * pull * 0.35);
          badge.classList.add("is-near");
        };

        on(host, "mousemove", onMove);
        on(host, "mouseleave", () => {
          toX(0);
          toY(0);
          inX(0);
          inY(0);
          badge.classList.remove("is-near");
        });
      }

      // -------------------------------------------------------
      // Marquee rows — clone the set until half the track covers the
      // viewport, otherwise the -50% loop leaves a visible gap on short
      // rows. Translating by a whole number of sets keeps it seamless.
      // -------------------------------------------------------
      const fillMarquees = () => {
        $$(".stack-marquee").forEach((mq) => {
          const track = mq.querySelector(".stack-marquee__track");
          if (!track || !track.firstElementChild) return;

          const base = track.firstElementChild;
          const setWidth = base.getBoundingClientRect().width;
          const needed = mq.clientWidth;

          // Bail unless both measurements are real, positive numbers. A
          // sub-pixel or NaN setWidth (fonts not yet swapped, a collapsed
          // row, a hidden tab) would otherwise blow `needed / setWidth` up
          // into the millions and the clone loop below would never end.
          if (!(setWidth > 1) || !(needed > 0)) return;

          // Sets per half, then two halves so -50% lands on a repeat.
          // Hard-capped so a bad measurement can never freeze the page.
          const perHalf = Math.max(1, Math.ceil(needed / setWidth));
          const target = Math.min(perHalf * 2, 12);

          while (track.children.length > target) {
            track.lastElementChild.remove();
          }
          while (track.children.length < target) {
            const copy = base.cloneNode(true);
            copy.setAttribute("aria-hidden", "true");
            track.appendChild(copy);
          }
        });
      };

      fillMarquees();
      if (document.fonts?.ready) document.fonts.ready.then(fillMarquees);
      on(window, "resize", fillMarquees);

      // -------------------------------------------------------
      // Tech tiles — pop in one after another, per group
      // -------------------------------------------------------
      $$(".stack-group").forEach((group) => {
        const tiles = Array.from(group.querySelectorAll(".tech"));
        if (!tiles.length) return;

        if (reduce) return;

        // Hidden from JS so a no-JS page still shows the whole grid.
        gsap.set(tiles, { opacity: 0, y: 18, scale: 0.86 });

        ScrollTrigger.create({
          trigger: group,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(tiles, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.7)",
              stagger: 0.04,
              // Hand control back to CSS so :hover transforms work after.
              clearProps: "transform",
            }),
        });
      });

      // -------------------------------------------------------
      // Counters
      // -------------------------------------------------------
      $$("[data-count]").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";

        if (reduce) {
          el.textContent = `${target}${suffix}`;
          return;
        }

        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.v)}${suffix}`;
              },
            });
          },
        });
      });

      // -------------------------------------------------------
      // "View" bubble that trails the pointer over the work cards
      // -------------------------------------------------------
      const worksCards = $("#worksCards");
      const follow = $("#worksFollow");

      if (worksCards && follow && canHover && !reduce) {
        const works = worksCards.closest(".works");
        const toX = gsap.quickTo(follow, "x", { duration: 0.4, ease: "power3.out" });
        const toY = gsap.quickTo(follow, "y", { duration: 0.4, ease: "power3.out" });

        on(worksCards, "mousemove", (e) => {
          const box = works.getBoundingClientRect();
          const half = follow.offsetWidth / 2;
          toX(e.clientX - box.left - half);
          toY(e.clientY - box.top - half);
        });

        on(worksCards, "mouseenter", () =>
          gsap.to(follow, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" })
        );
        on(worksCards, "mouseleave", () =>
          gsap.to(follow, { opacity: 0, scale: 0.7, duration: 0.3, ease: "power3.out" })
        );
      }

      // -------------------------------------------------------
      // Cursor-following preview on the recognition rows
      // -------------------------------------------------------
      const peekHost = $("#awardRows");
      const peek = $("#peek");

      if (peekHost && peek && canHover && !reduce) {
        const toX = gsap.quickTo(peek, "x", { duration: 0.55, ease: "power3.out" });
        const toY = gsap.quickTo(peek, "y", { duration: 0.55, ease: "power3.out" });
        const half = () => peek.getBoundingClientRect().width / 2;

        on(peekHost, "mousemove", (e) => {
          const box = peekHost.getBoundingClientRect();
          toX(e.clientX - box.left - half());
          toY(e.clientY - box.top - half() * 1.2);
        });

        $$(".row").forEach((row) => {
          on(row, "mouseenter", () => {
            peek.style.backgroundImage = `url("${row.getAttribute("data-peek")}")`;
            gsap.to(peek, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
          });
          on(row, "mouseleave", () => {
            gsap.to(peek, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power3.out" });
          });
        });
      }

      // -------------------------------------------------------
      // Experience slider — native snap scrolling, dots stay in sync
      // -------------------------------------------------------
      const viewport = $(".voices__viewport");
      const dots = $$("#voicesDots button");

      if (viewport && dots.length) {
        const slides = $$(".voice");

        dots.forEach((dot, i) => {
          on(dot, "click", () => {
            const slide = slides[i];
            if (!slide) return;
            // scrollIntoView cooperates with scroll-snap; a plain scrollTo
            // with behavior:"smooth" gets swallowed by mandatory snapping.
            slide.scrollIntoView({
              behavior: reduce ? "auto" : "smooth",
              inline: "center",
              block: "nearest",
            });
          });
        });

        // Whichever slide is nearest the centre owns the active dot.
        const syncDots = () => {
          const mid = viewport.scrollLeft + viewport.clientWidth / 2;
          let best = 0;
          let bestGap = Infinity;

          slides.forEach((slide, i) => {
            const gap = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - mid);
            if (gap < bestGap) {
              bestGap = gap;
              best = i;
            }
          });

          dots.forEach((dot, i) =>
            dot.setAttribute("aria-selected", String(i === best))
          );
        };

        on(viewport, "scroll", syncDots, { passive: true });
        syncDots();
      }

      // -------------------------------------------------------
      // Magic cursor
      // -------------------------------------------------------
      const cursor = $("#cursor");

      if (cursor && canHover && !reduce) {
        on(window, "mousemove", (e) => {
          gsap.to(cursor, {
            x: e.clientX - 8,
            y: e.clientY - 8,
            duration: 0.45,
            ease: "power3.out",
          });
        });

        $$("a, button, .svc, .logo, .wcard").forEach((el) => {
          on(el, "mouseenter", () => gsap.to(cursor, { scale: 2.8, duration: 0.3 }));
          on(el, "mouseleave", () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
        });
      }

      // -------------------------------------------------------
      // Anchors and back to top
      // -------------------------------------------------------
      $$('a[href^="#"]').forEach((a) => {
        on(a, "click", (e) => {
          const id = a.getAttribute("href");
          if (!id || id.length < 2) return;

          const el = document.querySelector(id);
          if (!el) return;

          e.preventDefault();
          setMenu(false);
          scrollTo(el);
        });
      });

      const goTop = () => {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      };

      on(toTop, "click", goTop);
      on($("#toTopFooter"), "click", goTop);

      // -------------------------------------------------------
      // Contact form — validates, then POSTs to /api/contact (Gmail SMTP).
      // -------------------------------------------------------
      const form = $("#contactForm");

      if (form) {
        on(form, "submit", async (e) => {
          e.preventDefault();

          const note = $("#formNote");
          const submitBtn = form.querySelector('button[type="submit"]');
          const fd = new FormData(form);
          const missing = ["name", "email", "message"].filter(
            (k) => !String(fd.get(k) || "").trim()
          );

          if (missing.length) {
            note.textContent =
              "Fill in your name, email and message before sending.";
            return;
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get("email")))) {
            note.textContent = "That email address doesn't look right.";
            return;
          }

          const payload = {
            name: String(fd.get("name")).trim(),
            email: String(fd.get("email")).trim(),
            message: String(fd.get("message")).trim(),
          };

          note.textContent = "Sending…";
          if (submitBtn) submitBtn.disabled = true;

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
              note.textContent =
                "Thanks — your message is on its way. I'll be in touch soon.";
              form.reset();
            } else {
              note.textContent =
                data.error || "Something went wrong. Please try again.";
            }
          } catch {
            note.textContent =
              "Couldn't reach the server. Please try again later.";
          } finally {
            if (submitBtn) submitBtn.disabled = false;
          }
        });
      }
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      if (lenis) lenis.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
