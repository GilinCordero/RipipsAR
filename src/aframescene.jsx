import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 

function ArScene({ SA, SceneId }) {

 ArScene.propTypes = { 
     SA: PropTypes.bool.isRequired,
     SceneId: PropTypes.string.isRequired,
  };


  const [returnedData, setReturnedData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [loading, setLoading] = useState(true);


 
  useEffect(() => {
    const fetchData = async (anySceneId) => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/server/" + Number(anySceneId));
        setReturnedData(response.data);
        const modelIds = response.data.map((item) => item.model_id);
        fetchModelData(modelIds);
        setLoading(false); 
        console.log("modelIds:", modelIds, "\nAll returned scene:", response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    const fetchModelData = async (ids) => {
      try {
        const modelDataArray = await Promise.all(
          ids.map(async (id) => {
            const response = await axios.get("http://localhost:5000/server1/" + id);
            return response.data[0]; 
          })
        );
        console.log("modelDataArray:", modelDataArray);
        setModelData(modelDataArray);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };
  
    if (SA === false) {
      fetchData(SceneId);

    }
  }, [SA, SceneId]);
  
 


  return (
    
  
    <div>
      {SA === true && ( //could be a default register component but i dunno how to make em
        <a-scene>
          <a-entity
            id="modelo"
            gltf-model="url(https://cdn.glitch.global/21085439-f96c-42ee-8640-29950293a04f/Estructura.gltf?v=1712797565804)"
            scale="0.001 0.001 0.001"
            position="0 -0.06 0"
          ></a-entity>
        </a-scene>  
      )}
      {SA === false && !loading &&(
              <p>Loading...</p>

            )}
      {SA === false && loading && modelData && (
        <a-scene>
          {returnedData.map((data, index) => ( //lo mapeo para generan un id unico
             <a-entity key={`${index}`}>
                <a-entity key={`${index}`}
                  id={`${index}-${data.model_id}`}                  
                  gltf-model={"url("+ modelData[index].obj_path + ")"}
                  scale={returnedData[index].scale}
                  position={returnedData[index].position}
                ></a-entity>
              <script>{console.log("index =",index ,returnedData[index].scale , returnedData[index].position, "url("+ modelData[index].obj_path + ")" )}</script> 
              {/* por si quieren ver q esta pasando */}
            </a-entity>
          ))}
        </a-scene>
      )}

      
    </div>
  );
}

export default ArScene;

/* YES ANOTHER BACKUP
import React, { useState, useEffect } from "react";
import axios from "axios";

function ArScene({ SA, SceneId }) {
  const [returnedData, setReturnedData] = useState([]);
  const [modelData, setModelData] = useState({});

  useEffect(() => {
    const fetchData = async (anySceneId) => {
      try {
        const response = await axios.get("http://localhost:5000/server/" + anySceneId);
        setReturnedData(response.data);
        const modelIds = response.data.map((item) => item.model_id);
        fetchModelData(modelIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchModelData = async (ids) => {
      try {
        const modelPromises = ids.map(async (id) => {
          const response = await axios.get("http://localhost:5000/server1/" + id);
          return response.data;
        });
        const modelDataArray = await Promise.all(modelPromises);
        const models = {};
        modelDataArray.forEach((data, index) => {
          models[ids[index]] = data;
        });
        setModelData(models);
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };

    if (SA === "2" && SceneId) {
      fetchData(SceneId);
    }
  }, [SA, SceneId]);

  return (
    <div>
      {SA === "1" && (
        <a-scene>
          <a-entity
            id="modelo"
            gltf-model="url(https://cdn.glitch.global/21085439-f96c-42ee-8640-29950293a04f/Estructura.gltf?v=1712797565804)"
            scale="0.001 0.001 0.001"
            position="0 -0.06 0"
          ></a-entity>
        </a-scene>
      )}

      {SA === "2" && (
        <a-scene>
          {returnedData.map((scene, index) => (
            <a-entity key={index}>
              <a-entity
                id={scene.model_id}
                gltf-model={`url(${modelData[scene.model_id]?.obj_path})`}
                scale={scene.scale}
                position={scene.position}
              ></a-entity>
            </a-entity>
          ))}
        </a-scene>
      )}
    </div>
  );
}

export default ArScene;


  const fetchData = async (anySceneId) => {
      try {
        const response = await axios.get("http://localhost:5000/server/" + Number(anySceneId));
        setReturnedData(response.data);
        const modelIds = response.data.map((item) => item.model_id);
        fetchModelData(modelIds);
        console.log("modelIds:", modelIds, "\nAll returned scene:", response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchModelData = async(ids) => {
      try {
        for (const id of ids) {
          const response = awaitaxios.get("http://localhost:5000/server1/" + id);
          setModelData(response.data);
        }
        console.log("array:", modelData)
        //setModelData(modelDataArray);
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };
*/