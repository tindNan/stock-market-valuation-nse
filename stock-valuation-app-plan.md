# Stock Valuation Web App - Plan & Requirements

## Project Overview

**Purpose:** A simple, user-friendly web application to help Kenyan investors evaluate whether a stock is worth buying by calculating key valuation metrics from financial statement data.

**Target Users:** Individual retail investors on the Nairobi Securities Exchange (NSE)

**Core Problem Solved:** Translating complex financial statements into actionable buy/hold/sell insights

---

## Features & Requirements

### MVP Features (Phase 1)

| Feature | Description | Priority |
|---------|-------------|----------|
| Manual Data Entry | User inputs key financial figures from annual reports | High |
| Valuation Metrics Calculator | Calculates all key ratios automatically | High |
| Valuation Verdict | Provides a simple recommendation based on metrics | High |
| Visual Dashboard | Charts showing how metrics compare to benchmarks | Medium |
| Export Results | Download analysis as PDF | Medium |

### Future Features (Phase 2)

| Feature | Description | Priority |
|---------|-------------|----------|
| NSE Data Integration | Auto-fetch stock prices from NSE | Medium |
| Historical Comparison | Compare current vs past valuations | Medium |
| Sector Benchmarks | Compare against banking/manufacturing/telco averages | Low |
| Portfolio Tracker | Track multiple stocks you're watching | Low |
| Alerts | Notify when a stock hits your target price | Low |

---

## Data Inputs Required

### From Annual Report (User Enters)

| Input Field | Where to Find It | Example (NCBA 2024) |
|-------------|------------------|---------------------|
| Company Name | Cover page | NCBA Group PLC |
| Financial Year | Cover page | 2024 |
| Total Shareholders' Equity | Statement of Financial Position | KES 109,714,749,000 |
| Shares Outstanding | Notes to accounts / Corporate info | 1,647,519,200 |
| Profit After Tax | Statement of Profit or Loss | KES 21,865,767,000 |
| Total Revenue | Statement of Profit or Loss | KES 57,220,000,000 |
| Total Assets | Statement of Financial Position | KES 666,000,000,000 |
| Total Liabilities | Statement of Financial Position | KES 556,285,251,000 |
| Dividend Per Share | Directors' Report / Dividend section | KES 5.50 |
| Previous Year Dividend | Prior year report | KES 4.75 |

### Market Data (User Enters)

| Input Field | Where to Find It | Example |
|-------------|------------------|---------|
| Current Stock Price | NSE, mystocks.co.ke, rich.co.ke | KES 76.50 |
| 52-Week High | Stock tracking sites | KES 100.00 |
| 52-Week Low | Stock tracking sites | KES 40.00 |

### User Assumptions (For DCF)

| Input Field | Description | Suggested Default |
|-------------|-------------|-------------------|
| Required Rate of Return | Minimum return investor expects | 15% |
| Expected Dividend Growth Rate | How fast dividends will grow | 5% |
| Risk-Free Rate | Treasury bill rate | 10% |

---

## Valuation Formulas

### 1. Book Value Per Share (BVPS)

**Purpose:** Shows the net asset value backing each share

```
BVPS = Total Shareholders' Equity / Shares Outstanding
```

**Example:**
```
BVPS = 109,714,749,000 / 1,647,519,200 = KES 66.60
```

**Interpretation:**
- This is the "floor value" of the stock
- If company liquidated, shareholders would theoretically get this amount per share

---

### 2. Price-to-Book Ratio (P/B)

**Purpose:** Compares market price to book value

```
P/B Ratio = Current Stock Price / Book Value Per Share
```

**Example:**
```
P/B = 76.50 / 66.60 = 1.15x
```

**Interpretation:**
| P/B Range | Signal |
|-----------|--------|
| < 0.8 | Potentially undervalued (or troubled company) |
| 0.8 - 1.2 | Fairly valued |
| 1.2 - 2.0 | Slight premium (growth expected) |
| > 2.0 | Expensive (high growth priced in) |

---

### 3. Earnings Per Share (EPS)

**Purpose:** Shows profit generated per share

```
EPS = Profit After Tax / Shares Outstanding
```

**Example:**
```
EPS = 21,865,767,000 / 1,647,519,200 = KES 13.27
```

---

### 4. Price-to-Earnings Ratio (P/E)

**Purpose:** Shows how many years of earnings you're paying for

```
P/E Ratio = Current Stock Price / Earnings Per Share
```

**Example:**
```
P/E = 76.50 / 13.27 = 5.77x
```

**Interpretation:**
| P/E Range | Signal |
|-----------|--------|
| < 5 | Very cheap (or earnings may decline) |
| 5 - 10 | Reasonably valued |
| 10 - 15 | Fairly valued (moderate growth expected) |
| 15 - 25 | Expensive (high growth expected) |
| > 25 | Very expensive (exceptional growth needed) |

**Sector Benchmarks (Kenya):**
- Banks: 4x - 8x
- Telecoms: 8x - 15x
- Manufacturing: 6x - 12x

---

### 5. Dividend Yield

**Purpose:** Shows cash return on investment

```
Dividend Yield = (Annual Dividend Per Share / Current Stock Price) × 100
```

**Example:**
```
Dividend Yield = (5.50 / 76.50) × 100 = 7.19%
```

**Interpretation:**
| Yield Range | Signal |
|-------------|--------|
| < 2% | Low yield (growth stock) |
| 2% - 5% | Moderate yield |
| 5% - 8% | Good yield (income stock) |
| > 8% | High yield (may be unsustainable or stock fallen) |

**Compare to:**
- Bank savings: 4-6%
- Treasury bills: 10-12%
- Inflation: ~5%

---

### 6. Dividend Payout Ratio

**Purpose:** Shows what portion of profits are paid as dividends

```
Payout Ratio = (Dividend Per Share / Earnings Per Share) × 100
```

**Example:**
```
Payout Ratio = (5.50 / 13.27) × 100 = 41.4%
```

**Interpretation:**
| Payout Range | Signal |
|--------------|--------|
| < 30% | Conservative (reinvesting in growth) |
| 30% - 50% | Balanced approach |
| 50% - 70% | Generous dividend policy |
| > 70% | May be unsustainable long-term |

---

### 7. Return on Equity (ROE)

**Purpose:** Shows how efficiently company uses shareholder capital

```
ROE = (Profit After Tax / Total Shareholders' Equity) × 100
```

**Example:**
```
ROE = (21,865,767,000 / 109,714,749,000) × 100 = 19.93%
```

**Interpretation:**
| ROE Range | Signal |
|-----------|--------|
| < 10% | Poor profitability |
| 10% - 15% | Acceptable |
| 15% - 20% | Good |
| > 20% | Excellent |

---

### 8. Return on Assets (ROA)

**Purpose:** Shows how efficiently company uses all assets

```
ROA = (Profit After Tax / Total Assets) × 100
```

**Example:**
```
ROA = (21,865,767,000 / 666,000,000,000) × 100 = 3.28%
```

**Interpretation (for banks):**
| ROA Range | Signal |
|-----------|--------|
| < 1% | Poor |
| 1% - 2% | Acceptable |
| 2% - 3% | Good |
| > 3% | Excellent |

---

### 9. Debt-to-Equity Ratio

**Purpose:** Shows financial leverage/risk

```
D/E Ratio = Total Liabilities / Total Shareholders' Equity
```

**Example:**
```
D/E = 556,285,251,000 / 109,714,749,000 = 5.07x
```

**Note:** Banks naturally have high D/E ratios (deposits are liabilities). For non-banks:

| D/E Range | Signal |
|-----------|--------|
| < 0.5 | Conservative |
| 0.5 - 1.0 | Moderate |
| 1.0 - 2.0 | Leveraged |
| > 2.0 | Highly leveraged (risky for non-banks) |

---

### 10. Intrinsic Value (Gordon Growth Model)

**Purpose:** Estimates what the stock should be worth based on future dividends

```
Intrinsic Value = D₁ / (r - g)

Where:
D₁ = Next year's expected dividend = Current Dividend × (1 + g)
r = Required rate of return (as decimal)
g = Expected dividend growth rate (as decimal)
```

**Example:**
```
D₁ = 5.50 × (1 + 0.05) = 5.775
Intrinsic Value = 5.775 / (0.15 - 0.05) = KES 57.75
```

**Interpretation:**
- If Intrinsic Value > Current Price → Potentially undervalued (BUY signal)
- If Intrinsic Value < Current Price → Potentially overvalued (HOLD/SELL signal)
- If Intrinsic Value ≈ Current Price → Fairly valued

---

### 11. Margin of Safety

**Purpose:** Shows how much buffer you have if analysis is wrong

```
Margin of Safety = ((Intrinsic Value - Current Price) / Intrinsic Value) × 100
```

**Example (if intrinsic value was KES 90):**
```
Margin of Safety = ((90 - 76.50) / 90) × 100 = 15%
```

**Interpretation:**
| Margin | Signal |
|--------|--------|
| < 0% | Overvalued (negative margin) |
| 0% - 15% | Fairly valued |
| 15% - 30% | Good buying opportunity |
| > 30% | Excellent value (investigate why so cheap) |

---

### 12. Earnings Yield

**Purpose:** Inverse of P/E - shows return on price paid

```
Earnings Yield = (EPS / Current Price) × 100
```

**Example:**
```
Earnings Yield = (13.27 / 76.50) × 100 = 17.3%
```

**Interpretation:**
- Compare to risk-free rate (T-bills)
- If Earnings Yield > T-bill rate → Stock may be attractive
- Higher is better

---

### 13. Dividend Growth Rate (Historical)

**Purpose:** Shows how fast dividends have been growing

```
Dividend Growth Rate = ((Current Dividend / Previous Dividend) - 1) × 100
```

**Example:**
```
Growth = ((5.50 / 4.75) - 1) × 100 = 15.8%
```

---

### 14. PEG Ratio (Price/Earnings to Growth)

**Purpose:** P/E adjusted for growth - better for comparing companies

```
PEG Ratio = P/E Ratio / Earnings Growth Rate
```

**Example (if earnings grew 10%):**
```
PEG = 5.77 / 10 = 0.58
```

**Interpretation:**
| PEG Range | Signal |
|-----------|--------|
| < 1.0 | Undervalued relative to growth |
| 1.0 | Fairly valued |
| > 1.0 | Overvalued relative to growth |

---

## Valuation Verdict Logic

The app will provide a simple verdict based on weighted scoring:

### Scoring System

| Metric | Weight | Scoring Criteria |
|--------|--------|------------------|
| P/B Ratio | 15% | <1.0: +2, 1.0-1.5: +1, 1.5-2.0: 0, >2.0: -1 |
| P/E Ratio | 20% | <8: +2, 8-12: +1, 12-18: 0, >18: -1 |
| Dividend Yield | 15% | >7%: +2, 5-7%: +1, 2-5%: 0, <2%: -1 |
| ROE | 15% | >20%: +2, 15-20%: +1, 10-15%: 0, <10%: -1 |
| Intrinsic vs Price | 20% | >30% margin: +2, 15-30%: +1, 0-15%: 0, <0%: -1 |
| Payout Ratio | 10% | 30-50%: +2, 50-70%: +1, <30% or >70%: 0 |
| Earnings Yield vs T-bill | 5% | >1.5x: +2, 1-1.5x: +1, <1x: -1 |

### Verdict Thresholds

| Total Score | Verdict | Color |
|-------------|---------|-------|
| > 1.5 | STRONG BUY | Green |
| 0.5 to 1.5 | BUY | Light Green |
| -0.5 to 0.5 | HOLD | Yellow |
| -1.5 to -0.5 | SELL | Orange |
| < -1.5 | STRONG SELL | Red |

---

## User Interface Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  📊 NSE Stock Valuation Calculator                          │
│  "Is this stock worth buying?"                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │ INPUT SECTION   │  │ RESULTS DASHBOARD               │  │
│  │                 │  │                                 │  │
│  │ Company Info    │  │  ┌─────────┐ ┌─────────┐       │  │
│  │ [Company Name]  │  │  │ VERDICT │ │ Score   │       │  │
│  │ [Year        ]  │  │  │  BUY    │ │  1.2    │       │  │
│  │                 │  │  └─────────┘ └─────────┘       │  │
│  │ Financial Data  │  │                                 │  │
│  │ [Equity      ]  │  │  Key Metrics                    │  │
│  │ [Shares      ]  │  │  ├── Book Value: KES 66.60     │  │
│  │ [Profit      ]  │  │  ├── P/B Ratio: 1.15x ✓       │  │
│  │ [Dividend    ]  │  │  ├── EPS: KES 13.27           │  │
│  │                 │  │  ├── P/E Ratio: 5.77x ✓       │  │
│  │ Market Data     │  │  ├── Dividend Yield: 7.2% ✓   │  │
│  │ [Stock Price ]  │  │  ├── ROE: 19.9% ✓             │  │
│  │                 │  │  └── Intrinsic Value: KES 58  │  │
│  │ Assumptions     │  │                                 │  │
│  │ [Return Rate ]  │  │  ┌─────────────────────────┐   │  │
│  │ [Growth Rate ]  │  │  │ Valuation Chart         │   │  │
│  │                 │  │  │ [Price vs Book vs       │   │  │
│  │ [CALCULATE]     │  │  │  Intrinsic Value]       │   │  │
│  │                 │  │  └─────────────────────────┘   │  │
│  └─────────────────┘  │                                 │  │
│                       │  [Export PDF] [Save Analysis]   │  │
│                       └─────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ℹ️ Educational tooltips explaining each metric            │
└─────────────────────────────────────────────────────────────┘
```

### Color Scheme

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary (Headers) | Deep Blue | #1E3A5F |
| Positive/Buy | Green | #28A745 |
| Negative/Sell | Red | #DC3545 |
| Neutral/Hold | Amber | #FFC107 |
| Background | Light Gray | #F8F9FA |
| Cards | White | #FFFFFF |

---

## Technical Architecture

### Option A: Single HTML File (Simplest)

```
stock-valuation-app.html
├── HTML structure
├── CSS styles (embedded)
└── JavaScript logic (embedded)
```

**Pros:** Easy to share, no server needed, works offline
**Cons:** Limited features, no data persistence

### Option B: React Application (Recommended for MVP)

```
stock-valuation-app/
├── index.html
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── InputForm.jsx
│   │   ├── ResultsDashboard.jsx
│   │   ├── ValuationChart.jsx
│   │   ├── VerdictCard.jsx
│   │   └── MetricCard.jsx
│   ├── utils/
│   │   └── calculations.js
│   └── styles/
│       └── app.css
└── package.json
```

**Pros:** Better UX, reusable components, easier to extend
**Cons:** Requires build step

### Option C: With Backend (Future)

```
├── frontend/ (React)
├── backend/ (Python/Node)
│   └── api/
│       ├── nse-scraper.py
│       └── pdf-generator.py
└── database/ (PostgreSQL)
```

---

## Development Phases

### Phase 1: MVP (Week 1-2)
- [ ] Basic input form
- [ ] All 14 formulas implemented
- [ ] Results display with verdict
- [ ] Simple bar chart comparison
- [ ] Mobile responsive design

### Phase 2: Enhanced UX (Week 3-4)
- [ ] Educational tooltips
- [ ] Input validation
- [ ] Save to local storage
- [ ] PDF export
- [ ] Sector benchmark selection

### Phase 3: Data Integration (Week 5-8)
- [ ] NSE price API integration
- [ ] Historical data storage
- [ ] Comparison across time periods
- [ ] Multiple stock comparison

---

## Sample Test Cases

### Test Case 1: NCBA Group 2024

**Inputs:**
- Shareholders' Equity: 109,714,749,000
- Shares Outstanding: 1,647,519,200
- Profit After Tax: 21,865,767,000
- Dividend Per Share: 5.50
- Current Stock Price: 76.50
- Required Return: 15%
- Growth Rate: 5%

**Expected Outputs:**
- BVPS: KES 66.60
- P/B: 1.15x
- EPS: KES 13.27
- P/E: 5.77x
- Dividend Yield: 7.19%
- ROE: 19.93%
- Intrinsic Value: ~KES 57.75
- Verdict: BUY (score ~1.0)

### Test Case 2: Overvalued Stock (Hypothetical)

**Inputs:**
- Stock Price: 150
- Book Value: 50
- EPS: 5
- Dividend: 1

**Expected Outputs:**
- P/B: 3.0x (expensive)
- P/E: 30x (expensive)
- Dividend Yield: 0.67% (low)
- Verdict: SELL

---

## Risk Disclaimers (To Include in App)

```
⚠️ IMPORTANT DISCLAIMERS:

1. This tool provides educational analysis only and should not be 
   considered as professional financial advice.

2. Past performance does not guarantee future results. Stock prices 
   can go down as well as up.

3. The valuations are based on user-provided inputs. Errors in data 
   entry will produce incorrect results.

4. Intrinsic value calculations depend heavily on assumptions about 
   future growth rates and required returns.

5. Always conduct your own research and consider consulting a 
   licensed investment advisor before making investment decisions.

6. The developers of this tool are not liable for any investment 
   losses incurred based on its outputs.
```

---

## Next Steps

1. **Review this plan** - Confirm features and formulas are correct
2. **Choose architecture** - Single HTML vs React app
3. **Build MVP** - Start with core calculator functionality
4. **Test with real data** - Use NCBA and 2-3 other NSE stocks
5. **Iterate based on feedback** - Add features as needed

---

## Questions for You

1. Do you want a **single HTML file** (simpler, works offline) or a **React app** (more polished, easier to extend)?

2. Should the app include **sector-specific benchmarks** (banks vs manufacturing vs telco)?

3. Do you want **dark mode** option?

4. Should we add a **"Quick Fill" feature** with pre-loaded data for common NSE stocks?

5. Any additional metrics you'd like included?

---

*Document Version: 1.0*
*Created: December 2025*
*For: NSE Stock Valuation Web App*
