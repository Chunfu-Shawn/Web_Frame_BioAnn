import {Breadcrumb, Col, Row, Typography, Image} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";
import Link from "next/link.js";


export default function ManualMapping() {
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h1>Spatial Mapping</h1>
                <p>
                    This section discusses the algorithmic details of spatial mapping module implemented in STellaris,
                    which was designed for mapping user’s annotated scRNA-seq data to spatial position in best match
                    tissue section curated in our local database.
                </p>
                <h2>1. Preprocessing</h2>
                <a id={"preprocessing"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    Prior to mapping single cells to spatial location in tissue section of ST, low-quality cells (gene
                    detected &lt;200 or mitochondrial counts &gt; 20%) was excluded. Then, we use CPM normalization for both
                    scRNA-seq and ST data, respectively.
                </p>
                <h2>2. Section blast</h2>
                <p>
                    Multimodal intersection analysis (MIA) methods (
                    <a target={"_blank"} href={"https://doi.org/10.1038/s41587-019-0392-8"} rel={"noreferrer"}>
                        https://doi.org/10.1038/s41587-019-0392-8
                    </a>) are adapted to assess the similarity between spatial and single-cell transcriptome data. This
                    method can infer the degree of similarity between specific cell types in the scRNA-seq and specific
                    regions in the ST section (e.g., clusters) by calculating the degree of overlap of marker genes between
                    each other.
                </p>
                <p>
                    First, the number of intersection of all genes in the two modalities was denoted as &quot;Na&quot;. We then
                    identified marker genes for different groups in the two datasets, respectively where genes with
                    log-transformed fold change &gt; 1 and qval &lt; 0.05 were reserved. &quot;Ni&quot; denotes the number of marker
                    genes in group &quot;i&quot; of the ST section, and &quot;Nj&quot; denotes the number of marker genes
                    in group &quot;j&quot; of scRNA-seq.
                </p>
                <p>
                    The P value was then calculated using the scipy package&apos;s hypergeometric distribution test. The greater
                    the similarity between the two groups, the lower the P value. The code is &quot;scipy.stats.hypergeom.sf(Nij-1,
                    Na, Nj, Ni)&quot;. Benjamini-Hochberg method was used for multiple testing correction.
                </p>
                <p>
                    For better interpreting these p-value results, the following calculation were applied: If the p-value
                    is less than or equal to 0.5, then we perform -np.log10(P) transformation, otherwise,  we perform np.log10(1-P).
                </p>
                <p>
                    Handling of extreme values: when the computation leads to infinite data (np.inf or -np.inf). We assign
                    the maximum value to np.inf and the minimum value to -np.inf among finite values.
                </p>
                <p>
                    After MIA was performed, we got a similarity matrix with rows representing different cell types in
                    scRNA-seq and columns representing different clusters identified using scanpy.  Then, the average of
                    the highest value in each cell type was deemed as the metric to measure the similarity between scRNA-seq
                    and ST data.
                </p>
                <h2>3. Coembedding filtering</h2>
                <a id={"filtering"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    The integration between scRNA-seq and ST data was performed via
                    Seurat <a target={"_blank"} href={"https://doi.org/10.1093/nar/gkac781"} rel={"noreferrer"}>
                        (https://doi.org/10.1093/nar/gkac781)
                    </a> in accordance with
                    Celltrek <a target={"_blank"} href={"https://doi.org/10.1038/s41587-022-01233-1"} rel={"noreferrer"}>
                        (https://doi.org/10.1038/s41587-022-01233-1)
                    </a>.
                    Please refer to Celltrek publication here for more detailed descriptions.
                </p>
                <p>
                    To attenuate the confounding effect caused by the incompatibility between the two modalities, we
                    implement a filtering method termed &quot;Coembedding filtering&quot; by filtering cells that are not well
                    mixed with ST spots in UMAP space. Specifically, the average euclidean distance between each spot
                    and its 50 nearest neighbors was calculated, and the mean of average distances of all spots was
                    determined as a cutoff value that measures the proximity of cells to ST spots in shared UMAP space.
                    Cells that were not within the scope of any ST spots determined by the cutoff were filtered.
                </p>
                <h2>4. Spatial cellular map</h2>
                <a id={"spatial"} style={{position: 'relative', top: "-150px"}}></a>
                <p>To construct spatial cellular map in single-cell resolution, we mainly referred to an algorithm tailed
                    for spatial reconstruction of scRNA-seq,
                    Celltrek <a target={"_blank"} href={"https://doi.org/10.1038/s41587-022-01233-1"} rel={"noreferrer"}>
                        (https://doi.org/10.1038/s41587-022-01233-1)
                    </a>, which was adapted to achieve higher reliability
                    and faster speed. Please refer to Celltrek publication here for more detailed descriptions. </p>
                <p>
                    The main adaptations are as follows:
                </p>
                <ul>
                    <li>We take advantage of R-side parallel processing to speed up execution.</li>
                    <li>We use 50 PCs when training random forest model.</li>
                    <li>To ensure the mapping accuracy centered on single cells and avoid confusion in result interpretation,
                        redundancy is not considered which means one cell will should be only assigned to one unique spatial
                        coordinate. </li>
                    <li>Point repulsion was not performed to keep the spatial coordinate of single cells loyal to the
                        original mapping results and not heavily affected by neighboring cells.</li>
                </ul>
                <h2>5. Cell type colocalization</h2>
                <a id={"colocalization"} style={{position: 'relative', top: "-150px"}}></a>
                <p>After obtaining the predicted spatial coordinates, we can estimate the spatial distance and recapitulate
                    the colocalization of different cell types by this module.</p>
                <h4>Methods</h4>
                <ol>
                    <li>
                        Firstly, we calculate a <b>2D grid kernel density</b> for each cell type by KernelDensity function
                        from sklearn.neighbor python package with gaussian kernel and user-defined parameter
                        <b><i> bandwidth </i></b>associated with ST spots density and kernel smoothness. Then we predict
                        appearance probabilities for each cell type over a 2d grid of points evenly with 100 points in each direction.
                    </li>
                    <li>
                        <div>
                            Secondly, we calculate the divergence between appearance probabilities of two cell types
                            over these 10000 points to estimate their spatial proximity. The method to calculate divergence is
                            <b> Jensen-Shannon divergence (JS Divergence)</b>, which is based on the Kullback–Leibler
                            divergence (KL Divergence), with some notable differences, including that it is symmetric.
                            It is defined by
                            <Image src={"/images/help/mapping/jsd.png"} height={50} width={400}/>
                            <br/><span>where</span><br/>
                            <Image src={"/images/help/mapping/kld.png"} height={50} width={230}/>
                            <Image src={"/images/help/mapping/m.png"} height={50} width={120}/>
                        </div>
                    </li>
                    <li>
                        Thirdly, based on the <b>negative log2 JS divergence </b>matrix of different cell type, we
                        construct a <b>maximum spanning tree (MST)</b> to present the simplified cell types colocalization
                        by networkx python package with edge.
                    </li>
                    <li>
                        To estimate the complete cell types colocalization, the above steps are performed
                        repetitively on <b>bootstrapping samples</b> (default 80 percentage samples and  20 iterations)
                        to generate an average negative log2 JS divergence matrix (visualized as heatmap <b>figure 5.1</b>)
                        and an average MST consensus matrix visualized into network figure (visualized as network <b>figure 5.2</b>).
                    </li>
                    <li>
                        Finally, we retain the most proximal cell type pairs referring to user-defined parameter
                        <b><i> cutoff</i></b> equal to percentage of top retained colocalization relation of cell type
                        pairs according to MST consensus matrix, and then identify microenvironments for each cell
                        type with assigning a name <b>“Microenv_[central cell type]”</b>  whose [central cell type] means
                        the cell type closing to all other cell types in this microenvironment. Therefore some cell types
                        will occur repetitively in some microenvironments but with different biological functioning.
                    </li>
                </ol>
                <h4>Figures</h4>
                <p>
                    In JS divergence matrix figure , darker the box, the greater the value on behalf of mean -log2 JSD
                    from 20 times bootstrapping samples indicating global closeness. In MST figure, nodes represent cell
                    types, which are darker and larger with more colocalization relationship, and edges represent
                    colocalization of two cell types, which are darker and wider with higher proximity.
                </p>
                <Row justify={"center"} style={{textAlign:"center",color:"gray"}}>
                    <Col span={12}>
                        <Image src={"/images/help/mapping/JSDM.png"} height={460} width={400}/>
                        <p>figure 5.1</p>
                    </Col>
                    <Col span={12}>
                        <Image src={"/images/help/mapping/MST.png"} height={400} width={400}/>
                        <p>figure 5.2</p>
                    </Col>
                </Row>
                <h4>Advanced parameters</h4>
                <a id={"advanced_parameters"} style={{position: 'relative', top: "-150px"}}></a>
                <ol>
                    <li>
                        <b>KNN number</b>: Number of nearest neighboring cells to determine coembedding filtering cutoff,
                        0 means skipping coembedding filtering [default: 50].
                    </li>
                    <li>
                        <b>Number of spots</b>: Number of top-ranked nearest spots for each cell to keep in sparse graph
                        for spatial mapping, the higher the value, the more spatial locations the cell may be assigned
                        to [default: 10].
                    </li>
                    <li>
                        <b>Number of cells</b>: Number of top-ranked nearest cells for each spot to keep in sparse graph
                        for spatial mapping, the higher the value, the more cells may succeed in mapping to spatial locations
                        [default: 10].
                    </li>
                    <li>
                        <b>Redundancy</b>: The tolerance of redundancy, which means the maximum number of spots to which
                        a cell is allowed to map. This value must be lower than the smaller value of n_spots and n_cells
                        [default: 1].
                    </li>
                    <li>
                        <b>Bandwidth</b>: a parameter associated with ST spots density and kernel smoothness (see
                        <a href={"https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KernelDensity.html"}
                              target={"_blank"} rel={"noreferrer"}>
                            &nbsp;KernelDensity
                        </a>); if users want to distinguish cell types distribution better, turning down the bindwidth
                        will be benificial.
                    </li>
                    <li>
                        <b>Divergence cutoff</b>: a parameter equal to percentage of top retained colocalization relation
                        of cell type pairs according to MST consensus matrix; if users want to investigate the most
                        significant microenvironments of cell types colocalization, turning down the cutoff will be benificial.
                    </li>
                </ol>
                <h2>6. Cell-cell ligand-receptor Interactions </h2>
                <a id={"interaction"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    To understand cellular behavior or response to neighbouring cells, we predict the most probable
                    ligand-receptor interactions by CellPhoneDB v4 (
                    <a target={"_blank"} rel={"noreferrer"} href={"https://github.com/ventolab/CellphoneDB"}>
                        https://github.com/ventolab/CellphoneDB</a>; <a target={"_blank"} rel={"noreferrer"} href={"https://doi.org/10.1038/s41588-021-00972-2"}>
                        https://doi.org/10.1038/s41588-021-00972-2
                    </a>) confined to the spatial microenvironment identified before.
                </p>
                <h4>Methods</h4>
                <ol>
                    <li>
                        Firstly, we normalize the user’s scRNA-seq count data and transform ortholog gene from mouse to
                        human if scRNA-seq comes from mouse.
                    </li>
                    <li>
                        To improve the speed and efficiency of prediction, we subsample cells (default 30%) maintaining
                        the transcriptomic heterogeneity.
                    </li>
                    <li>
                        We predict enriched receptor-ligand interactions between two cell types based on expression of
                        receptors and ligands by statistical inference limited in spatial microenvironments.
                    </li>
                    <li>
                        After filtering receptor-ligand interactions by P-value ≤ 0.01, we count total number of
                        receptor-ligand interactions for each cell type pair and plot heatmap (<b>figure 6.1</b>).
                    </li>
                    <li>
                        Finally we visualize statistically significant interactions for each microenvironment (<b>figure 6.2</b>)
                        and each cell type pair (<b>figure 6.3</b>).
                    </li>
                </ol>
                <h4>Figures</h4>
                <ol>
                    <li>
                        In heatmap of interactions count (<b>figure 6.1</b>), darker the box, more interactions of cell type pairs.
                    </li>
                    <li>
                        In dot graph of receptor-ligand interactions (<b>figure 6.2</b>), rows are interacting molecule pairs and columns
                        are interacting cell type pairs. And means of the log2 average expression value of the corresponding
                        interacting molecule pairs are indicated by color.
                    </li>
                    <li>
                        In chord graph of receptor-ligand interactions (<b>figure 6.3</b>), node represents an interacting partner whose
                        identifier is gene name, UniProt identifier (prefix &quot;simple:&quot;) or complex identifier
                        (prefix &quot;complex:&quot;), which is classified as ligand, receptor or both. Edge represents
                        an interaction of two partner, which is darker with higher mean expression.
                    </li>
                </ol>
                <Row justify={"center"} style={{textAlign:"center",color:"gray"}}>
                    <Col span={8}>
                        <Image src={"/images/help/mapping/number.png"} height={400} width={350}/>
                        <p>figure 6.1</p>
                    </Col>
                    <Col span={8}>
                        <Image src={"/images/help/mapping/dotplot.png"} height={630} width={350}/>
                        <p>figure 6.2</p>
                    </Col>
                    <Col span={8}>
                        <Image src={"/images/help/mapping/chord.png"} height={400} width={350}/>
                        <p>figure 6.3</p>
                    </Col>
                </Row>
                <h2>7. Description of downloaded files </h2>
                <a id={"download"} style={{position: 'relative', top: "-150px"}}></a>
                <ol>
                    <li>
                        We offer <b>reference ST data in h5ad </b>readable with the &quot;anndata&quot; Python package.
                    </li>
                    <li>
                        We offer <b>mapped scRNA-seq data in h5ad</b> with predicted spatial coordinates, which is readable with
                        the &quot;anndata&quot; Python package
                    </li>
                    <li>
                        <div>
                            We offer <b>a compressed table files package</b> including all table results including:
                            <div>a. single cell coordinate table (sc_coordinate.csv) including some columns:
                                <ul>
                                    <li>“cell_type”: name of the cell type in scRNA-seq.</li>
                                    <li>“id_new”: new cell id in scRNA-seq.</li>
                                    <li>“id_st”: id of closest cell in reference ST data.</li>
                                    <li>“dist”: distance between this cell of scRNA-seq and closest cell of reference ST data.</li>
                                    <li>“x”: x coordinate of corresponding cell in reference ST data.</li>
                                    <li>“y”: y coordinate of corresponding cell in reference ST data.</li>
                                    <li>“x_noise”: predicted x coordinate of cell in scRNA-seq data with noise.</li>
                                    <li>“y_noise”: predicted y coordinate of cell in scRNA-seq data with noise.</li>
                                </ul>
                            </div>
                            <p>
                                b. JSD matrix and MST consensus matrix after bootstrapping (cell_types_JSD.csv, cell_types_mst_network.csv);
                            </p>
                            <div>
                                c. microenvironment table (microenvironment.csv) including two columns:
                                <ul>
                                    <li>&quot;cell_type&quot;: the name of the cell type</li>
                                    <li>&quot;microenvironment&quot;: the name of the microenvironment assigned;</li>
                                </ul>
                            </div>
                            <div>
                                d. CellPhoneDB output files (means.txt, pvalues.txt, significant_means.txt, deconvoluted.txt);
                                <ul>
                                    <li>details of these files: https://github.com/ventolab/CellphoneDB/blob/master/Docs/RESULTS-DOCUMENTATION.md</li>
                                </ul>
                            </div>
                            <div>
                                e. filtered CellPhoneDB output files (significant_means_lt001.csv): contains mean values for
                                each ligand-receptor interaction (rows) for each cell-cell interacting pair (columns) filtered
                                by P value &le; 0.01,  and details meaning of some columns are same to CellPhoneDB output files.
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            We offer <b>a compressed pdf figure files package</b> including all pdf figure results, which are more
                            optimized than web graphs, including:
                            <p>
                                a. JSD matrix heatmap and MST consensus matrix network figure after bootstrapping (cell_types_JSD.pdf,
                                cell_types_mst_network.pdf) similar to web graphs;
                            </p>
                            <p>
                                b. dot figure for total and each microenvironment (dot_plot.pdf, dot_plot_Microenv_[central cell
                                type].pdf) similar to web graphs, where means of the average expression level of two interacting
                                molecular are indicated by color;
                            </p>
                            <p>
                                c. heatmap showing the total number of interactions between cell types (inter_count_heatmap.pdf)
                                similar to web graphs
                            </p>
                        </div>
                    </li>
                </ol>
                <a id={"download"} style={{position: 'relative', top: "-150px"}}></a>
            </Typography>
        </div>
    )
}