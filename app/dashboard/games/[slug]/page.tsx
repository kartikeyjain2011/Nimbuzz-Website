import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameDetailView } from "@/components/dashboard/GameDetailView";
import { allGameSlugs, getGameDetail } from "@/lib/gameDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameDetail((await params).slug);
  return { title: game ? `${game.title} — Nimbus` : "Game not found — Nimbus" };
}

export default async function GameDetailPage({ params }: Props) {
  const game = getGameDetail((await params).slug);
  if (!game) notFound();
  return <GameDetailView game={game} />;
}
