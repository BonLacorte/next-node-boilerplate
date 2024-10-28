import { useState } from 'react';
import { User } from '@/types';

interface PostFormProps {
  users: User[];
  onSubmit: (data: { title: string; userId: number }) => void;
  initialData?: { title: string; userId: number };
  buttonText?: string;
}

const PostForm = ({ users, onSubmit, initialData, buttonText = 'Create Post' }: PostFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [userId, setUserId] = useState(initialData?.userId || users[0]?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, userId });
    if (!initialData) {
      setTitle('');
      setUserId(users[0]?.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Post Content
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div>
        <label htmlFor="userId" className="block text-sm font-medium mb-1">
          Post as User
        </label>
        <select
          id="userId"
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PostForm;