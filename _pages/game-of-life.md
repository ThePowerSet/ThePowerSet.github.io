---
layout: page
title: Game of Life
permalink: /game-of-life/
nav: true
nav_order: 6
description: A cellular automaton devised by John Horton Conway.
---

<link rel="stylesheet" href="{{ '/assets/css/game-of-life.css' | relative_url }}">

<div id="game-of-life-app">
    {% include game_of_life.html %}
</div>

<script defer src="{{ '/assets/js/game-of-life/patterns.js' | relative_url }}"></script>
<script defer src="{{ '/assets/js/game-of-life/game.js' | relative_url }}"></script>
