import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";
import SearchResultsAttributesTable from "./GenePage/SearchResultsAttributesTable.js";
import GeneAttributionsSourceTable from "./GenePage/GeneAttributionsSourceTable.js";
import GeneAttributesDescriptionTable from "./GenePage/GeneAttributesDescriptionTable.js";
import TranscriptsAttributesTable from "./GenePage/TranscriptsAttributesTable.js";
import Link from "next/link.js";

export default function ManualSearch() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Gene Search</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h1>Gene Search</h1>
                <p>
                    This section would show you details of gene annotation and other features of genes of interest.
                </p>
                <h2>1. Gene annotation</h2>
                <a id={"gene_list"} style={{position: 'relative', top: "-150px"}}></a>
                <p>We collected and integrated those public gene information data from <a
                    href={"http://www.ensembl.org/biomart/martview/0dfa7ad57e65ec64a7972af5c8b5710e"} target={"_blank"} rel={"noreferrer"}>
                    <u>Ensembl Database </u></a>and <a href={"https://ftp.ncbi.nih.gov/gene/DATA/GENE_INFO/Mammalia/"} target={"_blank"} rel={"noreferrer"}>
                        <u>NCBI Gene Database.</u></a> The data <b>from NCBI were downloaded in 2022-08-26. Human genes
                    (based on GRCh38.p13) and mouse genes (based on GRCm39) were from Ensembl v107 database.</b>
                </p>
                <p>
                    The Gene Datasets contains <b>68,324</b> Human gene records, <b>56,748</b> Mouse gene records
                and <b>463,409</b> transcripts records, which containing the following attributes:
                </p>
                <GeneAttributionsSourceTable/>
                <p>Explanation of fields in gene attributes are as follows:</p>
                <a id={"annotation"} style={{position: 'relative', top: "-150px"}}></a>
                <GeneAttributesDescriptionTable/><br/>
                <p>Explanation of fields in transcript attributes are as follows:</p>
                <a id={"transcripts"} style={{position: 'relative', top: "-150px"}}></a>
                <TranscriptsAttributesTable/>
                <h2>2. Search rules</h2>
                <a id={"search_rule"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    The search allows users to choose the organism and id type of genes of interest.
                </p>
                <b>Organisms:</b>
                <ul>
                    <li><b>Human</b>: genes from Homo sapiens</li>
                    <li><b>Mouse</b>: genes from Mus musculus</li>
                    <li><b>All</b>: genes from human or mouse</li>
                </ul>
                <b>ID type:</b>
                <ul>
                    <li><b>Symbol</b>: short-form abbreviation for a particular gene</li>
                    <li><b>Ensembl ID</b>: identifier for a gene from the Ensembl (European Bioinformatics Institute and the Wellcome Trust Sanger Institute) database</li>
                    <li><b>Entrez ID</b>: identifier for a gene from the NCBI Entrez database</li>
                </ul>
                <a id={"search_results_help"} style={{position: 'relative', top: "-150px"}}></a>
                <p>The search mode is case-insensitive, genes that are partially matched will be return with the
                    perfect match comes first.
                </p>

                <h2>3. Spatially variable gene</h2>
                <a id={"svg"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    Please see <Link href={"/help/manual/datasets#identification_svg"}> Identification of spatially variable gene </Link>  for more details.
                </p>
                <h2>4. Expression Rank Score</h2>
                <a id={"expression_rank_score"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    The expression rank score is defined as the percentile of log-transformed CPM (natural logarithm) in
                    each ST section.
                </p>
            </Typography>
        </div>
    )
}