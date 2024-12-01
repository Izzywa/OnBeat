import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function ExpandMenu(props) {
    const [navClassName, setNavClassName] = useState("hide")

    function toggleOpen() {
        if (navClassName !== 'hide') {
            setNavClassName('hide')
        } else {
            setNavClassName('')
        }
    }

    function HideIconStyle() {
        return {
            transform : 'translateY(-2.5em)'
        }
    }

    return(
        <nav id="expand-menu" className={navClassName} style={props.ExpandMenuStyle}>
            <div className="add-content-menu">
                <div className="content-menu-toggle" onClick={toggleOpen}>
                    <a>{ props.viewOnly ? <SettingsIcon /> : <AddCircleIcon />}</a>
                </div>
                <span style={props.NoteIconStyle ? props.NoteIconStyle : HideIconStyle()}>
                <a><TextSnippetIcon onClick={props.handleNoteBtnClicked}/></a>
                </span>
                <span style={props.YouTubeIconStyle ? props.YouTubeIconStyle : HideIconStyle()}>
                    <a>
                        {props.insertYoutubeLink ? <DoDisturbIcon onClick={props.handleYoutubeBtnClicked} className="cancel-icon" style={{fontSize: 28}}/> : null }
                        <YouTubeIcon onClick={props.handleYoutubeBtnClicked}/></a>
                </span>

                {props.insertTimestamp ? 
                <span style={props.TimeIconStyle ? props.TimeIconStyle : HideIconStyle()}>
                <a><MoreTimeIcon onClick={props.handleTimestampBtnClicked}/></a>
                </span>
                : null
                }

                <span style={props.viewOnly ? HideIconStyle() : null}>
                    <a><SaveIcon onClick={props.handleSaveBtnClicked}/></a>
                </span>

                <span style={props.viewOnly ? {transform : 'translateY(-2.5em) translateX(2.5em)'}
                : HideIconStyle()}>
                    <a><DeleteForeverIcon onClick={props.handleDeleteBtnClicked}/></a>
                </span>
                <span style={props.viewOnly ? {transform : 'translateY(-2.5em) translateX(5em)'} : HideIconStyle()}>
                    <a><EditNoteIcon onClick={props.handleEditBtnClicked}/></a>
                </span>
                <span style={props.viewOnly ? {transform: 'translateY(-2.5em) translateX(7.5em'}: HideIconStyle()}>
                    <a className={props.bookmarked ? "bookmark": ""}>
                        <BookmarkIcon onClick={props.handleBookmark}/>
                        </a>
                </span>
                { props.handleOnBeat ?
                <span style={props.viewOnly ? {transform: 'translateY(-2.5em) translateX(10em)'}: HideIconStyle()}>
                    <a>
                        <div className={props.onBeat ? "soundwave-container active": "soundwave-container"} onClick={props.handleOnBeat}>
                            <div className="soundwave"></div>
                            <div className="soundwave"></div>
                            <div className="soundwave"></div>
                            <div className="soundwave"></div>
                            <div className="soundwave"></div>
                        </div>
                    </a>
                </span>
                :null }

            </div>
        </nav>
    ) 
}