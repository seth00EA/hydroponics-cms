import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  protected?: boolean;
};

export default function ServiceCard({ title, description, href, protected: isProtected }: ServiceCardProps) {
  return (
    <Link href={href} className="block rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="mb-2 text-xs font-semibold uppercase text-green-700">
        {isProtected ? "Login required" : "Public"}
      </p>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </Link>
  );
}
