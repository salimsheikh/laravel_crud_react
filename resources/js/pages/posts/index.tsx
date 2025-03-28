import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Pagination from "@/components/Pagination";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

type Post = {
    id: number;
    title: string;
    content: string;
};

type PageProps = {
    posts: Post[];
};

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPosts {
    data: Post[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

type Props = {
    posts: PaginatedPosts;
};
export default function Index({ posts }: Props) {


    const destroyPost = (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        // You can now safely handle deletion logic here
        console.log("Delete post with ID:", id);
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route('posts.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className='flex justify-end gap-4 p-4'>
                <Link href={route('posts.create')} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Create Post</Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Content</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.map((post: Post) => (
                            <tr
                                key={post.id}
                                className="bg-white"
                            >
                                <td className="px-4 py-2">{post.id}</td>
                                <td className="px-4 py-2">{post.title}</td>
                                <td className="px-4 py-2">{post.content}</td>
                                <td className="px-4 py-2 text-center">
                                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => destroyPost(e, post.id)} className="flex gap-2">
                                        <Link href={route('posts.edit', post.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</Link>
                                        <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination pagination={posts} />





            </div>
        </AppLayout>
    );
}
