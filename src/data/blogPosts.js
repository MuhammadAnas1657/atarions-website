export const POSTS = [
  {
    slug: "mastering-data-preprocessing",
    title: "Mastering the Art of Data Preprocessing",
    tag: "Data Preprocessing",
    excerpt:
      "Clean data beats clever models. A practical walkthrough of the preprocessing steps that decide whether your pipeline succeeds or quietly fails.",
    gradient: "from-pulse/30 to-electric/35",
    date: "2026-06-02",
    readTime: "6 min read",
    author: "Shahrina Khan",
    content: [
      "Every machine learning project is sold on the model — the architecture, the tuning, the leaderboard score. In practice, the outcome is decided much earlier, in the unglamorous work of preparing the data the model will actually learn from.",
      "Missing values are the first fork in the road. Dropping rows is the easiest option and often the wrong one — it silently biases the dataset toward whatever pattern caused the values to be missing in the first place. Imputation strategies (mean, median, model-based) preserve sample size, but each one encodes an assumption about why the data is missing that should be stated, not implied.",
      "Outliers deserve the same scrutiny. A value three standard deviations out is not automatically an error — sometimes it is the most informative row in the table. We treat outlier handling as a modeling decision made with domain context, not a mechanical filter applied before anyone has looked at the data.",
      "Feature scaling matters more than its reputation suggests. Distance-based and gradient-based models are sensitive to the relative magnitude of features, and skipping normalization is one of the most common reasons a reasonable model underperforms on real data.",
      "Encoding categorical variables is where pipelines quietly break in production. One-hot encoding that hasn't accounted for unseen categories at inference time is a bug waiting for the first unusual input. We build the encoding step to fail loudly rather than silently, because a silent failure in preprocessing is the hardest kind to trace back.",
      "The common thread across all of this: preprocessing isn't a checklist to clear before the interesting work starts. It is the interesting work — it's where most of the judgment calls that determine a model's real-world reliability actually get made.",
    ],
  },
  {
    slug: "convert-rgb-to-greyscale",
    title: "Convert RGB Image to Greyscale",
    tag: "Python",
    excerpt:
      "Three ways to turn a colour image into greyscale in Python — from a one-line average to a luminance-weighted conversion that matches how human eyes actually perceive brightness.",
    gradient: "from-electric/40 to-violet/50",
    date: "2026-05-18",
    readTime: "4 min read",
    author: "Rabia Anwar",
    content: [
      "Greyscale conversion looks trivial — average the three channels and you're done. But the naive approach produces images that look flatter and less contrasted than they should, because it treats red, green, and blue as equally important to brightness, which they are not.",
      "The simplest method is a straight average: `grey = (R + G + B) / 3`. It's fast and easy to reason about, and for many quick scripts it's genuinely good enough.",
      "The perceptually accurate method uses the luminosity formula: `grey = 0.299*R + 0.587*G + 0.114*B`. This weighting reflects how sensitive the human eye is to each colour — we perceive green as far brighter than blue at the same intensity, so it dominates the calculation.",
      "In practice, with NumPy, this is a one-liner: `grey = img @ [0.299, 0.587, 0.114]`, applied across the last axis of an (H, W, 3) array. It's vectorised, fast, and matches what libraries like OpenCV and Pillow do under the hood when you call their built-in conversions.",
      "A third option — the lightness method, averaging the max and min of the three channels — sits between the two, useful mainly when you want to preserve some contrast without the full perceptual weighting.",
      "Which one you pick should depend on what happens downstream. For thresholding and computer vision preprocessing, luminosity is usually the right default. For a stylistic effect, the flat average can look intentionally muted in a way that's worth keeping.",
    ],
  },
  {
    slug: "choosing-a-tech-stack-that-scales",
    title: "Choosing a Tech Stack That Scales With You",
    tag: "Software Engineering",
    excerpt:
      "The stack that gets you to launch fastest is rarely the one that carries you past your first thousand users without a rewrite. Here's how we think about the trade-off.",
    gradient: "from-violet/40 to-pulse/30",
    date: "2026-04-27",
    readTime: "7 min read",
    author: "Hammad Ali",
    content: [
      "Every stack decision is really a bet on which constraints will bite first: development speed, hiring pool, operational complexity, or raw performance. Optimizing for one usually costs you on another, and the mistake we see most often is optimizing for the constraint that matters least at the current stage of the company.",
      "Early on, the scarcest resource is almost always time-to-validated-learning, not compute efficiency. A stack that lets a small team ship and iterate quickly — even if it costs more in server bills later — is usually the right call for a pre-product-market-fit team.",
      "The trap is treating that early choice as permanent. The frameworks that let you move fast at ten users often have specific, well-known ceilings — a monolith that's fine until deploys start taking twenty minutes, a database schema that's fine until a table crosses tens of millions of rows. Knowing where those ceilings are in advance turns a scaling problem into a scheduled migration instead of a fire drill.",
      "Hiring pool is underweighted in most technical decisions. A stack with a smaller, more specialized talent pool can quietly become the reason a team can't grow fast enough, independent of whether the technology itself is good.",
      "Our rule of thumb: pick boring, well-documented technology for anything that touches durability and correctness — the database, the auth layer, the payment integration — and reserve novelty budget for the parts of the product that are actually the differentiator. Scaling a stack is rarely about rewriting everything; it's about knowing which ten percent will need to change and building the rest to not care when it does.",
    ],
  },
  {
    slug: "designing-apis-clients-dont-hate",
    title: "Designing APIs Your Future Self Won't Hate",
    tag: "Web Development",
    excerpt:
      "Good API design is mostly about naming things consistently and refusing to be clever. A few principles that save months of downstream pain.",
    gradient: "from-pulse/30 to-violet/40",
    date: "2026-03-30",
    readTime: "5 min read",
    author: "Hammad Ali",
    content: [
      "Most API design mistakes aren't technical — they're inconsistencies that compound. A field called `user_id` in one endpoint and `userId` in another forces every client to carry a mental map of exceptions, and that map eventually gets something wrong in production.",
      "Resource naming should describe what a thing is, not how it's currently implemented. An endpoint named after today's database table becomes a liability the moment that table gets refactored, because the URL is now a public contract that has nothing to do with the internal structure it was named after.",
      "Errors deserve as much design attention as success responses. A consistent error shape — status code, machine-readable error code, human-readable message — turns client-side error handling from a pile of special cases into a single, boring code path.",
      "Versioning is a decision to make deliberately, before it's needed, not reactively once a breaking change is already staged. Whether that's a URL prefix, a header, or a deprecation window, the important part is that consumers know what to expect when the API needs to change underneath them.",
      "Pagination, filtering, and sorting conventions should be decided once, in one place, and applied everywhere — not reinvented per-endpoint by whoever happened to build it. The API that feels well-designed years later is usually the one where every endpoint reads like it was written by the same careful person, even when it wasn't.",
    ],
  },
  {
    slug: "evaluating-llms-for-production",
    title: "Evaluating LLMs for Production, Not for Demos",
    tag: "AI / Machine Learning",
    excerpt:
      "A model that impresses in a chat window can still fail quietly in production. What we actually test before shipping an LLM feature to users.",
    gradient: "from-electric/35 to-pulse/35",
    date: "2026-02-14",
    readTime: "6 min read",
    author: "Anas Qaiser",
    content: [
      "A demo answers one good question well. Production has to answer the tenth bad one gracefully — the malformed input, the edge case the prompt wasn't written for, the user who phrases things nothing like your test set. Most of the real evaluation work happens after the model already looks impressive.",
      "We start by separating capability from reliability. Capability is whether the model can do the task at all; reliability is whether it does the task the same way, every time, under the range of inputs real users will actually send. A model can score well on the first and still be unusable on the second.",
      "Latency and cost are product requirements, not infrastructure footnotes. A feature that's accurate but takes eight seconds to respond will get abandoned before anyone notices how good the answer was — so we benchmark under realistic load before committing to a model, not after.",
      "Adversarial and edge-case testing catches what benchmark accuracy hides. We deliberately feed the system inputs designed to break it — ambiguous phrasing, contradictory instructions, prompt injection attempts — because production traffic will eventually send all of these anyway, just without warning.",
      "Finally, we build the fallback path before we need it: what the product does when the model is unsure, wrong, or unavailable. Treating graceful degradation as a first-class feature, not an afterthought, is usually the difference between an AI feature users trust and one they route around.",
    ],
  },
];

export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug);
}
