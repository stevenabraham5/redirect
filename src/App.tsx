import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type LaneId = 'strengths' | 'successes' | 'goals' | 'obstacles'

type Sticky = {
  id: string
  lane: LaneId
  text: string
  createdAt: string
}

const STORAGE_KEY = 'retro-board-stickies-v2'

const laneMeta: Record<LaneId, { title: string; subtitle: string }> = {
  strengths: { title: 'Strengths', subtitle: 'What propels us forward' },
  successes: { title: 'Successes', subtitle: 'What made us feel good' },
  goals: { title: 'Goals / Vision', subtitle: 'What we are aiming toward' },
  obstacles: { title: 'Obstacles', subtitle: 'Risks or friction to address' },
}

const seedStickies: Sticky[] = [
  {
    id: 'strengths-1',
    lane: 'strengths',
    text: 'Strong desire for team-driven meetings instead of leadership broadcast.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'strengths-2',
    lane: 'strengths',
    text: 'Appetite for healthy debate and disagreement.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'strengths-3',
    lane: 'strengths',
    text: 'Emphasis on curiosity over defensiveness.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'strengths-4',
    lane: 'strengths',
    text: 'Team values concise, high-quality communication.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'strengths-5',
    lane: 'strengths',
    text: 'Shared belief in product as a north star.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'strengths-6',
    lane: 'strengths',
    text: 'Momentum toward more structured, purposeful sessions.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'successes-1',
    lane: 'successes',
    text: 'Retro surfaced clear, actionable themes (4 strong clusters).',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'successes-2',
    lane: 'successes',
    text: 'Team openly identified real friction with honest input.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'successes-3',
    lane: 'successes',
    text: 'Alignment around need for focus: less work, more impact.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'successes-4',
    lane: 'successes',
    text: "Engagement with ideas like devil's advocate and anonymous input.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 'successes-5',
    lane: 'successes',
    text: 'Shared recognition that structure can unlock better thinking.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'successes-6',
    lane: 'obstacles',
    text: 'Too many priorities creates lack of focus.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goals-1',
    lane: 'goals',
    text: 'Team-led agendas with manager amplification, not control.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goals-2',
    lane: 'goals',
    text: 'Meetings designed for thinking together, not status sharing.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goals-3',
    lane: 'goals',
    text: 'One clear question or problem per session.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goals-4',
    lane: 'goals',
    text: 'Psychological safety where disagreement is rewarded.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goals-5',
    lane: 'goals',
    text: 'SI and ISV discussions synthesize into team insight.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obstacles-1',
    lane: 'obstacles',
    text: 'Manager-led meetings feel like broadcasts.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obstacles-2',
    lane: 'obstacles',
    text: 'Not enough airtime (10 people in a 30-minute constraint).',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obstacles-3',
    lane: 'obstacles',
    text: 'Disagreement feels risky or hierarchical.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obstacles-4',
    lane: 'obstacles',
    text: 'Agendas too broad create low relevance per person.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obstacles-5',
    lane: 'obstacles',
    text: 'SI and ISV discussions blur and dilute value.',
    createdAt: new Date().toISOString(),
  },
]

function App() {
  const [stickies, setStickies] = useState<Sticky[]>(() => {
    const persisted = localStorage.getItem(STORAGE_KEY)

    if (!persisted) {
      return seedStickies
    }

    try {
      return JSON.parse(persisted) as Sticky[]
    } catch {
      return seedStickies
    }
  })
  const [selectedLane, setSelectedLane] = useState<LaneId>('strengths')
  const [draftText, setDraftText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickies))
  }, [stickies])

  const laneCount = useMemo(() => {
    return stickies.reduce<Record<LaneId, number>>(
      (acc, sticky) => {
        acc[sticky.lane] += 1
        return acc
      },
      { strengths: 0, successes: 0, goals: 0, obstacles: 0 },
    )
  }, [stickies])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = draftText.trim()

    if (!trimmed) {
      return
    }

    const nextSticky: Sticky = {
      id: crypto.randomUUID(),
      lane: selectedLane,
      text: trimmed,
      createdAt: new Date().toISOString(),
    }

    setStickies((current) => [nextSticky, ...current])
    setDraftText('')
  }

  const removeSticky = (id: string) => {
    setStickies((current) => current.filter((sticky) => sticky.id !== id))
  }

  const clearBoard = () => {
    setStickies([])
  }

  return (
    <main className="retro-app">
      <header className="retro-header">
        <p className="eyebrow">Anonymous Retrospective Board</p>
        <h1>Think together, not just report together.</h1>
        <p className="subtitle">
          Anyone can add stickies without signing in. No names are collected.
        </p>
      </header>

      <section className="composer" aria-label="Create a sticky note anonymously">
        <form className="composer-form" onSubmit={handleSubmit}>
          <label htmlFor="stickyText">Your anonymous sticky</label>
          <textarea
            id="stickyText"
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
            placeholder="Share one observation, win, concern, or idea..."
            maxLength={240}
            rows={3}
            required
          />
          <div className="composer-controls">
            <label htmlFor="laneSelect">Category</label>
            <select
              id="laneSelect"
              value={selectedLane}
              onChange={(event) => setSelectedLane(event.target.value as LaneId)}
            >
              {Object.entries(laneMeta).map(([lane, meta]) => (
                <option key={lane} value={lane}>
                  {meta.title}
                </option>
              ))}
            </select>
            <button type="submit">Post anonymously</button>
            <button type="button" className="ghost" onClick={clearBoard}>
              Clear board
            </button>
          </div>
        </form>
      </section>

      <section className="retro-grid" aria-label="Retrospective categories">
        {(Object.keys(laneMeta) as LaneId[]).map((lane) => {
          const laneStickies = stickies.filter((sticky) => sticky.lane === lane)

          return (
            <article key={lane} className={`lane lane-${lane}`}>
              <header className="lane-header">
                <h2>{laneMeta[lane].title}</h2>
                <p>{laneMeta[lane].subtitle}</p>
                <span>{laneCount[lane]} notes</span>
              </header>

              <div className="lane-body">
                {laneStickies.length === 0 ? (
                  <p className="empty">No stickies yet.</p>
                ) : (
                  laneStickies.map((sticky, index) => (
                    <article
                      key={sticky.id}
                      className="sticky"
                      style={{
                        transform: `rotate(${((index % 5) - 2) * 0.9}deg)`,
                      }}
                    >
                      <p>{sticky.text}</p>
                      <button
                        type="button"
                        aria-label="Delete sticky"
                        onClick={() => removeSticky(sticky.id)}
                      >
                        Remove
                      </button>
                    </article>
                  ))
                )}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default App
