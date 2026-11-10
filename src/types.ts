export type ContentType = 'photo' | 'video' | 'editing' | 'effect';

export interface PromptItem {
  id: string;
  title: string;
  category: string;
  contentType: ContentType;
  previewImage: string;
  videoUrl?: string; // Optional real playable demo video URL
  fullPrompt: string;
  negativePrompt?: string;
  recommendedTool: string; // e.g., 'Midjourney v6', 'Runway Gen-3', 'CapCut', 'Stable Diffusion XL', 'Kling AI'
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  description: string;
  author: string;
  createdAt: string;
  isTrending: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  sourceUrl?: string;
}

export interface AdSettings {
  enabled: boolean;
  provider: 'Google AdSense / Rewarded' | 'AdMob' | 'Custom Rewarded Ad';
  rewardDurationSeconds: number;
}
