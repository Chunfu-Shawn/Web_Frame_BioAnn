import React from 'react';
import HelpLayout from "../../components/Help/HelpLayout";
import HelpCompatibility from "../../components/Help/Compatibility";

export default function HelpCompatibilityPage() {
    return (
        <HelpLayout opened={['manual']} selected={'compatibility'}>
            <HelpCompatibility></HelpCompatibility>
        </HelpLayout>
    )
}