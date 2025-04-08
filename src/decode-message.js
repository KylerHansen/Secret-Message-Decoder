import { JSDOM } from "jsdom";
export async function decodeMessage(documentUrl) {
  if (!documentUrl) {
    return undefined;
  }

  const result = await fetch(documentUrl, {
    method: "GET",
  });

  const text = await result.text();

  const jsdom = new JSDOM(text);

  const document = jsdom.window.document.querySelector("tbody").textContent;

  console.log("document", document);

  const data = document
    .replace("x-coordinateCharactery-coordinate", "")
    .split("");

  let cells = [];

  for (let i = 0; i < data.length; i += 3) {
    const xCoordinate = parseInt(data[i]);
    const yCoordinate = parseInt(data[i + 2]);
    const character = data[i + 1];

    if (!isNaN(yCoordinate) && !isNaN(xCoordinate) && character) {
      cells.push({ yCoordinate, xCoordinate, character });
    }
  }

  const maxX = Math.max(...cells.map((cell) => cell.xCoordinate));
  const maxY = Math.max(...cells.map((cell) => cell.yCoordinate));

  let message = Array.from({ length: maxY + 1 }, () =>
    Array(maxX + 1).fill("")
  );

  cells.forEach((cell) => {
    message[cell.yCoordinate][cell.xCoordinate] = cell.character;
  });

  const output = message
    .reverse()
    .map((e) => e.join(""))
    .join("\n");

  console.info(output);

  return output;
}
