'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, User, LogIn, LogOut } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LibrarySystem</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/books" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Books
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
            {session ? (
              <>
              <Button variant="ghost" size="icon" onClick={() => signOut()}>
                <LogOut className="h-5 w-5" />
              </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => signIn()}>
                <LogIn className="h-5 w-5" />
              </Button>
            )}
            {session && (
           <Link href="/profile">
           <Button variant="ghost" size="icon" className="ml-2">
             <User className="h-5 w-5" />
           </Button>
         </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

