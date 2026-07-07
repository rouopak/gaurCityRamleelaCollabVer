"use client";

import { useState, useEffect, useTransition } from "react";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from "@/app/actions/achievements";
import Image from "next/image";

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const data = await getAchievements();
        setAchievements(data);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        startTransition(async () => {
            if (editingItem) {
                await updateAchievement(editingItem.id, formData);
            } else {
                await createAchievement(formData);
            }
            setShowModal(false);
            setEditingItem(null);
            loadData();
        });
    };

    const handleDelete = (id) => {
        if (!confirm("Delete this achievement?")) return;
        startTransition(async () => {
            await deleteAchievement(id);
            loadData();
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F5E9D2]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Achievements
                    </h1>
                    <p className="text-[#F5E9D2]/50 text-sm mt-1">Manage awards and milestones</p>
                </div>
                <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Achievement
                </button>
            </div>

            <div className="admin-card overflow-hidden">
                {loading ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">Loading...</p>
                ) : achievements.length === 0 ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">No achievements yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr><th>Image</th><th>Title</th><th>Year</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {achievements.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F5E9D2]/10">
                                                {item.image ? (
                                                    <Image src={item.image} fill className="object-cover" alt={item.title} />
                                                ) : (
                                                    <span className="w-full h-full flex items-center justify-center text-lg">🏆</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="font-medium">{item.title}</td>
                                        <td>{item.year || "—"}</td>
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
                                {editingItem ? "Edit Achievement" : "Add Achievement"}
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
                                <label className="admin-label">Description</label>
                                <textarea name="description" defaultValue={editingItem?.description} className="admin-input admin-textarea" />
                            </div>
                            <div>
                                <label className="admin-label">Year</label>
                                <input name="year" type="number" defaultValue={editingItem?.year} className="admin-input" />
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
