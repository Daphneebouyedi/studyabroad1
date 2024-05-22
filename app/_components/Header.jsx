"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Image src={"/Logo.svg"} alt="logo" width={100} height={100} />
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>
            <li className={`'hover:text-primary 
                        font-medium  cursor-pointer'
                        ${path == "/" && "text-primary"}`}
            >
              Logement 
            </li>
          </Link>
          <Link href={"/demarches-administratives"}>
            <li className="hover:text-primary font-medium cursor-pointer"
            >
             Démarches Administratives
            </li>
          </Link>
        
          <li className="hover:text-primary font-medium cursor-pointer">
            Contacts
          </li>
          <li className="hover:text-primary font-medium cursor-pointer">
            FAQs
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/ajouter-nouvelle-annonce"}>
            <Button className="flex gap-2">
                <Plus className="h-5 w-5" /> 
                Ajouter une annonce
            </Button>
        </Link>
        {isSignedIn ? 
        
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image 
                  src={user?.imageUrl} 
                  width={35} height={35} 
                  alt="user profile"
                  className="rounded-full"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/user'}> Profil </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Mes Annonces</DropdownMenuItem>
              <DropdownMenuItem> <SignOutButton> Déconnexion </SignOutButton> </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
         : 
          <Link href={"/sign-in"}>
          <Button variant="outline"> Connexion </Button>
          </Link>
        }
      </div>
    </div>
  );
}

export default Header;
