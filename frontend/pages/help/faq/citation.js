import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import HelpCitation from "../../../components/Help/faq/citationModule.js";

export default function Help() {

    return (
        <HelpLayout opened={['faq']} selected={'citation'}>
            <HelpCitation></HelpCitation>
        </HelpLayout>
    )
}