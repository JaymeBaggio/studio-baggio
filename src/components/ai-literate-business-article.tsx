"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import content from "@/content/ai-literate-business-90-days.json";

/*
 * "How to build an AI-literate business in 90 days" — article body.
 * Content is exported verbatim from the approved document; nothing here paraphrases it.
 * Motion: once-only entrances (opacity + short rise, expo ease, calm stagger). No scroll scrubbing.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Question = { id: number; question: string; paras: string[] };
type Phase = { title: string; argument: string | null; questions: Question[] };
type MapColumn = [string, string, string[]];

const phases = content.phases as Phase[];
const mapColumns = content.map as MapColumn[];
const logos = content.logos as Record<string, string>;

const DIAGRAM_AFTER: Record<number, "adoption" | "champions" | "os" | "wordvs"> = {
  3: "adoption",
  6: "champions",
  1: "os",
  20: "wordvs"
};

/* ---------------------------------------------------------------- motion helpers */

function useVariants() {
  const reduce = useReducedMotion();
  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  };
  const rule: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } }
  };
  return { group, item, rule };
}

function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "figure" }) {
  const { group } = useVariants();
  const Tag = motion[as];
  return (
    <Tag className={className} variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
      {children}
    </Tag>
  );
}

function Item({ children, className, as = "div" }: { children?: ReactNode; className?: string; as?: "div" | "p" | "h2" | "h3" | "li" | "span" }) {
  const { item } = useVariants();
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- icons (stroke, 24 grid) */

function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: d }} />
  );
}
const ICON = {
  file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h6"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v5h-5"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.5a4.5 4.5 0 0 1 5 4.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>',
  arrow: '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>'
};

function Logo({ name, box = "0 0 24 24", size = 18 }: { name: string; box?: string; size?: number }) {
  const g = (logos[name] || "").replace(/^<g transform="[^"]*">/, "<g>");
  return <svg viewBox={box} width={size} height={size} aria-hidden="true" dangerouslySetInnerHTML={{ __html: g }} />;
}

/* ---------------------------------------------------------------- diagrams */

function Row({ icon, title, sub }: { icon: keyof typeof ICON; title: string; sub: string }) {
  return (
    <Item className="ail-row">
      <span className="ail-row-icon"><Icon d={ICON[icon]} size={14} /></span>
      <span>
        <strong>{title}</strong>
        <small>{sub}</small>
      </span>
    </Item>
  );
}

function Panel({ label, tint, children }: { label: string; tint?: boolean; children: ReactNode }) {
  return (
    <div className={`ail-panel${tint ? " is-tint" : ""}`}>
      <p className="ail-panel-label">{label}</p>
      {children}
    </div>
  );
}

function AdoptionDiagram() {
  return (
    <Reveal as="figure" className="ail-figure">
      <Item as="p" className="ail-figure-cap">Adoption versus application</Item>
      <div className="ail-vs">
        <Panel label="Adoption">
          <Row icon="file" title="Licences bought" sub="Access for everyone" />
          <Row icon="file" title="Training done" sub="Everyone can prompt" />
          <Row icon="file" title="Adoption measured" sub="Nothing in the business has changed" />
        </Panel>
        <Item className="ail-vs-arrow"><Icon d={ICON.arrow} size={20} /></Item>
        <Panel label="Application" tint>
          <Row icon="target" title="Start with the constraint" sub="More leads, or the right hires" />
          <Row icon="layers" title="Set the system up" sub="Shared company context, then department and role" />
          <Row icon="folder" title="Specialist knowledge into skills" sub="Templates people use in their work" />
        </Panel>
      </div>
      <Item as="p" className="ail-figure-foot"><strong>Adoption will be a byproduct of understanding what’s possible and seeing real success.</strong></Item>
    </Reveal>
  );
}

function ChampionsDiagram() {
  const steps = [
    ["Build a shared operating system", "It already knows the company, the department and the job"],
    ["People find the opportunities", "What could they do better for clients? What can they do now that they couldn't before?"],
    ["Certain people shine", "Champion them"],
    ["They share what they learn", "Adoption comes from people seeing what they can actually do with it"]
  ];
  return (
    <Reveal as="figure" className="ail-figure">
      <Item as="p" className="ail-figure-cap">Beyond the early adopters</Item>
      <div className="ail-steps">
        {steps.map(([t, s], i) => (
          <div className="ail-step-wrap" key={t}>
            <Item className="ail-step">
              <span className="ail-step-n">0 {i + 1}</span>
              <strong>{t}</strong>
              <small>{s}</small>
            </Item>
            {i < steps.length - 1 ? <Item className="ail-step-arrow"><Icon d={ICON.arrow} size={18} /></Item> : null}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function OperatingSystemDiagram() {
  return (
    <Reveal as="figure" className="ail-figure ail-os">
      <Item as="p" className="ail-figure-cap">An AI operating system, at a glance</Item>
      <Item className="ail-os-model">
        <span className="ail-os-node"><Logo name="Claude" /> Claude</span>
        <span className="ail-os-or">or</span>
        <span className="ail-os-node"><Logo name="Codex" /> Codex</span>
      </Item>
      <Item className="ail-os-line" />
      <Item className="ail-frame">
        <p className="ail-frame-title">The shared system <span>one for the whole company, loads on every job</span></p>
        <div className="ail-frame-panels">
          <Panel label="The context" tint>
            <Row icon="file" title="Company context" sub="Who you are, your goals, the wider vision" />
            <Row icon="file" title="Department and role context" sub="What each person does and where they fit" />
            <Row icon="file" title="How you work" sub="The rules, and what good looks like" />
            <Row icon="pulse" title="What is true this week" sub="Live priorities. Beats anything older" />
          </Panel>
          <Panel label="Skills, one per process">
            <Row icon="folder" title="Proposal deck" sub="Insights, copy, finished deck" />
            <Row icon="folder" title="Client report" sub="Your reports, the way you do them" />
            <Row icon="folder" title="Brand voice" sub="How the business sounds" />
            <Row icon="folder" title="Contract review" sub="What to check and why" />
          </Panel>
          <Panel label="Memory">
            <Row icon="refresh" title="Corrections" sub="Saved as rules, never repeated" />
            <Row icon="users" title="Duplicates" sub="Flagged, one version takes precedence" />
            <Row icon="file" title="Shared templates" sub="Updated when someone improves one" />
          </Panel>
        </div>
      </Item>
      <Item className="ail-tools">
        <span className="ail-tools-head">Connected tools</span>
        <div className="ail-tools-cells">
          <span className="ail-tool"><Logo name="Firecrawl" box="-14 -14 28 28" /><span><strong>Firecrawl</strong><small>reads whole websites</small></span></span>
          <span className="ail-tool"><Logo name="Perplexity" /><span><strong>Perplexity</strong><small>research with sources</small></span></span>
          <span className="ail-tool"><Logo name="Higgsfield" box="-14 -14 28 28" /><span><strong>Higgsfield</strong><small>image and video</small></span></span>
          <span className="ail-tool"><Logo name="Your everyday apps" /><span><strong>Everyday apps</strong><small>email, calendar, docs</small></span></span>
        </div>
      </Item>
      <div className="ail-loop">
        <Item as="p" className="ail-panel-label">Build a system that compounds</Item>
        <div className="ail-loop-row">
          {[
            ["Everyone starts with the bigger picture", "Company context first, then department and role. Then people bring in their specialist knowledge."],
            ["Corrections are retained", "Two minutes to correct something or give another example improves the way the system works next time."],
            ["Contributions are considered against what is already there", "Anybody can contribute to a shared skill or template. One version for the whole team."]
          ].map(([t, s], i) => (
            <div className="ail-step-wrap" key={t}>
              <Item className="ail-step">
                <span className="ail-step-n">0 {i + 1}</span>
                <strong>{t}</strong>
                <small>{s}</small>
              </Item>
              {i < 2 ? <Item className="ail-step-arrow"><Icon d={ICON.arrow} size={18} /></Item> : null}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function WordVsDiagram() {
  return (
    <Reveal as="figure" className="ail-figure">
      <Item as="p" className="ail-figure-cap">More than knowledge management</Item>
      <div className="ail-vs">
        <div>
          <Item as="p" className="ail-vs-head">Five years ago</Item>
          <Panel label="A fixed process in a Word document">
            <Row icon="file" title="Followed manually" sub="One document, interpreted 500 different ways" />
            <Row icon="file" title="No context" sub="It doesn't understand the wider business or each role" />
            <Row icon="file" title="Static" sub="It doesn't grow as the team or the business changes" />
          </Panel>
        </div>
        <Item className="ail-vs-arrow"><Icon d={ICON.arrow} size={20} /></Item>
        <div>
          <Item as="p" className="ail-vs-head is-blue">With AI</Item>
          <Panel label="A shared capability" tint>
            <Row icon="layers" title="Understands the context" sub="The business, what each department contributes, how a role affects the work" />
            <Row icon="users" title="Keeps developing" sub="Improves as people use it and correct it" />
            <Row icon="refresh" title="Adapts" sub="To what different departments need" />
          </Panel>
        </div>
      </div>
    </Reveal>
  );
}

function NinetyDayMap() {
  return (
    <Reveal as="figure" className="ail-figure ail-map">
      <Item as="p" className="ail-figure-cap">The 90 days, at a glance</Item>
      <div className="ail-map-grid">
        {mapColumns.map(([days, title, items]) => (
          <Item className="ail-map-col" key={days}>
            <span className="ail-map-head">{days}</span>
            <div className="ail-map-body">
              <strong>{title}</strong>
              <ul>
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Item>
        ))}
      </div>
      <Item as="p" className="ail-figure-foot"><strong>Start with the business strategy.</strong> Identify the biggest constraint or opportunity, then work backwards into where AI can help.</Item>
    </Reveal>
  );
}

const DIAGRAMS = { adoption: AdoptionDiagram, champions: ChampionsDiagram, os: OperatingSystemDiagram, wordvs: WordVsDiagram };

/* ---------------------------------------------------------------- article */

const numberedPhases = (() => {
  let n = 0;
  return phases.map((phase) => ({
    ...phase,
    questions: phase.questions.map((q) => ({ ...q, n: ++n }))
  }));
})();

export function AiLiterateBusinessArticle() {
  const { rule } = useVariants();
  return (
    <div className="ail">
      {numberedPhases.map((phase) => (
        <section className="ail-phase" key={phase.title}>
          <Reveal className="ail-phase-head">
            <Item as="h2" className="ail-phase-title">{phase.title}</Item>
            <motion.span className="ail-phase-rule" variants={rule} aria-hidden="true" />
            {phase.argument ? <Item as="p" className="ail-callout">{phase.argument}</Item> : null}
          </Reveal>
          {phase.questions.map((q) => {
            const Diagram = DIAGRAM_AFTER[q.id] ? DIAGRAMS[DIAGRAM_AFTER[q.id]] : null;
            return (
              <div className="ail-qa" key={q.id} id={`q${q.n}`}>
                <Reveal>
                  <Item as="h3" className="ail-q">
                    <span className="ail-q-n">{String(q.n).padStart(2, "0")}</span>
                    {q.question}
                  </Item>
                  {q.paras.map((p, i) => (
                    <Item as="p" className="ail-a" key={i}>{p}</Item>
                  ))}
                </Reveal>
                {Diagram ? <Diagram /> : null}
              </div>
            );
          })}
        </section>
      ))}

      <NinetyDayMap />

      <Reveal className="ail-close">
        <Item as="p" className="ail-panel-label">Closing thought</Item>
        <Item as="p" className="ail-close-line">
          {content.closing.replace(/\.$/, "")}<span className="sb-mark" aria-hidden="true" />
        </Item>
        <Item as="p" className="ail-download">
          <a href="/downloads/how-to-build-an-ai-literate-business-in-90-days.pdf" target="_blank" rel="noopener">
            Download the PDF <span aria-hidden="true">→</span>
          </a>
        </Item>
      </Reveal>
    </div>
  );
}
