
// https://github.com/guyonroche/exceljs

import { URL } from '../../app_constants'

import { generateExcel } from './request'

var xlsxObject = {
    start(goods) {

        var currentId = []
        goods.forEach(elem => {
            currentId.push(elem.id)
        });

        generateExcel({ids: currentId.toString()}).then(data => {
            var url = `${URL}/export/${data.name}`
            window.open(url)
		}, error => {
			console.log(error)
        })

        

        // const workbook = { SheetNames: ['test'], Sheets: {} };
        // workbook.Props = {
        //    Title: "Stats from app",
        //    Author: "John Doe"
        // };

        // workbook.Sheets = {
        //     cols: [{ name: "A", key: 0 }, { name: "B", key: 1 }, { name: "C", key: 2 }],
        //     data: [
        //       [ "id",    "name", "value" ],
        //       [    1, "sheetjs",    7262 ],
        //       [    2, "js-xlsx",    6969 ]
        //     ]
        // }

        /* convert from workbook to array of arrays */
        // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // var data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});

        // /* convert from array of arrays to workbook */
        // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");

        // XLSX.write(new_workbook, {bookType:'xlsx', bookSST:true, type: 'base64'})
        // XLSX.writeFile(new_workbook)

        /* Generate Workbook */
        // var wb = XLSX.utils.book_new();
        // var ws = XLSX.utils.json_to_sheet([
        //     { S:1, h:2, e:3, e_1:4, t:5, J:6, S_1:7 },
        //     { S:2, h:3, e:4, e_1:5, t:6, J:7, S_1:8 }
        //   ], {header:["S","h","e","e_1","t","J","S_1"]});
        // XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

        // /* Trigger Download with `writeFile` */
        // XLSX.writeFile(wb, "SheetJS.xlsx", {compression:true});
    }
}

export default xlsxObject
