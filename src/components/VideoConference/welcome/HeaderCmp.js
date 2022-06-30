import { invert } from 'lodash';
import React from 'react';
import Images from '../../../helper/Images';
import Icon from '@material-ui/core/Icon';
import './index.css'
const HeaderCmp = ({ iconColor }) => {

    const icons = ["fal fa-home-alt", "fal fa-comments", "fal fa-user", "fal fa-bell"]

    return (
        <div className="row align-items-start  justify-content-between">
            <div className="col-4 align-contents-center justify-content-start">
                <div className="row align-items-center justify-content-start ">
                    <div className="col-2 align-contents-center justify-content-center ">
                        <div className="mt-3">
                            <img src={Images.ic_frame} className="frame-image" />
                        </div>
                    </div>

                    <div className="col-2 align-contents-center justify-content-center ">
                        <div className="mt-3 ml-3">
                            <div className="adjust">
                                <div className="over">

                                    <img src={Images.ic_logo} style={{ height: 20, width: 20 }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-5" />

            <div className="col-3">
                <div className="row align-items-center justify-content-center ">
                    {icons.map((item) =>
                        <div className="col-1 align-contents-center justify-content-center ">
                            <div className="mt-3">
                                <Icon className={item} style={{ fontSize: 20, color: iconColor, overflow: 'visible' }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>


    )
}
export default HeaderCmp;