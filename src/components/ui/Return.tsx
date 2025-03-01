import {useState} from "react";
import {useNavigate} from "react-router";

export default function Return() {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={clickHandler}
      className="group left-2 absolute flex items-center gap-2 py-1 pr-5 pl-4 border-2 border-theme-100 hover:border-theme-300 rounded-full text-gray-400 hover:text-white text-center duration-300"
    >
      <svg
        className="w-3 h-3 group-hover:-translate-x-1 duration-300"
        fill={isHovering ? "#ffffff" : "#9ca3af"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
      Return
    </button>
  );
}
