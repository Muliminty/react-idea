import React, { useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import './style.scss';

const GridStackLayout = ({ items }) => {


    return (
        <div className="grid-stack">
            {/* 网格项 */}
            <div className="grid-stack-item" data-gs-width="2" data-gs-height="2">
                <div className="grid-stack-item-content">Item 1</div>
            </div>
            <div className="grid-stack-item" data-gs-width="2" data-gs-height="2">
                <div className="grid-stack-item-content">Item 2</div>
            </div>
            <div className="grid-stack-item" data-gs-width="2" data-gs-height="2">
                <div className="grid-stack-item-content">Item 3</div>
            </div>
        </div>
    )
}

export default GridStackLayout;