import Image from "next/image";

/**
 * Generic content card that consishas an image,
 */
export function ContentCard({
  title,
  subtitle,
  content,
  mediaUrl
}: {
  title: string;
  subtitle?: string;
  content?: string;
  mediaUrl?: string;
}) {
  return (
    <div>
      {title}
      {subtitle}
      {content}
      {mediaUrl && <Image src={mediaUrl} fill alt=""></Image>}
    </div>
  );
}
