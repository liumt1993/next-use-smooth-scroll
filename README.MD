# next-use-smooth-scroll

A simple smooth scroll react hook for Next.js

## Install

```bash
pnpm add next-use-smooth-scroll
```
or

```bash
yarn add next-use-smooth-scroll
```

or

```bash
npm install next-use-smooth-scroll
```

## Use Case

```tsx
import { useSmoothScroll } from 'next-use-smooth-scroll'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const menuItems: MenuItem[] = [
  {
    href: '#Home',
  },
  {
    href: '#About',
  },
  {
    href: '#Activities',
  },
]

const activeHash = useSmoothScroll(
  menuItems.map(item => item.href),
  useSearchParams
)

return (
  <ul>
    {menuItems.map((item, index) => (
      <li key={index}>
        <Link href={item.href} scroll={false} className={`${activeHash === item.href ? 'active' : ''}`}>
          {item.text}
        </Link>
      </li>
    ))}
  </ul>
)
```
