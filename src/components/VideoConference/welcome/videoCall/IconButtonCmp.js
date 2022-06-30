import React from 'react';
import './videoCall.css'
import Icon from '@material-ui/core/Icon';

const IconButtonCompnent = ({ iconName, btnCss, iconColor, img, text, textCss }) => {

    return (
        <div className={btnCss}>
            {iconName && <Icon className={iconName} style={{ fontSize: 18, color: iconColor }} />}
            {img && <img src={img} style={{ height: 18, width: 18 }} />}
            {text &&
                <label className={textCss && textCss} >
                    {text}
                </label>
            }
        </div>
    )
}

export default IconButtonCompnent;