# NSE Stock Valuation Calculator

A value investing analysis tool for stocks listed on the Nairobi Securities Exchange (NSE). Enter financial data from annual reports and get an instant valuation assessment based on established value investing principles.

## Features

- **14 Valuation Metrics**: Calculate key metrics including P/E, P/B, ROE, Dividend Yield, Margin of Safety, and more
- **Weighted Scoring System**: Equal-weighted scoring across 8 key metrics with clear buy/hold/sell recommendations
- **Value Investing Alignment**: Based on principles from Benjamin Graham and Warren Buffett
- **Sector-Aware Analysis**: Different thresholds for banks vs non-bank companies
- **Save & Compare**: Save analyses to local storage and compare multiple stocks
- **PDF Export**: Generate professional PDF reports of your analysis
- **Educational Content**: Learn page explaining all metrics and methodology

## Value Investing Methodology

The calculator uses an equal-weighted scoring system (12.5% each) across 8 metrics:

| Metric                   | Positive Threshold | Source         |
| ------------------------ | ------------------ | -------------- |
| P/B Ratio                | < 1.5              | Graham         |
| P/E Ratio                | < 15               | Graham         |
| Margin of Safety         | > 30%              | Graham         |
| ROE                      | > 20%              | Buffett        |
| D/E Ratio                | < 0.5 (non-banks)  | Buffett        |
| Dividend Yield           | > 5%               | Income focus   |
| Payout Ratio             | 30-50%             | Sustainability |
| Earnings Yield vs T-Bill | > 1.5x             | Risk premium   |

See the `/learn` page in the app for detailed methodology and limitations.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19 + SSR)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **PDF Export**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Deployment**: [Vercel](https://vercel.com/) / [Nitro](https://nitro.unjs.io/)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/tindNan/stock-market-valuation-nse.git
cd stock-market-valuation-nse

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build locally
pnpm test     # Run tests
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/)
3. Vercel will auto-detect the framework and configure the build

**Build settings** (auto-detected):

- Build Command: `pnpm build`
- Output Directory: `.output`
- Install Command: `pnpm install`

### Other Platforms

The app builds to a Node.js server. For other platforms:

```bash
# Build the application
pnpm build

# The output is in .output/
# Start the server
node .output/server/index.mjs
```

For different deployment targets, configure the Nitro preset in `vite.config.ts`:

```typescript
nitro({
  preset: 'vercel', // or 'netlify', 'cloudflare', etc.
})
```

See [Nitro deployment docs](https://nitro.unjs.io/deploy) for all available presets.

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/          # Header, Footer
│   ├── ui/              # shadcn/ui components
│   └── ...              # Feature components
├── context/             # React context (ValuationContext)
├── routes/              # TanStack Router file-based routes
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page (calculator)
│   └── learn.tsx        # Educational content
├── types/               # TypeScript types
└── utils/               # Utility functions
    ├── calculations.ts  # Metric calculations
    ├── scoring.ts       # Scoring logic
    └── storage.ts       # LocalStorage helpers
```

## Data Sources

This tool requires manual input of financial data from NSE company annual reports. Key data points needed:

- **From Balance Sheet**: Total Shareholders' Equity, Total Assets, Total Liabilities, Shares Outstanding
- **From Income Statement**: Profit After Tax, Total Revenue
- **From Notes/Dividends**: Dividend Per Share (current and previous year)
- **From Market**: Current Stock Price, 52-week High/Low

Annual reports are typically available on:

- Company investor relations websites
- [NSE website](https://www.nse.co.ke/)
- [African Financials](https://africanfinancials.com/)

## Disclaimer

This tool is for **educational and informational purposes only**. The scoring system:

- Has NOT been backtested against NSE stock returns
- Uses thresholds inspired by Graham/Buffett but not empirically validated for Kenya
- Should NOT be the sole basis for investment decisions

Always consult a qualified financial advisor before making investment decisions.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
