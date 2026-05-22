import type { SocialLink } from "@/types";
import { cn } from "@/lib/cn";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.47 8.652V24l4.089-2.242c1.09.3 2.246.464 3.441.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963-3.055-3.26-5.963 3.26L10.732 8.1l3.13 3.26 5.889-3.26-6.56 6.863z" />
    </svg>
  );
}

const iconMap = {
  facebook: FacebookIcon,
  messenger: MessengerIcon,
};

const styleMap = {
  facebook: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
  messenger: "bg-[#0084FF] hover:bg-[#0076e4] text-white",
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      {links.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-colors sm:w-auto",
                styleMap[link.platform],
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
