export const metadata = {
  title: "Terms & Conditions | Likenew",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#662d8f] mb-8">
          Terms & Conditions
        </h1>

        <h2 className="text-2xl font-bold mb-4">
          Service Usage
        </h2>

        <p>
          By using Likenew services, website, app, or smart lockers,
          you agree to these terms.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Orders
        </h2>

        <p>
          Customers are responsible for providing accurate order,
          contact, and delivery information.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Payments
        </h2>

        <p>
          Payments may be made through EVC Plus, eDahab,
          Premier Wallet, Mastercard, Visa, or approved methods.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Smart Lockers
        </h2>

        <p>
          Customers are responsible for collecting items
          within a reasonable period after notification.
        </p>
      </div>
    </main>
  );
}