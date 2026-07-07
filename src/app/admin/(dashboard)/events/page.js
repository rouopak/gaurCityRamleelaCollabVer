"use client";

import { useState, useEffect, useTransition } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/app/actions/events";
import Image from "next/image";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);

    const loadEvents = async () => {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
    };

    useEffect(() => { loadEvents(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        startTransition(async () => {
            if (editingEvent) {
                await updateEvent(editingEvent.id, formData);
            } else {
                await createEvent(formData);
            }
            setShowModal(false);
            setEditingEvent(null);
            loadEvents();
        });
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        startTransition(async () => {
            await deleteEvent(id);
            loadEvents();
        });
    };

    const openEdit = (event) => {
        setEditingEvent(event);
        setShowModal(true);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F5E9D2]"
                        style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Events
                    </h1>
                    <p className="text-[#F5E9D2]/50 text-sm mt-1">
                        Manage past RamLeela events
                    </p>
                </div>
                <button
                    onClick={() => { setEditingEvent(null); setShowModal(true); }}
                    className="admin-btn admin-btn-primary"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Event
                </button>
            </div>

            {/* Events Table */}
            <div className="admin-card overflow-hidden">
                {loading ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">Loading events...</p>
                ) : events.length === 0 ? (
                    <p className="text-[#F5E9D2]/40 text-sm py-12 text-center">No events yet. Add your first event!</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Images</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event.id}>
                                        <td className="font-medium">{event.title}</td>
                                        <td>{event.year}</td>
                                        <td>
                                            <div className="flex -space-x-2">
                                                {event.images?.slice(0, 3).map((img, i) => (
                                                    <div key={i} className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-[#1a0a00]">
                                                        <Image src={img} fill className="object-cover" alt="" />
                                                    </div>
                                                ))}
                                                {event.images?.length > 3 && (
                                                    <span className="w-8 h-8 rounded-lg bg-[#F5E9D2]/10 flex items-center justify-center text-[10px] text-[#F5E9D2]/50 border-2 border-[#1a0a00]">
                                                        +{event.images.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`admin-badge ${event.published ? "admin-badge-green" : "admin-badge-yellow"}`}>
                                                {event.published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => openEdit(event)}
                                                    className="admin-btn admin-btn-secondary text-xs px-3 py-1.5">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(event.id)}
                                                    className="admin-btn admin-btn-danger text-xs px-3 py-1.5">
                                                    Delete
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

            {/* Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#F5E9D2]">
                                {editingEvent ? "Edit Event" : "Add New Event"}
                            </h2>
                            <button onClick={() => setShowModal(false)}
                                className="text-[#F5E9D2]/40 hover:text-[#F5E9D2] transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="admin-label">Title *</label>
                                <input name="title" required defaultValue={editingEvent?.title}
                                    className="admin-input" placeholder="Event title" />
                            </div>
                            <div>
                                <label className="admin-label">Year *</label>
                                <input name="year" type="number" required defaultValue={editingEvent?.year || new Date().getFullYear()}
                                    className="admin-input" placeholder="2024" />
                            </div>
                            <div>
                                <label className="admin-label">Description</label>
                                <textarea name="description" defaultValue={editingEvent?.description}
                                    className="admin-input admin-textarea" placeholder="Event description..." />
                            </div>
                            <div>
                                <label className="admin-label">
                                    {editingEvent ? "Add More Images" : "Images"}
                                </label>
                                <input name={editingEvent ? "newImages" : "images"} type="file" accept="image/*" multiple
                                    className="admin-input" />
                                {editingEvent?.images?.length > 0 && (
                                    <input type="hidden" name="existingImages" value={JSON.stringify(editingEvent.images)} />
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="admin-label mb-0">Published</label>
                                <select name="published" defaultValue={editingEvent?.published ? "true" : "false"}
                                    className="admin-input w-auto">
                                    <option value="true">Published</option>
                                    <option value="false">Draft</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={isPending}
                                    className="admin-btn admin-btn-primary flex-1 justify-center">
                                    {isPending ? "Saving..." : editingEvent ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="admin-btn admin-btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
