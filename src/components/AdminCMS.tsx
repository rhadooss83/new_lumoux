import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Trash2, Edit2, Plus, Image as ImageIcon, X, Save } from 'lucide-react';
import { projects as defaultProjects } from '../data/projects';

export default function AdminCMS() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBootstrap = async () => {
    if (!window.confirm("This will add default projects to the database. Continue?")) return;
    setLoading(true);
    try {
      for (let i = 0; i < defaultProjects.length; i++) {
        const p = defaultProjects[i];
        await setDoc(doc(db, 'projects', p.id), {
          ...p,
          order: i
        });
      }
      alert("Projects bootstrapped successfully!");
    } catch (error) {
      console.error("Error bootstrapping projects:", error);
      alert("Error bootstrapping projects.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, thumbnail: string, images: string[]) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      // Note: We could also delete images from storage here if they are in firebase storage
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const newUrls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        newUrls.push(url);
      }
      
      if (isThumbnail) {
        setEditingProject({ ...editingProject, thumbnail: newUrls[0] });
      } else {
        setEditingProject({ 
          ...editingProject, 
          images: [...(editingProject.images || []), ...newUrls] 
        });
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message || "Unknown error"}\n\nIf this says 'unauthorized' or 'quota exceeded', you need to enable Firebase Storage and update its rules in your Firebase Console.`);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editingProject.title || !editingProject.id) {
      alert("Title and ID are required.");
      return;
    }
    setLoading(true);
    try {
      if (isCreating) {
        await setDoc(doc(db, 'projects', editingProject.id), {
          ...editingProject,
          order: projects.length
        });
      } else {
        await updateDoc(doc(db, 'projects', editingProject.id), editingProject);
      }
      setEditingProject(null);
      setIsCreating(false);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project.");
    }
    setLoading(false);
  };

  const removeImage = (index: number) => {
    const newImages = [...editingProject.images];
    newImages.splice(index, 1);
    setEditingProject({ ...editingProject, images: newImages });
  };

  if (loading && projects.length === 0) return <div>Loading projects...</div>;

  if (editingProject) {
    return (
      <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {isCreating ? 'Create New Project' : 'Edit Project'}
          </h2>
          <button 
            onClick={() => { setEditingProject(null); setIsCreating(false); }}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Project ID (URL slug)</label>
            <input 
              type="text" 
              value={editingProject.id || ''} 
              onChange={e => setEditingProject({...editingProject, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
              disabled={!isCreating}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Title</label>
            <input 
              type="text" 
              value={editingProject.title || ''} 
              onChange={e => setEditingProject({...editingProject, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Description</label>
            <textarea 
              value={editingProject.description || ''} 
              onChange={e => setEditingProject({...editingProject, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Thumbnail Image</label>
            <div className="flex items-center gap-4">
              {editingProject.thumbnail && (
                <img src={editingProject.thumbnail} alt="Thumbnail" className="w-24 h-24 object-cover rounded-lg" />
              )}
              <label className="cursor-pointer btn-glow px-4 py-2 rounded-xl text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                <ImageIcon size={16} />
                {uploading ? 'Uploading...' : 'Upload Thumbnail'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, true)} disabled={uploading} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Project Images (Gallery)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {(editingProject.images || []).map((img: string, idx: number) => (
                <div key={idx} className="relative group">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-32 object-cover rounded-lg" />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <label className="cursor-pointer btn-glow px-4 py-2 rounded-xl text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 inline-flex items-center gap-2">
              <ImageIcon size={16} />
              {uploading ? 'Uploading...' : 'Add Images'}
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, false)} disabled={uploading} />
            </label>
          </div>

          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-4">
            <button 
              onClick={() => { setEditingProject(null); setIsCreating(false); }}
              className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="btn-glow px-6 py-3 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Portfolio Projects</h2>
        <div className="flex gap-4">
          {projects.length === 0 && (
            <button 
              onClick={handleBootstrap}
              className="px-4 py-2 rounded-lg text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
            >
              Load Default Projects
            </button>
          )}
          <button 
            onClick={() => {
              setEditingProject({ id: '', title: '', description: '', thumbnail: '', images: [] });
              setIsCreating(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
          No projects found. Create one or load defaults.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400 w-24">Image</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Title</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400 hidden md:table-cell">Description</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <td className="p-4">
                    <img src={proj.thumbnail} alt={proj.title} className="w-16 h-16 object-cover rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                  </td>
                  <td className="p-4 text-sm font-medium text-zinc-900 dark:text-white">
                    {proj.title}
                  </td>
                  <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400 hidden md:table-cell max-w-xs truncate">
                    {proj.description}
                  </td>
                  <td className="p-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditingProject(proj); setIsCreating(false); }}
                        className="p-2 text-zinc-400 hover:text-purple-500 transition-colors rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30"
                        title="Edit project"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.thumbnail, proj.images)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                        title="Delete project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
