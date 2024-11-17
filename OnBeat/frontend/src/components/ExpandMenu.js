import React, {useEffect, useState, } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PreviewIcon from '@mui/icons-material/Preview';

export default function ExpandMenu(props) {

    const [navClassName, setNavClassName] = useState("hide")

    function toggleOpen() {
        if (navClassName !== 'hide') {
            setNavClassName('hide')
        } else {
            setNavClassName('')
        }
    }

    return(
        <nav id="expand-menu" className={navClassName} style={props.ExpandMenuStyle}>
            <div className="add-content-menu">
                <div className="content-menu-toggle" onClick={toggleOpen}>
                    <a><AddCircleIcon /></a>
                </div>
                <span style={props.NoteIconStyle}>
                <a><EditNoteIcon onClick={props.handleNoteBtnClicked}/></a>
                </span>
                <span style={props.YouTubeIconStyle}>
                    <a>
                        {props.insertYoutubeLink ? <DoDisturbIcon onClick={props.handleYoutubeBtnClicked} className="cancel-icon" style={{fontSize: 28}}/> : null }
                        <YouTubeIcon onClick={props.handleYoutubeBtnClicked}/></a>
                </span>

                {props.insertTimestamp ? 
                <span style={props.TimeIconStyle}>
                <a><MoreTimeIcon onClick={props.handleTimestampBtnClicked}/></a>
                </span>
                : null
                }

                <span style={props.SaveIconStyle}>
                    <a><SaveIcon onClick={props.handleSaveBtnClicked}/></a>
                </span>
            </div>
        </nav>
    ) 
}