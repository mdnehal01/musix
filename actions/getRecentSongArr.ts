import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getRecentSongArr = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies:cookies
    });

    const {
        data:sessionData, 
        error:sessionError
    } = await supabase.auth.getSession();

    if(sessionError){
        console.log(sessionError.message);
        return [];
    }

    const { data, error } = await supabase
        .from('users')
        .select('recent_song')
        .eq('id', sessionData.session?.user.id);
        // .order('created_at', { ascending:false });

    if(error){
        console.log(error.message);
    }

    // @ts-ignore
    console.log(data[0].recent_song.reverse())

    // @ts-ignore
    return data[0].recent_song || []
};

export default getRecentSongArr;