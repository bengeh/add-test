import { observable, computed, action } from "mobx";

interface Employee {
    employeeName: string;
    directSub: Array<String>;
}

export const createStore = () => {
    return new EmployeeStore();
}

export default class EmployeeStore {

    employee: Employee[] = [];


    async findEmployees(employeeName: string) {
        var apiURL = "http://api.additivasia.io/api/v1/assignment/employees/"
        this.setInit(false)
        fetch(apiURL + employeeName)
            .then(res => res.text())
            .then(res => {
                var jsonRes = JSON.parse(res)
                var directSub = jsonRes[1]['direct-subordinates']
                
                this.setEmployeeArr(jsonRes[1]['direct-subordinates'])
                for(var i = 0; i < directSub.length; i++){
                    this.findEmployees(directSub[i])
                }
            })
            .catch(err => err)
    }

    @observable
    employeeArr: Array<String> = []

    @action 
    setEmployeeArr(names: string){
        var arrOfNames = names.toString().split(',')
        for(var i = 0; i < arrOfNames.length; i++){
            if(!this.employeeArr.includes(arrOfNames[i])){
                console.log("name not found")
                this.employeeArr = this.employeeArr.concat(arrOfNames[i]);
            }
        }
        console.log("these are the arry of names... " + this.employeeArr)
        this.setInit(false)
    }

    @observable
    employeeFound: boolean = false;

    @action
    setEmployeeFound(found: boolean){
        this.employeeFound = found;
    }

    @observable
    employeeName: string = "";

    @action
    setEmployeeName(name: string){
        this.employeeName = name;
    }
    @action
    clear(){
        this.employeeName = ""
        this.employeeArr = []
        this.setInit(true)
    }

    @observable
    init: boolean = true;

    @action
    setInit(value: boolean) {
        this.init = value
    }
}
