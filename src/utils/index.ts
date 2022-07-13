import { Timestamp } from "firebase/firestore";

export const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const padTo2Digits = (num: number): string => {
  if (!num) return "";
  return num.toString().padStart(2, "0");
};

const formatDate = (date: Date): string => {
  if (!date) return "";
  return [
    padTo2Digits(date?.getDate()),
    padTo2Digits(date?.getMonth() + 1),
    date?.getFullYear(),
  ].join("/");
};

export const parseDateFromTimestamp = (timestamp: Timestamp): string => {
  return formatDate(new Date(timestamp.toDate()));
};
