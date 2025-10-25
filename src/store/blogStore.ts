import { create } from 'zustand';
import { Blog, User, BlogWithAuthor } from '@/types/blog';

interface BlogState {
  blogs: BlogWithAuthor[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedTag: string | null;
  fetchBlogs: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  getFilteredBlogs: () => BlogWithAuthor[];
  getBlogById: (id: number) => BlogWithAuthor | undefined;
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generate random tags for blogs
const generateTags = (id: number): string[] => {
  const allTags = ['React', 'TypeScript', 'JavaScript', 'Web Dev', 'Tutorial', 'Best Practices', 'Testing', 'Performance'];
  const numTags = (id % 3) + 1;
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTags);
};

// Calculate read time based on body length
const calculateReadTime = (body: string): number => {
  const wordsPerMinute = 200;
  const words = body.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
};

// Generate a random date within the last 30 days
const generateDate = (id: number): string => {
  const daysAgo = id % 30;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  users: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedTag: null,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const blogs: Blog[] = await response.json();
      
      // Enhance blogs with additional data
      const enhancedBlogs: BlogWithAuthor[] = blogs.map(blog => ({
        ...blog,
        tags: generateTags(blog.id),
        readTime: calculateReadTime(blog.body),
        createdAt: generateDate(blog.id),
      }));

      set({ blogs: enhancedBlogs, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },

  fetchUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const users: User[] = await response.json();
      
      // Attach users to blogs
      const { blogs } = get();
      const blogsWithAuthors = blogs.map(blog => ({
        ...blog,
        author: users.find(user => user.id === blog.userId),
      }));

      set({ users, blogs: blogsWithAuthors });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedTag: (tag: string | null) => {
    set({ selectedTag: tag });
  },

  getFilteredBlogs: () => {
    const { blogs, searchQuery, selectedTag } = get();
    
    return blogs.filter(blog => {
      const matchesSearch = !searchQuery || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.body.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || 
        blog.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  },

  getBlogById: (id: number) => {
    const { blogs } = get();
    return blogs.find(blog => blog.id === id);
  },
}));
