import { Fragment as e, useCallback as t, useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { useNavigate as o } from "react-router-dom";
import { ChevronLeft as s, ChevronRight as c } from "lucide-react";
import { create as l } from "zustand";
import { createPortal as u } from "react-dom";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
import { persist as m } from "zustand/middleware";
//#region src/stores/wheelHoverStore.js
var h = l((e) => ({
	hoveredPillar: null,
	setHoveredPillar: (t) => e({ hoveredPillar: t })
})), g = /[ً-ْٰ]/g, _ = (e) => e && e.replace(g, ""), v = (e, t = !0) => t ? e : _(e), y = 252, b = 10, x = 180;
function S({ entry: e, tooltipsEnabled: n = !0, showDiacritics: r = !0, children: o }) {
	let [s, c] = a(!1), [l, d] = a({
		top: void 0,
		bottom: void 0,
		left: 0,
		flipped: !1
	}), m = i(null), h = t(() => {
		if (!m.current) return;
		let e = m.current.getBoundingClientRect(), t = e.top < x, n = t ? e.bottom + b : void 0, r = t ? void 0 : window.innerHeight - e.top + b, i = e.left + e.width / 2 - y / 2;
		i = Math.max(8, Math.min(i, window.innerWidth - y - 8)), d({
			top: n,
			bottom: r,
			left: i,
			flipped: t
		}), c(!0);
	}, []), g = t(() => c(!1), []);
	if (!e) return o ?? null;
	let _ = `islamic-tooltip-${e.term?.replace(/\s+/g, "-").toLowerCase() || "term"}`;
	return /* @__PURE__ */ p("span", {
		ref: m,
		className: "islamic-term",
		onMouseEnter: h,
		onMouseLeave: g,
		onFocus: h,
		onBlur: g,
		tabIndex: 0,
		role: "note",
		"aria-describedby": s ? _ : void 0,
		children: [o ?? e.term, s && n && u(/* @__PURE__ */ p("span", {
			id: _,
			className: `islamic-term__tooltip${l.flipped ? " islamic-term__tooltip--below" : ""}`,
			role: "tooltip",
			style: {
				top: l.top,
				bottom: l.bottom,
				left: l.left
			},
			children: [
				/* @__PURE__ */ p("span", {
					className: "islamic-term__header",
					children: [/* @__PURE__ */ f("span", {
						className: "islamic-term__name",
						children: e.term
					}), e.arabic && /* @__PURE__ */ f("span", {
						className: "islamic-term__arabic",
						children: v(e.arabic, r)
					})]
				}),
				e.transliteration && /* @__PURE__ */ f("span", {
					className: "islamic-term__trans",
					children: e.transliteration
				}),
				/* @__PURE__ */ f("span", {
					className: "islamic-term__meaning",
					children: e.meaning
				}),
				e.source && /* @__PURE__ */ f("span", {
					className: "islamic-term__source",
					children: e.source
				})
			]
		}), document.body)]
	});
}
//#endregion
//#region src/components/LevelNavigator/LevelNavigator.jsx
var C = (e, t) => {
	try {
		localStorage.setItem(e, t);
	} catch {}
}, w = [
	{
		key: "core",
		label: "LEVEL 1",
		subtitle: "(DARURIYYAT)",
		title: "Core Higher Objectives",
		desc: "Foundational obligations — the essential duties that must be established before all else.",
		color: "#C8A96E",
		routeSuffix: "core"
	},
	{
		key: "growth",
		label: "LEVEL 2",
		subtitle: "(HAJIYYAT)",
		title: "Growth Space",
		desc: "Development needs — structured progression that deepens practice and knowledge.",
		color: "#4ab8a8",
		routeSuffix: "growth"
	},
	{
		key: "excellence",
		label: "LEVEL 3",
		subtitle: "(TAHSINIYYAT)",
		title: "Embellishments",
		desc: "Refinement pursuits — aspirational mastery that elevates and perfects.",
		color: "#8b5cf6",
		routeSuffix: "excellence"
	}
];
function ee(e) {
	return e.completedAt || e.columnId?.endsWith("_done") ? "#22c55e" : !e.columnId?.endsWith("_to_do") && !e.columnId?.endsWith("_todo") ? "#F59E0B" : "var(--border2, rgba(255,255,255,0.12))";
}
function T({ pillars: r = [], pillarTasks: l = {}, storageKey: u, controlledLevel: m, onLevelChange: g, currentPillarId: _, compact: v, levelDescriptions: y, levels: b, onSegmentClick: x, onSubsegClick: T, taskColorFn: te, gateIndicators: ne, tooltipsEnabled: E = !0, showDiacritics: re = !0 } = {}) {
	let ie = o(), [ae, D] = a(0), O = b || w, k = m ? Math.max(0, O.findIndex((e) => e.key === m)) : ae, [A, j] = a(null), M = () => {
		j("right"), setTimeout(() => j(null), 300), g ? g(O[k - 1]?.key) : D(k - 1);
	}, oe = () => {
		j("left"), setTimeout(() => j(null), 300), g ? g(O[k + 1]?.key) : D(k + 1);
	}, N = i(null), se = i(null), [P, F] = a(!1), I = t(() => {
		let e = N.current, t = se.current;
		if (!e || !t || !v) return;
		let n = (e.offsetWidth - (parseFloat(getComputedStyle(e).gap) || 16) * 2) * (2.8 / 4.8), i = e.querySelector(".fln__center");
		if (!i) return;
		let a = getComputedStyle(i), o = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = parseFloat(getComputedStyle(t).gap) || 8, c = (n - o - s * (r.length - 1)) / r.length, l = t.querySelectorAll(".fln__segment-nav");
		for (let e of l) if (e.scrollWidth >= c * .9) {
			F(!0);
			return;
		}
		F(!1);
	}, [v, r.length]);
	n(() => {
		let e = N.current;
		if (!e || !v) return;
		let t = new ResizeObserver(I);
		return t.observe(e), I(), () => t.disconnect();
	}, [v, I]);
	let L = y ? O.map((e) => ({
		...e,
		...y[e.key]
	})) : O, R = L[k], z = L[k - 1] ?? null, B = L[k + 1] ?? null, V = te || ee, H = h((e) => e.hoveredPillar), U = h((e) => e.setHoveredPillar);
	return /* @__PURE__ */ p("div", {
		ref: N,
		className: `fln${v ? " fln--compact" : ""}${P ? " fln--stacked" : ""}`,
		children: [
			/* @__PURE__ */ f("div", {
				className: `fln__side fln__side--left${z ? " fln__side--active" : ""}`,
				onClick: () => z && M(),
				role: z ? "button" : void 0,
				tabIndex: z ? 0 : void 0,
				"aria-label": z ? `Navigate to previous level: ${z.title}` : void 0,
				onKeyDown: z ? (e) => e.key === "Enter" && M() : void 0,
				children: z ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ p("div", {
					className: "fln__side-text",
					children: [
						/* @__PURE__ */ f("span", {
							className: "fln__side-label",
							style: { color: z.color },
							children: z.label
						}),
						/* @__PURE__ */ f("span", {
							className: "fln__side-subtitle",
							children: z.subtitle
						}),
						/* @__PURE__ */ f("span", {
							className: "fln__side-title",
							children: z.title
						})
					]
				}), /* @__PURE__ */ f(s, {
					className: "fln__chevron",
					style: { color: z.color },
					size: 36,
					strokeWidth: 1.5
				})] }) : /* @__PURE__ */ f("div", { className: "fln__side-empty" })
			}),
			/* @__PURE__ */ f("div", {
				className: "fln__center",
				"aria-live": "polite",
				children: /* @__PURE__ */ p("div", {
					className: `fln__level-content${A ? ` fln__level-content--${A}` : ""}`,
					children: [
						/* @__PURE__ */ p("div", {
							className: "fln__center-head",
							children: [/* @__PURE__ */ f("span", {
								className: "fln__center-label",
								style: { color: R.color },
								children: R.label
							}), /* @__PURE__ */ f("span", {
								className: "fln__center-subtitle",
								children: R.subtitle
							})]
						}),
						/* @__PURE__ */ f("h2", {
							className: "fln__center-title",
							children: R.title
						}),
						/* @__PURE__ */ f("p", {
							className: "fln__center-desc",
							children: R.desc
						}),
						/* @__PURE__ */ f("div", {
							className: "fln__segments",
							ref: se,
							children: r.map(({ id: t, label: n, route: r, glossaryEntry: i }) => {
								let a = l[t] || [], o = _ === t, s = () => {
									x ? x(t, R.key) : (u && C(u, R.key), r && ie(r));
								}, c = ne?.find((e) => e.afterSegmentId === t);
								return /* @__PURE__ */ p(e, { children: [/* @__PURE__ */ p("div", {
									className: `fln__segment-col${o ? " fln__segment-col--current" : ""}${H === t ? " fln__segment-col--hover-sync" : ""}`,
									style: { "--seg-color": R.color },
									"data-pillar-id": t,
									onClick: s,
									onMouseEnter: () => U(t),
									onMouseLeave: () => U(null),
									onFocus: () => U(t),
									onBlur: () => U(null),
									role: "button",
									tabIndex: 0,
									onKeyDown: (e) => e.key === "Enter" && s(),
									children: [/* @__PURE__ */ f("div", {
										className: "fln__segment-bar",
										children: a.length > 0 ? a.map((e) => /* @__PURE__ */ f("button", {
											className: "fln__subseg",
											style: { background: V(e) },
											title: e.title,
											"aria-label": `Task: ${e.title}`,
											onClick: (n) => {
												n.stopPropagation(), T ? T(e.id, t) : (u && C(u, R.key), r && ie(`${r}?task=${e.id}`));
											}
										}, e.id)) : /* @__PURE__ */ f("div", { className: "fln__subseg fln__subseg--empty" })
									}), /* @__PURE__ */ f("button", {
										className: "fln__segment-nav",
										onClick: (e) => {
											e.stopPropagation(), s();
										},
										children: i ? /* @__PURE__ */ f(S, {
											entry: i,
											tooltipsEnabled: E,
											showDiacritics: re,
											children: n
										}) : n
									})]
								}), c && /* @__PURE__ */ f("button", {
									type: "button",
									className: `fln__gate-indicator fln__gate-indicator--${c.status}`,
									title: `${c.label} (${c.status})`,
									"aria-label": `Gate: ${c.label} — ${c.status}`,
									onClick: () => {
										x && x(c.afterSegmentId, R.key);
									},
									children: /* @__PURE__ */ f("span", {
										className: "fln__gate-diamond",
										children: "◆"
									})
								})] }, t);
							})
						})
					]
				}, k)
			}),
			/* @__PURE__ */ f("div", {
				className: `fln__side fln__side--right${B ? " fln__side--active" : ""}`,
				onClick: () => B && oe(),
				role: B ? "button" : void 0,
				tabIndex: B ? 0 : void 0,
				"aria-label": B ? `Navigate to next level: ${B.title}` : void 0,
				onKeyDown: B ? (e) => e.key === "Enter" && oe() : void 0,
				children: B ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f(c, {
					className: "fln__chevron",
					style: { color: B.color },
					size: 36,
					strokeWidth: 1.5
				}), /* @__PURE__ */ p("div", {
					className: "fln__side-text fln__side-text--right",
					children: [
						/* @__PURE__ */ f("span", {
							className: "fln__side-label",
							style: { color: B.color },
							children: B.label
						}),
						/* @__PURE__ */ f("span", {
							className: "fln__side-subtitle",
							children: B.subtitle
						}),
						/* @__PURE__ */ f("span", {
							className: "fln__side-title",
							children: B.title
						})
					]
				})] }) : /* @__PURE__ */ f("div", { className: "fln__side-empty" })
			})
		]
	});
}
//#endregion
//#region src/hooks/useMilestoneWatcher.js
function te(e, t) {
	let r = i(null);
	n(() => {
		let n = r.current;
		if (n) for (let r of e) {
			let e = n[r.id];
			typeof e == "number" && e < 100 && r.current >= 100 && t?.(r);
		}
		let i = {};
		for (let t of e) i[t.id] = t.current;
		r.current = i;
	}, [e, t]);
}
//#endregion
//#region src/hooks/useMithaqHold.js
var ne = 1500, E = 280, re = (e) => e * e;
function ie({ onActivate: e, disabled: r = !1 } = {}) {
	let [o, s] = a(0), [c, l] = a(!1), u = i(null), d = i(null), f = i(0), p = i(0), m = i(!1), h = i(null), g = i(0), _ = i(e), v = i(r);
	n(() => {
		_.current = e;
	}, [e]), n(() => {
		v.current = r;
	}, [r]);
	let y = () => {
		u.current != null && (cancelAnimationFrame(u.current), u.current = null);
	}, b = (e) => {
		p.current = e, s(e);
	}, x = i(null), S = i(null);
	n(() => {
		let e = (t) => {
			if (d.current == null) return;
			let n = t - d.current, r = f.current, i = ne * (1 - r), a = Math.min(n / Math.max(i, 1), 1), o = r + (1 - r) * a;
			if (b(o), o >= 1) {
				l(!1), d.current = null, y(), typeof _.current == "function" && _.current(), b(0);
				return;
			}
			u.current = requestAnimationFrame(e);
		}, t = (e) => {
			if (h.current == null) return;
			let n = Math.min((e - h.current) / E, 1);
			if (b(g.current * (1 - re(n))), n >= 1) {
				b(0), m.current = !1, h.current = null, y();
				return;
			}
			u.current = requestAnimationFrame(t);
		};
		x.current = e, S.current = t;
	}, []);
	let C = t(() => {
		v.current || (y(), m.current = !1, h.current = null, f.current = p.current, d.current = performance.now(), l(!0), u.current = requestAnimationFrame(x.current));
	}, []), w = t(() => {
		d.current == null && !m.current || (y(), d.current = null, l(!1), !(p.current <= 0) && (m.current = !0, g.current = p.current, h.current = performance.now(), u.current = requestAnimationFrame(S.current)));
	}, []);
	return n(() => () => y(), []), {
		progress: o,
		isHolding: c,
		bind: {
			onMouseDown: (e) => {
				e.preventDefault?.(), C();
			},
			onMouseUp: w,
			onMouseLeave: w,
			onTouchStart: (e) => {
				e.preventDefault?.(), C();
			},
			onTouchEnd: w,
			onTouchCancel: w,
			onKeyDown: (e) => {
				e.key === " " || e.key === "Enter" ? (e.preventDefault(), C()) : e.key === "Escape" && w();
			},
			onKeyUp: (e) => {
				(e.key === " " || e.key === "Enter") && w();
			},
			onBlur: w
		}
	};
}
//#endregion
//#region src/stores/mithaqStore.js
function ae(e) {
	if (!e) return !1;
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return !1;
	let n = new Date(t);
	return n.setHours(5, 0, 0, 0), t.getHours() >= 5 && n.setDate(n.getDate() + 1), /* @__PURE__ */ new Date() < n;
}
var D = l(m((e, t) => ({
	activations: {},
	activate: (t) => e((e) => ({ activations: {
		...e.activations,
		[t]: { activatedAt: (/* @__PURE__ */ new Date()).toISOString() }
	} })),
	reset: (t) => e((e) => {
		let n = { ...e.activations };
		return delete n[t], { activations: n };
	}),
	isActivated: (e) => {
		let n = t().activations[e];
		return ae(n?.activatedAt);
	}
}), { name: "ogden-mithaq" }));
//#endregion
//#region src/components/MaqasidComparisonWheel/wheelColor.js
function O(e) {
	let t = e.replace("#", ""), n = t.length === 3 ? t.split("").map((e) => e + e).join("") : t, r = parseInt(n, 16);
	return [
		r >> 16 & 255,
		r >> 8 & 255,
		r & 255
	];
}
function k(e) {
	let t = e / 255;
	return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
}
function A(e) {
	let t = e <= .0031308 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - .055;
	return Math.max(0, Math.min(255, Math.round(t * 255)));
}
function j(e, t, n) {
	let r = k(e), i = k(t), a = k(n), o = Math.cbrt(.4122214708 * r + .5363325363 * i + .0514459929 * a), s = Math.cbrt(.2119034982 * r + .6806995451 * i + .1073969566 * a), c = Math.cbrt(.0883024619 * r + .2817188376 * i + .6299787005 * a);
	return [
		.2104542553 * o + .793617785 * s - .0040720468 * c,
		1.9779984951 * o - 2.428592205 * s + .4505937099 * c,
		.0259040371 * o + .7827717662 * s - .808675766 * c
	];
}
function M(e, t, n) {
	let r = e + .3963377774 * t + .2158037573 * n, i = e - .1055613458 * t - .0638541728 * n, a = e - .0894841775 * t - 1.291485548 * n, o = r * r * r, s = i * i * i, c = a * a * a;
	return [
		A(4.0767416621 * o - 3.3077115913 * s + .2309699292 * c),
		A(-1.2684380046 * o + 2.6097574011 * s - .3413193965 * c),
		A(-.0041960863 * o - .7034186147 * s + 1.707614701 * c)
	];
}
function oe(e, t, n) {
	return [
		e,
		Math.sqrt(t * t + n * n),
		Math.atan2(n, t)
	];
}
function N(e, t, n) {
	let [r, i] = [t * Math.cos(n), t * Math.sin(n)], [a, o, s] = M(e, r, i), c = (e) => e.toString(16).padStart(2, "0");
	return `#${c(a)}${c(o)}${c(s)}`;
}
function se(e) {
	if (!e || typeof e != "string" || !e.startsWith("#")) return {
		base: e,
		stroke: e,
		shimmer: e,
		hubTint: "#0c1a20",
		brightAura: e
	};
	try {
		let [t, n, r] = O(e), [i, a, o] = j(t, n, r), [, s, c] = oe(i, a, o);
		return {
			base: e,
			stroke: N(.65, Math.min(s, .18), c),
			shimmer: N(.72, Math.min(s * .85, .15), c),
			hubTint: N(.1, Math.min(s * .3, .04), c),
			brightAura: N(.78, Math.min(s * .9, .16), c)
		};
	} catch {
		return {
			base: e,
			stroke: e,
			shimmer: e,
			hubTint: "#0c1a20",
			brightAura: e
		};
	}
}
//#endregion
//#region src/components/MaqasidComparisonWheel/WheelWisdomTooltip.jsx
var P = 260, F = 14;
function I({ wisdom: e, x: t, y: n, levelColor: r, showDiacritics: i = !0 }) {
	if (!e || typeof document > "u") return null;
	let a = (typeof window < "u" ? window.innerWidth : 1024) - P - 8, o = Math.max(8, Math.min(a, t + F)), s = Math.max(8, n + F);
	return u(/* @__PURE__ */ p("div", {
		className: "wwt-card",
		style: {
			left: `${o}px`,
			top: `${s}px`,
			borderColor: r
		},
		role: "tooltip",
		children: [
			/* @__PURE__ */ f("div", {
				className: "wwt-arabic",
				children: v(e.arabic, i)
			}),
			/* @__PURE__ */ f("div", {
				className: "wwt-english",
				children: e.english
			}),
			/* @__PURE__ */ f("div", {
				className: "wwt-citation",
				style: { color: r },
				children: e.citation
			})
		]
	}), document.body);
}
//#endregion
//#region src/components/MaqasidComparisonWheel/MaqasidNextActionCard.jsx
function L({ x: e, y: t, flip: n, levelColor: r, text: i, label: a = "Next", width: o = 160, height: s = 40, multiline: c = !1 }) {
	if (!i) return null;
	let l = o, u = s;
	return /* @__PURE__ */ f("foreignObject", {
		x: n ? e - l : e,
		y: t - u / 2,
		width: l,
		height: u,
		className: "mcw-next-card-fo",
		pointerEvents: "none",
		style: { overflow: "visible" },
		children: /* @__PURE__ */ p("div", {
			className: `mcw-next-card${c ? " mcw-next-card--wrap" : ""}`,
			style: { borderColor: r },
			children: [/* @__PURE__ */ f("span", {
				className: "mcw-next-card-label",
				children: a
			}), /* @__PURE__ */ f("span", {
				className: "mcw-next-card-text",
				children: i
			})]
		})
	});
}
//#endregion
//#region src/components/MaqasidComparisonWheel/MaqasidComparisonWheel.jsx
var R = 200, z = 200, B = 56, V = 142, H = V, U = 184, ce = (V + U) / 2, le = 1e3;
function W(e, t) {
	let n = t * Math.PI / 180;
	return [R + e * Math.cos(n), z + e * Math.sin(n)];
}
function G(e, t, n, r) {
	let [i, a] = W(t, n), [o, s] = W(t, r), [c, l] = W(e, n), [u, d] = W(e, r), f = +(r - n > 180);
	return [
		`M ${c} ${l}`,
		`L ${i} ${a}`,
		`A ${t} ${t} 0 ${f} 1 ${o} ${s}`,
		`L ${u} ${d}`,
		`A ${e} ${e} 0 ${f} 0 ${c} ${l}`,
		"Z"
	].join(" ");
}
function ue(e, t, n) {
	let [r, i] = W(e, t), [a, o] = W(e, n);
	return `M ${r} ${i} A ${e} ${e} 0 ${+(n - t > 180)} 1 ${a} ${o}`;
}
function de({ centerLabel: e = "FAITH", levelColor: t = "#4ab8a8", levelPattern: s = "dots", level: c = "core", segments: l = [], onReach100: u, mithaqDomain: m = null, pillarWisdom: g = null, nextActions: _ = null, forceHover: v = null, forceConverged: y = !1, centerLabelOverride: b = null, onSegmentSelect: x = null, onHoverChange: S = null, showNextCard: C = !0, showDiacritics: w = !0 }) {
	let ee = o(), T = (e) => {
		if (x) {
			x(e);
			return;
		}
		e?.route && ee(e.route, { viewTransition: !0 });
	}, [ne, E] = a(null), [re, ae] = a({
		x: 0,
		y: 0
	}), [O, k] = a(null), [A, j] = a(!1), M = i(null), [oe, N] = a(0), P = h((e) => e.setHoveredPillar), F = h((e) => e.hoveredPillar);
	n(() => () => P(null), [P]);
	let de = D((e) => e.activations), fe = D((e) => e.activate), K = r(() => {
		if (!m) return !0;
		let e = de[m];
		if (!e?.activatedAt) return !1;
		let t = new Date(e.activatedAt);
		if (Number.isNaN(t.getTime())) return !1;
		let n = new Date(t);
		return n.setHours(5, 0, 0, 0), t.getHours() >= 5 && n.setDate(n.getDate() + 1), /* @__PURE__ */ new Date() < n;
	}, [m, de]), q = m && !K, [pe, me] = a(!1);
	n(() => {
		if (!pe) return;
		let e = setTimeout(() => me(!1), 850);
		return () => clearTimeout(e);
	}, [pe]);
	let { progress: he, isHolding: ge, bind: _e } = ie({
		disabled: !m || K,
		onActivate: () => {
			m && (fe(m), me(!0));
		}
	});
	n(() => {
		let e = requestAnimationFrame(() => j(!0));
		return () => cancelAnimationFrame(e);
	}, []), n(() => {
		if (!y) return;
		let e = requestAnimationFrame(() => me(!0)), t = setTimeout(() => me(!1), 850);
		return () => {
			cancelAnimationFrame(e), clearTimeout(t);
		};
	}, [y]), te(l, u);
	let J = r(() => se(t), [t]), Y = 360 / (l.length || 1), X = -90 - Y / 2, Z = v || ne || F, Q = Z ? l.findIndex((e) => e.id === Z) : -1, $ = Q >= 0 ? l[Q] : null;
	n(() => {
		S && S(Z || null);
	}, [Z, S]);
	let ve = Q >= 0 ? X + Q * Y + Y / 2 + 90 : null, ye = r(() => {
		if (!F) return null;
		let e = l.findIndex((e) => e.id === F);
		return e < 0 ? null : X + e * Y + Y / 2 + 90;
	}, [
		F,
		l,
		X,
		Y
	]), be = ve ?? ye ?? oe, xe = l.length ? Math.round(l.reduce((e, t) => e + (t.current || 0), 0) / l.length) : 0, Se = r(() => {
		if (l.length < 2) return 1;
		let e = l.reduce((e, t) => e + (t.current || 0), 0) / l.length, t = l.reduce((t, n) => t + ((n.current || 0) - e) ** 2, 0) / l.length;
		return Math.max(0, Math.min(1, 1 - Math.sqrt(t) / 40));
	}, [l]), Ce = $ ? $.tooltipText ? $.tooltipText : $.current >= 100 ? "Flourishing" : _?.[$.id]?.[c] || $.label : null, we = $?.tooltipLabel || "Next", Te = $?.tooltipWidth, Ee = $?.tooltipHeight, De = r(() => {
		if (Q < 0) return null;
		if ($?.tooltipText) return {
			x: R - ($.tooltipWidth || 200) / 2,
			y: 440,
			flip: !1
		};
		let e = X + Q * Y + Y / 2, [t, n] = W(U + 14, e), r = (e % 360 + 360) % 360;
		return {
			x: t,
			y: n,
			flip: r > 90 && r < 270
		};
	}, [
		Q,
		X,
		Y,
		$
	]), Oe = $ ? $.label.toUpperCase() : b || e, ke = $ ? `${Math.round($.current)}%` : `${xe}%`, Ae = `mcw-pat-${s}`, je = (e) => {
		M.current && clearTimeout(M.current), M.current = setTimeout(() => {
			k(e);
		}, le);
	}, Me = () => {
		M.current && clearTimeout(M.current), M.current = null, k(null);
	};
	n(() => () => {
		M.current && clearTimeout(M.current);
	}, []), n(() => {
		let e = (e) => {
			e.key === "Escape" && k(null);
		}, t = () => k(null);
		return window.addEventListener("keydown", e), window.addEventListener("scroll", t, !0), () => {
			window.removeEventListener("keydown", e), window.removeEventListener("scroll", t, !0);
		};
	}, []);
	let Ne = i(null), Pe = () => {
		Ne.current &&= (clearTimeout(Ne.current), null);
	};
	n(() => () => Pe(), []);
	let Fe = (e, t) => {
		Pe(), E(e.id), P(e.id), ae({
			x: t.clientX,
			y: t.clientY
		});
		let n = l.findIndex((t) => t.id === e.id);
		n >= 0 && N(X + n * Y + Y / 2 + 90), je(e.id);
	}, Ie = () => {
		Pe(), Ne.current = setTimeout(() => {
			E(null), P(null), Me(), Ne.current = null;
		}, 90);
	}, Le = (e, t) => {
		ae({
			x: t.clientX,
			y: t.clientY
		}), O && O !== e.id && k(null);
	}, Re = O && g ? g[O] : null;
	return /* @__PURE__ */ p("div", {
		className: "mcw-wrap",
		children: [
			/* @__PURE__ */ p("svg", {
				viewBox: "0 0 400 400",
				className: `mcw-svg${q ? " mcw-svg--dormant" : ""}${K || y ? " mcw-svg--lit" : ""}${pe ? " mcw-svg--igniting" : ""}${y ? " mcw-svg--converged" : ""}`,
				role: "img",
				"aria-label": `${e} comparison wheel`,
				style: {
					"--mcw-level-color": J.base,
					"--mcw-level-stroke": J.stroke,
					"--mcw-level-shimmer": J.shimmer,
					"--mcw-level-hub-tint": J.hubTint,
					"--mcw-level-aura": J.brightAura,
					"--mcw-theme-color": J.base,
					"--mcw-theme-stroke": J.stroke,
					"--mcw-qalb-balance": Se.toFixed(3)
				},
				children: [
					/* @__PURE__ */ p("defs", { children: [
						/* @__PURE__ */ p("radialGradient", {
							id: "mcw-progress-grad",
							gradientUnits: "userSpaceOnUse",
							cx: R,
							cy: z,
							r: H,
							fx: R,
							fy: z,
							children: [
								/* @__PURE__ */ f("stop", {
									offset: "0%",
									stopColor: J.base,
									stopOpacity: "0.25"
								}),
								/* @__PURE__ */ f("stop", {
									offset: "35%",
									stopColor: J.base,
									stopOpacity: "0.55"
								}),
								/* @__PURE__ */ f("stop", {
									offset: "75%",
									stopColor: J.base,
									stopOpacity: "0.85"
								}),
								/* @__PURE__ */ f("stop", {
									offset: "100%",
									stopColor: J.base,
									stopOpacity: "1"
								})
							]
						}),
						/* @__PURE__ */ p("radialGradient", {
							id: "mcw-progress-grad-dim",
							gradientUnits: "userSpaceOnUse",
							cx: R,
							cy: z,
							r: H,
							children: [/* @__PURE__ */ f("stop", {
								offset: "0%",
								stopColor: "#1a4a4e"
							}), /* @__PURE__ */ f("stop", {
								offset: "100%",
								stopColor: "#0a2326"
							})]
						}),
						/* @__PURE__ */ p("linearGradient", {
							id: "mcw-band-level",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ f("stop", {
								offset: "0%",
								stopColor: J.base,
								stopOpacity: "0.95"
							}), /* @__PURE__ */ f("stop", {
								offset: "100%",
								stopColor: J.base,
								stopOpacity: "0.65"
							})]
						}),
						/* @__PURE__ */ p("radialGradient", {
							id: "mcw-aura-grad",
							cx: "50%",
							cy: "50%",
							r: "50%",
							children: [
								/* @__PURE__ */ f("stop", {
									offset: "0%",
									stopColor: J.brightAura,
									stopOpacity: "0.95"
								}),
								/* @__PURE__ */ f("stop", {
									offset: "55%",
									stopColor: J.brightAura,
									stopOpacity: "0.35"
								}),
								/* @__PURE__ */ f("stop", {
									offset: "100%",
									stopColor: J.brightAura,
									stopOpacity: "0"
								})
							]
						}),
						/* @__PURE__ */ f("pattern", {
							id: "mcw-pat-dots",
							width: "8",
							height: "8",
							patternUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ f("circle", {
								cx: "2",
								cy: "2",
								r: "1.1",
								fill: "rgba(255,255,255,0.55)"
							})
						}),
						/* @__PURE__ */ f("pattern", {
							id: "mcw-pat-stripes",
							width: "8",
							height: "8",
							patternUnits: "userSpaceOnUse",
							patternTransform: "rotate(45)",
							children: /* @__PURE__ */ f("rect", {
								x: "0",
								y: "0",
								width: "2",
								height: "8",
								fill: "rgba(255,255,255,0.45)"
							})
						}),
						/* @__PURE__ */ f("pattern", {
							id: "mcw-pat-crosshatch",
							width: "10",
							height: "10",
							patternUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ f("path", {
								d: "M 0 0 L 10 10 M 10 0 L 0 10",
								stroke: "rgba(255,255,255,0.45)",
								strokeWidth: "1"
							})
						})
					] }),
					l.map((e, t) => {
						let n = X + t * Y, r = X + (t + 1) * Y, i = Math.max(0, Math.min(100, e.current)), a = H - (H - B) * (i / 100), o = Z === e.id, s = i === 0, c = i >= 100, l = Math.round(i / 5), u = o ? " is-hovered" : "";
						return /* @__PURE__ */ p("g", {
							role: e.route ? "button" : "img",
							tabIndex: e.route ? 0 : void 0,
							"aria-label": `${e.label}: ${Math.round(e.current)}%${e.route ? " — open submodule" : ""}`,
							className: `mcw-sector${A ? " is-mounted" : ""}${u}`,
							style: {
								cursor: e.route ? "pointer" : "default",
								animationDelay: `${t * 90}ms`
							},
							onMouseEnter: (t) => Fe(e, t),
							onMouseLeave: Ie,
							onMouseMove: (t) => Le(e, t),
							onClick: () => T(e),
							onKeyDown: (t) => {
								e.route && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), T(e));
							},
							children: [
								/* @__PURE__ */ f("path", {
									d: G(B, H, n, r),
									fill: "url(#mcw-progress-grad-dim)",
									className: `mcw-seg-bg${u}`
								}),
								s && /* @__PURE__ */ f("path", {
									d: G(B + 4, H - 4, n, r),
									className: `mcw-seg-empty${u}`
								}),
								i > 0 && /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("path", {
									d: G(a, H, n, r),
									fill: e.color || "url(#mcw-progress-grad)",
									className: `mcw-seg-current${u}`,
									style: {
										animationDelay: `${t * 80}ms`,
										opacity: e.color ? .85 : void 0
									}
								}, `fill-${e.id}-${l}`), /* @__PURE__ */ f("path", {
									d: G(a, H, n, r),
									fill: `url(#${Ae})`,
									className: `mcw-seg-pattern${u}`,
									pointerEvents: "none"
								})] }),
								c && /* @__PURE__ */ f("path", {
									d: ue(H - 2, n + 1, r - 1),
									pathLength: "1",
									className: `mcw-seg-complete${u}`,
									pointerEvents: "none"
								}, `complete-${e.id}`)
							]
						}, `inner-${e.id}`);
					}),
					l.map((e, t) => {
						let n = X + t * Y, r = n + Y, i = Z === e.id ? " is-hovered" : "";
						return /* @__PURE__ */ f("path", {
							d: G(V, U, n, r),
							fill: e.color || "url(#mcw-band-level)",
							stroke: "rgba(10, 20, 24, 0.85)",
							strokeWidth: "1.5",
							className: `mcw-band${i}`,
							style: { cursor: e.route ? "pointer" : "default" },
							role: e.route ? "button" : "img",
							tabIndex: e.route ? 0 : void 0,
							"aria-label": `${e.label}${e.route ? " — open submodule" : ""}`,
							onMouseEnter: (t) => Fe(e, t),
							onMouseLeave: Ie,
							onMouseMove: (t) => Le(e, t),
							onClick: () => T(e),
							onKeyDown: (t) => {
								e.route && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), T(e));
							}
						}, `band-${e.id}`);
					}),
					/* @__PURE__ */ f("circle", {
						cx: R,
						cy: z,
						r: U,
						className: "mcw-outer-stroke"
					}),
					/* @__PURE__ */ f("circle", {
						cx: R,
						cy: z,
						r: V,
						className: "mcw-outer-stroke"
					}),
					l.map((e, t) => {
						let n = e.Icon;
						if (!n) return null;
						let [r, i] = W(ce, X + t * Y + Y / 2), a = Z === e.id, o = (e.current || 0) >= 100;
						return /* @__PURE__ */ p("g", {
							className: `mcw-pillar-vessel${a ? " is-hovered" : ""}${K || o || y ? " is-lit" : ""}${o ? " is-complete" : ""}`,
							style: {
								"--mcw-aura-cx": `${r}px`,
								"--mcw-aura-cy": `${i}px`,
								"--mcw-ignite-delay": `${80 + t * 50}ms`,
								...e.color ? { "--mcw-level-aura": e.color } : null
							},
							pointerEvents: "none",
							children: [/* @__PURE__ */ f("circle", {
								className: "mcw-aura",
								cx: r,
								cy: i,
								r: 16,
								fill: "url(#mcw-aura-grad)"
							}), /* @__PURE__ */ f("g", {
								transform: `translate(${r - 9} ${i - 9})`,
								pointerEvents: "none",
								children: /* @__PURE__ */ f("g", {
									className: "mcw-icon-wrap",
									children: /* @__PURE__ */ f(n, {
										size: 18,
										strokeWidth: 1.8
									})
								})
							})]
						}, `vessel-${e.id}`);
					}),
					/* @__PURE__ */ f("g", {
						className: `mcw-needle${Z && !q ? " is-active" : ""}`,
						style: {
							transform: `rotate(${be}deg)`,
							transformOrigin: `${R}px ${z}px`
						},
						pointerEvents: "none",
						children: /* @__PURE__ */ f("path", { d: `M ${R} ${z - B + 1} L ${R - 4} ${z - B - 7} L ${R + 4} ${z - B - 7} Z` })
					}),
					/* @__PURE__ */ p("g", {
						className: `mcw-hub-group${ge ? " is-holding" : ""}${q ? " is-dormant" : ""}`,
						...m && !K ? {
							..._e,
							role: "button",
							tabIndex: 0,
							"aria-label": `Press and hold to renew the ${e.toLowerCase()} covenant`
						} : { pointerEvents: "none" },
						children: [
							/* @__PURE__ */ f("circle", {
								cx: R,
								cy: z,
								r: B,
								className: `mcw-hub${Z && !q ? " is-active" : ""}`
							}),
							/* @__PURE__ */ f("circle", {
								cx: R,
								cy: z,
								r: B - 4,
								className: "mcw-hub-inner"
							}),
							m && !K && /* @__PURE__ */ f("circle", {
								className: "mcw-mithaq-ring",
								cx: R,
								cy: z,
								r: B + 4,
								fill: "none",
								stroke: J.brightAura,
								strokeWidth: 2,
								strokeLinecap: "round",
								pathLength: "1",
								strokeDasharray: "1",
								strokeDashoffset: 1 - he,
								transform: `rotate(-90 ${R} ${z})`,
								pointerEvents: "none"
							}),
							/* @__PURE__ */ f("text", {
								x: R,
								y: q ? z - 6 : z - 10,
								className: `mcw-hub-label${Z && !q ? " is-active" : ""}`,
								textAnchor: "middle",
								dominantBaseline: "middle",
								pointerEvents: "none",
								children: Oe
							}),
							!q && /* @__PURE__ */ f("text", {
								x: R,
								y: z + 10,
								className: "mcw-hub-readout",
								textAnchor: "middle",
								dominantBaseline: "middle",
								pointerEvents: "none",
								children: ke
							}),
							q && /* @__PURE__ */ f("text", {
								x: R,
								y: z + 12,
								className: "mcw-hub-hint",
								textAnchor: "middle",
								dominantBaseline: "middle",
								pointerEvents: "none",
								children: "Press & hold to renew"
							})
						]
					}),
					C && De && Ce && !q && /* @__PURE__ */ f(L, {
						x: De.x,
						y: De.y,
						flip: De.flip,
						levelColor: J.base,
						text: Ce,
						label: we,
						width: Te,
						height: Ee,
						multiline: !!$?.tooltipText
					})
				]
			}),
			Re && !q && /* @__PURE__ */ f(I, {
				wisdom: Re,
				x: re.x,
				y: re.y,
				levelColor: J.base,
				showDiacritics: w
			}),
			/* @__PURE__ */ f("div", {
				className: "mcw-aria-live",
				role: "status",
				"aria-live": "polite",
				children: pe ? `${e} covenant renewed.` : ""
			})
		]
	});
}
//#endregion
export { S as IslamicTerm, T as LevelNavigator, de as MaqasidComparisonWheel, L as MaqasidNextActionCard, I as WheelWisdomTooltip, se as deriveWheelPalette, v as formatArabic, _ as stripDiacritics, te as useMilestoneWatcher, ie as useMithaqHold, D as useMithaqStore, h as useWheelHoverStore };

//# sourceMappingURL=ogden-ui-components.es.js.map