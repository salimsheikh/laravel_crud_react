import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Textarea } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/posts',
    }, {
        title: 'Post Create',
        href: '/posts',
    },
];

export default function PostCreate() {
    const { data, setData, errors, post } = useForm({
        title: '',
        content: '',
    });

    const submit: FormEventHandler = (e: FormEvent<Element>) => {
        e.preventDefault();

        post(route('posts.store'));

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className='flex justify-end gap-4 p-4'>
                <Link href={route('posts.index')} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Back to List</Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <form onSubmit={submit} className="space-y-6">


                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title" name="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}

                            autoComplete="title"
                            placeholder="Post Title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>


                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>

                        <Textarea
                            id="content" name="content"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-15 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            autoComplete="content"
                            placeholder="Post content"
                        ></Textarea>

                        <InputError className="mt-2" message={errors.content} />
                    </div>

                    <div className='flex justify-end gap-4 p-4'>
                        <Button>Save</Button>
                    </div>


                </form>
            </div>

        </AppLayout>
    );
}
