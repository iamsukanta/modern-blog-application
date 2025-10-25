export interface Blog {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface BlogWithAuthor extends Blog {
  author?: User;
  tags?: string[];
  readTime?: number;
  createdAt?: string;
}
