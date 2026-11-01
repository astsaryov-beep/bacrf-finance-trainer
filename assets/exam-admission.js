/* T-33: explicit admission of existing reviewed tasks. No changes to answers or open assessment. */
(function(root){'use strict';
 const entries={
  "EX17-01": {
    "goals": [
      "forward-futures-contract",
      "fx-delivery"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-02": {
    "goals": [
      "delisting-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-03": {
    "goals": [
      "vm-units"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-04": {
    "goals": [
      "ipo-capital-flows",
      "ipo-demand"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-05": {
    "goals": [
      "fx-swap-legal",
      "pvp"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-06": {
    "goals": [
      "supervision-types"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-07": {
    "goals": [
      "preferred-rights",
      "ddm-gordon"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-08": {
    "goals": [
      "note-budget",
      "note-credit"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-09": {
    "goals": [
      "credit-relative-value",
      "curve-dv01"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-10": {
    "goals": [
      "listing-levels"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-11": {
    "goals": [
      "project-cashflow"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-12": {
    "goals": [
      "repo-risk-income"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-13": {
    "goals": [
      "option-value"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-14": {
    "goals": [
      "mezzanine-pik"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-15": {
    "goals": [
      "futures-settlement"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-16": {
    "goals": [
      "free-float-weight",
      "free-float-definition"
    ],
    "reveals": [
      "free-float-weight"
    ],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-17": {
    "goals": [
      "cbr-status"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-18": {
    "goals": [
      "sharpe-sortino",
      "drawdown-path"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-19": {
    "goals": [
      "var-scaling",
      "var-interpretation"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-foundations"
  },
  "EX17-20": {
    "goals": [
      "market-roles",
      "fund-rights",
      "market-rights-record"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-21": {
    "goals": [
      "yield-scenarios"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-22": {
    "goals": [
      "basel-history",
      "bank-license"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "EX17-23": {
    "goals": [
      "rating-scales",
      "rating-issue"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-24": {
    "goals": [
      "irs-fix-credit",
      "irs-residual",
      "closeout-netting"
    ],
    "reveals": [
      "irs-fix-credit"
    ],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-25": {
    "goals": [
      "listing-levels",
      "index-eligibility"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-all-mc"
  },
  "EX17-26": {
    "goals": [
      "repo-voting"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-27": {
    "goals": [
      "hedge-ratio-units"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-foundations"
  },
  "EX17-28": {
    "goals": [
      "dow-axioms"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "EX17-29": {
    "goals": [
      "irs-fix-credit"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-30": {
    "goals": [
      "ipo-procedure",
      "ipo-capital-flows",
      "ipo-demand"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "EX17-31": {
    "goals": [
      "factoring-roles"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-32": {
    "goals": [
      "collateral-vm",
      "closeout-netting",
      "collateral-haircut",
      "ksu-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "EX17-33": {
    "goals": [
      "option-rho"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-34": {
    "goals": [
      "portfolio-beta",
      "sector-concentration"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-35": {
    "goals": [
      "credit-line"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-36": {
    "goals": [
      "fx-date-gap",
      "fx-swap-flows"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-37": {
    "goals": [
      "dividend-value"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-38": {
    "goals": [
      "digital-ruble-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-39": {
    "goals": [
      "funding-function"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "EX17-40": {
    "goals": [
      "carry-metrics"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-41": {
    "goals": [
      "inflation-linker"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-42": {
    "goals": [
      "sharpe-sortino"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-43": {
    "goals": [
      "bond-cashflow",
      "ytm-cashflow",
      "z-spread",
      "clean-dirty"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "EX17-44": {
    "goals": [
      "index-eligibility",
      "free-float-weight",
      "index-caps",
      "index-divisor",
      "benchmark-tr",
      "free-float-definition"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "EX17-45": {
    "goals": [
      "clearing-waterfall"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "EX17-46": {
    "goals": [
      "asv-functions",
      "deposit-insurance"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "EX17-47": {
    "goals": [
      "independent-guarantee"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "EX17-48": {
    "goals": [
      "dow-phases"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "EX17-49": {
    "goals": [
      "gold-swap"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "EX17-50": {
    "goals": [
      "insurance-roles"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-01": {
    "goals": [
      "kennedy-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-foundations"
  },
  "TRANSFER-KENNEDY-01": {
    "goals": [
      "kennedy-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-foundations"
  },
  "TRANSFER-DOW-01": {
    "goals": [
      "dow-phases"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "TRANSFER-ASV-01": {
    "goals": [
      "asv-functions",
      "deposit-insurance"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "TRANSFER-WATERFALL-01": {
    "goals": [
      "clearing-waterfall"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "TRANSFER-FUNDING-01": {
    "goals": [
      "funding-function"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-lists"
  },
  "RECON-33": {
    "goals": [
      "ipo-capital-flows",
      "ipo-demand"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "RECON-34": {
    "goals": [
      "collateral-haircut",
      "ksu-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "RECON-35": {
    "goals": [
      "index-eligibility",
      "free-float-weight",
      "index-caps",
      "index-divisor",
      "benchmark-tr",
      "free-float-definition"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "TRANSFER-IPO-01": {
    "goals": [
      "ipo-procedure"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "TRANSFER-BONDS-01": {
    "goals": [
      "bond-cashflow",
      "ytm-cashflow",
      "z-spread",
      "clean-dirty"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "TRANSFER-GUARANTEE-01": {
    "goals": [
      "independent-guarantee"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-compound"
  },
  "RECON-02": {
    "goals": [
      "hedge-effectiveness",
      "curve-dv01"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-03": {
    "goals": [
      "portfolio-correlation"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-04": {
    "goals": [
      "sharpe-sortino"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-05": {
    "goals": [
      "integrated-supervision"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-06": {
    "goals": [
      "integrated-supervision"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-07": {
    "goals": [
      "technical-methods"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-08": {
    "goals": [
      "put-call-parity"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-08-PROTECT": {
    "goals": [
      "protective-put"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-09": {
    "goals": [
      "curve-dv01"
    ],
    "reveals": [
      "duration-dv01"
    ],
    "reviewRevision": "2026-11-01-t33-b10"
  },
  "RECON-10": {
    "goals": [
      "rate-indicators"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "RECON-11": {
    "goals": [
      "credit-loan"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-12": {
    "goals": [
      "credit-security",
      "independent-guarantee"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-13": {
    "goals": [
      "letter-credit"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-13-MC": {
    "goals": [
      "letter-credit"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-14": {
    "goals": [
      "project-cashflow"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-15": {
    "goals": [
      "rating-group"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-16": {
    "goals": [
      "rating-market-lag"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-17": {
    "goals": [
      "corporate-votes",
      "delisting-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-18": {
    "goals": [
      "token-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-19": {
    "goals": [
      "ev-perimeter"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-20": {
    "goals": [
      "free-float-turnover",
      "free-float-definition"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "RECON-21": {
    "goals": [
      "dividend-governance"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-22": {
    "goals": [
      "multiples-comparability",
      "multiples-meaning",
      "eps-nonrecurring",
      "ev-perimeter"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-24": {
    "goals": [
      "pension-paygo"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-25": {
    "goals": [
      "insurance-objects"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-editorial"
  },
  "RECON-26": {
    "goals": [
      "digital-ruble-rights",
      "token-rights"
    ],
    "reveals": [],
    "reviewRevision": "2026-11-01-t33-b10"
  },
  "RECON-27": {
    "goals": [
      "carry-structure",
      "carry-residual"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-29": {
    "goals": [
      "credit-line",
      "covenant"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-30": {
    "goals": [
      "gold-swap"
    ],
    "reveals": [],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "RECON-31": {
    "goals": [
      "fx-forward-rates"
    ],
    "reveals": [
      "fx-forward-rates"
    ],
    "reviewRevision": "2026-10-31-open-reconstructed"
  },
  "MC-R-01-0-1": {
    "goals": [
      "financial-contracts"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "financial-contracts",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-01-0-2": {
    "goals": [
      "primary-secondary",
      "information-asymmetry"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "primary-secondary",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-01-1-2": {
    "goals": [
      "clearing-dvp",
      "market-rights-record"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "clearing-dvp",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-01-1-3": {
    "goals": [
      "infrastructure-concentration"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "infrastructure-concentration",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-02-0-2": {
    "goals": [
      "supervision-types"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "supervision-types",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-02-1-1": {
    "goals": [
      "regulation-market-discipline"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "regulation-market-discipline",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-03-0-1": {
    "goals": [
      "bank-license"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "bank-license",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-03-1-1": {
    "goals": [
      "deposit-insurance"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "deposit-insurance",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-04-0-1": {
    "goals": [
      "capital-liquidity",
      "prudential-ratios"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "capital-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-04-0-2": {
    "goals": [
      "capital-liquidity"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "capital-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-05-0-1": {
    "goals": [
      "economic-models"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "economic-models",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-05-1-1": {
    "goals": [
      "market-efficiency",
      "behavioral-biases",
      "arbitrage-limits"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "market-efficiency",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-05-1-2": {
    "goals": [
      "behavioral-biases"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "behavioral-biases",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-R-06-0-1": {
    "goals": [
      "digital-ruble-rights",
      "token-rights"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "digital-ruble-rights",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b04"
  },
  "MC-R-06-1-1": {
    "goals": [
      "payment-centres"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "payment-centres",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b04"
  },
  "MC-R-06-1-2": {
    "goals": [
      "payment-finality"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "payment-finality",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b04"
  },
  "MC-INS-01-0-1": {
    "goals": [
      "insurance-contract"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "insurance-contract",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-INS-01-1-1": {
    "goals": [
      "insurance-deductible"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "insurance-deductible",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-INS-01-1-2": {
    "goals": [
      "insurance-abandon"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "insurance-abandon",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-INS-02-0-1": {
    "goals": [
      "insurance-specialists"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "insurance-specialists",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b08"
  },
  "MC-INS-02-1-1": {
    "goals": [
      "insurance-objects",
      "insurance-kbm"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "insurance-objects",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-INS-03-0-1": {
    "goals": [
      "insurance-tariff"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "insurance-tariff",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-INS-03-0-2": {
    "goals": [
      "insurance-dependence"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "insurance-dependence",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-INS-03-1-1": {
    "goals": [
      "reinsurance"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "reinsurance",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-PEN-01-0-1": {
    "goals": [
      "pension-paygo"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "pension-paygo",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-PEN-01-1-2": {
    "goals": [
      "pension-eligibility"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "pension-eligibility",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-PEN-02-0-1": {
    "goals": [
      "pension-roles"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "knowledge",
    "complex": false,
    "family": "pension-roles",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-PEN-02-1-2": {
    "goals": [
      "pds-access"
    ],
    "reveals": [],
    "sourceGroup": "lecture",
    "taskKind": "case",
    "complex": false,
    "family": "pds-access",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-04-0-1": {
    "goals": [
      "debt-legal-forms"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "debt-legal-forms",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-04-1-1": {
    "goals": [
      "bond-call",
      "bond-cashflow"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "bond-call",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-04-1-3": {
    "goals": [
      "sustainable-bond"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "sustainable-bond",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-05-0-1": {
    "goals": [
      "securitisation-roles",
      "tranche-loss"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "securitisation-roles",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-05-0-2": {
    "goals": [
      "securitisation-servicing"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "securitisation-servicing",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-05-1-1": {
    "goals": [
      "tranche-loss"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "tranche-loss",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b05"
  },
  "MC-S1-06-0-1": {
    "goals": [
      "clean-dirty"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "clean-dirty",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b05"
  },
  "MC-S1-06-1-2": {
    "goals": [
      "ytm-realisation"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "ytm-realisation",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-07-0-1": {
    "goals": [
      "duration-dv01"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "duration-dv01",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-07-1-1": {
    "goals": [
      "convexity"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "convexity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-08-0-1": {
    "goals": [
      "benchmark-tr"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "benchmark-tr",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-08-1-2": {
    "goals": [
      "repo-collateral-liquidity"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "repo-collateral-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-S1-09-0-1": {
    "goals": [
      "z-spread",
      "credit-spread-metrics"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "z-spread",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-S1-09-0-2": {
    "goals": [
      "credit-spread-price"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "credit-spread-price",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-S1-09-1-1": {
    "goals": [
      "rating-group",
      "rating-issue"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "rating-group",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-E-01-0-1": {
    "goals": [
      "preferred-rights"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "preferred-rights",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-01-0-3": {
    "goals": [
      "equity-dilution",
      "eps-dilution"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "equity-dilution",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-01-1-1": {
    "goals": [
      "ipo-capital-flows",
      "equity-split"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "ipo-capital-flows",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-02-0-1": {
    "goals": [
      "eps-nonrecurring"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "eps-nonrecurring",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-02-1-1": {
    "goals": [
      "ev-perimeter",
      "multiples-comparability",
      "multiples-meaning"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "ev-perimeter",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-03-0-1": {
    "goals": [
      "dividend-yield",
      "dividend-dates"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "dividend-yield",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-03-1-2": {
    "goals": [
      "dividend-dates"
    ],
    "reveals": [
      "dividend-dates"
    ],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "dividend-dates",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b05"
  },
  "MC-E-04-0-1": {
    "goals": [
      "fund-nav",
      "fund-roles"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "fund-nav",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-04-0-3": {
    "goals": [
      "fund-bond-mark"
    ],
    "reveals": [
      "fund-bond-mark"
    ],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "fund-bond-mark",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-04-1-1": {
    "goals": [
      "tracking-error",
      "index-weight-contribution",
      "fund-costs"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "tracking-error",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b05"
  },
  "MC-E-05-0-1": {
    "goals": [
      "portfolio-beta"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "portfolio-beta",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b05"
  },
  "MC-E-05-1-2": {
    "goals": [
      "investment-liability"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "investment-liability",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-06-0-2": {
    "goals": [
      "corporate-governance"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "corporate-governance",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-06-1-1": {
    "goals": [
      "free-float-turnover",
      "free-float-definition"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "free-float-turnover",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b06"
  },
  "MC-E-07-1-1": {
    "goals": [
      "ipo-procedure",
      "ipo-demand"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "ipo-procedure",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-08-0-1": {
    "goals": [
      "ddm-gordon"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "ddm-gordon",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-08-1-1": {
    "goals": [
      "ddm-terminal"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "ddm-terminal",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-09-0-1": {
    "goals": [
      "index-divisor",
      "free-float-weight",
      "free-float-definition"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "index-divisor",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-09-1-1": {
    "goals": [
      "benchmark-tr"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "benchmark-tr",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-10-0-1": {
    "goals": [
      "portfolio-correlation"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "portfolio-correlation",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-10-1-1": {
    "goals": [
      "efficient-frontier"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "efficient-frontier",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-E-11-0-1": {
    "goals": [
      "capm",
      "portfolio-beta"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "capm",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-E-11-1-1": {
    "goals": [
      "sharpe-sortino",
      "drawdown-path"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "sharpe-sortino",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-E-12-0-1": {
    "goals": [
      "ohlc"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "ohlc",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-E-12-0-2": {
    "goals": [
      "backtest-leakage"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "backtest-leakage",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-E-12-1-1": {
    "goals": [
      "dow-axioms",
      "dow-phases"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "dow-axioms",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b07"
  },
  "MC-S2-01-0-1": {
    "goals": [
      "derivative-rights",
      "option-rights"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "derivative-rights",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-01-1-2": {
    "goals": [
      "otc-counterparty"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "otc-counterparty",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-02-0-1": {
    "goals": [
      "futures-liquidity",
      "collateral-vm"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "futures-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-02-1-1": {
    "goals": [
      "basis-roll"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "basis-roll",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-03-0-1": {
    "goals": [
      "reverse-carry"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "reverse-carry",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-03-1-2": {
    "goals": [
      "funding-accounting"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "funding-accounting",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-04-0-1": {
    "goals": [
      "fx-delivery"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "fx-delivery",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-04-1-2": {
    "goals": [
      "fx-option-vs-forward"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "fx-option-vs-forward",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-05-0-2": {
    "goals": [
      "ksu-rights",
      "collateral-haircut"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "ksu-rights",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-05-1-1": {
    "goals": [
      "rate-indicators"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "rate-indicators",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-05-1-2": {
    "goals": [
      "floater-reset"
    ],
    "reveals": [
      "floater-reset"
    ],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "floater-reset",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-06-0-1": {
    "goals": [
      "swap-types",
      "fx-swap-flows"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "swap-types",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-06-0-2": {
    "goals": [
      "irs-fix-credit",
      "irs-residual"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "irs-fix-credit",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-06-1-1": {
    "goals": [
      "asw-structure",
      "asw-residual"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "asw-structure",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-07-0-1": {
    "goals": [
      "volatility-units"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "volatility-units",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-07-0-2": {
    "goals": [
      "cross-hedge"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "cross-hedge",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-07-1-1": {
    "goals": [
      "var-interpretation",
      "var-tail"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "var-interpretation",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-08-0-1": {
    "goals": [
      "hedge-ratio-units"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "hedge-ratio-units",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-08-1-1": {
    "goals": [
      "hedge-effectiveness"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "hedge-effectiveness",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-09-0-1": {
    "goals": [
      "option-rights"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "option-rights",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-09-0-2": {
    "goals": [
      "protective-put"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "protective-put",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-09-1-1": {
    "goals": [
      "option-spreads"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "option-spreads",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b02"
  },
  "MC-S2-09-1-2": {
    "goals": [
      "straddle-cost",
      "option-vega"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "straddle-cost",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-b02"
  },
  "MC-S2-10-0-1": {
    "goals": [
      "put-call-parity",
      "implied-volatility"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "put-call-parity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-10-1-1": {
    "goals": [
      "option-greeks",
      "delta-neutral",
      "option-vega"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "option-greeks",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-10-1-2": {
    "goals": [
      "delta-neutral"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "delta-neutral",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-11-0-1": {
    "goals": [
      "note-budget",
      "note-credit"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "note-budget",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-11-0-2": {
    "goals": [
      "note-exit"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "note-exit",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S2-11-1-1": {
    "goals": [
      "barrier-autocall"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "barrier-autocall",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-10-0-1": {
    "goals": [
      "curve-dv01"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "case",
    "complex": false,
    "family": "curve-dv01",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "MC-S1-10-1-1": {
    "goals": [
      "carry-structure",
      "asw-structure"
    ],
    "reveals": [],
    "sourceGroup": "seminar",
    "taskKind": "knowledge",
    "complex": false,
    "family": "carry-structure",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "RO01": {
    "goals": [
      "regulatory-arbitrage"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "lecture",
    "complex": false,
    "family": "regulatory-arbitrage",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "RO02": {
    "goals": [
      "regulation-supervision"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "lecture",
    "complex": false,
    "family": "regulation-supervision",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "RO03": {
    "goals": [
      "capital-liquidity"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "lecture",
    "complex": false,
    "family": "capital-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "RO07": {
    "goals": [
      "client-firm-risk"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "lecture",
    "complex": false,
    "family": "client-firm-risk",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "Q05": {
    "goals": [
      "convexity"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "convexity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "Q06": {
    "goals": [
      "benchmark-tr"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "benchmark-tr",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "Q07": {
    "goals": [
      "rating-group"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "rating-group",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-3"
  },
  "Q13": {
    "goals": [
      "credit-spread-metrics"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "credit-spread-metrics",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-1"
  },
  "Q14": {
    "goals": [
      "tranche-loss"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "tranche-loss",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-2"
  },
  "Q15": {
    "goals": [
      "rate-indicators"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "rate-indicators",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-4"
  },
  "Q16": {
    "goals": [
      "bond-call"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "bond-call",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-2"
  },
  "BO01": {
    "goals": [
      "bond-price-yield"
    ],
    "reveals": [
      "bond-price-yield"
    ],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "bond-price-yield",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m12-rubric-1"
  },
  "BO02": {
    "goals": [
      "coupon-duration"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "coupon-duration",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "BO05": {
    "goals": [
      "repo-collateral-liquidity"
    ],
    "reveals": [
      "repo-collateral-liquidity"
    ],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "repo-collateral-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m13-rubric-1"
  },
  "V2-034": {
    "goals": [
      "floater-residual"
    ],
    "reveals": [
      "floater-reset"
    ],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "floater-residual",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "EO03": {
    "goals": [
      "equity-dilution"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "equity-dilution",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "EO04": {
    "goals": [
      "equity-total-return",
      "benchmark-tr"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "equity-total-return",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m10-rubric-1"
  },
  "EO05": {
    "goals": [
      "multiples-meaning"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "multiples-meaning",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "EO06": {
    "goals": [
      "sector-concentration"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "sector-concentration",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m11-rubric-1"
  },
  "EO07": {
    "goals": [
      "benchmark-tr",
      "fund-costs"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "benchmark-tr",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m11-rubric-1"
  },
  "EO08": {
    "goals": [
      "investment-liability"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "investment-liability",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m11-rubric-1"
  },
  "S3-005O": {
    "goals": [
      "ddm-gordon"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "ddm-gordon",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m12-rubric-1"
  },
  "S3-006O": {
    "goals": [
      "ddm-terminal"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "ddm-terminal",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m12-rubric-1"
  },
  "S3-009O": {
    "goals": [
      "portfolio-correlation"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "portfolio-correlation",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m13-rubric-1"
  },
  "Q09": {
    "goals": [
      "asw-structure",
      "asw-residual"
    ],
    "reveals": [
      "asw-structure"
    ],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "asw-structure",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "Q10": {
    "goals": [
      "carry-structure",
      "carry-residual"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "carry-structure",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-1"
  },
  "Q11": {
    "goals": [
      "asw-structure"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "asw-structure",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "Q12": {
    "goals": [
      "carry-structure"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "carry-structure",
    "examEligible": true,
    "reviewRevision": "2026-10-26-teacher-1"
  },
  "PO01": {
    "goals": [
      "fx-hedge-direction"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "fx-hedge-direction",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "PO02": {
    "goals": [
      "protective-put"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "protective-put",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "PO04": {
    "goals": [
      "delta-neutral"
    ],
    "reveals": [],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "delta-neutral",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "PO06": {
    "goals": [
      "fx-option-vs-forward"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "fx-option-vs-forward",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "PO07": {
    "goals": [
      "asw-residual"
    ],
    "reveals": [
      "asw-structure"
    ],
    "taskKind": "knowledge",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "asw-residual",
    "examEligible": true,
    "reviewRevision": "2026-10-27-m06-rubric-1"
  },
  "V2-070": {
    "goals": [
      "futures-liquidity"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "futures-liquidity",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  },
  "V2-072": {
    "goals": [
      "cross-hedge"
    ],
    "reveals": [],
    "taskKind": "case",
    "sourceGroup": "seminar",
    "complex": false,
    "family": "cross-hedge",
    "examEligible": true,
    "reviewRevision": "2026-11-01-t33-p2-admission"
  }
};
 function prepare(q){const e=entries[q.id];return e&&!q.reviewRevision?{...q,reviewRevision:e.reviewRevision}:q;}
 function targets(q){return entries[q.id]||{goals:[q.assessmentFamily||q.conceptFamily||q.id],reveals:[]};}
 function compatible(a,b){const x=targets(a),y=targets(b);return !x.goals.some(g=>y.goals.includes(g)||y.reveals.includes(g))&&!y.goals.some(g=>x.reveals.includes(g));}
 root.ExamAdmission={entries,prepare,targets,compatible};
})(globalThis);
