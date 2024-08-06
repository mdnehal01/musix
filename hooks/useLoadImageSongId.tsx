import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImageSongID = (songId:string) => {
    const supabaseClient = useSupabaseClient();

    if(!songId) {
        return null;
    }

    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(songId);

    // TODO Done: Added for google storage link
    const googlePrefx = "https://kezskricfbuksihuhhqt.supabase.co/storage/v1/object/public/images/https://storage.googleapis.com/onemusixapp"
    const unwantedPrefix = "https://kezskricfbuksihuhhqt.supabase.co/storage/v1/object/public/images/";

    // alert(imageData.publicUrl + " Default")

    imageData.publicUrl = imageData.publicUrl.startsWith(googlePrefx) ? imageData.publicUrl.slice(unwantedPrefix.length) : imageData.publicUrl;
    imageData.publicUrl = decodeURIComponent(imageData.publicUrl);
        
    return imageData.publicUrl;
}

export default useLoadImageSongID;