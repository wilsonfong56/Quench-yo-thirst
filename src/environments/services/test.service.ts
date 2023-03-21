import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root"
})
export class TestService {
    constructor() {}
    public username = "";
    public password = "";
    public temp = [0, 0, 0, 0, 0, 0, 0];
    public city = "";
    public weather = "";
}