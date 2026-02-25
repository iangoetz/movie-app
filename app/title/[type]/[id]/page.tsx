"use client";

import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { TitleDetail } from "@/components/TitleDetail";

export default function TitlePage() {
  const params = useParams();
  const router = useRouter();
  const type = params?.type as string | undefined;
  const id = params?.id as string | undefined;
  const { getTitleById } = useApp();

  if (!type || !id || (type !== "movie" && type !== "tv")) {
    router.replace("/");
    return null;
  }

  const title = getTitleById(id);
  if (!title) {
    router.replace("/");
    return null;
  }

  return <TitleDetail title={title} />;
}
