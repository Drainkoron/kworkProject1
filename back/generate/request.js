import Excel from 'exceljs'
import fs from 'fs'
import db from '../db'
//https://github.com/guyonroche/exceljs

export function generateExcel(req, res) {

    var workbook = new Excel.Workbook();
    var worksheet =  workbook.addWorksheet('sheet', {
        pageSetup: {paperSize: 9, orientation:'landscape'}
    });
    worksheet.columns = [
        { header: '', key: 'image', width: 25 },
        { header: '', key: 'note', width: 20 },
        { header: '', key: 'count', width: 10  },
        { header: '', key: 'time', width: 10  },
        { header: '', key: 'time_fast', width: 17  },
        { header: '', key: 'cost', width: 10  },
        { header: '', key: 'cost_fast', width: 15  },
    ];

    getIdsReq(req.body).then((result) => { 

        var count = 0

        async function constructRow() {
            if(result[count]) {
                var elem = result[count]

                var hightBlockRow = 10
                var addRowCount = 0

                function addRow(row) {
                    addRowCount++
                    worksheet.addRow(row)
                }

                addRow({note: `${elem.doc.name} (арт. 10${elem.id})`});
                addRow({note: 'Примечание',
                        count: 'Кол-во',
                        time: 'Срок, дней',
                        time_fast: 'Срок экспресс, дней',
                        cost: 'Цена, р.',
                        cost_fast: 'Цена экспресс, р.'
                    });

                // Данные
                await getCalcReq(elem.id).then(result => { 
                    result.forEach(elem => {
                        if(elem.doc.country == 'Россия') {
                            addRow({note: elem.doc.name,
                                count: elem.doc.count,
                                time: elem.doc.rus_time * 1 + elem.doc.time_production * 1 + elem.doc.time_branding * 1,
                                time_fast: '',
                                cost: elem.doc.rus_cost_out_brand,
                                cost_fast: ''
                            });
                        } else {
                            addRow({note: elem.doc.name,
                                count: elem.doc.count,
                                time: elem.doc.slow_time * 1 + elem.doc.time_production * 1 + elem.doc.time_branding * 1,
                                time_fast: elem.doc.fast_time * 1 + elem.doc.time_production * 1 + elem.doc.time_branding * 1,
                                cost: elem.doc.fast_cost_out_brand,
                                cost_fast: elem.doc.slow_cost_out_brand
                            });
                        }    
                    })
                }, (error) => {
                    console.log('error')
                })


                await getSampleReq(elem.id).then(result => { 
                    result.forEach(elem => {
                        if(elem.doc.country == 'Россия') {
                            addRow({note: elem.doc.name,
                                count: elem.doc.count,
                                time: elem.doc.rus_time * 1 + elem.doc.time_production * 1 + elem.doc.time_branding * 1,
                                time_fast: '',
                                cost: elem.doc.rus_cost_out_brand,
                                cost_fast: ''
                            });
                        } else {
                            addRow({note: elem.doc.name,
                                count: elem.doc.count,
                                time: elem.doc.slow_time * 1 + elem.doc.time_production * 1 + elem.doc.time_branding * 1,
                                time_fast: elem.doc.fast_time * 1 + elem.doc.time_production * 1 + elem.doc.time_branding * 1,
                                cost: elem.doc.fast_cost_out_brand,
                                cost_fast: elem.doc.slow_cost_out_brand
                            });
                        } 
                    })
                }, (error) => {
                    console.log('error')
                })
                
                if(elem.doc.avatar) {
                    var name = elem.doc.avatar.split('%2F')[1]
                    var ext = elem.doc.avatar.split('.')[1]

                    var image = workbook.addImage({
                        filename: `./static/files/${name}`,
                        extension: ext,
                    });

                    var startRow = count * hightBlockRow + 1
            
                    worksheet.addImage(image, {
                        tl: { col: 0, row: startRow },
                        br: { col: 1, row: startRow + 8 },
                        editAs: 'oneCell'
                    })
                }
                
                while(addRowCount < hightBlockRow) {
                    addRow({})
                }

                setTimeout(() => {
                    count++
                    constructRow()
                }, 100)

            } else {
                render()
            }
        }
        
        constructRow()

    }, (error) => {
        console.log('error')
    })
    
    function render() {
        console.log('render')

        const time = Date.now()
        var name = `export-${Date.now()}.xlsx`

        // Стереть всё из папки! export
        fs.readdir('./static/export', (err, list) => {
            list.forEach(file => {
                fs.unlinkSync(`./static/export/${file}`);
            })
        })

        workbook.xlsx.writeFile(`./static/export/${name}`).then(function(data) {  
            res.send({name: name});
        });
    }
}

function getIdsReq(object) {
    var requestString = `SELECT * FROM goods WHERE id in (${object.ids})`; 
    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest)
            } else {
                resolve(res.rows)
            }
        })
    })
}

function getCalcReq(id) {
    var requestString = `SELECT * FROM calculation WHERE (doc->>'default') LIKE 'true' 
                            AND (doc->>'goods_supplier_id')::int IN (SELECT id FROM goods_supplier WHERE (doc->>'default') LIKE 'true' 
                            AND (doc->>'goods_id')::int = ${id})`;  

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest)
            } else {
                resolve(res.rows)
            }
        })
    })
}

function getSampleReq(id) {
    var requestString = `SELECT * FROM sample WHERE (doc->>'default') LIKE 'true' 
                            AND (doc->>'goods_supplier_id')::int IN (SELECT id FROM goods_supplier WHERE (doc->>'default') LIKE 'true' 
                            AND (doc->>'goods_id')::int = ${id})`; 

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest)
            } else {
                resolve(res.rows)
            }
        })
    })
}