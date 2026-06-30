"use client";

import { useState, useRef, useEffect } from "react";
import { uploadAndSavePrints, getAdminPrints, deletePrint, updatePrint } from "@/actions/admin";
import { ImagePlus, ShoppingBag, Loader2, Lock, Settings2, Trash2, Edit3 } from "lucide-react";

// Types for the prints we fetch
type Print = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  price: number | null;
  isForSale: boolean;
};

export default function StaffPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"gallery" | "shop" | "manage">("gallery");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the Manage tab
  const [prints, setPrints] = useState<Print[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch prints when switching to the Manage tab
  useEffect(() => {
    if (isAuthenticated && activeTab === "manage") {
      fetchPrints();
    }
  }, [isAuthenticated, activeTab]);

  const fetchPrints = async () => {
    const data = await getAdminPrints();
    setPrints(data);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "lina2026") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  };

  // Handle New Uploads
  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.append("isForSale", activeTab === "shop" ? "true" : "false");
    
    try {
      await uploadAndSavePrints(formData);
      alert("Upload complete! The images have been saved.");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert("An error occurred during the upload process.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edits
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await updatePrint(id, formData);
      alert("Print updated successfully.");
      setEditingId(null);
      fetchPrints(); // Refresh the list
    } catch (error) {
      console.error(error);
      alert("Error updating print.");
    }
  };

  // Handle Deletes
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this? This cannot be undone.")) return;
    try {
      await deletePrint(id);
      fetchPrints(); // Refresh the list
    } catch (error) {
      console.error(error);
      alert("Error deleting print.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <form onSubmit={handleAuth} className="w-full max-w-sm space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center text-center space-y-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
              <Lock size={20} />
            </div>
            <h2 className="text-lg font-light text-gray-900 uppercase tracking-widest">Admin Access</h2>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-center text-gray-900 focus:outline-none focus:ring-1 focus:ring-black transition-all"
          />
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Welcome Lina!</h1>
        <p className="text-gray-500 text-sm">Manage your webshop inventory and gallery portfolio.</p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-6 py-4 text-sm font-medium uppercase tracking-wide flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "gallery" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <ImagePlus size={18} /> Add to Gallery
        </button>
        <button
          onClick={() => setActiveTab("shop")}
          className={`px-6 py-4 text-sm font-medium uppercase tracking-wide flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "shop" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <ShoppingBag size={18} /> Add to Shop
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-6 py-4 text-sm font-medium uppercase tracking-wide flex items-center gap-2 transition-colors whitespace-nowrap ml-auto ${
            activeTab === "manage" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Settings2 size={18} /> Manage Existing
        </button>
      </div>

      {/* UPLOAD VIEWS (Gallery or Shop) */}
      {(activeTab === "gallery" || activeTab === "shop") && (
        <form ref={formRef} onSubmit={handleUploadSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (Optional)</label>
              <input type="text" name="title" placeholder="Leave blank for automatic title" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-black outline-none transition-all" />
            </div>
            {activeTab === "shop" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (Whole numbers)</label>
                <input required type="number" name="price" min="1" placeholder="Ex. 450" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-black outline-none transition-all" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
            <textarea name="description" rows={3} placeholder="Add details about the print..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-black outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Images (Select multiple if needed)</label>
            <input required type="file" name="images" multiple accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-md file:border-0 file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center disabled:bg-gray-300">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Upload Files"}
          </button>
        </form>
      )}

      {/* MANAGE VIEW */}
      {activeTab === "manage" && (
        <div className="space-y-6">
          {prints.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No items found.</p>
          ) : (
            prints.map((print) => (
              <div key={print.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-6 items-start">
                <img src={print.imageUrl} alt={print.title} className="w-32 h-32 object-cover rounded-lg bg-gray-100 shrink-0" />
                
                {editingId === print.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, print.id)} className="flex-grow space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input name="title" defaultValue={print.title} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" placeholder="Title" />
                      <input name="price" type="number" defaultValue={print.price ? print.price / 100 : ""} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" placeholder="Price (Leave blank if Gallery)" />
                    </div>
                    <textarea name="description" defaultValue={print.description || ""} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" placeholder="Description" rows={2} />
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" name="isForSale" value="true" defaultChecked={print.isForSale} />
                      List in Shop?
                    </label>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-black text-white px-4 py-2 rounded text-xs font-medium">Save</button>
                      <button type="button" onClick={() => setEditingId(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded text-xs font-medium">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{print.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{print.isForSale ? "SHOP ITEM" : "GALLERY ITEM"}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(print.id)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDelete(print.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {print.description && <p className="text-sm text-gray-600 mt-3 line-clamp-2">{print.description}</p>}
                    {print.price && <p className="text-sm font-medium text-gray-900 mt-2">${(print.price / 100).toFixed(2)}</p>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}