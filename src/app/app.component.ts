import { Component, OnInit } from '@angular/core';
import { WarningService } from './services/warning.service';
import { Warning } from './models/warning';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-bulletinboard';
  
  // Itemns for pagination
  pageOfItems: Array<any>;
  warning = {} as Warning;
  warnings: Warning[];

  constructor(private warningService: WarningService) {}
  
  ngOnInit() {
    // Initiate the web page with all Warnings
    this.getWarnings();
  }

  // Define if the car will be created or updated
  saveWarning(form: NgForm) {
    if (this.warning.warning_id === undefined) {
      this.warningService.createWarning(this.warning).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      // If the date Viewed is not set, define it now
      if(!this.warning.date_viewed){
        this.warning.date_viewed = new Date();
      }
      this.warningService.updateWarning(this.warning).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Updating the date_viewed information
  updateWarningDateViewed(warning: Warning) {
      if(!warning.date_viewed){
        warning.date_viewed = new Date();
      }
      this.warningService.updateWarning(warning).subscribe(() => {
        
      });;
    
  }

  // Get all Warnings
  getWarnings() {
    this.warningService.getWarnings().subscribe((warning: Warning[]) => {
      this.warnings = warning;
      
    });
  }

  // Delete a Warning by ID
  deleteWarning(warning: Warning) {
    if(confirm('Deseja realmente apagar o registro "'+warning.title+'"?')){
      this.warningService.deleteWarning(warning).subscribe(() => {
        this.getWarnings();
      });
    }
  }

  // Set the Warning to be edited
  editWarning(warning: Warning) {
    this.warning = { ...warning };
  }

  // Clean the form
  cleanForm(form: NgForm) {
    this.getWarnings();
    form.resetForm();
    this.warning = {} as Warning;
  }

  // Event for pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
}
