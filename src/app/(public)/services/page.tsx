import ServiceCard from "@/components/customer/ServiceCard";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Services</h1>
      <p className="mt-2 text-gray-600">
        Product ordering is public. Extra services require customer login.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <ServiceCard title="Premium Learning Content" description="Advanced hydroponics learning materials." href="/services/premium" protected />
        <ServiceCard title="Online Courses" description="Structured paid courses for hydroponics." href="/courses" protected />
        <ServiceCard title="Consultation Booking" description="Book hydroponics consultation sessions." href="/consultation-booking" protected />
      </div>
    </main>
  );
}
