import { useState } from 'react';
import { User } from '@/types';

interface CommentFormProps {
  users: User[];
  postId: number;
  onSubmit: (data: { comments: string; userId: number; postId: number }) => void;
}

const CommentForm = ({ users, postId, onSubmit }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState(users[0]?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ comments: comment, userId, postId });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-1">
          Add a comment
        </label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div>
        <label htmlFor="commentUserId" className="block text-sm font-medium mb-1">
          Comment as User
        </label>
        <select
          id="commentUserId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;