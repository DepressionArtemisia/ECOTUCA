"use client";

import { Maximize2 } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";

export function FullscreenButton() {
  async function enterFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    }
  }

  return (
    <EcoButton variant="outline" onClick={enterFullscreen}>
      <Maximize2 size={16} />
      Modo tela cheia
    </EcoButton>
  );
}
