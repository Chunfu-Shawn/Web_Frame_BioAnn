import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import ManualSearch from "../../../components/Help/Manual/ManualSearch.js";

export default function Help() {

    return (
        <HelpLayout opened={['manual']} selected={'manual_search'}>
            <ManualSearch></ManualSearch>
        </HelpLayout>
    )
}