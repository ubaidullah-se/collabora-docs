import { Link } from "react-router-dom";
import { goToElement } from "../utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  to?: string;
  scrollToElement?: string;
};

export default function Button({
  onClick,
  label,
  className,
  scrollToElement,
  ...props
}: Props) {
  const styleClasses = `bg-orange-400 hover:bg-orange-700 font-normal text-sm text-white p-2 rounded-lg min-w-[110px] ${className}`;
  if (props.to) {
    return (
      <Link to={props.to} className={styleClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button
      {...props}
      onClick={(e) =>
        scrollToElement ? goToElement(scrollToElement) : onClick?.(e)
      }
      className={styleClasses}
    >
      {label}
    </button>
  );
}
