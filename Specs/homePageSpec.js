var HomePage = function() {
    
    this.centerStageButtons = element(by.css(".center.stage-buttons"));
    this.viewOnGitHubButton = this.centerStageButtons.all(by.css(".btn.btn-large")).get(0);
    this.downloadButton = this.centerStageButtons.element(by.css(".btn-primary"));
    this.designDocsButton = this.centerStageButtons.element(by.css(".btn-warning"));
}

var DownloadModal = function() {
    
    this.downloadModal = element(by.css(".download-modal"));
}

var TheBasics = function() {
    
    this.helloBox = element.all(by.css(".row.example")).get(0);
    this.nameField = this.helloBox.element(by.model("yourName"));
    this.helloOutput = this.helloBox.element(by.tagName("h1"));
}

var Backend = function() {

    this.backendBox = element.all(by.css(".row.example")).get(2);
    this.projectsBox = this.backendBox.element(by.css('.well.ng-scope'));
    this.projectSearch = element(by.id("projects_search"));
    this.projectList = element.all(by.repeater("project in projectList.projects"));
}

var ToDo = function() {

    this.toDo = element.all(by.css(".row.example")).get(1);
    this.toDoApp = this.toDo.element(by.css(".well.ng-scope"));
    this.toDoTextField = this.toDo.element(by.model("todoList.todoText"));
    this.addButton = this.toDoApp.element(by.css(".btn-primary"));
    this.checkList = this.toDo.all(by.repeater("todo in todoList.todos"));
    this.checkBox = this.toDo.all(by.model("todo.done"));
    this.archive = this.toDoApp.element(by.tagName("a"));
}

xdescribe('angularjs.org', function() {
    var homePage = new HomePage();
    
    beforeEach(function() {
        browser.get('https://angularjs.org/');
    });
    
    it('should have a three buttons', function() {

        expect(homePage.viewOnGitHubButton.isPresent()).toBe(true);
        //expect(homePage.viewOnGitHubButton.isPresent()).toBe(false);
        
        expect(homePage.viewOnGitHubButton.isDisplayed()).toBe(true);
        //expect(homePage.viewOnGitHubButton.isDisplayed()).toBe(false);
        
        expect(homePage.downloadButton.isPresent()).toBe(true);
        //expect(homePage.downloadButton.isPresent()).toBe(false);
        
        expect(homePage.downloadButton.isDisplayed()).toBe(true);
        //expect(homePage.downloadButton.isDisplayed()).toBe(false);
    });
});

xdescribe('Download button', function() {
    var homePage = new HomePage();
    var downloadModal = new DownloadModal();
    
    beforeEach(function() {
        browser.get('https://angularjs.org/');
    });
    
    it('should open up a download modal', function() {
        
        expect(downloadModal.downloadModal.isPresent()).toBe(false);
        homePage.downloadButton.click();
        browser.waitForAngular();
        expect(downloadModal.downloadModal.isDisplayed()).toBe(true);
    });    
});

xdescribe('In "The Basics" tutorial', function() {
    var homePage = new HomePage();
    var theBasics = new TheBasics();
    
    beforeEach(function() {
        browser.get('https://angularjs.org/');
    });
    
    it('entering a name should output "Hello Name"', function() {
        var name = 'Hannah';
        
        theBasics.nameField.click();
        theBasics.nameField.sendKeys('Hannah');
        
        expect(theBasics.helloOutput.getText()).toEqual('Hello Hannah!');
        expect(theBasics.helloOutput.getText()).toContain('Hannah');
        
        theBasics.nameField.click();
        theBasics.nameField.clear();
        theBasics.nameField.sendKeys(name);
        expect(theBasics.helloOutput.getText()).toContain(name);
        expect(theBasics.helloOutput.getText()).toEqual('Hello' + ' ' + name + '!');
    });
});

describe('The ToDo app', function() {
    var toDo = new ToDo();
    
    beforeEach(function() {
        browser.get('https://angularjs.org/');
    });
    
    it('should add an extra item to the checklist', function() {
        var thirdItemInList = toDo.checkList.get(2);
       
        expect(toDo.checkList.count()).toEqual(2);
        toDo.toDoTextField.click();
        toDo.toDoTextField.sendKeys("Learn angular app");
        toDo.addButton.click();
        expect(toDo.checkList.count()).toEqual(3);
        expect(thirdItemInList.getText()).toEqual("Learn angular app"); 
        expect(thirdItemInList.getText()).toContain("ang")
    });
    
    it("should remove two items from the check list", function() {
        var thirdCheckBox = toDo.checkBox.get(2);
        
        toDo.toDoTextField.click();
        toDo.toDoTextField.sendKeys("Learn angular app");
        toDo.addButton.click();
        toDo.toDoTextField.click();
        toDo.toDoTextField.sendKeys("Learn angular something");
        toDo.addButton.click();
        expect(toDo.checkList.count()).toEqual(4);
        thirdCheckBox.click();
        toDo.archive.click();
        expect(toDo.checkList.count()).toEqual(2);
    });
});
