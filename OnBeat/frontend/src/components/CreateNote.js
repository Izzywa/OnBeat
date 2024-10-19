import React, { useEffect, useState, useRef } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";
import ExpandMenu from "./ExpandMenu";


export default function CreateNote(props) {

    return(
        <>
        <NavBar />
         <div id='1' className="container">
        <YoutubeLinkInput />
        </div>
        <ExpandMenu/>
        </>
    )
}