import logo from "@/assets/logo.png";

export default function Header() {
  return (
    <div className="flex items-center gap-2.5 py-4 w-full">
      <img className="w-9" src={logo} alt="logo" />
      <h1 className="text-2xl italic">Arcade Arena</h1>
    </div>
  );
}
