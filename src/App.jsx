import { useState, useEffect} from "react";
import ArScene from "./aframescene";

function App() {
  const [SceneId, setSceneId] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [SA, setAction] = useState(false); //false para getScene y true para NewScene


  const handleNewSceneClick = () => {
    setShowMenu(false); //para esconder el menu
    setAction(true); 
  };

  const handleGetExistingSceneClick = () => {
    if (SceneId.trim() === "") {
      alert("Please write a scene_id");
    } else {
      setShowMenu(false);
    }
  };

  const handleInputChange = (e) => {
    setSceneId(e.target.value);
  };

  useEffect(() => {
    console.log("Updated sceneId:", SceneId, typeof SceneId);

  }, [SceneId]);

  return (
    <div className="App2D">
      {/*hacer bonito 🤢 */}
      {showMenu && (
        <>
          <button onClick={handleNewSceneClick}>NewScene</button>
          <form onSubmit={handleGetExistingSceneClick}>
            <label>
              SceneID:
              <input
                type="text"
                value={SceneId}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">GetExistingScene</button>
          </form>
        </>
      )}
      {!showMenu && !SA ?( //cuando haya un click se renderizará el aframescene.jsx
        <div>
          {SceneId ? (
            <div>
              <ArScene SceneId={SceneId} SA={SA}/>
            </div>
          ) : (
            <div>Write a scene_id</div>
          )}  
        </div>
      ) : !showMenu && SA &&( //Si hizo click en NewScene, algo quiero hacer no se que
        <div> 
          <ArScene SceneId={SceneId} SA={SA}/>
        </div>

      )}
    </div>
  );
}

export default App;
