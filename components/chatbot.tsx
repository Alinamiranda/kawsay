'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useAuth } from '@/services/auth-context'
import { getBotReply } from '@/services/chatbot'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
}

export function Chatbot() {
  const { t, language } = useLanguage()
  const { user, addHistory } = useAuth()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([{ id: 'greet', role: 'bot', text: t('chat.greeting') }])
  }, [language, t])

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    const reply = getBotReply(trimmed, language)
    setMessages((prev) => [
      ...prev,
      { id: 'u' + Date.now(), role: 'user', text: trimmed },
      { id: 'b' + Date.now(), role: 'bot', text: reply },
    ])
    if (user) addHistory(trimmed, reply)
    setInput('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('chat.title')}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[30rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold">{t('chat.title')}</p>
              <p className="text-xs opacity-80">{t('chat.subtitle')}</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex',
                  m.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'rounded-br-sm bg-primary text-primary-foreground'
                      : 'rounded-bl-sm bg-muted text-foreground',
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={t('chat.placeholder')}
              className="h-11 flex-1 rounded-xl border border-border bg-background px-3.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label={t('chat.send')}
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="size-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
