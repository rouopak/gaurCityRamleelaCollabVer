"use client";

import { useState, useEffect, useTransition } from "react";
import { getMembers, createMember, updateMember, deleteMember } from "@/app/actions/members";
import Image from "next/image";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);

    const loadMembers = async () => {
        const data = await getMembers();
        setMembers(data);
        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => loadMembers(), 0);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        startTransition(async () => {
            if (editingMember) {
                await updateMember(editingMember.id, formData);
            } else {
                await createMember(formData);
            }
            setShowModal(false);
            setEditingMember(null);
            loadMembers();
        });
    };

    const handleDelete = (id) => {
        if (!confirm("Delete this member?")) return;
        startTransition(async () => {
            await deleteMember(id);
            loadMembers();
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F5E9D2]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Members
                    </h1>
                    <p className="text-[#F5E9D2]/50 text-sm mt-1">Manage trust committee members</p>
                </div>
                <button onClick={() => { setEditingMember(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Member
                </button>
            </div>

            <div className="admin-card overflow-hidden">
                {loading ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">Loading...</p>
                ) : members.length === 0 ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">No members yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Order</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.id}>
                                        <td>
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F5E9D2]/10">
                                                {member.photo ? (
                                                    <Image src={member.photo} fill className="object-cover" alt={member.name} />
                                                ) : (
                                                    <span className="w-full h-full flex items-center justify-center text-[#F5E9D2]/30 text-xs">
                                                        {member.name?.[0]}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="font-medium">{member.name}</td>
                                        <td>{member.role}</td>
                                        <td>{member.order}</td>
                                        <td>
                                            <span className={`admin-badge ${member.published ? "admin-badge-green" : "admin-badge-yellow"}`}>
                                                {member.published ? "Active" : "Hidden"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => { setEditingMember(member); setShowModal(true); }}
                                                    className="admin-btn admin-btn-secondary text-xs px-3 py-1.5">Edit</button>
                                                <button onClick={() => handleDelete(member.id)}
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
                                {editingMember ? "Edit Member" : "Add Member"}
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
                                <input name="name" required defaultValue={editingMember?.name} className="admin-input" placeholder="Member name" />
                            </div>
                            <div>
                                <label className="admin-label">Role *</label>
                                <input name="role" required defaultValue={editingMember?.role} className="admin-input" placeholder="e.g. President, Secretary" />
                            </div>
                            <div>
                                <label className="admin-label">Photo</label>
                                <input name="photo" type="file" accept="image/*" className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Display Order</label>
                                <input name="order" type="number" defaultValue={editingMember?.order || 0} className="admin-input" />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="admin-label mb-0">Status</label>
                                <select name="published" defaultValue={editingMember?.published !== false ? "true" : "false"} className="admin-input w-auto">
                                    <option value="true">Active</option>
                                    <option value="false">Hidden</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={isPending} className="admin-btn admin-btn-primary flex-1 justify-center">
                                    {isPending ? "Saving..." : editingMember ? "Update" : "Create"}
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
