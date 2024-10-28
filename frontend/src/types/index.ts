interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface Post {
    id: number;
    title: string;
    userId: number;
  }
  
  interface Comment {
    id: number;
    comments: string;
    userId: number;
    postId: number;
  }
  
  export type { User, Post, Comment };