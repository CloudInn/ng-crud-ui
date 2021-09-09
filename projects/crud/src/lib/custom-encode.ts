import { HttpParameterCodec } from '@angular/common/http';

export class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key)
            .replace(/%3A/gi, ':');
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value)
            .replace(/%3A/gi, ':');
    }

    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}