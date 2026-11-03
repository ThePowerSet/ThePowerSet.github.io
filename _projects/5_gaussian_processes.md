---
layout: page
title: "Gaussian Processes"
description: "Experiments on model selection with additive and ANOVA Gaussian processes: the kernels, the data generators and the runs on a cluster."
img: assets/img/projects/gaussian_processes_cover.png
importance: 7
category: Academic Projects
chart:
  plotly: true
toc:
  sidebar: left
---

<p class="proj-lead">
Given a response and a few inputs, which inputs matter, and which interactions between them? In this research collaboration with Dr Francesca Panero and Dr Sahoko Ishida, my work was to build the architecture to try to answer that question experimentally: the kernels, the data generators, the experiment scripts and their runs on the university cluster.
</p>

<div class="proj-stats">
  <div class="proj-stat"><b>9</b><span>candidate structures for the same data, from main effects only to the saturated model</span></div>
  <div class="proj-stat"><b>9 × 9</b><span>true structures against candidate structures in the experiment scripts</span></div>
  <div class="proj-stat"><b>8,000</b><span>training points in each fit, with a sparse Gaussian process</span></div>
  <div class="proj-stat"><b>SLURM</b><span>experiments run as batch jobs on the Sapienza HPC cluster</span></div>
</div>

<p class="proj-meta">Research collaboration alongside the degree, March to December 2025. Python, GPflow, TensorFlow, SLURM.</p>

## What it was about

Suppose a response depends on three inputs, and we want to know which of them matter and which interact. The approach puts that question into the kernel of a Gaussian process:

1. Write the response as a constant, plus an effect for each input, plus possibly interaction effects between inputs.
2. Give each piece its own term in the kernel. Every choice of terms is a candidate structure, a different model of the same data.
3. Fit the candidates to the same data and compare them through the evidence lower bound (ELBO) of a sparse Gaussian process: that comparison is how the method is meant to tell which inputs and interactions matter.

With three inputs there are nine natural candidates, from main effects only to the one with every interaction. The chart shows the terms they are built from, the constant at the bottom and the three-way interaction at the top. Pick a structure to see which terms it keeps.

```plotly
{"data":[{"type":"scatter","mode":"lines","x":[0,-1,null,0,0,null,0,1,null,-1,-1,null,-1,0,null,0,-1,null,0,1,null,1,0,null,1,1,null,-1,0,null,0,0,null,1,0,null],"y":[0,1,null,0,1,null,0,1,null,1,2,null,1,2,null,1,2,null,1,2,null,1,2,null,1,2,null,2,3,null,2,3,null,2,3,null],"line":{"color":"rgba(128,128,128,0.45)","width":1.6},"hoverinfo":"skip"},{"type":"scatter","mode":"markers+text","x":[0,-1,0,1,-1,0,1,0],"y":[0,1,1,1,2,2,2,3],"text":["0","1","2","3","12","13","23","123"],"textposition":"middle center","textfont":{"size":15,"color":["#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#ffffff","#8a8f98","#8a8f98"]},"marker":{"size":46,"color":["#2f7de1","#2f7de1","#2f7de1","#2f7de1","rgba(128,128,128,0.16)","#e8890c","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)"],"line":{"width":0}},"hovertext":["constant","effect of input 1","effect of input 2","effect of input 3","interaction of inputs 1 and 2","interaction of inputs 1 and 3","interaction of inputs 2 and 3","three-way interaction"],"hoverinfo":"text"}],"layout":{"paper_bgcolor":"rgba(0,0,0,0)","plot_bgcolor":"rgba(0,0,0,0)","margin":{"l":10,"r":10,"t":100,"b":14},"height":440,"showlegend":false,"xaxis":{"visible":false,"range":[-3.1,1.5]},"yaxis":{"visible":false,"range":[-0.55,3.55]},"annotations":[{"x":0,"y":1.04,"xref":"paper","yref":"paper","xanchor":"left","yanchor":"bottom","showarrow":false,"text":"structure 3: main effects and the interaction of 1 and 3","font":{"size":14}},{"x":-1.35,"y":0,"xref":"x","yref":"y","xanchor":"right","showarrow":false,"text":"constant","font":{"size":13,"color":"#8a8f98"}},{"x":-1.35,"y":1,"xref":"x","yref":"y","xanchor":"right","showarrow":false,"text":"main effects","font":{"size":13,"color":"#8a8f98"}},{"x":-1.35,"y":2,"xref":"x","yref":"y","xanchor":"right","showarrow":false,"text":"two-way","font":{"size":13,"color":"#8a8f98"}},{"x":-1.35,"y":3,"xref":"x","yref":"y","xanchor":"right","showarrow":false,"text":"three-way","font":{"size":13,"color":"#8a8f98"}}],"updatemenus":[{"type":"buttons","direction":"right","x":0,"xanchor":"left","y":1.2,"yanchor":"bottom","showactive":false,"bgcolor":"rgba(128,128,128,0.10)","bordercolor":"rgba(128,128,128,0.35)","buttons":[{"label":"1","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#8a8f98","#8a8f98","#8a8f98"]]},{"annotations[0].text":"structure 1: main effects only"},[1]]},{"label":"2","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","#e8890c","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#8a8f98","#8a8f98"]]},{"annotations[0].text":"structure 2: main effects and the interaction of 1 and 2"},[1]]},{"label":"3","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","rgba(128,128,128,0.16)","#e8890c","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#ffffff","#8a8f98","#8a8f98"]]},{"annotations[0].text":"structure 3: main effects and the interaction of 1 and 3"},[1]]},{"label":"4","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)","#e8890c","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#8a8f98","#ffffff","#8a8f98"]]},{"annotations[0].text":"structure 4: main effects and the interaction of 2 and 3"},[1]]},{"label":"5","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","#e8890c","#e8890c","rgba(128,128,128,0.16)","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#8a8f98"]]},{"annotations[0].text":"structure 5: main effects and the interactions 1-2 and 1-3"},[1]]},{"label":"6","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","#e8890c","rgba(128,128,128,0.16)","#e8890c","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#ffffff","#8a8f98"]]},{"annotations[0].text":"structure 6: main effects and the interactions 1-2 and 2-3"},[1]]},{"label":"7","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","rgba(128,128,128,0.16)","#e8890c","#e8890c","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98","#ffffff","#ffffff","#8a8f98"]]},{"annotations[0].text":"structure 7: main effects and the interactions 1-3 and 2-3"},[1]]},{"label":"8","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","#e8890c","#e8890c","#e8890c","rgba(128,128,128,0.16)"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#8a8f98"]]},{"annotations[0].text":"structure 8: main effects and all three two-way interactions"},[1]]},{"label":"9","method":"update","args":[{"marker.color":[["#2f7de1","#2f7de1","#2f7de1","#2f7de1","#e8890c","#e8890c","#e8890c","#e8890c"]],"textfont.color":[["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"]]},{"annotations[0].text":"structure 9: main effects, all two-way interactions and the three-way one"},[1]]}]}]}}
```

<div class="caption">The eight terms available with three inputs: 0 is the constant and the other labels are the inputs involved. Every structure keeps the constant and the main effects (blue) and adds some of the interactions (amber).</div>

## Why the cost grows

Two things make this expensive.

**Many candidates.** Every new input doubles the number of terms: $$2^d$$ for $$d$$ inputs, so 8 for three, 16 for four and 1,024 for ten. A candidate structure is a choice among them, so the number of candidates grows faster still.

**Costly fits.** Each candidate is a Gaussian process, and fitting one means factorising its kernel matrix at every step of the optimiser. An exact process does it on all $$n$$ training points. A sparse one summarises them with $$m$$ inducing points, and I took the largest $$m$$ with $$m^2 < n$$, which is $$m = 89$$ here. Time is counted in operations and memory in stored numbers:

| fit    | time per step | $$n = 8{,}000$$      | memory     | $$n = 8{,}000$$     |
| :----- | :------------ | :------------------- | :--------- | :------------------ |
| exact  | $$O(n^3)$$    | $$5 \times 10^{11}$$ | $$O(n^2)$$ | $$6.4 \times 10^7$$ |
| sparse | $$O(nm^2)$$   | $$6 \times 10^7$$    | $$O(nm)$$  | $$7 \times 10^5$$   |

Sparse fits make a single fit feasible, but an experiment is still many of them: nine true structures, nine candidates for each, repeated over trials. That is why the runs went to the cluster, as batch jobs.

## What I built

How well the comparison works is an empirical question, so the project was organised around experiments. Everything needed to run them:

- **The kernels.** A centred RBF kernel for each input, centred with respect to the empirical distribution of the inputs, and an ANOVA kernel that takes a list of terms and assembles them into one kernel, so that a candidate structure is just a list (described below). A second kernel family, where the maximum interaction depth is set instead of the structure, serves as a comparison.
- **The data generators.** Data with a chosen structure among the nine, with noise.
- **The fitting.** Sparse Gaussian processes in GPflow, with the inducing points placed by k-means and the parameters optimised with L-BFGS-B.
- **The experiment scripts.** Loops over true structures, trials and candidates, which fit the candidates in parallel and write one row per fit to a CSV.
- **The cluster runs.** The environment, the batch scripts and the monitoring on the Sapienza HPC cluster.

## The kernel

Each term in the chart is a product of one-dimensional RBF kernels, centred with respect to the empirical distribution of the inputs, so that the terms are orthogonal under the product of the input distributions and each can be read as the effect of those variables alone. Writing $$k_j$$ for the centred kernel of input $$j$$ and $$\mathcal{S}$$ for the set of terms of a structure, the kernel is

$$K(x, x') = 1 + \sum_{u \in \mathcal{S}} \prod_{j \in u} k_j(x_j, x_j')$$

up to the variances and an overall scale, which are parameters of the fit.

## Structure 3, written out

Take structure 3, the main effects plus the interaction between the first and the third input. The function it describes is a sum of five pieces, and the kernel has one term for each of them:

$$f(x) = f_\emptyset + f_1(x_1) + f_2(x_2) + f_3(x_3) + f_{13}(x_1, x_3)$$

$$K_3(x, x') = 1 + k_1(x_1, x_1') + k_2(x_2, x_2') + k_3(x_3, x_3') + k_1(x_1, x_1')\,k_3(x_3, x_3')$$

The first term is the constant $$f_\emptyset$$, the next three are the effects of each input on its own, and the last is what the first and the third input do together beyond their separate effects. The data generator produces data with exactly this structure for each of the nine, adding noise to the sum of the pieces, $$y = f(x) + \varepsilon$$. In the code, a structure is the list of its terms, and the kernel is built from that list:

```python
# the three inputs on their own, then the structures built on top of them
main = [[0], [1], [2]]
models = {
    1: [main],
    2: [main, [[0, 1]]],      # plus the x1 x2 interaction
    3: [main, [[0, 2]]],      # plus the x1 x3 interaction
    # ... up to 9, the saturated one, which also has [[0, 1, 2]]
}

# one centred RBF kernel per input, and structure 3 assembled from them
kernels = [CenteredRBFKernel(measure=measures[d], active_dim=d)
           for d in range(X_train.shape[1])]
kernel_3 = IndexedANOVAKernel(base_kernels=kernels, blocks=models[3])
```

## What an experiment does

For each of the nine true structures the generator produces a dataset, and all nine candidate structures are fitted to it as sparse Gaussian processes, with the inducing points placed by k-means. Each fit records its ELBO and its RMSE and MAE on held-out points, and the loop repeats over trials.

## On the cluster

The experiments ran on the Sapienza HPC cluster, a shared machine where nothing runs from the terminal: a job goes into a SLURM queue with the cores, memory and time it asks for. I set up a Python 3.12 environment there with TensorFlow and GPflow, kept the code in the shared project folder and wrote the batch scripts. I started with a small job to test the data generator, added a script that checks whether TensorFlow sees a GPU and benchmarks it, and then moved to the experiments. A job looked like this:

```bash
#!/bin/sh
#SBATCH --job-name=data_generation_example
#SBATCH --output=logs/data_generation_example_%j.log
#SBATCH --error=logs/data_generation_example_%j.err
#SBATCH --time=10:00:00
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=16GB

source venv/bin/activate
python3 experiments/experiment_gen_data.py
```

A full run is thousands of sparse-GP fits, each on 8,000 training points. Nine candidates for the same dataset do not depend on each other, so the experiment script fits them in parallel, one worker per structure. The cores are a shared resource: the script reads how many SLURM granted, keeps the numerical libraries to one thread each and splits the rest among the TensorFlow threads, so that the workers do not oversubscribe them.

```python
# one thread per numerical library, so the workers don't oversubscribe the cores
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")

# SLURM tells us how many cores this job was given
cpus = int(os.environ.get("SLURM_CPUS_PER_TASK", multiprocessing.cpu_count()))
n_jobs = max(1, min(9, cpus // 4))     # at most one worker per candidate structure
tf_threads = max(1, cpus // max(1, n_jobs))

def fit_one_model(i, models, kernels, X_tf, Y_tf, Z_tf, X_test_tf, Y_test):
    anova_kernel = IndexedANOVAKernel(base_kernels=kernels, blocks=models[i])
    model = gpflow.models.SGPR(data=(X_tf, Y_tf), kernel=anova_kernel,
                               inducing_variable=Z_tf)
    ...  # L-BFGS-B on the ELBO, then RMSE and MAE on the test split
    return i, rmse, mae, float(model.elbo())

with parallel_backend("loky", inner_max_num_threads=tf_threads):
    results = Parallel(n_jobs=n_jobs)(
        delayed(fit_one_model)(i, models, kernels, X_tf, Y_tf, Z_tf, X_test_tf, Y_test)
        for i in models
    )
```

The script prints the time of each trial and an estimate of what is left, so a job that runs for hours can be followed from its log; I watched jobs with `squeue` and `sacct` and `tail -f` on the log files. Each run wrote its numbers to a CSV, one row per fit with the true structure, the trial, the candidate, RMSE, MAE and ELBO.
