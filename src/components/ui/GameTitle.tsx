import Return from "./Return";

type Props = {title: string};

export default function GameTitle({title}: Props) {
  return (
    <div className="relative flex items-center justify-center w-full">
      <Return />
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}
