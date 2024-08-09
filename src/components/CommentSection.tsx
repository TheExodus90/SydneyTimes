import { useState, useEffect } from 'react';
import { supabase } from '../app/category/lib/supabase';

type Comment = {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  };
};

type CommentSectionProps = {
  articleId: number;
};

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, user:users(name)')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('comments')
      .insert({ article_id: articleId, content: newComment });

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setNewComment('');
      fetchComments();
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="Add a comment..."
          required
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.user.name}</span>
              <span className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;