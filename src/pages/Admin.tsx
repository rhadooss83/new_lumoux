import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Helmet } from 'react-helmet-async';
import { Trash2, LogOut } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center">
        <Helmet>
          <title>Admin Login | LumoUX</title>
        </Helmet>
        <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Admin Access</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">Please log in to view messages.</p>
          <button
            onClick={handleLogin}
            className="btn-glow w-full py-3 rounded-xl text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:scale-105 transition-all"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 w-full max-w-6xl mx-auto">
      <Helmet>
        <title>Admin Dashboard | LumoUX</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Messages Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
            No messages yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Date</th>
                  <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Name</th>
                  <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Contact</th>
                  <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Service</th>
                  <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Place</th>
                  <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 text-sm text-zinc-900 dark:text-zinc-300">
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="p-4 text-sm font-medium text-zinc-900 dark:text-white">
                      {msg.name}
                    </td>
                    <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div>{msg.email}</div>
                      <div>{msg.phone}</div>
                    </td>
                    <td className="p-4 text-sm text-zinc-900 dark:text-zinc-300">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium uppercase tracking-wider">
                        {msg.service}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {msg.place}
                    </td>
                    <td className="p-4 text-sm text-right">
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                        title="Delete message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
