import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { get } from "http";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogpostCart } from "@/components/general/BlogpostCart";

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export default async function Dashboard() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const data = user && (await getData(user.id));

  // only authenticated users can access this page
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href="/dashboard/create">
          Create post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item) => (
          <BlogpostCart key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
