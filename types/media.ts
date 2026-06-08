export type MediaAssetStatus = "approved" | "temporary" | "needs-review";

export type MediaAsset = {
  id: string;
  title: string;
  alt: string;
  src: string;
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
  creditRequired: boolean;
  usage: string;
  status: MediaAssetStatus;
  location: string;
  tags: string[];
};
