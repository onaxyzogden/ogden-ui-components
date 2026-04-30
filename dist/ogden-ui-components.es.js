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
function T({ pillars: r = [], pillarTasks: l = {}, storageKey: u, controlledLevel: m, onLevelChange: g, currentPillarId: _, compact: v, levelDescriptions: y, levels: b, onSegmentClick: x, onSubsegClick: T, taskColorFn: te, gateIndicators: ne, tooltipsEnabled: re = !0, showDiacritics: ie = !0 } = {}) {
	let ae = o(), [oe, E] = a(0), D = b || w, O = m ? Math.max(0, D.findIndex((e) => e.key === m)) : oe, [k, A] = a(null), j = () => {
		A("right"), setTimeout(() => A(null), 300), g ? g(D[O - 1]?.key) : E(O - 1);
	}, se = () => {
		A("left"), setTimeout(() => A(null), 300), g ? g(D[O + 1]?.key) : E(O + 1);
	}, M = i(null), ce = i(null), [N, P] = a(!1), F = t(() => {
		let e = M.current, t = ce.current;
		if (!e || !t || !v) return;
		let n = (e.offsetWidth - (parseFloat(getComputedStyle(e).gap) || 16) * 2) * (2.8 / 4.8), i = e.querySelector(".fln__center");
		if (!i) return;
		let a = getComputedStyle(i), o = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = parseFloat(getComputedStyle(t).gap) || 8, c = (n - o - s * (r.length - 1)) / r.length, l = t.querySelectorAll(".fln__segment-nav");
		for (let e of l) if (e.scrollWidth >= c * .9) {
			P(!0);
			return;
		}
		P(!1);
	}, [v, r.length]);
	n(() => {
		let e = M.current;
		if (!e || !v) return;
		let t = new ResizeObserver(F);
		return t.observe(e), F(), () => t.disconnect();
	}, [v, F]);
	let I = y ? D.map((e) => ({
		...e,
		...y[e.key]
	})) : D, L = I[O], R = I[O - 1] ?? null, z = I[O + 1] ?? null, B = te || ee, V = h((e) => e.hoveredPillar), H = h((e) => e.setHoveredPillar);
	return /* @__PURE__ */ p("div", {
		ref: M,
		className: `fln${v ? " fln--compact" : ""}${N ? " fln--stacked" : ""}`,
		children: [
			/* @__PURE__ */ f("div", {
				className: `fln__side fln__side--left${R ? " fln__side--active" : ""}`,
				onClick: () => R && j(),
				role: R ? "button" : void 0,
				tabIndex: R ? 0 : void 0,
				"aria-label": R ? `Navigate to previous level: ${R.title}` : void 0,
				onKeyDown: R ? (e) => e.key === "Enter" && j() : void 0,
				children: R ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ p("div", {
					className: "fln__side-text",
					children: [
						/* @__PURE__ */ f("span", {
							className: "fln__side-label",
							style: { color: R.color },
							children: R.label
						}),
						/* @__PURE__ */ f("span", {
							className: "fln__side-subtitle",
							children: R.subtitle
						}),
						/* @__PURE__ */ f("span", {
							className: "fln__side-title",
							children: R.title
						})
					]
				}), /* @__PURE__ */ f(s, {
					className: "fln__chevron",
					style: { color: R.color },
					size: 36,
					strokeWidth: 1.5
				})] }) : /* @__PURE__ */ f("div", { className: "fln__side-empty" })
			}),
			/* @__PURE__ */ f("div", {
				className: "fln__center",
				"aria-live": "polite",
				children: /* @__PURE__ */ p("div", {
					className: `fln__level-content${k ? ` fln__level-content--${k}` : ""}`,
					children: [
						/* @__PURE__ */ p("div", {
							className: "fln__center-head",
							children: [/* @__PURE__ */ f("span", {
								className: "fln__center-label",
								style: { color: L.color },
								children: L.label
							}), /* @__PURE__ */ f("span", {
								className: "fln__center-subtitle",
								children: L.subtitle
							})]
						}),
						/* @__PURE__ */ f("h2", {
							className: "fln__center-title",
							children: L.title
						}),
						/* @__PURE__ */ f("p", {
							className: "fln__center-desc",
							children: L.desc
						}),
						/* @__PURE__ */ f("div", {
							className: "fln__segments",
							ref: ce,
							children: r.map(({ id: t, label: n, route: r, glossaryEntry: i }) => {
								let a = l[t] || [], o = _ === t, s = () => {
									x ? x(t, L.key) : (u && C(u, L.key), r && ae(r));
								}, c = ne?.find((e) => e.afterSegmentId === t);
								return /* @__PURE__ */ p(e, { children: [/* @__PURE__ */ p("div", {
									className: `fln__segment-col${o ? " fln__segment-col--current" : ""}${V === t ? " fln__segment-col--hover-sync" : ""}`,
									style: { "--seg-color": L.color },
									"data-pillar-id": t,
									onClick: s,
									onMouseEnter: () => H(t),
									onMouseLeave: () => H(null),
									onFocus: () => H(t),
									onBlur: () => H(null),
									role: "button",
									tabIndex: 0,
									onKeyDown: (e) => e.key === "Enter" && s(),
									children: [/* @__PURE__ */ f("div", {
										className: "fln__segment-bar",
										children: a.length > 0 ? a.map((e) => /* @__PURE__ */ f("button", {
											className: "fln__subseg",
											style: { background: B(e) },
											title: e.title,
											"aria-label": `Task: ${e.title}`,
											onClick: (n) => {
												n.stopPropagation(), T ? T(e.id, t) : (u && C(u, L.key), r && ae(`${r}?task=${e.id}`));
											}
										}, e.id)) : /* @__PURE__ */ f("div", { className: "fln__subseg fln__subseg--empty" })
									}), /* @__PURE__ */ f("button", {
										className: "fln__segment-nav",
										onClick: (e) => {
											e.stopPropagation(), s();
										},
										children: i ? /* @__PURE__ */ f(S, {
											entry: i,
											tooltipsEnabled: re,
											showDiacritics: ie,
											children: n
										}) : n
									})]
								}), c && /* @__PURE__ */ f("button", {
									type: "button",
									className: `fln__gate-indicator fln__gate-indicator--${c.status}`,
									title: `${c.label} (${c.status})`,
									"aria-label": `Gate: ${c.label} — ${c.status}`,
									onClick: () => {
										x && x(c.afterSegmentId, L.key);
									},
									children: /* @__PURE__ */ f("span", {
										className: "fln__gate-diamond",
										children: "◆"
									})
								})] }, t);
							})
						})
					]
				}, O)
			}),
			/* @__PURE__ */ f("div", {
				className: `fln__side fln__side--right${z ? " fln__side--active" : ""}`,
				onClick: () => z && se(),
				role: z ? "button" : void 0,
				tabIndex: z ? 0 : void 0,
				"aria-label": z ? `Navigate to next level: ${z.title}` : void 0,
				onKeyDown: z ? (e) => e.key === "Enter" && se() : void 0,
				children: z ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f(c, {
					className: "fln__chevron",
					style: { color: z.color },
					size: 36,
					strokeWidth: 1.5
				}), /* @__PURE__ */ p("div", {
					className: "fln__side-text fln__side-text--right",
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
var ne = 1500, re = 280, ie = (e) => e * e;
function ae({ onActivate: e, disabled: r = !1 } = {}) {
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
			let n = Math.min((e - h.current) / re, 1);
			if (b(g.current * (1 - ie(n))), n >= 1) {
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
function oe(e) {
	if (!e) return !1;
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return !1;
	let n = new Date(t);
	return n.setHours(5, 0, 0, 0), t.getHours() >= 5 && n.setDate(n.getDate() + 1), /* @__PURE__ */ new Date() < n;
}
var E = l(m((e, t) => ({
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
		return oe(n?.activatedAt);
	}
}), { name: "ogden-mithaq" }));
//#endregion
//#region src/components/MaqasidComparisonWheel/wheelColor.js
function D(e) {
	let t = e.replace("#", ""), n = t.length === 3 ? t.split("").map((e) => e + e).join("") : t, r = parseInt(n, 16);
	return [
		r >> 16 & 255,
		r >> 8 & 255,
		r & 255
	];
}
function O(e) {
	let t = e / 255;
	return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
}
function k(e) {
	let t = e <= .0031308 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - .055;
	return Math.max(0, Math.min(255, Math.round(t * 255)));
}
function A(e, t, n) {
	let r = O(e), i = O(t), a = O(n), o = Math.cbrt(.4122214708 * r + .5363325363 * i + .0514459929 * a), s = Math.cbrt(.2119034982 * r + .6806995451 * i + .1073969566 * a), c = Math.cbrt(.0883024619 * r + .2817188376 * i + .6299787005 * a);
	return [
		.2104542553 * o + .793617785 * s - .0040720468 * c,
		1.9779984951 * o - 2.428592205 * s + .4505937099 * c,
		.0259040371 * o + .7827717662 * s - .808675766 * c
	];
}
function j(e, t, n) {
	let r = e + .3963377774 * t + .2158037573 * n, i = e - .1055613458 * t - .0638541728 * n, a = e - .0894841775 * t - 1.291485548 * n, o = r * r * r, s = i * i * i, c = a * a * a;
	return [
		k(4.0767416621 * o - 3.3077115913 * s + .2309699292 * c),
		k(-1.2684380046 * o + 2.6097574011 * s - .3413193965 * c),
		k(-.0041960863 * o - .7034186147 * s + 1.707614701 * c)
	];
}
function se(e, t, n) {
	return [
		e,
		Math.sqrt(t * t + n * n),
		Math.atan2(n, t)
	];
}
function M(e, t, n) {
	let [r, i] = [t * Math.cos(n), t * Math.sin(n)], [a, o, s] = j(e, r, i), c = (e) => e.toString(16).padStart(2, "0");
	return `#${c(a)}${c(o)}${c(s)}`;
}
function ce(e) {
	if (!e || typeof e != "string" || !e.startsWith("#")) return {
		base: e,
		stroke: e,
		shimmer: e,
		hubTint: "#0c1a20",
		brightAura: e
	};
	try {
		let [t, n, r] = D(e), [i, a, o] = A(t, n, r), [, s, c] = se(i, a, o);
		return {
			base: e,
			stroke: M(.65, Math.min(s, .18), c),
			shimmer: M(.72, Math.min(s * .85, .15), c),
			hubTint: M(.1, Math.min(s * .3, .04), c),
			brightAura: M(.78, Math.min(s * .9, .16), c)
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
var N = 260, P = 14;
function F({ wisdom: e, x: t, y: n, levelColor: r, showDiacritics: i = !0 }) {
	if (!e || typeof document > "u") return null;
	let a = (typeof window < "u" ? window.innerWidth : 1024) - N - 8, o = Math.max(8, Math.min(a, t + P)), s = Math.max(8, n + P);
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
function I({ x: e, y: t, flip: n, levelColor: r, text: i, label: a = "Next", width: o = 160, height: s = 40, multiline: c = !1 }) {
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
var L = 200, R = 200, z = 56, B = 142, V = B, H = 184, le = (B + H) / 2, ue = 1e3;
function U(e, t) {
	let n = t * Math.PI / 180;
	return [L + e * Math.cos(n), R + e * Math.sin(n)];
}
function W(e, t, n, r) {
	let [i, a] = U(t, n), [o, s] = U(t, r), [c, l] = U(e, n), [u, d] = U(e, r), f = +(r - n > 180);
	return [
		`M ${c} ${l}`,
		`L ${i} ${a}`,
		`A ${t} ${t} 0 ${f} 1 ${o} ${s}`,
		`L ${u} ${d}`,
		`A ${e} ${e} 0 ${f} 0 ${c} ${l}`,
		"Z"
	].join(" ");
}
function de(e, t, n) {
	let [r, i] = U(e, t), [a, o] = U(e, n);
	return `M ${r} ${i} A ${e} ${e} 0 ${+(n - t > 180)} 1 ${a} ${o}`;
}
function fe({ centerLabel: e = "FAITH", levelColor: t = "#4ab8a8", levelPattern: s = "dots", level: c = "core", segments: l = [], onReach100: u, mithaqDomain: m = null, pillarWisdom: g = null, nextActions: _ = null, forceHover: v = null, forceConverged: y = !1, centerLabelOverride: b = null, onSegmentSelect: x = null, onHoverChange: S = null, showNextCard: C = !0, showDiacritics: w = !0 }) {
	let ee = o(), T = (e) => {
		if (x) {
			x(e);
			return;
		}
		e?.route && ee(e.route, { viewTransition: !0 });
	}, [ne, re] = a(null), [ie, oe] = a({
		x: 0,
		y: 0
	}), [D, O] = a(null), [k, A] = a(!1), j = i(null), [se, M] = a(0), N = h((e) => e.setHoveredPillar), P = h((e) => e.hoveredPillar);
	n(() => () => N(null), [N]);
	let fe = E((e) => e.activations), pe = E((e) => e.activate), G = r(() => {
		if (!m) return !0;
		let e = fe[m];
		if (!e?.activatedAt) return !1;
		let t = new Date(e.activatedAt);
		if (Number.isNaN(t.getTime())) return !1;
		let n = new Date(t);
		return n.setHours(5, 0, 0, 0), t.getHours() >= 5 && n.setDate(n.getDate() + 1), /* @__PURE__ */ new Date() < n;
	}, [m, fe]), K = m && !G, [q, me] = a(!1);
	n(() => {
		if (!q) return;
		let e = setTimeout(() => me(!1), 850);
		return () => clearTimeout(e);
	}, [q]);
	let { progress: he, isHolding: ge, bind: _e } = ae({
		disabled: !m || G,
		onActivate: () => {
			m && (pe(m), me(!0));
		}
	});
	n(() => {
		let e = requestAnimationFrame(() => A(!0));
		return () => cancelAnimationFrame(e);
	}, []), n(() => {
		if (!y) return;
		let e = requestAnimationFrame(() => me(!0)), t = setTimeout(() => me(!1), 850);
		return () => {
			cancelAnimationFrame(e), clearTimeout(t);
		};
	}, [y]), te(l, u);
	let J = r(() => ce(t), [t]), Y = 360 / (l.length || 1), X = -90 - Y / 2, Z = v || ne || P, Q = Z ? l.findIndex((e) => e.id === Z) : -1, $ = Q >= 0 ? l[Q] : null;
	n(() => {
		S && S(Z || null);
	}, [Z, S]);
	let ve = Q >= 0 ? X + Q * Y + Y / 2 + 90 : null, ye = r(() => {
		if (!P) return null;
		let e = l.findIndex((e) => e.id === P);
		return e < 0 ? null : X + e * Y + Y / 2 + 90;
	}, [
		P,
		l,
		X,
		Y
	]), be = ve ?? ye ?? se, xe = l.length ? Math.round(l.reduce((e, t) => e + (t.current || 0), 0) / l.length) : 0, Se = r(() => {
		if (l.length < 2) return 1;
		let e = l.reduce((e, t) => e + (t.current || 0), 0) / l.length, t = l.reduce((t, n) => t + ((n.current || 0) - e) ** 2, 0) / l.length;
		return Math.max(0, Math.min(1, 1 - Math.sqrt(t) / 40));
	}, [l]), Ce = $ ? $.tooltipText ? $.tooltipText : $.current >= 100 ? "Flourishing" : _?.[$.id]?.[c] || $.label : null, we = $?.tooltipLabel || "Next", Te = $?.tooltipWidth, Ee = $?.tooltipHeight, De = r(() => {
		if (Q < 0) return null;
		if ($?.tooltipText) return {
			x: L - ($.tooltipWidth || 200) / 2,
			y: 440,
			flip: !1
		};
		let e = X + Q * Y + Y / 2, [t, n] = U(H + 14, e), r = (e % 360 + 360) % 360;
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
		j.current && clearTimeout(j.current), j.current = setTimeout(() => {
			O(e);
		}, ue);
	}, Me = () => {
		j.current && clearTimeout(j.current), j.current = null, O(null);
	};
	n(() => () => {
		j.current && clearTimeout(j.current);
	}, []), n(() => {
		let e = (e) => {
			e.key === "Escape" && O(null);
		}, t = () => O(null);
		return window.addEventListener("keydown", e), window.addEventListener("scroll", t, !0), () => {
			window.removeEventListener("keydown", e), window.removeEventListener("scroll", t, !0);
		};
	}, []);
	let Ne = i(null), Pe = () => {
		Ne.current &&= (clearTimeout(Ne.current), null);
	};
	n(() => () => Pe(), []);
	let Fe = (e, t) => {
		Pe(), re(e.id), N(e.id), oe({
			x: t.clientX,
			y: t.clientY
		});
		let n = l.findIndex((t) => t.id === e.id);
		n >= 0 && M(X + n * Y + Y / 2 + 90), je(e.id);
	}, Ie = () => {
		Pe(), Ne.current = setTimeout(() => {
			re(null), N(null), Me(), Ne.current = null;
		}, 90);
	}, Le = (e, t) => {
		oe({
			x: t.clientX,
			y: t.clientY
		}), D && D !== e.id && O(null);
	}, Re = D && g ? g[D] : null;
	return /* @__PURE__ */ p("div", {
		className: "mcw-wrap",
		children: [
			/* @__PURE__ */ p("svg", {
				viewBox: "0 0 400 400",
				className: `mcw-svg${K ? " mcw-svg--dormant" : ""}${G || y ? " mcw-svg--lit" : ""}${q ? " mcw-svg--igniting" : ""}${y ? " mcw-svg--converged" : ""}`,
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
							cx: L,
							cy: R,
							r: V,
							fx: L,
							fy: R,
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
							cx: L,
							cy: R,
							r: V,
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
						let n = X + t * Y, r = X + (t + 1) * Y, i = Math.max(0, Math.min(100, e.current)), a = z + (V - z) * (i / 100), o = Z === e.id, s = i === 0, c = i >= 100, l = Math.round(i / 5), u = o ? " is-hovered" : "";
						return /* @__PURE__ */ p("g", {
							role: e.route ? "button" : "img",
							tabIndex: e.route ? 0 : void 0,
							"aria-label": `${e.label}: ${Math.round(e.current)}%${e.route ? " — open submodule" : ""}`,
							className: `mcw-sector${k ? " is-mounted" : ""}${u}`,
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
									d: W(z, V, n, r),
									fill: "url(#mcw-progress-grad-dim)",
									className: `mcw-seg-bg${u}`
								}),
								s && /* @__PURE__ */ f("path", {
									d: W(z + 4, V - 4, n, r),
									className: `mcw-seg-empty${u}`
								}),
								i > 0 && /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("path", {
									d: W(z, a, n, r),
									fill: e.color || "url(#mcw-progress-grad)",
									className: `mcw-seg-current${u}`,
									style: {
										animationDelay: `${t * 80}ms`,
										opacity: e.color ? .85 : void 0
									}
								}, `fill-${e.id}-${l}`), /* @__PURE__ */ f("path", {
									d: W(z, a, n, r),
									fill: `url(#${Ae})`,
									className: `mcw-seg-pattern${u}`,
									pointerEvents: "none"
								})] }),
								c && /* @__PURE__ */ f("path", {
									d: de(V - 2, n + 1, r - 1),
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
							d: W(B, H, n, r),
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
						cx: L,
						cy: R,
						r: H,
						className: "mcw-outer-stroke"
					}),
					/* @__PURE__ */ f("circle", {
						cx: L,
						cy: R,
						r: B,
						className: "mcw-outer-stroke"
					}),
					l.map((e, t) => {
						let n = e.Icon;
						if (!n) return null;
						let [r, i] = U(le, X + t * Y + Y / 2), a = Z === e.id, o = (e.current || 0) >= 100;
						return /* @__PURE__ */ p("g", {
							className: `mcw-pillar-vessel${a ? " is-hovered" : ""}${G || o || y ? " is-lit" : ""}${o ? " is-complete" : ""}`,
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
						className: `mcw-needle${Z && !K ? " is-active" : ""}`,
						style: {
							transform: `rotate(${be}deg)`,
							transformOrigin: `${L}px ${R}px`
						},
						pointerEvents: "none",
						children: /* @__PURE__ */ f("path", { d: `M ${L} ${R - z + 1} L ${L - 4} ${R - z - 7} L ${L + 4} ${R - z - 7} Z` })
					}),
					/* @__PURE__ */ p("g", {
						className: `mcw-hub-group${ge ? " is-holding" : ""}${K ? " is-dormant" : ""}`,
						...m && !G ? {
							..._e,
							role: "button",
							tabIndex: 0,
							"aria-label": `Press and hold to renew the ${e.toLowerCase()} covenant`
						} : { pointerEvents: "none" },
						children: [
							/* @__PURE__ */ f("circle", {
								cx: L,
								cy: R,
								r: z,
								className: `mcw-hub${Z && !K ? " is-active" : ""}`
							}),
							/* @__PURE__ */ f("circle", {
								cx: L,
								cy: R,
								r: z - 4,
								className: "mcw-hub-inner"
							}),
							m && !G && /* @__PURE__ */ f("circle", {
								className: "mcw-mithaq-ring",
								cx: L,
								cy: R,
								r: z + 4,
								fill: "none",
								stroke: J.brightAura,
								strokeWidth: 2,
								strokeLinecap: "round",
								pathLength: "1",
								strokeDasharray: "1",
								strokeDashoffset: 1 - he,
								transform: `rotate(-90 ${L} ${R})`,
								pointerEvents: "none"
							}),
							/* @__PURE__ */ f("text", {
								x: L,
								y: K ? R - 6 : R - 10,
								className: `mcw-hub-label${Z && !K ? " is-active" : ""}`,
								textAnchor: "middle",
								dominantBaseline: "middle",
								pointerEvents: "none",
								children: Oe
							}),
							!K && /* @__PURE__ */ f("text", {
								x: L,
								y: R + 10,
								className: "mcw-hub-readout",
								textAnchor: "middle",
								dominantBaseline: "middle",
								pointerEvents: "none",
								children: ke
							}),
							K && /* @__PURE__ */ f("text", {
								x: L,
								y: R + 12,
								className: "mcw-hub-hint",
								textAnchor: "middle",
								dominantBaseline: "middle",
								pointerEvents: "none",
								children: "Press & hold to renew"
							})
						]
					}),
					C && De && Ce && !K && /* @__PURE__ */ f(I, {
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
			Re && !K && /* @__PURE__ */ f(F, {
				wisdom: Re,
				x: ie.x,
				y: ie.y,
				levelColor: J.base,
				showDiacritics: w
			}),
			/* @__PURE__ */ f("div", {
				className: "mcw-aria-live",
				role: "status",
				"aria-live": "polite",
				children: q ? `${e} covenant renewed.` : ""
			})
		]
	});
}
//#endregion
export { S as IslamicTerm, T as LevelNavigator, fe as MaqasidComparisonWheel, I as MaqasidNextActionCard, F as WheelWisdomTooltip, ce as deriveWheelPalette, v as formatArabic, _ as stripDiacritics, te as useMilestoneWatcher, ae as useMithaqHold, E as useMithaqStore, h as useWheelHoverStore };

//# sourceMappingURL=ogden-ui-components.es.js.map