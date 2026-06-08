import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

const lenses = [
  ['Timing', 'Dataloader stalls, slow backward/optimizer, step-time jitter'],
  ['Memory', 'Peak usage, fragmentation, leaks'],
  ['Convergence', 'Loss / grad-norm divergence, spikes'],
  ['Cross-signal', 'Problems that only show up when several signals spike together'],
  ['Distributed', 'Stragglers, load imbalance, pipeline bubbles, exposed communication'],
  ['Efficiency budget', 'Where every second of wall time goes, anchored to MFU'],
];

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
        <section className="flex flex-col items-start gap-5">
          <span className="rounded-full border px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            v0.2.1 · pip install pytscope
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            See <em>why</em> your training is slow —<br /> not just that it is.
          </h1>
          <p className="max-w-2xl text-fd-muted-foreground">
            pytscope is an intelligence layer for ML training: it watches your
            loop, puts every signal — timing, memory, convergence, distributed —
            on one aligned per-step timeline, and turns the raw numbers into
            ranked, actionable findings with a fix attached.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Read the docs
            </Link>
            <Link
              href="/docs/quickstart"
              className="rounded-lg border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
            >
              Quickstart
            </Link>
            <a
              href="https://github.com/Sumu004/pytscope"
              className="rounded-lg border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
            >
              GitHub
            </a>
          </div>
        </section>

        <section>
          <pre className="overflow-x-auto rounded-xl border bg-fd-card p-5 text-sm leading-relaxed">
            <code>{`● TIMING — 95 steps · 23.1 ms/step · 43.3 steps/s
  data       ████████████████░░░░░░░░░░░░░░  52.0%
  forward    █████████░░░░░░░░░░░░░░░░░░░░░  17.3%
  backward   ██████████████░░░░░░░░░░░░░░░░  26.0%
  optimizer  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   4.3%

● FINDINGS (1)
  [HIGH] Input pipeline is a bottleneck  (TIMING.DATALOADER_BOUND)
        52% of step time is spent fetching data. The accelerator is
        stalling on the dataloader.
        -> Raise DataLoader num_workers, set persistent_workers=True
           and pin_memory=True, or move heavy transforms off the hot path.`}</code>
          </pre>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            In a real terminal each <code>●</code> lights up red, amber, or
            green — a clean, glanceable &ldquo;hardware panel&rdquo; view of
            your run.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">One timeline, six lenses</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lenses.map(([title, desc]) => (
              <div key={title} className="rounded-xl border bg-fd-card p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-xl border bg-fd-card p-6">
          <h2 className="text-xl font-semibold">Get started in a minute</h2>
          <pre className="overflow-x-auto rounded-lg bg-fd-secondary p-4 text-sm">
            <code>{`pip install pytscope

from pytscope.auto import AutoProfiler
prof = AutoProfiler("runs/exp1", model, optimizer, warmup=10)
prof.start()
for x, y in loader:                  # <- your loop, untouched
    loss = loss_fn(model(x), y)
    loss.backward()
    optimizer.step(); optimizer.zero_grad()
prof.finish()

$ pytscope analyze runs/exp1`}</code>
          </pre>
          <Link href="/docs/quickstart" className="text-sm font-medium text-fd-primary hover:underline">
            Walk through the full quickstart →
          </Link>
        </section>
      </main>
    </HomeLayout>
  );
}
