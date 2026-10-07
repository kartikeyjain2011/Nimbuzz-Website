import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QueueScreen } from "@/components/play/QueueScreen";
import { allGameSlugs, gameHref, getGameDetail } from "@/lib/gameDetail";

type Props = { params: Promise<{ slug: string }> };

const queueBackdrops: Record<string, string> = {
  "the-last-of-us-part-i": "/dasboard-images/tlou-queue.jpg",
};

export function generateStaticParams() {
  return allGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameDetail((await params).slug);
  return { title: game ? `Queue · ${game.title} — Nimbus` : "Queue — Nimbus" };
}

export default async function QueuePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameDetail(slug);
  if (!game) notFound();

  return <QueueScreen title={game.title} logo={game.logo} backdrop={queueBackdrops[slug] ?? game.backdrop} backHref={gameHref(game.title)} streamHref={`/play/${slug}/stream`} />;
}
