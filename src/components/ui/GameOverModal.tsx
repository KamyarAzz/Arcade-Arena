import {useNavigate} from "react-router";

type Props = {onReset?: () => void; highscore: number; score: number};

export default function GameOverModal({onReset, highscore, score}: Props) {
  const navigate = useNavigate();
  const returnHandler = () => {
    navigate(-1);
  };
  return (
    <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500 !bg-opacity-50 w-full h-full">
      <div className="fixed flex flex-col justify-center items-center gap-5 bg-mainBg-200 shadow-inner p-6 px-16 border-2 border-gray-700 rounded-lg">
        <h2 className="text-3xl">Game Over</h2>

        <div className="flex flex-col items-start gap-2">
          <p>
            Highscore: {highscore}{" "}
            {highscore > score && <span className="mb-1">👑</span>}
          </p>
          <p>
            Current Score: {score}{" "}
            {highscore <= score && <span className="mb-1">👑</span>}
          </p>
        </div>

        <div className="flex justify-center items-center gap-12 mt-3">
          {onReset && (
            <button
              onClick={onReset}
              className="px-5 py-1.5 border-2 border-theme-300 hover:border-theme-100 rounded-full duration-150"
            >
              Reset
            </button>
          )}
          <button
            className="px-5 py-1.5 border-2 border-theme-300 hover:border-theme-100 rounded-full duration-150"
            onClick={returnHandler}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
}
