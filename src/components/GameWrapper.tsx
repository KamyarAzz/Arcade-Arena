import {Link} from "react-router";

type Props = {children: string; link: string; image: string};

export default function GameWrapper({children, link, image}: Props) {
  return (
    <Link
      to={link}
      className="flex flex-col gap-2 bg-mainBg-300 hover:bg-mainBg-200 p-6 md:p-8 rounded-lg w-[235px] md:w-[270px] min-w-[235px] md:min-w-[270px] max-w-[235px] md:max-w-[270px] duration-200 cursor-pointer"
    >
      <img className="rounded-md aspect-square" src={image} alt={children} />
      <div className="flex justify-between items-center gap-2 mt-4">
        <h4 className="font-bold text-lg">{children}</h4>
        <div className="flex items-center tracking-widest">
          4/5 <span className="mb-0.5 ml-0.5">⭐</span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 text-gray-500">
        <p className="">Highscore</p>
        <div className="flex items-center pr-2 tracking-wider">1200</div>
      </div>
    </Link>
  );
}
