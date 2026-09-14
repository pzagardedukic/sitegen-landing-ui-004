"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { PlayIcon } from "@/components/icons/icons";
import { getVideoThumbnail } from "@/core/utils";

/*
 * A video tile from the Lumiera frames: the still rounded 16 under the overlay colour,
 * 330 / 188 / 191 tall, with the white play button 72 across in the middle. The whole tile
 * opens the video, and its address is the link's accessible name — the frames mark the URL
 * on the tile, but every demo video is a YouTube link, so printing the host four times over
 * would say nothing.
 */
export default function VideoThumbnail({ videoUrl }: { videoUrl: string }) {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const thumbnail = await getVideoThumbnail(videoUrl);
      if (mounted) setThumb(thumbnail);
    })();

    return () => {
      mounted = false;
    };
  }, [videoUrl]);

  return (
    <Box
      component="a"
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={videoUrl}
      sx={(theme) => ({
        position: "relative",
        display: "block",
        height: { xs: 191, sm: 188, md: 330 },
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: theme.palette.surfaces.placeholder,
        "&:hover .play, &:focus-visible .play": {
          transform: "translate(-50%, -50%) scale(1.08)",
        },
        "&:hover img, &:focus-visible img": { transform: "scale(1.04)" },
      })}
    >
      {thumb && (
        <Box
          component="img"
          src={thumb}
          alt=""
          loading="lazy"
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: theme.transitions.create("transform"),
          })}
        />
      )}

      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          backgroundColor: theme.palette.surfaces.scrim,
        })}
      />

      <Box
        className="play"
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: theme.palette.surfaces.onImage,
          color: theme.palette.text.primary,
          display: "grid",
          placeItems: "center",
          // The triangle sits on its own centre of mass, which is left of the circle's.
          pl: "5px",
          transition: theme.transitions.create("transform"),
        })}
      >
        <PlayIcon />
      </Box>
    </Box>
  );
}
