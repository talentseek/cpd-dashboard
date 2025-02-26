// src/components/ReplaceText.tsx
import React from "react";

/**
* Interface for custom text replacements
* This allows for nested objects with string values
*/
export interface CustomReplacements {
[key: string]: string | number | boolean | CustomReplacements;
}

interface ReplaceTextProps {
text: string;
replacements: CustomReplacements;
}

export const ReplaceText: React.FC<ReplaceTextProps> = ({ text, replacements }) => {
const replaced = text.replace(/{([^}]+)}/g, (_, key): string => {
    const keys = key.split(".");
    let value: unknown = replacements;
    for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
    if (value === undefined) return `{${key}}`;
    }
    return String(value);
});
  return <span>{replaced}</span>;
};