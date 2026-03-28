const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS    = '0123456789'
const SYMBOLS   = '!@#$%^&*()-_=+[]{}|;:,.<>?'

const WORDS = [
  'apple','tiger','ocean','silver','dragon','castle','forest','planet',
  'rocket','shadow','thunder','wizard','falcon','ember','frost','harbor',
  'jungle','kelp','lantern','marble','nebula','orbit','prism','quartz',
  'river','storm','temple','ultra','valley','willow','xenon','yellow','zenith'
]

function randomChar(charset) {
  return charset[Math.floor(Math.random() * charset.length)]
}

export function generatePassword({ length = 16, includeSymbols = true, passphrase = false }) {
  if (passphrase) {
    // 4 random words joined with a separator
    const words = Array.from({ length: 4 }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
    const sep = includeSymbols ? randomChar('-_.*!') : '-'
    return words.join(sep) + Math.floor(Math.random() * 90 + 10)
  }

  let charset = UPPERCASE + LOWERCASE + DIGITS
  if (includeSymbols) charset += SYMBOLS

  // Ensure at least one of each required type
  let pwd = [
    randomChar(UPPERCASE),
    randomChar(LOWERCASE),
    randomChar(DIGITS),
    ...(includeSymbols ? [randomChar(SYMBOLS)] : []),
  ]

  for (let i = pwd.length; i < length; i++) {
    pwd.push(randomChar(charset))
  }

  // Fisher-Yates shuffle
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]]
  }

  return pwd.join('')
}
