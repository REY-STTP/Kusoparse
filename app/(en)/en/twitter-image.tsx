import { createSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "KUSOPARSE, Kusonime URL parser";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function EnglishTwitterImage() {
  return createSocialImage("en", true);
}
