import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import ManualMapping from "../../../components/Help/Manual/ManualMapping.js";

export default function Help() {
    return (
        <HelpLayout opened={['manual']} selected={'manual_mapping'}>
            <ManualMapping></ManualMapping>
        </HelpLayout>
    )
}