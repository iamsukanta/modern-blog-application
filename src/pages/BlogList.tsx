import { useEffect } from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { TagFilter } from '@/components/blog/TagFilter';
import { useBlogStore } from '@/store/blogStore';
import { Loader2 } from 'lucide-react';

const BlogList = () => {
  const { fetchBlogs, fetchUsers, isLoading, error, getFilteredBlogs } = useBlogStore();
  const filteredBlogs = getFilteredBlogs();

  useEffect(() => {
    const loadData = async () => {
      await fetchBlogs();
      await fetchUsers();
    };
    loadData();
  }, [fetchBlogs, fetchUsers]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="text-destructive text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <TagFilter />
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogList;
