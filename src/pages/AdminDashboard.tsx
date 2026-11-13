import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptItem, ContentType } from '../types';
import { 
  Shield, Plus, Trash2, Edit, Eye, EyeOff, Flame, Download, Upload, Settings, LogOut, CheckCircle2, AlertTriangle, Sparkles, Image as ImageIcon, Film, HelpCircle, Lock 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    prompts, 
    adminLogout, 
    addPrompt, 
    updatePrompt, 
    deletePrompt, 
    togglePublish, 
    toggleTrending, 
    toggleFeatured, 
    adSettings, 
    updateAdSettings, 
    exportDatabase, 
    importDatabase, 
    resetToDefault,
    updateAdminPassword
  } = usePrompts();

  const [activeTab, setActiveTab] = useState<'prompts' | 'add' | 'ads' | 'backup' | 'security'>('prompts');
  const [secForm, setSecForm] = useState({ oldPass: '', newPass: '', confirmPass: '' });
  const [secMsg, setSecMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state for Add/Edit
  const [form, setForm] = useState({
    title: '',
    category: 'Cinematic Portrait',
    contentType: 'photo' as ContentType,
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '',
    fullPrompt: '',
    negativePrompt: '',
    recommendedTool: 'Midjourney v6',
    aspectRatio: '9:16' as '1:1' | '16:9' | '9:16' | '4:3' | '3:4',
    description: '',
    author: 'Admin',
    isTrending: false,
    isFeatured: false,
    isPublished: true,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updatePrompt(editingId, form);
      setEditingId(null);
      alert('Prompt updated successfully!');
    } else {
      addPrompt(form);
      alert('New prompt added successfully!');
    }
    setForm({
      title: '',
      category: 'Cinematic Portrait',
      contentType: 'photo',
      previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      videoUrl: '',
      fullPrompt: '',
      negativePrompt: '',
      recommendedTool: 'Midjourney v6',
      aspectRatio: '9:16',
      description: '',
      author: 'Admin',
      isTrending: false,
      isFeatured: false,
      isPublished: true,
    });
    setActiveTab('prompts');
  };

  const startEdit = (p: PromptItem) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      contentType: p.contentType,
      previewImage: p.previewImage,
      videoUrl: p.videoUrl || '',
      fullPrompt: p.fullPrompt,
      negativePrompt: p.negativePrompt || '',
      recommendedTool: p.recommendedTool,
      aspectRatio: p.aspectRatio,
      description: p.description,
      author: p.author,
      isTrending: p.isTrending,
      isFeatured: p.isFeatured,
      isPublished: p.isPublished,
    });
    setActiveTab('add');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importDatabase(content);
        if (success) {
          alert('Database restored successfully from backup JSON!');
        } else {
          alert('Failed to parse backup JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Gallery Image File Picker for Admin Prompt Creation
  const handleGalleryImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setForm(prev => ({ ...prev, previewImage: result }));
          alert('Image uploaded successfully from your gallery!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Gallery Video File Picker for Admin Video Demo
  const handleGalleryVideoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setForm(prev => ({ ...prev, videoUrl: result }));
          alert('Video demo uploaded successfully from your gallery!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const totalVideos = prompts.filter(p => p.videoUrl).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#9B75FF]/20 text-[#4DDCF5] px-3.5 py-1 rounded-full text-xs font-bold border border-[#9B75FF]/30">
            <Shield className="w-4 h-4" /> Admin Portal Studio
          </div>
          <h1 className="text-3xl font-black text-white">Content Management Dashboard</h1>
          <p className="text-xs text-gray-400">Manage prompts, video demos from gallery, ad monetization settings, and backups.</p>
        </div>

        <button
          onClick={adminLogout}
          className="bg-[#0D0D18] hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-[#242438] px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout Admin
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#151525] border border-[#242438] p-6 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Total Prompts</span>
          <span className="text-3xl font-black text-white">{prompts.length}</span>
        </div>
        <div className="bg-[#151525] border border-[#242438] p-6 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Video Demos</span>
          <span className="text-3xl font-black text-[#4DDCF5]">{totalVideos}</span>
        </div>
        <div className="bg-[#151525] border border-[#242438] p-6 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Visitors</span>
          <span className="text-3xl font-black text-white">12,450+</span>
        </div>
        <div className="bg-[#151525] border border-[#242438] p-6 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider">System Uptime</span>
          <span className="text-3xl font-black text-emerald-400">99.9%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242438] pb-4">
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'prompts' ? 'bg-[#9B75FF] text-white shadow-md' : 'bg-[#151525] text-gray-400 hover:text-white border border-[#242438]'
          }`}
        >
          Manage Prompts ({prompts.length})
        </button>
        <button
          onClick={() => { setEditingId(null); setActiveTab('add'); }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'add' ? 'bg-[#9B75FF] text-white shadow-md' : 'bg-[#151525] text-gray-400 hover:text-white border border-[#242438]'
          }`}
        >
          <Plus className="w-4 h-4" /> {editingId ? 'Edit Prompt' : 'Add New Prompt'}
        </button>
        <button
          onClick={() => setActiveTab('ads')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'ads' ? 'bg-[#9B75FF] text-white shadow-md' : 'bg-[#151525] text-gray-400 hover:text-white border border-[#242438]'
          }`}
        >
          <Settings className="w-4 h-4" /> Ad Settings
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'backup' ? 'bg-[#9B75FF] text-white shadow-md' : 'bg-[#151525] text-gray-400 hover:text-white border border-[#242438]'
          }`}
        >
          <Download className="w-4 h-4" /> Backup & Restore
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'security' ? 'bg-[#9B75FF] text-white shadow-md' : 'bg-[#151525] text-gray-400 hover:text-white border border-[#242438]'
          }`}
        >
          <Lock className="w-4 h-4" /> Security & Password
        </button>
      </div>

      {/* Tab 1: Manage Prompts Table */}
      {activeTab === 'prompts' && (
        <div className="bg-[#151525] border border-[#242438] rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#242438] text-[11px] text-gray-400 uppercase tracking-wider bg-[#0D0D18]">
                  <th className="p-4">Prompt Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Tool</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242438] text-xs">
                {prompts.map(p => (
                  <tr key={p.id} className="hover:bg-[#0D0D18]/50 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <img src={p.previewImage} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#242438]" />
                      <span className="line-clamp-1">{p.title}</span>
                    </td>
                    <td className="p-4 text-gray-300">{p.category}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#9B75FF]/20 text-[#4DDCF5] border border-[#9B75FF]/30">
                        {p.contentType}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 font-mono">{p.recommendedTool}</td>
                    <td className="p-4 text-center space-x-1">
                      <button 
                        onClick={() => togglePublish(p.id)}
                        className={`p-1.5 rounded-lg border ${p.isPublished ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-gray-500/20 text-gray-400 border-gray-500/40'}`}
                        title={p.isPublished ? 'Published' : 'Draft'}
                      >
                        {p.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <button 
                        onClick={() => toggleTrending(p.id)}
                        className={`p-1.5 rounded-lg border ${p.isTrending ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-gray-500/20 text-gray-400 border-gray-500/40'}`}
                        title="Toggle Trending"
                      >
                        <Flame className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="px-3 py-1.5 bg-[#242438] text-white hover:text-[#4DDCF5] rounded-xl font-semibold transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => { if (confirm('Are you sure you want to delete this prompt?')) deletePrompt(p.id); }}
                        className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-semibold transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Add / Edit Prompt Form with Gallery Upload & Aspect Ratio Guide */}
      {activeTab === 'add' && (
        <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[#242438] pb-4">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Master Prompt Entry' : 'Add New Master Prompt & Media'}
            </h2>
          </div>

          {/* Aspect Ratio & Size Helper Guide */}
          <div className="bg-[#0D0D18] border border-[#9B75FF]/30 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4DDCF5]">
              <HelpCircle className="w-4 h-4" /> Size & Aspect Ratio Guide (কোন সাইজ কোথায় ব্যবহার করবেন):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="bg-[#151525] p-3 rounded-xl border border-[#242438]">
                <strong className="text-white">9:16 (Vertical):</strong> TikTok, Instagram Reels, YouTube Shorts (লম্বালম্বি ভিডিও/ছবি).
              </div>
              <div className="bg-[#151525] p-3 rounded-xl border border-[#242438]">
                <strong className="text-white">16:9 (Cinematic):</strong> YouTube Landscape, Runway, Kling (বড় স্ক্রিন ভিডিও).
              </div>
              <div className="bg-[#151525] p-3 rounded-xl border border-[#242438]">
                <strong className="text-white">1:1 (Square):</strong> Instagram Square Posts & Profile Pictures.
              </div>
              <div className="bg-[#151525] p-3 rounded-xl border border-[#242438]">
                <strong className="text-white">3:4 (Portrait):</strong> High-fashion Portraits & Saree Photography.
              </div>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Prompt Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Cinematic Cyberpunk Portrait"
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Cinematic Portrait"
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Content Type</label>
                <select
                  value={form.contentType}
                  onChange={(e) => setForm({ ...form, contentType: e.target.value as ContentType })}
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                  <option value="editing">Editing</option>
                  <option value="effect">Effect</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Recommended Tool</label>
                <input
                  type="text"
                  value={form.recommendedTool}
                  onChange={(e) => setForm({ ...form, recommendedTool: e.target.value })}
                  placeholder="e.g. Midjourney v6"
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Aspect Ratio</label>
                <select
                  value={form.aspectRatio}
                  onChange={(e) => setForm({ ...form, aspectRatio: e.target.value as any })}
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                >
                  <option value="9:16">9:16 (Vertical)</option>
                  <option value="16:9">16:9 (Cinematic)</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="3:4">3:4 (Portrait)</option>
                </select>
              </div>
            </div>

            {/* Gallery Upload Section for Image & Video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0D0D18] p-5 rounded-2xl border border-[#242438]">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4DDCF5] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" /> Upload Picture from Gallery
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryImagePick}
                  className="w-full text-xs text-gray-400 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#9B75FF] file:text-white hover:file:opacity-90"
                />
                <input
                  type="url"
                  value={form.previewImage}
                  onChange={(e) => setForm({ ...form, previewImage: e.target.value })}
                  placeholder="Or paste Image URL..."
                  className="w-full bg-[#151525] border border-[#242438] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4DDCF5] flex items-center gap-1.5">
                  <Film className="w-4 h-4" /> Upload Video Demo from Gallery
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleGalleryVideoPick}
                  className="w-full text-xs text-gray-400 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#4DDCF5] file:text-[#0D0D18] hover:file:opacity-90"
                />
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="Or paste Video MP4 URL..."
                  className="w-full bg-[#151525] border border-[#242438] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Full Master Prompt</label>
              <textarea
                required
                rows={4}
                value={form.fullPrompt}
                onChange={(e) => setForm({ ...form, fullPrompt: e.target.value })}
                placeholder="Enter detailed AI generation prompt..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-red-400 block mb-1">Negative Prompt (Optional)</label>
              <input
                type="text"
                value={form.negativePrompt}
                onChange={(e) => setForm({ ...form, negativePrompt: e.target.value })}
                placeholder="cartoon, low quality, blurry..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Short Description</label>
              <input
                type="text"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the prompt effect..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isTrending}
                  onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#0D0D18] border-[#242438]"
                />
                Mark as Trending
              </label>
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#0D0D18] border-[#242438]"
                />
                Mark as Featured
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] rounded-xl font-extrabold text-xs shadow-lg shadow-[#9B75FF]/30 cursor-pointer"
            >
              {editingId ? 'Save Changes' : 'Publish New Prompt'}
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Ad Settings */}
      {activeTab === 'ads' && (
        <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Rewarded Advertisement Settings</h2>
            <p className="text-xs text-gray-400">Configure rewarded ad system for prompt copying.</p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-[#0D0D18] border border-[#242438] rounded-2xl cursor-pointer">
              <div>
                <span className="text-sm font-bold text-white block">Enable Rewarded Ad on Copy</span>
                <span className="text-xs text-gray-400">Require watching a short ad before unlocking prompt copy.</span>
              </div>
              <input
                type="checkbox"
                checked={adSettings.enabled}
                onChange={(e) => updateAdSettings({ ...adSettings, enabled: e.target.checked })}
                className="w-5 h-5 rounded bg-[#151525]"
              />
            </label>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Ad Provider</label>
              <select
                value={adSettings.provider}
                onChange={(e) => updateAdSettings({ ...adSettings, provider: e.target.value as any })}
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
              >
                <option value="Google Ad Manager">Google Ad Manager (Web/PWA)</option>
                <option value="AdMob">AdMob (Native App)</option>
                <option value="Custom Rewarded Ad">Custom Rewarded Ad Network</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Network ID</label>
                <input
                  type="text"
                  value={adSettings.adManagerNetworkId}
                  onChange={(e) => updateAdSettings({ ...adSettings, adManagerNetworkId: e.target.value })}
                  placeholder="e.g. 1234567"
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Rewarded Ad Unit Path</label>
                <input
                  type="text"
                  value={adSettings.adManagerAdUnitPath}
                  onChange={(e) => updateAdSettings({ ...adSettings, adManagerAdUnitPath: e.target.value })}
                  placeholder="/1234/rewarded_ad_unit"
                  className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={() => alert('Ad settings updated successfully!')}
              className="w-full py-3 bg-[#9B75FF] text-white rounded-xl font-bold text-xs"
            >
              Save Ad Configuration
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Database Backup & Restore</h2>
            <p className="text-xs text-gray-400">Export your prompt library as a JSON backup or restore from a previous backup file.</p>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-[#0D0D18] border border-[#242438] rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Export Database Backup</h4>
                <p className="text-xs text-gray-400">Download all prompts and categories as a JSON file.</p>
              </div>
              <button
                onClick={exportDatabase}
                className="px-5 py-2.5 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] rounded-xl font-bold text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Export JSON
              </button>
            </div>

            <div className="p-6 bg-[#0D0D18] border border-[#242438] rounded-2xl space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white">Restore Database Backup</h4>
                <p className="text-xs text-gray-400">Upload a previously exported JSON backup file.</p>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#9B75FF] file:text-white hover:file:opacity-90"
              />
            </div>

            <div className="p-6 bg-[#0D0D18] border border-red-500/30 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Reset to Default Library</h4>
                <p className="text-xs text-gray-400">Restore the original starter prompts dataset.</p>
              </div>
              <button
                onClick={() => { if (confirm('Reset to default starter prompts?')) { resetToDefault(); alert('Reset complete!'); } }}
                className="px-5 py-2.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-bold text-xs"
              >
                Reset Database
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Security & Password */}
      {activeTab === 'security' && (
        <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl shadow-xl max-w-xl mx-auto space-y-6">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#9B75FF]/20 text-[#4DDCF5] flex items-center justify-center border border-[#9B75FF]/40">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Admin Security & Password</h2>
            <p className="text-xs text-gray-400">Change your secure admin portal password. Minimum 6 characters required.</p>
          </div>

          {secMsg && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              secMsg.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-red-500/20 border border-red-500/40 text-red-400'
            }`}>
              {secMsg.text}
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            if (secForm.newPass !== secForm.confirmPass) {
              setSecMsg({ type: 'error', text: 'New passwords do not match.' });
              return;
            }
            if (secForm.newPass.length < 6) {
              setSecMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
              return;
            }
            const success = updateAdminPassword(secForm.oldPass, secForm.newPass);
            if (success) {
              setSecMsg({ type: 'success', text: 'Admin password successfully updated!' });
              setSecForm({ oldPass: '', newPass: '', confirmPass: '' });
            } else {
              setSecMsg({ type: 'error', text: 'Incorrect current password.' });
            }
          }} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Current Password</label>
              <input
                type="password"
                required
                value={secForm.oldPass}
                onChange={(e) => setSecForm({ ...secForm, oldPass: e.target.value })}
                placeholder="Enter current password..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">New Password (Min 6 chars)</label>
              <input
                type="password"
                required
                value={secForm.newPass}
                onChange={(e) => setSecForm({ ...secForm, newPass: e.target.value })}
                placeholder="Enter new password..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={secForm.confirmPass}
                onChange={(e) => setSecForm({ ...secForm, confirmPass: e.target.value })}
                placeholder="Confirm new password..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] rounded-xl font-extrabold text-xs shadow-lg shadow-[#9B75FF]/30 hover:opacity-95 transition-all"
            >
              Update Admin Password
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
