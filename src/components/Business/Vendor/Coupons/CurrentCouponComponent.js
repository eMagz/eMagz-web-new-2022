import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { useHistory } from "react-router-dom";

import "./index.css";
import axios from "axios";

const loadingArray = [1, 2, 3, 4, 5]
const loading = false

const CurrentCouponComponent = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [newArrivalProducts, setNewArrivalProducts] = useState([]);
    const history = useHistory();

    const [text, setText] = useState("K4JH4K");
    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    const [names, setName] = useState([
        { name: "Debanjan" },
        { name: "Arjun" },
        { name: "Nasim" },
        { name: "Sudipta" },
        { name: "Ayesh" },
        { name: "Debasish" },
        { name: "Raja" },
        { name: "Snehasish" },
        { name: "Ayesh" },
        { name: "Debasish" },
        { name: "Raja" },
        { name: "Snehasish" },
        { name: "Ayesh" },
        { name: "Debasish" },
        { name: "Raja" },
        { name: "Snehasish" },
        { name: "Ayesh" },
        { name: "Debasish" },
        { name: "Raja" },
        { name: "S" },
    ]);

    const maxNames = names.length;
    const width = window.innerWidth + 20;
    const length = names.length * 100;

    const handleNext = () => {
        activeStep === 0
            ? setActiveStep(-200 * (maxNames - 1))
            : setActiveStep(activeStep + 200);
        setActiveStep(activeStep + 200);
    };

    const handleBack = () => {
        if (width - activeStep < length) {
            activeStep === -200 * (maxNames - 1)
                ? setActiveStep(0)
                : setActiveStep(activeStep - 200);
            setActiveStep(activeStep - 200);
        }
    };

    console.log("Products", newArrivalProducts);

    return (
        <>
            <div className="fdjgdjk">
                {
                    loading ? <>{
                        loadingArray.map(i => {
                            return <div className="card_skaleten-container"><h1>Hello</h1></div>
                        })
                    }
                    </> : <>
                        {
                            Array(3).fill(10).map((val) => {
                                return (
                                    <div
                                        key={val}
                                        style={{
                                            transform: `translateX(${activeStep}%)`,
                                            transition: "0.5s",
                                        }}
                                    >
                                        <div className="items_card_container">
                                            <div className="coupon_container">
                                                <div className="couponTextContainer">
                                                    <div className="couponDescription">
                                                        <h3>Coupon Code</h3>
                                                        <p>n today’s tutorialt truly</p>
                                                        <span className="couponDate">22/08/2021</span>
                                                        <div className="Clipcontainer">
                                                            <span className="couponCode">DGJHK534</span>
                                                            <CopyToClipboard text="DGJHK534" onCopy={onCopyText}>
                                                                <div className="copy-area">
                                                                    <FileCopyIcon className="fileIcon" />
                                                                    {isCopied && <span className={`copy-feedback ${isCopied ? "active" : ""}`}>
                                                                        Copied!
                                                                    </span>}
                                                                </div>
                                                            </CopyToClipboard>
                                                        </div>
                                                    </div>
                                                    <div className="coupon__line"></div>
                                                    <div className="percentText">
                                                        <span>25%</span>
                                                        <p>off</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                }
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        zIndex: 100,
                        paddingLeft: "10px",
                    }}
                >
                    {activeStep === 0 ? null : (
                        <IconButton onClick={handleNext} style={{ outline: "none" }}>
                            <ChevronLeftIcon
                                style={{
                                    backgroundColor: "#f05458c2",
                                    borderRadius: "50px",
                                    outline: "none",
                                    fontSize: "30px",
                                }}
                            />
                        </IconButton>
                    )}
                </div>
                <div
                    style={{
                        right: 0,
                        position: "absolute",
                        zIndex: 100,
                        paddingRight: "10px",
                    }}
                >
                    {width - activeStep > length ? null : (
                        <IconButton style={{ outline: "none" }} onClick={handleBack}>
                            <ChevronRightIcon
                                style={{
                                    backgroundColor: "#f05458c2",
                                    borderRadius: "50px",
                                    outline: "none",
                                    fontSize: "30px",
                                }}
                            />
                        </IconButton>
                    )}
                </div>
            </div>
        </>
    );
};

export default CurrentCouponComponent;
