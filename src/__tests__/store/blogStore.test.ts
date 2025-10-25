import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBlogStore } from '@/store/blogStore';

// Mock fetch
global.fetch = vi.fn();

describe('Blog Store', () => {
  beforeEach(() => {
    // Reset store state
    useBlogStore.setState({
      blogs: [],
      users: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      selectedTag: null,
    });
    vi.clearAllMocks();
  });

  it('should initialize with empty blogs', () => {
    const { blogs } = useBlogStore.getState();
    expect(blogs).toEqual([]);
  });

  it('should set search query', () => {
    const { setSearchQuery } = useBlogStore.getState();
    setSearchQuery('React');
    const { searchQuery } = useBlogStore.getState();
    expect(searchQuery).toBe('React');
  });

  it('should set selected tag', () => {
    const { setSelectedTag } = useBlogStore.getState();
    setSelectedTag('TypeScript');
    const { selectedTag } = useBlogStore.getState();
    expect(selectedTag).toBe('TypeScript');
  });

  it('should filter blogs by search query', () => {
    // Set up test data
    useBlogStore.setState({
      blogs: [
        { id: 1, userId: 1, title: 'React Tutorial', body: 'Learn React', tags: ['React'] },
        { id: 2, userId: 1, title: 'TypeScript Guide', body: 'Learn TypeScript', tags: ['TypeScript'] },
      ],
      searchQuery: 'React',
    });

    const { getFilteredBlogs } = useBlogStore.getState();
    const filtered = getFilteredBlogs();
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('React Tutorial');
  });

  it('should filter blogs by tag', () => {
    useBlogStore.setState({
      blogs: [
        { id: 1, userId: 1, title: 'React Tutorial', body: 'Learn React', tags: ['React'] },
        { id: 2, userId: 1, title: 'TypeScript Guide', body: 'Learn TypeScript', tags: ['TypeScript'] },
      ],
      selectedTag: 'TypeScript',
    });

    const { getFilteredBlogs } = useBlogStore.getState();
    const filtered = getFilteredBlogs();
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('TypeScript Guide');
  });

  it('should get blog by id', () => {
    useBlogStore.setState({
      blogs: [
        { id: 1, userId: 1, title: 'React Tutorial', body: 'Learn React', tags: ['React'] },
        { id: 2, userId: 1, title: 'TypeScript Guide', body: 'Learn TypeScript', tags: ['TypeScript'] },
      ],
    });

    const { getBlogById } = useBlogStore.getState();
    const blog = getBlogById(1);
    
    expect(blog).toBeDefined();
    expect(blog?.title).toBe('React Tutorial');
  });

  it('should handle fetch blogs success', async () => {
    const mockBlogs = [
      { userId: 1, id: 1, title: 'Test Blog', body: 'Test content' },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogs,
    });

    const { fetchBlogs } = useBlogStore.getState();
    await fetchBlogs();

    const { blogs, isLoading, error } = useBlogStore.getState();
    expect(blogs).toHaveLength(1);
    expect(blogs[0].title).toBe('Test Blog');
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  it('should handle fetch blogs error', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    const { fetchBlogs } = useBlogStore.getState();
    await fetchBlogs();

    const { error, isLoading } = useBlogStore.getState();
    expect(error).toBe('Failed to fetch blogs');
    expect(isLoading).toBe(false);
  });
});
