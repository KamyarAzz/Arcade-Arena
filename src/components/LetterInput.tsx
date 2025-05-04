type Props = {
  disabled: boolean;
  value: string;
  handleChange: (charIndex: number, newChar: string) => void;
  index: number;
  statusList: string | null;
};

export default function LetterInput({
  handleChange,
  disabled,
  value,
  index,
  statusList,
}: Props) {
  return (
    <input
      value={value[index]}
      onChange={(e) => handleChange(index, e.target.value)}
      disabled={disabled}
      maxLength={1}
      minLength={1}
      type="text"
      className={`${
        statusList === "green"
          ? "!bg-green-600 !border-green-600"
          : statusList === "yellow"
          ? "bg-yellow-500 !border-yellow-500"
          : statusList === "gray" && "bg-gray-600 !border-gray-600"
      } bg-transparent uppercase p-2 border-2 border-white disabled:border-gray-500 focus:border-theme-300 rounded-lg focus:outline-none w-11 h-11 text-center`}
    />
  );
}
