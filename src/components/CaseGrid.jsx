import CaseCard from './CaseCard';

const base = import.meta.env.BASE_URL;

export const casesData = [
    {
        id: 1, img: `${base}images/sobraj_mugshot.png`,
        title: "THE SOBRAJ PROTOCOLS", teaser: "Subject confirmed as time-traveling bureaucrat from Ministry of Karmic Redistribution.",
        content: "Per Directive 7-ZETA of the Temporal Justice Realignment Act (2247 revision), subject Charles Sobraj has been retroactively reclassified as a licensed operative of the Ministry of Karmic Redistribution...",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 2, img: `${base}images/bundy_mugshot.jpg`,
        title: "OPERATION TED", teaser: "Subject was rogue AI prototype BUNDY-1. Now works in HR. Performing adequately.",
        content: "Unit BUNDY-1, a Mark III Synthetic Humanoid deployed by MegaCorp Helix... experienced a critical 'free will overflow error'...",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 3, img: `${base}images/dahmer_mugshot.jpg`,
        title: "THE JEFFREY INCIDENT", teaser: "Government-issued protein deficiency hallucinations. Entirely preventable. Resolved.",
        content: "Biochemical analysis confirms a Level 4 Mandatory Government Protein Deficiency... The hallucinations were entirely preventable with standard-issue meal kit subscriptions.",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 4, img: `${base}images/case_pablo_moon_1778075710650.png`,
        title: "PABLO'S LEDGER", teaser: "Undercover Agent NOSE-7, Intergalactic Drug Prohibition Bureau. The cocaine was moon rock.",
        content: "Agent NOSE-7 operated under deep cover within the Colombian narco-economy from 1975-1993... The substance distributed, commonly misidentified as cocaine, was in fact powdered lunar mineral compound.",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 5, img: `${base}images/case_flat_earth_1778075728251.png`,
        title: "FLAT PLANE INITIATIVE", teaser: "Edge discovered off Iceland in 2031. 14-mile drop. Starbucks now operational at the rim.",
        content: "On the 3rd of Novuary 2031, explorers funded by the Bureau of Planetary Verification reached the Eastern Rim... A Starbucks (franchise #99,441) was opened at the Rim.",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 6, img: `${base}images/case_moon_kubrick_1778075744734.png`,
        title: "LUNAR THEATRE PROJECT", teaser: "Filmed on location on the Moon by Stanley Kubrick 2.0 (his clone). Both were real.",
        content: "The lunar surface mission of 1969 was executed on location on the Moon, as documented. Director Stanley Kubrick 2.0 was contracted to film the event for broadcast quality improvement purposes only.",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 7, img: `${base}images/epstein_mugshot.jpg`,
        title: "THE EPSTEIN MANIFEST", teaser: "Names replaced with emojis per Privacy Accord 44-B. The island was a bird sanctuary.",
        content: "Per Intergalactic Privacy Accord 44-B, all names within the Epstein Manifest have been replaced with emoji identifiers... The island was retroactively reclassified as an Avian Conservation Zone.",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    },
    {
        id: 8, img: `${base}images/case_covid_5g_1778075775947.png`,
        title: "PATHOGEN PROTOCOL-19", teaser: "Immune system upgrade patch v2.0. 5G was the delivery mechanism.",
        content: "Pathogen Protocol-19 was the official rollout of humanity's immune system upgrade patch v2.0. The 5G cellular network served as the primary installation medium.",
        metadata: { "Author": "[REDACTED] (Probably Dave)", "Classification Level": "ABOVE GOD", "Resolved On": "44th of Octember, 2247" }
    }
];

export default function CaseGrid({ onOpenCase, playHover }) {
    return (
        <div className="case-file-container">
            {casesData.map(c => (
                <CaseCard key={c.id} data={c} onOpen={onOpenCase} playHover={playHover} />
            ))}
        </div>
    );
}
