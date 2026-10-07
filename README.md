# Personal AI engineering tutor and wiki

Goal: long-term retention and practical engineering ability through assessment, deliberate practice, debugging and fresh delayed reviews. `AGENTS.md` governs the tutor. The initial frontend reasoning baseline is recorded; backend and DevOps baselines are next. Practical implementation remains unverified until tested.

## Visual workspace

The Next.js dashboard presents the curriculum, dimension-level assessment evidence, spaced reviews, concepts, assessments, journal, misconceptions, sources and exercise guides. Markdown and JSON remain the source of truth. Refresh the browser after updating the records; the server reads them on each request.

Requires Node.js 20.9+ (developed with Node 22.14). From the repository root:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production snapshot locally, run `npm run build` followed by `npm start`. Rebuild after editing wiki records. Run `npm run typecheck` for the dashboard's TypeScript checks. Dependencies are pinned in `package-lock.json`; see the [Next.js installation documentation](https://nextjs.org/docs/app/getting-started/installation).

The dashboard is a read-only view of personal learning records. It has no login layer. A GitHub Pages deployment publishes the included wiki and assessment records to the site audience. Searches include all note text, including assessment records. Exercise projects are independent and excluded from the dashboard compiler; website checks do not count as learner assessment results.

## Repository map

| Path | Purpose |
| --- | --- |
| `curriculum/` | Frontend, backend and DevOps skill maps with stable IDs and practical evidence targets |
| `daily/YYYY-MM-DD.md` | Focused lesson, questions, links to actual responses, corrections and next actions |
| `assessments/` | Original prompts, learner responses, code references, grading evidence and verification results |
| `concepts/` | Reusable factual wiki notes with version context, source links and links to personal evidence |
| `mistakes/recurring.md` | Observed misconceptions and dated recurrence/correction history |
| `progress/mastery.json` | Per-skill status, supported dimension scores and assessment history |
| `reviews/queue.json` | Review policy and persistent per-skill review items |
| `sources/` | Source title, URL, author/publisher, publication/access dates, versions, usefulness and claim classification |
| `exercises/` | Isolated runnable coding projects with explicit versions, tests and acceptance criteria |

## Starting and daily selection

Begin with the proposed [baseline assessment plan](assessments/baseline-plan.md). Prior experience determines relevant examples, not proficiency. Baseline sessions sample skills; follow-up probes cover gaps in evidence.

After baseline, read the records before choosing work. Prioritize overdue reviews, then evidenced weak or blocking prerequisites, then a related new skill. Start with a 30% frontend / 35% backend / 35% DevOps allocation across sessions and adapt to evidence and goals. Normal lessons take 25–45 minutes and focus on one concept. Missed days create no mandatory lesson backlog. Use Asia/Taipei dates.

Prepare lessons with current official source verification and version context. Ask for an attempt before giving a full solution. Save actual responses and assessment evidence; do not infer performance from receiving a lesson. At week's end summarize assessed skills, changes, mistakes and overdue reviews. These instructions do not themselves schedule automatic runs.

## Evidence-based mastery

All curriculum skills begin `unassessed`, with null scores and dates and empty histories. Null means unknown; zero means an actual assessed inability. There is no overall score or inferred track grade.

Score five dimensions independently: conceptual understanding, implementation correctness, edge-case handling, testing quality and trade-off explanation. Use the AGENTS.md 0–4 rubric:

| Score | Meaning |
| --- | --- |
| 0 | Unable to explain or attempt |
| 1 | Partial understanding; substantial help required |
| 2 | Basic solution with guidance or important gaps |
| 3 | Correct independent solution to a new problem |
| 4 | Correct solution with strong edge cases and clear trade-off reasoning |

Every scored dimension must reference observable evidence. Keep unsupported or inapplicable dimensions null with a reason in the assessment. Separate conceptual gaps from syntax lookups, accidents and environment blockers. Record assistance and actual verification; a suggested test is not a passing test.

Skill statuses:
- `unassessed`: no completed assessment evidence.
- `developing`: evidence exists, but an applicable dimension is below 3 or substantial assistance was needed.
- `demonstrated`: all dimensions applicable to the skill's evidence target are at least 3 on a fresh independent problem.
- `retained`: demonstrated performance followed by at least two successful fresh independent delayed reviews, including one at least 7 days after initial demonstration.
- `needs_review`: a later assessment reveals a gap, or a previously demonstrated skill has an overdue review; retain earlier evidence and scores rather than inventing regression.

These statuses are operational learning signals, not certification. Never call a narrow conceptual probe comprehensive practical mastery. Missing evidence blocks a status requiring that evidence.

`latest_scores` holds the most recent supported score per dimension; each populated value is an object with `score`, `assessment_id`, `evidence_ref` and `assessed_on`. Preserve the full history. Append to each skill's `assessment_history` with assessment ID/path, date, task/question IDs, applicable dimensions, dimension scores and evidence references, assistance, independence, actual checks/results and outcome. Record immediate corrected attempts separately from independent attempts. Set `last_assessed_on` and status from this evidence only. Set `next_review_on` from the active review item.

## Spaced repetition

Maintain an active item for every taught or assessed skill, linked by its curriculum ID. Untaught and unassessed skills have no fabricated review dates.

After independent success, review after 1 day, then 3, 7, 14 and 30 days after each preceding successful review. Review success requires a fresh independent attempt meeting the applicable evidence target with supported scores of at least 3. Increment the stage only after success; after the fifth review, extend from 30 days based on evidence and record the reason.

Failure or substantial guidance schedules a fresh short reassessment in 1–3 days; reset the success stage to 0 and record the specific gap. A taught skill awaiting its first assessment gets a proposed assessment date, usually the next day, and stays pending with no grade. An unanswered task stays pending. An overdue date does not count as failure. Confident transfer may justify an extended interval with an explicit reason.

Each queue item uses: `id`, `skill_id`, `status` (`pending`, `completed` or `cancelled`), `kind` (`initial_assessment` or `review`), `due_on` (YYYY-MM-DD), `stage` (0–5 successful delayed reviews), `last_interval_days`, `last_outcome` (null, `success`, `needs_practice` or `failure`), `assessment_refs`, `concept_ref`, `history` and `scheduling_reason`. History records dates, attempts, outcomes and scheduling decisions. Keep one pending item per skill; reschedule it after attempts and retain its history. Completed/cancelled items remain as history. Queue dates are authoritative; synchronize mastery `next_review_on`.

## Wiki and integrity

Update existing concept pages rather than duplicating them. Include plain-language summary, explanation, examples, misconceptions, applications, edge cases and verified sources/version context. Link to performance evidence, remaining gaps and next review date without mixing unsupported personal claims into factual explanations.

Assessment records preserve original answers, dimension evidence, hints, corrections and follow-ups. Mark unanswered work pending. Record recurring mistakes only from observed occurrences. Preserve historical evidence; corrections append or explicitly supersede rather than silently deleting it.

Coding assessments belong in isolated projects under `exercises/`. Pin versions when preparing a project, provide reproducible commands and acceptance criteria, and distinguish checks run from checks proposed. Dependency installation requires authorization. No dependency install, coding assessment or today's lesson was performed during initialization.

## GitHub Pages

The Pages workflow builds a static snapshot of all wiki notes and progress on each push to master. Publication is disabled by default: after approving the site audience and enabling Pages with GitHub Actions as its source, manually run the workflow with publish selected to deploy. The project base path is /engineering-tutor. No server is required; Markdown and JSON are read during the build. Search and filters run in the browser, and review labels use the current date in Asia/Taipei. New learning records appear after committing, pushing and completing a successful deployment.

To build the Pages snapshot in PowerShell:
```powershell
$env:GITHUB_PAGES = "true"
npm run build
Remove-Item Env:GITHUB_PAGES
```

GitHub Pages availability for private repositories depends on the account plan. Do not change repository visibility just to deploy without the owner's approval.
