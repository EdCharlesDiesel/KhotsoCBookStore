import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Book } from './book';

export class BookData implements InMemoryDbService {

    createDb() {
        const products: Book[] = [
            {
                'id': 1,
                'bookName': 'Leaf Rake',
                'bookCode': 'GDN-0011',
                'description': 'Leaf rake with 48-inch wooden handle',
                'starRating': 3.2
            },
            {
                'id': 2,
                'bookName': 'Garden Cart',
                'bookCode': 'GDN-0023',
                'description': '15 gallon capacity rolling garden cart',
                'starRating': 4.2
            },
            {
                'id': 5,
                'bookName': 'Hammer',
                'bookCode': 'TBX-0048',
                'description': 'Curved claw steel hammer',
                'starRating': 4.8
            },
            {
                'id': 8,
                'bookName': 'Saw',
                'bookCode': 'TBX-0022',
                'description': '15-inch steel blade hand saw',
                'starRating': 3.7
            },
            {
                'id': 10,
                'bookName': 'Video Game Controller',
                'bookCode': 'GMG-0042',
                'description': 'Standard two-button video game controller',
                'starRating': 4.6
            }
        ];
        return { products };
    }
}
