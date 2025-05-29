import express from "express"
const router = express.Router()
export default router;

import {
createFile,
createFolder
} from "#db/seed"

import {
    getFiles,
    getFolders,
    getFolder,
    getFolderByIdIncludingFiles
} from "#db/queries"

router.get("/folders", async (req, res)=>{
    const folders = await getFolders();
    res.send(folders);
})

router.get("/files", async (req, res)=>{
    const files = await getFiles();
    res.send(files);
})

router.get("/folders/:id", async (req, res)=>{
    const id = Number(req.params.id);
    

    const folder = await getFolderByIdIncludingFiles(id);
    if (!folder){
        return res.status(404).send({error: "folder not found"});
    }

    res.send(folder);
})

router.post("/folders/:id/files", async (req, res)=>{
    const id = Number(req.params.id);

    const folder = await getFolderByIdIncludingFiles(id);
    if(!folder){
        return res.status(404).send({error: "folder not found"});
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Missing body" });
    }

    const {name, size} = req.body;

    if(!name || size === undefined){
        return res.status(400).send({ error: "Missing required fields" });
    }

      const newFile = await createFile({ name, size, folder_id: id });
    res.status(201).send(newFile);

});