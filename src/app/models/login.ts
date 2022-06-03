export class Login {
    documentTypeId:number;
    documentNumber: string;
    password:string;

    constructor(documentTypeId: number, documentNumber: string, password: string){
        this.documentTypeId = documentTypeId;
        this.documentNumber = documentNumber;
        this.password = password;

    }
}
