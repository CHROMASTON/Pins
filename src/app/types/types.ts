
export interface Customer{
    title:string;
    email:string;
    region:string
    country:string;
    }



export interface Pin{
    title:string;
    image:string;
    collaburators:Customer[]
    privacy:'public'|'private';
    }
export interface PinForm{
    title:string;
    image:string;
    collaburators:string[]
    privacy:'public'|'private';
    }