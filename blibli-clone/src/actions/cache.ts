"use server";

import { revalidatePath } from "next/cache";

export async function revalidateByPath(path: string, type: "layout" | "page") {
  revalidatePath(path, type);
}
