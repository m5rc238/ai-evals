import { AlertTriangle, ExternalLink, Layers } from 'lucide-react';
import { ADVANCED_TRACKS } from '../data/advancedTracks';
import { SphereDiagram, SynergyDiagram } from './VisualDiagrams';

export function AdvancedTracksView({
  onOpenSphereTool,
}: {
  onOpenSphereTool?: () => void;
}) {
  return (
    <article className="mx-auto max-w-4xl space-y-8 pb-16">
      <header className="space-y-3 border-b-2 border-[#231F1A] pb-5">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#335C81]">
          Optional Supplementary Tracks
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
          Advanced Learning Tracks (Tracks A–G)
        </h2>
        <p className="text-sm leading-relaxed text-[#5C5346]">
          Complete the seven foundational modules first. These optional tracks extend the core methodology to specialized system architectures, measurement problems, and formal Human–AI interaction research.
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

            {track.id === 'track-g' && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {onOpenSphereTool && (
                  <button
                    type="button"
                    onClick={onOpenSphereTool}
                    className="vintage-btn rounded-md bg-[#F6ECD5] px-3 py-1.5 font-semibold text-[#231F1A]"
                  >
                    Open SPHERE Card Tool →
                  </button>
                )}
                <a
                  href="https://sphere-eval.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#335C81] underline"
                >
                  sphere-eval.github.io
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </section>
        ))}
      </div>

      <details className="vintage-box rounded-md p-4 text-xs space-y-4">
        <summary className="cursor-pointer font-semibold text-[#231F1A]">
          Track G Visual Reference: SPHERE Evaluation Card (FIG G.1) &amp; Synergy Meta-Analysis (FIG G.2)
        </summary>
        <div className="mt-4 space-y-4">
          <SphereDiagram />
          <SynergyDiagram />
        </div>
      </details>
    </article>
  );
}
