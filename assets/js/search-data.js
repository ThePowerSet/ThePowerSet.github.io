// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "A collection of my academic and research projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-opensource",
          title: "opensource",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "My complete Curriculum Vitae.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-game-of-life",
          title: "Game of Life",
          description: "A cellular automaton devised by John Horton Conway.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/game-of-life/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "projects-master-39-s-thesis",
          title: 'Master&amp;#39;s Thesis',
          description: "Counterparty Risk in a CDS Portfolio: CVA, Netting and Contagion. Sapienza University of Rome, October 2026.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/0_master_thesis/";
            },},{id: "projects-probability-and-stochastic-processes",
          title: 'Probability and Stochastic Processes',
          description: "Problem sets in Python: convergence of random variables, Markov chains for credit-rating migration, and a card-shuffling experiment.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_probability/";
            },},{id: "projects-sofr-ois-yield-curve-construction",
          title: 'SOFR OIS Yield Curve Construction',
          description: "From 86 swap quotes to a USD discount curve, solved with a library and with a bisection I wrote.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_sofr_ois/";
            },},{id: "projects-volatility-forecasting",
          title: 'Volatility Forecasting',
          description: "Compared GARCH out-of-sample predictive accuracy with ML models for Euro Stoxx 50.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_volatility_forecasting/";
            },},{id: "projects-option-pricing-and-hedging-with-greeks",
          title: 'Option Pricing and Hedging with Greeks',
          description: "Black–Scholes priced three ways, the Greeks by finite differences, and the point where gamma P&amp;L meets theta: the hedging section of a group paper.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_option_pricing/";
            },},{id: "projects-statistical-modeling-guns-panel-data",
          title: 'Statistical Modeling - Guns Panel Data',
          description: "State-level murder and robbery rates: robust OLS, kernel and local-polynomial regression, and variable selection with BIC and the lasso.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_statistical_modeling_guns/";
            },},{id: "projects-gaussian-processes",
          title: 'Gaussian Processes',
          description: "Experiments on model selection with additive and ANOVA Gaussian processes: the kernels, the data generators and the runs on a cluster.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_gaussian_processes/";
            },},{id: "projects-market-regimes-with-a-poisson-hmm",
          title: 'Market Regimes with a Poisson HMM',
          description: "A hidden Markov model for the daily number of S&amp;P 500 stocks falling more than 5%, written from the likelihood up in R, with a count-based VaR.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_poisson_hmm/";
            },},{id: "projects-credit-risk-on-us-mortgages",
          title: 'Credit Risk on US Mortgages',
          description: "A PD model, the Vasicek portfolio loss and an out-of-time validation, on 5 million loan-years of Freddie Mac mortgages.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_credit_risk/";
            },},{id: "projects-time-series-non-ergodic-ar-1-and-eur-usd",
          title: 'Time Series: Non-ergodic AR(1) and EUR/USD',
          description: "A process that is stationary but not ergodic, simulated and proved, and a forecasting exercise on EUR/USD where nothing is left to forecast.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_time_series/";
            },},{id: "projects-gtbr-gamma-theta-break-even-range",
          title: 'GTBR: Gamma–Theta Break-even Range',
          description: "Where gamma and theta cancel for a delta-hedged option, and a breakout rule built on it, tested on SPY with the VIX.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_gtbr/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/omar_tronelli_cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6F%6D%61%72.%74%72%6F%6E%65%6C%6C%69@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ThePowerSet", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/omar-tronelli", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
