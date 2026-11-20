/**
 * Blog post data for Hacktrion.
 *
 * HOW TO ADD A NEW POST
 * ─────────────────────
 * 1. Copy one of the existing objects below.
 * 2. Give it a unique `slug` (URL-safe, lowercase, hyphens only).
 * 3. Fill in every field — none are optional.
 * 4. Write the post body in the `content` array.
 *    Each element is a content block:
 *      { type: "paragraph", text: "..." }
 *      { type: "heading",   text: "..." }
 *      { type: "list",      items: ["...", "..."] }
 * 5. Save.  The listing page and detail page update automatically.
 *
 * HOW TO EDIT AN EXISTING POST
 * ─────────────────────────────
 * Find the object by slug, change any field, save.
 * Do NOT change a slug once the post is live — it will break bookmarked URLs.
 *
 * HOW TO DELETE A POST
 * ─────────────────────
 * Remove the object from the array and save.
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading";   text: string }
  | { type: "list";      items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;         // display string e.g. "November 10, 2026"
  readTime: string;     // e.g. "4 min read"
  content: ContentBlock[];
};

const blogs: BlogPost[] = [
  {
    slug: "why-hackathons-matter-for-students",
    title: "Why Hackathons Matter for Students and Early-Career Developers",
    excerpt:
      "Hackathons are more than 48-hour sprints. They are some of the most effective ways students can build real skills, meet collaborators, and discover new career directions.",
    category: "For Participants",
    date: "November 10, 2026",
    readTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "Every year, thousands of hackathons happen across the world. They range from small college events to large national competitions. For students and early-career developers, participating in even one can be a turning point.",
      },
      {
        type: "heading",
        text: "Learning by doing, not by watching",
      },
      {
        type: "paragraph",
        text: "Classrooms teach concepts. Hackathons force you to apply them under time pressure. The gap between understanding a concept and actually building something with it is enormous — and hackathons close that gap fast.",
      },
      {
        type: "paragraph",
        text: "In a 24 or 48-hour hackathon, you will face decisions that no tutorial prepares you for. What feature do you cut? How do you divide work in a team of four? How do you present something that is half-finished but still communicates the idea? These are real skills.",
      },
      {
        type: "heading",
        text: "Building a portfolio that stands out",
      },
      {
        type: "paragraph",
        text: "A hackathon project — even one that did not win — demonstrates initiative. When you apply for internships or jobs, a project you built in 36 hours is a concrete signal that you can ship, not just study.",
      },
      {
        type: "heading",
        text: "Finding your community",
      },
      {
        type: "paragraph",
        text: "Hackathons attract curious, motivated people. The teammates you meet, the mentors who judge your project, and the organizers you interact with are often the beginning of professional relationships that last years.",
      },
      {
        type: "heading",
        text: "How Hacktrion helps you discover events",
      },
      {
        type: "paragraph",
        text: "Hacktrion is designed to make finding hackathons easier. Instead of searching across dozens of websites, you can explore events from multiple organizers in one place. Hacktrion also uses your profile and interests to suggest hackathons that may be a good fit for you — so the events that reach you are more likely to be relevant.",
      },
      {
        type: "list",
        items: [
          "Browse hackathons from colleges, universities, and institutions.",
          "See event details, dates, and registration information in one place.",
          "Receive AI-powered recommendations based on your interests.",
          "Register through the available process without switching platforms.",
        ],
      },
      {
        type: "paragraph",
        text: "Hacktrion is a mobile application. You can explore opportunities, discover events, and follow the registration process entirely from your phone.",
      },
    ],
  },

  {
    slug: "how-to-organize-a-hackathon-without-the-chaos",
    title: "How to Organize a Hackathon Without the Operational Chaos",
    excerpt:
      "Running a hackathon involves more moving parts than most people expect. Here is what organizers consistently get wrong — and what Hacktrion is designed to help with.",
    category: "For Organizers",
    date: "November 5, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Organizing a hackathon looks exciting from the outside. From the inside, it is a project management challenge with tight timelines, public visibility, and very little margin for error on event day.",
      },
      {
        type: "heading",
        text: "The registration problem",
      },
      {
        type: "paragraph",
        text: "The most common failure point for first-time hackathon organizers is registration management. Spreadsheets fill up. Forms get duplicated. Someone emails asking if they registered and you are not sure. Participant data ends up scattered across email threads, Google Forms, and Excel files from three different team members.",
      },
      {
        type: "paragraph",
        text: "This is not a unique problem. It happens because most organizers build their own systems for every event. Hacktrion is designed so that organizers do not have to rebuild that system each time.",
      },
      {
        type: "heading",
        text: "One platform, multiple hackathons",
      },
      {
        type: "paragraph",
        text: "With Hacktrion, your organizer account persists across events. Once your profile is set up, publishing a new hackathon means filling in event details — not rebuilding registration infrastructure. Your participant data is accessible through your organizer dashboard, and you can download the full registered participant list in a single Excel file.",
      },
      {
        type: "heading",
        text: "No separate event website needed",
      },
      {
        type: "paragraph",
        text: "Many organizers spend significant time building a website for their hackathon — only to take it down after the event. Hacktrion lets you publish event information directly on the platform, so participants can find your event without you needing to maintain a separate site.",
      },
      {
        type: "heading",
        text: "What Hacktrion handles for organizers",
      },
      {
        type: "list",
        items: [
          "Publish hackathon details in one place.",
          "Manage registrations through an organizer dashboard.",
          "Access participant registration information without digging through emails.",
          "Download all registered participant data as one Excel file.",
          "Run multiple hackathons from a single organizer account.",
        ],
      },
      {
        type: "paragraph",
        text: "The goal is not to replace the energy that makes a great hackathon. It is to remove the operational friction that takes time away from it.",
      },
    ],
  },

  {
    slug: "ai-recommendations-hacktrion",
    title: "How Hacktrion's AI-Powered Recommendations Work",
    excerpt:
      "AI-powered hackathon recommendations are one of Hacktrion's core features for participants. Here is what they actually do and why they matter.",
    category: "Product",
    date: "October 28, 2026",
    readTime: "3 min read",
    content: [
      {
        type: "paragraph",
        text: "Discovering the right hackathon is not always straightforward. There are many events, they vary widely in focus and format, and not all of them are easy to find. Hacktrion's AI-powered recommendation system is built to help participants find events that are actually relevant to them.",
      },
      {
        type: "heading",
        text: "What the recommendations do",
      },
      {
        type: "paragraph",
        text: "Hacktrion uses your profile information and stated interests to surface hackathons that may be a good fit. If you are interested in machine learning, you are more likely to see ML-focused events. If you have participated in web development hackathons before, similar events may appear in your recommendations.",
      },
      {
        type: "paragraph",
        text: "The idea is simple: less manual searching, more time deciding whether an event is worth joining.",
      },
      {
        type: "heading",
        text: "Why this matters",
      },
      {
        type: "paragraph",
        text: "The number of hackathons happening at any given time is large. Without some way to filter, participants often miss events that would have been genuinely interesting to them — simply because those events were not visible in the right places.",
      },
      {
        type: "paragraph",
        text: "Recommendations are not a replacement for browsing. They are a starting point. You can still explore all available hackathons directly. Recommendations just reduce the effort of finding relevant ones.",
      },
      {
        type: "heading",
        text: "Available on mobile",
      },
      {
        type: "paragraph",
        text: "Hacktrion is a mobile application. Recommendations appear directly in your feed as you browse. You do not need to visit a separate section or run a search — relevant events surface naturally as part of the discovery experience.",
      },
      {
        type: "list",
        items: [
          "Recommendations are based on your profile and interests.",
          "They appear as part of the normal discovery feed.",
          "You can still browse all events independently.",
          "The more complete your profile, the more relevant the suggestions.",
        ],
      },
    ],
  },

  {
    slug: "hacktrion-for-college-tech-clubs",
    title: "Hacktrion for College Tech Clubs: Running Your First Hackathon",
    excerpt:
      "College tech clubs and student bodies are some of the most active hackathon organizers. Here is what to expect when you run your first event — and how Hacktrion supports the process.",
    category: "For Organizers",
    date: "October 20, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Student-run hackathons are often where participants have their best experiences. The energy is genuine, the problems are relatable, and the community is tight. But running one for the first time is harder than it looks.",
      },
      {
        type: "heading",
        text: "Before the event: the planning phase",
      },
      {
        type: "paragraph",
        text: "Every successful hackathon starts with clear decisions made early: What is the theme or focus? Who is the target participant? What is the team size limit? What does registration close? What are the submission requirements?",
      },
      {
        type: "paragraph",
        text: "These questions seem simple, but inconsistency in answering them publicly is one of the most common sources of participant confusion during registration.",
      },
      {
        type: "heading",
        text: "Publishing on Hacktrion",
      },
      {
        type: "paragraph",
        text: "Once your event details are confirmed, publishing on Hacktrion puts your hackathon in front of participants who are already looking for events. You fill in the event information through your organizer dashboard, and participants can find and explore your event from the app.",
      },
      {
        type: "paragraph",
        text: "You do not need to build a separate website. Hacktrion handles the public event listing, so your team can focus on running the event rather than maintaining a web presence for it.",
      },
      {
        type: "heading",
        text: "During registration: managing participants",
      },
      {
        type: "paragraph",
        text: "The registration period is usually when the operational workload peaks. You receive questions, track team formation, follow up with incomplete registrations, and try to keep an accurate count of who is coming.",
      },
      {
        type: "paragraph",
        text: "Hacktrion's organizer dashboard gives you access to participant registration information as it comes in. When you need the full list — for venue planning, communication, or judging logistics — you can download it as an Excel file.",
      },
      {
        type: "heading",
        text: "After the event",
      },
      {
        type: "paragraph",
        text: "One advantage of organizing through Hacktrion is that your organizer account stays active. When your club runs the next hackathon, you are not starting from scratch. Your profile is already set up, and the process of publishing a new event is significantly faster.",
      },
      {
        type: "list",
        items: [
          "Colleges, universities, institutions, and eligible organizations can register as organizers.",
          "Create and publish hackathon details through the organizer dashboard.",
          "Manage participant registrations in one place.",
          "Download a complete participant list as an Excel file.",
          "Reuse your organizer account for multiple events.",
        ],
      },
      {
        type: "paragraph",
        text: "Hacktrion is a product of KodePix, built to reduce the operational overhead of running hackathons so organizers can focus on the experience they are creating.",
      },
    ],
  },
];

export default blogs;
