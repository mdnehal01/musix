"use client"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

import Model from "./model";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModel from "@/hooks/useAuthModel";
import { useEffect } from "react";

const AuthModel = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const {onClose, isOpen} = useAuthModel();

    useEffect(()=> {
        if(session){
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    return (
        <Model
            title="Welcome Back"
            description="Login To Your Account"
            isOpen={isOpen}
            onChange={onChange}
        >   
            <Auth
                theme="dark"
                magicLink
                providers={["github", "google"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme:ThemeSupa,
                    variables: {
                        default:{
                            colors: {
                                brand:'#404040',
                                brandAccent: '#D23853'
                            }
                        }
                    }
                }}
            />
        
        </Model>
        
    );
}

export default AuthModel;