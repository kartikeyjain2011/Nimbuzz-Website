import { gameDetails } from "./games";
import { logos, posters, scenes, trailers } from "./media";

const di = (hash: string, ext = "png") => `/dasboard-images/${hash}.${ext}`;
export const dashIcon = (name: string) => `/dashboard-icons/${name}.svg`;

export const dashArt = {
  avatar: di("b92085a90bac1a5793b3895ec131b696a9414d27"),
  groupAvatar: di("45e7b20edf3d23721dc5c2d4ba3c4baaa69c2ba9", "jpg"),
  controller: di("721e5777935a7d4fe81ea819852f8334476dd811"),
  ratingStar: di("ee89f94e7f68935e5b95eb4c91bf783e92183203"),
};

export type Genre = "Action" | "Adventure" | "RPG" | "Sports" | "Horror" | "Shooter" | "Puzzle" | "Survival" | "Multiplayer";

export const genres: ("All" | Genre)[] = ["All", "Action", "Adventure", "RPG", "Sports", "Horror", "Shooter", "Puzzle", "Survival", "Multiplayer"];

/** `image` is optional: titles without artwork yet render a branded fallback. */
export type DashGame = { title: string; image?: string; genres?: Genre[] };

export type FeaturedGame = {
  title: string;
  backdrop: string;
  logo?: string;
  tagline: string;
  genres: string;
  rating: string;
  release: string;
  trailer?: string;
};

export const featured: FeaturedGame[] = [
  {
    title: "Assassin's Creed Shadows",
    backdrop: gameDetails.acShadows.backdrop,
    logo: logos.shadows,
    tagline: "Enter the shadows of feudal Japan.",
    genres: "Action · RPG · Adventure",
    rating: "4.4 (1.9K)",
    release: "March 20, 2025",
    trailer: trailers.acShadows,
  },
  {
    title: "007 First Light",
    backdrop: gameDetails.firstLight.backdrop,
    logo: gameDetails.firstLight.logo,
    tagline: "Earn the double-O. Become Bond.",
    genres: "Action · Stealth · Adventure",
    rating: "4.6 (2.3K)",
    release: "March 27, 2026",
    trailer: trailers.firstLight,
  },
  {
    title: "God of War Ragnarök",
    backdrop: gameDetails.godOfWar.backdrop,
    logo: gameDetails.godOfWar.logo,
    tagline: "Fimbulwinter is here. Ragnarök is coming.",
    genres: "Action · Adventure",
    rating: "4.8 (5.1K)",
    release: "September 19, 2024",
  },
  {
    title: "The Last of Us Part I",
    backdrop: scenes.lastOfUs,
    logo: logos.lastOfUs,
    tagline: "Survive a brutal, post-pandemic America.",
    genres: "Action · Survival · Horror",
    rating: "4.7 (4.2K)",
    release: "March 28, 2023",
    trailer: trailers.lastOfUs,
  },
];

export const gamesPageFeatured: FeaturedGame[] = [
  { ...featured[1], tagline: "Become Bond. Stop the threat.", genres: "Action · Adventure · Spy", rating: "4.6 (2.1K)", release: "May 27, 2026" },
  featured[0],
  featured[3],
  featured[2],
];

export type CatalogGame = DashGame & { rating: string; genres: Genre[] };

export const catalog: CatalogGame[] = [
  { title: "The Last of Us Part I", image: posters.lastOfUs, rating: "4.4 (22K)", genres: ["Action", "Survival", "Horror"] },
  { title: "Assassin's Creed Black Flag Resynced", image: posters.blackFlag, rating: "4.2 (1.2K)", genres: ["Action", "Adventure"] },
  { title: "Resident Evil Requiem", image: posters.residentEvil, rating: "4.3 (1.0K)", genres: ["Horror", "Survival"] },
  { title: "Assassins Creed Shadows", image: posters.acShadows, rating: "4.4 (1.9K)", genres: ["Action", "RPG", "Adventure"] },
  { title: "Death Stranding 2", image: posters.deathStranding, rating: "4.0 (1.1K)", genres: ["Adventure"] },
  { title: "Days Gone", image: di("4bbcd6a79f833cd6d1d576a05a189386838edc4b"), rating: "4.2 (1.4K)", genres: ["Action", "Survival", "Horror"] },
  { title: "Assassin's Creed Odyssey", image: posters.odyssey, rating: "4.8 (2.9K)", genres: ["RPG", "Adventure", "Action"] },
  { title: "The Witcher 3: Wild Hunt", image: posters.witcher, rating: "4.8 (3.1K)", genres: ["RPG", "Adventure"] },
  { title: "007 First Light", image: posters.firstLight, rating: "4.6 (2.1K)", genres: ["Action", "Adventure"] },
  { title: "God of War Ragnarök", image: posters.godOfWar, rating: "4.8 (5.1K)", genres: ["Action", "Adventure"] },
  { title: "Cyberpunk 2077", image: posters.cyberpunk, rating: "4.5 (8.7K)", genres: ["RPG", "Shooter", "Action"] },
  { title: "Control Resonant", image: posters.control, rating: "4.3 (980)", genres: ["Action", "Puzzle", "Adventure"] },
  { title: "EA Sports FC 27", image: posters.eaFc, rating: "4.1 (12K)", genres: ["Sports", "Multiplayer"] },
  { title: "Call of Duty MW: 3", image: di("35496f08924aef11cbb40a452c307fa09fc855fe"), rating: "4.0 (15K)", genres: ["Shooter", "Multiplayer", "Action"] },
  { title: "Forza Horizon 6", image: di("26c1b285ef3d030237490d7392cab79108401ca0"), rating: "4.7 (6.2K)", genres: ["Sports", "Multiplayer"] },
  { title: "Black Myth Wukong", image: di("7434e52481be532dc6b05afddca3301f9d14cae8"), rating: "4.7 (4.4K)", genres: ["Action", "RPG"] },
  { title: "Dying Light The Beast", image: di("f773d7e7cc875c9ff7879d0e0256e691edc64674"), rating: "4.3 (2.0K)", genres: ["Horror", "Survival", "Action"] },
  { title: "Hogwarts Legacy", image: di("d9d8d5d15c6e94d18cbd0cdb0ade19e995650d36"), rating: "4.5 (9.3K)", genres: ["RPG", "Adventure"] },
  { title: "Horizon Forbidden West", image: di("53936cd4ca0a2a7569baf50733436cba03afb558"), rating: "4.6 (3.8K)", genres: ["Action", "RPG", "Adventure"] },
  { title: "The Crew Motorfest", image: di("5979859d26cb93171a2e15c1c324fe936357a72d"), rating: "4.0 (1.6K)", genres: ["Sports", "Multiplayer"] },
];

export const continuePlaying = [
  { title: "The Last of Us Part I", image: di("da6a4915d3ec6478161d5a4ecdba1d22ef8f6950"), hours: 33, progress: 55 },
  { title: "007 First Light", image: di("0eff8ff800a56577728d107205f03b31b973c234"), hours: 20, progress: 40 },
  { title: "Cyberpunk 2077", image: di("ae0d8e2467e730114aa37925cc5fdfff6253f978"), hours: 6, progress: 10 },
  { title: "Hogwarts Legacy", image: di("447abedef787f1c2a5ff8a817df43314591496a8"), hours: 50, progress: 80 },
  { title: "Ghost of Tsushima", image: di("f17fb3b3fe8f9c47b962245fba00859a8f12fe0f"), hours: 36, progress: 60 },
  { title: "God of War Ragnarök", image: di("e4a85b0b9471ab9b805ab8e6bc1b29303786c9d8"), hours: 12, progress: 30 },
];

export const trendingNow: DashGame[] = [
  { title: "Assassins Creed Shadows", image: posters.acShadows },
  { title: "EA Sports FC 27", image: posters.eaFc },
  { title: "Assassin's Creed Black Flag Resynced", image: posters.blackFlag },
  { title: "Control Resonant", image: posters.control },
  { title: "Cyberpunk 2077", image: posters.cyberpunk },
  { title: "The Witcher 3: Wild Hunt", image: posters.witcher },
];

export const popularGames: DashGame[] = [
  { title: "The Last of Us Part 1", image: posters.lastOfUs },
  { title: "Death Stranding 2", image: posters.deathStranding },
  { title: "Call of Duty MW: 3", image: di("35496f08924aef11cbb40a452c307fa09fc855fe") },
  { title: "Hogwarts Legacy", image: di("d9d8d5d15c6e94d18cbd0cdb0ade19e995650d36") },
  { title: "Days Gone", image: di("4bbcd6a79f833cd6d1d576a05a189386838edc4b") },
  { title: "Horizon Forbidden West", image: di("53936cd4ca0a2a7569baf50733436cba03afb558") },
];

export const newGames: DashGame[] = [
  { title: "007 First Light", image: posters.firstLight },
  { title: "Assassin's Creed Black Flag Resynced", image: posters.blackFlag },
  { title: "EA Sports FC 27", image: posters.eaFc },
  { title: "Assassins Creed Shadows", image: posters.acShadows },
  { title: "Resident Evil Requiem", image: posters.residentEvil },
  { title: "God of War Ragnarök", image: posters.godOfWar },
];

export const recommended: DashGame[] = [
  { title: "The Crew Motorfest", image: di("5979859d26cb93171a2e15c1c324fe936357a72d"), genres: ["Sports", "Multiplayer"] },
  { title: "Dying Light The Beast", image: di("f773d7e7cc875c9ff7879d0e0256e691edc64674"), genres: ["Horror", "Survival", "Action"] },
  { title: "Black Myth Wukong", image: di("7434e52481be532dc6b05afddca3301f9d14cae8"), genres: ["Action", "RPG"] },
  { title: "Assassin's Creed Odyssey", image: posters.odyssey, genres: ["RPG", "Adventure", "Action"] },
  { title: "The Blood of Dawnwalker", image: di("32e84bc55ba9e4da62ffff1ccc19ab1697281623"), genres: ["RPG", "Adventure"] },
  { title: "Forza Horizon 6", image: di("26c1b285ef3d030237490d7392cab79108401ca0"), genres: ["Sports", "Multiplayer"] },
  { title: "Resident Evil Requiem", image: posters.residentEvil, genres: ["Horror", "Survival"] },
  { title: "Control Resonant", image: posters.control, genres: ["Action", "Adventure", "Puzzle"] },
  { title: "EA Sports FC 27", image: posters.eaFc, genres: ["Sports", "Multiplayer"] },
  { title: "Cyberpunk 2077", image: posters.cyberpunk, genres: ["RPG", "Shooter", "Action"] },
];

export const recentlyPlayed = [
  { title: "TLOU PART: I", image: di("b02bcffca7f75d201ba46399c83f354b3b46cec6"), lastPlayed: "2 hrs ago" },
  { title: "AC: Shadows", image: di("5b52df4e6cd7c559838637099ca41066c30ac9c1"), lastPlayed: "4 hrs ago" },
  { title: "007 First Light", image: di("e64d56fb9f0bd21d55665cdc3508d1c6c6302974"), lastPlayed: "5 hrs ago" },
  { title: "W3: Wild Hunt", image: di("2214cdd757a957716ac3fdfd42b96c9836eda3e9"), lastPlayed: "1d ago" },
];

export const groups = [{ name: "Valorant GC", members: "33+ members", unread: true }];

export const player = { name: "Robin John", email: "robinj@gmail.com", level: 24, xp: 7200, xpGoal: 10000 };
