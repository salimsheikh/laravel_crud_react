"use client";
import React from "react";
import { router } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    links: PaginationLink[];
}

const Pagination: React.FC<{ pagination: PaginationProps }> = ({ pagination }) => {


    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-3">
            <div className="text-gray-600 text-sm md:text-base">
                Showing {pagination.from} to {pagination.to} of {pagination.total} results — Page {pagination.current_page} of {pagination.last_page}
            </div>

            {/* Full pagination on desktop */}
            {pagination.links.length > 0 && (
                <div className="hidden md:flex flex-wrap gap-2 justify-end mt-2">
                    {pagination.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => link.url && router.visit(link.url)}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 border rounded cursor-pointer transition text-sm md:text-base
                ${link.active ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}
                ${!link.url ? "opacity-50 cursor-not-allowed" : ""}
              `}
                        />
                    ))}
                </div>
            )}

            {/* Previous & Next on small screens */}
            <div className="flex md:hidden justify-between mt-2">
                {pagination.links.find((link) => link.label.toLowerCase().includes("previous")) && (
                    <button
                        onClick={() => {
                            const prevLink = pagination.links.find((link) =>
                                link.label.toLowerCase().includes("previous")
                            );
                            if (prevLink?.url) router.visit(prevLink.url);
                        }}
                        disabled={!pagination.links.find((link) => link.label.toLowerCase().includes("previous"))?.url}
                        className="px-4 py-1 border rounded cursor-pointer transition text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                )}

                {pagination.links.find((link) => link.label.toLowerCase().includes("next")) && (
                    <button
                        onClick={() => {
                            const nextLink = pagination.links.find((link) =>
                                link.label.toLowerCase().includes("next")
                            );
                            if (nextLink?.url) router.visit(nextLink.url);
                        }}
                        disabled={!pagination.links.find((link) => link.label.toLowerCase().includes("next"))?.url}
                        className="px-4 py-1 border rounded cursor-pointer transition text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;
