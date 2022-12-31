---
tags: ['post', 'hyprland', 'tech']
layout: post
title: Using caps lock as compose key on Hyprland
description: literally why was it this hard
date: '2022-12-31T21:38:30-0600'
---

I've recently switched to the window manager [Hyprland][hyprland], and I'm
absolutely loving it so far! I still need to give it a couple finishing
touches, but here's my light mode theme so far:

{% image "hyprland-desktop.png", "Desktop screenshot using the Hyprland window manager" %}

I kept running into a problem getting my caps lock to work as a
[compose key][compose-key], though. I use the compose key a lot for inputting
IPA symbols and stuff, so this was pretty annoying, coming from X, where I
used to just use xmodmap to set the key to do what I wanted, and all the online
resources pointed me to things like `setxkbmap` and stuff, which should have
worked, but all it did was make it work as both caps lock and compose, which
obviously made it hard to input things.

Turns out all I had to do was put this in my `.config/hypr/hyprland.conf`:

```
input {
    # ...
    kb_options = compose:caps
    # ...
}
```

et voila, I can use caps lock as my compose key. This took embarrassingly long
to figure out, so I'm putting it on my blog in hopes that the next person
searching for this will be able to find this page and get it fixed right away
instead of having to mess around with installing waybind or kbct or whatever
in a desperate attempt to get it to work like I did.

Sorry for the lack of actual posts, I couldn't honestly care less about keeping
an active blog. [Hanas][hanas] work is going good though!

Also the date on this post is straight up wrong but I don't care to fix it.
Too bad!

[hyprland]: https://hyprland.org
[compose-key]: https://en.wikipedia.org/wiki/Compose_key
[hanas]: https://hanas.app
