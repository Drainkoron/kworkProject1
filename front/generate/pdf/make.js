// http://pdfmake.org/#/gettingstarted

// Запросы / картинки / просчёты

import { fetchImg } from '../../common/fetch_img'
import { getFileList, getCalcList } from './request'
import { URL } from '../../app_constants'
import { header, line } from './img'

var pdfObject = {
    goods: [],
    count: 0,
    countImg: 0,
    start(goods) {
        this.goods = Object.assign({}, goods)  
        this.count = 0
        this.countImg = 0
        this.pdfGenerate()
    },
    count: 0,
    pdfGenerate() {

        if(this.goods[this.count]) {
            this.elemRequest(this.goods[this.count])
        } else {
            
        }
        

        // this.docDefinition.content.push(col)
        // 
    },
    async elemRequest(elem) {
        if(elem.doc.avatar) {
            await fetchImg(elem.doc.avatar).then(base64 => {
                elem.doc.avatar64 = base64
                console.log('аватар')
            }, error => {
                
            })
        }

        var img = []
        await getFileList({object: 'goods', id: elem.id}).then(data => {
            img = data
		}, error => {
			
        })
        
        if(img[0]) {
            await fetchImg(`${URL}/${img[0].doc.path}`).then(base64 => {
                elem.doc.img1 = base64
                console.log('фото 1')
            }, error => {
                
            })
        }

        if(img[1]) {
            await fetchImg(`${URL}/${img[1].doc.path}`).then(base64 => {
                elem.doc.img2 = base64
                console.log('фото 2')
            }, error => {
                
            })
        }

        // Запрос за таблицой
        getCalcList({id: elem.id}).then(data => {
            console.log(data, 'data')
		}, error => {
			
		})

        this.docDefinition.content.push(this.constructRow(elem))

        this.pdfMakeStart()
    },
    constructRow(elem) {

        

        return [{
                    text: elem.doc.name.toUpperCase(),
                    style: {
                        fontSize: 16,
                        alignment: 'left',
                        color: '#02B7CF',
                        font: 'Avant',
                    },
                    margin: [0, 10, 0, 5],
                }, {
                    image: line,
	                width: 100,
                }, {
                    width: 100,
                    text: 'артикул',
                    color: '#888888',
                    margin: [0, 5, 0, 20],
                }, { 
                columns: [
                    [{
                        text: elem.doc.note,
                        margin: [0, 10, 0, 10]
                    }, {
                        text: 'ТИРАЖ',
                        margin: [0, 5, 0, 5],
                        style: 'tableName',
                    }, {
                        width: 350,
                        table: {
                            headerRows: 1,
                            widths: [ 80, 30, 30, 55, 30, 55 ],
                            body: [
                              [ {text: 'ПРИМЕЧАНИЕ', style: 'tableHeader', alignment: 'center'}, 
                                {text: 'КОЛ-ВО', style: 'tableHeader', alignment: 'center'}, 
                                {text: 'СРОК', style: 'tableHeader', alignment: 'center'}, 
                                {text: 'СРОК ЭКСПРЕСС', style: 'tableHeader', alignment: 'center'},
                                {text: 'ЦЕНА', style: 'tableHeader', alignment: 'center'},
                                {text: 'ЦЕНА ЭКСПРЕСС', style: 'tableHeader', alignment: 'center'} ],
                              [ {text: '100 рэ', style: 'tableRow', alignment: 'center'}, 'Value 2', 'Value 3', 'Value 4', 'Value 4', 'Value 4' ],
                              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4', 'Value 4', 'Value 4' ]
                            ]
                        },
                        layout: {
                            defaultBorder: false,
                        }
                    }], 
                    [{
                        width: 180,
                        columns: [
                            {
                                image: elem.doc.img1,
                                width: 80,
                                height: 80,
                            },
                            {
                                image: elem.doc.img2,
                                width: 80,
                                height: 80,
                            },
                        ],
                        columnGap: 20
                    }, {
                        image: elem.doc.avatar64,
                        width: 180,
                        height: 180,
                        margin: [0, 20, 0, 0]
                    }],
                ],
                columnGap: 20,
                style: ['row'] 
            }]
    },
    pdfMakeStart() {
        pdfMake.fonts = {
            Plumb: {
                normal: 'Plumb-medium.ttf',
                bold: 'Plumb-medium.ttf',
                italics: 'Plumb-medium.ttf',
                bolditalics: 'Plumb-medium.ttf'
            },
            Avant: {
                normal: 'Avant.ttf',
                bold: 'Avant.ttf',
                italics: 'Avant.ttf',
                bolditalics: 'Avant.ttf'
            },
        }
        pdfMake.createPdf(this.docDefinition).open()
    },
    docDefinition: {
        header: [{
            image: header,
	        width: 600
		}],
        content: [],
        defaultStyle: {
            font: 'Plumb'
        },
        styles: {
            row: {
                    bold: true,
                    height: 50
            },
            tableHeader: {
                fontSize: 6,
                color: '#ffffff',
                fillColor: '#02B7CF'
            },
            tableName: {
                fontSize: 10,
                color: '#02B7CF',
            },
            tableRow: {
                fontSize: 6
            }
        }
    },
}


export default pdfObject


