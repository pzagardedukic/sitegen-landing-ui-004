"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import ArrowButton from "@/components/button/ArrowButton";
import { getContacts, useLanguage } from "@/core/runtime";
import { getButtonTranslation, getFormTranslation } from "@/core/translations";
import { getPublicApiEndpoint } from "@/core/utils";
import FormDisclaimer from "../common/FormDisclaimer";

type ContactFormProps = {
  subject?: string;
};

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData = (subject?: string): ContactFormData => ({
  name: "",
  email: "",
  subject: subject ?? "",
  message: "",
});

/*
 * The fields the Lumiera frames draw: white, rounded 8 on the hairline, 56 tall with 20 of
 * padding, and no label above them — the placeholder carries the name, so each field keeps
 * its label as an aria-label instead.
 */
const fieldSx = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    ...theme.typography.body1,
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    "& fieldset": { borderColor: theme.palette.surfaces.border },
    "&:hover fieldset": { borderColor: theme.palette.text.primary },
    "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
  },
  "& .MuiOutlinedInput-input": {
    px: "20px",
    py: 0,
    height: 56,
    boxSizing: "border-box",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  "& .MuiInputBase-multiline": { p: 0 },
  "& .MuiInputBase-inputMultiline": { px: "20px", py: "16px", height: "auto" },
});

export default function ContactForm({ subject }: ContactFormProps) {
  const { lang } = useLanguage();
  const formTranslations = getFormTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  const [formData, setFormData] = useState<ContactFormData>(() =>
    initialFormData(subject),
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [dialogType, setDialogType] = useState<"success" | "error" | null>(
    null,
  );

  const contactEmail = getContacts().find((c) => c.type === "EMAIL")?.value;
  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    formData.subject,
  )}&body=${encodeURIComponent(formData.message)}`;

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormData((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setSubmitError("");
    };

  const validateForm = () => {
    const nextErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = formTranslations.name.errorMessage;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      nextErrors.email = formTranslations.email.errorMessage;
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = formTranslations.subject.errorMessage;
    }

    if (!formData.message.trim()) {
      nextErrors.message = formTranslations.message.errorMessage;
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(getPublicApiEndpoint("contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          locale: lang,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send contact message.");
      }

      setFormData(initialFormData(subject));
      setErrors({});
      setDialogType("success");
    } catch {
      if (contactEmail) {
        setDialogType("error");
      } else {
        setSubmitError(formTranslations.sendError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData((current) => ({ ...current, subject: subject ?? "" }));
  }, [subject]);

  return (
    <>
      {/*
        The form is the cream panel from the Lumiera frames: rounded 24, 48 / 36 / 24 of
        padding and 16 between its parts — name and e-mail on one row, then subject, then the
        message — with the disclaimer and the send button closing it.
      */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          p: { xs: "24px", sm: "36px", md: "48px" },
          borderRadius: "24px",
          backgroundColor: theme.palette.surfaces.bgAlt,
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "16px",
          }}
        >
          <TextField
            fullWidth
            required
            name="name"
            value={formData.name}
            placeholder={formTranslations.name.placeholder}
            error={Boolean(errors.name)}
            helperText={errors.name}
            disabled={isSubmitting}
            onChange={handleChange("name")}
            slotProps={{
              htmlInput: { "aria-label": formTranslations.name.label },
            }}
            sx={fieldSx}
          />

          <TextField
            fullWidth
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder={formTranslations.email.placeholder}
            error={Boolean(errors.email)}
            helperText={errors.email}
            disabled={isSubmitting}
            onChange={handleChange("email")}
            slotProps={{
              htmlInput: { "aria-label": formTranslations.email.label },
            }}
            sx={fieldSx}
          />
        </Box>

        <TextField
          fullWidth
          required
          name="subject"
          value={formData.subject}
          placeholder={formTranslations.subject.placeholder}
          error={Boolean(errors.subject)}
          helperText={errors.subject}
          disabled={isSubmitting}
          onChange={handleChange("subject")}
          slotProps={{
            htmlInput: { "aria-label": formTranslations.subject.label },
          }}
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          multiline
          rows={5}
          name="message"
          value={formData.message}
          placeholder={formTranslations.message.placeholder}
          error={Boolean(errors.message)}
          helperText={errors.message}
          disabled={isSubmitting}
          onChange={handleChange("message")}
          slotProps={{
            htmlInput: { "aria-label": formTranslations.message.label },
          }}
          sx={fieldSx}
        />

        {submitError && <Typography color="error">{submitError}</Typography>}

        <FormDisclaimer isHighContrast={false} />

        <Box
          sx={{
            position: "relative",
            alignSelf: { xs: "stretch", sm: "flex-start" },
            display: "flex",
            pointerEvents: isSubmitting ? "none" : "auto",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          <ArrowButton type="submit" sx={{ width: { xs: "100%", sm: "auto" } }}>
            {buttonTranslation.sendMessage}
          </ArrowButton>

          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                mt: "-12px",
                ml: "-12px",
              }}
            />
          )}
        </Box>
      </Box>

      <Dialog
        open={dialogType !== null}
        onClose={() => setDialogType(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {dialogType === "success"
            ? formTranslations.success.title
            : formTranslations.sendError}
        </DialogTitle>

        <DialogContent>
          {dialogType === "success" ? (
            <Typography>{formTranslations.success.message}</Typography>
          ) : (
            <Typography>
              {formTranslations.contactMessage}{" "}
              <Box
                component="a"
                href={mailtoHref}
                sx={{ color: "inherit", fontWeight: 600 }}
              >
                {contactEmail}
              </Box>
              .
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogType(null)}>
            {formTranslations.success.close}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
