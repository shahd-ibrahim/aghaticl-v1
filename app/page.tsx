"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MENU_DATA,
  SET_MENU_DATA,
  ALLERGEN_LABELS,
  TOTAL_MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
} from "../data/menuData";

function normalizeText(str: string): string {
  return String(str || "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();
}

// Temporarily disabled QR lock so root URL "/" opens directly in Demo Mode.
// Set REQUIRE_QR_LOCK = true to re-enable the ?qr=valid gate later.
const REQUIRE_QR_LOCK = false;

export default function AghattiCosmicGastronomyApp() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [unlocked, setUnlocked] = useState<boolean>(!REQUIRE_QR_LOCK);
  const [tableNum, setTableNum] = useState<string>("01");
  const [selectedCatIdx, setSelectedCatIdx] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [showSetMenu, setShowSetMenu] = useState<boolean>(false);
  const [showFullIndex, setShowFullIndex] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxDish, setLightboxDish] = useState<MenuItem | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isValid =
      !REQUIRE_QR_LOCK ||
      params.get("qr") === "valid" ||
      sessionStorage.getItem("aghatti_qr") === "true";
    const t = String(
      params.get("t") || sessionStorage.getItem("aghatti_table") || "01"
    ).padStart(2, "0");
    setTableNum(t);
    if (isValid) {
      sessionStorage.setItem("aghatti_qr", "true");
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // Ambient Turquoise (#1ECAD3) & Light Blue (#63D2FF) Star-Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const palette = ["#1ECAD3", "#63D2FF", "#FFFFFF"];
    const stars = Array.from({ length: 90 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.7 + Math.random() * 1.7,
      vy: -0.12 - Math.random() * 0.24,
      vx: (Math.random() - 0.5) * 0.12,
      color: palette[i % palette.length],
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.vy;
        s.x += s.vx;
        if (s.y < -8) s.y = h + 8;
        if (s.x < -8) s.x = w + 8;
        if (s.x > w + 8) s.x = -8;
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.28 + 0.5 * Math.sin(t * 0.002 + s.phase);
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const searchMatches = useMemo(() => {
    const q = normalizeText(searchQuery);
    if (!q) return [];
    const results: Array<{
      cat: MenuCategory;
      catIdx: number;
      item: MenuItem;
      dishIdx: number;
    }> = [];
    MENU_DATA.forEach((cat, catIdx) => {
      const catBlob = normalizeText(
        `${cat.name.ar} ${cat.name.en} ${cat.subtitle.ar} ${cat.subtitle.en}`
      );
      cat.items.forEach((item, dishIdx) => {
        const itemBlob = normalizeText(
          `${item.name.ar} ${item.name.en} ${item.desc.ar} ${item.desc.en}`
        );
        if (itemBlob.includes(q) || catBlob.includes(q)) {
          results.push({ cat, catIdx, item, dishIdx });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const activeCategory: MenuCategory | null =
    selectedCatIdx !== null ? MENU_DATA[selectedCatIdx] : null;
  const activeDish: MenuItem | null = activeCategory
    ? activeCategory.items[slideIdx]
    : null;

  const goToCategoryAndDish = (
    catIdx: number,
    dishIdx: number,
    openLightboxAfter = false
  ) => {
    setShowFullIndex(false);
    setSearchQuery("");
    setSelectedCatIdx(catIdx);
    setSlideIdx(dishIdx);
    if (openLightboxAfter) {
      setLightboxDish(MENU_DATA[catIdx].items[dishIdx]);
    }
  };

  const nextSlide = () => {
    if (!activeCategory) return;
    setSlideIdx((prev) => (prev + 1) % activeCategory.items.length);
  };

  const prevSlide = () => {
    if (!activeCategory) return;
    setSlideIdx(
      (prev) =>
        (prev - 1 + activeCategory.items.length) % activeCategory.items.length
    );
  };

  return (
    <div className="relative min-h-dvh bg-[#030609] text-[#F5F8FA] overflow-x-hidden select-none">
      {/* Hidden SVG Filters for Official Aghatti PNG Logos on Dark Background */}
      <svg
        width="0"
        height="0"
        className="absolute w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="aghattiOutlineCrisp"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feMorphology
              in="SourceGraphic"
              operator="dilate"
              radius="0.35"
              result="dilated"
            />
            <feComponentTransfer in="dilated">
              <feFuncA type="linear" slope="4.8" intercept="0" />
            </feComponentTransfer>
          </filter>
          <filter
            id="aghattiMainDark"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              type="matrix"
              values="1.15 0 0 0 0.04  0 1.12 0 0 0.03  0 0 1.10 0 0.02  -1.85 -0.65 -1.85 0 4.25"
            />
          </filter>
        </defs>
      </svg>

      {/* Ambient Star-Particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* QR Lock Screen */}
      {!unlocked && (
        <div className="fixed inset-0 z-50 bg-[#06090D]/95 backdrop-blur-xl flex items-center justify-center p-6 text-center">
          <div className="max-w-sm w-full rounded-3xl border border-[#1ECAD3] bg-[#0B1016] p-7 shadow-[0_0_45px_rgba(30,202,211,0.22)]">
            <img
              src="./brand/logo-main.png"
              alt="Aghatti Iraqi Cuisine"
              className="h-28 w-auto mx-auto mb-4 object-contain"
              style={{
                filter:
                  "url(#aghattiMainDark) drop-shadow(0 0 14px rgba(30,202,211,0.4))",
              }}
            />
            <h2 className="text-xl font-extrabold text-white mb-2">
              يرجى مسح الباركود على الطاولة
            </h2>
            <p className="text-xs text-[#98A4B3] leading-relaxed mb-5">
              هذا المنيو مخصص للضيوف داخل مطعم أغاتي عبر رمز QR الخاص بالطاولة.
              <br />
              Please scan the table QR code to access the menu.
            </p>
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("aghatti_qr", "true");
                setUnlocked(true);
              }}
              className="px-6 py-2.5 rounded-full font-extrabold text-sm bg-gradient-to-r from-[#1ECAD3] to-[#63D2FF] text-[#05080C] shadow-[0_0_20px_rgba(30,202,211,0.45)] cursor-pointer"
            >
              معاينة تجريبية (Demo Bypass)
            </button>
          </div>
        </div>
      )}

      {/* Main Cosmic Gastronomy Frame */}
      <div className="relative z-10 max-w-4xl mx-auto min-h-dvh p-3 flex flex-col">
        <div className="flex-1 rounded-3xl border border-[#1ECAD3]/45 bg-gradient-to-b from-[#10202E]/90 to-[#070A0E]/95 p-4 sm:p-5 flex flex-col justify-between shadow-[0_25px_75px_rgba(0,0,0,0.85)]">
          {/* Header */}
          <header className="flex items-center justify-between gap-2 pb-2.5 flex-wrap">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedCatIdx(null)}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <img
                  src="./brand/logo-outline.png"
                  alt="Aghatti Logo"
                  className="h-12 w-auto object-contain"
                  style={{
                    filter:
                      "url(#aghattiOutlineCrisp) drop-shadow(0 0 8px rgba(30,202,211,0.5))",
                  }}
                />
                <div className="text-start leading-tight">
                  <div className="text-base font-black text-white">أغاتي</div>
                  <div className="text-[10px] font-bold tracking-widest text-[#63D2FF]">
                    AGHATTI • IRAQI CUISINE
                  </div>
                </div>
              </button>

              {activeCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCatIdx(null)}
                  className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#1ECAD3] to-[#63D2FF] text-[#04080C] shadow-[0_0_20px_rgba(30,202,211,0.55)] cursor-pointer"
                >
                  ← الأقسام / Categories
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-[#63D2FF]">
                {lang === "ar" ? `طاولة #${tableNum}` : `Table #${tableNum}`}
              </span>
              <button
                type="button"
                onClick={() => setShowSetMenu(true)}
                className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#1ECAD3]/15 border border-[#1ECAD3]/45 text-[#63D2FF] hover:bg-[#1ECAD3] hover:text-[#04080C] transition cursor-pointer"
              >
                {lang === "ar" ? "✦ قائمة الغداء 115 ر.س" : "✦ Set Menu 115 SAR"}
              </button>
              <button
                type="button"
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#1ECAD3]/15 border border-[#1ECAD3]/45 text-[#63D2FF] hover:bg-[#1ECAD3] hover:text-[#04080C] transition cursor-pointer"
              >
                {lang === "ar" ? "EN" : "عربي"}
              </button>
            </div>
          </header>

          {/* Top Live Search Bar & "القائمة الشاملة / Full Index" Button */}
          <div className="relative z-30 flex items-center gap-2 pb-3 mb-1 border-b border-[#1ECAD3]/20">
            <div className="relative flex-1 flex items-center">
              <span className="absolute start-3.5 text-xs text-[#1ECAD3] pointer-events-none">
                🔍
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "ابحث بالاسم أو القسم... / Search menu..."
                    : "Search dish or category... / ابحث في المنيو"
                }
                className="w-full rounded-full bg-[#070C12]/90 border border-[#1ECAD3]/40 py-2 ps-9 pe-8 text-xs font-semibold text-white placeholder:text-[#98A4B3] focus:outline-none focus:border-[#63D2FF]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute end-2.5 w-5 h-5 rounded-full bg-white/15 text-white text-xs font-bold grid place-items-center cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setShowFullIndex(true);
              }}
              className="shrink-0 px-3.5 py-2 rounded-full border border-[#1ECAD3] bg-[#1ECAD3]/20 text-white text-xs font-black hover:bg-gradient-to-r hover:from-[#1ECAD3] hover:to-[#63D2FF] hover:text-[#04080C] transition cursor-pointer flex items-center gap-1.5"
            >
              <span>☰</span>
              <span>
                {lang === "ar"
                  ? "القائمة الشاملة / Full Index"
                  : "Full Index / القائمة الشاملة"}
              </span>
            </button>

            {/* Real-Time Text Search Results Overlay */}
            {searchQuery.trim() !== "" && (
              <div className="absolute top-full inset-x-0 mt-1 max-h-80 overflow-y-auto rounded-2xl border border-[#1ECAD3] bg-[#080D14]/98 p-2 shadow-2xl z-50">
                {searchMatches.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#98A4B3]">
                    {lang === "ar"
                      ? "لا توجد أطباق مطابقة لبحثك"
                      : "No matching dishes found"}
                  </div>
                ) : (
                  searchMatches.map((m) => (
                    <button
                      key={`${m.cat.id}-${m.item.id}`}
                      type="button"
                      onClick={() =>
                        goToCategoryAndDish(m.catIdx, m.dishIdx, true)
                      }
                      className="w-full p-2.5 rounded-xl flex items-center justify-between gap-2 text-start hover:bg-[#1ECAD3]/15 transition border-b border-white/5 last:border-none cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-extrabold text-white">
                          {m.item.name.ar}{" "}
                          <span className="text-[11px] font-semibold text-[#98A4B3]">
                            • {m.item.name.en}
                          </span>
                        </div>
                        <span className="inline-block mt-0.5 text-[10px] font-extrabold text-[#63D2FF] bg-[#63D2FF]/15 border border-[#63D2FF]/30 px-2 py-0.5 rounded-full">
                          {m.cat.name.ar} | {m.cat.name.en}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {m.item.calories !== undefined &&
                          m.item.calories > 0 && (
                            <span className="text-[11px] font-bold text-[#63D2FF]">
                              {m.item.calories} cal
                            </span>
                          )}
                        <span className="text-xs font-black text-[#1ECAD3] bg-[#1ECAD3]/15 border border-[#1ECAD3]/35 px-2.5 py-1 rounded-full">
                          {m.item.price} {lang === "ar" ? "ر.س" : "SAR"}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {!activeCategory ? (
            /* ================================================================
               VIEW 1: FULL-SCREEN SPACE-AGE CATEGORY PORTAL
               ================================================================ */
            <section className="py-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-center mb-3">
                  <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-[#1ECAD3]/15 border border-[#1ECAD3]/35 text-[#63D2FF] mb-1">
                    ✦{" "}
                    {lang === "ar"
                      ? `بوابة الأقسام الفضائية • 10 أقسام • ${TOTAL_MENU_ITEMS} طبقاً فاخراً`
                      : `Space-Age Category Portal • 10 Categories • ${TOTAL_MENU_ITEMS} Dishes`}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    {lang === "ar"
                      ? "منيو أغاتي للمأكولات العراقية الفاخرة"
                      : "Aghatti Luxury Iraqi Gastronomy Menu"}
                  </h1>
                </div>

                {/* Highlighted SET MENU (115 SAR) Banner */}
                <div
                  onClick={() => setShowSetMenu(true)}
                  role="button"
                  tabIndex={0}
                  className="mb-3 p-3.5 rounded-2xl border border-[#1ECAD3] bg-gradient-to-r from-[#1ECAD3]/20 via-[#0D1924] to-[#63D2FF]/20 flex items-center justify-between gap-3 cursor-pointer shadow-[0_0_25px_rgba(30,202,211,0.22)] hover:scale-[1.01] transition"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-[#1ECAD3] to-[#63D2FF] text-[#04080C] mb-1">
                      ✦ SPECIAL SET MENU
                    </span>
                    <div className="text-base font-black text-white">
                      {SET_MENU_DATA.title[lang]}
                    </div>
                    <div className="text-xs text-[#98A4B3]">
                      {SET_MENU_DATA.subtitle[lang]}
                    </div>
                  </div>
                  <div className="shrink-0 px-4 py-2 rounded-2xl bg-[#070A0E] border border-[#63D2FF] text-center">
                    <strong className="block text-base font-black text-[#1ECAD3]">
                      115 SAR
                    </strong>
                    <span className="text-[10px] font-bold text-[#63D2FF]">
                      {lang === "ar" ? "للشخص" : "Per Person"}
                    </span>
                  </div>
                </div>

                {/* 10 Holographic Category Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {MENU_DATA.map((cat, idx) => (
                    <article
                      key={cat.id}
                      onClick={() => goToCategoryAndDish(idx, 0, false)}
                      className="rounded-2xl border border-[#1ECAD3]/35 bg-[#0D1620]/90 p-2.5 flex flex-col justify-between cursor-pointer hover:border-[#63D2FF] hover:shadow-[0_0_24px_rgba(30,202,211,0.35)] transition"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#1ECAD3]/15 border border-[#1ECAD3]/35 text-[#1ECAD3]">
                          {String(cat.order).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#63D2FF]/15 border border-[#63D2FF]/35 text-[#63D2FF]">
                          {lang === "ar"
                            ? `${cat.items.length} أطباق`
                            : `${cat.items.length} Dishes`}
                        </span>
                      </div>
                      <div className="w-full h-24 rounded-t-[44px] rounded-b-xl overflow-hidden border border-[#1ECAD3]/45 mb-2 bg-[#060A0E]">
                        <img
                          src={cat.thumbnail}
                          alt={cat.name.ar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-extrabold text-white leading-tight">
                          {cat.name.ar}
                        </div>
                        <div className="text-[10.5px] font-bold text-[#63D2FF]">
                          {cat.name.en}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            /* ================================================================
               VIEW 2: ANTI-GRAVITY DISH SHOWCASE INSIDE SELECTED CATEGORY
               ================================================================ */
            <section className="py-2 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-2xl bg-[#1ECAD3]/10 border border-[#1ECAD3]/25">
                <span className="text-sm font-black text-white">
                  {activeCategory.name.ar} | {activeCategory.name.en}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#63D2FF]/15 border border-[#63D2FF]/35 text-[#63D2FF]">
                    {slideIdx + 1} / {activeCategory.items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCatIdx(null)}
                    className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#1ECAD3]/20 border border-[#1ECAD3]/45 text-[#63D2FF] cursor-pointer"
                  >
                    ← الأقسام / Categories
                  </button>
                </div>
              </div>

              {/* Center Anti-Gravity Arch-Portal Stage */}
              <main
                className="relative flex-1 min-h-[330px] flex items-center justify-center my-2"
                onTouchStart={(e) => {
                  touchStartX.current = e.changedTouches[0].screenX;
                }}
                onTouchEnd={(e) => {
                  const diff = e.changedTouches[0].screenX - touchStartX.current;
                  if (Math.abs(diff) > 36) {
                    if (lang === "ar") {
                      diff > 0 ? nextSlide() : prevSlide();
                    } else {
                      diff < 0 ? nextSlide() : prevSlide();
                    }
                  }
                }}
              >
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute right-2 z-20 w-11 h-11 rounded-full border border-[#1ECAD3] bg-[#070C12]/85 text-[#1ECAD3] text-xl font-black grid place-items-center shadow-[0_0_18px_rgba(30,202,211,0.4)] cursor-pointer"
                  aria-label="Previous Dish"
                >
                  ‹
                </button>

                <div className="w-[244px] h-[320px] rounded-t-[140px] rounded-b-[24px] border-2 border-[#1ECAD3] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_28px_rgba(30,202,211,0.38)] overflow-hidden">
                  {activeDish && (
                    <img
                      src={activeDish.image}
                      alt={activeDish.name.ar}
                      onClick={() => setLightboxDish(activeDish)}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute left-2 z-20 w-11 h-11 rounded-full border border-[#1ECAD3] bg-[#070C12]/85 text-[#1ECAD3] text-xl font-black grid place-items-center shadow-[0_0_18px_rgba(30,202,211,0.4)] cursor-pointer"
                  aria-label="Next Dish"
                >
                  ›
                </button>
              </main>

              {/* Bottom Dish Readout */}
              {activeDish && (
                <div className="text-center px-2">
                  <h2 className="text-xl font-black text-white">
                    {activeDish.name.ar}
                  </h2>
                  <div className="text-xs font-bold text-[#63D2FF] mb-1">
                    {activeDish.name.en}
                  </div>
                  <p className="text-xs text-[#98A4B3] max-w-md mx-auto mb-2">
                    {activeDish.desc[lang]}
                  </p>
                  <div className="flex items-center justify-center gap-2.5 mb-2 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full font-black text-sm bg-gradient-to-r from-[#1ECAD3] to-[#63D2FF] text-[#04080C]">
                      {activeDish.price} {lang === "ar" ? "ر.س" : "SAR"}
                    </span>
                    {activeDish.calories !== undefined &&
                      activeDish.calories > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#63D2FF]/15 border border-[#63D2FF]/35 text-[#63D2FF]">
                          {activeDish.calories} cal
                        </span>
                      )}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap mb-2">
                    {activeDish.allergens.map((al) => (
                      <span
                        key={al}
                        className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200"
                      >
                        {ALLERGEN_LABELS[al].icon} {ALLERGEN_LABELS[al].ar} •{" "}
                        {ALLERGEN_LABELS[al].en}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* ====================================================================
          COMPREHENSIVE TEXT-ONLY MASTER MENU INDEX ("القائمة الشاملة / Full Index")
          ==================================================================== */}
      {showFullIndex && (
        <div
          className="fixed inset-0 z-50 bg-black/88 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowFullIndex(false)}
        >
          <div
            className="max-w-2xl w-full h-[86dvh] rounded-3xl border border-[#1ECAD3] bg-gradient-to-b from-[#0D1620] to-[#060A0F] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#1ECAD3]/25 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">
                  {lang === "ar"
                    ? "القائمة الشاملة • Full Master Index"
                    : "Full Master Menu Index • القائمة الشاملة"}
                </h2>
                <p className="text-xs text-[#63D2FF]">
                  {lang === "ar"
                    ? "اضغط على أي طبق للانتقال الفوري إلى صورته داخل القوس التفاعلي"
                    : "Tap any dish row to jump directly to its photo in the Center Arch Carousel"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullIndex(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Set Menu Row */}
              <div>
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1ECAD3]/35 text-sm font-black text-[#1ECAD3]">
                  <span>✦ {SET_MENU_DATA.title.ar}</span>
                  <span>115 {lang === "ar" ? "ر.س" : "SAR"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowFullIndex(false);
                    setShowSetMenu(true);
                  }}
                  className="w-full py-2 px-2.5 rounded-xl flex items-baseline justify-between gap-2 hover:bg-[#1ECAD3]/15 transition text-start cursor-pointer"
                >
                  <span className="text-xs font-extrabold text-white">
                    {SET_MENU_DATA.title[lang]}
                  </span>
                  <span className="flex-1 border-b border-dotted border-white/20 mx-2" />
                  <span className="text-xs font-black text-[#1ECAD3]">
                    115 {lang === "ar" ? "ر.س" : "SAR"}
                  </span>
                </button>
              </div>

              {/* All 10 Categories in Pure Fast-Scanning Text (NO Images) */}
              {MENU_DATA.map((cat, catIdx) => (
                <div key={cat.id}>
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1ECAD3]/35 text-sm font-black text-[#1ECAD3]">
                    <span>
                      {String(cat.order).padStart(2, "0")}. {cat.name.ar} |{" "}
                      {cat.name.en}
                    </span>
                    <span className="text-xs text-[#63D2FF]">
                      {cat.items.length} {lang === "ar" ? "أطباق" : "Dishes"}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {cat.items.map((item, dishIdx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          goToCategoryAndDish(catIdx, dishIdx, false)
                        }
                        className="w-full py-2 px-2.5 rounded-xl flex items-baseline justify-between gap-2 hover:bg-[#1ECAD3]/15 transition text-start cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-extrabold text-white">
                            {item.name.ar}
                          </span>
                          <span className="text-[11px] text-[#98A4B3] ms-1.5">
                            {item.name.en}
                          </span>
                        </div>
                        <span className="flex-1 border-b border-dotted border-white/20 mx-2" />
                        <div className="flex items-center gap-2.5 shrink-0">
                          {item.calories !== undefined && item.calories > 0 && (
                            <span className="text-[11px] font-bold text-[#63D2FF]">
                              {item.calories} cal
                            </span>
                          )}
                          <span className="text-xs font-black text-[#1ECAD3] min-w-[54px] text-end">
                            {item.price} {lang === "ar" ? "ر.س" : "SAR"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SET MENU MODAL (115 SAR) */}
      {showSetMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowSetMenu(false)}
        >
          <div
            className="max-w-md w-full rounded-3xl border border-[#1ECAD3] bg-[#0B141E] p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#1ECAD3] to-[#63D2FF] text-[#04080C]">
                {SET_MENU_DATA.unit[lang]}
              </span>
              <button
                type="button"
                onClick={() => setShowSetMenu(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <h2 className="text-lg font-black text-white">
              {SET_MENU_DATA.title[lang]}
            </h2>
            <p className="text-xs text-[#98A4B3]">
              {SET_MENU_DATA.subtitle[lang]}
            </p>
            <div className="space-y-2 pt-1">
              {SET_MENU_DATA.courses.map((c) => (
                <div
                  key={c.step}
                  className="p-2.5 rounded-xl bg-[#1ECAD3]/10 border border-[#1ECAD3]/25 flex gap-2.5"
                >
                  <span className="px-2 py-0.5 h-fit rounded-full text-[10px] font-black bg-[#1ECAD3] text-[#04080C]">
                    {c.step}
                  </span>
                  <div>
                    <div className="text-xs font-black text-white">
                      {c.title.ar} • {c.title.en}
                    </div>
                    <div className="text-[11px] text-[#98A4B3]">
                      {c.detail[lang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULL-VIEW DISH LIGHTBOX */}
      {lightboxDish && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxDish(null)}
        >
          <div
            className="max-w-sm w-full rounded-3xl border border-[#1ECAD3] bg-[#0B141E] p-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxDish.image}
              alt={lightboxDish.name.ar}
              className="w-56 h-72 mx-auto rounded-t-[120px] rounded-b-2xl object-cover border-2 border-[#1ECAD3] mb-3"
            />
            <h3 className="text-lg font-black text-white">
              {lightboxDish.name.ar}
            </h3>
            <div className="text-xs font-bold text-[#63D2FF] mb-2">
              {lightboxDish.name.en}
            </div>
            <p className="text-xs text-[#98A4B3] mb-3">
              {lightboxDish.desc[lang]}
            </p>
            <button
              type="button"
              onClick={() => setLightboxDish(null)}
              className="px-6 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#1ECAD3] to-[#63D2FF] text-[#04080C] cursor-pointer"
            >
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
