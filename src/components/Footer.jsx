export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">airtime.ng</h3>
          <p className="text-sm">
            Effortless Airtime Management — trusted for secure and seamless airtime conversions and distribution.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Products</h4>
          <ul className="space-y-1 text-sm">
            <li>Airtime to Cash</li>
            <li>Buy Bulk Airtime</li>
            <li>Airtime Triggers</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>About</li>
            <li>Blog</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>support@airtime.ng.com</li>
            <li>(+234) 814 900 4610</li>
            <li>No 1 Awosika Avenue, Bodija, Ibadan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © 2025 Airtime.NG Technology Ltd · RC1513451
      </div>
    </footer>
  );
}
