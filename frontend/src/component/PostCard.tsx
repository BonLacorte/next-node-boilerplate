import { useState } from 'react';
import { User, Post, Comment } from '@/types';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

interface PostCardProps {
  post: Post;
  user: User;
  comments: Comment[];
  users: User[];
  onEdit: (postId: number, data: { title: string; userId: number }) => void;
  onDelete: (postId: number) => void;
  onAddComment: (data: { comments: string; userId: number; postId: number }) => void;
}

const PostCard = ({ 
  post, 
  user, 
  comments, 
  users, 
  onEdit, 
  onDelete,
  onAddComment 
}: PostCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
        <PostForm
          users={users}
          initialData={{ title: post.title, userId: post.userId }}
          onSubmit={(data) => {
            onEdit(post.id, data);
            setIsEditing(false);
          }}
          buttonText="Save Changes"
        />
        <button
          onClick={() => setIsEditing(false)}
          className="mt-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Posted by: {user.name}
          </p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Comments:</h3>
        <div className="space-y-2 pb-4">
          {comments.map((comment) => {
            const commentUser = users.find(u => u.id === comment.userId);
            return (
              <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <p className="text-sm">{comment.comments}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  - {commentUser?.name}
                </p>
              </div>
            );
          })}
        </div>
        <CommentForm users={users} postId={post.id} onSubmit={onAddComment} />
      </div>
    </div>
  );
};

export default PostCard;