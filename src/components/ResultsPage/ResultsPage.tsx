import React, { FC, useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "config/firebase";
import { ResultData } from "models";
import { parseDateFromTimestamp } from "utils";

const ResultsPage: FC = () => {
  const [isLoadingResults, setIsLoadingResults] = useState(true);
  const [trips, setTrips] = useState<ResultData[]>([]);

  console.log(trips);

  useEffect(() => {
    try {
      const q = query(collection(db, "trips"), orderBy("created", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const data: ResultData[] = [];
        querySnapshot.docs.map((doc) => data.push(doc.data() as ResultData));
        setTrips(data);
        setIsLoadingResults(false);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-600 mb-5 text-center">
        Previous results
      </h1>
      {isLoadingResults && <p>Loading results...</p>}
      {!isLoadingResults && (
        <>
          {trips.map((trip) => (
            <div
              key={trip.created.seconds}
              className="flex bg-gray-200 rounded overflow-hidden shadow-lg  mb-2 w-full"
            >
              <div className="flex-2 bg-red-200">
                <p className="text-xs pt-2 pb-1 px-2 break-words">
                  {trip?.fromAddressName}
                </p>
                <p className="text-xs pb-2 px-2 break-words">
                  (Latitude: {trip?.fromAddressLatitude} / Longitude:{" "}
                  {trip?.fromAddressLongitude})
                </p>
              </div>
              <div className="flex-2 bg-red-100">
                <p className="text-xs pt-2 pb-1 px-2 break-words">
                  {trip?.toAddressName}
                </p>
                <p className="text-xs pb-2 px-2 break-words">
                  (Latitude: {trip?.toAddressLatitude} / Longitude:{" "}
                  {trip?.toAddressLongitude})
                </p>
              </div>
              <div className="flex-1 shrink-0  bg-red-200 flex items-center">
                <p className="text-xs p-2 break-words flex items-center">
                  {trip?.distance?.toFixed(2)} km
                </p>
              </div>
              <div className="flex-1 shrink-0  bg-red-100 flex items-center">
                <p className="text-xs p-2 break-words flex items-center">
                  {parseDateFromTimestamp(trip?.created)}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ResultsPage;
