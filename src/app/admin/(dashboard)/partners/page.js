"use client";

import { useState, useEffect, useTransition } from "react";
import { getPartners, createPartner, updatePartner, deletePartner } from "@/app/actions/partners";
import Image from "next/image";

export default function PartnersPage() {
    const [partners, setPartners] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const data = await getPartners();
        setPartners(data);
        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => loadData(), 0);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        startTransition(async () => {
            if (editingItem) {
                await updatePartner(editingItem.id, formData);
            } else {
                await createPartner(formData);
            }
            setShowModal(false);
            setEditingItem(null);
            loadData();
        });
    };

    const handleDelete = (id) => {
        if (!confirm("Delete this partner?")) return;
        startTransition(async () => {
            await deletePartner(id);
            loadData();
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F5E9D2]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Partners
                    </h1>
                    <p className="text-[#F5E9D2]/50 text-sm mt-1">Manage sponsors and partners</p>
                </div>
                <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Partner
                </button>
            </div>

            {/* Grid view for partners */}
            {loading ? (
                <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">Loading...</p>
            ) : partners.length === 0 ? (
                <div className="admin-card">
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">No partners yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partners.map((item) => (
                        <div key={item.id} className="admin-card flex flex-col items-center text-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F5E9D2]/10 mb-3">
                                {item.logo ? (
                                    <Image src={item.logo} fill className="object-contain p-2" alt={item.name} />
                                ) : (
                                    <span className="w-full h-full flex items-center justify-center text-2xl">🤝</span>
                                )}
                            </div>
                            <h3 className="text-sm font-medium text-[#F5E9D2] mb-1">{item.name}</h3>
                            {item.website && (
                                <p className="text-xs text-[#b55924] truncate max-w-full">{item.website}</p>
                            )}
                            <span className={`admin-badge mt-2 ${item.published ? "admin-badge-green" : "admin-badge-yellow"}`}>
                                {item.published ? "Active" : "Hidden"}
                            </span>
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => { setEditingItem(item); setShowModal(true); }}
                                    className="admin-btn admin-btn-secondary text-xs px-3 py-1.5">Edit</button>
                                <button onClick={() => handleDelete(item.id)}
                                    className="admin-btn admin-btn-danger text-xs px-3 py-1.5">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#F5E9D2]">
                                {editingItem ? "Edit Partner" : "Add Partner"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-[#F5E9D2]/40 hover:text-[#F5E9D2] cursor-pointer">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="admin-label">Name *</label>
                                <input name="name" required defaultValue={editingItem?.name} className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Website</label>
                                <input name="website" type="url" defaultValue={editingItem?.website} className="admin-input" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="admin-label">Logo</label>
                                <input name="logo" type="file" accept="image/*" className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Display Order</label>
                                <input name="order" type="number" defaultValue={editingItem?.order || 0} className="admin-input" />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="admin-label mb-0">Status</label>
                                <select name="published" defaultValue={editingItem?.published !== false ? "true" : "false"} className="admin-input w-auto">
                                    <option value="true">Active</option>
                                    <option value="false">Hidden</option>
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
