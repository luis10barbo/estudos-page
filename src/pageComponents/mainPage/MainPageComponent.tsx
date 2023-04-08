import Link from "next/link";
import MainProjectCardComponent from "./MainProjectCardComponent";

const MainPageComponent: React.FC = () => {
  return (
    <>
      <main className="flex max-h-screen min-h-screen flex-col  items-center gap-4 bg-gray-600 p-2 text-white">
        <p className="my-4 text-4xl ">Utilidades de estudo</p>
        <div
          id="pages"
          className="grid w-fit grid-cols-3 flex-wrap items-center gap-4"
        >
          {/* {[...Array(5).keys()].map((index) => {
            return (
              <MainProjectCardComponent
                key={index}
                href="/conversorbases"
                title="Conversor Bases"
                description={[
                  "Conversor interativo entre bases:",
                  "\n - Binarias",
                  "\n - Decimais",
                  "\n - Hexadecimais",
                ]}
              />
            );
          })} */}
          <MainProjectCardComponent
            href="/conversorbases"
            title="Conversor Bases"
            description={[
              "Conversor interativo entre bases:",
              "\n - Binarias",
              "\n - Decimais",
              "\n - Hexadecimais",
            ]}
          />
          <MainProjectCardComponent
            href="/compiladorc"
            title="Compilador C"
            description={["Escreva e compile codigo C"]}
            enabled={false}
          />
        </div>
      </main>
    </>
  );
};

export default MainPageComponent;
