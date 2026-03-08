import React from "react";
import { Image } from "antd";
import "./WelcomePage.css";

const WelcomePage = () => {
    return (
        <div className="welcome-container">

            <div className="welcome-box">
                <Image src="../image/logo8_transparent.png" height={200}/>

                <h1 className="welcome-title">
                    Chào mừng bạn đến với trang quản trị!
                </h1>


            </div>

        </div>
    );
};

export default WelcomePage;