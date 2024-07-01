"use client";

import { Price, ProductWithPrice } from "@/types";
import Model from "./model";
import Button from "./button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModel from "@/hooks/useSubscribeModel";

interface SubscribeModelProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

const SubscribeModel:React.FC<SubscribeModelProps> = ({
    products 
}) => {
    const subscribeModel = useSubscribeModel();
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const onchange = (open: boolean) => {
        if(!open) {
            subscribeModel.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if(!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in')
        }

        if(subscription){
            setPriceIdLoading(undefined);
            return toast('Already subscribed');
        }

        try{
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch(error:any){
            toast.error((error as Error)?.message)
        } finally{
            setPriceIdLoading(undefined);
        }

    };

    let content = (
        <div>
            No products available
        </div>
    );

    if(products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if(!product.prices?.length){
                        return(
                            <div key={product.id}>
                                No prices available
                            </div>
                        );
                    }

                    return product.prices.map((price) => (
                        <Button 
                            key={price.id}
                            onClick={() => {handleCheckout(price)}}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }
    
    if(subscription) {
        content = (
            <div className="text-center">
                Already Subscribed
            </div>
        )
    }

    return(
        <Model
            title="Only for premium users"
            description="Listen to music with Onemusix Premium"
            isOpen={subscribeModel.isOpen}
            onChange={onchange}
        >
            {content}
        </Model>
    )
}

export default SubscribeModel;