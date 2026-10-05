import { trailers } from "./media";

const gi = (hash: string) => `/game-images/${hash}.png`;

export type GameDetails = {
  backdrop: string;
  logo?: string;
  description: string;
  trailer?: string;
};

export const gameDetails = {
  firstLight: {
    backdrop: gi("9da9467b37716cef7f6c8b399dce33a3d8dbe363"),
    logo: gi("d7b044640153c3b7c16e5bf90782cf4388551bf7"),
    description: "An action-adventure espionage game from IO Interactive. Released in 2026, it serves as a standalone origin story for James Bond.",
    trailer: trailers.firstLight,
  },
  blackFlag: {
    backdrop: gi("db79f7448d96aaecac46c5e8459331d6c9142f70"),
    logo: gi("04a5f91f977473ca96e5c0f2f3d73d96acf39368"),
    description: "Sail the Caribbean as pirate-turned-assassin Edward Kenway in a rebuilt return to the golden age of piracy.",
  },
  deathStranding: {
    backdrop: gi("79f285c292f165fbff61e40be272970b4de11cbd"),
    description: "Hideo Kojima's sequel sends Sam Porter Bridges beyond the UCA to reconnect a fractured world, one delivery at a time.",
  },
  eaFc: {
    backdrop: gi("beb855b628b2b377693fa6dc216e57bb64f4b342"),
    logo: gi("ef3659e5d644e97c5761e6375dab04cd45c74aa5"),
    description: "Experience the world’s game with more ways to play, compete, and connect—from the streets to the stadium in FC 27.",
  },
  acShadows: {
    backdrop: gi("0d23ad43879956975d4d9db9b354b2c07bdcfe0c"),
    logo: gi("ab673bb89d5ae80c0a769cdcee1175dfebbb28a8"),
    description: "Live the intertwined stories of a shinobi and a samurai as they fight through the turmoil of feudal Japan.",
    trailer: trailers.acShadows,
  },
  residentEvil: {
    backdrop: gi("6045a61b3d007baf2651adb1b74470db4b87d387"),
    logo: gi("85d4642692685837bcfa74a83797f2a0965b6312"),
    description: "The next chapter of survival horror. Face a new nightmare where every corner hides something worse.",
  },
  godOfWar: {
    backdrop: gi("e750096a63a0a9043f2efffd661fafc23f1a6c4a"),
    logo: gi("a80defcaeddbc0722737ff0cdb4538b140941b58"),
    description: "Kratos and Atreus journey across the Nine Realms as Fimbulwinter heralds the coming of Ragnarök.",
  },
  odyssey: {
    backdrop: gi("53639407e831e8f2834fd9307163000dc433f048"),
    logo: gi("ddef92ee1d3c4f35dcd43c0edcf785fda2389f64"),
    description: "Write your own legend as a Spartan mercenary in ancient Greece, from forgotten islands to the Peloponnesian War.",
  },
} satisfies Record<string, GameDetails>;
