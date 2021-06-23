# Q30 HERO BLOCK

Description: This adds hero layout/style to any theme q30-hero-style.

**Styles that can be extended via theme are the parent class**

.wp-block-q30-hero-block-q30-hero-style

**and child classes within**

- .hero-image
- .hero-image img
- .hero-content
- "hero-content" color options ( .c-0, .c-1, .c-2, .c-3, .c-4, .c-5 )
- .hero-content .hero-title-content
- .hero-prefix
- .hero-prefix-space
- .hero-title
- .hero-text
- .hero-text p

You can set the amount of hero color option classes within block.js by setting. The color options css class is prefix 'c-', plus an incremental number.

```
var colorOptions = 6;
```

The default is 6

