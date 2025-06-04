"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("url") as string;

  if (!user) {
    throw new Error("You must be logged in to create a blog post.");
  }

  await prisma.blogPost.create({
    data: {
      title: title,
      content: content,
      imageUrl: imageUrl,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return redirect("/dashboard");
}
