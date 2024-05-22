"use client"

import React, { useEffect , useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Formik } from 'formik';
import { Button } from "@/components/ui/button";
import { supabase } from '@/utils/supabase/client';
import { useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs';
import DossierTelecharge from '../_components/DossierTelecharge';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";



function ModifierAnnonce({params}) {

    const { user } = useUser();
    const router = useRouter();
    const [annonce, setAnnonce]= useState([]);
    const [images,setImages]=useState([]);
    const [chargement,setChargement]=useState(false);

    useEffect(()=>{
       // console.log(params.split('/')[2]);
        user&&verifyUserRecord();
    },[user]);

    const verifyUserRecord= async()=>{
        const {data, error}= await supabase
        .from('annonce')
        .select('*,Annonce_images(annonce_id,url)')
        .eq('cree_par',user?.primaryEmailAddress.emailAddress)
        .eq('id',params.id);

        if(data)
            {
                console.log(data);
                setAnnonce(data[0]);
            }

        if(data?.length<=0)
            {
                router.replace('/')
            }
    }

    const onSubmitHandler = async (formValue) =>{
        setChargement(true);
            const { data, error } = await supabase
            .from('annonce')
            .update(formValue)
            .eq('id', params.id)
            .select();

            if(data)
                {
                    console.log(data);
                    toast('Annonce mis à jour & Publié');
                    setChargement(false);
                }
            for(const image of images)
                {
                    setChargement(true);
                    const file = image;
                    const fileName = Date.now().toString();
                    const fileExt = fileName.split('.').pop(); 
                    const {data, error}= await supabase.storage
                    .from('Annonce_images')
                    .upload(`${fileName}`, file,{
                        contentType:`image/${fileExt}`,
                        upsert: false
                    });

                    if(error)
                        {
                            setChargement(false);
                            toast('Erreur lors du téléchargement')
                        }else{

                            const imageUrl=process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
                            const {data, error} = await supabase
                            .from('Annonce_images')
                            .insert([
                                {url:imageUrl,annonce_id:params?.id}
                            ])
                            .select();

                            
                            if(error)
                                {
                                    setChargement(false);
                                }
                        }
                    setChargement(false);
                }
                
    }

    const publishBtnHandler= async ()=>{
        setChargement(true);
        const { data, error } = await supabase
        .from('annonce')
        .update({ actif: true })
        .eq('id', params?.id)
        .select()

        if(data)
            {
                setChargement(false);
                toast('Annonce publiée !');
            }
        
    }

  return (
    <div className='px-10 md:px-36 my-10'>
        <h2 className='font-bold text-2xl'>Entrez plus de détails à propos de votre annonce</h2>

        <Formik
            initialValues={{
                categorie:'',
                option_location:'',
                photo_profil:user?.imageUrl,
                nom_utilisateur:user?.nom_utilisateur
            }}
            onSubmit={(values)=>{
                console.log(values);
                onSubmitHandler(values);
            }}
        >
            {({
                values,
                handleChange,
                handleSubmit
            })=>(
                <form onSubmit={handleSubmit}>
            <div>
            <div className='p-5 border rounded-lg shadow-md grid gap-7 mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    <div className='flex gap-2 flex-col '>
                        <h2 className='text-lg'>Location ou Colocation ? </h2>
                        <RadioGroup  defaultValue={annonce?.categorie}
                            onValueChange={(v)=>values.categorie=v}
                        
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Location" id="Location" />
                                <Label htmlFor="Location" className="text-lg">Location</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Colocation" id="Colocation" />
                                <Label htmlFor="Colocation" className="text-lg">Colocation</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-lg'>Option Location</h2>
                        <Select
                            onValueChange={(e)=>values.option_location=e}
                            name='option_location'
                            defaultValue={annonce?.option_location}
                            >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={annonce?.option_location?annonce?.option_location:"Sélectionnez le type de location"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Trimestriel">Trimestriel</SelectItem>
                                <SelectItem value="Semestriel">Semestriel</SelectItem>
                                <SelectItem value="Annuel">Annuel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                    <div className='flex gap-2 flex-col'>
                            <h2 >Chambre</h2>
                            <Input type="number" placeholder="Nombre de chambres" 
                                defaultValue={annonce?.chambre}
                                name="chambre" 
                                onChange={handleChange}
                            />
                    </div>
                    <div className='flex gap-2 flex-col '>
                        <h2>Salle de Bain</h2>
                        <Input type="number" placeholder="Nombre Salle de Bain" 
                             defaultValue={annonce?.salle_de_bain}
                            name="salle_de_bain"
                             onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 >Surface (m²)</h2>
                        <Input type="number" placeholder="m²" 
                             defaultValue={annonce?.surface}
                            name="surface" 
                             onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                    <div className='flex gap-2 flex-col '>
                            <h2 >Prix (MAD)</h2>
                            <Input placeholder="2000 MAD" 
                            onChange={handleChange}
                             defaultValue={annonce?.prix}
                            name="prix" />
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-10'>
                    <div className='flex gap-2 flex-col '>
                            <h2 >Description</h2>
                            <Textarea placeholder="Décrivez votre logement..." 
                                    defaultValue={annonce?.description}
                                    name="description"
                                    onChange={handleChange}
                            />
                    </div>
                </div>
                <div>
                    <h2 className='font-lg text-grid-500 my-2'>Téléchargez les images pour votre annonce</h2>
                    <DossierTelecharge 
                        setImages={(value)=>setImages(value)}
                        imageList={annonce.Annonce_images}
                    />
                </div>
                <div className='flex gap-7 justify-end'>
                   
                    <Button disabled={chargement} variant="outline" className="text-primary border-primary">
                        {chargement?<Loader className='animate-spin'/>:"Enregistrer"}
                    </Button>
                    

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" disabled={chargement} className="">
                            {chargement?<Loader className='animate-spin'/>:"Enregistrer et Publier"}
                    </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Prêt à publier ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Vous allez publier votre annonce. 
                                N'oubliez pas de vérifier si toutes les informations sont correctes. 
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>publishBtnHandler()}>
                                {chargement?<Loader className='animate-spin'/>:'Continuer'}
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>



                </div>
            </div>
            </div>
            </form>)}
        </Formik>
    </div>
  )
}

export default ModifierAnnonce