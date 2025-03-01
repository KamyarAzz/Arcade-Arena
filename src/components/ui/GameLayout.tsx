import {ReactNode} from "react";
import Return from "./Return";

type Props = {children: ReactNode; title: string};

export default function GameLayout({children, title}: Props) {
  return (
    <div className="w-full h-full">
      <div className="relative flex justify-center items-center w-full">
        <Return />
        <h1 className="font-bold text-3xl">{title}</h1>
      </div>

      <div className="mt-4 p-4">{children}</div>
    </div>
  );
}
