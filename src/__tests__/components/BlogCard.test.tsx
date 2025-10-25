import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogWithAuthor } from '@/types/blog';

const mockBlog: BlogWithAuthor = {
  id: 1,
  userId: 1,
  title: 'Test Blog Title',
  body: 'This is a test blog body content.',
  tags: ['React', 'TypeScript'],
  readTime: 5,
  createdAt: '2024-01-01T00:00:00.000Z',
  author: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
  },
};

describe('BlogCard', () => {
  it('renders blog title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(getByText('Test Blog Title')).toBeInTheDocument();
  });

  it('renders blog body', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(getByText('This is a test blog body content.')).toBeInTheDocument();
  });

  it('renders all tags', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(getByText('React')).toBeInTheDocument();
    expect(getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders author name', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('renders read time', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(getByText('5 min read')).toBeInTheDocument();
  });

  it('renders without author gracefully', () => {
    const blogWithoutAuthor = { ...mockBlog, author: undefined };
    
    const { getByText } = render(
      <BrowserRouter>
        <BlogCard blog={blogWithoutAuthor} />
      </BrowserRouter>
    );
    
    expect(getByText('Anonymous')).toBeInTheDocument();
  });
});
