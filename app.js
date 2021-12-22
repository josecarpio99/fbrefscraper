let season = '2021-2022';
let playerID = 'e342ad68';

const url = `https://fbref.com/en/players/${playerID}/matchlogs/${season}/`;
const urlSummary = `https://fbref.com/en/players/${playerID}/matchlogs/${season}/summary`;
const urlPassing = `https://fbref.com/en/players/${playerID}/matchlogs/${season}/passing`;

const selector = {
  table: '#matchlogs_all tbody'
};

const tableSummaryColIndexes = {
  date: 0,
  competition: 2,
  opponent: 7,
  minutes: 10,
  goals: 11,
  assists: 12,
  penaltyKicks: 12,
  shots: 14,
  sot: 15,
  touches: 18,
  pressures: 19,
  tackles: 20,
  interceptions: 21,
  blocks: 22,
  sca: 26,
  gca: 27,
  dribbles_success: 34,
  dribbles_att: 35,
}

const playwright = require('playwright');
async function main() {
  const browser = await playwright.chromium.launch({
    headless: false // setting this to true will not run the UI
  });

  const page = await browser.newPage();
  await page.goto(urlSummary);
  const matchsStats = await page.$eval(selector.table, (tableBody, tableSummaryColIndexes) => {
    let data = []
    for (let i = 0, row; row = tableBody.rows[i]; i++) {
      if (row.cells.length < 30) continue;
      data.push({
        date: row.cells[tableSummaryColIndexes.date].innerText,
        competition: row.cells[tableSummaryColIndexes.competition].innerText,
        opponent: row.cells[tableSummaryColIndexes.opponent].innerText,
        minutes: row.cells[tableSummaryColIndexes.minutes].innerText,
        goals: row.cells[tableSummaryColIndexes.goals].innerText,
        assists: row.cells[tableSummaryColIndexes.assists].innerText,
        penaltyKicks: row.cells[tableSummaryColIndexes.penaltyKicks].innerText,
        shots: row.cells[tableSummaryColIndexes.shots].innerText,
        sot: row.cells[tableSummaryColIndexes.sot].innerText,
        touches: row.cells[tableSummaryColIndexes.touches].innerText,
        pressures: row.cells[tableSummaryColIndexes.pressures].innerText,
        tackles: row.cells[tableSummaryColIndexes.tackles].innerText,
        interceptions: row.cells[tableSummaryColIndexes.interceptions].innerText,
        blocks: row.cells[tableSummaryColIndexes.blocks].innerText,
        sca: row.cells[tableSummaryColIndexes.sca].innerText,
        gca: row.cells[tableSummaryColIndexes.gca].innerText,
        dribbles_success: row.cells[tableSummaryColIndexes.dribbles_success].innerText,
        dribbles_att: row.cells[tableSummaryColIndexes.dribbles_att].innerText,
      })
    }
    return data;
  }, tableSummaryColIndexes);
  console.log(matchsStats);
  await browser.close();
}

main();