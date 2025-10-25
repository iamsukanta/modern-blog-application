import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useBlogStore } from '@/store/blogStore';

export const BlogHeader = () => {
  const { searchQuery, setSearchQuery } = useBlogStore();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                Tech Blog
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover articles, tutorials, and insights
              </p>
            </div>
          </div>
          
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border focus:ring-ring"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
