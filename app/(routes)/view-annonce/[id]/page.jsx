"use client"

import { supabase } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Slider from '../_components/Slider';
import Details from '../_components/Details';

function ViewAnnonce({params}) {

    const [annonceDetail,setAnnonceDetail]= useState();
    useEffect(()=>{
        GetAnnonceDetail();

    }, [])
    const GetAnnonceDetail= async ()=>{
        const{data, error}= await supabase
        .from('annonce')
        .select(`*,Annonce_images(annonce_id,url)`)
        .eq('id',params.id)
        .eq('actif',true);

        if(data)
            {
                setAnnonceDetail(data[0]);
                console.log(data);
            }
        if(error)
            {
                toast('Erreur côté serveur !');
            }
    }

  return (
    <div className='px-4 md:px-32 lg:px-56 my-3 '>
        <Slider imageList={annonceDetail?.Annonce_images}/>
        <Details annonceDetail={annonceDetail}/>
    </div>
  )
}

export default ViewAnnonce;
