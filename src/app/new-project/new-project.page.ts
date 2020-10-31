import { Component, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage{

  public projectName : string;
  public isWaiting = false;
  
  @Input() onFinished: () => void;

  constructor(private loadingController: LoadingController,
              private projectService: ProjectService) { }

  async createProject() {
    const loadingIndicator = await this.loadingController.create({
      message: `Creating project '${ this.projectName }'...`
    });

    await loadingIndicator.present();

    this.projectService.createProject({
      name: this.projectName
    }).subscribe(async _ => {
      await loadingIndicator.dismiss();
      this.onFinished();
    }, async error => {
      console.error(error);
      await loadingIndicator.dismiss();
    });
  }

  cancel() {
    this.onFinished();
  }

}
