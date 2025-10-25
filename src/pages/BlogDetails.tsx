import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Mail } from 'lucide-react';
import { useBlogStore } from '@/store/blogStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, fetchBlogs, fetchUsers, blogs } = useBlogStore();
  
  const blog = getBlogById(Number(id));

  useEffect(() => {
    if (blogs.length === 0) {
      const loadData = async () => {
        await fetchBlogs();
        await fetchUsers();
      };
      loadData();
    }
  }, [blogs.length, fetchBlogs, fetchUsers]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Blog post not found</h2>
          <Link to="/">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog List
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime || 1} min read</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Author Card */}
          {blog.author && (
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center text-2xl font-bold text-white">
                  {blog.author.name.charAt(0)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{blog.author.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{blog.author.email}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">@{blog.author.username}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-foreground leading-relaxed space-y-4">
              {blog.body.split('\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Separator />

          {/* Footer */}
          <div className="flex justify-center pt-8">
            <Link to="/">
              <Button variant="default" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Read More Articles
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetails;
