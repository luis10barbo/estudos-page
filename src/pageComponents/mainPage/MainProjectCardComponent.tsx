import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MainProjectCardComponent: React.FC<{
  href: string;
  title: string;
  description: string[];
  enabled?: boolean;
}> = ({ href, title, description, enabled = true }) => {
  const [isHover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current === null) return;
    const card = cardRef.current;

    function mouseMoveHandler(e: MouseEvent) {
      if (enabled) return;
      setPosition({
        x: e.clientX - card.clientWidth / 2 + 15,
        y: e.clientY - 50,
      });
    }

    card.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      card.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <>
      {!enabled && (
        <div
          className={`hover-container pointer-events-none  absolute z-30 rounded-xl p-[1px] ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
          style={{
            // background:
            //   "conic-gradient(rgb(156 163 175) 0deg,transparent 60deg, rgb(156 163 175) 90deg, rgb(156 163 175) 360deg)",
            top: position.y,
            left: position.x,
          }}
        >
          <div className="rounded-xl border border-gray-400 p-2 backdrop-blur-sm">
            Nao funcionando ainda
          </div>
        </div>
      )}

      <div
        className={`${
          enabled ? "opacity-100" : "cursor-not-allowed opacity-50"
        }`}
        ref={cardRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link
          href={href}
          className={`h-fit w-fit ${!enabled && "pointer-events-none"}`}
        >
          <div
            className={`card-border flex h-[230px] w-[230px] rounded-xl p-[1px] duration-75 ${
              enabled && "hover:shadow-[0_0_5px_2px_white]"
            }`}
            style={{
              background:
                "conic-gradient(rgb(156 163 175) 0deg,transparent 60deg, rgb(156 163 175) 90deg, rgb(156 163 175) 360deg)",
            }}
          >
            <div className="card flex h-full w-full select-none  flex-col gap-2 rounded-xl bg-gray-500 ">
              <p className="text-ellipsis border-b border-gray-400 p-2 text-center font-semibold text-gray-100">
                {title}
              </p>
              <div className="description  p-2">
                {description.map((descriptionText, index) => {
                  return <p key={index}>{descriptionText}</p>;
                })}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MainProjectCardComponent;
