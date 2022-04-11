const { Database } = require("sqlite3");
const path = require("path");

const db = new Database(path.join(process.cwd(), "db.sqlite"));

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

async function convertTableRowTimestamps({ table, id, created, updated }) {
  const createdUnixTimestamp = new Date(created).getTime();
  const updatedUnixTimestamp = new Date(updated).getTime();

  return await query(`
    UPDATE "${table}"
    SET updated_ts = ${updatedUnixTimestamp}, created_ts = ${createdUnixTimestamp}
    WHERE id = ${id}
  `);
}

async function toUnixTimestamps() {
  const tables = ["users", "projects", "announcements"];
  for (const table of tables) {
    console.log("Converting timestamps in table %s", table);
    const rows = await getTableRows(table);
    await Promise.all(
      rows.map(({ id, created_ts, updated_ts }) =>
        convertTableRowTimestamps({
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

toUnixTimestamps().then(() => {
  console.log("Done");
});
