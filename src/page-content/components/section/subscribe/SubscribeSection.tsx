"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { useLanguage } from "@/core/runtime";
import {
  getFormTranslation,
  getSubscriptionsTranslation,
} from "@/core/translations";
import { callPublicApi } from "@/core/utils";
import { primaryLanguage } from "@/core/static";
import FormDisclaimer from "../common/FormDisclaimer";

type SubmitStatus = "success" | "error" | null;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/*
 * The newsletter band from the Lumiera frames: the banner photograph edge to edge under the
 * overlay colour, 520 / 373 / 437 tall, everything centred in a column 720 / 620 / 318 wide,
 * 26 apart — the title (h2 size), the form, then the disclaimer in white.
 *
 * The form is one white pill 64 tall on tablet and desktop: the field sits in it at the left
 * and the primary button inside its right end, both rounded full rather than the theme's 8.
 * On a phone the two stack, each the full width, the field keeping the hairline the frame
 * draws around it. Whatever comes back from the server is said on one line under the form.
 */
export default function SubscribeSection() {
  const bannerImage = useBannerImage();

  const { lang } = useLanguage();
  const subscriptionsTranslation = getSubscriptionsTranslation(lang);
  const formTranslations = getFormTranslation(lang);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail) || !normalizedEmail) {
      setEmailError(formTranslations.email.errorMessage);
      return;
    }

    setEmailError(null);
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      await callPublicApi("newsletter", {
        body: {
          email: normalizedEmail,
          locale:
            lang?.toLocaleLowerCase() ?? primaryLanguage.toLocaleLowerCase(),
        },
      });

      setEmail("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!submitStatus) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [submitStatus]);

  const message =
    emailError ??
    (submitStatus === "success"
      ? subscriptionsTranslation.successMessage
      : submitStatus === "error"
        ? subscriptionsTranslation.errorMessage
        : "");

  return (
    <Box
      component="section"
      sx={(theme) => ({
        position: "relative",
        minHeight: { xs: 437, sm: 373, md: 520 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: theme.palette.surfaces.placeholder,
        backgroundImage: `url("${bannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: theme.palette.surfaces.onImage,
      })}
    >
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          backgroundColor: theme.palette.surfaces.scrim,
        })}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { xs: "100%", sm: 692, md: 720 },
          px: { xs: "36px", sm: "36px", md: 0 },
          py: { xs: "48px", md: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "26px",
        }}
      >
        <Typography variant="h2" component="h2" sx={{ color: "inherit" }}>
          {subscriptionsTranslation.title}
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={(theme) => ({
              width: "100%",
              display: "flex",
              /*
               * The direction belongs in the breakpoint block below, not in a responsive
               * object: both write the same `min-width:600px` media query and the later one
               * wins the whole block, so a `{ sm: "row" }` here was dropped and the button
               * fell out of the pill.
               */
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              [theme.breakpoints.up("sm")]: {
                flexDirection: "row",
                height: 64,
                pl: "26px",
                pr: "6px",
                py: "6px",
                borderRadius: "999px",
                backgroundColor: theme.palette.background.paper,
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: "100%",
                display: "flex",
                alignItems: "center",
                px: "22px",
                py: "18px",
                borderRadius: "999px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
                [theme.breakpoints.up("sm")]: {
                  flex: 1,
                  // Back to auto: the phone's full width would keep the whole row to itself
                  // and push the button out of the pill.
                  width: "auto",
                  minWidth: 0,
                  px: 0,
                  py: 0,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              })}
            >
              <InputBase
                fullWidth
                type="email"
                value={email}
                placeholder={formTranslations.email.placeholder}
                disabled={isSubmitting}
                inputProps={{
                  "aria-label": formTranslations.email.placeholder,
                }}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError(null);
                  setSubmitStatus(null);
                }}
                sx={(theme) => ({
                  ...theme.typography.body1,
                  color: theme.palette.text.primary,
                  "& input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                })}
              />
            </Box>

            <ArrowButton
              type="submit"
              disabled={isSubmitting}
              sx={{
                flexShrink: 0,
                borderRadius: "999px",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {subscriptionsTranslation.callToAction}
            </ArrowButton>
          </Box>

          {message && (
            <Typography
              role="status"
              aria-live="polite"
              variant="caption"
              sx={{ color: "inherit" }}
            >
              {message}
            </Typography>
          )}
        </Box>

        <FormDisclaimer isHighContrast />
      </Box>
    </Box>
  );
}
