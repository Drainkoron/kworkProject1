// http://pdfmake.org/#/gettingstarted

// Запросы / картинки / просчёты

import { fetchImg } from '../../common/fetch_img'
import { getFileList } from './request'
import { URL } from '../../app_constants'

var pdfObject = {
    goods: [],
    count: 0,
    countImg: 0,
    start(goods) {
        this.goods = goods
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

        this.docDefinition.content.push(this.constructRow(elem))

        this.pdfMakeStart()
    },
    constructRow(elem) {
        return { columns: [
                    [{
                        width: 100,
                        text: 'артикул'
                    }, {
                        width: '*',
                        text: elem.doc.name
                    }], [{
                        image: elem.doc.img1,
                        width: 60,
                        height: 60,
                        margin: 5
                    }, {
                        image: elem.doc.img2,
                        width: 60,
                        height: 60,
                        margin: 5
                    }], {
                        image: elem.doc.avatar64,
                        width: 150,
                        height: 150
                    }
                ],
                style: ['row'],
                margin: 5 }
    },
    pdfMakeStart() {
        pdfMake.createPdf(this.docDefinition).open()
    },
    docDefinition: {
        content: [],
        styles: {
            row: {
                    bold: true,
                    height: 50
                }
            }
        }
}

export default pdfObject