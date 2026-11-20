# Hacktrion --- AI Agent Project Guide

> **Purpose:** This file is the project-level source of truth for AI
> coding agents working on Hacktrion. Read it before inspecting,
> planning, or changing code. It explains the product, design system,
> architecture conventions, implementation preferences, and
> non-negotiable rules.
>
> **Important:** This guide describes the intended project conventions
> and the structure known at the time it was written. The repository may
> evolve. Always inspect the current codebase and treat the live
> implementation as authoritative where it differs from this document.
> Update this file when durable project decisions change.

------------------------------------------------------------------------

## 1. Start Here: Mandatory Workflow for Every Agent

Before making any changes:

1.  Read this file completely.
2.  Inspect the current repository structure and relevant existing
    files.
3.  Read `package.json`, `src/app/layout.tsx`, `src/app/globals.css`,
    and the components related to the task.
4.  Inspect existing pages and components that are visually or
    functionally similar to the requested work.
5.  Identify the established component patterns, CSS naming, responsive
    breakpoints, animation techniques, typography, spacing, and icon
    usage.
6.  Make a short implementation plan before editing.
7.  Reuse existing patterns and components where appropriate.
8.  Make only the changes required for the task.
9.  Run the relevant checks (at minimum, build/type checks when
    available) and inspect the changed page at desktop and mobile sizes.
10. Report what changed, which files changed, what checks were run, and
    anything still requiring human input.

### The most important rule

**Explore the existing coding style before writing code. Then follow
that style.**

Do not assume the repository matches a generic Next.js starter template.
Do not replace established patterns with your preferred architecture
just because you prefer them.

If a requirement is unclear, inspect the code first. Ask a concise
question only when the missing information cannot be safely resolved
from the repository or this guide.

------------------------------------------------------------------------

## 2. Product Overview

### What is Hacktrion?

Hacktrion is a platform that connects hackathon organizers with
participants.

It is designed to make hackathon discovery, publishing, registration,
and event administration easier through one platform.

There are two primary audiences:

#### Organizers

Examples include colleges, universities, institutions, and eligible
organizations that conduct hackathons.

Organizers can: - Register as hosts/organizers. - Create and publish
hackathons through the Hacktrion organizer experience. - Manage their
hackathons through an organizer dashboard. - Access participant
registration information. - Download registered participant information
in one Excel file. - Manage multiple hackathons through one organizer
account/dashboard. - Publish an event without having to build a separate
website for every hackathon.

Do not claim functionality beyond what is actually implemented in the
product.

#### Participants

Students, developers, innovators, and other people interested in
hackathons.

Participants can: - Discover hackathons. - Explore hackathon details. -
Register for hackathons through the available registration process. -
Receive AI-powered hackathon recommendations based on profile
information and interests.

AI-powered hackathon recommendations are an existing Hacktrion feature.
Do not describe them as merely a future idea.

### Mobile-only product --- critical

**Hacktrion itself is a phone-based/mobile application. It does not have
a participant web application or desktop application.**

This distinction is essential:

-   The **Hacktrion marketing website** is a responsive website and
    should work on desktop, tablet, and mobile browsers.
-   The **Hacktrion product experience** is mobile-only.

Whenever a marketing page shows the actual product or demonstrates
product functionality: - Use portrait smartphone frames and mobile
application screens. - Prefer genuine Hacktrion mobile screenshots when
available. - If genuine screenshots are not available, use simple,
clearly illustrative mobile UI mockups. - Do not depict Hacktrion as a desktop web app.

Never use laptop mockups, desktop monitor mockups, browser-based product
dashboards, or wide desktop screenshots to represent Hacktrion's actual
product.

For participant marketing visuals, phone screens should be used
consistently for discovery, event details, recommendations, and other
app experiences. For organizer marketing visuals, inspect available
genuine product assets and use phone screens when showing the mobile
product. Do not invent a desktop product experience.

### Ownership and brand attribution

-   Hacktrion is built and managed by **KodePix**.
-   KodePix is a team name, not a registered company (based on the
    owner's clarification).
-   The owner has stated that Hacktrion's rights belong to KodePix.
-   Use wording such as **"A KodePix Product"** or **"Hacktrion is a
    product of KodePix."**
-   Do not describe KodePix as a registered company, corporation, or
    incorporated legal entity.
-   Do not invent company registration numbers, addresses, legal
    identities, or official contact details.

------------------------------------------------------------------------

## 3. Current Technology and Project Conventions

The known website stack is:

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS v4
-   Global CSS in `src/app/globals.css`
-   `lucide-react` for interface icons
-   `react-icons` may be used for recognizable brand/social icons where
    already installed

**Always verify the current `package.json` and source files before
relying on this list.** Do not install a package simply because it is
mentioned here.

### Known application structure

The following is the established/known structure. Inspect the actual
repository before adding files:

``` text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── organizations/
│   │   └── page.tsx
│   └── participants/
│       └── page.tsx
│
└── components/
    ├── layout/
    │   ├── Navbar.tsx
    │   └── Footer.tsx
    ├── home/
    │   └── ... homepage section components
    ├── organizations/
    │   └── ... organizer page components
    └── participants/
        └── ... participant page components

public/
├── log.png
└── images/
    └── ... page and product visuals
```

This is a guide, not permission to recreate or reorganize the
repository. The real current structure may contain additional files or
different names. Follow the actual repository.

### Routing

Known marketing routes include: - `/` --- homepage - `/organizations`
--- For Organizers - `/participants` --- For Participants - `/blogs` ---
Blogs - `/about` --- About page (only use if the route exists) - `/faqs`
or homepage FAQ anchor --- verify actual implementation -
`/privacy-policy` --- planned legal page - `/terms-and-conditions` ---
planned legal page

Do not create links to routes without checking whether they exist or are
intentionally planned. Do not invent a route's functionality.

### Layout

The shared site layout is known to render the global Navbar, page
content, and Footer through `src/app/layout.tsx`. Verify the current
implementation before changing it.

Prefer shared layout elements over duplicating navigation or footer
markup inside individual pages.

------------------------------------------------------------------------

## 4. Design System

Hacktrion has a light lavender and purple visual identity. Preserve it
across all pages.

### Brand palette

  Token / Purpose          Value
  ------------------------ -----------
  Main background          `#FCFAFF`
  Main text / foreground   `#111334`
  Primary purple           `#7C3AED`
  Primary hover            `#6D28D9`
  Deep purple              `#5B21B6`
  Accent purple            `#9333EA`
  Soft lavender            `#EDE2FF`
  Secondary surface        `#F5F0FF`
  Hover surface            `#F0E7FF`
  White surface            `#FFFFFF`
  Secondary text           `#4B4670`
  Muted text               `#77738F`
  Border                   `#E7DDFB`
  Highlight border         `#C4A7FF`
  Success                  `#16A34A`
  Warning                  `#D97706`
  Error                    `#E11D48`

### Existing CSS variables

The known global theme uses variables similar to:

``` css
:root {
  --background: #fcfaff;
  --foreground: #111334;
  --primary: #7c3aed;
  --primary-hover: #6d28d9;
  --accent: #9333ea;
  --accent-soft: #ede2ff;
  --surface: #ffffff;
  --surface-secondary: #f5f0ff;
  --surface-hover: #f0e7ff;
  --text-primary: #111334;
  --text-secondary: #4b4670;
  --text-muted: #77738f;
  --border: #e7ddfb;
  --border-highlight: #c4a7ff;
  --success: #16a34a;
  --warning: #d97706;
  --error: #e11d48;
}
```

The actual `globals.css` is authoritative. Reuse existing variables
instead of hardcoding the same colors repeatedly. Do not redefine tokens
in component styles.

### Typography

-   Follow the font actually configured in the current global
    stylesheet/layout.
-   The project has previously expressed a preference for Poppins, but
    the known stylesheet at one point mapped the sans font to
    Arial/Helvetica. **Inspect the current configuration; do not
    silently change the global font.**
-   Use moderate font weights.
-   Main and section headings generally use 500--600.
-   Body text generally uses 400.
-   Small labels generally use 500.
-   Avoid excessive bold typography, oversized text, or inconsistent
    font scales.

### Visual style

Aim for: - Modern, clean, restrained startup design. - Clear hierarchy
and readable content. - Consistent spacing and alignment. - Subtle
lavender surfaces and borders. - Restrained shadows. - Carefully used
purple accents. - Strong visual clarity without visual clutter.

Avoid: - Unnecessary gradients. - Too many bright colors. - Excessive
glow effects. - Too many cards. - Heavy shadows on every element. -
Random decorative shapes. - Excessively rounded elements everywhere. -
Large amounts of empty decorative UI. - Generic AI-generated
landing-page patterns.

**Do not add a card just to fill space.** Use cards only when they make
information easier to understand or compare.

------------------------------------------------------------------------

## 5. Component and CSS Architecture

### Components

-   Keep page sections in the relevant component directory, following
    the current repository convention.
-   Keep components focused and reasonably small.
-   Use clear, descriptive component names with PascalCase.
-   Prefer straightforward props and data arrays over complex
    abstractions.
-   Reuse components only when the design and behavior are genuinely
    shared.
-   Do not create a separate component for every tiny visual element.
-   Avoid duplicating large blocks of markup or CSS.
-   Use server components by default. Add `"use client"` only when
    client-side interactivity, state, effects, or browser APIs are
    needed.

### CSS

-   Give inline CSS in the component html as much possible 
-   Only give necessery css in globle.css file which may be 
    reusable or frequently useable.
-   Do not create component-specific `.css` files.
-   Do not create CSS modules.
-   Do not import new component CSS files.
-  
-   Put new rules in a clearly labelled section at the bottom or in the
    appropriate existing section.
-   Keep selectors scoped with meaningful component prefixes.
-   Avoid broad selectors that could unintentionally change other pages.
-   Reuse existing theme variables.
-   Do not duplicate existing CSS rules without first checking whether
    they already exist.

Tailwind CSS v4 is used. The global stylesheet is known to begin with:

``` css
@import "tailwindcss";
```

Do not replace the Tailwind v4 setup with Tailwind v3 configuration or
directives. Inspect the actual stylesheet before editing.

### CSS class naming

Use descriptive, page-scoped prefixes. Existing or suggested prefixes
include:

-   `faq-`
-   `footer-`
-   `org-hero-`
-   `org-benefits-`
-   `org-features-`
-   `org-workflow-`
-   `org-faq-`
-   `org-cta-`
-   `participant-hero-`
-   `participant-benefits-`
-   `participant-discovery-`
-   `participant-ai-`
-   `participant-workflow-`
-   `participant-cta-`

If the current component already uses a different consistent naming
pattern, follow that pattern.

------------------------------------------------------------------------

## 6. Animation Principles --- High Priority

Animations are an important part of Hacktrion's visual identity. They
should feel polished and intentional, not decorative or distracting.

### First inspect existing animations

Before adding animation code: - Inspect the homepage section
animations. - Inspect the organizer page animations. - Check how
IntersectionObserver is used. - Check existing CSS keyframes and
transition conventions. - Reuse the established approach where possible.

### Preferred behavior

Use: - Scroll-triggered reveal. - Opacity and small translate
transitions. - Staggered entrance for related items. - Smooth accordion
height/opacity transitions. - Subtle hover and focus transitions. -
Restrained floating movement for product mockups when suitable.

### Technical preferences

-   Prefer CSS transitions/keyframes for simple effects.
-   Prefer the existing IntersectionObserver pattern if it is already
    used.
-   Do not install Framer Motion or another animation library unless
    there is a clear requirement and the project owner approves or the
    dependency is already established.
-   Avoid unnecessary JavaScript animation systems.
-   Avoid excessive blur, bounce, spin, or scale effects.
-   Avoid animations that cause layout shifts.
-   Ensure content remains visible if JavaScript or the observer fails.
-   Respect `prefers-reduced-motion`.
-   Keep mobile performance in mind.
-   Ensure keyboard focus and interaction remain usable.

Animation must never reduce readability, accessibility, or usability.

------------------------------------------------------------------------

## 7. Page-Specific Product and Content Guidance

### Homepage

The homepage introduces Hacktrion and its overall value. Known sections
have included: - Hero - What is Hacktrion - Why Hacktrion - Featured
Experience - How It Works - FAQs - Footer

Inspect the live homepage to confirm its current order and components
before modifying it.

### For Organizers --- `/organizations`

The organizer page is a dedicated marketing/landing page for
institutions and eligible organizations.

Its intended sections: 1. Organizer Hero 2. Organizer Benefits 3.
Organizer Features 4. How It Works 5. Organizer FAQ 6. Final CTA

The dashboard preview section was intentionally left out for now.

Core messaging: - Organize and publish hackathons through Hacktrion. -
Manage hackathons from one platform. - Access participant registration
information. - Download participant information in one Excel file. -
Avoid creating a separate event website for every hackathon.

Do not invent unimplemented organizer features.

### For Participants --- `/participants`

The participant page is a dedicated mobile-app-focused landing page.

Its intended sections: 1. Participant Hero 2. Why Hacktrion 3. Discover
Hackathons 4. AI-Powered Recommendations 5. How It Works 6. Final CTA

Core messaging: - Discover hackathons. - Explore event details. - Get
AI-powered suggestions based on profile and interests. - Follow the
available registration process.

All product visuals must be shown in smartphone frames. Do not show
desktop or laptop product interfaces.

### FAQs

The existing FAQ pattern has two audience groups: - Organizers -
Participants

The FAQ accordion uses independent open state per group and smooth
open/close transitions. Reuse the current implementation or its
established pattern when building similar FAQ experiences.

Do not alter the existing FAQ behavior unnecessarily.

### Footer

The footer should: - Present Hacktrion as the primary brand. - Include a
subtle "A KodePix Product" attribution. - Include Explore/Product,
Information, and Legal links as appropriate. - Include contact and
social links only when the correct values are provided. - Use real
social brand icons where social links are displayed. - Keep the visual
treatment restrained and consistent with the theme.

Known proposed legal routes: - `/privacy-policy` -
`/terms-and-conditions`

These pages were planned; verify whether they have since been
implemented.

Do not invent legal content or claim that KodePix is a registered
company.

------------------------------------------------------------------------

## 8. Images and Public Assets

Before adding images: 1. Inspect the existing `public/` directory. 2.
Search for reusable assets. 3. Reuse the correct image if it already
exists. 4. Preserve existing asset naming conventions.

Next.js public assets are referenced from the root, for example:

``` tsx
<img src="/images/example.png" alt="Description" />
```

Use the project's established image component/pattern if one exists. Do
not switch image handling conventions without reason.

### Product screenshot rules

-   Genuine Hacktrion screenshots are preferred.
-   Do not fabricate product functionality in mockups.
-   If using a placeholder, make it visually clear and consistent.
-   Use portrait smartphone screens for mobile product demonstrations.
-   Never use a desktop dashboard to represent the actual Hacktrion
    product.

Use descriptive alt text. Avoid meaningless alt text such as `"image1"`.

------------------------------------------------------------------------

## 9. Interaction, Accessibility, and Responsive Behavior

### Responsive behavior

All marketing pages must work on: - Large desktop screens. - Laptops. -
Tablets. - Mobile phones.

Do not merely shrink desktop layouts. Reflow content intentionally for
smaller screens.

Check: - No horizontal overflow. - Readable typography. - Appropriate
spacing. - Touch-friendly buttons. - Correct image scaling. - Usable
navigation. - Accordion behavior on mobile.

### Accessibility

-   Use semantic HTML.
-   Use buttons for actions and links for navigation.
-   Provide accessible names for icon-only buttons.
-   Provide meaningful image alt text.
-   Use `aria-expanded` and `aria-controls` for accordions where
    appropriate.
-   Maintain visible keyboard focus.
-   Ensure sufficient contrast.
-   Respect reduced-motion preferences.

### Links and CTAs

-   Check whether a destination route exists before linking to it.
-   Do not leave `href="#"` as a fake interaction.
-   Do not invent app-store URLs, registration URLs, contact addresses,
    or social profiles.
-   If a destination is not yet available, make the placeholder explicit
    in the final report and ask for the real destination when needed.

------------------------------------------------------------------------

## 10. Code Quality and Change Discipline

-   Use TypeScript types correctly.
-   Avoid `any` unless genuinely necessary.
-   Keep code simple and readable.
-   Avoid unnecessary abstractions.
-   Avoid duplicated markup and styles.
-   Do not add dependencies for functionality that can be handled with
    existing tools.
-   Do not refactor unrelated files.
-   Do not overwrite user work.
-   Do not remove existing sections or assets without explicit need.
-   Do not make broad global CSS changes for a page-specific
    requirement.
-   Do not silently change the design system.
-   Do not invent product claims, statistics, testimonials,
    integrations, or functionality.

If a task requires a change to a shared component or global CSS, check
what other pages depend on it and verify those pages after the change.

------------------------------------------------------------------------

## 11. Verification Checklist

After completing a task, verify as much as the repository and
environment allow:

### Functional

-   Requested route loads directly.
-   Internal links go to the correct destinations.
-   Buttons have meaningful behavior.
-   Accordions and tabs work.
-   Images load and have appropriate fallbacks where needed.

### Visual

-   Existing Hacktrion color theme is preserved.
-   Typography is consistent.
-   Spacing and alignment are consistent.
-   No unnecessary cards or decoration were added.
-   Product screenshots use smartphone framing.
-   Desktop, tablet, and mobile layouts work.

### Animation

-   Animations trigger correctly.
-   Staggering is smooth.
-   No layout shifts occur.
-   Content remains visible if animation code fails.
-   Reduced-motion preference is respected.

### Technical

-   No new browser console errors.
-   No TypeScript errors.
-   No broken imports.
-   No broken asset paths.
-   No horizontal overflow.
-   Run the project's available lint/build/type-check scripts when
    practical.
-   Do not claim a check passed unless it was actually run.

### Regression

-   Homepage still works.
-   Navbar and footer still work.
-   Organizer page still works.
-   Participant page still works.
-   Shared CSS changes have not damaged other routes.

------------------------------------------------------------------------

## 12. How to Report Completion

When finished, provide a concise report containing:

1.  **What was implemented** --- a short summary.
2.  **Files created or modified** --- list exact paths.
3.  **Design/animation details** --- mention the important choices.
4.  **Verification performed** --- commands and routes actually tested.
5.  **Remaining placeholders or decisions** --- list any missing real
    assets, URLs, emails, or product details.

Do not simply say "completed" without explaining what changed.

------------------------------------------------------------------------

## 13. Final Non-Negotiable Rules

Keep these rules in mind for every task:

1.  **Read this file and inspect the live codebase before editing.**
2.  **Follow the existing coding style instead of introducing a new
    one.**
3.  **Keep code simple. Avoid unnecessary complexity.**
5.  **Preserve the existing Hacktrion theme and typography.**
6.  **Animations are important, but must remain smooth, useful, and
    accessible.**
7.  **Hacktrion is a mobile-only product. Use smartphone screens for
    product visuals; never represent it as a desktop web app.**
8.  **Do not add unnecessary cards, sections, dependencies, or
    abstractions.**
9.  **Do not invent features, claims, contact information, legal facts,
    or URLs.**
10. **Do not break existing pages while implementing a new task.**
11. **Verify changes and report honestly what was tested.**
12. **When this guide and the current code differ, inspect the
    difference and preserve the established live implementation unless
    the owner explicitly requests a change.**

**Build Hacktrion as a coherent, real-world product. Every change should
feel like it belongs to the existing application---not like a separately
generated template.**
