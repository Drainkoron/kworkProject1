import Excel from 'exceljs'
import fs from 'fs'
import db from '../db'
//https://github.com/guyonroche/exceljs

export async function generateExcel(req, res) {

        var workbook = new Excel.Workbook();
        var worksheet =  workbook.addWorksheet('sheet', {
            pageSetup: {paperSize: 9, orientation:'landscape'}
        });
        worksheet.columns = [
            { header: '', key: 'image', width: 20 },
            { header: '', key: 'name', width: 10 },
            { header: '', key: 'DOB', width: 10  }
        ];

        await getIdsReq(req.body).then((result) => { 
            //res.send(result, 'result');
            console.log(result, 'result')
            result.forEach((elem, index) => {

                if(elem.doc.avatar) {
                    var name = elem.doc.avatar.split('%2F')[1]
                    var ext = elem.doc.avatar.split('.')[1]



                    console.log(name)

                    var image = workbook.addImage({
                        filename: `./static/files/${name}`,
                        extension: ext,
                    });

                    var startRow = index * 8
            
                    worksheet.addImage(image, {
                        tl: { col: 0, row: startRow },
                        br: { col: 1, row: startRow + 8 },
                        editAs: 'oneCell'
                    })

                }
                
                worksheet.addRow({name: `${elem.doc.name} (арт. 10${elem.id})`});
            })

        }, (error) => {
            res.status(error.status).send(error.message);
        })
        
        
        // worksheet.addRow({image: '', name: 'John Doe wwerwerwerwrwerwerwerwerwerwrwerwerwerw', dob: '123'});
        // worksheet.addRow({image: '', name: 'Jane Doe', dob: '123'});
        
        

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