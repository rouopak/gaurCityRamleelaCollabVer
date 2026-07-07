"use client";

import { useState, useEffect, useTransition } from "react";
import { getPressReleases, createPressRelease, updatePressRelease, deletePressRelease } from "@/app/actions/press-releases";
import Image from "next/image";

export default function PressReleasesPage() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const data = await getPressReleases();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        startTransition(async () => {
            if (editingItem) {
                await updatePressRelease(editingItem.id, formData);
            } else {
                await createPressRelease(formData);
            }
            setShowModal(false);
            setEditingItem(null);
            loadData();
        });
    };

    const handleDelete = (id) => {
        if (!confirm("Delete this press release?")) return;
        startTransition(async () => {
            await deletePressRelease(id);
            loadData();
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F5E9D2]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Press Releases
                    </h1>
                    <p className="text-[#F5E9D2]/50 text-sm mt-1">Manage news and press coverage</p>
                </div>
                <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Press Release
                </button>
            </div>

            <div className="admin-card overflow-hidden">
                {loading ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">Loading...</p>
                ) : items.length === 0 ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">No press releases yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr><th>Image</th><th>Title</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F5E9D2]/10">
                                                {item.image ? (
                                                    <Image src={item.image} fill className="object-cover" alt={item.title} />
                                                ) : (
                                                    <span className="w-full h-full flex items-center justify-center text-lg">📰</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="font-medium max-w-xs truncate">{item.title}</td>
                                        <td className="whitespace-nowrap">{new Date(item.publishDate).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`admin-badge ${item.published ? "admin-badge-green" : "admin-badge-yellow"}`}>
                                                {item.published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => { setEditingItem(item); setShowModal(true); }}
                                                    className="admin-btn admin-btn-secondary text-xs px-3 py-1.5">Edit</button>
                                                <button onClick={() => handleDelete(item.id)}
                                                    className="admin-btn admin-btn-danger text-xs px-3 py-1.5">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#F5E9D2]">
                                {editingItem ? "Edit Press Release" : "Add Press Release"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-[#F5E9D2]/40 hover:text-[#F5E9D2] cursor-pointer">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="admin-label">Title *</label>
                                <input name="title" required defaultValue={editingItem?.title} className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Content</label>
                                <textarea name="content" defaultValue={editingItem?.content} className="admin-input admin-textarea" rows={6} />
                            </div>
                            <div>
                                <label className="admin-label">Publish Date</label>
                                <input name="publishDate" type="date"
                                    defaultValue={editingItem?.publishDate ? new Date(editingItem.publishDate).toISOString().split("T")[0] : ""}
                                    className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Image</label>
                                <input name="image" type="file" accept="image/*" className="admin-input" />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="admin-label mb-0">Status</label>
                                <select name="published" defaultValue={editingItem?.published ? "true" : "false"} className="admin-input w-auto">
                                    <option value="true">Published</option>
                                    <option value="false">Draft</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={isPending} className="admin-btn admin-btn-primary flex-1 justify-center">
                                    {isPending ? "Saving..." : editingItem ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="admin-btn admin-btn-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
