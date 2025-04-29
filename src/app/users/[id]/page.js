"use client";
import { useState, useEffect, use } from "react";
export default function PageDetails({params}){
    const {id} = use(params);
    
    return(
        <>
            {id}
        </>
    );
}