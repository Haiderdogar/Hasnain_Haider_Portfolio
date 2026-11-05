# Hasnain Haider – Flutter Developer Portfolio

A single-page portfolio with a 3D, motion-driven design. No build step: open `index.html` or host the folder as-is (GitHub Pages works).

## What's animated

- **Intro loader** with a progress count, then the name slides up line by line.
- **Exploded Flutter phone** in the hero. The Scaffold, AppBar, Card and FloatingActionButton layers float apart in 3D, lean toward the mouse, and snap back into the phone as you scroll. The screen cycles through screenshots from the projects.
- **3D background** (Three.js): drifting UI slabs (phones, cards, app bars, buttons) that move at different speeds as you scroll, follow the pointer, and spin faster when you scroll fast.
- **Scroll motion** (GSAP + ScrollTrigger): headings rise word by word, stats count up, the profile photo unmasks, the experience line draws itself, skill and project cards tilt into place, and the tech marquee speeds up with scrolling.
- **Pointer effects** (mouse only): cards tilt with a light glare, buttons are magnetic, and a ring follows the cursor.
- **Project dialog** with a screenshot gallery (arrow keys, swipe, thumbnails).

If a visitor prefers reduced motion, or the animation libraries fail to load, the page shows all content without animation.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page content and structure |
| `assets/css/style.css` | All styling (colours and fonts are variables at the top) |
| `assets/js/projects.js` | **Project data.** Add or edit a project here and its card and dialog appear |
| `assets/js/main.js` | Navigation, typing text, project dialog, contact form, scroll motion |
| `assets/js/scene.js` | The Three.js background |
| `assets/` | Images, skill icons and project screenshots |

## Adding a project

Copy an entry in `assets/js/projects.js`, change the text, and put its screenshots under `assets/`. The comment at the top of that file explains each field.

## Libraries (loaded from cdnjs)

Three.js r128, GSAP 3.12.5 with ScrollTrigger, and the Bricolage Grotesque and Instrument Sans fonts from Google Fonts.

## Contact form

The form posts to Formspree (`https://formspree.io/f/meokwkjz`). Change the `action` in `index.html` to use your own endpoint.
