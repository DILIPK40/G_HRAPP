import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { CompanyPost } from "@/types";
import Image from "next/image";
import { Megaphone, Newspaper, CalendarDays } from "lucide-react";

const mockFeedItems: CompanyPost[] = [
  {
    id: "1",
    title: "New Office Opening in Downtown!",
    content: "We are excited to announce the grand opening of our new office in the heart of downtown. Join us for the celebration next Friday!",
    author: "Alice Wonderland",
    date: "2024-07-15",
    category: "Announcement",
    imageUrl: "https://placehold.co/600x400.png",
  },
  {
    id: "2",
    title: "Quarterly All-Hands Meeting",
    content: "Don't miss our quarterly all-hands meeting where we'll discuss recent successes and future goals. Check your calendar for the invite.",
    author: "Bob The Builder",
    date: "2024-07-10",
    category: "Event",
  },
  {
    id: "3",
    title: "Welcome New Hires!",
    content: "A warm welcome to our newest team members: Charlie Brown, Diana Prince, and Edward Scissorhands. We're thrilled to have you!",
    author: "HR Department",
    date: "2024-07-05",
    category: "News",
    imageUrl: "https://placehold.co/600x400.png",
  },
];

function getCategoryIcon(category: CompanyPost['category']) {
  switch (category) {
    case 'Announcement':
      return <Megaphone className="h-4 w-4 text-primary" />;
    case 'News':
      return <Newspaper className="h-4 w-4 text-green-500" />;
    case 'Event':
      return <CalendarDays className="h-4 w-4 text-purple-500" />;
    default:
      return null;
  }
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Company Feed</h1>
        <p className="text-muted-foreground">Stay updated with the latest news and announcements.</p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockFeedItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {item.imageUrl && (
              <div className="relative h-48 w-full">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={item.category === "Announcement" ? "office building" : "team people"}
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(item.category)}
                  {item.category}
                </Badge>
                <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-2 border-t pt-4 mt-auto">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://placehold.co/40x40.png?text=${item.author.substring(0,1)}`} data-ai-hint="profile person" />
                <AvatarFallback>{item.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-foreground">{item.author}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
