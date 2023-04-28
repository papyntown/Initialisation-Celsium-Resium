import {
    Viewer,
    Entity,
    PointGraphics,
    EntityDescription,
    GeoJsonDataSource,
} from "resium";
import { Cartesian3, Color, createWorldTerrain } from "cesium";

const position = Cartesian3.fromDegrees(139.691706, 35.689487);
const terrainProvider = createWorldTerrain({
    // je vais pouvoir modifier les informations de mon terrain pour exemple ici
    // requestWaterMask: false, permet de ne pas afficher les détails de l'océans pour charger plus vite
    requestWaterMask: false,
    requestVertexNormals: false,
});

// Data
const data = {
    type: "Feature",
    properties: {
        name: "Coors Field",
        amenity: "Baseball Stadium",
        popupContent: "This is where the Rockies play!",
    },
    geometry: {
        type: "Point",
        coordinates: [-104.99404, 39.75621],
    },
};

const App = () => {
    return (
        <Viewer full terrainProvider={terrainProvider}>
            <Entity position={position} name="Tokyo">
                <PointGraphics pixelSize={10} color={Color.ORANGE} />
                <EntityDescription>
                    <h1>Tokyo</h1>
                    <p>Tokyo est située au Japon</p>
                </EntityDescription>
            </Entity>
            <GeoJsonDataSource data={data} />
        </Viewer>
    );
};

export default App;
