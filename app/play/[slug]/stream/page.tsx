import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StreamScreen } from "@/components/play/StreamScreen";
import { allGameSlugs, gameHref, getGameDetail } from "@/lib/gameDetail";

type Props = { params: Promise<{ slug: string }> };

const streamFrames: Record<string, string> = {
  "the-last-of-us-part-i": "/dasboard-images/tlou-stream.jpg",
};

export function generateStaticParams() {
  return allGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameDetail((await params).slug);
  return { title: game ? `Playing ${game.title} — Nimbus` : "Stream — Nimbus" };
}

export default async function StreamPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameDetail(slug);
  if (!game) notFound();

  return <StreamScreen title={game.title} logo={game.logo} fallbackFrame={streamFrames[slug] ?? game.backdrop} exitHref={gameHref(game.title)} />;
}
