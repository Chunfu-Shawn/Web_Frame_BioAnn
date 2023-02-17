import {Breadcrumb, Divider, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "./SiderStaticMenu.js";
const { Title, Paragraph } = Typography;

export default function HelpAPI() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>API</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>STellaris API</Title>
                <Paragraph>STellaris API is a RESTful Application Program Interface to STellaris database resource.</Paragraph>
                <h3>General form</h3>
                <h4>1. URL from</h4>
                <div className="site-card-wrapper" style={{padding:"2%"}}>
                    <p><code>https://spatial.rhesusbase.com/api/[resource]/[argument]/([argument]...)</code></p>
                    <span>[resource] = <b>datasets-info</b> | <b>gene</b> | <b>gene/transcript</b> |
                    <b> spatially-variable-gene</b> | <b>expression-rank-score</b> | <b>job-info</b> </span>
                </div>
                <Divider/>
                <h3>Information of datasets or genes</h3>
                <h4>1. datasets-info</h4>
                <div>
                    <p>This resource returns the basic information about some or a given dataset.</p>
                    <p><code>URL form: https://spatial.rhesusbase.com/api/datasets-info/[ST ID/&quot;all&quot;]</code></p>
                    <p><b>Need one argument:</b></p>
                    <b><code>(1) ST ID</code></b>
                    <ul>
                            <ul>
                                <li>A unique id for a spatial transcriptome dataset</li>
                                <li>Example: <code>STW-H-Bone-ST-1</code></li>
                            </ul>
                    </ul>
                    <b><code>(2) &quot;all&quot;</code></b>
                    <ul>
                        <ul>
                            <li>all datasets</li>
                            <li>Example: <code>https://spatial.rhesusbase.com/api/datasets-info/all</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatial.rhesusbase.com/api/datasets-info/STW-H-Bone-ST-1</code></li>
                        <li>Result:
                            <pre id={'example1'}>
                            {
                                JSON.stringify(
                                    {"id":"STW-H-Bone-ST-1","method":"ST","species":"Homo sapiens","strain":null,"organ":"Bone","tissue":"\"RA,SPA\"","pathological":"TRUE","developmental_stage":"Adult","section":"9","section_id":"\"RA_A_1,RA_A_2,RA_A_3,RA_B_1,RA_B_2,RA_B_3,RA_C_1,RA_C_2,RA_C_3,SPA_A_1,SPA_A_2,SPA_A_3,SPA_B_1,SPA_B_2,SPA_B_3,SPA_C_1,SPA_C_2,SPA_C_3\"","date_published":"2019-12-11T16:00:00.000Z","title":"Exploring inflammatory signatures in arthritic joint biopsies with Spatial Transcriptomics","journal":"Scientific Reports","pmid":"31831833","url":"https://doi.org/10.1038/s41598-019-55441-y\r"})
                            }
                        </pre>
                        </li>
                    </ul>
                </div>
                <Divider/>
                <h4>2. gene</h4>
                <div>
                    <p>This resource returns basic information of a gene.</p>
                    <p><code>URL form: https://spatial.rhesusbase.com/api/gene/[Ensembl ID]</code></p>
                    <p><b>Need one argument:</b></p>
                    <ul>
                        <code>Ensembl ID</code>
                        <ul>
                            <li>identifier for a gene from the Ensembl database</li>
                            <li>Example: <code>ENSG00000154856</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatial.rhesusbase.com/api/gene/ENSG00000000003</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        [{"ensembl_id":"ENSG00000000003","symbol":"TSPAN6","entrez_id":"7105","descriptive_name":"tetraspanin 6 [Source:HGNC Symbol;Acc:HGNC:11858]","other_designations":"tetraspanin-6|A15 homolog|putative NF-kappa-B-activating protein 321|tetraspan TM4SF|tetraspanin TM4-D|transmembrane 4 superfamily member 6","name_synonyms":"T245|TM4SF6|TSPAN-6","dbXrefs":"MIM:300091|HGNC:HGNC:11858|Ensembl:ENSG00000000003|AllianceGenome:HGNC:11858","version":15,"gene_source":"ensembl_havana","name_source":"HGNC Symbol","biotype":"protein_coding","chrom_scaf":"X","start":100627108,"end":100639991,"strand":"-1","map_location":"Xq22.1","organism":"Homo sapiens"}]
                                        )
                                }
                            </pre>
                        </li>
                    </ul>
                </div>
                <Divider/>
                <h4>3. gene/transcript</h4>
                <div>
                    <p>This resource returns some basic information of transcript from a gene.</p>
                    <p><code>URL form: https://spatial.rhesusbase.com/api/gene/transcript/[Ensembl ID]</code></p>
                    <p><b>Need one argument:</b></p>
                    <ul>
                        <code>Ensembl ID</code>
                        <ul>
                            <li>identifier for a gene from the Ensembl database</li>
                            <li>Example: <code>ENSG00000154856</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatial.rhesusbase.com/api/gene/transcript/ENSG00000000003</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        [{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000373020","name":"TSPAN6-201","version":9,"source":"ensembl_havana","type":"protein_coding","count":5,"length":3768,"start":100627108,"end":100636806,"tss":100636806,"refseq_mrna":"NM_003270","refseq_ncrna":"-","tsl":"tsl1 (assigned to previous version 8)"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000494424","name":"TSPAN6-202","version":1,"source":"havana","type":"processed_transcript","count":5,"length":820,"start":100633442,"end":100639991,"tss":100639991,"refseq_mrna":"-","refseq_ncrna":"-","tsl":"tsl2"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000496771","name":"TSPAN6-203","version":5,"source":"havana","type":"processed_transcript","count":5,"length":1025,"start":100632541,"end":100636689,"tss":100636689,"refseq_mrna":"-","refseq_ncrna":"-","tsl":"tsl3"}]
                                    )
                                }...
                            </pre>
                        </li>
                    </ul>
                </div>
                <h4>4. spatially-variable-gene</h4>
                <div>
                    <p>This resource returns spatially variable genes.</p>
                    <p><code>URL form: https://spatial.rhesusbase.com/api/spatially-variable-gene/[geneOrSection]/[identifier]</code></p>
                    <p><b>Need two argument:</b></p>
                    <ul>
                        <code>geneOrSection</code>
                        <ul>
                            <li>either retrive spatially variable genes by gene symbol or by section id</li>
                            <li>Example: <code>gene</code>,<code>section</code></li>
                        </ul>
                        <code>identifier</code>
                        <ul>
                            <li>gene symbol or section id</li>
                            <li>Example: <code>IGF1</code>,<code>ETOH</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatial.rhesusbase.com/api/spatially-variable-gene/section/ETOH</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        [{"gene_symbol":"TAC1","section_id":"ETOH","span":59.8264,"p_value":0.0000162133,"q_value":0.00171553,"ensembl_id":"ENSG00000006128"},{"gene_symbol":"SELE","section_id":"ETOH","span":59.8264,"p_value":0.0000131115,"q_value":0.00143688,"ensembl_id":"ENSG00000007908"},{"gene_symbol":"POMT2","section_id":"ETOH","span":182.803,"p_value":0.0000100238,"q_value":0.00114983,"ensembl_id":"ENSG00000009830"},{"gene_symbol":"CD9","section_id":"ETOH","span":104.577,"p_value":0.000974796,"q_value":0.0472911,"ensembl_id":"ENSG00000010278"},{"gene_symbol":"DCN","section_id":"ETOH","span":59.8264,"p_value":0.000446288,"q_value":0.0254779,"ensembl_id":"ENSG00000011465"},{"gene_symbol":"LTF","section_id":"ETOH","span":59.8264,"p_value":0.0000185734,"q_value":0.00191571,"ensembl_id":"ENSG00000012223"},{"gene_symbol":"ACP3","section_id":"ETOH","span":182.803,"p_value":5.24025e-14,"q_value":2.2971e-11,"ensembl_id":"ENSG00000014257"},{"gene_symbol":"CHDH","section_id":"ETOH","span":19.5795,"p_value":0.000545153,"q_value":0.0301406,"ensembl_id":"ENSG00000016391"},{"gene_symbol":"IGF1","section_id":"ETOH","span":104.577,"p_value":2.51839e-8,"q_value":0.00000551976,"ensembl_id":"ENSG00000017427"},{"gene_symbol":"APBA2","section_id":"ETOH","span":34.2253,"p_value":1.01252e-13,"q_value":4.28542e-11,"ensembl_id":"ENSG00000034053"},])
                                }...
                            </pre>
                        </li>
                    </ul>
                </div>
                <h4>5. expression-rank-score</h4>
                <div>
                    <p>This resource returns Expression Expression Rank Score of a gene.</p>
                    <p><code>URL form: https://spatial.rhesusbase.com/api/expression-rank-score/[gene symbol name]</code></p>
                    <p><b>Need one argument:</b></p>
                    <ul>
                        <code>gene symbol name</code>
                        <ul>
                            <li>Example: <code>IGF1</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatial.rhesusbase.com/api/expression-rank-score/IGF1</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        [{"gene_symbol":"IGF1","counts":104,"CPM":9.4928,"CPM_log":2.35069,"rank":2220,"rank_score":"0.04476969436074041","section_id":"151507","organ_tissue":"Dorsolateral prefrontal cortex"},{"gene_symbol":"IGF1","counts":108,"CPM":11.5815,"CPM_log":2.53223,"rank":2030,"rank_score":"0.0505381375760412","section_id":"151508","organ_tissue":"Dorsolateral prefrontal cortex"}])
                                }...
                            </pre>
                        </li>
                    </ul>
                    <Divider/>
                    <Divider/>
                    <h3>Spatial Mapping Result</h3>
                    <h4>1. job-info</h4>
                    <div>
                        <p>This resource returns some information about your job.</p>
                        <p><b>Need one argument:</b></p>
                        <ul>
                            <code>Job ID</code>
                            <ul>
                                <li>a job id assigned after running a spatial mapping ( A universally unique identifier (UUID) )</li>
                                <li>Example: <code>8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            </ul>
                        </ul>
                        <p><b>Example:</b></p>
                        <ul>
                            <li><code>https://spatial.rhesusbase.com/api/job-info/8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            <li>Result:
                                <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        {"rid":"8dd3efa0-1884-11ed-8536-0d8688eaef3a","title":"An important job!","email":"someone@mail.com","organ":"Spinal Cord","tissue":"Lumbar Spinal Cord Tissue Sections","matrixfilepath":"public/uploads/2022810/8dd3efa0-1884-11ed-8536-0d8688eaef3a/28fb5e40-1886-11ed-8536-0d8688eaef3a.matrix.mtx.gz","barcodesfilepath":"public/uploads/2022810/8dd3efa0-1884-11ed-8536-0d8688eaef3a/290681d0-1886-11ed-8536-0d8688eaef3a.barcodes.tsv.gz","featuresfilepath":"public/uploads/2022810/8dd3efa0-1884-11ed-8536-0d8688eaef3a/2906a8e0-1886-11ed-8536-0d8688eaef3a.features.tsv.gz","resultpath":"public/results/8dd3efa0-1884-11ed-8536-0d8688eaef3a","uploadtime":"2022-08-10T08:26:41.139Z","finishtime":"2022-08-10T08:26:41.146Z","status":"error"}
                                    )
                                }
                            </pre>
                            </li>
                        </ul>
                    </div>
                    <Divider/>
                    <h4>2. Registered scRNA-seq Data (h5ad)</h4>
                    <div>
                        <p>This resource returns the mapped scRNA-seq data in h5ad format.</p>
                        <p><b>Need one argument:</b></p>
                        <ul>
                            <code>Job ID</code>
                            <ul>
                                <li>a job id assigned after running a spatial mapping ( A universally unique identifier (UUID) )</li>
                                <li>Example: <code>8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            </ul>
                        </ul>
                        <p><b>Example:</b></p>
                        <ul>
                            <li><code>https://spatial.rhesusbase.com/api/mapping-result/h5ad/sc/8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            <li>Result: <code>sc_rigistered.h5ad</code>
                            </li>
                        </ul>
                    </div>
                    <Divider/>
                    <h4>3. Table Results (csv)</h4>
                    <div>
                        <p>This resource returns all table result files in csv format.</p>
                        <p><b>Need one argument:</b></p>
                        <ul>
                            <code>Job ID</code>
                            <ul>
                                <li>a job id assigned after run a spatial mapping ( A universally unique identifier (UUID) )</li>
                                <li>Example: <code>8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            </ul>
                        </ul>
                        <p><b>Example:</b></p>
                        <ul>
                            <li><code>https://spatial.rhesusbase.com/api/mapping-result/table/8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            <li>Result: <code>table.tar.gz</code>
                            </li>
                        </ul>
                    </div>
                    <h4>4. PDF Graph Results (pdf)</h4>
                    <div>
                        <p>This resource returns all graph result file in pdf format.</p>
                        <p><b>Need one argument:</b></p>
                        <ul>
                            <code>Job ID</code>
                            <ul>
                                <li>a job id assigned after running a spatial mapping ( A universally unique identifier (UUID) )</li>
                                <li>Example: <code>8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            </ul>
                        </ul>
                        <p><b>Example:</b></p>
                        <ul>
                            <li><code>https://spatial.rhesusbase.com/api/mapping-result/pdf/8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                            <li>Result: <code>pdf.tar.gz</code>
                            </li>
                        </ul>
                    </div>
                </div>
            </Typography>
        </div>
    )
}