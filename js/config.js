// ═══════════════════════════════════════════════════════════
//  MAKE THIS YOURS — this is what turns "cute" into "she cried"
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  herName: "My Favorite Witch",
  yourName: "Your Wizard",
  herHouse: "gryffindor",

  chapters: [
    {
      title: "Chapter One",
      subtitle: "The Girl Who Lived... in My Heart",
      body: [
        "Every witch needs an origin story. Yours started the moment I realized the world was louder, warmer, and infinitely more interesting with you in it.",
        "You didn't need a lightning scar to be remarkable. You just needed to be you — and that was more than enough to change everything.",
      ],
      gift: "P.S. — I still get nervous when you text me first. In a good way.",
    },
    {
      title: "Chapter Two",
      subtitle: "The Sorting Hat Would Know Instantly",
      body: [
        "If the Hat sat on your head, it wouldn't need long. It would feel what everyone around you already knows — there is something rare about the way you love, laugh, and light up a room.",
        "I don't know which house you'd be in. I just know I'd want to be wherever you are.",
      ],
      gift: "P.S. — Your laugh is my favorite sound in any universe.",
    },
    {
      title: "Chapter Three",
      subtitle: "Every Quote You Ever Quoted",
      body: [
        "You know Dumbledore's lines by heart. You understand that happiness can be found even in the darkest times. You get that it is our choices that show who we truly are.",
        "What you might not know: every time you quote those words, I fall a little more.",
      ],
      gift: "P.S. — I'd sit through every movie with you. Even the long ones. Especially the long ones.",
    },
    {
      title: "Chapter Four",
      subtitle: "The Moments No Book Could Write",
      body: [
        "Replace this with something real — a specific night, a look, an ordinary Tuesday that became your favorite memory.",
        "The books gave you Hogwarts. I want to give you the feeling that someone sees you — really sees you.",
      ],
      gift: "P.S. — I'm proud of you. For the big things and the quiet ones.",
    },
    {
      title: "Chapter Five",
      subtitle: "What I Would Tell You at Platform 9¾",
      body: [
        "If we were at King's Cross and you were boarding the Hogwarts Express, I wouldn't wave goodbye.",
        "I'd buy a ticket and sit across from you — because wherever you're going, that's where I want to be.",
      ],
      gift: "P.S. — This isn't the end of the book. It's just where I ran out of pages.",
    },
  ],

  // Amortentia — what she "smells like" to you (tap each vial)
  amortentia: [
    { scent: "Fresh parchment", meaning: "Like the first page of a story — the beginning of us." },
    { scent: "Rain on a window", meaning: "The cozy feeling of being warm inside while the world goes on without you." },
    { scent: "Something sweet", meaning: "Your smile. Obviously." },
    { scent: "Home", meaning: "Because that's what you are to me." },
  ],

  // Mirror of Erised
  mirror: {
    prompt: "Tap the mirror to see your heart's deepest desire...",
    reveal: "You, surrounded by people who love you exactly as you are — with someone who never stops choosing you.",
  },

  prophet: {
    date: "29 June 2026",
    headlines: [
      { text: "LOCAL WITCH'S SMILE DECLARED NATIONAL TREASURE", size: "big", secret: "Ministry officials were seen weeping. One said: 'It's unfair how cute she is.'" },
      { text: "Boy Who Loved: \"She's My Always,\" Sources Confirm", size: "medium", secret: "The source was me. I won't shut up about you." },
      { text: "Butterbeer Sales Spike Near [Her Name]", size: "small", secret: "Correlation: she mentioned wanting one. Causation: I ordered two." },
      { text: "Hogwarts Alumni: \"We Knew She Was Special\"", size: "small", secret: "Harry, Hermione, and Ron all nodded in agreement." },
    ],
    article: "In a development that surprised absolutely no one who has ever met her, [Her Name] has once again proven that the most powerful magic in the wizarding world is not a spell, a potion, or a wand — it is being unapologetically, radiantly yourself. Witnesses report that her laugh can dispel Dementors within a fifty-meter radius. One source close to the matter, who wished to remain anonymous but definitely isn't [Your Name], stated: \"I've read seven books about magic. None of them prepared me for her.\"",
  },

  photos: [
    { src: "", caption: "Us — a moment worth framing forever", secret: "I look at this more than I'd admit." },
    { src: "", caption: "The smile that started everything", secret: "This is when I knew I was in trouble." },
    { src: "", caption: "My favorite chapter so far", secret: "And I'm greedy for the next one." },
  ],

  // Chocolate Frog cards — flip to reveal
  frogCards: [
    { name: "The Brilliant One", fact: "Known for quoting Dumbledore at 2am and being right every time." },
    { name: "The Beautiful One", fact: "Has been told she's pretty. Has NOT been told enough how her eyes light up when she talks about things she loves." },
    { name: "The One Who Changed Everything", fact: "Turned an ordinary person into someone who builds enchanted websites at midnight because words weren't enough." },
  ],

  // Howler — tap to rip open
  howler: {
    shout: "I LOVE YOU AND I'M NOT EVEN SORRY ABOUT IT!",
    quiet: "Okay fine, I'd be embarrassed if anyone else heard that. But I meant every word.",
  },

  secretMessage: "I built this entire world because words alone weren't enough. You deserve magic — not the kind in books, but the kind that shows up every day and chooses you. I choose you. Today, tomorrow, and in every chapter still unwritten.",

  // Messages when she catches golden snitches
  snitchMessages: [
    "150 points to Gryffindor! (And to you.)",
    "You're quicker than Harry. Impressive.",
    "Caught it! Just like you caught my attention.",
    "One more... you're on fire!",
    "Mischief managed. You're incredible.",
  ],

  ticket: {
    destination: "Wherever You Are",
    date: "Your Next Free Evening",
    platform: "9¾",
    note: "One ticket. No return date. I'd rather stay.",
  },

  hugMessage: "Consider this a long-distance hug. I'm holding you in every way I can.",
  finaleNote: "If you're reading this with a smile — mission accomplished. If you're crying — also mission accomplished.",
};