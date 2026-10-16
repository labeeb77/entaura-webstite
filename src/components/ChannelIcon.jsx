// Messenger icons for Watch alerts.
function TelegramIcon({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#29a9eb" />
      <path d="M5.4 11.7l11.2-4.3c.5-.2 1 .1.8.9l-1.9 9c-.1.6-.5.8-1 .5l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.3-4.8c.2-.2 0-.3-.4-.1l-6.5 4.1-2.8-.9c-.6-.2-.6-.6.1-1z" fill="#fff" />
    </svg>
  )
}

function ChannelIcon({ channel, size = 22 }) {
  if (channel === 'telegram') return <TelegramIcon size={size} />
  return <img src="/assets/integrations/whatsapp.png" alt="" width={size} height={size} />
}

export default ChannelIcon
