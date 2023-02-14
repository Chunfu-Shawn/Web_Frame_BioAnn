
function checkFiles() {
    let barcodes = document.$("#barcodes").getAsFile();
    let features = document.$("#features").getAsFile();
    let matrix = document.$("#matrix").getAsFile();
    if ($("input").length === 3) {
        let filename = [];
        filename.add(barcodes.substring(barcodes.lastIndexOf(".")).toLowerCase());
        filename.add(features.substring(features.lastIndexOf(".")).toLowerCase());
        filename.add(matrix.substring(matrix.lastIndexOf(".")).toLowerCase());
        $("form").submit();
    } else {
        alert("Please input 3 files with correct format!!!");
    }
}

