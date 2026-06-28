// ═══════════════════════════════════════════════════════════
//  MAKE THIS YOURS — this is what turns "cute" into "she cried"
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  herName: "My Favorite Witch",
  yourName: "Your Wizard",

  // Her Hogwarts house (if you know it) — shows on her ticket & prophecy
  herHouse: "gryffindor", // gryffindor | hufflepuff | ravenclaw | slytherin

  // Chapters of YOUR story — rewrite these with real memories
  chapters: [
    {
      title: "Chapter One",
      subtitle: "The Girl Who Lived... in My Heart",
      body: [
        "Every witch needs an origin story. Yours started the moment I realized the world was louder, warmer, and infinitely more interesting with you in it.",
        "You didn't need a lightning scar to be remarkable. You just needed to be you — and that was more than enough to change everything.",
      ],
    },
    {
      title: "Chapter Two",
      subtitle: "The Sorting Hat Would Know Instantly",
      body: [
        "If the Hat sat on your head, it wouldn't need long. It would feel what everyone around you already knows — there is something rare about the way you love, laugh, and light up a room.",
        "I don't know which house you'd be in. I just know I'd want to be wherever you are.",
      ],
    },
    {
      title: "Chapter Three",
      subtitle: "Every Quote You Ever Quoted",
      body: [
        "You know Dumbledore's lines by heart. You understand that happiness can be found even in the darkest times. You get that it is our choices that show who we truly are.",
        "What you might not know: every time you quote those words, I fall a little more. You didn't just grow up with Harry Potter. You grew up with magic in your soul.",
      ],
    },
    {
      title: "Chapter Four",
      subtitle: "The Moments No Book Could Write",
      body: [
        "Replace this with something real: the night you couldn't stop laughing. The way you looked at me when [something specific happened]. The ordinary Tuesday that somehow became my favorite memory.",
        "The books gave you Hogwarts. I want to give you the feeling that someone sees you — really sees you — and thinks you're the most magical thing in any world.",
      ],
    },
    {
      title: "Chapter Five",
      subtitle: "What I Would Tell You at Platform 9¾",
      body: [
        "If we were standing at King's Cross and you were about to board the Hogwarts Express, I wouldn't wave goodbye.",
        "I'd buy a ticket, find your compartment, and sit across from you — because wherever you're going, that's where I want to be.",
      ],
    },
  ],

  // Daily Prophet headlines — make them personal & funny
  prophet: {
    date: "29 June 2026",
    headlines: [
      { text: "LOCAL WITCH'S SMILE DECLARED NATIONAL TREASURE", size: "big" },
      { text: "Boy Who Loved: \"She's My Always,\" Sources Confirm", size: "medium" },
      { text: "Ministry Reports Spike in Butterbeer Sales Near [Her Name]", size: "small" },
      { text: "Hogwarts Alumni: \"We Knew She Was Special\"", size: "small" },
    ],
    article: "In a development that surprised absolutely no one who has ever met her, [Her Name] has once again proven that the most powerful magic in the wizarding world is not a spell, a potion, or a wand — it is being unapologetically, radiantly yourself. Witnesses report that her laugh can dispel Dementors within a fifty-meter radius. One source close to the matter, who wished to remain anonymous but definitely isn't [Your Name], stated: \"I've read seven books about magic. None of them prepared me for her.\"",
  },

  // Living photos — add real photo URLs (imgur, google drive direct link, etc.)
  // Leave empty strings to show beautiful placeholder frames
  photos: [
    { src: "", caption: "Us — a moment worth framing forever" },
    { src: "", caption: "The smile that started everything" },
    { src: "", caption: "My favorite chapter so far" },
  ],

  // The final unlock message (after drawing a heart with wand)
  secretMessage: "I built this entire world because words alone weren't enough. You deserve magic — not the kind in books, but the kind that shows up every day and chooses you. I choose you. Today, tomorrow, and in every chapter still unwritten.",

  // Hogwarts Express ticket — invite her on a real date
  ticket: {
    destination: "Wherever You Are",
    date: "Your Next Free Evening",
    platform: "9¾",
    note: "One ticket. No return date. I'd rather stay.",
  },
};