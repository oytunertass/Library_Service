import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Book, Settings, LogOut } from 'lucide-react';
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import dbConnect from '@/utils/db';
export default function Profile({ session ,user}) {
  if (!session) {
    return null;
  }
  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-md border-2 border-blue-400">
              <Image
                src={session.user.image || '/default-avatar.png'}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">{session.user.name}</h1>
              <p className="text-blue-600">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="borrowed" className="space-y-6">
          <TabsList className="bg-white rounded-lg shadow-md p-1 border border-blue-300">
            <TabsTrigger value="borrowed" className="text-blue-700 focus:ring-blue-500">
              <Book className="h-4 w-4 mr-2 text-blue-700" />
              Borrowed Books
            </TabsTrigger>
            <TabsTrigger value="history" className="text-blue-700 focus:ring-blue-500">
              <Calendar className="h-4 w-4 mr-2 text-blue-700" />
              Reading History
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-blue-700 focus:ring-blue-500">
              <Settings className="h-4 w-4 mr-2 text-blue-700" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="borrowed">
          <div className="p-6 bg-white border border-blue-200 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-blue-900">Currently Borrowed Books</h2>
  {user.borrowedBooks?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
      {user.borrowedBooks.map((book) => (
        <div 
          key={book._id} 
          className="flex items-center p-4 bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex-shrink-0 h-12 w-12 relative">
            <Image
              src={book.image || '/Placeholder_book.svg'}
              alt={book.title}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{book.title}</p>
            <p className="text-sm text-gray-500">by {book.author}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-gray-600">No books currently borrowed</div>
  )}
</div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6 bg-white border border-blue-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Reading History</h2>
              {user.returnedBooks?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {user.returnedBooks.map((book) => (
                    <div 
                      key={book._id} 
                      className="flex items-center p-4 bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        <Image
                          src={book.image || '/Placeholder_book.svg'}
                          alt={book.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">No reading history</div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-white border border-blue-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    defaultValue={session.user.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    defaultValue={session.user.email}
                    disabled
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Profile</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    try {
      const session = await getSession(context);
  
      if (!session) {
        return {
          redirect: {
            destination: '/auth/signin',
            permanent: false,
          },
        };
      }
  
      await dbConnect();
  
      const user = await User.aggregate([
        { 
          $match: { 
            email: session.user.email 
          } 
        },
        {
          $lookup: {
            from: 'books',
            localField: 'borrowedBooks',
            foreignField: '_id',
            as: 'borrowedBooks'
          }
        },
        {
          $lookup: {
            from: 'books',
            localField: 'returnedBooks',
            foreignField: '_id',
            as: 'returnedBooks'
          }
        }
      ]).exec();
  
      if (!user || !user[0]) {
        return {
          notFound: true
        };
      }
  
      return {
        props: {
          session,
          user: JSON.parse(JSON.stringify(user[0])),
        }
      };
  
    } catch (error) {
      console.error('Profile page error:', error);
      return {
        props: {
          session,
          error: 'Failed to load profile data'
        }
      };
    }
  }