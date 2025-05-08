type Props = {handleTouch: (key: "up" | "down" | "left" | "right") => void};

export default function SnakeControls({handleTouch}: Props) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 mt-1">
      <div
        className="col-start-2 col-end-2 row-start-1 row-end-1"
        onClick={() => handleTouch("up")}
      >
        <div className="flex items-center justify-center w-10 h-10 p-2 -rotate-90 border-2 rounded-full border-mainBg-400 hover:border-theme-300">
          <svg
            width={18}
            fill="var(--light-background)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
      </div>
      <div
        className="col-start-1 col-end-1 row-start-2 row-end-2 "
        onClick={() => handleTouch("left")}
      >
        <div className="flex items-center justify-center w-10 h-10 p-2 rotate-180 border-2 rounded-full border-mainBg-400 hover:border-theme-300">
          <svg
            width={18}
            fill="var(--light-background)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
      </div>
      <div
        className="col-start-3 col-end-3 row-start-2 row-end-2"
        onClick={() => handleTouch("right")}
      >
        <div className="flex items-center justify-center w-10 h-10 p-2 border-2 rounded-full border-mainBg-400 hover:border-theme-300">
          <svg
            width={18}
            fill="var(--light-background)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
      </div>
      <div
        className="col-start-2 col-end-2 row-start-3 row-end-3"
        onClick={() => handleTouch("down")}
      >
        <div className="flex items-center justify-center w-10 h-10 p-2 rotate-90 border-2 rounded-full border-mainBg-400 hover:border-theme-300">
          <svg
            width={18}
            fill="var(--light-background)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
