type Props = {
  fullName: string;
  isCurrentUser: boolean;
};

export default function ClientAvatar({ fullName, isCurrentUser }: Props) {
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="flex flex-col items-center">
      <span
        style={{ backgroundColor: generateRandomColor() }}
        className="rounded-full inline-flex items-center justify-center h-[40px] w-[40px] bg-orange-400 text-white text-lg"
      >
        {isCurrentUser ? "ME" : fullName.slice(0, 1).toUpperCase()}
      </span>
      <span className="text-[10px]">
        {isCurrentUser ? `Me(${fullName})` : fullName}
      </span>
    </div>
  );
}
