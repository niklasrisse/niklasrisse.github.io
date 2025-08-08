---
title: "Top Score on the Wrong Exam: On Benchmarking in Machine Learning for Vulnerability Detection"
collection: publications
category: conferences
permalink: /publication/2025-06-22-top-score-wrong-exam
excerpt: "The most prevalent problem statement of ML4VD as function-level binary classification problem is ill-defined."
date: 2025-06-22
venue: "ACM SIGSOFT International Symposium on Software Testing and Analysis 2025 (ISSTA'25)"
paperurl: "http://niklasrisse.github.io/files/risse-2025-top-score-wrong-exam.pdf"
bibtexurl: "http://niklasrisse.github.io/files/risse-2025-top-score-wrong-exam.bib"
---

According to our survey of machine learning for vulnerability detection (ML4VD), 9 in every 10 papers published in the past five years define ML4VD as a function-level binary classification problem:

Given a function, does it contain a security flaw?

From our experience as security researchers, faced with deciding whether a given function makes the program vulnerable to attacks, we would often first want to understand the context in which this function is called.

In this paper, we study how often this decision can really be made without further context and study both vulnerable and non-vulnerable functions in the most popular ML4VD datasets. We call a function "vulnerable" if it was involved in a patch of an actual security flaw and confirmed to cause the program's vulnerability. It is "non-vulnerable" otherwise. We find that in almost all cases this decision cannot be made without further context. Vulnerable functions are often vulnerable only because a corresponding vulnerability-inducing calling context exists while non-vulnerable functions would often be vulnerable if a corresponding context existed.

But why do ML4VD techniques achieve high scores even though there is demonstrably not enough information in these samples? Spurious correlations: We find that high scores can be achieved even when only word counts are available. This shows that these datasets can be exploited to achieve high scores without actually detecting any security vulnerabilities.

We conclude that the prevailing problem statement of ML4VD is ill-defined and call into question the internal validity of this growing body of work. Constructively, we call for more effective benchmarking methodologies to evaluate the true capabilities of ML4VD, propose alternative problem statements, and examine broader implications for the evaluation of machine learning and programming analysis research.
