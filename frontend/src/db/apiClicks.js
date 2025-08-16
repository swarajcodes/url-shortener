import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Clicks");
  }

  return data;
}

const parser = new UAParser();

export const storeClicks = async ({ id }) => {
  try {
    const res = parser.getResult();
    const device = res.device.type || "desktop";

    let city = "Unknown";
    let country = "Unknown";

    try {
      const response = await fetch("https://ipapi.co/json");
      if (response.ok) {
        const geo = await response.json();
        city = geo.city || city;
        country = geo.country_name || country;
      }
    } catch (geoError) {
      console.warn("Could not fetch geolocation:", geoError.message);
    }

    const { error } = await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    if (error) {
      console.error("Error inserting click:", error);
    }
  } catch (error) {
    console.error("Error recording click:", error.message);
  }
};

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id)

  if (error) {
    console.error(error.message);
    throw new Error("unable to load stats");
  }

  return data;
}
