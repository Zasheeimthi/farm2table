"use client";

import { Empty } from "@/components/common/Empty.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { useNavigate } from "@/hooks/useNavigate";
export function NotFound() {
  const go = useNavigate();
  return <Page><div className="market-container"><Empty title="This path leads off the farm." text="The page, product, or producer you’re looking for could not be found." action="Back to our farms" onAction={() => go('/farms')} /></div></Page>;
}
