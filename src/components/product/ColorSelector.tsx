"use client";

import clsx from "clsx";

interface ColorVariant {
  colorName: string;
  colorCode: string;
  images: string[];
}

interface Props {
  colors: ColorVariant[];
  selectedColor: ColorVariant;
  onSelectColor: (color: ColorVariant) => void;
}

export default function ColorSelector({ colors, selectedColor, onSelectColor }: Props) {
  return (
    <div className="flex items-center gap-2 mt-3">
      {colors.map((c) => (
        <button
          key={c.colorName}
          onClick={() => onSelectColor(c)}
          className={clsx(
            "w-5 h-5 rounded-full border shadow-sm ring-offset-2 transition-all",
            selectedColor.colorCode === c.colorCode
              ? "ring-2 ring-primary scale-110"
              : "hover:ring-2 hover:ring-gray-300"
          )}
          style={{ backgroundColor: c.colorCode }}
          title={c.colorName}
        />
      ))}
    </div>
  );
}
