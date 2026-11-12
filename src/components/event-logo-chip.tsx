import Image from "next/image";

export type EventLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  // The event's own brand ground: both marks are white and are shown the way
  // each event shows them.
  ground: string;
  // How much of the chip's height the mark fills. 1 means the artwork is
  // already a full banner and needs no ground or padding of its own.
  fill: number;
};

export function EventLogoChip({ logo, size }: { logo: EventLogo; size: number }) {
  const markHeight = Math.round(size * logo.fill);
  return (
    <span
      className="inline-flex flex-none items-center justify-center"
      style={{ background: logo.ground, height: size, paddingInline: logo.fill >= 1 ? 0 : Math.round(size * 0.3) }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        style={{ height: markHeight, width: Math.round((markHeight * logo.width) / logo.height) }}
      />
    </span>
  );
}
