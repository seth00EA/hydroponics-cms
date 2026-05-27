import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getHomepageContent } from "@/lib/homepage";

export async function PublicLayout({ children }: { children: React.ReactNode }) {
    const homepage = await getHomepageContent();

    return (
        <>
            <Navbar logoImage={homepage.logoImage} />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    );
}