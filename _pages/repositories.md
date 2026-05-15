---
layout: page
permalink: /repositories/
title: opensource
nav: true
nav_order: 2
---

<div class="projects">
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
      <!-- GitHub Repo Card -->
      <div class="col mb-4">
        {% for repo in site.data.repositories.github_repos %}
          {% include repository/repo.liquid repository=repo %}
        {% endfor %}
      </div>
    </div>
  </div>
  {% endif %}

{% if site.data.repositories.github_users %}

  <hr>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        {% for user in site.data.repositories.github_users %}
          {% include repository/repo_user.liquid username=user %}
        {% endfor %}
      </div>
    </div>
    {% if site.repo_trophies.enabled %}
    <div class="row mt-3">
      <div class="col">
        {% for user in site.data.repositories.github_users %}
          <div class="repositories d-flex flex-wrap justify-content-center">
            {% include repository/repo_trophies.liquid username=user %}
          </div>
        {% endfor %}
      </div>
    </div>
    {% endif %}
  </div>
  {% endif %}
</div>
