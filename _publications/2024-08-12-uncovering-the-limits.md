---
title: "Uncovering the Limits of Machine Learning for Automatic Vulnerability Detection"
collection: publications
category: conferences
permalink: /publication/2024-08-12-uncovering-the-limits
excerpt: "💡 Are machine learning models for vulnerability detection as good as they seem?"
date: 2024-08-12
venue: "📕 USENIX Security Symposium 2024 (USENIX Sec'24)"
authors: "✍️ Niklas Risse, Marcel Böhme"
paperurl: "http://niklasrisse.github.io/files/risse-2024-uncovering-the-limits.pdf"
bibtexurl: "http://niklasrisse.github.io/files/risse-2024-uncovering-the-limits.bib"
arxivurl: "https://arxiv.org/abs/2306.17193"
codeurl: "https://github.com/niklasrisse/USENIX_2024"
dataseturl: "https://github.com/niklasrisse/VPP"
---

Recent results of machine learning for automatic vulnerability detection (ML4VD) have been very promising. Given only the source code of a function f, ML4VD techniques can decide if f contains a security flaw with up to 70% accuracy. However, as evident in our own experiments, the same top-performing models are unable to distinguish between functions that contain a vulnerability and functions where the vulnerability is patched. So, how can we explain this contradiction and how can we improve the way we evaluate ML4VD techniques to get a better picture of their actual capabilities?

In this paper, we identify overfitting to unrelated features and out-of-distribution generalization as two problems, which are not captured by the traditional approach of evaluating ML4VD techniques. As a remedy, we propose a novel benchmarking methodology to help researchers better evaluate the true capabilities and limits of ML4VD techniques. Specifically, we propose (i) to augment the training and validation dataset according to our cross-validation algorithm, where a semantic preserving transformation is applied during the augmentation of either the training set or the testing set, and (ii) to augment the testing set with code snippets where the vulnerabilities are patched.

Using six ML4VD techniques and two datasets, we find (a) that state-of-the-art models severely overfit to unrelated features for predicting the vulnerabilities in the testing data, (b) that the performance gained by data augmentation does not generalize beyond the specific augmentations applied during training, and (c) that state-of-the-art ML4VD techniques are unable to distinguish vulnerable functions from their patches.
