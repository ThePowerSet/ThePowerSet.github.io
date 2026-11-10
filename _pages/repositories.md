---
layout: page
permalink: /repositories/
title: opensource
description: Sharing some things I made for myself and hoping they can be useful also for someone else.
nav: true
nav_order: 3
_styles: >
  .post-title { text-transform: capitalize; }
---

<div class="repositories">
  {% if site.data.repositories.github_repos %}
  <div class="project-grid">
    <!-- Cheatsheet with Thumbnail linked to Repo -->
    <article class="project-card">
      <a class="project-card-media project-card-media-photo" href="https://github.com/ThePowerSet/zsh-cheatsheet-macos" target="_blank">
        <img src="{{ '/assets/img/zsh_cheatsheet_thumb.png' | relative_url }}" alt="zsh cheatsheet">
      </a>
      <div class="project-card-body">
        <h2 class="project-card-title"><a href="https://github.com/ThePowerSet/zsh-cheatsheet-macos" target="_blank">Zsh Shortcuts for macOS</a></h2>
        <p class="project-card-text">A comprehensive cheatsheet for Zsh terminal shortcuts on macOS.</p>
        <div class="project-card-actions">
          <a href="{{ '/assets/pdf/macOS_cheatsheet.pdf' | relative_url }}" class="btn-pill btn-pill-small" target="_blank">View PDF</a>
          <a href="https://github.com/ThePowerSet/zsh-cheatsheet-macos" class="btn-pill btn-pill-small" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
      </div>
    </article>
    <!-- WhisperX Notebook -->
    <article class="project-card">
      <a class="project-card-media" href="https://github.com/ThePowerSet/whisperx-colab" target="_blank">
        <img src="{{ '/assets/img/whisperx_thumb.png' | relative_url }}" alt="WhisperX Notebook" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg';">
      </a>
      <div class="project-card-body">
        <h2 class="project-card-title"><a href="https://github.com/ThePowerSet/whisperx-colab" target="_blank">WhisperX Colab Notebook</a></h2>
        <p class="project-card-text">A ready-to-use Google Colab notebook for fast audio transcription and diarization.</p>
        <div class="project-card-actions">
          <a href="https://colab.research.google.com/github/ThePowerSet/whisperx-colab/blob/main/whisper2.ipynb" class="btn-pill btn-pill-small" target="_blank">Open in Colab</a>
          <a href="https://github.com/ThePowerSet/whisperx-colab" class="btn-pill btn-pill-small" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
      </div>
    </article>
  </div>
  {% endif %}
</div>
