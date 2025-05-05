import {useNavigate} from "react-router";

type Props = {
  onReset?: () => void;
  highscore?: number;
  score?: number;
  status?: "win" | "lose";
  additionalText?: string;
};

export default function GameOverModal({
  onReset,
  highscore,
  score,
  status,
  additionalText,
}: Props) {
  const navigate = useNavigate();
  const returnHandler = () => {
    navigate(-1);
  };
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
      <div className="fixed flex flex-col items-center justify-center gap-5 p-6 px-16 border-2 border-gray-700 rounded-lg shadow-inner bg-mainBg-200 animate-slideIn">
        <h2 className="text-3xl">
          {status === "win" ? "Victory" : "Game Over"}
        </h2>

        {highscore && score && (
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
        )}

        {additionalText && <p>{additionalText}</p>}

        <div className="flex items-center justify-center gap-12 mt-3">
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
