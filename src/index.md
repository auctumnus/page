---
layout: default
title: Home
description: autumn's digital garden
---

welcome to my site! please excuse the construction

i'm best viewed on a monitor/browser that doesn't make the text all glowy!

to get around, you can click on one of the dockapps listed either to the right
or on the bottom, depending on your screen's size

check out my most recent posts:

<ul>
  {%- for post in collections.post | reverse | batch(3) | first -%}
  <li>
    {% date post.date %} - <a href="{{ post.url }}">{{ post.data.title }}</a>
  </li>
  {%- endfor -%}
</ul>

or see:

- [all the posts i've made][archive]
- [ways to contact me][contact]
- [some stuff i like][recommendations]
- [what i should be doing][todo]
- [licenses and other legal stuff][legal]

[![under construction](assets/static/under-construction.gif)]{.wide .center}

![Linux button](assets/static/88x31/linuxtoday.gif)
![This website is gay (in a literal sense)](assets/static/88x31/gay.gif)
![Download Team Fortress 2!](assets/static/88x31/team_fortress_get_it.gif)
![Use a computer and monitor for this site](assets/static/88x31/computer.gif)
![Made with CSS](assets/static/88x31/css2.gif)
![Made with Neovim](assets/static/88x31/neovim.gif)
![Let's all love Lain!](assets/static/88x31/lain.jpg)
![Play Touhou today!](assets/static/88x31/2hu.gif)
{.center}

<div id="yesterweb" class="center">
  <span>This site is part of the Yesterweb Webring.</span>
  <span class="yesterweb-links">
    <a href="https://rocktype.neocities.org/">Previous</a>
    <a href="https://tabi98.neocities.org/">Next</a>
  </span>
</div>

[recommendations]: /recommendations.html
[archive]: /archive.html
[legal]: /legal.html
[todo]: /todo.html
[contact]: /contact.html
