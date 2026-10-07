import { catalog, dashIcon, type CatalogGame, type DashGame } from "./dashboard";
import { gameDetails } from "./games";
import { logos, posters, scenes, trailers } from "./media";

const di = (hash: string) => `/dasboard-images/${hash}.png`;

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const gameHref = (title: string) => `/dashboard/games/${slugify(title)}`;

export const features = [
  { label: "Mouse/Keyboard", icon: dashIcon("basil_mouse-alt-outline") },
  { label: "4K 120 FPS", icon: dashIcon("ep_monitor") },
  { label: "RTX Enabled", icon: dashIcon("cbi_nvidia-geforce") },
  { label: "Cloud Saves", icon: dashIcon("basil_cloud-download-outline") },
  { label: "Local Saves", icon: dashIcon("fluent_save-28-regular") },
  { label: "DLSS Supported", icon: dashIcon("famicons_hardware-chip-outline") },
  { label: "Controller Ready", icon: dashIcon("famicons_game-controller-outline") },
  { label: "FSR Supported", icon: dashIcon("streamline-logos_amd-logo") },
];

export const stores = [
  { name: "Steam", icon: dashIcon("bi_steam"), bg: "bg-[linear-gradient(180deg,#061937_0%,#126295_100%)]" },
  { name: "GOG", icon: dashIcon("streamline-logos_gog-com-logo-block"), bg: "bg-black" },
];

export type GameDetail = {
  slug: string;
  title: string;
  backdrop: string;
  poster: string;
  logo?: string;
  tagline: string;
  genreLine: string;
  rating: string;
  release: string;
  platforms: string;
  plan: string;
  about: string;
  tags: string[];
  trailer?: string;
  trailerTitle: string;
  gallery: string[];
  publisherLogo?: string;
  publisher: string;
  age: { rating: string; descriptors: string };
  similar: DashGame[];
  mayLike: DashGame[];
};

type Overrides = Partial<Omit<GameDetail, "slug" | "title" | "poster">>;

const overrides: Record<string, Overrides> = {
  "the-last-of-us-part-i": {
    backdrop: scenes.lastOfUs,
    logo: logos.lastOfUs,
    tagline: "Join Joel and Ellie’s survival fight.",
    genreLine: "Action · Survival · Adventure",
    release: "March 28, 2023",
    about:
      "Experience Joel and Ellie’s unforgettable journey through a post-pandemic America, a world where survival demands tough decisions and every choice is deeply influenced by loss, hope, and the powerful bonds they build together along the way.",
    tags: ["Action", "Adventure", "Survival", "Horror", "Story Rich", "Zombies"],
    trailer: trailers.lastOfUs,
    gallery: [di("da6a4915d3ec6478161d5a4ecdba1d22ef8f6950"), posters.lastOfUs, scenes.lastOfUs],
    publisherLogo: di("70622876fd9f43e3d405e6aee633f824442f7b1a"),
    publisher:
      "Naughty Dog · PlayStation Publishing LLC © 2023 Sony Interactive Entertainment LLC. All Rights Reserved. All trademarks and copyrights are the property of their respective owners.",
    age: { rating: "18", descriptors: "Violence · Strong Language" },
  },
  "007-first-light": {
    backdrop: di("0eff8ff800a56577728d107205f03b31b973c234"),
    logo: gameDetails.firstLight.logo,
    tagline: "Become Bond. Stop the threat.",
    genreLine: "Action · Adventure · Spy",
    release: "May 27, 2026",
    trailer: trailers.firstLight,
    about: gameDetails.firstLight.description,
    publisher: "IO Interactive © 2026. All trademarks and copyrights are the property of their respective owners.",
    age: { rating: "16", descriptors: "Violence · Bad Language" },
  },
  "assassins-creed-shadows": {
    backdrop: scenes.shadows,
    logo: logos.shadows,
    tagline: "Enter the shadows of feudal Japan.",
    trailer: trailers.acShadows,
    about: gameDetails.acShadows.description,
    publisher: "Ubisoft © 2025 Ubisoft Entertainment. All Rights Reserved.",
  },
  "god-of-war-ragnarok": { backdrop: di("e4a85b0b9471ab9b805ab8e6bc1b29303786c9d8"), logo: gameDetails.godOfWar.logo, about: gameDetails.godOfWar.description },
  "cyberpunk-2077": { backdrop: di("ae0d8e2467e730114aa37925cc5fdfff6253f978") },
  "assassin-s-creed-odyssey": { backdrop: gameDetails.odyssey.backdrop, logo: gameDetails.odyssey.logo, about: gameDetails.odyssey.description },
  "resident-evil-requiem": { backdrop: gameDetails.residentEvil.backdrop, logo: gameDetails.residentEvil.logo, about: gameDetails.residentEvil.description },
  "assassin-s-creed-black-flag-resynced": { backdrop: gameDetails.blackFlag.backdrop, logo: gameDetails.blackFlag.logo, about: gameDetails.blackFlag.description },
  "death-stranding-2": { backdrop: gameDetails.deathStranding.backdrop, about: gameDetails.deathStranding.description },
  "ea-sports-fc-27": { backdrop: gameDetails.eaFc.backdrop, logo: gameDetails.eaFc.logo, about: gameDetails.eaFc.description },
  "hogwarts-legacy": { backdrop: di("447abedef787f1c2a5ff8a817df43314591496a8") },
};

const pick = (titles: string[]) => titles.map((t) => catalog.find((g) => g.title === t)).filter((g): g is CatalogGame => !!g);

const similarDefault = pick(["007 First Light", "Death Stranding 2", "Call of Duty MW: 3", "Hogwarts Legacy", "Days Gone", "Horizon Forbidden West"]);
const mayLikeDefault = pick([
  "Assassin's Creed Black Flag Resynced",
  "Dying Light The Beast",
  "EA Sports FC 27",
  "Assassin's Creed Odyssey",
  "Assassins Creed Shadows",
  "Resident Evil Requiem",
]);

export const allGameSlugs = () => catalog.map((g) => slugify(g.title));

export function getGameDetail(slug: string): GameDetail | undefined {
  const base = catalog.find((g) => slugify(g.title) === slug);
  if (!base) return undefined;
  const o = overrides[slug] ?? {};
  const image = base.image ?? posters.lastOfUs;

  return {
    slug,
    title: base.title,
    backdrop: o.backdrop ?? image,
    poster: image,
    logo: o.logo,
    tagline: o.tagline ?? `Play ${base.title} instantly in the cloud.`,
    genreLine: o.genreLine ?? base.genres.join(" · "),
    rating: o.rating ?? base.rating,
    release: o.release ?? "Available now",
    platforms: o.platforms ?? "Web · Android · iOS · TV",
    plan: o.plan ?? "Pro Plan",
    about: o.about ?? `Stream ${base.title} on any screen with Nimbus. No downloads, no installs, just press play and pick up right where you left off.`,
    tags: o.tags ?? base.genres,
    trailer: o.trailer,
    trailerTitle: `${base.title} Official Trailer`,
    gallery: o.gallery ?? [o.backdrop ?? image, image, o.backdrop ?? image],
    publisherLogo: o.publisherLogo,
    publisher: o.publisher ?? "All trademarks and copyrights are the property of their respective owners.",
    age: o.age ?? { rating: "16", descriptors: "Violence" },
    similar: similarDefault.filter((g) => g.title !== base.title),
    mayLike: mayLikeDefault.filter((g) => g.title !== base.title),
  };
}
