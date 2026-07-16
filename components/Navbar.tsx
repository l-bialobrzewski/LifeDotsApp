import Link from "next/link";
import { signOutAction } from "@/app/dashboard/actions";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-white/10 pb-4">
      <Link href="/dashboard" className="text-lg font-semibold">
        LifeDots
      </Link>
      <div className="flex items-center gap-4 text-sm text-white/70">
        <Link href="/settings" className="hover:text-white">
          Ustawienia
        </Link>
        <form action={signOutAction}>
          <button type="submit" className="hover:text-white">
            Wyloguj
          </button>
        </form>
      </div>
    </nav>
  );
}
