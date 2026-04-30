import { Component as e, Fragment as t, useCallback as n, useEffect as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { AlertTriangle as c, ArrowDownRight as l, ArrowUpRight as u, Ban as d, BookOpen as f, Bookmark as p, Check as m, CheckCircle as h, ChevronDown as g, ChevronUp as _, Download as v, Eye as ee, Folder as y, Loader as te, RotateCcw as ne, ShieldOff as re, ShieldX as b, Sparkles as ie, Star as ae, Upload as x, Workflow as S, X as oe, XCircle as se } from "lucide-react";
import { createPortal as ce } from "react-dom";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/data/bbos/bbos-task-definitions.js
var E = [
	{
		id: "IDY-S1",
		stage: "IDY",
		subLevel: "S1",
		label: "Raw Intake Capture",
		purpose: "Your answers as provided, without normalisation or interpretation. Preserves your exact language as the foundational record.",
		fields: [
			{
				id: "capitalDeclaration",
				type: "textarea",
				label: "Capital — Financial Stewardship Horizon",
				placeholder: "State your honest funding runway before requiring external capital or achieving principle-driven profitability. This is the number that is actually true.",
				rows: 4
			},
			{
				id: "skillsDeclaration",
				type: "textarea",
				label: "Skills — Core Competencies",
				placeholder: "Describe your core competencies as verified by evidence, not by self-assessment alone. What can be demonstrated, not only claimed.",
				rows: 4
			},
			{
				id: "proofLinks",
				type: "textarea",
				label: "Proof — Integrity Proof Links",
				placeholder: "Provide verifiable, hyperlinked references that directly substantiate your claims and experience. These become raw data for the Proof Audit.",
				rows: 4
			},
			{
				id: "constraintsDeclaration",
				type: "textarea",
				label: "Constraints — Non-Negotiable Aversions & Fixed Limits",
				placeholder: "Name your 3–5 non-negotiable work aversions and any fixed constraints on time, capital, or capacity. Naming these is self-stewardship, not weakness.",
				rows: 4
			},
			{
				id: "geographyDeclaration",
				type: "textarea",
				label: "Geography — Target Area & Community Commitment",
				placeholder: "Your specific preferred geographic area, associated zoning requirements, and commitment to the local community's well-being.",
				rows: 3
			},
			{
				id: "regulatoryDeclaration",
				type: "textarea",
				label: "Regulatory Pre-Check",
				placeholder: "Preliminary assessment of essential permits, licenses, and compliance requirements mandated by your target geography.",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "IDY-S2",
		stage: "IDY",
		subLevel: "S2",
		label: "Normalised Intake Packet",
		purpose: "The intake answers mapped to their corresponding BBOS fields (Capital, Skills, Proof, Constraints, Geography, Regulatory Pre-Check). Flags any field where the answer does not clearly map to the required data.",
		fields: [
			{
				id: "capitalMapping",
				type: "textarea",
				label: "Capital Field Mapping",
				placeholder: "Mapped capital data with flags for any ambiguities...",
				rows: 3
			},
			{
				id: "skillsMapping",
				type: "textarea",
				label: "Skills Field Mapping",
				placeholder: "Mapped skills data with flags for any ambiguities...",
				rows: 3
			},
			{
				id: "proofMapping",
				type: "textarea",
				label: "Proof Field Mapping",
				placeholder: "Mapped proof links with verification status...",
				rows: 3
			},
			{
				id: "constraintsMapping",
				type: "textarea",
				label: "Constraints Field Mapping",
				placeholder: "Mapped constraints with flags for any ambiguities...",
				rows: 3
			},
			{
				id: "geographyMapping",
				type: "textarea",
				label: "Geography Field Mapping",
				placeholder: "Mapped geography data with flags for any ambiguities...",
				rows: 3
			},
			{
				id: "regulatoryMapping",
				type: "textarea",
				label: "Regulatory Field Mapping",
				placeholder: "Mapped regulatory data with flags for any ambiguities...",
				rows: 3
			},
			{
				id: "mappingFlags",
				type: "textarea",
				label: "Mapping Flags & Ambiguities",
				placeholder: "List any fields where the answer does not clearly map to the required data...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "IDY-S3",
		stage: "IDY",
		subLevel: "S3",
		label: "Gap Check",
		purpose: "A review of which required fields are incomplete, ambiguous, or unverifiable from the intake data provided. Each gap listed with: what is missing, why it is required, and what information would resolve it.",
		fields: [
			{
				id: "gapList",
				type: "textarea",
				label: "Identified Gaps",
				placeholder: "List each gap: what is missing, why it is required, and what information would resolve it...",
				rows: 5
			},
			{
				id: "gapSeverity",
				type: "select",
				label: "Overall Gap Severity",
				options: [
					{
						value: "none",
						label: "No Gaps — All fields complete"
					},
					{
						value: "minor",
						label: "Minor — Clarifications needed, not blocking"
					},
					{
						value: "major",
						label: "Major — Critical fields incomplete"
					},
					{
						value: "disqualifying",
						label: "Disqualifying — Cannot proceed"
					}
				]
			},
			{
				id: "resolutionActions",
				type: "textarea",
				label: "Resolution Actions Required",
				placeholder: "Specific actions you must take to resolve each gap before routing can proceed...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "IDY-S4",
		stage: "IDY",
		subLevel: "S4",
		label: "Routing Decision",
		purpose: "Based on the normalised packet and gap check: route to Stage CRD if the intake is sufficiently complete and no disqualifying conditions are present, or output NO-SHIP — INTAKE INCOMPLETE if gaps prevent valid routing.",
		fields: [
			{
				id: "routingDecision",
				type: "select",
				label: "Routing Decision",
				options: [
					{
						value: "proceed",
						label: "Proceed → CRD (Stage 02 Credibility)"
					},
					{
						value: "incomplete",
						label: "NO-SHIP — Intake Incomplete"
					},
					{
						value: "reject",
						label: "Reject → Responsible Removal (Stage 02.1)"
					}
				]
			},
			{
				id: "routingBasis",
				type: "textarea",
				label: "Routing Basis",
				placeholder: "Which fields are complete, which gaps exist, and the specific basis for the routing decision...",
				rows: 4
			},
			{
				id: "disqualifierFlags",
				type: "textarea",
				label: "Disqualifier Flags",
				placeholder: "If routing to rejection, specify the disqualifier that triggered it...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "CRD-S1",
		stage: "CRD",
		subLevel: "S1",
		label: "Core Competency",
		purpose: "A precise, evidence-backed definition of your highest-leverage skill or unique operational expertise. The singular, most potent capability that forms the bedrock of your potential business model.",
		fields: [
			{
				id: "coreCompetencyStatement",
				type: "textarea",
				label: "Core Competency Statement",
				placeholder: "The singular highest-leverage skill defined with precision...",
				rows: 4
			},
			{
				id: "verifiableEvidence",
				type: "textarea",
				label: "Verifiable Evidence",
				placeholder: "Client outcomes, case studies, credentials, or documented results that substantiate the claim...",
				rows: 3
			},
			{
				id: "differentiationBasis",
				type: "text",
				label: "Differentiation Basis",
				placeholder: "What makes this competency distinct from competitors in the market..."
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING"]
	},
	{
		id: "CRD-S2",
		stage: "CRD",
		subLevel: "S2",
		label: "Advantage Register",
		purpose: "The articulation of your sustainable, principle-driven competitive advantage derived from S1 in the context of your target market. The moat built on integrity.",
		fields: [
			{
				id: "unfairAdvantage",
				type: "textarea",
				label: "Unfair Advantage (Amanah Asset)",
				placeholder: "A resource, network, or deeply lived experience that is unique and difficult for competition to ethically replicate...",
				rows: 4
			},
			{
				id: "marketContext",
				type: "textarea",
				label: "Target Market Context",
				placeholder: "How this advantage operates within the specific target market...",
				rows: 3
			},
			{
				id: "sustainabilityBasis",
				type: "textarea",
				label: "Sustainability Basis",
				placeholder: "Why this advantage is durable and difficult to replicate ethically...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "CRD-S3",
		stage: "CRD",
		subLevel: "S3",
		label: "Integrity Proof Audit",
		purpose: "A detailed, objective assessment of the Integrity Proof Links provided. Quantifies the reliability, scope, and direct ethical relevance of the provided evidence. Highlights gaps in proof.",
		fields: [
			{
				id: "proofInventory",
				type: "textarea",
				label: "Proof Inventory",
				placeholder: "List each proof link with its type: portfolio, testimonial, case study, credential, reference...",
				rows: 4
			},
			{
				id: "reliabilityAssessment",
				type: "textarea",
				label: "Reliability Assessment",
				placeholder: "For each proof item: verifiable (Y/N), strength rating, scope of relevance...",
				rows: 4
			},
			{
				id: "proofGaps",
				type: "textarea",
				label: "Proof Gaps Identified",
				placeholder: "Claims that lack sufficient supporting evidence and what would resolve each gap...",
				rows: 3
			},
			{
				id: "overallProofStrength",
				type: "select",
				label: "Overall Proof Strength",
				options: [
					{
						value: "strong",
						label: "Strong — Multiple verifiable, relevant proof items"
					},
					{
						value: "moderate",
						label: "Moderate — Some proof present, gaps identified"
					},
					{
						value: "weak",
						label: "Weak — Limited or non-verifiable proof"
					},
					{
						value: "insufficient",
						label: "Insufficient — Cannot support G1/G2 claims"
					}
				]
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING"]
	},
	{
		id: "CRD-S4",
		stage: "CRD",
		subLevel: "S4",
		label: "Energy Profile",
		purpose: "A psychological and operational map based on the intersection of Core Competency (S1) and Work Aversions. Identifies energy-generating vs energy-depleting activities. Designs for your longevity.",
		fields: [
			{
				id: "energyGeneratingActivities",
				type: "textarea",
				label: "Energy-Generating Activities",
				placeholder: "Activities that sustain and energise you — where competency and fulfilment overlap...",
				rows: 4
			},
			{
				id: "energyDepletingActivities",
				type: "textarea",
				label: "Energy-Depleting Activities",
				placeholder: "Activities that drain you — work aversions and tasks that erode capacity...",
				rows: 4
			},
			{
				id: "workAversions",
				type: "textarea",
				label: "3–5 Non-Negotiable Work Aversions",
				placeholder: "The specific categories of work you will not do, regardless of revenue potential...",
				rows: 3
			},
			{
				id: "longevityDesign",
				type: "textarea",
				label: "Longevity Design Notes",
				placeholder: "How the business model should be structured to sustain you over time...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "CRD-S5",
		stage: "CRD",
		subLevel: "S5",
		label: "Constraint Map",
		purpose: "A comprehensive outline of all significant limitations or obstacles. Includes Financial Stewardship Horizon, proof gaps (S3), regulatory hurdles, and resource dependencies. Critical for risk mitigation.",
		fields: [
			{
				id: "financialHorizon",
				type: "textarea",
				label: "Financial Stewardship Horizon",
				placeholder: "Honest projection of responsible funding runway — the number that is actually true...",
				rows: 3
			},
			{
				id: "financialRunwayMonths",
				type: "number",
				label: "Runway (months)",
				placeholder: "Number of months before external capital or profitability is required"
			},
			{
				id: "proofGapConstraints",
				type: "textarea",
				label: "Proof Gap Constraints (from S3)",
				placeholder: "How proof gaps limit what can be claimed or offered...",
				rows: 3
			},
			{
				id: "regulatoryHurdles",
				type: "textarea",
				label: "Regulatory Hurdles",
				placeholder: "Permits, licenses, compliance requirements that constrain operations...",
				rows: 3
			},
			{
				id: "resourceDependencies",
				type: "textarea",
				label: "Resource Dependencies",
				placeholder: "External resources, partnerships, or capabilities you depend on...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "CRD-S6",
		stage: "CRD",
		subLevel: "S6",
		label: "Regulatory Baseline",
		purpose: "A distilled summary of the essential permits, licenses, zoning compliance requirements, and operational standards mandated by the Target Zoning/Geography.",
		fields: [
			{
				id: "requiredPermits",
				type: "textarea",
				label: "Required Permits & Licenses",
				placeholder: "Essential permits and licenses mandated by the target geography...",
				rows: 4
			},
			{
				id: "zoningCompliance",
				type: "textarea",
				label: "Zoning Compliance Requirements",
				placeholder: "Commercial/industrial zoning requirements and current compliance status...",
				rows: 3
			},
			{
				id: "operationalStandards",
				type: "textarea",
				label: "Operational Standards",
				placeholder: "Industry-specific operational standards and certifications required...",
				rows: 3
			},
			{
				id: "regulatoryStatus",
				type: "select",
				label: "Regulatory Clearance Status",
				options: [
					{
						value: "clear",
						label: "Clear — All requirements met or achievable"
					},
					{
						value: "pending",
						label: "Pending — Requirements identified, not yet met"
					},
					{
						value: "hardStop",
						label: "Hard Stop — Fiduciary Barrier present"
					}
				]
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "CRD-V1",
		stage: "CRD",
		subLevel: "V1",
		label: "Viability Gate Results (Integrity Matrix)",
		purpose: "Each niche candidate evaluated against the four foundational gates: Regulatory Clearance (A), Addressable Market Fit (B), Certification/Competence Proof (C), and Proven Demand (D). Integrity first, opportunity second.",
		fields: [
			{
				id: "gateARegulatory",
				type: "select",
				label: "Gate A — Regulatory Clearance",
				options: [
					{
						value: "pass",
						label: "Pass"
					},
					{
						value: "fail",
						label: "Fail"
					},
					{
						value: "conditional",
						label: "Conditional — achievable with action"
					}
				]
			},
			{
				id: "gateBMarketFit",
				type: "select",
				label: "Gate B — Addressable Market Fit",
				options: [
					{
						value: "pass",
						label: "Pass"
					},
					{
						value: "fail",
						label: "Fail"
					},
					{
						value: "conditional",
						label: "Conditional — achievable with action"
					}
				]
			},
			{
				id: "gateCCompetenceProof",
				type: "select",
				label: "Gate C — Certification / Competence Proof",
				options: [
					{
						value: "pass",
						label: "Pass"
					},
					{
						value: "fail",
						label: "Fail"
					},
					{
						value: "conditional",
						label: "Conditional — achievable with action"
					}
				]
			},
			{
				id: "gateDProvenDemand",
				type: "select",
				label: "Gate D — Proven Demand",
				options: [
					{
						value: "pass",
						label: "Pass"
					},
					{
						value: "fail",
						label: "Fail"
					},
					{
						value: "conditional",
						label: "Conditional — achievable with action"
					}
				]
			},
			{
				id: "gateNotes",
				type: "textarea",
				label: "Gate Assessment Notes",
				placeholder: "Detailed rationale for each gate determination...",
				rows: 4
			},
			{
				id: "overallViability",
				type: "select",
				label: "Overall Viability Determination",
				options: [
					{
						value: "viable",
						label: "Viable — All gates cleared"
					},
					{
						value: "conditionallyViable",
						label: "Conditionally Viable — Action items required"
					},
					{
						value: "removed",
						label: "Removed — One or more gates failed"
					}
				]
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "CRD-V2",
		stage: "CRD",
		subLevel: "V2",
		label: "Removed Niche Log",
		purpose: "A documented log of all niche candidates removed during the viability pre-check, with the specific gate that caused removal and the reason.",
		fields: [{
			id: "removedNiches",
			type: "textarea",
			label: "Removed Niche Candidates",
			placeholder: "Niche name, gate that triggered removal, and specific reason...",
			rows: 5
		}, {
			id: "removalPatterns",
			type: "textarea",
			label: "Removal Pattern Analysis",
			placeholder: "Any patterns across removed niches that reveal systemic constraints...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "CRD-V3",
		stage: "CRD",
		subLevel: "V3",
		label: "Cleared Candidate Handoff",
		purpose: "The list of niche candidates that cleared all four viability gates, ready for scoring in the Asset Factory. Each candidate documented with its gate results.",
		fields: [{
			id: "clearedCandidates",
			type: "textarea",
			label: "Cleared Niche Candidates",
			placeholder: "Niche name, gate results summary, and readiness for scoring...",
			rows: 5
		}, {
			id: "handoffNotes",
			type: "textarea",
			label: "Handoff Notes",
			placeholder: "Any conditions, caveats, or considerations for the Asset Factory...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "CRD-FP02",
		stage: "CRD",
		subLevel: "FP-02",
		label: "Amanah Intake Screening Rubric",
		purpose: "A binary, escalation-ready screening tool that makes the Amanah Gate delegable. Score each question YES or NO based only on intake data — no inference, no benefit of the doubt. Automatic Disqualifiers trigger immediate rejection.",
		fields: [
			{
				id: "q1ProofVerifiable",
				type: "select",
				label: "Q1 — Verifiable proof for 2+ competencies?",
				options: [{
					value: "yes",
					label: "YES"
				}, {
					value: "no",
					label: "NO — Weak proof flag"
				}]
			},
			{
				id: "q2RegulatoryVerifiable",
				type: "select",
				label: "Q2 — Regulatory compliance independently verifiable?",
				options: [{
					value: "yes",
					label: "YES"
				}, {
					value: "no",
					label: "NO — Regulatory flag"
				}]
			},
			{
				id: "q3UnverifiableClaims",
				type: "select",
				label: "Q3 ★ — Business model requires unverifiable claims?",
				options: [{
					value: "no",
					label: "NO — Clear"
				}, {
					value: "yes",
					label: "YES — AUTO-DISQUALIFY"
				}]
			},
			{
				id: "q4RunwaySufficient",
				type: "select",
				label: "Q4 — Financial runway sufficient to first revenue milestone?",
				options: [{
					value: "yes",
					label: "YES"
				}, {
					value: "no",
					label: "NO — Viability flag"
				}]
			},
			{
				id: "q5RegulatoryMisuse",
				type: "select",
				label: "Q5 ★ — Intent to use assets without regulatory clearance?",
				options: [{
					value: "no",
					label: "NO — Clear"
				}, {
					value: "yes",
					label: "YES — AUTO-DISQUALIFY"
				}]
			},
			{
				id: "q6GoalAlignment",
				type: "select",
				label: "Q6 — Goal aligns with your offer categories?",
				options: [{
					value: "yes",
					label: "YES"
				}, {
					value: "no",
					label: "NO — Misalignment flag"
				}]
			},
			{
				id: "q7EnergyAversion",
				type: "select",
				label: "Q7 — Primary activity is an energy-depleting aversion?",
				options: [{
					value: "no",
					label: "NO — Clear"
				}, {
					value: "yes",
					label: "YES — Aversion flag, escalate"
				}]
			},
			{
				id: "q8FalseInformation",
				type: "select",
				label: "Q8 ★ — False, incomplete, or inconsistent information?",
				options: [{
					value: "no",
					label: "NO — Clear"
				}, {
					value: "yes",
					label: "YES — AUTO-DISQUALIFY"
				}]
			},
			{
				id: "q9ScopeUnderstanding",
				type: "select",
				label: "Q9 — Demonstrates understanding of offer scope?",
				options: [{
					value: "yes",
					label: "YES"
				}, {
					value: "no",
					label: "NO — Expectation misalignment flag"
				}]
			},
			{
				id: "q10CapacityRealistic",
				type: "select",
				label: "Q10 — Realistic delivery path within your capacity?",
				options: [{
					value: "yes",
					label: "YES"
				}, {
					value: "no",
					label: "NO — Capacity flag, escalate"
				}]
			},
			{
				id: "rubricRouting",
				type: "select",
				label: "Rubric Routing Decision",
				options: [
					{
						value: "proceed",
						label: "0–2 NOs — Proceed with founder notification"
					},
					{
						value: "escalate",
						label: "3–4 NOs — Escalate to founder"
					},
					{
						value: "reject",
						label: "5+ NOs or ★ triggered — Reject / Route to Removal"
					}
				]
			},
			{
				id: "rubricNotes",
				type: "textarea",
				label: "Screening Notes",
				placeholder: "Any flags, concerns, or observations from the screening process...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "CRD-AF1",
		stage: "CRD",
		subLevel: "AF-1",
		label: "Offer Category Match",
		purpose: "The mapping of your S1 Core Competency and S2 Advantage Register to viable offer categories that genuinely align with your capabilities.",
		fields: [{
			id: "matchedCategories",
			type: "textarea",
			label: "Matched Offer Categories",
			placeholder: "Offer categories that align with your verified competency and advantage...",
			rows: 4
		}, {
			id: "matchRationale",
			type: "textarea",
			label: "Match Rationale",
			placeholder: "Why each category is a genuine fit based on S1 and S2 evidence...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "CRD-AF2",
		stage: "CRD",
		subLevel: "AF-2",
		label: "Niche Candidates Scored",
		purpose: "Each cleared niche candidate scored against your capabilities, market fit, and constraint profile. Scores reflect honest capacity, not aspirational potential.",
		fields: [
			{
				id: "scoredCandidates",
				type: "textarea",
				label: "Scored Niche Candidates",
				placeholder: "One candidate name per line (e.g. Regenerative Agriculture Consulting)",
				rows: 5
			},
			{
				id: "marketVelocityScores",
				type: "textarea",
				label: "Market Velocity Scores",
				placeholder: "One score per line, 0–100, matching candidate order above (e.g. 82)",
				rows: 5
			},
			{
				id: "strategicScores",
				type: "textarea",
				label: "Strategic Scores",
				placeholder: "One score per line, 0–100, matching candidate order above (e.g. 76)",
				rows: 5
			},
			{
				id: "scoringMethodology",
				type: "textarea",
				label: "Scoring Methodology",
				placeholder: "The criteria and weighting used to produce each score...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "CRD-AF3",
		stage: "CRD",
		subLevel: "AF-3",
		label: "Niche Scoring Matrix",
		purpose: "A structured matrix presenting all scored niche candidates side by side for comparison, enabling transparent selection based on truthful assessment.",
		fields: [{
			id: "matrixData",
			type: "textarea",
			label: "Scoring Matrix",
			placeholder: "Structured comparison of all candidates across scoring criteria...",
			rows: 5
		}, {
			id: "topCandidateRanking",
			type: "textarea",
			label: "Top Candidate Ranking",
			placeholder: "Ranked list of strongest candidates with rationale...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "CRD-AF4",
		stage: "CRD",
		subLevel: "AF-4",
		label: "Score Pattern Analysis",
		purpose: "Analysis of patterns across the scoring matrix — where scores cluster, where gaps appear, and what the patterns reveal about your genuine strategic position.",
		fields: [
			{
				id: "scoreClusters",
				type: "textarea",
				label: "Score Clusters & Patterns",
				placeholder: "Where scores cluster high or low across candidates, and what this reveals...",
				rows: 4
			},
			{
				id: "strategicImplications",
				type: "textarea",
				label: "Strategic Implications",
				placeholder: "What the patterns suggest about your strongest path forward...",
				rows: 3
			},
			{
				id: "gapAnalysis",
				type: "textarea",
				label: "Gap Analysis",
				placeholder: "Where your capabilities fall short across all candidates...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "CRD-AF5",
		stage: "CRD",
		subLevel: "AF-5",
		label: "Amanah Proof Audit",
		purpose: "The definitive audit of all claimed proof for the selected niche, quantifying reliability and identifying claims that cannot be ethically sustained through the pipeline.",
		fields: [
			{
				id: "auditedClaims",
				type: "textarea",
				label: "Audited Claims",
				placeholder: "Each claim paired with its supporting proof and verification status...",
				rows: 5
			},
			{
				id: "claimStrengthRatings",
				type: "textarea",
				label: "Claim Strength Ratings",
				placeholder: "For each claim: Strong (G1-eligible), Moderate (G2-eligible), Weak (cannot sustain), Unverifiable...",
				rows: 4
			},
			{
				id: "auditConclusion",
				type: "textarea",
				label: "Audit Conclusion",
				placeholder: "Summary determination on whether the proof base is sufficient to proceed...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING"]
	},
	{
		id: "STR-S1",
		stage: "STR",
		subLevel: "S1",
		label: "Market Definition",
		purpose: "Define the target buyer's current situation, their immediate context, and the specific goal they are trying to accomplish.",
		fields: [
			{
				id: "targetBuyerSituation",
				type: "textarea",
				label: "Target Buyer — Current Situation",
				placeholder: "The target buyer's actual current situation and immediate context...",
				rows: 4
			},
			{
				id: "specificGoal",
				type: "textarea",
				label: "Specific Goal",
				placeholder: "The specific goal the target buyer is trying to accomplish...",
				rows: 3
			},
			{
				id: "audienceSegments",
				type: "textarea",
				label: "Audience Segments",
				placeholder: "Primary, secondary, and tertiary audience segments if applicable...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "STR-S2",
		stage: "STR",
		subLevel: "S2",
		label: "Voice of Customer (Buying Language Bank)",
		purpose: "A list of 15+ verbatim phrases from the sources describing problems, frustrations, and the specific hell the target audience is trying to escape. Verbatim only — no paraphrasing.",
		fields: [
			{
				id: "verbatimPhrases",
				type: "textarea",
				label: "Verbatim Buying Language (15+ phrases)",
				placeholder: "Exact quotes from sources — no paraphrasing. Include source attribution for each...",
				rows: 5
			},
			{
				id: "sourceAttribution",
				type: "textarea",
				label: "Source Attribution",
				placeholder: "For each phrase: source name, platform, date if available...",
				rows: 4
			},
			{
				id: "languagePatterns",
				type: "textarea",
				label: "Language Patterns Observed",
				placeholder: "Recurring themes, metaphors, or emotional patterns across the verbatim phrases...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "STR-S3",
		stage: "STR",
		subLevel: "S3",
		label: "Emotional Triggers",
		purpose: "Catalog the top 3 fears (what keeps them up) and top 3 desires (what they secretly hope for) found in the data, for each audience segment.",
		fields: [
			{
				id: "topFears",
				type: "textarea",
				label: "Top 3 Fears",
				placeholder: "The three deepest fears found in the data — what keeps the audience up at night...",
				rows: 4
			},
			{
				id: "topDesires",
				type: "textarea",
				label: "Top 3 Desires",
				placeholder: "The three deepest desires found in the data — what they secretly hope for...",
				rows: 4
			},
			{
				id: "dataSource",
				type: "textarea",
				label: "Supporting Data Sources",
				placeholder: "Which VoC phrases or sources support each fear and desire...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "STR-S4",
		stage: "STR",
		subLevel: "S4",
		label: "Competitive Enemy Analysis",
		purpose: "Identify 'The Enemy' — the external force causing the problem — and summarise how current competitor solutions in the sources are failing to defeat it. The enemy is never the customer's character.",
		fields: [
			{
				id: "enemyDefinition",
				type: "textarea",
				label: "The Enemy (External System)",
				placeholder: "The convergent set of cultural, theological, economic, or systemic forces that has trapped the audience...",
				rows: 5
			},
			{
				id: "enemyForces",
				type: "textarea",
				label: "Enemy Forces Breakdown",
				placeholder: "List each force contributing to the enemy system (e.g. cultural narratives, institutional failures, economic pressures)...",
				rows: 4
			},
			{
				id: "competitorFailures",
				type: "textarea",
				label: "How Current Solutions Fail",
				placeholder: "How existing competitor solutions are failing to defeat the enemy — the gap no one is filling...",
				rows: 4
			},
			{
				id: "whiteSpace",
				type: "textarea",
				label: "White Space Identified",
				placeholder: "The specific gap in the market that the operator's solution addresses...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "STR-S5",
		stage: "STR",
		subLevel: "S5",
		label: "Operator Strategic Constraints",
		purpose: "Based on the Operator Asset Inventory (Stages IDY–CRD), list the specific constraints (time, capital, skills, energy) that this strategy must respect. Label anything not confirmed in the CRD Asset Pack as ASSUMPTION.",
		fields: [
			{
				id: "timeConstraint",
				type: "textarea",
				label: "Time Constraint",
				placeholder: "Available hours, facilitation limits, cohort size constraints...",
				rows: 3
			},
			{
				id: "capitalConstraint",
				type: "textarea",
				label: "Capital Constraint",
				placeholder: "Investment limits, scaling constraints, proof-of-results requirements...",
				rows: 3
			},
			{
				id: "skillsConstraint",
				type: "textarea",
				label: "Skills Constraint",
				placeholder: "Required competencies vs current verified capabilities...",
				rows: 3
			},
			{
				id: "energyConstraint",
				type: "textarea",
				label: "Energy Constraint",
				placeholder: "Emotional demand, rest protocols, session limits to preserve operator Barakah...",
				rows: 3
			},
			{
				id: "assumptionFlags",
				type: "textarea",
				label: "Assumption Flags",
				placeholder: "Any constraint above that is ASSUMED rather than confirmed from CRD data — label explicitly...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "STR-V1",
		stage: "STR",
		subLevel: "V1",
		label: "Integrity Matrix",
		purpose: "The Amanah Viability Pre-Check for the strategy stage — evaluating each niche candidate against integrity criteria before strategy assets are built.",
		fields: [{
			id: "integrityAssessment",
			type: "textarea",
			label: "Integrity Assessment",
			placeholder: "Each candidate evaluated against integrity criteria with pass/fail determination...",
			rows: 5
		}, {
			id: "integrityVerdict",
			type: "select",
			label: "Overall Integrity Verdict",
			options: [
				{
					value: "pass",
					label: "Pass — Integrity criteria met"
				},
				{
					value: "conditionalPass",
					label: "Conditional Pass — Items to resolve"
				},
				{
					value: "fail",
					label: "Fail — Cannot proceed with integrity"
				}
			]
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "STR-V2",
		stage: "STR",
		subLevel: "V2",
		label: "Responsible Removal Log",
		purpose: "A documented log of niche candidates or strategy directions removed during the integrity pre-check, with the specific reason and what was genuinely seen in the data.",
		fields: [{
			id: "removedItems",
			type: "textarea",
			label: "Removed Candidates / Directions",
			placeholder: "What was removed, which integrity criterion triggered removal, and the specific reason...",
			rows: 5
		}, {
			id: "removalLessons",
			type: "textarea",
			label: "Lessons from Removal",
			placeholder: "What the removals reveal about the operator's strategic position...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "STR-V3",
		stage: "STR",
		subLevel: "V3",
		label: "Cleansed Candidate Handoff",
		purpose: "The list of strategy candidates that cleared the integrity matrix, ready for asset production. Each candidate documented with its integrity results.",
		fields: [{
			id: "cleansedCandidates",
			type: "textarea",
			label: "Cleansed Candidates",
			placeholder: "Candidates that cleared integrity review, with summary of results...",
			rows: 5
		}, {
			id: "assetFactoryReadiness",
			type: "textarea",
			label: "Asset Factory Readiness Notes",
			placeholder: "Any conditions or context for the Asset Factory to consider...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "STR-AF1",
		stage: "STR",
		subLevel: "AF-1",
		label: "The Belief (Strategic Contribution)",
		purpose: "One specific sentence the prospect must believe is true to take action. Emotionally resonant, using customer language from S2. If believed, the operator's offer becomes the only logical solution.",
		fields: [
			{
				id: "beliefStatement",
				type: "textarea",
				label: "The Belief Statement",
				placeholder: "A single sentence that, if believed, makes the operator's eventual offer the only logical solution...",
				rows: 3
			},
			{
				id: "vocSourcePhrases",
				type: "textarea",
				label: "VoC Source Phrases",
				placeholder: "The specific S2 verbatim phrases that seed this belief...",
				rows: 3
			},
			{
				id: "beliefValidation",
				type: "textarea",
				label: "Belief Validation",
				placeholder: "Why this belief is genuinely present in the data, not projected onto it...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "STR-AF2",
		stage: "STR",
		subLevel: "AF-2",
		label: "Enemy Narrative (Stewardship Opportunities)",
		purpose: "A 3-paragraph Transformation Arc: (1) The Before state — the struggle against the external Enemy, (2) The Transformation — how the operator's method changes the situation, (3) The After state — the G4-labelled Aspirational Outcome.",
		fields: [
			{
				id: "beforeState",
				type: "textarea",
				label: "Paragraph 1 — The Before State",
				placeholder: "The struggle against the external Enemy. The enemy is systemic, not personal...",
				rows: 4
			},
			{
				id: "transformation",
				type: "textarea",
				label: "Paragraph 2 — The Transformation",
				placeholder: "How the operator's unique method or belief changes the situation...",
				rows: 4
			},
			{
				id: "afterState",
				type: "textarea",
				label: "Paragraph 3 — The After State (G4 Outcome)",
				placeholder: "The G4-labelled aspirational outcome — what life looks like on the other side...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "STR-AF3",
		stage: "STR",
		subLevel: "AF-3",
		label: "Positioning Statement",
		purpose: "A one-sentence statement defining how the operator stands apart from the competitors listed in S3/S4. Must use verbatim VoC language from S2 as its seed.",
		fields: [
			{
				id: "positioningStatement",
				type: "textarea",
				label: "Positioning Statement",
				placeholder: "A one-sentence statement using verbatim VoC language that defines how the operator stands apart...",
				rows: 3
			},
			{
				id: "vocSeedPhrases",
				type: "textarea",
				label: "VoC Seed Phrases",
				placeholder: "The specific S2 verbatim phrases used to seed the positioning...",
				rows: 3
			},
			{
				id: "competitorDifferentiation",
				type: "textarea",
				label: "Competitor Differentiation Basis",
				placeholder: "How this positioning separates the operator from S3/S4 competitors...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "STR-AF4",
		stage: "STR",
		subLevel: "AF-4",
		label: "Amanah Content Engine",
		purpose: "6 distinct content angles (hooks and core arguments) derived from the STR research. Each angle addresses a specific Fear or Desire from S3. All Dream Outcomes labelled G4. Process claims labelled G1 or G2.",
		fields: [
			{
				id: "contentAngle1",
				type: "textarea",
				label: "Content Angle 1",
				placeholder: "Hook, core argument, Fear/Desire addressed, G-label applied...",
				rows: 3
			},
			{
				id: "contentAngle2",
				type: "textarea",
				label: "Content Angle 2",
				placeholder: "Hook, core argument, Fear/Desire addressed, G-label applied...",
				rows: 3
			},
			{
				id: "contentAngle3",
				type: "textarea",
				label: "Content Angle 3",
				placeholder: "Hook, core argument, Fear/Desire addressed, G-label applied...",
				rows: 3
			},
			{
				id: "contentAngle4",
				type: "textarea",
				label: "Content Angle 4",
				placeholder: "Hook, core argument, Fear/Desire addressed, G-label applied...",
				rows: 3
			},
			{
				id: "contentAngle5",
				type: "textarea",
				label: "Content Angle 5",
				placeholder: "Hook, core argument, Fear/Desire addressed, G-label applied...",
				rows: 3
			},
			{
				id: "contentAngle6",
				type: "textarea",
				label: "Content Angle 6",
				placeholder: "Hook, core argument, Fear/Desire addressed, G-label applied...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "STR-AF5",
		stage: "STR",
		subLevel: "AF-5",
		label: "Truth-Gate Advisory",
		purpose: "Identify the 3 strongest Buying Language phrases that are safe to use as headlines without further substantiation. These must earn that designation from the data — not from the offer.",
		fields: [
			{
				id: "safePhrase1",
				type: "text",
				label: "Safe Headline Phrase 1",
				placeholder: "Verbatim phrase from S2 safe for headline use..."
			},
			{
				id: "safePhrase1Justification",
				type: "textarea",
				label: "Phrase 1 — Justification",
				placeholder: "Why this phrase earned safe-for-headline status from the data...",
				rows: 3
			},
			{
				id: "safePhrase2",
				type: "text",
				label: "Safe Headline Phrase 2",
				placeholder: "Verbatim phrase from S2 safe for headline use..."
			},
			{
				id: "safePhrase2Justification",
				type: "textarea",
				label: "Phrase 2 — Justification",
				placeholder: "Why this phrase earned safe-for-headline status from the data...",
				rows: 3
			},
			{
				id: "safePhrase3",
				type: "text",
				label: "Safe Headline Phrase 3",
				placeholder: "Verbatim phrase from S2 safe for headline use..."
			},
			{
				id: "safePhrase3Justification",
				type: "textarea",
				label: "Phrase 3 — Justification",
				placeholder: "Why this phrase earned safe-for-headline status from the data...",
				rows: 3
			},
			{
				id: "truthGateConclusion",
				type: "textarea",
				label: "Truth-Gate Conclusion",
				placeholder: "Summary of what can and cannot be safely claimed based on the data...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-S1",
		stage: "OFR",
		subLevel: "S1",
		label: "Niche Summary",
		purpose: "Define the specific market niche the operator serves — whom we serve, with what problem, and why this operator is the right steward for this audience.",
		fields: [
			{
				id: "nicheDefinition",
				type: "textarea",
				label: "Niche Definition",
				placeholder: "The specific market segment, industry, or community this offer is designed for...",
				rows: 4
			},
			{
				id: "coreProblem",
				type: "textarea",
				label: "Core Problem Statement",
				placeholder: "The primary pain point or unmet need this niche experiences...",
				rows: 3
			},
			{
				id: "operatorFit",
				type: "textarea",
				label: "Operator-Niche Fit",
				placeholder: "Why this operator is uniquely positioned to serve this niche — evidence of alignment...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-S2",
		stage: "OFR",
		subLevel: "S2",
		label: "Voice of Customer",
		purpose: "Capture the authentic language, pain points, desires, and decision drivers of the target audience using real market data — not operator assumptions.",
		fields: [
			{
				id: "vocQuotes",
				type: "textarea",
				label: "Voice of Customer Quotes",
				placeholder: "Direct quotes, forum excerpts, or interview snippets from the target audience...",
				rows: 5
			},
			{
				id: "painPoints",
				type: "textarea",
				label: "Documented Pain Points",
				placeholder: "Recurring frustrations, unmet needs, and emotional triggers identified in research...",
				rows: 4
			},
			{
				id: "desiredOutcomes",
				type: "textarea",
				label: "Desired Outcomes",
				placeholder: "What the audience explicitly says they want — in their own language...",
				rows: 3
			},
			{
				id: "decisionDrivers",
				type: "textarea",
				label: "Decision Drivers",
				placeholder: "What factors influence buying decisions — trust signals, price sensitivity, urgency...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-S3",
		stage: "OFR",
		subLevel: "S3",
		label: "Competitor References",
		purpose: "Map the competitive landscape to understand where the operator stands — identifying gaps, strengths, and honest differentiation opportunities.",
		fields: [
			{
				id: "competitorList",
				type: "textarea",
				label: "Competitor Overview",
				placeholder: "Key competitors: name, offer summary, pricing, and positioning...",
				rows: 5
			},
			{
				id: "gapAnalysis",
				type: "textarea",
				label: "Gap & Differentiation Analysis",
				placeholder: "Where competitors fall short and where the operator has genuine advantage...",
				rows: 4
			},
			{
				id: "honestWeaknesses",
				type: "textarea",
				label: "Honest Weaknesses",
				placeholder: "Where competitors are genuinely stronger — areas requiring humility or development...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-S4",
		stage: "OFR",
		subLevel: "S4",
		label: "Pricing References",
		purpose: "Research market pricing to establish what is fair and right — benchmarking against competitor rates, perceived value, and the operator's genuine cost of delivery.",
		fields: [
			{
				id: "marketPricingData",
				type: "textarea",
				label: "Market Pricing Data",
				placeholder: "Competitor pricing, industry benchmarks, and price range for comparable services...",
				rows: 4
			},
			{
				id: "costOfDelivery",
				type: "textarea",
				label: "Cost of Delivery Estimate",
				placeholder: "Honest estimate of time, resources, and expenses required to deliver the offer...",
				rows: 3
			},
			{
				id: "pricingInsights",
				type: "textarea",
				label: "Pricing Insights & Positioning",
				placeholder: "Where the operator should position relative to market — premium, mid, or value — and why...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-S5",
		stage: "OFR",
		subLevel: "S5",
		label: "Operator Constraints",
		purpose: "Document the operator's real constraints — capacity, time, bandwidth, geography, tools — as non-negotiable hard stops that the offer cannot exceed.",
		fields: [
			{
				id: "capacityConstraints",
				type: "textarea",
				label: "Capacity Constraints",
				placeholder: "Maximum clients, hours per week, geographic limits, team size...",
				rows: 4
			},
			{
				id: "toolConstraints",
				type: "textarea",
				label: "Tool & Resource Constraints",
				placeholder: "Software, infrastructure, or resource limitations that bound delivery...",
				rows: 3
			},
			{
				id: "nonNegotiableBoundaries",
				type: "textarea",
				label: "Non-Negotiable Boundaries",
				placeholder: "Hard limits the operator will not cross — ethical, personal, or operational...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-A1",
		stage: "OFR",
		subLevel: "A1",
		label: "The Promise (G1/G2)",
		purpose: "Define the core guaranteed result or transformation the client receives. Must be G1 or G2 only — with formal proof documentation or PROOF PENDING status. Strictly prohibited from client-facing use without proof.",
		fields: [
			{
				id: "promiseStatement",
				type: "textarea",
				label: "Promise Statement",
				placeholder: "The specific, deliverable-grounded commitment of tangible outcome the client receives...",
				rows: 4
			},
			{
				id: "promiseGLabel",
				type: "select",
				label: "G-Label Classification",
				options: [{
					value: "G1",
					label: "G1 — Deliverable (fully within operator control)"
				}, {
					value: "G2",
					label: "G2 — Standard (reasonably expected under typical conditions)"
				}]
			},
			{
				id: "proofReference",
				type: "textarea",
				label: "Proof Reference",
				placeholder: "Named proof asset, case study, or documented metric that substantiates this promise...",
				rows: 3
			},
			{
				id: "proofStatus",
				type: "select",
				label: "Proof Status",
				options: [{
					value: "verified",
					label: "Verified — proof asset available"
				}, {
					value: "pending",
					label: "PROOF PENDING — not yet documented"
				}]
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING", "CLAIM_UNVERIFIED"]
	},
	{
		id: "OFR-A2",
		stage: "OFR",
		subLevel: "A2",
		label: "Ideal Customer Profile",
		purpose: "A detailed, data-driven profile of the specific customer segment — demographics, psychographics, buying behavior, and qualification criteria.",
		fields: [
			{
				id: "demographicProfile",
				type: "textarea",
				label: "Demographic Profile",
				placeholder: "Industry, role, company size, geography, revenue range...",
				rows: 3
			},
			{
				id: "psychographicProfile",
				type: "textarea",
				label: "Psychographic Profile",
				placeholder: "Values, beliefs, motivations, fears, and aspirations of the ideal client...",
				rows: 4
			},
			{
				id: "qualificationCriteria",
				type: "textarea",
				label: "Qualification Criteria",
				placeholder: "Specific criteria a prospect must meet to be a genuine fit for this offer...",
				rows: 3
			},
			{
				id: "disqualificationCriteria",
				type: "textarea",
				label: "Disqualification Criteria",
				placeholder: "Red flags or characteristics that indicate a prospect is not a fit...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-A3",
		stage: "OFR",
		subLevel: "A3",
		label: "The Mechanism",
		purpose: "Define the unique, proprietary system or process that is the reliable engine for producing the promised result. The mechanism must be specific, ethical, and genuinely capable.",
		fields: [
			{
				id: "mechanismName",
				type: "text",
				label: "Mechanism Name",
				placeholder: "The proprietary name for this system or process..."
			},
			{
				id: "mechanismDescription",
				type: "textarea",
				label: "Mechanism Description",
				placeholder: "Step-by-step description of how this process produces the promised outcome...",
				rows: 5
			},
			{
				id: "mechanismDifferentiator",
				type: "textarea",
				label: "Differentiation",
				placeholder: "What makes this mechanism unique compared to standard industry approaches...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OFR-A4",
		stage: "OFR",
		subLevel: "A4",
		label: "Scope Map",
		purpose: "Explicitly detail what is INCLUDED, EXCLUDED, and what triggers a change order — to manage expectations, prevent scope creep, and uphold bilateral equity between operator and client.",
		fields: [
			{
				id: "scopeIncluded",
				type: "textarea",
				label: "Included (Commitments)",
				placeholder: "Everything the client can expect to receive — specific deliverables, services, support...",
				rows: 5
			},
			{
				id: "scopeExcluded",
				type: "textarea",
				label: "Excluded (Non-Commitments)",
				placeholder: "Everything explicitly NOT included — be specific enough that no reasonable misunderstanding can occur...",
				rows: 5
			},
			{
				id: "changeOrderTriggers",
				type: "textarea",
				label: "Change-Order Triggers",
				placeholder: "Clear conditions under which the scope must be renegotiated...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "OFR-A5",
		stage: "OFR",
		subLevel: "A5",
		label: "Value Stack",
		purpose: "An itemized list of all offer components with their Perceived Monetary Value (PMV), justifying the final price through transparent, honest valuation.",
		fields: [
			{
				id: "valueItems",
				type: "textarea",
				label: "Value Stack Items",
				placeholder: "Each component: name, description, and Perceived Monetary Value (PMV)...",
				rows: 5
			},
			{
				id: "totalPmv",
				type: "number",
				label: "Total Perceived Monetary Value (PMV)",
				placeholder: "Sum of all PMV values..."
			},
			{
				id: "pmvJustification",
				type: "textarea",
				label: "PMV Justification",
				placeholder: "How each PMV was determined — market comparables, cost basis, or documented outcomes...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "OFR-A6",
		stage: "OFR",
		subLevel: "A6",
		label: "Risk Reversal (Guarantee)",
		purpose: "Define the contractual mechanism (guarantee, trial, or remedy) that reduces client risk. Must contain all four required elements or it is structurally incomplete.",
		fields: [
			{
				id: "triggerCondition",
				type: "textarea",
				label: "Trigger Condition",
				placeholder: "What specific event or threshold must occur for the guarantee to activate...",
				rows: 3
			},
			{
				id: "guaranteeScope",
				type: "textarea",
				label: "Guarantee Scope",
				placeholder: "What the remedy covers — which deliverables, which timeframe, which conditions...",
				rows: 3
			},
			{
				id: "remedy",
				type: "textarea",
				label: "Remedy",
				placeholder: "The specific action taken when triggered — refund, redo, credit, extension...",
				rows: 3
			},
			{
				id: "operatorBoundaries",
				type: "textarea",
				label: "Operator-Side Boundaries",
				placeholder: "The steward's limits of liability — what the guarantee does NOT cover...",
				rows: 3
			},
			{
				id: "guaranteeGLabel",
				type: "select",
				label: "Guarantee G-Label",
				options: [
					{
						value: "G1",
						label: "G1 — Deliverable guarantee"
					},
					{
						value: "G2",
						label: "G2 — Standard guarantee"
					},
					{
						value: "G3",
						label: "G3 — Conditional guarantee (requires IF language)"
					}
				]
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "OFR-A7",
		stage: "OFR",
		subLevel: "A7",
		label: "Pricing Structure",
		purpose: "Define the final price, payment terms, and financing — justified by the PMV in Asset 5 and transparent enough that the client knows exactly what is being exchanged.",
		fields: [
			{
				id: "finalPrice",
				type: "number",
				label: "Final Price",
				placeholder: "The total cost to the client..."
			},
			{
				id: "pricingModel",
				type: "select",
				label: "Pricing Model",
				options: [
					{
						value: "fixed",
						label: "Fixed Price"
					},
					{
						value: "retainer",
						label: "Monthly Retainer"
					},
					{
						value: "milestone",
						label: "Milestone-Based"
					},
					{
						value: "hybrid",
						label: "Hybrid (Fixed + Performance)"
					},
					{
						value: "other",
						label: "Other"
					}
				]
			},
			{
				id: "paymentTerms",
				type: "textarea",
				label: "Payment Terms",
				placeholder: "Payment schedule, deposit requirements, installment options...",
				rows: 3
			},
			{
				id: "priceJustification",
				type: "textarea",
				label: "Price Justification",
				placeholder: "How the price relates to total PMV — the case for fairness to both parties...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "OFR-A8",
		stage: "OFR",
		subLevel: "A8",
		label: "Proof Plan",
		purpose: "The centralized repository for all evidence, case studies, and verifiable metrics that substantiate Asset 1 (Promise) claims. Links proof assets to specific claims throughout the offer.",
		fields: [
			{
				id: "proofAssets",
				type: "textarea",
				label: "Proof Assets Inventory",
				placeholder: "List each proof asset: type (case study, testimonial, metric, screenshot), description, and which claim it substantiates...",
				rows: 5
			},
			{
				id: "proofGaps",
				type: "textarea",
				label: "Proof Gaps (PROOF PENDING)",
				placeholder: "Claims that do not yet have substantiating evidence — these are PROOF PENDING and cannot be client-facing...",
				rows: 4
			},
			{
				id: "proofCollectionPlan",
				type: "textarea",
				label: "Proof Collection Plan",
				placeholder: "Timeline and method for gathering missing proof — which clients to ask, what data to capture...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING", "CLAIM_UNVERIFIED"]
	},
	{
		id: "OFR-V1",
		stage: "OFR",
		subLevel: "V1",
		label: "Integrity Matrix (Feasibility & Amanah Gate)",
		purpose: "A pass/fail record of legal, regulatory, and geographic feasibility checks for all initial offer concepts — with specific flags for each candidate.",
		fields: [
			{
				id: "candidateAssessments",
				type: "textarea",
				label: "Candidate Assessments",
				placeholder: "Each concept: pass/fail status, legal flags, regulatory concerns, geographic limitations...",
				rows: 5
			},
			{
				id: "removalLog",
				type: "textarea",
				label: "Responsible Removal Log (V2)",
				placeholder: "All failed concepts with specific rationale for removal...",
				rows: 4
			},
			{
				id: "cleansedCandidates",
				type: "textarea",
				label: "Cleansed Candidate Handoff (V3)",
				placeholder: "Final viable concepts that passed legal and geographic checks...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "OFR-V2",
		stage: "OFR",
		subLevel: "V2",
		label: "Sustainable Impact Scoring (Pre-Asset Factory)",
		purpose: "Score and select cleansed candidates based on market fit, strategic alignment, ethical viability, and sustainable impact — culminating in an Amanah Audit of the final selection.",
		fields: [
			{
				id: "scoringMatrix",
				type: "textarea",
				label: "Sustainable Impact Scoring Matrix",
				placeholder: "Each candidate scored on: Market Potential, Development Complexity, Resource Cost, Strategic Fit, ROI...",
				rows: 5
			},
			{
				id: "nicheOpportunities",
				type: "textarea",
				label: "Stewardship Opportunities (Niche Candidates)",
				placeholder: "Blue ocean strategies or highly specialized market opportunities identified...",
				rows: 4
			},
			{
				id: "patternAnalysis",
				type: "textarea",
				label: "Wisdom-Driven Pattern Analysis",
				placeholder: "Trends, successful characteristics, and common failure points across candidates...",
				rows: 4
			},
			{
				id: "amanahAudit",
				type: "textarea",
				label: "Amanah Audit",
				placeholder: "Final ethical and compliance review ensuring adherence to the Trust Mandate...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "OFR-FP03",
		stage: "OFR",
		subLevel: "FP03",
		label: "Compressed Cycle Sign-Off (FP-03)",
		purpose: "Document the compressed cycle exception for time-constrained commercial decisions (48 hours or less). All three entry conditions and all substitutions must be verified and signed.",
		fields: [
			{
				id: "externalDeadline",
				type: "text",
				label: "External Deadline (Date/Time)",
				placeholder: "The documented, externally-imposed deadline..."
			},
			{
				id: "externalParty",
				type: "text",
				label: "External Party Who Imposed Deadline",
				placeholder: "Name of the party — not the operator..."
			},
			{
				id: "stewardshipScore",
				type: "number",
				label: "Current Stewardship Score",
				placeholder: "Must be 7.0 or above..."
			},
			{
				id: "deliberatePauseCompleted",
				type: "select",
				label: "Deliberate Pause Completed",
				options: [{
					value: "yes",
					label: "YES — minimum 30 minutes undisturbed reflection"
				}, {
					value: "no",
					label: "NO — not yet completed"
				}]
			},
			{
				id: "reflectionNote",
				type: "textarea",
				label: "Reflection Note",
				placeholder: "Minimum 5 sentences: decision rationale, specific risk accepted, what a trusted third party would say...",
				rows: 5
			},
			{
				id: "accountabilityContact",
				type: "textarea",
				label: "Accountability Contact & Response",
				placeholder: "Name of contact, their response (voice/video, minimum 10 minutes), and whether they raised any concern...",
				rows: 3
			},
			{
				id: "gLabelPassCompleted",
				type: "select",
				label: "G-Label Pass Completed",
				options: [{
					value: "yes",
					label: "YES — all claims G-labeled, G1/G2 proof verified, G3 has IF language"
				}, {
					value: "no",
					label: "NO — not yet completed"
				}]
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "OUT-S1",
		stage: "OUT",
		subLevel: "S1",
		label: "Channel Landscape",
		purpose: "Map the outreach channel landscape — which platforms the target audience uses, where qualified conversations are most likely, and which channels the operator can sustain.",
		fields: [
			{
				id: "primaryChannels",
				type: "textarea",
				label: "Primary Outreach Channels",
				placeholder: "Platforms where the target audience is most reachable and engaged...",
				rows: 4
			},
			{
				id: "secondaryChannels",
				type: "textarea",
				label: "Secondary Channels",
				placeholder: "Backup or supplementary platforms with rationale for inclusion...",
				rows: 3
			},
			{
				id: "channelRationale",
				type: "textarea",
				label: "Selection Rationale",
				placeholder: "Why each channel was selected — audience presence, cost, operator capacity, alignment...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-S2",
		stage: "OUT",
		subLevel: "S2",
		label: "Lead Pool Map",
		purpose: "Map the available lead pool — sources, segments, and qualification filters that identify prospects who align with the Ideal Customer Profile from the OFR stage.",
		fields: [
			{
				id: "leadSources",
				type: "textarea",
				label: "Lead Sources",
				placeholder: "Where qualified leads can be found — directories, communities, events, referral networks...",
				rows: 4
			},
			{
				id: "segmentDefinitions",
				type: "textarea",
				label: "Segment Definitions",
				placeholder: "Lead segments with characteristics, priority level, and expected volume...",
				rows: 4
			},
			{
				id: "qualificationFilters",
				type: "textarea",
				label: "Qualification Filters",
				placeholder: "Criteria to filter leads before outreach — alignment with ICP, budget signals, timing indicators...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-S3",
		stage: "OUT",
		subLevel: "S3",
		label: "Message Signal Research",
		purpose: "Research the messaging signals that resonate with the target audience — language patterns, emotional triggers, and value propositions that invite rather than pressure.",
		fields: [
			{
				id: "languagePatterns",
				type: "textarea",
				label: "Language Patterns",
				placeholder: "Words, phrases, and framings the audience uses to describe their problems and desires...",
				rows: 4
			},
			{
				id: "emotionalTriggers",
				type: "textarea",
				label: "Emotional Triggers",
				placeholder: "What motivates action — documented from VoC data, not operator assumption...",
				rows: 3
			},
			{
				id: "valuePropositionSignals",
				type: "textarea",
				label: "Value Proposition Signals",
				placeholder: "Which aspects of the offer resonate most — based on market data and competitor gaps...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-S4",
		stage: "OUT",
		subLevel: "S4",
		label: "Objection Intelligence",
		purpose: "Map the most common objections the target audience will raise — and prepare responses that serve clarity rather than manipulate toward conversion.",
		fields: [{
			id: "commonObjections",
			type: "textarea",
			label: "Common Objections",
			placeholder: "Top objections anticipated from this audience — price, trust, timing, alternatives...",
			rows: 5
		}, {
			id: "objectionResponses",
			type: "textarea",
			label: "Response Framework",
			placeholder: "For each objection: a response that clarifies rather than pressures...",
			rows: 5
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-S5",
		stage: "OUT",
		subLevel: "S5",
		label: "Operator Outreach Constraints",
		purpose: "Document the operator's real outreach constraints — time, bandwidth, tool proficiency, and communication capacity — as hard stops for the outreach plan.",
		fields: [
			{
				id: "outreachBandwidth",
				type: "textarea",
				label: "Outreach Bandwidth",
				placeholder: "Hours per week available for outreach, maximum messages per day, channel limits...",
				rows: 3
			},
			{
				id: "toolProficiency",
				type: "textarea",
				label: "Tool Proficiency",
				placeholder: "Which outreach tools the operator can use effectively — CRM, automation, scheduling...",
				rows: 3
			},
			{
				id: "communicationConstraints",
				type: "textarea",
				label: "Communication Constraints",
				placeholder: "Preferred communication style, languages, time zones, and boundaries...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-A1",
		stage: "OUT",
		subLevel: "A1",
		label: "Channel Plan & Lead Criteria",
		purpose: "A detailed strategy outlining primary and secondary outreach platforms, rationale for selection, execution guidelines, Ideal Prospect Profile (IPP), and specific qualification filters.",
		fields: [
			{
				id: "channelStrategy",
				type: "textarea",
				label: "Channel Strategy",
				placeholder: "Primary and secondary platforms with rationale and execution guidelines for each...",
				rows: 5
			},
			{
				id: "idealProspectProfile",
				type: "textarea",
				label: "Ideal Prospect Profile (IPP)",
				placeholder: "Precise definition of who qualifies as a prospect — demographics, behavior, signals...",
				rows: 4
			},
			{
				id: "qualificationFiltersAsset",
				type: "textarea",
				label: "Qualification Filters",
				placeholder: "Specific filters applied before outreach begins — budget, authority, need, timing...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-A2",
		stage: "OUT",
		subLevel: "A2",
		label: "Hook Library",
		purpose: "A comprehensive collection of diverse, compliant opening lines categorized by platform and prospect persona. Hooks invite attention — they do not make claims.",
		fields: [
			{
				id: "hooksByPlatform",
				type: "textarea",
				label: "Hooks by Platform",
				placeholder: "Opening lines organized by channel — LinkedIn, email, DM, social. Each hook stops the reader without making claims...",
				rows: 5
			},
			{
				id: "hooksByPersona",
				type: "textarea",
				label: "Hooks by Persona",
				placeholder: "Opening lines tailored to specific prospect personas from the ICP...",
				rows: 5
			},
			{
				id: "hookComplianceNotes",
				type: "textarea",
				label: "Compliance Notes",
				placeholder: "Confirmation that no hook contains claims, guarantees, or manufactured urgency...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "OUT-A3",
		stage: "OUT",
		subLevel: "A3",
		label: "Message Library",
		purpose: "A structured compendium of core outreach messages for initial connection — short, value-focused messages that transition from Hook to meaningful dialogue, aligned with the OFR Scope Map.",
		fields: [
			{
				id: "initialMessages",
				type: "textarea",
				label: "Initial Connection Messages",
				placeholder: "Core outreach messages by channel — designed to transition from Hook to dialogue...",
				rows: 5
			},
			{
				id: "valueFrames",
				type: "textarea",
				label: "Value Frames",
				placeholder: "Short statements of value aligned with documented VoC pain points...",
				rows: 4
			},
			{
				id: "scopeAlignment",
				type: "textarea",
				label: "Scope Map Alignment Check",
				placeholder: "Confirmation that no message introduces services outside the documented Scope Map...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "OUT-A4",
		stage: "OUT",
		subLevel: "A4",
		label: "Follow-Up Sequence",
		purpose: "A pre-defined, multi-touch, multi-channel sequence with timing, content, and medium for subsequent messages — designed for optimal persistence without intrusion.",
		fields: [
			{
				id: "sequenceMap",
				type: "textarea",
				label: "Follow-Up Sequence Map",
				placeholder: "Touch-by-touch plan: day, channel, message purpose, and content summary...",
				rows: 5
			},
			{
				id: "timingRules",
				type: "textarea",
				label: "Timing & Frequency Rules",
				placeholder: "Spacing between messages, maximum touches, channel rotation logic...",
				rows: 3
			},
			{
				id: "exitCriteria",
				type: "textarea",
				label: "Exit Criteria",
				placeholder: "When to stop the sequence — no response threshold, explicit opt-out, disqualification signal...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-A5",
		stage: "OUT",
		subLevel: "A5",
		label: "Appointment Setter & No-Fit Scripts",
		purpose: "Two scripts: (1) Appointment Setter to guide engaged prospects toward booking a call with a singular CTA, and (2) No-Fit Script to respectfully disqualify leads while preserving dignity and relationship.",
		fields: [
			{
				id: "appointmentSetterScript",
				type: "textarea",
				label: "Appointment Setter Script",
				placeholder: "Structured script for guiding the prospect toward scheduling a discovery call — one clear CTA...",
				rows: 5
			},
			{
				id: "noFitScript",
				type: "textarea",
				label: "No-Fit Script",
				placeholder: "Professional, dignity-preserving script for respectfully disqualifying leads — leaves the door open...",
				rows: 5
			},
			{
				id: "noFitRedirectOptions",
				type: "textarea",
				label: "No-Fit Redirect Options",
				placeholder: "Where to direct disqualified leads — referral partners, resources, or future re-engagement path...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-A6",
		stage: "OUT",
		subLevel: "A6",
		label: "Objection Preparation & Handling Matrix",
		purpose: "A matrix of the most common objections with pre-vetted responses designed to re-engage the prospect through clarity and service — not pressure.",
		fields: [{
			id: "objectionMatrix",
			type: "textarea",
			label: "Objection Matrix",
			placeholder: "Each objection: headline, best response, proof asset to reference, and next question to ask...",
			rows: 5
		}, {
			id: "responseGuidelines",
			type: "textarea",
			label: "Response Guidelines",
			placeholder: "Principles for handling objections — serve, do not pressure; clarify, do not manipulate...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-A7",
		stage: "OUT",
		subLevel: "A7",
		label: "Content-to-DM Pipeline Map",
		purpose: "A sequential map illustrating how existing or planned marketing content is leveraged as context or value-adds within direct message or email outreach threads.",
		fields: [
			{
				id: "contentAssets",
				type: "textarea",
				label: "Content Assets for Outreach",
				placeholder: "List of existing content (articles, videos, guides, case studies) that can be shared in DMs...",
				rows: 4
			},
			{
				id: "pipelineSequence",
				type: "textarea",
				label: "Pipeline Sequence",
				placeholder: "Step-by-step flow: which content is shared at which touchpoint and why...",
				rows: 4
			},
			{
				id: "conversionPath",
				type: "textarea",
				label: "Conversion Path",
				placeholder: "How content sharing transitions to conversation — natural bridge from value to dialogue...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OUT-IC",
		stage: "OUT",
		subLevel: "IC",
		label: "Ihsan Baseline Checklist (IC-OUT / DRIFT-02)",
		purpose: "Mandatory output gate for all outreach assets — emails, DMs, social posts. Five checks covering audience relevance, G-label compliance, CTA clarity, scarcity verification, and accessibility.",
		fields: [
			{
				id: "icOut1",
				type: "select",
				label: "IC-OUT-1: First sentence addresses documented audience concern",
				options: [{
					value: "pass",
					label: "PASS — maps to VoC data from STR stage"
				}, {
					value: "fail",
					label: "FAIL — based on operator assumption"
				}]
			},
			{
				id: "icOut2",
				type: "select",
				label: "IC-OUT-2: All claims G-labeled with proof",
				options: [{
					value: "pass",
					label: "PASS — G-label log attached, no PROOF PENDING in client-facing use"
				}, {
					value: "fail",
					label: "FAIL — unlabeled claims or PROOF PENDING in client-facing use"
				}]
			},
			{
				id: "icOut3",
				type: "select",
				label: "IC-OUT-3: Singular, unambiguous CTA",
				options: [{
					value: "pass",
					label: "PASS — one CTA, stated once, no competing alternatives"
				}, {
					value: "fail",
					label: "FAIL — multiple CTAs or ambiguous next step"
				}]
			},
			{
				id: "icOut4",
				type: "select",
				label: "IC-OUT-4: Scarcity/urgency verified or absent",
				options: [{
					value: "pass",
					label: "PASS — all urgency tied to documented constraint, or no urgency used"
				}, {
					value: "fail",
					label: "FAIL — unverified scarcity or manufactured urgency present"
				}]
			},
			{
				id: "icOut5",
				type: "select",
				label: "IC-OUT-5: Readable without prior knowledge of business",
				options: [{
					value: "pass",
					label: "PASS — tested by unfamiliar reader"
				}, {
					value: "fail",
					label: "FAIL — requires prior context to understand"
				}]
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "SLS-S0",
		stage: "SLS",
		subLevel: "S0",
		label: "Sales Stage Inputs Extractor",
		purpose: "Summarize the offer and outreach context and extract what the Sales stage must implement. Run first before all other SLS research tasks.",
		fields: [
			{
				id: "leadStates",
				type: "textarea",
				label: "Lead States",
				placeholder: "Define the states a lead can be in when entering the Sales stage...",
				rows: 4
			},
			{
				id: "qualificationCriteriaDraft",
				type: "textarea",
				label: "Qualification Criteria Draft",
				placeholder: "Initial criteria for qualifying leads — derived from OFR ICP and OUT lead filters...",
				rows: 4
			},
			{
				id: "objectionsSeedList",
				type: "textarea",
				label: "Objections Seed List",
				placeholder: "Initial list of objections anticipated from OUT stage intelligence...",
				rows: 4
			},
			{
				id: "nurtureProofAssets",
				type: "textarea",
				label: "Nurture Proof Assets List",
				placeholder: "Proof assets available for pre-call nurture — case studies, screenshots, checklists, demos...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S1",
		stage: "SLS",
		subLevel: "S1",
		label: "Qualification Form Deep-Dive",
		purpose: "Design 8-10 questions to qualify leads into hot/warm/cold segments. Include exactly 3 automatic disqualifiers (hard no-fit) with routing logic.",
		fields: [
			{
				id: "qualificationQuestions",
				type: "textarea",
				label: "Qualification Questions (8-10)",
				placeholder: "Each question: text, response options, and which segment it routes to...",
				rows: 5
			},
			{
				id: "autoDisqualifiers",
				type: "textarea",
				label: "Automatic Disqualifiers (exactly 3)",
				placeholder: "Three hard no-fit rules: the disqualifier, reason, and redirect message...",
				rows: 4
			},
			{
				id: "scoringRoutingNotes",
				type: "textarea",
				label: "Scoring & Routing Notes",
				placeholder: "How answers map to hot/warm/cold — scoring logic, thresholds, edge cases...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S2",
		stage: "SLS",
		subLevel: "S2",
		label: "Lead Routing & Decision Tree Deep-Dive",
		purpose: "Define hot/warm/cold paths with criteria, exits, and next actions. Include no-fit exit and waitlist/education path.",
		fields: [
			{
				id: "routingTable",
				type: "textarea",
				label: "Routing Table",
				placeholder: "Hot/warm/cold criteria, next action for each, and operator notification rules...",
				rows: 5
			},
			{
				id: "decisionTreeSteps",
				type: "textarea",
				label: "Decision Tree Steps",
				placeholder: "If/then logic: each decision point, criteria evaluated, and resulting path...",
				rows: 5
			},
			{
				id: "noFitExitPath",
				type: "textarea",
				label: "No-Fit Exit Path",
				placeholder: "How disqualified leads exit with dignity — redirect message, referral, re-engagement path...",
				rows: 3
			},
			{
				id: "waitlistPath",
				type: "textarea",
				label: "Waitlist / Education Path",
				placeholder: "Path for warm leads not yet ready — nurture content, timeline, re-qualification trigger...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S3",
		stage: "SLS",
		subLevel: "S3",
		label: "Fit Call Script Deep-Dive",
		purpose: "Create a 15-minute Fit Call structure: opening, agenda, qualification, problem framing, and next step. Include verbatim script and branches for hot/warm/cold.",
		fields: [
			{
				id: "callStructure",
				type: "textarea",
				label: "Call Structure (15 minutes)",
				placeholder: "Minute-by-minute outline: opening (0-2), agenda (2-3), qualification (3-7), problem framing (7-12), next step (12-15)...",
				rows: 5
			},
			{
				id: "verbatimScript",
				type: "textarea",
				label: "Verbatim Script Blocks",
				placeholder: "Word-for-word scripts for key moments — opening, transition questions, closing...",
				rows: 5
			},
			{
				id: "branchPrompts",
				type: "textarea",
				label: "Branch Prompts (Hot/Warm/Cold)",
				placeholder: "Conditional paths: what to say when the prospect is hot, warm, or cold...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S4",
		stage: "SLS",
		subLevel: "S4",
		label: "Objection Library Deep-Dive",
		purpose: "List the top 10 objections for this offer and audience. For each: best response, proof asset reference, and a short one-liner reply.",
		fields: [
			{
				id: "objectionList",
				type: "textarea",
				label: "Top 10 Objections",
				placeholder: "Each objection: headline, the real hesitation beneath it, and frequency...",
				rows: 5
			},
			{
				id: "bestResponses",
				type: "textarea",
				label: "Best Responses",
				placeholder: "For each objection: full response, one-liner version, and proof asset to reference...",
				rows: 5
			},
			{
				id: "nextQuestions",
				type: "textarea",
				label: "Next Question to Ask",
				placeholder: "For each objection: the follow-up question that continues dialogue with genuine curiosity...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S5",
		stage: "SLS",
		subLevel: "S5",
		label: "Pre-Call Nurture Sequence Deep-Dive",
		purpose: "Write 3-5 messages to send before the call. Each message includes purpose, copy, and a proof asset (case study, screenshot, checklist, demo).",
		fields: [{
			id: "nurtureMessages",
			type: "textarea",
			label: "Nurture Messages (3-5)",
			placeholder: "Each message: timing, purpose, copy text, and attached proof asset...",
			rows: 5
		}, {
			id: "proofAssetMapping",
			type: "textarea",
			label: "Proof Asset Mapping",
			placeholder: "Which proof asset accompanies each message and why it was selected...",
			rows: 4
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S6",
		stage: "SLS",
		subLevel: "S6",
		label: "Show-Rate Reminders Deep-Dive",
		purpose: "Write reminders for 24hr and 1hr before the call, plus a no-show follow-up. Include tone options (warm vs firm) and reschedule path.",
		fields: [
			{
				id: "reminder24hr",
				type: "textarea",
				label: "24-Hour Reminder",
				placeholder: "Message copy for 24 hours before the call — warm, helpful tone...",
				rows: 3
			},
			{
				id: "reminder1hr",
				type: "textarea",
				label: "1-Hour Reminder",
				placeholder: "Message copy for 1 hour before the call — brief confirmation...",
				rows: 3
			},
			{
				id: "noShowFollowUp",
				type: "textarea",
				label: "No-Show Follow-Up",
				placeholder: "Message for when the prospect does not show — tone options and reschedule path...",
				rows: 4
			},
			{
				id: "toneOptions",
				type: "select",
				label: "Default Tone",
				options: [{
					value: "warm",
					label: "Warm — gentle, understanding, no pressure"
				}, {
					value: "firm",
					label: "Firm — professional, direct, boundary-holding"
				}]
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-S7",
		stage: "SLS",
		subLevel: "S7",
		label: "Post-Call Follow-Up Deep-Dive (Non-Closes)",
		purpose: "Write a 7-14 day follow-up sequence for prospects who did not close on the call. Include day-by-day message plan and triggers to stop when they book or close.",
		fields: [
			{
				id: "followUpSequence",
				type: "textarea",
				label: "Follow-Up Sequence (7-14 days)",
				placeholder: "Day-by-day plan: message purpose, copy, channel, and escalation triggers...",
				rows: 5
			},
			{
				id: "stopTriggers",
				type: "textarea",
				label: "Stop Triggers",
				placeholder: "Conditions that end the sequence — booking, closing, explicit opt-out, silence threshold...",
				rows: 3
			},
			{
				id: "gracefulClose",
				type: "textarea",
				label: "Graceful Close Message",
				placeholder: "Final message if the sequence ends without conversion — dignity-preserving, door left open...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-A0",
		stage: "SLS",
		subLevel: "A0",
		label: "Sales Asset Pack (Full Assembly)",
		purpose: "Using only SLS canon and approved S-Outputs, generate the complete Sales Asset Pack in exact canon order. If required inputs are missing, output a NO-SHIP list instead of inventing information.",
		fields: [
			{
				id: "assemblyStatus",
				type: "select",
				label: "Assembly Status",
				options: [
					{
						value: "complete",
						label: "Complete — all 8 assets assembled"
					},
					{
						value: "partial",
						label: "Partial — NO-SHIP items identified"
					},
					{
						value: "blocked",
						label: "Blocked — missing required S-Outputs"
					}
				]
			},
			{
				id: "noShipList",
				type: "textarea",
				label: "NO-SHIP List",
				placeholder: "Missing inputs or conflicts that must be resolved before the pack can ship...",
				rows: 4
			},
			{
				id: "assemblyNotes",
				type: "textarea",
				label: "Assembly Notes",
				placeholder: "Notes on the assembly process — which S-Outputs were used, any adaptations made...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "SLS-A1",
		stage: "SLS",
		subLevel: "A1",
		label: "Qualification Form (Ready-to-Build)",
		purpose: "Ready-to-build qualification form template: intro, 8-10 questions with response options, exactly 3 auto-disqualifiers with rules and redirect messages, scoring/routing logic, and next-step messages for hot/warm/cold.",
		fields: [
			{
				id: "formIntro",
				type: "textarea",
				label: "Form Introduction",
				placeholder: "1-2 sentences introducing the qualification form to the prospect...",
				rows: 3
			},
			{
				id: "questions",
				type: "textarea",
				label: "Questions (Q1-Q10)",
				placeholder: "Each question: number, text, response options, and routing implication...",
				rows: 5
			},
			{
				id: "autoDisqualifiersTemplate",
				type: "textarea",
				label: "Auto-Disqualifiers (3)",
				placeholder: "Each: rule, reason, and redirect message for the prospect...",
				rows: 4
			},
			{
				id: "scoringRouting",
				type: "textarea",
				label: "Scoring & Routing Logic",
				placeholder: "How answers map to hot/warm/cold — scoring thresholds and routing rules...",
				rows: 4
			},
			{
				id: "nextStepMessages",
				type: "textarea",
				label: "Next-Step Messages (Hot/Warm/Cold)",
				placeholder: "Message shown to the prospect after qualification — different for each segment...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-A2",
		stage: "SLS",
		subLevel: "A2",
		label: "DM Automation Flow Spec",
		purpose: "ManyChat or GHL automation flow specification: triggers, step-by-step message flow, branching rules for hot/warm/cold, tags/fields to write, and operator notification/handoff rules.",
		fields: [
			{
				id: "triggers",
				type: "textarea",
				label: "Flow Triggers",
				placeholder: "What initiates the automation — DM keyword, form submission, link click...",
				rows: 3
			},
			{
				id: "flowMap",
				type: "textarea",
				label: "Flow Map (Step-by-Step)",
				placeholder: "Each step: message content, question prompt, expected responses, and branching logic...",
				rows: 5
			},
			{
				id: "branchingRules",
				type: "textarea",
				label: "Branching Rules (Hot/Warm/Cold)",
				placeholder: "Criteria for each branch — which responses route where...",
				rows: 4
			},
			{
				id: "tagsAndFields",
				type: "textarea",
				label: "Tags & Fields to Write",
				placeholder: "CRM tags, lead state, score, disqualifier flags to be set at each step...",
				rows: 3
			},
			{
				id: "notificationRules",
				type: "textarea",
				label: "Notifications & Handoff Rules",
				placeholder: "When to notify the operator, when automation hands off to human, escalation triggers...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-A3",
		stage: "SLS",
		subLevel: "A3",
		label: "Decision Tree (Operational Routing)",
		purpose: "Operational routing logic: hot/warm/cold criteria definitions, if/then decision tree steps, and exit scripts for no-fit, waitlist, and \"book now\" paths.",
		fields: [
			{
				id: "criteriaDefinitions",
				type: "textarea",
				label: "Criteria Definitions (Hot/Warm/Cold)",
				placeholder: "What defines each segment — specific, binary where possible...",
				rows: 4
			},
			{
				id: "treeSteps",
				type: "textarea",
				label: "Decision Tree Steps (If/Then)",
				placeholder: "Each decision point: condition evaluated, true path, false path, and exits...",
				rows: 5
			},
			{
				id: "exitScripts",
				type: "textarea",
				label: "Exit Scripts",
				placeholder: "No-fit exit script, waitlist script, and \"book now\" path — each preserving dignity...",
				rows: 5
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-A4",
		stage: "SLS",
		subLevel: "A4",
		label: "Fit Call Script (15 Minutes)",
		purpose: "Complete 15-minute Fit Call script: minute-by-minute outline, verbatim script blocks, branch prompts for hot/warm/cold, and close options (book, deposit, follow-up, no-fit).",
		fields: [
			{
				id: "minuteByMinute",
				type: "textarea",
				label: "Minute-by-Minute Outline (0-15)",
				placeholder: "0-2: Opening & rapport | 2-3: Agenda | 3-7: Qualification | 7-12: Problem framing | 12-15: Next step...",
				rows: 5
			},
			{
				id: "verbatimBlocks",
				type: "textarea",
				label: "Verbatim Script Blocks",
				placeholder: "Word-for-word scripts for opening, key transitions, qualification questions, and close...",
				rows: 5
			},
			{
				id: "branchPromptsAsset",
				type: "textarea",
				label: "Branch Prompts (Hot/Warm/Cold)",
				placeholder: "What to say when the prospect is: hot (ready to book), warm (needs nurture), cold (no-fit)...",
				rows: 4
			},
			{
				id: "closeOptions",
				type: "select",
				label: "Primary Close Path",
				options: [
					{
						value: "book",
						label: "Book — schedule next step immediately"
					},
					{
						value: "deposit",
						label: "Deposit — secure commitment with payment"
					},
					{
						value: "followUp",
						label: "Follow-Up — enter post-call nurture"
					},
					{
						value: "noFit",
						label: "No-Fit — exit with dignity (As-Sittir)"
					}
				]
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-A5",
		stage: "SLS",
		subLevel: "A5",
		label: "Objection Library",
		purpose: "Complete objection library: each of the top 10 objections with headline, best response (short), expanded response, proof asset reference, and next question to ask.",
		fields: [{
			id: "objections",
			type: "textarea",
			label: "Objection Library (Top 10)",
			placeholder: "Each objection: headline, short response, expanded response, proof asset, and next question...",
			rows: 5
		}, {
			id: "proofAssetReferences",
			type: "textarea",
			label: "Proof Asset References",
			placeholder: "For each objection: the specific proof asset (case study, metric, testimonial) to reference...",
			rows: 4
		}],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "SLS-A6",
		stage: "SLS",
		subLevel: "A6",
		label: "Nurture + Reminders + Follow-Up",
		purpose: "Combined nurture, reminder, and follow-up asset: pre-call nurture (3-5 messages, channel-specific), show-rate reminders (24hr, 1hr, no-show), post-call follow-up (7-14 days for non-closes), and stop/escalation conditions.",
		fields: [
			{
				id: "preCallNurture",
				type: "textarea",
				label: "Pre-Call Nurture (3-5 Messages)",
				placeholder: "Each message: timing, channel, purpose, copy, and attached proof asset...",
				rows: 5
			},
			{
				id: "showRateReminders",
				type: "textarea",
				label: "Show-Rate Reminders",
				placeholder: "24hr reminder, 1hr reminder, and no-show follow-up message...",
				rows: 4
			},
			{
				id: "postCallFollowUp",
				type: "textarea",
				label: "Post-Call Follow-Up (7-14 Days)",
				placeholder: "Day-by-day sequence for non-closes: message purpose, copy, and channel...",
				rows: 5
			},
			{
				id: "stopAndEscalation",
				type: "textarea",
				label: "Stop Conditions & Escalation",
				placeholder: "When to stop the sequence, when to personally reach out, and graceful close message...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "SLS-FP03",
		stage: "SLS",
		subLevel: "FP03",
		label: "Compressed Cycle Sign-Off (FP-03)",
		purpose: "Document the compressed cycle exception for time-constrained Sales decisions (48 hours or less). Entry conditions, substitutions, and sign-off block must be completed before any commercial action.",
		fields: [
			{
				id: "externalDeadlineSal",
				type: "text",
				label: "External Deadline (Date/Time)",
				placeholder: "The documented, externally-imposed deadline..."
			},
			{
				id: "externalPartySal",
				type: "text",
				label: "External Party Who Imposed Deadline",
				placeholder: "Name of the party — not the operator..."
			},
			{
				id: "stewardshipScoreSal",
				type: "number",
				label: "Current Stewardship Score",
				placeholder: "Must be 7.0 or above..."
			},
			{
				id: "deliberatePauseCompletedSal",
				type: "select",
				label: "Deliberate Pause Completed",
				options: [{
					value: "yes",
					label: "YES — minimum 30 minutes undisturbed reflection"
				}, {
					value: "no",
					label: "NO — not yet completed"
				}]
			},
			{
				id: "reflectionNoteSal",
				type: "textarea",
				label: "Reflection Note",
				placeholder: "Minimum 5 sentences: decision rationale, specific risk accepted, what a trusted third party would say...",
				rows: 5
			},
			{
				id: "accountabilityContactSal",
				type: "textarea",
				label: "Accountability Contact & Response",
				placeholder: "Name of contact, their response (voice/video, minimum 10 minutes), and whether they raised any concern...",
				rows: 3
			},
			{
				id: "gLabelPassCompletedSal",
				type: "select",
				label: "G-Label Pass Completed",
				options: [{
					value: "yes",
					label: "YES — all claims G-labeled, G1/G2 proof verified, G3 has IF language"
				}, {
					value: "no",
					label: "NO — not yet completed"
				}]
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "DEL-S0",
		stage: "DEL",
		subLevel: "S0",
		label: "Fulfillment S-Outputs Generator",
		purpose: "Master prompt that generates FUL_S1–FUL_S5 from operator inputs. If any required input is missing, output NO-SHIP with a numbered list of missing items.",
		fields: [
			{
				id: "ofrScopeMap",
				type: "textarea",
				label: "OFR Scope Map (Included / Excluded)",
				placeholder: "Paste scope map from OFR stage...",
				rows: 4
			},
			{
				id: "promiseAndGLabel",
				type: "textarea",
				label: "Promise + G-Label + Guarantee Conditions",
				placeholder: "The promise, its G-label classification, and guarantee conditions...",
				rows: 3
			},
			{
				id: "deliveryMode",
				type: "select",
				label: "Delivery Mode",
				options: [
					"BBOS-led",
					"Done-with-you",
					"Done-for-you"
				]
			},
			{
				id: "timelineExpectation",
				type: "text",
				label: "Timeline Expectation",
				placeholder: "Expected delivery timeline..."
			},
			{
				id: "clientContext",
				type: "textarea",
				label: "Client Context",
				placeholder: "Industry, constraints, access, comms channel preferences...",
				rows: 3
			},
			{
				id: "toolsStack",
				type: "text",
				label: "Tools / Stack",
				placeholder: "Docs, forms, CRM, messaging tools..."
			},
			{
				id: "operatorCapacity",
				type: "text",
				label: "Operator Capacity Constraints",
				placeholder: "Hours/week, response windows..."
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "DEL-S1",
		stage: "DEL",
		subLevel: "S1",
		label: "Offer-to-Delivery Map",
		purpose: "Maps the journey from signed offer to final delivery: phases, checkpoints, owner assignments, and timing. Every step traces back to the OFR scope/promise.",
		fields: [
			{
				id: "deliveryPhases",
				type: "textarea",
				label: "Delivery Phases",
				placeholder: "List each phase with start/end markers...",
				rows: 5
			},
			{
				id: "checkpoints",
				type: "textarea",
				label: "Checkpoints & Milestones",
				placeholder: "Key checkpoints with owner and timing...",
				rows: 4
			},
			{
				id: "ownerAssignments",
				type: "textarea",
				label: "Owner / Role Assignments",
				placeholder: "Who is responsible for each phase...",
				rows: 3
			},
			{
				id: "timingConstraints",
				type: "textarea",
				label: "Timing & Dependencies",
				placeholder: "Dependencies, sequencing, and deadline logic...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-S2",
		stage: "DEL",
		subLevel: "S2",
		label: "Quality & Risk Map",
		purpose: "Identifies failure modes, maps QC checks to each, and defines guarantee triggers. Reframes risk management as an act of protection for the client.",
		fields: [
			{
				id: "failureModes",
				type: "textarea",
				label: "Failure Modes",
				placeholder: "List potential failure modes and their impact...",
				rows: 4
			},
			{
				id: "qcChecks",
				type: "textarea",
				label: "QC Checks",
				placeholder: "Quality control checks mapped to each failure mode...",
				rows: 4
			},
			{
				id: "guaranteeTriggers",
				type: "textarea",
				label: "Guarantee Triggers",
				placeholder: "Conditions that would trigger the guarantee...",
				rows: 3
			},
			{
				id: "mitigationSteps",
				type: "textarea",
				label: "Mitigation Steps",
				placeholder: "Preventive actions for each risk...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "DEL-S3",
		stage: "DEL",
		subLevel: "S3",
		label: "Client Success Milestones",
		purpose: "Defines 3–5 client success checkpoints with message intents. Each milestone is a moment of visible progress the client can feel, not just an internal tracking point.",
		fields: [
			{
				id: "milestoneList",
				type: "textarea",
				label: "Milestones (3–5)",
				placeholder: "Define each milestone: what it means, when it occurs, how it is communicated...",
				rows: 5
			},
			{
				id: "messageIntents",
				type: "textarea",
				label: "Message Intents per Milestone",
				placeholder: "What the client should feel/know at each milestone...",
				rows: 4
			},
			{
				id: "successDefinition",
				type: "textarea",
				label: "Client Success Definition",
				placeholder: "How the client defines success in their own terms...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-S4",
		stage: "DEL",
		subLevel: "S4",
		label: "Proof Capture Plan",
		purpose: "Defines what proof to capture, when, how, and with what consent. Built into the delivery process so proof collection is natural, not an afterthought.",
		fields: [
			{
				id: "proofTypes",
				type: "textarea",
				label: "What to Capture",
				placeholder: "Case study data, testimonials, screenshots, metrics...",
				rows: 3
			},
			{
				id: "captureTimeline",
				type: "textarea",
				label: "When to Capture",
				placeholder: "Map proof capture to specific milestones or delivery events...",
				rows: 3
			},
			{
				id: "captureMethod",
				type: "textarea",
				label: "How to Capture",
				placeholder: "Tools, templates, forms, interview scripts...",
				rows: 3
			},
			{
				id: "consentLanguage",
				type: "textarea",
				label: "Consent Language",
				placeholder: "Written consent request presented before any proof is collected...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING"]
	},
	{
		id: "DEL-S5",
		stage: "DEL",
		subLevel: "S5",
		label: "Offboarding → Retention Handoff",
		purpose: "Documents offboarding notes, the retention seed message, and next steps for RET stage handoff. The seed must be gratitude-first; any next-step framing follows from that.",
		fields: [
			{
				id: "handoffNotes",
				type: "textarea",
				label: "Handoff Notes to RET",
				placeholder: "Key context for the Retention stage: client relationship quality, outcomes achieved, open threads...",
				rows: 4
			},
			{
				id: "retentionSeedMessage",
				type: "textarea",
				label: "Retention Seed Message",
				placeholder: "Gratitude-first message acknowledging the trust the client placed in you...",
				rows: 4
			},
			{
				id: "nextSteps",
				type: "textarea",
				label: "Next Steps",
				placeholder: "Recommended next engagement or follow-up timing...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-A1",
		stage: "DEL",
		subLevel: "A1",
		label: "Onboarding Checklist",
		purpose: "Step-by-step checklist from payment confirmation to work-start, including communication triggers at each transition point.",
		fields: [
			{
				id: "paymentToStartSteps",
				type: "textarea",
				label: "Payment → Work-Start Steps",
				placeholder: "Ordered steps from payment confirmation to kickoff...",
				rows: 5
			},
			{
				id: "communicationTriggers",
				type: "textarea",
				label: "Communication Triggers",
				placeholder: "What message is sent at each step and through which channel...",
				rows: 4
			},
			{
				id: "ownerRole",
				type: "text",
				label: "Owner / Role",
				placeholder: "Who manages the onboarding process..."
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-A2",
		stage: "DEL",
		subLevel: "A2",
		label: "Client Intake Form",
		purpose: "Captures client constraints, access requirements, preferences, and client success definition. Every data point collected must feed directly into the Execution SOP.",
		fields: [
			{
				id: "clientConstraints",
				type: "textarea",
				label: "Client Constraints",
				placeholder: "Time zones, availability, legal/compliance restrictions...",
				rows: 3
			},
			{
				id: "accessRequirements",
				type: "textarea",
				label: "Access Requirements",
				placeholder: "Accounts, platforms, credentials, permissions needed...",
				rows: 3
			},
			{
				id: "preferences",
				type: "textarea",
				label: "Client Preferences",
				placeholder: "Communication channel, update frequency, format preferences...",
				rows: 3
			},
			{
				id: "clientSuccessDefinition",
				type: "textarea",
				label: "Client Success Definition",
				placeholder: "How the client defines a successful outcome in their own words...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-A3",
		stage: "DEL",
		subLevel: "A3",
		label: "Execution SOP",
		purpose: "Step-by-step delivery procedure mapped directly to the OFR scope. Includes purpose, when to use, owner/role, steps, templates, and edge-case notes.",
		fields: [
			{
				id: "sopSteps",
				type: "textarea",
				label: "Execution Steps",
				placeholder: "Ordered delivery steps, each tracing back to OFR scope...",
				rows: 5
			},
			{
				id: "templates",
				type: "textarea",
				label: "Templates & Scripts",
				placeholder: "Message templates, scripts, or standard responses used during delivery...",
				rows: 4
			},
			{
				id: "edgeCases",
				type: "textarea",
				label: "Edge Cases & Notes",
				placeholder: "Known exceptions, conditional paths, or special handling...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-A4",
		stage: "DEL",
		subLevel: "A4",
		label: "Quality Control Checklist",
		purpose: "Pre-ship quality gate aligned to OFR outcome and guarantee conditions. Includes Ihsan Baseline Checklists (IC-OFR + IC-DEL) as mandatory sub-gates. Any asset failing 2+ checks requires revision.",
		fields: [
			{
				id: "qcItems",
				type: "textarea",
				label: "QC Checklist Items",
				placeholder: "Each item with pass/fail criteria aligned to OFR outcome...",
				rows: 5
			},
			{
				id: "guaranteeAlignment",
				type: "textarea",
				label: "Guarantee Condition Alignment",
				placeholder: "How each checklist item maps to guarantee conditions...",
				rows: 3
			},
			{
				id: "icOfrChecks",
				type: "textarea",
				label: "IC-OFR Checks (Offer Document)",
				placeholder: "IC-OFR-1 through IC-OFR-5 pass conditions...",
				rows: 4
			},
			{
				id: "icDelChecks",
				type: "textarea",
				label: "IC-DEL Checks (Onboarding Comms)",
				placeholder: "IC-DEL-1 through IC-DEL-5 pass conditions...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "DEL-A5",
		stage: "DEL",
		subLevel: "A5",
		label: "Client Success Milestones (Asset)",
		purpose: "Final assembled milestone asset with message templates for each checkpoint. 3–5 milestones with communication scripts ready for use.",
		fields: [{
			id: "milestoneTemplates",
			type: "textarea",
			label: "Milestone Message Templates",
			placeholder: "Template messages for each milestone communication...",
			rows: 5
		}, {
			id: "deliverySchedule",
			type: "textarea",
			label: "Delivery Schedule",
			placeholder: "When each milestone message is triggered...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "DEL-A6",
		stage: "DEL",
		subLevel: "A6",
		label: "Proof Capture Protocol (Asset)",
		purpose: "Complete proof capture protocol with consent language, capture method at each milestone, and case study data collection templates.",
		fields: [
			{
				id: "protocolSteps",
				type: "textarea",
				label: "Capture Protocol Steps",
				placeholder: "Step-by-step proof capture at each milestone...",
				rows: 4
			},
			{
				id: "consentTemplate",
				type: "textarea",
				label: "Consent Template",
				placeholder: "Consent language presented before proof collection begins...",
				rows: 3
			},
			{
				id: "caseStudyTemplate",
				type: "textarea",
				label: "Case Study Data Template",
				placeholder: "Structure for collecting case study information...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["PROOF_PENDING"]
	},
	{
		id: "DEL-A7",
		stage: "DEL",
		subLevel: "A7",
		label: "Offboarding Sequence",
		purpose: "Complete offboarding flow: close communication, retention seed message (gratitude-first), and RET stage handoff with all context needed for the next stage.",
		fields: [
			{
				id: "closeCommunication",
				type: "textarea",
				label: "Close Communication",
				placeholder: "Final delivery confirmation and wrap-up message...",
				rows: 3
			},
			{
				id: "retentionSeed",
				type: "textarea",
				label: "Retention Seed Message",
				placeholder: "Gratitude-first message — sincere acknowledgment of the trust placed in you, then any next-step framing...",
				rows: 4
			},
			{
				id: "retHandoff",
				type: "textarea",
				label: "RET Stage Handoff",
				placeholder: "Context, notes, and recommendations passed to Retention stage...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-S1",
		stage: "RET",
		subLevel: "S1",
		label: "Segment Map",
		purpose: "Defines Cold Lead, Past Client, Re-Activation (60+ day silent), and Warm Non-Convert segments. For each: entry criteria, primary objection, primary desire, and the single next-step CTA.",
		fields: [
			{
				id: "coldLeadDef",
				type: "textarea",
				label: "Cold Lead Segment",
				placeholder: "Entry criteria, primary objection, primary desire, next-step CTA...",
				rows: 4
			},
			{
				id: "pastClientDef",
				type: "textarea",
				label: "Past Client Segment",
				placeholder: "Entry criteria, primary objection, primary desire, next-step CTA...",
				rows: 4
			},
			{
				id: "reActivationDef",
				type: "textarea",
				label: "Re-Activation Segment (60+ day silent)",
				placeholder: "Entry criteria, primary objection, primary desire, next-step CTA...",
				rows: 4
			},
			{
				id: "warmNonConvertDef",
				type: "textarea",
				label: "Warm Non-Convert Segment",
				placeholder: "Entry criteria, primary objection, primary desire, next-step CTA...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-S2",
		stage: "RET",
		subLevel: "S2",
		label: "Proof Inventory",
		purpose: "Lists all available proof assets and tags each by segment relevance and claim strength (G-label if used).",
		fields: [
			{
				id: "proofAssets",
				type: "textarea",
				label: "Proof Assets List",
				placeholder: "Testimonials, case studies, screenshots, metrics, reviews...",
				rows: 5
			},
			{
				id: "segmentRelevance",
				type: "textarea",
				label: "Segment Relevance Tags",
				placeholder: "Which proof is relevant to which segment and why...",
				rows: 4
			},
			{
				id: "claimStrength",
				type: "textarea",
				label: "Claim Strength / G-Label",
				placeholder: "G-label classification for each proof asset...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED"]
	},
	{
		id: "RET-S3",
		stage: "RET",
		subLevel: "S3",
		label: "Offer Continuation Map",
		purpose: "Defines the Upsell Path (next offer as natural continuation) and Ascension Framework (levels of ongoing value). Includes eligibility rules and trigger timing.",
		fields: [
			{
				id: "upsellPath",
				type: "textarea",
				label: "Upsell Path",
				placeholder: "Next offer framed as a natural continuation of the client's growth arc...",
				rows: 4
			},
			{
				id: "ascensionLevels",
				type: "textarea",
				label: "Ascension Framework Levels",
				placeholder: "Level 1 → Level N: what each includes, who it is for, progression triggers...",
				rows: 4
			},
			{
				id: "eligibilityRules",
				type: "textarea",
				label: "Eligibility Rules",
				placeholder: "Who qualifies for the next offer and under what conditions...",
				rows: 3
			},
			{
				id: "triggerTiming",
				type: "textarea",
				label: "Trigger Timing",
				placeholder: "When it is appropriate to introduce the next offer...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-S4",
		stage: "RET",
		subLevel: "S4",
		label: "Message Spine + Tone Rules",
		purpose: "Defines the warming posture, non-pushy constraints, CTA standards, and 3–5 reusable message spines (pattern templates) for re-engagement.",
		fields: [
			{
				id: "warmingPosture",
				type: "textarea",
				label: "Warming Posture Definition",
				placeholder: "How warmth is expressed without pressure or urgency...",
				rows: 3
			},
			{
				id: "toneConstraints",
				type: "textarea",
				label: "Non-Pushy Constraints",
				placeholder: "What is never acceptable in tone, language, or CTA framing...",
				rows: 3
			},
			{
				id: "ctaStandards",
				type: "textarea",
				label: "CTA Standards",
				placeholder: "Rules for calls-to-action: when to include, when to omit...",
				rows: 3
			},
			{
				id: "messageSpines",
				type: "textarea",
				label: "Reusable Message Spines (3–5)",
				placeholder: "Pattern templates for re-engagement messages...",
				rows: 5
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-S5",
		stage: "RET",
		subLevel: "S5",
		label: "Deployment Logic",
		purpose: "Specifies which proof asset goes where in each sequence (mapped to touch # and message purpose). Includes channel assumptions and required variations.",
		fields: [
			{
				id: "proofToSequenceMap",
				type: "textarea",
				label: "Proof → Sequence Mapping",
				placeholder: "Map each proof asset to: sequence, touch #, message purpose...",
				rows: 5
			},
			{
				id: "channelAssumptions",
				type: "textarea",
				label: "Channel Assumptions",
				placeholder: "Email, SMS, DM — which channel for which sequence...",
				rows: 3
			},
			{
				id: "channelVariations",
				type: "textarea",
				label: "Required Variations",
				placeholder: "Adjustments needed per channel or segment...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-A1",
		stage: "RET",
		subLevel: "A1",
		label: "Cold Lead Re-Engagement Sequence",
		purpose: "5-touch re-engagement sequence for cold leads. Warming not pushing. CTA on final message only. Each touch includes subject/opening, body, CTA, and optional proof insert.",
		fields: [
			{
				id: "touch1",
				type: "textarea",
				label: "Touch 1",
				placeholder: "Subject/opening, body, purpose...",
				rows: 4
			},
			{
				id: "touch2",
				type: "textarea",
				label: "Touch 2",
				placeholder: "Subject/opening, body, purpose...",
				rows: 4
			},
			{
				id: "touch3",
				type: "textarea",
				label: "Touch 3",
				placeholder: "Subject/opening, body, purpose, optional proof insert...",
				rows: 4
			},
			{
				id: "touch4",
				type: "textarea",
				label: "Touch 4",
				placeholder: "Subject/opening, body, purpose, optional proof insert...",
				rows: 4
			},
			{
				id: "touch5WithCta",
				type: "textarea",
				label: "Touch 5 (with CTA)",
				placeholder: "Subject/opening, body, CTA, optional proof insert...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-A2",
		stage: "RET",
		subLevel: "A2",
		label: "Past Client Nurture Sequence",
		purpose: "3-touch nurture sequence for past clients. Value-forward with upsell seed planted (no hard pitch).",
		fields: [
			{
				id: "nurtureTouch1",
				type: "textarea",
				label: "Touch 1 — Value Forward",
				placeholder: "Opening, value delivery, relationship maintenance...",
				rows: 4
			},
			{
				id: "nurtureTouch2",
				type: "textarea",
				label: "Touch 2 — Continued Value",
				placeholder: "Continued value with light upsell seed...",
				rows: 4
			},
			{
				id: "nurtureTouch3",
				type: "textarea",
				label: "Touch 3 — Upsell Seed",
				placeholder: "Natural continuation framing, no hard pitch...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-A3",
		stage: "RET",
		subLevel: "A3",
		label: "Re-Activation Campaign",
		purpose: "2-week campaign for 60+ day silent leads/clients. Includes cadence (days), message objectives, and 1–2 proof inserts.",
		fields: [
			{
				id: "campaignCadence",
				type: "textarea",
				label: "Campaign Cadence",
				placeholder: "Day-by-day plan over 2 weeks: which day, what message objective...",
				rows: 5
			},
			{
				id: "messageObjectives",
				type: "textarea",
				label: "Message Objectives",
				placeholder: "Purpose of each touchpoint in the campaign...",
				rows: 4
			},
			{
				id: "proofInserts",
				type: "textarea",
				label: "Proof Inserts (1–2)",
				placeholder: "Which proof assets to include and where in the campaign...",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-A4",
		stage: "RET",
		subLevel: "A4",
		label: "Upsell Path",
		purpose: "Clear framing document: next offer as natural continuation. Includes eligibility rules and \"why now\" logic that is non-urgent and honest.",
		fields: [
			{
				id: "nextOfferFraming",
				type: "textarea",
				label: "Next Offer Framing",
				placeholder: "How the next offer continues the client's growth arc...",
				rows: 4
			},
			{
				id: "eligibility",
				type: "textarea",
				label: "Eligibility Rules",
				placeholder: "Who qualifies and what conditions must be met...",
				rows: 3
			},
			{
				id: "whyNowLogic",
				type: "textarea",
				label: "\"Why Now\" Logic",
				placeholder: "Non-urgent, honest reasoning for timing...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-A5",
		stage: "RET",
		subLevel: "A5",
		label: "Ascension Framework",
		purpose: "Maps ongoing value levels (Level 1 → Level N). Defines what each level includes, who it is for, and the progression triggers.",
		fields: [
			{
				id: "valueLevels",
				type: "textarea",
				label: "Value Levels",
				placeholder: "Level 1 → Level N: description, inclusions, target profile...",
				rows: 5
			},
			{
				id: "progressionTriggers",
				type: "textarea",
				label: "Progression Triggers",
				placeholder: "What causes a client to move to the next level...",
				rows: 3
			},
			{
				id: "levelEligibility",
				type: "textarea",
				label: "Level Eligibility",
				placeholder: "Who each level is designed for and who should not be in it...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "RET-A6",
		stage: "RET",
		subLevel: "A6",
		label: "Proof Asset Deployment Map",
		purpose: "Table mapping: Segment → Sequence → Touch # → Proof asset → Claim → CTA. Ensures proof is deployed strategically and ethically across all retention sequences.",
		fields: [
			{
				id: "deploymentTable",
				type: "textarea",
				label: "Deployment Map Table",
				placeholder: "Segment | Sequence | Touch # | Proof Asset | Claim | CTA...",
				rows: 5
			},
			{
				id: "claimLabelling",
				type: "textarea",
				label: "Claim Labelling",
				placeholder: "G-label classification for each claim used in the map...",
				rows: 3
			},
			{
				id: "consentStatus",
				type: "textarea",
				label: "Consent Status per Asset",
				placeholder: "Consent obtained? Method? Date?",
				rows: 3
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: ["CLAIM_UNVERIFIED", "PROOF_PENDING"]
	},
	{
		id: "OPT-S1",
		stage: "OPT",
		subLevel: "S1",
		label: "Metric Dashboard",
		purpose: "All four Canonical Metrics (CM-1 through CM-4) with current values, period-over-period comparison, trend interpretation, and anomaly notes. Includes BHI review (BHI-1 through BHI-5) and TVS review (TV-1, TV-2, TV-3).",
		fields: [
			{
				id: "cm1OutreachConversion",
				type: "number",
				label: "CM-1 — Qualified Outreach Conversion Rate (%)",
				placeholder: "0"
			},
			{
				id: "cm2FitToClose",
				type: "number",
				label: "CM-2 — Fit-to-Close Rate (%)",
				placeholder: "0"
			},
			{
				id: "cm3MilestoneCompletion",
				type: "number",
				label: "CM-3 — Client Milestone Completion Rate (%)",
				placeholder: "0"
			},
			{
				id: "cm4UnpromptedReferral",
				type: "number",
				label: "CM-4 — Unprompted Referral Rate (%)",
				placeholder: "0"
			},
			{
				id: "priorPeriodComparison",
				type: "textarea",
				label: "Period-over-Period Comparison",
				placeholder: "Trend vs. last cycle for each metric...",
				rows: 4
			},
			{
				id: "anomalyNotes",
				type: "textarea",
				label: "Anomaly & Data Quality Notes",
				placeholder: "Flag any data quality issues or unusual readings...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-S2",
		stage: "OPT",
		subLevel: "S2",
		label: "Weakest Link Identification",
		purpose: "Identifies the single weakest link in the system by tracing the largest drop-off to a specific stage and asset. Includes evidence summary and suspected failure modes.",
		fields: [
			{
				id: "weakestLinkStage",
				type: "text",
				label: "Weakest Link — Stage",
				placeholder: "Which BBOS stage contains the weakness..."
			},
			{
				id: "weakestLinkAsset",
				type: "text",
				label: "Weakest Link — Asset",
				placeholder: "Which specific asset within that stage..."
			},
			{
				id: "evidenceSummary",
				type: "textarea",
				label: "Evidence Summary",
				placeholder: "Data, funnel analysis, and conversion chain evidence...",
				rows: 4
			},
			{
				id: "suspectedFailureModes",
				type: "textarea",
				label: "Suspected Failure Modes",
				placeholder: "What is most likely causing the drop-off...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-S3",
		stage: "OPT",
		subLevel: "S3",
		label: "Root Cause Hypotheses",
		purpose: "One testable hypothesis per underperforming metric. Each must be falsifiable, stage-scoped, and connected to a specific asset change.",
		fields: [{
			id: "hypotheses",
			type: "textarea",
			label: "Root Cause Hypotheses",
			placeholder: "One hypothesis per underperforming metric: hypothesis, predicted direction of change, measurement method...",
			rows: 5
		}, {
			id: "risksAndSideEffects",
			type: "textarea",
			label: "Risks & Side Effects",
			placeholder: "What could go wrong if this hypothesis is acted on...",
			rows: 3
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-S4",
		stage: "OPT",
		subLevel: "S4",
		label: "Top 3 Optimization Actions",
		purpose: "Top 3 optimization actions for this cycle. Each is stage-scoped, asset-specific, and mapped to a hypothesis with effort estimate and expected impact.",
		fields: [
			{
				id: "action1",
				type: "textarea",
				label: "Action 1",
				placeholder: "Target stage/asset, change description, effort estimate, expected impact, validation metric...",
				rows: 4
			},
			{
				id: "action2",
				type: "textarea",
				label: "Action 2",
				placeholder: "Target stage/asset, change description, effort estimate, expected impact, validation metric...",
				rows: 4
			},
			{
				id: "action3",
				type: "textarea",
				label: "Action 3",
				placeholder: "Target stage/asset, change description, effort estimate, expected impact, validation metric...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-S5",
		stage: "OPT",
		subLevel: "S5",
		label: "Hold List & Guardrails",
		purpose: "Defines what must not change this cycle and why. Includes G7.2 check: if Stewardship Score < 7.0, run Constrained Proceed Protocol (FP-01) before any commercial action.",
		fields: [
			{
				id: "holdItems",
				type: "textarea",
				label: "Hold List (Frozen Elements)",
				placeholder: "Elements that must not change this cycle and what each hold protects...",
				rows: 5
			},
			{
				id: "g72Check",
				type: "select",
				label: "G7.2 — Stewardship Score Below 7.0?",
				options: ["No — score >= 7.0", "Yes — FP-01 required"]
			},
			{
				id: "fp01Assessment",
				type: "textarea",
				label: "FP-01 Assessment (if applicable)",
				placeholder: "Depletion type, commercial action, close window, accountability contact...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-S6",
		stage: "OPT",
		subLevel: "S6",
		label: "Next Cycle Test Plan",
		purpose: "One primary test for the next cycle with clear success criteria, scope, start/end dates, success metrics, stop conditions, and rollback plan.",
		fields: [
			{
				id: "testHypothesis",
				type: "textarea",
				label: "Test Hypothesis",
				placeholder: "What are you testing and why...",
				rows: 3
			},
			{
				id: "testScope",
				type: "textarea",
				label: "Scope & Duration",
				placeholder: "Start/end dates, what is included, what is excluded...",
				rows: 3
			},
			{
				id: "successMetrics",
				type: "textarea",
				label: "Success Metrics",
				placeholder: "What numbers or observations would confirm the hypothesis...",
				rows: 3
			},
			{
				id: "stopConditions",
				type: "textarea",
				label: "Stop Conditions",
				placeholder: "When to abandon the test early...",
				rows: 3
			},
			{
				id: "rollbackPlan",
				type: "textarea",
				label: "Rollback Plan",
				placeholder: "How to revert if the test fails...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-S7",
		stage: "OPT",
		subLevel: "S7",
		label: "Team Vitality Check-In",
		purpose: "Administer the Team Vitality Check-In (DRIFT-03). Aggregate TV-1, TV-2, TV-3 scores into the Team Vitality Score (TVS). Route per DRIFT-03 governance table. Minimum 2 respondents for validity.",
		fields: [
			{
				id: "tv1WorkSustainability",
				type: "number",
				label: "TV-1 — Work Sustainability (avg)",
				placeholder: "0"
			},
			{
				id: "tv2ClarityOfPurpose",
				type: "number",
				label: "TV-2 — Clarity of Purpose (avg)",
				placeholder: "0"
			},
			{
				id: "tv3IntegrityComfort",
				type: "number",
				label: "TV-3 — Integrity Comfort (avg)",
				placeholder: "0"
			},
			{
				id: "tvsOverall",
				type: "number",
				label: "TVS — Overall Score (avg of TV-1, TV-2, TV-3)",
				placeholder: "0"
			},
			{
				id: "respondentCount",
				type: "number",
				label: "Number of Respondents",
				placeholder: "0"
			},
			{
				id: "routingAction",
				type: "select",
				label: "Routing Action",
				options: [
					"TVS >= 7.0 — No action required",
					"TVS 6.0–6.9 — Team Monitoring",
					"TVS < 6.0 — Team Governor",
					"TV-3 < 7.0 — Integrity Flag"
				]
			},
			{
				id: "tvsNotes",
				type: "textarea",
				label: "TVS Notes & Follow-Up",
				placeholder: "Dimension analysis, integrity flag details, resourcing measures...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-A1",
		stage: "OPT",
		subLevel: "A1",
		label: "Stewardship Score (MG-01)",
		purpose: "Behaviourally-anchored self-assessment across 5 dimensions: System Vitality, Ethical Integrity, Time Sovereignty, Trust vs. Scarcity, and Asset Clarity. Score is the band where the majority of evidence sits.",
		fields: [
			{
				id: "systemVitality",
				type: "number",
				label: "1. System Vitality (1–10)",
				placeholder: "0"
			},
			{
				id: "ethicalIntegrity",
				type: "number",
				label: "2. Ethical Integrity (1–10)",
				placeholder: "0"
			},
			{
				id: "timeSovereignty",
				type: "number",
				label: "3. Time Sovereignty (1–10)",
				placeholder: "0"
			},
			{
				id: "trustVsScarcity",
				type: "number",
				label: "4. Trust vs. Scarcity (1–10)",
				placeholder: "0"
			},
			{
				id: "assetClarity",
				type: "number",
				label: "5. Asset Clarity (1–10)",
				placeholder: "0"
			},
			{
				id: "overallStewardshipScore",
				type: "number",
				label: "Overall Stewardship Score (avg)",
				placeholder: "0"
			},
			{
				id: "lowestDimensionEvidence",
				type: "textarea",
				label: "Evidence Summary for Lowest Dimension",
				placeholder: "Observable evidence for the dimension you scored lowest...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-A2",
		stage: "OPT",
		subLevel: "A2",
		label: "Barakah Health Index (MG-03)",
		purpose: "Five Barakah leading indicators: BHI-1 Unprompted Referral Rate, BHI-2 Post-Work Energy Rating, BHI-3 Right-Fit Client Ratio, BHI-4 Decision Clarity Rate, BHI-5 Asset Integrity Currency. Overall Reading: ALIGNED / MONITORING / INVESTIGATE.",
		fields: [
			{
				id: "bhi1ReferralRate",
				type: "number",
				label: "BHI-1 — Unprompted Referral Rate (%)",
				placeholder: "0"
			},
			{
				id: "bhi2EnergyRating",
				type: "number",
				label: "BHI-2 — Operator Post-Work Energy Rating (1–10 avg)",
				placeholder: "0"
			},
			{
				id: "bhi3RightFitRatio",
				type: "number",
				label: "BHI-3 — Right-Fit Client Ratio (%)",
				placeholder: "0"
			},
			{
				id: "bhi4DecisionClarity",
				type: "number",
				label: "BHI-4 — Decision Clarity Rate (%)",
				placeholder: "0"
			},
			{
				id: "bhi5AssetIntegrity",
				type: "text",
				label: "BHI-5 — Asset Integrity Currency (X/10 spot checks)",
				placeholder: "10/10"
			},
			{
				id: "bhiOverallReading",
				type: "select",
				label: "BHI Overall Reading",
				options: [
					"ALIGNED",
					"MONITORING",
					"INVESTIGATE"
				]
			},
			{
				id: "bhiNotes",
				type: "textarea",
				label: "BHI Notes & Signals",
				placeholder: "Early warning signals, investigation triggers, trend notes...",
				rows: 4
			}
		],
		hasGLabel: !0,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-A3",
		stage: "OPT",
		subLevel: "A3",
		label: "Constrained Proceed Protocol (FP-01)",
		purpose: "Accountable exception path when Stewardship Score < 7.0 but a commercial opportunity cannot be deferred. Three stages: Honest Depletion Classification, Constrained Proceed Guardrails, and Operator Sign-Off.",
		fields: [
			{
				id: "depletionType",
				type: "select",
				label: "Depletion Type",
				options: [
					"TYPE A — Existential Depletion (NO commercial action)",
					"TYPE B — Situational Fatigue",
					"TYPE C — Strategic Pressure"
				]
			},
			{
				id: "depletionEvidence",
				type: "textarea",
				label: "Evidence for Classification",
				placeholder: "Observable evidence supporting the depletion type selected...",
				rows: 4
			},
			{
				id: "commercialAction",
				type: "text",
				label: "Specific Commercial Action",
				placeholder: "The bounded opportunity this exception covers..."
			},
			{
				id: "closeWindow",
				type: "text",
				label: "Close Window / Deadline",
				placeholder: "Maximum 7 calendar days..."
			},
			{
				id: "accountabilityContact",
				type: "text",
				label: "Named Accountability Contact",
				placeholder: "Person notified in writing of the Constrained Proceed activation..."
			},
			{
				id: "guardrailsConfirmation",
				type: "select",
				label: "Guardrails Active?",
				options: ["Yes — all guardrails confirmed", "No — cannot confirm"]
			},
			{
				id: "operatorSignOff",
				type: "textarea",
				label: "Operator Sign-Off Statement",
				placeholder: "Confirm: (1) all guardrails active, (2) exception bounded to named action, (3) scope expansion reinstates full G7.2...",
				rows: 3
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "OPT-A4",
		stage: "OPT",
		subLevel: "A4",
		label: "Document Version Log",
		purpose: "Precise version-log entries for every document modified this cycle. Each entry: document name, version number, change summary, reason (what it protects), linked hypothesis/action.",
		fields: [{
			id: "versionEntries",
			type: "textarea",
			label: "Version Log Entries",
			placeholder: "Document | Version # | Change Summary | Reason | Linked Hypothesis/Action...",
			rows: 5
		}],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "OPT-A5",
		stage: "OPT",
		subLevel: "A5",
		label: "Optimization Pack Assembly",
		purpose: "Final assembled Optimization Pack in canon order: Metric Dashboard, Weakest Link, Root Cause Hypotheses, Top 3 Optimization Actions, Document Version Log, Hold List, Next Cycle Test Plan. NO-SHIP if any required input is missing.",
		fields: [
			{
				id: "packCompleteness",
				type: "select",
				label: "Pack Completeness",
				options: ["Complete — all 7 items present", "NO-SHIP — missing items listed below"]
			},
			{
				id: "missingItems",
				type: "textarea",
				label: "NO-SHIP Items (if applicable)",
				placeholder: "List missing items and what is needed to produce them...",
				rows: 3
			},
			{
				id: "cycleNumber",
				type: "number",
				label: "OPT Cycle Number",
				placeholder: "1"
			},
			{
				id: "cycleSummary",
				type: "textarea",
				label: "Cycle Summary",
				placeholder: "High-level summary of what this cycle revealed and what changes next...",
				rows: 4
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: []
	},
	{
		id: "IDY-PATCH-V1",
		stage: "IDY",
		subLevel: "PATCH-V1",
		label: "Input Integrity Gate (00A)",
		purpose: "Grade operator-supplied proof on a P0–P3 scale before the pipeline advances past Identity. P0 = no proof; P1 = self-attested; P2 = independent corroboration; P3 = audit-grade. Pipeline advancement past CRD requires P2 or higher on each Identity declaration.",
		fields: [
			{
				id: "capitalProofTier",
				type: "select",
				label: "Capital declaration proof tier",
				options: [
					{
						value: "P0",
						label: "P0 — No proof submitted"
					},
					{
						value: "P1",
						label: "P1 — Self-attested only"
					},
					{
						value: "P2",
						label: "P2 — Independent corroboration"
					},
					{
						value: "P3",
						label: "P3 — Audit-grade evidence"
					}
				]
			},
			{
				id: "skillsProofTier",
				type: "select",
				label: "Skills declaration proof tier",
				options: [
					{
						value: "P0",
						label: "P0 — No proof submitted"
					},
					{
						value: "P1",
						label: "P1 — Self-attested only"
					},
					{
						value: "P2",
						label: "P2 — Independent corroboration"
					},
					{
						value: "P3",
						label: "P3 — Audit-grade evidence"
					}
				]
			},
			{
				id: "proofLinkAudit",
				type: "textarea",
				label: "Proof-link audit notes",
				placeholder: "List each link from IDY-S1 'proofLinks' and the result of an independent fetch. Mark dead links, paywalled links, and links that do not substantiate the claim they accompany.",
				rows: 4
			},
			{
				id: "constraintIntegrityNotes",
				type: "textarea",
				label: "Constraint integrity notes",
				placeholder: "For each declared constraint, note whether it appears genuine (an honest limit) or aspirational (a target dressed as a constraint).",
				rows: 3
			},
			{
				id: "regulatoryRedFlags",
				type: "textarea",
				label: "Regulatory red flags surfaced",
				placeholder: "Any regulatory concerns flagged at intake that would warrant escalation before CRD.",
				rows: 3
			},
			{
				id: "gateVerdict",
				type: "select",
				label: "Gate verdict",
				options: [
					{
						value: "PASS",
						label: "PASS — pipeline may proceed to CRD"
					},
					{
						value: "HOLD",
						label: "HOLD — operator must supply additional proof before proceeding"
					},
					{
						value: "FAIL",
						label: "FAIL — pipeline cannot proceed; operator should reconsider scope"
					}
				]
			}
		],
		hasGLabel: !1,
		hasAiDraft: !1,
		validationFlags: ["GATE_BLOCKED"]
	},
	{
		id: "STR-PATCH-V1",
		stage: "STR",
		subLevel: "PATCH-V1",
		label: "Mechanism Factory (01B)",
		purpose: "Bridge the strategy-to-offer gap. STR produces operational structure; OFR needs a priced, scoped offering. The Mechanism Factory translates STR outputs into the explicit mechanism by which value is exchanged — what the operator does, what the client receives, what the price covers. Without this bridge, OFR-S tasks have no source material.",
		fields: [
			{
				id: "valueMechanism",
				type: "textarea",
				label: "Value mechanism (one paragraph)",
				placeholder: "In plain language: what does the operator do, what does the client receive, and how does the value get delivered? This becomes the seed for OFR-S1.",
				rows: 4
			},
			{
				id: "deliveryUnits",
				type: "textarea",
				label: "Discrete delivery units",
				placeholder: "Break the mechanism into the discrete units of work that will be delivered (e.g., diagnostic, plan, implementation, retainer). Each unit is a candidate line item in the OFR Scope Map.",
				rows: 4
			},
			{
				id: "operatorTimeMap",
				type: "textarea",
				label: "Operator time per delivery unit",
				placeholder: "Honest hours-per-unit estimate, broken down by activity (synchronous, async review, prep, follow-up). Anchors the eventual price floor in OFR.",
				rows: 3
			},
			{
				id: "structureTranslationCheck",
				type: "textarea",
				label: "STR → OFR translation check",
				placeholder: "For each output of STR (team architecture, processes, capabilities), state whether it can be honored by the proposed mechanism. Flag any STR output that is structurally implied but operationally unsupported.",
				rows: 4
			},
			{
				id: "bridgeVerdict",
				type: "select",
				label: "Bridge verdict",
				options: [
					{
						value: "READY",
						label: "READY — mechanism is coherent, OFR may proceed"
					},
					{
						value: "GAP",
						label: "GAP — at least one STR output has no operational bridge to OFR"
					},
					{
						value: "REWORK",
						label: "REWORK — mechanism does not yet match the strategy; STR needs revision"
					}
				]
			}
		],
		hasGLabel: !1,
		hasAiDraft: !0,
		validationFlags: ["GATE_BLOCKED"]
	}
];
function le(e) {
	return E.find((t) => t.id === e) || null;
}
function ue(e) {
	return E.filter((t) => t.stage === e);
}
var D = [
	"IDY",
	"CRD",
	"STR",
	"OFR",
	"OUT",
	"SLS",
	"DEL",
	"RET",
	"OPT"
];
function de(e) {
	let t = E.findIndex((t) => t.id === e);
	if (t === -1) return {
		upstream: [],
		downstream: [],
		requirements: ""
	};
	let n = E[t], r = E.filter((e) => e.stage === n.stage), i = r.findIndex((t) => t.id === e), a = [], o = [];
	if (i > 0) a.push(r[i - 1]);
	else {
		let e = D.indexOf(n.stage);
		if (e > 0) {
			let t = D[e - 1], n = E.filter((e) => e.stage === t);
			n.length > 0 && a.push(n[n.length - 1]);
		}
	}
	if (i < r.length - 1) o.push(r[i + 1]);
	else {
		let e = D.indexOf(n.stage);
		if (e < D.length - 1) {
			let t = D[e + 1], n = E.filter((e) => e.stage === t);
			n.length > 0 && o.push(n[0]);
		}
	}
	return {
		upstream: a,
		downstream: o,
		requirements: a.length > 0 ? `Requires completed ${a.map((e) => `${e.label} (${e.id})`).join(", ")}.` : ""
	};
}
var fe = {
	PROOF_PENDING: {
		label: "Proof Pending",
		detail: "Expertise claim needs independent validation — client outcome data not yet documented."
	},
	CLAIM_UNVERIFIED: {
		label: "Claim Unverified",
		detail: "One or more statements in this task have not been substantiated with evidence."
	},
	GATE_BLOCKED: {
		label: "Gate Blocked",
		detail: "This task cannot proceed until the preceding stage gate has been cleared."
	}
}, O = [
	{
		id: "think",
		label: "Think",
		color: "#c9a05a",
		stages: [
			"IDY",
			"CRD",
			"STR",
			"OFR"
		]
	},
	{
		id: "execute",
		label: "Execute",
		color: "#4ab8a8",
		stages: [
			"OUT",
			"SLS",
			"DEL",
			"RET"
		]
	},
	{
		id: "reckon",
		label: "Reckon",
		color: "#6366f1",
		stages: ["OPT"]
	}
], k = [
	{
		id: "IDY",
		order: 0,
		label: "Identity",
		layer: "think",
		description: "Establish the foundational identity, mission, and values of the business.",
		attrs: "Al-Awwal · Al-Badi",
		color: "var(--col-todo)"
	},
	{
		id: "CRD",
		order: 1,
		label: "Credibility",
		layer: "think",
		description: "Build credibility and establish the trust infrastructure for your offering.",
		attrs: "Al-Mu'min · Al-Wakil",
		color: "#6366f1"
	},
	{
		id: "STR",
		order: 2,
		label: "Structure",
		layer: "think",
		description: "Design the operational structure, processes, and team architecture.",
		attrs: "Al-Musawwir · Al-Mudabbir",
		color: "#8b5cf6"
	},
	{
		id: "OFR",
		order: 3,
		label: "Offering",
		layer: "think",
		description: "Define and price the service offering with clarity and integrity.",
		attrs: "Ar-Razzaq · Al-Karim",
		color: "#c9a05a"
	},
	{
		id: "OUT",
		order: 4,
		label: "Reach",
		layer: "execute",
		description: "Reach the right people through ethical, purposeful outreach.",
		attrs: "Al-Hadi · An-Nur",
		color: "#22c55e"
	},
	{
		id: "SLS",
		order: 5,
		label: "Convert",
		layer: "execute",
		description: "Convert interest into commitment through honest, consultative selling.",
		attrs: "As-Sami · Al-Basir",
		color: "#3b82f6"
	},
	{
		id: "DEL",
		order: 6,
		label: "Deliver",
		layer: "execute",
		description: "Deliver the promised outcome with excellence and care.",
		attrs: "Al-Muhsin · Al-Latif",
		color: "#4ab8a8"
	},
	{
		id: "RET",
		order: 7,
		label: "Retain",
		layer: "execute",
		description: "Retain clients through ongoing value, relationship, and stewardship.",
		attrs: "Al-Wadud · Al-Hafiz",
		color: "#f59e0b"
	},
	{
		id: "OPT",
		order: 8,
		label: "Reckon",
		layer: "reckon",
		description: "Reckon with outcomes, optimize systems, and prepare for the next cycle.",
		attrs: "Al-Hasib · Al-Khabir",
		color: "#ef4444"
	}
], A = [
	{
		id: "riba",
		label: "Riba (interest-based mechanism)",
		description: "The business model relies on interest, debt-yield, or other riba structures."
	},
	{
		id: "gharar",
		label: "Gharar (excessive uncertainty)",
		description: "The offering or transaction contains undefined elements the client cannot evaluate."
	},
	{
		id: "capability_gap",
		label: "Capability gap",
		description: "The operator cannot honestly meet the claims required to proceed at this scale."
	},
	{
		id: "regulatory",
		label: "Regulatory hard-stop",
		description: "A jurisdictional or compliance constraint blocks the pipeline from continuing."
	},
	{
		id: "withdrawal",
		label: "Operator withdrawal",
		description: "The operator has chosen to exit the pipeline by their own discernment."
	}
];
function pe(e) {
	return A.find((t) => t.id === e) || null;
}
var j = [{
	id: "00A",
	label: "Input Integrity Gate",
	description: "Grades operator proof on a P0-P3 scale before pipeline entry.",
	afterStage: "IDY",
	layer: "think"
}, {
	id: "01B",
	label: "Mechanism Factory",
	description: "Bridges the strategy-to-offer gap, ensuring STR outputs translate cleanly into OFR inputs.",
	afterStage: "STR",
	layer: "think"
}];
function M(e) {
	return O.find((t) => t.stages.includes(e)) || null;
}
function me(e) {
	return k.find((t) => t.id === e) || null;
}
var he = [
	{
		key: "think",
		label: "LEVEL 1",
		subtitle: "THINK",
		title: "Strategic Groundwork",
		desc: "Lay the strategic groundwork — identity, credibility, structure, and offering.",
		color: "#c9a05a"
	},
	{
		key: "execute",
		label: "LEVEL 2",
		subtitle: "EXECUTE",
		title: "Offering to Market",
		desc: "Bring the offering to market — outreach, sales, and delivery.",
		color: "#4ab8a8"
	},
	{
		key: "reckon",
		label: "LEVEL 3",
		subtitle: "RECKON",
		title: "Reckoning",
		desc: "Assess outcomes, strengthen retention, and optimize for the next cycle.",
		color: "#6366f1"
	}
];
function ge(e) {
	let t = O.find((t) => t.id === e);
	return t ? t.stages.map((e) => ({
		id: e,
		label: k.find((t) => t.id === e)?.label || e
	})) : [];
}
function _e(e) {
	return O.find((t) => t.stages.includes(e))?.id || "think";
}
//#endregion
//#region src/data/bbos/bbos-role-access.js
var N = [
	{
		id: "all",
		label: "All Roles",
		abbr: "ALL",
		description: "Full access to everything",
		color: "#c9a05a",
		bg: "#c9a05a18"
	},
	{
		id: "OW",
		label: "Owner",
		abbr: "OW",
		description: "Business Owner",
		color: "#22c55e",
		bg: "#22c55e18"
	},
	{
		id: "ST",
		label: "Strategist",
		abbr: "ST",
		description: "Pipeline Manager",
		color: "#3b82f6",
		bg: "#3b82f618"
	},
	{
		id: "CW",
		label: "Copywriter",
		abbr: "CW",
		description: "Content & Copy",
		color: "#8b5cf6",
		bg: "#8b5cf618"
	},
	{
		id: "MB",
		label: "Media Buyer",
		abbr: "MB",
		description: "Paid & Distribution",
		color: "#f59e0b",
		bg: "#f59e0b18"
	},
	{
		id: "SE",
		label: "Setter",
		abbr: "SE",
		description: "Appointment Setting",
		color: "#ec4899",
		bg: "#ec489918"
	},
	{
		id: "CL",
		label: "Closer",
		abbr: "CL",
		description: "Sales",
		color: "#ef4444",
		bg: "#ef444418"
	},
	{
		id: "FU",
		label: "Delivery",
		abbr: "FU",
		description: "Delivery & Client Success",
		color: "#14b8a6",
		bg: "#14b8a618"
	}
], P = {
	"IDY-S1": {
		OW: "O",
		ST: "V",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"IDY-S2": {
		OW: "O",
		ST: "V",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"IDY-S3": {
		OW: "O",
		ST: "V",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"IDY-S4": {
		OW: "O",
		ST: "V",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"IDY-PATCH-V1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-S1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-S2": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-S3": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-S4": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-S5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-S6": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-V1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-V2": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-V3": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-AF1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-AF2": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-AF3": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-AF4": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-AF5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"CRD-FP02": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-S1": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-S2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"STR-S3": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"STR-S4": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-S5": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-V1": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-V2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-V3": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-AF1": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"STR-AF2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"STR-AF3": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-AF4": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "E",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-AF5": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"STR-PATCH-V1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OFR-S1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OFR-S2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "V",
		CL: "V",
		FU: "V"
	},
	"OFR-S3": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "V",
		CL: "V",
		FU: "V"
	},
	"OFR-S4": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "V"
	},
	"OFR-S5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OFR-A1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OFR-A2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "V",
		CL: "V",
		FU: "V"
	},
	"OFR-A3": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OFR-A4": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "V"
	},
	"OFR-A5": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "V"
	},
	"OFR-A6": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "V"
	},
	"OFR-A7": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "V"
	},
	"OFR-A8": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "V"
	},
	"OFR-V1": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "V"
	},
	"OFR-V2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "V"
	},
	"OFR-FP03": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "V"
	},
	"OUT-S1": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "E",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-S2": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-S3": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-S4": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-S5": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-A1": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-A2": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"OUT-A3": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "V",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-A4": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "E",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-A5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "E",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-A6": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "V",
		FU: "-"
	},
	"OUT-A7": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "E",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OUT-IC": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "E",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"SLS-S0": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-S1": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-S2": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-S3": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-S4": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "E",
		FU: "-"
	},
	"SLS-S5": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "E",
		FU: "-"
	},
	"SLS-S6": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "E",
		CL: "V",
		FU: "-"
	},
	"SLS-S7": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "E",
		CL: "V",
		FU: "-"
	},
	"SLS-A0": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-A1": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-A2": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"SLS-A3": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "E",
		FU: "-"
	},
	"SLS-A4": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "E",
		FU: "-"
	},
	"SLS-A5": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "E",
		FU: "-"
	},
	"SLS-A6": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "V",
		SE: "E",
		CL: "-",
		FU: "-"
	},
	"SLS-FP03": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "V",
		SE: "E",
		CL: "-",
		FU: "-"
	},
	"DEL-S0": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "V",
		FU: "E"
	},
	"DEL-S1": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "V",
		CL: "V",
		FU: "E"
	},
	"DEL-S2": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"DEL-S3": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"DEL-S4": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"DEL-S5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"DEL-A1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "E"
	},
	"DEL-A2": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "E"
	},
	"DEL-A3": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"DEL-A4": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"DEL-A5": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "E"
	},
	"DEL-A6": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "E"
	},
	"DEL-A7": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "E"
	},
	"RET-S1": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "V"
	},
	"RET-S2": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "V"
	},
	"RET-S3": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-S4": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-S5": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-A1": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-A2": {
		OW: "O",
		ST: "O",
		CW: "E",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-A3": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-A4": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"RET-A5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "V",
		FU: "-"
	},
	"RET-A6": {
		OW: "O",
		ST: "O",
		CW: "V",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "E"
	},
	"OPT-S1": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-S2": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-S3": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-S4": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-S5": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-S6": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-S7": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-A1": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-A2": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-A3": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-A4": {
		OW: "O",
		ST: "-",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	},
	"OPT-A5": {
		OW: "O",
		ST: "O",
		CW: "-",
		MB: "-",
		SE: "-",
		CL: "-",
		FU: "-"
	}
};
function F(e, t) {
	if (!e || e === "all" || !t) return "O";
	let n = P[t];
	return n && n[e] || "-";
}
function ve(e) {
	if (!e || e === "all") return null;
	let t = /* @__PURE__ */ new Set();
	for (let [n, r] of Object.entries(P)) r[e] && r[e] !== "-" && t.add(n.split("-")[0]);
	return t;
}
function ye(e) {
	return N.find((t) => t.id === e) || N[0];
}
//#endregion
//#region src/data/config/g-labels.js
var be = [
	{
		id: "G1",
		label: "Bayyinah",
		description: "Verified delivery — the outcome has been concretely demonstrated.",
		color: "#22c55e",
		bg: "#22c55e18",
		icon: "ShieldCheck"
	},
	{
		id: "G2",
		label: "Bayyinah",
		description: "Evidenced standard — has supporting data or precedent under normal conditions.",
		color: "#3b82f6",
		bg: "#3b82f618",
		icon: "FileCheck"
	},
	{
		id: "G3",
		label: "Qarina",
		description: "Conditional or inferred — based on partial evidence or hypothesis.",
		color: "#f59e0b",
		bg: "#f59e0b18",
		icon: "FlaskConical"
	},
	{
		id: "G4",
		label: "Niyyah",
		description: "Future intent — not yet attempted or validated.",
		color: "#8b5cf6",
		bg: "#8b5cf618",
		icon: "Sparkles"
	}
];
function xe(e) {
	return be.find((t) => t.id === e) || null;
}
//#endregion
//#region src/components/bbos/BbosFullDashboard.jsx
function I({ gLabel: e, size: t = "sm" }) {
	let n = xe(e);
	if (!n) return null;
	let r = t === "sm";
	return /* @__PURE__ */ w("span", {
		className: "glabel-badge",
		title: `${n.id} (${n.label}) — ${n.description}`,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: "3px",
			padding: r ? "1px 6px" : "2px 8px",
			fontSize: r ? "0.65rem" : "0.72rem",
			fontWeight: 600,
			fontFamily: "var(--font-mono)",
			color: n.color,
			background: n.bg,
			border: `1px solid ${n.color}30`,
			borderRadius: "4px",
			letterSpacing: "0.03em",
			lineHeight: 1.4,
			whiteSpace: "nowrap"
		},
		children: n.label
	});
}
function L({ taskId: e, index: t, title: n, span: r, status: i, accentColor: a, chips: o, fieldProgress: s, purpose: c, onSelectTask: l, children: u }) {
	let d = !!(l && e), f = (t) => {
		d && (t.target.closest("a, button, input, select, textarea") || l(e));
	}, p = (t) => {
		d && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), l(e));
	}, m = a ? {
		background: `color-mix(in srgb, ${a} 14%, transparent)`,
		color: a
	} : void 0, h = [
		"dtc__card",
		`dtc__card--${i}`,
		d && "dtc__card--clickable"
	].filter(Boolean).join(" "), g = r ? { gridColumn: `span ${r}` } : void 0, _ = s?.total ? Math.round(s.filled / s.total * 100) : null, v = _ === 100 ? "var(--col-done)" : _ >= 50 ? "var(--accent)" : "var(--pri-high)";
	return /* @__PURE__ */ T("div", {
		"data-task-id": e,
		className: h,
		style: g,
		onClick: f,
		onKeyDown: d ? p : void 0,
		role: d ? "button" : void 0,
		tabIndex: d ? 0 : void 0,
		children: [
			/* @__PURE__ */ T("div", {
				className: "dtc__card-head",
				children: [/* @__PURE__ */ w("div", {
					className: "dtc__card-num",
					style: m,
					children: String(t + 1).padStart(2, "0")
				}), /* @__PURE__ */ T("div", {
					className: "dtc__card-head-info",
					children: [/* @__PURE__ */ w("span", {
						className: "dtc__card-title",
						children: n
					}), o?.length > 0 && /* @__PURE__ */ w("div", {
						className: "dtc__card-chips",
						children: o.map((e, t) => /* @__PURE__ */ w("span", {
							className: e.className || "dtc__chip",
							style: e.style,
							children: e.label
						}, t))
					})]
				})]
			}),
			_ !== null && /* @__PURE__ */ T("div", {
				className: "dtc__progress-row",
				children: [/* @__PURE__ */ w("div", {
					className: "dtc__progress-track",
					children: /* @__PURE__ */ w("div", {
						className: "dtc__progress-fill",
						style: {
							width: `${_}%`,
							background: v
						}
					})
				}), /* @__PURE__ */ T("span", {
					className: "dtc__progress-pct",
					children: [_, "%"]
				})]
			}),
			c && /* @__PURE__ */ w("p", {
				className: "dtc__card-purpose",
				children: c
			}),
			u && /* @__PURE__ */ w("div", {
				className: "dtc__card-body",
				children: u
			})
		]
	});
}
function Se({ bbosRole: e, bbosFilter: t }) {
	let n = ye(e), r = me(t), i = a(() => {
		let n = ue(t), r = /* @__PURE__ */ new Set();
		for (let t of n) {
			let n = P[t.id];
			if (n) for (let [t, i] of Object.entries(n)) i !== "-" && t !== e && r.add(t);
		}
		return [...r].map((e) => ye(e)).filter(Boolean);
	}, [t, e]);
	return /* @__PURE__ */ T("div", {
		className: "bfd__scope-gate",
		children: [
			/* @__PURE__ */ w(b, { size: 48 }),
			/* @__PURE__ */ w("h3", { children: "OUTSIDE YOUR SCOPE" }),
			/* @__PURE__ */ T("p", { children: [
				"The ",
				/* @__PURE__ */ w("strong", { children: n?.label || e }),
				" role does not have access to ",
				/* @__PURE__ */ w("strong", { children: r?.label || t }),
				"."
			] }),
			i.length > 0 && /* @__PURE__ */ T("p", {
				className: "bfd__scope-gate-hint",
				children: ["Access is available under: ", i.map((e) => e.label).join(", ")]
			})
		]
	});
}
function R(e) {
	return e ? e.split("\n").map((e) => e.trim()).filter(Boolean) : [];
}
function z(e, t) {
	return e ? e.length > t ? e.slice(0, t) + "…" : e : "";
}
function Ce(e, t) {
	if (!t || !e.options) return t || null;
	let n = e.options.find((e) => e.value === t);
	return n ? n.label : t;
}
function we(e, t) {
	return t ? {
		filled: e.fields.filter((e) => {
			let n = t[e.id];
			return n != null && String(n).trim() !== "";
		}).length,
		total: e.fields.length
	} : {
		filled: 0,
		total: e.fields.length
	};
}
function B(e) {
	return e ? e.startsWith("PATCH") ? "PATCH" : e.startsWith("AF") ? "AF" : e.startsWith("IFB") ? "IFB" : e.startsWith("FP") ? "FP" : e.startsWith("S") ? "S" : e.startsWith("A") ? "A" : e.startsWith("V") ? "V" : e.startsWith("IC") ? "IC" : "OTHER" : "OTHER";
}
var Te = {
	PATCH: "Patch Plan Sub-Stage",
	AF: "Analysis Framework",
	S: "Strategic Tasks",
	A: "Asset Tasks",
	V: "Validation Gates",
	FP: "Framework Prompts",
	IFB: "IFB Forms",
	IC: "Integrity Check",
	OTHER: "Additional Tasks"
}, Ee = new Set([
	"S",
	"V",
	"FP",
	"PATCH"
]), De = new Set([
	"A",
	"AF",
	"IC"
]);
function Oe(e) {
	return Ee.has(e) ? "research" : De.has(e) ? "asset" : "research";
}
function ke(e, t) {
	return t.map(() => 12);
}
function Ae(e, t = 3) {
	let n = Math.min(Math.max(e, 0), t);
	return /* @__PURE__ */ w("span", {
		className: "bfd__pa-stars",
		children: Array.from({ length: t }, (e, t) => t + 1).map((e) => /* @__PURE__ */ w(ae, {
			size: 14,
			className: e <= n ? "" : "bfd__pa-star--empty",
			fill: e <= n ? "currentColor" : "none"
		}, e))
	});
}
function V(e) {
	let t = (e || "").trim().toLowerCase();
	return t.startsWith("strong") ? 3 : t.startsWith("moderate") ? 2 : t.startsWith("weak") || t.startsWith("unverifiable") || t.startsWith("insufficient") ? 1 : null;
}
var je = {
	IDY: "\"He who is not truthful in establishing the foundation has built upon sand.\"",
	CRD: "\"A business built on self-deception is a business that cannot sustain.\"",
	STR: "\"Before you speak a word to the market, be certain of the truth behind it.\"",
	OFR: "\"The offering is only as sound as the promise it is built upon.\"",
	OUT: "\"Reach those who need you — not those you want to sell to.\"",
	SLS: "\"A sale is not a conquest — it is a covenant entered freely by both parties.\"",
	DEL: "\"Excellence in delivery is not efficiency alone — it is that the client feels cared for at every step.\"",
	RET: "\"The bond after the sale is the true measure of the relationship.\"",
	OPT: "\"Optimization without integrity is just efficient exploitation.\""
};
function H(...e) {
	return (t) => {
		let n = e.filter((e) => !!t?.[e]?.trim?.()).length, r = e.length;
		return n === r ? 5 : n >= r * .75 ? 4 : n >= r * .5 ? 3 : +(n >= 1);
	};
}
var U = {
	IDY: [
		{
			label: "Capital & Skills Declared",
			taskId: "IDY-S1",
			fieldIds: ["capitalDeclaration", "skillsDeclaration"],
			score: H("capitalDeclaration", "skillsDeclaration")
		},
		{
			label: "Proof & Constraints",
			taskId: "IDY-S1",
			fieldIds: [
				"proofLinks",
				"constraintsDeclaration",
				"geographyDeclaration",
				"regulatoryDeclaration"
			],
			score: H("proofLinks", "constraintsDeclaration", "geographyDeclaration", "regulatoryDeclaration")
		},
		{
			label: "Normalisation Complete",
			taskId: "IDY-S2",
			fieldIds: [
				"capitalMapping",
				"skillsMapping",
				"proofMapping",
				"constraintsMapping"
			],
			score: H("capitalMapping", "skillsMapping", "proofMapping", "constraintsMapping")
		},
		{
			label: "Gap Severity Assessed",
			taskId: "IDY-S3",
			fieldIds: ["gapSeverity", "resolutionActions"],
			score: (e) => e?.gapSeverity?.trim() ? e?.resolutionActions?.trim() ? 5 : 3 : 0
		},
		{
			label: "Routing Decision Made",
			taskId: "IDY-S4",
			fieldIds: ["routingDecision", "routingBasis"],
			score: (e) => e?.routingDecision?.trim() ? e?.routingBasis?.trim() ? 5 : 3 : 0
		}
	],
	CRD: [
		{
			label: "Overall Proof Strength",
			taskId: "CRD-S3",
			fieldIds: ["overallProofStrength"],
			score: (e) => ({
				strong: 5,
				moderate: 3,
				weak: 1,
				insufficient: 0
			})[e?.overallProofStrength] ?? 0
		},
		{
			label: "Gate A — Regulatory",
			taskId: "CRD-V1",
			fieldIds: ["gateARegulatory"],
			score: (e) => ({
				pass: 5,
				conditional: 3,
				fail: 0
			})[e?.gateARegulatory] ?? 0
		},
		{
			label: "Gate B — Market Fit",
			taskId: "CRD-V1",
			fieldIds: ["gateBMarketFit"],
			score: (e) => ({
				pass: 5,
				conditional: 3,
				fail: 0
			})[e?.gateBMarketFit] ?? 0
		},
		{
			label: "Gate C — Competence Proof",
			taskId: "CRD-V1",
			fieldIds: ["gateCCompetenceProof"],
			score: (e) => ({
				pass: 5,
				conditional: 3,
				fail: 0
			})[e?.gateCCompetenceProof] ?? 0
		},
		{
			label: "Gate D — Proven Demand",
			taskId: "CRD-V1",
			fieldIds: ["gateDProvenDemand"],
			score: (e) => ({
				pass: 5,
				conditional: 3,
				fail: 0
			})[e?.gateDProvenDemand] ?? 0
		}
	],
	STR: [
		{
			label: "Integrity Verdict",
			taskId: "STR-V1",
			fieldIds: ["integrityVerdict"],
			score: (e) => ({
				pass: 5,
				conditionalPass: 3,
				fail: 0
			})[e?.integrityVerdict] ?? 0
		},
		{
			label: "VoC Depth",
			taskId: "STR-S2",
			fieldIds: ["verbatimPhrases"],
			score: (e) => {
				let t = R(e?.verbatimPhrases).length;
				return t >= 15 ? 5 : t >= 8 ? 3 : +(t >= 1);
			}
		},
		{
			label: "Content Angles",
			taskId: "STR-AF4",
			fieldIds: [
				"contentAngle1",
				"contentAngle2",
				"contentAngle3",
				"contentAngle4",
				"contentAngle5",
				"contentAngle6"
			],
			score: (e) => {
				let t = [
					1,
					2,
					3,
					4,
					5,
					6
				].filter((t) => !!e?.[`contentAngle${t}`]?.trim()).length;
				return t === 6 ? 5 : t >= 4 ? 3 : +(t >= 1);
			}
		},
		{
			label: "Core Belief Defined",
			taskId: "STR-AF1",
			fieldIds: ["beliefStatement"],
			score: (e) => e?.beliefStatement?.trim() ? 5 : 0
		},
		{
			label: "Transformation Arc",
			taskId: "STR-AF2",
			fieldIds: [
				"beforeState",
				"transformation",
				"afterState"
			],
			score: (e) => {
				let t = [
					"beforeState",
					"transformation",
					"afterState"
				].filter((t) => !!e?.[t]?.trim()).length;
				return t === 3 ? 5 : t === 2 ? 3 : +(t === 1);
			}
		}
	],
	OFR: [
		{
			label: "Promise G-Label",
			taskId: "OFR-A1",
			fieldIds: ["promiseGLabel"],
			score: (e) => ({
				G1: 5,
				G2: 3
			})[e?.promiseGLabel] ?? 0
		},
		{
			label: "ICP Completeness",
			taskId: "OFR-A2",
			fieldIds: [
				"demographicProfile",
				"psychographicProfile",
				"qualificationCriteria",
				"disqualificationCriteria"
			],
			score: (e) => {
				let t = [
					"demographicProfile",
					"psychographicProfile",
					"qualificationCriteria",
					"disqualificationCriteria"
				].filter((t) => !!e?.[t]?.trim()).length;
				return t === 4 ? 5 : t === 3 ? 3 : +(t >= 1);
			}
		},
		{
			label: "Guarantee Rigor",
			taskId: "OFR-A6",
			fieldIds: [
				"triggerCondition",
				"guaranteeScope",
				"remedy",
				"operatorBoundaries"
			],
			score: (e) => {
				let t = [
					"triggerCondition",
					"guaranteeScope",
					"remedy",
					"operatorBoundaries"
				].filter((t) => !!e?.[t]?.trim()).length;
				return t === 4 ? 5 : t === 3 ? 3 : +(t >= 1);
			}
		},
		{
			label: "Scope Map",
			taskId: "OFR-A4",
			fieldIds: ["scopeIncluded", "scopeExcluded"],
			score: (e) => e?.scopeIncluded?.trim() && e?.scopeExcluded?.trim() ? 5 : e?.scopeIncluded?.trim() || e?.scopeExcluded?.trim() ? 3 : 0
		},
		{
			label: "Promise Proof",
			taskId: "OFR-A1",
			fieldIds: ["proofStatus"],
			score: (e) => ({
				verified: 5,
				pending: 1
			})[e?.proofStatus] ?? 0
		}
	],
	OUT: [
		{
			label: "Audience Concern Mapping",
			taskId: "OUT-IC",
			fieldIds: ["icOut1"],
			score: (e) => e?.icOut1 === "pass" ? 5 : 0
		},
		{
			label: "G-Label Compliance",
			taskId: "OUT-IC",
			fieldIds: ["icOut2"],
			score: (e) => e?.icOut2 === "pass" ? 5 : 0
		},
		{
			label: "Singular CTA",
			taskId: "OUT-IC",
			fieldIds: ["icOut3"],
			score: (e) => e?.icOut3 === "pass" ? 5 : 0
		},
		{
			label: "Scarcity Verified",
			taskId: "OUT-IC",
			fieldIds: ["icOut4"],
			score: (e) => e?.icOut4 === "pass" ? 5 : 0
		},
		{
			label: "Readability Check",
			taskId: "OUT-IC",
			fieldIds: ["icOut5"],
			score: (e) => e?.icOut5 === "pass" ? 5 : 0
		}
	],
	SLS: [
		{
			label: "Qualification Depth",
			taskId: "SLS-S1",
			fieldIds: [
				"qualificationQuestions",
				"autoDisqualifiers",
				"scoringRoutingNotes"
			],
			score: H("qualificationQuestions", "autoDisqualifiers", "scoringRoutingNotes")
		},
		{
			label: "Routing Completeness",
			taskId: "SLS-S2",
			fieldIds: [
				"routingTable",
				"decisionTreeSteps",
				"noFitExitPath"
			],
			score: H("routingTable", "decisionTreeSteps", "noFitExitPath")
		},
		{
			label: "Call Script Ready",
			taskId: "SLS-S3",
			fieldIds: [
				"callStructure",
				"verbatimScript",
				"branchPrompts"
			],
			score: H("callStructure", "verbatimScript", "branchPrompts")
		},
		{
			label: "Objection Coverage",
			taskId: "SLS-S4",
			fieldIds: ["objectionList"],
			score: (e) => {
				let t = R(e?.objectionList).length;
				return t >= 10 ? 5 : t >= 5 ? 3 : +(t >= 1);
			}
		},
		{
			label: "Asset Assembly",
			taskId: "SLS-A0",
			fieldIds: ["assemblyStatus"],
			score: (e) => ({
				complete: 5,
				partial: 3,
				pending: 1
			})[e?.assemblyStatus] ?? 0
		}
	],
	DEL: [
		{
			label: "Delivery Phases Mapped",
			taskId: "DEL-S1",
			fieldIds: [
				"deliveryPhases",
				"checkpoints",
				"ownerAssignments"
			],
			score: H("deliveryPhases", "checkpoints", "ownerAssignments")
		},
		{
			label: "Quality & Risk Coverage",
			taskId: "DEL-S2",
			fieldIds: [
				"failureModes",
				"qcChecks",
				"guaranteeTriggers",
				"mitigationSteps"
			],
			score: H("failureModes", "qcChecks", "guaranteeTriggers", "mitigationSteps")
		},
		{
			label: "Success Milestones",
			taskId: "DEL-S3",
			fieldIds: ["milestoneList", "successDefinition"],
			score: H("milestoneList", "successDefinition")
		},
		{
			label: "Proof Capture Plan",
			taskId: "DEL-S4",
			fieldIds: [
				"proofTypes",
				"captureTimeline",
				"captureMethod",
				"consentLanguage"
			],
			score: H("proofTypes", "captureTimeline", "captureMethod", "consentLanguage")
		},
		{
			label: "Retention Handoff",
			taskId: "DEL-S5",
			fieldIds: [
				"handoffNotes",
				"retentionSeedMessage",
				"nextSteps"
			],
			score: H("handoffNotes", "retentionSeedMessage", "nextSteps")
		}
	],
	RET: [
		{
			label: "Segment Definitions",
			taskId: "RET-S1",
			fieldIds: [
				"coldLeadDef",
				"pastClientDef",
				"reActivationDef",
				"warmNonConvertDef"
			],
			score: H("coldLeadDef", "pastClientDef", "reActivationDef", "warmNonConvertDef")
		},
		{
			label: "Proof Inventory",
			taskId: "RET-S2",
			fieldIds: [
				"proofAssets",
				"segmentRelevance",
				"claimStrength"
			],
			score: H("proofAssets", "segmentRelevance", "claimStrength")
		},
		{
			label: "Continuation Map",
			taskId: "RET-S3",
			fieldIds: [
				"upsellPath",
				"ascensionLevels",
				"eligibilityRules",
				"triggerTiming"
			],
			score: H("upsellPath", "ascensionLevels", "eligibilityRules", "triggerTiming")
		},
		{
			label: "Message Spine & Tone",
			taskId: "RET-S4",
			fieldIds: [
				"warmingPosture",
				"toneConstraints",
				"ctaStandards",
				"messageSpines"
			],
			score: H("warmingPosture", "toneConstraints", "ctaStandards", "messageSpines")
		},
		{
			label: "Deployment Logic",
			taskId: "RET-S5",
			fieldIds: ["proofToSequenceMap", "channelAssumptions"],
			score: H("proofToSequenceMap", "channelAssumptions")
		}
	],
	OPT: [
		{
			label: "Metrics Tracked",
			taskId: "OPT-S1",
			fieldIds: [
				"cm1OutreachConversion",
				"cm2FitToClose",
				"cm3MilestoneCompletion",
				"cm4UnpromptedReferral"
			],
			score: H("cm1OutreachConversion", "cm2FitToClose", "cm3MilestoneCompletion", "cm4UnpromptedReferral")
		},
		{
			label: "Weakest Link Identified",
			taskId: "OPT-S2",
			fieldIds: [
				"weakestLinkStage",
				"evidenceSummary",
				"suspectedFailureModes"
			],
			score: H("weakestLinkStage", "evidenceSummary", "suspectedFailureModes")
		},
		{
			label: "Root Cause Hypotheses",
			taskId: "OPT-S3",
			fieldIds: ["hypotheses", "risksAndSideEffects"],
			score: (e) => e?.hypotheses?.trim() ? e?.risksAndSideEffects?.trim() ? 5 : 3 : 0
		},
		{
			label: "Optimization Actions",
			taskId: "OPT-S4",
			fieldIds: [
				"action1",
				"action2",
				"action3"
			],
			score: H("action1", "action2", "action3")
		},
		{
			label: "Stewardship Score",
			taskId: "OPT-A1",
			fieldIds: ["overallStewardshipScore"],
			score: (e) => {
				let t = Number(e?.overallStewardshipScore);
				return t >= 80 ? 5 : t >= 60 ? 4 : t >= 40 ? 3 : +(t >= 20);
			}
		}
	]
};
function Me({ fieldData: e }) {
	let t = R(e.matchedCategories).slice(0, 4), n = R(e.matchRationale);
	return /* @__PURE__ */ w("div", {
		className: "bfd__cat-grid",
		children: t.length > 0 ? t.map((e, t) => /* @__PURE__ */ T("div", {
			className: `bfd__cat-item ${t === 0 ? "bfd__cat-item--primary" : ""}`,
			children: [/* @__PURE__ */ w("span", {
				className: "bfd__cat-item-num",
				children: String(t + 1).padStart(2, "0")
			}), /* @__PURE__ */ T("div", {
				className: "bfd__cat-item-body",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__cat-item-name",
					children: z(e, 70)
				}), n[t] && /* @__PURE__ */ w("div", {
					className: "bfd__cat-item-rationale",
					children: z(n[t], 90)
				})]
			})]
		}, t)) : /* @__PURE__ */ w("span", {
			className: "bfd__field-empty",
			children: "—"
		})
	});
}
function Ne(e) {
	let t = e.match(/^(.+?)[\s:—-]+(\d+(?:\.\d+)?)\s*(.*)$/);
	return t ? {
		name: t[1].trim(),
		score: parseFloat(t[2]),
		note: t[3].trim()
	} : {
		name: e.trim(),
		score: null,
		note: ""
	};
}
function W({ fieldData: e }) {
	let t = R(e.scoredCandidates).slice(0, 6), n = R(e.marketVelocityScores), r = R(e.strategicScores);
	return t.length === 0 ? /* @__PURE__ */ w("span", {
		className: "bfd__field-empty",
		children: "—"
	}) : /* @__PURE__ */ T("div", {
		className: "bfd__cand-table",
		children: [/* @__PURE__ */ T("div", {
			className: "bfd__cand-head",
			children: [
				/* @__PURE__ */ w("span", { children: "Candidate" }),
				/* @__PURE__ */ w("span", { children: "Mkt Vel." }),
				/* @__PURE__ */ w("span", { children: "Strategic" })
			]
		}), t.map((e, t) => {
			let i = Ne(e), a = parseFloat(n[t]) || (i.score ?? null), o = parseFloat(r[t]) || (i.score ?? null);
			return /* @__PURE__ */ T("div", {
				className: "bfd__cand-row",
				children: [
					/* @__PURE__ */ w("span", {
						className: "bfd__cand-name",
						children: z(i.name, 36)
					}),
					/* @__PURE__ */ w("span", {
						className: "bfd__cand-score",
						children: a ?? "—"
					}),
					/* @__PURE__ */ w("span", {
						className: "bfd__cand-score",
						children: o ?? "—"
					})
				]
			}, t);
		})]
	});
}
function G({ quadrants: e }) {
	return /* @__PURE__ */ w("div", {
		className: "bfd__matrix",
		children: e.map((e, t) => /* @__PURE__ */ T("div", {
			className: `bfd__matrix-cell ${e.accent ? "bfd__matrix-cell--accent" : ""}`,
			children: [/* @__PURE__ */ w("div", {
				className: "bfd__matrix-cell-label",
				children: e.label
			}), /* @__PURE__ */ w("div", {
				className: "bfd__matrix-cell-content",
				children: e.content || /* @__PURE__ */ w("span", {
					className: "bfd__field-empty",
					children: "—"
				})
			})]
		}, t))
	});
}
function K({ checks: e, overallValue: t, overallLabel: n }) {
	let r = e.filter((e) => e.value === "pass").length, i = e.every((e) => !e.value) ? "PENDING" : r === e.length ? "CLEARED" : e.some((e) => e.value === "fail") ? "BLOCKED" : "PARTIAL", a = {
		CLEARED: "var(--col-done)",
		BLOCKED: "var(--pri-urgent)",
		PARTIAL: "var(--pri-high)",
		PENDING: "var(--text3)"
	}[i];
	return /* @__PURE__ */ T("div", {
		className: "bfd__gate-checks",
		children: [
			/* @__PURE__ */ T("div", {
				className: "bfd__gate-summary",
				style: { color: a },
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__gate-verdict",
					children: n || i
				}), /* @__PURE__ */ T("span", {
					className: "bfd__gate-count",
					children: [
						r,
						"/",
						e.length,
						" passed"
					]
				})]
			}),
			e.map((e, t) => {
				let n = e.value === "pass", r = e.value === "fail", i = e.value === "conditional";
				return /* @__PURE__ */ T("div", {
					className: `bfd__gate-check bfd__gate-check--${e.value || "pending"}`,
					children: [
						/* @__PURE__ */ w("span", {
							className: "bfd__gate-check-icon",
							children: n ? /* @__PURE__ */ w(h, {
								size: 14,
								style: { color: "var(--col-done)" }
							}) : r ? /* @__PURE__ */ w(se, {
								size: 14,
								style: { color: "var(--pri-urgent)" }
							}) : i ? /* @__PURE__ */ w(c, {
								size: 14,
								style: { color: "var(--pri-high)" }
							}) : /* @__PURE__ */ w("span", { className: "bfd__gate-pending-dot" })
						}),
						/* @__PURE__ */ w("span", {
							className: "bfd__gate-check-label",
							children: e.label
						}),
						/* @__PURE__ */ w("span", {
							className: `bfd__gate-check-badge bfd__gate-check-badge--${e.value || "pending"}`,
							children: n ? "PASS" : r ? "FAIL" : i ? "COND" : "—"
						})
					]
				}, t);
			}),
			t && /* @__PURE__ */ T("div", {
				className: "bfd__gate-overall",
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__gate-overall-label",
					children: "Overall"
				}), /* @__PURE__ */ w("span", {
					className: "bfd__gate-overall-value",
					children: n || t.toUpperCase()
				})]
			})
		]
	});
}
function Pe({ fieldData: e }) {
	let t = R(e.auditedClaims).slice(0, 5), n = R(e.claimStrengthRatings), r = e.auditConclusion || "";
	return /* @__PURE__ */ T("div", {
		className: "bfd__proof-audit",
		children: [
			t.length > 0 && /* @__PURE__ */ w("div", {
				className: "bfd__audit-list",
				children: t.map((e, t) => /* @__PURE__ */ T("div", {
					className: "bfd__audit-item",
					children: [/* @__PURE__ */ w("span", {
						className: "bfd__audit-num",
						children: String(t + 1).padStart(2, "0")
					}), /* @__PURE__ */ T("div", {
						className: "bfd__audit-body",
						children: [/* @__PURE__ */ w("div", {
							className: "bfd__audit-claim",
							children: z(e, 90)
						}), n[t] && /* @__PURE__ */ w("div", {
							className: "bfd__audit-rating",
							children: V(n[t]) === null ? z(n[t], 70) : /* @__PURE__ */ T(C, { children: [Ae(V(n[t])), /* @__PURE__ */ w("span", {
								className: "bfd__audit-rating-label",
								children: n[t].split("—")[0].trim()
							})] })
						})]
					})]
				}, t))
			}),
			r && /* @__PURE__ */ T("div", {
				className: "bfd__audit-conclusion",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__audit-conclusion-label",
					children: "Audit Conclusion"
				}), /* @__PURE__ */ w("p", { children: z(r, 200) })]
			}),
			t.length === 0 && !r && /* @__PURE__ */ w("span", {
				className: "bfd__field-empty",
				children: "—"
			})
		]
	});
}
function Fe({ fieldData: e }) {
	let n = [
		{
			label: "Before",
			content: e.beforeState,
			cls: "bfd__arc-step--before"
		},
		{
			label: "Transformation",
			content: e.transformation,
			cls: "bfd__arc-step--mid"
		},
		{
			label: "After",
			content: e.afterState,
			cls: "bfd__arc-step--after"
		}
	];
	return /* @__PURE__ */ w("div", {
		className: "bfd__arc",
		children: n.map((e, r) => /* @__PURE__ */ T(t, { children: [/* @__PURE__ */ T("div", {
			className: `bfd__arc-step ${e.cls}`,
			children: [/* @__PURE__ */ w("div", {
				className: "bfd__arc-step-label",
				children: e.label
			}), /* @__PURE__ */ w("div", {
				className: "bfd__arc-step-content",
				children: e.content ? z(e.content, 150) : /* @__PURE__ */ w("span", {
					className: "bfd__field-empty",
					children: "—"
				})
			})]
		}), r < n.length - 1 && /* @__PURE__ */ w("div", {
			className: "bfd__arc-connector",
			children: "↓"
		})] }, r))
	});
}
function q({ fieldData: e }) {
	let t = [
		1,
		2,
		3,
		4,
		5,
		6
	].map((t) => ({
		n: t,
		text: e[`contentAngle${t}`]
	})).filter((e) => e.text);
	return t.length === 0 ? /* @__PURE__ */ w("span", {
		className: "bfd__field-empty",
		children: "—"
	}) : /* @__PURE__ */ w("div", {
		className: "bfd__content-grid",
		children: t.map(({ n: e, text: t }) => /* @__PURE__ */ T("div", {
			className: "bfd__content-angle",
			children: [/* @__PURE__ */ T("div", {
				className: "bfd__content-angle-num",
				children: ["Angle ", e]
			}), /* @__PURE__ */ w("div", {
				className: "bfd__content-angle-text",
				children: z(t, 100)
			})]
		}, e))
	});
}
function J({ verdict: e, color: t, basisLabel: n, basisContent: r }) {
	return /* @__PURE__ */ T("div", {
		className: "bfd__verdict-wrap",
		children: [
			/* @__PURE__ */ T("div", {
				className: "bfd__verdict-badge",
				style: {
					color: t,
					borderColor: t,
					background: `color-mix(in srgb, ${t} 10%, transparent)`
				},
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__verdict-badge-label",
					children: "Status"
				}), /* @__PURE__ */ w("div", {
					className: "bfd__verdict-badge-value",
					children: e
				})]
			}),
			r && /* @__PURE__ */ T("div", {
				className: "bfd__verdict-basis",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__verdict-basis-label",
					children: n || "Basis"
				}), /* @__PURE__ */ w("p", {
					className: "bfd__verdict-basis-text",
					children: z(r, 200)
				})]
			}),
			!r && /* @__PURE__ */ w("span", {
				className: "bfd__verdict-empty",
				children: "No basis recorded."
			})
		]
	});
}
function Y({ steps: e, subItems: t, exitNote: n, exitLabel: r }) {
	return e.length === 0 ? /* @__PURE__ */ w("span", {
		className: "bfd__field-empty",
		children: "—"
	}) : /* @__PURE__ */ T("div", {
		className: "bfd__timeline",
		children: [e.map((n, r) => /* @__PURE__ */ T("div", {
			className: "bfd__timeline-step",
			children: [/* @__PURE__ */ T("div", {
				className: "bfd__timeline-marker",
				children: [/* @__PURE__ */ w("span", { className: "bfd__timeline-dot" }), r < e.length - 1 && /* @__PURE__ */ w("span", { className: "bfd__timeline-line" })]
			}), /* @__PURE__ */ T("div", {
				className: "bfd__timeline-body",
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__timeline-touch",
					children: t?.[r] ?? `Step ${r + 1}`
				}), /* @__PURE__ */ w("span", {
					className: "bfd__timeline-text",
					children: z(n, 110)
				})]
			})]
		}, r)), n && /* @__PURE__ */ T("div", {
			className: "bfd__timeline-exit",
			children: [/* @__PURE__ */ w("div", {
				className: "bfd__timeline-exit-label",
				children: r || "Exit / Definition"
			}), /* @__PURE__ */ w("p", { children: z(n, 130) })]
		})]
	});
}
function Ie({ fieldData: e }) {
	let t = [
		"HOT",
		"WARM",
		"COLD"
	], n = R(e.criteriaDefinitions).slice(0, 3), r = R(e.treeSteps).slice(0, 5);
	return /* @__PURE__ */ T("div", {
		className: "bfd__segment-wrap",
		children: [n.length > 0 ? /* @__PURE__ */ w("div", {
			className: "bfd__segment-list",
			children: n.map((e, n) => /* @__PURE__ */ T("div", {
				className: `bfd__segment bfd__segment--${(t[n] || "cold").toLowerCase()}`,
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__segment-badge",
					children: t[n] || `SEG ${n + 1}`
				}), /* @__PURE__ */ w("span", {
					className: "bfd__segment-text",
					children: z(e, 100)
				})]
			}, n))
		}) : /* @__PURE__ */ w("span", {
			className: "bfd__field-empty",
			children: "No criteria defined."
		}), r.length > 0 && /* @__PURE__ */ w("div", {
			className: "bfd__tree-steps",
			children: r.map((e, t) => /* @__PURE__ */ T("div", {
				className: "bfd__tree-step",
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__tree-arrow",
					children: "→"
				}), /* @__PURE__ */ w("span", { children: z(e, 90) })]
			}, t))
		})]
	});
}
function X({ metrics: e }) {
	return /* @__PURE__ */ w("div", {
		className: "bfd__metrics",
		children: e.map((e, t) => {
			let n = Math.min(100, Math.max(0, e.value / e.max * 100));
			return /* @__PURE__ */ T("div", {
				className: "bfd__metric",
				children: [/* @__PURE__ */ T("div", {
					className: "bfd__metric-head",
					children: [/* @__PURE__ */ w("span", {
						className: "bfd__metric-label",
						children: e.label
					}), /* @__PURE__ */ T("span", {
						className: "bfd__metric-value",
						children: [e.value ?? "—", e.unit || ""]
					})]
				}), /* @__PURE__ */ w("div", {
					className: "bfd__metric-track",
					children: /* @__PURE__ */ w("div", {
						className: "bfd__metric-fill",
						style: {
							width: `${n}%`,
							background: n >= 75 ? "var(--col-done)" : n >= 40 ? "var(--pri-high)" : "var(--pri-urgent)"
						}
					})
				})]
			}, t);
		})
	});
}
function Le({ included: e, excluded: t, footer: n, footerLabel: r }) {
	return /* @__PURE__ */ T("div", {
		className: "bfd__scope",
		children: [/* @__PURE__ */ T("div", {
			className: "bfd__scope-cols",
			children: [/* @__PURE__ */ T("div", {
				className: "bfd__scope-col bfd__scope-col--in",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__scope-head",
					children: "✓ Included"
				}), /* @__PURE__ */ w("p", {
					className: "bfd__scope-body",
					children: e ? z(e, 200) : "—"
				})]
			}), /* @__PURE__ */ T("div", {
				className: "bfd__scope-col bfd__scope-col--out",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__scope-head",
					children: "✗ Excluded"
				}), /* @__PURE__ */ w("p", {
					className: "bfd__scope-body",
					children: t ? z(t, 200) : "—"
				})]
			})]
		}), n && /* @__PURE__ */ T("div", {
			className: "bfd__scope-footer",
			children: [/* @__PURE__ */ w("span", {
				className: "bfd__scope-footer-label",
				children: r || "Note"
			}), /* @__PURE__ */ w("span", { children: z(n, 160) })]
		})]
	});
}
function Z({ left: e, right: t, footer: n, footerLabel: r }) {
	return /* @__PURE__ */ T("div", {
		className: "bfd__dual",
		children: [/* @__PURE__ */ T("div", {
			className: "bfd__dual-cols",
			children: [/* @__PURE__ */ T("div", {
				className: "bfd__dual-col",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__dual-head",
					children: e.label
				}), /* @__PURE__ */ w("p", {
					className: "bfd__dual-body",
					children: e.content ? z(e.content, 220) : "—"
				})]
			}), /* @__PURE__ */ T("div", {
				className: "bfd__dual-col",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__dual-head",
					children: t.label
				}), /* @__PURE__ */ w("p", {
					className: "bfd__dual-body",
					children: t.content ? z(t.content, 220) : "—"
				})]
			})]
		}), n && /* @__PURE__ */ T("div", {
			className: "bfd__dual-footer",
			children: [/* @__PURE__ */ w("span", {
				className: "bfd__dual-footer-label",
				children: r || "Note"
			}), /* @__PURE__ */ w("span", { children: z(n, 160) })]
		})]
	});
}
function Q({ steps: e }) {
	return /* @__PURE__ */ w("div", {
		className: "bfd__steps",
		children: e.map((e, t) => /* @__PURE__ */ T("div", {
			className: "bfd__step",
			children: [/* @__PURE__ */ w("div", {
				className: "bfd__step-marker",
				children: t + 1
			}), /* @__PURE__ */ T("div", {
				className: "bfd__step-content",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__step-label",
					children: e.label
				}), e.content ? /* @__PURE__ */ w("p", {
					className: "bfd__step-body",
					children: z(e.content, 180)
				}) : /* @__PURE__ */ w("span", {
					className: "bfd__field-empty",
					children: "—"
				})]
			})]
		}, t))
	});
}
var Re = {
	"CRD-AF1": ({ fieldData: e }) => /* @__PURE__ */ w(Me, { fieldData: e }),
	"CRD-AF2": ({ fieldData: e }) => /* @__PURE__ */ w(W, { fieldData: e }),
	"CRD-AF3": ({ fieldData: e }) => {
		let t = R(e.topCandidateRanking).map((e) => e.replace(/^\d+[.)]\s*/, "").trim());
		return /* @__PURE__ */ w(G, { quadrants: [
			{
				label: "High Revenue · High Ease",
				content: t.slice(0, 2).join("\n") || null,
				accent: !0
			},
			{
				label: "High Revenue · Low Ease",
				content: t[2] || null
			},
			{
				label: "Low Revenue · High Ease",
				content: t[3] || null
			},
			{
				label: "Low Revenue · Low Ease",
				content: t[4] || null
			}
		] });
	},
	"CRD-AF5": ({ fieldData: e }) => /* @__PURE__ */ w(Pe, { fieldData: e }),
	"CRD-V1": ({ fieldData: e }) => /* @__PURE__ */ w(K, {
		checks: [
			{
				label: "Gate A — Regulatory Clearance",
				value: e.gateARegulatory
			},
			{
				label: "Gate B — Addressable Market Fit",
				value: e.gateBMarketFit
			},
			{
				label: "Gate C — Competence Proof",
				value: e.gateCCompetenceProof
			},
			{
				label: "Gate D — Proven Demand",
				value: e.gateDProvenDemand
			}
		],
		overallValue: e.overallViability,
		overallLabel: {
			viable: "VIABLE",
			conditionallyViable: "CONDITIONAL",
			removed: "REMOVED"
		}[e.overallViability]
	}),
	"STR-AF2": ({ fieldData: e }) => /* @__PURE__ */ w(Fe, { fieldData: e }),
	"STR-AF4": ({ fieldData: e }) => /* @__PURE__ */ w(q, { fieldData: e }),
	"STR-V1": ({ fieldData: e }) => {
		let t = {
			pass: "CLEARED",
			conditionalPass: "CONDITIONAL",
			fail: "BLOCKED"
		}[e.integrityVerdict] || "PENDING";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				CLEARED: "var(--col-done)",
				CONDITIONAL: "var(--pri-high)",
				BLOCKED: "var(--pri-urgent)",
				PENDING: "var(--text3)"
			}[t],
			basisLabel: "Integrity Assessment",
			basisContent: e.integrityAssessment
		});
	},
	"OFR-A2": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Demographic Profile",
			content: e.demographicProfile ? z(e.demographicProfile, 130) : null
		},
		{
			label: "Psychographic Profile",
			content: e.psychographicProfile ? z(e.psychographicProfile, 130) : null
		},
		{
			label: "Qualifies When",
			content: e.qualificationCriteria ? z(e.qualificationCriteria, 130) : null,
			accent: !0
		},
		{
			label: "Disqualified When",
			content: e.disqualificationCriteria ? z(e.disqualificationCriteria, 130) : null
		}
	] }),
	"OUT-A4": ({ fieldData: e }) => {
		let t = R(e.sequenceMap).slice(0, 8);
		return /* @__PURE__ */ w(Y, {
			steps: t,
			subItems: t.map((e, t) => `Touch ${t + 1}`),
			exitNote: e.exitCriteria,
			exitLabel: "Exit Criteria"
		});
	},
	"OUT-IC": ({ fieldData: e }) => /* @__PURE__ */ w(K, { checks: [
		{
			label: "Audience Concern Mapping",
			value: e.icOut1
		},
		{
			label: "G-Label Compliance",
			value: e.icOut2
		},
		{
			label: "Singular CTA",
			value: e.icOut3
		},
		{
			label: "Scarcity Verified",
			value: e.icOut4
		},
		{
			label: "Readability Check",
			value: e.icOut5
		}
	] }),
	"SLS-A3": ({ fieldData: e }) => /* @__PURE__ */ w(Ie, { fieldData: e }),
	"IDY-S4": ({ fieldData: e }) => {
		let t = {
			proceed: "PROCEED",
			incomplete: "INCOMPLETE",
			reject: "REJECT"
		}[e.routingDecision] || "PENDING";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				PROCEED: "var(--col-done)",
				INCOMPLETE: "var(--pri-high)",
				REJECT: "var(--pri-urgent)",
				PENDING: "var(--text3)"
			}[t],
			basisLabel: "Routing Basis",
			basisContent: e.routingBasis
		});
	},
	"DEL-S3": ({ fieldData: e }) => {
		let t = R(e.milestoneList).slice(0, 5);
		return /* @__PURE__ */ w(Y, {
			steps: t,
			subItems: t.map((e, t) => `Milestone ${t + 1}`),
			exitNote: e.successDefinition,
			exitLabel: "Success Definition"
		});
	},
	"IDY-S3": ({ fieldData: e }) => {
		let t = {
			none: "NO GAPS",
			minor: "MINOR",
			major: "MAJOR",
			disqualifying: "DISQUALIFYING"
		}[e.gapSeverity] || "PENDING";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				"NO GAPS": "var(--col-done)",
				MINOR: "var(--pri-high)",
				MAJOR: "var(--pri-urgent)",
				DISQUALIFYING: "var(--pri-urgent)",
				PENDING: "var(--text3)"
			}[t],
			basisLabel: "Resolution Actions",
			basisContent: e.resolutionActions
		});
	},
	"CRD-S3": ({ fieldData: e }) => {
		let t = {
			strong: "STRONG",
			moderate: "MODERATE",
			weak: "WEAK",
			insufficient: "INSUFFICIENT"
		}[e.overallProofStrength] || "PENDING";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				STRONG: "var(--col-done)",
				MODERATE: "var(--pri-high)",
				WEAK: "var(--pri-urgent)",
				INSUFFICIENT: "var(--pri-urgent)",
				PENDING: "var(--text3)"
			}[t],
			basisLabel: "Reliability Assessment",
			basisContent: e.reliabilityAssessment
		});
	},
	"CRD-S6": ({ fieldData: e }) => {
		let t = {
			clear: "CLEAR",
			pending: "PENDING",
			hardStop: "HARD STOP"
		}[e.regulatoryStatus] || "UNSET";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				CLEAR: "var(--col-done)",
				PENDING: "var(--pri-high)",
				"HARD STOP": "var(--pri-urgent)",
				UNSET: "var(--text3)"
			}[t],
			basisLabel: "Operational Standards",
			basisContent: e.operationalStandards
		});
	},
	"OFR-A1": ({ fieldData: e }) => {
		let t = e.promiseGLabel || "UNSET";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				G1: "var(--col-done)",
				G2: "var(--pri-high)",
				UNSET: "var(--text3)"
			}[t],
			basisLabel: "Promise Statement",
			basisContent: e.promiseStatement
		});
	},
	"SLS-A0": ({ fieldData: e }) => {
		let t = {
			complete: "COMPLETE",
			partial: "PARTIAL",
			blocked: "BLOCKED"
		}[e.assemblyStatus] || "PENDING";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				COMPLETE: "var(--col-done)",
				PARTIAL: "var(--pri-high)",
				BLOCKED: "var(--pri-urgent)",
				PENDING: "var(--text3)"
			}[t],
			basisLabel: "NO-SHIP List",
			basisContent: e.noShipList
		});
	},
	"CRD-FP02": ({ fieldData: e }) => {
		let t = (e) => e === "yes" ? "pass" : e === "no" ? "fail" : void 0, n = (e) => e === "no" ? "pass" : e === "yes" ? "fail" : void 0;
		return /* @__PURE__ */ w(K, {
			checks: [
				{
					label: "Q1 — Verifiable proof",
					value: t(e.q1ProofVerifiable)
				},
				{
					label: "Q2 — Regulatory verifiable",
					value: t(e.q2RegulatoryVerifiable)
				},
				{
					label: "Q3 ★ Unverifiable claims",
					value: n(e.q3UnverifiableClaims)
				},
				{
					label: "Q4 — Runway sufficient",
					value: t(e.q4RunwaySufficient)
				},
				{
					label: "Q5 ★ Regulatory misuse",
					value: n(e.q5RegulatoryMisuse)
				},
				{
					label: "Q6 — Goal alignment",
					value: t(e.q6GoalAlignment)
				},
				{
					label: "Q7 — Energy aversion",
					value: t(e.q7EnergyAversion)
				},
				{
					label: "Q8 ★ False information",
					value: n(e.q8FalseInformation)
				},
				{
					label: "Q9 — Scope understanding",
					value: t(e.q9ScopeUnderstanding)
				},
				{
					label: "Q10 — Capacity realistic",
					value: t(e.q10CapacityRealistic)
				}
			],
			overallValue: {
				proceed: "pass",
				escalate: "conditional",
				reject: "fail"
			}[e.rubricRouting],
			overallLabel: e.rubricRouting ? e.rubricRouting.toUpperCase() : void 0
		});
	},
	"OFR-A6": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Trigger Condition",
			content: e.triggerCondition ? z(e.triggerCondition, 130) : null,
			accent: !0
		},
		{
			label: "Guarantee Scope",
			content: e.guaranteeScope ? z(e.guaranteeScope, 130) : null
		},
		{
			label: "Remedy",
			content: e.remedy ? z(e.remedy, 130) : null
		},
		{
			label: "Operator Boundaries",
			content: e.operatorBoundaries ? z(e.operatorBoundaries, 130) : null
		}
	] }),
	"DEL-S2": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Failure Modes",
			content: e.failureModes ? z(e.failureModes, 130) : null,
			accent: !0
		},
		{
			label: "QC Checks",
			content: e.qcChecks ? z(e.qcChecks, 130) : null
		},
		{
			label: "Guarantee Triggers",
			content: e.guaranteeTriggers ? z(e.guaranteeTriggers, 130) : null
		},
		{
			label: "Mitigation Steps",
			content: e.mitigationSteps ? z(e.mitigationSteps, 130) : null
		}
	] }),
	"RET-S1": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Cold Lead",
			content: e.coldLeadDef ? z(e.coldLeadDef, 130) : null
		},
		{
			label: "Past Client",
			content: e.pastClientDef ? z(e.pastClientDef, 130) : null,
			accent: !0
		},
		{
			label: "Re-Activation (60d)",
			content: e.reActivationDef ? z(e.reActivationDef, 130) : null
		},
		{
			label: "Warm Non-Convert",
			content: e.warmNonConvertDef ? z(e.warmNonConvertDef, 130) : null
		}
	] }),
	"DEL-S1": ({ fieldData: e }) => {
		let t = R(e.deliveryPhases).slice(0, 6);
		return /* @__PURE__ */ w(Y, {
			steps: t,
			subItems: t.map((e, t) => `Phase ${t + 1}`),
			exitNote: e.timingConstraints,
			exitLabel: "Timing"
		});
	},
	"DEL-S4": ({ fieldData: e }) => {
		let t = R(e.proofTypes).slice(0, 5);
		return /* @__PURE__ */ w(Y, {
			steps: t,
			subItems: t.map((e, t) => `Proof ${t + 1}`),
			exitNote: e.captureTimeline,
			exitLabel: "Capture Timeline"
		});
	},
	"OFR-A4": ({ fieldData: e }) => /* @__PURE__ */ w(Le, {
		included: e.scopeIncluded,
		excluded: e.scopeExcluded,
		footer: e.changeOrderTriggers,
		footerLabel: "Change-Order Triggers"
	}),
	"OPT-S1": ({ fieldData: e }) => /* @__PURE__ */ w(X, { metrics: [
		{
			label: "CM-1 Outreach Conversion",
			value: Number(e.cm1OutreachConversion) || 0,
			max: 100,
			unit: "%"
		},
		{
			label: "CM-2 Fit-to-Close",
			value: Number(e.cm2FitToClose) || 0,
			max: 100,
			unit: "%"
		},
		{
			label: "CM-3 Milestone Completion",
			value: Number(e.cm3MilestoneCompletion) || 0,
			max: 100,
			unit: "%"
		},
		{
			label: "CM-4 Unprompted Referral",
			value: Number(e.cm4UnpromptedReferral) || 0,
			max: 100,
			unit: "%"
		}
	] }),
	"OPT-A1": ({ fieldData: e }) => /* @__PURE__ */ w(X, { metrics: [
		{
			label: "System Vitality",
			value: Number(e.systemVitality) || 0,
			max: 10
		},
		{
			label: "Ethical Integrity",
			value: Number(e.ethicalIntegrity) || 0,
			max: 10
		},
		{
			label: "Time Sovereignty",
			value: Number(e.timeSovereignty) || 0,
			max: 10
		},
		{
			label: "Trust vs. Scarcity",
			value: Number(e.trustVsScarcity) || 0,
			max: 10
		},
		{
			label: "Asset Clarity",
			value: Number(e.assetClarity) || 0,
			max: 10
		}
	] }),
	"OUT-S4": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Common Objections",
			content: e.commonObjections
		},
		right: {
			label: "Response Framework",
			content: e.objectionResponses
		}
	}),
	"OUT-A5": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Appointment Setter",
			content: e.appointmentSetterScript
		},
		right: {
			label: "No-Fit Script",
			content: e.noFitScript
		},
		footer: e.noFitRedirectOptions,
		footerLabel: "Redirect Options"
	}),
	"OUT-A6": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Objection Matrix",
			content: e.objectionMatrix
		},
		right: {
			label: "Response Guidelines",
			content: e.responseGuidelines
		}
	}),
	"SLS-A5": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Objection Library (Top 10)",
			content: e.objections
		},
		right: {
			label: "Proof Asset References",
			content: e.proofAssetReferences
		}
	}),
	"SLS-S5": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Nurture Messages (3-5)",
			content: e.nurtureMessages
		},
		right: {
			label: "Proof Asset Mapping",
			content: e.proofAssetMapping
		}
	}),
	"SLS-S3": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Call Structure (15 min)",
			content: e.callStructure
		},
		{
			label: "Verbatim Script Blocks",
			content: e.verbatimScript
		},
		{
			label: "Branch Prompts (Hot/Warm/Cold)",
			content: e.branchPrompts
		}
	] }),
	"SLS-S6": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "24-Hour Reminder",
			content: e.reminder24hr
		},
		{
			label: "1-Hour Reminder",
			content: e.reminder1hr
		},
		{
			label: "No-Show Follow-Up",
			content: e.noShowFollowUp
		}
	] }),
	"SLS-S7": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Follow-Up Sequence (7-14 days)",
			content: e.followUpSequence
		},
		{
			label: "Stop Triggers",
			content: e.stopTriggers
		},
		{
			label: "Graceful Close",
			content: e.gracefulClose
		}
	] }),
	"SLS-A4": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Minute-by-Minute (0-15)",
			content: e.minuteByMinute
		},
		{
			label: "Verbatim Script Blocks",
			content: e.verbatimBlocks
		},
		{
			label: "Branch Prompts (Hot/Warm/Cold)",
			content: e.branchPromptsAsset
		}
	] }),
	"SLS-A6": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Pre-Call Nurture (3-5 Messages)",
			content: e.preCallNurture
		},
		{
			label: "Show-Rate Reminders",
			content: e.showRateReminders
		},
		{
			label: "Post-Call Follow-Up (7-14 Days)",
			content: e.postCallFollowUp
		},
		{
			label: "Stop & Escalation",
			content: e.stopAndEscalation
		}
	] }),
	"OUT-A7": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Content Assets",
			content: e.contentAssets
		},
		{
			label: "Pipeline Sequence",
			content: e.pipelineSequence
		},
		{
			label: "Conversion Path",
			content: e.conversionPath
		}
	] }),
	"OUT-A2": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Hooks by Platform",
			content: e.hooksByPlatform
		},
		right: {
			label: "Hooks by Persona",
			content: e.hooksByPersona
		},
		footer: e.hookComplianceNotes,
		footerLabel: "Compliance Notes"
	}),
	"OUT-A3": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Initial Connection Messages",
			content: e.initialMessages
		},
		{
			label: "Value Frames",
			content: e.valueFrames
		},
		{
			label: "Scope Map Alignment Check",
			content: e.scopeAlignment
		}
	] }),
	"OUT-S1": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Primary Outreach Channels",
			content: e.primaryChannels
		},
		{
			label: "Secondary Channels",
			content: e.secondaryChannels
		},
		{
			label: "Selection Rationale",
			content: e.channelRationale
		}
	] }),
	"OUT-S2": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Lead Sources",
			content: e.leadSources
		},
		{
			label: "Segment Definitions",
			content: e.segmentDefinitions
		},
		{
			label: "Qualification Filters",
			content: e.qualificationFilters
		}
	] }),
	"OUT-S3": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Language Patterns",
			content: e.languagePatterns
		},
		{
			label: "Emotional Triggers",
			content: e.emotionalTriggers
		},
		{
			label: "Value Proposition Signals",
			content: e.valuePropositionSignals
		}
	] }),
	"OUT-S5": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Outreach Bandwidth",
			content: e.outreachBandwidth
		},
		{
			label: "Tool Proficiency",
			content: e.toolProficiency
		},
		{
			label: "Communication Constraints",
			content: e.communicationConstraints
		}
	] }),
	"OUT-A1": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Channel Strategy",
			content: e.channelStrategy
		},
		{
			label: "Ideal Prospect Profile (IPP)",
			content: e.idealProspectProfile
		},
		{
			label: "Qualification Filters",
			content: e.qualificationFiltersAsset
		}
	] }),
	"SLS-S0": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Lead States",
			content: e.leadStates
		},
		{
			label: "Qualification Criteria Draft",
			content: e.qualificationCriteriaDraft
		},
		{
			label: "Objections Seed List",
			content: e.objectionsSeedList
		},
		{
			label: "Nurture Proof Assets",
			content: e.nurtureProofAssets
		}
	] }),
	"SLS-S1": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Qualification Questions (8-10)",
			content: e.qualificationQuestions
		},
		{
			label: "Automatic Disqualifiers (3)",
			content: e.autoDisqualifiers
		},
		{
			label: "Scoring & Routing Notes",
			content: e.scoringRoutingNotes
		}
	] }),
	"SLS-S2": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Routing Table",
			content: e.routingTable
		},
		{
			label: "Decision Tree Steps",
			content: e.decisionTreeSteps
		},
		{
			label: "No-Fit Exit Path",
			content: e.noFitExitPath
		},
		{
			label: "Waitlist / Education Path",
			content: e.waitlistPath
		}
	] }),
	"SLS-S4": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Top 10 Objections",
			content: e.objectionList
		},
		{
			label: "Best Responses",
			content: e.bestResponses
		},
		{
			label: "Next Question to Ask",
			content: e.nextQuestions
		}
	] }),
	"SLS-A1": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Form Introduction",
			content: e.formIntro
		},
		{
			label: "Questions (Q1-Q10)",
			content: e.questions
		},
		{
			label: "Auto-Disqualifiers (3)",
			content: e.autoDisqualifiersTemplate
		},
		{
			label: "Scoring & Routing Logic",
			content: e.scoringRouting
		},
		{
			label: "Next-Step Messages (Hot/Warm/Cold)",
			content: e.nextStepMessages
		}
	] }),
	"SLS-A2": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Flow Triggers",
			content: e.triggers
		},
		{
			label: "Flow Map (Step-by-Step)",
			content: e.flowMap
		},
		{
			label: "Branching Rules (Hot/Warm/Cold)",
			content: e.branchingRules
		},
		{
			label: "Tags & Fields to Write",
			content: e.tagsAndFields
		},
		{
			label: "Notifications & Handoff Rules",
			content: e.notificationRules
		}
	] }),
	"DEL-S5": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Handoff Notes to RET",
			content: e.handoffNotes
		},
		{
			label: "Retention Seed Message",
			content: e.retentionSeedMessage
		},
		{
			label: "Next Steps",
			content: e.nextSteps
		}
	] }),
	"DEL-A1": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Payment → Work-Start Steps",
			content: e.paymentToStartSteps
		},
		{
			label: "Communication Triggers",
			content: e.communicationTriggers
		},
		{
			label: "Owner / Role",
			content: e.ownerRole
		}
	] }),
	"DEL-A2": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Client Constraints",
			content: e.clientConstraints ? z(e.clientConstraints, 130) : null
		},
		{
			label: "Access Requirements",
			content: e.accessRequirements ? z(e.accessRequirements, 130) : null
		},
		{
			label: "Client Preferences",
			content: e.preferences ? z(e.preferences, 130) : null
		},
		{
			label: "Success Definition",
			content: e.clientSuccessDefinition ? z(e.clientSuccessDefinition, 130) : null,
			accent: !0
		}
	] }),
	"DEL-A3": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Execution Steps",
			content: e.sopSteps
		},
		{
			label: "Templates & Scripts",
			content: e.templates
		},
		{
			label: "Edge Cases & Notes",
			content: e.edgeCases
		}
	] }),
	"DEL-A4": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "QC Checklist Items",
			content: e.qcItems ? z(e.qcItems, 130) : null,
			accent: !0
		},
		{
			label: "Guarantee Alignment",
			content: e.guaranteeAlignment ? z(e.guaranteeAlignment, 130) : null
		},
		{
			label: "IC-OFR Checks",
			content: e.icOfrChecks ? z(e.icOfrChecks, 130) : null
		},
		{
			label: "IC-DEL Checks",
			content: e.icDelChecks ? z(e.icDelChecks, 130) : null
		}
	] }),
	"DEL-A5": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Milestone Message Templates",
			content: e.milestoneTemplates
		},
		right: {
			label: "Delivery Schedule",
			content: e.deliverySchedule
		}
	}),
	"DEL-A6": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Capture Protocol Steps",
			content: e.protocolSteps
		},
		{
			label: "Consent Template",
			content: e.consentTemplate
		},
		{
			label: "Case Study Data Template",
			content: e.caseStudyTemplate
		}
	] }),
	"DEL-A7": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Close Communication",
			content: e.closeCommunication
		},
		{
			label: "Retention Seed Message",
			content: e.retentionSeed
		},
		{
			label: "RET Stage Handoff",
			content: e.retHandoff
		}
	] }),
	"RET-S2": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Proof Assets List",
			content: e.proofAssets
		},
		right: {
			label: "Segment Relevance Tags",
			content: e.segmentRelevance
		},
		footer: e.claimStrength,
		footerLabel: "Claim Strength / G-Label"
	}),
	"RET-S3": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Upsell Path",
			content: e.upsellPath ? z(e.upsellPath, 130) : null,
			accent: !0
		},
		{
			label: "Ascension Levels",
			content: e.ascensionLevels ? z(e.ascensionLevels, 130) : null
		},
		{
			label: "Eligibility Rules",
			content: e.eligibilityRules ? z(e.eligibilityRules, 130) : null
		},
		{
			label: "Trigger Timing",
			content: e.triggerTiming ? z(e.triggerTiming, 130) : null
		}
	] }),
	"RET-S4": ({ fieldData: e }) => /* @__PURE__ */ w(G, { quadrants: [
		{
			label: "Warming Posture",
			content: e.warmingPosture ? z(e.warmingPosture, 130) : null
		},
		{
			label: "Non-Pushy Constraints",
			content: e.toneConstraints ? z(e.toneConstraints, 130) : null
		},
		{
			label: "CTA Standards",
			content: e.ctaStandards ? z(e.ctaStandards, 130) : null,
			accent: !0
		},
		{
			label: "Message Spines",
			content: e.messageSpines ? z(e.messageSpines, 130) : null
		}
	] }),
	"RET-S5": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Proof → Sequence Mapping",
			content: e.proofToSequenceMap
		},
		right: {
			label: "Channel Assumptions",
			content: e.channelAssumptions
		},
		footer: e.channelVariations,
		footerLabel: "Required Variations"
	}),
	"RET-A1": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Touch 1",
			content: e.touch1
		},
		{
			label: "Touch 2",
			content: e.touch2
		},
		{
			label: "Touch 3",
			content: e.touch3
		},
		{
			label: "Touch 4",
			content: e.touch4
		},
		{
			label: "Touch 5 (with CTA)",
			content: e.touch5WithCta
		}
	] }),
	"RET-A2": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Touch 1 — Value Forward",
			content: e.nurtureTouch1
		},
		{
			label: "Touch 2 — Continued Value",
			content: e.nurtureTouch2
		},
		{
			label: "Touch 3 — Upsell Seed",
			content: e.nurtureTouch3
		}
	] }),
	"RET-A3": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Campaign Cadence",
			content: e.campaignCadence
		},
		{
			label: "Message Objectives",
			content: e.messageObjectives
		},
		{
			label: "Proof Inserts (1-2)",
			content: e.proofInserts
		}
	] }),
	"RET-A4": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Next Offer Framing",
			content: e.nextOfferFraming
		},
		{
			label: "Eligibility Rules",
			content: e.eligibility
		},
		{
			label: "\"Why Now\" Logic",
			content: e.whyNowLogic
		}
	] }),
	"RET-A5": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Value Levels",
			content: e.valueLevels
		},
		{
			label: "Progression Triggers",
			content: e.progressionTriggers
		},
		{
			label: "Level Eligibility",
			content: e.levelEligibility
		}
	] }),
	"RET-A6": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Deployment Map Table",
			content: e.deploymentTable
		},
		{
			label: "Claim Labelling",
			content: e.claimLabelling
		},
		{
			label: "Consent Status per Asset",
			content: e.consentStatus
		}
	] }),
	"OPT-S3": ({ fieldData: e }) => /* @__PURE__ */ w(Z, {
		left: {
			label: "Root Cause Hypotheses",
			content: e.hypotheses
		},
		right: {
			label: "Risks & Side Effects",
			content: e.risksAndSideEffects
		}
	}),
	"OPT-S4": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Action 1",
			content: e.action1
		},
		{
			label: "Action 2",
			content: e.action2
		},
		{
			label: "Action 3",
			content: e.action3
		}
	] }),
	"OPT-S5": ({ fieldData: e }) => {
		let t = {
			yes: "BELOW 7.0",
			no: "ABOVE 7.0"
		}[e.g72Check] || "UNSET";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				"BELOW 7.0": "var(--pri-urgent)",
				"ABOVE 7.0": "var(--col-done)",
				UNSET: "var(--text3)"
			}[t],
			basisLabel: "Hold List",
			basisContent: e.holdItems
		});
	},
	"OPT-S6": ({ fieldData: e }) => /* @__PURE__ */ w(Q, { steps: [
		{
			label: "Test Hypothesis",
			content: e.testHypothesis
		},
		{
			label: "Scope & Duration",
			content: e.testScope
		},
		{
			label: "Success Metrics",
			content: e.successMetrics
		},
		{
			label: "Stop Conditions",
			content: e.stopConditions
		},
		{
			label: "Rollback Plan",
			content: e.rollbackPlan
		}
	] }),
	"OPT-S7": ({ fieldData: e }) => /* @__PURE__ */ w(X, { metrics: [
		{
			label: "TV-1 Work Sustainability",
			value: Number(e.tv1WorkSustainability) || 0,
			max: 10
		},
		{
			label: "TV-2 Clarity of Purpose",
			value: Number(e.tv2ClarityOfPurpose) || 0,
			max: 10
		},
		{
			label: "TV-3 Integrity Comfort",
			value: Number(e.tv3IntegrityComfort) || 0,
			max: 10
		},
		{
			label: "TVS Overall",
			value: Number(e.tvsOverall) || 0,
			max: 10
		}
	] }),
	"OPT-A2": ({ fieldData: e }) => /* @__PURE__ */ w(X, { metrics: [
		{
			label: "BHI-1 Referral Rate",
			value: Number(e.bhi1ReferralRate) || 0,
			max: 100,
			unit: "%"
		},
		{
			label: "BHI-2 Energy Rating",
			value: Number(e.bhi2EnergyRating) || 0,
			max: 10
		},
		{
			label: "BHI-3 Right-Fit Ratio",
			value: Number(e.bhi3RightFitRatio) || 0,
			max: 100,
			unit: "%"
		},
		{
			label: "BHI-4 Decision Clarity",
			value: Number(e.bhi4DecisionClarity) || 0,
			max: 100,
			unit: "%"
		}
	] }),
	"OPT-A5": ({ fieldData: e }) => {
		let t = {
			complete: "COMPLETE",
			partial: "PARTIAL",
			blocked: "BLOCKED"
		}[e.packCompleteness] || "PENDING";
		return /* @__PURE__ */ w(J, {
			verdict: t,
			color: {
				COMPLETE: "var(--col-done)",
				PARTIAL: "var(--pri-high)",
				BLOCKED: "var(--pri-urgent)",
				PENDING: "var(--text3)"
			}[t],
			basisLabel: "NO-SHIP Items",
			basisContent: e.missingItems
		});
	}
};
function ze({ def: e, fieldData: t }) {
	return /* @__PURE__ */ w("div", {
		className: "bfd__default-fields",
		children: e.fields.map((e) => {
			let n = t?.[e.id], r = !n || String(n).trim() === "", i;
			return i = r ? /* @__PURE__ */ w("span", {
				className: "bfd__field-empty",
				children: "—"
			}) : e.type === "select" ? /* @__PURE__ */ w("span", {
				className: "bfd__field-value",
				children: Ce(e, n)
			}) : e.type === "textarea" ? /* @__PURE__ */ w("p", {
				className: "bfd__field-textarea",
				children: n
			}) : /* @__PURE__ */ w("span", {
				className: "bfd__field-value",
				children: n
			}), /* @__PURE__ */ T("div", {
				className: "bfd__field",
				children: [/* @__PURE__ */ w("div", {
					className: "bfd__field-label",
					children: e.label
				}), i]
			}, e.id);
		})
	});
}
function Be({ def: e, task: t, index: n, onSelectTask: r, span: i, doneColumnId: a, viewOnly: o, accessLevel: s, renderTaskCard: c, renderGLabelBadge: l }) {
	let u = t?.bbosFieldData || {}, { filled: d, total: f } = we(e, t ? u : null), p = Re[e.id], m = t ? e.fields.every((e) => {
		let t = u[e.id];
		return !t || String(t).trim() === "";
	}) : !0, h = t && !m, g = t && a && t.columnId === a || t && t.completedAt ? "complete" : !t || m ? "empty" : "active", _ = l ? ({ gLabel: e }) => l({ gLabel: e }) : I, v = [
		{
			label: e.id,
			className: "dtc__chip dtc__chip--id"
		},
		...t ? [{
			label: `${d}/${f}`,
			className: `dtc__chip dtc__chip--complete ${d === f && f > 0 ? "dtc__chip--complete-full" : ""}`
		}] : [],
		...e.hasGLabel && t?.gLabel ? [{
			label: /* @__PURE__ */ w(_, {
				gLabel: t.gLabel,
				size: "sm"
			}),
			className: "dtc__chip dtc__chip--glabel-badge"
		}] : e.hasGLabel ? [{
			label: "G",
			className: "dtc__chip dtc__chip--glabel"
		}] : [],
		...s === "V" ? [{
			label: "View",
			className: "dtc__chip dtc__chip--access-view"
		}] : [],
		...s === "E" ? [{
			label: "Edit",
			className: "dtc__chip dtc__chip--access-edit"
		}] : []
	], ee = {
		taskId: t?.id,
		index: n - 1,
		title: e.label,
		span: i,
		status: g,
		onSelectTask: t && !o ? r : void 0,
		chips: v,
		fieldProgress: t ? {
			filled: d,
			total: f
		} : void 0,
		purpose: h && e.purpose ? z(e.purpose, 110) : void 0
	}, y = h ? p ? /* @__PURE__ */ w(p, { fieldData: u }) : /* @__PURE__ */ w(ze, {
		def: e,
		fieldData: u
	}) : null;
	return c ? c({
		cardProps: ee,
		def: e,
		task: t,
		fieldsFilled: d,
		fieldsTotal: f,
		body: y
	}) : /* @__PURE__ */ w(L, {
		...ee,
		children: y
	});
}
function Ve(e) {
	let t = e.bbosFieldData || {};
	return Object.entries(t).some(([e, t]) => !e.startsWith("_") && (typeof t == "string" ? t.trim() : !!t));
}
function He({ tasks: e, doneColumnId: t }) {
	let n = e.length, r = e.filter(Ve), i = r.length, a = e.filter((e) => e.completedAt || e.columnId === t).length, o = n > 0 ? Math.round(a / n * 100) : 0, s = r.filter((e) => !e.dueDate && !e.completedAt).length, c = 0, l = 0;
	for (let t of e) t.subtasks && t.subtasks.length > 0 && (c += t.subtasks.length, l += t.subtasks.filter((e) => e.done).length);
	let u = c > 0 ? Math.round(l / c * 100) : 0, d = [
		{
			label: "Task Coverage",
			sub: i > 10 ? "Comprehensive" : i > 3 ? "Building" : i > 0 ? "Started" : "Not Started",
			score: i > 10 ? 3 : i > 3 ? 2 : 1
		},
		{
			label: "Completion Rate",
			sub: o > 50 ? "Strong Progress" : o > 0 ? "In Progress" : "Not Started",
			score: o >= 80 ? 3 : o >= 50 ? 2 : 1
		},
		{
			label: "Scheduling Discipline",
			sub: i === 0 ? "Not Started" : s === 0 ? "Well Dated" : "Dates Needed",
			score: i === 0 ? 1 : s === 0 ? 3 : s < i * .3 ? 2 : 1
		},
		{
			label: "Subtask Depth",
			sub: c > 0 ? `${u}% Complete` : "Not Used",
			score: u >= 80 ? 3 : u >= 50 ? 2 : 1
		}
	], f = d.length > 0 ? d.reduce((e, t) => e + t.score, 0) / d.length : 0, p = f >= 2.5 ? "STRONG" : f >= 2 ? "QUALIFIED" : f >= 1.5 ? "DEVELOPING" : "NEEDS WORK", m = Math.round(f / 3 * 100);
	return /* @__PURE__ */ T("div", {
		className: "bfd__pa",
		style: { gridColumn: "1 / -1" },
		children: [/* @__PURE__ */ T("div", {
			className: "bfd__pa-left",
			children: [/* @__PURE__ */ T("div", {
				className: "bfd__card-head",
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__card-num",
					children: /* @__PURE__ */ w(ae, {
						size: 14,
						fill: "currentColor"
					})
				}), /* @__PURE__ */ w("span", {
					className: "bfd__card-label",
					children: "Project Audit"
				})]
			}), /* @__PURE__ */ T("div", {
				className: "bfd__pa-verdict-box",
				children: [
					/* @__PURE__ */ w("div", {
						className: "bfd__pa-verdict-label",
						children: "Audit Conclusion"
					}),
					/* @__PURE__ */ w("div", {
						className: "bfd__pa-verdict-value",
						children: p
					}),
					/* @__PURE__ */ T("div", {
						className: "bfd__pa-verdict-sub",
						children: [
							"Health Threshold: ",
							m,
							"% Met"
						]
					})
				]
			})]
		}), /* @__PURE__ */ T("div", {
			className: "bfd__pa-right",
			children: [/* @__PURE__ */ w("div", {
				className: "bfd__pa-title",
				children: "Audited Metrics"
			}), /* @__PURE__ */ w("div", {
				className: "bfd__pa-grid",
				children: d.map((e, t) => /* @__PURE__ */ T("div", {
					className: "bfd__pa-item",
					children: [/* @__PURE__ */ T("div", {
						className: "bfd__pa-item-info",
						children: [/* @__PURE__ */ w("span", {
							className: "bfd__pa-item-name",
							children: e.label
						}), /* @__PURE__ */ w("span", {
							className: "bfd__pa-item-sub",
							children: e.sub
						})]
					}), Ae(e.score)]
				}, t))
			})]
		})]
	});
}
function Ue({ bbosFilter: e, taskMap: t }) {
	let n = U[e];
	if (!n) return null;
	let r = n.map((e) => {
		let n = t[e.taskId]?.bbosFieldData || {};
		return {
			label: e.label,
			pts: e.score(n)
		};
	}), i = r.reduce((e, t) => e + t.pts, 0), a = n.length * 5, o = Math.round(i / a * 100), s = o >= 75 ? "QUALIFIED" : o >= 50 ? "DEVELOPING" : o >= 25 ? "REVIEW NEEDED" : "BLOCKED", c = {
		QUALIFIED: "var(--col-done)",
		DEVELOPING: "var(--pri-high)",
		"REVIEW NEEDED": "var(--pri-urgent)",
		BLOCKED: "var(--pri-urgent)"
	}[s];
	return /* @__PURE__ */ T("div", {
		className: "bfd__ssc",
		style: { gridColumn: "1 / -1" },
		children: [/* @__PURE__ */ T("div", {
			className: "bfd__ssc-left",
			children: [/* @__PURE__ */ T("div", {
				className: "bfd__card-head",
				children: [/* @__PURE__ */ w("span", {
					className: "bfd__card-num",
					children: /* @__PURE__ */ w(h, { size: 14 })
				}), /* @__PURE__ */ w("span", {
					className: "bfd__card-label",
					children: "Stage Health Score"
				})]
			}), /* @__PURE__ */ T("div", {
				className: "bfd__ssc-verdict-box",
				children: [
					/* @__PURE__ */ w("div", {
						className: "bfd__ssc-verdict-label",
						children: "Stage Verdict"
					}),
					/* @__PURE__ */ w("div", {
						className: "bfd__ssc-verdict-value",
						style: { color: c },
						children: s
					}),
					/* @__PURE__ */ T("div", {
						className: "bfd__ssc-verdict-sub",
						children: [
							o,
							"% · ",
							i,
							"/",
							a,
							" pts"
						]
					})
				]
			})]
		}), /* @__PURE__ */ T("div", {
			className: "bfd__ssc-right",
			children: [/* @__PURE__ */ w("div", {
				className: "bfd__ssc-title",
				children: "Weighted Signals"
			}), /* @__PURE__ */ w("div", {
				className: "bfd__ssc-grid",
				children: r.map((e, t) => /* @__PURE__ */ T("div", {
					className: "bfd__ssc-signal",
					children: [/* @__PURE__ */ w("div", {
						className: "bfd__ssc-signal-info",
						children: /* @__PURE__ */ w("span", {
							className: "bfd__ssc-signal-label",
							children: e.label
						})
					}), Ae(e.pts, 5)]
				}, t))
			})]
		})]
	});
}
var We = [];
function Ge({ project: e, tasks: n, bbosFilter: r, onSelectTask: c, onStageAdvance: l, onRejectStage: u, onUnrejectStage: d, renderTaskCard: f, renderGLabelBadge: p }) {
	let m = n || We, g = e.bbosRole || "all", [_, v] = s("research"), ee = (e) => v(e), [y, te] = s(null), b = o(_), ie = o(null), ae = o(!1);
	i(() => {
		b.current !== _ && (ae.current = !0, te(b.current), b.current = _, clearTimeout(ie.current), ie.current = setTimeout(() => te(null), 320));
	}, [_]);
	let { stageMeta: x, taskGroups: S, taskMap: oe, globalIdxMap: se, stageTasks: ce, doneColumnId: E, allDefs: le, totalCount: D, stagePct: de } = a(() => {
		let t = me(r) || {
			label: r,
			description: "",
			attributes: "",
			order: 0
		}, n = ue(r), i = !g || g === "all" ? n : n.filter((e) => F(g, e.id) !== "-"), a = {}, o = [];
		for (let e of m) e.bbosTaskType && (a[e.bbosTaskType] = e, e.bbosTaskType.startsWith(r + "-") && o.push(e));
		let s = [], c = null;
		for (let e of i) {
			let t = B(e.subLevel);
			(!c || c.prefix !== t) && (c = {
				prefix: t,
				label: Te[t] || "Additional Tasks",
				defs: []
			}, s.push(c)), c.defs.push(e);
		}
		let l = {}, u = 0;
		for (let e of s) for (let t of e.defs) u++, l[t.id] = u;
		let d = e.columns?.find((e) => e.name === "Done")?.id ?? null, f = n.filter((e) => {
			let t = a[e.id];
			return t && (t.columnId === d || t.completedAt);
		}).length, p = n.length;
		return {
			stageMeta: t,
			taskGroups: s,
			taskMap: a,
			globalIdxMap: l,
			stageTasks: o,
			doneColumnId: d,
			allDefs: n,
			doneCount: f,
			totalCount: p,
			stagePct: p > 0 ? Math.round(f / p * 100) : 0
		};
	}, [
		m,
		e,
		r,
		g
	]), fe = je[r] || "", O = k[(x.order ?? 0) + 1] ?? null, j = !!e.rejectedAt, M = j ? pe(e.rejectionReason) : null, he = g === "all" || F(g, "CRD-V1") === "O", ge = r === "CRD" && !j && he && !!u, [_e, N] = s(!1), [P, ve] = s(A[0]?.id || "");
	return /* @__PURE__ */ T("div", {
		className: "bfd",
		children: [
			j && /* @__PURE__ */ T("div", {
				className: "bfd__rejection-banner",
				role: "alert",
				children: [
					/* @__PURE__ */ w(re, {
						size: 20,
						className: "bfd__rejection-icon"
					}),
					/* @__PURE__ */ T("div", {
						className: "bfd__rejection-body",
						children: [
							/* @__PURE__ */ w("div", {
								className: "bfd__rejection-title",
								children: "Pipeline rejected at Amanah Proof Audit"
							}),
							/* @__PURE__ */ T("div", {
								className: "bfd__rejection-reason",
								children: [M?.label || "Unspecified reason", M?.description && /* @__PURE__ */ T(C, { children: [" — ", M.description] })]
							}),
							/* @__PURE__ */ T("div", {
								className: "bfd__rejection-meta",
								children: [e.rejectedAt && /* @__PURE__ */ T(C, { children: ["Rejected ", new Date(e.rejectedAt).toLocaleDateString()] }), e.rejectedBy && /* @__PURE__ */ T(C, { children: [" · by ", e.rejectedBy] })]
							})
						]
					}),
					he && /* @__PURE__ */ T("button", {
						className: "bfd__rejection-resume",
						onClick: () => {
							typeof window < "u" && !window.confirm("Resume this BBOS pipeline? The rejection record will be cleared and stages will unlock.") || d?.(e.id);
						},
						type: "button",
						"aria-label": "Resume pipeline",
						children: [/* @__PURE__ */ w(ne, { size: 14 }), " Resume"]
					})
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "bfd__header",
				children: [
					/* @__PURE__ */ T("p", {
						className: "bfd__desc",
						children: [x.description, x.attributes && /* @__PURE__ */ T(C, { children: [" ", /* @__PURE__ */ w("em", { children: x.attributes })] })]
					}),
					ge && /* @__PURE__ */ T("button", {
						className: "bfd__reject-btn",
						onClick: () => N(!0),
						type: "button",
						children: [/* @__PURE__ */ w(re, { size: 14 }), " Reject pipeline"]
					}),
					!j && de === 100 && l && /* @__PURE__ */ T("div", {
						className: "bfd__stage-ready",
						children: [
							/* @__PURE__ */ w(h, {
								size: 16,
								className: "bfd__stage-ready-icon"
							}),
							/* @__PURE__ */ T("span", {
								className: "bfd__stage-ready-text",
								children: [
									"Stage complete — ",
									D,
									"/",
									D,
									" tasks done"
								]
							}),
							/* @__PURE__ */ T("button", {
								className: "bfd__stage-advance-btn",
								onClick: l,
								children: [O ? `Advance to ${O.label}` : "Complete Cycle", " →"]
							})
						]
					})
				]
			}),
			_e && /* @__PURE__ */ w("div", {
				className: "bfd__modal-overlay",
				onClick: () => N(!1),
				children: /* @__PURE__ */ T("div", {
					className: "bfd__modal",
					onClick: (e) => e.stopPropagation(),
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Reject BBOS pipeline",
					children: [
						/* @__PURE__ */ T("div", {
							className: "bfd__modal-head",
							children: [/* @__PURE__ */ w(re, { size: 18 }), /* @__PURE__ */ w("span", { children: "Reject BBOS pipeline" })]
						}),
						/* @__PURE__ */ w("p", {
							className: "bfd__modal-desc",
							children: "Mark this pipeline as rejected at the Amanah Proof Audit. Stage advancement will be locked. You can resume the pipeline later if circumstances change."
						}),
						/* @__PURE__ */ w("div", {
							className: "bfd__modal-options",
							role: "radiogroup",
							"aria-label": "Rejection reason",
							children: A.map((e) => /* @__PURE__ */ T("label", {
								className: `bfd__modal-option${P === e.id ? " bfd__modal-option--active" : ""}`,
								children: [
									/* @__PURE__ */ w("input", {
										type: "radio",
										name: "bfd-reject-reason",
										value: e.id,
										checked: P === e.id,
										onChange: () => ve(e.id)
									}),
									/* @__PURE__ */ w("span", {
										className: "bfd__modal-option-label",
										children: e.label
									}),
									/* @__PURE__ */ w("span", {
										className: "bfd__modal-option-desc",
										children: e.description
									})
								]
							}, e.id))
						}),
						/* @__PURE__ */ T("div", {
							className: "bfd__modal-actions",
							children: [/* @__PURE__ */ w("button", {
								className: "bfd__modal-cancel",
								type: "button",
								onClick: () => N(!1),
								children: "Cancel"
							}), /* @__PURE__ */ w("button", {
								className: "bfd__modal-confirm",
								type: "button",
								onClick: () => {
									P && (u?.(e.id, P, e.bbosRole || null), N(!1));
								},
								disabled: !P,
								children: "Confirm rejection"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ w("div", {
				className: "bfd__grid",
				children: g !== "all" && le.length > 0 && S.length === 0 ? /* @__PURE__ */ w(Se, {
					bbosRole: g,
					bbosFilter: r
				}) : /* @__PURE__ */ T(C, { children: [
					(() => {
						let e = S.filter((e) => Oe(e.prefix) === "research"), n = S.filter((e) => Oe(e.prefix) === "asset"), r = e.flatMap((e) => e.defs), i = E && r.length > 0 && r.every((e) => {
							let t = oe[e.id];
							return t && t.columnId === E;
						}), a = r.length === 0 || i || !E, o = (e, n) => {
							let r = ke(e.prefix, e.defs);
							return /* @__PURE__ */ T(t, { children: [/* @__PURE__ */ T("div", {
								className: "bfd__divider",
								children: [/* @__PURE__ */ w("span", {
									className: "bfd__divider-label",
									children: e.label
								}), /* @__PURE__ */ T("span", {
									className: "bfd__divider-count",
									children: [
										e.defs.length,
										" task",
										e.defs.length === 1 ? "" : "s"
									]
								})]
							}), e.defs.map((e, t) => /* @__PURE__ */ w(Be, {
								def: e,
								task: oe[e.id],
								index: se[e.id],
								onSelectTask: c,
								span: r[t],
								doneColumnId: E,
								viewOnly: n || g !== "all" && F(g, e.id) === "V",
								accessLevel: g === "all" ? null : F(g, e.id),
								renderTaskCard: f,
								renderGLabelBadge: p
							}, e.id))] }, e.prefix);
						}, s = e.length > 0 && n.length > 0;
						return /* @__PURE__ */ T(C, { children: [s && /* @__PURE__ */ w("div", {
							className: "bfd__factory-tabs",
							children: (_ === "research" ? ["research", "asset"] : ["asset", "research"]).map((e) => /* @__PURE__ */ T("button", {
								className: `bfd__factory-tab${_ === e ? " bfd__factory-tab--active" : ""}`,
								onClick: () => ee(e),
								children: [
									e === "research" ? "Groundwork" : "Workshop",
									/* @__PURE__ */ w("span", {
										className: "bfd__factory-tab-count",
										children: e === "research" ? r.length : n.flatMap((e) => e.defs).length
									}),
									e === "asset" && !a && /* @__PURE__ */ w("span", {
										className: "bfd__factory-tab-lock",
										children: "🔒"
									})
								]
							}, e))
						}), (() => {
							let t = (t) => (s ? t === "research" : e.length > 0) ? /* @__PURE__ */ w("div", {
								className: "bfd__factory bfd__factory--research",
								children: e.map((e) => o(e, !1))
							}) : (s ? t === "asset" : n.length > 0 && e.length === 0) ? /* @__PURE__ */ T(C, { children: [a ? /* @__PURE__ */ T("div", {
								className: "bfd__assembly-gate bfd__assembly-gate--cleared",
								children: [/* @__PURE__ */ w("span", {
									className: "bfd__assembly-gate-icon",
									children: "✅"
								}), /* @__PURE__ */ w("span", {
									className: "bfd__assembly-gate-text",
									children: "Assembly Gate: CLEARED"
								})]
							}) : /* @__PURE__ */ T("div", {
								className: "bfd__assembly-gate bfd__assembly-gate--locked",
								children: [/* @__PURE__ */ w("span", {
									className: "bfd__assembly-gate-icon",
									children: "⏳"
								}), /* @__PURE__ */ w("span", {
									className: "bfd__assembly-gate-text",
									children: "Assembly Gate: LOCKED — complete Research tasks first"
								})]
							}), /* @__PURE__ */ w("div", {
								className: `bfd__factory bfd__factory--asset${a ? "" : " bfd__factory--locked"}`,
								children: n.map((e) => o(e, !a))
							})] }) : null;
							return /* @__PURE__ */ T("div", {
								className: "bfd__factory-content",
								children: [y && y !== _ && /* @__PURE__ */ w("div", {
									className: "bfd__factory-content__layer bfd__factory-content__layer--out",
									children: t(y)
								}, y), /* @__PURE__ */ w("div", {
									className: `bfd__factory-content__layer${ae.current ? " bfd__factory-content__layer--in" : ""}`,
									children: t(_)
								}, _)]
							});
						})()] });
					})(),
					/* @__PURE__ */ w(Ue, {
						bbosFilter: r,
						taskMap: oe
					}),
					/* @__PURE__ */ w(He, {
						tasks: ce,
						doneColumnId: E
					})
				] })
			}),
			/* @__PURE__ */ T("div", {
				className: "bfd__footer",
				children: [fe && /* @__PURE__ */ w("p", {
					className: "bfd__footer-quote",
					children: fe
				}), /* @__PURE__ */ T("p", {
					className: "bfd__footer-meta",
					children: [
						"BBOS Strategy Engine · Stage ",
						String((x.order ?? 0) + 1).padStart(2, "0"),
						" ",
						r,
						" · ",
						e.name
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/data/bbos/bbos-stage-islamic.js
var Ke = {
	IDY: {
		attrs: [{
			name: "Al-Awwal",
			name_ar: "الأوّل",
			title: "The First",
			body: "Al-Awwal precedes all creation. Every business begins not with your decision but with His permission. Founding a venture in His name anchors it to the only source that cannot be taken away."
		}, {
			name: "Al-Badi",
			name_ar: "البديع",
			title: "The Originator",
			body: "Al-Badi creates without precedent. Your foundation need not copy what already exists — it is an invitation for Him to originate something new through your effort and surrender."
		}],
		dua: {
			title: "Before Establishing the Foundation",
			resumeTitle: "Before Returning to Foundation Work",
			arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
			trans: "Rabbi ashraḥ lī ṣadrī wa yassir lī amrī",
			meaning: "My Lord, expand for me my breast and ease for me my task.",
			source: "Surah Ta-Ha 20:25–26"
		},
		readiness: {
			frame: "Al-Awwal asks: does this foundation begin with His name or my ambition?",
			yesLabel: "This foundation begins with His name when",
			notYetLabel: "This foundation begins with my ambition when",
			rows: [
				{
					id: "A1",
					attr: "Al-Awwal",
					attr_ar: "الأوّل",
					attrTitle: "The First",
					attrFrame: "Is this beginning His or mine?",
					yesLabel: "This beginning is His when",
					notYetLabel: "This beginning is still mine when",
					governing: "My niyyah (intention) for this business is clear, halal, and stated before Allah.",
					notYet: "I have not yet articulated why I am building this — the foundation is on assumption."
				},
				{
					id: "A2",
					attr: "Al-Awwal",
					governing: "The mission and values I am establishing would survive scrutiny before Allah.",
					notYet: "The stated values and the actual plan are not yet aligned."
				},
				{
					id: "B1",
					attr: "Al-Badi",
					attr_ar: "البديع",
					attrTitle: "The Originator",
					attrFrame: "Am I building something genuinely new, or imitating without purpose?",
					yesLabel: "I'm building something new when",
					notYetLabel: "I am imitating without purpose when",
					governing: "I have identified what is distinctive about this venture and can articulate it clearly.",
					notYet: "The offering is a copy of existing work without original purpose or differentiation."
				},
				{
					id: "B2",
					attr: "Al-Badi",
					governing: "I am open to Al-Badi reshaping the foundation as I build — not rigidly attached to my original design.",
					notYet: "I am too attached to my initial vision to allow it to be refined."
				}
			],
			governing: [
				"My niyyah for this business is clear, halal, and stated before Allah.",
				"The mission and values I am establishing would survive scrutiny before Allah.",
				"I have identified what is distinctive about this venture and can articulate it clearly.",
				"I am open to Al-Badi reshaping the foundation as I build."
			],
			notYet: [
				"I have not yet articulated why I am building this — the foundation is on assumption.",
				"The stated values and the actual plan are not yet aligned.",
				"The offering is a copy of existing work without original purpose or differentiation.",
				"I am too attached to my initial vision to allow it to be refined."
			]
		},
		reflection: {
			frame: "Al-Badi originated this work through me. Al-Awwal gave it a beginning.",
			yesLabel: "Originality and intention were present when",
			notYetLabel: "The work was mechanical when",
			governing: ["The foundation I established today is something I would not be ashamed to present to Allah.", "Something emerged in this work that surprised me — a sign that Al-Badi was active."],
			notYet: ["The work today was mechanical rather than intentional.", "I built on assumption rather than on verified foundation."]
		}
	},
	CRD: {
		attrs: [{
			name: "Al-Mu'min",
			name_ar: "المؤمن",
			title: "The Giver of Security",
			body: "Al-Mu'min establishes security through truth. Trust in a business is not manufactured — it is earned by consistent truthfulness, authenticated claims, and promises kept. Build your credibility as an act of worship."
		}, {
			name: "Al-Wakil",
			name_ar: "الوكيل",
			title: "The Trustee",
			body: "Al-Wakil holds the outcomes. You are responsible for the truth you put into the world; He is responsible for what grows from it. Make every claim honest, then trust the Trustee with the result."
		}],
		dua: {
			title: "Before Building Trust and Credibility",
			resumeTitle: "Before Returning to Truth Work",
			arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَتَّقُوا اللَّهَ يَجْعَل لَّكُمْ فُرْقَانًا وَيُكَفِّرْ عَنكُمْ سَيِّئَاتِكُمْ وَيَغْفِرْ لَكُمْ ۗ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ",
			trans: "Yā ayyuhā alladhīna āmanū in tattaqū Allāha yajʿal lakum furqānā wa yukaffir ʿankum sayyiʾātikum wa yaghfir lakum, wa Allāhu dhū al-faḍli al-ʿaẓīm",
			meaning: "O you who have believed, if you fear Allah, He will grant you a criterion and will remove from you your misdeeds and forgive you. And Allah is the possessor of great bounty.",
			source: "Surah Al-Anfal 8:29"
		},
		readiness: {
			frame: "Al-Mu'min asks: is every claim I am making today verifiable and true?",
			yesLabel: "My claims are verifiable and true when",
			notYetLabel: "My claims fall short of truth when",
			rows: [
				{
					id: "M1",
					attr: "Al-Mu'min",
					attr_ar: "المؤمن",
					attrTitle: "The Giver of Security",
					attrFrame: "Can everything I am publishing be authenticated?",
					yesLabel: "Everything I publish is authenticated when",
					notYetLabel: "My claims are not yet substantiated when",
					governing: "Every claim, testimonial, and credential I am presenting can be independently verified.",
					notYet: "Some of what I am presenting is aspirational rather than substantiated."
				},
				{
					id: "M2",
					attr: "Al-Mu'min",
					governing: "I have not exaggerated results or omitted relevant limitations.",
					notYet: "I am shaping the truth to look better than it is — this is gharar."
				},
				{
					id: "W1",
					attr: "Al-Wakil",
					attr_ar: "الوكيل",
					attrTitle: "The Trustee",
					attrFrame: "Am I at peace with Allah knowing the full truth of what I am presenting?",
					yesLabel: "I am at peace with the truth when",
					notYetLabel: "I am adjusting the truth when",
					governing: "I have released attachment to how the market receives my truth.",
					notYet: "I am adjusting the truth to manage perception — trusting my spin more than Al-Wakil."
				},
				{
					id: "W2",
					attr: "Al-Wakil",
					governing: "My amanah (trustworthiness) is more important to me than any short-term conversion.",
					notYet: "I am tempted to overstate in order to close faster."
				}
			],
			governing: [
				"Every claim, testimonial, and credential I am presenting can be independently verified.",
				"I have not exaggerated results or omitted relevant limitations.",
				"I have released attachment to how the market receives my truth.",
				"My amanah is more important to me than any short-term conversion."
			],
			notYet: [
				"Some of what I am presenting is aspirational rather than substantiated.",
				"I am shaping the truth to look better than it is — this is gharar.",
				"I am adjusting the truth to manage perception — trusting my spin more than Al-Wakil.",
				"I am tempted to overstate in order to close faster."
			]
		},
		reflection: {
			frame: "Al-Mu'min secured my reputation through truth. Al-Wakil held the outcomes.",
			yesLabel: "Truth and trust were present when",
			notYetLabel: "Truth was compromised when",
			governing: ["I can point to something today where I chose honesty over advantage.", "I trusted Al-Wakil with a result I could not control."],
			notYet: ["I compromised on a claim and told myself it was acceptable.", "I am still carrying anxiety about how my truth was received."]
		}
	},
	STR: {
		attrs: [{
			name: "Al-Musawwir",
			name_ar: "المصوّر",
			title: "The Fashioner of Forms",
			body: "Al-Musawwir gives shape to creation. Strategy is the act of fashioning form from possibility — defining how things will be arranged. Bring His precision to your operational design."
		}, {
			name: "Al-Mudabbir",
			name_ar: "المدبّر",
			title: "The Arranger",
			body: "Al-Mudabbir arranges all affairs with perfect wisdom. Your strategy is not a substitute for His planning — it is your faithful cooperation with the order He has made possible. Plan thoroughly, then release the arrangement to Him."
		}],
		dua: {
			title: "Before Strategic Planning",
			resumeTitle: "Before Returning to Strategy Work",
			arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
			trans: "Rabbanā lā tuzigh qulūbanā baʿda idh hadaytanā wa hab lanā min ladunka raḥmah, innaka anta al-Wahhāb",
			meaning: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
			source: "Surah Aal-Imran 3:8"
		},
		readiness: {
			frame: "Al-Musawwir asks: does the structure I am building reflect wisdom, or just urgency?",
			yesLabel: "The structure reflects wisdom when",
			notYetLabel: "The structure reflects urgency when",
			rows: [
				{
					id: "S1",
					attr: "Al-Musawwir",
					attr_ar: "المصوّر",
					attrTitle: "The Fashioner of Forms",
					attrFrame: "Is the structure I am designing genuinely purposeful?",
					yesLabel: "The structure is purposeful when",
					notYetLabel: "The structure is cosmetic when",
					governing: "The system or process I am designing serves real needs — not organizational aesthetics.",
					notYet: "I am building structure that looks organized but does not reduce actual friction."
				},
				{
					id: "S2",
					attr: "Al-Musawwir",
					governing: "The team architecture and roles reflect the actual work to be done, not titles desired.",
					notYet: "Roles are defined around people, not around what the business genuinely needs."
				},
				{
					id: "D1",
					attr: "Al-Mudabbir",
					attr_ar: "المدبّر",
					attrTitle: "The Arranger",
					attrFrame: "Have I made the plan, then handed the arrangement to Allah?",
					yesLabel: "I have planned and released when",
					notYetLabel: "I am still gripping the arrangement when",
					governing: "I have planned thoroughly and am at peace with what He will arrange from my plan.",
					notYet: "I am still gripping the outcomes of my strategy — not trusting Al-Mudabbir's arrangement."
				},
				{
					id: "D2",
					attr: "Al-Mudabbir",
					governing: "My strategy is simple enough that the team can execute without constant re-explanation.",
					notYet: "The strategy is complex because it has not yet been refined to its essential form."
				}
			],
			governing: [
				"The system or process I am designing serves real needs — not organizational aesthetics.",
				"The team architecture and roles reflect the actual work to be done, not titles desired.",
				"I have planned thoroughly and am at peace with what He will arrange from my plan.",
				"My strategy is simple enough that the team can execute without constant re-explanation."
			],
			notYet: [
				"I am building structure that looks organized but does not reduce actual friction.",
				"Roles are defined around people, not around what the business genuinely needs.",
				"I am still gripping the outcomes of my strategy — not trusting Al-Mudabbir's arrangement.",
				"The strategy is complex because it has not yet been refined to its essential form."
			]
		},
		reflection: {
			frame: "Al-Musawwir gave form to my planning. Al-Mudabbir held the arrangement.",
			yesLabel: "Wisdom and release were present when",
			notYetLabel: "Urgency or control remained when",
			governing: ["The strategy I worked on today is clearer and more executable than when I started.", "I released control of the outcome of at least one planning decision."],
			notYet: ["The planning session added complexity rather than clarity.", "I am still carrying the weight of how the strategy will land rather than trusting the Arranger."]
		}
	},
	OFR: {
		attrs: [{
			name: "Ar-Razzaq",
			name_ar: "الرزّاق",
			title: "The Provider",
			body: "All provision flows from Ar-Razzaq. Pricing your offering is an act of stewardship, not extraction — you name a price that reflects genuine value and trust that He will bring the right clients. Greed constricts; trust opens."
		}, {
			name: "Al-Karim",
			name_ar: "الكريم",
			title: "The Generous",
			body: "Al-Karim gives beyond what is deserved, with nobility. Build generosity into your offer — not as a loss-leader tactic, but as an expression of His character flowing through your work. Generosity in the offer is barakah in the business."
		}],
		dua: {
			title: "Before Defining and Pricing the Offering",
			resumeTitle: "Before Returning to Offering Work",
			arabic: "وَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا ۚ وَاتَّقُوا اللَّهَ الَّذِي أَنتُم بِهِ مُؤْمِنُونَ",
			trans: "Wa kulū mimmā razaqakumu Allāhu ḥalālan ṭayyibā, wa-ttaqū Allāha alladhī antum bihi muʾminūn",
			meaning: "And eat of what Allah has provided for you which is lawful and good. And fear Allah, in whom you are believers.",
			source: "Surah Al-Ma'idah 5:88"
		},
		readiness: {
			frame: "Ar-Razzaq asks: is this offer free from deception and driven by genuine value?",
			yesLabel: "The offer is driven by genuine value when",
			notYetLabel: "The offer contains deception when",
			rows: [
				{
					id: "R1",
					attr: "Ar-Razzaq",
					attr_ar: "الرزّاق",
					attrTitle: "The Provider",
					attrFrame: "Is the provision I am offering genuinely what the client needs?",
					yesLabel: "The provision is genuine when",
					notYetLabel: "The provision falls short when",
					governing: "The offer is priced based on the real value it delivers — not on what the market will bear through pressure.",
					notYet: "The pricing reflects extraction rather than fair exchange."
				},
				{
					id: "R2",
					attr: "Ar-Razzaq",
					governing: "There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.",
					notYet: "The offer contains undefined elements that the client cannot accurately evaluate."
				},
				{
					id: "K1",
					attr: "Al-Karim",
					attr_ar: "الكريم",
					attrTitle: "The Generous",
					attrFrame: "Is generosity built into this offer beyond the transactional minimum?",
					yesLabel: "Generosity is built in when",
					notYetLabel: "The offer is transactional when",
					governing: "There is genuine generosity in this offer — something given that was not required.",
					notYet: "The offer is designed to give the minimum required to close the deal."
				},
				{
					id: "K2",
					attr: "Al-Karim",
					governing: "The value the client receives exceeds what I have charged — I would be proud to show this to Allah.",
					notYet: "The price-to-value ratio advantages me disproportionately over the client."
				}
			],
			governing: [
				"The offer is priced based on the real value it delivers — not on what the market will bear through pressure.",
				"There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.",
				"There is genuine generosity in this offer — something given that was not required.",
				"The value the client receives exceeds what I have charged."
			],
			notYet: [
				"The pricing reflects extraction rather than fair exchange.",
				"The offer contains undefined elements that the client cannot accurately evaluate.",
				"The offer is designed to give the minimum required to close the deal.",
				"The price-to-value ratio advantages me disproportionately over the client."
			]
		},
		reflection: {
			frame: "Ar-Razzaq provided through the offer. Al-Karim expressed His generosity through mine.",
			yesLabel: "Value and generosity were present when",
			notYetLabel: "Extraction or ambiguity entered when",
			governing: ["The offer I worked on today is something I would be proud to present to Allah.", "I built in more generosity than was commercially necessary."],
			notYet: ["The offer was shaped more by competitive pressure than by genuine value.", "I did not make it as clear as it could be — ambiguity remains."]
		}
	},
	OUT: {
		attrs: [{
			name: "Al-Hadi",
			name_ar: "الهادي",
			title: "The Guide",
			body: "Al-Hadi guides whom He wills to the straight path. Ethical outreach is guidance, not manipulation — you put the right thing in front of the right people and trust Him with who responds. You are not engineering consent; you are extending an invitation."
		}, {
			name: "An-Nur",
			name_ar: "النور",
			title: "The Light",
			body: "An-Nur is the Light of the heavens and the earth. Your outreach carries His light when it illuminates a real problem and offers a genuine path forward — not when it uses darkness (fear, scarcity, pressure) to drive action."
		}],
		dua: {
			title: "Before Reaching Out",
			resumeTitle: "Before Resuming Outreach",
			arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
			trans: "Allāhumma ihdinī wa saddidnī",
			meaning: "O Allah, guide me and keep me on the right course.",
			source: "Sahih Muslim 2725"
		},
		readiness: {
			frame: "Al-Hadi asks: am I guiding, or am I manipulating?",
			yesLabel: "I am guiding when",
			notYetLabel: "I am manipulating when",
			rows: [
				{
					id: "H1",
					attr: "Al-Hadi",
					attr_ar: "الهادي",
					attrTitle: "The Guide",
					attrFrame: "Is my outreach guiding or engineering?",
					yesLabel: "My outreach is guiding when",
					notYetLabel: "My outreach is engineering when",
					governing: "The outreach message offers a genuine path forward — it does not exploit fear or scarcity.",
					notYet: "The message uses urgency, pressure, or scarcity tactics that are not genuinely true."
				},
				{
					id: "H2",
					attr: "Al-Hadi",
					governing: "I have identified the right people to reach — those who genuinely need what I offer.",
					notYet: "I am broadcasting broadly rather than serving specifically."
				},
				{
					id: "N1",
					attr: "An-Nur",
					attr_ar: "النور",
					attrTitle: "The Light",
					attrFrame: "Does my outreach illuminate or obscure?",
					yesLabel: "My outreach illuminates when",
					notYetLabel: "My outreach obscures when",
					governing: "The message is honest about what I offer and what it cannot do.",
					notYet: "The message is misleadingly positive — limitations are hidden."
				},
				{
					id: "N2",
					attr: "An-Nur",
					governing: "I am comfortable with Allah witnessing every message and interaction in this outreach.",
					notYet: "There are tactics in the outreach I would not want brought to account."
				}
			],
			governing: [
				"The outreach message offers a genuine path forward — it does not exploit fear or scarcity.",
				"I have identified the right people to reach — those who genuinely need what I offer.",
				"The message is honest about what I offer and what it cannot do.",
				"I am comfortable with Allah witnessing every message and interaction in this outreach."
			],
			notYet: [
				"The message uses urgency, pressure, or scarcity tactics that are not genuinely true.",
				"I am broadcasting broadly rather than serving specifically.",
				"The message is misleadingly positive — limitations are hidden.",
				"There are tactics in the outreach I would not want brought to account."
			]
		},
		reflection: {
			frame: "Al-Hadi guided through my outreach. An-Nur illuminated the path for those reached.",
			yesLabel: "Guidance and light were present when",
			notYetLabel: "Manipulation or darkness entered when",
			governing: ["The outreach I executed today was something I would be comfortable presenting to Allah.", "I chose honesty over persuasion at at least one point."],
			notYet: ["The messaging was shaped more by conversion goals than by genuine guidance.", "I used a tactic today I would not want on my account."]
		}
	},
	SLS: {
		attrs: [{
			name: "As-Sami",
			name_ar: "السميع",
			title: "The All-Hearing",
			body: "As-Sami hears every word spoken and every word left unsaid. Sales is not a performance — it is a conversation witnessed by the All-Hearing. Every claim, every promise, and every silence is on the record. Sell as though Allah is listening, because He is."
		}, {
			name: "Al-Basir",
			name_ar: "البصير",
			title: "The All-Seeing",
			body: "Al-Basir sees the full reality of the person in front of you — their need, their capacity, their situation. Consultative selling begins with genuine sight: seeing what the prospect actually needs, not what would benefit you most."
		}],
		dua: {
			title: "Before Sales Conversations",
			resumeTitle: "Before Resuming Sales Work",
			arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا ۝ يُصْلِحْ لَكُمْ أَعْمَالَكُمْ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ",
			trans: "Yā ayyuhā alladhīna āmanū ittaqū Allāha wa qūlū qawlan sadīdā. Yuṣliḥ lakum aʿmālakum wa yaghfir lakum dhunūbakum",
			meaning: "O you who have believed, fear Allah and speak words of appropriate justice. He will amend for you your deeds and forgive you your sins.",
			source: "Surah Al-Ahzab 33:70–71"
		},
		readiness: {
			frame: "As-Sami asks: am I entering this conversation to listen, or to perform?",
			yesLabel: "I am entering to listen when",
			notYetLabel: "I am entering to perform when",
			rows: [
				{
					id: "S1",
					attr: "As-Sami",
					attr_ar: "السميع",
					attrTitle: "The All-Hearing",
					attrFrame: "Am I genuinely listening or waiting to speak?",
					yesLabel: "I am genuinely listening when",
					notYetLabel: "I am waiting to speak when",
					governing: "I am entering this conversation with the intention to understand the prospect first.",
					notYet: "I am entering with a script rather than an open posture of listening."
				},
				{
					id: "S2",
					attr: "As-Sami",
					governing: "Every commitment I make in this conversation is one I can keep.",
					notYet: "I am tempted to promise things I am not sure I can deliver."
				},
				{
					id: "B1",
					attr: "Al-Basir",
					attr_ar: "البصير",
					attrTitle: "The All-Seeing",
					attrFrame: "Am I seeing their real need, or projecting my desired outcome?",
					yesLabel: "I am seeing their real need when",
					notYetLabel: "I am projecting my desired outcome when",
					governing: "I can clearly articulate the prospect's actual situation and whether my offer genuinely fits.",
					notYet: "I am trying to sell regardless of fit — the offer is not right for this person right now."
				},
				{
					id: "B2",
					attr: "Al-Basir",
					governing: "If this offer is not the right fit, I am willing to say so honestly.",
					notYet: "I am pushing toward a close even where there is doubt about fit."
				}
			],
			governing: [
				"I am entering this conversation with the intention to understand the prospect first.",
				"Every commitment I make in this conversation is one I can keep.",
				"I can clearly articulate the prospect's actual situation and whether my offer genuinely fits.",
				"If this offer is not the right fit, I am willing to say so honestly."
			],
			notYet: [
				"I am entering with a script rather than an open posture of listening.",
				"I am tempted to promise things I am not sure I can deliver.",
				"I am trying to sell regardless of fit — the offer is not right for this person right now.",
				"I am pushing toward a close even where there is doubt about fit."
			]
		},
		reflection: {
			frame: "As-Sami heard every word of my conversations. Al-Basir saw the reality beneath them.",
			yesLabel: "Listening and sight were present when",
			notYetLabel: "Performance or projection entered when",
			governing: ["I listened before speaking in at least one conversation today.", "I kept every promise made — or clarified a commitment before it became a breach."],
			notYet: ["A conversation today was more performance than service.", "I made a commitment I am not fully confident I can keep."]
		}
	},
	DEL: {
		attrs: [{
			name: "Al-Muhsin",
			name_ar: "المحسن",
			title: "The Excellence-Giver",
			body: "Al-Muhsin perfects rather than merely fulfils. Delivery with ihsan means exceeding the specification not for commercial advantage but because the work deserves to be done well. Every deliverable is an act of worship when it carries genuine excellence."
		}, {
			name: "Al-Latif",
			name_ar: "اللطيف",
			title: "The Subtle, The All-Aware",
			body: "Al-Latif attends to the finest details — the subtleties that others miss. In delivery, this means attending to what the client did not explicitly ask for but genuinely needs: the communication, the care, the quality of presence, the unspoken expectation."
		}],
		dua: {
			title: "Before Delivering Work",
			resumeTitle: "Before Resuming Delivery",
			arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
			trans: "Fa-dhkurūnī adhkurkum, wa-shkurū lī wa lā takfurūn",
			meaning: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
			source: "Surah Al-Baqarah 2:152"
		},
		readiness: {
			frame: "Al-Muhsin asks: am I bringing ihsan to this delivery, or just getting it done?",
			yesLabel: "I am bringing ihsan to this delivery when",
			notYetLabel: "I am just getting it done when",
			rows: [
				{
					id: "M1",
					attr: "Al-Muhsin",
					attr_ar: "المحسن",
					attrTitle: "The Excellence-Giver",
					attrFrame: "Am I delivering with ihsan or with adequacy?",
					yesLabel: "I am delivering with ihsan when",
					notYetLabel: "I am delivering with adequacy when",
					governing: "I am approaching this deliverable with the intention of excellence, not just completion.",
					notYet: "I am doing the minimum that will pass, not the most genuinely possible right now."
				},
				{
					id: "M2",
					attr: "Al-Muhsin",
					governing: "I would redo this if it fell short — from genuine care, not perfectionism.",
					notYet: "The work feels like an obligation to discharge rather than an act to offer."
				},
				{
					id: "L1",
					attr: "Al-Latif",
					attr_ar: "اللطيف",
					attrTitle: "The Subtle",
					attrFrame: "Am I attending to what was not said but genuinely needed?",
					yesLabel: "I am attending to the unspoken when",
					notYetLabel: "I am delivering only what was specified when",
					governing: "I have considered the unspoken expectations and subtle needs behind the explicit deliverable.",
					notYet: "I am delivering exactly what was specified without asking whether it is what was actually needed."
				},
				{
					id: "L2",
					attr: "Al-Latif",
					governing: "My communication quality during delivery matches my work quality.",
					notYet: "I am delivering good work but communicating poorly — the client cannot see what they are receiving."
				}
			],
			governing: [
				"I am approaching this deliverable with the intention of excellence, not just completion.",
				"I would redo this if it fell short — from genuine care, not perfectionism.",
				"I have considered the unspoken expectations and subtle needs behind the explicit deliverable.",
				"My communication quality during delivery matches my work quality."
			],
			notYet: [
				"I am doing the minimum that will pass, not the most genuinely possible right now.",
				"The work feels like an obligation to discharge rather than an act to offer.",
				"I am delivering exactly what was specified without asking whether it is what was actually needed.",
				"I am delivering good work but communicating poorly — the client cannot see what they are receiving."
			]
		},
		reflection: {
			frame: "Al-Muhsin witnessed the quality of my delivery. Al-Latif attended to the subtleties I brought.",
			yesLabel: "Ihsan and subtlety were present when",
			notYetLabel: "Adequacy or inattention entered when",
			governing: ["I can point to at least one place in the delivery today where I chose quality over speed.", "I attended to something the client did not ask for but genuinely needed."],
			notYet: ["I cut corners on something and justified it as efficiency.", "The communication around the delivery fell short of the work itself."]
		}
	},
	RET: {
		attrs: [{
			name: "Al-Wadud",
			name_ar: "الودود",
			title: "The Loving",
			body: "Al-Wadud loves with constancy — not conditional on performance. Client retention rooted in genuine care outlasts retention built on tactics. Love the client enough to tell them hard truths, to invest in their growth, to remember them when there is nothing to sell."
		}, {
			name: "Al-Hafiz",
			name_ar: "الحفيظ",
			title: "The Preserver",
			body: "Al-Hafiz preserves and protects what has been entrusted. Every client relationship is an amanah — a trust placed in your care. Retention is faithful stewardship of that trust: remembering, protecting, and nurturing what was built."
		}],
		dua: {
			title: "Before Client Retention and Relationship Work",
			resumeTitle: "Before Returning to Retention Work",
			arabic: "وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ",
			trans: "Wa allafa bayna qulūbihim. Law anfaqta mā fī al-arḍi jamīʿan mā allafta bayna qulūbihim wa lākinna Allāha allafa baynahum, innahu ʿazīzun ḥakīm",
			meaning: "And He brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together. Indeed, He is Exalted in Might and Wise.",
			source: "Surah Al-Anfal 8:63"
		},
		readiness: {
			frame: "Al-Wadud asks: is my care for this client genuine, or purely commercial?",
			yesLabel: "My care is genuine when",
			notYetLabel: "My care is purely commercial when",
			rows: [
				{
					id: "W1",
					attr: "Al-Wadud",
					attr_ar: "الودود",
					attrTitle: "The Loving",
					attrFrame: "Is my investment in this relationship genuine?",
					yesLabel: "My investment is genuine when",
					notYetLabel: "My investment is transactional when",
					governing: "My care for this client would persist even if they stopped paying — it is not purely transactional.",
					notYet: "My attention to this client is driven entirely by their commercial value."
				},
				{
					id: "W2",
					attr: "Al-Wadud",
					governing: "I am willing to tell this client hard truths that serve them even if it risks the relationship.",
					notYet: "I am managing the relationship rather than genuinely serving the client."
				},
				{
					id: "H1",
					attr: "Al-Hafiz",
					attr_ar: "الحفيظ",
					attrTitle: "The Preserver",
					attrFrame: "Am I faithfully preserving what was built with this client?",
					yesLabel: "I am faithfully preserving when",
					notYetLabel: "I am letting commitments erode when",
					governing: "I have kept track of what matters to this client and followed through on commitments made.",
					notYet: "Commitments made in the early relationship have not been systematically honored."
				},
				{
					id: "H2",
					attr: "Al-Hafiz",
					governing: "I am actively protecting this client's outcomes — not waiting for them to raise problems.",
					notYet: "I am reactive rather than proactive in preserving client value."
				}
			],
			governing: [
				"My care for this client would persist even if they stopped paying — it is not purely transactional.",
				"I am willing to tell this client hard truths that serve them even if it risks the relationship.",
				"I have kept track of what matters to this client and followed through on commitments made.",
				"I am actively protecting this client's outcomes — not waiting for them to raise problems."
			],
			notYet: [
				"My attention to this client is driven entirely by their commercial value.",
				"I am managing the relationship rather than genuinely serving the client.",
				"Commitments made in the early relationship have not been systematically honored.",
				"I am reactive rather than proactive in preserving client value."
			]
		},
		reflection: {
			frame: "Al-Wadud loved through my care. Al-Hafiz preserved what was built.",
			yesLabel: "Love and preservation were present when",
			notYetLabel: "Commerce or neglect entered when",
			governing: ["I invested in a client relationship today where there was nothing immediate to sell.", "I protected a client outcome without being asked."],
			notYet: ["My client interactions today were driven by commercial need, not genuine care.", "Something that was promised to a client earlier was not preserved or followed through."]
		}
	},
	OPT: {
		attrs: [{
			name: "Al-Hasib",
			name_ar: "الحسيب",
			title: "The Reckoner",
			body: "Al-Hasib keeps perfect account of every act. Optimization begins with honest reckoning — what worked, what did not, and why. Fudging the numbers or avoiding the hard truth delays the accountability that Al-Hasib has already completed."
		}, {
			name: "Al-Khabir",
			name_ar: "الخبير",
			title: "The All-Aware",
			body: "Al-Khabir is aware of the subtlest dynamics — the hidden causes, the lagging indicators, the patterns not yet visible. Review your outcomes not just with metrics but with wisdom: what did the results actually tell you, and what did you miss?"
		}],
		dua: {
			title: "Before Reviewing and Optimizing",
			resumeTitle: "Before Returning to Optimization Work",
			arabic: "قَدْ جَاءَكُم بَصَائِرُ مِن رَّبِّكُمْ ۖ فَمَنْ أَبْصَرَ فَلِنَفْسِهِ ۖ وَمَنْ عَمِيَ فَعَلَيْهَا",
			trans: "Qad jāʾakum baṣāʾiru min rabbikum, fa-man abṣara fa-li-nafsih, wa man ʿamiya fa-ʿalayhā",
			meaning: "There has come to you enlightenment from your Lord. So whoever will see does so for the benefit of his soul, and whoever is blind does harm against it.",
			source: "Surah Al-An'am 6:104"
		},
		readiness: {
			frame: "Al-Hasib asks: am I willing to reckon honestly — even where the numbers are uncomfortable?",
			yesLabel: "I am reckoning honestly when",
			notYetLabel: "I am reckoning selectively when",
			rows: [
				{
					id: "H1",
					attr: "Al-Hasib",
					attr_ar: "الحسيب",
					attrTitle: "The Reckoner",
					attrFrame: "Am I reckoning honestly or selectively?",
					yesLabel: "I am reckoning honestly when",
					notYetLabel: "I am reckoning selectively when",
					governing: "I am looking at the full picture — including what failed and what I do not understand yet.",
					notYet: "I am emphasizing favorable metrics and avoiding honest engagement with failures."
				},
				{
					id: "H2",
					attr: "Al-Hasib",
					governing: "The decisions I make from this review are based on what the data actually says, not what I hoped it would say.",
					notYet: "I am confirmation-biased — using the review to validate what I already believed."
				},
				{
					id: "K1",
					attr: "Al-Khabir",
					attr_ar: "الخبير",
					attrTitle: "The All-Aware",
					attrFrame: "Am I looking beneath the surface metrics?",
					yesLabel: "I am looking beneath the surface when",
					notYetLabel: "I am staying on the surface when",
					governing: "I am asking why results came in as they did — not just recording what happened.",
					notYet: "The review is superficial — capturing metrics without understanding causes."
				},
				{
					id: "K2",
					attr: "Al-Khabir",
					governing: "I have identified at least one insight in this cycle that surprised me — evidence that Al-Khabir revealed something.",
					notYet: "The review confirmed everything I already knew — no genuine learning emerged."
				}
			],
			governing: [
				"I am looking at the full picture — including what failed and what I do not understand yet.",
				"The decisions I make from this review are based on what the data actually says, not what I hoped.",
				"I am asking why results came in as they did — not just recording what happened.",
				"I have identified at least one insight in this cycle that surprised me."
			],
			notYet: [
				"I am emphasizing favorable metrics and avoiding honest engagement with failures.",
				"I am confirmation-biased — using the review to validate what I already believed.",
				"The review is superficial — capturing metrics without understanding causes.",
				"The review confirmed everything I already knew — no genuine learning emerged."
			]
		},
		reflection: {
			frame: "Al-Hasib completed the account. Al-Khabir revealed what was hidden.",
			yesLabel: "Honest reckoning was present when",
			notYetLabel: "Selective reckoning entered when",
			governing: ["I reckoned honestly today — including with what I did not want to see.", "Something emerged in the review that genuinely surprised or taught me."],
			notYet: ["The review was more comfortable than honest.", "I am carrying forward an unresolved pattern without committing to change it."]
		}
	}
};
function qe(e) {
	return Ke[e] || null;
}
//#endregion
//#region src/services/bbos/bbos-export.js
function Je(e, t) {
	return {
		_format: "maqasid-bbos-export",
		_version: "1.0",
		_exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		project: {
			id: e.id,
			name: e.name,
			bbosStage: e.bbosStage,
			bbosCycle: e.bbosCycle,
			bbosRole: e.bbosRole
		},
		columns: e.columns.map((e) => ({
			id: e.id,
			name: e.name
		})),
		tasks: t.map((t) => ({
			id: t.id,
			title: t.title,
			description: t.description || "",
			columnId: t.columnId,
			columnName: e.columns.find((e) => e.id === t.columnId)?.name || "",
			priority: t.priority,
			tags: t.tags || [],
			subtasks: (t.subtasks || []).map((e) => ({
				title: e.title,
				done: e.done
			})),
			bbosTaskType: t.bbosTaskType,
			bbosStage: t.bbosStage,
			bbosFieldData: t.bbosFieldData || {},
			gLabel: t.gLabel || null,
			dueDate: t.dueDate
		})),
		instructions: "This JSON contains BBOS pipeline data for an Islamic business project. Each task has a bbosTaskType (e.g. IDY-S1) and bbosFieldData containing form field values. To help the user fill in missing fields, review the task titles, descriptions, and existing field data, then suggest appropriate values for empty bbosFieldData entries."
	};
}
function Ye(e, t) {
	let n = JSON.stringify(e, null, 2), r = new Blob([n], { type: "application/json" }), i = URL.createObjectURL(r), a = document.createElement("a");
	a.href = i, a.download = t, a.click(), URL.revokeObjectURL(i);
}
function Xe(e, t, n) {
	if (!e || e._format !== "maqasid-bbos-export") throw Error("Invalid BBOS export file format");
	let r = n.tasksByProject[t] || [], i = 0, a = 0;
	for (let o of e.tasks) {
		let s = o.bbosTaskType ? r.find((e) => e.bbosTaskType === o.bbosTaskType) : null;
		if (s) {
			let e = {
				...s.bbosFieldData,
				...o.bbosFieldData
			};
			n.updateTask(t, s.id, {
				description: o.description || s.description,
				bbosFieldData: e,
				gLabel: o.gLabel || s.gLabel,
				tags: o.tags?.length ? o.tags : s.tags
			}), i++;
		} else {
			let r = (e.columns || [])[0]?.id || "todo";
			n.createTask(t, r, o.title, {
				description: o.description,
				priority: o.priority || "medium",
				tags: o.tags || [],
				bbosTaskType: o.bbosTaskType,
				bbosStage: o.bbosStage,
				bbosFieldData: o.bbosFieldData || {},
				gLabel: o.gLabel
			}), a++;
		}
	}
	return {
		updated: i,
		created: a
	};
}
//#endregion
//#region src/services/bbos/bbos-template.js
function Ze(e) {
	let t = {};
	for (let n of e.fields) t[n.id] = "";
	return {
		schema_version: "1.0",
		format: "maqasid-bbos-task-template",
		task_type: e.id,
		stage: e.stage,
		sub_level: e.subLevel,
		label: e.label,
		fields: t,
		g_label: null,
		instructions: "Fill in each field with your data. Re-upload this file into MILOS to populate the task."
	};
}
function Qe(e) {
	Ye(Ze(e), `${e.id}-template.bbos.json`);
}
function $e(e, t) {
	let n = [];
	return !e || typeof e != "object" ? (n.push("File is not valid JSON."), {
		valid: !1,
		errors: n
	}) : (e.format !== "maqasid-bbos-task-template" && n.push(`Invalid format: expected "maqasid-bbos-task-template", got "${e.format}".`), e.task_type !== t.id && n.push(`Task type mismatch: expected "${t.id}", got "${e.task_type}".`), (!e.fields || typeof e.fields != "object") && n.push("Missing or invalid \"fields\" object."), {
		valid: n.length === 0,
		errors: n
	});
}
function et(e, t) {
	let n = {}, r = new Set(t.fields.map((e) => e.id));
	for (let [t, i] of Object.entries(e.fields || {})) r.has(t) && i !== "" && (n[t] = i);
	return {
		fieldData: n,
		gLabel: e.g_label || null
	};
}
function tt(e, t, n = []) {
	return {
		schema_version: "1.0",
		format: "maqasid-bbos-stage-bundle",
		stage: e,
		exported_at: (/* @__PURE__ */ new Date()).toISOString(),
		tasks: t.map((e) => {
			let t = n.find((t) => t.bbosTaskType === e.id), r = {};
			for (let n of e.fields) r[n.id] = t?.bbosFieldData?.[n.id] ?? "";
			return {
				schema_version: "1.0",
				format: "maqasid-bbos-task-template",
				task_type: e.id,
				stage: e.stage,
				sub_level: e.subLevel,
				label: e.label,
				fields: r,
				g_label: t?.gLabel ?? null
			};
		}),
		instructions: "Fill in the fields for each task in this bundle, then re-upload into MILOS to populate all stage tasks at once."
	};
}
function nt(e, t, n = []) {
	Ye(tt(e, t, n), `${e}-stage-bundle.bbos.json`);
}
function rt(e, t) {
	let n = [];
	return !e || typeof e != "object" ? (n.push("File is not valid JSON."), {
		valid: !1,
		errors: n
	}) : (e.format !== "maqasid-bbos-stage-bundle" && n.push(`Invalid format: expected "maqasid-bbos-stage-bundle", got "${e.format}".`), e.stage !== t && n.push(`Stage mismatch: this bundle is for "${e.stage}", but the active stage is "${t}".`), Array.isArray(e.tasks) || n.push("Missing or invalid \"tasks\" array."), {
		valid: n.length === 0,
		errors: n
	});
}
function it(e) {
	return (e.tasks || []).map((e) => ({
		taskType: e.task_type,
		fieldData: e.fields || {},
		gLabel: e.g_label || null
	}));
}
//#endregion
//#region src/components/bbos/BbosTaskPanel.jsx
var $ = () => {}, at = [];
function ot(e) {
	return e && e.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("") || "?";
}
function st(e) {
	return e ? new Date(e).toLocaleString("en", {
		month: "short",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: !0
	}) : "";
}
var ct = class extends e {
	constructor(e) {
		super(e), this.state = { error: null };
	}
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		typeof console < "u" && console.error("[BbosTaskPanel ErrorBoundary]", this.props.name || "(unnamed)", e, t);
	}
	handleReset = () => {
		this.setState({ error: null }), this.props.onReset?.();
	};
	render() {
		return this.state.error ? /* @__PURE__ */ T("div", {
			style: {
				padding: "12px",
				margin: "8px 0",
				border: "1px solid var(--danger, #ef4444)",
				borderRadius: "6px",
				background: "rgba(239, 68, 68, 0.05)",
				fontSize: "13px",
				color: "var(--text2, #555)"
			},
			children: [
				/* @__PURE__ */ T("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "6px",
						marginBottom: "6px"
					},
					children: [/* @__PURE__ */ w(c, { size: 14 }), /* @__PURE__ */ T("strong", { children: [this.props.name || "Section", " failed to render."] })]
				}),
				/* @__PURE__ */ w("div", {
					style: {
						fontSize: "12px",
						marginBottom: "8px",
						wordBreak: "break-word"
					},
					children: String(this.state.error?.message || this.state.error)
				}),
				/* @__PURE__ */ w("button", {
					type: "button",
					onClick: this.handleReset,
					style: {
						padding: "4px 10px",
						fontSize: "12px",
						border: "1px solid var(--text3, #888)",
						borderRadius: "4px",
						background: "transparent",
						cursor: "pointer"
					},
					children: "Reset"
				})
			]
		}) : this.props.children;
	}
};
function lt({ value: e, onChange: t }) {
	return /* @__PURE__ */ T("select", {
		className: "btp-field-select",
		value: e || "",
		onChange: (e) => t(e.target.value || null),
		"aria-label": "Integrity label",
		children: [/* @__PURE__ */ w("option", {
			value: "",
			children: "— None —"
		}), [
			{
				id: "amanah",
				label: "Amanah (trust)"
			},
			{
				id: "adl",
				label: "Adl (justice)"
			},
			{
				id: "ihsan",
				label: "Ihsan (excellence)"
			},
			{
				id: "sabr",
				label: "Sabr (patience)"
			},
			{
				id: "shukr",
				label: "Shukr (gratitude)"
			}
		].map((e) => /* @__PURE__ */ w("option", {
			value: e.id,
			children: e.label
		}, e.id))]
	});
}
function ut(e) {
	return /* @__PURE__ */ w(ct, {
		name: "BbosTaskPanel",
		onReset: e.onClose,
		children: /* @__PURE__ */ w(dt, { ...e })
	});
}
function dt({ project: e, projectId: t, taskId: n, onClose: i, bbosRole: a, accentColor: h, task: y, user: re, employees: b, members: ae, assignee: S, tasks: se, aiAvailable: E = !1, setActiveBbosTaskType: ue = $, clearActiveBbosTaskType: D = $, onUpdateTask: O = $, onFieldUpdate: A = $, onMoveTask: pe = $, onAddProjectMember: j = $, onRequestAiDraft: M, renderGLabelPicker: me, getInitials: he = ot }) {
	let ge = b || at, _e = ae || at, N = ge, P = se || at, ve = o(null), [be, xe] = s(!1), [I, L] = s({}), [Se, R] = s(null), [z, Ce] = s(""), [we, B] = s(""), [Te, Ee] = s([]), [De, Oe] = s(!1), [ke, Ae] = s(!1), [V, je] = s([]), H = o(null), U = o(null), Me = o(y?.columnId), Ne = o(null), W = o(() => {
		Oe(!0), setTimeout(() => i(), 200);
	});
	r(() => {
		W.current = () => {
			Oe(!0), setTimeout(() => i(), 200);
		};
	}, [i]);
	let G = y?.bbosTaskType ? le(y.bbosTaskType) : null, K = G && qe(G.stage)?.attrs || [], Pe = G ? de(G.id) : {
		upstream: [],
		downstream: [],
		requirements: ""
	};
	r(() => {
		y?.bbosFieldData && L(y.bbosFieldData), y && Ce(y.notes || ""), y && !Ne.current && (Ne.current = {
			fields: { ...y.bbosFieldData || {} },
			notes: y.notes || ""
		});
	}, [n]), r(() => () => clearTimeout(H.current), []), r(() => {
		let e = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.body.style.overflow = e;
		};
	}, []), r(() => (G?.id && ue(G.id), () => D()), [G?.id]);
	let Fe = o(y?.completedAt);
	if (r(() => {
		let e = Fe.current, t = y?.completedAt;
		if (Fe.current = t, e || !t || G?.id !== "CRD-S5") return;
		let n = Number(y.bbosFieldData?.financialRunwayMonths);
		if (!n || n <= 0) return;
		let r = new Map(k.map((e) => [e.id, e.order ?? 0])), i = P.filter((e) => e.bbosTaskType).sort((e, t) => {
			let n = r.get(e.bbosTaskType?.split("-")[0]) ?? 99, i = r.get(t.bbosTaskType?.split("-")[0]) ?? 99;
			return n === i ? (e.seedOrder ?? 999) - (t.seedOrder ?? 999) : n - i;
		});
		i.length !== 0 && R({
			allTasks: i,
			runwayMonths: n
		});
	}, [y?.completedAt]), !y || !G) return null;
	let q = (a && a !== "all" ? F(a, y.bbosTaskType) : "O") === "V";
	Me.current = y?.columnId;
	let J = y.bbosFieldData || {}, Y = J._aiDraftStatus || "none", Ie = J._aiDraftTimestamp || null, X = () => {
		let r = e.columns?.find((e) => e.name === "To Do"), i = e.columns?.find((e) => e.name === "In Progress");
		!i || !r || Me.current === r.id && pe(t, n, i.id, 0, e.columns);
	}, Le = (e, t) => {
		let r = {
			...I,
			[e]: t
		};
		L(r), t && t.trim() && je((t) => t.filter((t) => t !== e)), clearTimeout(H.current), H.current = setTimeout(() => {
			if (A(n, e, t), !e.startsWith("_")) {
				let e = Object.entries(r).filter(([e, t]) => !e.startsWith("_") && typeof t == "string" && t.trim().length > 0);
				(e.length >= 2 || e.some(([, e]) => e.trim().length >= 50)) && X();
			}
		}, 300);
	}, Z = (e) => {
		Ce(e.target.value), clearTimeout(H.current), H.current = setTimeout(() => {
			O(n, { notes: e.target.value });
		}, 300);
	}, Q = (e) => {
		O(n, { gLabel: e });
	}, Re = () => {
		if (!E || !M) return;
		let e = (/* @__PURE__ */ new Date()).toISOString();
		A(n, "_aiDraftStatus", "generating"), A(n, "_aiDraftTimestamp", e), A(n, "_aiDraftError", ""), B(""), Ee([]);
		let r = new AbortController();
		U.current = r;
		let i = "";
		try {
			let e = M({
				taskDef: G,
				projectId: t,
				signal: r.signal,
				onDelta: (e) => {
					i += e, B(i);
				},
				onComplete: ({ fieldData: e, warnings: t }) => {
					for (let [t, r] of Object.entries(e || {})) A(n, t, r);
					L((t) => ({
						...t,
						...e || {}
					})), Ee(t || []), X(), A(n, "_aiDraftStatus", "pending"), U.current = null, B("");
				},
				onError: (e) => {
					if (e?.name === "AbortError") A(n, "_aiDraftStatus", "none");
					else {
						let t = e?.message || "AI generation failed. Check console for details.";
						A(n, "_aiDraftStatus", "error"), A(n, "_aiDraftError", t), console.error("[BBOS AI Draft]", e);
					}
					U.current = null, B("");
				}
			});
			if (typeof e == "function") {
				let t = e, n = r.abort.bind(r);
				r.abort = () => {
					try {
						t();
					} catch {}
					n();
				};
			}
		} catch (e) {
			A(n, "_aiDraftStatus", "error"), A(n, "_aiDraftError", e?.message || "AI generation failed."), U.current = null, B("");
		}
	}, ze = () => {
		U.current &&= (U.current.abort(), null);
	}, Be = () => {
		A(n, "_aiDraftStatus", "accepted"), Ee([]);
	}, Ve = () => {
		for (let e of G.fields) A(n, e.id, "");
		L((e) => {
			let t = { ...e };
			for (let e of G.fields) t[e.id] = "";
			return t;
		}), A(n, "_aiDraftStatus", "rejected"), Ee([]);
	}, He = () => {
		if (!Ne.current) {
			W.current();
			return;
		}
		let e = Ne.current;
		for (let t of G.fields) {
			let r = e.fields[t.id] || "";
			A(n, t.id, r);
		}
		L(e.fields), O(n, { notes: e.notes }), Ce(e.notes), Ae(!1), W.current();
	}, Ue = () => {
		Qe(G);
	}, We = (e) => {
		let t = e.target.files?.[0];
		if (!t) return;
		let r = new FileReader();
		r.onload = (e) => {
			try {
				let t = JSON.parse(e.target.result), r = $e(t, G);
				if (!r.valid) {
					alert("Template validation failed:\n" + r.errors.join("\n"));
					return;
				}
				let { fieldData: i, gLabel: a } = et(t, G);
				for (let [e, t] of Object.entries(i)) A(n, e, t);
				L((e) => ({
					...e,
					...i
				})), a && Q(a), X(), alert(`Template imported: ${Object.keys(i).length} field(s) populated.`);
			} catch (e) {
				alert("Template import failed: " + e.message);
			}
		}, r.readAsText(t), e.target.value = "";
	}, Ge = e?.columns || [], Ke = Ge.find((e) => e.id === y.columnId), Je = {
		"To Do": "var(--text3)",
		"In Progress": "var(--col-progress, #f59e0b)",
		Done: "var(--success, #22c55e)"
	}, Ye = Pe.upstream.length > 0 || Pe.downstream.length > 0, Xe = /* @__PURE__ */ T("div", {
		className: `bbos-task-panel${De ? " tdp-scale-out" : " tdp-scale-in"}`,
		style: h ? { "--btp-accent": h } : void 0,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ T("div", {
				className: "btp-header",
				children: [/* @__PURE__ */ T("div", {
					className: "btp-header__info",
					children: [
						/* @__PURE__ */ T("div", {
							className: "btp-header__badges",
							children: [/* @__PURE__ */ T("span", {
								className: "btp-stage-badge",
								children: [
									G.stage,
									" · ",
									G.subLevel
								]
							}), /* @__PURE__ */ T("div", {
								className: "btp-status-pill",
								children: [/* @__PURE__ */ w("span", {
									className: "btp-status-dot",
									style: { background: Je[Ke?.name] || "var(--text3)" }
								}), /* @__PURE__ */ w("select", {
									className: "btp-status-select",
									value: y.columnId,
									onChange: (r) => pe(t, n, r.target.value, void 0, e.columns),
									"aria-label": "Task status",
									children: Ge.map((e) => /* @__PURE__ */ w("option", {
										value: e.id,
										children: e.name
									}, e.id))
								})]
							})]
						}),
						/* @__PURE__ */ w("h1", {
							className: "btp-title",
							children: G.label
						}),
						/* @__PURE__ */ T("div", {
							className: "btp-header__meta",
							children: [/* @__PURE__ */ T("div", {
								className: "btp-meta-item",
								children: [/* @__PURE__ */ w("span", {
									className: `btp-meta-avatar${S ? " btp-meta-avatar--filled" : ""}`,
									children: S ? he(S.name) : "?"
								}), /* @__PURE__ */ T("select", {
									className: "btp-status-select",
									value: y.assigneeId || "",
									"aria-label": "Assignee",
									onChange: (e) => {
										let r = e.target.value;
										O(n, { assigneeId: r || null }), r && j(t, r);
									},
									children: [
										/* @__PURE__ */ w("option", {
											value: "",
											children: "Unassigned"
										}),
										_e.length > 0 && /* @__PURE__ */ w("optgroup", {
											label: "Project members",
											children: _e.map((e) => /* @__PURE__ */ w("option", {
												value: e.id,
												children: e.name
											}, e.id))
										}),
										N.filter((t) => !(e?.members || []).includes(t.id)).length > 0 && /* @__PURE__ */ w("optgroup", {
											label: "Add from team",
											children: N.filter((t) => !(e?.members || []).includes(t.id)).map((e) => /* @__PURE__ */ w("option", {
												value: e.id,
												children: e.name
											}, e.id))
										})
									]
								})]
							}), K.length > 0 && /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("span", { className: "btp-meta-divider" }), /* @__PURE__ */ w("span", {
								className: "btp-meta-item",
								style: {
									color: "var(--text3)",
									fontSize: "12px"
								},
								children: K.map((e) => e.name).join(" · ")
							})] })]
						})
					]
				}), /* @__PURE__ */ w("button", {
					type: "button",
					className: "btp-close-btn",
					onClick: () => W.current(),
					"aria-label": "Close panel",
					children: /* @__PURE__ */ w(oe, { size: 18 })
				})]
			}),
			q && /* @__PURE__ */ T("div", {
				className: "btp-view-banner",
				children: [
					/* @__PURE__ */ w(ee, { size: 14 }),
					"VIEW ONLY — The ",
					ye(a).label,
					" role has read-only access"
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "btp-body",
				children: [
					/* @__PURE__ */ T("div", {
						className: "btp-purpose-section",
						children: [/* @__PURE__ */ w("div", {
							className: "btp-section-label",
							children: "Purpose"
						}), /* @__PURE__ */ w("p", {
							className: "btp-purpose-text",
							children: G.purpose
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "btp-bento",
						children: [/* @__PURE__ */ T("div", {
							className: "btp-bento-card",
							children: [/* @__PURE__ */ w("h3", {
								className: "btp-bento-card__title",
								children: "Dependencies"
							}), Ye ? /* @__PURE__ */ T("div", {
								className: "btp-dep-chips",
								children: [Pe.upstream.map((e) => /* @__PURE__ */ T("span", {
									className: "btp-dep-chip",
									children: [
										/* @__PURE__ */ w(u, { size: 12 }),
										" ",
										e.id
									]
								}, e.id)), Pe.downstream.map((e) => /* @__PURE__ */ T("span", {
									className: "btp-dep-chip",
									children: [
										/* @__PURE__ */ w(l, { size: 12 }),
										" ",
										e.id
									]
								}, e.id))]
							}) : /* @__PURE__ */ w("span", {
								className: "btp-bento-card__subtitle",
								children: "No dependencies"
							})]
						}), /* @__PURE__ */ T("div", {
							className: "btp-bento-card",
							children: [
								/* @__PURE__ */ w("h3", {
									className: "btp-bento-card__title",
									children: "Task Template"
								}),
								/* @__PURE__ */ w("span", {
									className: "btp-bento-card__subtitle",
									children: "JSON import/export"
								}),
								/* @__PURE__ */ w("div", {
									className: "btp-template-card",
									children: /* @__PURE__ */ T("div", {
										className: "btp-template-btns",
										children: [
											/* @__PURE__ */ w("button", {
												type: "button",
												className: "btp-template-icon-btn",
												onClick: Ue,
												title: "Download template",
												"aria-label": "Download template",
												children: /* @__PURE__ */ w(v, { size: 16 })
											}),
											/* @__PURE__ */ w("button", {
												type: "button",
												className: "btp-template-icon-btn",
												onClick: () => ve.current?.click(),
												title: "Upload template",
												"aria-label": "Upload template",
												children: /* @__PURE__ */ w(x, { size: 16 })
											}),
											/* @__PURE__ */ w("input", {
												ref: ve,
												type: "file",
												accept: ".json,.bbos",
												onChange: We,
												style: { display: "none" },
												"aria-label": "Upload task template file"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "btp-rationale-card",
						children: [/* @__PURE__ */ T("button", {
							type: "button",
							className: "btp-rationale-toggle",
							onClick: () => xe(!be),
							"aria-expanded": be,
							children: [/* @__PURE__ */ T("div", {
								className: "btp-rationale-toggle__left",
								children: [/* @__PURE__ */ w(f, { size: 18 }), /* @__PURE__ */ w("span", {
									className: "btp-rationale-toggle__title",
									children: "Theological Rationale"
								})]
							}), w(be ? _ : g, { size: 16 })]
						}), be && K.length > 0 && /* @__PURE__ */ w("div", {
							className: "btp-rationale-text",
							children: K.map((e) => /* @__PURE__ */ T("p", {
								style: { marginBottom: "0.75em" },
								children: [
									/* @__PURE__ */ w("strong", { children: e.name }),
									" (",
									e.title,
									") — ",
									e.body
								]
							}, e.name))
						})]
					}),
					V.length > 0 && /* @__PURE__ */ T("div", {
						className: "btp-validation-banner",
						children: [/* @__PURE__ */ w(c, { size: 16 }), /* @__PURE__ */ T("span", { children: [
							V.length,
							" required field",
							V.length > 1 ? "s" : "",
							" must be completed before marking Done"
						] })]
					}),
					/* @__PURE__ */ w("div", {
						className: "btp-fields",
						children: G.fields.map((e) => /* @__PURE__ */ w(ct, {
							name: e.label,
							children: /* @__PURE__ */ T("div", {
								className: `btp-field${V.includes(e.id) ? " btp-field--error" : ""}`,
								children: [/* @__PURE__ */ T("label", {
									className: "btp-field-label",
									htmlFor: `btp-field-${e.id}`,
									children: [e.label, V.includes(e.id) && /* @__PURE__ */ w("span", {
										className: "btp-field-required",
										children: " *"
									})]
								}), e.type === "textarea" ? /* @__PURE__ */ w("textarea", {
									id: `btp-field-${e.id}`,
									className: "btp-field-textarea",
									rows: e.rows || 3,
									placeholder: e.placeholder || "",
									value: I[e.id] || "",
									onChange: (t) => Le(e.id, t.target.value),
									readOnly: q
								}) : e.type === "select" ? /* @__PURE__ */ T("select", {
									id: `btp-field-${e.id}`,
									className: "btp-field-select",
									value: I[e.id] || "",
									onChange: (t) => Le(e.id, t.target.value),
									disabled: q,
									children: [/* @__PURE__ */ w("option", {
										value: "",
										children: "Select..."
									}), e.options?.map((e) => /* @__PURE__ */ w("option", {
										value: e.value,
										children: e.label
									}, e.value))]
								}) : e.type === "number" ? /* @__PURE__ */ w("input", {
									id: `btp-field-${e.id}`,
									type: "number",
									className: "btp-field-input",
									placeholder: e.placeholder || "",
									value: I[e.id] || "",
									onChange: (t) => Le(e.id, t.target.value),
									readOnly: q
								}) : /* @__PURE__ */ w("textarea", {
									id: `btp-field-${e.id}`,
									className: "btp-field-input btp-field-textarea",
									placeholder: e.placeholder || "",
									value: I[e.id] || "",
									onChange: (t) => Le(e.id, t.target.value),
									rows: 2,
									readOnly: q
								})]
							})
						}, e.id))
					}),
					G.hasGLabel && /* @__PURE__ */ T("div", {
						className: "btp-section btp-glabel-row",
						children: [/* @__PURE__ */ w("span", {
							className: "btp-section-label",
							children: "Integrity Label"
						}), me ? me({
							value: y.gLabel || null,
							onChange: Q
						}) : /* @__PURE__ */ w(lt, {
							value: y.gLabel || null,
							onChange: Q
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "btp-section",
						children: [/* @__PURE__ */ w("div", {
							className: "btp-section-label",
							children: "Notes"
						}), /* @__PURE__ */ w("div", {
							className: "btp-notes-container",
							children: /* @__PURE__ */ w("textarea", {
								id: "btp-notes",
								className: "btp-notes-textarea",
								value: z,
								onChange: Z,
								placeholder: "Write your thoughts or key learnings here...",
								rows: 4,
								"aria-label": "Notes"
							})
						})]
					}),
					G.validationFlags?.length > 0 && /* @__PURE__ */ w("div", {
						className: "btp-flags",
						children: G.validationFlags.map((e) => {
							let t = fe[e];
							return t ? /* @__PURE__ */ T("div", {
								className: "btp-flag",
								children: [/* @__PURE__ */ w(c, {
									size: 14,
									className: "btp-flag-icon"
								}), /* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("div", {
									className: "btp-flag-label",
									children: t.label
								}), /* @__PURE__ */ w("div", {
									className: "btp-flag-detail",
									children: t.detail
								})] })]
							}, e) : null;
						})
					}),
					G.hasAiDraft && /* @__PURE__ */ w(ct, {
						name: "AI Draft",
						children: /* @__PURE__ */ T("div", {
							className: "btp-draft-section",
							children: [
								/* @__PURE__ */ w("div", {
									className: "btp-section-label",
									children: "AI Draft"
								}),
								!E && /* @__PURE__ */ T("div", {
									className: "btp-draft-no-key",
									children: [/* @__PURE__ */ w(c, { size: 14 }), /* @__PURE__ */ w("span", { children: "Set your AI provider and API key in Settings to use AI drafts." })]
								}),
								E && Y === "none" && /* @__PURE__ */ T("button", {
									type: "button",
									className: "btp-generate-btn",
									onClick: Re,
									children: [/* @__PURE__ */ w(ie, { size: 14 }), " Generate Draft"]
								}),
								Y === "generating" && /* @__PURE__ */ T("div", {
									className: "btp-draft-generating",
									children: [
										/* @__PURE__ */ T("div", {
											className: "btp-draft-status btp-draft-status--generating",
											children: [/* @__PURE__ */ w(te, {
												size: 14,
												className: "btp-spinner"
											}), " Generating draft..."]
										}),
										we && /* @__PURE__ */ w("div", {
											className: "btp-draft-preview",
											children: we.length > 300 ? "..." + we.slice(-300) : we
										}),
										/* @__PURE__ */ T("button", {
											type: "button",
											className: "btp-draft-btn btp-draft-btn--cancel",
											onClick: ze,
											children: [/* @__PURE__ */ w(d, { size: 14 }), " Cancel"]
										})
									]
								}),
								Y === "pending" && /* @__PURE__ */ T("div", {
									className: "btp-draft-pending",
									children: [
										/* @__PURE__ */ T("div", {
											className: "btp-draft-status btp-draft-status--pending",
											children: [
												/* @__PURE__ */ w(ie, { size: 14 }),
												" AI-Generated Draft · ",
												st(Ie)
											]
										}),
										Te.length > 0 && /* @__PURE__ */ w("div", {
											className: "btp-draft-warnings",
											children: Te.map((e, t) => /* @__PURE__ */ T("div", {
												className: "btp-draft-warning",
												children: [
													/* @__PURE__ */ w(c, { size: 14 }),
													" ",
													e
												]
											}, t))
										}),
										/* @__PURE__ */ T("div", {
											className: "btp-draft-actions",
											children: [/* @__PURE__ */ T("button", {
												type: "button",
												className: "btp-draft-btn btp-draft-btn--accept",
												onClick: Be,
												children: [/* @__PURE__ */ w(m, { size: 14 }), " Accept Draft"]
											}), /* @__PURE__ */ T("button", {
												type: "button",
												className: "btp-draft-btn btp-draft-btn--reject",
												onClick: Ve,
												children: [/* @__PURE__ */ w(ne, { size: 14 }), " Reject Draft"]
											})]
										})
									]
								}),
								Y === "accepted" && /* @__PURE__ */ T("div", {
									className: "btp-draft-status btp-draft-status--accepted",
									children: [/* @__PURE__ */ w(m, { size: 14 }), " Draft Accepted"]
								}),
								Y === "error" && /* @__PURE__ */ T("div", {
									className: "btp-draft-error",
									children: [/* @__PURE__ */ T("div", {
										className: "btp-draft-status btp-draft-status--error",
										children: [
											/* @__PURE__ */ w(c, { size: 14 }),
											" ",
											J._aiDraftError || "AI generation failed."
										]
									}), /* @__PURE__ */ T("button", {
										type: "button",
										className: "btp-generate-btn",
										onClick: Re,
										children: [/* @__PURE__ */ w(ne, { size: 14 }), " Retry"]
									})]
								}),
								E && Y === "rejected" && /* @__PURE__ */ T("button", {
									type: "button",
									className: "btp-generate-btn",
									onClick: Re,
									children: [/* @__PURE__ */ w(ne, { size: 14 }), " Regenerate Draft"]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "btp-footer",
				children: [/* @__PURE__ */ T("span", {
					className: "btp-footer-meta",
					children: [
						re?.name || "You",
						" · ",
						st(y.createdAt)
					]
				}), /* @__PURE__ */ T("div", {
					className: "btp-footer-actions",
					children: [
						ke ? /* @__PURE__ */ w("button", {
							type: "button",
							className: "btp-discard-btn",
							style: { color: "var(--danger)" },
							onClick: He,
							children: "Confirm Discard?"
						}) : /* @__PURE__ */ w("button", {
							type: "button",
							className: "btp-discard-btn",
							onClick: () => Ae(!0),
							children: "Discard Changes"
						}),
						/* @__PURE__ */ T("button", {
							type: "button",
							className: "btp-save-later-btn",
							onClick: () => W.current(),
							children: [/* @__PURE__ */ w(p, { size: 14 }), " Save for Later"]
						}),
						/* @__PURE__ */ T("button", {
							type: "button",
							className: `btp-done-btn${V.length ? " btp-done-btn--shake" : ""}`,
							onClick: () => {
								let e = (G.fields || []).filter((e) => {
									let t = I[e.id];
									return !t || typeof t == "string" && !t.trim();
								}).map((e) => e.id);
								if (e.length > 0) {
									je(e);
									let t = document.getElementById(`btp-field-${e[0]}`);
									t && t.scrollIntoView({
										behavior: "smooth",
										block: "center"
									});
									return;
								}
								je([]), W.current();
							},
							children: [/* @__PURE__ */ w(m, { size: 14 }), " Done"]
						})
					]
				})]
			})
		]
	}), Ze = Se ? /* @__PURE__ */ w(mt, {
		allTasks: Se.allTasks,
		runwayMonths: Se.runwayMonths,
		onUpdateTask: O,
		onClose: () => R(null)
	}) : null;
	return ce(/* @__PURE__ */ T("div", {
		className: `tdp-overlay${De ? " tdp-overlay--closing" : ""}`,
		onClick: () => W.current(),
		children: [Xe, Ze]
	}), document.body);
}
function ft(e) {
	return (/* @__PURE__ */ new Date(e + "T00:00:00")).toLocaleDateString("en", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function pt(e, t, n) {
	let r = /* @__PURE__ */ new Date(n + "T00:00:00"), i = t * 30 * 24 * 60 * 60 * 1e3;
	return e.map((t, n) => {
		let a = (n + 1) / e.length;
		return {
			task: t,
			dueDate: new Date(r.getTime() + a * i).toISOString().split("T")[0],
			hasExisting: !!t.dueDate,
			stageId: t.bbosTaskType?.split("-")[0] ?? "—"
		};
	});
}
function mt({ allTasks: e, runwayMonths: t, onUpdateTask: n, onClose: r }) {
	let i = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], [o, c] = s(i), [l, u] = s(!0), d = a(() => pt(e, t, o), [
		e,
		t,
		o
	]), f = e.filter((e) => e.dueDate).length;
	return ce(/* @__PURE__ */ w("div", {
		className: "rda-overlay",
		onClick: (e) => e.target === e.currentTarget && r(),
		children: /* @__PURE__ */ T("div", {
			className: "rda-modal",
			children: [
				/* @__PURE__ */ T("div", {
					className: "rda-header",
					children: [/* @__PURE__ */ T("div", {
						className: "rda-header-title",
						children: [/* @__PURE__ */ w("span", {
							className: "rda-header-icon",
							children: "📅"
						}), /* @__PURE__ */ w("span", { children: "Runway Date Assignment" })]
					}), /* @__PURE__ */ w("button", {
						className: "rda-close",
						onClick: r,
						"aria-label": "Close",
						children: /* @__PURE__ */ w(oe, { size: 16 })
					})]
				}),
				/* @__PURE__ */ T("div", {
					className: "rda-meta",
					children: [
						/* @__PURE__ */ T("span", {
							className: "rda-meta-pill",
							children: [
								t,
								" month",
								t === 1 ? "" : "s"
							]
						}),
						/* @__PURE__ */ w("span", {
							className: "rda-meta-sep",
							children: "·"
						}),
						/* @__PURE__ */ T("span", { children: [e.length, " tasks distributed evenly"] })
					]
				}),
				/* @__PURE__ */ T("div", {
					className: "rda-field",
					children: [/* @__PURE__ */ w("label", {
						className: "rda-label",
						htmlFor: "rda-start-date",
						children: "Start date"
					}), /* @__PURE__ */ w("input", {
						id: "rda-start-date",
						type: "date",
						className: "rda-date-input",
						value: o,
						onChange: (e) => c(e.target.value || i)
					})]
				}),
				/* @__PURE__ */ w("div", {
					className: "rda-timeline-label",
					children: "Timeline preview"
				}),
				/* @__PURE__ */ w("div", {
					className: "rda-timeline",
					children: d.map(({ task: e, dueDate: t, hasExisting: n, stageId: r }, i) => /* @__PURE__ */ T("div", {
						className: `rda-row${n ? " rda-row--existing" : ""}`,
						children: [
							/* @__PURE__ */ w("span", {
								className: "rda-row-num",
								children: i + 1
							}),
							/* @__PURE__ */ w("span", {
								className: "rda-row-stage",
								children: r
							}),
							/* @__PURE__ */ w("span", {
								className: "rda-row-title",
								children: e.title?.replace(/^[A-Z]+-\w+\s·\s/, "")
							}),
							/* @__PURE__ */ w("span", {
								className: "rda-row-date",
								children: ft(t)
							}),
							n && /* @__PURE__ */ w("span", {
								className: "rda-row-dot",
								title: "Has existing date"
							})
						]
					}, e.id))
				}),
				f > 0 && /* @__PURE__ */ T("label", {
					className: "rda-overwrite",
					children: [/* @__PURE__ */ w("input", {
						type: "checkbox",
						checked: l,
						onChange: (e) => u(e.target.checked)
					}), /* @__PURE__ */ T("span", { children: [
						"Overwrite ",
						f,
						" task",
						f === 1 ? "" : "s",
						" with existing date",
						f === 1 ? "" : "s"
					] })]
				}),
				/* @__PURE__ */ T("div", {
					className: "rda-actions",
					children: [/* @__PURE__ */ w("button", {
						type: "button",
						className: "rda-btn rda-btn--ghost",
						onClick: r,
						children: "Cancel"
					}), /* @__PURE__ */ w("button", {
						type: "button",
						className: "rda-btn rda-btn--primary",
						onClick: () => {
							d.forEach(({ task: e, dueDate: t, hasExisting: r }) => {
								r && !l || n(e.id, { dueDate: t });
							}), r();
						},
						children: "Apply Dates"
					})]
				})
			]
		})
	}), document.body);
}
//#endregion
//#region src/components/bbos/BbosRoleBadge.jsx
function ht({ roleId: e, size: t = "sm" }) {
	let n = ye(e);
	if (!n) return null;
	let r = t === "sm";
	return /* @__PURE__ */ w("span", {
		title: `${n.label} — ${n.description}`,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: "3px",
			padding: r ? "1px 6px" : "2px 8px",
			fontSize: r ? "0.65rem" : "0.72rem",
			fontWeight: 600,
			fontFamily: "var(--font-mono)",
			color: n.color,
			background: n.bg,
			border: `1px solid ${n.color}30`,
			borderRadius: "4px",
			letterSpacing: "0.03em",
			lineHeight: 1.4,
			whiteSpace: "nowrap"
		},
		children: n.abbr
	});
}
//#endregion
//#region src/components/bbos/BbosRolePicker.jsx
function gt({ value: e, onChange: t }) {
	let [i, a] = s(!1), [c, l] = s(-1), u = o(null), d = o(null), f = "bbos-role-trigger", p = N.findIndex((t) => t.id === (e || "all"));
	r(() => {
		if (!i) return;
		let e = (e) => {
			u.current && !u.current.contains(e.target) && a(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [i]), r(() => {
		!i || c < 0 || (d.current?.querySelector(`[data-index="${c}"]`))?.scrollIntoView({ block: "nearest" });
	}, [i, c]);
	let m = n(() => {
		a(!0), l(p >= 0 ? p : 0);
	}, [p]), h = n((e) => {
		t(N[e].id), a(!1);
	}, [t]), g = (e) => {
		switch (e.key) {
			case "Enter":
			case " ":
			case "ArrowDown":
				e.preventDefault(), i ? (e.key === "Enter" || e.key === " ") && h(c) : m();
				break;
			case "ArrowUp":
				e.preventDefault(), i || m();
				break;
			case "Escape":
				i && (e.preventDefault(), a(!1));
				break;
			case "Home":
				i && (e.preventDefault(), l(0));
				break;
			case "End":
				i && (e.preventDefault(), l(N.length - 1));
				break;
			default: break;
		}
	}, _ = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), l((e) => (e + 1) % N.length);
				break;
			case "ArrowUp":
				e.preventDefault(), l((e) => (e - 1 + N.length) % N.length);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), c >= 0 && h(c);
				break;
			case "Escape":
				e.preventDefault(), a(!1), u.current?.querySelector("button")?.focus();
				break;
			case "Home":
				e.preventDefault(), l(0);
				break;
			case "End":
				e.preventDefault(), l(N.length - 1);
				break;
			default: break;
		}
	}, v = c >= 0 ? `bbos-role-opt-${c}` : void 0;
	return /* @__PURE__ */ T("div", {
		ref: u,
		className: "bbos-role-picker",
		children: [/* @__PURE__ */ T("button", {
			id: f,
			type: "button",
			className: "bbos-role-picker__trigger",
			onClick: () => i ? a(!1) : m(),
			onKeyDown: g,
			"aria-haspopup": "listbox",
			"aria-expanded": i,
			"aria-activedescendant": i ? v : void 0,
			children: [/* @__PURE__ */ w(ht, { roleId: e || "all" }), /* @__PURE__ */ w("span", {
				className: "bbos-role-picker__label",
				children: N.find((t) => t.id === (e || "all"))?.label || "Role"
			})]
		}), i && /* @__PURE__ */ w("div", {
			ref: d,
			id: "bbos-role-listbox",
			role: "listbox",
			"aria-labelledby": f,
			className: "bbos-role-picker__list",
			onKeyDown: _,
			tabIndex: -1,
			children: N.map((t, n) => {
				let r = (e || "all") === t.id, i = n === c;
				return /* @__PURE__ */ T("div", {
					id: `bbos-role-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"data-index": n,
					className: "bbos-role-picker__option" + (r ? " bbos-role-picker__option--selected" : "") + (i ? " bbos-role-picker__option--active" : ""),
					onClick: () => h(n),
					onMouseEnter: () => l(n),
					children: [
						/* @__PURE__ */ w(ht, { roleId: t.id }),
						/* @__PURE__ */ w("span", {
							className: "bbos-role-picker__option-label",
							children: t.label
						}),
						/* @__PURE__ */ w("span", {
							className: "bbos-role-picker__option-desc",
							children: t.description
						})
					]
				}, t.id);
			})
		})]
	});
}
//#endregion
//#region src/components/bbos/BbosProjectTemplatePicker.jsx
var _t = [
	{
		id: "",
		label: "Unassigned"
	},
	{
		id: "faith",
		label: "Faith"
	},
	{
		id: "health",
		label: "Health"
	},
	{
		id: "intellect",
		label: "Intellect"
	},
	{
		id: "family",
		label: "Family"
	},
	{
		id: "wealth",
		label: "Wealth"
	},
	{
		id: "environment",
		label: "Environment"
	},
	{
		id: "ummah",
		label: "Community"
	}
], vt = () => [], yt = (e) => e;
function bt({ open: e, onClose: t, pillarOptions: n = _t, submoduleOptionsForPillar: i = vt, getSubmoduleDisplayLabel: a = yt, defaultPillar: o = "", onCreate: c }) {
	let [l, u] = s(""), [d, f] = s("standard"), [p, m] = s(o), [h, g] = s("");
	if (r(() => {
		e && (u(""), f("standard"), m(o), g(""));
	}, [e, o]), !e) return null;
	let _ = p ? i(p) : [], v = () => {
		let e = l.trim() || "New Project";
		c?.({
			name: e,
			type: d,
			bbosEnabled: d === "bbos",
			moduleId: h || p || null
		});
	};
	return /* @__PURE__ */ w("div", {
		className: "bbos-tpl-overlay",
		onClick: t,
		children: /* @__PURE__ */ T("div", {
			className: "bbos-tpl-modal",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ w("h3", {
					className: "bbos-tpl-title",
					children: "New Project"
				}),
				/* @__PURE__ */ w("input", {
					className: "bbos-tpl-name",
					value: l,
					onChange: (e) => u(e.target.value),
					placeholder: "Project name",
					autoFocus: !0,
					onKeyDown: (e) => {
						e.key === "Enter" && v();
					}
				}),
				/* @__PURE__ */ w("p", {
					className: "bbos-tpl-section-label",
					children: "Pillar"
				}),
				/* @__PURE__ */ w("select", {
					className: "bbos-tpl-select",
					value: p,
					onChange: (e) => {
						m(e.target.value), g("");
					},
					children: n.map((e) => /* @__PURE__ */ w("option", {
						value: e.id,
						children: e.label
					}, e.id))
				}),
				_.length > 0 && /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("p", {
					className: "bbos-tpl-section-label",
					children: "Submodule"
				}), /* @__PURE__ */ T("select", {
					className: "bbos-tpl-select",
					value: h,
					onChange: (e) => g(e.target.value),
					children: [/* @__PURE__ */ w("option", {
						value: "",
						children: "Any submodule"
					}), _.map((e) => /* @__PURE__ */ w("option", {
						value: e,
						children: a(e, e)
					}, e))]
				})] }),
				/* @__PURE__ */ w("p", {
					className: "bbos-tpl-section-label",
					children: "Project Type"
				}),
				/* @__PURE__ */ T("div", {
					className: "bbos-tpl-type-row",
					children: [/* @__PURE__ */ T("button", {
						type: "button",
						className: `bbos-tpl-type-btn${d === "standard" ? " bbos-tpl-type-btn--active" : ""}`,
						onClick: () => f("standard"),
						children: [/* @__PURE__ */ T("div", {
							className: "bbos-tpl-type-head",
							children: [/* @__PURE__ */ w(y, { size: 16 }), /* @__PURE__ */ w("strong", { children: "Standard" })]
						}), /* @__PURE__ */ w("p", { children: "3-column Kanban board (To Do, In Progress, Done)" })]
					}), /* @__PURE__ */ T("button", {
						type: "button",
						className: `bbos-tpl-type-btn bbos-tpl-type-btn--bbos${d === "bbos" ? " bbos-tpl-type-btn--active" : ""}`,
						onClick: () => f("bbos"),
						children: [/* @__PURE__ */ T("div", {
							className: "bbos-tpl-type-head",
							children: [/* @__PURE__ */ w(S, {
								size: 16,
								className: "bbos-tpl-type-icon-bbos"
							}), /* @__PURE__ */ w("strong", { children: "BBOS Pipeline" })]
						}), /* @__PURE__ */ w("p", { children: "9-stage business cultivation pipeline (Think / Execute / Reckon)" })]
					})]
				}),
				/* @__PURE__ */ T("div", {
					className: "bbos-tpl-actions",
					children: [/* @__PURE__ */ w("button", {
						type: "button",
						className: "bbos-tpl-btn bbos-tpl-btn--ghost",
						onClick: t,
						children: "Cancel"
					}), /* @__PURE__ */ w("button", {
						type: "button",
						className: "bbos-tpl-btn bbos-tpl-btn--primary",
						onClick: v,
						children: "Create"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/services/bbos/seedBbosTasks.js
function xt({ projectId: e, makeId: t, columns: n }) {
	if (!e || typeof t != "function" || !Array.isArray(n) || n.length === 0) throw Error("seedBbosTasks: projectId, makeId, and non-empty columns are required.");
	let r = n[0].id, i = (/* @__PURE__ */ new Date()).toISOString();
	return E.map((n, a) => ({
		id: t(),
		projectId: e,
		columnId: r,
		title: `${n.id} · ${n.label}`,
		description: "",
		priority: "medium",
		dueDate: null,
		tags: [n.stage],
		subtasks: [],
		checklist: [],
		attachments: [],
		order: a,
		seedOrder: a,
		createdAt: i,
		updatedAt: i,
		completedAt: null,
		bbosTaskType: n.id,
		bbosStage: n.stage,
		bbosFieldData: {}
	}));
}
//#endregion
export { O as BBOS_LAYERS, he as BBOS_NAV_LEVELS, j as BBOS_PATCH_STAGES, A as BBOS_REJECTION_REASONS, N as BBOS_ROLES, k as BBOS_STAGES, Ke as BBOS_STAGE_ISLAMIC, P as BBOS_TASK_ACCESS, E as BBOS_TASK_DEFINITIONS, fe as BBOS_VALIDATION_FLAG_LABELS, Ge as BbosFullDashboard, bt as BbosProjectTemplatePicker, ht as BbosRoleBadge, gt as BbosRolePicker, ut as BbosTaskPanel, Ye as downloadJson, nt as downloadStageBundleTemplate, Qe as downloadTaskTemplate, Je as exportBbosProject, tt as generateStageBundleTemplate, Ze as generateTaskTemplate, ve as getAccessibleStagesForRole, ge as getBbosNavPillars, pe as getBbosRejectionReason, ye as getBbosRole, qe as getBbosStageIslamic, le as getBbosTaskDef, ue as getBbosTaskDefsByStage, de as getBbosTaskDeps, _e as getLayerForStage, me as getStage, M as getStageLayer, F as getTaskAccessLevel, Xe as importBbosData, it as importStageBundleTemplate, et as importTaskTemplate, xt as seedBbosTasks, rt as validateStageBundleTemplate, $e as validateTaskTemplate };

//# sourceMappingURL=bbos.es.js.map