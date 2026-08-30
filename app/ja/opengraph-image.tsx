import { createSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "KUSOPARSE、Kusonime URL解析ツール";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function JapaneseOpenGraphImage() {
  return createSocialImage("ja");
}
