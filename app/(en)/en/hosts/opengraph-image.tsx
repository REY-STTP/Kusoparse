import { createSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "KUSOPARSE, supported hosts";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage("en", false, "hosts");
}
