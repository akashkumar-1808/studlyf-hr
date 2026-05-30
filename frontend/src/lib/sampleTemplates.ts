import { TemplateConfig } from "@/store/documentBuilderStore";

export interface TemplateDisplay extends TemplateConfig {
  id: string;
  thumbnailUrl: string;
  category: string;
  isPremium: boolean;
}

export const SAMPLE_TEMPLATES: TemplateDisplay[] = [
  {
    id: "tpl_think_unlimited",
    templateName: "Think Unlimited Style",
    category: "Corporate",
    isPremium: true,
    thumbnailUrl: "/templates/think-unlimited.jpg", // We'll add placeholder styling if image is missing
    layoutType: "think-unlimited",
    borders: { show: false, type: "solid" },
    footerDesign: "geometric_strip",
    typography: {
      headingFont: "Inter, sans-serif",
      bodyFont: "Inter, sans-serif",
      lineSpacing: "1.5"
    },
    spacing: "comfortable",
    headerStyle: "split",
    titleStyle: "centered",
    signaturePlacement: "bottom-right",
    dividerType: "thin"
  },
  {
    id: "tpl_minimal_corporate",
    templateName: "Minimal Corporate Style",
    category: "Minimal",
    isPremium: false,
    thumbnailUrl: "/templates/minimal-corporate.jpg",
    layoutType: "minimal-corporate",
    borders: { show: false, type: "solid" },
    footerDesign: "none",
    cornerAccents: true,
    typography: {
      headingFont: '"Times New Roman", serif',
      bodyFont: '"Times New Roman", serif',
      lineSpacing: "1.25"
    },
    spacing: "compact",
    headerStyle: "centered",
    titleStyle: "strong-centered",
    signaturePlacement: "centered",
    dividerType: "horizontal"
  },
  {
    id: "tpl_classic_offer",
    templateName: "Classic Offer Letter",
    category: "Offer Letter",
    isPremium: false,
    thumbnailUrl: "/templates/classic.jpg",
    layoutType: "classic",
    borders: { show: true, type: "solid" },
    footerDesign: "simple",
    typography: {
      headingFont: "Arial, sans-serif",
      bodyFont: "Arial, sans-serif",
      lineSpacing: "1.5"
    },
    spacing: "comfortable",
    headerStyle: "left",
    titleStyle: "left",
    signaturePlacement: "bottom-left",
    dividerType: "none"
  }
];
