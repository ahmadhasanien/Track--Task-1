import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Copy, Upload } from 'lucide-react';
import assistantIcon from '../../assets/assistant/assistant-icon.png';
import { userProfile } from '../../data/mockDashboard';
import './assistant.css';

interface Suggestion {
  id: string;
  label: string;
  prompt: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: ReactNode;
  copyText?: string;
}

const suggestions: Suggestion[] = [
  { id: 's1', label: 'كم هدف استراتيجي منجز هالربع؟', prompt: 'كم هدف استراتيجي منجز هالربع؟' },
  { id: 's2', label: 'ما هي المخاطر الحرجة الحالية؟', prompt: 'ما هي المخاطر الحرجة الحالية؟' },
  { id: 's3', label: 'لخص حالة المشاريع النشطة', prompt: 'لخص حالة المشاريع النشطة' },
];

const goalsAnswer = (
  <>
    <p>
      في الربع الثالث لديك <strong>12</strong> هدفاً استراتيجياً موزعة كالتالي:
    </p>
    <ul>
      <li>✅ منجز: 4 أهداف (33%)</li>
      <li>🟡 قيد التنفيذ: 5 أهداف (42%)</li>
      <li>🔴 متأخر: 3 أهداف (25%)</li>
    </ul>
    <p>الأهداف المتأخرة الثلاثة تتبع إدارة التحول الرقمي.</p>
  </>
);

const goalsSummary = (
  <p>
    باختصار: <strong>4</strong> أهداف منجزة، <strong>5</strong> قيد التنفيذ، و<strong>3</strong> متأخرة — كلها
    ضمن إدارة التحول الرقمي.
  </p>
);

const risksAnswer = (
  <>
    <p>لديك حالياً 3 مخاطر مرتفعة و5 متوسطة و4 منخفضة عبر المشاريع النشطة.</p>
    <ul>
      <li>🔴 خطر مرتفع جديد على منصة الخدمات — مشكلة تأخير الخادم</li>
      <li>🟡 خطران متوسطان قيد المتابعة من فريق البنية التقنية</li>
    </ul>
  </>
);

const projectsAnswer = (
  <>
    <p>
      لديك <strong>8</strong> مشاريع نشطة بمتوسط تقدم <strong>80%</strong> على المسار الصحيح.
    </p>
    <ul>
      <li>🟢 نظام إدارة المحتوى المتقدم — 50% على المسار</li>
      <li>🟠 وثيقة البنية التقنية — يستحق غداً</li>
    </ul>
  </>
);

const fallbackAnswer = (
  <p>لم أجد بيانات كافية للإجابة على هذا السؤال بدقة، هل يمكنك إعادة صياغته أو تحديد مشروع أو إدارة معينة؟</p>
);

function answerFor(prompt: string): ReactNode {
  const normalized = prompt.trim();
  if (normalized.includes('ملخص')) return goalsSummary;
  if (normalized.includes('هدف') || normalized.includes('استراتيج')) return goalsAnswer;
  if (normalized.includes('خطر') || normalized.includes('مخاطر')) return risksAnswer;
  if (normalized.includes('مشاريع') || normalized.includes('مشروع')) return projectsAnswer;
  return fallbackAnswer;
}

function plainTextFor(node: ReactNode): string {
  if (node === goalsAnswer) {
    return 'في الربع الثالث لديك 12 هدفاً استراتيجياً: منجز 4 أهداف (33%)، قيد التنفيذ 5 أهداف (42%)، متأخر 3 أهداف (25%). الأهداف المتأخرة الثلاثة تتبع إدارة التحول الرقمي.';
  }
  if (node === goalsSummary) {
    return 'باختصار: 4 أهداف منجزة، 5 قيد التنفيذ، و3 متأخرة — كلها ضمن إدارة التحول الرقمي.';
  }
  if (node === risksAnswer) {
    return 'لديك حالياً 3 مخاطر مرتفعة و5 متوسطة و4 منخفضة عبر المشاريع النشطة.';
  }
  if (node === projectsAnswer) {
    return 'لديك 8 مشاريع نشطة بمتوسط تقدم 80% على المسار الصحيح.';
  }
  return 'لم أجد بيانات كافية للإجابة على هذا السؤال بدقة.';
}

let messageIdCounter = 0;
function nextId() {
  messageIdCounter += 1;
  return `m${messageIdCounter}`;
}

export function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const firstName = userProfile.name.split(' ')[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function openPanel() {
    setIsOpen(true);
  }

  function closePanel() {
    setIsOpen(false);
  }

  function resetToWelcome() {
    setIsOpen(false);
    setHasStartedChat(false);
    setMessages([]);
    setDraft('');
  }

  function sendPrompt(prompt: string) {
    const text = prompt.trim();
    if (!text) return;

    setHasStartedChat(true);
    setDraft('');

    const userMessage: ChatMessage = { id: nextId(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    window.setTimeout(() => {
      const answer = answerFor(text);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', content: answer, copyText: plainTextFor(answer) },
      ]);
    }, 700);
  }

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      
    }
  }

  if (!isOpen) {
    return (
      <button type="button" className="assistant-fab" onClick={openPanel} aria-label="فتح المساعد الذكي">
        <img src={assistantIcon} alt="" />
      </button>
    );
  }

  return (
    <div className="assistant-panel" role="dialog" aria-label="المساعد الذكي">
      {hasStartedChat ? (
        <>
          <div className="assistant-panel__header">
            <button
              type="button"
              className="assistant-panel__header-brand"
              onClick={resetToWelcome}
              aria-label="المساعد الذكي، العودة إلى الشاشة الرئيسية"
            >
              <img src={assistantIcon} alt="" className="assistant-panel__header-icon" />
              <span className="assistant-panel__header-title">المساعد الذكي</span>
            </button>
          </div>

          <div className="assistant-conversation">
            <div className="assistant-conversation__messages">
              {messages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="assistant-msg assistant-msg--user">
                    <div className="assistant-bubble">{message.content}</div>
                  </div>
                ) : (
                  <div key={message.id} className="assistant-msg assistant-msg--assistant">
                    <div className="assistant-answer">{message.content}</div>
                    <button
                      type="button"
                      className="assistant-answer__copy"
                      onClick={() => handleCopy(message.copyText ?? '')}
                      aria-label="نسخ الإجابة"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                ),
              )}
              {isTyping && (
                <div className="assistant-msg assistant-msg--assistant">
                  <div className="assistant-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="assistant-conversation__composer">
              <Composer draft={draft} setDraft={setDraft} onSend={() => sendPrompt(draft)} />
            </div>
          </div>
        </>
      ) : (
        <div className="assistant-welcome">
          <div className="assistant-welcome__top">
            <img src={assistantIcon} alt="" className="assistant-welcome__icon" onClick={closePanel} />
          </div>

          <div className="assistant-welcome__middle">
            <div className="assistant-welcome__group">
              <div className="assistant-welcome__greeting">
                <p className="assistant-welcome__hello">مرحبا {firstName}</p>
                <p className="assistant-welcome__sub">كيف يمكنني مساعدتك؟</p>
              </div>

              <div className="assistant-welcome__bottom">
                <Composer draft={draft} setDraft={setDraft} onSend={() => sendPrompt(draft)} />

                <div className="assistant-suggestions">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      className="assistant-suggestion"
                      title={suggestion.label}
                      onClick={() => sendPrompt(suggestion.prompt)}
                    >
                      <span>اقتراح</span>
                      <SuggestionIcon />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ComposerProps {
  draft: string;
  setDraft: (value: string) => void;
  onSend: () => void;
}

function Composer({ draft, setDraft, onSend }: ComposerProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="assistant-composer">
      <button type="button" className="assistant-composer__icon-btn" aria-label="إرفاق ملف">
        <Upload size={16} />
      </button>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="أكتب رسالة"
        aria-label="أكتب رسالة"
      />
    </div>
  );
}

function SuggestionIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.6" y="1.6" width="20.8" height="20.8" rx="7.5" stroke="white" strokeWidth="1.6" />
      <circle cx="8" cy="12" r="1.4" fill="white" />
      <circle cx="12" cy="12" r="1.4" fill="white" />
      <circle cx="16" cy="12" r="1.4" fill="white" />
    </svg>
  );
}
