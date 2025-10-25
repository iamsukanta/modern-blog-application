import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogWithAuthor } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface BlogCardProps {
  blog: BlogWithAuthor;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <Link to={`/blog/${blog.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] border-border bg-card">
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-muted-foreground line-clamp-3">
              {blog.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{blog.author?.name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime || 1} min read</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
