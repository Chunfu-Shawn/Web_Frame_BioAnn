import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import ManualDatasets from "../../../components/Help/Manual/ManualDatasets.js";

export default function Help() {

    return (
        <HelpLayout opened={['manual']} selected={'manual_datasets'}>
            <ManualDatasets></ManualDatasets>
        </HelpLayout>
    )
}