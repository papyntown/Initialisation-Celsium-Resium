import {
    Viewer,
    Entity,
    PointGraphics,
    EntityDescription,
    GeoJsonDataSource,
    CameraFlyTo,
    Clock,
    PathGraphics,
} from "resium";
import {
    Cartesian3,
    Color,
    createWorldTerrain,
    Ion,
    JulianDate,
    SampledPositionProperty,
    TimeIntervalCollection,
    TimeInterval,
    VelocityOrientationProperty,
} from "cesium";

import data from "./data/data.json";

interface DataPoint {
    longitude: number;
    latitude: number;
    height: number;
}

const MapResium = () => {
    // Le token Cesium pour avoir accès a la planete etc ...
    Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDE1MWZkNy03ODA2LTQ1ZGUtYTU0Ny0wODk4YjJmNjRlNjgiLCJpZCI6MTM2MDM2LCJpYXQiOjE2ODI2Nzg0MTJ9.iHoaBQzYta71j7qcvnIAMkqQBowphzGGGnntMlqiCwI";

    const worldTerrain = createWorldTerrain({
        requestWaterMask: false,
        // requestVertexNormals: false,
    });

    const timeStepInSeconds = 30;
    const totalSeconds = timeStepInSeconds * (data.length - 1);
    const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z");
    const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());

    const positionProperty = new SampledPositionProperty();

    const flightData = data.map((dataPoint: DataPoint, index: number) => {
        // Declare the time for this individual sample and store it in a new JulianDate instance.
        const time = JulianDate.addSeconds(
            start,
            index * timeStepInSeconds,
            new JulianDate()
        );
        const position = Cartesian3.fromDegrees(
            dataPoint.longitude,
            dataPoint.latitude,
            dataPoint.height
        );
        // Store the position along with its timestamp.
        // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
        positionProperty.addSample(time, position);
        return (
            <Entity
                key={index}
                position={position}
                name="Plane position"
                point={{ pixelSize: 10, color: Color.RED }}></Entity>
        );
    });

    const airPlaneLine = (
        <Entity
            name="Airplane"
            tracked
            selected
            position={positionProperty}
            availability={
                new TimeIntervalCollection([
                    new TimeInterval({ start: start, stop: stop }),
                ])
            }
            model={{
                uri: "./model/Cesium_Air.glb",
                minimumPixelSize: 68,
                maximumScale: 256,
            }}
            orientation={new VelocityOrientationProperty(positionProperty)}>
            <PathGraphics width={3} show={true} />
        </Entity>
    );

    return (
        <Viewer full terrainProvider={worldTerrain}>
            {/* <CameraFlyTo
                duration={5}
                destination={Cartesian3.fromDegrees(
                    data[0].longitude,
                    data[0].latitude,
                    data[0].height + 1000
                )}
            /> */}
            <Clock
                startTime={start.clone()}
                stopTime={stop.clone()}
                currentTime={start.clone()}
                multiplier={20}
                shouldAnimate={true}
            />
            {flightData}
            {airPlaneLine}
        </Viewer>
    );
};

export default MapResium;
