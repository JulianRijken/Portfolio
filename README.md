# julianrijken.com

The portfolio of Julian Rijken, gameplay programmer. Live at
**[julianrijken.com](https://julianrijken.com)**.

A hand-maintained static site: no framework, no build step, no package manager.
`index.html` is the whole site, plus a set of Unity WebGL builds served as
standalone pages.

---

## Running it locally

Any static file server works. There is nothing to install or compile.

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

Open it over `http://`, not by double-clicking the file. On a `file://` URL the
relative asset paths still resolve but the Clipboard API does not, so the
Discord copy button silently falls back to the legacy path.

## Deployment

GitHub Pages serves the `master` branch directly. Pushing to `master` deploys.
The custom domain lives in [`CNAME`](CNAME), and `404.html` is served for
unknown paths.

Pages resolves extensionless URLs to `.html`, which is why the game links work:
`/BreakoutWeb/Breakout` serves `BreakoutWeb/Breakout.html`.

## Layout

| Path              | What it is                                                        |
| ----------------- | ----------------------------------------------------------------- |
| `index.html`      | The entire site: content, all 34 project modals, markup            |
| `css/styles.css`  | Vendored theme, includes Bootstrap. Rarely edited by hand          |
| `css/customStyles.css` | Everything written for this site. Put new rules here          |
| `js/scripts.js`   | Smooth scroll, parallax, modal media handling, clipboard           |
| `js/bootstrap.bundle.min.js` | Self-hosted Bootstrap 4.5.0 with Popper              |
| `highlight/`      | Vendored highlight.js 11.10.0 for the C++ samples                  |
| `assets/img/`     | Project media, one directory per project                           |
| `assets/CV/`      | The published CV                                                   |
| `*Web/`           | Unity WebGL builds, one directory each                             |

Loaded from a CDN: jQuery 3.5.1, jquery-easing 1.4.1, Font Awesome 5.13.0, and
the Hack and VT323 webfonts. Bootstrap is deliberately **not** on a CDN — it was
served from StackPath, whose CDN is being wound down, and every modal, the
navbar and scrollspy depend on it.

---

## Commit naming

Commits follow
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

A required type, an optional scope in parentheses, an optional `!`, then a
colon and a space before the description. A body may follow one blank line
after the description. Footers come one blank line after the body, each a token
using `-` in place of spaces — `Reviewed-by: name` — with `BREAKING CHANGE` the
one permitted exception.

The scope is a noun naming a part of the codebase, and is worth using when a
change is confined to one: `fix(modal): …`, `perf(assets): …`.

House style on top of the spec, which allows any casing but asks for
consistency: lower case after the colon, imperative mood, no trailing full
stop. Add a body whenever the *why* is not obvious from the diff.

### Types

The spec itself defines only two, and both carry meaning for the version
number:

| Type   | Spec meaning                | Version effect |
| ------ | --------------------------- | -------------- |
| `feat` | Adds a new feature          | MINOR          |
| `fix`  | Fixes a bug                 | PATCH          |

Any other type is explicitly allowed (rule 14) and has no automatic effect on
the version. The set used here, with real examples from this history:

| Type    | For                                              | Example from this repo                                     |
| ------- | ------------------------------------------------ | ---------------------------------------------------------- |
| `feat`  | New projects, sections or capabilities           | `feat: Added Tetris to web`                                 |
| `fix`   | Something was broken and now is not              | `fix: unbreak the Kitchen Champions modal`                  |
| `perf`  | Same behaviour, less work or fewer bytes         | `perf: lazy-load offscreen images`                          |
| `a11y`  | Accessibility                                    | `a11y: give every image and video a meaningful accessible name` |
| `build` | Dependencies and how the site is assembled       | `build: self-host the Bootstrap bundle`                     |
| `docs`  | Documentation only, no site change               | `docs: add a changelog and surface the version in the footer` |
| `chore` | Housekeeping with no user-visible effect         | `chore: remove orphaned Zelda GIF`                          |

`perf`, `build`, `docs` and `chore` are not from the spec either — they come
from the widely used `@commitlint/config-conventional` set. `a11y` is a local
addition on top of that, because accessibility work is common enough here to be
worth spotting at a glance.

The type drives the changelog: `feat` lands under **Added**, `fix` under
**Fixed**, `perf` and `build` under **Changed**, `chore` under **Removed** where
something was deleted. `docs` usually does not appear at all.

### Breaking changes

A `!` immediately before the colon marks a breaking change, and a
`BREAKING CHANGE:` footer does the same. If the `!` is used the footer may be
omitted, and the description stands as the explanation:

```
feat!: rebuild the site on a new layout
```

`BREAKING CHANGE` must be uppercase; it is the one token the spec treats as
case-sensitive.

A website has no API to break, so this is reserved for a redesign or rebuild —
a change that makes a returning visitor's mental model of the site wrong. That
is what drives a MAJOR bump, and it is the one place this repo reads the spec
loosely; see below.

### History before this convention

The convention starts around August 2024. Roughly half the history predates it,
with messages like `fff`, `Quick save` and `Test`. That older history is left
alone; [`CHANGELOG.md`](CHANGELOG.md) reconstructs what those commits actually
did.

To count the split yourself:

```bash
git log --format=%s | grep -cE "^[a-z0-9]+(\([^)]*\))?!?: "
```

---

## Versioning

Semantic versioning, read for a website:

| Part      | Bumped when                                     | Commit type                        |
| --------- | ----------------------------------------------- | ---------------------------------- |
| **MAJOR** | The site is redesigned or rebuilt                | any type with `!` / BREAKING CHANGE |
| **MINOR** | New projects, sections or capabilities are added | `feat`                             |
| **PATCH** | Fixes and polish, with no new content            | `fix`, and everything else          |

MINOR and PATCH match Conventional Commits exactly. MAJOR is where this repo
reads the spec loosely: the spec ties MAJOR to a breaking change, and a site
has no API to break, so a redesign takes its place — the closest equivalent to
breaking what someone already knew. Mark those commits with `!` so the
intent is visible in the log rather than implied by the tag alone.

Every release is an annotated git tag (`v4.3.0`) on the commit that shipped it,
and is written up in [`CHANGELOG.md`](CHANGELOG.md). Releases before 4.3.0 were
reconstructed from history and tagged retroactively — most of that history
predates the convention, so their versions were inferred from what the commits
did rather than read off their types.

Cutting a release means three edits, none of them automated:

1. Add the section to `CHANGELOG.md`, with its `compare/` link at the bottom.
2. Update the version in the epilogue of `index.html` (`class="site-version"`).
3. Tag it, then push commits and tags together:

```bash
git tag -a v4.4.0 -m "Short summary" && git push origin master --follow-tags
```

---

## Conventions worth keeping

These are not style preferences; each one is load-bearing, and a few were bugs
that took real effort to find.

**Project modals belong at the end of `<body>`, not beside their card.** A CSS
`transform` makes an element the containing block for `position: fixed`
descendants, and the `slide-up` animation leaves one behind permanently. A modal
nested inside it renders thousands of pixels off-screen: grey backdrop, no
content, no reachable close button. Kitchen Champions shipped that way for a
long time.

**Every `<img>` needs `width` and `height`.** Without them, a lazily loaded
image occupies zero height, so the portfolio grid collapses, the thumbnails
never intersect the viewport, and they never load at all. Use the file's real
pixel dimensions; CSS still controls the displayed size.

**Every `<img>` below the fold needs `loading="lazy"`.** Only the navbar logo is
above the fold — the first content image is around 4000px down.

**Every `<video>` needs `preload="none"` and `playsinline`.** All video lives
inside closed modals and the `shown.bs.modal` handler calls `play()` on open, so
nothing needs to preload. Without `playsinline`, iOS Safari throws the page into
the fullscreen player when a modal opens.

**Images are AVIF, video is WebM.** Animated GIFs are not used; the last three
cost 5.6 MB and came down to 366 KB as WebM. Encode with:

```bash
ffmpeg -i in.gif -c:v libvpx-vp9 -b:v 0 -crf 34 -an -pix_fmt yuv420p out.webm
```

**Escape `<` and `>` inside `<pre><code>`.** They are parsed as HTML otherwise.
A C++ sample rendered as `RegisterCommand(...)` for a long time because
`<ResetGameCommand>` was swallowed as an unknown tag.

**Give images real alt text.** Not one repeated string — say which project the
image belongs to.

**Unity builds must be release builds.** `2D-Shooter.wasm` shipped 30.8 MB of
debug symbols inside a 99 MB file. Check with:

```bash
ffprobe -v error -show_entries stream=width,height -of json <file>   # media
node -e "WebAssembly.compile(require('fs').readFileSync(process.argv[1])).then(m=>console.log('name section:',WebAssembly.Module.customSections(m,'name').length))" <file.wasm>
```

**Adding a new URL means updating `sitemap.xml`.** It listed a CV filename that
did not exist for two years.

---

## Credits

Original template by [David Jans](https://www.davidjans.nl/), with help from
[All-Purpose Mat](https://allpurposem.at/) and [Wesli.Dev](https://wesli.dev/).
