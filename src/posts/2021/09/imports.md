---
tags: ['post', 'programming', 'tech']
layout: post
title: The Importance of `import`s
description: ... or, include considered harmful
date: '2021-09-08T21:43:30-0500'
---

I do a lot of web development. Out of all my projects that I care about,
basically all of them are on the web or in Javascript in some fashion. I wish
this wasn't really the case - mostly because low-level seems cool! - but I have
some points of friction with low-level languages that I wish I could easily solve.

I only really got around to trying out low-level through finding [SerenityOS][sus],
a very cool project. However, C++ (or C, honestly) is most definitely not the
best language for readability or understanding: let's try to dive into the code
and try to figure out how Serenity works, for funsies! Firstly, we can clone
and build. On my T440p, this takes about half an hour or so from source. This,
to my knowledge, is largely building the toolchain itself, not the actual OS.

Not a huge problem, and this is probably not entirely solvable by a language, at
least not yet - compiling C and C++ is a popular problem, and lots of labor
and capital are being poured into the problem, so beating them in compilation
speed is a non-starter. This isn't really what I want to get at, but I've just
spent about a paragraph complaining about it, so it's got to be an issue I care
about.

Next, we run into the issue of C/C++ itself - header files. In Javascript, there
are a few standards for importing code - my personal favorite is ESM, which looks
like this:

```js
// in bar.js
export const foo = (s) => s + 5

// in baz.js
import { foo } from './bar.js'
const main = () => {
  console.log(foo(3))
}
```

Which is very understandable, to my brain! If I want to learn about what `foo` is,
I can go dive into `bar.js` and quickly figure out where each symbol comes from.

Compare this to C or C++, which use a bodged system that boils down to "include
that file in this file and call it a day"[^1]:

```c
// in bar.c
#include "bar.h"

int foo(int x) {
  return x + 5;
}

// in bar.h
#ifndef BAR_H_
#define BAR_H_

int foo(int x);

#endif

// in baz.c
#include "bar.h"
#include <stdio.h>

int main(int argc, char *argv[]) {
  int baz = foo(3);
  printf("%d\n", baz);
}
```

(I haven't actually tried to compile this. Don't yell at me if I've gotten
something subtly wrong - actually, yell at C, since this should not
be something to easily get subtly wrong.)

There are at least 3 levels of kludginess here:

1. I have to use "define guards". This should not be a thing. In what scenario
   would I want this to be the more marked option?
1. I have to retype type definitions for all the functions/values I export
   in the header files. I can sorta see reasons for this, but none of them are good.
1. **I have no clue what is being imported into scope when I include a header.**

The last point is the one that makes it the hardest to understand things.
Yes, if I use a good IDE,[^2] I can hover over the symbol or something and
jump to definition. But I shouldn't have to! If I open a big C project in nano,
I have to search around externally, grepping for symbols and such to figure out
where things come from or how the program flows. If I open a big Javascript or
Typescript project in nano, I can get a much clearer picture of program flow
and where functions are declared.

One good piece of news in this space is that C++20 is introducing modules, which
looks **really** similar to Typescript:

```cpp
// in foo.cc
export module Foo;
namespace Bar {
  export int f() {
    return 42;
  }
}

// in main.cc
import Foo;
import std.core;

using namespace std;

int main() {
  cout << Bar::f() << endl;
}
```

This still suffers from the issue of "I have no clue what's now in scope", but
it gets rid of header files, which are the much worse part of the problem.
Additionally, modules seem... very unsupported. I looked at [GCC's page on the topic][gcc],
and the state looks very unfinished so far.

I'd get more grumpy about random parts of programming languages that I don't like,
but this post would be a mile long and I wouldn't have finished it. So, in summary:
stop making languages with bare imports, take a page from ES6's book (but not too
many, JS is still a bit of a nightmare), and overthrow C(++).

[^1]:
    Not that Javscript is really that different, but there is at least some
    level of thought put in here.

[^2]:
    "Good" is very subjective here and sometimes very strange. I had to use
    my university email to get a copy of CLion to even get symbols to start resolving,
    and even then, things were still strangely broken. I hear QTCreator works well
    with Serenity, but why do I have to use a special IDE just to write the code?
    This should not be a consideration - if I open a big C project in nano,
    I have to search around externally to figure out what's going on. If I open a
    big JS/TS project in nano, I can generally get an idea of how the project works.

[gcc]: https://gcc.gnu.org/wiki/cxx-modules
[sus]: https://serenityos.org
