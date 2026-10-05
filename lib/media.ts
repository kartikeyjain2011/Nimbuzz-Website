const img = (file: string) => encodeURI(`/images/${file}`);
const vid = (file: string) => encodeURI(`/videos/${file}`);

export const posters = {
  ghostRecon: img("0382760c9410cfb5388e468b150fd254432874fd.png"),
  lastOfUs: img("982bb30ce8b93430a9f12cb32ae00da2c549ae78.png"),
  acShadows: img("194e46776e82f6e9a097bd4778bf38ad3f7aa811 (1).png"),
  firstLight: img("52a4fac7a9e9f7cb5d614320cd9571fdd0ce9d87.png"),
  blackFlag: img("d0401352eaf4e388d6d241a65a111e77e6f5b51a.png"),
  deathStranding: img("d8538e7cb376929b322957319e0744b4dee37a34.png"),
  eaFc: img("ea-fc-27.png"),
  residentEvil: img("cca7136a013b77dfa1af288109ae797bd1c13caa.png"),
  godOfWar: img("c4d2555c6823a0b8ec500c856d399db26af05f39.png"),
  odyssey: img("d64af1ea64374cbf802fffb882e7c49d4439331e.png"),
  control: img("6a18c7762486778c59c8b17c61abd3d829b0d5aa.png"),
  cyberpunk: img("e8f65421fe33056f0fcef45e76719f7481c62ee3.png"),
  witcher: img("c8b0578c07838c8c983b906963b9c6477c70b4cb.png"),
};

export const scenes = {
  hero: img("7d8eafffeb5bca713689d4093616a40db61ecd6a.png"),
  firstLight: img("9da9467b37716cef7f6c8b399dce33a3d8dbe363.png"),
  shadows: img("dd046b4d052a44803d7c6d1717ef48ee890a94ab.png"),
  lastOfUs: img("cf9ed9df192ca8d934198fbfad1f75c619a69e63.png"),
  odyssey: img("a8e9684423e3981c1ef98cb1fa009cb58dd06289.png"),
  ghostRecon: img("c2a5cd02a3ece2c260c4886725a809ca18129a9b.png"),
  ctaCover: img("cta-cover-hd.jpg"),
  lineup: img("fd1c1097ac92b75a6da16af2c476ef025105e9e8.png"),
};

export const logos = {
  ghostRecon: img("ghost-recon-logo.png"),
  lastOfUs: img("dce8ecdec3c3cc00ece5ae5418710d4bb6678c5b.png"),
  firstLight: img("d7b044640153c3b7c16e5bf90782cf4388551bf7.png"),
  shadows: img("ab673bb89d5ae80c0a769cdcee1175dfebbb28a8.png"),
  upi: img("bfcbc53025f8a1e0298f16716de6809909dd8e6f.png"),
};

export const trailers = {
  firstLight: vid("youtube-clip-3501eb0f-f481-4c56-898d-107863703f6a.mp4 (1).mp4"),
  acShadows: vid("youtube-clip-a3764483-d847-44a7-b9a1-7bbd7fe27177.mp4.mp4"),
  ghostRecon: vid("youtube-clip-def9d074-f589-4059-ad0a-14fa2132eafb.mp4"),
  lastOfUs: vid("youtube-clip-ef6a2dc6-034f-40e7-b5a9-9f4838b50154 (online-video-cutter.com).mp4.mp4"),
};

export const videos = {
  clip1: trailers.firstLight,
  clip2: trailers.acShadows,
  clip3: trailers.lastOfUs,
};
