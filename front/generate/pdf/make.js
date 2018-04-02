// http://pdfmake.org/#/gettingstarted

// Запросы / картинки / просчёты

import { fetchImg } from '../../common/fetch_img'
import { getFileList, getCalcList, getSampleList } from './request'
import { URL } from '../../app_constants'
import { header, line, pattern } from './img'

var pdfObject = {
    goods: [],
    count: 0,
    countImg: 0,
    start(goods) {
        this.goods = Object.assign({}, goods)  
        this.count = 0
        this.countImg = 0
        this.docDefinition.content = []
        this.pdfGenerate()
    },
    count: 0,
    pdfGenerate() {
        if(this.goods[this.count]) {
            this.elemRequest(this.goods[this.count])
        } else {
            this.pdfMakeStart()
        }
    },
    async elemRequest(elem) {
        if(elem.doc.avatar) {
            await fetchImg(elem.doc.avatar).then(base64 => {
                elem.doc.avatar64 = base64
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
            }, error => {
                
            })
        }

        if(img[1]) {
            await fetchImg(`${URL}/${img[1].doc.path}`).then(base64 => {
                elem.doc.img2 = base64
            }, error => {
                
            })
        }

        await getCalcList({id: elem.id}).then(data => {
            elem.calcRows = [[{text: 'ПРИМЕЧАНИЕ', style: 'tableHeader', alignment: 'center'}, 
                                {text: 'КОЛ-ВО', style: 'tableHeader', alignment: 'center'}, 
                                {text: 'СРОК', style: 'tableHeader', alignment: 'center'}, 
                                {text: 'СРОК ЭКСПРЕСС', style: 'tableHeader', alignment: 'center'},
                                {text: 'ЦЕНА', style: 'tableHeader', alignment: 'center'},
                                {text: 'ЦЕНА ЭКСПРЕСС', style: 'tableHeader', alignment: 'center'}]]
            data.forEach(row => {
                if(row.doc.country == 'Россия') {
                    elem.calcRows.push([
                        { text: `${row.doc.name}`, style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.count} шт.`, style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.rus_time * 1 + row.doc.time_production * 1 + row.doc.time_branding * 1} д.`, style: 'tableRow', alignment: 'center' },
                        { text: '-', style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.rus_cost_out_brand} р/шт.`, style: 'tableRow', alignment: 'center' }, 
                        { text: '-', style: 'tableRow', alignment: 'center' }
                    ])
                } else {
                    elem.calcRows.push([
                        { text: `${row.doc.name}`, style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.count} шт.`, style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.slow_time * 1 + row.doc.time_production * 1 + row.doc.time_branding * 1} д.`, style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.fast_time * 1 + row.doc.time_production * 1 + row.doc.time_branding * 1} д.`, style: 'tableRow', alignment: 'center' },
                        { text: `${row.doc.fast_cost_out_brand} р/шт.`, style: 'tableRow', alignment: 'center' }, 
                        { text: `${row.doc.slow_cost_out_brand} р/шт.`, style: 'tableRow', alignment: 'center' }
                    ])
                }
            })
		}, error => {
			
        })
        
        await getSampleList({id: elem.id}).then(data => {
            if(data.length) {
                elem.sampleRows = [[{text: 'ПРИМЕЧАНИЕ', style: 'tableHeader', alignment: 'center'}, 
                                    {text: 'КОЛ-ВО', style: 'tableHeader', alignment: 'center'}, 
                                    {text: 'СРОК', style: 'tableHeader', alignment: 'center'}, 
                                    {text: 'СРОК ЭКСПРЕСС', style: 'tableHeader', alignment: 'center'},
                                    {text: 'ЦЕНА', style: 'tableHeader', alignment: 'center'},
                                    {text: 'ЦЕНА ЭКСПРЕСС', style: 'tableHeader', alignment: 'center'}]]
                data.forEach(row => {
                    if(row.doc.country == 'Россия') {
                        elem.sampleRows.push([
                            { text: `${row.doc.name}`, style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.count} шт.`, style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.rus_time * 1 + row.doc.time_production * 1 + row.doc.time_branding * 1} д.`, style: 'tableRow', alignment: 'center' },
                            { text: '-', style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.rus_cost_out_brand} р/шт.`, style: 'tableRow', alignment: 'center' }, 
                            { text: '-', style: 'tableRow', alignment: 'center' }
                        ])
                    } else {
                        elem.sampleRows.push([
                            { text: `${row.doc.name}`, style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.count} шт.`, style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.slow_time * 1 + row.doc.time_production * 1 + row.doc.time_branding * 1} д.`, style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.fast_time * 1 + row.doc.time_production * 1 + row.doc.time_branding * 1} д.`, style: 'tableRow', alignment: 'center' },
                            { text: `${row.doc.fast_cost_out_brand} р/шт.`, style: 'tableRow', alignment: 'center' }, 
                            { text: `${row.doc.slow_cost_out_brand} р/шт.`, style: 'tableRow', alignment: 'center' }
                        ])
                    }
                })
            } else {
                elem.sampleRows = false
            }
            
		}, error => {
			
		})

        this.docDefinition.content.push(this.constructRow(elem))
        this.count++
        this.pdfGenerate()
    },
    constructRow(elem) {

        let row = [{
                        text: elem.doc.name.toUpperCase(),
                        style: 'blockHeader',
                        margin: [0, 15, 0, 5],
                        pageBreak: this.count ? 'before' : null
                    }, {
                        image: line,
                        width: 100,
                    }, {
                        width: 100,
                        text: `10${elem.id}`,
                        color: '#888888',
                        margin: [0, 5, 0, 20],
                    }, { 
                    columns: [
                        [{
                            text: elem.doc.note,
                            margin: [0, 10, 0, 10],
                            style: 'goodsNote',
                        }, {
                            text: 'ТИРАЖ',
                            margin: [0, 5, 0, 5],
                            style: 'tableName',
                        }, {
                            width: 400,
                            table: {
                                headerRows: 1,
                                widths: [ 100, 50, 50, 80, 60, 70 ],
                                body: elem.calcRows
                            },
                            layout: {
                                defaultBorder: false,
                            }
                        }], 
                        [{
                            width: 280,
                            columns: [
                                {
                                    image: elem.doc.img1 || pattern,
                                    fit: [130, 130],
                                    width: 130
                                },
                                {
                                    image: elem.doc.img2 || pattern,
                                    fit: [130, 130],
                                    width: 130
                                },
                            ],
                            columnGap: 20
                        }, {
                            image: elem.doc.avatar64 || pattern,
                            fit: [280, 280],
                            hight: 280,
                            margin: [0, 20, 0, 0]
                        }],
                    ],
                    columnGap: 20,
                    style: ['row']
                }]

        

        if(elem.sampleRows) {
            row[3].columns[0].push({
                text: 'ОБРАЗЕЦ',
                margin: [0, 25, 0, 5],
                style: 'tableName',
            })
            row[3].columns[0].push({
                width: 400,
                table: {
                    headerRows: 1,
                    widths: [ 100, 50, 50, 80, 60, 70 ],
                    body: elem.sampleRows
                },
                layout: {
                    defaultBorder: false,
                }
            })
        }
        return row
    },
    pdfMakeStart() {
        pdfMake.fonts = {
            Plumb: {
                normal: 'Plumb-medium.ttf',
                bold: 'Plumb-bold.ttf',
                italics: 'Plumb-medium.ttf',
                bolditalics: 'Plumb-medium.ttf'
            },
            Avant: {
                normal: 'Avant.ttf',
                bold: 'Avant.ttf',
                italics: 'Avant.ttf',
                bolditalics: 'Avant.ttf'
            }
        }

        pdfMake.createPdf(this.docDefinition).open()
    },
    docDefinition: {
        pageOrientation: 'landscape',
        header: [{
            image: header,
	        width: 850
		}],
        content: [],
        defaultStyle: {
            font: 'Plumb'
        },
        styles: {
            blockHeader: {
                fontSize: 20,
                alignment: 'left',
                color: '#02B7CF',
            },
            tableHeader: {
                fontSize: 8,
                color: '#ffffff',
                fillColor: '#02B7CF',
                bold: true
            },
            tableName: {
                fontSize: 12,
                color: '#02B7CF',
            },
            tableRow: {
                fontSize: 8,
                color: '#333333',
            },
            goodsNote: {
                fontSize: 12,
                color: '#333333',
            }
        }
    }
}


export default pdfObject

