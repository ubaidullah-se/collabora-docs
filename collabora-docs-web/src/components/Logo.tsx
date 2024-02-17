import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <Link className={`text-4xl ${className}`} to="/">
      <img width="180" src="/images/logo.png" />
    </Link>
  );
}
