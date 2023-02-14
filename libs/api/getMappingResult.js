import fs from "fs"
import mysql from "mysql";
import {getDatasetsInfo} from "./getDatasetsInfo.js";

export async function getMappingResult(datasetId, resultPath){
    return new Promise(async (resolve, reject) => {
        let scMeta
        let umapPrep
        let umapFilter
        let cellPrep
        let cellMap
        let cellFilter
        let rfDist
        let eucDis
        let eucDisBox
        let interHeat
        let lpPair
        let dotPlot

        try {
            scMeta = fs.readFileSync(
                resultPath + '/out/json/meta_info.preprocessing.json', 'utf8');
            umapPrep = fs.readFileSync(
                resultPath + '/out/json/umap.preprocessing.json', 'utf8');
            umapFilter = fs.readFileSync(
                resultPath + '/out/json/umap.filtering.json', 'utf8');
            cellPrep = fs.readFileSync(
                resultPath + '/out/json/filter_summary.preprocessing.json', 'utf8');
            cellFilter = fs.readFileSync(
                resultPath + '/out/json/filter_summary.filtering.json', 'utf8');
            cellMap = fs.readFileSync(
                resultPath + '/out/json/mapping_summary.json', 'utf8');
            rfDist = fs.readFileSync(
                resultPath + '/out/json/rfdist.json', 'utf8');
        }catch (e) {
            reject(e)
        }

        try {
            eucDis = fs.readFileSync(
                resultPath + '/out/json/cell_types_eucDist.json', 'utf8');
            eucDisBox = fs.readFileSync(
                resultPath + '/out/json/cell_types_eucDist_group.json', 'utf8');
        }catch (e) {
            eucDis = null
            eucDisBox = null
        }

        try {
            interHeat = fs.readFileSync(
                resultPath + '/out/json/inter_count_heatmap.json', 'utf8');
            lpPair = fs.readFileSync(
                resultPath + '/out/json/LR-pair_cell_pair.json', 'utf8');
            dotPlot = fs.readFileSync(
                resultPath + '/out/json/dot_plot.json', 'utf8');
        }catch (e) {
            interHeat = null
            lpPair = null
            dotPlot = null
        }

        // get dataset and section information
        const datasetInfo = await getDatasetsInfo(datasetId)

        let data = {
            scMeta: scMeta,
            umapPrep: umapPrep,
            umapFilter: umapFilter,
            cellPrep: cellPrep,
            cellFilter: cellFilter,
            cellMap: cellMap,
            rfDist: rfDist,
            eucDis: eucDis,
            eucDisBox: eucDisBox,
            interHeat: interHeat,
            dotPlot: dotPlot,
            lpPair: lpPair,
            datasetInfo: datasetInfo[0]
        }
        resolve(data)
    })
}