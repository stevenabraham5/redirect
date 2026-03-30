import { useEffect, useState } from 'react'
import { app, pages } from '@microsoft/teams-js'

type ConfigState = 'loading' | 'ready' | 'error'

function TabConfig() {
  const [state, setState] = useState<ConfigState>('loading')
  const [message, setMessage] = useState('Initializing Teams tab configuration...')

  useEffect(() => {
    const appRoot = `${window.location.origin}/`

    const initialize = async () => {
      try {
        await app.initialize()

        if (!pages.config.isSupported()) {
          setState('error')
          setMessage('Tab configuration is not supported in this context.')
          return
        }

        pages.config.registerOnSaveHandler((saveEvent) => {
          pages.config
            .setConfig({
              entityId: 'retro-board-tab',
              suggestedDisplayName: 'Retrospective',
              contentUrl: appRoot,
              websiteUrl: appRoot,
            })
            .then(() => {
              saveEvent.notifySuccess()
            })
            .catch((error: unknown) => {
              console.error(error)
              saveEvent.notifyFailure('Unable to save tab configuration.')
            })
        })

        pages.config.setValidityState(true)
        setState('ready')
        setMessage('Select Save to add Team Retro to this chat or meeting.')
      } catch (error) {
        console.error(error)
        setState('error')
        setMessage('Failed to initialize Teams SDK.')
      }
    }

    void initialize()
  }, [])

  const stateColor = state === 'error' ? '#b42318' : state === 'ready' ? '#027a48' : '#475467'

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1rem' }}>
      <section
        style={{
          width: 'min(640px, 100%)',
          background: '#ffffff',
          border: '1px solid #d0d5dd',
          borderRadius: '16px',
          boxShadow: '0 12px 24px rgba(16,24,40,0.08)',
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#344054', letterSpacing: '0.06em' }}>
          TEAMS TAB CONFIGURATION
        </p>
        <h1 style={{ margin: '0.35rem 0 0.6rem', fontSize: '1.8rem', color: '#101828' }}>Team Retro</h1>
        <p style={{ margin: 0, color: stateColor }}>{message}</p>
      </section>
    </main>
  )
}

export default TabConfig