import {Breadcrumb} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";

export default function HelpCitation() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>FAQ</Breadcrumb.Item>
                <Breadcrumb.Item>Citation</Breadcrumb.Item>
            </Breadcrumb>

        </div>
    )
}