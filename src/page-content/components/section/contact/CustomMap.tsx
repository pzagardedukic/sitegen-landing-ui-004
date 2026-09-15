import { getCompany, getMap } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getContactTranslation } from "@/core/translations";
import { formatGoogleMapsUrl } from "@/core/utils";
import { Box, Fade, Skeleton } from "@mui/material";
import { useMemo, useState, useEffect } from "react";

type CustomMapProps = {
  fadeRight?: boolean;
};

export default function CustomMap({ fadeRight }: CustomMapProps) {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(true);

  const map = getMap();
  const company = getCompany();
  const contactTranslation = getContactTranslation(lang);

  /*
   * Google wants a lower-case language code. `lang` is upper case in this project ("SL"),
   * and it is null until the language resolves — which put "&hl=null" in the address. So the
   * code is lowered, and the parameter is left off entirely while there is none to send.
   */
  const mapUrl = useMemo(() => {
    const base = formatGoogleMapsUrl(map.url);

    return lang ? `${base}&hl=${lang.toLowerCase()}` : base;
  }, [map.url, lang]);

  // Re-trigger loading each time the URL changes
  useEffect(() => {
    setLoading(true);
  }, [mapUrl]);

  return (
    /* Full-bleed band 400 tall, as drawn — it breaks out of the content container the
       same way the marquee bands do. */
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        height: { xs: 300, sm: 360, md: 420 },
      }}
    >
      {/* Skeleton Loader */}
      <Fade in={loading} unmountOnExit>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </Fade>

      {/* Iframe Map */}
      {/*
       * The frame's name is built from strings the site already has — the translated word
       * for "address" and the company's name — rather than from an invented translation key.
       */}
      <iframe
        title={`${contactTranslation.contactInfo.address.title}: ${company.name}`}
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoading(false)}
      />

      {/* Right fade gradient */}
      {fadeRight && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "20px",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
            background: (theme) =>
              `linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 100%)`,
          }}
        />
      )}
    </Box>
  );
}
