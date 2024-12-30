import { DbManager } from "@/dbManager";
import TaskController from "./task.controller";
import TaskService from "./task.service";

class TaskModule {
    private service: TaskService;
    private controller: TaskController;
    
    constructor(dbManager: DbManager) {
        this.service = new TaskService(dbManager);
        this.controller = new TaskController(this.service);
    }

    getController() {
        return this.controller;
    }
}

export default TaskModule;