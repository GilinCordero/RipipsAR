const { raw } = require("express");
const config = require("./dbconfig");
sql = require("mssql");
//Mostrar escena
const getScene = async(which) =>{
    try{
        let pool = await sql.connect(config);
        let models = pool.request().query(`exec loadScene '${which}'`);
        console.log("GetScene executed succesfully");
        return models;

    }
    catch(error){
        console.log(error);
    };
};
//Mostrar modelo
const getModel = async(which) =>{
    try{
        let pool = await sql.connect(config);
        let model = pool.request().query(`exec loadModel '${which}'`);
        console.log("GetModel executed succesfully");
        return model;

    }
    catch(error){
        console.log(error);
    };
};
//Añadir escena
const addScene = async(sceneProps) =>{   
    try{
        let pool = await sql.connect(config);
        let scene = pool.request()
        .query(`exec createScene '${sceneProps.scene_id}','${sceneProps.model_id}','"${sceneProps.position}"','"${sceneProps.scale}"',
                '"${sceneProps.rotation}"'`);
        console.log("addScene executed succesfully");
        return scene;

    }
    catch(error){
        console.log(error);
    };
};


module.exports = {
    getScene,
    getModel,
    addScene
    
}