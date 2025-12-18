---
title: "Chasing Shadows: Pitfalls in LLM Security Research"
collection: publications
category: conferences
permalink: /publication/2025-12-10-chasing-shadows
excerpt: "💡 We uncover nine pitfalls in LLM Security research that can compromise the validity of the research."
date: 2025-12-10
venue: "📕 Network and Distributed System Security Symposium 2026 (NDSS'26)"
authors: "✍️ Jonathan Evertz*, Niklas Risse*, Nicolai Neuer, Andreas Müller, Philipp Normann, Gaetano Sapia, Srishti Gupta, David Pape, Soumya Shaw, Devansh Srivastav, Christian Wressnegger, Erwin Quiring, Thorsten Eisenhofer, Daniel Arp, Lea Schönherr"
paperurl: "http://niklasrisse.github.io/files/evertz-2026-chasing-shadows.pdf"
bibtexurl: "http://niklasrisse.github.io/files/evertz-2026-chasing-shadows.bib"
arxivurl: "https://www.arxiv.org/abs/2512.09549"
codeurl: "https://github.com/Dormant-Neurons/llm-pitfalls"
---

Large language models (LLMs) are increasingly prevalent in security research. Their unique characteristics, however, introduce challenges that undermine established paradigms of reproducibility, rigor, and evaluation. Prior work has identified common pitfalls in traditional machine learning research, but these studies predate the advent of LLMs.

In this paper, we identify nine common pitfalls that have become (more) relevant with the emergence of LLMs and that can compromise the validity of research involving them. These pitfalls span the entire computation process, from data collection, pre-training, and fine-tuning to prompting and evaluation.

We assess the prevalence of these pitfalls across all 72 peer-reviewed papers published at leading Security and Software Engineering venues between 2023 and 2024. We find that every paper contains at least one pitfall, and each pitfall appears in multiple papers. Yet only 15.7% of the present pitfalls were explicitly discussed, suggesting that the majority remain unrecognized.

To understand their practical impact, we conduct four empirical case studies showing how individual pitfalls can mislead evaluation, inflate performance, or impair reproducibility. Based on our findings, we offer actionable guidelines to support the community in future work.
