import { ModeToggle } from '@/components/dark-mode-toggle'
import { menuItems } from './nav-items'
import Image from 'next/image'
import Link from 'next/link'
import { PATH } from '@/constants/path'
import DrilldownMenu from '@/components/drilldown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <header className="sticky top-0 w-full h-[60px] shadow-lg dark:shadow-gray-700 dark:shadow-sm flex items-center">
        <div className="container px-4 w-full">
          <nav className="hidden md:grid grid-cols-12 items-center w-full">
            <div className="col-span-4 flex justify-start items-center">
              {menuItems.slice(0, 4).map((item) => {
                return (
                  <div key={item.id} className="px-5">
                    <Link
                      href={item.href ?? '#'}
                      className="transition-colors hover:text-foreground flex-shrink-0 text-sm text-black dark:text-white font-bold tracking-[0.15rem] hover:underline"
                    >
                      {item.title.toUpperCase()}
                    </Link>
                  </div>
                )
              })}
            </div>
            <div className="col-span-4 mx-auto flex flex-col items-center">
              <Link href={PATH.home} className="cursor-default">
                <Image src="/logo.png" alt="logo" width={80} height={80} className="object-contain" priority />
              </Link>
            </div>
            <div className="col-span-4 flex justify-start items-center gap-5">
              {menuItems.slice(4, 7).map((item) => {
                return (
                  <div key={item.id}>
                    <Link
                      href={item.href ?? '#'}
                      className="transition-colors hover:text-foreground flex-shrink-0 text-sm text-black dark:text-white font-bold tracking-[0.15rem] hover:underline"
                    >
                      {item.title.toUpperCase()}
                    </Link>
                  </div>
                )
              })}
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
              <ModeToggle />
            </div>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <div className="font-bold">Workplace</div>
                  <span className="sr-only">Zoom</span>
                </Link>
                <DrilldownMenu />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
