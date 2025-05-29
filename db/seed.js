import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

export async function createFolder({ name }) {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
  `;
  const { rows: folder } = await db.query(sql, [name]);
  return folder[0];
}

export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows: file } = await db.query(sql, [name, size, folder_id]);
  return file[0];
}



async function seed() {
  console.log("🧹 Clearing tables...");
  await db.query(`TRUNCATE files, folders RESTART IDENTITY CASCADE;`);
  const photosFolder = await createFolder({ name: "Photos" });

  await createFile({ name: "beachPhoto", size: 123, folder_id: photosFolder.id });
  await createFile({ name: "familyPhoto", size: 400, folder_id: photosFolder.id });
  await createFile({ name: "dog", size: 5000, folder_id: photosFolder.id });
  await createFile({ name: "car", size: 5000, folder_id: photosFolder.id });
  await createFile({ name: "golf", size: 5000, folder_id: photosFolder.id });

  const workFolder = await createFolder({ name: "Work" });

  await createFile({ name: "reports", size: 500, folder_id: workFolder.id });
  await createFile({ name: "HR", size: 300, folder_id: workFolder.id });
  await createFile({ name: "vacationTime", size: 5, folder_id: workFolder.id });
  await createFile({ name: "pain", size: 5, folder_id: workFolder.id });
  await createFile({ name: "suffering", size: 5, folder_id: workFolder.id });

  const financesFolder = await createFolder({ name: "Finances" });

  await createFile({ name: "Tax Forms", size: 0, folder_id: financesFolder.id });
  await createFile({ name: "Bank Statement", size: 0, folder_id: financesFolder.id });
  await createFile({ name: "Budget", size: 0, folder_id: financesFolder.id });
  await createFile({ name: "golfSpend", size: 0, folder_id: financesFolder.id });
  await createFile({ name: "secretMoney", size: 0, folder_id: financesFolder.id });
}