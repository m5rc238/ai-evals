import { AlertTriangle, Layers } from 'lucide-react';
import { ADVANCED_TRACKS } from '../data/advancedTracks';

export function AdvancedTracksView() {
  return (
    <article className="mx-auto max-w-4xl space-y-8 pb-16">
      <header className="space-y-3 border-b-2 border-[#231F1A] pb-5">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#335C81]">
          Optional Supplementary Tracks
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
          Advanced Learning Tracks (Tracks A–F)
        </h2>
        <p className="text-sm leading-relaxed text-[#5C5346]">
          Complete the seven foundational modules first. These optional tracks extend the core methodology to specialized system architectures and measurement problems.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {ADVANCED_TRACKS.map((track) => (
          <section key={track.id} className="vintage-card rounded-md p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-[#231F1A]/20 pb-2.5">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#C8552D]">
                  {track.code}
                </div>
                <h3 className="font-display text-lg font-bold text-[#231F1A]">
                  {track.title}
                </h3>
              </div>
              <Layers className="h-5 w-5 shrink-0 text-[#5C5346]" />
            </div>

            <p className="text-xs leading-relaxed text-[#5C5346]">{track.summary}</p>

            <ul className="space-y-1.5 text-xs">
              {track.topics.map((t) => (
                <li key={t.name} className="rounded bg-[#F5EFE2] p-2">
                  <span className="font-semibold text-[#231F1A]">{t.name}: </span>
                  <span className="text-[#5C5346]">{t.detail}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-2 rounded border border-[#C8552D]/60 bg-[#F7E4DC]/70 p-2.5 text-xs text-[#7D3016]">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <strong>Common pitfall:</strong> {track.keyPitfall}
              </span>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
