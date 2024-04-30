

//MY LAST UPDATE WITHOUT AFRAME
import {useState, useEffect} from "react";
import axios from "axios"; 




function ArScene(){

    const [returnedData, setReturnedData] = useState({scene_id: "", model_id: "", position: "", scale: "", rotation: ""}); //La data de escena recolectada
    const [sceneData, setSceneData] = useState({scene_id: "", model_id: "", position: "", scale: "", rotation: ""}); //la data de escena para crear
    const [modelData, setReturnModel] = useState({model_id: "", obj_path: "", mtl_path: ""}); //la data de modelo recolectada

    const setInput = (e) => {
      const {name, value} = e.target;
      console.log("value input:",value)
      setSceneData(prevState => ({
        ...prevState,
        [name]: value 
      }));

    }
    
    useEffect(() => {
      console.log("State updated:", returnedData);
      console.log("State updated:", modelData);
      
    }, [returnedData, modelData]);
    

    const get_Scene = async () => {
      console.log("get_scene executed")
      try {
        const response = await axios.get("http://localhost:5000/server/" + sceneData.scene_id); // Make a GET request to your backend
        setReturnedData(response.data); 
        const modelIds = response.data.map(item => item.model_id); //todos los modelos de una escena
        console.log("After setting state:", modelIds); //response.data[1].model_id
        useEffect //me asegura que se actualice el valor de returnedData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const get_Model = async () => {
      console.log("get_model executed")
      try {
        const response = await axios.get("http://localhost:5000/server1/" + sceneData.model_id); // Make a GET request to your backend
        setReturnModel(response.data); 
        useEffect //me asegura que se actualice el valor de returnedData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const create_Scene = async () => {
      console.log("create_Scene executed")
      try {
        const response = await axios.post("http://localhost:5000/server", sceneData); // Make a GET request to your backend
        console.log(response.data);
      } catch (error) {
        console.error("Error creating scene:", error);
      }
    };


    return (
        <div className="App">
          <input name="scene_id" placeholder="scene_id" onChange={setInput}/>
          <input name="model_id" placeholder="model_id"onChange={setInput}/> 
          <input name="position" placeholder="position"onChange={setInput}/>
          <input name="scale" placeholder="scale"onChange={setInput}/> 
          <input name="rotation" placeholder="rotation"onChange={setInput}/> 


          <button onClick={() => get_Scene()}>GetScene</button>   
          <button onClick={() => create_Scene()}>CreateScene/AddtoScene</button>   
          <button onClick={() => get_Model()}>GetModel</button>   
          {Array.isArray(returnedData) && returnedData.map((scene, index) => (
            <div key={index}>
              <h1>Scene {sceneData.scene_id}</h1>
              <p>Model_id: {scene.model_id}</p>
              <p>Position: {scene.position}</p>
              <p>Scale: {scene.scale}</p>
              <p>Rotation: {scene.rotation}</p>
            </div>
          ))},
          {Array.isArray(modelData) && modelData.map((model, index) => ( 
            <div key={index}>  
              <h1>Model: {model.model_id}</h1>
              <p>obj_path: {model.obj_path}</p> 
              <p>mtl_path: {model.mtl_path}</p> 
            </div>
          ))},
         
        </div>
    )
}

export default ArScene;

