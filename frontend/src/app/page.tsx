'use client';
import { useEffect, useState } from 'react';
import PostCard from '../component/PostCard';
import PostForm from '../component/PostForm';
import { User, Post, Comment } from '@/types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, usersRes, commentsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`)
      ]);

      const postsData = await postsRes.json();
      const usersData = await usersRes.json();
      const commentsData = await commentsRes.json();

      setPosts(postsData);
      setUsers(usersData);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: { title: string; userId: number }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditPost = async (postId: number, data: { title: string; userId: number }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleAddComment = async (data: { comments: string; userId: number; postId: number }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="max-w-3xl mx-auto">
        <PostForm users={users} onSubmit={handleCreatePost} />
        <div className="space-y-6">
          {posts.map((post) => {
            const user = users.find(u => u.id === post.userId);
            const postComments = comments.filter(c => c.postId === post.id);
            
            if (!user) return null;
            
            return (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                comments={postComments}
                users={users}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onAddComment={handleAddComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}