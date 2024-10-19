import React, {useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
        <nav id="expand-menu" className={navClassName}>
            <div className="add-content-menu">
                <div className="content-menu-toggle" onClick={toggleOpen}>
                    <a><AddCircleIcon /></a>
                </div>
                <span id="expand-1">
                    <a><EditNoteIcon/></a>
                </span>
                <span id="expand-2">
                    <a><MoreTimeIcon/></a>
                </span>
                <span id="expand-3">
                    <a><YouTubeIcon/></a>
                </span>
            </div>
        </nav>
    ) 
}