import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });
  return data;
}

export default async function IdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);

  if (!data) {
    return notFound();
  }

  return (
    <div className="w-3xl mx-auto py-8 px-4">
      <Link href="/" className={buttonVariants({ variant: "secondary" })}>
        Back to Posts
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                height={40}
                width={40}
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {data.authorName}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {data.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="relative mt-4 mb-8 w-full h-[400px] overflow-hidden rounded-lg">
          <Image
            src={data.imageUrl}
            alt="Blog post image"
            className="object-cover"
            fill
            priority
          />
        </div>
        <Card>
          <CardContent>
            <p className="text-gray-700">{data.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
