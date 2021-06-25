import React from 'react'
import './ListLink.less'

function ListLink(props) {
    return (
        <div className="links">
            <div className="link">
                <a href={props.short} className="short__link" target="_blank" rel="noreferrer" >
                    {props.short}
                </a>
                <a href={props.long} className="long__link" target="_blank" rel="noreferrer">
                    {props.long}
                </a>
            </div>
            <span className="action__icon">
                {props.icon}
            </span>
        </div>
    )
}

export default ListLink
