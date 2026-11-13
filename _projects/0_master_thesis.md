---
layout: page
title: "Master's Thesis"
description: "Counterparty Risk in a CDS Portfolio: CVA, Netting and Contagion. Sapienza University of Rome, October 2026."
img: assets/img/projects/thesis_cover.png
importance: 0
category: Academic Projects
chart:
  plotly: true
toc:
  sidebar: left
---

<p class="proj-lead">
Buy protection on a company through a credit default swap, and the seller can default before the contract ends. If it does, you lose the protection exactly when it has become more valuable, and the loss is worse if the seller's default is itself what pushed the company's credit spread up. This is wrong-way risk, and the thesis measures how much of it a model with contagion between defaults adds to the credit value adjustment (CVA) of a portfolio of CDS, and how it changes what netting the portfolio is worth.
</p>

<div class="proj-stats">
  <div class="proj-stat"><b>+150.5%</b><span>CVA with contagion against the same model without it, protection bought on two names</span></div>
  <div class="proj-stat"><b>+412.4%</b><span>when loss rates also rise with each default</span></div>
  <div class="proj-stat"><b>26.6% → 7.5%</b><span>share of the gross CVA that netting removes, for that portfolio</span></div>
  <div class="proj-stat"><b>110/110</b><span>with honors, defended on 19 October 2026</span></div>
</div>

<p class="proj-meta">Master's thesis, Master's Degree in Finance and Insurance, Sapienza University of Rome. Advisor: Prof. Claudia Ceci. Python, LaTeX.</p>

## The question

The CVA is the value today of the loss that arises when the counterparty defaults while the contract is worth something to you. The usual shortcut treats the exposure and the default as independent, and it needs only the law of the counterparty's default time and the expected exposure. It is easy to evaluate and, under wrong-way risk, it understates the adjustment by an amount that depends on the model that generates the dependence. The thesis takes one such model, that of Bo and Ceci (2020), and asks two things: how much contagion changes the CVA of a CDS portfolio against the same model without contagion, and how it changes the reduction obtained by netting the portfolio.

## A model where defaults hit the survivors

There are N reference names and the counterparty, each with a default intensity that follows a square-root (CIR-type) diffusion. The names interact in two ways: through the drift and volatility, which depend on the whole vector of intensities, and through contagion. When name j defaults, the intensities of the survivors jump as a block:

$$X(\tau_j) = X(\tau_j^-) + w_j$$

where $$w_{ij}$$ is how much the default of $$j$$ raises the intensity of $$i$$. The price of a claim then solves a recursive system of Cauchy problems over the $$2^{N+1}$$ default states, with the solutions after a default read at the shifted intensities. The experiments use a contagion matrix in three blocks: $$w_E$$, the effect of the counterparty's default on the reference names, which is the one that reaches the exposure; $$w_C$$, the effect of a reference default on the counterparty; and $$w_I$$, contagion between the reference names.

```plotly
{"data":[{"type":"heatmap","z":[[0,3,1],[3,0,1],[2,2,0]],"x":["name 1","name 2","counterparty"],"y":["name 1","name 2","counterparty"],"showscale":false,"colorscale":[[0,"rgba(128,128,128,0.10)"],[0.25,"rgba(128,128,128,0.10)"],[0.25,"#2f7de1"],[0.5,"#2f7de1"],[0.5,"#e8890c"],[0.75,"#e8890c"],[0.75,"#2f9e6e"],[1,"#2f9e6e"]],"zmin":0,"zmax":3,"xgap":4,"ygap":4,"customdata":[[0,0.006,0.01],[0.005,0,0.009],[0.008,0.007,0]],"hovertemplate":"default of %{x} raises the intensity of %{y} by %{customdata}<extra></extra>"}],"layout":{"paper_bgcolor":"rgba(0,0,0,0)","plot_bgcolor":"rgba(0,0,0,0)","margin":{"l":100,"r":14,"t":20,"b":56},"height":320,"showlegend":false,"xaxis":{"title":{"text":"defaulting name j"},"showgrid":false},"yaxis":{"title":{"text":"impacted name i"},"autorange":"reversed","showgrid":false},"annotations":[{"x":"name 1","y":"name 1","showarrow":false,"text":"","font":{"size":14,"color":"#ffffff"}},{"x":"name 2","y":"name 1","showarrow":false,"text":"<b>0.006</b><br><span style='font-size:11px'>w<sub>I</sub></span>","font":{"size":14,"color":"#ffffff"}},{"x":"counterparty","y":"name 1","showarrow":false,"text":"<b>0.010</b><br><span style='font-size:11px'>w<sub>E</sub></span>","font":{"size":14,"color":"#ffffff"}},{"x":"name 1","y":"name 2","showarrow":false,"text":"<b>0.005</b><br><span style='font-size:11px'>w<sub>I</sub></span>","font":{"size":14,"color":"#ffffff"}},{"x":"name 2","y":"name 2","showarrow":false,"text":"","font":{"size":14,"color":"#ffffff"}},{"x":"counterparty","y":"name 2","showarrow":false,"text":"<b>0.009</b><br><span style='font-size:11px'>w<sub>E</sub></span>","font":{"size":14,"color":"#ffffff"}},{"x":"name 1","y":"counterparty","showarrow":false,"text":"<b>0.008</b><br><span style='font-size:11px'>w<sub>C</sub></span>","font":{"size":14,"color":"#ffffff"}},{"x":"name 2","y":"counterparty","showarrow":false,"text":"<b>0.007</b><br><span style='font-size:11px'>w<sub>C</sub></span>","font":{"size":14,"color":"#ffffff"}},{"x":"counterparty","y":"counterparty","showarrow":false,"text":"","font":{"size":14,"color":"#ffffff"}}]},"narrow":{"layout":{"margin":{"l":84,"r":4,"t":10,"b":50}}}}
```

<div class="caption">The reference contagion matrix at \(N = 2\): entry (i, j) is the jump in the intensity of name i when name j defaults. The default of the counterparty raises the intensity of name 1 by half its long-run level.</div>

## Solving it numerically

For $$N = 1$$ the prices have closed forms. For $$N = 2$$ I solve the systems with an explicit finite-difference scheme built on the positive-coefficient condition of Forsyth and Labahn, prove its monotonicity under a bound on the time step, and measure its error, since the convergence results in the literature do not cover this scheme. Each time step advances every default state together, reading the solution at the next state through the contagion shift.

```python
def march_step(values, z_list, extra_source, kill, coeffs, shift_cache, mesh, dtau):
    """One explicit Euler step in tau = T - t, using the OLD values everywhere."""
    new_values = {}
    for z in z_list:
        succ = np.zeros(mesh[0].shape)
        for j in alive_names(z):
            # after name j defaults the intensities are shifted by the contagion weights w_j:
            # read the next state's solution at x + w_j
            succ = succ + apply_shift(values[default_of(z, j)], shift_cache[j]) * mesh[j]
        diff = apply_diffusion(values[z], coeffs)
        new_values[z] = values[z] + dtau * (diff - kill[z] * values[z] + succ + extra_source(z))
    return new_values


# the exposure at the counterparty's default: netted, or contract by contract
total = sum(b[i] * apply_shift(F[(i, zN)], shift_cache[n - 1]) for i in alive_reference_names)
netted_payoff = np.maximum(total, 0.0)                      # the positive part acts on the netting set
gross_payoff = sum(np.maximum(b[i] * apply_shift(F[(i, zN)], shift_cache[n - 1]), 0.0)
                   for i in alive_reference_names)          # ... or on each contract
```

I validated the scheme before using it: at zero contagion it collapses to the independence formula, the CVA converges under grid refinement, at $$N = 1$$ it matches the closed forms and a Monte Carlo simulation, and at $$N = 2$$ eight Monte Carlo estimates lie within 1.6 standard errors of the finite-difference values.

## What contagion does to the CVA

For protection bought from the counterparty on both reference names, contagion alone takes the CVA from 3.12 bp to 7.81 bp, a rise of 150.5%. Loss rates that depend on the default state, with independent default times, raise it by 168.3%, and the two channels together by 412.4%, more than the sum of the two taken separately, because contagion raises the probability that a name defaults and the state-dependent loss rate raises what is lost when it does.

```plotly
{"data":[{"type":"bar","name":"protection bought on both names","x":["no contagion,<br>constant loss rates","contagion,<br>constant loss rates","state-dependent<br>loss rates only","both<br>channels"],"y":[3.1188,7.8133,8.3679,15.9817],"text":["3.12","7.81<br>+150.5%","8.37<br>+168.3%","15.98<br>+412.4%"],"textposition":"outside","marker":{"color":"#2f7de1"},"cliponaxis":false,"hovertemplate":"%{y:.4f} bp<extra>bought on both</extra>"},{"type":"bar","name":"bought on one, sold on the other","x":["no contagion,<br>constant loss rates","contagion,<br>constant loss rates","state-dependent<br>loss rates only","both<br>channels"],"y":[3.0833,3.3554,3.1763,3.6369],"text":["3.08","3.36<br>+8.8%","3.18<br>+3.0%","3.64<br>+18.0%"],"textposition":"outside","marker":{"color":"#e8890c"},"cliponaxis":false,"hovertemplate":"%{y:.4f} bp<extra>bought on one, sold on the other</extra>"}],"layout":{"paper_bgcolor":"rgba(0,0,0,0)","plot_bgcolor":"rgba(0,0,0,0)","margin":{"l":56,"r":12,"t":46,"b":70},"height":400,"barmode":"group","bargap":0.25,"legend":{"orientation":"h","x":0,"y":1.02,"yanchor":"bottom"},"yaxis":{"title":{"text":"CVA, basis points"},"range":[0,19]},"bargroupgap":0.06},"narrow":{"data":[{"constraintext":"none","textfont":{"size":10}},{"constraintext":"none","textfont":{"size":10}}],"layout":{"margin":{"l":44,"r":4,"t":64,"b":76},"legend":{"y":1.06},"xaxis":{"tickangle":0,"tickfont":{"size":10},"tickmode":"array","tickvals":[0,1,2,3],"ticktext":["no contagion,<br>constant<br>loss rates","contagion,<br>constant<br>loss rates","state-<br>dependent<br>loss rates","both<br>channels"]}}}}
```

<div class="caption">CVA of the two portfolios under four configurations, in basis points, with the change against the first configuration.</div>

When protection is bought on one name and sold on the other the effect is much smaller (+8.8% for contagion alone): the jump at the counterparty's default raises both prices, and in the netted exposure the second contract enters with a negative sign, so the two increases largely offset. Almost all of the effect for the first portfolio comes from the block $$w_E$$, which is the one that moves the intensities at the counterparty's default: of the 4.69 bp that the matrix adds, $$w_E$$ alone adds 4.42.

```plotly
{"data":[{"type":"scatter","mode":"lines+markers","name":"bought on both names","x":[0,0.5,1,1.5,2,2.5,3],"y":[3.13,5.1147,7.8039,11.1235,14.7695,18.5186,22.2846],"line":{"color":"#2f7de1","width":3},"marker":{"size":8},"hovertemplate":"\u03b7 = %{x}: %{y:.4f} bp<extra>bought on both</extra>"},{"type":"scatter","mode":"lines+markers","name":"bought on one, sold on the other","x":[0,0.5,1,1.5,2,2.5,3],"y":[3.0998,3.2167,3.3702,3.5588,3.7801,4.0239,4.2813],"line":{"color":"#e8890c","width":3},"marker":{"size":8},"hovertemplate":"\u03b7 = %{x}: %{y:.4f} bp<extra>bought on one, sold on the other</extra>"}],"layout":{"paper_bgcolor":"rgba(0,0,0,0)","plot_bgcolor":"rgba(0,0,0,0)","margin":{"l":56,"r":12,"t":44,"b":50},"height":360,"legend":{"orientation":"h","x":0,"y":1.02,"yanchor":"bottom"},"xaxis":{"title":{"text":"scale \u03b7 of the contagion matrix, w = \u03b7\u00b7w\u0304"}},"yaxis":{"title":{"text":"CVA, basis points"},"rangemode":"tozero"}},"narrow":{"layout":{"margin":{"l":44,"r":8,"t":56,"b":50}}}}
```

<div class="caption">CVA as the whole contagion matrix is scaled by η, at constant loss rates. Both curves are non-decreasing on the grid computed. The seven points share one grid, on a wider box than the one behind the bars above, which is why η = 1 reads 7.80 bp here and 7.81 there.</div>

## What it does to netting

Netting removes part of the CVA: the netted adjustment sits below the gross one, computed contract by contract, and the two differ only where the values of the contracts have opposite signs. Without contagion the two contracts are independent and each takes both signs, so netting removes 26.6% of the gross CVA for one portfolio and 28.5% for the other. Contagion moves the two values together: for the portfolio bought on both names towards a common positive sign, and the reduction falls to 7.5%; for the other towards opposite signs, and it rises to 33.5%.

```plotly
{"data":[{"type":"bar","name":"gross, contract by contract","x":["both names,<br>no contagion","both names,<br>contagion","one bought, one sold,<br>no contagion","one bought, one sold,<br>contagion"],"y":[4.2506,8.4462,4.3128,5.044],"marker":{"color":"rgba(138,143,152,0.75)"},"text":["4.25","8.45","4.31","5.04"],"textposition":"outside","cliponaxis":false,"hovertemplate":"%{y:.4f} bp<extra>gross</extra>"},{"type":"bar","name":"netted","x":["both names,<br>no contagion","both names,<br>contagion","one bought, one sold,<br>no contagion","one bought, one sold,<br>contagion"],"y":[3.1188,7.8133,3.0833,3.3554],"marker":{"color":"#2f7de1"},"text":["3.12","7.81","3.08","3.36"],"textposition":"outside","cliponaxis":false,"hovertemplate":"%{y:.4f} bp<extra>netted</extra>"}],"layout":{"paper_bgcolor":"rgba(0,0,0,0)","plot_bgcolor":"rgba(0,0,0,0)","margin":{"l":56,"r":12,"t":50,"b":70},"height":400,"barmode":"group","bargap":0.3,"legend":{"orientation":"h","x":0,"y":1.02,"yanchor":"bottom"},"yaxis":{"title":{"text":"CVA, basis points"},"range":[0,10.5]},"annotations":[{"x":"both names,<br>no contagion","y":5.3506,"text":"netting removes 26.6%","showarrow":false,"font":{"size":12}},{"x":"both names,<br>contagion","y":9.546199999999999,"text":"netting removes 7.5%","showarrow":false,"font":{"size":12}},{"x":"one bought, one sold,<br>no contagion","y":5.412800000000001,"text":"netting removes 28.5%","showarrow":false,"font":{"size":12}},{"x":"one bought, one sold,<br>contagion","y":6.144,"text":"netting removes 33.5%","showarrow":false,"font":{"size":12}}],"bargroupgap":0.06},"narrow":{"data":[{"constraintext":"none","textfont":{"size":10}},{"constraintext":"none","textfont":{"size":10}}],"layout":{"margin":{"l":44,"r":4,"t":50,"b":76},"xaxis":{"tickangle":0,"tickfont":{"size":10},"tickmode":"array","tickvals":[0,1,2,3],"ticktext":["both names,<br>no contagion","both names,<br>contagion","one bought,<br>one sold,<br>no contagion","one bought,<br>one sold,<br>contagion"]},"annotations":[{"text":"removes<br>26.6%","font":{"size":10},"y":4.85,"yanchor":"bottom"},{"text":"removes<br>7.5%","font":{"size":10},"y":9.05,"yanchor":"bottom"},{"text":"removes<br>28.5%","font":{"size":10},"y":4.91,"yanchor":"bottom"},{"text":"removes<br>33.5%","font":{"size":10},"y":5.64,"yanchor":"bottom"}]}}}
```

<div class="caption">Netted and gross CVA, with and without contagion, constant loss rates, and the share of the gross CVA that netting removes.</div>

## What the results establish

At one reference name the direction of the effect is a theorem: the CVA of a bought position is non-decreasing in the weight by which the counterparty's default raises the intensity of the reference name. At two names the size is computed, for one contagion matrix and one portfolio at a time, so the direction there is a property of the configurations I ran. The model is stated for any number of names and solved for one and two. The parameters are illustrative: no market data are used, calibration is not treated, and the explicit scheme becomes expensive beyond two names, where a different method would be needed.

Beyond the reference paper, the thesis derives the Cauchy problem of the adjustment from its definition, compares the netted adjustment with the gross one, proves the direction of the contagion effect at one name, treats the case without contagion as the benchmark, and solves the systems numerically.

<div class="row mt-4">
  <div class="col-sm text-center">
    <a href="{{ '/assets/pdf/tronelli_master_thesis.pdf' | relative_url }}" class="btn z-depth-0 m-1" style="background-color: var(--global-theme-color); color: white;" target="_blank">Thesis (PDF)</a>
    <a href="{{ '/assets/pdf/tronelli_thesis_defence_slides.pdf' | relative_url }}" class="btn z-depth-0 m-1" style="background-color: var(--global-theme-color); color: white;" target="_blank">Defence slides (PDF)</a>
  </div>
</div>
