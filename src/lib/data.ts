import type { Production } from "./types";

/**
 * 14 sample productions covering edge cases:
 * multi-date runs, single-date concerts, world premieres, sold-out signals,
 * one with no image, one with a single performer, one festival.
 *
 * The Before view flattens these into a row-per-date listing (matching
 * Operabase today). The After view keeps them grouped.
 */
export const PRODUCTIONS: Production[] = [
  {
    id: "p001",
    work: "La Traviata",
    composer: "Giuseppe Verdi",
    workType: "Opera in 3 acts",
    company: "Wiener Staatsoper",
    venue: "Wiener Staatsoper",
    city: "Vienna",
    country: "Austria",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    imageAlt: "La Traviata production scene",
    badges: ["new-production", "booking-fast"],
    productionNote: "New production directed by Simon Stone.",
    language: "Italian",
    dates: [
      { iso: "2026-06-12", status: "low" },
      { iso: "2026-06-15", status: "available" },
      { iso: "2026-06-18", status: "low" },
      { iso: "2026-06-21", status: "sold-out" },
      { iso: "2026-06-24", status: "available" },
      { iso: "2026-06-27", status: "available" },
    ],
    cast: [
      {
        id: "a-netrebko",
        name: "Anna Netrebko",
        voice: "Soprano",
        role: "Violetta Valéry",
        bio: "Russian-Austrian soprano, one of the most celebrated artists of her generation.",
        topRoles: ["Tosca", "Lady Macbeth", "Aida"],
        agency: "Centre Stage Artist Management",
        upcomingCount: 14,
      },
      {
        id: "j-kaufmann",
        name: "Jonas Kaufmann",
        voice: "Tenor",
        role: "Alfredo Germont",
        bio: "German tenor known for the Italian, French, and German repertoire.",
        topRoles: ["Otello", "Don José", "Florestan"],
        agency: "Zemsky/Green Artists",
        upcomingCount: 21,
      },
      {
        id: "l-tezier",
        name: "Ludovic Tézier",
        voice: "Baritone",
        role: "Giorgio Germont",
        agency: "IMG Artists",
      },
      {
        id: "p-jordan",
        name: "Philippe Jordan",
        voice: "Conductor",
        role: "Conductor",
      },
      {
        id: "s-stone",
        name: "Simon Stone",
        voice: "Director",
        role: "Director",
      },
    ],
  },
  {
    id: "p002",
    work: "Tristan und Isolde",
    composer: "Richard Wagner",
    workType: "Music drama in 3 acts",
    company: "Bayerische Staatsoper",
    venue: "Nationaltheater München",
    city: "Munich",
    country: "Germany",
    image:
      "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&q=80",
    badges: ["new-production", "critically-acclaimed"],
    productionNote: "Premiere of the Krzysztof Warlikowski staging.",
    language: "German",
    dates: [
      { iso: "2026-06-08", status: "sold-out" },
      { iso: "2026-06-14", status: "sold-out" },
      { iso: "2026-06-19", status: "low" },
      { iso: "2026-06-23", status: "low" },
    ],
    cast: [
      {
        id: "a-stemme",
        name: "Nina Stemme",
        voice: "Soprano",
        role: "Isolde",
        agency: "Askonas Holt",
      },
      {
        id: "k-vogt",
        name: "Klaus Florian Vogt",
        voice: "Tenor",
        role: "Tristan",
        debut: true,
      },
      {
        id: "v-jurowski",
        name: "Vladimir Jurowski",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p003",
    work: "The Hours",
    composer: "Kevin Puts",
    workType: "Opera in 2 acts (US premiere run)",
    company: "Metropolitan Opera",
    venue: "Metropolitan Opera House",
    city: "New York",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1518973070330-c08e1ea5fa6a?w=800&q=80",
    badges: ["world-premiere", "critically-acclaimed"],
    language: "English",
    dates: [
      { iso: "2026-06-10", status: "available" },
      { iso: "2026-06-13", status: "available" },
      { iso: "2026-06-17", status: "low" },
    ],
    cast: [
      {
        id: "r-fleming",
        name: "Renée Fleming",
        voice: "Soprano",
        role: "Clarissa Vaughan",
      },
      {
        id: "k-okonkwo",
        name: "Kelli O'Hara",
        voice: "Soprano",
        role: "Laura Brown",
        debut: true,
      },
      {
        id: "j-dinardo",
        name: "Joyce DiDonato",
        voice: "Mezzo-soprano",
        role: "Virginia Woolf",
      },
      {
        id: "y-nezet",
        name: "Yannick Nézet-Séguin",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p004",
    work: "Carmen",
    composer: "Georges Bizet",
    workType: "Opera in 4 acts",
    company: "Royal Opera House",
    venue: "Royal Opera House, Covent Garden",
    city: "London",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1580809361436-42a7ec204889?w=800&q=80",
    badges: ["festival"],
    language: "French",
    dates: [
      { iso: "2026-06-11", status: "available" },
      { iso: "2026-06-16", status: "available" },
      { iso: "2026-06-20", status: "available" },
      { iso: "2026-06-25", status: "low" },
      { iso: "2026-06-29", status: "available" },
    ],
    cast: [
      {
        id: "e-garanca",
        name: "Elīna Garanča",
        voice: "Mezzo-soprano",
        role: "Carmen",
      },
      {
        id: "p-jaho",
        name: "Ermonela Jaho",
        voice: "Soprano",
        role: "Micaëla",
      },
      {
        id: "r-eyvazov",
        name: "Yusif Eyvazov",
        voice: "Tenor",
        role: "Don José",
      },
      {
        id: "a-pappano",
        name: "Antonio Pappano",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p005",
    work: "Salome",
    composer: "Richard Strauss",
    workType: "Opera in 1 act",
    company: "Teatro alla Scala",
    venue: "Teatro alla Scala",
    city: "Milan",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1499415479124-43c32433a620?w=800&q=80",
    badges: ["new-production"],
    language: "German",
    dates: [
      { iso: "2026-06-09", status: "low" },
      { iso: "2026-06-13", status: "available" },
      { iso: "2026-06-17", status: "available" },
    ],
    cast: [
      {
        id: "m-petersen",
        name: "Marlis Petersen",
        voice: "Soprano",
        role: "Salome",
      },
      {
        id: "g-grimsley",
        name: "Greer Grimsley",
        voice: "Bass-baritone",
        role: "Jochanaan",
      },
      {
        id: "r-chailly",
        name: "Riccardo Chailly",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p006",
    work: "Das Rheingold",
    composer: "Richard Wagner",
    workType: "Vorabend zum Bühnenfestspiel — Festival production",
    company: "Bayreuther Festspiele",
    venue: "Festspielhaus Bayreuth",
    city: "Bayreuth",
    country: "Germany",
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
    badges: ["festival", "booking-fast"],
    language: "German",
    dates: [
      { iso: "2026-07-25", status: "sold-out" },
      { iso: "2026-08-04", status: "sold-out" },
      { iso: "2026-08-12", status: "low" },
    ],
    cast: [
      {
        id: "t-konieczny",
        name: "Tomasz Konieczny",
        voice: "Bass-baritone",
        role: "Wotan",
      },
      {
        id: "o-fritz",
        name: "Okka von der Damerau",
        voice: "Mezzo-soprano",
        role: "Fricka",
      },
      {
        id: "p-schneider",
        name: "Pablo Heras-Casado",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p007",
    work: "Madama Butterfly",
    composer: "Giacomo Puccini",
    workType: "Opera in 3 acts",
    company: "Opéra National de Paris",
    venue: "Opéra Bastille",
    city: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80",
    language: "Italian",
    dates: [
      { iso: "2026-06-14", status: "available" },
      { iso: "2026-06-18", status: "available" },
      { iso: "2026-06-22", status: "available" },
      { iso: "2026-06-26", status: "low" },
    ],
    cast: [
      {
        id: "h-yoncheva",
        name: "Sonya Yoncheva",
        voice: "Soprano",
        role: "Cio-Cio-San",
      },
      {
        id: "a-castronovo",
        name: "Charles Castronovo",
        voice: "Tenor",
        role: "Pinkerton",
      },
      {
        id: "g-noseda",
        name: "Gianandrea Noseda",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p008",
    work: "Don Giovanni",
    composer: "Wolfgang Amadeus Mozart",
    workType: "Dramma giocoso in 2 acts",
    company: "Salzburger Festspiele",
    venue: "Großes Festspielhaus",
    city: "Salzburg",
    country: "Austria",
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
    badges: ["festival"],
    language: "Italian",
    dates: [
      { iso: "2026-08-05", status: "low" },
      { iso: "2026-08-09", status: "low" },
      { iso: "2026-08-15", status: "sold-out" },
    ],
    cast: [
      {
        id: "p-spyres",
        name: "Michael Spyres",
        voice: "Baritone",
        role: "Don Giovanni",
      },
      {
        id: "n-sierra",
        name: "Nadine Sierra",
        voice: "Soprano",
        role: "Donna Anna",
      },
      {
        id: "t-currentzis",
        name: "Teodor Currentzis",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p009",
    work: "Pelléas et Mélisande",
    composer: "Claude Debussy",
    workType: "Opera in 5 acts",
    company: "Glyndebourne Festival Opera",
    venue: "Glyndebourne",
    city: "Lewes",
    country: "United Kingdom",
    badges: ["festival", "new-production"],
    language: "French",
    dates: [
      { iso: "2026-07-02", status: "available" },
      { iso: "2026-07-06", status: "available" },
      { iso: "2026-07-10", status: "available" },
    ],
    cast: [
      {
        id: "k-stober",
        name: "Karen Stöber",
        voice: "Soprano",
        role: "Mélisande",
        debut: true,
      },
      {
        id: "h-corcelle",
        name: "Huw Montague Rendall",
        voice: "Baritone",
        role: "Pelléas",
      },
      {
        id: "r-ticciati",
        name: "Robin Ticciati",
        voice: "Conductor",
        role: "Conductor",
      },
    ],
  },
  {
    id: "p010",
    work: "Aida",
    composer: "Giuseppe Verdi",
    workType: "Opera in 4 acts",
    company: "Arena di Verona",
    venue: "Arena di Verona",
    city: "Verona",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1608425234255-444f00284adb?w=800&q=80",
    badges: ["festival", "booking-fast"],
    language: "Italian",
    dates: [
      { iso: "2026-07-15", status: "available" },
      { iso: "2026-07-22", status: "low" },
      { iso: "2026-07-29", status: "available" },
      { iso: "2026-08-02", status: "available" },
      { iso: "2026-08-08", status: "available" },
    ],
    cast: [
      {
        id: "a-radvanovsky",
        name: "Sondra Radvanovsky",
        voice: "Soprano",
        role: "Aida",
      },
      {
        id: "y-meli",
        name: "Francesco Meli",
        voice: "Tenor",
        role: "Radamès",
      },
      {
        id: "a-rachvelishvili",
        name: "Anita Rachvelishvili",
        voice: "Mezzo-soprano",
        role: "Amneris",
      },
    ],
  },
  {
    id: "p011",
    work: "Mahler: Symphony No. 2 'Resurrection'",
    composer: "Gustav Mahler",
    workType: "Concert (single performance)",
    company: "Berliner Philharmoniker",
    venue: "Philharmonie Berlin",
    city: "Berlin",
    country: "Germany",
    badges: ["critically-acclaimed"],
    language: "German",
    dates: [{ iso: "2026-06-15", status: "low" }],
    cast: [
      {
        id: "k-petrenko",
        name: "Kirill Petrenko",
        voice: "Conductor",
        role: "Conductor",
      },
      {
        id: "d-damrau",
        name: "Diana Damrau",
        voice: "Soprano",
        role: "Soprano",
      },
    ],
  },
  {
    id: "p012",
    work: "Otello",
    composer: "Giuseppe Verdi",
    workType: "Opera in 4 acts",
    company: "Lyric Opera of Chicago",
    venue: "Lyric Opera House",
    city: "Chicago",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    badges: ["final-run"],
    language: "Italian",
    dates: [
      { iso: "2026-06-16", status: "available" },
      { iso: "2026-06-20", status: "low" },
    ],
    cast: [
      {
        id: "r-alagna",
        name: "Roberto Alagna",
        voice: "Tenor",
        role: "Otello",
      },
      {
        id: "f-grimaldi",
        name: "Federica Lombardi",
        voice: "Soprano",
        role: "Desdemona",
      },
    ],
  },
  {
    id: "p013",
    work: "Norma",
    composer: "Vincenzo Bellini",
    workType: "Opera in 2 acts",
    company: "Liceu Barcelona",
    venue: "Gran Teatre del Liceu",
    city: "Barcelona",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1545972154-9bb223aac798?w=800&q=80",
    language: "Italian",
    dates: [
      { iso: "2026-06-19", status: "available" },
      { iso: "2026-06-23", status: "available" },
    ],
    cast: [
      {
        id: "j-pratt",
        name: "Jessica Pratt",
        voice: "Soprano",
        role: "Norma",
      },
      {
        id: "m-pizzolato",
        name: "Marianna Pizzolato",
        voice: "Mezzo-soprano",
        role: "Adalgisa",
      },
    ],
  },
  {
    id: "p014",
    work: "Dialogues des Carmélites",
    composer: "Francis Poulenc",
    workType: "Opera in 3 acts",
    company: "Dutch National Opera",
    venue: "Nationale Opera & Ballet",
    city: "Amsterdam",
    country: "Netherlands",
    badges: ["new-production", "critically-acclaimed"],
    language: "French",
    dates: [
      { iso: "2026-06-17", status: "available" },
      { iso: "2026-06-21", status: "available" },
      { iso: "2026-06-24", status: "low" },
    ],
    cast: [
      {
        id: "p-petibon",
        name: "Patricia Petibon",
        voice: "Soprano",
        role: "Blanche de la Force",
      },
      {
        id: "v-gens",
        name: "Véronique Gens",
        voice: "Soprano",
        role: "Madame Lidoine",
      },
    ],
  },
];

export type FilterState = {
  city: string;
  country: string;
  composer: string;
  voice: string;
  query: string;
  fromDate: string;
  toDate: string;
};

export const EMPTY_FILTERS: FilterState = {
  city: "",
  country: "",
  composer: "",
  voice: "",
  query: "",
  fromDate: "",
  toDate: "",
};

export function applyFilters(
  productions: Production[],
  f: FilterState,
): Production[] {
  return productions.filter((p) => {
    if (f.city && p.city !== f.city) return false;
    if (f.country && p.country !== f.country) return false;
    if (f.composer && !p.composer.includes(f.composer)) return false;
    if (
      f.query &&
      !`${p.work} ${p.composer} ${p.company} ${p.city}`
        .toLowerCase()
        .includes(f.query.toLowerCase())
    )
      return false;
    if (f.voice && !p.cast.some((c) => c.voice === f.voice)) return false;
    if (f.fromDate && !p.dates.some((d) => d.iso >= f.fromDate)) return false;
    if (f.toDate && !p.dates.some((d) => d.iso <= f.toDate)) return false;
    return true;
  });
}

/** For the Before view: flatten productions to one row per date. */
export function flattenToRows(productions: Production[]) {
  return productions
    .flatMap((p) =>
      p.dates.map((d) => ({
        production: p,
        date: d,
      })),
    )
    .sort((a, b) => a.date.iso.localeCompare(b.date.iso));
}

export function uniqueValues<T>(arr: T[], key: (x: T) => string): string[] {
  return Array.from(new Set(arr.map(key))).sort();
}
