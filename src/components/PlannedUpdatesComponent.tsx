import { PageUpdates } from "~/types/conversorBases/plannedUpdatesTypes";

const PlannedUpdatesComponent: React.FC<{ updates: PageUpdates[] }> = ({
  updates,
}) => {
  return (
    <div
      id="planned-updates"
      className="mt-auto flex w-full flex-col items-center gap-2 bg-[rgb(90,90,90)] p-6 text-white/95"
    >
      <p className="title text-2xl">Atualizações planejadas</p>
      {updates.map((element, index) => {
        const parsedStatus = parseStatus(element.status);
        return (
          <div
            className="flex w-full flex-wrap items-center justify-center border-b p-4"
            key={index}
          >
            <p className=" text-center" key={index}>
              {element.title}
            </p>
            <div className="ml-auto mr-auto"></div>
            <p className="rounded-lg bg-white p-2 text-sm capitalize text-black">
              Status: {parsedStatus.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

function parseStatus(status: PageUpdates["status"]): {
  title: string;
  color: string;
} {
  switch (status) {
    case "onhold":
      return { title: "Em espera", color: "rgb" };
    case "pending":
      return { title: "Em progresso", color: "rgb" };
    case "completed":
      return { title: "Completo", color: "rgb" };
  }
}
export default PlannedUpdatesComponent;
