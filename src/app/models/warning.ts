import { Title } from '@angular/platform-browser';

export interface Warning {
    warning_id: number;
    title: string;
    description_text: string;
    date_published: Date;
    date_viewed: Date;
}
