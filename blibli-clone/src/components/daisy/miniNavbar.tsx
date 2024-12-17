import Link from "next/link";

export default function MiniNavbar() {
  return (
    <div className="flex w-full justify-between text-sm">
      <div className="flex gap-2">
        <Link href={"#"} className="btn-ghost rounded-full px-2">
          Download BliBli APP
        </Link>
        <Link href={"#"} className="btn-ghost rounded-full px-2">
          Bantuan 24/7
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href={"#"} className="btn-ghost rounded-full px-2">
          Sell at blibli
        </Link>
        <Link href={"#"} className="btn-ghost rounded-full px-2">
          BliBli Ticket Rewards
        </Link>
        <Link href={"#"} className="btn-ghost rounded-full px-2">
          Check your Orders
        </Link>
      </div>
    </div>
  );
}
