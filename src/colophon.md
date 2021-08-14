---
layout: default
permalink: colophon.html
title: Colophon
description: how this site site made
eleventyExcludeFromCollections: true
---

**Colophon**[^1]

---

This site is written on Manjaro Linux on a Thinkpad T440p using Neovim from wherever
I'm living, in Markdown, SCSS, Javascript, Nunjucks, et cetera, and then fed through
Eleventy to produce the actual HTML.

{% image "desktop.png", "Desktop screenshot", "A screenshot of the dev process - you'll have to open it in a new tab to see it at a decent size" %}

The font used here was blatantly plagiarised from NeXTStep, although I'm not
sure what the actual font is. It was painstakingly converted into a TTF font using
FontStruct based on all the screenshots of NeXTStep I could find online.
Unfortunately, browsers have not evolved to display the font in a pixel-perfect
manner in some places - on my end most of it's okay, save for the occasional
title being on a half-pixel or something. Not much I can do to fix it. Go
contribute to [Servo][servo] or something?

The posts themselves all conform to the [h-entry microformat][hentry], but
I'm not sure if that's still a cool thing to be doing. Everything's pretty
[POSH][posh], anyway.

There's also [RSS][rss] and [JSONfeed][jsonfeed] feed formats available for
your viewing pleasure. (They should be auto-discoverable, either way.)

[^1]:
    colophon (n.) [[ˈkʰɑːɫəfɑːn]]{ .unifont }: A page on a website identifying
    the details of its creation, such as the technologies used. (via
    [wiktionary](https://en.wiktionary.org/wiki/colophon))

[hentry]: http://microformats.org/wiki/h-entry
[posh]: http://microformats.org/wiki/posh
[rss]: /feed/feed.xml
[jsonfeed]: /feed/feed.json
[servo]: https://servo.org
