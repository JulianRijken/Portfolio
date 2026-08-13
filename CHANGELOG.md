# Changelog

All notable changes to [julianrijken.com](https://julianrijken.com).

Versions follow [Semantic Versioning](https://semver.org/), read for a website:

| Part      | Bumped when                                                  |
| --------- | ------------------------------------------------------------ |
| **MAJOR** | The site is redesigned or rebuilt                             |
| **MINOR** | New projects, sections or capabilities are added              |
| **PATCH** | Fixes, corrections and polish, with no new content            |

Releases before 4.3.0 were reconstructed from git history and tagged
retroactively, so their dates are the date of the last commit in that run of
work rather than a deliberate release moment.

---

## [4.3.0] - 2026-08-13

Performance and accessibility overhaul. No visual or content changes.

First load went from **35.15 MB across 182 requests** to **0.93 MB across 27**,
measured cold-cache in headless Chrome against the previous release.

### Added

- Intrinsic `width`/`height` on all 151 images, so the browser reserves space
  before each one decodes.
- `preload="none"` on all 23 videos, `playsinline` so iOS stops forcing the
  fullscreen player, and `loading="lazy"` on every offscreen image.
- `preconnect` hints for the remaining external origins.
- Distinct alt text and `aria-label`s for all 148 images and 16 videos.
- `rel="noopener"` on external links.

### Changed

- Animated GIFs replaced with VP9 WebM: 5.6 MB down to 366 KB.
- Bootstrap is now self-hosted rather than loaded from stackpath.bootstrapcdn.com,
  whose CDN service is being wound down.
- Head scripts deferred so they no longer block first paint.
- The parallax scroll handler now coalesces its writes into one animation frame
  instead of repainting on every scroll event.
- The Discord handle is copied with the Clipboard API instead of the deprecated
  `document.execCommand("copy")`.
- The 404 page is self-contained, explains the error and no longer auto-redirects.
- 30.8 MB of debug symbols stripped from `2D-Shooter.wasm` (99 MB to 68 MB).

### Fixed

- **Kitchen Champions opened to a grey screen with no way out.** Its modal sat
  inside a `slide-up` element, whose finished animation leaves a lingering
  transform; that made the transformed element the containing block for the
  modal's `position: fixed`, pushing the dialog and its close button thousands
  of pixels above the viewport. This bug had been present since the modal was
  added.
- A C++ sample rendered with its template argument silently missing, because
  `<ResetGameCommand>` was unescaped and parsed as an HTML tag.
- The Multi Point Placement Solver card advertised a modal that did not exist.
- 13 `<video>` elements were never closed and carried an `alt` attribute, which
  is not valid on video and left them with no accessible name.
- Duplicate element IDs (`youtube-embed-1` twelve times, `sketchfab-embed-1`
  five, `portfolio` twice).
- A stray `</a>`, a `height="auto%"` typo, and a comma in `class="language-cpp,"`
  that stopped highlight.js from matching the requested language.
- The sitemap pointed at a CV filename that does not exist and a path that was
  never valid; it now lists the home page, the real CV and all seven playable
  builds.

### Removed

- An orphaned 4.5 MB `zeldaGif.gif` referenced by nothing.

## [4.2.0] - 2025-07-21

### Added

- What The Hack, including a working Steam button.
- Modals for the traffic simulation paper and for Breakout.
- Thumbnails for the newer projects.

### Changed

- CV and profile picture updated; the CV link made consistent so it works as a
  plain hyperlink.
- Skill items revised.

## [4.1.0] - 2024-11-21

Playable builds became the centrepiece of the site.

### Added

- Web builds for the Driving Game, Bubble Bobble, Tetris NES, Breakout and the
  2D Shooter.
- A notice about AI training on the page contents.

### Changed

- Bottom projects renamed, Strawberry moved up, project tags revised.
- CV updated; language proficiency reworded.

### Fixed

- A video timestamp on the 2D project, and a spelling mistake.

## [4.0.0] - 2024-08-30

The largest rework since 2020: new sections, a new type system and a full image
format migration.

### Added

- Project modals, replacing the old inline layout.
- A Welcome section, the full Graphics Programming section, and a dedicated page
  for the Julgen engine.
- Proper syntax highlighting for code samples.
- Custom tags on the top projects, plus Pirate Bay documentation and Wheel Spin.

### Changed

- All images converted to AVIF, with video re-encoded and further compressed.
- Typeface changed to Hack, the page centred, margins and scrolling reworked,
  and the animations polished.
- YouTube embeds now load only when their modal opens, instead of on page load.
- Skills list, stats and CV updated.

### Fixed

- Backgrounds not resolving the right file format, in both HTML and CSS.
- The 404 page, assorted spelling, and the Hammer project date.

## [3.1.0] - 2023-11-16

### Added

- Parry Tank, the Game Design section, and the graduation work covering Fools
  Fight, AfterBurner and 2D.

### Changed

- Train Trouble thumbnail and contact information updated.

## [3.0.0] - 2023-06-22

The 2023 redesign, and the first release to take mobile seriously.

### Added

- Dark mode.
- Touch input with portrait and landscape handling, and on-screen buttons shown
  only on mobile.
- AfterBurner II as a playable web build.

## [2.2.0] - 2022-01-24

### Changed

- Profile picture and assorted small updates.

## [2.1.0] - 2020-10-12

The site grew from a project list into a portfolio.

### Added

- Contact, About and Skills sections.
- A custom domain via `CNAME`, a 404 page, a sitemap and meta tags.
- 3D models, Malaga, Source Engine and Rapid Prototyping work.
- The CV, with personal details redacted.
- Mobile-friendly tables and an SVG Sketchfab logo.

### Changed

- Images and GIFs compressed; backgrounds reworked.
- External links open in a new tab; GitHub links point straight at the code.
- Project dates added.

## [2.0.0] - 2020-07-05

"Clean V2" - the site rebuilt from scratch on a cleaner foundation.

### Added

- Project images, working logos and buttons throughout.

### Changed

- Portfolio files reorganised and cleaned up.

## [1.0.0] - 2020-01-14

The first version of the site.

### Added

- A hand-built page, later moved onto a Bootstrap template.
- The first projects: Train Trouble, Twin Stick Shooter, Zelda and Tower
  Defence, followed by the back catalogue.

[4.3.0]: https://github.com/JulianRijken/Portfolio/compare/v4.2.0...v4.3.0
[4.2.0]: https://github.com/JulianRijken/Portfolio/compare/v4.1.0...v4.2.0
[4.1.0]: https://github.com/JulianRijken/Portfolio/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/JulianRijken/Portfolio/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/JulianRijken/Portfolio/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/JulianRijken/Portfolio/compare/v2.2.0...v3.0.0
[2.2.0]: https://github.com/JulianRijken/Portfolio/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/JulianRijken/Portfolio/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/JulianRijken/Portfolio/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/JulianRijken/Portfolio/releases/tag/v1.0.0
