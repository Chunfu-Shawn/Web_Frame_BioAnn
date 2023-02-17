import {Breadcrumb, Typography, Image} from 'antd';
import React  from 'react';
import {contentStyle} from "../SiderStaticMenu.js";
import DatasetAttributesTable from './DatasetPage/DatasetAttributesTable'

export default function ManualDatasets() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Dataset Browser</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h1>Dataset Browser</h1>
                <p>
                    This section aims to show you details of the basic ST analyses performed on our curated ST datasets
                    and tips for navigating them.
                </p>
                <h2>1. Dataset attributes</h2>
                <a id={"data_page_attributes"} style={{position: 'relative', top: "-150px"}}></a>
                <p>Each dataset comprises the following attributes:</p>
                <DatasetAttributesTable/>
                <h2>2. Data processing</h2>
                <p>
                    We obtained the gene expression data and spatial location information of 97 sets of spatial
                    transcriptome data through literature research, and some of the spatial transcriptome data obtained
                    the picture data. A unified python script was used to process the 97 sets of spatial transcriptome
                    data. The following is the processing procedure:
                </p>
                <h3>Basic processing</h3>
                <p>
                    The scanpy <a href={"https://doi.org/10.1186/s13059-017-1382-0"} target={"_blank"} rel={"noreferrer"}>
                    (https://doi.org/10.1186/s13059-017-1382-0)
                    </a> package is primarily used for data preprocessing.
                </p>
                <ol>
                    <li>
                        To begin, we will check if the input data has been normalized or scaled in order to avoid repeating operations.
                    </li>
                    <li>
                        The data was then subjected to quality control. We removed the 5% of cells with the lowest total
                        count and the 1% of cells with the highest count, as well as the cells with a mitochondrial RNA
                        expression ratio greater than 25%. At the same time, we eliminated genes that were expressed in
                        fewer than five cells. (In addition to image-based data.)
                    </li>
                    <li>
                        The filtered data was then normalized. The first step is to normalize each cell by the total number
                        of all genes, so that after normalization, the total counts of all genes in each cell are the same.
                        The second step is to measure gene expression logarithmically.
                    </li>
                    <li>
                        We calculated the high-variable genes after normalizing the data.
                    </li>
                    <li>
                        Finally, the data set is reduced and clustered. After scaling the data to the unit variance and
                        zero mean, the data was analyzed using principal component analysis, with 50 principal components
                        calculated for each cell. The neighborhood map of the data is then calculated and embedded with
                        UMAP. The Leiden algorithm was used to group the cells (resolution was 0.5, 1, 1.5 and 2,
                        respectively).
                    </li>
                </ol>
                <h3>Spatial clustering</h3>
                <p>
                    A spatial region with similar gene expression patterns in a tissue slice is referred to as a spatial
                    domain and has significant biological significance. Therefore, the ability of the spatial
                    transcriptome to precisely identify such spatial regions is required. STAGATE successfully
                    identifies spatial domains in spatial transcriptome data using adaptive graph attention auto-encoders.
                </p>
                <p>
                    A spatial neighbor network (SNN) is first built by STAGATE using a predetermined radius. Furthermore,
                    STAGATE uses four layers of graph attention auto-encoders, including two layers of encoders and
                    two layers of decoders, to learn low-dimensional latent representations containing spatial
                    information and gene expression. A normalized expression matrix serves as the autoencoder&apos;s
                    input, and the output can be utilized to identify the spatial domain.
                </p>
                <p>This part is mainly handled through the STAGATE_pyG package (GPU version of STAGATE).</p>
                <ul>
                    <li>
                        We define a parameter scope to estimate the cutoff of constructing a spatial neighbor network
                        in order to better construct a spatial neighbor network. We begin by calculating the distance
                        between spatial transcriptome points along the Y-axis, then averaging the distance to obtain D.
                        The cutoff for constructing the spatial neighbor network is then calculated as D*scope.
                    </li>
                    <li>
                        The first step of STAGATE is to build the SNN, which is accomplished through the function
                        &quot;STAGATE_pyG.Cal Spatial Net&quot;.
                    </li>
                    <li>
                        The second step of STAGATE is to run the main STAGATE method, which is implemented by the
                        &quot;STAGATE.train STAGATE&quot; function.
                    </li>
                    <li>
                        The third step of STAGATE is to compute the neighborhood map of the STAGATE output, embed
                        the neighborhood map with UMAP, and then cluster the cells using the Leiden algorithm
                        (resolution of 0.5, 1, 1.5, 2, respectively). This section is handled by a function in the scanpy package.
                    </li>
                </ul>
                <h3>Marker genes</h3>
                <p>Finally, the marker genes of eight clustering methods were calculated, including the STAGATE spatial
                    clustering method (four resolutions) and the clustering method based solely on gene expression
                    (four resolutions). This section makes use of the scanpy package&apos;s function &quot;tl.rank genes groups&quot;.</p>
                <h2>3. Data visualization</h2>
                <a id={"data_page_view"} style={{position: 'relative', top: "-150px"}}></a>
                <p> STellaris uses Spatial-Trans-Visual-Tool (<a href={"https://github.com/Chunfu-Shawn/Spatial-Trans-Visual-Tool"} target={"_blank"} rel={"noreferrer"}>
                    https://github.com/Chunfu-Shawn/Spatial-Trans-Visual-Tool</a>) which was developed from Cirrocumulus
                    (<a href={"https://cirrocumulus.readthedocs.io/en/latest/"} target={"_blank"} rel={"noreferrer"}>
                        https://cirrocumulus.readthedocs.io/en/latest/</a>)
                    for dataset visualization. Cirrocumulus is an interactive visualization tool for large-scale single-cell
                    and spatial transcriptomic data. The data visualization module consists of Sections selector, an app bar, side bar,
                    primary embedding, embedding gallery, toolbar and distribution plots.
                </p>
                <Image src={"/images/help/datasets/visual_tool.png"} alt={'spatial_trans_visual_tool'} width={900} height={650}/>
                <ol>
                    <li><b>Section ID Selector</b>: allows users to select a section of this datasets to show.</li>
                    <li><b>App Bar</b>: shows the number of plots in your dataset and the number of selected cells.
                        Additionally, it lets you switch between different tabs.</li>
                    <li><b>Side Bar</b>: allows users to select which cell embeddings, genes/features, cell metadata (such as cluster labels)
                        and sets (predefined lists of genes, e.g. cluster markers) to visualize, and shows the current datasets cell filters.
                    </li>
                    <li><b>Primary Embedding</b>: allows users to watch and interact with the view of spatial data.</li>
                    <li><b>Embedding Gallery</b>: shows all selected features and embeddings and thus provides a way for comparing attributes and embeddings.</li>
                    <li><b>Toolbar</b>: some tools to select interested spots, download a slice of spatial data and so on.</li>
                    <li><b>Distributions</b>: allows users to explore the differential gene expression across cell clusters with a dot plot, a heat map, or a violin plot.</li>
                </ol>
                <p>For more details, please visit:
                    <a href={'https://cirrocumulus.readthedocs.io/en/latest/documentation.html'} target={'_blank'} rel={'noreferrer'}> https://cirrocumulus.readthedocs.io/en/latest/documentation.html</a>
                </p>
                <h2>4. Identification of spatially variable gene</h2>
                <a id={"identification_svg"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    It is critical to analyze spatially variable (SV) genes in the spatial transcriptome, but the highly
                    variable genes (HVGs) calculated in Scanpy&apos;s analysis do not take spatial information into account,
                    so we use SpatialDE methods to compensate.
                </p>
                <p>
                    SpatialDE is a nonlinear and nonparametric method based on Gaussian process regression that can
                    effectively capture differentially expressed genes in space. SpatialDE inputs are raw counts data
                    that have not been normalized, and outputs are the significance of each gene for spatial differential
                    expression.
                </p>
                <p>
                    This section is primarily handled through the SpatialDE package.
                </p>
                <ol>
                    <li>
                        To begin with, data were preprocessed using the &quot;stabilize&quot; and &quot;regress out&quot;
                        functions from the NaiveDE package based on tutorial provided by SpatialDE officials.
                    </li>
                    <li>
                        The spatial coordinate data of the spatial transcriptome data is then extracted.
                    </li>
                    <li>
                        The processed gene expression matrix and spatial coordinate information were fed into the
                        &quot;SpatialDE.run&quot; function, and the output result was the p values and q values (Significance after
                        multiple testing) of all genes. Those with q values less than 0.05 were considered to be significant
                        spatially differentially expressed genes and were kept.
                    </li>
                </ol>
                <h2>5. Description of downloaded file</h2>
                <a id={"h5ad"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    h5ad file is compatible with scanpy/anndata python package, which is highly scalable in python
                    environment. An example h5ad file ready to download is shown below, which contains the results of
                    dimension reduction, traditional clustering, spatial clustering, marker genes of identified clusters.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/help/datasets/h5ad.png"} width={500} height={360}
                           alt={"h5ad"} style={{borderStyle:"dashed"}}/>
                </div>
            </Typography>

        </div>
    )
}