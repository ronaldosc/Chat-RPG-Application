import { Request, Response } from "express";

export interface UserData{
    name: string,
    email: string,
    password: string
}

export interface RegisterdUserData{
    id : string,
    email: string,
    name: string
}

export interface LoginData{
    email: string,
    password: string
}

export interface userId{
    id : string
}


abstract class Validator
{
    data : any;
    errors? : string;

    constructor(data : any)
    {
        this.data = data;
        this.errors = "";
    }
}

abstract class StringValidator extends Validator
{
    constructor(data : any)
    {
        super(data);
        if(typeof data != 'string') this.errors = 'Tipo Errado';
    }
}

abstract class RegexValidator extends StringValidator
{
    protected get regexp () : RegExp
    {
        return new RegExp('');
    }
    constructor(data : any)
    {
        super(data);
        if(this.errors) return;
        if(!this.regexp.test(data)) this.errors = 'Formato errado';
    }
}

export class EmailValidator extends RegexValidator
{
    protected override get regexp ()
    {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    }
}

export class NameValidator extends RegexValidator
{
    protected override get regexp ()
    {
        return /^([a-z]{1,15})([ ]{1}[a-z]{1,15}){0,2}$/gim;
    }
}

export class PasswordValidator extends RegexValidator
{
    protected override get regexp ()
    {
        return /^\w{6,}$/gim;
    }
}

