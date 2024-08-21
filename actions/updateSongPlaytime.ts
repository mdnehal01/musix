import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const updateSongPlaytime = async (id: string) => {
    const supabase = createClientComponentClient();

    if (!id) {
        return;
    }

    const { data: currentData, error: fetchError } = await supabase
        .from('songs')
        .select('playtime')
        .eq('id', id)
        .single(); // Fetch a single row

    if (fetchError) {
        console.error('Error fetching playtime:', fetchError);
    }else {
        // Step 2: Increment the playtime value
        const currentPlaytime = currentData.playtime;

        const { data, error } = await supabase
            .from('songs')
            .update({ playtime: currentPlaytime + 1 })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating playtime:', error);
        } else {
            console.log('Updated playtime:', data);
        }
    }
};

export default updateSongPlaytime;
