---
layout: page
permalink: /repositories/
title: opensource
nav: true
nav_order: 3
_styles: >
  .post-header { display: none; }
---

<div class="projects">
  <p class="text-center mb-4">Sharing some things I made for myself and hoping they can be useful also for someone else.</p>
  
  {% if site.data.repositories.github_repos %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
      <!-- Cheatsheet with Thumbnail linked to Repo -->
      <div class="col mb-4">
        <a href="https://github.com/ThePowerSet/zsh-cheatsheet-macos" target="_blank">
          <div class="card h-100 hoverable">
            <img src="{{ '/assets/img/zsh_cheatsheet_thumb.png' | relative_url }}" class="card-img-top" alt="zsh cheatsheet">
            <div class="card-body text-center">
              <h2 class="card-title">Zsh Shortcuts for macOS</h2>
              <p class="card-text">A comprehensive cheatsheet for Zsh terminal shortcuts on macOS.</p>
              <a href="{{ '/assets/pdf/macOS_cheatsheet.pdf' | relative_url }}" class="btn btn-outline-primary btn-sm mt-2" target="_blank">View PDF</a>
            </div>
          </div>
        </a>
      </div>
      <!-- WhisperX Notebook -->
      <div class="col mb-4">
        <a href="https://github.com/ThePowerSet/whisperx-colab" target="_blank">
          <div class="card h-100 hoverable">
            <img src="{{ '/assets/img/whisperx_thumb.png' | relative_url }}" class="card-img-top" alt="WhisperX Notebook" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg'; this.style='padding: 20px; max-height: 200px; object-fit: contain;'">
            <div class="card-body text-center">
              <h2 class="card-title">WhisperX Colab Notebook</h2>
              <p class="card-text">A ready-to-use Google Colab notebook for fast audio transcription and diarization.</p>
              <a href="https://colab.research.google.com/github/ThePowerSet/whisperx-colab/blob/main/whisper2.ipynb" class="btn btn-outline-primary btn-sm mt-2" target="_blank">Open in Colab</a>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  {% endif %}
</div>
