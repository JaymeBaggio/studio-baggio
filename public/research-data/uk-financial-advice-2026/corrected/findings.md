# Corrected UK firm-selection findings

Status: local review edition. Not published.

Evidence base: 25 demand-informed, pre-defined UK firm-selection questions, three providers, three fresh runs per question, 225 valid observations. The five matched local questions are reported separately from the 20 national questions.

## Executive findings

1. **An explicit request for firms still did not always produce a shortlist.** Candidate firms or advisers appeared in 134 of 180 national answers. The remaining 46 answers gave guidance, directories or authorities without selecting a candidate, even though every prompt explicitly asked for firms.

2. **The answer depends heavily on the provider.** Across all 75 answers per provider, OpenAI selected at least one candidate in 47, Gemini in 64 and Perplexity in 67. OpenAI produced a median of three candidates per answer; Gemini and Perplexity produced a median of six. A raw name count would therefore favour engines that write longer lists.

3. **The constructed 150-firm panel captures only part of the market surfaced by AI.** The national answers contained 303 distinct candidate entities: 68 from the panel and 235 outside it. Outside-panel candidates received 57.4% of normalized national shortlist mass. The corrected edition therefore shows open-universe and panel views separately.

4. **There is no stable national league table.** Fifteen of the 25 questions had no candidate shared by all three providers. Evelyn Partners, The Private Office, Hargreaves Lansdown Financial Advice and St. James's Place appeared somewhere in all four national families. Leave-one-engine-out and leave-one-family-out tests materially changed the order, so the report uses breadth tiers and family shortlists rather than a precise 1-to-150 rank. A prior draft also listed Nephos Group, but that result is withdrawn: the semantic review merged the non-adviser `Nephos Group` umbrella with the separate `Nephos Wealth Limited` legal entity.

5. **Selection is scenario-specific.** The Private Office had the strongest normalized shortlist share in core adviser choice; Evelyn Partners in wealth; Hargreaves Lansdown Financial Advice in pensions; and Churchill Wealth Management in life events. Several family leaders were outside the constructed panel, including DGS Chartered Financial Planners, Grove Pension Solutions, Churchill Wealth Management and Centurion Chartered Financial Planners.

6. **Pension questions were least likely to produce firms.** Only 21 of 45 pension answers selected a candidate, compared with 33 of 45 core answers and 40 of 45 answers in both wealth and life events. Some pension prompts produced guidance or authority-led answers despite explicitly requesting a firm.

7. **Most candidate visibility was narrow or one-off.** Of the 303 national candidate entities, 179 appeared only as one-off selections. Seventy-one had repeat-confirmed selection within one specialist family, 34 reached more than one family, and 19 met the broad repeat-confirmed tier. A single appearance should not be presented as durable visibility.

8. **Recommendation, mention and citation are different signals.** The semantic review verified 1,353 candidate occurrences. A candidate's own domain was cited in 407 occurrences (30.1%), while recoverable sentence-level source support for the selection claim was present in 795 (58.8%). A cited site does not itself prove that its firm was selected, and a selected firm may be supported by a third-party source.

9. **Directories and authorities are core infrastructure in the answer ecosystem.** Unbiased appeared in 162 of 225 answers, the FCA in 158, VouchedFor in 143 and MoneyHelper in 68. These services often shaped the route to an answer, but their presence must not be counted as a firm recommendation.

10. **Local discovery is a distinct market.** The five matched city questions selected candidates in 44 of 45 answers and surfaced 188 distinct candidate entities. Outside-panel candidates held 76.7% of normalized local shortlist mass. The strongest normalized local result varied by city: Holden & Partners in London, Landmark Financial Planning in Manchester, Executive Wealth Services in Edinburgh, St. James's Place in Cardiff and Newbridge Financial Planning in Belfast.

## Commercial interpretation for Studio Baggio

- A credible audit must test the exact buying scenarios a firm is eligible to serve. A broad visibility score obscures service fit, client minimums, permissions and geography.
- Firms need both candidate-selection visibility and evidence authority. These are separate jobs and should be diagnosed separately.
- Directory and professional-body profiles are distribution channels, but directory presence alone does not guarantee that the firm becomes a candidate.
- Family and question-level gaps are more actionable than a universal rank. They show where a firm is absent from relevant consideration sets and which entities repeatedly occupy them.
- Outside-panel discovery matters commercially. Competitor monitoring should remain open-universe rather than stopping at a preselected list of large or familiar firms.
- Repeatability is the practical test of visibility. One-off appearances should be treated as weak signals until they recur within the same question and provider.

## Limits

These findings describe the exact dated API capture, prompts, models and eligibility rules used in this study. They do not measure adviser quality, suitability, market share, consumer-interface behaviour or every UK buyer prompt. Search-language evidence is a proxy for AI-question demand. The eligibility registry contains verified eligible cells and explicit unknowns, so opportunity-adjusted results are partial rather than a complete view of all 150 firms.
