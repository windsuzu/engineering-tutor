# Phase3 performance review: cost versus visible movement

October25. Skill fe.performance, dueOctober20. In progress; no response/score yet.

## Case

A drag handler resizes200 cards to the panel width captured at handler start. Old code reads panel.offsetWidth before every card width write. New code reads it once before all writes. Assume both versions produce the same final positions and appearance; same device,200cards,same drag replay, no other changes. Supplied hypothetical measurements (not an actual browser benchmark): median Layout duration per handler42ms before,9ms after; CLS0.04 before,0.04 after. No source/runtime freshness claim or executed browser test.

```js
// Before
for (const card of cards) {
  card.style.width = `${panel.offsetWidth}px`;
}
// After
const width = panel.offsetWidth;
for (const card of cards) {
  card.style.width = `${width}px`;
}
```

Q1: A teammate says "CLS did not decrease, so this optimization did nothing." Do these supplied results support that claim? Explain which measurement matters for the work being reduced. One focused interpretation, answer1–3sentences. Response pending; no conclusion disclosed before attempt. Do not infer exact layout counts/causation from timing alone or actual learner testing.

## Actual response

```text
after calculating offsetWidth only once, the layout won't need to be recalculated in the every loop. so, the layout performance is improved. 
```

## Final evaluation

Conceptual understanding3/4 for independent read-once/reduced repeated-layout work interpretation. Correctly recognizes improvement despite unchanged supplied CLS. Did not explicitly name42-to9ms; tutor connects that evidence after answer, not learner benchmark evidence. Precision: read-after-write can force layout when geometry is dirty; neither offsetWidth always forcing layout nor an exact layout count is established. Final layout work can still occur. Implementation correctness, edge cases, testing and tradeoff dimensions unassessed. No browser benchmark executed. Successful narrow delayed review, stage1->2,nextNovember1 (7days); broad performance skill remains developing.
