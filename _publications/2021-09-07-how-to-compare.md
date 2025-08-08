---
title: "How to Compare Adversarial Robustness of Classifiers From a Global Perspective"
collection: publications
category: conferences
permalink: /publication/2021-09-07-how-to-compare
excerpt: "💡 An alternative for point-wise measures of adversarial robustness."
date: 2021-09-07
venue: "📕 International Conference on Artificial Neural Networks 2021 (ICANN'21)"
authors: "✍️ Niklas Risse, Christina Göpfert, Jan Philip Göpfert"
paperurl: "http://niklasrisse.github.io/files/risse-2021-how-to-compare.pdf"
bibtexurl: "http://niklasrisse.github.io/files/risse-2021-how-to-compare.bib"
---

Adversarial robustness of machine learning models has attracted considerable attention over recent years.
Adversarial attacks undermine the reliability of and trust in machine learning models, but the construction
of more robust models hinges on a rigorous understanding of adversarial robustness as a property of a given
model. Point-wise measures for specific threat models are currently the most popular tool for comparing the
robustness of classifiers and are used in most recent publications on adversarial robustness. In this work, we use
recently proposed robustness curves to show that point-wise measures fail to capture important global properties
that are essential to reliably compare the robustness of diﬀerent classifiers. We introduce new ways in which
robustness curves can be used to systematically uncover these properties and provide concrete recommendations
for researchers and practitioners when assessing and comparing the robustness of trained models. Furthermore,
we characterize scale as a way to distinguish small and large perturbations, and relate it to inherent properties of
data sets, demonstrating that robustness thresholds must be chosen accordingly. We release code to reproduce all
experiments presented in this paper, which includes a Python module to calculate robustness curves for arbitrary
data sets and classifiers, supporting a number of frameworks, including TensorFlow, PyTorch and JAX.
