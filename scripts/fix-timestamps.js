const { Database } = require("sqlite3");
const path = require("path");

const parseDate = require("date-fns/parse");
const isValidDate = require("date-fns/isValid");
const format = require("date-fns/formatISO9075");

const db = new Database(path.join(process.cwd(), "db.sqlite"));

function isValidTimestamp(timestamp) {
  const parsedDate = parseDate(timestamp, "yyyy-MM-dd HH:mm:ss", new Date());
  return isValidDate(parsedDate);
}

async function query(sql) {
  return new Promise((resolve, reject) => {
    const statement = db.prepare(sql);
    statement.all((error, rows) => (error ? reject(error) : resolve(rows)));
  });
}

async function getTableRows(table) {
  return await query(`
    SELECT id, created_ts, updated_ts
    FROM "${table}"
  `);
}

async function getTableRowsToConvert(table) {
  const rows = await getTableRows(table);
  return rows.filter(({ created_ts, updated_ts }) => {
    return !isValidTimestamp(created_ts) || !isValidTimestamp(updated_ts);
  });
}

async function fixTableRowTimestamps({ table, id, created, updated }) {
  const createdWithSeconds = format(new Date(created));
  const updatedWithSeconds = format(new Date(updated));

  try {
    return await query(`
    UPDATE "${table}"
    SET updated_ts = "${updatedWithSeconds}", created_ts = "${createdWithSeconds}"
    WHERE id = ${id}
  `);
  } catch (error) {
    console.error(error);
  }
}

async function addSecondsToTimestamps() {
  const tables = ["users", "projects", "announcements"];
  for (const table of tables) {
    const rows = await getTableRowsToConvert(table);
    if (rows.length > 0) {
      console.log("Converting timestamps in table %s", table);
      await Promise.all(
        rows.map(({ id, created_ts, updated_ts }) =>
          fixTableRowTimestamps({
            table,
            id,
            created: created_ts,
            updated: updated_ts,
          })
        )
      );
      console.log("%s rows updated in table %s", rows.length, table);
    }
  }
}

addSecondsToTimestamps().then(() => {
  console.log("Done");
});
