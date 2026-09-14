"use client";

import { Box } from "@mui/material";
import { getBlogItems } from "@/core/runtime";
import { getBlogSlugById, getPageSlugByKeyWithBasePath } from "@/core/static";
import BlogPreviewCard from "./BlogPreviewCard";

type BlogItem = ReturnType<typeof getBlogItems>[number];

/*
 * Posts three abreast on desktop, two on tablet and one on a phone — 24 apart across and
 * 40 down, each post only as tall as its own excerpt.
 */
export default function BlogGrid({ items }: { items: BlogItem[] }) {
  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        columnGap: "24px",
        rowGap: "40px",
        alignItems: "start",
      }}
    >
      {items.map((item) => (
        <BlogPreviewCard
          key={item.id}
          image={item.image}
          title={item.title}
          text={item.description}
          author={item.author}
          date={item.date}
          href={`${getPageSlugByKeyWithBasePath("blog")}/${getBlogSlugById(item.id)}`}
        />
      ))}
    </Box>
  );
}
