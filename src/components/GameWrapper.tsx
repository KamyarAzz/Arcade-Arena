import {Link} from "react-router";

type TGameData = {rating?: number; highscore?: number};

type Props = {
  children: string;
  link: string;
  image: string;
  data?: TGameData;
};

export default function GameWrapper({children, link, image, data}: Props) {
  return (
    <Link
      to={link}
      className="group flex flex-col gap-2 bg-mainBg-300 hover:bg-mainBg-200 p-6 md:p-8 rounded-lg w-[235px] md:w-[270px] min-w-[235px] md:min-w-[270px] max-w-[235px] md:max-w-[270px] duration-150 cursor-pointer"
    >
      <img
        className="rounded-md aspect-square group-hover:scale-105 duration-150"
        src={image}
        alt={children}
      />
      <div className="flex justify-between items-center gap-2 mt-4">
        <h4 className="font-bold text-lg">{children}</h4>
        {data && data.rating && (
          <p
            className={`flex items-center tracking-widest${
              (!data || !data.rating) && "!text-gray-600"
            }`}
          >
            {data.rating} <span className="mb-0.5 ml-0.5">⭐</span>
          </p>
        )}
      </div>
      <div className="flex justify-between items-center gap-2 text-gray-500">
        <p className="">Highscore</p>
        <div
          className={`flex items-center tracking-wider ${
            !data || !data.highscore ? "text-gray-600" : "pr-2"
          }`}
        >
          {data && data.highscore ? data.highscore : "N/A"}
        </div>
      </div>
    </Link>
  );
}
