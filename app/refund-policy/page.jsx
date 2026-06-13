export const metadata = {
  title: "Refund Policy | Likenew",
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#662d8f] mb-8">
          Refund Policy
        </h1>

        <p>
          At Likenew, customer satisfaction is important to us.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Eligible Refunds
        </h2>

        <ul className="list-disc pl-6">
          <li>Service not delivered.</li>
          <li>Incorrect order processing.</li>
          <li>Duplicate payment.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Non-Refundable Situations
        </h2>

        <ul className="list-disc pl-6">
          <li>Customer error in order details.</li>
          <li>Items collected and accepted without complaint.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Contact
        </h2>

        <p>Email: info@likenew.so</p>
        <p>Phone: +252615311877</p>
      </div>
    </main>
  );
}