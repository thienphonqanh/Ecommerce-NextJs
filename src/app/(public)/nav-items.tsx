import Link from 'next/link'

export const menuItems = [
  {
    id: 1,
    title: 'Men'
  },
  {
    id: 2,
    title: 'Woman'
  },
  {
    id: 3,
    title: 'Socks'
  },
  {
    id: 4,
    title: 'New Arrivals',
    href: '/collections/new-arrivals'
  },
  {
    id: 5,
    title: 'Sustainability'
  },
  {
    id: 6,
    title: 'ReRun',
    href: '/rerun'
  },
  {
    id: 7,
    title: 'Stores',
    href: '/stores'
  }
]

export default function NavItems({ className }: { className?: string }) {
  return menuItems.map((item) => {
    return (
      <div key={item.id} className="px-5">
        <Link href={item.href ?? '#'} className={className}>
          {item.title.toUpperCase()}
        </Link>
      </div>
    )
  })
}
