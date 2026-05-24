import { AdminHeader } from "@/components/layout/AdminHeader";
import { Container } from "@/components/ui/Container";

type AdminPageShellProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
};

export function AdminPageShell({
    title,
    description,
    children,
}: AdminPageShellProps) {
    return (
        <>
            <AdminHeader title={title} description={description} />
            <div className="flex-1 bg-background py-6 sm:py-8">
                <Container className="space-y-6">{children}</Container>
            </div>
        </>
    );
}

export function AdminPageNotice() {
    return null;
}