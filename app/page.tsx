import { prisma } from "./utils/db";
import { BlogpostCart } from "@/components/general/BlogpostCart";
import { Suspense } from "react";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
  });

  return data;
}
export default function Home() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest posts</h1>
      {/* Suspense boundry don't work in an async component. Because you will pause anyway and wait in async. So, no point of suspense */}
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogpostCart key={item.id} data={item} />
      ))}
    </div>
  );
}
