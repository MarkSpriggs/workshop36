import db from "#db/client";

export async function getFolders(){
    const sql = `
    SELECT * FROM folders;
    `;

    const {rows: folders} = await db.query(sql);
    return folders;
}

export async function getFiles(){
    const sql = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders ON files.folder_id = folders.id;
    `;

    const {rows: files} = await db.query(sql);
    return files;
}

export async function getFolderByIdIncludingFiles(id){
    const sql = `
   SELECT folders.*, 
       json_agg(files.*) AS files
FROM folders
LEFT JOIN files ON folders.id = files.folder_id
WHERE folders.id = $1
GROUP BY folders.id;
    `;

    const { rows: folder } = await db.query(sql, [id]);
    return folder[0];
}

