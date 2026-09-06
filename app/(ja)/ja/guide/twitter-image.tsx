import { createSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "KUSOPARSE、使い方";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage("ja", true, "guide");
}
