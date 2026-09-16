import React, { useState } from "react";
import { Box } from "@mui/material";
import HoverDropdown, { DropdownItem } from "../common/HoverDropdown";
import { ChevronDownIcon } from "../icons/icons";

export type LanguageOption = {
  code: string;
  label: string;
};

type LanguageSelectorProps = {
  supportedLanguages: LanguageOption[];
  defaultLanguage?: string;
  onChange: (selected: string) => void;
  /** `bar` in the header pill, `menu` at the foot of the mobile menu. */
  variant?: "bar" | "menu";
};

/*
 * The language pill from the Lumiera header: white, dark type, the language code and a
 * chevron. Padding follows Figma at each width (17/26, 12/20, 10/16).
 *
 * In the bar its hairline comes from the header as `--pill-border` — none over the
 * photograph, the Lumiera border once the header is solid. In the mobile menu it always has
 * the hairline, because there it sits on white. The hairline is an inset shadow rather than
 * a border so it never changes the pill's size.
 */
export default function LanguageSelector({
  supportedLanguages,
  defaultLanguage,
  onChange,
  variant = "bar",
}: LanguageSelectorProps) {
  const [selectedLang, setSelectedLang] = useState(
    defaultLanguage || supportedLanguages[0]?.code,
  );

  const handleSelect = (code: string) => {
    setSelectedLang(code);
    onChange(code);
  };

  const dropdownItems: DropdownItem[] = supportedLanguages.map((lang) => ({
    label: lang.label,
    onClick: () => handleSelect(lang.code),
    active: lang.code === selectedLang,
  }));

  const inMenu = variant === "menu";

  return (
    <HoverDropdown
      placement={inMenu ? "top-start" : "bottom-end"}
      items={dropdownItems}
      trigger={
        <Box
          component="button"
          type="button"
          aria-haspopup="true"
          sx={(theme) => ({
            ...theme.typography.navLink,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            border: 0,
            borderRadius: "999px",
            px: inMenu ? "24px" : { xs: "16px", sm: "20px", md: "26px" },
            py: inMenu ? "14px" : { xs: "10px", sm: "12px", md: "17px" },
            backgroundColor: theme.palette.header.surface,
            color: theme.palette.header.text,
            boxShadow: `inset 0 0 0 1px ${
              inMenu
                ? theme.palette.header.border
                : "var(--pill-border, transparent)"
            }`,
          })}
        >
          {selectedLang?.toUpperCase()}
          <ChevronDownIcon />
        </Box>
      }
    />
  );
}
