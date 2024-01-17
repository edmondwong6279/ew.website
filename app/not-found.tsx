import Link from "next/link";

export default function NotFound() {
  return (
    <header>
      <h1>Not found!</h1>
      <h3>We can&apos;t find whatever you were looking for.</h3>
      <Link href={"/"}>Home</Link>
    </header>
  );
}
