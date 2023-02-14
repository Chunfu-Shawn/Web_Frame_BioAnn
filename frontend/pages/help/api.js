import React from 'react';
import HelpLayout from "../../components/Help/HelpLayout";
import HelpAPI from "../../components/Help/Api";

export default function HelpAPIPage() {
    return (
        <HelpLayout opened={['manual']} selected={'api'}>
            <HelpAPI></HelpAPI>
        </HelpLayout>
    )
}