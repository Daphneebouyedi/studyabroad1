import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Bath, BedDouble } from 'lucide-react';
  

        function FiltreSection({setChambreCount, setSalleDeBainCount, setOptionLocation}) {
        return (
            <div className='px-3 py-2 grid grid-cols-2 
                md:flex gap-2'>
                    <Select onValueChange={setChambreCount}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chambre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">
                                <h2 className='flex gap-2'>
                                     <BedDouble className='h-5 w-5 text-primary'/> 2+
                                </h2>
                            </SelectItem>
                            <SelectItem value="3">
                                <h2 className='flex gap-2'>
                                     <BedDouble className='h-5 w-5 text-primary'/> 3+
                                </h2>
                            </SelectItem>
                            <SelectItem value="4">
                                <h2 className='flex gap-2'>
                                     <BedDouble className='h-5 w-5 text-primary'/> 4+
                                </h2>
                            </SelectItem>
                            
                        </SelectContent>
                    </Select>


                    <Select onValueChange={setSalleDeBainCount}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Salle de Bain" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">
                                <h2 className='flex gap-2'>
                                     <Bath className='h-5 w-5 text-primary'/> 2+
                                </h2>
                            </SelectItem>
                            <SelectItem value="3">
                                <h2 className='flex gap-2'>
                                     <Bath className='h-5 w-5 text-primary'/> 3+
                                </h2>
                            </SelectItem>
                            <SelectItem value="4">
                                <h2 className='flex gap-2'>
                                     <Bath className='h-5 w-5 text-primary'/> 4+
                                </h2>
                            </SelectItem>
                            
                        </SelectContent>
                    </Select>


            

                    <Select onValueChange={(value)=>value=="Tout" ? 
                        setOptionLocation(null) : setOptionLocation(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Option Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Tout">
                                 Tout
                            </SelectItem>
                            <SelectItem value="Trimestriel">
                                 Trimestriel
                            </SelectItem>
                            <SelectItem value="Semestriel">
                                 Semestriel
                            </SelectItem>
                            <SelectItem value="Annuel">
                                 Annuel
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    

            </div>
        )
        }

export default FiltreSection