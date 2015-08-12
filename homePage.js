(function() {

    var homePage = function() {
    
        this.centerStageButtons = element(by.css(".center stage-buttons"));
        this.viewOnGitHubButton = this.centerStageButtons.all(by.css(".btn btn-large")).get(0);
        this.downloadButton = this.centerStageButtons.element(by.css(".btn-primary"));
        this.designDocsButton = this.centerStageButtons.element(by.css(".btn-warning"));
    }
  
    module.exports = homePage
    
}) ();

