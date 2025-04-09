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

  const rows = Array.from(jsdom.window.document.querySelectorAll("tr")).slice(
    1
  );

  let cells = [];

  rows.map((row) => {
    const rowValues = Array.from(row.querySelectorAll("td"));
    const xCoordinate = getDataValue(rowValues[0]);
    const yCoordinate = getDataValue(rowValues[2]);
    const character = rowValues[1].textContent;

    cells.push({ yCoordinate, xCoordinate, character });
  });

  const maxX = Math.max(...cells.map((cell) => cell.xCoordinate));
  const maxY = Math.max(...cells.map((cell) => cell.yCoordinate));

  const message = Array.from({ length: maxY + 1 }, () =>
    Array(maxX + 1).fill(" ")
  );

  cells.forEach((cell) => {
    message[cell.yCoordinate][cell.xCoordinate] = cell.character;
  });

  const output = message
    .reverse()
    .map((e) => e.join(""))
    .join("\n");

  console.info(output);

  return output.trim();
}

function getDataValue(tableData) {
  const result = parseInt(tableData.textContent);

  if (result == undefined || isNaN(result))
    throw new Error("Could not parse table cell value");

  return result;
}
