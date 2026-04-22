---
layout: page
title: SOFR OIS Yield Curve Construction
description: A full pipeline to construct the SOFR OIS zero-coupon yield curve using Python.
img: 
importance: 1
category: Academic Projects
---

Designed and implemented a full pipeline to construct the SOFR OIS zero-coupon yield curve from par swap rates.

- Developed a numerical bootstrapping framework to recover discount factors, via a bisection root-finding algorithm.
- Derived zero rates and constructed a smooth, arbitrage-free term structure using log-linear interpolation.
- Implemented the complete calibration and visualization workflow in Python (**rateslib**).
