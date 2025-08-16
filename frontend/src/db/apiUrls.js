import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Urls");
  }

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Urls");
  }

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 8);

  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) {
    console.log("error:", storageError.message);
    throw new Error(storageError.message);
  }

  const qr = `${supabaseUrl}/storage/v1/object/qrs/${fileName}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.log(error.message);
    throw new Error("Error creating short URL");
  }

  return data;
}

export async function getLongUrl(id) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("id, original_url")
      .or(`short_url.eq.${id},custom_url.eq.${id}`) 
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error("Error fetching short link:", error);
      }
      return null; // explicit "not found"
    }

    return data; // { id, original_url }
  } catch (err) {
    console.error("Unexpected error in getLongUrl:", err);
    return null;
  }
}

