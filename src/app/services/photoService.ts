import { Injectable } from "@angular/core"

@Injectable()
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: '../../assets/restaurant1.jpg',
                thumbnailImageSrc: '../../assets/restaurant1.jpg',
                alt: 'Restaurant lobby',
                title: 'Restaurant lobby'
            },
            {
                itemImageSrc: '../../assets/restaurant1.jpg',
                thumbnailImageSrc: '../../assets/restaurant1.jpg',
                alt: 'Restaurant lobby',
                title: 'Restaurant lobby'
            }
        ]
    }

    getImages() {
        return Promise.resolve(this.getData())
    }
}