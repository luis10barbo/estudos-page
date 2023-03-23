import { NextPage } from "next";

const BaseConverter: NextPage = () => {
function addToDecimal(addition:number) {
    return 0
}

function handleInput() {}

    return <main>
        <h2 style={{textAlign: "center"}}>
      VISUALISADOR INTERATIVO <br />
      DECIMAL - BINARIO <br />
    </h2>

    <span id="error-message"></span>
    <div id="convertion-holder">
      Digite um numero POSITIVO para converter para binario:
      <div id="decimal-holder">
        <button className="binary-number" onClick={() => {addToDecimal(-1)}}>-</button>
        <input
          id="decimal-string"
          type="number"
          style={{width: "7rem"}}
          onInput={() => handleInput()}
        />
        <button className="binary-number" onClick={() => {addToDecimal(1)}}>+</button>
      </div>
      <div id="binary-holder">
        Conversao:
        <div id="binary-squares"></div>
      </div>
    </div>

    <div id="planned-updates">
      <p className="title">Atualizacoes planejadas</p>
      <p>1 - Adicionar conversor para hexadecimal</p>
      <p>2 - Adicionar binarios negativos</p>
    </div>

    <div id="explanation">
      Explicaçao: <br />
      Cada quadradinho no binario, <br />
      diferente do decimal que pode conter algarismos entre 0 - 9,<br />
      so pode conter dois numeros, 0 ou 1

      <div className="binary-squares">
        ex:
        <div className="binary-number">1</div>
        (decimal) é equivalente a
        <div className="binary-number">1</div>
        (binario), <br />
      </div>

      <div className="binary-squares">
        mas
        <div className="binary-number">2</div>
        (decimal) é equivalente a
        <div className="binary-number">1</div>
        <div className="binary-number">0</div>
        (binario), <br />
      </div>
      <div className="binary-squares">
        foi necessario adicionar +1 quadradinho para comportar o numero 2
      </div>
    </div>
    </main>
}

export default BaseConverter;