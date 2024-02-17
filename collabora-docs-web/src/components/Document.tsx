import { HiDocumentText } from "react-icons/hi";
import { SlOptionsVertical } from "react-icons/sl";

type Props = {
  name: string;
  className?: string;
};

export default function Document({ name, className }: Props) {
  return (
    <div className={`${className} hover:bg-slate-50 px-4 pb-4 pt-2`}>
      <div className="flex justify-between pb-4">
        <HiDocumentText className="text-[70px] text-orange-400" />
        <span className="flex flex-col items-end relative">
          <SlOptionsVertical className="mt-[18px] cursor-pointer peer" />
          <ul className="hidden hover:block absolute peer-hover:block top-[34px] bg-white px-1 w-[100px]">
            <li className="px-1 py-2 text-sm">Edit</li>
            <li className="px-1 py-2 text-red-400 text-sm">Delete</li>
          </ul>
        </span>
      </div>
      <span className="text-[14px] pl-2.5">{name}</span>
    </div>
  );
}
