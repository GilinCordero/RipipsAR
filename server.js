const express = require("express"),
dbOperation = require("./dbFiles/dbOperation"),
cors = require("cors");


const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//getModel
app.get("/server1/:model_id", async(req, res) => {
    const model_id = req.params.model_id;
    try {
        const result = await dbOperation.getModel(model_id);
        res.send(result.recordset);
        console.log(result.recordset)
    } catch (error) {
        console.error("Error fetching scene data:", error);
        res.status(500).send("Error fetching scene data");
    }
});



//getScene
app.get("/server/:scene_id", async(req, res) => {
    const sceneId = req.params.scene_id;
    try {
        const result = await dbOperation.getScene(sceneId);
        res.send(result.recordset);
    } catch (error) {
        console.error("Error fetching scene data:", error);
        res.status(500).send("Error fetching scene data");
    }
});
//createScene
app.post("/server", async (req, res) => {
    const sceneData = req.body;
    try {
        const result = await dbOperation.addScene(sceneData);
        res.send(result.recordset);
    } catch (error) {
        console.error("Error creating scene data:", error);
        res.status(500).send("Error creating scene data");
    }
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));





