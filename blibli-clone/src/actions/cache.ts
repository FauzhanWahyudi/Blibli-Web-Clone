"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateByPath(path: string, type: "layout" | "page") {
  revalidatePath(path, type);
}

export async function revalidateByTag(tag: string) {
  revalidateTag(tag);
}
