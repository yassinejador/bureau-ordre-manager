"use client";

import { USER } from "@/types/utilisateur";
import React, { useState, useEffect } from "react";


const UserList: React.FC = () => {
  
    const users: USER[] = [
      { id: 1, 
        nom: "Mr Omar", 
        email: "Mr-Omar@example.com", 
        etablissement: "Admin",
        service: "Administration", 
        role:"Admin", 
        etablissementId: 1,
        serviceId: 1,
        password:"", 
        prenom:"",
        roleId:1 
      },
      { id: 2, 
        nom: "Mme Jihan", 
        email: "Me-Jihan@example.com", 
        etablissement: "Doyen", 
        service: "Direction", 
        etablissementId: 1,
        role:"Admin",
        serviceId: 1,
        password:"", 
        prenom:"",
        roleId:1 
      },
      { id: 3, 
        nom: "Mr ahmed", 
        email: "Mrahmed@example.com", 
        etablissement: "Responsable", 
        service: "Departement Math" ,
        etablissementId: 1 ,
        role:"Admin",
        serviceId: 1,
        password:"", 
        prenom:"",
        roleId:1 
      },
    ];
    

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Liste des Utilisateurs</h4>
        

        <div className="flex flex-col">
           {/* Table Header */}
          <div className="grid grid-cols-6 sm:grid-cols-6 rounded-sm bg-gray-200 dark:bg-meta-4">
         
            
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">ID</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Nom</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Email</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Rôle</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Service</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Actions</div>
             
          </div>
          {/* Table Rows */}
              {users.map((user) => (
                <div key={user.id}
                className={`grid grid-cols-6 sm:grid-cols-6 items-center border-b border-stroke dark:border-strokedark last:border-b-0`}
                >
                  <div className="p-3 text-center text-black dark:text-white">{user.id}</div>
                  <div className="p-3 text-center text-black dark:text-white">{user.nom}</div>
                  <div className="p-3 text-center text-black dark:text-white">{user.email}</div>
                  <div className="p-3 text-center text-black dark:text-white">{user.role}</div>
                  <div className="p-3 text-center text-black dark:text-white">{user.service}</div>
                  <div className="p-3 text-center text-black dark:text-white">
                  <button className="hover:text-primary">
  <svg
    className="fill-current"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.75 7.3025L10.6975 4.25L11.7575 3.19C12.02 2.9275 12.38 2.7775 12.7575 2.7775C13.135 2.7775 13.495 2.9275 13.7575 3.19L14.81 4.2425C15.0725 4.505 15.2225 4.865 15.2225 5.2425C15.2225 5.62 15.0725 5.98 14.81 6.2425L13.75 7.3025ZM2.5 15.5V12.4475C2.5 12.26 2.56 12.0775 2.6725 11.93L9.3725 5.23L12.425 8.2825L5.725 14.9825C5.5775 15.13 5.395 15.19 5.2075 15.19H2.155C2.07 15.19 2 15.26 2 15.345V15.5H2.5Z"
      fill="#808080" 
      stroke="#808080" 
      strokeWidth="0.5" 
    />
  </svg>
               </button>



               <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                  </div>
              ))}
            
        
      </div>
    </div>
  );
};

export default UserList;

